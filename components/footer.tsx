import Link from "next/link";
import { Marck_Script } from "@next/font/google"
import { AiFillGithub } from "react-icons/ai";
import { FiTwitter } from "react-icons/fi";
import { Button } from "./ui/button";
const font = Marck_Script({
    subsets: ["latin"],
    weight: ['400']
})
const Footer = () => {
    return (
        <div>
            <footer>
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div
                        className="flex flex-col items-center gap-4 rounded-lg bg-primary p-6 shadow-lg sm:flex-row sm:justify-between"
                    >
                        <strong className="text-xl  sm:text-xl text-primary-foreground">
                            Ready to get started?
                        </strong>
                        <Link href="/signup">
                            <Button variant={"secondary"}>
                                Sign up, it&apos;s free
                            </Button>
                        </Link>
                    </div>


                </div>

                <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                    <span className={`text-center text-4xl font-bold text-secondary-foreground flex justify-center ${font.className}`}>
                        ib
                    </span>
                    <p
                        className="mx-auto mt-3 max-w-lg text-center leading-relaxed"
                    >
                        Gemino is developed by <Link className="underline underline-offset-2" target="_blank" href="https://ishaanbedi.in">Ishaan Bedi</Link> during the <Link className="underline underline-offset-2" href={'https://outerbase.com/'}> Outerbase Hackathon.</Link>
                    </p>
                    <ul className="mt-6 flex justify-center gap-3 md:gap-5">
                        <li>
                            <Link href="https://www.github.com/ishaanbedi" target="_blank">
                                <AiFillGithub className="h-6 w-6 text-gray-400 hover:text-gray-500" />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.twitter.com/ishnbedi" target="_blank">
                                <FiTwitter className="h-6 w-6 text-gray-400 hover:text-gray-500" />
                            </Link>
                        </li>


                    </ul>
                </div>
            </footer>
        </div>
    );
}

export default Footer;