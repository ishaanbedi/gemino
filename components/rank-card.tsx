import { Share, Trophy } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import axios from "axios";
const RankCard = ({ userName }: { userName: any }) => {
  const [rank, setRank] = useState(null);
  const [overallPoints, setOverallPoints] = useState(null);
  const getUserRank = async () => {
    const res = await axios.get(`/api/getUserRank`);
    setRank(res.data.rank);
    setOverallPoints(res.data.overall_points);
  };
  useEffect(() => {
    if (userName) {
      getUserRank();
    }
  }, [userName]);
  return (
    <section className="py-3">
      <Card className="flex transition hover:shadow-xl p-0.5 border hover:border-stone-700">
        <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
          <time className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900 dark:text-white">
            <span>Global Rank</span>
            <span className="w-px flex-1"></span>
            <span>@{userName}</span>
          </time>
        </div>
        <div className="hidden sm:block sm:basis-56">
          <Trophy className="aspect-square h-full w-full object-cover p-4" />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div className="lg:md:sm:mt-8 border-s border-gray-900/10 p-4 dark:border-white/10 sm:!border-l-transparent sm:p-6">
            {overallPoints === 0 ? (
              <>
                <h3 className="font-bold text-2xl uppercase">
                  Take your <Link
                    className={`underline underline-offset-4 decoration-dotted	 transition`}
                    href={`/class`}>first lesson</Link> to get
                  ranked!
                </h3>
                <p className="mt-2 line-clamp-3 text-md/relaxed text-gray-700 dark:text-gray-200">
                  Once you complete your first lesson, you will be able to see &
                  share your worldwide rank.
                </p>
              </>
            ) : (
              <>
                <h3 className="font-bold text-7xl uppercase">
                  {rank === null ? (
                    <Skeleton className="w-full h-[20px] my-2.5 rounded-full" />
                  ) : (
                    `Rank #${rank}`
                  )}
                </h3>
                <p className="mt-2 line-clamp-3 text-md/relaxed text-gray-700 dark:text-gray-200">
                  {rank === null ? (
                    <Skeleton className="w-full h-[20px] my-2.5 rounded-full" />
                  ) : (
                    returnRankText({ rank })
                  )}
                </p>
              </>
            )}
          </div>

          <div className="sm:flex sm:items-end sm:justify-end">
            <Link
              href="/leaderboard"
              className="block bg-primary px-5 py-3 text-center text-xs font-bold transition hover:bg-primary/90  rounded-br-xl cursor-pointer text-white"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      </Card>
    </section>
  );
};
export default RankCard;

const returnRankText = ({ rank }: { rank: number }) => {
  switch (rank) {
    case 1:
      return "You beat em all! You are ranked 1st in the world.";
    case 2:
      return "Almost there! You are ranked 2nd in the world.";
    case 3:
      return "Well done! You are ranked 3rd in the world.";
    case 4:
      return `You made it to the top 10! Amazing work!`;
    case 5:
      return `You made it to the top 10! Amazing work!`;
    case 6:
      return `You made it to the top 10! Amazing work!`;
    case 7:
      return `You made it to the top 10! Amazing work!`;
    case 8:
      return `You made it to the top 10! Amazing work!`;
    case 9:
      return `You made it to the top 10! Amazing work!`;
    case 10:
      return `You made it to the top 10! Amazing work!`;
    default:
      return `Amazing work! You are ranked ${rank}th in the world.`;
  }
};
