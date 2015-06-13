var should = require('should')
  , fs = require('fs')
  , path = require('path');

describe('PageRank', function () {

    //Larger numbers (0.85) provide low chance of random links 
    linkProb = 0.85 
    
    //accuracy at which we terminate 
    tolerance = 0.0001 
    
    var nodeMatrix = [
        [1],[0,2],[0,3,4],[4,5],[2,6],[0,6],[3]
    ];
            
    expectedResponse = [ 
        0.1751523680914745,
        0.17030808430632474,
        0.1505779562978131,
        0.1633947196406794,
        0.13353508156024055,
        0.09087132727586017,
        0.11680129518391424
    ];

    it('should load package by requiring the package directory', function (done) {
        var Pagerank = require('..');

        Pagerank(nodeMatrix, linkProb, tolerance, function (err, res) {
            should.not.exist(err);
            res.should.eql(expectedResponse);
        });
    
        done();
    });
});
