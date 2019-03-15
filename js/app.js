// Enemies our player must avoid
class Enemy {
    constructor(yPos) {
        this.sprite = 'images/enemy-bug.png';
        this.x = -70;
        this.y = yPos;
        this.movementSpeed = Math.floor(Math.random() * (250 - 150)) + 150;
    }

    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.movementSpeed * dt;
        if(this.x > 505) {
            this.x = -70;
            this.calculateEnemySpeed();
        }

        // Collision Detection
        // Each side of the collision box is calculated by taking the center point of the
        // sprite (x position) and moving around the sprite to the outside edges of it
        const enemyCollisionBoxTop = this.y - 60;
        const enemyCollisionBoxBottom = this.y + 60;
        const enemyCollisionBoxLeft = this.x - 60;
        const enemyCollisionBoxRight = this.x + 60;

        // Check for a collision with player sprite
        // This checks to see if the player is within the bounds of the enemies collision box
        if(player.x > enemyCollisionBoxLeft && player.x < enemyCollisionBoxRight && 
            player.y > enemyCollisionBoxTop && player.y < enemyCollisionBoxBottom) {
            player.resetPlayerPosition();
        }
    }

    // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    calculateEnemySpeed() {
        this.movementSpeed = Math.floor(Math.random() * (250 - 100)) + 100;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 202;
        this.y = 404;
        this.moveOneTileX = 101;
        this.moveOneTileY = 90;
    }

    // Update player position
    update() {
    }

    // Draw the player sprite
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Move the player
    handleInput(keyCode) {
        switch(keyCode) {
            case 'up':
                this.y -= this.moveOneTileY;
                if(this.y <= 43) {
                    numWins++;
                    this.updateWinCount();
                    this.resetPlayerPosition();
                }
                break;
            case 'down':
                this.y <= (this.moveOneTileY * 4) ? this.y += this.moveOneTileY : this.y += 0;
                break;
            case 'left':
                this.x >= this.moveOneTileX ? this.x -= this.moveOneTileX : this.x -= 0;
                break;
             case 'right':
                this.x <= (this.moveOneTileX * 3) ? this.x += this.moveOneTileX : this.x += 0;
                break;
        }
    }

    // Reset the player position after a win or death
    resetPlayerPosition() {
        this.x = 202;
        this.y = 404;
    }

    updateWinCount() {
        document.getElementById('win-count').textContent = numWins;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();

const topEnemy = new Enemy(63);
const middleEnemy = new Enemy(145);
const bottomEnemy = new Enemy(230);
const allEnemies = [topEnemy, middleEnemy, bottomEnemy];

// Number of wins the player has
let numWins = 0;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
