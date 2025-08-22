import { useLocation } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Email: {user?.email}</p>
      <p>Name: {user?.name}</p>
      <p>Category: {user?.category}</p>
    </div>
  );
};

export default Profile;
