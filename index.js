const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const client = require('./Connection/dbconnection')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res)=>{
    res.send('<h1> Hello I am form node <h1/>');
})

app.get('/users', async(req, res)=>{
    try{
        let query = 'SELECT * FROM users';
        let result = await client.query(query);
        res.json(result.rows);
    }catch(error){
        console.error('Error fetching users', error);
        res.send.status(500).json({error: 'Error Fetching users'})
    }
    client.end;
});

app.get('/users/:id', async(req, res)=>{
    try{
        const query = 'SELECT * FROM users WHERE id =$1';
        const result = await client.query(query, [req.params.id]);
        res.json(result.rows);
    }catch(error){
        console.error('Error finding user...!')
        res.status(500).json({error: "Error finding user"})
    }
    client.end;
});

app.post('/users', async(req, res)=>{
    try{
        const user = req.body;
        const query = `INSERT INTO users (username, password) VALUES
        ('${user.username}', '${user.password}')`
        result = await client.query(query);
        res.send('Insert successful...!');
    }catch(error){
        console.error("Error in Updating...", error);
        res.status(500).json({error: 'Error in updating user...'});
    }
    client.end;
});

app.put('/users/:id', async(req, res)=>{
    try{
        const user = req.body;
        const updateQuery = ` UPDATE users
                set username = '${user.username}',
                password = '${user.password}'
                where id = $1 `;
         result = await client.query(updateQuery, [req.params.id]);       
        res.send('User updated...!');
    }catch(error){
        console.error("Error in updating user", error);
        res.status(500).json({error: "Error in updating user"});
    }
    client.end;
});


app.delete('/users/:id', async(req, res)=>{
    try{
        const deleteQuery = `DELETE FROM users where id = $1`;
        result = await client.query(deleteQuery, [req.params.id]);
    }catch(error){
        console.error("Error in Deleting user..", error);
        res.status(500).json({error: "Error in deleting the user..!"});
    }
})


app.listen(5000);



