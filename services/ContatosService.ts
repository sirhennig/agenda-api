'use strict';
var db = require('../models')
var Op = db.Sequelize.Op
var Contato = db.contato
var writer = require('../utils/writer.ts');

exports.createContato = (data, userId, tx) => {
    return new Promise<void>((accept, reject) => {
        Contato.create(data, { transaction: tx }).then( () => {
            accept()
        }).catch( (err) => {
            reject(err)
        })
    });
}

exports.deleteContato = (id) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

exports.filterContato = (page) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

exports.findContatoById = (id) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

exports.updateContato = (body,id) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

