export type SingleCard = {
  id: number;
  isPremium: boolean;
  imgPath: string;
  price: number;
  inBookmarks: boolean;
  rating: number;
  placeName: string;
  placeType: string;
};

export type CardImgAttributes = {
  className: string;
  width: string;
  height: string;
};

export type CardType = 'offer' | 'near';

export type CardOptions = 'list' | 'card' | 'img';
