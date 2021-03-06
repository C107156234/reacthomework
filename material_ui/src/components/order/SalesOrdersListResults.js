import { Link as RouterLink } from 'react-router-dom';
import { useState,useContext } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Link,
  Button,
  TablePagination,
  TableRow,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AppContext } from "../../Context"

const SalesorderListResults = ({ ...rest }) => {
  const { salesorders,
          deleteSalesorder,
          deleteOrderdetail,
          orderdetails,
          users,
          customers,
          products,
          SalesordereditMode,
          SalesordercancelEdit,
          updateSalesorder,
          OrderdetaileditMode,
          OrderdetailcancelEdit,
          updateOrderdetail,
          insertSalesorder,
          insertOrderdetail,
          deleteOrderdetailseq } = useContext(AppContext);
  const [searchEmp, setSearchEmp] = useState('');
  const [searchCust, setSearchCust] = useState('');
  const [searchOrder, setSearchOrder] = useState('');
  const [newData, setNewData] = useState({});
  const [detailnewData, setDetailnewData] = useState({});
  const [newSalesorder, setNewSalesorder] = useState({});
  const [newOrderdetail, setNewOrderdetail] = useState({});

  const handleEmpChange = (event) => {
    setSearchEmp(event.target.value);
  };

  const handleCustChange = (event) => {
    setSearchCust(event.target.value);
  };

  const handleOrderChange = (event) => {
    setSearchOrder(event.target.value);
  };

  const deleteConfirm = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteSalesorder(id);
      deleteOrderdetail(id);
    }
  };

  const deleteConfirmseq = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteOrderdetailseq(id);
    }
  };

  const saveBtn = () => {
    updateSalesorder(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (seq,OrderId,EmpId,CustId,OrderDate,Descript) => {
    setNewData({ seq,OrderId,EmpId,CustId,OrderDate,Descript });
    SalesordereditMode(seq);
  };

  const detailsaveBtn = () => {
    updateOrderdetail(detailnewData);
  };

  const updatedetailnewData = (e, field) => {
    setDetailnewData({
      ...detailnewData,
      [field]: e.target.value,
    });
  };

  const detailenableEdit = (seq,ProdId,Qty,Discount) => {
    setDetailnewData({ seq,ProdId,Qty,Discount });
    OrderdetaileditMode(seq);
  };

  const addNewSalesorder = (e, field) => {
    setNewSalesorder({
      ...newSalesorder,
      [field]: e.target.value,
    });
  };

  const submitSalesorder = (e) => {
    e.preventDefault();
    insertSalesorder(newSalesorder);
    e.target.reset();
  };

  const addNewOrderdetail = (e, field) => {
    setNewOrderdetail({
      ...newOrderdetail,
      [field]: e.target.value,
    });
  };

  const submitOrderdetail = (e) => {
    e.preventDefault();
    insertOrderdetail(newOrderdetail);
    e.target.reset();
  };

  const newSalesorders = salesorders.filter((Salesorder) =>{
    return(
      Salesorder.EmpId.includes(searchEmp) &&
      Salesorder.CustId.includes(searchCust) &&
      Salesorder.OrderId.includes(searchOrder)
    )
  })

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
        <TableRow>
                <TableCell>
        <TextField
                  fullWidth
                  label="????????????"
                  margin="normal"
                  name="searchEmp"
                  onChange={(e) => handleEmpChange(e, "searchEmp")}
                  type="searchEmp"
                  value={searchEmp}
                  variant="outlined"
                />
                </TableCell>
                <TableCell>
        <TextField
                  fullWidth
                  label="????????????"
                  margin="normal"
                  name="searchCust"
                  onChange={(e) => handleCustChange(e, "searchCust")}
                  type="searchCust"
                  value={searchCust}
                  variant="outlined"
                />
                </TableCell>
                <TableCell>
        <TextField
                  fullWidth
                  label="????????????"
                  margin="normal"
                  name="searchOrder"
                  onChange={(e) => handleOrderChange(e, "searchOrder")}
                  type="searchOrder"
                  value={searchOrder}
                  variant="outlined"
                />
                </TableCell>
                </TableRow>
                <form className="insertForm" onSubmit={submitSalesorder}>
                <h2>????????????</h2>
                <label htmlFor="Salesorder_Name">????????????</label>
                <input
                  type="text"
                  id="Salesorder_Name"
                  onChange={(e) => addNewSalesorder(e, "OrderId")}
                  placeholder="Enter name"
                  autoComplete="off"
                  required
                />
                <label htmlFor="Salesorder_ID">????????????</label>
                <Select
                  labelId="EmpId"
                  id="EmpId"
                  defaultValue ={0}
                  onChange={(e) => addNewSalesorder(e, "EmpId")}
                  >
                  {users.map((product) =>(
                  <MenuItem value={product.id}>{product.user_name}</MenuItem>
                  ))}
                </Select>
                <label htmlFor="Product_UnitPrice">????????????</label>
                <Select
                  labelId="CustId"
                  id="CustId"
                  defaultValue ={0}
                  onChange={(e) => addNewSalesorder(e, "CustId")}
                  >
                  {customers.map((customer) =>(
                  <MenuItem value={customer.id}>{customer.Cust_name}</MenuItem>
                  ))}
                </Select>
                <label htmlFor="_email">????????????</label>
                <input
                  type="date"
                  id="_email"
                  onChange={(e) => addNewSalesorder(e, "OrderDate")}
                  placeholder="Enter Cost"
                  autoComplete="off"
                  required
                />
                <label htmlFor="_email">??????</label>
                <input
                  type="text"
                  id="Salesorder_Name"
                  onChange={(e) => addNewSalesorder(e, "Descript")}
                  placeholder="Enter name"
                  autoComplete="off"
                  required
                />
                <input type="submit" value="??????" />
              </form>
              {newSalesorders.map(({seq,OrderId,EmpId,CustId,OrderDate,Descript,EmpName,CustName,isEditing}) => (
                isEditing === true ? (
                  <TableRow
                  hover
                  key={seq}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                  <Typography>
                <TextField
                  label="??????"
                  margin="normal"
                  name="seq"
                  disabled
                  defaultValue={seq}
                  onChange={(e) => updateNewData(e, "seq")}
                  variant="outlined"
                />
              </Typography>
              </Box>
              </TableCell>
              <TableCell>
              <TextField
                  label="????????????"
                  margin="normal"
                  name="OrderId"
                  defaultValue={OrderId}
                  onChange={(e) => updateNewData(e, "OrderId")}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
              <Select
                labelId="EmpId"
                id="EmpId"
                defaultValue ={EmpId}
                onChange={(e) => updateNewData(e, "EmpId")}
                >
                {users.map((user) =>(
                <MenuItem value={user.id}>{user.user_name}</MenuItem>
                ))}
              </Select>
              </TableCell>
              <TableCell>
              <Select
                labelId="CustId"
                id="CustId"
                defaultValue ={CustId}
                onChange={(e) => updateNewData(e, "CustId")}
                >
                {customers.map((customer) =>(
                <MenuItem value={customer.id}>{customer.Cust_name}</MenuItem>
                ))}
              </Select>
              </TableCell>
              <TableCell>
              <TextField
                  label="????????????"
                  margin="normal"
                  name="OrderDate"
                  type="date"
                  defaultValue={OrderDate}
                  onChange={(e) => updateNewData(e, "OrderDate")}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
              <TextField
                  label="??????"
                  margin="normal"
                  name="Descript"
                  defaultValue={Descript}
                  onChange={(e) => updateNewData(e, "Descript")}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Button
                    color="primary"
                    size="large"
                    variant="contained"
                    className="btn green-btn"   
                    onClick={() => saveBtn()}>
                    ??????
                  </Button>
                <Button
                    color="secondary"
                    size="large"
                    variant="contained"
                    className="btn default-btn"
                    onClick={() => SalesordercancelEdit(seq)}
                  >
                   ??????
                  </Button>
              </TableCell>
            </TableRow>
                ) : (
                <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      ??????
                    </TableCell>
                    <TableCell>
                      ????????????
                    </TableCell>
                    <TableCell>
                      ????????????
                    </TableCell>
                    <TableCell>
                      ????????????
                    </TableCell>
                    <TableCell>
                      ????????????
                    </TableCell>
                    <TableCell>
                      ??????
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                <TableRow
                  hover
                  key={seq}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {seq}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {OrderId}
                  </TableCell>
                  <TableCell>
                  {EmpId}
                  </TableCell>
                  <TableCell>
                  {CustId}
                  </TableCell>
                  <TableCell>
                    {OrderDate}
                  </TableCell>
                  <TableCell>
                    {Descript}
                  </TableCell>
                  <TableCell>
                <Button
                    color="primary"
                    size="large"
                    className="btn default-btn"
                    onClick={() => enableEdit(seq)}
                    variant="contained"
                  >
                    ??????
                  </Button>
                <Button
                    color="secondary"
                    size="large"
                    className="btn red-btn"
                    onClick={() => deleteConfirm(OrderId)}
                    variant="contained"
                  >
                    ??????
                  </Button>
                  </TableCell>
                </TableRow>
                </TableBody>
          </Table>
          </AccordionSummary>
                <AccordionDetails>
                <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  ????????????
                </TableCell>
                <TableCell>
                  ??????
                </TableCell>
                <TableCell>
                  ??????
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {orderdetails.filter(orderdetail => orderdetail.OrderId === OrderId).map(({seq,ProdId,ProdName,Qty,Discount,isEditing}) => (
              isEditing === true ? (
                <TableRow
                hover
                key={seq}
              >
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                <Typography>
              <TextField
                label="??????"
                margin="normal"
                name="seq"
                disabled
                defaultValue={seq}
                onChange={(e) => updatedetailnewData(e, "seq")}
                variant="outlined"
              />
            </Typography>
            </Box>
            </TableCell>
            <TableCell>
            <Select
              labelId="ProdId"
              id="ProdId"
              defaultValue ={ProdId}
              onChange={(e) => updatedetailnewData(e, "ProdId")}
              >
              {products.map((product) =>(
              <MenuItem value={product.Product_ID}>{product.Product_Name}</MenuItem>
              ))}
            </Select>
            </TableCell>
            <TableCell>
            <TextField
                label="??????"
                margin="normal"
                name="Qty"
                defaultValue={Qty}
                onChange={(e) => updatedetailnewData(e, "Qty")}
                variant="outlined"
              />
            </TableCell>
            <TableCell>
            <TextField
                label="??????"
                margin="normal"
                name="Discount"
                defaultValue={Discount}
                onChange={(e) => updatedetailnewData(e, "Discount")}
                variant="outlined"
              />
            </TableCell>
            <TableCell>
              <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  className="btn green-btn"   
                  onClick={() => detailsaveBtn()}>
                  ??????
                </Button>
              <Button
                  color="secondary"
                  size="large"
                  variant="contained"
                  className="btn default-btn"
                  onClick={() => OrderdetailcancelEdit(seq)}
                >
                 ??????
                </Button>
            </TableCell>
          </TableRow>
              ) :(
              <TableRow>
              <TableCell>
              {ProdId}
              </TableCell>
              <TableCell>
              {Qty}
              </TableCell>  
              <TableCell>
              {Discount}
              </TableCell>
              <TableCell>
                <Button
                    color="primary"
                    size="large"
                    className="btn default-btn"
                    onClick={() => detailenableEdit(seq)}
                    variant="contained"
                  >
                    ??????
                  </Button>
                  <Button
                    color="secondary"
                    size="large"
                    className="btn red-btn"
                    onClick={() => deleteConfirmseq(seq)}
                    variant="contained"
                  >
                    ??????
                  </Button>
                  </TableCell>    
              </TableRow>
            )))}
            </TableBody>
            </Table>
            <form className="insertForm" onSubmit={submitOrderdetail}>
                <label htmlFor="Salesorder_Name">????????????</label>
                <input
                  type="text"
                  id="Salesorder_Name"
                  defaultValue={OrderId}
                  onChange={(e) => addNewOrderdetail(e, "OrderId")}
                  placeholder="Enter name"
                  autoComplete="off"
                  required
                />
                <label htmlFor="Salesorder_ID">????????????:</label>
                <Select
                  labelId="ProdId"
                  id="ProdId"
                  defaultValue ={0}
                  onChange={(e) => addNewOrderdetail(e, "ProdId")}
                  >
                  {products.map((product) =>(
                  <MenuItem value={product.Product_ID}>{product.Product_Name}</MenuItem>
                  ))}
                </Select>
                <label htmlFor="_email">??????:</label>
                <input
                  type="text"
                  id="Salesorder_Name"
                  onChange={(e) => addNewOrderdetail(e, "Qty")}
                  placeholder="Enter name"
                  autoComplete="off"
                  required
                />
                <label htmlFor="_email">??????:</label>
                <input
                  type="text"
                  id="Salesorder_Name"
                  onChange={(e) => addNewOrderdetail(e, "Discount")}
                  placeholder="Enter name"
                  autoComplete="off"
                  required
                />
                <input type="submit" value="??????" />
              </form>
          </AccordionDetails>
                </Accordion>
              )))}
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

SalesorderListResults.propTypes = {
  Salesorders: PropTypes.array.isRequired
};

export default SalesorderListResults;
