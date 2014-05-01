PageRank
========

An implementation of the pagerank algorithm in Node.js

Setup
---

    npm install

Usage
---
This example corresponds to 6 nodes with each array representing outgoing edges

    nodes = [1,2],[],[0,1,4],[4,5],[3,5],[3]
    linkProb = 0.85 //high numbers are more stable
    tolerance = 0.0001 //sensitivity for accuracy of convergence. 
    
    Pagerank(nodes, linkProb, tolerance, function (err, res) {
        if (err) throw new Error(err)
        
        //otherwise use the result (res)
    })
    
    
Testing
---
    npm test

Results
---

For the dataset provided above (6 pages)

    ____ITERATION 0____
    [ 0.14285714285714285,
      0.14285714285714285,
      0.14285714285714285,
      0.14285714285714285,
      0.14285714285714285,
      0.14285714285714285,
      0.14285714285714285 ]
    ____ITERATION 1____
    [ 0.18333333333333332,
      0.17726190476190476,
      0.15747916666666667,
      0.1874762400793651,
      0.1457250706845238,
      0.1011059734623016,
      0.12633176519097222 ]
    ____ITERATION 2____
    [ 0.18435401689608136,
      0.1781294857902406,
      0.1590667579303463,
      0.17387948658782926,
      0.1403962679753303,
      0.09532735322839887,
      0.12161111044015634 ]
    ____ITERATION 3____
    [ 0.18271664275842467,
      0.1767377177732324,
      0.1562105153717106,
      0.169057661324689,
      0.13753772351354893,
      0.09327807749156426,
      0.11952528685574454 ]
    ____ITERATION 4____
    [ 0.18044493043809468,
      0.1748067623009519,
      0.15417497789973428,
      0.166707975660879,
      0.1359623714893697,
      0.09227946108444501,
      0.11843135027244268 ]
    ____ITERATION 5____
    [ 0.17862312677228984,
      0.1732582291850178,
      0.1528473267151861,
      0.16540196172945043,
      0.1350311477328906,
      0.09172440516358786,
      0.11779968140957478 ]
    ____ITERATION 6____
    [ 0.17735293359603158,
      0.17217856498519826,
      0.1519926993337592,
      0.1646228987712751,
      0.13445790155092846,
      0.09139330340636334,
      0.11741533353542045 ]
    ____ITERATION 7____
    [ 0.1765112136395502,
      0.1714631030221891,
      0.1514449983721464,
      0.1641410211391203,
      0.13409792161813902,
      0.09118850541269756,
      0.11717530291667698 ]
    ____ITERATION 8____
    [ 0.17596492121883975,
      0.1709987544645852,
      0.15109465876372924,
      0.16383773222413683,
      0.13386976094021952,
      0.09105960762382959,
      0.1170235530682923 ]
    ____ITERATION 9____
    [ 0.17561352863253768,
      0.17070007076622845,
      0.15087074990381183,
      0.16364530400936658,
      0.1337245381052989,
      0.09097782563255223,
      0.11692707601715817 ]
    ____ITERATION 10____
    [ 0.1753883898707999,
      0.17050870281875136,
      0.15072769882129278,
      0.1635227673758555,
      0.13363192889600964,
      0.09092574756331002,
      0.1168655839237823 ]
    ____ITERATION 11____
    [ 0.17524439417364712,
      0.17038630647617148,
      0.1506363214617484,
      0.1634446088446151,
      0.13357282126836156,
      0.09089253018753285,
      0.11682634579732656 ]
    ____RESULTS____
    [ 0.1751523680914745,
      0.17030808430632474,
      0.1505779562978131,
      0.1633947196406794,
      0.13353508156024055,
      0.09087132727586017,
      0.11680129518391424 ]
