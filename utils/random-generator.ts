var fs = require('fs')
var TransactionSrvc = require('../services/TransactionService');
var PessoaSrvc = require('../services/PessoasService');
var foreach = require('./foreach').foreach;
var createValidCpf = require('./validate-cpf').createValidCpf

module.exports.createRandomPessoas = () => {
    TransactionSrvc.transaction( (tx, ft) => {
        return new Promise<void>( (accept, reject) => {
            var indexes = []
            for(var i = 0; i < 10000; i++) {
                indexes.push(i)
            }
            foreach(indexes, (index) => {
                return new Promise<void>( (accept, reject) => {
                    createValidCpf(tx).then( (validCpf) => {
                        var pessoa: any = {
                            nome: "Teste " + index,
                            cpf: validCpf,
                            data_nascimento: "01/01/2000",
                            endereco: {
                                complemento: "Sala 195",
                                numero: "471",
                                bairro: "Centro",
                                logradouro: "R. Osvaldo Aranha",
                                cep: "95700-000",
                                cidade_id: 4649
                            },
                            contatos: [
                                {
                                    valor:"+5554987654321",
                                    publico: false,
                                    contato_tipo_id: 1,
                                    contato_categoria_id: 1
                                },{
                                    valor:"teste" + index + "@gmail.com",
                                    publico: true,
                                    contato_tipo_id: 3,
                                    contato_categoria_id: 1
                                }
                            ]
                        }
                        var profilePicturePathAndName = process.env.DEFAULT_PROFILE_PICTURE
                        fs.readFile(profilePicturePathAndName, (err, data) => {
                            if (err != null && err != undefined) {
                                reject(err)
                            } else {
                                pessoa.foto = {
                                    buffer: data,
                                    mimetype: 'image/' + profilePicturePathAndName.split('.')[profilePicturePathAndName.split('.').length - 1]
                                }
                                PessoaSrvc.createPessoa(pessoa, 1, tx, ft).then( () => {
                                    accept()
                                }).catch( (err) => {
                                    reject(err)
                                })
                            }
                        })
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
    }).then( () => {
        console.log('Pessoas adicionadas com sucesso')
    }).catch( (err) => {
        console.log('################### err')
        console.log(err)
    })
}