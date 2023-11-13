function openBlackjack() {
    window.location.href = "Blackjack/";
}

function openBrickBreaker() {
    window.location.href = "Brick_Breaker/";
}

function openTicTacToe() {
    window.location.href = "TicTacToe/";
}

function openNull() {
    alert("Nah Bro");
}

function openTravelGuide() {
    window.location.href = "../Travel_Guide";
}

window.addEventListener("message", function(event) {
    if (event.origin === "https://crookedtwig4.github.io/TravelGuide/") {
        console.log("Received data:", event.data);
    }
});
