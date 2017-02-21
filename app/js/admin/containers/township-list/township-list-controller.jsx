import React from 'react';
import { Provider } from 'react-redux';
import TownshipListRoot from './township-list-root.jsx';
import store from '../../store/store.js';


export default class TownshipListController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <TownshipListRoot />
      </Provider>
    );
  }
}