const Token = require('../models/tokens');

module.exports.createToken = (params) => {
    return new Token(params).save();
};

module.exports.getToken = (query) => {
    return Token.findOne(query).lean().exec();
};

module.exports.getTokens = (query) => {
    return Token.find(query).lean().exec();
};

module.exports.getAllTokens = () => {
    return Token.findOne({}, { 'TokenID': 1, '_id': 0 }, { sort: { 'createdAt': -1 } }).lean().exec();
};

module.exports.updateToken = (query, data) => {
    return Token.updateOne(query, data).exec();
};
module.exports.updateOneToken = (query) => {
    return Token.update(query).exec();
};
module.exports.deleteToken = (query) => {
    return Token.deleteOne(query).exec();
};
