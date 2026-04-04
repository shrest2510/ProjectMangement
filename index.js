import dotenv from "dotenv";
import app from "./app.js";
import connectdb from "./db/index.js";
import health_router from "./routes/healthcheck.js";
import auth_router from "./routes/auth_route.js";

dotenv.config({
    path: "./.env"
});    

const port=process.env.PORT || 8005

connectdb() //call the connectdb function to establish a connection to the database before starting the server 
 .then(() => { // if the connection is successful, then start the server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
 })
 .catch((error) => {
    console.log("Error connecting to the database:", error);
 });

app.use("/api/v1/healthcheck", health_router); // middleware to handle the healthcheck route, when a request is made to /api/v1/healthcheck, it will call the healthcheck function from the controller and return the response.
app.use("/api/v1/auth", auth_router); // middleware to handle the auth route, when a request is made to /api/v1/auth, it will call the auth function from the controller and return the response.

app.get("/", (req, res) => { // middleware function to handle GET requests to the root path of the server, it will return a JSON object with a message "Welcome to the Project Management API"
    res.json({message: "Welcome to the Project Management API"});
}); 