const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Shared by the client form and the API route so rules never drift. */
export function validateContact(input) {
  const errors = {};
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const message = (input.message ?? "").trim();
  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 80) errors.name = "That name is a bit long — 80 characters max.";
  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email) || email.length > 160)
    errors.email = "That email doesn't look right.";
  if (message.length < 10) errors.message = "Tell me a little more — at least 10 characters.";
  else if (message.length > 4000) errors.message = "Please keep it under 4000 characters.";
  return errors;
}
