export interface User {
  id: string;
  name?: string;
  profileImage: {
    url?: string;
  };
}

export interface UserState extends User {
  isLoading: boolean;
}
