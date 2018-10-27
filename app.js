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

            wordsMap = utils.addWordOrIncreaseCount(previous, item, wordsMap);
        }
    }) 
}

function generateString(length) {
        
}
