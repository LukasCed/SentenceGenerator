// utils

const _ = require('lodash')

const wordsMapContainsWord = (word, wordsMap) => 
    wordsMap.forEach(subList => 
        _.findIndex(subList, item => 
            _.get(item, 'word') == word
        )
    )

const firstWordListContainsWord = (word, firstWords) => {
    return _.findIndex(firstWords, (item) => {item == word})
}

const wordsMapContainsWordKey = (word, wordsMap) => {
    return wordsMap.has(word);
} 

const addToWordsMap = (word, wordsMap) => {
    // check if it doesn't exist already in idnex 0
    if (wordsMapContainsWordKey(word, wordsMap)) {

    } else {
        wordsMap = wordsMap.set(word, []);
    }

    return wordsMap;
}

const addToFirstWordsList = (word, firstWords) => {
    // check if it doesn't exist already
    if (firstWordListContainsWord(word)) {

    } else {
        firstWords = firstWords.concat(word);
    }

    return firstWords;
}

const addWordOrIncreaseCount = (previous, word, wordsMap) => {
    var found = false;
    var newSubList = _.each(wordsMap.get(previous), subList => {
        if (_.isArray(subList)) {
            _.each(subList, item => {
                if (_.get(item, 'word') == word) {
                    item.count++;
                    found = true;
                }
            })
        }
        else {
            if (_.get(subList, 'word') == word) {
                subList.count++;
                found = true;
            }
        }
        return subList;
    });

    if (!found) {
        newSubList = newSubList.concat({word, count: 1})
    }
    wordsMap = wordsMap.set(previous, newSubList)

    return wordsMap;
}

module.exports = {
    addToFirstWordsList,
    wordsMapContainsWord,
    addToWordsMap,
    addWordOrIncreaseCount,
    firstWordListContainsWord
}