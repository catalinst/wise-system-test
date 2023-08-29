import { Button, Modal } from 'semantic-ui-react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { ToastsMessages } from '../../meta/types/toasts';
import { Dispatch, FC, SetStateAction } from 'react';

type DeleteModalProps = {
  id: string,
  openDeleteModal: boolean
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>
  loadTasks: () => void
}

const DeleteTaskModal: FC<DeleteModalProps> = ({ id, openDeleteModal, setOpenDeleteModal, loadTasks }) => {

  const deleteHandle = (): void => {
    api.deleteTask(id).then((res) => {

      if (typeof res === 'string') {
        toast.error(ToastsMessages.ERROR);
        return;
      }

      setOpenDeleteModal(false)
      loadTasks();
      toast.success(ToastsMessages.TASK_DELETED);
    });
  };

  return (
    <Modal
      open={openDeleteModal}
      onClose={() => setOpenDeleteModal(false)}
      size={'small'}
    >
      <Modal.Header>You are about to fully delete this tasks</Modal.Header>
      <Modal.Content>This operation can't be undone!</Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => setOpenDeleteModal(false)}>
          Cancel
        </Button>
        <Button positive onClick={deleteHandle}>
          Delete
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteTaskModal
