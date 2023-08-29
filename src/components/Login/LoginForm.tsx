import { FC, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input } from 'formik-semantic-ui-react';
import { AuthenticationSchema, LoginPayloadRequest } from '../../meta/interfaces/login';
import { EMAIL_REG_EXP, RequiredFieldMessage, MatchingRuleMessage } from '../../meta/types/validations';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Button, Message } from 'semantic-ui-react';

const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const [showLoginError, setShowLoginError] = useState<boolean>(false)

  const loginUserSchema = Yup.object().shape({
    email: Yup.string()
      .matches(EMAIL_REG_EXP, MatchingRuleMessage.EMAIL)
      .required(RequiredFieldMessage.EMAIL),
    password: Yup.string()
      .required(RequiredFieldMessage.PASSWORD),
  });

  const initialValues: AuthenticationSchema = {
    email: '',
    password: '',
  };

  const loginHandle = ({ email, password }: AuthenticationSchema): void => {

    setShowLoginError(false)

    const payload: LoginPayloadRequest = {
      email,
      password
    };

    api.authUser(payload).then(res => {
      if (res) navigate('/dashboard');
      else setShowLoginError(true)
    });

  };

  return (
    <div className="page-container">
      <Formik
        initialValues={initialValues}
        validationSchema={loginUserSchema}
        onSubmit={loginHandle}
      >
        <Form size="large">
          <Input
            name="email"
            placeholder="Email"
            errorPrompt
          />
          <Input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            errorPrompt
            icon={{
              name: showPassword ? 'eye slash' : 'eye',
              link: true,
              onClick: () => setShowPassword(prevState => !prevState),
            }}
          />
          {showLoginError && (
            <Message
              content='Invalid password'
              negative
            />
          )}
          <Message
            content='For demo purpose, the password is the same as the email'
            info
          />
          <Button fluid primary type="submit">
            Login
          </Button>
          <div className="account-info">
            No account? <strong onClick={() => navigate('/register')}>Create one now</strong>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
