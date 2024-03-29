namespace SpriteKind {
    export const Invincible = SpriteKind.create()
    export const Coin = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile2`, function (sprite5, location4) {
    info.changeLifeBy(-3)
    InvincibleFlash()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite7, otherSprite2) {
    otherSprite2.destroy()
    FXchomp.play()
    info.changeLifeBy(1)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile4`, function (sprite2, location) {
    currentLevel += 1
    NextLevel()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTiles.tile`, function (sprite9, location5) {
    info.changeLifeBy(-3)
    InvincibleFlash()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    otherSprite.destroy()
    music.playMelody("G - - - C5 - - - ", 3000)
    info.changeScoreBy(3)
})
function CreatePlayer () {
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . 6 6 6 6 6 6 6 6 6 6 6 . . . 
        . . . 6 6 6 6 6 6 6 6 6 6 6 . . 
        6 6 6 6 6 6 6 c 6 6 6 c 6 6 . . 
        . 6 6 6 6 6 1 1 c 6 c 1 1 1 6 . 
        . 6 6 6 6 1 1 f 1 c 6 1 f 1 6 . 
        6 6 6 6 6 6 1 1 1 6 6 1 1 1 6 . 
        . 6 6 6 6 6 9 6 6 6 6 6 9 6 6 . 
        6 6 6 6 6 6 9 6 6 6 9 9 9 6 3 3 
        . 6 6 6 4 6 6 4 4 4 9 4 4 3 3 3 
        . 1 1 6 4 6 6 4 4 4 9 4 4 4 6 . 
        . 1 1 4 4 6 6 6 6 6 4 4 4 4 6 . 
        . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . 
        . 6 6 2 2 2 6 6 6 6 6 2 2 2 2 . 
        . . 6 2 2 2 2 2 6 6 6 2 2 2 2 2 
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
sprites.onDestroyed(SpriteKind.Invincible, function (sprite6) {
    CreatePlayer().setPosition(sprite6.x, sprite6.y)
})
sprites.onOverlap(SpriteKind.Invincible, SpriteKind.Enemy, function (sprite8, otherSprite3) {
    if (sprite8.bottom < otherSprite3.y) {
        sprite8.vy = -230
        FXbounce.play()
    }
})
function NextLevel () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Food)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Coin)) {
        value3.destroy()
    }
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
    FXHowl.play()
    FXhowl2.play()
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
        game.showLongText("Sunec found his way, finally, to the place where he belonged. The end.", DialogLayout.Full)
        game.over(true)
    }
    tiles.placeOnRandomTile(mySprite, assets.tile`tile3`)
    for (let index = 0; index < 2; index++) {
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
        tiles.placeOnRandomTile(foods._pickRandom(), assets.tile`transparency16`)
    }
    for (let index = 0; index < 4; index++) {
        coin = sprites.create(assets.tile`myTile`, SpriteKind.Coin)
        animation.runImageAnimation(
        coin,
        [img`
            . . . . . . . . . . 
            . . . . 5 . . . . . 
            . . 5 5 5 5 5 . . . 
            . . 5 4 4 4 4 . . . 
            . . 5 4 . . . . . . 
            . . 5 4 . . . . . . 
            . . 5 4 4 4 4 . . . 
            . . 5 5 5 5 5 . . . 
            . . . . 5 . . . . . 
            . . . . . . . . . . 
            `,img`
            . . . . . . . . . . 
            . . . . 4 . . . . . 
            . . 4 4 4 4 4 . . . 
            . . 4 2 2 2 2 . . . 
            . . 4 2 . . . . . . 
            . . 4 2 . . . . . . 
            . . 4 2 2 2 2 . . . 
            . . 4 4 4 4 4 . . . 
            . . . . 4 . . . . . 
            . . . . . . . . . . 
            `],
        200,
        true
        )
        tiles.placeOnRandomTile(coin, assets.tile`transparency16`)
    }
    for (let value4 of tiles.getTilesByType(assets.tile`tile5`)) {
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
        tiles.placeOnTile(myEnemy, value4)
        myEnemy.ay = 500
    }
}
function InvincibleFlash () {
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite10, otherSprite4) {
    otherSprite4.destroy(effects.confetti, 100)
    if (sprite10.bottom < otherSprite4.y) {
        sprite10.vy = -230
        FXbounce.play()
        info.changeScoreBy(10)
    } else {
        info.changeLifeBy(-1)
        InvincibleFlash()
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite3, location2) {
    info.changeLifeBy(-3)
    InvincibleFlash()
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite4, location3) {
    info.changeLifeBy(-3)
    InvincibleFlash()
})
let myEnemy: Sprite = null
let coin: Sprite = null
let foods: Sprite[] = []
let mySprite: Sprite = null
let currentLevel = 0
let FXhowl2: SoundBuffer = null
let FXHowl: SoundBuffer = null
let FXbounce: SoundBuffer = null
let FXjump: SoundBuffer = null
let FXhurt: SoundBuffer = null
let FXchomp: SoundBuffer = null
let sadPhrases: string[] = []
let FXbackground = soundEffects.createSound(soundEffects.waveNumber(WaveType.Cycle16), 1000, 440, 440, 0, 50)
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
FXHowl = soundEffects.createSound(soundEffects.waveNumber(WaveType.Square10), 3333, 300, 90, 100, 0)
FXhowl2 = soundEffects.createSound(soundEffects.waveNumber(WaveType.Square10), 3333, 500, 90, 80, 0)
NextLevel()
CreatePlayer()
game.onUpdate(function () {
    for (let value5 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value5.isHittingTile(CollisionDirection.Left)) {
            value5.vx = randint(10, 30)
            value5.vy = -100
        } else if (value5.isHittingTile(CollisionDirection.Right)) {
            value5.vx = randint(-10, -30)
            value5.vy = -100
        }
    }
})
forever(function () {
    FXbackground.duration = 1000
    FXbackground.freq0 = 440
    FXbackground.duration += randint(-100, 100)
    FXbackground.freq0 += randint(-100, 100)
    FXbackground.playUntilDone()
})
