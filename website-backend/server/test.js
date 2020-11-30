var models = require('./server.js').models;

models.Profile.findOrCreate({name:'Ana'}, (err, profile) => {
    console.log("data?", err, profile)
})