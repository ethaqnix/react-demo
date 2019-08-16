import { Button, Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import SVGLine from '../SVGCreator/SVGLine';

interface OwnProps {
  classes: any,
}

interface OwnState {
  n: number,
  k: number,
  intervalId: any,
  color: string,
  stopColor: string,
}

type Props = OwnProps;

class MandelbrotCircle extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      n: 2,
      k: 1,
      intervalId: null,
      color: "rgb(205,133,63)",
      stopColor: "rgb(0,0,63)"
    }
  }

  getPoints = () => (
    new Array(this.state.n).fill(0).map((point, i) => {
      return ({
        y: 500 + Math.sin((i / this.state.n) * (2 * Math.PI)) * 500,
        x: 500 + Math.cos((i / this.state.n) * (2 * Math.PI)) * 500
      })
    })
  )

  getLine = (n: number, k: number) => {

  }

  getLines = () => {
    const points = this.getPoints();
    const lines = []
    for (let i = 0; i < this.state.n; i++) {
      lines.push(points[(i * this.state.k) % this.state.n])
    }
    return (lines);
  }

  handlePlayButton = async () => {
    if (this.state.intervalId) {
      await clearInterval(this.state.intervalId);
      this.setState({
        intervalId: null,
      })
    } else {

      this.setState({
        intervalId: setInterval(() => {
          if (this.state.k + 1 === this.state.n) {
            const newState = {
              k: 0,
              n: this.state.n + 1,
              stopColor: this.state.color,
              color: getNextColor(),
            }
            this.setState(newState);
          } else {
            this.setState({
              k: this.state.k + 1,
            })
          }
        }, 300)
      })
    }
  }



  render() {
    const { classes } = this.props;
    const lines = this.getLines();
    const points = this.getPoints();
    return (
      <div className={classes.root}>
        <div className={classes.rules}>
          <Button variant="contained" onClick={this.handlePlayButton} className={classes.button}>
            {this.state.intervalId ? "Stop" : "Play"}
          </Button>
          <Slider
            name="nombre d'itérations"
            value={this.state.n}
            onChange={(event: any, newValue: number | number[]) => {
              if (!Array.isArray(newValue))
                this.setState({ n: newValue })
            }}
            aria-labelledby="continuous-slider"
            max={200}
            min={1}
            valueLabelDisplay='auto'
          />
          <Slider
            name="coefficient"
            valueLabelDisplay='auto'
            value={this.state.k}
            onChange={(event: any, newValue: number | number[]) => {
              if (!Array.isArray(newValue))
                this.setState({ k: newValue })
            }}
            aria-labelledby="continuous-slider"
            max={this.state.n}
            min={1}
          />

        </div>
        <svg viewBox="0 0 1000 1000" height="800" width="800" className={classes.svgGrid}>
          <defs>
            {/*<radialGradient id="exampleGradient">
              <stop offset="0%" stop-color={"#FFFFFF"} />
              <stop offset={`${this.state.k / this.state.n * 100}%`} stop-color={this.state.color} />
              <stop offset="100%" stop-color={this.state.stopColor} />
            </radialGradient>*/}
          </defs>
          <circle cx="500" cy="500" r="500" fill="url(#exampleGradient)" stroke={"black"} strokeWidth={1} />
          {
            lines.map((line, i) => (
              <SVGLine pointA={points[i % this.state.n]} pointB={line} />
            ))
          }
        </svg>
      </div>
    );
  }
}

function getNextColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const styles = {
  root: {
    margin: 10,
    display: 'flex',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  rules: {
    flex: 1
  },
  svgGrid: {
    flex: 2,
    justifyContent: 'center',
  }
};


export default withStyles(styles)(MandelbrotCircle);