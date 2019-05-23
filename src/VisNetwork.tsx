import React, { Component, createRef } from "react";
import {DataSet, Network} from 'vis';
import {Edge} from './SolutionVisualizer'
import { node, number } from "prop-types";

var nodes = new DataSet([
    {id: 1, label: '1'},
    {id: 2, label: '2'},
    {id: 3, label: '3'},
    {id: 4, label: '4'},
    {id: 5, label: '5'}
]);

// create an array with edges
var edges = new DataSet([
    {from: 1, to: 3, color: {color: 'red', highlight: 'red'}},
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
          direction: 'UD',
          sortMethod: 'hubsize'
        }
      },
  }

interface Props {
  edges: Edge[];
  nodesCount: number;
  path: number[];
}

export class VisNetwork extends Component<Props>
{
    containerRef = createRef<HTMLDivElement>();

    componentDidMount(){
      const {nodesCount, edges, path} = this.props;
      var network = new Network(this.containerRef.current!!, getData(nodesCount, edges, path), options);
    }

    render() {
        return <div ref={this.containerRef} style={{ height: '100%' }}></div>;
    }
};

const getData = (nodesCount: number, edges: Edge[], path: number[]) => {
  const nodes = new DataSet(
    Array.from(Array(nodesCount).keys()).map((node: number) => ({
      id: node,
      label: node.toString()
    })
  ))

  const graphEdges = new DataSet(
    edges.map((edge: Edge) => ({
      from: edge.from,
      to: edge.to,
      label: edge.weight.toString(),
      color: (Math.abs(path.indexOf(edge.from) - path.indexOf(edge.to)) == 1) ? {
        color: 'red',
        highlight: 'red'
      } : undefined
    }))
  )

  return ({
    nodes: nodes,
    edges: graphEdges
  });
}