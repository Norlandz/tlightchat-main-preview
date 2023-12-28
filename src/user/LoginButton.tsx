// Simple React.js User Login Authentication | Auth0 - YouTube
// https://www.youtube.com/watch?v=MqczHS3Z2bc
//
// Simple Next.js User Login Authentication | 5 Steps in 5 Minutes! | Auth0 - YouTube
// https://www.youtube.com/watch?v=jgKRnhJBfpQ

// React.js User Login and Registration with Auth0 - YouTube
// https://www.youtube.com/watch?v=pAzqscDx580

// Auth0 React SDK Quickstarts: Login
// https://auth0.com/docs/quickstart/spa/react/01-login#install-the-auth0-react-sdk

// http://localhost:5173/
// so those callback indeed need change (more need read .h

// ~/session TODO/ How To Add Login Authentication to React Applications | DigitalOcean
// ~/session TODO/ https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
// ~/session TODO/
// ~/session TODO/ The Complete Guide to React User Authentication with Auth0
// ~/session TODO/ https://auth0.com/blog/complete-guide-to-react-user-authentication/

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

export const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Button
      disabled={isAuthenticated}
      onClick={async () => {
        // // feels bit coupling
        // // Anony
        // if (!isAuthenticated && AppSessionRef.appSession.hasUserSession) {
        //   await AppSessionRef.appSession.destroy_CurrUserSession();
        //   // create will be exec later when go to that page
        // }
        await loginWithRedirect();
      }}
    >
      Log In
    </Button>
  );
};
