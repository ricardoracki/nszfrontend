import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import CategoryIcon from '@material-ui/icons/Category';

import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';
import {logoff} from '../services/user';

import sidebarStyles from '../assets/styles/components/sidebarStyles';

const useStyles = makeStyles(sidebarStyles)

export default function Types() {
  const classes = useStyles();
  const history = useHistory();

  return <div className={classes.asidebar}>
    <div>
      <ListItem button className={classes.listItem} onClick={() => history.push('/')}>
        <ListItemIcon  className={classes.listItem}>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </div>
    <div className={classes.routerBox}>
    <ListItem button  className={classes.listItem} onClick={() => history.push('/')}>
      <ListItemIcon  className={classes.listItem}>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Pesquisar" />
    </ListItem>

    <ListItem button  className={classes.listItem} onClick={() => history.push('/newmachine')}>
      <ListItemIcon  className={classes.listItem}>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary="Adicionar" />
    </ListItem>

    <ListItem button  className={classes.listItem} onClick={() => history.push('/clients')}>
      <ListItemIcon  className={classes.listItem}>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Clientes" />
    </ListItem>

    <ListItem button  className={classes.listItem} onClick={() => history.push('/categories')}>
      <ListItemIcon  className={classes.listItem}>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Categorias" />
    </ListItem>

    <ListItem button  className={classes.listItem} onClick={() => history.push('/users')}>
      <ListItemIcon  className={classes.listItem}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuários" />
    </ListItem>

    </div>
    <div>
    <ListItem button  className={classes.listItem} onClick={() => {
      logoff();
      history.push('/sign')
    }}>
      <ListItemIcon  className={classes.listItem}>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
    </div>
  </div>
}