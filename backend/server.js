// require dotenv and use it 
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
// allow cross origin requests 
const cors = require('cors')

const port = 4000;


app.use(express.json())

// Call on express to use CORS
app.use(cors())

// import routes
const productRoutes = require('./routes/products')
const userRoutes = require('./routes/user')
const commentRoutes = require('./routes/comments')


//log out path and method of each request
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
  })
//Bring in username and password from the .env file 
const mongoUsername = process.env.MONGODB_USERNAME
const mongoPassword = process.env.MONGODB_PASSWORD

//Mongo connection string 
const mongoURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.s0fu6kb.mongodb.net/?retryWrites=true&w=majority`

//Setups route for browser - defines what will be shown in the browser
app.get('/', (req, res) =>{
    res.send('Hello, this is your Express Server!') // see in the browser
})

// Attach our Route to our app (express)
app.use('/api/products', productRoutes)
app.use('/api/user', userRoutes)
app.use('/api/comments', commentRoutes)
// Serve static files fromupblic/uplaods
app.use('/public/uploads', express.static('public/uploads'))

// Connect to Mongo use Mongoose
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    // Start the server
    app.listen(port, () => {
      console.log(`DB Connected & Express server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });