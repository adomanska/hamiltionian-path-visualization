import React, { Component, createRef } from "react";
import {DataSet, Network} from 'vis';

var nodes = new DataSet([
    {id: 1, label: '1'},
    {id: 2, label: '2'},
    {id: 3, label: '3'},
    {id: 4, label: '4'},
    {id: 5, label: '5'}
]);

// create an array with edges
var edges = new DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5}
]);

var data = {
    nodes: nodes,
    edges: edges
};

var options = {
    autoResize: true,
    height: '100%',
    width: '100%',
    locale: 'en',
    clickToUse: false,
    layout: {
        randomSeed: undefined,
        improvedLayout:true,
        hierarchical: {
          enabled:false,
          levelSeparation: 150,
          nodeSpacing: 100,
          treeSpacing: 200,
          blockShifting: true,
          edgeMinimization: true,
          parentCentralization: true,
          direction: 'UD',        // UD, DU, LR, RL
          sortMethod: 'hubsize'   // hubsize, directed
        }
      },
  }

export class VisNetwork extends Component
{
    containerRef = createRef<HTMLDivElement>();

    componentDidMount(){
        var network = new Network(this.containerRef.current!!, data, options);
    }

    render() {
        return <div ref={this.containerRef} style={{ height: '100%' }}></div>;
    }
};