import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { Sparkles as BotButton } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SignOutButton } from "@clerk/nextjs";
import { League_Spartan } from "@next/font/google"
const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ['400', '700']
})
const Navbar = () => {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  return (
    <nav className="flex justify-between items-center py-4">
      <div>
        <h1 className="text-2xl font-black">
          <Link
            className={leagueSpartan.className} href="/">gemino.</Link>
        </h1>
      </div>
      {isSignedIn && (<>{isSignedIn && (
        <div className="flex items-center space-x-3">
          <Button
            className="font-semibold"
            onClick={() => router.push("/class")}>Classroom</Button>
          <Popover>
            <PopoverTrigger>
              <Button>
                <BotButton
                  size={18}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col space-y-2">
              <Button variant={"outline"} className="font-semibold w-full" onClick={() => router.push("/chat")}>Chat with Bob</Button>
              <Button variant={"outline"} className="font-semibold w-full" onClick={() => router.push("/flashcards")}>AI Powered Flashcards</Button>
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="p-0.5 ring-2 dark:ring-stone-100 ring-stone-600 border-transparent focus:border-transparent focus:ring-0 rounded-full">
                <UserButton />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>@{user?.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  router.push(`/profile/${user?.username}`);
                }}
              >
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  router.push(`/support?user=${user?.username}`);
                }}
              >
                Support
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  router.push(`/terms`);
                }}
              >
                Terms
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  router.push(`/privacy`);
                }}
              >
                Privacy
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  router.push(`/home`);
                }}
              >
                Home Page
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <SignOutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}</>)}

      {!isSignedIn && (
        <div className="flex items-center space-x-3">
          <Button
            className="font-semibold"
            onClick={() => router.push("/sign-in")}>
            Sign In
          </Button>
          <Button
            className="font-semibold"
            onClick={() => router.push("/sign-up")}>
            Sign Up
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
