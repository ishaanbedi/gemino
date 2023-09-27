import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const TestFailedPage = () => {
    const router = useRouter();
    return (
        <div className="flex items-center justify-center mt-24">
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