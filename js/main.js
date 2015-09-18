(function ($, _, game) {
    var PAUSED = false;
    var createTag = function (tag) {
        return $('<' + tag + '></' + tag + '>');
    };
    var colorWord = function (word, tag) {
        var letters, letter, cword;
        cword = createTag(tag);
        letters = word.split('');
        for (var i = 0; i < letters.length; i++) {
            letter = letters[i];            
            cword.append(createTag('span').addClass(letter.toLowerCase()).text(letter));
        }
        return cword;
    };
    var getNewWord = function () {
        var words = _.filter(window.game.wordlist, function (n) {
            return n.length == window.game.wordLengthLimit;
        });
        var position = Math.floor(Math.random() * words.length);
        return colorWord(words[position], 'h1')
    };
    var showNext = function () {
        $('#gamewindow').html(getNewWord());
    };
    var timedReader = function () {
        showNext();
    };
    timedReader();

    var createAnimationLoop = function (f, ival) {
        return setInterval(f, ival * 1000);
    };
    var loop = createAnimationLoop(timedReader, 1);

    // set up the interval control
    $("#interface > span").each(function () {
        var value = parseInt($(this).text(), 10);
        $(this).empty().slider({
            value: value,
            min: 1,
            max: 10,
            step: 1,
            range: "min",
            animate: true,
            orientation: "vertical"
        });
    });

    $("#interval-control").slider("option", "min", 0.25);
    $("#interval-control").slider("option", "max", 20);
    $("#interval-control").slider("option", "step", 0.25);
    $("#interval-control").on("slidechange", function (event, ui) {
        if (!PAUSED) {
            clearInterval(loop);
            loop = createAnimationLoop(timedReader, ui.value);
            $('#interval-display').text("interval: " + ui.value);
        }
    });

    $("#length-control").slider("option", "max", 8);
    $("#length-control").on("slidechange", function (event, ui) {
        window.game.wordLengthLimit = ui.value;
        $('#length-display').text("word length: " + ui.value);

        if (!PAUSED) {
            clearInterval(loop);
            loop = createAnimationLoop(timedReader, $("#interval-control").slider("value"));
        }

    });

    $("#interface > button#pause").click(function () {
        PAUSED = true;
        clearInterval(loop);
        $(this).hide();
        $("button#next").show();
    });
    $("#interface > button#next").click(function () {
        showNext();
    });

    $(document).on('keydown', function (event) {
        if (event.which === 39 && PAUSED) {
            showNext();
            event.preventDefault();
        }
    });


/*    $('#interval_form').submit(function () {
        interval = parseFloat($('#interval').val());
        clearInterval(loop);
        loop = setInterval(timedReader, interval * 1000);
        return false;
    });*/
})(jQuery, _, game);
