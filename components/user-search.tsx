import React, { useEffect, useState, ChangeEvent } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserSearch: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data: User[] = await res.json();
      setUsers(data);
      setFilteredUsers(data);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const results = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(results);
  }, [search, users]);
useEffect(() => {
  const delayDebounce = setTimeout(() => {
    const results = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(results);
  }, 300); // 300ms delay

  return () => clearTimeout(delayDebounce);
}, [search, users]);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>User Search</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={handleSearch}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li
              key={user.id}
              style={{
                padding: '1rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                marginBottom: '0.75rem',
              }}
            >
              <strong>{user.name}</strong> – {user.email}
            </li>
          ))
        ) : (
          <li>No users found.</li>
        )}
      </ul>
    </div>
  );
};

export default UserSearch;
