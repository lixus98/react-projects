var models = require('./server.js').models;

// var names = ["Alberto", "Maria", "Pedro", "Sabrina", "Luis", "Jose", "Yuliana", "Will", "Johana", "Mari","Alberto", "Maria", "Pedro", "Sabrina", "Luis", "Jose", "Yuliana", "Will", "Johana", "Mari","Alberto", "Maria", "Pedro", "Sabrina", "Luis", "Jose", "Yuliana", "Will", "Johana", "Mari"];
// var toSave = [];

// for(var i = 0; i < 30; i++){
//     toSave.push({name: `${names[i]}${i}`, email: `${names[i]}@gmail.com`});
// }

// toSave.map(obj => {
//     models.Profile.create(obj, (updateError, updated) =>{
//         console.log("Saved?: ",updateError, updated);
//     });
// });

var filter = {
    where:{
        name:{like:'Sabrina'}
    },
    skip:1   
}

models.Profile.destroyById("5fc58c9c6c40c9014db40777", (err, found) => {
    console.log("Found? ", err, found);
});