var assert = require('assert')
  , fs = require('fs')
  , path = require('path')
  , Pagerank = require('../lib/pagerank')

describe('kmeans', function () {

    linkProb = 0.85 //Larger numbers (0.85) provide lower chance of random links 
    tolerance = 0.001 //accuracy at which we terminate 

    it('correctly ranks nodes', function (done) {


        var nodeMatrix = [
            [1,2],[],[0,1,4],[4,5],[3,5],[3]
        ]

        Pagerank(nodeMatrix, linkProb, tolerance, function (err, res) {
            console.log("____RESULTS____")
            console.log(res)
            //assert.equals(err, null)
        })
    
        //asert.equal(,)
    done()
  })
})
