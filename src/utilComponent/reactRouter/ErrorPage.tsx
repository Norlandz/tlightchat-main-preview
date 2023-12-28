// Tutorial v6.21.0 | React Router
// https://reactrouter.com/en/main/start/tutorial

// Learn React Router v6 In 45 Minutes - YouTube
// https://www.youtube.com/watch?v=Ul3y1LXxzdU

import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error ? JSON.stringify(error) :'Unknown error'}</i>
      </p>
    </div>
  );
}
