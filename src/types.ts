export type SingleCard = {
  isPremium: boolean;
  imgPath: string;
  price: number;
  inBookmarks: boolean;
  rating: 1 | 2 | 3 | 4 | 5;
  placeName: string;
  placeType: string;
};
