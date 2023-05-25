let Lösung;
let Lösung2;
let Lösung3;

function durchschnitt(x,y){
    
    return (x+y)/2;

}
Lösung = durchschnitt(10,22)
Lösung2 =durchschnitt (86,82)
Lösung3 = durchschnitt(24,29)

console.log ('Lösung ist:', Lösung);
console.log ('Lösung ist:', Lösung2);
console.log ('Lösung ist:', Lösung3);

function setup(){
    createCanvas (700,700);
    grid (10,30,20)
}
let x = 0;
let y = 0;

function grid(numX, numY, size) {
    console.log();

    for(let a= 0; a< numX ; a++) {
        for(let b= 0; b< numY ; b++) {

            rect(x,y,size);
            y += size;
            y = 0 ;
      
    }

    
}
}
