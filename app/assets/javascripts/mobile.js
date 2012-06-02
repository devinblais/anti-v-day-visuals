  function sendEvent(name, args) { 
      args = args || "";
        $.ajax({
          url:"/js_events.json",
          dataType:"JSON",
          type:"POST",
          data:{ js_event: {functionName: name, args: args}}
        })
  }
  $(function() {

    //Attach clicking on bracket to activate
    $("#bracketWrap .bracket").click(function(e) {
      if($(e.target).is("select")) {return;}

      var id = $(this).attr("id").replace("bracket","");
      sendEvent("toggleActiveBracket", id)
    })

      $("#bracketWrap").find("select").bind("change", function(e) {
        var location = $(this).attr("id").replace("spot",""),
          team = $(this).val();

        $.ajax({
          url: "/updateSpot.json",
          type:'PUT',
          data:{"location":location, "spot[team_id]":team},
          success: function() {
            },
          error: function(d) {
          }
          })

          //Send the event to update the browser
          sendEvent("updateSingleBracket",location+","+team)
      })
  })

