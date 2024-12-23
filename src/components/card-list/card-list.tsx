import { CARD_OPTIONS } from '../../const';
import { CardType } from '../../lib/types/card';
import { OfferPartial } from '../../lib/types/offer';
import Card from '../card/card';
import clsx from 'clsx';

type Props = {
  offers: OfferPartial[];
  cardType: CardType;
};

const CardList = ({ offers, cardType }: Props) => {
  const { listClass } = CARD_OPTIONS[cardType];

  return (
    <div className={clsx('places__list', listClass)}>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          card={offer}
          cardType={cardType}
          imgAttributes={{
            width: '260',
            height: '200',
          }}
        />
      ))}
    </div>
  );
};

export default CardList;
