import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useAlphabetContext, AlphabetType } from '../hooks/useAlphabetContext';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    marginLeft: 0,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
}));

const MainLayout = ({ children }) => {
  const classes = useStyles();
  const { selectedAlphabetType, updateSelectedAlphabetType } = useAlphabetContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuChange = (value) => {
    updateSelectedAlphabetType(value);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const alphabetTypes = [
    { type: AlphabetType.HIRAGANA, label: 'Hiragana' },
    { type: AlphabetType.KATAKANA, label: 'Katakana' },
  ];

  const listItems = alphabetTypes.map((item) => (
    <ListItem
      button
      key={item.type}
      onClick={() => handleMenuChange(item.type)}
      selected={selectedAlphabetType === item.type}
    >
      <ListItemText primary={item.label} />
    </ListItem>
  ));

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={`${classes.appBar} ${isDrawerOpen ? classes.appBarShift : ''}`}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            className={`${classes.menuButton} ${isDrawerOpen ? classes.hide : ''}`}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Alphabet Practice
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="close drawer"
            onClick={toggleDrawer}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </Toolbar>
        <div className={classes.drawerContainer}>
          <List>{listItems}</List>
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