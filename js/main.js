(function ($, game) {
    var timedReader = function () {
        var gamewindow, word, letters, coloredWord;
        gamewindow = $('#gamewindow');
        word = game.wordlist[Math.floor(Math.random() * game.wordlist.length)];
        letters = word.split('');
        coloredWord = $('<h1></h1>');
        for (var i = 0; i < letters.length; i++) {
            var span, letter;
            span = $('<span></span>');
            letter = letters[i];
            span.addClass(letter);
            span.text(letter);
            coloredWord.append(span);
        }
        gamewindow.html(coloredWord);
    };
    timedReader();
    var interval = 3;
    var loop = setInterval(timedReader, interval * 1000);
    $('#interval_form').submit(function () {
        interval = parseFloat($('#interval').val());
        console.log(interval);
        clearInterval(loop);
        loop = setInterval(timedReader, interval * 1000);
        return false;
    });
})(jQuery, game);
