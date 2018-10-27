const utils = require('./utils')
const _ = require('lodash')
const { Map } = require('immutable')

var wordsMap = Map({});
var firstWords = []

function sentenceToWordsMap(sentence) {
    // break down sentence
    const wordArr = sentence.split(' ');
    _.each(wordArr, (item, index) => {
        // first word. we add it to custom list. also it don't have previous  word to look upto
        if (index == 0) {
            firstWords = utils.addToFirstWordsList(item, firstWords);
            wordsMap = utils.addToWordsMap(item, wordsMap);
        } else {
            var previous = wordArr[index-1];
            wordsMap = utils.addToWordsMap(item, wordsMap);

            // reikia dabar visur, kur yra listas with previous item at index 0 praeitu ir arba pridetu sita word (jei jo nera)
            // arba paincreasintu count
            // we need to avoid loops. word1 -> word2 -> word1. add some spicyness
            // add this word everywhere with count = 1 (thats what power variable is for it decreases the importance of this)

            wordsMap = utils.addWordOrIncreaseCount(previous, item, wordsMap);
        }
    }) 
}

function generateString(length) {
    var key;
    var sentence = "";

    const getRandomKey = (collection) => {
        let keys = Array.from(collection.keys());
        return keys[Math.floor(Math.random() * keys.length)];
    }    
    const getRandomValue = (list) => {
        var totalSum = _.sumBy(list, 'count');
        var rand = Math.floor(Math.random() * totalSum);
        var sum = 0;
        var randWord = undefined;
        _.each(list, item => {
            sum += item.count;
            if (sum >= rand && randWord == undefined)
             randWord = item.word;
        })
        return randWord;
    }
    key = getRandomKey(wordsMap);

    for (var i = 0; i < length; i++) {
        sentence = sentence.concat(key).concat(" ");
        var valueList = wordsMap.get(key);
        // delet this
        if (valueList == undefined) {
            console.log(key)
            console.log("kazkas negerai")
        } else {
          key = getRandomValue(valueList);
        }
    }

    return sentence;
}
