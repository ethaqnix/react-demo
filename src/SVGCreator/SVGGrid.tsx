import React from 'react';
import SVGLine from './SVGLine';

interface OwnProps {
  nbLines: number,
  nbRows?: number,
  valuesArray: number[][],
  filledColor?: any,
}

interface OwnState {

}

type Props = OwnProps;

class SVGGrid extends React.Component<Props, OwnState> {
  render() {
    const { valuesArray, nbLines, nbRows: propsNbRows, filledColor } = this.props;
    const nbRows = propsNbRows || nbLines;
    const verticalLineArray = new Array(nbRows + 1).fill(0).map((elem, i) => ({
      pointA: {
        x: i / (nbRows) * 1000,
        y: 0,
      },
      pointB: {
        x: i / (nbRows) * 1000,
        y: 1000
      }
    }));
    const horizontalLineArray = new Array(nbLines + 1).fill(0).map((elem, i) => ({
      pointA: {
        x: 0,
        y: i / (nbLines) * 1000,
      },
      pointB: {
        x: 1000,
        y: i / (nbLines) * 1000
      }
    }));

    return ([
      valuesArray.map((line: number[], i: number) => (
        line.map((item: number, j: number) => (
          item === 1
            ? <rect x={j * (1000 / nbRows)} y={i * (1000 / nbLines)} width={1000 / nbRows} height={1000 / nbLines} fill={filledColor || '#000000'} />
            : null
        ))
      )),
      horizontalLineArray.map((line) => (
        <SVGLine pointA={line.pointA} pointB={line.pointB} />
      )),
      verticalLineArray.map((line) => (
        <SVGLine pointA={line.pointA} pointB={line.pointB} />
      )),
    ]);
  }
}


export default SVGGrid;