
const canvas = document.getElementById('blackjackCanvas');
const ctx = canvas.getContext('2d');

const cardWidth = 80;
const cardHeight = 120;
const playerHand = [];
const dealerHand = [];
let showDealerCards = false;

function drawCard(x, y, color, value) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, cardWidth, cardHeight);

    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, cardWidth, cardHeight);

    ctx.fillStyle = color;
    ctx.font = '20px Arial';
    ctx.fillText(value, x + 10, y + 30);
}
function dealCards() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before dealing new cards

    playerHand.length = 0; // Clear the previous player hand
    dealerHand.length = 0; // Clear the previous dealer hand

    let x = 50;
    let y = 50;

    playerHand.push(getRandomCard());
    playerHand.push(getRandomCard());
    dealerHand.push(getRandomCard());
    dealerHand.push(getRandomCard());

    for (let i = 0; i < playerHand.length; i++) {
        drawCard(x, 250, 'blue', playerHand[i]);
        x += 100;
    }

    x = 50;
    y = 50;
    for (let i = 0; i < dealerHand.length; i++) {
        drawCard(x, y, 'red', dealerHand[i]);
        x += 100;
    }
}

function getRandomCard() {
    const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    return cards[Math.floor(Math.random() * cards.length)];
}

function hitMe() {
    playerHand.push(getRandomCard());
    redrawHands();
    checkPlayerBust();
}

function stand() {
    showDealerCards = true;
    document.getElementById('standButton').style.display = 'none';
    document.getElementById('Title').style.marginTop = 150+'px';
    redrawHands();
    dealerTurn();
}

function checkPlayerBust() {
    const playerTotal = calculateHandValue(playerHand);
    if (playerTotal > 21) {
        showDealerCards = true;
        document.getElementById('standButton').style.display = 'none';
        document.getElementById('Title').style.marginTop = 150+'px';
        endGame('Player Busts! Dealer Wins!', playerTotal, calculateHandValue(dealerHand));
    }
}


function checkDealerBust() {
    const dealerTotal = calculateHandValue(dealerHand);
    if (dealerTotal > 21) {
        endGame('Dealer Busts! Player Wins!', calculateHandValue(playerHand), dealerTotal);
    }
}

function dealerTurn() {
    const playerTotal = calculateHandValue(playerHand);
    if (playerTotal <= 21) {
        while (calculateHandValue(dealerHand) < 17) {
            dealerHand.push(getRandomCard());
            redrawHands();
        }
        checkDealerBust();
        determineWinner();
    } else {
        determineWinner();
    }
}

function calculateHandValue(hand) {
    let sum = 0;
    let aceCount = 0;
    for (let card of hand) {
        if (card === 'A') {
            aceCount++;
            sum += 11;
        } else if (card === 'K' || card === 'Q' || card === 'J') {
            sum += 10;
        } else {
            sum += parseInt(card);
        }
    }
    while (sum > 21 && aceCount > 0) {
        sum -= 10;
        aceCount--;
    }
    return sum;
}

function determineWinner() {
    const playerTotal = calculateHandValue(playerHand);
    const dealerTotal = calculateHandValue(dealerHand);
    if (dealerTotal > 21) {
        endGame('Player Wins! Dealer Busts', playerTotal, dealerTotal);
    } else if (playerTotal > 21) {
        endGame('Dealer Wins! Player Busts', playerTotal, dealerTotal);
    } else if (playerTotal > dealerTotal) {
        endGame('Player Wins!', playerTotal, dealerTotal);
    } else if (dealerTotal > playerTotal) {
        endGame('Dealer Wins!', playerTotal, dealerTotal);
    } else {
        endGame('It\'s a Tie!', playerTotal, dealerTotal);
    }
}

function endGame(result, playerTotal, dealerTotal) {
    const scoreText = document.getElementById('scoreText');
    scoreText.innerText = `${playerTotal} - ${dealerTotal}`;
    scoreText.style.display = 'block';

    const resultText = document.getElementById('resultText');
    resultText.innerText = result;

    const endingScreen = document.getElementById('endingScreen');
    endingScreen.style.display = 'block';

    const hitButton = document.getElementById('hitButton');
    hitButton.style.display = 'none';

    const dealButton = document.getElementById('dealButton');
    dealButton.style.display = 'none';
    
    document.getElementById('standButton').style.display = 'none';
}

function resetGame() {
    playerHand.length = 0;
    dealerHand.length = 0;
    showDealerCards = false;
    document.getElementById('endingScreen').style.display = 'none';
    document.getElementById('hitButton').style.display = 'inline';
    document.getElementById('standButton').style.display = 'inline';
    document.getElementById('scoreText').style.display = 'none';
    document.getElementById('Title').style.marginTop = 100+'px';
    dealCards();
    redrawHands();
}

function redrawHands() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let x = 50;
    let y = 250;

    for (let i = 0; i < playerHand.length; i++) {
        drawCard(x, y, 'blue', playerHand[i]);
        x += 100;
    }

    x = 50;
    y = 50;
    if (showDealerCards) {
        for (let i = 0; i < dealerHand.length; i++) {
            drawCard(x, y, 'red', dealerHand[i]);
            x += 100;
        }
    } else {
        drawCard(x, y, 'red', 'X');
        x += 100;
        for (let i = 1; i < dealerHand.length; i++) {
            drawCard(x, y, 'red', dealerHand[i]);
            x += 100;
        }
    }
}

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    resetGame();
    redrawHands();
}

function goToMainMenu() {
    window.location.href = "gameHub.html";
}
