const fetch = require('node-fetch')
const express = require('express')
const dotenv = require('dotenv')
const { getData } = require('./controllers/getData')
const app = express()

const sort = {
  ending: 'Ending+Soonest',
  recentlyAdded: 'Recently+Added',
}

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// view engine
app.set('view engine', 'ejs')
dotenv.config()
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', getData)
