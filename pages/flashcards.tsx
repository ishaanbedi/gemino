import { NextSeo } from "next-seo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import Head from "next/head";

interface FlashcardProps {
    words: {
        word: string;
        meaning: string;
        exampleInGerman: string;
        translation: string;
    }[];
}

const Flashcards: React.FC = () => {
    const router = useRouter();
    const [loadingFromAPI, setLoadingFromAPI] = useState<boolean>(true);
    const [newUser, setNewUser] = useState<boolean>(false);
    const [words, setWords] = useState<string[]>([]);
    const [flashCardJSON, setFlashCardJSON] = useState<FlashcardProps["words"]>([]);
    const [startFlashcards, setStartFlashcards] = useState<boolean>(false);
    const user = useUser();
    const [lastRequestTime, setLastRequestTime] = useState<number | null>(null);
    const [showGenerating, setShowGenerating] = useState<boolean>(false);

    const getWords = async () => {
        const now = new Date().getTime();
        if (lastRequestTime && now - lastRequestTime < 5000) {
            return;
        }

        const url = `https://objective-brown.cmd.outerbase.io/get-words-for-revision?username=${user.user?.username}`;
        const response = await axios.get(url);
        setLoadingFromAPI(false);
        if (response.data.response.items[0].words_user_must_revise === null || response.data.response.items[0].words_user_must_revise === "") {
            setNewUser(true);
            return;
        }
        const wordsArray = response.data.response.items[0].words_user_must_revise.split(",");
        setWords(wordsArray);
        setLastRequestTime(now);
    };

    const handleAIFlashcards = async () => {
        setShowGenerating(true);
        const data = await axios.post("/api/aiFlashcard", {
            words: words,
        });
        setStartFlashcards(true);
        setShowGenerating(false);
        setFlashCardJSON(data.data.response);
    };

    useEffect(() => {
        if (user.isSignedIn) {
            getWords();
        }
    }, [user]);

    if (showGenerating) {
        return <section className="h-[80vh] mt-12">
            <Image className="mx-auto " src={`/doodles/paper-documents.svg`} width={350} height={350} alt={""} />
            <div className="text-center">
                <h1 className="text-3xl font-bold">
                    Almost there!
                </h1>
                <h2 className="text-xl">
                    Bob is crafting your flashcards, please wait...
                </h2>
            </div>
        </section>
    }

    if (newUser) {
        return (
            <section className="flex flex-col items-center justify-center text-center h-[50vh]">
                <h2 className="text-xl">
                    Hey! Looks like you&apos;ve not taken a test yet, or you&apos;ve not made any mistakes in any of your tests.
                    <br />
                    Check back later!
                </h2>
                <Button className="mt-4" onClick={() => router.push("/")}>
                    Go to Home
                </Button>
            </section>
        );
    }

    if (loadingFromAPI) {
        return (
            <section className="flex flex-col items-center justify-center text-center h-[83vh]">
                <Head>
                    <title>Gemino - Flashcards</title>
                </Head>
                <Loader className="animate-spin" />
            </section>

        )
    }

    return (
        <div>
            <NextSeo
                title="Gemino - Flashcards"
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
            <section
                className={`${startFlashcards ? "hidden" : "block"} h-[80vh] flex justify-center items-center text-center`}
            >
                <div>
                    <h1 className="lg:md:sm:text-4xl text-3xl font-bold">
                        Revise your mistakes, {user.user?.username}!
                    </h1>
                    <h2 className="text-xl">
                        With Gemino&apos;s AI, you can revise your mistakes in a flash!
                    </h2>
                    <Button
                        className="mt-4"
                        onClick={() => {
                            handleAIFlashcards();
                        }}
                    >
                        Start AI Flashcards
                    </Button>
                </div>
            </section>
            <section className="flex justify-center items-center mt-32">
                {startFlashcards && <FlashcardArray
                    cards={generateFlashcards(flashCardJSON)} />}
            </section>
        </div>
    );
};

export default Flashcards;
function generateFlashcards(words: FlashcardProps["words"]) {
    const arr = [];
    for (let i of words) {
        arr.push({
            id: 1,
            frontHTML: (
                <Card className="w-full h-full flex justify-center items-center text-center lg:md:sm:scale-150">
                    <div>
                        <div>
                            <h2 className="text-4xl font-bold">{i.word}</h2>
                        </div>
                    </div>
                </Card>
            ),
            backHTML: (
                <Card className="w-full h-full flex justify-center items-center text-center lg:md:sm:scale-150">
                    <div>
                        <div>
                            <h2 className="text-4xl font-bold">{i.meaning}</h2>
                            <h3 className="text-xl font-semibold">{i.exampleInGerman}</h3>
                            <h3 className="text-lg italic">{i.translation}</h3>
                        </div>
                    </div>
                </Card>
            ),
        });
    }
    return arr;
}
