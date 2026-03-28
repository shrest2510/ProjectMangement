import { Router } from "express"; // import the Router class from the express module to create a new router instance.
const router = Router();

router.get('/', async (req, res, next) => {

    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        res.send(healthcheck);
    } catch (error) {
        healthcheck.message = error;
        res.status(503).send();
    }
});
// export router with all routes included
export { router };
