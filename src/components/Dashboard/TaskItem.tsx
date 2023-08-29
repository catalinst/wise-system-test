import { FC, useState } from 'react';
import { Task } from '../../meta/interfaces/task';
import { Button, Card } from 'semantic-ui-react';
import DeleteTaskModal from './DeleteTaskModal';
import UpdateTaskModal from './UpdateTaskModal';

const TaskItem: FC<Task & { loadTasks: (() => void) }> = ({ id, title, description, createDate, loadTasks }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)

  const deleteHandle = (): void => {
    setOpenDeleteModal(true)
  };

  const updateHandle = (): void => {
    setOpenUpdateModal(true)
  };

  return (
    <>
      <Card fluid>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{new Date(createDate).toDateString()}</Card.Meta>
          <Card.Description>
            {description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green" onClick={updateHandle}>
              Edit
            </Button>
            <Button basic color="red" onClick={deleteHandle}>
              Delete
            </Button>
          </div>
        </Card.Content>
      </Card>
      {openDeleteModal && <DeleteTaskModal {... { id, openDeleteModal, setOpenDeleteModal, loadTasks }} />}
      {openUpdateModal && <UpdateTaskModal {... { id, title, description, openUpdateModal, setOpenUpdateModal, loadTasks }} />}
    </>
  );
};

export default TaskItem;
