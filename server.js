import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import cloudinaryConfig from "./src/cloudinaryConfig";
import Article from "./src/usingDB/controllers/Article";
import comment from "./src/usingDB/controllers/comment";
import Gif from "./src/usingDB/controllers/Gif";
import Helpers from "./src/usingDB/controllers/Helpers";
import User from "./src/usingDB/controllers/User";
import Auth from "./src/usingDB/middleware/Auth";
import Comments from './src/usingDB/controllers/comment';

dotenv.config();
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
  });

app.post('/api/v1/User', Auth.verifyToken, User.create);
app.post('/api/v1/User/login', Auth.verifyToken, User.login);
app.post('/api/v1/Gif', Gif.create);
app.post('/api/v1/Article', Article.create);
app.patch('/api/v1/Article/:id', Article.update);
app.delete('/api/v1/Article/:id', Article.delete);
app.delete('/api/v1/Gif/:id', Gif.delete);
app.post('/api/v1/Article/:id/comment', Comments.createArt);
app.post('/api/v1/Gif/:id/comment', Comments.createGif);
app.get('/api/v1/Article/:id', Article.getOne);
app.get('api/v1/Gif/:id', Gif.getOne);

app.listen(3000)
console.log('app running on port ', 3000);

