import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SalesOrdersListResults from 'src/components/order/SalesOrdersListResults';


const CustomerList = () => (
  <>
    <Helmet>
      <title>SalesOrders | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <SalesOrdersListResults />
        </Box>
      </Container>
    </Box>
  </>
);

export default CustomerList;
