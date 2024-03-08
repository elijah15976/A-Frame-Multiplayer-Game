//Attaches a random function to all arrays
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}
//Homepage URL
let URL = "https://f2166e48-2864-40b5-b38a-00a461eb243a-00-j15vqjkvw7bk.riker.replit.dev";

//Grabs user info from the web server
function getUserInfo(){
  $.ajaxSetup({ async: false });
  let data = $.ajax({
    type: "GET",
    url: `${URL}/get-user`,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true
  }).responseJSON;
  console.log(data);
  if (data == "{}" || data == "success") {
    data = "";
  }
  let username = data.username;
  let userID = data.userID;

  if ((username === undefined || username.length <= 0) && (userID === undefined || userID.length <= 0)) {
    currentUserInfo = {};
    window.location.href = URL;
  }
  else {
    currentUserInfo = data;
  }
}

function getLeaderboard(){
  $.ajaxSetup({ async: false });
  let data = $.ajax({
    type: "GET",
    url: `${URL}/get-leaderboard`
  }).responseJSON;
  //console.log(data);

  for(let i = 0; i < 8; i++){
    document.getElementById(`pacmanLead${i+1}`).setAttribute("value", "Loading...");
    document.getElementById(`ghostLead${i+1}`).setAttribute("value", "Loading...");
  }

  //Add delay so users know they interacted
  setTimeout(()=>{
    pacmanLeaders = [...data].sort((b, a) => a.PacmanWins - b.PacmanWins);
    ghostLeaders = [...data].sort((b, a) => a.GhostWins - b.GhostWins);
    //console.log(pacmanLeaders);
    //console.log(ghostLeaders);
    for(let i = 0; i < 8; i++){
      let length = pacmanLeaders[i].Username.length + pacmanLeaders[i].PacmanWins.length;
      let formulated = pacmanLeaders[i].Username;
      for(let j = 0; j < (40 - length); j++){
        formulated += ".";
      }
      formulated += pacmanLeaders[i].PacmanWins;
      document.getElementById(`pacmanLead${i+1}`).setAttribute("value", formulated);
    }
    for(let i = 0; i < 8; i++){
      let length = ghostLeaders[i].Username.length + ghostLeaders[i].GhostWins.length;
      let formulated = ghostLeaders[i].Username;
      for(let j = 0; j < (40 - length); j++){
        formulated += ".";
      }
      formulated += ghostLeaders[i].GhostWins;
      document.getElementById(`ghostLead${i+1}`).setAttribute("value", formulated);
    }
  }, 1000);
}

function distance(obj1,obj2){
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
  return d;
}

function timeCountDown(t){
  let timer = document.getElementById("timer");
  timer.setAttribute("value", t);
  if(t > 0){
    setTimeout(timeCountDown, 1000, t-1);
  }
}