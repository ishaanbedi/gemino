import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section id="sign-in-page" className="flex flex-col items-center justify-center min-h-screen py-2 px-2">
      <SignUp />
    </section>
  );
}
