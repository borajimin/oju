"use strict";

const Sequelize = require('sequelize');
let sequelize = null;
if(process.env.HEROKU_POSTGRESQL_AMBER_URL) {
    sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_AMBER_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: true
    });
} else {
    sequelize = new Sequelize(process.env.DATABASE_NAME, 'postgres', process.env.DATABASE_PASSWORD, {
        dialect: 'postgres'
    });
}

sequelize
.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

var WebUser = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
  // ADD MORE ATTRIBUTES HERE
});

var KakaoUser = sequelize.define('kakaouser', {
    kakaoid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

var LineUser = sequelize.define('lineuser', {
    lineid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = {
    sequelize,
    WebUser,
    KakaoUser,
    LineUser
};
