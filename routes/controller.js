var event = require('./events/requestEvents.js')
var _= require('lodash')



exports.get_Data_By_Date_and_Topic = function getDataWrapper(req, res, tableList, mergedResults, beg_range, end_range, cb){
      if (tableList.indexOf("meetup") > -1 ) {
        console.log("meetup was chosen");

        // MEETUP API CLL
        tableList.splice(tableList.indexOf('meetup'), 1);
        event.findByDate('meetup', beg_range, end_range, function(err, results){
          if (err)
            throw err;
          else

                immediateResults = results;
                console.log(results);

                lodash_results = _.merge(mergedResults, immediateResults);

                if (tableList.length > 0) {
                    getDataWrapper(tableList, lodash_results, beg_range, end_range, cb);
                } else {
                  res.send(lodash_results);
                }
        });

      } else {

        if (tableList.length > 0) {
            res.send(mergedResults);
        } else {
            topic = tableList.pop();
        }
        // TICKETMASTER AND OTHER APIS
          event.findByDateAndTopic('ticket_master', topic, beg_range, end_range, function(err, results){
          if (err)
            throw err;
          else

                immediateResults = results;
                console.log(results);

                lodash_results = _.merge(mergedResults, immediateResults);

                if (tableList.length > 0) {
                    getDataWrapper(tableList, lodash_results, beg_range, end_range, cb);
                } else {
                  res.send(lodash_results);
                }
        });
      }
}
