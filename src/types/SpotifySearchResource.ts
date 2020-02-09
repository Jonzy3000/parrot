import { SpotifyImage } from "./SpotifyImage";

export interface SpotifySearchResource {
  artists: {
    href: string;
    items: {
      external_urls: {
        spotify: string;
      };
      followers: {
        href: null;
        total: number;
      };
      genres: string[];
      href: string;
      id: string;
      images: SpotifyImage[];
      name: string;
      popularity: number;
      type: string;
      uri: string;
    }[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
  };
  tracks: {
    href: string;
    items: [
      {
        album: {
          album_type: string;
          artists: [
            {
              external_urls: {
                spotify: string;
              };
              href: string;
              id: string;
              name: string;
              type: string;
              uri: string;
            }
          ];
          available_markets: string[];
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          images: SpotifyImage[];
          name: string;
          release_date: string;
          release_date_precision: string;
          total_tracks: number;
          type: string;
          uri: string;
        };
        artists: [
          {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          },
          {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }
        ];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: true;
        external_ids: {
          isrc: string;
        };
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        is_local: false;
        name: string;
        popularity: number;
        preview_url: null;
        track_number: number;
        type: string;
        uri: string;
      }
    ];
    limit: number;
    next: string;
    offset: 0;
    previous: null;
    total: number;
  };
}
