const { Sequelize } = require('sequelize')
const env = process.env

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,

    pool: {
        max: 3,
        min: 0,
        idle: 3000,
        acquire: 10000
    }   
})

const users = require('./user.models')(sequelize, Sequelize)
const jobs = require('./job.models')(sequelize, Sequelize)
const mentors = require('./mentor.models')(sequelize, Sequelize)
const user_job = require('./user_job.models')(sequelize, Sequelize)

users.hasMany(jobs, {as: 'CreatedBy', foreignKey : 'createdById'})
users.hasMany(jobs, {as: 'DoneBy', foreignKey : 'doneById'})
jobs.belongsTo(users, {onDelete : 'cascade', onUpdate : 'cascade'})

users.belongsToMany(jobs, { through: 'user_job' })
jobs.belongsToMany(users, { through: 'user_job' })

mentors.hasMany(users, {as: 'mentor', foreignKey: 'mentorId'})
users.belongsTo(mentors, {onDelete: 'cascade', onUpdate: 'cascade'})

module.exports =  {
    sequelize,
    Sequelize,
    users,
    jobs,
    mentors,
    user_job
}