/*
 *
 * HomePage
 *
 */

import React, { Component, memo, useState, useEffect, useRef } from 'react';

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
