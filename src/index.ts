import express, { Request, Response } from 'express'

const app = express();
const port = 3000;
app.use(express.json())

app.get('/livecheck', (req: Request, res: Response) => {
    res.send('Up')
})

app.listen(port, (err) => {
    if (err) {
        console.log("error is:", err);
    } else {

        console.log(`ecommerce app listening on port ${port}`)
    }

})