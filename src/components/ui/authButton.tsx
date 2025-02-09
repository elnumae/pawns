import React, { useEffect, useState } from "react";
import { login, logout, initAuth, getUserEmail } from "src/auth";

const AuthButton: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const loggedIn = await initAuth();
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        const email = await getUserEmail();
        setEmail(email);
      }
    }
    checkAuth();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <p>Logged in as: {email || "Loading..."}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login with Lichess</button>
      )}
    </div>
  );
};

export default AuthButton;
