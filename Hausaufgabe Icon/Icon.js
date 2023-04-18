function setup() {
  createCanvas(400, 400);
}

function draw() {
  fill(0,0,0)
  circle(200,200,240)
  fill(255,255,255)
  circle(200,200,220)
  fill(0,0,0)
  //falsches logo und mit dreiecken 
  
  //triangle(200,110,200,240,140,240) //oben links
  //triangle(200,110,200,240,260,240) //oben rechts
  //triangle(200,290,200,240,260,240) //unten rechts
  //triangle(200,290,200,240,140,240) //unten links
  
  //neues logo mit vierecken
  
  quad(200,110,200,290,180,290,140,230)
  //1,2:punkt oben,2,3:ppunkt unten rechts,3,4:punkt unten links, 5,6: punkt links 
  fill(255,255,255)
  
  quad(200,110,200,290,220,290,260,230)// rechts
  
  
  triangle(200,130,200,270,170,220) //links klein
  fill(0,0,0)
  triangle(200,130,200,270,230,220) //rechts klein 
  
  fill(255,255,255)
  triangle(165,225,145,230,195,275) //links ganz klein
  triangle(235,225,255,230,205,275) //rechts ganz klein  
  
}
