import { Mail } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { FacebookIcon, GithubIcon, LinkedinIcon } from "./BrandIcons";
const items = [
  { key: "github", label: "GitHub", href: site.socials.github, Icon: GithubIcon },
  { key: "linkedin", label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedinIcon },
  { key: "facebook", label: "Facebook", href: site.socials.facebook, Icon: FacebookIcon },
  { key: "email", label: "Email", href: `mailto:${site.email}`, Icon: Mail },
].filter((i) => i.href);
export const socialLinks = items;
export function Socials({ className }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map(({ key, label, href, Icon }) => (
        <li key={key}>
          <a
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer noopener"
            aria-label={label}
            className="grid h-12 w-12 place-items-center rounded-full border border-line text-fg transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-fg"
          >
            <Icon width={18} height={18} aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
