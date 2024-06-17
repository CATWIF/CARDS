var errors = 0;
var cardList = [
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
]

var cardSet;
var board = [];
var rows = 4; // Set rows to 4
var columns = 5; // Set columns to 5

var card1Selected;
var card2Selected;

window.onload = function() {
    shuffleCards();
    startGame();
}

function shuffleCards() {
    cardSet = cardList.concat(cardList); // two of each card
    console.log(cardSet);
    // shuffle
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); // get random index
        // swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame() {
    // arrange the board 4x5
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg); // JS

            let card = document.createElement("div");
            card.id = r.toString() + "-" + c.toString();
            card.classList.add("card");
            card.addEventListener("click", selectCard);

            let cardInner = document.createElement("div");
            cardInner.classList.add("card-inner");

            let cardFront = document.createElement("div");
            cardFront.classList.add("card-front");

            let cardBack = document.createElement("div");
            cardBack.classList.add("card-back");
            cardBack.style.backgroundImage = "url('" + cardImg + ".jpg')";

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }

    console.log(board);
    setTimeout(hideCards, 1000);
}

function hideCards() {
    let cards = document.querySelectorAll(".card-inner");
    cards.forEach(card => {
        card.classList.remove("flipped");
    });
}

function selectCard() {
    let cardInner = this.querySelector(".card-inner");
    if (!cardInner.classList.contains("flipped")) {
        if (!card1Selected) {
            card1Selected = this;
            cardInner.classList.add("flipped");
        } else if (!card2Selected && this != card1Selected) {
            card2Selected = this;
            cardInner.classList.add("flipped");
            setTimeout(update, 1000);
        }
    }
}

function update() {
    if (card1Selected.querySelector(".card-back").style.backgroundImage != card2Selected.querySelector(".card-back").style.backgroundImage) {
        card1Selected.querySelector(".card-inner").classList.remove("flipped");
        card2Selected.querySelector(".card-inner").classList.remove("flipped");
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }

    card1Selected = null;
    card2Selected = null;
}
