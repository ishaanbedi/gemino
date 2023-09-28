import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { NextSeo } from 'next-seo';
const TestFailedPage = () => {
    const router = useRouter();
    return (
        <div className="flex items-center justify-center mt-24">
            <NextSeo
                title="Gemino - Test Failed"
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

            <div className="text-center text-xl">
                <p className="mb-4">
                    Hey! If you are seeing this, it means that you have failed the test.
                </p>
                <p className="mb-4">
                    No worries, you can always try again!
                </p>
                <p className="mb-4">
                    Do note that failing a test, in no way affects your standing on the platform and has no negative consequences.
                </p>
                <Button onClick={() => {
                    router.push("/");
                }}>Go back to home</Button>
            </div>
        </div>

    );
}

export default TestFailedPage;