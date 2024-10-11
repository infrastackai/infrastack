'use client';

import Image from "next/image";
import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserName, setNewUserName] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  };

  const addUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newUserName }),
    });
    const newUser = await response.json();
    setUsers([...users, newUser]);
    setNewUserName('');
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        <Image
          src="/logo.svg"
          alt="InfraStack.ai logo"
          width={180}
          height={180}
          priority
          className="mx-auto"
        />
        <div className="text-white space-y-2">
          <h1 className="text-2xl font-bold mb-4">infrastack.ai Next.js demo app</h1>
          <form onSubmit={addUser} className="mb-4">
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Enter user name"
              className="p-2 mr-2 text-black"
            />
            <button type="submit" className="bg-[#4F46E5] text-white p-2 rounded">Add User</button>
          </form>
          <h2 className="text-xl font-semibold mb-2">User List:</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
        <div className="text-white space-y-2">
          <p>1- Modify your .env with your own api key</p>
          <p>2- Re run the app and create some mock users</p>
          <p>3- Go to infrastack.ai dashboard to see the traces</p>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-[#4F46E5] text-white gap-2 hover:bg-[#4338CA] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://app.infrastack.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Dashboard
          </a>
          <a
            className="rounded-full border border-solid border-white/[.145] transition-colors flex items-center justify-center hover:bg-white/[.1] text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://docs.infrastack.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
    </div>
  );
}
