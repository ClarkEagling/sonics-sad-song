namespace SpriteKind {
    export const Invincible = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile4`, function (sprite, location) {
    currentLevel += 1
    NextLevel()
})
function CreatePlayer () {
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . 8 8 8 8 8 8 8 8 8 8 8 . . . 
        . . . 8 8 8 8 8 8 8 8 8 8 8 . . 
        8 8 8 8 8 8 8 c 8 8 8 c 8 8 . . 
        . 8 8 8 8 8 1 1 c 8 c 1 1 1 8 . 
        . 8 8 8 8 1 1 f 1 c 8 1 f 1 8 . 
        8 8 8 8 8 8 1 1 1 8 8 1 1 1 8 . 
        . 8 8 8 8 8 9 8 8 8 8 8 9 8 8 . 
        8 8 8 8 8 8 9 8 8 8 9 9 9 8 f f 
        . 8 8 8 4 8 8 4 4 4 9 4 4 f f f 
        . 1 1 8 4 8 8 4 4 4 9 4 4 4 8 . 
        . 1 1 4 4 8 8 8 8 8 4 4 4 4 8 . 
        . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
        . 8 8 2 2 2 8 8 8 8 8 2 2 2 2 . 
        . . 8 2 2 2 2 2 8 8 8 2 2 2 2 2 
        . . . 2 2 2 2 2 . . . 2 2 2 2 2 
        `, SpriteKind.Player)
    mySprite.say(sadPhrases._pickRandom(), 500)
    controller.moveSprite(mySprite, 100, 0)
    mySprite.ay = 500
    scene.cameraFollowSprite(mySprite)
    tiles.placeOnRandomTile(mySprite, assets.tile`tile3`)
    return mySprite
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -230
        FXjump.play()
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite, location) {
    InvincibleFlash()
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite, location) {
    InvincibleFlash()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile2`, function (sprite, location) {
    InvincibleFlash()
})
sprites.onDestroyed(SpriteKind.Invincible, function (sprite) {
    CreatePlayer().setPosition(sprite.x, sprite.y)
})
function NextLevel () {
    game.setDialogTextColor(2)
    game.setDialogFrame(img`
        f f f f f f f f f f f f f f c 
        f f f f f f f f f f f f f c f 
        f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f 
        f f f f f f c f f f f f f f f 
        f f f f f c f f f f f f f f f 
        f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f 
        `)
    effects.blizzard.startScreenEffect(3333)
    FXhowl.play()
    if (currentLevel == 0) {
        scene.setBackgroundColor(15)
        tiles.setTilemap(tilemap`platformer11`)
        game.showLongText("lake of tears", DialogLayout.Full)
    } else if (currentLevel == 1) {
        scene.setBackgroundColor(15)
        tiles.setTilemap(tilemap`level01`)
        game.showLongText("lake of spikes", DialogLayout.Full)
    } else if (currentLevel == 2) {
        scene.setBackgroundColor(15)
        tiles.setTilemap(tilemap`platformer1`)
        game.showLongText("watch out: sadness ahead", DialogLayout.Full)
    } else {
        game.over(true)
    }
    tiles.placeOnRandomTile(mySprite, assets.tile`tile3`)
    for (let index = 0; index < 4; index++) {
        tiles.placeOnRandomTile(foods._pickRandom(), assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile5`)) {
        myEnemy = sprites.create(img`
            ................
            ......111.......
            ....111111......
            ...111111111....
            ..111111111111..
            ..11cc1111cc111.
            ..11c2c11c2cc11.
            .111c2c11c2cc11.
            .111bbb11bbb111.
            .111111111111111
            ..11111111111111
            ..11bcccccccc11.
            ..1111bbbbb1c11.
            ..1111111111111.
            ..1111111111111.
            ..b1111b111b111.
            ..b111bcb11cbbb.
            ..cbbbc.cbb.ccc.
            ................
            ................
            ................
            ................
            ................
            ...ffffffffffff.
            `, SpriteKind.Enemy)
        myEnemy.vx = randint(10, 30)
        tiles.placeOnTile(myEnemy, value)
        myEnemy.ay = 500
    }
}
function InvincibleFlash () {
    info.changeLifeBy(-1)
    FXhurt.freq0 = randint(800, 1300)
    FXhurt.play()
    mySprite.setKind(SpriteKind.Invincible)
    mySprite.startEffect(effects.coolRadial)
    mySprite.lifespan = 1000
}
info.onLifeZero(function () {
    NextLevel()
    info.setLife(3)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    FXchomp.play()
    info.changeLifeBy(1)
})
sprites.onOverlap(SpriteKind.Invincible, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.bottom < otherSprite.y) {
        sprite.vy = -230
        FXbounce.play()
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTiles.tile`, function (sprite, location) {
    InvincibleFlash()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.confetti, 100)
    if (sprite.bottom < otherSprite.y) {
        sprite.vy = -230
        FXbounce.play()
        info.changeScoreBy(10)
    } else {
        InvincibleFlash()
    }
})
let myEnemy: Sprite = null
let mySprite: Sprite = null
let currentLevel = 0
let FXhowl: SoundBuffer = null
let FXbounce: SoundBuffer = null
let FXjump: SoundBuffer = null
let FXhurt: SoundBuffer = null
let FXchomp: SoundBuffer = null
let sadPhrases: string[] = []
let foods: Sprite[] = []
foods = [sprites.create(img`
    4 4 4 . . 4 4 4 4 4 . . . . . . 
    4 5 5 4 4 5 5 5 5 5 4 4 . . . . 
    b 4 5 5 1 5 1 1 1 5 5 5 4 . . . 
    . b 5 5 5 5 1 1 5 5 1 1 5 4 . . 
    . b d 5 5 5 5 5 5 5 5 1 1 5 4 . 
    b 4 5 5 5 5 5 5 5 5 5 5 1 5 4 . 
    c d 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
    c d 4 5 5 5 5 5 5 5 5 5 5 1 5 4 
    c 4 5 5 5 d 5 5 5 5 5 5 5 5 5 4 
    c 4 d 5 4 5 d 5 5 5 5 5 5 5 5 4 
    . c 4 5 5 5 5 d d d 5 5 5 5 5 b 
    . c 4 d 5 4 5 d 4 4 d 5 5 5 4 c 
    . . c 4 4 d 4 4 4 4 4 d d 5 d c 
    . . . c 4 4 4 4 4 4 4 4 5 5 5 4 
    . . . . c c b 4 4 4 b b 4 5 4 4 
    . . . . . . c c c c c c b b 4 . 
    `, SpriteKind.Food), sprites.create(img`
    6 6 6 . . 6 6 6 6 6 . . . . . . 
    6 7 7 6 6 7 7 7 7 7 6 6 . . . . 
    b 6 7 7 1 7 1 1 1 7 7 7 6 . . . 
    . b 7 7 7 7 1 1 7 7 1 1 7 6 . . 
    . b d 7 7 7 7 7 7 7 7 1 1 7 6 . 
    b 6 7 7 7 7 7 7 7 7 7 7 1 7 6 . 
    c d 7 7 7 7 7 7 7 7 7 7 7 7 7 6 
    c d 6 7 7 7 7 7 7 7 7 7 7 1 7 6 
    c 6 7 7 7 d 7 7 7 7 7 7 7 7 7 6 
    c 6 d 7 6 7 d 7 7 7 7 7 7 7 7 6 
    . c 6 7 7 7 7 d d d 7 7 7 7 7 b 
    . c 6 d 7 6 7 d 6 6 d 7 7 7 6 c 
    . . c 6 6 d 6 6 6 6 6 d d 7 d c 
    . . . c 6 6 6 6 6 6 6 6 7 7 7 6 
    . . . . c c b 6 6 6 b b 6 7 6 6 
    . . . . . . c c c c c c b b 6 . 
    `, SpriteKind.Food)]
sadPhrases = [
"no fair",
"oh no!",
"too sad",
"what a shame",
"not cool",
"this game stinks"
]
FXchomp = soundEffects.createSound(soundEffects.waveNumber(WaveType.Cycle16), 100, 1000, 2000)
FXhurt = soundEffects.createSound(soundEffects.waveNumber(WaveType.Sine), 200, 1200, 200, 255, 100)
FXjump = soundEffects.createSound(soundEffects.waveNumber(WaveType.Triangle), 250, 500, 80, 255, 0)
FXbounce = soundEffects.createSound(soundEffects.waveNumber(WaveType.Cycle16), 150, 440, 1000)
FXhowl = soundEffects.createSound(soundEffects.waveNumber(WaveType.Square10), 3333, 300, 90, 100, 0)
NextLevel()
CreatePlayer()
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.isHittingTile(CollisionDirection.Left)) {
            value.vx = randint(10, 30)
            value.vy = -100
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            value.vx = randint(-10, -30)
            value.vy = -100
        }
    }
})
