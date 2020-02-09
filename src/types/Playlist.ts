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
  images?: Image[];
}

export interface Album {
  name: string;
  images: Image[];
}

export interface Image {
  height: number;
  url: string;
  width: number;
}
