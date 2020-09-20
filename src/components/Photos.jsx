import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PostCard from "../components/Card"
import NewTheme from "./NewTheme"
import NewPhoto from "../components/NewPhoto"
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import { Link } from 'react-router-dom';




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function PhotosDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [photo_theme, setTheme] = React.useState({name: '', description: ''})
  const [themes, setThemes] = React.useState({themes: []})
  const [photos, setPhotos] = React.useState({photos: []});

  React.useEffect(() => {
    axios.get("/photos")
    .then(response => {
      setPhotos({photos: response.data})
    })
    .catch(error => {
      console.log(error);
    })

    axios.get("/themes")
    .then(response => {
      console.log(response.data);
      setThemes({themes: response.data})
    })
    .catch(error => {
      console.log(error);
    })

  }, []);

  const handleClick = (prop) => async(event) => {
    const name = event.target.innerText
    console.log(event.target);
    console.log(event.target.innerText);

    const url = "/themes/" + name

    await axios.get(url)
    .then(response => {
      setTheme({ name:name, description: response.data.description })
      console.log(response.data.photos);
      console.log(theme);
      setPhotos({photos: response.data.photos})
    })
    .catch(error => {
      console.log(error);
    })
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <NewTheme user={props.user}/>
      <Divider />
      <List>
      {/* ['Celebrity Portrait', 'Fall painting', 'Winter Painting', 'Pointilism Portrait'] */}
        {themes.themes? themes.themes.map((theme, index) => (
          <ListItem button key={index}>
            <button style={{textAlign:"left",width: "100%", backgroundColor:'#ffffff', border:'none', outline:'none'}} onClick={handleClick('name')} primary={theme.name}>{theme.name}</button>
          </ListItem>
        )): null}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/"> <HomeIcon /></Link>
          </Typography>
          <Typography variant="h6" noWrap>
          &ensp; Photo Inspo
          </Typography>
          
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <h1>{photo_theme.name} { photo_theme.name !== '' ? <NewPhoto user={props.user} theme={photo_theme.name}/>: null}</h1>

        <Typography style={{paddingBottom:"2%"}}>
        {theme.description}
        </Typography>

        <Grid container spacing={1}>
          {photos.photos? photos.photos.map(photo => {
            return <Grid item xs={6} sm={4} spacing={3}>
            <PostCard img={photo.img} user={photo.user} title={photo.title}  date={photo.createdAt}/>
          </Grid>
          }) : null}

      </Grid>



      </main>
    </div>
  );
}

PhotosDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default PhotosDrawer;
