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

app.post('/api/v1/auth/create-user', User.create);
app.post('/api/v1/auth/signin', User.login);
app.post('/api/v1/gifs', Auth.verifyToken, Gif.create);
app.post('/api/v1/articles', Auth.verifyToken, Article.create);
app.patch('/api/v1/articles/<:articleId>', Auth.verifyToken, Article.update);
app.delete('/api/v1/articles/<:articleId>', Auth.verifyToken, Article.delete);
app.delete('/api/v1/gifs/<:gifId>', Auth.verifyToken, Gif.delete);
app.post('/api/v1/articles/<articleId>/comment', Auth.verifyToken, Comments.createArt);
app.post('/api/v1/gifs/<:gifId>/comment ', Auth.verifyToken, Comments.createGif);
app.get('/api/v1/articles/<:articleId', Auth.verifyToken, Article.getOne);
app.get('api/v1/gifs/<:gifId>', Auth.verifyToken, Gif.getOne);

app.listen(3000)
console.log('app running on port ', 3000);

