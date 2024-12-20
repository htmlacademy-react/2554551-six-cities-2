import { CARD_OPTIONS } from '../../const';
import { CardType } from '../../lib/types/card';
import { SingleOffer } from '../../lib/types/offer';
import Card from '../card/card';
import clsx from 'clsx';

type Props = {
  offers: SingleOffer[];
  cardType: CardType;
  onCardMouseOver?: (placeName: string | undefined) => void;
};

const CardList = ({ offers, cardType, onCardMouseOver }: Props) => {
  const { list, card, img } = CARD_OPTIONS[cardType];

  const handleMouseAction = (placeName: string | undefined) => {
    if (onCardMouseOver) {
      onCardMouseOver(placeName);
    }
  };

  return (
    <div className={clsx('places__list', list)}>
      {offers.map((cardItem) => (
        <article
          className={clsx('place-card', card)}
          key={cardItem.id}
          onMouseOver={() => handleMouseAction(cardItem.title)}
          onMouseLeave={() => handleMouseAction(undefined)}
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
