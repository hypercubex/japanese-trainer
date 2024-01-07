import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useAlphabetContext } from '../hooks/useAlphabetContext';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const MainLayout = ({ children }) => {
  const classes = useStyles();
  const { selectedAlphabetType, updateSelectedAlphabetType } = useAlphabetContext();

  const handleMenuChange = (value) => {
    updateSelectedAlphabetType(value);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Alphabet Practice
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem
              button
              onClick={() => handleMenuChange('hiragana')}
              className={selectedAlphabetType === 'hiragana' ? classes.active : ''}
            >
              <ListItemText primary="Hiragana" />
            </ListItem>
            <ListItem
              button
              onClick={() => handleMenuChange('katakana')}
              className={selectedAlphabetType === 'katakana' ? classes.active : ''}
            >
              <ListItemText primary="Katakana" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;