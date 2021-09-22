import Router from 'koa-router';
import movieModule from '../modules/movieModule.js';
import userModule from '../modules/userModule.js';
import commentModule from '../modules/commentModule.js';
const authMW = userModule.verifyToken;
const router = new Router({
    prefix: '/api',
});

router.get('/movie/list', movieModule.list);
router.post('/movie/new', movieModule.create);
router.get('/movie/:id', movieModule.show);
router.delete('/movie/delete/:id', movieModule.remove);
router.put('/movie/update/:id', movieModule.update);
router.get('/movie/search/:title', movieModule.search);

router.post('/movie/comment/new', commentModule.create);
router.delete('/movie/comment/delete/:id', commentModule.remove);

export default router.routes();
