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

options = {
    viewSize: {x: G.WIDTH, y:G.HEIGHT},
};

function update() {
    if (!ticks) {
    }
    char('a',75,75)
}

addEventListener("load", onLoad);