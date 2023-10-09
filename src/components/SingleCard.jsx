import "./single-card.css";

function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) handleChoice(card);
  };

  return (
    <div className={`card ${flipped ? "flipped" : ""}`}>
      <img
        src={card.src}
        className="card__side card__side--front"
        alt="Parte da frente do cartão"
      />

      <img
        src="/img/cover-1.png"
        className="card__side card__side--back"
        alt="Parte de trás do cartão"
        onClick={handleClick}
      />
    </div>
  );
}

export default SingleCard;
