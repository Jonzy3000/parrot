import { Playlist, Track } from "./../../types/Playlist";
import axios from "axios";
import { API_CONSTANTS } from "./constants";
import { PlaylistDetails } from "../../components/playlists/redux/recommendationsRedcuer";

export const Playlists = {
  getUserPlaylists: (): Promise<Playlist[]> => {
    const url = `${API_CONSTANTS.SPOTIFY_URL}/me/playlists`;
    return axios
      .get(url)
      .then(response => response.data)
      .then(
        (
          spotifyResource: SpotifyApi.PagingObject<
            SpotifyApi.PlaylistObjectFull
          >
        ) => spotifyResource.items.map(convertToPlayist)
      );
  },
  getPlaylist: (id: string): Promise<Playlist> => {
    const url = `${API_CONSTANTS.SPOTIFY_URL}/playlists/${id}`;
    return axios
      .get(url)
      .then(response => response.data)
      .then((spotifyResource: SpotifyApi.PlaylistObjectFull) =>
        convertToPlayist(spotifyResource)
      );
  },
  createPlaylist: (
    playlistDetails: PlaylistDetails,
    tracks: Track[],
    userId: String
  ): Promise<string> => {
    return axios
      .post(`${API_CONSTANTS.SPOTIFY_URL}/users/${userId}/playlists`, {
        name: playlistDetails.name,
        public: playlistDetails.isPublic,
        description: playlistDetails.description
      })
      .then(response => response.data)
      .then(resource => resource.id)
      .then(async id => {
        const promises = chunk(tracks, 100).map(chunkedTracks =>
          axios.post(`${API_CONSTANTS.SPOTIFY_URL}/playlists/${id}/tracks`, {
            uris: chunkedTracks.map(it => it.uri)
          })
        );

        await Promise.all(promises);
        return id;
      });
  }
};

const chunk = <T>(arr: T[], len: number): T[][] => {
  var chunks = [],
    i = 0,
    n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }

  return chunks;
};

const convertToPlayist = (item: SpotifyApi.PlaylistObjectFull): Playlist => ({
  id: item.id,
  name: item.name,
  tracks: {
    url: item.tracks.href,
    total: item.tracks.total,
    items:
      item.tracks.items &&
      item.tracks.items.map(({ track }) => ({
        id: track.id,
        uri: track.uri,
        name: track.name,
        durationMs: track.duration_ms,
        popularity: track.popularity,
        album: { name: track.album.name, images: track.album.images },
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
