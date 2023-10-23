import { NextSeo } from "next-seo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/router";
import { TbBrandNextjs } from "react-icons/tb";
import { BiLogoPostgresql } from "react-icons/bi";
import { RiOpenaiFill } from "react-icons/ri";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import Footer from "@/components/footer";
import FAQ from "@/components/faq";
import StatFeatures from "@/components/statFeatures";
import { useUser } from "@clerk/nextjs";
const HomePage = () => {
    return (
        <>
            <NextSeo
                title="Gemino - Home"
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
            <HeroLanding />
            <div className="max-w-4xl mx-auto mt-20">
                <FeatureSection />
                <StatFeatures />
                <OpenSourceFeature />
                <FAQ />
                <Footer />
            </div>

        </>
    );
}

export default HomePage;


const FeatureSection = () => {
    return (
        <section id="features" className="min-h-screen">
            <h1 className="text-5xl font-bold text-center pt-24">
                About Gemino
            </h1>
            <div className="mx-auto max-w-screen-xl px-4  sm:px-6 lg:py-16 lg:px-8">
                <FeatureTemplate
                    imageUrl="/doodles/man-riding-a-rocket.svg"
                    title="50+ Interactive Levels"
                    description={
                        <div>
                            Gemino has a library of 50+ interactive levels to help you learn {process.env.NEXT_PUBLIC_COURSE} in a fun and engaging way.<br />All the levels are AI powered and are designed to help you learn {process.env.NEXT_PUBLIC_COURSE} in a fun and engaging way.
                        </div>
                    }
                />
                <FeatureTemplate
                    directionLeft={false}
                    imageUrl="/doodles/bob.svg"
                    title="AI Powered Tutor, Bob"
                    description={
                        <div>
                            Bob is your tutor available 24/7 to help you solve your doubts, clear your concepts, help you overcome your past mistakes and guide you in any way possible.<br />Bob is powered by AI and is designed to help you learn {process.env.NEXT_PUBLIC_COURSE} and he is just one message away, even at 3 AM.
                        </div>
                    }
                />
                <FeatureTemplate
                    directionLeft={!false}
                    imageUrl="/doodles/flashcard.svg"
                    title="Study AI Generated Flashcards"
                    description={
                        <div>
                            Revise your mistakes and learn new concepts with AI generated flashcards. <br />Gemino generates exclusive flashcards for you based on your past mistakes and your learning style.
                        </div>
                    }
                />
                <FeatureTemplate
                    directionLeft={false}
                    imageUrl="/doodles/dictionary.svg"
                    title="Gemino dictionary, oh yeah!"
                    description={
                        <>
                            <div className="lg:md:sm:block hidden">
                                Just press  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
                                    <span className="text-xs">⌘</span>K
                                </kbd> on your keyboard and search for any term, either in {process.env.NEXT_PUBLIC_COURSE} or in English.
                                <br />
                                We have integrated the dictionary so that you don&apos;t have to leave the platform to search for a term, and as they say, dictionary is a learner&apos;s best friend.
                            </div>
                            <div className="lg:md:sm:hidden block">
                                Navigate to classroom page after logging in and get instant access to a handy dictionary.
                                <br />
                                We have integrated the dictionary so that you don&apos;t have to leave the platform to search for a term, and as they say, dictionary is a learner&apos;s best friend.

                            </div>
                        </>
                    }
                />
            </div>
        </section >
    );
}


const FeatureTemplate = (
    {
        imageUrl,
        title,
        description,
        directionLeft = true
    }: {
        imageUrl: string,
        title: string,
        description: JSX.Element
        directionLeft?: boolean
    }
) => {
    return (
        <div className="mb-24">
            <div
                className={`flex justify-center items-center flex-col lg:flex-row ${directionLeft ? "lg:flex-row-reverse" : "lg:flex-row"
                    }`}
            >
                <div className="lg:w-1/2">
                    <Image
                        id={imageUrl?.split("/")?.pop()?.split(".")?.[0]}
                        alt=""
                        src={imageUrl}
                        className="rounded-lg"
                        width={300}
                        height={300}
                    />
                </div>

                <div className="lg:w-1/2">
                    <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>

                    <p className="mt-4 text-lg">{description}</p>
                </div>
            </div>
        </div>

    );
}

const HeroLanding = () => {
    const router = useRouter();
    const { isSignedIn, user } = useUser();
    return (
        <div>
            <section className="mt-20">
                <div className="flex flex-col justify-center items-center">
                    <div className="text-center flex flex-col justify-center items-center mt-12">
                        <h1 className="font-black text-center lg:text-7xl md:text-5xl sm:text-4xl text-3xl">
                            Gem for learning
                            {' '}
                            <span className="bg-gradient-to-bl from-orange-500 to-yellow-300 bg-clip-text text-transparent">
                                {process.env.NEXT_PUBLIC_COURSE}.
                            </span>
                        </h1>
                        <h1 className="font-black text-center lg:text-6xl md:text-5xl sm:text-4xl text-3xl">
                            This is gemino.
                        </h1>
                        <h3 className="text-center max-w-md lg:text-xl md:text-lg text-md mt-3">
                            Completely free &amp; open source AI powered platform to learn {process.env.NEXT_PUBLIC_COURSE}.
                        </h3>
                    </div>
                    <div className="flex lg:md:sm:flex-row flex-col lg:md:sm:space-x-6 lg:md:sm:space-y-0 space-y-3 mt-8 lg:md:sm:w-1/2 w-full justify-center items-center">
                        {isSignedIn ? (
                            <Button
                                onClick={() => router.push("/class")}
                                className="lg:md:sm:w-1/3 w-full">
                                Go to Classroom
                            </Button>
                        ) : (
                            <Button
                                onClick={() => router.push("/sign-up")}
                                className="lg:md:sm:w-1/3 w-full">
                                Get Started
                            </Button>
                        )}
                        <Button
                            onClick={() => router.push("#features")}
                            className="lg:md:sm:w-1/3 w-full border border-black" variant={"outline"}>
                            Learn More
                        </Button>
                    </div>
                </div>

            </section>
        </div>
    );
}
const OpenSourceFeature = () => {
    const items = [
        {
            title: "Next.js",
            svg: <TbBrandNextjs />,
            hoverDescription: "Next.js is the React framework used to build Gemino.",
        },
        {
            title: "Tailwind CSS",
            svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>,
            hoverDescription: "Gemino is styled with a combination of Tailwind CSS and shadcn/ui.",
        },
        {
            title: "PostgreSQL",
            svg: <BiLogoPostgresql />,
            hoverDescription: "Gemino uses PostgreSQL as the database to store internal data, user data and other information.",
        },
        {
            title: "Outerbase",
            svg: (
                <img
                    src="/outerbase.svg"
                    alt="outerbase"
                    className="h-12 w-12 grayscale"
                />
            ),
            hoverDescription: "Gemino uses Outerbase as the interface to interact with the database and the backend.",
        },
        {
            title: "Clerk",
            svg: <img src="https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/a1iakwzbac96qzymzwtq" alt="clerk" className="h-6 grayscale" />,
            hoverDescription: "Gemino uses Clerk as the authentication provider and for user management.",
        },
        {
            title: "OpenAI",
            svg: <RiOpenaiFill />,
            hoverDescription: "Gemino uses OpenAI offerings to generate flashcards and to power Bob, as well as to generate levels.",
        },

    ];
    const router = useRouter();
    return (
        <section>
            <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div
                    className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16"
                >
                    <div
                        className="mx-auto max-w-lg text-center lg:mx-0"
                    >
                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Gemino is open source!
                        </h2>

                        <p className="mt-4 text-gray-600">
                            Gemino is completely free and open source. Gemino is built with top-notch technologies and uses the best practices to ensure that you have a smooth learning experience.
                        </p>
                        <Button
                            onClick={() => {
                                router.push("https://www.github.com/ishaanbedi/gemino");
                            }
                            }
                            className="mt-4 w-full flex items-center justify-center space-x-2">
                            <Image src="/github.svg" width={16} height={16} alt="github" />
                            <span className="mt-1">
                                View on Github
                            </span>
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 justify-center items-center self-center content-center">
                        {items.map((item, index) => (
                            <HoverCard key={index}>
                                <HoverCardTrigger>
                                    <Card key={index} className="h-32 w-32 flex justify-center items-center">
                                        <span className="text-4xl">
                                            {item.svg}
                                        </span>
                                    </Card>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    {item.hoverDescription}
                                </HoverCardContent>
                            </HoverCard>

                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};



