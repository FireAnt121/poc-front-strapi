/*
 *
 * HomePage
 *
 */

import React, { memo , Component} from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        { title: 'Chicken', children: [{ title: 'Egg', children: [{ title: 'Egg' }] }] },
        { title: 'Fish', children: [{ title: 'fingerline' }] },
      ],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.state.treeData)
  }

  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}

export default memo(App);
