const uniqueRandom = require('./random');

module.exports = array => {
    const random = uniqueRandom(0, array.length - 1);
    return array[random()];
};