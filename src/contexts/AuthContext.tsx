'use client';

import { User } from '@/models/User';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  token: string | null;
  serverError: 'username' | 'email' | 'password' | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [serverError, setServerError] = useState<
    'username' | 'email' | 'password' | null
  >(null);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:3001/users/me', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => console.error('Error:', err));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        // Tùy chọn này là BẮT BUỘC để cookie được gửi và nhận (cần CORS trên server)
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      const data = await res.json();
      console.log(data);
      setUser(data.user);
      router.push('/');
    } catch (err) {
      console.error('Login error:', err);
      alert(err);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch('http://localhost:3001/auth/logout', {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Logout failed');
    } catch (err) {
      console.error('Logout err: ', err);
    }
    setUser(null);
    router.push('/');
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!res.ok) {
        if (res.status === 409) {
          setServerError('email');
        } else if (res.status === 494) {
          setServerError('password');
        }
        const error = await res.json();
        throw new Error(error.message || 'Đăng ký thất bại');
      }

      const data = await res.json();
      localStorage.setItem('token', data.access_token);

      const profileRes = await fetch('http://localhost:3001/users/me', {
        headers: { Authorization: `Bearer ${data.access_token}` },
      });

      const profile = await profileRes.json();
      setUser(profile);
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, serverError, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//Custom hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
