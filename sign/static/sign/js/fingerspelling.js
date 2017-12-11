console.log('Successfully loaded Fingerspelling module');
"use strict";


Array.prototype.sample = function () {
    return this[Math.floor(Math.random()*this.length)];
};

let currentWord = wordlist.sample(); //TODO: Make this an object
let currentSpeed = 1000;

let changeLetter = function (letter) {
    var elem = document.getElementById("sign-window");
    // elem.style.background = url('/static/sign/img/b.gif');
    elem.style.backgroundImage = 'url(/static/sign/img/' + letter.toLowerCase() + '.gif)';
    console.log('Changing sign');
};

let blankLetter = function () {
    document.getElementById("sign-window").style.backgroundImage = null;
};



let play = function (word, interval) {
    let i = 0;
    let countdown = setInterval(function () {
        console.log("timed out on " + word[i]);
        if (word[i]) {changeLetter(word[i])};
        i++;
        if (i > word.length) {
            clearInterval(countdown);
            blankLetter();
        }
        }, interval);
};


document.getElementById('replay').addEventListener("click", function () {
    play(currentWord, currentSpeed);
});

document.getElementById('new-word').addEventListener("click", function () {
    currentWord = wordlist.sample();
});

document.getElementById('faster').addEventListener("click", function () {
    if (currentSpeed > 100) {
    currentSpeed -= 100;}
    else {
        console.log('Reached maximum speed.'); // TODO: Add scaling speed logic
    }
});

document.getElementById('slower').addEventListener("click", function () {
    currentSpeed += 100;
});

// Example precache function from Stack Overflow for later. TODO: Implement
// function preloadImages(array) {
//     if (!preloadImages.list) {
//         preloadImages.list = [];
//     }
//     var list = preloadImages.list;
//     for (var i = 0; i < array.length; i++) {
//         var img = new Image();
//         img.onload = function() {
//             var index = list.indexOf(this);
//             if (index !== -1) {
//                 // remove image from the array once it's loaded
//                 // for memory consumption reasons
//                 list.splice(index, 1);
//             }
//         }
//         list.push(img);
//         img.src = array[i];
//     }
// }
//
// preloadImages(["url1.jpg", "url2.jpg", "url3.jpg"]);
