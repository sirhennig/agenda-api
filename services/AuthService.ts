'use strict';
var db = require('../models')
var User = db.user
var Role = db.role
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var writer = require('../utils/writer.ts');

var login = (req) => {
    return new Promise<string>( (accept, reject) => {
        extractUserAndPassFromReq(req).then( (credentials) => {
            var username = credentials[0]
            var password = credentials[1]
            var where = {
                username: username
            }
            User.findOne({ where: where }).then( (user) => {
                if (user) {
                    bcrypt.compare(password, user.password).then( (result) => {
                        if (result) {
                            jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '4h' }, (err, token) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    accept(token)
                                }
                            })
                        } else {
                            reject( writer.respondWithCode(401, { message: 'Usuário ou senha inválidos' }) )
                        }
                    }).catch( (err) => {
                        reject(err)
                    })
                } else {
                    reject( writer.respondWithCode(401, { message: 'Usuário ou senha inválidos' }) )
                }
            }).catch( (err) => {
                reject(err)
            })
        })
    })
}

var verifyToken = (req, res, roles, next, callback=null) => {
    extractTokenFromReq(req).then( (token) => {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                writer.writeJson( res, writer.respondWithCode(401, { message: 'Token inválido' }) )
            } else {
                User.findOne({ where: { id: decoded.id }, include: Role }).then( (user) => {
                    if (user != null && user != undefined) {
                        if (!hasRoles(roles, user.roles)) {
                            if (callback != null && callback != undefined) {
                                callback(user)
                            } else {
                                writer.writeJson( res, writer.respondWithCode(403, { message: 'Você não tem permissão para fazer isso' }) )
                            }
                        } else {
                            next(user)
                        }
                    } else {
                        writer.writeJson( res, writer.respondWithCode(401, { message: 'Token inválido' }) )
                    }
                }).catch( (err) => {
                    writer.writeJson( res, writer.tratarErro(err) )
                })
            }
        })
    }).catch( (err) => {
        writer.writeJson( res, writer.tratarErro(err) )
    })
}

var extractTokenFromReq = (req) => {
    return new Promise<Array<string>>( (accept, reject) => {
        if (req.headers.hasOwnProperty('authorization')) {
            var authHeader = req.headers['authorization'].split('Bearer ')
            if (authHeader.length == 2) {
                var token = authHeader[1]
                accept(token)
            } else {
                reject( writer.respondWithCode(401, { message: 'Token inválido' }) )
            }
        } else {
            reject( writer.respondWithCode(401, { message: 'Token inválido' }) )
        }
    })
}

var extractUserAndPassFromReq = (req) => {
    return new Promise<Array<string>>( (accept, reject) => {
        if (req.headers.hasOwnProperty('authorization')) {
            var authHeader = req.headers['authorization'].split('Basic ')
            if (authHeader.length == 2) {
                var credentials = Buffer.from(authHeader[1], 'base64').toString().split(':')
                accept(credentials)
            } else {
                reject( writer.respondWithCode(401, { message: 'Usuário ou senha inválidos' }) )
            }
        } else {
            reject( writer.respondWithCode(401, { message: 'Usuário ou senha inválidos' }) )
        }
    })
}

var hasRoles = (requiredRoles, userRoles) => {
    var authorized = true
    requiredRoles.forEach( (role) => {
        var hasRole = false
        userRoles.forEach( (userRole) => {
            if (userRole.descricao == role) {
                hasRole = true
            }
        })
        if (!hasRole) {
            authorized = false
        }
    })
    return authorized
}

exports.login = login
exports.verifyToken = verifyToken
exports.hasRoles = hasRoles
