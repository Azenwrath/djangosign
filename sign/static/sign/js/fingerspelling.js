"use strict";

// Primary Word List interaction. This object takes an array of practice words as its argument.
let WordList = function (wordlist) {
    this.wordlist = wordlist;
    this.newWord = function () {
        this.currentWord = this.wordlist[Math.floor(Math.random()*this.wordlist.length)];
    };
    this.currentWord = "hello"; // First word is always 'Hello'
};

let Letter = function (element) {
    this.elem = element;
    this.changeLetter = function (letter) {
        this.elem.style.backgroundImage = 'url(/static/sign/img/' + letter.toLowerCase() + '.gif)';
    };
    this.blankLetter = function () {
        this.elem.style.backgroundImage = null;
    };
};

let SignGame = function (startSpeed, letter, wordlist) {
    this.currentSpeed = startSpeed;
    this.letter = letter;
    this.wordlist = wordlist;
    this.play = function () {
        let word = this.wordlist.currentWord;
        let i = 0;
        let countdown = setInterval(function () {
            console.log("Showing letter: " + word[i]);
            if (word[i]) {letter.changeLetter(word[i])};
            i++;
            if (i > word.length) {
                clearInterval(countdown);
                letter.blankLetter();
            }
            }, this.currentSpeed);
    };
    this.speedUp = function () {
        if (this.currentSpeed > 100) {this.currentSpeed -= 100;}
        else {
        console.log('Reached maximum speed.'); // TODO: Add scaling speed logic
    }
    };
    this.slowDown = function () {
        this.currentSpeed += 100;
    }

};

let sign_window = new Letter(document.getElementById('sign-window'));
let currentList = new WordList(wordlist);

const game = new SignGame(1000, sign_window, currentList);



document.getElementById('replay').addEventListener("click", function () {
    game.play();
});

document.getElementById('new-word').addEventListener("click", function () {
    game.wordlist.newWord();
});

document.getElementById('faster').addEventListener("click", function () {
    game.speedUp();
});

document.getElementById('slower').addEventListener("click", function () {
    game.slowDown();
});


function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    let list = preloadImages.list;
    for (let i = 0; i < array.length; i++) {
        let img = new Image();
        img.onload = function() {
            let index = list.indexOf(this);
            // if (index !== -1) {
            list.splice(index, 1);
            // }
        }
        list.push(img);
        img.src = array[i];
    }
}

const alphabet = "abcdefghijklmnopqrstuvwxyz";
let imageList = [];
for (const i in alphabet) {
    const letterUrl = '/static/sign/img/' + alphabet[i] + ".gif";
    imageList.push(letterUrl);
};

preloadImages(imageList);
