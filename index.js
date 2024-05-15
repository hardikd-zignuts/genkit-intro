const app = require('express')()
const cors = require('cors')

app.use(cors());


app.get('/generate', (req, res) => {
    res.send('Hello World!')
})


app.listen(5000, () => console.log(`Example app listening on port http://localhost:5000`))