  var q = [],
    eventQ = [];

  $.fn.stopVideo = function() {
    this.removeClass("current").find("video").get(0).pause();
    return this;
  }

  $.fn.playVideo = function() {
    $("#musicWrap").find("div.current").removeClass("current");
    this.addClass("current").find("video").get(0).play();

    var w = this.find("video").width();
    this.animate({width:w+"px"})

    return this;
  }

  function runFunctions() {
    while(eventQ.length) {
      var f = eventQ.shift(),
          args = f.args.split(",");

      fuckYou[f.functionName].apply(null,args);
    }
  }

  fuckYou['pauseSong'] = function() {
    $("#musicWrap").find("div.current").find("video").get(0).pause();
  }

  fuckYou['playSong'] = function() {
    $("#musicWrap").find("div.current").find("video").get(0).play();
  }

  fuckYou['nextSong'] = function() {
    //Grab the first song and move it off the list
    var allSongs = $("#musicWrap").find("div.song"),
        songOne = allSongs.eq(0),
        songTwo = allSongs.eq(1),
        w = songOne.width();
    
    songOne.stopVideo().animate( {marginLeft:"-"+w+"px"}, function() {$(this).remove();songTwo.playVideo()});

  }

  fuckYou['loadPenalties'] = function() {
    $.ajax({
      url: "/getPenalties.json",
      dataType: "JSON",
      success: function(d){
        fuckYou["allPenalties"] = d;
        fuckYou["penalties"] = d.slice();
        arc = Math.PI / (fuckYou.penalties.length/2) ;
        drawRouletteWheel();
      }
    })
  }
  
  fuckYou['refreshPage'] = function() {
  window.location.reload();
  }

  fuckYou['toggleActiveBracket'] = function(id) {
    $("#bracket"+id).toggleClass("active")
  }

  fuckYou['hideWheel'] = function() {
  $("#penaltyText").text("");
    $("#wheelWrap").animate({
bottom: "-300px",
    },500)
  }

  fuckYou['showWheel'] = function() {
    $("#wheelWrap").animate({
bottom: "0px",
    }, 500)
  }


  fuckYou['filterNone'] = function() {
    fuckYou.penalties = [];
    for(var i=0;i<fuckYou.allPenalties.length;i++) {
      fuckYou.penalties.push(fuckYou.allPenalties[i])
    }
    arc = Math.PI / (fuckYou.penalties.length/2) ;
    drawRouletteWheel();
  }

  fuckYou['filterBoth'] = function() {
    fuckYou.penalties = [];
    for(var i=0;i<fuckYou.allPenalties.length;i++) {
      if(!fuckYou.allPenalties[i].alcohol && !fuckYou.allPenalties[i].crossfit ) {
        fuckYou.penalties.push(fuckYou.allPenalties[i])
      }
    }
    arc = Math.PI / (fuckYou.penalties.length/2) ;
    drawRouletteWheel();
  }
  fuckYou['filterAlc'] = function() {
    fuckYou.penalties = [];
    for(var i=0;i<fuckYou.allPenalties.length;i++) {
      if(! fuckYou.allPenalties[i].alcohol ) {
        fuckYou.penalties.push(fuckYou.allPenalties[i])
      }
    }
    arc = Math.PI / (fuckYou.penalties.length/2) ;
    drawRouletteWheel();
  }
  fuckYou['filterCrossfit'] = function() {
    fuckYou.penalties = [];
    for(var i=0;i<fuckYou.allPenalties.length;i++) {
      if(! fuckYou.allPenalties[i].crossfit ) {
        fuckYou.penalties.push(fuckYou.allPenalties[i])
      }
    }
    arc = Math.PI / (fuckYou.penalties.length/2) ;
    drawRouletteWheel();
  }

  fuckYou['zoom'] = function() {
    if($("#bracketWrap").hasClass("zoom")) {
        $("#bracketWrap").removeClass("zoom")
    }else {
        $("#bracketWrap").addClass("zoom")
    }
  }

  fuckYou['updateSingleBracket'] = function(location, team) {
    $("#spot"+location).val(team)
  }
  fuckYou['setWinner'] = function(team) {
    if(team == "") {
      $("#bracketWrap").removeClass("gameOver");
    }else {
      $("#winningTeam").find("h1").text(team);
      $("#bracketWrap").addClass("gameOver");
    }
  }

  function grabEvents() {
    if(eventQ.length) { return }
    $.ajax({
      url: "/getAndDeleteEvents.json",
      dataType: "JSON",
      success: function(d){
        eventQ = eventQ.concat(d)
        runFunctions();
      }
    })

    setTimeout(grabEvents,500);
  }

  $(function() {
    fuckYou.loadPenalties();
    //
    //Start polling for new events
    grabEvents();

      $.ajax({
        url: "/media.json",
        dataType: "JSON",
        success: function(d){
          q = d;

        var h = $("#musicWrap").height(),
          padding=15;
          
          $("#musicWrap").empty();
          
          for(i=0, l=d.length;i<l;i++) {
            var newSong = $("#songClone").clone().attr("id","");
            newSong.css({height:h+"px",width:h+"px"}).find("h3.songTitle").text(d[i].name).end().find("h3.artist").text(d[i].artist);
            newSong.find("video").attr("src",("/assets/media/"+d[i].src)).css("height",h)
              .bind("ended", function() {
                fuckYou.nextSong();
              });
            $("#musicWrap").append(newSong.show());

            newSong.click(function() {
              var $vid = $(this).find("video"),
                vid = $vid.get(0);
              // Check if video is currently playing
              if(vid.currentTime > 0 && !vid.paused && !vid.ended) {
                vid.pause();
              } else { 
                $(this).playVideo()      
              }
               
            })

          }

          $("#musicWrap").find("div.song:first").playVideo();

        }
      });


  })
// Wheel Code
var colors = ["#000", "#FF0000"]
var colors2 = ["#FF0000", "#000"]

var startAngle = 0;
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;
function drawRouletteWheel() {
  var canvas = document.getElementById("wheel");
  if (canvas.getContext) {
    var outsideRadius = 500;
    var textRadius = 425;
    var insideRadius = 25;
    
    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,1100,1100);
    
    
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    
    ctx.font = 'bold 30px Helvetica, Arial';
    
    for(var i = 0; i < fuckYou.penalties.length; i++) {
      var angle = startAngle + i * arc;
      ctx.fillStyle = colors[(i%2)];
      
      ctx.beginPath();
      ctx.arc(500, 500, outsideRadius, angle, angle + arc, false);
      ctx.arc(500, 500, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();
      
      ctx.save();
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur    = 0;
      ctx.shadowColor   = "rgb(220,220,220)";
      ctx.fillStyle = colors2[(i%2)];
      ctx.translate(500 + Math.cos(angle + arc / 2) * textRadius, 
                    500 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = fuckYou.penalties[i].abrev;
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    } 
    
  }
}
    
fuckYou['spinWheel'] = function() {
  $("#penaltyText").text("");
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1000;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 30;
  if(spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawRouletteWheel();
  spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  ctx.save();
  ctx.font = 'bold 30px Helvetica, Arial';
  var text = fuckYou.penalties[index].name
  $("#penaltyText").text(text);
  ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
  ctx.restore();
}

function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}

// END Wheel Code
