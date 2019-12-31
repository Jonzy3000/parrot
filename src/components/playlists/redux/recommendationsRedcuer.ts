import { Recommendations } from "./../../../services/spotifyApi/recomendations";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Track, Artist } from "../../../types/Playlist";

export interface PlaylistDetails {
  name: string;
  description?: string;
  isPublic: boolean;
}

export interface RecommendationsState {
  playlistDetails: PlaylistDetails;
  tracks?: Track[];
}

const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState: {} as RecommendationsState,
  reducers: {
    storeTracks: (
      state: RecommendationsState,
      action: PayloadAction<Track[]>
    ) => {
      state.tracks = action.payload;
    },
    storeRecommendationPlaylistDetails: (
      state: RecommendationsState,
      action: PayloadAction<PlaylistDetails>
    ) => {
      state.playlistDetails = action.payload;
      state.tracks = undefined;
    }
  }
});

const fetchRecommendations = ({
  artists,
  tracks
}: {
  artists: Artist[];
  tracks: Track[];
}) => (dispatch: Dispatch) => {
  Recommendations.getReccomendations(artists, tracks)
    .then(storeTracks)
    .then(dispatch);
};

export default recommendationsSlice.reducer;

const {
  storeTracks,
  storeRecommendationPlaylistDetails
} = recommendationsSlice.actions;

export {
  storeTracks,
  storeRecommendationPlaylistDetails,
  fetchRecommendations
};
