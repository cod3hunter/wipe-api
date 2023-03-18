import { model, Schema } from 'mongoose';

const tasksSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  schedule: {
    type: String,
  },
});

const Tasks = model('Tasks', tasksSchema);

export default Tasks;
