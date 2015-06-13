// pagerank.js 0.0.1

//Use a random surfer algorithm to determine the relative 
//rank of nodes. The importance of each node is determined
//by the number of incoming links as well as the importance 
//of those incoming links. 

// Expose
// ----------

//Expose our library to be called externally
module.exports = function (nodeMatrix, linkProb, tolerance, callback, debug) {
    if (!nodeMatrix || !linkProb || !tolerance || !callback) 
        throw new Error("Provide 4 arguments: "+
            "nodeMatrix, link probability, tolerance, callback")

    //If debug is unset set it to false
    if (!debug) debug=false
    return new Pagerank(nodeMatrix, linkProb, tolerance, callback, debug)
}

// Initialize
// ----------
function Pagerank (nodeMatrix, linkProb, tolerance, callback, debug) {
    //**OutgoingNodes:** represents an array of nodes. Each node in this 
    //array contains an array of nodes to which the corresponding node has
    //outgoing links.
    this.outgoingNodes = nodeMatrix
    //**LinkProb:** a value ??
    this.linkProb = linkProb
    //**Tolerance:** the point at which a solution is deemed optimal. 
    //Higher values are more accurate, lower values are faster to computer. 
    this.tolerance = tolerance
    this.callback = callback

    //Number of outgoing nodes
    this.pageCount = Object.keys(this.outgoingNodes).length 
    //**Coeff:** coefficient for the likelihood that a page will be visited.
    this.coeff = (1-linkProb)/this.pageCount
    
    this.probabilityNodes = !(nodeMatrix instanceof Array) ? {} : []
    this.incomingNodes = !(nodeMatrix instanceof Array) ? {} : []
    this.debug=debug
    
    this.startRanking()
}

//Start ranking 
// ----------
Pagerank.prototype.startRanking = function () {

    //we initialize all of our probabilities
    var initialProbabilty = 1/this.pageCount 
        , outgoingNodes = this.outgoingNodes
    
    //rearray the graph and generate initial probability
    for (i in outgoingNodes) {
        this.probabilityNodes[i]=initialProbabilty
        for (a in outgoingNodes[i]) {
            var index = outgoingNodes[i][a]
            if (!this.incomingNodes[index]) this.incomingNodes[index]=[]
            this.incomingNodes[index].push(i)
        }
    }
    
    //if debug is set, print each iteration
    if (this.debug) this.reportDebug(1)
    
    this.iterate(1)
}

//Log iteration to console 
// ----------
Pagerank.prototype.reportDebug = function (count) {
    console.log("Pages: " + this.outgoingNodes.length)
    console.log(this.incomingNodes)
    console.log("____ITERATION "+count+"____")
    console.log(this.probabilityNodes)
}


//Calculate new weights 
// ----------
Pagerank.prototype.iterate = function (count) {

    var result = []
    var resultHash={};

    //For each node, we look at the incoming edges and 
    //the weight of the node connected via each edge. 
    //This weight is divided by the total number of 
    //outgoing edges from each weighted node and summed to 
    //determine the new weight of the original node.
    for (b in this.probabilityNodes) {
        var sum = 0
        for (var a=0; a<this.incomingNodes[b].length; a++) {
            prob = this.probabilityNodes[this.incomingNodes[b][a]] 
            ct = this.outgoingNodes[this.incomingNodes[b][a]].length
            sum += (prob/ct)  
        }

        //determine if the new probability is within tolerance.
        var res = this.coeff+this.linkProb*sum
            , max = this.probabilityNodes[b]+this.tolerance
            , min = this.probabilityNodes[b]-this.tolerance    

        //if the result has changed push that result
        if (min <= res >= max) result.push(res)
    
        //update the probability for node *b*
        this.probabilityNodes[b]=res
    }

    //When we have all results (no weights are changing) we return via callback
    if (result.length == this.pageCount) {
        if( this.outgoingNodes instanceof Object && !(this.outgoingNodes instanceof Array)) {
            //turn the result array into a hash
            for( i in this.outgoingNodes ) {
                resultHash[i]=result[Object.keys(this.outgoingNodes).indexOf(i)];
            }
            return this.callback(null, resultHash);
        }
        return this.callback(null, result)
    }
    
    //if debug is set, print each iteration
    if (this.debug) this.reportDebug(count) 
    
    this.iterate(++count)
}
