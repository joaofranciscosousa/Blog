require('dotenv').config()
import app from "./config/app";

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
