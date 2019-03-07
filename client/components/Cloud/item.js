import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { randomHEX } from '../../helpers';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {}
    };

    this.item = React.createRef();
  }

  overlapping(a, b) {
    return (
      a.offsetLeft < 0 ||
      a.offsetTop < 0 ||
      (a.offsetLeft + a.offsetWidth) > this.props.options.width ||
      (a.offsetTop + a.offsetHeight) > this.props.options.height
    ) || (
      Math.abs(2.0 * a.offsetLeft + a.offsetWidth - 2.0 * b.offsetLeft - b.offsetWidth) < a.offsetWidth + b.offsetWidth &&
      Math.abs(2.0 * a.offsetTop + a.offsetHeight - 2.0 * b.offsetTop - b.offsetHeight) < a.offsetHeight + b.offsetHeight
    );
  }

  check(item, elements) {
    for (let i = 0; i < elements.length; i++) {
      if (this.overlapping(item, elements[i])) {
        return true;
      }
    }

    return false;
  }

  setPosition() {
    this.item.current.style.display = 'block';

    const { data: { index }, options  } = this.props;
    const { center } = options;
    const { width, height } = this.item.current.getBoundingClientRect();

    const step = .9;
    let angle = 3 * Math.random();
    let radius = 0;

    let top = (center.y - height / 2) + 'px';
    let left = (center.x - width / 2) + 'px';

    const element = document.querySelectorAll(`#root div`)[index];
    element.style.top = top;
    element.style.left = left;

    const elements = [].slice
      .call(document.getElementById('root').children)
      .slice(0, index);

    while (this.check(this.item.current, elements)) {
      radius += step;
      angle += (index % 2 === 0 ? 1 : -1) * step;

      top = center.y + radius * Math.sin(angle) - (height / 2) + 'px';
      left = center.x - (width / 2) + (radius * Math.cos(angle)) * radius + 'px';

      element.style.top = top;
      element.style.left = left;
    }

    element.style.top = top;
    element.style.left = left;

    this.setState({
      style: { top, left }
    });
  }

  componentDidMount() {
    this.setPosition();
  }

  render() {
    const {
      data: { main, item },
      style
    } = this.props;

    const index = main.indexOf(item);

    return (
      <div ref={this.item}
           style={{
             ...style,
             ...this.state.style
           }}
           className="tag"
      >
        <Link to={`/home/${index}`}
              className="tag-item"
              style={{
                color: randomHEX()
              }}
        >
          {item.label}
        </Link>
      </div>
    );
  }
}