import { OfferPartial } from '../../lib/types/offer';
import Card from '../card/card';

type Props = {
  card: OfferPartial;
};

const FavoriteCard = ({ card }: Props) => (
  <Card
    card={card}
    cardType="favorite"
    imgAttributes={{
      width: '150',
      height: '110',
    }}
  />
);

export default FavoriteCard;
