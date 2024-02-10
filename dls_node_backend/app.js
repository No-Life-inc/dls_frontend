import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());


mongoose.connect('mongodb://admin:Passw0rd!@localhost:27017/frontend_db?authSource=admin', {
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

const story = mongoose.model('stories', storySchema);

app.use(express.json());

app.get('/stories', async (req, res) => {
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
