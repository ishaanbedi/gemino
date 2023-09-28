import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from 'next-seo';
const NotFoundPage = () => {
    return (
        <div>
            <NextSeo
                title="Gemino - Page not found"
                description="Gemino is an AI powered language learning platform that helps you learn faster."
                canonical="https://gemino.vercel.app/"
                openGraph={{
                    url: 'https://gemino.vercel.app/',
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
            <div className="grid h-[80vh] px-4 place-content-center">
                <div className="text-center">
                    <Image
                        className="w-auto h-56 mx-auto text-black sm:h-64"
                        src={`/doodles/404.svg`} width={500} height={500} alt={""} />

                    <h1
                        className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                    >
                        That&apos;s a 404.
                    </h1>
                    <h3 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                        The page you&apos;re looking for doesn&apos;t exist.
                    </h3>
                    <div className="mt-6">
                        <Button>
                            <Link href="/">
                                Go back Home
                            </Link>.
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;