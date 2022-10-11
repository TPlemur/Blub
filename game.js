title = "Blub";

description = `[Hold] to swim up`;

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

  
`,
`
  YY
 YyyY
 YyyY
  YY
`
];



const G ={
   WIDTH: 150,
   HEIGHT: 150, 
   NUMBUB: 20,
   BUBMIN: 0.3,
   BUBMAX: 0.8,
   SWIMSPD: 1,
   ENEMYSPD: 0.5 // * (difficulty * 0.5);
};

let player = {
  pos: vec(G.WIDTH * 0.25, G.HEIGHT * 0.75)
};;

let enemies;
let coins;
console.log(difficulty)

options = {
    viewSize: {x: G.WIDTH, y:G.HEIGHT},
    theme: "dark",
    seed: 3,
    isPlayingBgm: true
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

      enemies = [];
      coins = [];
    }

    char('b', player.pos);
    player.pos.clamp(0, G.WIDTH, 10, G.HEIGHT - 10); //Keeps player from going offscreen
    // Player "swimming" controls
    if(input.isPressed){
      player.pos.y -= G.SWIMSPD;
      char('b', player.pos);
    }else{
      player.pos.y += G.SWIMSPD;
    }

    // Update bubbles
    color("light_black");
    bubbles.forEach((s) => {
      s.pos.x -= s.speed * difficulty;
      s.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);
      box(s.pos, 1);
    });
    color("black");

    // Spawns more sharks if not enough on screen
    if (enemies.length <= 15) {
          const posX = rnd(G.WIDTH, G.WIDTH * 1.0 + G.WIDTH);
          const posY = rnd(10, G.HEIGHT - 10);
          enemies.push({ pos: vec(posX, posY) })
    }

    if (coins.length <= 15) {
          const posX = rnd(G.WIDTH, G.WIDTH * 1 + G.WIDTH);
          const posY = rnd(10, G.HEIGHT - 10);
          coins.push({ pos: vec(posX, posY) })
    }

    remove(enemies, (e) => {
      // Moves sharks
      e.pos.x -= G.ENEMYSPD;
      color("black");
      char("a", e.pos);

      // If a shark hits the player, ends game
      isCollidingWithPlayer = char("a", e.pos).isColliding.char.b;
      if(isCollidingWithPlayer){
        play("explosion");
        end();
      }

      if(e.pos.x < 0){
        //addScore(10);
      }
      return (e.pos.x < 0);
    });

    remove(coins, (c) => {
      // Moves coins
      c.pos.x -= G.ENEMYSPD;
      color("black");
      char("d", c.pos);

      // Player collects coins
      isCollidingWithPlayer = char("d", c.pos).isColliding.char.b;
      if(isCollidingWithPlayer){
        addScore(100);
        play("coin");
      }

      return (isCollidingWithPlayer || c.pos.x < 0);
    });
}

addEventListener("load", onLoad);