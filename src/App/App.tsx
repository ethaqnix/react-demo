import { withStyles } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from './Menu';
import AppBar from '../AppBar/AppBar';
import LifeGame from '../LifeGame/LifeGame';
import MandelbrotCircle from '../MandelbrotCircle/MandelbrotCircle';

const routes = [{
  name: 'Life Game',
  route: '/lifeGame',
  component: LifeGame,
}, {
  name: 'Home',
  route: '/home',
  component: () => <h2>Home</h2>,
},
{
  name: 'Mandelbrot Circle',
  route: '/Mandelbrot',
  component: MandelbrotCircle,
}]

class App extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      menuOpen: false,
    }
  }

  handleClickMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  render() {
    const { classes } = this.props;
    return ([
      <AppBar onClickMenu={this.handleClickMenu} open={this.state.menuOpen} />,
      <div className={classes.root}>
        {this.state.menuOpen && <Menu routes={routes} />}
        <Router>
          <div className={classes.route}>
            {
              routes.map((route) => (
                <Route path={route.route} exact component={route.component} />
              ))
            }
          </div>
        </Router>
      </div>
    ]);
  }
}

const styles = {
  root: {
    flex: 1,
    display: 'flex',
  },
  route: {
    flex: 1,
  }
};

export default withStyles(styles)(App);
