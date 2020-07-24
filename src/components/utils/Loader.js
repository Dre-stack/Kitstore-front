import React from 'react';
import Loader from 'react-loader-spinner';

export default class App extends React.Component {
  //other logic
  render() {
    if (this.props.render) {
      return (
        <Loader
          type="Puff"
          color="#eb5757"
          height={100}
          width={100}
        />
      );
    } else {
      return '';
    }
  }
}
