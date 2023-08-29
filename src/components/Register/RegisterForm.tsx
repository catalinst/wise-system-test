import { FC } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input } from 'formik-semantic-ui-react';
import { RegisterPayloadRequest, RegisterSchema } from '../../meta/interfaces/register';
import { toast } from 'react-toastify';
import { NAME_REG_EXP, EMAIL_REG_EXP, RequiredFieldMessage, MatchingRuleMessage } from '../../meta/types/validations';
import { ToastsMessages } from '../../meta/types/toasts';
import api from '../../services/api';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Button} from 'semantic-ui-react';

const RegisterForm: FC = () => {

  const navigate: NavigateFunction = useNavigate();

  const registerUserSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(NAME_REG_EXP, MatchingRuleMessage.CHARACTER)
      .required(RequiredFieldMessage.FIRST_NAME),
    lastName: Yup.string()
      .matches(NAME_REG_EXP, MatchingRuleMessage.CHARACTER)
      .required(RequiredFieldMessage.LAST_NAME),
    email: Yup.string()
      .matches(EMAIL_REG_EXP, MatchingRuleMessage.EMAIL)
      .required(RequiredFieldMessage.EMAIL),
  });

  const initialValues: RegisterSchema = {
    firstName: '',
    lastName: '',
    email: '',
  };

  const createUserHandle = ({ firstName, lastName, email }: RegisterSchema): void => {

    const payload: RegisterPayloadRequest = {
      firstName, lastName, email
    };

    api
      .createUser(payload)
      .then(() => {
        toast.success(ToastsMessages.ACC_CREATED);
        navigate('/');
      });
  };

  return (
    <div className="page-container">
      <Formik
        initialValues={initialValues}
        validationSchema={registerUserSchema}
        onSubmit={createUserHandle}
      >
        <Form size="large">
          <Input
            name="firstName"
            placeholder="First name"
            errorPrompt
          />
          <Input
            name="lastName"
            placeholder="Last name"
            errorPrompt
          />
          <Input
            name="email"
            placeholder="Email"
            errorPrompt
          />
          <Button fluid primary type="submit">
            Create account
          </Button>
          <div className="account-info" >
            Do you an account? <strong onClick={() => navigate('/')}>Login here</strong>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
