import { SingleOffer } from '../../lib/types/offer';
import Card from '../card/card';

type Props = {
  card: SingleOffer;
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
