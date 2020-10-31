require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const authRouter = require('./routes/auth');
const PostRouter = require('./routes/post');
const UserRouter = require('./routes/user')
const PORT = process.env.PORT || 5000;
const path = require('path')



mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log('DB connected!');
})
//middlewares
// app.use(cors());
app.use(express.json());

//app routes
app.use('/api',authRouter);
app.use('/api/post',PostRouter);
app.use('/api/user',UserRouter);


//production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
})