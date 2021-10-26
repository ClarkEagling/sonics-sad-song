@namespace
class SpriteKind:
    Invincible = SpriteKind.create()
    Coin = SpriteKind.create()

def on_on_overlap(sprite, otherSprite):
    otherSprite.destroy()
    music.play_melody("G - - - C5 - - - ", 3000)
    info.change_score_by(3)
sprites.on_overlap(SpriteKind.player, SpriteKind.Coin, on_on_overlap)

def on_overlap_tile(sprite2, location):
    global currentLevel
    currentLevel +=1
    NextLevel()
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        tile4
    """),
    on_overlap_tile)

def CreatePlayer():
    global mySprite
    mySprite = sprites.create(img("""
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
        """),
        SpriteKind.player)
    mySprite.say(sadPhrases._pick_random(), 500)
    controller.move_sprite(mySprite, 100, 0)
    mySprite.ay = 500
    scene.camera_follow_sprite(mySprite)
    tiles.place_on_random_tile(mySprite, assets.tile("""
        tile3
    """))
    return mySprite

def on_a_pressed():
    if mySprite.is_hitting_tile(CollisionDirection.BOTTOM):
        mySprite.vy = -230
        FXjump.play()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_overlap_tile2(sprite3, location2):
    info.change_life_by(-3)
    InvincibleFlash()
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.hazard_lava0,
    on_overlap_tile2)

def on_overlap_tile3(sprite4, location3):
    info.change_life_by(-3)
    InvincibleFlash()
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.hazard_lava1,
    on_overlap_tile3)

def on_overlap_tile4(sprite5, location4):
    info.change_life_by(-3)
    InvincibleFlash()
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        tile2
    """),
    on_overlap_tile4)

def on_on_destroyed(sprite6):
    CreatePlayer().set_position(sprite6.x, sprite6.y)
sprites.on_destroyed(SpriteKind.Invincible, on_on_destroyed)

def NextLevel():
    global foods, coin, myEnemy
    for value in sprites.all_of_kind(SpriteKind.enemy):
        value.destroy()
    for value2 in sprites.all_of_kind(SpriteKind.food):
        value2.destroy()
    for value3 in sprites.all_of_kind(SpriteKind.Coin):
        value3.destroy()
    game.set_dialog_text_color(2)
    game.set_dialog_frame(img("""
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
    """))
    effects.blizzard.start_screen_effect(3333)
    FXHowl.play()
    FXhowl2.play()
    if currentLevel == 0:
        scene.set_background_color(15)
        tiles.set_tilemap(tilemap("""
            platformer11
        """))
        game.show_long_text("lake of tears", DialogLayout.FULL)
    elif currentLevel == 1:
        scene.set_background_color(15)
        tiles.set_tilemap(tilemap("""
            level01
        """))
        game.show_long_text("lake of spikes", DialogLayout.FULL)
    elif currentLevel == 2:
        scene.set_background_color(15)
        tiles.set_tilemap(tilemap("""
            platformer1
        """))
        game.show_long_text("watch out: sadness ahead", DialogLayout.FULL)
    else:
        game.show_long_text("Sunec found his way, finally, to the place where he belonged. The end.",
            DialogLayout.FULL)
        game.over(True)
    tiles.place_on_random_tile(mySprite, assets.tile("""
        tile3
    """))
    for index in range(2):
        foods = [sprites.create(img("""
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
                """),
                SpriteKind.food),
            sprites.create(img("""
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
                """),
                SpriteKind.food)]
        tiles.place_on_random_tile(foods._pick_random(),
            assets.tile("""
                transparency16
            """))
    for index2 in range(4):
        coin = sprites.create(assets.tile("""
            myTile
        """), SpriteKind.Coin)
        animation.run_image_animation(coin,
            [img("""
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
                """),
                img("""
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
                """)],
            200,
            True)
        tiles.place_on_random_tile(coin, assets.tile("""
            transparency16
        """))
    for value4 in tiles.get_tiles_by_type(assets.tile("""
        tile5
    """)):
        myEnemy = sprites.create(img("""
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
            """),
            SpriteKind.enemy)
        myEnemy.vx = randint(10, 30)
        tiles.place_on_tile(myEnemy, value4)
        myEnemy.ay = 500
def InvincibleFlash():
    FXhurt.freq0 = randint(800, 1300)
    FXhurt.play()
    mySprite.set_kind(SpriteKind.Invincible)
    mySprite.start_effect(effects.cool_radial)
    mySprite.lifespan = 1000

def on_life_zero():
    NextLevel()
    info.set_life(3)
info.on_life_zero(on_life_zero)

def on_on_overlap2(sprite7, otherSprite2):
    otherSprite2.destroy()
    FXchomp.play()
    info.change_life_by(1)
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap2)

def on_on_overlap3(sprite8, otherSprite3):
    if sprite8.bottom < otherSprite3.y:
        sprite8.vy = -230
        FXbounce.play()
sprites.on_overlap(SpriteKind.Invincible, SpriteKind.enemy, on_on_overlap3)

def on_overlap_tile5(sprite9, location5):
    info.change_life_by(-3)
    InvincibleFlash()
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTiles.tile
    """),
    on_overlap_tile5)

def on_on_overlap4(sprite10, otherSprite4):
    otherSprite4.destroy(effects.confetti, 100)
    if sprite10.bottom < otherSprite4.y:
        sprite10.vy = -230
        FXbounce.play()
        info.change_score_by(10)
    else:
        info.change_life_by(-1)
        InvincibleFlash()
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap4)

myEnemy: Sprite = None
coin: Sprite = None
foods: List[Sprite] = []
mySprite: Sprite = None
currentLevel = 0
FXhowl2: SoundBuffer = None
FXHowl: SoundBuffer = None
FXbounce: SoundBuffer = None
FXjump: SoundBuffer = None
FXhurt: SoundBuffer = None
FXchomp: SoundBuffer = None
sadPhrases: List[str] = []
FXbackground = soundEffects.create_sound(soundEffects.wave_number(WaveType.CYCLE16),
    1000,
    440,
    440,
    0,
    50)
sadPhrases = ["no fair",
    "oh no!",
    "too sad",
    "what a shame",
    "not cool",
    "this game stinks"]
FXchomp = soundEffects.create_sound(soundEffects.wave_number(WaveType.CYCLE16), 100, 1000, 2000)
FXhurt = soundEffects.create_sound(soundEffects.wave_number(WaveType.SINE),
    200,
    1200,
    200,
    255,
    100)
FXjump = soundEffects.create_sound(soundEffects.wave_number(WaveType.TRIANGLE),
    250,
    500,
    80,
    255,
    0)
FXbounce = soundEffects.create_sound(soundEffects.wave_number(WaveType.CYCLE16), 150, 440, 1000)
FXHowl = soundEffects.create_sound(soundEffects.wave_number(WaveType.SQUARE10),
    3333,
    300,
    90,
    100,
    0)
FXhowl2 = soundEffects.create_sound(soundEffects.wave_number(WaveType.SQUARE10),
    3333,
    500,
    90,
    80,
    0)
NextLevel()
CreatePlayer()

def on_on_update():
    for value5 in sprites.all_of_kind(SpriteKind.enemy):
        if value5.is_hitting_tile(CollisionDirection.LEFT):
            value5.vx = randint(10, 30)
            value5.vy = -100
        elif value5.is_hitting_tile(CollisionDirection.RIGHT):
            value5.vx = randint(-10, -30)
            value5.vy = -100
game.on_update(on_on_update)

def on_forever():
    FXbackground.duration = 1000
    FXbackground.freq0 = 440
    FXbackground.duration += randint(-100, 100)
    FXbackground.freq0 += randint(-100, 100)
    FXbackground.play_until_done()
forever(on_forever)
