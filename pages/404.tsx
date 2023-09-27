import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div>
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
                                Start learning {process.env.NEXT_PUBLIC_COURSE} now
                            </Link>.
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;