var elements = document.getElementsByTagName('*');

var wordsToReplace = [
    ['up', 'down'],
    ['down', 'up'],
    ['left', 'right'],
    ['right', 'left'],
    ['north', 'south'],
    ['south', 'north'],
    ['east', 'west'],
    ['west', 'east'],
    ['Up', 'Down'],
    ['Down', 'Up'],
    ['Left', 'Right'],
    ['Right', 'Left'],
    ['North', 'South'],
    ['South', 'North'],
    ['East', 'West'],
    ['West', 'East']
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
                }
                replacedText = replacedText
                    .replace(new RegExp('([^A-Za-z])+(' + globalSearchString.substring(0, globalSearchString.length - 1) + ')([^A-Za-z])+', 'g'), '$1WAIT$2WAIT$3')
                    .replace(new RegExp('^(' + globalSearchString.substring(0, globalSearchString.length - 1) + ')([^A-Za-z])+', 'g'), 'WAIT$1WAIT$2')
                    .replace(new RegExp('([^A-Za-z])+(' + globalSearchString.substring(0, globalSearchString.length - 1) + ')$', 'g'), '$1WAIT$2WAIT')
                    .replace(new RegExp('^(' + globalSearchString.substring(0, globalSearchString.length - 1) + ')$', 'g'), 'WAIT$1WAIT');
                for(var k = 0; k < wordsToReplace.length; k++){
                    var wordToReplace = wordsToReplace[k];
                    replacedText = replacedText
                        .replace(new RegExp('WAIT' + wordToReplace[0] + 'WAIT', 'g'), wordToReplace[1]);
                }
                if(replacedText !== text){
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }
}