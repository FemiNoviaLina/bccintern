module.exports = (sequelize, Sequelize) => {
    const mentor = sequelize.define('mentor', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },

        occupation: {
            type: Sequelize.STRING,
            allowNull: false
        },

        skill: {
            type: Sequelize.STRING,
            allowNull: false
        },

        Resume: {
            type: Sequelize.STRING,
        },

        fee: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    return mentor
}