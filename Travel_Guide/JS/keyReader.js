
var keyArray = [];
var exceptionKeys = ["Alt","Backspace","Control","Delete","Escape","Enter","Meta","Shift","Tab","ArrowRight","ArrowLeft","ArrowUp","ArrowDown"];
var Passwords = [["user","",""],["Nathan","W","Gillespie"],["Camden","J","Bradshaw"]];

document.addEventListener('keydown', function(event) {

    var validKey = true;
    for( var keyIndex = 0; keyIndex < exceptionKeys.length; keyIndex++) {
        if(event.key == exceptionKeys[keyIndex]) {
            validKey = false;
        }
    }
    if(validKey == true) {
        keyArray.push(""+event.key);
    }
    for (var passwordIndex = 0; passwordIndex < Passwords.length; passwordIndex ++) {
        if(keyArray.join("").includes(Passwords[passwordIndex][0]) && keyArray.join("").includes(Passwords[passwordIndex][1]) && keyArray.join("").includes(Passwords[passwordIndex][2])) {
            authenticated();
        }
    }
});

function authenticated() {
    window.location.href = "https://crookedtwig4.github.io/Travel_Guide/Game_Hub";
}
