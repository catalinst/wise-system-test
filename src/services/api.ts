import { LoginPayloadRequest } from '../meta/interfaces/login';
import { RegisterPayloadRequest } from '../meta/interfaces/register';
import { User } from '../meta/interfaces/user';
import { CreateTaskPayloadRequest, Task, UpdateTaskPayloadRequest } from '../meta/interfaces/task';

const api = {

  authUser: async (payload: LoginPayloadRequest): Promise<User | null> => {
    const users: string | null = localStorage.getItem('users');

    //  case we don't have users created
    if (!users) return null;

    else {
      const parsedUsers: User[] = JSON.parse(users);
      const result: User | undefined = parsedUsers.find(user => user.email === payload.email && user.password === payload.password);
      if (result) return result;
    }

    return null;
  },

  // simulation of saving a user - using local storage as a "database"
  createUser: async (payload: RegisterPayloadRequest): Promise<void> => {
    const users: string | null = localStorage.getItem('users');

    const record: User = {
      ...payload,
      password: payload.email // using email as a password for simplicity
    };

    // if we don't have any users, create one into local storage
    if (!users) {
      localStorage.setItem('users', JSON.stringify([record]));
    }
    // if we have users, push the newest
    else {
      const updatedUsers: User[] = JSON.parse(users);
      localStorage.setItem('users', JSON.stringify([...updatedUsers, record]));
    }
  },

  fetchTasks: async (): Promise<Task[] | []> => {
    const tasks: string | null = localStorage.getItem('tasks');

    if (!tasks) {
      localStorage.setItem('tasks', JSON.stringify([
        {
          id: 'Sun Aug 20',
          title: 'Dummy task 1',
          description: 'Long description',
          createDate: new Date('Sun Aug 27 2023 20:17:47 GMT+0300'),
        },
        {
          id: 'Sun Aug 27 2023 ',
          title: 'Dummy task 2',
          description: 'Hi, what`up?',
          createDate: new Date('Sun Aug 21 2023 20:17:47 GMT+0300'),
        },
        {
          id: 'Sun Aug 27 27:47 GMT+0300',
          title: 'Dummy task 3',
          description: 'Another testing task',
          createDate: new Date('Sun Aug 22 2023 20:17:47 GMT+0300'),
        }
      ]));
      return [];
    }

    const parsedTasks: Task[] = JSON.parse(tasks);

    return parsedTasks;
  },

  addTask: async (payload: CreateTaskPayloadRequest): Promise<Task | string> => {
    const tasks: string | null = localStorage.getItem('tasks');

    if (!tasks) {
      return 'Adding error';
    }

    const parsedTasks: Task[] = JSON.parse(tasks);

    const task: Task = {
      ...payload,
      id: String(new Date().toString() + Math.random() * (12345678 - 1) + 1),
      createDate: new Date()
    }

    parsedTasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(parsedTasks));

    return task;

  },

  updateTask: async (payload: UpdateTaskPayloadRequest): Promise<Task[] | string> => {
    const tasks: string | null = localStorage.getItem('tasks');

    if (!tasks) {
      return 'Update error';
    }

    const parsedTasks: Task[] = JSON.parse(tasks);
    const index = parsedTasks.findIndex(task => task.id === payload.id)

    if (index) {
      parsedTasks[index]['title'] = payload.title
      parsedTasks[index]['description'] = payload.description
      localStorage.setItem('tasks', JSON.stringify(parsedTasks));
      return parsedTasks
    } else {
      return 'Update error';
    }
  },

  deleteTask: async (id: string): Promise<Task[] | string> => {
    const tasks: string | null = localStorage.getItem('tasks');

    if (!tasks) {
      return 'Deletion error';
    }

    const parsedTasks: Task[] = JSON.parse(tasks);
    const latestTasks = parsedTasks.filter(task => task.id !== id);

    localStorage.setItem('tasks', JSON.stringify(latestTasks));

    return latestTasks;

  },
};

export default api;
