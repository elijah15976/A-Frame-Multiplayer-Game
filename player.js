class Player{
  constructor(x, y, z, player_id, player_username, isCurrentUser){
    //id would be a 10 digit integer unique to each player
    this.id = player_id;
    this.username = player_username;
    //isCurrentUser would be true if the user is the current user, false if it's someone else on the internet
    this.isCurrentUser = isCurrentUser;

    this.stamina = 500;
    this.incStamina = 1;
    this.decStamina = 2;
    this.sprint = false;

    this.scareSFX = false;

    this.obj = document.createElement("a-entity");

    this.head = document.createElement("a-sphere");
    this.head.setAttribute("position", {x:0, y:2, z:0});
    this.head.setAttribute("radius", 0.3);
    this.head.setAttribute("color", "rgb(100, 150, 255)");

    this.body = document.createElement("a-sphere");
    this.body.setAttribute("position", {x:0, y:0.7, z:0});
    this.body.setAttribute("radius", 0.9);
    this.body.setAttribute("scale", {x:0.35, y:1, z:0.35});
    this.body.setAttribute("color", "rgb(100, 100, 255)");

    
    this.body.setAttribute("shadows", {"recieve": "true"})

    let face = document.createElement("a-entity");
    let eyeL = document.createElement("a-sphere");
    eyeL.setAttribute("position", {x:-0.1, y:0.05, z:-0.3});
    eyeL.setAttribute("radius", 0.03);
    eyeL.setAttribute("color", "black");
    
    let eyeR = document.createElement("a-sphere");
    eyeR.setAttribute("position", {x:0.1, y:0.05, z:-0.3});
    eyeR.setAttribute("radius", 0.03);
    eyeR.setAttribute("color", "black");
    
    let mouth = document.createElement("a-cylinder");
    mouth.setAttribute("position", {x:0, y:-0.05, z:-0.3});
    mouth.object3D.rotation.z = Math.PI/2;
    mouth.setAttribute("radius", 0.02);
    mouth.setAttribute("height", 0.15);
    mouth.setAttribute("color", "black");
    
    face.append(eyeL);
    face.append(eyeR);
    face.append(mouth);

    this.head.append(face);

    this.obj.append(this.head);
    this.obj.append(this.body);

    if(!isCurrentUser){
      this.obj.setAttribute("interactable", "");
      let nameTag = document.createElement("a-text");
      nameTag.setAttribute("position", {x:0, y:2.7, z:0});
      nameTag.setAttribute("rotation", {x:0, y:180, z:0});
      nameTag.setAttribute("side", "double");
      nameTag.setAttribute("align", "center");
      nameTag.setAttribute("value", this.username);
      this.obj.append(nameTag);
    }

    if(isCurrentUser){
      this.head.setAttribute("opacity", 0);
      this.body.setAttribute("opacity", 0);
      let light = document.createElement("a-entity");
      light.setAttribute("position", {x:0, y:1.6, z:0});;
      light.setAttribute("light", {"type": "point",
                                   "distance": "20",
                                   "castShadow": "true",
                                   "intensity": "0.2"});
      this.obj.append(light);
      eyeL.setAttribute("opacity", 0);
      eyeR.setAttribute("opacity", 0);
      mouth.setAttribute("opacity", 0);
    }

    this.obj.setAttribute("position", {x:x, y:y, z:z});

    scene.append(this.obj);
  }
  run(){
    if(this.sprint && this.stamina > 0){
      this.stamina -= this.decStamina;
      if(this.stamina < 0){
        this.stamina = -50;
      }
    }
    else if(this.stamina < 500){
      this.stamina += this.incStamina;
    }
  }
}