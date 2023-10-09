import { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard.jsx";
import "./App.css";

const cardImages = [
  { src: "/img/gean-sampaio-1.png", matched: false },
  { src: "/img/anielle-franco-1.png", matched: false },
  { src: "/img/ledo-vaccaro-1.jpg", matched: false },
  { src: "/img/jussara-hoffmann-1.jpg", matched: false },
  { src: "/img/lavinia-rocha-1.png", matched: false },
  { src: "/img/carlos-libaneo-1.jpeg", matched: false },
  { src: "/img/rafael-belli-1.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isNewGameButtonClicked, setIsNewGameButtonClicked] = useState(false);

  useEffect(() => {
    if (isNewGameButtonClicked) {
      const intervalId = setInterval(
        () => setTimer((prevTimer) => prevTimer - 1),
        1000,
      );

      const allMatched = cards.every((card) => card.matched === true);

      if (allMatched) {
        setTimer(timer);
        setIsNewGameButtonClicked(false);
      }

      if (timer === 0) {
        setTimer(0);
        setIsNewGameButtonClicked(false);
      }

      return () => clearInterval(intervalId);
    }
  }, [timer, isNewGameButtonClicked]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevState) => {
          return prevState.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setTimer(30);
    setIsNewGameButtonClicked(true);
  };

  const handleChoice = (card) => {
    if (card.id === choiceOne?.id) return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevState) => prevState + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <nav>
        <img src="/img/logo.png" alt="" />
        <h1>JOGO DA MEMÓRIA 🧠</h1>
        <button onClick={shuffleCards}>Novo jogo</button>
      </nav>

      <p>⏱️ 00:{timer < 10 ? `0${timer}` : timer} segundos</p>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={timer === 0 || disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
