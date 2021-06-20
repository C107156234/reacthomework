import { useState,useContext } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  Button,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TextField
} from '@material-ui/core';
import { AppContext } from "../../Context"

const ProductListResults = ({ ...rest }) => {
  const { products,
          ProducteditMode,
          ProductcancelEdit,
          updateProduct,
          insertProduct,
          deleteProduct, } = useContext(AppContext);
  const [searchText, setSearchText] = useState('');
  const [newData, setNewData] = useState({});
  const [newProduct, setNewProduct] = useState({});

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const saveBtn = () => {
    updateProduct(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (Product_ID, Product_Name, Product_UnitPrice, Product_Cost) => {
    setNewData({ Product_ID, Product_Name, Product_UnitPrice, Product_Cost });
    ProducteditMode(Product_ID);
  };

  const deleteConfirm = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteProduct(id);
    }
  };

  const addNewProduct = (e, field) => {
    setNewProduct({
      ...newProduct,
      [field]: e.target.value,
    });
  };

  const submitProduct = (e) => {
    e.preventDefault();
    insertProduct(newProduct);
    e.target.reset();
  };

  const newProducts = products.filter((product) =>{
    return(
      product.Product_Name.includes(searchText)
    )
  })

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
        <TextField
                  fullWidth
                  label="產品查詢"
                  margin="normal"
                  name="searchText"
                  onChange={(e) => handleSearchChange(e, "searchText")}
                  type="searchText"
                  value={searchText}
                  variant="outlined"
                />
        <form className="insertForm" onSubmit={submitProduct}>
      <h2>新增產品</h2>
      <label htmlFor="Product_Name">產品名稱</label>
      <input
        type="text"
        id="Product_Name"
        onChange={(e) => addNewProduct(e, "Product_Name")}
        placeholder="Enter name"
        autoComplete="off"
        required
      />
      <label htmlFor="Product_ID">ID</label>
      <input
        type="text"
        id="Product_ID"
        onChange={(e) => addNewProduct(e, "Product_ID")}
        placeholder="Enter ID"
        autoComplete="off"
        required
      />
      <label htmlFor="Product_UnitPrice">單價</label>
      <input
        type="text"
        id="Product_UnitPrice"
        onChange={(e) => addNewProduct(e, "Product_UnitPrice")}
        placeholder="Enter UnitPrice"
        autoComplete="off"
        required
      />
      <label htmlFor="_email">成本</label>
      <input
        type="text"
        id="_email"
        onChange={(e) => addNewProduct(e, "Product_Cost")}
        placeholder="Enter Cost"
        autoComplete="off"
        required
      />
      <input type="submit" value="新增" />
    </form>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  名稱
                </TableCell>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  單價
                </TableCell>
                <TableCell>
                  成本
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newProducts.map(({Product_ID,Product_Name,Product_UnitPrice,Product_Cost,isEditing}) => (
                isEditing === true ? (
                  <TableRow
                  hover
                  key={Product_ID}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                  <Typography>
                <input
                  type="text"
                  defaultValue={Product_Name}
                  onChange={(e) => updateNewData(e, "Product_Name")}
                />
              </Typography>
              </Box>
              </TableCell>
              <TableCell>
              <input
                  type="text"
                  defaultValue={Product_ID}
                  disabled
                  onChange={(e) => updateNewData(e, "Product_ID")}
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  defaultValue={Product_UnitPrice}
                  onChange={(e) => updateNewData(e, "Product_UnitPrice")}
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  defaultValue={Product_Cost}
                  onChange={(e) => updateNewData(e, "Product_Cost")}
                />
              </TableCell>
              <TableCell>
                <Button
                    color="primary"
                    size="large"
                    variant="contained"
                    className="btn green-btn" 
                    disabled={!newData.Product_ID || !newData.Product_Name || !newData.Product_UnitPrice || !newData.Product_Cost} 
                    onClick={() => saveBtn()}>
                    儲存
                  </Button>
                <Button
                    color="secondary"
                    size="large"
                    variant="contained"
                    className="btn default-btn"
                    onClick={() => ProductcancelEdit(Product_ID)}
                  >
                   取消
                  </Button>
              </TableCell>
            </TableRow>
                ) : (
                <TableRow
                  hover
                  key={Product_ID}
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
                        {Product_Name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {Product_ID}
                  </TableCell>
                  <TableCell>
                    {Product_UnitPrice}
                  </TableCell>
                  <TableCell>
                    {Product_Cost}
                  </TableCell>
                  <TableCell>
                <Button
                    color="primary"
                    size="large"
                    variant="contained"
                    className="btn default-btn"
                    onClick={() => enableEdit(Product_ID, Product_Name, Product_UnitPrice, Product_Cost)}
                  >
                    修改
                  </Button>
                <Button
                    color="secondary"
                    size="large"
                    variant="contained"
                    className="btn red-btn"
                    onClick={() => deleteConfirm(Product_ID)}
                  >
                    刪除
                  </Button>
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

ProductListResults.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductListResults;
