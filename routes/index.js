var express = require('express');
var router = express.Router();
var event = require('./events/requestEvents.js')
var bodyParser = require('body-parser');
var _= require('lodash')

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

var app = express();
app.use(bodyParser.json());

router.get('/', function(req, res) {
  var slideLoc = [ '1', '3'];

  event.findAll(function(err, results){
      console.log('in cb');
      // res.send(results);

  });


  res.render('index', {/*This is where the return for the map goes I think?*/});
  res.end();
});

router.post('/', function(req, res) {
    console.log("gotta post here");
    var slideLoc = req.body['arg[0][]'];
    var tableList = req.body['eg_radio[0][]'];
    //assume flags are the checkboxes.
    console.log("slider = " + slideLoc);
    console.log("table list = " + tableList);
    var tableList_isArray = true;
    console.log(req.body);

    if (Array.isArray(tableList)) {
        tableList_isArray = true;
    } else {
        tableList_isArray = false;
    }

    // res.send({title: "HIT ME BACK"});
    var mergedResults = [];
    // FOR NOW JUST RETURNING THE FIRST BIT:

    function get_Data_By_Date_and_Topic(req, res, tableList, mergedResults, beg_range, end_range, cb){

          console.log("mergedResults at beginning \n==================================\n==================================\n: ", mergedResults, "\n==================================\n==================================\n");


          if (tableList.indexOf("meetup") > -1 ) {
            console.log("meetup was chosen");

            // MEETUP API CLL
            tableList.splice(tableList.indexOf('meetup'), 1);
            console.log("TABLE LIST POST SPLIDS; "+ tableList);
            event.findByDate('meetup', beg_range, end_range, function(err, results){
              if (err)
                throw err;
              else

                    immediateResults = results;
                    console.log(immediateResults);

                    mergedResults = _.concat(mergedResults, immediateResults);
                    console.log("meetup lodash_results are \n\n" + mergedResults);

                    if (tableList.length > 0) {
                      console.log("meetup recursing ******************************" );

                        get_Data_By_Date_and_Topic(req, res,tableList, mergedResults, beg_range, end_range, cb);
                    } else {
                      console.log("meetup recursing ******************************" );

                      res.send(mergedResults);
                    }
            });

          } else {
            if (tableList.length == 0) {
                res.send(mergedResults);
            } else {
                topic = tableList.pop();
                console.log("\n\ntable list length:" +tableList.length + " \n\n");
                console.log('items in table list:: ',tableList);
            }
            console.log("topic at beginning \n==================================\n==================================\n: ", topic, "\n==================================\n==================================\n");

            // TICKETMASTER AND OTHER APIS
              event.findByDateAndTopic('ticket_master', topic, beg_range, end_range, function(err, results){
              if (err)
                throw err;
              else

                    immediateResults = results;
                    console.log('results for "'+topic +'"are:::::::::; \n\n', immediateResults);
                    // **************************************************
                    // **************************************************
                    // **************************************************
                    // LODASH MERGE OVERWRITES: - USE CONCAT
                    // **************************************************
                    // **************************************************
                    mergedResults = _.concat(mergedResults, immediateResults);
                    console.log(topic, " lodash_results are \n\n" + mergedResults);

                    if (tableList.length > 0) {
                      console.log("ticket_master recursing ******************************\nfrom ", topic  );
                        get_Data_By_Date_and_Topic(req, res, tableList, mergedResults, beg_range, end_range, cb);
                    } else {
                      console.log("ticket_master sending ******************************\nfrom ", topic );

                      res.send(mergedResults);
                    }
            });
          }
    }

    if (tableList.constructor == Array) {
      console.log("constructor is array!!!");
      get_Data_By_Date_and_Topic(req, res, tableList, mergedResults, slideLoc[0], slideLoc[1]);
    } else {
      var tableListArray = [tableList];
      console.log(tableListArray, "is table list array");
      get_Data_By_Date_and_Topic(req, res, tableListArray, mergedResults, slideLoc[0], slideLoc[1]);
    }


});





module.exports = router;
