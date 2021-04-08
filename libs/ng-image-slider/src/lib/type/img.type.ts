export interface NisImage {
  image?: string;
  video?: string;
  title?: string;
  posterImage?: string;
  alt?: string;
}
export interface NisInnerImage extends NisImage {
  index: number;
}
