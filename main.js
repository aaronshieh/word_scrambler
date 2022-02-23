$(document).ready(function () {
    main();
});

function main() {
    var word = "";
    var guesses = [];
    let letters = $('#letters');
    let btn = $('#btnScramble');
    let btnReset = $('#btnReset');

    letters.on("keyup", function() {
       letters.val(letters.val().toUpperCase());
    });

    btnReset.on("click", function() {
       reset();
    });

    btn.on("click", function() {
        if (word !== letters.val()) {
            word = letters.val();
            reset();
            letters.val(word);
        }

        let charArray = letters.val().split('');
        let totalPossibilities = factorial(charArray.length);
        while (guesses.length < totalPossibilities) {
            let result = scramble(charArray);
            if (guesses.indexOf(result) === -1) {
                guesses.push(result);
                $('#resultDiv').append(`<p>${result}</p>`);
                return;
            }
        }

        alert('no more possiblities');
    });

    function reset() {
        letters.val(undefined);
        guesses = [];
        $('#resultDiv').empty();
    }
}

function factorial(num) {
    if (num === 0 || num === 1) {
        return 1;
    }
    return num * factorial(num - 1);
}

function scramble(letters) {
    let shuffledArray = shuffleArray(letters);
    return shuffledArray.join('');
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
