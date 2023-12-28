import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import { useAuth0_debugDomain } from '../utilComponent/auth0/useAuth0_debugDomain';

// Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.eslint(react-refresh/only-export-components)
// underscore in component name ? ... 
export const UserProfileSimple = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth0_debugDomain();

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading ...</div>;
  if (!isAuthenticated) return <div>Not authenticated</div>;
  if (user == null) throw new TypeError();

  return (
    <div>
      {user.email}
    </div>
  );
};

export const UserProfileSelf = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading ...</div>;
  if (!isAuthenticated) return <div>Not authenticated</div>;
  if (user == null) throw new TypeError();

  return (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <div>
        {Object.entries(user).map(([key, value]) => (
          <div key={key}>
            {key}: {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export const UserProfileOthers: React.FC = () => {
  const [count_rst, setCount_rst] = React.useState(1);

  const { userId } = useParams();

  React.useEffect(() => {}, []);

  return (
    <>
      <div>UserProfileOthers Page: {userId}</div>
    </>
  );
};

