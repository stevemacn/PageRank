var should = require('should')
  , fs = require('fs')
  , path = require('path')
  , Pagerank = require('../lib/pagerank')

describe('Page rank', function () {
    this.timeout(0);

    //Larger numbers (0.85) provide low chance of random links 
    linkProb = 0.85 
    
    //accuracy at which we terminate 
    tolerance = 0.0001 
    
    var nodeMatrix = [
        [1],[0,2],[0,3,4],[4,5],[2,6],[0,6],[3]
    ]
            
    var expectedResponse = [ 
        0.1751523680914745,
        0.17030808430632474,
        0.1505779562978131,
        0.1633947196406794,
        0.13353508156024055,
        0.09087132727586017,
        0.11680129518391424
    ]

    it('correctly ranks nodes', function (done) {

        Pagerank(nodeMatrix, linkProb, tolerance, function (err, res) {
            
            should.not.exist(err)
            should.exist(res)
            res.should.be.instanceof(Array).and.have.lengthOf(7)
            res.should.eql(expectedResponse)
        })

        done()
    });

    it('correctly ranks nodes with string keys', function (done) {
        var nodeHash={
            "zero":["one"],
            "one":["zero","two"],
            "two":["zero","three","four"],
            "three":["four","five"],
            "four":["two","six"],
            "five":["zero","six"],
            "six":["three"]
        };

        var expectedHashResponse={
            "zero":0.1751523680914745,
            "one":0.17030808430632474,
            "two":0.1505779562978131,
            "three":0.1633947196406794,
            "four":0.13353508156024055,
            "five":0.09087132727586017,
            "six":0.11680129518391424
        };

        Pagerank(nodeHash, linkProb, tolerance, function (err, res) {
            should.not.exist(err)
            should.exist(res)
            res.should.be.instanceof(Object).and.not.instanceof(Array)
            Object.keys(res).should.have.lengthOf(7)
            res.should.eql(expectedHashResponse)
        });

        done();
    });

    it('correctly ranks nodes with both integer and string keys', function (done) {
        var nodeHash={
            "zero":["one"],
            "one":["zero","two"],
            "two":["zero","3","4"],
            "3":["4","5"],
            "4":["two","six"],
            "5":["zero","six"],
            "six":["3"]
        };

        var expectedHashResponse={
            "zero":0.1751523680914745,
            "one":0.17030808430632474,
            "two":0.1505779562978131,
            "3":0.1633947196406794,
            "4":0.13353508156024055,
            "5":0.09087132727586017,
            "six":0.11680129518391424
        };

        Pagerank(nodeHash, linkProb, tolerance, function (err, res) {

            should.not.exist(err);
            should.exist(res);
            res.should.be.instanceof(Object).and.not.instanceof(Array);
            Object.keys(res).should.have.lengthOf(7);
            res.should.eql(expectedHashResponse)
        }, true);

        done();
    });
})
