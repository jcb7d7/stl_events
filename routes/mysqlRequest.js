var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'events',
  database : 'events'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});



eventList = [];
table = 'meetup';
beginRange = 0;
endRange = 5;

connection.query("SELECT * FROM events."+  table + " tm left outer join events.places p on tm.place = p.venue where date > date_add(current_timestamp, interval "+
beginRange +" day) && date < date_add(current_timestamp, interval "+ endRange +" day);"
, function (error, results, fields) {
  if (error) throw error;

  for (var i = 0; i < results.length; i++) {

    console.log("\n\n****************\n\n"+table+"\n\n****************\n\n");

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

    eventList.push(individualEvent);
    console.log("\n\nResults object: \n"+JSON.stringify(results[i]));
    console.log("\n\individualElement object: \n"+JSON.stringify(individualEvent));


  }
  return eventList
});


connection.end();
