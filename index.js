import express from 'express';
const app = express();

app.use(express.json());

const users = []

app.post('/users', (req, res) => {
    const body = req.body
    users.push(body)
    res.status(201).send('User created with success!')
});

app.get("/users", (req, res) => {
    res.send({message: "Those are the users", users})
})

// METHOD (API REST) => GET, POST, PUT, DELETE
// METHOD (API RESTful) => GET, POST, PUT/PATCH, DELETE

// NAME => / - sempre no plural

// CALLBACK FUNCTIONS => Onde executamos o backend (logic, etc)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});