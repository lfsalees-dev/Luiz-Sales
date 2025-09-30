
export type AspectRatio = '1:1' | '16:9' | '9:16';

export interface GenerationOptions {
  count: number;
  aspectRatio: AspectRatio;
}

export interface GeneratedImage {
  theme: string;
  url: string;
  filename: string;
}
