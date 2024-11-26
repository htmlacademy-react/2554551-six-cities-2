/* eslint-disable arrow-body-style */
// import { useState } from 'react';
import { SingleCard } from '../../lib/types.ts/card';
import OfferCard from '../offer/offer-card';

type Props = {
  offers: SingleCard[];
  onCardMouseOver: (placeName: string | undefined) => void;
};

const OfferList = ({ offers, onCardMouseOver }: Props) => {
  // закомментила, т. к. линтер ругается
  // const [activeCard, setActiveCard] = useState<number | undefined>();

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((card) => (
        <OfferCard
          key={card.id}
          card={card}
          onCardMouseOver={onCardMouseOver}
        />
      ))}
    </div>
  );
};

export default OfferList;
