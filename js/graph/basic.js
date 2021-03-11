import {
  getNodesWithAttackPattern,
  getTTP,
  getTTPAxisId,
  getTactic,
  MITRE_ATTACK_CATEGORIES,
  parseBundleToGraph,
  parseTacticNameToXAxis,
  getLinksWithAttackPattern
} from "./mapper";
import {ATTACK_PATTERN_TYPE} from "../stix/sdo/attack-pattern";
import {GROUPING_TYPE} from "../stix/sdo/grouping";
import {TOOL_TYPE} from "../stix/sdo/tool";
import {MALWARE_TYPE} from "../stix/sdo/malware";
import {VULNERABILITY_TYPE} from "../stix/sdo/vulnerability";
import {IDENTITY_TYPE} from "../stix/sdo/identity";
import {THREAT_ACTOR_TYPE} from "../stix/sdo/threat-actor";
import {OBSERVED_DATA_TYPE} from "../stix/sdo/observed-sdo";

let stixBundle = undefined;
let stixGraph = undefined;

const GRAPH_TYPE = {
  ACTIVITY_THREAD: "activity_thread", // hard coded graph
  SUB_ACTIVITY_THREAD: "sub_activity_thread",
  ATTACK_GRAPH: "attack_graph", // hard coded graph
  SUB_ATTACK_GRAPH: "sub_attack_graph",
  NONE: "none", // Should be a forced directed sticky graph
}

const MARGIN = {
  TOP: 45,
  BOTTOM: 30,
  RIGHT: 30,
  LEFT: 60
}

let SUB_GRAPH_SELECTED = false;

const width = 1000;
const height = 500;

let graphSelection = window.location.hash.replace("#", "") || GRAPH_TYPE.ATTACK_GRAPH;

/**
 * Get Graph selection through change in URL hash
 */
window.onhashchange = function () {
  graphSelection = window.location.hash.replace("#", "");
  setCurrentGraphSelection();
  createGraph();
}

/**
 * Create basic SVG Container with background on a DIV element
 * @param divId: Id of the DIV Element
 * @param width: Viewbox width
 * @param height: Viewbox height
 */
function initGraph(divId, width = 1000, height = 500) {
  let divEl = document.getElementById(divId)
  return d3.select(divEl)
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("id", "svg")
    .classed("svg-background", true)
    .append("g")
    .attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")");
}

let svg = initGraph('svg-container',
  width + MARGIN.LEFT + MARGIN.RIGHT,
  height + MARGIN.TOP + MARGIN.BOTTOM);

let data = [
  {
    Sepal_Length: "Test3",
    Petal_Length: new Date("2021-02-06 00:00:00"),
  },
  {
    Sepal_Length: "Test6",
    Petal_Length: new Date("2021-01-03 00:00:00"),
  }
]

// let epoch = new Date(Date.UTC(2015, 11, 4, 12, 36, 47, 121));
let epoch = new Date("2021-02-06 00:00:00")


/**
 * Build Activity Thread or Attack Sub Graph depending on the Graph selection
 */
function buildActivityAttackSubGraph() {
  let x = d3.scaleLinear()
    .domain([0, 9])
    .range([0, width])
  let xAxis = svg.append("g")
    .attr("id", "xAxis")
    .attr("style", "color: white")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  let y = undefined;
  let yAxis = undefined;

  if (graphSelection === GRAPH_TYPE.SUB_ACTIVITY_THREAD) {
    // Add Y axis
    y = d3.scaleTime()
      .domain([new Date("2021-01-01 00:00:00"), new Date("2021-12-31 23:59:59")])
      .range([height, 0]);
    yAxis = svg.append("g")
      .attr("id", "yAxis")
      .attr("style", "color: white")
      .call(d3.axisLeft(y));

  } else {
    y = d3.scaleUtc()
      .domain([d3.timeDay.offset(epoch, -1), d3.timeDay.offset(epoch, +5)])
      .range([height, 0]);
    yAxis = svg.append("g")
      .attr("id", "yAxis")
      .attr("style", "color: white")
      .call(
        d3.axisLeft(y)
          .tickFormat(formatRelativeTime)
          .tickValues(d3.scaleUtc()
            .domain(y.domain().map(toRelative))
            .ticks(10)
            .map(toAbsolute)
          )
      );
  }

  // ClipPath is a boundary where everything outside is not be drawn
  let clip = svg.append("defs")
    .append("SVG:clipPath")
    .attr("id", "clip")
    .append("SVG:rect")
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0);

  // Add the ClipPath
  let scatter = svg.append('g')
    .attr("id", "scatter")
    .attr("clip-path", "url(#clip)")

  // Add circles
  scatter
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("id", "circle")
    .attr("cx", function (d) {
      return x(d.Sepal_Length);
    })
    .attr("cy", function (d) {
      return y(d.Petal_Length);
    })
    .attr("r", 8)
    .style("fill", "#61a3a9")
    .style("opacity", 0.5)

  if (y && yAxis) {
    graphZoom(scatter, x, xAxis, y, yAxis)
  }
}

/**
 * This adds zoom functionality to the svg by using a rect element
 */
function graphZoom(scatter, x, xAxis, y, yAxis) {
  let zoom = d3.zoom()
    .on("zoom", (event) => onZoom(event, scatter, x, xAxis, y, yAxis));

  svg.append("rect")
    .attr("id", "zoom-rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('transform', 'translate(' + MARGIN.LEFT + ',' + MARGIN.RIGHT + ')')
    .call(zoom);
}

/**
 * This updates the graph view on a zoom event
 * @param event: Zoom event that is triggered
 * @param scatter:
 * @param x
 * @param xAxis
 * @param y
 * @param yAxis
 */
function onZoom(event, scatter, x = undefined, xAxis = undefined, y = undefined, yAxis = undefined) {
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
    if (graphSelection === GRAPH_TYPE.SUB_ATTACK_GRAPH) {
      yAxis.call(d3.axisLeft(newY)
        .tickFormat(formatRelativeTime)
      );
    } else {
      yAxis.call(d3.axisLeft(newY));
    }
    // Update node position
    scatter
      .selectAll("circle")
      .attr('cy', function (d) {
        return newY(d.Petal_Length)
      })
  }
}

function buildAttackGraph(graph) {
  let attackPatterns = getNodesWithAttackPattern(graph);

  let x = d3.scalePoint()
    .domain(MITRE_ATTACK_CATEGORIES)
    .range([0, width])
  let xAxis = svg.append("g")
    .attr("id", "xAxis")
    .attr("style", "color: white; font-size: 8px")
    .call(d3.axisTop(x))

  let y = d3.scaleLinear()
    .domain([37, 0])
    .range([height, 0]);
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
    // .style('fill', (n) => getNodeImage(n))
    .style('fill', "#FFFFFF")
    .style("opacity", 0.5)
    .on("mouseover", attackPatternMouseover)
    .on("mousemove", attackPatternMousemove)
    .on("mouseout", attackPatternMouseleave)
    .on("dblclick", attackPatternDoubleClick)

  createTTPLabels("#node")

  svg.selectAll('.link')
    .data(graph.links)
    .join('g')
    .attr('id', 'link')
    .append('path')
    .attr("id", "linkPath")
    .classed('link', true)
    .attr("d", (d) => {
      return "M " + attackPatterns[d.source].x + " " + attackPatterns[d.source].y + " L "
        + attackPatterns[d.target].x + " " + attackPatterns[d.target].y
    });
}

function createTTPLabels(id) {
  svg.selectAll(id)
    .append('text')
    .attr("id", "node-label")
    .attr('font-size', '0.5em')
    .attr('text-anchor', 'middle')
    .attr('x', d => d.x)
    .attr('y', d => d.y + 20)
    .attr('fill', '#FFFFFF')
    .text((n) => n.data.name + " - " + getTTP(n));
}

function attackPatternMouseover() {
  d3.select("#tooltip").style("visibility", "visible")
}

function attackPatternMousemove(event, d) {
  d3.select("#tooltip")
    .style("top", (event.pageY - 20)+"px")
    .style("left",(event.pageX)+"px")
    .html(d.data.description)
}

function attackPatternMouseleave() {
  d3.select("#tooltip").style("visibility", "hidden");
}

function attackPatternDoubleClick(event, node) {

  console.log(node)
}

function createGraph(graph) {
  if (graph !== undefined) {
    removeGraphComponents();
    addSTIXImages();

    if (graphSelection === GRAPH_TYPE.SUB_ATTACK_GRAPH || graphSelection === GRAPH_TYPE.SUB_ACTIVITY_THREAD) {
      buildActivityAttackSubGraph(graph);
    } else if (graphSelection === GRAPH_TYPE.ATTACK_GRAPH) {
      buildAttackGraph(graph);
    }
  }
}

/**
 * This defines several STIX SDO and SCO images in the SVG-Tree
 */
function addSTIXImages() {
  const baseImagePath = "../img";
  let images = [
    {id: "groupingImage", fileName: "grouping.png"},
    {id: "attackPatternImage", fileName: "attack_pattern.png"},
    {id: "toolImage", fileName: "tool.png"},
    {id: "malwareImage", fileName: "malware.png"},
    {id: "vulnerabilityImage", fileName: "vulnerability.png"},
    {id: "identityImage", fileName: "identity.png"},
    {id: "observedDataImage", fileName: "observed_data.png"},
    {id: "threatActorImage", fileName: "threat_actor.png"},
  ];
  d3.select("#svg")
    .append("defs")
    .attr("id", "mdef")
    .selectAll(".def")
    // .append("pattern")
    .data(images)
    .join("svg:pattern")
    .attr("id", (d) => d.id)
    .attr("height", "40")
    .attr("width", "10")
    .append("svg:image")
    .attr("width", "16")
    .attr("height", "16")
    .attr("xlink:href", (d) => baseImagePath + "/" + d.fileName)
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
  svg.selectAll("#link").remove();
  svg.selectAll("#scatter").remove();
}

createGraph();

function formatRelativeTime(absolute) {
  let pad = d3.format("02d");
  let delta = absolute - epoch;
  if (!delta) return "0";
  let milliseconds = Math.abs(delta);
  let viewValue = (delta < 0 ? "-" : "+")

  if (milliseconds >= 3.154e10) {
    // Milliseconds > 12 months then display in years
    viewValue += Math.floor(milliseconds / 3.154e10) + "yr"
  } else if (milliseconds >= 2.628e9) {
    // Milliseconds > 30 days then display in months
    viewValue += Math.floor(milliseconds / 2.628e9) + "mo"
  } else if (milliseconds >= 8.64e7) {
    // Milliseconds > 24 Hours then display in days
    viewValue += Math.floor(milliseconds / 8.64e7) + "d"
  } else if (milliseconds >= 3.6e6) {
    // Milliseconds > 60 min then display in hours
    viewValue += Math.floor(milliseconds / 3.6e6) + "hr"
  } else {
    // Milliseconds < 60 min then display in minutes
    viewValue += Math.floor(milliseconds / 6e4) + ":"
      + pad(Math.floor(milliseconds % 6e4 / 1e3)) + "min"
  }
  return viewValue;
}

// Convert an absolute time to a time relative to the epoch.
function toRelative(absolute) {
  return new Date(absolute - epoch);
}

// Convert a time relative to the epoch to an absolute time.
function toAbsolute(relative) {
  return new Date(+relative + +epoch);
}

function getNodeImage(node) {
  console.log(node.type)
  switch (node.type) {
    case GROUPING_TYPE:
      return 'url(#groupingImage)';
    case ATTACK_PATTERN_TYPE:
      return 'url(#attackPatternImage)';
    case TOOL_TYPE:
      return 'url(#toolImage)';
    case MALWARE_TYPE:
      return 'url(#malwareImage)';
    case VULNERABILITY_TYPE:
      return 'url(#vulnerabilityImage)';
    case IDENTITY_TYPE:
      return 'url(#identityImage)';
    case THREAT_ACTOR_TYPE:
      return 'url(#threatActorImage)';
    case OBSERVED_DATA_TYPE:
      return 'url(#observedDataImage)';
  }
}

/**
 * Set Current Graph Selection Text
 */
function setCurrentGraphSelection() {
  let currentSelection = document.getElementById("currentSelection")
  if (graphSelection === GRAPH_TYPE.SUB_ATTACK_GRAPH) {
    currentSelection.textContent = "Current Graph: Sub Attack Graph";
  } else if (graphSelection === GRAPH_TYPE.SUB_ACTIVITY_THREAD) {
    currentSelection.textContent = "Current Graph: Sub Activity Thread";
  } else if (graphSelection === GRAPH_TYPE.ATTACK_GRAPH) {
    currentSelection.textContent = "Current Graph: Attack Graph";
  }
}

setCurrentGraphSelection();

document.getElementById("parseButton").addEventListener("click", parseSTIXContent)

function parseSTIXContent() {
  eraseSyntaxError();
  stixBundle = document.getElementById("stixContent").value;
  try {
    stixGraph = parseBundleToGraph(JSON.parse(stixBundle));
    createGraph(stixGraph);
  } catch (e) {
    showSyntaxError(e)
  }
}

function showSyntaxError(message) {
  document.getElementById("syntaxError").innerText = message;
}

function eraseSyntaxError() {
  document.getElementById("syntaxError").innerText = "";
}
