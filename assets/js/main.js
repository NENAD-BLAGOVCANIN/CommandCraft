API_ROOT = "http://31.187.74.246:9999"

var selectedServer = null;
var headers = {
    "user": "mpfv",
};

function fetchAndUpdateServerList() {
    var url = `${API_ROOT}/list`;
    
    $.ajax({
        url: url,
        type: "GET",
        headers: headers,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            $("#servers-wrapper").empty();

            data.forEach(function (item) {
                var button = $('<button class="server-button btn btn-dark bg-gray p-3 mx-2 rounded"></button>');
                button.text(item);
                button.click(function () {
                    $('#enterServerCommandsModal').modal('show');
                    selectedServer = item;
                });
                $("#servers-wrapper").append(button);
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error:", textStatus, errorThrown);
        }
    });
}

$(document).ready(function () {

    fetchAndUpdateServerList();
    setInterval(fetchAndUpdateServerList, 5000);

});


$(document).ready(function () {
    $('#submit-command-form').submit(function (event) {
        event.preventDefault();

        var typedCommand = $('#commandsInput').val();
        var lines = typedCommand.split('\n');

        var postData = {
            "serverID": selectedServer,
            "commands": lines
        };

        $.ajax({
            url: 'http://31.187.74.246:9999/server',
            type: 'POST',
            headers: headers,
            contentType: 'application/json',
            data: JSON.stringify(postData),
            success: function (response) {
                $('#commandsInput').val('');
                $('#enterServerCommandsModal').modal('hide');
                showAlert('Successfully ran the command!', 'success');
                console.log('Command submitted successfully:', response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                showAlert('Error while running command!', 'error');
                console.error('Error submitting command:', textStatus, errorThrown);
            }
        });
    });
});


function showAlert(text, messageType) {
    const alert = document.getElementById('dynamic-alert');
    const textElement = document.getElementById('alert-text');

    if (messageType === 'success') {
        alert.classList.add('alert-success', 'bg-success', 'text-white');
    } else if (messageType === 'danger' || messageType === 'error') {
        alert.classList.add('alert-danger', 'bg-danger', 'text-white');
    } else if (messageType === 'info') {
        alert.classList.add('alert-info', 'bg-info', 'text-white');
    } else if (messageType === 'primary') {
        alert.classList.add('alert-primary', 'bg-primary', 'text-white');
    }

    textElement.textContent = text;
    alert.style.display = 'block';

    $("#dynamic-alert").fadeTo(2000, 500).slideUp(500, function () {
        $("#dynamic-alert").slideUp(500);
    });
}

function hideAlert() {
    const alert = document.getElementById('dynamic-alert');
    alert.style.display = 'none';
}
