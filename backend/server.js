const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const { sequelize } = require('./models')

dotenv.config()
const app = express()

//Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

//Routes
const accountsRoutes = require('./routes/accountsRoutes')
const transactionsRoutes = require('./routes/transactionsRoutes')

app.use('/api/accounts', accountsRoutes)
app.use('/api/transactions', transactionsRoutes)

app.get('/', (req, res) => {
    res.send('Double-Entry Accounting System API')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`)

    // Connect to database
    try {
        await sequelize.authenticate()
        console.log('Database connected')
    } catch (error) {
        console.error('Unable to connect to the databased:', error)
    }
})