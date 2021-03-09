import React, { Component } from "react";

const whFilterStyle = {
  fontSize: 12,
  width: "95%",
  marginTop: 6
};

class FilterSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.options[0].value,
      options: this.props.options
    };
  }

  handleOnChange = event => {
    console.log(event.target.value);
    this.setState(
      {
        value: event.target.value
      },
      () => this.props.handleOnChange(this.state.value)
    );
  };

  render() {
    return (
      <div>
        <select
          onChange={this.handleOnChange}
          value={this.state.value}
          style={whFilterStyle}
        >
          {createSelectItems(this.state.options)}
        </select>
      </div>
    );
  }
}

export function createSelectItems(opts) {
  let items = [];
  for (let i = 0; i < opts.length; i++) {
    items.push(
      <option key={opts[i].value} value={opts[i].value}>
        {opts[i].label}
      </option>
    );
  }
  return items;
}

export default FilterSelect;
