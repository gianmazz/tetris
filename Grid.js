class Grid{

  constructor(x, y, nPixel, totX, totY){
    this.x = x;
    this.y = y;
    this.nPixel = nPixel;
    this.totCellsX = totX;
    this.totCellsY = totY;
    this.form = [];
    for (let i = 0; i < totY; i ++){
      this.form[i] = new Array(totX);
    }
    for (let i = 0; i < totY; i ++){
      for (let j = 0; j < totX; j ++){
        this.form[i][j] = 0;
      }
    }
  }

  update(shape, XG, YG){
    let ig = (shape.y - YG) / shape.nPixel;
    let jg = (shape.x - XG) / shape.nPixel;
    if (ig < 0){ig = 0;}
    //if (jg < 0){jg = 0;}
    let IG = ig + shape.dimShape;
    if (IG > this.totCellsY){IG = this.totCellsY;}
    //if (IG < 0){IG = 0;}
    let JG = jg + shape.dimShape;
    if (JG > this.totCellsX){JG = this.totCellsX;}
    //if (JG < 0){JG = 0;}
    let is = 0;
    for (let i = ig; i < IG; i++){
      let js = 0;
      for (let j = jg; j < JG; j++){
        if (this.form[i][j] == 0){
          this.form[i][j] = shape.form[is][js];
        }
        js += 1;
      }
      is += 1;
    }
  }

  removeRows(){
    let maxVal = this.totCellsX;
    //console.log('removeRows');
    for (let i = this.totCellsY - 1; i >= 0; i--){
      let sum = 0;
      for (let j = 0; j < this.totCellsX; j++){
        sum = sum + this.form[i][j];
      }
      //console.log(sum, maxVal);
      if (sum >= maxVal){
        for(let k = i; k > 0; k--){
          for (let j = 0; j < this.totCellsX; j++){
            this.form[k][j] = this.form[k - 1][j];
          }
        }
        for (let j = 0; j < this.totCellsX; j++){
          this.form[0][j] = 0;
        }
      }
    }
  }

  check(shape, XG, YG){
    let flag = false;
    let ig = (shape.y - YG) / shape.nPixel;
    let jg = (shape.x - XG) / shape.nPixel;
    if (ig < 0){ig = 0;}
    //if (jg < 0){jg = 0;}

    let IG = ig + shape.dimShape;
    if (IG > this.totCellsY){IG = this.totCellsY;}
    //if (IG < 0){IG = 0;}
    let JG = jg + shape.dimShape;
    if (JG > this.totCellsX){JG = this.totCellsX;}
    //if (JG < 0){JG = 0;}
    let is = 0;
    for (let i = ig; i < IG; i++){
      let js = 0;
      for (let j = jg; j < JG; j++){
        if (this.form[i][j] === 1 && shape.form[is][js] === 1){
          flag = true;
        }
        js += 1;
      }
      is += 1;
    }
    return flag;
  }

  draw(limit){
    let dim = this.nPixel;
    for (let i = limit; i < this.totCellsY; i++){
      for (let j = 0; j < this.totCellsX; j++){
        fill(150, 150, 150);
        if (this.form[i][j] === 1){
          fill(150, 255, 150);
        }
        rect(this.x + j * dim, this.y + i * dim, dim, dim);
      }
    }
  }

  

}