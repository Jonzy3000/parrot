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
  images: [{ height: number; url: string; width: number }];
  owner: {
    name: string;
  };
  public: boolean;
}

export interface Track {
  id: string;
  uri: string;
  name: string;
  artists: CombindedArtists;
  durationMs: number;
  popularity: number;
  album: Album;
}

export interface CombindedArtists {
  combinedLabel: string;
  individualArtists: Artist[];
}

export interface Artist {
  id: string;
  url: string;
  name: string;
  images?: { height: number; url: string; width: number }[];
}

export interface Album {
  name: string;
  images: { height: number; url: string; width: number }[];
}
