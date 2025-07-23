import express from 'express';
import userRouters from './src/routes/user.routes.js';
import bookRouters from './src/routes/book.routes.js';
import loanRouters from './src/routes/loan.routes.js'
import "dotenv/config";
import "./src/service/cron.service.js"
const app = express();

app.use(express.json());
app.use(userRouters);
app.use(bookRouters);
app.use(loanRouters);

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});