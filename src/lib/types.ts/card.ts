type Rating = 1 | 2 | 3 | 4 | 5;

export type SingleCard = {
  id: number;
  isPremium: boolean;
  imgPath: string;
  price: number;
  inBookmarks: boolean;
  rating: Rating;
  placeName: string;
  placeType: string;
  isFavorites?: boolean;
};
