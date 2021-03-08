module.exports = (sequelize, Sequelize) => {
    const userJob = sequelize.define('userJob', {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        jobId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    return userJob
}