export class Graph {
  constructor(nodes, links) {
    this.nodes = nodes;
    this.links = links;
  }
}

export class Node {
  constructor(id, data, type = undefined, subGraph = undefined, groupingId = undefined,
              x = undefined, y = undefined) {
    this.id = id;
    this.data = data; // STIX Format
    this.type = type;
    this.subGraph = subGraph;
    this.groupingId = groupingId;
    this.x = x;
    this.y = y;
  }
}

export class Link {
  constructor(source, target, data, relation = undefined) {
    this.source = source;
    this.target = target;
    this.data = data;
    this.relation = relation;
  }
}
