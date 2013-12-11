//var _ = require('underscore');

module.exports = function(nodeMatrix, linkProb, tolerance, callback) {
    if (!nodeMatrix || !linkProb || !tolerance || !callback) throw new Error(
            "Provide 4 arguments: nodeMatrix, link probability, tolerance, callback")
    
    return new Pagerank(nodeMatrix, linkProb, tolerance, callback)
}

function Pagerank (nodeMatrix, linkProb, tolerance, callback) {
    console.log("")
    console.log(nodeMatrix)
    
    this.outgoingNodes = nodeMatrix
    this.linkProb = linkProb
    this.tolerance = tolerance
    this.callback = callback

    this.pageCount = this.outgoingNodes.length
    this.coeff = (1-linkProb)/this.pageCount
    
    this.probabilityNodes = [] 
    this.incomingNodes = []

    this.startRanking()
}

Pagerank.prototype.startRanking = function () {
    //reArray the graph and generate initial probability

    console.log("Pages: " + this.outgoingNodes.length)
    
    var initialProbabilty = 1/this.pageCount 
    for (var a=0; a<this.pageCount; a++) {
        this.probabilityNodes.push(initialProbabilty)
    }

    for (i in this.outgoingNodes) {
        for (a in this.outgoingNodes[i]) {
            var index = this.outgoingNodes[i][a]
            if (!this.incomingNodes[index]) this.incomingNodes[index]=[]
            this.incomingNodes[index].push(i)
        }
    }

    console.log(this.incomingNodes)
    
    this.iterate(this.probabilityNodes)
}

