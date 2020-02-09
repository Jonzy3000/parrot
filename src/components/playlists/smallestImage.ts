import { Image } from "../../types/Image";
export const smallestImage = (images: Image[]) => {
  return images.sort((a, b) => (a.height || 0) - (b.height || 0))[0];
};
