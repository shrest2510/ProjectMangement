import dotenv from "dotenv";
import app from "./app.js";
dotenv.config({
    path: "./.env"
});    

const port=process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/default', (req, res) => {
  res.send('Default page')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


