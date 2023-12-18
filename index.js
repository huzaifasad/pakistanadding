import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const app = express();
import Laptop  from './schemas/productschema/laptop.js'; // Import using the exact same name

// index.js (server)
const url = 'mongodb+srv://mhuzaifatariq7:luckynumber7@cluster0.mjqk6et.mongodb.net/your-database-name?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('connected to the database'))
.catch(()=> console.log('not conncted'));

app.listen(5000);
app.use(cors({
    origin: "https://midwork-frontend.vercel.app", // Update to your frontend URL
    methods: ["POST", "GET","PUT","DELETE"],
    credentials: true
  }));

app.get("/",(req,res)=>{
    res.json("Hello");
})
app.post('/laptop/add', async (req, res) => {
  const { name, price, ramSize, type, brand, features, images } = req.body;

  const newLaptop = new Laptop({
    name,
    price,
    ramSize,
    type,
    brand,
    images, // Assuming images is an array of image URLs
    features,
  });

  try {
    const savedLaptop = await newLaptop.save();
    res.status(201).json({ message: 'Laptop added successfully', laptop: savedLaptop });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

 
app.get('/laptop/get', async (req, res) => {
  try {
    const laptops = await Laptop.find();

    

    res.send(laptops);
  } catch (error) {
    console.error('Error fetching laptops:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
