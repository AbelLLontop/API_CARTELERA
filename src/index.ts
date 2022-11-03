import './alias.config'; 
import express from 'express';
import 'dotenv/config';
import "@routes"
import { router } from '@routes/index';
const PORT = process.env.PORT || 3000;
const app = express();

app.use(router)


app.listen(PORT,()=>{
    console.log("Server on port",PORT);
})
