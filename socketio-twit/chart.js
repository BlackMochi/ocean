<script type="text/javascript">
        var twit
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://178.128.214.189:27017/";
        MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("database_twit");
                dbo.collection("twit").find({}).limit(5).toArray(function(err, result) {
                        if (err) throw err;
                        twit = result

                        //console.log(twit)
                        //res.render('chart',{name:'hint',data:twit})
                        db.close()
                })
        })
</script>
<!DOCTYPE html>
<html lang="en">
 
<head>
    <meta charset="UTF-8">
    <title>Highcharts</title>
</head>
 
<body>
 
<div style="width:80%;margin:auto;">
 
    <div id="hc_container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
 
</div>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="http://code.highcharts.com/highcharts.js"></script>
<script src="http://code.highcharts.com/modules/exporting.js"></script>
<script type="text/javascript">
$(function () {
    $('#hc_container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Friend Count of User from Twit'
        },
        subtitle: {
            text: 'Hello'
        },
        xAxis: {
            categories: [
                twit.user.name
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Friend Count (Person)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} person</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: twit.user.name,
            data: [twit.user.friends_count]
 
        }]
    });
});
</script>
</body>
</html>
