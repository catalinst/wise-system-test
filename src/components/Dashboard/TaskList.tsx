import { ChangeEvent, FC, useState } from 'react';
import { Task } from '../../meta/interfaces/task';
import TaskItem from './TaskItem';
import { Header, Input } from 'semantic-ui-react';

const TaskList: FC<{ tasks: Task[] | [], loadTasks: () => void }> = ({ tasks, loadTasks }) => {
  const [value, setValue] = useState<string>('')

  const filterTasks = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = event.target.value;
    setValue(inputValue)
  };

  if (!tasks) return null;

  return (
    <>
      <Header as="h3">Your tasks</Header>
      <Input icon="search" fluid placeholder="Search title..." onChange={filterTasks} />
      {
        tasks && tasks.length !== 0 ? (
          tasks
            .filter((tasks) => tasks.title.includes(value))
            .sort((a, b) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime())
            .map(({ id, title, description, createDate }) => (
              <TaskItem {...{ id, title, description, createDate, loadTasks }}  key={id} />
            ))
        ) : (
          <Header textAlign={'center'}>No tasks available</Header>
        )
      }
    </>
  );
};

export default TaskList;
