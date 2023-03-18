import Tasks from '../models/tasks.model.js';

const alertSchedule = async () => {
  const tasks = await Tasks.find().exec();
  console.log(tasks);
};

export default alertSchedule;
