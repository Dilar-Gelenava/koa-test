import Router from 'koa-router';
const router = new Router();
import movieModule from '../modules/movieModule.js';

// router.get('/movies', movieModule.list);

router.post('/movie/new', movieModule.create);

// router.get('/movie/:id', movieModule.show);

// router.get('/movie/delete/:id', movieModule.remove);

// router.get('/movie/edit/:id',movieModule.edit);

// router.post('/movie/update/:id', movieModule.update);

export default router.routes();
