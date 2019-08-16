import React from 'react';
import Rule from './Rule';

interface OwnProps {
  rules: Array<{
    pattern: [number, number, number],
    result: 0 | 1,
  }>,
  onRulesChange(newRules: any): void;
}

interface OwnState {

}

type Props = OwnProps;

class Rules extends React.Component<Props, OwnState> {
  onRulesChange = (idx: number, value: 0 | 1) => {
    this.props.onRulesChange(this.props.rules.map((rule, i) => (
      idx === i
        ? {
          pattern: rule.pattern,
          result: value,
        }
        : rule
    )))
  }


  render() {
    return (
      <div>
        {
          this.props.rules.map((rule, i) => (
            <Rule rule={rule.pattern} result={rule.result} onResultChange={(result) => this.onRulesChange(i, result)} />
          ))
        }
      </div>
    );
  }
}

export default Rules;