export interface NisSlide {
  image?: string;
  video?: string;
  title?: string;
  posterImage?: string;
  alt?: string;
  thumbImage?: string;
}
export interface NisInnerSlide extends NisSlide {
  index: number;
}
