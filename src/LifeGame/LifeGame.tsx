import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import Rules from './Rules';
import Grid from '../SVGCreator/SVGGrid';


interface OwnProps {
  classes: any,
}

interface OwnState {
  intervalId: any;
  valuesArray: number[][],
  nbLines: number,
  nbRows: number,
  rules: Array<{
    pattern: [number, number, number],
    result: 0 | 1,
  }>
}

type Props = OwnProps;

class LifeGame extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      intervalId: null,
      valuesArray: [[1]],
      nbLines: 1,
      nbRows: 1,
      rules: [{
        pattern: [0, 0, 0],
        result: 1
      },
      {
        pattern: [0, 0, 1],
        result: 1
      },
      {
        pattern: [0, 1, 0],
        result: 1
      },
      {
        pattern: [0, 1, 1],
        result: 1
      },
      {
        pattern: [1, 0, 0],
        result: 1
      },
      {
        pattern: [1, 0, 1],
        result: 1
      },
      {
        pattern: [1, 1, 0],
        result: 0
      },
      {
        pattern: [1, 1, 1],
        result: 0
      }]
    }
  }

  onRulesChange = (newRules: any) => {
    console.log(newRules);
    this.setState({
      rules: newRules
    })
  }

  handlePlayButton = async () => {
    if (this.state.intervalId) {
      await clearInterval(this.state.intervalId);
      this.setState({
        intervalId: null,
      })
    } else {
      this.setState({
        intervalId: setInterval(this.play, 400)
      })
    }
  }

  applyPatern = (pattern: [number, number, number]) => {
    let res = 0;
    this.state.rules.forEach((rule) => {
      if (rule.pattern.length === pattern.length && rule.pattern.every((value, index) => { return value === pattern[index] })) {
        res = rule.result
      }
    })
    return res;
  }

  play = () => {

    const newLine = this.executePattern(this.state.valuesArray[this.state.valuesArray.length - 1])
    this.setState({
      valuesArray: [...this.state.valuesArray.map((lineValues) => (
        [0, ...lineValues, 0]
      )), newLine]
    }, () => {
    });
  }

  executePattern = (lastLine: Array<number>) => {
    this.setState({
      nbLines: this.state.nbLines + 1,
      nbRows: this.state.nbRows + 2,
    })
    return [0, ...lastLine, 0].reduce((acc: Array<number>, cur: number, i: number, line) => {

      if (i === 0) {
        return [this.applyPatern([0, cur, lastLine[0]])]
      } else if (i === lastLine.length + 1) {
        return [...acc, this.applyPatern([lastLine[lastLine.length - 1], cur, 0])]
      } else {
        return [...acc, this.applyPatern([line[i - 1], cur, line[i + 1]])];
      }
    }, [])
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.rules}>
          <Button variant="contained" onClick={this.handlePlayButton} className={classes.button}>
            {this.state.intervalId ? "Stop" : "Play"}
          </Button>
          <Button variant="contained" onClick={() => {
            this.setState({ nbLines: 1, nbRows: 1, valuesArray: [[1]] })
          }} className={classes.button}>
            {"RESET"}
          </Button>
          <Rules rules={this.state.rules} onRulesChange={this.onRulesChange} />
        </div>
        <svg viewBox="0 0 1000 1000" height="1000" width="1000" className={classes.svgGrid}>
          <Grid nbLines={this.state.nbLines} nbRows={this.state.nbRows} valuesArray={this.state.valuesArray} />
        </svg>
      </div>
    );
  }
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
    backgroundColor: 'grey',
    justifyContent: '',
  }
};

export default withStyles(styles)(LifeGame);
