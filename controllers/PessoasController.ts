'use strict';
var writer = require('../utils/writer.ts');
var PessoaSrvc = require('../services/PessoasService');
var TransactionSrvc = require('../services/TransactionService');

/**
 * Criar uma nova pessoa
 *
 * returns BasicResponse
 **/
exports.createPessoa = (body, files, loggedUser) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        TransactionSrvc.transaction( (tx, ft) => {
            return new Promise<ResponsePayload>((accept, reject) => {
                var data = JSON.parse(body.pessoa)
                data.foto = files[0]
                PessoaSrvc.createPessoa(data, loggedUser, tx, ft).then( () => {
                    accept( writer.respondWithCode( 201, { message: 'Pessoa criada com sucesso' }) )
                }).catch( (err) => {
                    reject(err)
                })
            })
        }).then( (response) => {
            accept( response )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}


/**
 * Excluir uma pessoa
 *
 * id Integer Id da pessoa a ser excluída
 * returns BasicResponse
 **/
exports.deletePessoa = (id, loggedUser) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        TransactionSrvc.transaction( (tx, ft) => {
            return new Promise<ResponsePayload>((accept, reject) => {
                PessoaSrvc.deletePessoa(id, loggedUser, tx, ft).then( () => {
                    accept( writer.respondWithCode( 200, { message: 'Pessoa excluída com sucesso' }) )
                }).catch( (err) => {
                    reject(err)
                })
            })
        }).then( (response) => {
            accept( response )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}


/**
 * Filtrar pessoas
 *
 * page Integer
 * search String
 * returns PessoaArray
 **/
exports.filterPessoa = (page, search, loggedUser) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        PessoaSrvc.filterPessoa(page, search, loggedUser).then( (response) => {
            accept( writer.respondWithCode(200, response) )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}


/**
 * Encontrar uma pessoa pelo id
 *
 * id Integer Id da pessoa a ser encontrada
 * returns PessoaJson
 **/
exports.findPessoaById = (id, loggedUser) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        PessoaSrvc.findPessoaById(id, loggedUser).then( (pessoa) => {
            accept( writer.respondWithCode(200, { pessoa: pessoa }) )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}


/**
 * Editar uma pessoa
 *
 * id Integer Id da pessoa a ser atualizada
 * returns BasicResponse
 **/
exports.updatePessoa = (body, files, id, loggedUser) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        TransactionSrvc.transaction( (tx, ft) => {
            return new Promise<ResponsePayload>((accept, reject) => {
                var data = JSON.parse(body.pessoa)
                data.foto = files[0] ?? null
                PessoaSrvc.updatePessoa(data, id, loggedUser, tx, ft).then( () => {
                    accept( writer.respondWithCode( 201, { message: 'Pessoa atualizada com sucesso' }) )
                }).catch( (err) => {
                    reject(err)
                })
            })
        }).then( (response) => {
            accept( response )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}

