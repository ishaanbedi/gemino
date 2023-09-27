import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: [
    "/api/getRecord",
    "/api/webhook",
    "/api/userImageUpdateWebhook",
    "/api/getStats",
    "/api/updateUserRecord",
    "/404",
    "/home",
    "/sign-in",
    "/sign-up",
    "/"
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
