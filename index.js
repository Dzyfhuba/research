filename = 'C104_100.json';
$(document).ready(function () {
    $.getJSON(filename, function (data) {
        json_data = data['instance']['network']['nodes']['node'][0]['cx'];
        nodes = data['instance']['network']['nodes']['node'];
        fleet = data['instance']['fleet']['vehicle_profile'];
        requests = data['instance']['requests']['request'];
        $('#data').html(JSON.stringify(fleet));

        out_nodes = "";
        out_fleet = "";
        out_requests = "";

        nodes.forEach(node => {
            out_nodes += `<tr><td>${node['_id']}</td><td>${node['cx']}</td><td>${node['cy']}</td><td>${node['_type']}</td></tr>`;
        });

        out_fleet += `<tr>
            <td>${fleet['departure_node']}</td>
            <td>${fleet['arrival_node']}</td>
            <td>${fleet['capacity']}</td>
            <td>${fleet['max_travel_time']}</td>
            <td>${fleet['_type']}</td>
            <td>${fleet['_number']}</td>
            </tr>`;

        requests.forEach(request => {
            out_requests += `
            <tr>
            <td>${request['tw']['start']}</td>
            <td>${request['tw']['end']}</td>
            <td>${request['quantity']}</td>
            <td>${request['service_time']}</td>
            <td>${request['_id']}</td>
            <td>${request['_node']}</td>
            </tr>`
        });
        
        $('#nodes tbody').html(out_nodes);
        $('#fleet tbody').html(out_fleet);
        $('#requests tbody').html(out_requests);
    });
});

$('#download').on('click', function(e){
    $('#nodes').tableExport({
        fileName: `${filename.split(".")[0]}-nodes`,
        type: 'csv',
    });
    $('#fleet').tableExport({
        fileName: `${filename.split(".")[0]}-fleet`,
        type: 'csv',
    });
    $('#requests').tableExport({
        fileName: `${filename.split(".")[0]}-requests`,
        type: 'csv',
    });
});