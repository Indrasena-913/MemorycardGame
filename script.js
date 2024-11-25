const easyCards = ["A", "B", "A", "B", "C", "C", "D", "D"];
const mediumCards = [
	"A",
	"A",
	"B",
	"B",
	"C",
	"C",
	"D",
	"D",
	"E",
	"E",
	"F",
	"F",
	"G",
	"G",
	"H",
	"H",
];
const hardCards = [
	"A",
	"A",
	"B",
	"B",
	"C",
	"C",
	"D",
	"D",
	"E",
	"E",
	"F",
	"F",
	"G",
	"G",
	"H",
	"H",
	"I",
	"I",
	"J",
	"J",
	"K",
	"K",
	"L",
	"L",
];

let cards = [];
let flippedCards = [];
let attempts = 0;
let score = 0;
let timer;
let seconds = 0;

document.getElementById("start-game").addEventListener("click", startGame);
document.getElementById("restart-game").addEventListener("click", startGame);

function startGame() {
	resetGame();
	const difficulty = document.getElementById("difficulty").value;
	cards = getCardsForDifficulty(difficulty);
	shuffleCards();
	createCardElements();
	startTimer();
	document.getElementById("restart-game").style.display = "none";
}

function resetGame() {
	attempts = 0;
	score = 0;
	seconds = 0;
	flippedCards = [];
	document.getElementById("score").innerText = `Score: ${score}`;
	document.getElementById("timer").innerText = `Time: ${seconds}s`;
	clearInterval(timer);
	document.getElementById("game-board").innerHTML = "";
}

function getCardsForDifficulty(difficulty) {
	switch (difficulty) {
		case "easy":
			return easyCards;
		case "medium":
			return mediumCards;
		case "hard":
			return hardCards;
		default:
			return easyCards;
	}
}

function shuffleCards() {
	cards.sort(() => 0.5 - Math.random());
}

function createCardElements() {
	cards.forEach((value) => {
		const card = document.createElement("div");
		card.className = "card";
		card.setAttribute("data-value", value);
		card.addEventListener("click", flipCard);
		document.getElementById("game-board").appendChild(card);
	});
}

function startTimer() {
	timer = setInterval(() => {
		seconds++;
		document.getElementById("timer").innerText = `Time: ${seconds}s`;
	}, 1000);
}

function flipCard() {
	if (
		flippedCards.length < 2 &&
		!this.classList.contains("flipped") &&
		!this.classList.contains("matched")
	) {
		this.classList.add("flipped");
		this.innerText = this.getAttribute("data-value");
		flippedCards.push(this);

		if (flippedCards.length === 2) {
			attempts++;
			checkForMatch();
		}
	}
}

function checkForMatch() {
	const [firstCard, secondCard] = flippedCards;

	if (
		firstCard.getAttribute("data-value") ===
		secondCard.getAttribute("data-value")
	) {
		firstCard.classList.add("matched");
		secondCard.classList.add("matched");
		score += 20;
		flippedCards = [];
	} else {
		score -= 10;
		setTimeout(() => {
			firstCard.classList.remove("flipped");
			firstCard.innerText = "";
			secondCard.classList.remove("flipped");
			secondCard.innerText = "";
			flippedCards = [];
		}, 1000);
	}

	document.getElementById("score").innerText = `Score: ${score}`;

	if (document.querySelectorAll(".matched").length === cards.length) {
		clearInterval(timer);
		alert(
			`Congratulations! You completed the game in ${seconds} seconds with ${attempts} attempts. Your final score is: ${score}`
		);
		document.getElementById("restart-game").style.display = "block";
	}
}
