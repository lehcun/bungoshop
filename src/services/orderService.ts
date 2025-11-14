export const getUserOrder = async () => {
  const res = await fetch('http://localhost:3001/orders/user/history', {
    headers: {
      cache: 'no-store',
    },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch user history');

  return res.json();
};
