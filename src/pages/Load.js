import React from 'react';

export default class Load extends React.Component {
  render() {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}
