import { GetServerSideProps } from 'next';

interface User {
  _id?: string;
  name: string;
  // Add other user properties here
}

interface Props {
  users: User[];
}

const HomePage: React.FC<Props> = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch(`localhost:3000/api/users`);
  const users: User[] = await res.json();

  return {
    props: {
      users,
    },
  };
};

export default HomePage;
