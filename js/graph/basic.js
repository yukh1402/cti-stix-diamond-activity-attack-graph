const GRAPH_TYPE = {
  ACTIVITY_THREAD: "activity_thread", // hard coded graph
  ATTACK_GRAPH: "attack_graph", // hard coded graph
  NONE: "none" // Should be a forced directed sticky graph
}

const MARGIN = {
  TOP: 10,
  BOTTOM: 30,
  RIGHT: 30,
  LEFT: 60
}

const width = 1000;
const height = 500;


/**
 * Create basic SVG Container with background on a DIV element
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
    // .classed("svg-background", true)
    .append("g")
    .attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")");
}


let svg = initGraph('svg-container', width + MARGIN.LEFT + MARGIN.RIGHT, height + MARGIN.TOP + MARGIN.BOTTOM);
// let data = [
//   {
//     name: "some",
//     num: 1
//   },
//   {
//     name: "any",
//     num: 2
//   },
// ]
//

let data = [
  {
    Sepal_Length: 5.1,
    Petal_Length: 1.4,
  },
  {
    Sepal_Length: 4.9,
    Petal_Length: 1.4,
  }
]

/**
 * Build Attack Graph
 */
function buildAttackGraph() {
  let x = d3.scaleLinear()
    .domain([0, 9])
    .range([0, width])
  let xAxis = svg.append("g")
    .attr("id", "xAxis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  // Add Y axis
  let y = d3.scaleLinear()
    .domain([0, 9])
    .range([height, 0]);
  let yAxis = svg.append("g")
    .attr("id", "yAxis")
    .call(d3.axisLeft(y));

  // ClipPath is a boundary where everything outside is not be drawn
  let clip = svg.append("defs")
    .append("SVG:clipPath")
    .attr("id", "clip")
    .append("SVG:rect")
    .attr("width", width )
    .attr("height", height )
    .attr("x", 0)
    .attr("y", 0);

  // Add the ClipPath
  let scatter = svg.append('g')
    .attr("clip-path", "url(#clip)")

  // Add circles
  scatter
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d.Sepal_Length); } )
    // .attr("cx", "10" )
    // .attr("cy", function (d) { return y(d.Petal_Length); } )
    .attr("cy", function (d) { return y(d.Petal_Length); } )
    .attr("r", 8)
    .style("fill", "#61a3a9")
    .style("opacity", 0.5)

  // Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom
  let zoom = d3.zoom()
    .scaleExtent([.5, 20])  // This control how much you can unzoom (x0.5) and zoom (x20)
    .extent([[0, 0], [width, height]])
    .on("zoom", (event) => updateGraphView(event, scatter, x, xAxis, y, yAxis));

  // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
  svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('transform', 'translate(' + MARGIN.LEFT + ',' + MARGIN.RIGHT + ')')
    .call(zoom);
}

buildAttackGraph()

/**
 * This updates the graph view on a zoom event
 * @param event: Zoom event that is triggered
 * @param scatter:
 * @param x
 * @param xAxis
 * @param y
 * @param yAxis
 */
function updateGraphView(event, scatter, x = undefined, xAxis = undefined, y = undefined, yAxis = undefined) {
  // Retrieve the new scale position and update the axis boundaries
  if (x && xAxis) {
    let newX = event.transform.rescaleX(x);
    xAxis.call(d3.axisBottom(newX));
    // Update node position
    scatter
      .selectAll("circle")
      .attr('cx', function (d) {
        return newX(d.Sepal_Length)
      })
  }
  if (y && yAxis) {
    let newY = event.transform.rescaleY(y);
    yAxis.call(d3.axisLeft(newY));
    // Update node position
    scatter
      .selectAll("circle")
      .attr('cy', function (d) {
        return newY(d.Petal_Length)
      })
  }
}
