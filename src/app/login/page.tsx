// app/login/page.tsx
import { signIn } from "next-auth/react";
import AuthError from "next-auth";

export default function LoginPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    try {
      const data = Object.fromEntries(formData.entries());
      await signIn("credentials", data);
    } catch (error) {
      if (error instanceof AuthError) {
        // Handle auth errors
      }
      throw error;
    }
  }

  return (
    <form action={handleSubmit}>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit">Sign In</button>
    </form>
  );
}