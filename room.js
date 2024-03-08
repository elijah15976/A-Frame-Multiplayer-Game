class TRight{
  constructor(x, y, z){
    this.name = "TRight";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = true;
    this.right = true;
    this.down = true;
    this.left = false;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "X-X",
      "X--",
      "X-X"
    ];

    let walls = [];
    for(let a = 0; a < roomLayout.length; a++){
      let cells = roomLayout[a].split("");
      for(let b = 0; b < cells.length; b++){
        if(cells[b] == "X"){
          walls.push( new ThickWall( b * (10/3), a * (10/3) ) );
        }
      }
    }
    for(let i = 0; i < walls.length; i++){
      this.obj.append(walls[i].obj);
    }

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class TUp{
  constructor(x, y, z){
    this.name = "TUp";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = true;
    this.right = true;
    this.down = false;
    this.left = true;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "X-X",
      "---",
      "XXX"
    ];

    let walls = [];
    for(let a = 0; a < roomLayout.length; a++){
      let cells = roomLayout[a].split("");
      for(let b = 0; b < cells.length; b++){
        if(cells[b] == "X"){
          walls.push( new ThickWall( b * (10/3), a * (10/3) ) );
        }
      }
    }
    for(let i = 0; i < walls.length; i++){
      this.obj.append(walls[i].obj);
    }

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class TLeft{
  constructor(x, y, z){
    this.name = "TLeft";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = true;
    this.right = false;
    this.down = true;
    this.left = true;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "X-X",
      "--X",
      "X-X"
    ];

    let walls = [];
    for(let a = 0; a < roomLayout.length; a++){
      let cells = roomLayout[a].split("");
      for(let b = 0; b < cells.length; b++){
        if(cells[b] == "X"){
          walls.push( new ThickWall( b * (10/3), a * (10/3) ) );
        }
      }
    }
    for(let i = 0; i < walls.length; i++){
      this.obj.append(walls[i].obj);
    }

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class TDown{
  constructor(x, y, z){
    this.name = "TDown";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = false;
    this.right = true;
    this.down = true;
    this.left = true;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "XXX",
      "---",
      "X-X"
    ];

    let walls = [];
    for(let a = 0; a < roomLayout.length; a++){
      let cells = roomLayout[a].split("");
      for(let b = 0; b < cells.length; b++){
        if(cells[b] == "X"){
          walls.push( new ThickWall( b * (10/3), a * (10/3) ) );
        }
      }
    }
    for(let i = 0; i < walls.length; i++){
      this.obj.append(walls[i].obj);
    }

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class Cross{
  constructor(x, y, z){
    this.name = "Cross";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = true;
    this.right = true;
    this.down = true;
    this.left = true;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "X-X",
      "---",
      "X-X"
    ];

    let walls = [];
    for(let a = 0; a < roomLayout.length; a++){
      let cells = roomLayout[a].split("");
      for(let b = 0; b < cells.length; b++){
        if(cells[b] == "X"){
          walls.push( new ThickWall( b * (10/3), a * (10/3) ) );
        }
      }
    }
    for(let i = 0; i < walls.length; i++){
      this.obj.append(walls[i].obj);
    }

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class StraightLR{
  constructor(x, y, z){
    this.name = "StraightLR";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = false;
    this.right = true;
    this.down = false;
    this.left = true;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "XXX",
      "---",
      "XXX"
    ];

    let walls = [];
    for(let a = 0; a < roomLayout.length; a++){
      let cells = roomLayout[a].split("");
      for(let b = 0; b < cells.length; b++){
        if(cells[b] == "X"){
          walls.push( new ThickWall( b * (10/3), a * (10/3) ) );
        }
      }
    }
    for(let i = 0; i < walls.length; i++){
      this.obj.append(walls[i].obj);
    }

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class StraightUD{
  constructor(x, y, z){
    this.name = "StraightUD";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = true;
    this.right = false;
    this.down = true;
    this.left = false;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "X-X",
      "X-X",
      "X-X"
    ];

    let walls = [];
    for(let a = 0; a < roomLayout.length; a++){
      let cells = roomLayout[a].split("");
      for(let b = 0; b < cells.length; b++){
        if(cells[b] == "X"){
          walls.push( new ThickWall( b * (10/3), a * (10/3) ) );
        }
      }
    }
    for(let i = 0; i < walls.length; i++){
      this.obj.append(walls[i].obj);
    }

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class CornerRU{
  constructor(x, y, z){
    this.name = "CornerRU";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = true;
    this.right = true;
    this.down = false;
    this.left = false;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "X-X",
      "X--",
      "XXX"
    ];

    let walls = [];
    for(let a = 0; a < roomLayout.length; a++){
      let cells = roomLayout[a].split("");
      for(let b = 0; b < cells.length; b++){
        if(cells[b] == "X"){
          walls.push( new ThickWall( b * (10/3), a * (10/3) ) );
        }
      }
    }
    for(let i = 0; i < walls.length; i++){
      this.obj.append(walls[i].obj);
    }

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class CornerRD{
  constructor(x, y, z){
    this.name = "CornerRD";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = false;
    this.right = true;
    this.down = true;
    this.left = false;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "XXX",
      "X--",
      "X-X"
    ];

    let walls = [];
    for(let a = 0; a < roomLayout.length; a++){
      let cells = roomLayout[a].split("");
      for(let b = 0; b < cells.length; b++){
        if(cells[b] == "X"){
          walls.push( new ThickWall( b * (10/3), a * (10/3) ) );
        }
      }
    }
    for(let i = 0; i < walls.length; i++){
      this.obj.append(walls[i].obj);
    }

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class CornerLD{
  constructor(x, y, z){
    this.name = "CornerLD";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = false;
    this.right = false;
    this.down = true;
    this.left = true;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "XXX",
      "--X",
      "X-X"
    ];

    let walls = [];
    for(let a = 0; a < roomLayout.length; a++){
      let cells = roomLayout[a].split("");
      for(let b = 0; b < cells.length; b++){
        if(cells[b] == "X"){
          walls.push( new ThickWall( b * (10/3), a * (10/3) ) );
        }
      }
    }
    for(let i = 0; i < walls.length; i++){
      this.obj.append(walls[i].obj);
    }

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class CornerLU{
  constructor(x, y, z){
    this.name = "CornerLU";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = true;
    this.right = false;
    this.down = false;
    this.left = true;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "X-X",
      "--X",
      "XXX"
    ];

    let walls = [];
    for(let a = 0; a < roomLayout.length; a++){
      let cells = roomLayout[a].split("");
      for(let b = 0; b < cells.length; b++){
        if(cells[b] == "X"){
          walls.push( new ThickWall( b * (10/3), a * (10/3) ) );
        }
      }
    }
    for(let i = 0; i < walls.length; i++){
      this.obj.append(walls[i].obj);
    }

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class RoomRight{
  constructor(x, y, z){
    this.name = "RoomRight";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = false;
    this.right = true;
    this.down = false;
    this.left = false;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "XXX",
      "X--",
      "XXX"
    ];

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class RoomUp{
  constructor(x, y, z){
    this.name = "RoomUp";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = true;
    this.right = false;
    this.down = false;
    this.left = false;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "X-X",
      "X-X",
      "XXX"
    ];

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class RoomLeft{
  constructor(x, y, z){
    this.name = "RoomLeft";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = false;
    this.right = false;
    this.down = false;
    this.left = true;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "XXX",
      "--X",
      "XXX"
    ];

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class RoomDown{
  constructor(x, y, z){
    this.name = "RoomDown";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = false;
    this.right = false;
    this.down = true;
    this.left = false;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "XXX",
      "X-X",
      "X-X"
    ];

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class RoomUD{
  constructor(x, y, z){
    this.name = "RoomUD";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = true;
    this.right = false;
    this.down = true;
    this.left = false;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "X-X",
      "X-X",
      "X-X"
    ];

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class RoomLR{
  constructor(x, y, z){
    this.name = "RoomLR";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = false;
    this.right = true;
    this.down = false;
    this.left = true;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "XXX",
      "---",
      "XXX"
    ];

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class RoomRU{
  constructor(x, y, z){
    this.name = "RoomRU";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = true;
    this.right = true;
    this.down = false;
    this.left = false;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "X-X",
      "X--",
      "XXX"
    ];

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class RoomRD{
  constructor(x, y, z){
    this.name = "RoomRD";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = false;
    this.right = true;
    this.down = true;
    this.left = false;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "XXX",
      "X--",
      "X-X"
    ];

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class RoomLD{
  constructor(x, y, z){
    this.name = "RoomLD";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = false;
    this.right = false;
    this.down = true;
    this.left = true;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "XXX",
      "--X",
      "X-X"
    ];

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class RoomLU{
  constructor(x, y, z){
    this.name = "RoomLU";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = true;
    this.right = false;
    this.down = false;
    this.left = true;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "X-X",
      "--X",
      "XXX"
    ];

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class RoomTR{
  constructor(x, y, z){
    this.name = "RoomTR";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = true;
    this.right = true;
    this.down = true;
    this.left = false;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "X-X",
      "X--",
      "X-X"
    ];

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class RoomTU{
  constructor(x, y, z){
    this.name = "RoomTU";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = true;
    this.right = true;
    this.down = false;
    this.left = true;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "X-X",
      "---",
      "XXX"
    ];

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class RoomTL{
  constructor(x, y, z){
    this.name = "RoomTL";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = true;
    this.right = false;
    this.down = true;
    this.left = true;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "X-X",
      "--X",
      "X-X"
    ];

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class RoomTD{
  constructor(x, y, z){
    this.name = "RoomTD";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = false;
    this.right = true;
    this.down = true;
    this.left = true;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "XXX",
      "---",
      "X-X"
    ];

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class RoomCross{
  constructor(x, y, z){
    this.name = "RoomCross";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = true;
    this.right = true;
    this.down = true;
    this.left = true;

    this.obj = document.createElement("a-entity");

    let roomLayout = [
      "X-X",
      "---",
      "X-X"
    ];

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}

class BlankSpot{
  constructor(x, y, z){
    this.name = "BlankSpot";
    this.x = x;
    this.y = y;
    this.z = z;

    this.up = false;
    this.right = false;
    this.down = false;
    this.left = false;

    this.obj = document.createElement("a-entity");

    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }
}