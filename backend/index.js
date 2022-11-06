const connectToMongo = require('./db');
var cors = require('cors')

const express = require('express')
connectToMongo();

const app = express()
const port = 5500 

app.use(cors())
app.use(express.json());

//Available Routes


app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('This will show on the request!')
// })

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})