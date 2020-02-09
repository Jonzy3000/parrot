import { Track } from "./Track";
import { Image } from "./Image";

export interface Playlist {
  name: string;
  id: string;
  tracks: {
    url: string;
    total: number;
    items?: Track[];
    page: {
      next?: string;
      previous?: string;
    };
  };
  images: Image[];
  owner: {
    name?: string;
  };
  public: boolean;
}
