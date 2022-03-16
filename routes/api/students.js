const express = require("express");
const router = express.Router();
const uuid = require("uuid");
let students = require("../../Students");



//1. get all students
router.get("/", (req,res) =>{
    res.json(students);
});

//2. Get student by id
router.get("/:id", (req, res) => {
    const found = students.some(student => student.id === parseInt(req.params.id))

    if (found){
        res.json(students.filter(student => student.id === parseInt(req.params.id)))
    } else {
        res.sendStatus(400)
    }
});

//3. create(post) a new user
router.post('/', (req, res) => {
    const newStudent = {
        id: uuid.v4(),
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        residence: req.body.residence,
        course: req.body.course
    }

    if( !newStudent.name || !newStudent.age || !newStudent.email || !newStudent.residence || !newStudent.course ){
        return res.sendStatus(400)
    }
    students.push(newStudent)
    res.json(students)
});

//update(put) user
router.put('/:id', (req,res) =>{
    const found = students.some(student => student.id === parseInt(req.params.id))
    if (found) {
        const updateStudent = req.body;
        students.forEach(student => {
            if(student.id === parseInt(req.params.id)) {
                student.name = updateStudent.name ? updateStudent.name: student.name
                student.age = updateStudent.age ? updateStudent.age: student.age
                student.email = updateStudent.email ? updateStudent.email: student.email
                student.residence = updateStudent.residence ? updateStudent.residence: student.residence
                student.course = updateStudent.course ? updateStudent.course: student.course
                res.json({msg: 'User updated', student})
            }
        })
    }
})

// delete api
router.delete ("/:id", (req, res) => {
    const found = students.some((student) => student.id === parseInt(req.params.id));

    if (found) {
        students = students.filter((student) => student.id !== parseInt(req.params.id));
        res.json({
            msg: "Student deleted",
            students,
        });
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;