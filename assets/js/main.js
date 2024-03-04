API_ROOT = "http://31.187.74.246:9999"

$(document).ready(function () {
    var url = `${API_ROOT}/list`;

    var headers = {
        "user": "mpfv",
    };


    $.ajax({
        url: url,
        type: "GET",
        headers: headers,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log("Success! Data:", data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error:", textStatus, errorThrown);
        }
    });

});