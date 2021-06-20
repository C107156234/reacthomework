import { Link as RouterLink, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TableCell,
  TableRow,
  Link,
  TextField,
  Typography,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useState, useContext } from "react";
import { AppContext } from "../../Context"

const Login = () => {

  const { loginUser,users,customers,products } = useContext(AppContext);
  const [newSalesorder, setNewSalesorder] = useState({})
  const [newDetail, setNewDetail] = useState({})
  const [newDetailList, setNewDetailList] = useState({})

  const addNewSalesorder = (e, field) => {
    setNewSalesorder({
      ...newSalesorder,
      [field]: e.target.value,
    });
  };
  var Today = new Date()
  const [salesDate] = useState(Today.getFullYear()+ "-" + (Today.getMonth()+1) + "-" + Today.getDate());

  const addDetail = (e,field) =>{
    setNewDetail({
      ...newDetail,
      [field]: e.target.value
    })
  }

  const addDetailList =() =>{
    setNewDetailList({
      ...newDetailList,
      newDetail
    })
  }

  return (
    <>
      <Helmet>
        <title>InsertOrder | Material Kit</title>
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
        <Container>
              <form>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    新增訂單
                  </Typography>
                </Box>
                <TableRow>
                <TableCell>
                <TextField
                  fullWidth
                  label="訂單編號"
                  size="medium"
                  margin="normal"
                  name="OrderId"
                  onChange={(e) => addNewSalesorder(e, "OrderId")}
                  variant="outlined"
                />
                </TableCell>
                <TableCell>
                <Typography
                    color="textPrimary"
                    variant="h5"
                  >
                    負責員工:
                  </Typography>
                <Select
                labelId="EmpId"
                id="EmpId"
                defaultValue ={loginUser[0].EmpId}
                onChange={(e) => addNewSalesorder(e, "EmpId")}
                >
                {users.map((user) =>(
                <MenuItem value={user.id}>{user.user_name}</MenuItem>
                ))}
              </Select>
              </TableCell>
              <TableCell>
              <Typography
                    color="textPrimary"
                    variant="h5"
                  >
                    客戶:
                  </Typography>
              <Select
                labelId="CustId"
                id="CustId"
                defaultValue ={0}
                onChange={(e) => addNewSalesorder(e, "CustId")}
                >
                <MenuItem value={0}>請選擇客戶</MenuItem>
                {customers.map((customer) =>(
                <MenuItem value={customer.id}>{customer.Cust_name}</MenuItem>
                ))}
              </Select>
              </TableCell>
              <TableCell>
              <TextField
                  label="訂單日期"
                  margin="normal"
                  disabled
                  name="salesDate"
                  defaultValue={salesDate}
                  onChange={(e) => addNewSalesorder(e, "salesDate")}
                  variant="outlined"
                />
              </TableCell>
              </TableRow>
              <TableRow>
              <TableCell>
                <Typography
                    color="textPrimary"
                    variant="h5"
                  >
                    產品名稱:
                  </Typography>
                <Select
                labelId="ProdId"
                id="ProdId"
                onChange={(e) => addDetail(e, "ProdId")}
                >
                {products.map((product) =>(
                <MenuItem value={product.Product_ID}>{product.Product_Name}</MenuItem>
                ))}
              </Select>
              </TableCell>
              <TableCell>
              <TextField
                  label="數量"
                  margin="normal"
                  name="Qty"
                  defaultValue={0}
                  onChange={(e) => addDetail(e, "Qty")}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                  <TextField
                  label="折扣"
                  margin="normal"
                  disabled
                  name="Discount"
                  defaultValue={1}
                  onChange={(e) => addDetail(e, "Discount")}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Button
                    color="primary"
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={addDetailList}
                  >
                    新增產品
                  </Button>
              </TableCell>
              </TableRow>
              {newDetailList.length === 0 }
              {newDetailList.map((newDetail) =>{
                newDetailList.length === 0 ? (
                <TableRow>
                <TableCell>
                  {newDetail.ProdId}
                </TableCell>
                <TableCell>
               {newDetail.Qty}
                </TableCell>
                <TableCell>
                <TableCell>
               {newDetail.Discount}
                </TableCell>
                </TableCell>
                </TableRow>
                ):
                <TableRow>
                <TableCell>
                暫無訂單
                </TableCell> 
                </TableRow>
              })}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    送出
                  </Button>
                </Box>
              </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
