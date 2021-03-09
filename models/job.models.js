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
        }
    })

    job.prototype.toJSON = function () {
        var values = Object.assign({}, this.get())

        delete values.userId
        return values
    }

    return job
}