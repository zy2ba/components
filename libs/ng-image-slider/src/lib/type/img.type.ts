export interface NisImage {
  image?: string;
  video?: string;
  title?: string;
}
export interface NisInnerImage extends NisImage {
  index: number;
}
