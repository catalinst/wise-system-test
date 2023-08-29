import { Button, Form, Modal } from 'semantic-ui-react';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { ToastsMessages } from '../../meta/types/toasts';
import { UpdateTaskPayloadRequest } from '../../meta/interfaces/task';

type UpdateModalProps = {
  id: string,
  title: string,
  description: string,
  openUpdateModal: boolean
  setOpenUpdateModal: Dispatch<SetStateAction<boolean>>
  loadTasks: () => void
}

const UpdateTaskModal: FC<UpdateModalProps> = (
  {
    id,
    title,
    description,
    openUpdateModal,
    setOpenUpdateModal,
    loadTasks
  }
) => {
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newDescription, setNewDescription] = useState<string>(description);

  const updateHandle = () => {

    const payload: UpdateTaskPayloadRequest = {
      id,
      title: newTitle,
      description: newDescription
    };

    api.updateTask(payload).then((res) => {

      if (typeof res === 'string') {
        toast.error(ToastsMessages.ERROR);
        return;
      }

      loadTasks();
      setOpenUpdateModal(false);
      toast.success(ToastsMessages.TASK_UPDATED);
    });

  };

  return (
    <Modal
      open={openUpdateModal}
      onClose={() => setOpenUpdateModal(false)}
      size={'small'}
    >
      <Modal.Header>Please fill the new data</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Title</label>
            <input
              placeholder="Title"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              placeholder="Description"
              value={newDescription}
              onChange={(event) => setNewDescription(event.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => setOpenUpdateModal(false)}>
          Cancel
        </Button>
        <Button positive onClick={updateHandle}>
          Update
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default UpdateTaskModal;
