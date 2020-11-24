import clusters from "graphology-generators/random/clusters";
import { UndirectedGraph } from "graphology";
import { WebGLRenderer } from "sigma";
import { subGraph } from "graphology-utils";
import circular from "graphology-layout/circular";

import FA2Layout from "./fa2/worker";
import { inferSettings } from "./fa2";

// PARAMETERS TO TWEAK:
const SCALE = 40;
const SLOW_DOWN = 10;

// RANDOM GRAPH GENERATION RELATED STUFF
const PALETTE = ["#b4943e", "#777acd", "#60a862", "#c45ca2", "#cb5a4c"];
const graph = clusters(UndirectedGraph, {
  order: 80,
  size: 200,
  clusters: 5,
});

const nodesPerCircle = {};
graph.nodes().forEach((node) => {
  const attr = graph.getNodeAttributes(node);
  const circle = (Math.floor(Math.random() * 3) + 1) * SCALE;

  nodesPerCircle[circle] = [...(nodesPerCircle[circle] || []), node];

  graph.mergeNodeAttributes(node, {
    label: "",
    size: 5,
    color: PALETTE[attr.cluster],
    circleRadius: circle,
  });
});

for (const circle in nodesPerCircle) {
  const circleGraph = subGraph(graph, nodesPerCircle[circle]);
  const positions = circular(circleGraph, { scale: +circle });

  for (const node in positions) {
    graph.mergeNodeAttributes(node, positions[node]);
  }
}

const renderer = new WebGLRenderer(graph, document.getElementById("app"));

const layout = new FA2Layout(graph, {
  settings: {
    ...inferSettings(graph),
    barnesHutOptimize: false,
    linLogMode: false,
    outboundAttractionDistribution: false,
    adjustSizes: false,
    strongGravityMode: false,
    slowDown: SLOW_DOWN
  },
});
layout.start();

window.graph = graph;
window.renderer = renderer;
