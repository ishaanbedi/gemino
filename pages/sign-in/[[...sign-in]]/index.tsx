import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <section id="sign-in-page" className="flex flex-col items-center justify-center min-h-screen py-2 px-2">
        <SignIn path="/sign-in" routing="path" />
      </section>
    </>
  );
}
