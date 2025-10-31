//% blockGap=8 block="screen capture" rotating screen unsupported yet
namespace screenCapture {
    //% blockId=screenCaptureCreateCaptureScreenImageSprite 
    //% block="create capture screen image sprite"
    //%  blockSetVariable=myScreenCaptureSprite
    //% weight=100
    export function createCaptureScreenImageSprite(): Sprite {
        const sprite: Sprite = new Sprite(getImage())
        game.currentScene().physicsEngine.addSprite(sprite)
        // shift screen and update 
        // shiftScreen(sprite)
        return sprite
    }

    //% weight=99
    //% blockId=screenCaptureCreateCaptureScreenImageSprite160x120 block="capture image data in screen 160 x 120" 
    //% blockAliasFor=screenCapture.createCaptureScreenImageSprite
    export function __captureImageDataInScreen160x120(): Sprite {
        const sprite = new Sprite(getImage())
        game.currentScene().physicsEngine.addSprite(sprite)
        // shift screen and update
        return sprite
    }

    function getImage(): Image {
        scene.createRenderable(-1, () => {
            screen.fill(scene.backgroundColor()) // this is a hack
        })

        pause(0) // were pausing so before the screen actually really took a capture of the blank 0 data image it got after that happened
       
        let img: Image = image.create(screen.width, screen.height) as ScreenImage
        for (let y = 0; y < screen.height; y++)
            for (let x = 0; x < screen.width; x++) {
                let color = screen.getPixel(x, y)
                img.setPixel(x, y, color) // blits the sprites first position and makes the copied one static
            }

        return img
    }

  //% block="shift sprite %sprite=variables_get(sprite)" deprecated=1
  //% blockHidden=true
  /**
   * DEPRECATED: this caused many problems so just do not use it for now.
   */
  export function __shiftScreen(sprite: Sprite) {
        game.onUpdate(() => {
            sprite.setImage(screen)
        })
    }

    //% blockId=screenCapturePause block="pause %ms"
    /**
     * Needed this function to pause the screen full control to make it working  
     @param ms means the number of milliseconds ordered for the screen paused for getting the scren captured 
     needs to pause the screen so the screen delays sometime before exactly gets the empty source instead of the real data
     Deprecated: do not use it now
     */
    //% weight=98 deprecated=1
    export function pause(ms: number) {
        if (ms >= 5000) throw "too long pause"
        loops.pause(ms)
    }
}

