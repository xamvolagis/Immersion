/*jslint browser: true*/
/*global $, jQuery*/
(function ($) {
    $(document);
}(jQuery));

/*
function isLink(curNode) { //checks if an object is inside a link
    while (curNode) {
        if (curNode.tagName === 'a') {
            return true;
        } else {
            curNode = curNode.parentNode;
        }
    }
    return   false;
}
*/

/* isolate plaintext from paragraphs */
function isolatePlaintext() {
    var $curNode = $(this);
    $curNode.wrapInner("<span text=\"plaintext\"></span>");
    $curNode.html($curNode.html()
        .replace(/(<a)/g, "</span>$1")
        .replace(/(\/a>)/g, "$1<span text=\"plaintext\">"));
}

/* separate plaintext into words */
function separateText() {
    var $curNode = $(this);
    $curNode.html($curNode.text().replace(/\b(\w+)\b/g, "<span text=\"word\">$1</span>"));
}

/* get user preferences from */
var origin = "la";
var dest = "rus";
var frequency = "0.6";

/*translates a word asynchronously using Glosbe API*/
function translate(wordToTranslate, origin, destination) {
    $.getJSON("http://glosbe.com/gapi/translate?from=" + origin + "&dest=" + destination + "&format=json&phrase=" + wordToTranslate.text() + "&pretty=true&callback=?", function (json) {
        if (json !== "Nothing found.") {
            if (json.tuc !== null && json.tuc.length !== 0 && json.tuc[0].phrase !== null) {
                // alert("phrase " + json.tuc[0].phrase.text);
                wordToTranslate.attr("translation", json.tuc[0].phrase.text);
                wordToTranslate.attr("original", wordToTranslate.text())
                    .css('color', 'blue')
                    .text(wordToTranslate.attr("translation"))
                    .attr("language", "translated");
            }
        }
    }).done(function () {
        console.log('success', arguments);
    }).fail(function () {
        console.log('failure', arguments);
    });
}

/* switches the display language of a word*/
function changeState(wordToChange) {
    var $wordToChange = $(wordToChange);
    if ($wordToChange.attr("language") === "original") {
        $wordToChange.css('color', 'blue')
            .text($wordToChange.attr("translation"))
            .attr("language", "translated");
    } else {
        $wordToChange.css('color', 'blue')
            .text($wordToChange.attr("original"))
            .attr("language", "original");
    }
}

$(document).ready($("p").each(isolatePlaintext));

$("span[text=\"plaintext\"]").each(separateText);

$("span[text=\"word\"]").each(
    function () {
        if (Math.random() < frequency) {
            var $this = $(this);
            translate($this, origin, dest);
        }
    }
);


/* translate word on hover, mark word on click*/
$(document).on("mouseenter", "span[translation]",
    function () {
        changeState($(this));
    }
).on("mouseleave", "span[translation]",
    function () {
        changeState($(this));
    }
).on("click", "span[translation]",
    function () {
        var $this = $(this);
        if ($this.attr("language") === "original") {
            $this.css('color', 'blue')
                .attr("language", "translated");
        } else {
            $this.css('color', 'blue')
                .attr("language", "original");
        }
    }
);
