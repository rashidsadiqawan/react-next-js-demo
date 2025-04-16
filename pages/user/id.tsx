import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { useRouter } from 'next/router';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

interface UserPageProps {
  user: User;
}

const UserPage: React.FC<UserPageProps> = ({ user }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{user.name}</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users: User[] = await res.json();

  const paths = users.map(user => ({
    params: { id: user.id.toString() },
  }));

  return {
    paths,
    fallback: true, // or 'blocking' for better UX
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  if (!res.ok) {
    return { notFound: true };
  }

  const user: User = await res.json();

  return {
    props: {
      user,
    },
    revalidate: 60, // ISR: re-generate every 60s
  };
};

export default UserPage;
