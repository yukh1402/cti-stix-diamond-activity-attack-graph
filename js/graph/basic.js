const GRAPH_TYPE = {
  ACTIVITY_THREAD: "activity_thread", // hard coded graph
  ATTACK_GRAPH: "attack_graph", // hard coded graph
  NONE: "none" // Should be a forced directed sticky graph
}

/**
 * Create SVG Container with background on a DIV element
 * @param divId: Id of the DIV Element
 * @param width: Viewbox width
 * @param height: Viewbox height
 */
function initGraph(divId, width = 1000, height = 500) {
  let divEl = document.getElementById(divId)
  console.log(divEl)
  return d3.select(divEl)
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("id", "svg")
    .classed("svg-background", true)
}


let svg = initGraph('svg-container');
