var should = require('should')
  , fs = require('fs')
  , path = require('path')
  , Pagerank = require('../lib/pagerank')

describe('Page rank', function () {

    //Larger numbers (0.85) provide low chance of random links 
    linkProb = 0.85 
    
    //accuracy at which we terminate 
    tolerance = 0.0001 
    
    var nodeMatrix = [
        [1,2],[],[0,1,4],[4,5],[3,5],[3]
    ]
    
    var nodeMatrix = [
        [1],[0,2],[0,3,4],[4,5],[2,6],[0,6],[3]
    ]
    var nodeHash={
        "0":["1"],
        "1":["0","2"],
        "2":["0","3","4"],
        "3":["4","5"],
        "4":["2","6"],
        "5":["0","6"],
        "6":["3"]
    }
            
    var expectedResponse = [ 
        0.1751523680914745,
        0.17030808430632474,
        0.1505779562978131,
        0.1633947196406794,
        0.13353508156024055,
        0.09087132727586017,
        0.11680129518391424
    ]

    var expectedHashResponse={
        "0":0.1751523680914745,
        "1":0.17030808430632474,
        "2":0.1505779562978131,
        "3":0.1633947196406794,
        "4":0.13353508156024055,
        "5":0.09087132727586017,
        "6":0.11680129518391424
    }

    it('correctly ranks nodes', function (done) {

        Pagerank(nodeMatrix, linkProb, tolerance, function (err, res) {
            
            should.not.exist(err)
            should.exist(res)
            res.should.be.instanceof(Array).and.have.lengthOf(7)
            res.should.eql(expectedResponse)
        })
    
        done()
    })

    it('correctly ranks nodes (hash)', function (done) {

        Pagerank(nodeHash, linkProb, tolerance, function (err, res) {

            should.not.exist(err)
            should.exist(res)
            res.should.be.instanceof(Object).and.not.instanceof(Array)
            Object.keys(res).should.have.lengthOf(7)
            res.should.eql(expectedHashResponse)
        })
    
        done()
    })
})
