import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import data from '../../../data';

import { get, isEmpty } from '../../../helpers';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.tag,
      data: {},
      loading: true
    };
  }

  componentDidMount() {
    const { id } = this.state;

    this.setState({
      data: get(data, id, {}),
      loading: false
    });
  }

  getTags(item, value, key) {
    return (
      <div className="tag-detail-item" key={key}>
        <p className="tag-detail-item-label">{item.label}:</p>

        <div className="tag-detail-tags">
          {
            Object.entries(value)
              .map(([key, value], index) => (
                <div className="tag-detail-tags-item" key={index}>
                  <div className="tag-detail-tag-label">{key}:</div>
                  <div className="tag-detail-tag-value">{value}</div>
                </div>
              ))
          }
        </div>
      </div>
    );
  }

  get data() {
    const { data } = this.state;

    const model = [
      { label: 'Label', path: 'label' },
      { label: 'Total Mentions', path: 'sentimentScore' },
      { label: 'Positive Mentions', path: 'sentiment.positive', defaultValue: 0 },
      { label: 'Neutral Mentions', path: 'sentiment.neutral', defaultValue: 0 },
      { label: 'Negative Mentions', path: 'sentiment.negative', defaultValue: 0 },
      { label: 'List of page types', path: 'pageType', renderer: this.getTags.bind(this) },
    ];

    return (
      <div className="tag-detail-row">
        {
          model.map((item, key) => {
            const {
              renderer,
              defaultValue = ''
            } = item;
            const value = get(data, item.path, defaultValue);

            if (item.renderer && typeof renderer === 'function') {
              return renderer(item, value, key);
            }

            return (
              <div className="tag-detail-item" key={key}>
                <p className="tag-detail-item-label">{item.label}:</p>
                <p className="tag-detail-item-value">{value}</p>
              </div>
            );
          })
        }
      </div>
    );
  }

  render() {
    const { data, loading } = this.state;

    if (isEmpty(data) && !loading) {
      return (
        <div className="error-page">
          <div className="error-page-content">
            <p className="error-page-code">404</p>
            <p className="error-page-desc">Sorry, the page you are looking for could not be found</p>

            <div>
              <Link to="/" className="error-page-link">Go Home</Link>
            </div>
          </div>

          <div className="error-page-bg"/>
        </div>
      );
    }

    return (
      <div className="tag-detail">
        {this.data}
      </div>
    );
  }
}
