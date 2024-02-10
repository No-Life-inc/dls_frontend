import express from 'express';
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/frontend_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


const storySchema = new mongoose.Schema({
    title: String,
    text: String,
    imageUrl: String
});

const story = mongoose.model('story', storySchema);

app.use(express.json());

app.get('/story', async (req, res) => {
    try{
        const allStories = await story.find();
        res.json(allStories);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});
