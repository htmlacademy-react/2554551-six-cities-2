import { SingleCard } from '../../lib/types.ts/card';
import OfferCard from '../offer-card/offer-card';

type Props = {
  offers: SingleCard[];
  onCardMouseOver: (placeName: string | undefined) => void;
};

const OfferList = ({ offers, onCardMouseOver }: Props) => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((card) => (
      <OfferCard key={card.id} card={card} onCardMouseOver={onCardMouseOver} />
    ))}
  </div>
);

export default OfferList;
