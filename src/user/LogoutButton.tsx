import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

export const LogoutButton = () => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <Button disabled={!isAuthenticated} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </Button>
  );
};
