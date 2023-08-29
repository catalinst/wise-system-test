import { ReactNode, useEffect, useState } from 'react';
import TaskList from '../components/Dashboard/TaskList';
import TaskCreator from '../components/Dashboard/TaskCreator';
import { Task } from '../meta/interfaces/task';
import api from '../services/api';

const Dashboard = (): ReactNode => {
  const [tasks, setTasks] = useState<Task[] | []>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = (): void => {
    api.fetchTasks()
      .then(res => setTasks(res))
      .catch(err => console.log(err));
  };

  return  (
    <div className="page-container">
      <TaskCreator setTasks={setTasks} />
      <TaskList tasks={tasks} loadTasks={loadTasks} />
    </div>
  )


}
export default Dashboard;

