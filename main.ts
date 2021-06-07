namespace SpriteKind {
    export const Invincible = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile4`, function (sprite, location) {
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
        c f f f f f f f f f f f f f f 
        f c f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f 
        f f f c f f f f f f f f f f f 
        f f f f c f f f f f f f f f f 
        f f f f f f f f f f f f f f f 
        f f f f f f c f f f f f f f f 
        f f f f f f f c f f f f f f f 
        f f f f f f f f f f f f f f f 
        f f f f f f f f f c f f f f f 
        f f f f f f f f f f c f f f f 
        f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f c f f 
        f f f f f f f f f f f f f c f 
        f f f f f f f f f f f f f f f 
        `)
    effects.blizzard.startScreenEffect(3333)
    FXhowl.play()
    currentLevel += 1
    if (currentLevel == 1) {
        scene.setBackgroundColor(15)
        tiles.setTilemap(tilemap`platformer11`)
        game.showLongText("lake of tears", DialogLayout.Full)
    } else if (currentLevel == 2) {
        scene.setBackgroundColor(15)
        tiles.setTilemap(tilemap`level01`)
        game.showLongText("lake of spikes", DialogLayout.Full)
    } else if (currentLevel == 3) {
        scene.setBackgroundColor(15)
        tiles.setTilemap(tilemap`platformer1`)
        game.showLongText("watch out: sadness ahead", DialogLayout.Full)
    } else {
        game.over(true)
    }
    tiles.placeOnRandomTile(mySprite, assets.tile`tile3`)
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
        myEnemy.vx = randint(-30, 30)
        tiles.placeOnTile(myEnemy, value)
        myEnemy.ay = 500
    }
}
function InvincibleFlash () {
    info.changeLifeBy(-1)
    for (let index = 0; index < 3; index++) {
        FXhurt.play()
        pause(75)
        FXhurt.freq0 += -100
    }
    mySprite.setKind(SpriteKind.Invincible)
    mySprite.startEffect(effects.coolRadial)
    mySprite.lifespan = 1000
}
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
    } else {
        InvincibleFlash()
    }
})
let myEnemy: Sprite = null
let currentLevel = 0
let mySprite: Sprite = null
let FXhowl: SoundBuffer = null
let FXbounce: SoundBuffer = null
let FXjump: SoundBuffer = null
let FXhurt: SoundBuffer = null
let sadPhrases: string[] = []
sadPhrases = [
"no fair",
"oh no!",
"too sad",
"what a shame",
"not cool",
"this game stinks"
]
FXhurt = soundEffects.createSound(soundEffects.waveNumber(WaveType.Sine), 200, 1200, 200, 255, 100)
FXjump = soundEffects.createSound(soundEffects.waveNumber(WaveType.Triangle), 250, 500, 80, 255, 0)
FXbounce = soundEffects.createSound(soundEffects.waveNumber(WaveType.Cycle32), 150, 440, 1000)
FXhowl = soundEffects.createSound(soundEffects.waveNumber(WaveType.Square10), 3333, 333, 90, 100, 0)
NextLevel()
CreatePlayer()
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (!(value.tileKindAt(TileDirection.Left, assets.tile`transparency16`))) {
            value.vx = value.vx * -1
            value.vy = -100
        } else if (!(value.tileKindAt(TileDirection.Right, assets.tile`transparency16`))) {
            value.vx = value.vx * -1
        } else if (value.tileKindAt(TileDirection.Bottom, assets.tile`transparency16`)) {
            value.vx = value.vx * -1
        }
    }
})
