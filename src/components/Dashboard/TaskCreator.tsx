import { Dispatch, FC, SetStateAction } from 'react';
import { Form, Input } from 'formik-semantic-ui-react';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { RequiredFieldMessage } from '../../meta/types/validations';
import { CreateTaskPayloadRequest, Task, TaskSchema } from '../../meta/interfaces/task';
import api from '../../services/api';
import { Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { ToastsMessages } from '../../meta/types/toasts';

const TaskCreator: FC<{ setTasks: Dispatch<SetStateAction<[] | Task[]>> }> = ({ setTasks }) => {

  const createTaskSchema = Yup.object().shape({
    title: Yup.string()
      .required(RequiredFieldMessage.TITLE),
    description: Yup.string()
      .required(RequiredFieldMessage.DESCRIPTION),
  });

  const initialValues: TaskSchema = {
    title: '',
    description: '',
  };

  const createTaskHandle = ({ title, description }: TaskSchema, { resetForm }: FormikHelpers<TaskSchema>): void => {
    const payload: CreateTaskPayloadRequest = {
      title,
      description
    };

    api.addTask(payload).then(res => {
      if (typeof res === 'string') {
        toast.error(ToastsMessages.TASK_CREATED);
        return
      }

      resetForm()
      toast.success(ToastsMessages.TASK_CREATED);
      setTasks(prevState => [...prevState, res])
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createTaskSchema}
      onSubmit={createTaskHandle}
    >
      <Form size="large">
        <Input
          name="title"
          placeholder="Title"
          errorPrompt
        />
        <Input
          name="description"
          placeholder="Description"
          errorPrompt
        />
        <Button fluid primary type="submit">
          Create task
        </Button>
      </Form>
    </Formik>
  );
};

export default TaskCreator;
