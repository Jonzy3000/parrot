import { Artist } from "./../../types/Artist";
import { Track } from "./../../types/Track";
import axios from "axios";
import { API_CONSTANTS } from "./constants";

const SEARCH_URL = `${API_CONSTANTS.SPOTIFY_URL}/search`;

export const Search = {
  forArtistsAndTracks: (
    query: string,
    limit: number
  ): Promise<{ artists: Artist[]; tracks: Track[] }> => {
    return axios
      .get(SEARCH_URL, {
        params: {
          q: query,
          type: "artist,track",
          limit
        }
      })
      .then(response => response.data)
      .then((resource: SpotifyApi.SearchResponse) => ({
        artists:
          resource.artists?.items.map(artist => ({
            id: artist.id,
            url: artist.uri,
            name: artist.name,
            images: artist.images
          })) || [],
        tracks:
          resource.tracks?.items.map(track => ({
            id: track.id,
            uri: track.uri,
            name: track.name,
            durationMs: track.duration_ms,
            popularity: track.popularity,
            album: {
              name: track.album.name,
              images: track.album.images
            },
            artists: {
              combinedLabel: track.artists
                .map(artist => artist.name)
                .join(", "),
              individualArtists: track.artists.map(artist => ({
                id: artist.id,
                url: artist.href,
                name: artist.name
              }))
            }
          })) || []
      }));
  }
};
