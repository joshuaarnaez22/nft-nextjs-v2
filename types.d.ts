export interface Image {
  asset: {
    url: string;
  };
}

export interface Slug {
  current: string;
}

export interface Creator {
  _id: string;
  name: string;
  address: string;
  slug: Slug;
}

export interface Collection {
  _id: string;
  creator: Creator;
  slug: Slug;
  title: string;
  address: string;
  previewImage: Image;
  mainImage: Image;
  nftCollectionName: string;
  description: string;
}
