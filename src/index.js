import './3d-force-graph.css';

export { default } from "./3d-force-graph.js";

// Dimension options
let curDataSetIdx,
	numDim = 2;
const dataSets = getGraphDataSets();

let toggleData;
(toggleData = function() {
  curDataSetIdx = curDataSetIdx === undefined ? 0 : (curDataSetIdx+1)%dataSets.length;
  const dataSet = dataSets[curDataSetIdx];

  dataSet(Graph); // Load data set
  document.getElementById('graph-data-description').innerHTML = dataSet.description ? `Viewing ${dataSet.description}` : '';
})(); // IIFE init

let toggleDimensions = function(numDimensions) {
	numDim = numDimensions;
	  Graph
	    .resetState()       // Wipe nodes
	    .numDimensions(numDimensions);
  	dataSets[curDataSetIdx](Graph); // Reload nodes
};
