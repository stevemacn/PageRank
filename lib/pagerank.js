
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

    var initialProbabilty = 1/this.pageCount 

    //reArray the graph and generate initial probability
    for (i in this.outgoingNodes) {
        this.probabilityNodes.push(initialProbabilty)
        for (a in this.outgoingNodes[i]) {
            var index = this.outgoingNodes[i][a]
            if (!this.incomingNodes[index]) this.incomingNodes[index]=[]
            this.incomingNodes[index].push(i)
        }
    }
    
    //Debugging
    console.log("Pages: " + this.outgoingNodes.length)
    console.log(this.incomingNodes)
    console.log("____ITERATION 0____")
    console.log(this.probabilityNodes)

    this.iterate(1)
}

Pagerank.prototype.iterate = function (count) {

    
    var result = [] 
    for (b in this.probabilityNodes) {
        var sum = 0
        for (var a=0; a<this.incomingNodes[b].length; a++) {
            prob = this.probabilityNodes[a] 
            ct = this.outgoingNodes[this.incomingNodes[b][a]].length
            sum += (prob/ct)  
            
        }
        var res = this.coeff+this.linkProb*sum
            , max = this.probabilityNodes[b]+this.tolerance
            , min = this.probabilityNodes[b]-this.tolerance
        
        if (min <= res >= max)
            result.push(res)
        else 
            this.probabilityNodes[b]=res
    }

    if (result.length == this.pageCount)
        return this.callback(null, result)
    else 
        console.log("____ITERATION "+count+"____")
        console.log(this.probabilityNodes) 
        this.iterate(++count)
}
