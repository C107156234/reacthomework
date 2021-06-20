import React from 'react';
import { Link as RouterLink,Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import { useState, useContext } from "react";
import { AppContext } from "../Context"


  const Form = () => {
    const { insertUser } = useContext(AppContext);
    const [newUser, setNewUser] = useState({});
  
    // Storing the Insert User Form Data.
    const addNewUser = (e, field) => {
      setNewUser({
        ...newUser,
        [field]: e.target.value,
      });
    };
  
    // Inserting a new user into the Database.
    const submitUser = (e) => {
      e.preventDefault();
      insertUser(newUser);
      e.target.reset();
      alert("註冊成功");
    };

  return (
    <>
      <Helmet>
        <title>Register | Material Kit</title>
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
              user_name: '',
              user_email: '',
              user_phone: '',
              policy: false
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
                    註冊帳號
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.user_name && errors.user_name)}
                  fullWidth
                  helperText={touched.user_name && errors.user_name}
                  label="員工姓名"
                  margin="normal"
                  name="user_name"
                  onBlur={handleBlur}
                  onChange={(e) => addNewUser(e, "user_name")}
                  type="user_name"
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.user_email && errors.user_email)}
                  fullWidth
                  helperText={touched.user_email && errors.user_email}
                  label="職稱"
                  margin="normal"
                  name="user_email"
                  onBlur={handleBlur}
                  onChange={(e) => addNewUser(e, "user_email")}
                  type="user_email"
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
                  onChange={(e) => addNewUser(e, "user_phone")}
                  type="user_phone"
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={!newUser.user_name || !newUser.user_email || !newUser.user_phone}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    註冊
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  有帳號了?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    登入
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

export default Form;
