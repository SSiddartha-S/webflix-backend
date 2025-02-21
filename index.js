require('dotenv').config();
let express = require('express');
let dbConnect = require('./config/database');
let userRouter = require('./router/user_routes')
let cors = require('cors');
let cookieParser = require('cookie-parser');
let errorHandler = require('./middleware/errorhandler')
// const formData = require('express-form-data');
dbConnect();
let app = express();
// app.use(formData.parse());
app.get('/',(req,res)=>{res.send('welcome to webflix backend')})
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    methods:['GET','POST','DELETE','PUT','PATCH'],
    credentials:true
})) 

app.options('http://localhost:3000',cors())

let port = process.env.PORT || 8080;
app.use(express.static('./views'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/users',userRouter);
app.use(errorHandler)
app.listen(port, function(){console.log(`server is running on port ${port}`)});
