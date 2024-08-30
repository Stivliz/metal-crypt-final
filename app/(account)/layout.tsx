// account/layout.tsx
import React from 'react';

export const metadata = {
  title: 'Account',
  description: 'Manage your account settings and login',
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-100">
      <header className="bg-blue-500 text-white p-4 text-center">
        <h1>Account Management</h1>
      </header>
      <main className="flex-1 container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-blue-500 text-white p-4 text-center">
        © 2024 Your Company
      </footer>
    </div>
  );
}
