import { NextSeo } from 'next-seo';
import React from "react";
import { Flame, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const fetchLeaderboard = async () => {
  const res = await axios.get(`/api/getLeaderboard`);
  return res.data.reverse();
};

const Leaderboard: React.FC = () => {
  const { user } = useUser();
  const { data: leaderboard, error } = useSWR(
    "/api/getLeaderboard",
    fetchLeaderboard
  );

  if (error) {
    console.error("Error fetching leaderboard:", error);
  }

  return (
    <section>
      <NextSeo
        title="Gemino - Leaderboard"
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
      {!leaderboard ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Leaderboard</h1>
          <Card className="lg:md:sm:w-3/4 w-full mt-12 text-xl">
            <div className="py-3 flex justify-between items-center px-4">
              <span className="flex items-center">
                <span className="px-2 font-semibold">User</span>
              </span>
              <span className="px-2 font-semibold">Points</span>
            </div>

            <div className={`py-3 px-4`}>
              {Array.from({ length: 12 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-full h-[20px] rounded-full mb-6"
                />
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold ">Leaderboard</h1>
          <Card className="lg:md:sm:w-3/4 w-full mt-12 text-xl">
            <div className="py-3 flex justify-between items-center px-4">
              <span className="flex items-center">
                <span className="px-2 font-semibold">Username</span>
              </span>
              <span className="px-2 font-semibold">Points</span>
            </div>
            {leaderboard.map((player: any, index: number) => (
              <div
                key={index}
                className={`py-3 flex justify-between items-center px-4
                  ${player.username === user?.username
                    ? "inline-block rounded bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 p-[2px] text-white focus:outline-none focus:ring active:text-opacity-75"
                    : ""
                  }
                  `}
              >
                <span className="flex items-center">
                  <span>
                    <Trophy
                      className={`w-6 h-6
                       ${player.rank === 1 ? "text-yellow-400" : ""}  ${player.rank === 2 ? "text-gray-400" : ""
                        } ${player.rank === 3 ? "text-yellow-600" : ""}
                      `}
                    />
                  </span>
                  <span>
                    <Link href={`/profile/${player.username}`}>
                      <span
                        className={`ml-2 ${player.username === user?.username
                            ? "font-bold hover:text-neutral-200"
                            : "text-neutral-500 hover:text-neutral-700"
                          }`}
                      >
                        {player.username}
                      </span>
                    </Link>
                  </span>
                </span>
                <span className="flex items-center space-x-1">
                  <p className="pt-1">
                    {player.points}
                  </p>
                  <Flame className="" />
                </span>
              </div>
            ))}
          </Card>
        </div>
      )}
    </section>
  );
};

export default Leaderboard;
