import { Link as RouterLink, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  unstable_useThemeProps
} from '@material-ui/core';
import { useState, useContext } from "react";
import { AppContext } from "../Context"

const Login = () => {

  const { userLogin } = useContext(AppContext);
  const [loginUser, setLoginUser] = useState({});

  const addLoginUser = (e, field) => {
    setLoginUser({
      ...loginUser,
      [field]: e.target.value,
    });
  };

  // Inserting a Login user into the Database.
  const submitUser = (e) => {
    e.preventDefault();
    userLogin(loginUser);
    e.target.reset();
  };

  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              user_id: '',
              user_phone: '',
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              touched,
              values
            }) => (
              <form onSubmit={submitUser}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    登入帳號
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.user_id && errors.user_id)}
                  fullWidth
                  helperText={touched.user_id && errors.user_id}
                  label="員工ID"
                  margin="normal"
                  name="user_id"
                  onBlur={handleBlur}
                  onChange={(e) => addLoginUser(e, "user_id")}
                  type="user_id"
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.user_phone && errors.user_phone)}
                  fullWidth
                  helperText={touched.user_phone && errors.user_phone}
                  label="電話(密碼)"
                  margin="normal"
                  name="user_phone"
                  onBlur={handleBlur}
                  onChange={(e) => addLoginUser(e, "user_phone")}
                  type="password"
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={!loginUser.user_id  || !loginUser.user_phone}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    登入
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  沒有帳號?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    註冊
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
