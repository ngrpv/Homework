fs = require('fs');
var fileName = process.argv[2];
var pattern = process.argv[3];

try {
    fs.statSync(fileName);
} catch (err) {
    if (err.code === 'ENOENT') {
        console.log('file does not exists')
        process.exit();
    }
}

var inputText = fs.readFileSync(fileName);
inputText = inputText.toString();
function isMatched(substring, pattern){
    for(var i = 0; i < pattern.length;i++){
        if(pattern[i] != substring[i])
            return false;
    }
    return true;
}
function findSubstring_BruteForce(pattern, text) {
    var indexArray = new Array();
    var patternLength = pattern.length;
    var textLength = text.length;
    for (var i = 0; i <= textLength - patternLength; i++) {
        var flag = false;
        if (isMatched(text.substring(i,i+patternLength), pattern))
            indexArray.push(i + 1);
    }
    return indexArray;
}

function findSubstring_Hash(pattern, text) {
    var indexArray = new Array();
    var patternLength = pattern.length;
    var textLength = text.length;
    var patternHash = 0;
    var substringHash = 0;
    for (var i = 0; i < patternLength; i++) {
        patternHash += pattern.charCodeAt(i);
        substringHash += text.charCodeAt(i);
    }
    for (var i = 0; i <= textLength - patternLength; i++) {
        if(patternHash==substringHash)
            if(isMatched(text.substring(i,i+patternLength),pattern))
                indexArray.push(i+1);
        substringHash -= text.charCodeAt(i);
        substringHash += text.charCodeAt(i+patternLength);
    }
    return indexArray;
}

function calcExecTime(func, arg1, arg2, countOfIteration){
    var start = (new Date()).getTime();
    for(var i = 0; i<countOfIteration;i++) {
        func(arg1,arg2);
    }
    var end = (new Date()).getTime();
    return (end-start)/countOfIteration;
}

console.log(findSubstring_BruteForce(pattern, inputText));
console.log(calcExecTime(findSubstring_BruteForce,pattern,inputText,1000));



console.log(findSubstring_Hash(pattern,inputText));
console.log(calcExecTime(findSubstring_Hash,pattern,inputText,1000));
