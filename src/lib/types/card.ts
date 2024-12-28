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
  width: string;
  height: string;
};

export type CardType = 'offer' | 'near' | 'favorite';

export type CardOptions = 'listClass' | 'cardClass' | 'imgClass';
