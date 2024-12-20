import { CARD_OPTIONS } from '../../const';
import { CardType } from '../../lib/types/card';
import { OfferPartial } from '../../lib/types/offer';
import Card from '../card/card';
import clsx from 'clsx';

type Props = {
  offers: OfferPartial[];
  cardType: CardType;
  onCardMouseOver?: (offerId: string | undefined) => void;
};

const CardList = ({ offers, cardType, onCardMouseOver }: Props) => {
  const { list, card, img } = CARD_OPTIONS[cardType];

  return (
    <div className={clsx('places__list', list)}>
      {offers.map((offer) => (
        <article
          className={clsx('place-card', card)}
          key={offer.id}
          onMouseOver={() => onCardMouseOver?.(offer.id)}
          onMouseLeave={() => onCardMouseOver?.(undefined)}
        >
          <Card
            card={offer}
            imgAttributes={{
              className: img,
              width: '260',
              height: '200',
            }}
          />
        </article>
      ))}
    </div>
  );
};

export default CardList;
