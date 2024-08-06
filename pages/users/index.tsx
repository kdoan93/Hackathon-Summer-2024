import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';

type Data = {
  name: string;
  email: string;
};

const Users = () => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    fetch('/api/getData')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Users collection from sample_mflix db</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name} - {item.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
