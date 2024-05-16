const app = require('express')()

app.get('/', async (req, res) => {
    res.send('Hello World!')
})

app.listen(5000, () => console.log('Example app listening on port http://localhost:5000'))