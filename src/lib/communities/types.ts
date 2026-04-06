export interface Video {
  id: string;
  title: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  url: string;
  tag?: string;
}

export interface Community {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  youtubeChannel: string;
  youtubeHandle: string;
  storeUrl: string;
  storeName: string;
  videos: Video[];
  products: Product[];
  colors: {
    primary: string;
    dark: string;
    darker: string;
    accent: string;
    gradientFrom: string;
    gradientTo: string;
  };
}
