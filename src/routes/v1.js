import movieModule from '../modules/movieModule.js';
import commentModule from '../modules/commentModule.js';
import wishlistModule from '../modules/wishlistModule.js';
import userModule from '../modules/userModule.js';

const authMW = userModule.verifyToken;

import Router from 'koa-router';
const router = new Router({
    prefix: '/api',
});

// movie
router.get('/movie/list/:page?/:limit?', movieModule.list);
router.post('/movie', authMW, movieModule.create);
router.get('/movie/:id', movieModule.show);
router.delete('/movie/:id', authMW, movieModule.remove);
router.put('/movie/:id', authMW, movieModule.update);
router.get('/search/movie/:title?', movieModule.search);

// comment
router.post('/movie/comment', authMW, commentModule.create);
router.delete('/movie/comment/:id', authMW, commentModule.remove);
router.get('/movie/:id/comments', commentModule.getMovieComments);

// wishlist
router.get('/user/wishlist', authMW, wishlistModule.list);
router.post('/user/wishlist/:id', authMW, wishlistModule.create);
router.delete('/user/wishlist/:id', authMW, wishlistModule.remove);
router.delete('/user/wishlist', authMW, wishlistModule.clear);

//auth
router.post('/register', userModule.register);
router.post('/login', userModule.login);

export default router;
