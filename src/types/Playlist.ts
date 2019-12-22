export interface Playlist {
  name: string;
  id: string;
  tracks: {
    url: string;
    total: number;
  };
  images: [{ height: number; url: string; width: number }];
  owner: {
    name: string;
  };
  public: boolean;
}
