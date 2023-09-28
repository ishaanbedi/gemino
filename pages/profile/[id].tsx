import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  BadgeInfo,
  CalendarDays,
  Target,
  Trophy,
  Gem,
  Plus,
  UserPlus2,
  Siren,
  User,
  Loader,
  AlertTriangle,
} from "lucide-react";
const fetcher = async (url: string) => {
  const response = await axios.get(`${url}`);
  return response.data;
};
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import axios from "axios";
const ProfilePage = (props: GetServerSideProps & { selfUser: boolean }) => {
  const clerkUser = useUser();
  const router = useRouter();
  const { id } = router.query;
  const { data: profile, error } = useSWR(
    "/api/getUserProfile?username=" + id,
    fetcher
  );

  useEffect(() => {
    if (error) {
      console.error("Error fetching user profile:", error);
      if (error.response && error.response.status === 404) {
        router.push("/404?username=" + id);
      }
    }
  }, [error, router, id]);

  if (!clerkUser) {
    return (
      <section>
        <h1>Not Logged In</h1>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="flex justify-center items-center h-[82.5vh]">
        <h1>
          <Loader className="animate-spin" />
        </h1>
      </section>
    );
  }

  return (
    <section className="py-4">
      <Profile user={profile} selfUser={props.selfUser} />
    </section>
  );
};

export default ProfilePage;

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProfileProps {
  user: {
    user_id: number;
    signup_username: string;
    overall_points: number;
    streak: number;
    current_level: number;
    words_user_must_revise: string;
    created_at: string;
    email_address: string;
    id: string;
    image_url: string;
    last_name: string;
    profile_image_url: string;
    first_name: string;
  };
  selfUser: boolean;
}

const Profile = ({ user, selfUser }: ProfileProps) => {
  const dateJoined = new Date(Number(user.created_at));
  const dateToday = new Date();

  function dateDifferenceInWords(date1: Date, date2: Date) {
    const MS_PER_DAY = 24 * 60 * 60 * 1000;

    const differenceInMilliseconds =
      Date.parse(date2.toISOString()) - Date.parse(date1.toISOString());

    const differenceInDays = Math.floor(differenceInMilliseconds / MS_PER_DAY);

    if (differenceInDays === 0) {
      return "today";
    } else if (differenceInDays === 1) {
      return "yesterday";
    } else if (differenceInDays > 1 && differenceInDays <= 7) {
      return `${differenceInDays} days ago`;
    } else if (differenceInDays > 7 && differenceInDays <= 14) {
      return "1 week ago";
    } else if (differenceInDays > 14 && differenceInDays <= 30) {
      return `2 weeks ago`;
    } else if (differenceInDays > 30 && differenceInDays <= 60) {
      return "1 month ago";
    } else if (differenceInDays > 60 && differenceInDays <= 365) {
      const monthsAgo = Math.floor(differenceInDays / 30);
      return `${monthsAgo} months ago`;
    } else {
      const yearsAgo = Math.floor(differenceInDays / 365);
      return `${yearsAgo} years ago`;
    }
  }

  const dateJoinedInWords = dateDifferenceInWords(dateJoined, dateToday);
  const router = useRouter();
  const clerkUser = useUser();
  return (
    <section>

      <div className="flex justify-center pt-12">
        <Card className="p-4 w-full rounded-lg shadow-lg">
          <div className="flex justify-between lg:md:sm:flex-row-reverse flex-col">
            <Avatar className="w-32 h-32 rounded-full border-4 p-1 border-stone-200">
              <AvatarImage
                className="rounded-full"
                src={`${selfUser ? clerkUser.user?.imageUrl : user.image_url}`} />
              <AvatarFallback>
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>


            <div className="mt-4">
              <h1 className="text-2xl font-semibold">@{user.signup_username}</h1>
              <p className="text-primary/70">Joined {dateJoinedInWords}!</p>
              <div className="my-4 flex lg:md:sm:flex-row flex-col lg:md:sm:space-x-2 lg:md:sm:space-y-0 space-y-2">
                {!selfUser && (
                  <>
                    <Dialog>
                      <DialogTrigger>
                        <Button className="w-full " variant={"secondary"}>
                          <Siren className="w-5 h-5 mr-2" />
                          Report @{user.signup_username}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-center">
                            Are you sure?
                          </DialogTitle>
                          <DialogDescription className="text-center">
                            If you report this user, we will review their account
                            activity and take action if necessary.
                          </DialogDescription>
                        </DialogHeader>
                        <Button
                          onClick={async () => {
                            try {
                              await axios.post("/api/postReport", {
                                who: router.query.id,
                              });
                              alert("User reported!");
                            } catch (error) {
                              alert("Error reporting user!");
                            }
                          }}
                          className=""
                          variant={"secondary"}
                        >
                          Report
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
                {selfUser && (
                  <>
                    <Button onClick={() => router.push("/user-profile")}>
                      <UserPlus2 className="w-5 h-5 mr-2" />
                      Edit Profile
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="grid lg:md:sm:grid-cols-2 grid-cols-1 gap-4">
              <StatCard
                title="Streak"
                content={String(user.streak)}
                icon={<CalendarDays />}
              />
              <StatCard
                title="Gemino Points"
                content={String(user.overall_points)}
                icon={<Gem />}
              />
              <StatCard
                title="Current Level"
                content={String(user.current_level)}
                icon={<Target />}
              />
              <StatCard
                title="Gemino Tag"
                content={String(getCurrentTag(user.current_level))}
                icon={<Trophy />}
              />
            </div>
          </div>
        </Card>
      </div>
    </section>

  );
};

const getCurrentTag = (level: number) => {
  switch (level) {
    case 1 - 10:
      return "Explorer";
    case 11 - 20:
      return "Samurai";
    case 21 - 30:
      return "Ninja";
    case 31 - 40:
      return "Sensei";
    case 41 - 50:
      return "Master";
    case 51 - 60:
      return "Legend";
    case 61 - 70:
      return "Immortal";
    case 71 - 80:
      return "God";
    case 81 - 90:
      return "Titan";
    case 91 - 100:
      return "Living Legend";
    default:
      return "Explorer";
  }
};

const StatCard = ({
  title,
  content,
  icon,
}: {
  title: string;
  content: string | null;
  icon: any;
}) => {
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row items-center justify-between text-stone-400">
              <div className="flex items-center space-x-2">
                <span>{title}</span>
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

import { GetServerSideProps } from "next";
import { getAuth, buildClerkProps } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const usernameGot = ctx.query.id;
  const { userId } = await getAuth(ctx.req);
  const user = userId ? await clerkClient.users.getUser(userId) : null;

  if (!user) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  if (usernameGot === user?.username) {
    return {
      props: {
        selfUser: true,
      },
    };
  }

  return {
    props: {
      selfUser: false,
    },
  };
};
