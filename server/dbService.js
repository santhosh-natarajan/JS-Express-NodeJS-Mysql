const mysql = require('mysql');

const dotenv = require('dotenv');
dotenv.config();

let instance = null; // for DbServiceClass

const db_connect = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    port: process.env.DB_PRORT,
    database: process.env.DATABASE
})

db_connect.connect((err)=> { 
    if(err) { 
        console.log(err.message);
    }
    console.log("db => " + db_connect.state);
})

class DbServiceClass { 
    static getInstanceOfDbService() { 
        return instance ? instance : new DbServiceClass();
    }

    async getAllData() { 
        try{
            const query = "SELECT * FROM names";
            return await new Promise((resolve, reject) => { 
                db_connect.query(query, (err,result)=> { 
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            })
         }
        
        catch(err) { console.log(err) }
    }

    async insertData(name) { 
        try { 
            const addedDate = new Date();
            const query = "INSERT INTO names (name, date_added) VALUES (?, ?)";
            const insertId =  await new Promise((resolve, reject) => { 
                db_connect.query(query,[name, addedDate],(err,result)=> { 
                    if(err) reject(new Error(err.message));
                    resolve(result.insertId)
                })
            })
            return { 
                id: insertId,
                name: name,
                date_added: addedDate
            }
        }

        catch(err) { 
            console.log(err);
         }
    }
}

module.exports = DbServiceClass;