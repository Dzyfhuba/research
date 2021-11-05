$(document).ready(function () {
    $.getJSON('C104_100.json', function(data){
        console.log(data);
        json_data = data['instance']['network']['nodes']['node'][0]['cx'];
        $('#data').html(JSON.stringify(json_data));
    });
});