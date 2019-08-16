import { withStyles } from '@material-ui/core';
import React from 'react';
import SVGLine from '../SVGCreator/SVGLine';

interface OwnProps {
  classes: any,
  rule: [number, number, number]
  result: 0 | 1,
  onResultChange(result: 0 | 1): void,
}

interface OwnState {

}

type Props = OwnProps;

class Rule extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);

    this.state = {
    }
  }


  render() {
    const { classes, rule, result, onResultChange } = this.props;
    return (
      <div className={classes.root}>
        <svg viewBox="0 0 30 10" height="50" width="150" style={{ margin: 10 }}>
          {
            rule.map((value, i) => (
              value === 1 ?
                <rect x={i * 10} y={0} width={10} height={10} fill={'#000000'} />
                : null
            ))
          }
          <SVGLine pointA={{ x: 0, y: 0 }} pointB={{ x: 0, y: 10 }} />
          <SVGLine pointA={{ x: 10, y: 0 }} pointB={{ x: 10, y: 10 }} />
          <SVGLine pointA={{ x: 20, y: 0 }} pointB={{ x: 20, y: 10 }} />
          <SVGLine pointA={{ x: 30, y: 0 }} pointB={{ x: 30, y: 10 }} />
          <SVGLine pointA={{ x: 0, y: 0 }} pointB={{ x: 30, y: 0 }} />
          <SVGLine pointA={{ x: 0, y: 10 }} pointB={{ x: 30, y: 10 }} />
        </svg>
        <svg viewBox="0 0 10 10" height="50" width="50" style={{ margin: 10 }} onClick={() => onResultChange(result === 1 ? 0 : 1)}>
          {
            result && <rect x={0} y={0} width={10} height={10} fill={'#000000'} />
          }

          <SVGLine pointA={{ x: 0, y: 0 }} pointB={{ x: 0, y: 10 }} />
          <SVGLine pointA={{ x: 10, y: 0 }} pointB={{ x: 10, y: 10 }} />
          <SVGLine pointA={{ x: 0, y: 0 }} pointB={{ x: 10, y: 0 }} />
          <SVGLine pointA={{ x: 0, y: 10 }} pointB={{ x: 10, y: 10 }} />
        </svg>
      </div>
    );
  }
}

const styles = {
  root: {
    margin: 10,
    display: 'flex',
    flex: 1,
  },
}

export default withStyles(styles)(Rule);