
const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Expence = sequelize.define('expence', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    ammount: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        

    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
        
    }

})

module.exports = Expence;

