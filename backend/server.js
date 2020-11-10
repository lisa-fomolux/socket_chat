

const app = require('express')();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const options = { /* ... */ };
const io = require('socket.io')(server, options);

require('dotenv').config({ path: './config/config.env' });

const PORT=process.env.PORT || 9001;

const uri=process.env.MONGO_URI;

console.log(process.env.MONGO_URI)


mongoose.connection.once('open', ()=>{
    console.log('mongoDB database connected successfully')
})

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            useCreateIndex: true
          });
          console.log(`DB connected`)
          console.log(`conn: ${conn}`);
    } catch(err){
        console.log("connectDB ERR: "+ err)
    }
}
connectDB();

const chat=require('./routes/chat');
const { stringify } = require('querystring');
const { CONNREFUSED } = require('dns');
app.use('/api/v1/chat', chat);
// app.get('/', function(req, res){
//     res.send('<h1>hello world</h1>')
// })

io.on('connection', socket => { 
    console.log('node: socket connected');

    socket.on('chat msg', (value)=>{
        console.log(value)
        io.emit('chat msg', value)
    })
});

server.listen(PORT, function(){
    console.log(`server: listen on port ${PORT}`)
});

// node src/server/index.js