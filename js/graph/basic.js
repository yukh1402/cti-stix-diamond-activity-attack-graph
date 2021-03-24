import {
  getNodesWithAttackPattern,
  getTTP,
  getTTPAxisId,
  getTactic,
  MITRE_ATTACK_CATEGORIES,
  parseBundleToGraph,
  parseTacticNameToXAxis,
  getDiamondModelCategoryLayer, getNodeLabel, createView, DIAMOND_MODEL_META_FEATURE_CATEGORIES
} from "./mapper";
import {ATTACK_PATTERN_TYPE, getAttackPatternView} from "../stix/sdo/attack-pattern";
import {GROUPING_TYPE} from "../stix/sdo/grouping";
import {TOOL_TYPE} from "../stix/sdo/tool";
import {MALWARE_TYPE} from "../stix/sdo/malware";
import {VULNERABILITY_TYPE} from "../stix/sdo/vulnerability";
import {IDENTITY_TYPE} from "../stix/sdo/identity";
import {THREAT_ACTOR_TYPE} from "../stix/sdo/threat-actor";
import {OBSERVED_DATA_TYPE} from "../stix/sdo/observed-sdo";
import {CAMPAIGN_TYPE} from "../stix/sdo/campaign";
import {INDICATOR_TYPE} from "../stix/sdo/indicator";
import {Node} from "./node";


let stixBundle = undefined;
let stixGraph = undefined;

const GRAPH_TYPE = {
  ACTIVITY_THREAD: "activity_thread", // hard coded graph
  ATTACK_GRAPH: "attack_graph", // hard coded graph
  SUB_GRAPH: "sub_attack_graph",
}

const MARGIN = {
  TOP: 45,
  BOTTOM: 30,
  RIGHT: 30,
  LEFT: 60
}

const LAYER_COLOR_SCHEMA = [
  '#CFD8DC',
  '#90A4AE',
  '#607D8B',
  '#455A64'
]


const WIDTH = 1000;
const HEIGHT = 500;

let graphSelection = window.location.hash.replace("#", "") || GRAPH_TYPE.ATTACK_GRAPH;

/**
 * Get Graph selection through change in URL hash
 */
window.onhashchange = function () {
  graphSelection = window.location.hash.replace("#", "");
  setCurrentGraphSelection();
  createGraph(stixGraph);
}

/**
 * Create basic SVG Container with background on a DIV element
 * @param divId: Id of the DIV Element
 * @param width: Viewbox width
 * @param height: Viewbox height
 */
function initGraph(divId, width = 1000, height = 500) {
  let svgEl = document.getElementById("svg")
  return d3.select(svgEl)
    .attr("viewBox", [0, 0, width, height])
    .classed("svg-background", true)
    .append("g")
    .attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")");
}

let svg = initGraph("svg-container",
  WIDTH + MARGIN.LEFT + MARGIN.RIGHT,
  HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);


/**
 * This creates a X-Axis with all Mitre Attack Phases
 */
function createXAxisWithMitrePhases() {
  let x = d3.scalePoint()
    .domain(MITRE_ATTACK_CATEGORIES)
    .range([0, WIDTH])
  let xAxis = svg.append("g")
    .attr("id", "xAxis")
    .attr("style", "color: white; font-size: 8px")
    .call(d3.axisTop(x))
  return x;
}

/**
 * Build Activity Thread
 * @param graph: These are all Grouping Events
 */
function buildActivityThreadGraph(graph) {
  let attackPatterns = getNodesWithAttackPattern(graph);

  let x = createXAxisWithMitrePhases();

  let y = d3.scaleTime()
    .domain([new Date("2021-01-01 00:00:00"), new Date("2021-12-31 23:59:59")])
    .range([HEIGHT, 0]);
  let yAxis = svg.append("g")
    .attr("id", "yAxis")
    .attr("style", "color: white")
    .call(d3.axisLeft(y));

  // ClipPath is a boundary where everything outside is not be drawn
  let clip = svg.append("defs")
    .append("SVG:clipPath")
    .attr("id", "clip")
    .append("SVG:rect")
    .attr("width", WIDTH)
    .attr("height", HEIGHT)
    .attr("x", 0)
    .attr("y", 0);

  // Add the ClipPath
  let scatter = svg.append("g")
    .attr("id", "scatter")
    .attr("clip-path", "url(#clip)")

  // Add circles
  scatter
    .selectAll("circle")
    .data(attackPatterns)
    .enter()
    .append("g")
    .attr("id", "node")
    .append("circle")
    .attr("id", "circle")
    .attr("cx", function (d) {
      d.x = x(parseTacticNameToXAxis(getTactic(d)));
      return d.x;
    })
    .attr("cy", function (node) {
      let grouping = graph.nodes.find(grouping => grouping.id === node.groupingId);
      return y(Date.parse(grouping.data.created))
    })
    .attr("r", 10)
    .style("fill", () => getNodeImage(new Node(undefined, undefined, GROUPING_TYPE)))
  //todo: Create node labels
  graphZoom(scatter, y, yAxis)
}

function buildAttackGraph(graph) {
  let attackPatterns = getNodesWithAttackPattern(graph);

  let x = createXAxisWithMitrePhases();

  let y = d3.scaleLinear()
    .domain([37, 0])
    .range([HEIGHT, 0]);
  let yAxis = svg.append("g")
    .attr("id", "yAxis")
    .attr("style", "color: transparent")
    .call(d3.axisLeft(y));

  // Create DIV element for Tooltip
  d3.select("#svg-container")
    .append("div")
    .attr("id", "tooltip")
    .attr("class", "tooltipAttackGraph")
    .style("visibility", "hidden");

  // Create links
  svg.selectAll(".link")
    .data(graph.links)
    .join("g")
    .attr("id", "link")
    .append("path")
    .attr("id", "linkPath")
    .classed("link", true);

  // Add circles
  svg.selectAll("circle")
    .data(attackPatterns)
    .join("g")
    .attr("id", "node")
    .append("circle")
    .attr("id", "circle")
    .attr("cx", function (d) {
      d.x = x(parseTacticNameToXAxis(getTactic(d)));
      return d.x;
    })
    .attr("cy", function (d) {
      d.y = y(getTTPAxisId(getTTP(d), getTactic(d)) + 1)
      return d.y;
    })
    .attr("r", 10)
    .style("fill", () => getNodeImage(new Node(undefined, undefined, GROUPING_TYPE)))
    .on("mouseover", showTooltip)
    .on("mousemove", attackPatternMousemove)
    .on("mouseout", hideTooltip)
    .on("dblclick", attackPatternDoubleClick)

  createNodeLabels("#node")

  // Draw links
  svg.selectAll("#linkPath")
    .attr("d", (d) => {
      return "M " + attackPatterns[d.source].x + " " + attackPatterns[d.source].y + " L "
        + attackPatterns[d.target].x + " " + attackPatterns[d.target].y
    })
}

/**
 * Build a force directed sticky sub graph with a Y-Axis where all Meta Features are divided into Layers.
 * @param groupingNode
 */
function buildSubGraph(groupingNode) {
  let subGraph = groupingNode.subGraph;
  let links = subGraph.links;

  let y = d3.scaleBand()
    .domain(DIAMOND_MODEL_META_FEATURE_CATEGORIES)
    .range([HEIGHT, 0])
  let yAxis = svg.append("g")
    .attr("id", "yAxis")
    .attr("style", "color: white; font-size: 8px")
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain")
      .remove())

  // Build layer background
  svg.selectAll("background-rect")
    .data(DIAMOND_MODEL_META_FEATURE_CATEGORIES)
    .join("g")
    .attr("id", "layer")
    .append("rect")
    .attr("y", (d, i) => {
      return (HEIGHT / 4) * i;
    })
    .attr("height", HEIGHT / 4)
    .attr("width", WIDTH)
    .attr("opacity", 0.6)
    .attr("fill", function (d, i) {
      return LAYER_COLOR_SCHEMA[i];
    });

  let link = svg
    .selectAll(".link")
    .data(links)
    .join("g")
    .attr("id", "link")
    .append("line")
    .attr("id", "link-line")
    .classed("link", true)

  let linkLabel = svg.selectAll("#link")
    .append("text")
    .attr("dy", "12")
    .attr("id", "link-label")
    .attr("font-size", "0.4em")
    .attr("text-anchor", "middle")
    .attr("fill", "#FFFFFF")
    .text(d => d.relation);

  // Create DIV element for Tooltip
  d3.select("#svg-container")
    .append("div")
    .attr("id", "tooltip")
    .attr("class", "tooltipSubGraph")
    .style("visibility", "hidden");

  let node = svg.selectAll(".node")
    .data(subGraph.nodes)
    .join("g")
    .attr("id", "node")
    .append("circle")
    .attr("id", "node-circle")
    .attr("r", 10)
    .style("fill", (n) => getNodeImage(n))
    .classed("fixed", d => d.fx !== undefined)
    .classed("subNode", true)

  svg.selectAll("#node")
    .append("text")
    .attr("id", "node-label")
    .attr("font-size", "0.5em")
    .attr("text-anchor", "middle")
    .attr("fill", "#FFFFFF")
    .text((n) => getNodeLabel(n));

  let simulation = d3.forceSimulation()
    .nodes(subGraph.nodes)
    .force("charge", d3.forceManyBody().strength(-100))
    .force("link", d3.forceLink(links).distance(60))
    .on("tick", () => forceDirectedTick("#node-circle", "#node-label", "#link-line",
      "#link-label"))

  let drag = d3.drag()
    .on("start", (event, d) => nodeDragStart(event, d, simulation))
    .on("drag", (event, d) => {
      nodeClick(event, d, simulation)
      return nodeDragged(event, d, simulation);
    })

  node.call(drag).on("click", (event, d) => nodeClick(event, d, simulation))
}

function forceDirectedTick(nodeId, nodeLabel, linkId, linkLabel) {
  let radius = 1;
  let currentLayer = 0;

  // The nodes are divided into multiple layers depending on the node type
  d3.selectAll(nodeId)
    .attr("cx", function (d) {
      return d.x = Math.max(radius, Math.min(WIDTH - radius, d.x));
    })
    .attr("cy", function (d) {
      currentLayer = getDiamondModelCategoryLayer(d);
      if (currentLayer <= 3) {
        return d.y = Math.max((HEIGHT / 4) * currentLayer + radius,
          Math.min(((HEIGHT / 4) + (HEIGHT / 4) * currentLayer) - radius, d.y));
      } else {
        return d.y = Math.max(radius, Math.min(HEIGHT - radius, d.y));
      }
    });

  d3.selectAll(linkId)
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  d3.selectAll(nodeLabel)
    .attr("x", d => d.x)
    .attr("y", d => d.y + 20);

  d3.selectAll(linkLabel)
    .attr("x", d => d.source.x + ((d.target.x - d.source.x) / 2))
    .attr("y", d => d.source.y + ((d.target.y - d.source.y) / 2));
}

function nodeDragStart() {
  d3.select(this).classed("fixed", true);
}

function nodeDragged(event, d, simulation) {
  d.fx = clamp(event.x, 0, WIDTH);
  d.fy = clamp(event.y, 0, HEIGHT);
  simulation.alpha(1).restart();
}

function nodeClick(event, d, simulation) {
  delete d.fx;
  delete d.fy;
  d3.select(this).classed("fixed", false);
  simulation.alpha(1).restart();
  showNode(d);
}

/**
 * This adds zoom functionality to the svg by using a rect element
 */
function graphZoom(scatter, y, yAxis) {
  let zoom = d3.zoom()
    .on("zoom", (event) => onZoom(event, scatter, y, yAxis));

  svg.append("rect")
    .attr("id", "zoom-rect")
    .attr("width", WIDTH)
    .attr("height", HEIGHT)
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.RIGHT + ")")
    .call(zoom);
}

/**
 * This updates the graph view on a zoom event
 * @param event: Zoom event that is triggered
 * @param scatter:
 * @param y
 * @param yAxis
 *
 */
function onZoom(event, scatter, y, yAxis) {
  let newY = event.transform.rescaleY(y);
  yAxis.call(d3.axisLeft(newY));

  // Update node position
  scatter
    .selectAll("circle")
    .attr("cy", function (d) {
      let grouping = stixGraph.nodes.find(grouping => grouping.id === d.groupingId);
      return newY(Date.parse(grouping.data.created))
    })
}

function createNodeLabels(id) {
  svg.selectAll(id)
    .append("text")
    .attr("id", "node-label")
    .attr("font-size", "0.5em")
    .attr("text-anchor", "middle")
    .attr("x", d => d.x)
    .attr("y", d => d.y + 20)
    .attr("fill", "#FFFFFF")
    .text((n) => getNodeLabel(n));
}

function showTooltip() {
  d3.select("#tooltip").style("visibility", "visible")
}

function attackPatternMousemove(event, d) {
  d3.select("#tooltip")
    .style("top", (event.pageY - 20) + "px")
    .style("left", () => calcLeftPosition(event, 300))
    .html(d.data.description)
}

function hideTooltip() {
  d3.select("#tooltip").style("visibility", "hidden");
}

function calcLeftPosition(event, tooltipWidth) {
  if ((event.pageX + tooltipWidth) >= event.view.screen.availWidth) {
    return (event.view.screen.availWidth - tooltipWidth) + "px";
  } else {
    return (event.pageX) + "px";
  }
}

function attackPatternDoubleClick(event, node) {
  graphSelection = GRAPH_TYPE.SUB_GRAPH;
  setCurrentGraphSelection();
  let relevantGroupingNode = stixGraph.nodes.find(n => n.id === node.groupingId);
  createGraph(relevantGroupingNode.subGraph, relevantGroupingNode)
}

function createGraph(graph, node = undefined) {
  if (graph !== undefined) {
    removeGraphComponents();
    if (graphSelection === GRAPH_TYPE.SUB_GRAPH || graphSelection === GRAPH_TYPE.SUB_ACTIVITY_THREAD) {
      buildSubGraph(node);
    } else if (graphSelection === GRAPH_TYPE.ATTACK_GRAPH) {
      buildAttackGraph(graph);
    } else if (graphSelection === GRAPH_TYPE.ACTIVITY_THREAD) {
      buildActivityThreadGraph(graph);
    }
  }
}

/**
 * Remove all Graph Components from the SVG initial Graph
 */
function removeGraphComponents() {
  svg.selectAll("#xAxis").remove();
  svg.selectAll("#yAxis").remove();
  svg.selectAll("#clip").remove();
  svg.selectAll("#node").remove();
  svg.selectAll("#node-label").remove();
  d3.selectAll("#tooltip").remove();
  d3.selectAll("#nodeView").remove();
  svg.selectAll("#link").remove();
  svg.selectAll("#scatter").remove();
  svg.selectAll("#layer").remove();
}

createGraph();

function clamp(x, lo, hi) {
  return x < lo ? lo : x > hi ? hi : x;
}

function getNodeImage(node) {
  switch (node.type) {
    case GROUPING_TYPE:
      return "url(#groupingImage)";
    case ATTACK_PATTERN_TYPE:
      return "url(#attackPatternImage)";
    case TOOL_TYPE:
      return "url(#toolImage)";
    case MALWARE_TYPE:
      return "url(#malwareImage)";
    case VULNERABILITY_TYPE:
      return "url(#vulnerabilityImage)";
    case IDENTITY_TYPE:
      return "url(#identityImage)";
    case INDICATOR_TYPE:
      return "url(#indicatorImage)"
    case THREAT_ACTOR_TYPE:
      return "url(#threatActorImage)";
    case OBSERVED_DATA_TYPE:
      return "url(#observedDataImage)";
    case CAMPAIGN_TYPE:
      return "url(#campaignImage)";
  }
}

/**
 * Set Current Graph Selection Text
 */
function setCurrentGraphSelection() {
  let currentSelection = document.getElementById("currentSelection")
  if (graphSelection === GRAPH_TYPE.SUB_GRAPH) {
    currentSelection.textContent = "Current Graph: Sub-Graph";
  } else if (graphSelection === GRAPH_TYPE.ATTACK_GRAPH) {
    currentSelection.textContent = "Current Graph: Attack Graph";
  } else if (graphSelection === GRAPH_TYPE.ACTIVITY_THREAD) {
    currentSelection.textContent = "Current Graph: Activity Thread";
  }
}

setCurrentGraphSelection();

document.getElementById("parseButton").addEventListener("click", parseSTIXContent)

function parseSTIXContent() {
  let valid = false;
  eraseSyntaxError();
  stixBundle = document.getElementById("stixContent").value;
  try {
    stixGraph = parseBundleToGraph(JSON.parse(stixBundle));
    valid = true;
  } catch (e) {
    showSyntaxError(e)
  }
  if (valid) {
    createGraph(stixGraph);
  }
}

function showSyntaxError(message) {
  document.getElementById("syntaxError").innerText = message;
}

function eraseSyntaxError() {
  document.getElementById("syntaxError").innerText = "";
}

function showNode(node) {
  removeNodeView();
  createNodeView(node);
}

function createNodeView(node) {
  const nodeViewDIV = document.createElement("div");
  nodeViewDIV.id = "nodeView"
  nodeViewDIV.className = "nodeView"
  nodeViewDIV.innerHTML =
    "<div class='card'>" +
    "<div class='card-header'>" +
    "<button type='button' class='btn' id='view-close-btn'>" +
    "  <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-arrow-right\" viewBox=\"0 0 16 16\">\n" +
    "  <path fill-rule=\"evenodd\" d=\"M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z\"/>\n" +
    "</svg>" +
    "</button>" +
    "</div>" +
    "<div class='card-body node-body'>" +
    "<h6><div class='row-flex'>" +
    "<div><svg id='node-view-img' width='60' height='70' viewBox='0 -12 1 28'>" +
    "</svg></div>" +
    "<div class='column-flex'><span id='node-title'></span><span class='node-type' id='node-type'></span></div>" +
    "</div></h6>" +
    "<div id='node-content'></div>" +
    "</div>" +
    "</div>"

  document.getElementById("workspace").appendChild(nodeViewDIV);

  createView(node.data, "node-title", "node-content", "node-type")

  d3.select("#node-view-img")
    .append("circle")
    .attr("r", 10)
    .style("fill", () => getNodeImage(node))

  document.getElementById("view-close-btn").addEventListener("click", removeNodeView)
}

function removeNodeView() {
  d3.select("#nodeView").remove();
}
