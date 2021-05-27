import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Checkbox, ButtonGroup } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { green, orange } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[400],
    },
    secondary: {
      main: orange[400],
    },
  },
});

function CheckboxExample() {
  const [checked, setChecked] = React.useState(true);
  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={(event) => {
          setChecked(event.target.checked);
        }}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      checkbox測試
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #333, #999)",
    border: 0,
    borderRadius: 15,
    color: "white",
    padding: "5px 30px",
    marginBottom: 10,
  },
});

function ButtonStyled() {
  const classes = useStyles();
  return <Button className={classes.root}>我是自帶樣式的按鈕</Button>;
}

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={outerTheme}>
      <div className="App">
        <AppBar color="primary">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
            <Typography variant="h6">News</Typography>
            <Button color="secondary">Login</Button>
          </Toolbar>
        </AppBar>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Typography variant="h4">歡迎來到 MUI</Typography>
          <Typography variant="subtitle1">Material UI</Typography>
          <ButtonStyled />
          <TextField
            id="input-with-icon-textfield"
            label="TextField"
            type="email"
            placeholder="test@gmail.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField id="standard-basic" label="Number" type="Number" />
          <CheckboxExample />
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              size="large"
              disableElevation
              endIcon={<DeleteIcon />}
            >
              Default
            </Button>
            <Button color="primary" style={{ fontSize: 16 }}>
              Primary
            </Button>
            <Button
              startIcon={<SaveIcon />}
              variant="outlined"
              color="secondary"
              onClick={() => {
                alert("clicked");
              }}
              endIcon={<SaveIcon />}
            >
              > Secondary
            </Button>
            <Button
              variant="contained"
              color="primary"
              href="#contained-buttons"
            >
              Link
            </Button>
          </ButtonGroup>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
