export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  avatarUrl: string;
  bio: string;
  createdAt: string;
  updatedAt: string;

  // relations
  //   cart         CartItem[]
  //   orders       Order[]
  //   reviews      Review[]
  //   favorites    Favorite[]
  //   addresses    Address[]
  //   payments     Payment[]
}
