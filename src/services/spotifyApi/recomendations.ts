import { API_CONSTANTS } from "./constants";
import { Artist } from "./../../types/Artist";
import { Track } from "./../../types/Track";
import axios from "axios";
import queryString from "query-string";

interface SpotifyRecommendationQuery {
  limit: number;
  seed_artists: string[];
  seed_tracks: string[];
}

const RECOMMENDATIONS_URL = `${API_CONSTANTS.SPOTIFY_URL}/recommendations`;

export const Recommendations = {
  getReccomendations: (
    artists: Artist[],
    tracks: Track[]
  ): Promise<Track[]> => {
    // normal way
    const query: SpotifyRecommendationQuery = {
      limit: 100,
      seed_artists: artists.map(it => it.id),
      seed_tracks: tracks.map(it => it.id)
    };

    return axios
      .get(
        `${RECOMMENDATIONS_URL}?${queryString.stringify(query, {
          arrayFormat: "comma"
        })}`
      )
      .then(response => response.data)
      .then((resource: { tracks: SpotifyApi.TrackObjectFull[] }) =>
        resource.tracks.map(track => ({
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
            combinedLabel: track.artists.map(artist => artist.name).join(", "),
            individualArtists: track.artists.map(artist => ({
              id: artist.id,
              url: artist.href,
              name: artist.name
            }))
          }
        }))
      );
  }
};
