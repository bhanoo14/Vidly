import express from 'express';
import Joi from 'joi';
// Here I am going to manage vidly App by Mosh


const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;


// Schema for genre Validation
const genSchema = Joi.object({
    name: Joi.string.min(3).required()
})

// my Genres
const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Drama' }
];

// GET call for genres
app.get('/vidly/api/genres', (req, res)=>{
    res.send(genres);
})

// POST call for genres
app.post('/vidly/api/genres', (req, res)=>{
    const { error } = genSchema.validate(req.body)
    if(error){
        return res.status(404).send(error.details[0].message)
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre);
    res.send(genre)
})

// Put call for genre
app.get('/vidly/api/genres/:id', (req, res)=>{
    const genre = genres.find(g => g.id === req.params.id);
    if(!genre){
        return res.status(404).send("Given genre with id is not found")
    }

    const {error} = genSchema.validate(req.body);
    if(error){
        return res.status(404).send(error.details[0].message)
    }

    genres.name = req.body.name
    res.status(200).send(genre)
})

app.delete('/vidly/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
  
    res.send(genre);
});

app.listen(port, ()=>{
    console.log(`App is listening ${port} Port`);
})