App.tr_logs = App.cable.subscriptions.create "TrLogsChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel

    if data.html is "clear"
      $("#trlog").empty();
      return

    $("#trlog").prepend(data.html);
    $(document).on('turbolinks:load',static_pages_ready);
