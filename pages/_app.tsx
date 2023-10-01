import { ClerkLoaded, ClerkLoading, ClerkProvider, SignedIn } from "@clerk/nextjs";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Loader } from "lucide-react";
import Navbar from "@/components/navbar";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import NextNProgress from 'nextjs-progressbar';
import { League_Spartan } from "@next/font/google"
import GeminoDictionary from "@/components/gemino-dictionary";
import { Analytics } from '@vercel/analytics/react';
const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ['400', '500']
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ClerkProvider {...pageProps}>
      <NextNProgress
        color="#FBBF24"
      />
      <ClerkLoaded>
        <main className={`${router.pathname.startsWith("/sign-") === false && "max-w-5xl  mx-auto lg:md:sm:px-8 px-2"} ${leagueSpartan.className}`}>
          {router.pathname.startsWith("/class") === false && (<GeminoDictionary />)}
          <span
            className={
              router.pathname.startsWith("/sign-in") ||
                router.pathname.startsWith("/sign-up")
                || router.pathname.startsWith("/404")
                ? "hidden"
                : ""
            }
          >
            <Navbar />
          </span>
          <Component {...pageProps} />
        </main>
      </ClerkLoaded>
      <ClerkLoading>
        <main className="flex h-screen justify-center items-center">
          <Loader className="animate-spin" />
        </main>
      </ClerkLoading>
      <Toaster />
      <Analytics />
    </ClerkProvider>
  );
}
