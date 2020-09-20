import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios'
import PostCard from "../components/Card"
import Resource from "../components/Resource"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  media: {
    height: "25vh",
    paddingTop: '56.25%', // 16:9
  }
});

export default function UserTab(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [resources, setResources] = React.useState({resources: []})
  const [posts, setPosts] = React.useState({posts: []});
  const [photos, setPhotos] = React.useState({photos: []});


  React.useEffect(() => {
    console.log(props.user);
    axios.get("/posts/"+props.user)
    .then(response => {
      setPosts({posts: response.data})
      // console.log('posts for user', posts);
    })
    .catch(error => {
      console.log(error);
    })

    axios.get("/resources/"+props.user)
    .then(response => {
      setResources({resources: response.data})
    })
    .catch(error => {
      console.log(error);
    })

    axios.get("/photos/"+props.user)
    .then(response => {
      setPhotos({photos: response.data})
    })
    .catch(error => {
      console.log(error);
    })

  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <Paper position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Art" {...a11yProps(0)} />
          <Tab label="Photos" {...a11yProps(1)} />
          <Tab label="Posts" {...a11yProps(2)} />
        </Tabs>
      </Paper>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Grid container spacing={1}>
          {posts.posts.map(post => {
            return <Grid item xs={6} sm={4} spacing={3}>
            {/* <PostCard img={post.img} user={post.user} title={post.title} content={post.content} date={post.createdAt}/> */}
          <Card>
            <CardContent>
            <CardMedia
        className={classes.media}
        image={'http://localhost:8080/'+post.img}
        title={post.title}/>

            </CardContent>

            </Card>


          </Grid>
          }) }

      </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <Grid container spacing={1}>
          {photos.photos.map(photo => {
            return <Grid item xs={6} sm={4} spacing={3}>
            <PostCard img={photo.img} user={photo.user} title={photo.title} date={photo.createdAt}/>
          </Grid>
          }) }

      </Grid>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <Grid container spacing={1}>
          {resources.resources.map(resource => {
            return <Grid item xs={6} sm={4} spacing={3}>
            <Resource user={resource.user} title={resource.title} content={resource.content} date={resource.createdAt}/>
          </Grid>
          }) }

      </Grid>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
