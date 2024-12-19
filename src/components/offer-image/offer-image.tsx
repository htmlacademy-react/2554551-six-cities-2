type Props = { src: string };

const OfferImage = ({ src }: Props) => (
  <div className="offer__image-wrapper">
    <img className="offer__image" src={src} alt="Photo studio" />
  </div>
);

export default OfferImage;
