import React, { useEffect, useState } from "react";
import { Button } from "./button";
import axios from "axios";
import { Progress } from "./progress";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Loader, Target, Trophy } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"

const NewLevel = ({ level }: { level: number }) => {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [score, setScore] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [fibInputText, setFibInputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [wordsUserMustReview, setWordsUserMustReview] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  useEffect(() => {
    const getQuestions = async () => {
      const { data } = await axios.get(`/api/getQuestions?level=${level}`);
      setQuestions(data.data.data);
      setLoading(false);
    };
    getQuestions();
  }, [level]);
  useEffect(() => {
    async function updateTheRecord() {
      setShowLoadingScreen(true);
      if (score === 0) {
        router.push("/test-failed");
        return;
      }
      const filteredWords = wordsUserMustReview.filter((word) => word);
      const { data } = await axios.get("/api/getStats");
      const obj = {
        points: score === 10 ? 150 : score * 10,
        nextLevel: level + 1,
        wordsUserMustReview: filteredWords,
        existingPoints: data.overallPoints
      };
      try {
        await axios.post("/api/updateUserRecord", obj);
        setShowSuccessScreen(true);
      } catch (error) {
        toast.error("Something went wrong, please try again later.");
        router.push("/");
      }
      setShowLoadingScreen(false);
    }
    if (currentQuestion === 10) {
      updateTheRecord();
    }
  }, [currentQuestion, level, score, wordsUserMustReview, router]);
  const goToNextQuestion = () => {
    setIsPaused(true);
    setTimeout(() => {
      setIsPaused(false);
      setCurrentQuestion(currentQuestion + 1);
    }, 191);
  };

  const successToast = () => {
    var audio = new Audio("correct_answer_audio.m4a");
    audio.play();

    setIsToastVisible(true);
    toast.success("Correct Answer!", {
      duration: 191,
    });
    setTimeout(() => {
      setIsToastVisible(false);
    }, 191);
  };

  const errorToast = (explanation: string) => {
    var audio = new Audio("wrong_answer_audio.m4a");
    audio.play();
    setIsToastVisible(true);
    toast.error(explanation, {
      duration: 191,
    });
    setTimeout(() => {
      setIsToastVisible(false);
    }, 191);
  };
  if (loading) {
    return (
      <section className="h-[80vh] mt-6">
        <Image className="mx-auto " src={`/doodles/home-office.svg`} width={350} height={350} alt={""} />
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Hold up!
          </h1>
          <h2 className="text-xl">
            Bob is preparing your lesson.
          </h2>
        </div>
      </section>
    )
  }

  return (
    <div>
      <>
        {showLoadingScreen && (
          <section>
            <Loader className="animate-spin mx-auto h-[80vh]" />
          </section>
        )}
      </>
      <>
        {showSuccessScreen && (
          <>
            <section>
              <div className="flex justify-center items-center">
                <img
                  src={score === 10 ? "/perfect.png" : "/level_complete.png"}
                  alt="achievement"
                  className="w-72 h-72 invert"
                />
              </div>
              <div>
                <>
                  <div className="text-2xl text-center">
                    <span className="text-2xl text-center">
                      {score === 10 ? "PERFECT" : "LEVEL COMPLETE"}
                      <br />
                      {score === 10
                        ? "You got all the answers right!"
                        : "You got " + score + " answers right!"}
                    </span>
                  </div>
                </>
              </div>
              <div className="grid lg:md:sm:grid-cols-3 grid-cols-1 gap-2 pt-8">
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle>
                      <div className="flex flex-col justify-center items-center">
                        <Trophy />
                        <h3 className="pt-2">Score Achieved</h3>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-3xl font-bold pt-0">
                    {score}
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle>
                      <div className="flex flex-col justify-center items-center">
                        <Target />
                        <h3 className="pt-2">Points Earned</h3>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-3xl font-bold pt-0">
                    {score === 10 ? 150 : score * 10}
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle>
                      <div className="flex flex-col justify-center items-center">
                        <ArrowUpRight />
                        <h3 className="pt-2">You Unlocked</h3>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-3xl font-bold pt-0">
                    Level {level + 1}{" "}
                  </CardContent>
                </Card>
              </div>
              <div className="pb-12 lg:md:sm:flex-row flex-col flex justify-center items-center lg:md:sm:space-x-2 space-x-0 lg:md:sm:space-y-0 space-y-2 pt-8">
                <Button
                  onClick={() => {
                    router.reload();
                  }}
                  className="lg:md:sm:w-1/3 w-full"
                >
                  Back to Class Room
                </Button>
                {score !== 10 && (
                  <Button
                    className="lg:md:sm:w-1/3 w-full"
                    onClick={() => router.push("/")}>
                    Go to Home
                  </Button>
                )}
              </div>
            </section>
          </>
        )}
      </>
      {!showSuccessScreen && (
        <>
          <>
            <div className={`overlay ${isToastVisible ? "show" : ""}`}></div>
            {currentQuestion !== 10 && (
              <div>
                <div className="my-4 flex justify-between items-center">
                  <div className="w-11/12">
                    <Progress
                      value={(currentQuestion / questions.length) * 100}
                    />
                  </div>
                  <div className="w-1/12 flex justify-center">
                    <h3 className="font-bold text-xl">
                      <span>{score}</span>
                    </h3>
                  </div>
                </div>
                {questions[currentQuestion].question_type === "mcq" && (
                  <>
                    <div className="text-2xl">
                      <h1 className="text-3xl font-bold pb-3">
                        Select the correct answer:
                      </h1>
                      {questions[currentQuestion].question_text}
                    </div>
                    <div className="flex lg:md:sm:flex-row flex-col lg:md:sm:space-x-2 space-x-0 lg:md:sm:space-y-0 space-y-2 py-6">
                      {questions[currentQuestion].options.map(
                        (option: [string], index: number) => (
                          <div key={index}>
                            <Button
                              className="w-full"
                              disabled={isPaused}
                              onClick={() => {
                                if (
                                  index ===
                                  questions[currentQuestion].correct_option
                                ) {
                                  successToast();
                                  setScore(score + 1);
                                } else {
                                  errorToast(
                                    questions[currentQuestion].explanation
                                  );
                                  setWordsUserMustReview([
                                    ...wordsUserMustReview,
                                    questions[currentQuestion].correct_answer,
                                  ]);
                                }
                                goToNextQuestion();
                              }}
                            >
                              {option}
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}
                {questions[currentQuestion].question_type ===
                  "fill_in_the_blanks" && (
                    <>
                      <div className="text-2xl">
                        <h1 className="text-3xl font-bold pb-3">
                          Fill in the blank:
                        </h1>
                        <span className="text-sm text-primary/50"></span>
                        {
                          questions[currentQuestion].question_text.split(
                            "Fill in the blank: "
                          )[1]
                        }
                      </div>
                      <div className="py-6">
                        <Input
                          className="text-xl"
                          placeholder="Enter your answer here..."
                          type="text"
                          value={fibInputText}
                          onChange={(e) => {
                            setFibInputText(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <Button
                          disabled={
                            isPaused ||
                            fibInputText === "" ||
                            fibInputText === " "
                          }
                          onClick={() => {
                            if (
                              questions[
                                currentQuestion
                              ].correct_answer.toLowerCase() ===
                              fibInputText.toLowerCase()
                            ) {
                              successToast();
                              setScore(score + 1);
                              setFibInputText("");
                            } else {
                              errorToast(questions[currentQuestion].explanation);
                              setFibInputText("");
                              setWordsUserMustReview([
                                ...wordsUserMustReview,
                                questions[currentQuestion].correct_answer,
                              ]);
                            }
                            goToNextQuestion();
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                    </>
                  )}
                {questions[currentQuestion].question_type ===
                  "true_or_false" && (
                    <>
                      <div className="text-2xl">
                        <h1 className="text-3xl font-bold pb-3">
                          True or False:
                        </h1>
                        <div className="text-2xl">
                          {
                            questions[currentQuestion].question_text.split(
                              "(True/False)"
                            )[0]
                          }
                        </div>
                      </div>
                      <div className="lg:md:sm:flex-row flex flex-col lg:md:sm:space-x-3 pt-4 lg:md:sm:w-1/2 lg:md:sm:space-y-0 space-y-2">
                        <Button
                          className="w-full"
                          onClick={() => {
                            if (
                              questions[currentQuestion].correct_answer === "True"
                            ) {
                              successToast();
                              setScore(score + 1);
                            } else {
                              errorToast(questions[currentQuestion].explanation);
                              setWordsUserMustReview([
                                ...wordsUserMustReview,
                                questions[currentQuestion].correct_answer,
                              ]);
                            }
                            goToNextQuestion();
                          }}
                        >
                          True
                        </Button>
                        <Button
                          className="w-full"
                          onClick={() => {
                            if (
                              questions[currentQuestion].correct_answer ===
                              "False"
                            ) {
                              successToast();
                              setScore(score + 1);
                            } else {
                              errorToast(questions[currentQuestion].explanation);
                              setWordsUserMustReview([
                                ...wordsUserMustReview,
                                questions[currentQuestion].correct_answer,
                              ]);
                            }
                            goToNextQuestion();
                          }}
                        >
                          False
                        </Button>
                      </div>
                    </>
                  )}
              </div>
            )}
          </>
        </>
      )}
    </div>
  );
};

export default NewLevel;
