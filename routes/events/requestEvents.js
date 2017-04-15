var mysql      = require('mysql');


exports.findByDate = function(table, beg_range, end_range, cb) {

  eventList = [];

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'events',
    database : 'events'
  });

  connection.query("SELECT * FROM events."+  table + " tm left outer join events.places p on tm.place = p.venue where date > date_add(current_timestamp, interval "+
  beg_range +" day) && date < date_add(current_timestamp, interval "+ end_range +" day);", function (error, results) {
    if (error) throw error;

    for (var i = 0; i < results.length; i++) {


        individualEvent = Object();
            individualEvent.name = results[i].name;
            individualEvent.date = results[i].date
            individualEvent.time = results[i].time;

        if ( table== 'meetup') {
            individualEvent.lat = results[i].lat;
            individualEvent.lon = results[i].lon;

        } else if ( table == 'ticket_master'){
          individualEvent.lat =  results[i].tm_lat;
          individualEvent.lon = results[i].tm_lon;
              // get lat and lon for google thing
        }
        individualEvent.link = results[i].link;

      eventList.push(individualEvent);
      //console.log("\n\nResults object: \n"+JSON.stringify(results[i]));
      //console.log("\n\individualElement object: \n"+JSON.stringify(individualEvent));
    }

    connection.end()
    cb(null, eventList);
    // connection.end(function (err) {
    //   if (err) {
    //     throw err;
    //   }else {
    //     cb(null, eventList);
    //   }
    // });
  });


}


exports.findByDateAndTopic = function(table, topic, beg_range, end_range, cb){
  eventList = [];

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'events',
    database : 'events'
  });


    console.log(table, topic );

  connection.query("SELECT * FROM events."+  table + " tm left outer join events.places p on tm.place = p.venue where date > date_add(current_timestamp, interval "+
  beg_range +" day) && date < date_add(current_timestamp, interval "+ end_range +" day) && type = '"+ topic + "';", function (error, results) {
    if (error) throw error;

    for (var i = 0; i < results.length; i++) {


        individualEvent = Object();
            individualEvent.name = results[i].name;
            individualEvent.date = results[i].date
            individualEvent.time = results[i].time;

        if ( table== 'meetup') {
            individualEvent.lat = results[i].lat;
            individualEvent.lon = results[i].lon;

        } else if ( table == 'ticket_master'){
          individualEvent.lat =  results[i].tm_lat;
          individualEvent.lon = results[i].tm_lon;
              // get lat and lon for google thing
        }
          individualEvent.link = results[i].link;

      eventList.push(individualEvent);
      //console.log("\n\nResults object: \n"+JSON.stringify(results[i]));
      //console.log("\n\individualElement object: \n"+JSON.stringify(individualEvent));
    }

    connection.end()
    cb(null, eventList);

  });

}


exports.findAll = function(cb) {
    console.log('Retrieving all events');
    eventList = [];
    taleList = ['meetup', 'ticket_master'];


    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'events',
      database : 'events'
    });


    connection.query("select * from events.meetup;", function (error, results, fields) {
      if (error) throw error;


      console.log(results);

      for (var i = 0; i < results.length; i++) {

        //
        //   individualEvent = Object();
        //       individualEvent.name = results[i].name;
        //       individualEvent.date = results[i].date
        //       individualEvent.time = results[i].time;
        //
        //   if ( table== 'meetup') {
        //       individualEvent.lat = results[i].lat;
        //       individualEvent.lon = results[i].lon;
        //
        //   } else if ( table == 'ticket_master'){
        //     individualEvent.lat =  results[i].tm_lat;
        //     individualEvent.lon = results[i].tm_lon;
        //         // get lat and lon for google thing
        //   }
        //   individualEvent.link = results[i].link;
        //
        // eventList.push(individualEvent);
        //console.log("\n\nResults object: \n"+JSON.stringify(results[i]));
        //console.log("\n\individualElement object: \n"+JSON.stringify(individualEvent));
      }
      cb(null, results);
    });
};
