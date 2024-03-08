class StaminaBar{
  constructor(){
    this.obj = document.createElement("a-entity");
    this.sBar = document.createElement("a-box");
    this.sBar.setAttribute("depth", 0.001);
    this.sBar.setAttribute("height", 0.005);
    this.sBar.setAttribute("width", currentUser.stamina/5000);
    this.sBar.setAttribute("position", "0 -0.025 0");

    this.obj.append(this.sBar);

  }

  update(){
    this.sBar.setAttribute("width", currentUser.stamina/5000);

    if(this.sBar.getAttribute("width") <= 0 || this.sBar.getAttribute("width")  >= 0.1){
      this.sBar.setAttribute("opacity", 0);
    }
    else{
      this.sBar.setAttribute("opacity", 1);
    }
  }
}

