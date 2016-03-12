var elements = document.getElementsByTagName('*');

function toTitleCase(str){
    return str.replace(new RegExp('\\w+', 'g'), function(thing){
        return thing.charAt(0).toUpperCase() + thing.substr(1).toLowerCase();
    });
}

var wordsToReplace = [
    ['up', 'down'],
    ['down', 'up'],
    ['left', 'right'],
    ['right', 'left'],
    ['north', 'south'],
    ['south', 'north'],
    ['east', 'west'],
    ['west', 'east']
];

for(var i = 0; i < elements.length; i++){
    var element = elements[i];

    if(element.tagName !== "SCRIPT" && element.tagName !== "STYLE"){
        for(var j = 0; j < element.childNodes.length; j++){
            var node = element.childNodes[j];

            if(node.nodeType === 3){
                var text = node.nodeValue;
                var replacedText = text;
                var globalSearchString = '';
                for(var k = 0; k < wordsToReplace.length; k++){
                    var wordToReplace = wordsToReplace[k];
                    globalSearchString += wordToReplace[0] + '|';
                    globalSearchString += toTitleCase(wordToReplace[0]) + '|';
                }
                replacedText = replacedText.replace(new RegExp('\\b(' + globalSearchString.substring(0, globalSearchString.length - 1) + ')\\b', 'g'), 'WAIT$1WAIT');
                for(var k = 0; k < wordsToReplace.length; k++){
                    var wordToReplace = wordsToReplace[k];
                    replacedText = replacedText
                        .replace(new RegExp('WAIT' + wordToReplace[0] + 'WAIT', 'g'), wordToReplace[1])
                        .replace(new RegExp('WAIT' + toTitleCase(wordToReplace[0]) + 'WAIT', 'g'), toTitleCase(wordToReplace[1]));
                }
                if(replacedText !== text){
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }
}