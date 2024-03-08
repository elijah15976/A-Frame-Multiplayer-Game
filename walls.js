class ThickWall{
  constructor(x, z){
    this.x = x;
    this.z = z;
    this.height = 6;
    
    this.obj = document.createElement("a-box");
    this.obj.setAttribute("static-body","");
    this.obj.setAttribute("interactable","");
    this.obj.setAttribute("src", "#wall");
    this.obj.setAttribute("repeat", "1 2");
    this.obj.setAttribute("width", 10/3);
    this.obj.setAttribute("depth", 10/3);
    this.obj.setAttribute("height", this.height);
    this.obj.setAttribute("material", {roughness: 1});
    this.obj.setAttribute("position", {x: this.x, y: this.height/2, z:this.z})
  }
}

class RoomWall{
  constructor(x, z){
    this.x = x;
    this.z = z;
    this.height = 6;
    this.obj = document.createElement("a-box");
    this.obj.setAttribute("static-body","");
    this.obj.setAttribute("src", "#wall");
    this.obj.setAttribute("width", 10/6);
    this.obj.setAttribute("depth", 10/6);
    this.obj.setAttribute("height", this.height);
    this.obj.setAttribute("roughness", 1);
    this.obj.setAttribute("position", {x: this.x, y: this.height/2, z:this.z})
  }
}