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

import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PostCard from "../components/Card"
import NewCategory from "../components/NewCategory"
import NewResource from "../components/NewResource"
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

function ResourcesDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [category, setCategory] = React.useState({name: '', description: ''})
  const [categories, setCategories] = React.useState({categories: []})

  const [posts, setPosts] = React.useState({posts: []});
  React.useEffect(() => {
    axios.get("/resources")
    .then(response => {
      setPosts({posts: response.data})
    })
    .catch(error => {
      console.log(error);
    })

    axios.get("/categories")
    .then(response => {
      console.log(response.data);
      setCategories({categories: response.data})
    })
    .catch(error => {
      console.log(error);
    })

  }, []);

  const handleClick = (prop) => async(event) => {
    const name = event.target.innerText
    console.log(event.target);
    console.log(event.target.innerText);

    const url = "/categories/" + name

    await axios.get(url)
    .then(response => {
      setCategory({ name:name, description: response.data.description })
      console.log(response.data.posts);
      console.log(category);
      setPosts({posts: response.data.resources})
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
      <NewCategory user={props.user}/>
      <Divider />
      <List>
      {/* ['Celebrity Portrait', 'Fall painting', 'Winter Painting', 'Pointilism Portrait'] */}
        {categories.categories? categories.categories.map((category, index) => (
          <ListItem button key={index}>
            <button style={{textAlign:"left",width: "100%", backgroundColor:'#ffffff', border:'none', outline:'none'}} onClick={handleClick('name')} primary={category.name}>{category.name}</button>
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
            Art Resources
          </Typography>
          <Typography variant="h6" noWrap>
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/"> | Art Inspo</Link>
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
          <h1>{category.name} { category.name !== '' ? <NewResource user={props.user} challenge={category.name}/>: null}</h1>

        <Typography style={{paddingBottom:"2%"}}>
        {category.description}
        </Typography>

        <Grid container spacing={1}>
          {posts.posts? posts.posts.map(post => {
            return <Grid item xs={6} sm={4} spacing={3}>
            <PostCard img={post.img} user={post.user} title={post.title} content={post.content} date={post.createdAt}/>
          </Grid>
          }) : null}

      </Grid>



      </main>
    </div>
  );
}

ResourcesDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResourcesDrawer;
