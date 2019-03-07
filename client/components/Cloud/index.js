import React, { Component } from 'react';
import Item from './item';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = {};

    this.state = {
      data: props.data.slice() || []
    };

    this.handleItem = this.handleItem.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidUpdate(props) {
    if (this.props.data !== props.data) {
      this.setState({
        date: this.props.data.slice()
      });
    }
  }

  handleResize() {
    const { data } = this.state;

    this.setState({
      data: []
    }, () => {
      this.setState({ data });
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize, true);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, true);
  }

  getFontSize(item, data) {
    const max = 550;
    const last = data.length - 1;

    if (item.volume > data[last].volume) {
      const size = Math.round(
        (item.volume - data[last].volume) /
        (data[0].volume - data[last].volume) * 9.0
      ) + 1;

      return max - (
        size < 10
          ? 50 * (10 - size)
          : 0
      ) + '%';
    }

    return '100%';
  }

  handleItem(item, index, data) {
    const style = {
      fontSize: this.getFontSize(item, data)
    };

    return (
      <Item data={{ main: this.props.data, item, index }}
            style={style}
            options={this.options}
            key={index}
      />
    );
  }

  render() {
    const container = document.getElementById('root');
    const { width, height } = container.getBoundingClientRect();
    const center = {
      y: height / 2,
      x: width / 2
    };

    this.options = {
      width,
      height,
      center,
      step: 2,
      ration: width / height,
      history: []
    };

    const data = this.state.data.sort((a, b) => b.volume - a.volume);

    return data.map(
      this.handleItem
    );
  }
}
