class OperationsHelper {

    /**
     * @name HighlightObject
     * 
     * @description Highlight an object so that it gains the attention of the user. <br>
     * Really useful for tutorials or in-game events that need user interaction.
     * 
     * @param {integer} mode - 0: Highlight mode, 1: Sparkle Mode
     * @param {Array} objArr - An array of objects for the effects to be applied in
     * @param {integer} ms - The duration of the effect. In mode = 1, 0: instant sparkle
     * @param {Scene} scene - The scene in which the objects resides in
     * 
     * @function
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    highlightObject(mode = 0, objArr = [], ms = 3000, scene) {
        // validate parameters
        if (mode != 0 && mode != 1) {
            console.error(`HelperPhaser.HighlightObject : Invalid highlight mode!`);
            return false;
        } else {
            if (Array.isArray(objArr)) {
                if (objArr.length == 0) {
                    console.error(`HelperPhaser.HighlightObject : Object parameter is empty!`);
                    return false;
                } else {
                    if (!Number.isInteger(ms)) {
                        console.error(`HelperPhaser.HighlightObject : Duration must be an integer and in ms!`);
                        return false;
                    } else {
                        for (let o of objArr) {
                            if (!scene.children.list.includes(o)) {
                                console.error(`HelperPhaser.HighlightObject : The objects must be in the scene that is given!`);
                                return false;
                            }
                        }
                    }
                }
            } else {
                console.error(`HelperPhaser.HighlightObject : Object parameter needs to be an array of objects!`);
                return false;
            }
        }

        // create necessary assets on first run
        if (!scene.highlightRect) {
            scene.highlightRect = scene.add.rectangle(0, 0, scene.currentWidth, scene.currentHeight)
                .setOrigin(0, 0);
            scene.highlightRect.setFillStyle(0x000000, 1);
            scene.highlightRect.setDepth(1999);
            scene.highlightRect.alpha = 0;
            scene.resizeManager.add(scene.highlightRect, function () {
                this.setScale(Math.max(scene.currentWidth / this.width, scene.currentHeight / this.height));
                this.x = 0;
                this.y = 0;
            })
            scene.highlightGlowParticle = scene.add.particles("glowSpark");
            scene.highlightShineParticle = scene.add.particles("shineSpark")
            // recursive call to itself
            this.highlightObject(mode, objArr, ms, scene);
        } else {
            // highlight mode
            if (mode == 0) {
                let tempDepths = [];
                scene.highlightObjects = [];
                for (let o of objArr) {
                    o.setInteractive();
                    o.beginHighlight = this.TweenTrain.create(scene);
                    o.endHighlight = this.TweenTrain.create(scene);
                    o.highlighted = true;
                    // temporarily record the depth of the object
                    tempDepths.push(o.depth);
                    // redundant object control to ensure nothing bad happens
                    scene.highlightObjects.push(o);
                    o.setDepth(2000);
                    scene.highlightGlowParticle.setDepth(o.depth - 1);
                    // create highlight emitter
                    o.highlightEmitter = scene.highlightGlowParticle.createEmitter({
                        x: o.x,
                        y: o.y,
                        blendMode: 'SCREEN',
                        scale: {
                            // scale the scale (!) according to the scale of the object
                            start: 1 * this.map(this.constrain(o.scale, 0.1, 10), 0.1, 10, 1, 2),
                            // always ends in 0
                            end: 0
                        },
                        speed: {
                            // scale the speed according to the scale of the object
                            min: Math.max(
                                o.width * o.scaleX,
                                o.height * o.scaleY
                            ) + 200,
                            max: -Math.max(
                                o.width * o.scaleX,
                                o.height * o.scaleY
                            ) - 200
                        },
                        quantity: 1
                    });
                    scene.resizeManager.add(o.highlightEmitter, function () {
                        this.setPosition(o.x, o.y)
                    });
                    o.highlightEmitter.visible = false;
                    o.on("pointerdown", () => {
                        o.endHighlight.run();
                        // when object gets clicked, clean the bejesus out of it
                        for (let i = 0; i < tempDepths.length; i++) {
                            if (objArr[i] == o) {
                                o.setDepth(tempDepths[i]);
                                o.highlightEmitter.stop();
                                o.highlighted = false;
                                delete o.beginHighlight;
                                delete o.endHighlight;
                                delete o.highlightEmitter;
                                delete o.highlighted;
                                break;
                            }
                        }
                        // if the object already had other input events, delete only this
                        if (o._events.pointerdown.length > 1) {
                            o._events.pointerdown.splice(o._events.pointerdown.length - 1, 1);
                        } else {
                            // otherwise, delete its pointerdown event object entirely
                            // this is how Phaser does things normally, so..
                            delete o._events.pointerdown;
                        }
                    });
                    // transition duration for the black background to appear or dissapear
                    let rectTransitionDuration = 400;
                    // create parallel trains for all objects so that they can be clicked when time runs out
                    let parallelTrains = [];
                    for (let o of objArr) {
                        parallelTrains.push(
                            this.TweenTrain.create(scene)
                            .addEvent(function () {
                                o.highlightEmitter.visible = true;
                            })
                            .addDelay(function () {
                                return hP.constrain(ms - rectTransitionDuration * 2, 0, ms);
                            })
                            .addEvent(function () {
                                // if user did not click beforehand
                                if (o.highlighted) {
                                    // redundant object check here
                                    if (scene.highlightObjects.includes(o)) {
                                        // if the object already had other input events, trigger them all
                                        if (Array.isArray(o._events.pointerdown)) {
                                            for (let e of o._events.pointerdown) {
                                                e.fn();
                                            }
                                            // otherwise, only trigger this
                                        } else {
                                            o._events.pointerdown.fn();
                                        }
                                        o.highlighted = false;
                                    }
                                }
                            })
                        )
                    }
                    o.beginHighlight.add(function () {
                            return {
                                targets: scene.highlightRect,
                                duration: rectTransitionDuration,
                                alpha: 0.5,
                                onStart: function () {
                                    scene.highlightRect.visible = true;
                                    scene.highlightRect.alpha = 0;
                                }
                            }
                        })
                        // add parallel effect for all objects
                        .addParallel(parallelTrains);
                    o.endHighlight.add(function () {
                        return {
                            targets: scene.highlightRect,
                            duration: rectTransitionDuration,
                            alpha: 0,
                            onStart: function () {
                                scene.highlightRect.alpha = 0.5;
                            },
                            onComplete: function () {
                                scene.highlightRect.alpha = 0;
                                scene.highlightRect.visible = false;
                            }
                        }
                    })
                    o.beginHighlight.run();
                }
                // sparkle mode
            } else if (mode == 1) {
                for (let o of objArr) {
                    let tempDepth = o.depth;
                    o.setDepth(2000);
                    if (ms == 0) {
                        // shiny particle for sparkle effect
                        scene.sparkleParticle = scene.highlightShineParticle;
                    } else {
                        // glow particle for glow effect
                        scene.sparkleParticle = scene.highlightGlowParticle;
                    }
                    o.sparkleEmitter = scene.sparkleParticle.createEmitter({
                        x: o.x,
                        y: o.y,
                        blendMode: 'SCREEN',
                        scale: {
                            // scale the scale (!) according to the scale of the object
                            start: 1 + this.map(this.constrain(Math.max(
                                o.width * o.scaleX,
                                o.height * o.scaleY
                            ), 100, 1000), 100, 1000, 0, 2),
                            // always ends in 0
                            end: 0
                        },
                        speed: {
                            min: Math.max(
                                o.width * o.scaleX,
                                o.height * o.scaleY
                            ) + 200,
                            max: -Math.max(
                                o.width * o.scaleX,
                                o.height * o.scaleY
                            ) - 200
                        },
                        quantity: (ms != 0 ? 1 : 2)
                    });
                    scene.resizeManager.add(o.sparkleEmitter, function () {
                        this.setPosition(o.x, o.y);
                    });
                    if (ms == 0) {
                        // instant sparkle effect
                        o.sparkleEmitter.explode(20);
                        this.TweenTrain.create(scene)
                            .addDelay(300)
                            .addEvent(function () {
                                o.setDepth(tempDepth);
                            }).run();
                    } else {
                        this.TweenTrain.create(scene)
                            .addDelay(ms)
                            .addEvent(function () {
                                o.sparkleEmitter.stop();
                            })
                            .addDelay(300)
                            .addEvent(function () {
                                o.setDepth(tempDepth);
                            }).run();
                    }
                    // mandatory cleanup afterwards
                    delete o.sparkleEmitter;
                }
            }
        }
    }

    /**
     * @description Lists the properties of the helper to the console
     *
     * @static
     * @memberof OperationsHelper
     * 
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    static help() {
        let list = Object.getOwnPropertyNames(OperationsHelper);
        let logObj = {};
        for (let i = 3; i < list.length - 1; i++) {
            logObj[`property${i-2}`] = list[i];
        }
        for (let p in logObj) {
            console.log(
                `${p}: ${logObj[p]}`
            )
        }
    }
}

export default OperationsHelper;