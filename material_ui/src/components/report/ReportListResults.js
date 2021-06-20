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
  TablePagination,
  TableRow,
  Typography,
  TextField
} from '@material-ui/core';
import { AppContext } from "../../Context"

const ReportListResults = ({ ...rest }) => {
  const { reports } = useContext(AppContext);
  const [startDate, setStartDate] = useState('2016-01-01');
  const [endDate, setEndDate] = useState('2018-01-01');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  function gDate(datestr){
    var temp = datestr.split("-");
    var date = new Date(temp[0],temp[1],temp[2]);
    return date;
  }

  var start = gDate(startDate)
  var end = gDate(endDate)

  const newReports = reports.filter((Report) =>{
    let newdate = gDate(Report.OrderDate)
    return(
      newdate.getTime() >= start.getTime() &&
      newdate.getTime() <= end.getTime()
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
                  label="開始日期"
                  margin="normal"
                  name="startDate"
                  onChange={(e) => handleStartDateChange(e, "startDate")}
                  type="date"
                  value={startDate}
                  variant="outlined"
                />
        </TableCell>
        <TableCell>
          <TextField
                  fullWidth
                  label="結束日期"
                  margin="normal"
                  name="endDate"
                  onChange={(e) => handleEndDateChange(e, "endDate")}
                  type="date"
                  value={endDate}
                  variant="outlined"
                />
        </TableCell>
        </TableRow>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  日期
                </TableCell>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  客戶名稱
                </TableCell>
                <TableCell>
                  負責員工
                </TableCell>
                <TableCell>
                  總金額
                </TableCell>
                <TableCell>
                  總利潤
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newReports.map(({OrderDate,OrderId,CustName,EmpName,money,profit}) => (
                <TableRow
                  hover
                  key={OrderId}
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
                        {OrderDate}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {OrderId}
                  </TableCell>
                  <TableCell>
                    {CustName}
                  </TableCell>
                  <TableCell>
                    {EmpName}
                  </TableCell>
                  <TableCell>
                    {money}
                  </TableCell>
                  <TableCell>
                    {profit}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

ReportListResults.propTypes = {
  Reports: PropTypes.array.isRequired
};

export default ReportListResults;
