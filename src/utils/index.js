const {pick} = require("lodash");

const getInfoData = (data, keys) => {
    return pick(data, keys);
}

module.exports = {
    getInfoData
}