import  express from 'express'

import { json, urlencoded } from 'express';


const app = express()
const port = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

// Routes de l'application
app.get('/', (req, res) => {
    res.send( 'Hello World bonjour tout !');
});


  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

