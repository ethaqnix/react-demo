import { CSSProperties } from '@material-ui/styles';
import React from 'react';

interface OwnProps {
  pointA: { x: number, y: number },
  pointB: { x: number, y: number },
  style?: CSSProperties,
}

interface OwnState {

}

type Props = OwnProps;

class SVGLine extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);

    this.state = {
    }
  }


  render() {
    const { pointA, pointB, style: propsStyle } = this.props;
    const style = propsStyle || { stroke: 'black' };
    return (
      <line x1={pointA.x} y1={pointA.y} x2={pointB.x} y2={pointB.y} style={style} strokeWidth="1" />
    );
  }
}



export default SVGLine;