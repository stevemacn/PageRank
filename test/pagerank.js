var assert = require('assert')
  , fs = require('fs')
  , path = require('path')
  , Pagerank = require('../lib/pagerank')

describe('kmeans', function () {

    linkProb = 0.85 //Larger numbers (0.85) provide lower chance of random links 
    tolerance = 0.001 //accuracy at which we terminate 

    it('correctly ranks nodes', function (done) {


        var nodeMatrix = [
            [2,3],[],[1,2,5],[5,6],[4,5],[4]
        ]

        Pagerank(nodeMatrix, linkProb, tolerance, function (err, res) {
            console.log("DONE")
            //assert.equals(err, null)
        })
    
        //asert.equal(,)
    done()
  })
})
