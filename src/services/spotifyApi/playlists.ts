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
        spotifyResource.items.map(item => ({
          id: item.id,
          name: item.name,
          tracks: {
            url: item.tracks.href,
            total: item.tracks.total
          },
          images: item.images,
          owner: {
            name: item.owner.display_name
          },
          public: item.public
        }))
      );
  }
};
