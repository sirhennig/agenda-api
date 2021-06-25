'use strict';
var db = require('../models')
var Op = db.Sequelize.Op
var Pessoa = db.pessoa
var User = db.user
var foreach = require('../utils/foreach').foreach;
var writer = require('../utils/writer.ts');

exports.addFavorito = (id, userId, tx) => {
    return new Promise<void>((accept, reject) => {
        var options: any = {
            where: {
                id: id
            },
            transaction: tx
        }
        Pessoa.findOne(options).then( (pessoa) => {
            if (pessoa != null && pessoa != undefined) {
                options = {
                    where: {
                        id: userId
                    },
                    include: {
                        model: Pessoa,
                        required: false,
                        as: 'favoritos',
                        where: {
                            id: pessoa.id
                        }
                    },
                    transaction: tx
                }
                User.findOne(options).then( (user) => {
                    if (user.favoritos.length > 0) {
                        reject( writer.respondWithCode(409, { message: 'O contato já consta entre seus favoritos' }) )
                    } else {
                        user.addFavoritos(pessoa).then( () => {
                            accept()
                        }).catch( (err) => {
                            reject(err)
                        })
                    }
                }).catch( (err) => {
                    reject(err)
                })
            } else {
                reject( writer.respondWithCode(404, { message: 'Pessoa não encontrada' }) )
            }
        }).catch( (err) => {

        })
    });
}

exports.listFavoritos = () => {
    return new Promise<void>((accept, reject) => {
        accept();
    })
}

exports.removeFavorito = (id) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

