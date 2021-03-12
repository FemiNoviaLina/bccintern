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

        requirement: {
            type: Sequelize.STRING
        },

        location: {
            type: Sequelize.STRING
        }, 

        duration: {
            type: Sequelize.STRING
        },

        fee: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        contactPerson: {
            type: Sequelize.STRING
        },

        category: {
            type: Sequelize.STRING
        },

        picture: {
            type: Sequelize.STRING
        }
    })

    job.prototype.toJSON = function () {
        var values = Object.assign({}, this.get())

        delete values.userId
        return values
    }

    return job
}