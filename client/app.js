import 'normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { QueryRenderer, graphql } from 'react-relay';

import environment from './services/relay/environment'
import App from './components/App/AppComponent'

ReactDOM.render(
  <QueryRenderer
    environment={environment}
    query={graphql`
      query appQuery {
        viewer {
          ...TodoApp_viewer
        }
      }
    `}
    variables={{}}
    render={({error, props}) => {
      if (props) {
        return <App />;
      } else {
        return <div>Loading</div>;
      }
    }}
  />,
  document.getElementById('root'),
);
