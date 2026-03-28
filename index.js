import dotenv from "dotenv";
import app from "./app.js";
import connectdb from "./db/index.js";
import { router } from "./routes/healthcheck.js";

dotenv.config({
    path: "./.env"
});    

const port=process.env.PORT || 5000

connectdb() //call the connectdb function to establish a connection to the database before starting the server 
 .then(() => { // if the connection is successful, then start the server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
 })
 .catch((error) => {
    console.log("Error connecting to the database:", error);
 });

app.use("/api/v1/healthcheck", router); // middleware to handle the healthcheck route, when a request is made to /api/v1/healthcheck, it will call the healthcheck function from the controller and return the response.



