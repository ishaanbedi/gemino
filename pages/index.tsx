import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Stats from "@/components/stats";
import RankCard from "@/components/rank-card";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const HomePage = () => {
  const router = useRouter();
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isSignedIn, user } = useUser();
  if (!isSignedIn) {
    router.push("/home");
  }
  if (!isLoaded || !userId || !sessionId || !getToken) {
    return null;
  }
  return (
    <section>
      <div className="py-12">
        <Stats />
        <RankCard userName={user?.username} />
        <CTABar />
      </div>
    </section>
  );
};

export default HomePage;


const CTABar = () => {
  return (
    <Card className="transition hover:shadow-xl p-0.5 border">

      <div
        className="flex flex-col items-center gap-4 rounded-lg p-6 shadow-lg sm:flex-row sm:justify-between"
      >
        <strong className="text-xl  sm:text-xl text-primary">
          Start a new lesson now!
        </strong>
        <Link href="/class">
          <Button>
            Go to Classroom
          </Button>
        </Link>
      </div>
    </Card>
  );
}
