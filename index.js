const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const datadb = process.env.DB_URL;
const PORT = process.env.PORT || 3000;

mongoose.connect(datadb,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const productSchema = new mongoose.Schema({
    name:String,
    age:Number,
    mob:Number
});

const product = mongoose.model('products',productSchema);
const app = express();
app.use(express.json());
app.use(cors());

app.post('/create', async (req,res)=>{
    const data = new product(req.body);
    const result = await data.save();
    console.log(result)
    res.send(result);
});

app.get('/list',async (req,res)=>{
    const data = await product.find();
    res.send(data)
});


app.put('/update/:_id', async (req,res)=>{
    const data = await product.updateOne(
        req.params,
        {
            $set:req.body
        }
    )
    console.log(req.params);
    res.send(data);
})


app.delete('/delete/:_id', async (req,res)=>{
    const data = await product.deleteOne(req.params)
    console.log(req.params);
    res.send(data);
})

app.listen(PORT,()=>{
    console.log('server start....')
});
