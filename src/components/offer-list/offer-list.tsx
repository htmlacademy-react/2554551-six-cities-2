/* eslint-disable arrow-body-style */
// import { useState } from 'react';
import { SingleCard } from '../../lib/types.ts/card';
import Card from '../card/card';

type Props = { offers: SingleCard[] };

const OfferList = ({ offers }: Props) => {
  // закомментила, т. к. линтер ругается
  // const [activeCard, setActiveCard] = useState<number | undefined>();

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          isPremium={card.isPremium}
          imgPath={card.imgPath}
          price={card.price}
          inBookmarks={card.inBookmarks}
          rating={card.rating}
          placeName={card.placeName}
          placeType={card.placeType}
        />
      ))}
    </div>
  );
};

export default OfferList;
