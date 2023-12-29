import { Auth0ContextInterface, User, useAuth0 } from '@auth0/auth0-react';
import { AppSessionRef } from '../../session/AppSession';

export const useAuth0_debugDomain = (): Auth0ContextInterface<User> => {
  const auth0ContextInterface = useAuth0();
                                                        
  if (AppSessionRef.appSession.debugConfig.app_T2) {
    return {
      isAuthenticated: false,
      isLoading: false,
      error: undefined,
      user: undefined,
      loginWithRedirect:            async () => { throw new TypeError(); },
      getAccessTokenSilently:       async () => { throw new TypeError(); },
      getAccessTokenWithPopup:      async () => { throw new TypeError(); },
      getIdTokenClaims:             async () => { throw new TypeError(); },
      loginWithPopup:               async () => { throw new TypeError(); },
      logout:                       async () => { throw new TypeError(); },
      handleRedirectCallback:       async () => { throw new TypeError(); },
    };                   
  } else {
    return auth0ContextInterface;
  }
};
