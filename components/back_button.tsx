import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

const BackButton = (
    {
        backPath = "/",
    }: {
        backPath?: string,
    }
) => {
    const router = useRouter();
    return (
        <div>
            <button onClick={() => router.push(backPath)}>
                <ChevronLeft size={24} />
            </button>

        </div>
    );
}

export default BackButton;