let playerInit = false;
let scene, mazeSpace, cameraRig, camera;
let mazeZ, mazeX;
let players = [], currentUser, currentUserInfo, bar, OSD;
let pacmanUser, ghostUsers = [];
let raycasterSettings = "objects: [interactable];far:7;";
let spectating = false;

window.onload = function() {
  //Initial Setup
  scene = document.querySelector("a-scene");
  mazeSpace = document.querySelector("#mazeSpace");
  cameraRig = document.querySelector("#camRig");
  camera = document.querySelector("#camera");

  //Lowering gravity to prevent falling through the floor
  scene.systems.physics.driver.world.gravity.y = -3;

  //Gets User Information
  getUserInfo();

  //Gets Leaderboard Information
  getLeaderboard();

  //Update Leaderboard
  for(let i = 0; i < document.getElementById("refreshLeaderboard").childElementCount; i++){
    document.getElementById("refreshLeaderboard").children[i].addEventListener("click", () => {
      getLeaderboard();
    });
  }
  
  //Sends message TO server for when start button is clicked
  for(let i = 0; i < document.getElementById("startButton").childElementCount; i++){
    document.getElementById("startButton").children[i].addEventListener("click", () => {
      socket.send("Add to queue");
    });
  }
  
  //Sends message TO server for when spectate button is clicked
  for(let i = 0; i < document.getElementById("spectateButton").childElementCount; i++){
    document.getElementById("spectateButton").children[i].addEventListener("click", () => {
      socket.send("Spectate");
      spectating = true;
    });
  }
  
  //Sends message TO server for when box is clicked
  document.getElementById("default-box").addEventListener("click", () => {
    socket.send("Click from box");
  });

  //Sends message TO server for when text is clicked
  document.getElementById("someTextLMAO").addEventListener("click", () => {
    socket.send("Click from text");
  });
}

//Initialize VR
function initVR() {
  camera.setAttribute("look-controls", {pointerLockEnabled: false});

  let lHand = document.createElement("a-entity");
  lHand.setAttribute("id", "leftHand");
  lHand.setAttribute("laser-controls", {hand: "left", color: "#ffcccc"});
  lHand.setAttribute("raycaster", raycasterSettings);
  let rHand = document.createElement("a-entity");
  rHand.setAttribute("id", "rightHand");
  rHand.setAttribute("laser-controls", {hand: "right", color: "#ffcccc"});
  rHand.setAttribute("raycaster", raycasterSettings);

  cameraRig.append(lHand);
  cameraRig.append(rHand);
}

//Initialize PC
function initPC() {
  let cursor = document.createElement("a-cursor");
  cursor.setAttribute("color", "white");
  cursor.setAttribute("raycaster", raycasterSettings);
  
  bar = new StaminaBar();
  cursor.append( bar.obj );

  //OSD => On screen display
  OSD = document.createElement("a-entity");
  OSD.setAttribute("id", "OSD");
  let OSDText = document.createElement("a-text");
  OSDText.setAttribute("align", "center");
  OSDText.setAttribute("position", "0 0.1 0");
  OSDText.setAttribute("scale", "0.2 0.2 0.2");
  OSD.append(OSDText);
  cursor.append(OSD)
  
  camera.append(cursor);

  let shiftClicked = false;
  let wClicked = false;
  window.addEventListener("keydown", (e) => {
    if((e.key == "p" || e.key == "P") && spectating){
      socket.send("returnToLobby");
      spectating = false;
    }
    if(e.key == "Shift"){
      shiftClicked = true;
    }
    if(e.key == "w" || e.key == "W"){
      wClicked = true;
    }
    if(shiftClicked && wClicked){
      currentUser.sprint = true;
      if(currentUser.stamina > 0){
        cameraRig.setAttribute("movement-controls", {speed:0.3});
      }
      else{
        cameraRig.setAttribute("movement-controls", {speed:0.2});
      }
    }
  });
  window.addEventListener("keyup", (e) => {
    if(e.key == "Shift"){
      shiftClicked = false;
    }
    if(e.key == "w" || e.key == "W"){
      wClicked = false;
    }
    if(!shiftClicked || !wClicked){
      currentUser.sprint = false;
      cameraRig.setAttribute("movement-controls", {speed:0.2});
    }
  });
}

function loop() {
  currentUser.run();
  bar.update();
  
  let currentOpac = OSD.children[0].getAttribute("opacity");
  if(currentOpac > 0){
    OSD.children[0].setAttribute("opacity", currentOpac-0.015);
  }
  
  //Continuously sends player data to the server
  currentUser.obj.object3D.position.x = cameraRig.object3D.position.x;
  currentUser.obj.object3D.position.y = cameraRig.object3D.position.y;
  currentUser.obj.object3D.position.z = cameraRig.object3D.position.z;
  currentUser.head.object3D.rotation.x = camera.object3D.rotation.x;
  currentUser.obj.object3D.rotation.y = camera.object3D.rotation.y;
  currentUser.head.object3D.rotation.z = camera.object3D.rotation.z;

  socket.send(`Player Info:
      {
        "id":"${currentUser.id}",
        "name":"${currentUser.username}",
        "posx":${currentUser.obj.object3D.position.x},
        "posy":${currentUser.obj.object3D.position.y},
        "posz":${currentUser.obj.object3D.position.z},
        "rotx":${currentUser.head.object3D.rotation.x},
        "roty":${currentUser.obj.object3D.rotation.y},
        "rotz":${currentUser.head.object3D.rotation.z}
      }`);

  window.requestAnimationFrame(loop);
}

//Handles the incoming message from the server
function handleMessage(info) {
  //Logs the message that comes FROM the server
  // if(!info.includes("Player Info:")) {
  //   console.log(`Message from server --> ${info}`);
  // }

  /* ------------------------- Player Checks ------------------------- */
  //Creates current user
  if(info == 'Connection Secured') {
    setTimeout(() => {
      socket.send(`Connected UserID: ${currentUserInfo.userID}`);
      socket.send(`Connected Username: ${currentUserInfo.username}`);
      //Creates Current User Object
      currentUser = new Player(-2, 0, 2, currentUserInfo.userID, currentUserInfo.username, true);
      //Check if player is on PC or VR
      console.log(AFRAME.utils.device.checkHeadsetConnected());
      if(AFRAME.utils.device.checkHeadsetConnected()) {
        //VR
        initVR();
      }
      else {
        //PC
        initPC();
      }
      //Starts Loop
      loop();
    }, 1000);
  }

  //Creates a new player object when someone connects
  if(info.includes("Someone connected! ")) {
    let msg = JSON.parse(info.substring(19));
    players.push(new Player(0, 0, 2, msg[0], msg[1], false));
  }

  //Stores the amount of players that are currently online
  if(info.includes("Online Players: ")) {
    let usersWhenJoined = JSON.parse(info.substring(16));
    console.log(usersWhenJoined);
    if(!playerInit) {
      for (let i = 0; i < usersWhenJoined.length; i++) {
        if(usersWhenJoined[i][0] != currentUser.id){
          players.push(new Player(i, 0, 4, usersWhenJoined[i][0], usersWhenJoined[i][1], false));
        }
      }
      playerInit = true;
    }
  }

  if(info.includes("Disconnected: ")){
    let userDC = info.substring(14);
    //console.log(typeof userDC);
    for(let i = 0; i < players.length; i++){
      if(players[i].id == userDC){
        players[i].obj.remove();
        players.splice(i, 1);
        break;
        //kachow
      }
    }
  }

  //Updates the player location
  if(info.includes("Player Info:")) {
    let userInfo = JSON.parse(info.substring(12));
    for (let i = 0; i < players.length; i++){
      if(players[i].id == userInfo.id){
        players[i].obj.object3D.position.x = userInfo.posx;
        players[i].obj.object3D.position.y = userInfo.posy;
        players[i].obj.object3D.position.z = userInfo.posz;
        players[i].head.object3D.rotation.x = userInfo.rotx;
        players[i].obj.object3D.rotation.y = userInfo.roty;
        players[i].head.object3D.rotation.z = userInfo.rotz;
        if(ghostUsers.includes(players[i]) && (currentUser == pacmanUser)){
          if((distance(players[i].obj, currentUser.obj) < 10) && (!players[i].scareSFX)){
            players[i].scareSFX = true;
            let scareSFX = document.createElement("a-sound");
            scareSFX.setAttribute("id", "boo");
            scareSFX.setAttribute("volume", 0.7);
            scareSFX.setAttribute("src", "#ghostClose");
            scareSFX.setAttribute("autoplay", "true");
            currentUser.obj.append(scareSFX);
          }
          else if((distance(players[i].obj, currentUser.obj) > 10) && players[i].scareSFX){
            players[i].scareSFX = false;
            document.getElementById("boo").remove();
          }
        }
        break;
      }
    }
  }

  /* ------------------------- Queue Logic ------------------------- */
  if(info == 'Added to queue'){
    document.getElementById("startButton").children[0].setAttribute("value", "In Queue");
    document.getElementById("startButton").children[0].object3D.position.x = -0.9;
    document.getElementById("startButton").children[1].setAttribute("color", "#FF0000");
  }
  
  if(info == 'Queue is full'){
    document.getElementById("startButton").children[0].setAttribute("value", "In Game");
    document.getElementById("startButton").children[0].object3D.position.x = -0.8;
    document.getElementById("startButton").children[1].setAttribute("color", "#FF0000");
  }

  if(info == 'Already in queue'){
    document.getElementById("startButton").children[0].setAttribute("value", "START");
    document.getElementById("startButton").children[0].object3D.position.x = -0.7;
    document.getElementById("startButton").children[1].setAttribute("color", "#00FF00");
  }

  if(info.includes("In Queue:")){
    document.getElementById("playerCountQueue").setAttribute("opacity", 1);
    document.getElementById("playerCountQueue").setAttribute("value", `${info.substring(9)}/5`);
  }
  
  if(info.includes("Maze: ")){
    let mazeInfo = JSON.parse(info.substring(6));
    //console logging also takes up effeciency
    //console.log(mazeInfo);
    renderMaze(mazeInfo);
    document.getElementById("startButton").children[0].setAttribute("value", "In Game");
    document.getElementById("startButton").children[0].object3D.position.x = -0.86;
    document.getElementById("startButton").children[1].setAttribute("color", "#FF0000");
  }

  if(info.includes("Tasks: ") ){
    let taskInfo = JSON.parse(info.substring(7));
    //console logging also takes up effeciency
    //console.log(taskInfo);
    addTasks(taskInfo);
  }
  

  if(info.includes("Key Clicked: ")){
    let keyPos = JSON.parse(info.substring(13));
    let lastNum = mazeSpace.children[(keyPos[0]*20) + (6*(mazeZ+mazeX)) + keyPos[1] + 2].childElementCount;
    mazeSpace.children[(keyPos[0]*20) + (6*(mazeZ+mazeX)) + keyPos[1] + 2].children[lastNum - 1].remove();
  }

  if(info.includes("Keys To Collect: ")){
    OSD.children[0].setAttribute("value", info);
    OSD.children[0].setAttribute("opacity", 1);
  }

  if(info == "Ghost Wins"){
    $.ajaxSetup({ async: false });
    let data = $.ajax({
      type: "POST",
      url: `${URL}/update-leaderboard`,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      data: {"winState": "0"}
    }).responseJSON;
    //console.log(data);

    getLeaderboard();
  }
  
  if(info == "Pacman Wins"){
    $.ajaxSetup({ async: false });
    let data = $.ajax({
      type: "POST",
      url: `${URL}/update-leaderboard`,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      data: {"winState": "1"}
    }).responseJSON;
    //console.log(data);

    getLeaderboard();
  }

  if(info == 'Game End'){
    document.getElementById("startButton").children[0].setAttribute("value", "START");
    document.getElementById("startButton").children[0].object3D.position.x = -0.7;
    document.getElementById("startButton").children[1].setAttribute("color", "#00FF00");
    if(currentUser != pacmanUser){
      let thisPlayer1 = pacmanUser.obj;
      thisPlayer1.children[3].remove(); //Remove gltf model
      for(let j = 0; j < thisPlayer1.childElementCount; j++){
        thisPlayer1.children[j].setAttribute("opacity", 1);
      }
      for(let j = 0; j < thisPlayer1.children[0].children[0].childElementCount; j ++){
        thisPlayer1.children[0].children[0].children[j].setAttribute("opacity", 1);
      }
    }
    else{
      let envLights = document.getElementById("default-lights");
      //Children 0 default intensity = 1
      //Children 1 default intensity = 0.6
      envLights.children[0].setAttribute("light", {intensity:1});
      envLights.children[1].setAttribute("light", {intensity:0.6});
      document.getElementById("pacmanAtmospheric").remove();
    }
    
    for(let i = 0; i < ghostUsers.length; i++){
      if(currentUser != ghostUsers[i]){
        let thisPlayer2 = ghostUsers[i].obj;
        thisPlayer2.children[3].remove(); //Remove gltf model
        for(let j = 0; j < thisPlayer2.childElementCount; j++){
          thisPlayer2.children[j].setAttribute("opacity", 1);
        }
        for(let j = 0; j < thisPlayer2.children[0].children[0].childElementCount; j ++){
          thisPlayer2.children[0].children[0].children[j].setAttribute("opacity", 1);
        }
      }
      else{
        document.getElementById("ghostAtmospheric").remove();
        try{
          document.getElementById("pacmanWakaSound").remove();
        }
        catch(e){
          console.log("Oh well");
        }
      }
    }
    mazeSpace.innerHTML = ``;
    mazeZ = 0;
    mazeX = 0;
    pacmanUser = undefined;
    ghostUsers = [];
  }

  /* ------------------------- Role Assignment ------------------------- */
  if(info.includes("Pacman: ")){
    let pacman = info.substring(8);
    if(pacman == currentUser.id){
      pacmanUser = currentUser;
      let pacmanAtmosphere = document.createElement("a-sound");
      pacmanAtmosphere.setAttribute("id", "pacmanAtmospheric");
      pacmanAtmosphere.setAttribute("volume", 0.7);
      pacmanAtmosphere.setAttribute("src", "#pacmanAtmosphere");
      pacmanAtmosphere.setAttribute("loop", "true");
      pacmanAtmosphere.setAttribute("autoplay", "true");
      currentUser.obj.append(pacmanAtmosphere);
      let envLights = document.getElementById("default-lights");
      for(let i = 0; i < envLights.childElementCount; i++){
        //Children 0 default intensity = 1
        //Children 1 default intensity = 0.6
        envLights.children[i].setAttribute("light", {intensity:0});
      }
    }
    else{
      for(let i = 0; i < players.length; i++){
        if(pacman == players[i].id){
          pacmanUser = players[i];
          let thisPlayer = pacmanUser.obj;
          for(let j = 0; j < thisPlayer.childElementCount; j++){
            thisPlayer.children[j].setAttribute("opacity", 0);
          }
          for(let j = 0; j < thisPlayer.children[0].children[0].childElementCount; j ++){
            thisPlayer.children[0].children[0].children[j].setAttribute("opacity", 0);
          }
          let model = document.createElement("a-gltf-model");
          model.setAttribute("src", "#pacmanModel");
          model.setAttribute("scale", "0.6 0.6 0.6");
          model.setAttribute("position", "0 0.2 0");
          model.object3D.rotation.y = Math.PI;
          model.object3D.rotation.x = -Math.PI/12;
          let hitBox = document.createElement("a-cylinder");
          hitBox.setAttribute("radius", 0.5);
          hitBox.setAttribute("height", 2.4);
          hitBox.setAttribute("opacity", 0);
          hitBox.object3D.position.y = 1.2;;
          hitBox.append(model);
          thisPlayer.append(hitBox);
          break;
        }
      }
    }
  }

  if(info.includes("Ghosts: ")){
    let ghostArray = JSON.parse(info.substring(8));
    if(ghostArray.includes(currentUser.id)){
      ghostUsers.push(currentUser);
      let pacmanSound = document.createElement("a-sound");
      pacmanSound.setAttribute("id", "pacmanWakaSound");
      pacmanSound.setAttribute("volume", 0.05);
      pacmanSound.setAttribute("src", "#pacmanWaka");
      pacmanSound.setAttribute("loop", "true");
      pacmanSound.setAttribute("autoplay", "true");
      pacmanUser.obj.append(pacmanSound);
      let ghostAtmosphere = document.createElement("a-sound");
      ghostAtmosphere.setAttribute("id", "ghostAtmospheric");
      ghostAtmosphere.setAttribute("volume", 0.15);
      ghostAtmosphere.setAttribute("src", "#ghostAtmosphere");
      ghostAtmosphere.setAttribute("loop", "true");
      ghostAtmosphere.setAttribute("autoplay", "true");
      currentUser.obj.append(ghostAtmosphere);
      pacmanUser.obj.children[3].setAttribute("interactable", "");
      pacmanUser.obj.children[3].addEventListener("click", ()=>{
        //Ghost caught pacman
        socket.send("Pacman clicked");
      });
    }
    else{
      
    }
    for(let i = 0; i < players.length; i++){
      if(ghostArray.includes(players[i].id)){
        ghostUsers.push(players[i]);
        let thisPlayer = players[i].obj;
        for(let j = 0; j < thisPlayer.childElementCount; j++){
          thisPlayer.children[j].setAttribute("opacity", 0);
        }
        for(let j = 0; j < thisPlayer.children[0].children[0].childElementCount; j ++){
          thisPlayer.children[0].children[0].children[j].setAttribute("opacity", 0);
        }

        let model = document.createElement("a-gltf-model");
        model.setAttribute("src", "#ghostModel");
        model.setAttribute("animation-mixer", {duration: 3});
        model.setAttribute("scale", "0.015 0.015 0.015");
        model.setAttribute("position", "0 -2.1 0");
        model.object3D.rotation.y = Math.PI;
        let hitBox = document.createElement("a-cylinder");
        hitBox.setAttribute("radius", 0.5);
        hitBox.setAttribute("height", 2.4);
        hitBox.setAttribute("opacity", 0);
        hitBox.object3D.position.y = 1.2;;
        hitBox.append(model);
        thisPlayer.append(hitBox);
      }
    }
  }
  
  if(info.includes("Location: ")){
    let locationInfo = JSON.parse(info.substring(10));
    cameraRig.object3D.position.x = locationInfo[0];
    cameraRig.object3D.position.y = locationInfo[1];
    cameraRig.object3D.position.z = locationInfo[2];
  }

  if(info == "Start Countdown"){
    let timeDown = 10;
    timeCountDown(timeDown);
  }

  if(info.includes("Lives: ")){
    OSD.children[0].setAttribute("value", info);
    OSD.children[0].setAttribute("opacity", 1);
  }
  
  /* ------------------------- Environmental Checks ------------------------- */
  //Checks if box is clicked
  if(info == 'Click from box') {
    document.getElementById("default-box").setAttribute("color", "blue");
    setTimeout(() => { document.getElementById("default-box").setAttribute("color", "black") }, 100);
  }

  //Checks if text is clicked
  if(info == 'Click from text') {
    document.getElementById("theTextWithin").setAttribute("color", "red");
    setTimeout(() => { document.getElementById("theTextWithin").setAttribute("color", "blue") }, 100);
  }
}

//Renders the maze
function renderMaze(maze){
  mazeSpace.innerHTML = "";

  let yValue = -10;
  mazeZ = maze.length;
  mazeX = maze[0].length;

  //Creates the floor
  let floor = document.createElement("a-plane");
  floor.setAttribute("static-body","");
  floor.setAttribute("src", "#floor");
  floor.setAttribute("repeat", `${mazeX * 5} ${mazeZ * 5}`);
  floor.setAttribute("position", {x:mazeX * 5, y:yValue, z:mazeZ * 5});
  floor.setAttribute("rotation", {x:-90, y:0, z:0});
  floor.setAttribute("width", mazeX * 10 + 4);
  floor.setAttribute("height", mazeZ *10 + 4);
  floor.setAttribute("material", {roughness: 0.8});
  mazeSpace.append(floor);

  //Creates the roof
  let roof = document.createElement("a-plane");
  roof.setAttribute("static-body","");
  roof.setAttribute("src", "#roof");
  roof.setAttribute("repeat", `${mazeX * 3} ${mazeZ * 3}`);
  roof.setAttribute("position", {x:mazeX * 5, y:yValue+6, z:mazeZ * 5});
  roof.setAttribute("rotation", {x:90, y:0, z:0});
  roof.setAttribute("width", mazeX * 10 + 4);
  roof.setAttribute("height", mazeZ *10 + 4);
  roof.setAttribute("material", {roughness: 0.8});
  mazeSpace.append(roof);

  let wallColor = "#99BBFF";
  //Creates the outer walls
  for(let i = 0; i < mazeX; i++){
    for(let j = 0; j < 3; j++){
      let wallTop = new ThickWall((10 * i) + (j * (10/3)), 0 - (10/3));
      let wallBottom = new ThickWall((10 * i) + (j * (10/3)), mazeZ * 10);
      wallTop.obj.setAttribute("position", {x: ((10 * i) + (j * (10/3))), y: yValue+3, z: (0 - (10/3))});
      wallTop.obj.setAttribute("color", wallColor);
      wallBottom.obj.setAttribute("position", {x: ((10 * i) + (j * (10/3))), y: yValue+3, z: mazeZ * 10});
      wallBottom.obj.setAttribute("color", wallColor);
      mazeSpace.append(wallTop.obj);
      mazeSpace.append(wallBottom.obj);
    }
  }
  for(let i = 0; i < mazeZ; i++){
    for(let j = 0; j < 3; j++){
      let wallLeft = new ThickWall(0 - (10/3), (10 * i) + (j * (10/3)));
      let wallRight = new ThickWall(mazeX * 10, (10 * i) + (j * (10/3)));
      wallLeft.obj.setAttribute("position", {x: (0 - (10/3)), y: yValue+3, z: ((10 * i) + (j * (10/3)))});
      wallLeft.obj.setAttribute("color", wallColor);
      wallRight.obj.setAttribute("position", {x: mazeX * 10, y: yValue+3, z: ((10 * i) + (j * (10/3)))});
      wallRight.obj.setAttribute("color", wallColor);
      mazeSpace.append(wallLeft.obj);
      mazeSpace.append(wallRight.obj);
    }
  }

  //Generates the actual maze
  for(let z = 0; z < mazeZ; z++){
    for(let x = 0; x < mazeX; x++){
      let xValue = x*10;
      let zValue = z*10;
      let currentMazeState = maze[z][x];
      let currentObject;
      if(currentMazeState == "TRight"){
        currentObject = new TRight(xValue, yValue, zValue);
      }
      else if(currentMazeState == "TUp"){
        currentObject = new TUp(xValue, yValue, zValue);
      }
      else if(currentMazeState == "TLeft"){
        currentObject = new TLeft(xValue, yValue, zValue);
      }
      else if(currentMazeState == "TDown"){
        currentObject = new TDown(xValue, yValue, zValue);
      }
      else if(currentMazeState == "Cross"){
        currentObject = new Cross(xValue, yValue, zValue);
      }
      else if(currentMazeState == "StraightLR"){
        currentObject = new StraightLR(xValue, yValue, zValue);
      }
      else if(currentMazeState == "StraightUD"){
        currentObject = new StraightUD(xValue, yValue, zValue);
      }
      else if(currentMazeState == "CornerRU"){
        currentObject = new CornerRU(xValue, yValue, zValue);
      }
      else if(currentMazeState == "CornerRD"){
        currentObject = new CornerRD(xValue, yValue, zValue);
      }
      else if(currentMazeState == "CornerLD"){
        currentObject = new CornerLD(xValue, yValue, zValue);
      }
      else if(currentMazeState == "CornerLU"){
        currentObject = new CornerLU(xValue, yValue, zValue);
      }
      else if(currentMazeState == "RoomRight"){
        currentObject = new RoomRight(xValue, yValue, zValue);
      }
      else if(currentMazeState == "RoomUp"){
        currentObject = new RoomUp(xValue, yValue, zValue);
      }
      else if(currentMazeState == "RoomLeft"){
        currentObject = new RoomLeft(xValue, yValue, zValue);
      }
      else if(currentMazeState == "RoomDown"){
        currentObject = new RoomDown(xValue, yValue, zValue);
      }
      else if(currentMazeState == "RoomUD"){
        currentObject = new RoomUD(xValue, yValue, zValue);
      }
      else if(currentMazeState == "RoomLR"){
        currentObject = new RoomLR(xValue, yValue, zValue);
      }
      else if(currentMazeState == "RoomRU"){
        currentObject = new RoomRU(xValue, yValue, zValue);
      }
      else if(currentMazeState == "RoomRD"){
        currentObject = new RoomRD(xValue, yValue, zValue);
      }
      else if(currentMazeState == "RoomLD"){
        currentObject = new RoomLD(xValue, yValue, zValue);
      }
      else if(currentMazeState == "RoomLU"){
        currentObject = new RoomLU(xValue, yValue, zValue);
      }
      else if(currentMazeState == "RoomTR"){
        currentObject = new RoomTR(xValue, yValue, zValue);
      }
      else if(currentMazeState == "RoomTU"){
        currentObject = new RoomTU(xValue, yValue, zValue);
      }
      else if(currentMazeState == "RoomTL"){
        currentObject = new RoomTL(xValue, yValue, zValue);
      }
      else if(currentMazeState == "RoomTD"){
        currentObject = new RoomTD(xValue, yValue, zValue);
      }
      else if(currentMazeState == "RoomCross"){
        currentObject = new RoomCross(xValue, yValue, zValue);
      }
      else if(currentMazeState == "BlankSpot"){
        currentObject = new BlankSpot(xValue, yValue, zValue);
      }
      mazeSpace.append(currentObject.obj);
    }
  }
}

// Adds Tasks
function addTasks(tasks){
  for(let i = 0; i < tasks.length;i++){
    for(let j = 0; j < tasks[i].length;j++){
      if( tasks[i][j] == "key" ){
        mazeSpace.children[(i*20) + (6*(mazeZ+mazeX)) + j + 2].append(new Key( 10/3, 10/3, i, j ).obj)
        //console.log( mazeSpace.children[(i*20) + (6*(mazeZ+mazeX)) + j + 2] );
      }
    }
  }
}