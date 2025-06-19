// main.js
import { cards } from './cards.js';

const board = document.getElementById('game-board');
let selectedCards = [];
let matchedCards = [];

const shuffledCards = shuffle([...cards, ...cards]);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard(card, index) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.dataset.index = index;
  cardElement.innerText = "?";

  cardElement.addEventListener('click', () => handleCardClick(cardElement, card));

  return cardElement;
}

function handleCardClick(cardElement, card) {
  const index = cardElement.dataset.index;
  if (selectedCards.length < 2 && !matchedCards.includes(index) && !selectedCards.includes(index)) {
    cardElement.innerText = card.name;
    selectedCards.push(index);

    if (selectedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [firstIdx, secondIdx] = selectedCards;
  const firstCard = shuffledCards[firstIdx];
  const secondCard = shuffledCards[secondIdx];

  if (firstCard.id === secondCard.id) {
    matchedCards.push(firstIdx, secondIdx);
  } else {
    document.querySelector(`.card[data-index='${firstIdx}']`).innerText = "?";
    document.querySelector(`.card[data-index='${secondIdx}']`).innerText = "?";
  }
  selectedCards = [];
}

function initGame() {
  board.innerHTML = '';
  shuffledCards.forEach((card, index) => {
    const cardElement = createCard(card, index);
    board.appendChild(cardElement);
  });
}

initGame();
