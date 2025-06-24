// JsMemo.js
import { cards_e, cards_h, cards_m } from './cards.js';

const board = document.getElementById('game-board');
let selectedCards = [];
let matchedCards = [];
let shuffledCards = []; // ✅ richtig – später wird es mit den gewählten Karten befüllt

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

  const idDiff = Math.abs(firstCard.id - secondCard.id);
if (idDiff === 15) {  
    matchedCards.push(firstIdx, secondIdx);
  } else {
    document.querySelector(`.card[data-index='${firstIdx}']`).innerText = "?";
    document.querySelector(`.card[data-index='${secondIdx}']`).innerText = "?";
  }
  selectedCards = [];
}

function showDifficultySelection() {
  const container = document.createElement('div');
  container.innerHTML = `
    <h2>Select Difficulty</h2>
    <button id="easy">Easy</button>
    <button id="medium">Medium</button>
    <button id="hard">Hard</button>
  `;
  document.body.insertBefore(container, board);

  document.getElementById('easy').addEventListener('click', () => startGame(cards_e));
  document.getElementById('medium').addEventListener('click', () => startGame(cards_m));
  document.getElementById('hard').addEventListener('click', () => startGame(cards_h));
}

function startGame(cardSet) {
  document.body.querySelector('div').remove(); // remove difficulty selector
  board.innerHTML = '';
  selectedCards = [];
  matchedCards = [];
  shuffledCards = shuffle([...cardSet]);
  shuffledCards.forEach((card, index) => {
    const cardElement = createCard(card, index);
    board.appendChild(cardElement);
  });
}

showDifficultySelection();
