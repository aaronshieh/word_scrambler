$(document).ready(function () {
    main();
});

function main() {
    var word = "";
    var guesses = [];
    let letters = $('#letters');
    let btn = $('#btnScramble');
    let btnClear = $('#btnClear');
    let btnReset = $('#btnReset');
    var resultDiv = $('#resultDiv');

    letters.on("keyup", function () {
        letters.val(letters.val().toUpperCase());
    });

    btnClear.on("click", function () {
        clearResultDiv();
    });

    btnReset.on("click", function () {
        reset();
    });

    btn.on("click", function () {
        if (word !== letters.val()) {
            word = letters.val();
            reset();
            letters.val(word);
        }

        let charArray = letters.val().split('');
        let totalPossibilities = factorial(charArray.length);
        while (guesses.length < totalPossibilities) {
            let resultArray = shuffleArray(charArray);
            let resultWord = resultArray.join('');
            if (guesses.indexOf(resultWord) === -1) {
                guesses.push(resultWord);
                resultDiv.append('<p>');
                resultArray.forEach((value, index) => {
                    resultDiv.append(`<span>${value}</span>`);
                })
                resultDiv.append('</p>');
                return;
            }
        }

        alert('no more possiblities');
    });

    function clearResultDiv() {
        resultDiv.empty();
    }

    function reset() {
        letters.val(undefined);
        guesses = [];
        clearResultDiv();
    }
}

function factorial(num) {
    if (num === 0 || num === 1) {
        return 1;
    }
    return num * factorial(num - 1);
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
