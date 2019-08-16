import { createStyles, makeStyles, Theme } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';


interface OwnProps {
  routes: { name: string, route: string }[],
  children?: JSX.Element,
}

interface OwnState {

}

type Props = OwnProps;

const Menu = (props: OwnProps) => {
  const ListItemLink = (props: { href: string, to: string, children?: JSX.Element }) => {
    return <ListItem button component="a" {...props} />;
  }
  const classes = useStyles();
  const { routes } = props;
  return (
    <div className={classes.root}>
      <nav>
        <List component="nav" aria-label="main mailbox folders">
          {
            routes.map((route) => (
              <ListItemLink href={route.route} to={route.route}>
                <ListItemText primary={route.name} />
              </ListItemLink>
            ))
          }
        </List>
      </nav>
    </div >
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '20%',
      height: '100vh',
      backgroundColor: 'blue',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default Menu;