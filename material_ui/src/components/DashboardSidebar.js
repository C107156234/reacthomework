import { useEffect } from 'react';
import { Link as RouterLink, useLocation,Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import { useState, useContext } from "react";
import { AppContext } from "../Context"

const items = [
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: '產品列表'
  },
  {
    href: '/app/Order',
    icon: SettingsIcon,
    title: '訂單列表'
  },
  {
    href: '/app/Report',
    icon: UserIcon,
    title: '銷售報表'
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  const { loginUser } = useContext(AppContext);


  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);


  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Typography
          color="textPrimary"
          variant="h5"
        >
          員工編號:{loginUser[0].EmpId}
        </Typography>
        <Typography
          color="textPrimary"
          variant="h5"
        >
          員工姓名:{loginUser[0].EmpName}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          部門名稱:{loginUser[0].DeptName}
        </Typography>
        <Typography
          color="textPrimary"
          variant="h5"
        >
          職稱:{loginUser[0].Jobtitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};
export default DashboardSidebar;
