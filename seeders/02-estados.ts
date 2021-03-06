'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('estados', [
            {
                id: 1,
                nome: 'Acre',
                uf: 'AC',
                pais_id: 1
            },{
                id: 2,
                nome: 'Alagoas',
                uf: 'AL',
                pais_id: 1
            },{
                id: 3,
                nome: 'Amapá',
                uf: 'AP',
                pais_id: 1
            },{
                id: 4,
                nome: 'Amazonas',
                uf: 'AM',
                pais_id: 1
            },{
                id: 5,
                nome: 'Bahia',
                uf: 'BA',
                pais_id: 1
            },{
                id: 6,
                nome: 'Ceará',
                uf: 'CE',
                pais_id: 1
            },{
                id: 7,
                nome: 'Distrito Federal',
                uf: 'DF',
                pais_id: 1
            },{
                id: 8,
                nome: 'Espírito Santo',
                uf: 'ES',
                pais_id: 1
            },{
                id: 9,
                nome: 'Goiás',
                uf: 'GO',
                pais_id: 1
            },{
                id: 10,
                nome: 'Maranhão',
                uf: 'MA',
                pais_id: 1
            },{
                id: 11,
                nome: 'Mato Grosso',
                uf: 'MT',
                pais_id: 1
            },{
                id: 12,
                nome: 'Mato Grosso do Sul',
                uf: 'MS',
                pais_id: 1
            },{
                id: 13,
                nome: 'Minas Gerais',
                uf: 'MG',
                pais_id: 1
            },{
                id: 14,
                nome: 'Pará',
                uf: 'PA',
                pais_id: 1
            },{
                id: 15,
                nome: 'Paraíba',
                uf: 'PB',
                pais_id: 1
            },{
                id: 16,
                nome: 'Paraná',
                uf: 'PR',
                pais_id: 1
            },{
                id: 17,
                nome: 'Pernambuco',
                uf: 'PE',
                pais_id: 1
            },{
                id: 18,
                nome: 'Piauí',
                uf: 'PI',
                pais_id: 1
            },{
                id: 19,
                nome: 'Rio de Janeiro',
                uf: 'RJ',
                pais_id: 1
            },{
                id: 20,
                nome: 'Rio Grande do Norte',
                uf: 'RN',
                pais_id: 1
            },{
                id: 21,
                nome: 'Rio Grande do Sul',
                uf: 'RS',
                pais_id: 1
            },{
                id: 22,
                nome: 'Rondônia',
                uf: 'RO',
                pais_id: 1
            },{
                id: 23,
                nome: 'Roraima',
                uf: 'RR',
                pais_id: 1
            },{
                id: 24,
                nome: 'Santa Catarina',
                uf: 'SC',
                pais_id: 1
            },{
                id: 25,
                nome: 'São Paulo',
                uf: 'SP',
                pais_id: 1
            },{
                id: 26,
                nome: 'Sergipe',
                uf: 'SE',
                pais_id: 1
            },{
                id: 27,
                nome: 'Tocantins',
                uf: 'TO',
                pais_id: 1
            }]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('estados', null, {});
    }
};
