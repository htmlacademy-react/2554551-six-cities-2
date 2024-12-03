import { CARD_OPTIONS } from '../../const';
import { CardType, SingleCard } from '../../lib/types.ts/card';
import Card from '../card/card';
import clsx from 'clsx';

type Props = {
  offers: SingleCard[];
  cardType: CardType;
  onCardMouseOver: (placeName: string | undefined) => void;
};

const CardList = ({ offers, cardType, onCardMouseOver }: Props) => {
  const { list, card, img } = CARD_OPTIONS[cardType];

  return (
    <div className={clsx('places__list', list)}>
      {offers.map((cardItem) => (
        <article
          className={clsx('place-card', card)}
          key={cardItem.id}
          onMouseOver={() => onCardMouseOver(cardItem.placeName)}
          onMouseLeave={() => onCardMouseOver(undefined)}
        >
          <Card
            card={cardItem}
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
