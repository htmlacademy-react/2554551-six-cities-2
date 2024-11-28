import { SingleCard } from '../../lib/types.ts/card';
import Card from '../card/card';
import clsx from 'clsx';

type Props = {
  offers: SingleCard[];
  cardType: 'offer' | 'near';
  onCardMouseOver: (placeName: string | undefined) => void;
};

const CardList = ({ offers, cardType, onCardMouseOver }: Props) => {
  const listClassName =
    cardType === 'offer'
      ? 'cities__places-list tabs__content'
      : 'near-places__list';
  const cardClassName =
    cardType === 'offer' ? 'cities__card' : 'near-places__card';
  const imgClassName =
    cardType === 'offer'
      ? 'cities__image-wrapper'
      : 'near-places__image-wrapper';

  return (
    <div className={clsx('places__list', listClassName)}>
      {offers.map((card) => (
        <article
          className={clsx('place-card', cardClassName)}
          key={card.id}
          onMouseOver={() => onCardMouseOver(card.placeName)}
          onMouseLeave={() => onCardMouseOver(undefined)}
        >
          <Card
            card={card}
            imgAttributes={{
              className: imgClassName,
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
