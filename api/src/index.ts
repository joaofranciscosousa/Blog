require('dotenv').config()
import app from "./config/app";
import routes from "./routes/routes";

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})

