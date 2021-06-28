'use strict';
var db = require('../models')
var Op = db.Sequelize.Op
var User = db.user
var Pessoa = db.pessoa
var Endereco = db.endereco
var Estado = db.estado
var Cidade = db.cidade
var Pais = db.pais
var FileSrvc = require('./FileService');
var ResourceSrvc = require('./ResourcesService');
var EnderecosSrvc = require('./EnderecosService');
var ContatosSrvc = require('./ContatosService');
var foreach = require('../utils/foreach').foreach;
var writer = require('../utils/writer.ts');

exports.createPessoa = (data, userId, tx, ft) => {
    return new Promise<void>( (accept, reject) => {
        FileSrvc.saveFoto( data.foto, ft, tx ).then( (filename) => {
            data.foto = filename ?? ''
            Pessoa.create( data, { transaction: tx } ).then( (pessoa) => {
                data.endereco.pessoa_id = pessoa.id
                EnderecosSrvc.createEndereco(data.endereco, userId, tx).then( () => {
                    createContatos(data.contatos, pessoa.id, userId, tx).then( () => {
                        accept()
                    }).catch( (err) => {
                        reject(err)
                    })
                }).catch( (err) => {
                    reject(err)
                }) 
            }).catch( (err) => {
                reject(err)
            })
        }).catch( (err) => {
            reject(err)
        })
    });
}

var createContatos = (contatos, pessoaId, userId, tx) => {
    return new Promise<void>((accept, reject) => {
        foreach(contatos, (contato) => {
            return new Promise<void>((accept, reject) => {
                contato.pessoa_id = pessoaId
                contato.user_id = userId
                ContatosSrvc.createContato(contato, userId, tx).then( () => {
                    accept()
                }).catch( (err) => {
                    reject(err)
                })
            })
        }).then( () => {
            accept()
        }).catch( (err) => {
            reject(err)
        })
    })
}

exports.deletePessoa = (id, userId, tx, ft) => {
    return new Promise<void>( (accept, reject) => {
        var options: any = {
            where: {
                id: id
            },
            transaction: tx
        }
        Pessoa.findOne(options).then( (pessoa) => {
            if (pessoa != null && pessoa != undefined) {
                options.where = {
                    pessoa_id: id
                }
                User.findOne(options).then( (user) => {
                    if (user != null && user != undefined && (userId != user.id)) {
                        reject( writer.respondWithCode(401, { message: 'Você não tem permissão para fazer isso' }) )
                    } else {
                        pessoa.destroy().then( () => {
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
        })
    });
}

exports.filterPessoa = (page, search='', userId) => {
    return new Promise<object>( (accept, reject) => {
        var options: any = {
            where: {
                [Op.or]: [
                    {
                        nome: {
                            [Op.like]: `%${search.trim()}%`
                        }
                    },
                    {
                        cpf: {
                            [Op.like]: `%${search.trim()}%`
                        }
                    }
                ]
            }
        }
        Pessoa.count(options).then( (count) => {
            options.limit = 20
            options.offset = (page - 1) * 20
            options.include = {
                model: Endereco,
                include: {
                    model: Cidade,
                    include: {
                        model: Estado,
                        include: {
                            model: Pais,
                            as: 'pais'
                        }
                    }
                }
            }
            Pessoa.findAll(options).then( (results) => {
                console.log('################ ResourceSrvc')
                console.log(ResourceSrvc)
                ResourceSrvc.getFotos(results).then( (pessoas) => {
                    results = pessoas
                    accept({ totalCount: count, pessoas: results })
                }).catch( (err) => {
                    reject(err)
                })
            }).catch( (err) => {
                reject(err)
            })
        }).catch( (err) => {
            reject(err)
        })
    });
}

exports.findPessoaById = (id) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

exports.updatePessoa = (id) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}