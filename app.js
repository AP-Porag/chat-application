/*
*external imports
*/
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

/*
*internal imports
*/
const {notFoundHandler,errorHandler} = require('./middlewares/common/errorHandler');
const loginRouter = require('./router/loginRouter');
const usersRouter = require('./router/usersRouter');
const inboxRouter = require('./router/inboxRouter');



const app = express();
dotenv.config();

//database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(() => console.log("Database connection successful !!"))
    .catch(err => console.log(err));

//processing request
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//set template/view engine
app.set('view engine','ejs');

//set static folder
app.use(express.static(path.join(__dirname,'public')));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//application routing
app.use('/',loginRouter);
app.use('/users',usersRouter);
app.use('/inbox',inboxRouter);


//404 not found handler
app.use(notFoundHandler);

//common error handler
app.use(errorHandler);

//listening port/start the app
app.listen(process.env.PORT,()=>{
    console.log(`app listening to port ${process.env.PORT}`);
});