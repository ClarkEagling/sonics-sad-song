scene.onOverlapTile(SpriteKind.Player, assets.tile`tile4`, function (sprite, location) {
    game.over(true, effects.blizzard)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy = -230
    music.playMelody("C D E F G A B C5 ", 2400)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite, location) {
    game.over(false, effects.slash)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite, location) {
    game.over(false, effects.slash)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile2`, function (sprite, location) {
    game.over(false, effects.slash)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTiles.tile`, function (sprite, location) {
    game.over(false, effects.slash)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.confetti, 100)
    if (sprite.bottom < otherSprite.y) {
        sprite.vy = -230
        music.pewPew.play()
    } else {
        info.changeLifeBy(-1)
        music.zapped.play()
    }
})
let myEnemy: Sprite = null
let mySprite: Sprite = null
scene.setBackgroundColor(15)
tiles.setTilemap(tilemap`platformer1`)
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
mySprite.say("oh so sad", 500)
controller.moveSprite(mySprite, 100, 0)
mySprite.ay = 500
scene.cameraFollowSprite(mySprite)
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
