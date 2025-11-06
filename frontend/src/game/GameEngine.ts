import Phaser from 'phaser'

export class GameScene extends Phaser.Scene {
  private tanks: Phaser.GameObjects.Group
  private bullets: Phaser.GameObjects.Group

  constructor() {
    super({ key: 'GameScene' })
  }

  preload() {
    this.load.image('tank', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iNCIgZmlsbD0iIzRhZGU4MCIvPgo8L3N2Zz4K')
    this.load.image('bullet', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8Y2lyY2xlIGN4PSI0IiBjeT0iNCIgcj0iNCIgZmlsbD0iI2ZmZmZmZiIvPgo8L3N2Zz4K')
  }

  create() {
    this.tanks = this.add.group()
    this.bullets = this.add.group()
    
    // Create player tank
    const playerTank = this.add.image(200, 300, 'tank')
    playerTank.setInteractive()
    this.tanks.add(playerTank)

    // Input handling
    this.input.keyboard?.createCursorKeys()
  }

  update() {
    // Game loop logic
  }
}

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'phaser-game',
  backgroundColor: '#1a1a2e',
  scene: GameScene,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
}