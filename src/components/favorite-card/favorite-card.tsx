import { SingleCard } from '../../lib/types/card';
import Card from '../card/card';

type Props = {
  card: SingleCard;
};

const FavoriteCard = ({ card }: Props) => (
  <article className="place-card favorites__card">
    <Card
      card={card}
      imgAttributes={{
        className: 'favorites__image-wrapper',
        width: '150',
        height: '110',
      }}
      inFavorites
    />
  </article>
);

export default FavoriteCard;
