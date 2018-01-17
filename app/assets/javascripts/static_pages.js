
var static_pages_ready = function() {
  /*
  $('.list-group-item').unbind( "click" );
  $('.list-group-item').click(function(e) {
    e.preventDefault();
    return false;
  });
  */

  $('.settings .apply').unbind( "click" );
  $('.settings .apply').click(function(e) {
    $.ajax({
      url: "/api/settings",
      method: "PUT",
      data: {
        "cpe": {
          "ip": $('#api_cpe_ip').val(),
          "port": $('#api_cpe_port').val(),
          "path": $('#api_cpe_path').val(),
          "username": $('#api_cpe_username').val(),
          "password": $('#api_cpe_password').val()
        },
        "acs": {
          "name": $('#api_acs_name').val(),
          "username": $('#api_acs_username').val(),
          "password": $('#api_acs_password').val()
        }
      },
      success: function(data) {
        if (data.result == "false") {
          alert("Apply failed.");
        } else {
          alert("Apply success.");
          update_info();
        }
      }
    });

    return false;
  });

  $.ajax({
    url: "/api/settings",
    method: "GET",
    success: function(data) {
      if (data.result == "true") {
        $('#api_cpe_ip').val(data.cpe.ip);
        $('#api_cpe_port').val(data.cpe.port);
        $('#api_cpe_path').val(data.cpe.path);
        $('#api_cpe_username').val(data.cpe.username);
        $('#api_cpe_password').val(data.cpe.password);

        $('#api_acs_name').val(data.acs.name);
        $('#api_acs_username').val(data.acs.username);
        $('#api_acs_password').val(data.acs.password);
      }
    }
  });

  /*
  $('#updownload_file_type').unbind( "click" );
  $('#updownload_file_type').change(function() {
    if ((this.value == "1 Vendor Configuration File") ||
        (this.value == "2 Vendor Log File")) {
      $('#updownload_instance').attr('disabled', 'disabled');
    } else {
      $('#updownload_instance').removeAttr('disabled');
    }
  });
  */

  $('input[name="commit"].apply_updownload').unbind( "click" );
  $('input[name="commit"].apply_updownload').click(function() {
    var api = "download";
    var operation = "Download";
    var type = $('#updownload_file_type').val()
    //var name = "";

    gRequestId = Date.now();

    /*
    if ($('#updownload_instance').attr('disabled') == undefined) {
      type += " " + $('#updownload_instance').val();
    }
    */

    if ($(this).hasClass("upload")) {
      api = "upload";
      operation = "Upload";
    } /* else {
      name = $('#updownload_target_file_name').val();
    } */

    parameters = [{
      "name": "none",
      "value": $('#updownload_url').val(),
      "type": type
    }];

    $('#api_response_text').val("Processing " + operation + "...");

    $.ajax({
      url: "/api/cpe/" + api,
      method: "POST",
      data: {
        "requestId": gRequestId,
        "parameters": parameters
      },
      success: function(data) {
        if (data.result == "false") {
          $('#api_response_text').val(data.error);
        }
      }
    });

    return false;
  });

  $.ajax({
    url: "/api/cpe/messages",
    method: "GET",
    success: function(data) {
      if (data.result == "true") {
        $.each(data.messages, function(i, entry) {
          html = "<a class=\"list-group-item message\" onclick=\"javascript:getXml(" + entry.epoch +
                 ");return false;\">" + entry.string +
                 "</a>";
          //$('#trlog').append(html);
          $("#trlog").prepend(html);
        });
      }
    }
  });

  $('.clear-messages').unbind( "click" );
  $('.clear-messages').click(function(e) {
    $.ajax({
      url: "/api/cpe/messages",
      method: "DELETE"
    });
  });

};

//$(document).ready(ready);
$(document).on('turbolinks:load',static_pages_ready);
