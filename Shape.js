class Shape{

  constructor(x, y, angle, shapeType, nPixel){
    this.dimShape = 4;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.shapeType = shapeType;
    this.nPixel = nPixel;
    this.form = [];
    this.color = [255,255,255];
    for (let i = 0; i < this.dimShape; i++){
      this.form[i] = new Array(this.dimShape);
    }
    this.setType();
    this.rotate(angle);
  }

  setType(){
    for (let i = 0; i < this.dimShape; i++){
      for (let j = 0; j < this.dimShape; j++){
        this.form[i][j] = 0;
      }
    }
    if (this.shapeType === 0){ // I
      this.form[1][0] = 1;
      this.form[1][1] = 1;
      this.form[1][2] = 1;
      this.form[1][3] = 1;
      this.color = [255,0,0];
    }else if(this.shapeType === 1){ // O
      this.form[1][1] = 1;
      this.form[1][2] = 1;
      this.form[2][1] = 1;
      this.form[2][2] = 1;
      this.color = [0,0,255];
    }else if(this.shapeType === 2){ // L_dx
      this.form[0][1] = 1;
      this.form[0][2] = 1;
      this.form[1][1] = 1;
      this.form[2][1] = 1;
      this.color = [125,0,255];
    }else if(this.shapeType === 3){ // L_sx
      this.form[0][1] = 1;
      this.form[0][2] = 1;
      this.form[1][2] = 1;
      this.form[2][2] = 1;
      this.color = [255,0,255];
    }else if(this.shapeType === 4){ // T
      this.form[1][1] = 1;
      this.form[1][2] = 1;
      this.form[1][3] = 1;
      this.form[2][2] = 1;
      this.color = [0,255,0];
    }else if(this.shapeType === 5){ // S_dx
      this.form[0][2] = 1;
      this.form[1][1] = 1;
      this.form[1][2] = 1;
      this.form[2][1] = 1;
      this.color = [255,255,0];
    }else{ // S_sx
      this.form[0][1] = 1;
      this.form[1][1] = 1;
      this.form[1][2] = 1;
      this.form[2][2] = 1;
      this.color = [0,255,255];
    }
  }

  update(dx, dy, angle){
    this.rotate(angle);
    this.x = this.x + dx * this.nPixel;
    this.y = this.y + dy * this.nPixel;
  }

  rotate(angle){
    let cp = [];
    let rot = [];
    let ds = this.dimShape;

    for (let i = 0; i < ds; i++){
      cp[i] = this.form[i].slice();
    }

    if (angle > 0){
      for (let i = 0; i < ds; i++){
        for (let j = 0; j < ds; j++){
          cp[i][j] = this.form[j][ds - 1 - i];
        }
      }
    }else if(angle < 0){
      for (let i = 0; i < ds; i++){
        for (let j = 0; j < ds; j++){
          cp[i][j] = this.form[ds - 1 - j][i];
        }
      }
    }
    

    this.form = cp;

    //console.log(this.form);
    //console.log(cp);
 
  }

  draw(){
    let dimShape = this.dimShape;
    let dim = this.nPixel;
    for (let i = 0; i < dimShape; i++){
      for (let j = 0; j < dimShape; j++){
        //fill(255, 100, 0);
        if (this.form[i][j] == 1){
          fill(this.color[0], this.color[1], this.color[2]);
          rect(this.x + j * dim, this.y + i * dim, dim, dim);
        }
        //rect(this.x + j * dim, this.y + i * dim, dim, dim);
      }
    }
  }
}