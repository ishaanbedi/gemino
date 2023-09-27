import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BadgeInfo,
  CalendarDays,
  Target,
  Trophy,
  Gem,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import axios from "axios";
const fetchStats = async () => {
  const response = await axios.get("/api/getStats");
  return response.data;
};

const Stats = () => {
  const { data, error } = useSWR("/api/getStats", fetchStats);

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="grid lg:md:sm:grid-cols-2 grid-cols-1 gap-2">
      <div className="w-full">
        <StatCard
          title="Gemino Gems"
          content={data?.overallPoints}
          icon={<Gem className="text-3xl" />}
          popupJSX={
            <div className="mt-4">
              <p className="mb-2">
                For each completed level, you earn points equal to 10 times the
                number of correct answers.
              </p>
              <p className="mb-2">
                For instance, 5 correct answers in a level result in{" "}
                <span className="font-bold text-natural-500">50 points</span>.
              </p>
              <p className="mb-2">
                Achieving a perfect score, no mistakes, earns you an extra{" "}
                <span className="font-bold text-natural-500">50 points</span>.
              </p>
              <p className="mb-4">
                So, a perfect level grants{" "}
                <span className="font-bold text-natural-500">
                  150 Gemino Gems
                </span>
                .
              </p>
              <p className="mb-2">
                Gemino Gems determine your worldwide leaderboard rank.
              </p>
              <p>Accumulate more Gemino Gems for a higher rank.</p>
            </div>
          }
        />
      </div>
      <div className="w-full">
        <StatCard
          title="Your Streak"
          content={data?.streak}
          icon={<CalendarDays className="text-3xl" />}
          popupJSX={
            <div className="mt-4 text-neutral-700">
              <p className="mb-2">
                For every consecutive day you complete a level, you add up a day
                to your streak.
              </p>
              <p className="mb-2">
                If you miss a day, your streak resets to 0.
              </p>
              <p className="mb-2">
                Streak is a measure of your consistency on the Gemino platform.
              </p>
            </div>
          }
        />
      </div>
      <div className="w-full">
        <StatCard
          title="Current Level"
          content={data?.currentLevel}
          icon={<Target className="text-3xl" />}
          popupJSX={
            <div className="mt-4 text-neutral-700">
              <p className="mb-2">Each level has 10 questions.</p>
              <p className="mb-2">
                Every level teaches you some new words and concepts.
              </p>
              <p className="mb-4">
                The difficulty of the questions increases as you progress
                through the levels.
              </p>
            </div>
          }
        />
      </div>
      <div className="w-full">
        <StatCard
          title="Gemino Tag"
          content={data?.tag}
          icon={<Trophy className="text-3xl" />}
          popupJSX={
            <div className="mt-4 text-neutral-700">
              <p className="mb-2">
                Gemino Tag is a unique identifier for how advanced you are
                becoming on the Gemino platform.
              </p>
              <p className="mb-2">
                The Gemino Tag is determined on top of your
                Gemino Gems, Streak, and Current Level stats.
              </p>
              <p>
                After every 10 levels, you get a new Gemino Tag.
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Stats;

const StatCard = ({
  title,
  content,
  icon,
  popupJSX,
}: {
  title: string;
  content: string | null;
  icon: any;
  popupJSX: any;
}) => {
  return (
    <div>
      <Card className="w-full border hover:border-stone-700">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row items-center justify-between text-stone-700">
              <div className="flex items-center space-x-2">
                <span className=" font-extrabold">{title}</span>
                <span>
                  <Dialog>
                    <DialogTrigger>
                      <BadgeInfo className="cursor-pointer" size={16} />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-center text-2xl">
                          About {title}
                        </DialogTitle>
                        <div className="text-center">{popupJSX}</div>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </span>
              </div>
              <div className="mr-2">{icon}</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <span className="text-4xl font-bold">
              {content ? (
                content
              ) : (
                <Skeleton className="w-full h-[20px] my-2.5 rounded-full" />
              )}
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
