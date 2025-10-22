import express, { Request, Response } from "express";
const app = express()

const port = 4000

app.get('/livecheck', (req: Request, res: Response) => {
    res.status(200).json({ status: 'Up' })

})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`app running on port ${port}`);
    }
})
