import { Image } from "./Image";
export interface Artist {
  id: string;
  url: string;
  name: string;
  images?: Image[];
}
