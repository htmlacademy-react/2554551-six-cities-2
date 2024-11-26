import { SingleCard } from '../../lib/types.ts/card';
import Card from '../card/card';

type Props = {
  card: SingleCard;
};

const FavoriteCard = ({ card }: Props) => (
  <article className="place-card favorites__card">
    <Card card={card} inFavorites />
  </article>
);

export default FavoriteCard;
