title = "Blub";

description = ``;

characters = [
`
  L
 LL  L
LLLLLL
LLLLLL
 LLL L
 `,
  `
l  l
 l  l
  lllL
 l  l
l  l
  `,
`


  lllL

  
`
];

const G ={
   WIDTH: 150,
   HEIGHT: 150, 
};

let player = {
  pos: vec(G.WIDTH * 0.25, G.HEIGHT * 0.75)
};;

let swimSpd = 1;

options = {
    viewSize: {x: G.WIDTH, y:G.HEIGHT},
    theme: "dark"
  };

function update() {
    if (!ticks) {
    }
    char('a',75,75)
    char('b', player.pos);
    player.pos.clamp(0, G.WIDTH, 10, G.HEIGHT - 10); //Keeps player from going offscreen
    // Player "swimming" controls
    if(input.isPressed){
      player.pos.y -= swimSpd;
    }else{
      player.pos.y += swimSpd;
    }
}

addEventListener("load", onLoad);