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

let player = {
  pos: vec(G.WIDTH * 0.25, G.HEIGHT * 0.75)
};;
let swimSpd = 1;

let enemies;
let enemySwimSpd = 0.5;//4 * (difficulty*0.25);

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

      enemies = []
    }
    char('a',75,75) //friendly neighborhood random shark
    char('b', player.pos);
    player.pos.clamp(0, G.WIDTH, 10, G.HEIGHT - 10); //Keeps player from going offscreen
    // Player "swimming" controls
    if(input.isPressed){
      player.pos.y -= swimSpd;
    }else{
      player.pos.y += swimSpd;
    }
    // Update bubbles
    color("light_black");
    bubbles.forEach((s) => {
      s.pos.x -= s.speed;
      s.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);
      box(s.pos, 1);
    });
    color("black");

    

    if (enemies.length === 0) {
      // currentEnemySpeed =
      //     rnd(G.ENEMY_MIN_BASE_SPEED, G.ENEMY_MAX_BASE_SPEED) * difficulty;
      for (let i = 0; i < 9; i++) {
          const posX = rnd(10, G.WIDTH - 10);
          const posY = -rnd(i * G.HEIGHT * 0.1);
          enemies.push({ pos: vec(posX, posY) })
      }
    }

    remove(enemies, (e) => {
      e.pos.y += enemySwimSpd;
      color("black");
      char("a", e.pos);

      return (e.pos.y > G.HEIGHT);
    });
}

addEventListener("load", onLoad);