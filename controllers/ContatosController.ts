'use strict';
var db = require('../models')
var writer = require('../utils/writer.ts');
var ContatoSrvc = require('../services/ContatosService');

/**
 * Criar um novo contato
 *
 * body ContatoJson Dados do contato a ser criado (optional)
 * returns BasicResponse
 **/
exports.createContato = (body, userId) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        db.sequelize.transaction( (tx) => {
            return new Promise<ResponsePayload>((accept, reject) => {
                body.user_id = userId
                if (body.pessoa_id == 0) {
                    body.pessoa_id = body.pessoa.id
                }
                ContatoSrvc.createContato(body, userId, tx).then( () => {
                    accept( writer.respondWithCode(201, { message: 'Contato criado com sucesso' }) )
                }).catch( (err) => {
                    reject(err)
                })
            })
        }).then( (response) => {
            accept(response)
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}

/**
 * Excluir um contato
 *
 * id Integer Id do contato a ser excluído
 * returns BasicResponse
 **/
exports.deleteContato = (id, userId) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        ContatoSrvc.deleteContato(id, userId).then( () => {
            accept( writer.respondWithCode(200, { message: 'Contato excluído com sucesso' }) )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}

/**
 * Filtrar contatos
 *
 * page Integer 
 * returns ContatoArray
 **/
exports.filterContato = (page, search, userId) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        ContatoSrvc.filterContato(page, search, userId).then( (response) => {
            accept( writer.respondWithCode(200, response) )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}

/**
 * Encontrar um contato pelo id
 *
 * id Integer Id do contato a ser encontrado
 * returns ContatoJson
 **/
exports.findContatoById = (id, userId) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        ContatoSrvc.findContatoById(id, userId).then( (contato) => {
            accept( writer.respondWithCode(200, { contato: contato }) )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}


/**
 * Editar um contato
 *
 * body ContatoJson Dados a serem atualizados no contato (optional)
 * id Integer Id do contato a ser atualizado
 * returns BasicResponse
 **/
exports.updateContato = (body, id, userId) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        db.sequelize.transaction( (tx) => {
            return new Promise<ResponsePayload>((accept, reject) => {
                body.user_id = userId
                if (body.pessoa_id == 0) {
                    body.pessoa_id = body.pessoa.id
                }
                ContatoSrvc.updateContato(body, id, userId, tx).then( () => {
                    accept( writer.respondWithCode(200, { message: 'Contato atualizado com sucesso' }) )
                }).catch( (err) => {
                    reject(err)
                })
            })
        }).then( (response) => {
            accept(response)
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}