import BackButton from "@/components/back_button";
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useEffect } from "react";

const UserProfilePage = () => (
  <section className="pb-12">
    <UserProfile
      path="/user-profile"
      routing="path"
    />
  </section>
);

export default UserProfilePage;
