//LEVEL 2
class Level2 extends Phaser.Scene {
  constructor() {
    super({ key: "Level2" });
  }

  preload() {
    this.load.image("player", "assets/player.png");
    this.load.image("background", "assets/background.png");
    this.load.image("dragon", "assets/dragon.png");
    this.load.image("treasure", "assets/treasure.png");
    this.load.image(
      "platform",
      "https://content.codecademy.com/courses/learn-phaser/physics/platform.png"
    );
  }

  create() {
    gameState.player = this.physics.add.sprite(100, 200, "player");
    gameState.dragons = this.physics.add.group();
    gameState.dragonA = gameState.dragons.create(340, 100, "dragon");
    gameState.dragonB = gameState.dragons.create(340, 340, "dragon");
    Phaser.Actions.ScaleXY(gameState.dragons.getChildren(), -0.4, -0.4);
    gameState.dragonA.speed = 1.7;
    gameState.dragonB.speed = 1.5;

    gameState.treasure = this.physics.add.image(
      gameState.width - 40,
      30,
      "treasure"
    );
    const platforms = this.physics.add.staticGroup();
    platforms
      .create(230, gameState.height, "platform")
      .setScale(2, 0.1)
      .refreshBody();
    platforms.create(200, 250, "platform").setScale(0.3, 0.3).refreshBody();
    platforms.create(450, 180, "platform").setScale(0.5, 0.3).refreshBody();
    platforms.create(600, 100, "platform").setScale(0.5, 0.3).refreshBody();
    gameState.player.setCollideWorldBounds(true);
    gameState.dragonA.setCollideWorldBounds(true);
    gameState.dragonB.setCollideWorldBounds(true);
    this.physics.add.collider(gameState.player, platforms);
    this.physics.add.collider(gameState.treasure, platforms);
    this.physics.add.collider(gameState.player, gameState.treasure, () => {
      this.physics.pause();
      this.cameras.main.shake(100);
      this.add.text(200, 100, "You Win!", {
        fontSize: "50px",
        fill: "#000000",
      });
    });
    this.physics.add.collider(gameState.dragons, platforms);
    this.physics.add.collider(gameState.dragons, gameState.player, () => {
      this.physics.pause();
      this.add.text(200, 100, "GAME OVER", {
        fontSize: "50px",
        fill: "#000000",
      });
      this.add.text(200, 170, "Click to Restart", {
        fontSize: "50px",
        fill: "#000000",
      });
      this.input.on("pointerup", () => {
        this.scene.stop("Level1");
        this.scene.start("StartScene");
      });
    });

    gameState.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (gameState.cursors.left.isDown) {
      gameState.player.setVelocityX(-160);
    } else if (
      gameState.cursors.up.isDown &&
      gameState.player.body.touching.down
    ) {
      console.log("piing");
      gameState.player.setVelocityY(-250);
    } else if (gameState.cursors.right.isDown) {
      gameState.player.setVelocityX(160);
    } else {
      gameState.player.setVelocityX(0);
    }

    //moving dragon
    gameState.dragonA.x += gameState.dragonA.speed;
    gameState.dragonB.x += gameState.dragonB.speed;

    // reverse movement if reached the edges
    if (gameState.dragonA.x >= 550 && gameState.dragonA.speed > 0) {
      gameState.dragonA.speed *= -1;
    } else if (gameState.dragonA.x <= 350 && gameState.dragonA.speed < 0) {
      gameState.dragonA.speed *= -1;
    }
    if (gameState.dragonB.x >= 675 && gameState.dragonB.speed > 0) {
      gameState.dragonB.speed *= -1;
    } else if (gameState.dragonB.x <= 30 && gameState.dragonB.speed < 0) {
      gameState.dragonB.speed *= -1;
    }
  }
}

//LEVEL 1
class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: "Level1" });
  }

  preload() {
    this.load.image("player", "assets/player.png");
    this.load.image("background", "assets/background.png");
    this.load.image("dragon", "assets/dragon.png");
    this.load.image("treasure", "assets/treasure.png");
    this.load.image(
      "platform",
      "https://content.codecademy.com/courses/learn-phaser/physics/platform.png"
    );
  }

  create() {
    gameState.player = this.physics.add.sprite(100, 200, "player");
    gameState.treasure = this.physics.add.image(
      gameState.width - 40,
      30,
      "treasure"
    );
    gameState.dragons = this.physics.add.group();
    gameState.dragonA = gameState.dragons.create(340, 100, "dragon");
    Phaser.Actions.ScaleXY(gameState.dragons.getChildren(), -0.4, -0.4);
    gameState.dragonA.speed = 1;

    const platforms = this.physics.add.staticGroup();
    platforms
      .create(230, gameState.height, "platform")
      .setScale(2, 0.1)
      .refreshBody();
    platforms.create(200, 250, "platform").setScale(0.3, 0.3).refreshBody();
    platforms.create(450, 180, "platform").setScale(0.5, 0.3).refreshBody();
    platforms.create(600, 100, "platform").setScale(0.5, 0.3).refreshBody();
    gameState.player.setCollideWorldBounds(true);
    this.physics.add.collider(gameState.player, platforms);
    this.physics.add.collider(gameState.dragons, platforms);
    this.physics.add.collider(gameState.dragons, gameState.player, () => {
      this.physics.pause();
      this.add.text(200, 100, "GAME OVER", {
        fontSize: "50px",
        fill: "#000000",
      });
      this.add.text(200, 170, "Click to Restart", {
        fontSize: "50px",
        fill: "#000000",
      });
      this.input.on("pointerup", () => {
        this.scene.stop("Level1");
        this.scene.start("StartScene");
      });
    });
    this.physics.add.collider(gameState.treasure, platforms);
    this.physics.add.collider(gameState.player, gameState.treasure, () => {
      this.physics.pause();
      this.add.text(200, 100, "Level Finished", {
        fontSize: "50px",
        fill: "#000000",
      });
      this.add.text(150, 160, "Click to go to next level", {
        fontSize: "30px",
        fill: "#000000",
      });
      this.input.on("pointerup", () => {
        console.log("next level");
        this.scene.stop("Level1");
        this.scene.start("Level2");
        // this.scene.restart();
      });
    });
    gameState.cursors = this.input.keyboard.createCursorKeys();
    console.log(gameState.player);
  }

  update() {
    if (gameState.cursors.left.isDown) {
      gameState.player.setVelocityX(-160);
    } else if (
      gameState.cursors.up.isDown &&
      gameState.player.body.touching.down
    ) {
      console.log(gameState.dragonA);
      gameState.player.setVelocityY(-250);
    } else if (gameState.cursors.right.isDown) {
      gameState.player.setVelocityX(160);
    } else {
      gameState.player.setVelocityX(0);
    }

    // move dragons
    //console.log("dragons go here");
    gameState.dragonA.x += gameState.dragonA.speed;

    // reverse movement if reached the edges
    if (gameState.dragonA.x >= 550 && gameState.dragonA.speed > 0) {
      gameState.dragonA.speed *= -1;
    } else if (gameState.dragonA.x <= 350 && gameState.dragonA.speed < 0) {
      gameState.dragonA.speed *= -1;
    }
  }
}

class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  create() {
    this.add.text(200, 250, "Start Game", {
      color: "#3066BE",
      fontSize: "20px",
    });

    this.input.on("pointerdown", () => {
      this.scene.stop("StartScene");
      this.scene.start("Level1");
    });
  }
}

//GAME INIT

const gameState = {
  width: 700,
  height: 360,
};

var config = {
  type: Phaser.AUTO,
  width: gameState.width,
  height: gameState.height,
  backgroundColor: "#C5979D",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 250 },
    },
  },
  scene: [StartScene, Level1, Level2 /*WinScene*/],
};

var game = new Phaser.Game(config);
