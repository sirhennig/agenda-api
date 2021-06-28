'use strict';
var db = require('../models')
var writer = require('../utils/writer.ts');
var FavoritoSrvc = require('../services/FavoritosService');

/**
 * Adicionar um contato aos favoritos
 *
 * id Integer Id da pessoa a ser adicionada aos favoritos
 * returns BasicResponse
 **/
exports.addFavorito = (id, userId) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        db.sequelize.transaction( (tx) => {
            return new Promise<ResponsePayload>((accept, reject) => {
                FavoritoSrvc.addFavorito(id, userId, tx).then( () => {
                    accept( writer.respondWithCode(200, { message: 'Contato adicionado aos seus favoritos' }) )
                }).catch( (err) => {
                    reject(err)
                })
            })
        }).then( (response: ResponsePayload) => {
            accept(response)
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}


/**
 * Listar contatos favoritos do usuário logado
 *
 * returns FavoritoArray
 **/
exports.listFavoritos = () => {
    return new Promise<ResponsePayload>((accept, reject) => {
        accept( writer.respondWithCode(501) )
    });
}


/**
 * Remover um contato dos favoritos
 *
 * id Integer Id da pessoa a ser removida dos favoritos
 * returns BasicResponse
 **/
exports.removeFavorito = (id, userId) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        db.sequelize.transaction( (tx) => {
            return new Promise<ResponsePayload>((accept, reject) => {
                FavoritoSrvc.removeFavorito(id, userId, tx).then( () => {
                    accept( writer.respondWithCode(200, { message: 'Contato removido dos seus favoritos' }) )
                }).catch( (err) => {
                    reject(err)
                })
            })
        }).then( (response: ResponsePayload) => {
            accept(response)
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}

