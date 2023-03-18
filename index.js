import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import cron from 'node-cron';
import {
  getTasks, postTasks, putTasks, delTasks, getTasksById,
} from './src/controllers/tasks.controller.js';
import alertSchedule from './src/schedules/alert.schedule.js';

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get('/status', (ctx, next) => {
  ctx.body = 'ok!';
  ctx.status = 200;
  next();
});

router
  .get('/tasks', getTasks)
  .get('/tasks/:id', getTasksById)
  .post('/tasks', postTasks)
  .put('/tasks/:id', putTasks)
  .del('/tasks/:id', delTasks);

app.use(router.routes());
app.use(router.allowedMethods());

cron.schedule('* 12 * * *', alertSchedule);

app.listen(process.env.PORT, async () => {
  await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_DATABASE}`).then(() => console.log('mongodb is up!')).catch((e) => console.error(e));
});
