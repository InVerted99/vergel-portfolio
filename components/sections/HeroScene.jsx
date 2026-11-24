"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
/* Ashima 3D simplex noise (MIT) — compact GLSL. */
const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;
const vertex = /* glsl */ `
uniform float uTime; uniform float uAmp;
varying vec3 vNormal; varying vec3 vView; varying float vDisp;
${noise}
void main(){
  float d = snoise(normal * 1.4 + uTime * 0.25) * uAmp;
  vDisp = d;
  vec3 pos = position + normal * d;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;
const fragment = /* glsl */ `
uniform vec3 uAccent; uniform vec3 uBase;
varying vec3 vNormal; varying vec3 vView; varying float vDisp;
void main(){
  float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.2);
  vec3 col = mix(uBase, uAccent, clamp(fres * 1.4 + vDisp * 0.9, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}`;
const BASE_DARK = new THREE.Color("#141416");
const BASE_LIGHT = new THREE.Color("#e7e6df");
function Orb({ dark }) {
  const mesh = useRef(null);
  const wire = useRef(null);
  const material = useRef(null);
  const pointer = useRef({ x: 0, y: 0, energy: 0 });
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.22 },
      uAccent: { value: new THREE.Color("#c6f432") },
      uBase: { value: new THREE.Color(dark ? "#141416" : "#e7e6df") },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- created once; theme colour eases in useFrame
    [],
  );
  useEffect(() => {
    let lx = 0;
    let ly = 0;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.current.energy = Math.min(
        pointer.current.energy + Math.hypot(x - lx, y - ly) * 2.5,
        1,
      );
      pointer.current.x = x;
      pointer.current.y = y;
      lx = x;
      ly = y;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  useFrame((_, delta) => {
    const p = pointer.current;
    p.energy *= 0.96; // charge decays back to calm
    const u = material.current?.uniforms;
    if (u) {
      u.uTime.value += delta * (1 + p.energy * 3);
      u.uAmp.value = THREE.MathUtils.lerp(u.uAmp.value, 0.2 + p.energy * 0.35, 0.08);
      // Ease the base colour toward the current theme.
      u.uBase.value.lerp(dark ? BASE_DARK : BASE_LIGHT, 0.08);
    }
    if (mesh.current && wire.current) {
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, p.x * 0.6, 0.05);
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, p.y * 0.4, 0.05);
      wire.current.rotation.y -= delta * 0.08;
      wire.current.rotation.z += delta * 0.04;
    }
  });
  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.35, 48]} />
        <shaderMaterial
          ref={material}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
        />
      </mesh>
      <mesh ref={wire} scale={1.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color={dark ? "#eeede7" : "#111110"}
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}
export default function HeroScene({ dark }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);
  // Stop rendering when scrolled out of view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        frameloop={visible ? "always" : "never"}
        aria-hidden
      >
        <Orb dark={dark} />
      </Canvas>
    </div>
  );
}
