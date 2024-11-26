import { SingleCard } from '../../lib/types.ts/card';
import Card from '../card/card';

type Props = {
  card: SingleCard;
  onCardMouseOver: (placeName: string | undefined) => void;
};

const OfferCard = ({ card, onCardMouseOver }: Props) => (
  <article
    className="place-card cities__card"
    onMouseOver={() => onCardMouseOver(card.placeName)}
    onMouseLeave={() => onCardMouseOver(undefined)}
  >
    <Card card={card} />
  </article>
);

export default OfferCard;
