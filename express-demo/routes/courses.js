const express = require('express');
const router = express.Router();
const Joi = require('joi');
const courses = [
    {id: 1, name: 'course1', teacher: 'Smith'},
    {id: 2, name: 'course2', teacher: 'John'},
    {id: 3, name: 'course3', teacher: 'Andy'},
];
router.get('/', (req, res) => {
    res.send(courses);
});
//Handing HTTP POST request
router.post('/', (req,res) => {
    const { error } = validateCourse(req.body);
    if(error){
        // 400 Bad Request
      return res.status(400).send(error.details[0].message);
      
    }


    const course = {
        id: courses.length + 1, 
        name: req.body.name,
        teacher: req.body.teacher
    };
    courses.push(course);
    res.send(course);
});
//Handling HTTP PUT Requests 
router.put('/id', (req, res) =>{
    //Look up the course
    //IF not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');

    //Validate/
    //If invalide, return 400- Bad Request
    const { error } = validateCourse(req.body);
    if(error){
        // 404 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }
    //Update course
    course.name = req.body.name;
    course.teacher = req.body.teacher;
    
    res.send(course);
    //Return the updated course

});

//Handing HTTP Deleete Request
router.delete('/:id', (req ,res)=>{
    //Look up the course
    //404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');
    //Delete
    const index = courses.indexOf(course);
    courses.splice(index,1);
    //respond
    res.send(course);
   
});

function validateCourse(course)
{
    const schema = {
        name: Joi.string().min(5).required(),
        teacher: Joi.string().min(2).required()
    };

    return Joi.validate(course, schema);
}
//Handing HTTP POST request
router.get('/:id', (req,res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('The course with the given ID was not found');
   res.send(course);
});

module.exports = router;