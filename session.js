import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send('{ "message": "hello world!" }')
})

app.listen(5000, () => console.log('Example app listening on port 5000!'))
