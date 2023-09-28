import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link";

const FAQ = () => {
    const faqs = [
        {
            question: "What is Gemino?",
            answer: "Gemino is a gamified language learning platform that uses AI to help you learn a language.",
        },
        {
            question: "How to best utilize Gemino?",
            answer: "Each level is a gamified experience to learn a new concept of the language. Each question in a level will teach you something new. It's all a game of your memory. The more you play, the more you learn. After every level, try to write down the concepts you learned in that level. This will help you remember them better.",
        },
        {
            question: "Is Gemino free?",
            answer: "For now, yes. Since AI integration is expensive to run, we may have to charge a small fee in the future, based on the response we get from the community. We will always have a free tier, though.",
        },
        {
            question: "Does Gemino provide video lectures?",
            answer: "No, just like Duolingo, Gemino provides a gamified experience to learn a language rather than a traditional approach of learning, making it more fun and engaging.",
        },
        {
            question: "How does Gemino work?",
            answer: "Gemino has over 100 levels. Each level is designed to teach you a new concept of the language. The questions are designed to teach you the language in a fun and engaging way. You learn by doing, by making mistakes and by learning from them.",
        },
        {
            question: "What can I learn on Gemino?",
            answer: `You can learn ${process.env.NEXT_PUBLIC_COURSE} on Gemino. Who knows, we might add more languages in the future.`,
        },
        {
            question: "I found a mistake in a question, what do I do?",
            answer: `Since it is the beginning of the project, there might be some mistakes in the questions. You can report a mistake by going through the support page and reporting a question. We will correct it out by referring to expert sources.`
        },
        {
            question: "How do I report a bug?",
            answer: (
                <span>
                    You can raise an issue after logging in to your account and navigating to the support page. You can also open an issue on GitHub.
                    <br />
                    <Link target="_blank" className="underline underline-offset-4" href="https://www.github.com/ishaanbedi/gemino/issues/new" passHref>
                        Click here to open an issue on GitHub.
                    </Link>
                    <br />
                    Alternatively, you can also email me at <Link className="underline underline-offset-4" href="mailto:hi@ishaanbedi.in" target="_blank" passHref>
                        hi@ishaanbedi.in
                    </Link>{' '}
                    for any queries, reports or feedback.
                </span>
            )
        }

    ]
    return (
        <section className="py-12">
            <h1 className="text-4xl text-center font-bold">
                Some FAQs
            </h1>
            <div className="lg:md:sm:px-12 px-2 mt-8">
                <Accordion type="single" collapsible>
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index + 1}`}>
                            <AccordionTrigger className="text-xl">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-lg">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

        </section>
    );
}

export default FAQ;