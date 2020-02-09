import { API_CONSTANTS } from "./constants";
import axios from "axios";
import { User } from "../../types/User";

const userUrl = `${API_CONSTANTS.SPOTIFY_URL}/me`;

export const UserProfile = Object.freeze({
  getCurrentUserProfile: (): Promise<User> => {
    return axios
      .get(userUrl)
      .then(response => response.data)
      .then((spotifyUser: SpotifyApi.CurrentUsersProfileResponse) => ({
        name: spotifyUser.display_name,
        id: spotifyUser.id,
        profileImage: {
          url: spotifyUser.images?.[0].url
        }
      }));
  }
});
