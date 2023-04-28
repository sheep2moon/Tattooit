import React from "react";
import { Button } from "../../components/common/button";
import { signIn, signOut, useSession } from "next-auth/react";

const Signin = () => {
  const session = useSession();

  return (
    <div className="h-app flex flex-col items-center justify-center gap-4">
      {session.data?.user ? (
        <div>
          <Button onClick={() => void signOut()}>Wyloguj się</Button>
        </div>
      ) : (
        <>
          <div>
            <Button onClick={() => void signIn("discord")}>
              Login with discord
            </Button>
          </div>
          <div>
            <Button onClick={() => void signIn("google")}>
              Login with google
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Signin;
