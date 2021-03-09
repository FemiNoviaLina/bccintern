module.exports = (sequelize, Sequelize) => {
    const user_job = sequelize.define('user_job', {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        jobId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    return user_job
}