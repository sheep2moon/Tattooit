import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "../common/button";
import InnerLink from "../common/link";

const UserProfile = () => {
  const session = useSession();
  return (
    <div>
      {session.data?.user && (
        <div>
          <p>{session.data.user.name}</p>
        </div>
      )}
      {!session.data?.user && (
        <div>
          <InnerLink href="/auth/signin">Login</InnerLink>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
