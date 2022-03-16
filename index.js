// Creating connection to the server
const express = require('express')
const app =  express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/students', require('./routes/api/students'))

app.listen(3000, () => {
    console.log('server started on port 3000')
})
