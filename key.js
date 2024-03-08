class Key{
  constructor( x, z, iValue, jValue ){
    this.x = x;
    this.y = 0.15;
    this.z = z;

    this.obj = document.createElement("a-cylinder");
    this.obj.setAttribute("opacity", 0);
    this.obj.setAttribute("interactable", "");
    this.obj.setAttribute("height", 1.8);
    this.obj.setAttribute("radius", 0.3);
    this.obj.setAttribute("rotation", "90 0 0");
    this.obj.setAttribute("scale", "0.5 0.5 0.5");
    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
    // this.obj.setAttribute("light", {"type": "point",
    //                                  "distance": "1",
    //                                  "castShadow": "false",
    //                                  "intensity": "0.2"});

    this.obj.addEventListener("click", ()=>{
      if(currentUser == pacmanUser){
        socket.send(`Key Clicked: [${iValue}, ${jValue}]`);
      }
    });

    let key = document.createElement("a-gltf-model");
    key.setAttribute("src", "#key");
    key.setAttribute("scale", "0.03 0.03 0.03");
    key.setAttribute("rotation", "-90 0 0");
    key.setAttribute("position", "0 -0.65 0");

    this.obj.append(key);
  }
}