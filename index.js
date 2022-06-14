const express = require('express');
const app = express();

app.use(express.json());

const students =[
    {id: 1, name: 'Karymita', age: 15, enroll: true},
    {id: 2, name: 'Karyme', age: 15, enroll: false},
    {id: 3, name: 'Alexis', age: 16, enroll: false},
    {id: 3, name: 'Alexito', age: 16, enroll: true},
];

app.get('/', (req, res) => {
    res.send('Node JS api')
});

app.get('/api/students', (req, res)=>{
    res.send(students);
});

app.get('/api/students/:id', (req, res)=>{
    const students = students.find(c => c.id === paraInt(req.params.id));
    if (!students) return res.status(404).send('Noviecito no encontrado')
    else res.send(students);
})

app.post('/api/students', (req, res)=>{
    const student ={ 
        id: students.length + 1, 
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    };

    students.push(student);
    res.send(student);
});


app.delete('/api/students/:id', (req, res)=>{
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Noviecito no encontrado');

    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student);
});

const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));