import { SpotifyPlaylistResourceWithTracks } from "./../../types/SpotifyPlaylistsResource";
import { Playlist } from "./../../types/Playlist";
import axios from "axios";
import { API_CONSTANTS } from "./constants";
import { SpotifyPlaylistsResource } from "../../types/SpotifyPlaylistsResource";

export const Playlists = {
  getUserPlaylists: (): Promise<Playlist[]> => {
    const url = `${API_CONSTANTS.SPOTIFY_URL}/me/playlists`;
    return axios
      .get(url)
      .then(response => response.data)
      .then((spotifyResource: SpotifyPlaylistsResource) =>
        spotifyResource.items.map(convertToPlayist)
      );
  },
  getPlaylist: (id: string): Promise<Playlist> => {
    const url = `${API_CONSTANTS.SPOTIFY_URL}/playlists/${id}`;
    return axios
      .get(url)
      .then(response => response.data)
      .then((spotifyResource: SpotifyPlaylistResourceWithTracks) =>
        convertToPlayist(spotifyResource)
      );
  }
};

const convertToPlayist = (
  item: SpotifyPlaylistResourceWithTracks
): Playlist => ({
  id: item.id,
  name: item.name,
  tracks: {
    url: item.tracks.href,
    total: item.tracks.total,
    items:
      item.tracks.items &&
      item.tracks.items.map(({ track }) => ({
        id: track.id,
        name: track.name,
        durationMs: track.duration_ms,
        popularity: track.popularity,
        album: { name: track.album.name },
        artists: {
          combinedLabel: track.artists.map(artist => artist.name).join(", "),
          individualArtists: track.artists.map(artist => ({
            id: artist.id,
            url: artist.href,
            name: artist.name
          }))
        }
      })),
    page: {
      next: item.tracks.next,
      previous: item.tracks.previous
    }
  },
  images: item.images,
  owner: {
    name: item.owner.display_name
  },
  public: item.public
});
