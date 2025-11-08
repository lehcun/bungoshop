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
  // console.log('User: ', user?.cart);
  // console.log('User: ', user);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken) return;
    setToken(savedToken);

    fetch('http://localhost:3001/users/me', {
      headers: {
        Authorization: `Bearer ${savedToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch((err) => console.error('Error:', err));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error('Login failed');
      }

      console.log(data.access_token);

      localStorage.setItem('token', data.access_token);

      // fetch user ngay lập tức
      const profileRes = await fetch('http://localhost:3001/users/me', {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });
      const profile = await profileRes.json();

      //debug
      console.log(profile.user);
      //debug
      setUser(profile.user);
      alert('dang nhap thanh cong');
      router.push('/');
    } catch (err) {
      console.error('Login error:', err);
      alert(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
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
