import { SignIn } from "@clerk/nextjs";
import { NextSeo } from 'next-seo';
export default function Page() {
  return (
    <>
      <NextSeo
        title="Gemino - Sign In"
        description="Gemino is an AI powered language learning platform that helps you learn faster."
        canonical="https://gemino.ishn.codes/"
        openGraph={{
          url: 'https://gemino.ishn.codes/',
          title: 'Gemino',
          description: 'Gemino is an AI powered language learning platform that helps you learn faster.',
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/og.png`,
              width: 800,
              height: 600,
              alt: 'Gemino',
              type: 'image/jpeg',
            },
          ],
          siteName: 'Gemino',
        }}
        twitter={{
          handle: '@ishnbedi',
          site: '@ishnbedi',
          cardType: 'summary_large_image',
        }}
      />
      <section id="sign-in-page" className="flex flex-col items-center justify-center min-h-screen py-2 px-2">
        <SignIn path="/sign-in" routing="path" />
      </section>
    </>
  );
}
