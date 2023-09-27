import useSWR from "swr";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import NewLevel from "@/components/ui/new-level";
import { Card } from "@/components/ui/card";
import { Sparkles as BotButton, Brain, Loader, SeparatorVertical } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import GeminoDictionary from "@/components/gemino-dictionary";
import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import { useRouter } from "next/router";

const Class = () => {
  const router = useRouter();
  const [startNextLevel, setStartNextLevel] = useState(false);
  const [showStartButton, setShowStartButton] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const fetchStats = async () => {
    setLoading(true);
    const response = await axios.get("/api/getStats");
    setLoading(false);
    return response.data;

  };
  const { data, error } = useSWR("/api/getStats", fetchStats);
  if (error) {
    return (
      <div>
        Error loading data. Please give the page a refresh. If the problem
        persists, please contact me at hi@ishaanbedi.in
      </div>
    );
  }
  return (
    <div>
      <div>
        {showStartButton && (
          <>
            <div className="grid pt-4 lg:md:sm:grid-cols-2 grid-cols-1 gap-4">
              <Card className="w-full text-center p-4 flex justify-center items-center">
                <div>
                  <Image
                    className=""
                    src={`/doodles/student-in-the-classroom.svg`} width={200} height={200} alt={""} />
                  <h1 className="font-bold text-2xl">New Lesson</h1>
                  <Button
                    disabled={loading}
                    className={`mt-4 w-full disabled:cursor-not-allowed`}
                    onClick={() => {
                      setStartNextLevel(true);
                      setShowStartButton(false);
                    }}
                  >
                    {loading ? <Loader size={16} className="animate-spin" /> : `Start Level ${Number(data?.currentLevel)}`}
                  </Button>

                </div>
              </Card>
              <Card className="w-full text-center p-4 flex justify-center items-center">
                <div className="flex flex-col justify-evenly">
                  <Image src={`/doodles/studying.svg`} width={200} height={200} alt={""} />
                  <h1 className="font-bold text-2xl">
                    Revise Your Mistakes
                  </h1>
                  <div>

                    <Button
                      disabled={loading}
                      className={`mt-4 w-full disabled:cursor-not-allowed`}
                      onClick={() => {
                        router.push("/flashcards");
                      }}
                    >
                      AI Powered Flashcards
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
            <Card className="w-full text-center p-4 flex justify-center items-center my-2 ">
              <div className="flex lg:md:sm:flex-row flex-col justify-around items-center w-full">
                <Image src={`/doodles/hi.svg`} width={200} height={200} alt={""} />
                <div>
                  <h1 className="font-extrabold text-2xl">
                    Meet Bob
                  </h1>
                  <p className="text-md">
                    Bob is your personal AI tutor.<br />He&apos;s here to help you learn.
                  </p>
                  <div >
                    <Link href="/chat">
                      <Button
                        disabled={loading}
                        className={`mt-4 w-full disabled:cursor-not-allowed`}
                      >
                        Chat with Bob
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="w-full text-center p-4 flex justify-center items-center mb-12">
              <div className="flex lg:md:sm:flex-row flex-col justify-around items-center w-full">
                <Image src={`/doodles/creative-work.svg`} width={300} height={300} alt={""} />
                <div className="lg:md:sm:block hidden">
                </div>
                <div className="mt-12">
                  <h1 className="font-extrabold text-2xl text-center">
                    Gemino Dictionary
                  </h1>
                  <p className="text-md text-center">
                    A handy dictionary is available to you at all times.
                    <br />
                    <span className="lg:md:sm:hidden block">
                      Just press the following button to open it.
                    </span>
                    <span className="lg:md:sm:block hidden">
                      Just press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
                        <span className="text-xs">⌘</span>K
                      </kbd> anytime to open it.
                    </span>
                  </p>
                  <Separator className="my-2" />
                  <GeminoDictionary showButton={true} />
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
      <div>
        {startNextLevel && <NewLevel level={Number(data?.currentLevel)} />}
      </div>
    </div>
  );
};

export default Class;
