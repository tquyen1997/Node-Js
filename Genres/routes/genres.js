const express = require ('express');
const router = express.Router();
const Joi = require('joi');
const genres = [
    {id: 1, actor:"Angela", type:"Romantic"},
    {id: 2, actor:"Jack", type:"Action"},
    {id: 3, actor:"Kay", type: "Comedy"}
];
//use GET method on postman with '/'

//use GET method on postman with '/api/genres'
router.get('/', (req,res) => {
    res.send(genres);
});
//Function to validate input of genres
function validateGenre(genre)
{
    const schema = {
        actor: Joi.string().min(2).required(),
        type: Joi.string().min(2).required()
    };

    return Joi.validate(genre, schema);
}
//Handing with POST request

router.post('/', (req,res) =>{
    const { error } = validateGenre(req.body);
    if (error)
    return res.status(400).send(error.details[0].message); //400 bad request
    //Update
    const genre = {
        id: genres.length + 1, 
        actor: req.body.actor,
        type: req.body.type
    };
    genres.push(genre);
    res.send(genre);
});

//Handing with PUT request
router.put('/:id', (req, res) =>{
    //Look up the id provide
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');
    // Validate
    const { error } = validateGenre(req.body);
    if (error)
    return res.status(400).send(error.details[0].message); //400 bad request
    //Update
    genre.actor = req.body.actor;
    genre.type = req.body.type;
    res.send(genre);
});
//Handing with Delete request
router.delete('/:id', (req,res) =>{
    //Look up the id provide
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');
    //Delete
    const index = genres.indexOf(genre);
    genres.splice(index,1)
    res.send(genre);
});

module.exports = router;