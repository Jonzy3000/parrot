import { Album } from "./Album";
import { CombindedArtists } from "./CombindedArtists";
export interface Track {
  id: string;
  uri: string;
  name: string;
  artists: CombindedArtists;
  durationMs: number;
  album: Album;
}
