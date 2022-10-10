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
   NUMBUB: 20,
   BUBMIN: 0.5,
   BUBMAX: 1.0
};

options = {
    viewSize: {x: G.WIDTH, y:G.HEIGHT},
    theme: "dark"
  };

/** 
 * @typedef {object} Bubble
 * @property {Vector} pos
 * @property {number} speed
*/
/**
 * @type {Bubble[]}
 */
let bubbles;

function update() {
    if (!ticks) {
      //make bubbles with random pos and speed
      bubbles = times(G.NUMBUB, ()=>{
        return{
          pos: vec(rnd(0, G.WIDTH),rnd(0,G.HEIGHT)),
          speed: rnd(G.BUBMIN,G.BUBMAX)
        };
      });

    }
    char('a',75,75)
    // Update bubbles
    color("light_black");
    bubbles.forEach((s) => {
      s.pos.x -= s.speed;
      s.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);
      box(s.pos, 1);
    });
    color("black");
}

addEventListener("load", onLoad);