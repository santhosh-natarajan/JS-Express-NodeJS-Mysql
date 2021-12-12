const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const dbService = require('./dbService');

// create
 app.post('/insert',(request, response) => { 
     const {name} = request.body; // object destructuring
     const db_service_instance = dbService.getInstanceOfDbService();
     const insertRes = db_service_instance.insertData(name);
     insertRes
     .then((data)=>{
         response.json({success: true, data: data})
     })

 })

// read
app.get('/getAll',(request, response) => { 
    console.log('test');
    const db_service_instance = dbService.getInstanceOfDbService();
    const getAllRes = db_service_instance.getAllData();
    getAllRes
    .then((data) => { 
        response.json({success: true, data: data})
    });
})

// update

// delete

app.listen(process.env.PORT, () => console.log('APP is running'))