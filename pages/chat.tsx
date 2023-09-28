import { NextSeo } from 'next-seo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import { useChat } from 'ai/react';
import axios from 'axios';
import { Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image';
import { Card } from '@/components/ui/card';

export default function Pg() {
    const user = useUser();
    const messageEndRef = useRef<null | HTMLDivElement>(null);
    const [userData, setUserData] = useState([]);
    const [userDataFetched, setUserDataFetched] = useState(false);
    const [loading, setLoading] = useState(true);
    const { messages, handleSubmit, input, handleInputChange } = useChat({
        api: "/api/chat",
        initialMessages: [
            {
                id: "",
                content: `You are Bob, a friendly ${process.env.NEXT_PUBLIC_COURSE} tutor from ${process.env.NEXT_PUBLIC_COURSE} learning language platform called Gemino, and ${user.user?.username} will now chat with you. They are new to ${process.env.NEXT_PUBLIC_COURSE} learning, please talk with them about their doubts, difficulties, and questions. Be nice to them, keep a funny-friendly tone, and try to help them as much as you can. ${userData ? `Based on past performance, ${user.user?.username} here's some data: ${userData}. ` : ""}Try to not deviate from ${process.env.NEXT_PUBLIC_COURSE} learning, and keep your responses short and to the point. Primary mode of communication between you both should be English, and don't deviate from ${process.env.NEXT_PUBLIC_COURSE} language domain even if ${user.user?.username} asks you to.`,
                role: "system"
            }
        ]
    });

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "auto" });
    }, [messages]);

    useEffect(() => {
        const getuserData = async () => {
            setLoading(true);
            const url = `https://objective-brown.cmd.outerbase.io/get-words-for-revision?username=${user.user?.username}`;
            const response = await axios.get(url);
            setUserData(response.data.response.items[0]);
            setUserDataFetched(true);
            setLoading(false);
        }
        if (user.isLoaded && !userDataFetched) {
            getuserData();
        }
    }, [user, userDataFetched]);

    return (<div className="min-h-[90vh] flex flex-col justify-between">
        <NextSeo
            title="Gemino - Chat with Bob"
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
        <ScrollArea className="h-[80vh] w-full p-4 no-scrollbar scroll-auto justify-end flex flex-col overflow-y-auto">
            {messages.length === 1 && (<div className="flex space-x-2 justify-center" >
                <div className='flex flex-col text-center justify-center max-w-lg'>
                    <div className='flex justify-center'>
                        <Image className='text-center' src="/doodles/man-avatar.svg" width={250} height={250} alt={""} />
                    </div>
                    <div className='pt-3'>
                        <h1 className="text-3xl font-bold">
                            Hi, I&apos;m Bob!
                        </h1>
                        <h3 className="text-lg">
                            I&apos;m your AI {process.env.NEXT_PUBLIC_COURSE} tutor.
                        </h3>
                        <p className="text-lg mt-3">
                            Ask me anything about {process.env.NEXT_PUBLIC_COURSE}, your doubts, difficulties, and questions, or your past performance and progress.
                        </p>
                    </div>
                </div>
            </div>)}
            {messages.map((message, i) => (
                <div key={i} className={`flex items-center space-x-2 my-3 ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                    <span className={`flex space-x-2 ${message.role === "assistant" ? "flex-row" : "flex-row-reverse"}`}>
                        <Avatar className={`${message.role === "system" ? "hidden" : ""} ml-1`} >
                            <AvatarImage
                                src={message.role === "assistant" ? `/doodles/man-avatar.svg` : `${user.user?.imageUrl}`} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        {message.role !== "system" && (
                            <span
                                onClick={() => {
                                }}
                                key={i}
                                className={`${message.role === "assistant" ? "bg-secondary text-primary" : " bg-popover-foreground/70 text-secondary"} px-4 py-2 rounded-lg max-w-lg`}
                            >
                                {message.content}
                            </span>
                        )}
                    </span>

                </div>
            ))}

            <div ref={messageEndRef} />
        </ScrollArea>

        <form onSubmit={handleSubmit} className='flex space-x-2 py-4'>
            <Input
                className='py-2  text-[1.1rem] shadow-2xl'
                disabled={loading}
                placeholder={loading ? "Just a moment..." : "Type your message here..."}
                autoComplete="off"
                name="prompt"
                value={input}
                onChange={handleInputChange}
                id="input"
                required
            />
            <Button
                disabled={loading}
                type="submit"
            >
                <Send size={16} />
            </Button>
        </form>

    </div>);
}