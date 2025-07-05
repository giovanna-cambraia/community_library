import express from 'express';
import userRouters from './src/routes/user.routes.js'
const app = express();

app.use(express.json());
app.use(userRouters);


// METHOD (API REST) => GET, POST, PUT, DELETE
// METHOD (API RESTful) => GET, POST, PUT/PATCH, DELETE

// NAME => / - sempre no plural

// CALLBACK FUNCTIONS => Onde executamos o backend (logic, etc)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});