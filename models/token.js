(function() {
    'use strict';

    const mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    const Schema = mongoose.Schema;

    const tokenSchema = new Schema({
        'accessToken': {'type': String, 'required': [true, 'can\'t be blank']},
        'UUID': {'type': String, 'required': [true, 'can\'t be blank']},
    }, {
        versionKey: false,
        timestamps: true,
        collection: 'token',
    });

    const TokenModel = mongoose.model('token', tokenSchema);

    module.exports = TokenModel;

})();

