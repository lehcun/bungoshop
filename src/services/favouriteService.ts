export const getUserFavourites = async (token: string | null) => {
  const res = await fetch('http://localhost:3001/favourite', {
    headers: {
      Authorization: `Bearer ${token}`,
      cache: 'no-store',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch user history');

  return res.json();
};
