module.exports = (sequelize, Sequelize) => {
    const job = sequelize.define('job', {
        jobTitle: {
            type: Sequelize.STRING,
            allowNull: false
        },

        jobDesc: {
            type: Sequelize.STRING,
            allowNull: false
        },

        location: {
            type: Sequelize.STRING
        }, 

        duration: {
            type: Sequelize.INTEGER
        },

        fee: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        category: {
            type: Sequelize.STRING
        },

        applier: {
            type: Sequelize.STRING,
            defaultValue: '-'
        }
    })

    return job
}