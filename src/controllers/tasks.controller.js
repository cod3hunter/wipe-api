import Tasks from '../models/tasks.model.js';

export const getTasks = async (ctx, next) => {
  ctx.body = await Tasks.find();
  ctx.status = ctx.body?.length ? 200 : 204;
  next();
};

export const getTasksById = async (ctx, next) => {
  const task = await Tasks.findById(ctx.params.id).exec();
  ctx.body = task;
  ctx.status = 200;
  next();
};

export const postTasks = async (ctx, next) => {
  const tasks = new Tasks(ctx.request.body);
  ctx.body = await tasks.save();
  ctx.status = 201;
  next();
};

export const putTasks = async (ctx, next) => {
  ctx.body = await Tasks.updateOne({ _id: ctx.request.body._id }, ctx.request.body).exec();
  ctx.status = 201;
  next();
};

export const delTasks = async (ctx, next) => {
  await Tasks.deleteOne({ _id: ctx.params.id }).exec();
  ctx.status = 204;
  next();
};
