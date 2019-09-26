// global variable that holds the main object
let hP;

// import assets for highlight helper
import glowSrc from "../assets/glow.png";
import shineSrc from "../assets/shine.png";

/**
 * @name HelperPhaser
 * @requires Loader
 * @requires TweenTrain
 * 
 * @param {Loader} loader - Current used loader to load needed images. It can be any object that has a loadImage function (function LoadImage(key, src))
 * @param {TweenTrain} TweenTrain - The main TweenTrain class that is instantiated in the code
 * 
 * @class
 * @classdesc A helper file that aims to automate daily tasks in Phaser. Current function list: constrain, dist, getColor, highlightObject, map
 * 
 * @author Tayfun Turgut <tyfn.trgt@gmail.com>
 */
class HelperPhaser {
    constructor(loader, TweenTrain) {
        hP = this;

        /**
         * @type {object}
         * @author Yusuke Kawasaki
         */
        this.colors = {
            "red": {
                "50": "#ffebee",
                "100": "#ffcdd2",
                "200": "#ef9a9a",
                "300": "#e57373",
                "400": "#ef5350",
                "500": "#f44336",
                "600": "#e53935",
                "700": "#d32f2f",
                "800": "#c62828",
                "900": "#b71c1c",
                "a100": "#ff8a80",
                "a200": "#ff5252",
                "a400": "#ff1744",
                "a700": "#d50000"
            },
            "pink": {
                "50": "#fce4ec",
                "100": "#f8bbd0",
                "200": "#f48fb1",
                "300": "#f06292",
                "400": "#ec407a",
                "500": "#e91e63",
                "600": "#d81b60",
                "700": "#c2185b",
                "800": "#ad1457",
                "900": "#880e4f",
                "a100": "#ff80ab",
                "a200": "#ff4081",
                "a400": "#f50057",
                "a700": "#c51162"
            },
            "purple": {
                "50": "#f3e5f5",
                "100": "#e1bee7",
                "200": "#ce93d8",
                "300": "#ba68c8",
                "400": "#ab47bc",
                "500": "#9c27b0",
                "600": "#8e24aa",
                "700": "#7b1fa2",
                "800": "#6a1b9a",
                "900": "#4a148c",
                "a100": "#ea80fc",
                "a200": "#e040fb",
                "a400": "#d500f9",
                "a700": "#aa00ff"
            },
            "deeppurple": {
                "50": "#ede7f6",
                "100": "#d1c4e9",
                "200": "#b39ddb",
                "300": "#9575cd",
                "400": "#7e57c2",
                "500": "#673ab7",
                "600": "#5e35b1",
                "700": "#512da8",
                "800": "#4527a0",
                "900": "#311b92",
                "a100": "#b388ff",
                "a200": "#7c4dff",
                "a400": "#651fff",
                "a700": "#6200ea"
            },
            "indigo": {
                "50": "#e8eaf6",
                "100": "#c5cae9",
                "200": "#9fa8da",
                "300": "#7986cb",
                "400": "#5c6bc0",
                "500": "#3f51b5",
                "600": "#3949ab",
                "700": "#303f9f",
                "800": "#283593",
                "900": "#1a237e",
                "a100": "#8c9eff",
                "a200": "#536dfe",
                "a400": "#3d5afe",
                "a700": "#304ffe"
            },
            "blue": {
                "50": "#e3f2fd",
                "100": "#bbdefb",
                "200": "#90caf9",
                "300": "#64b5f6",
                "400": "#42a5f5",
                "500": "#2196f3",
                "600": "#1e88e5",
                "700": "#1976d2",
                "800": "#1565c0",
                "900": "#0d47a1",
                "a100": "#82b1ff",
                "a200": "#448aff",
                "a400": "#2979ff",
                "a700": "#2962ff"
            },
            "lightblue": {
                "50": "#e1f5fe",
                "100": "#b3e5fc",
                "200": "#81d4fa",
                "300": "#4fc3f7",
                "400": "#29b6f6",
                "500": "#03a9f4",
                "600": "#039be5",
                "700": "#0288d1",
                "800": "#0277bd",
                "900": "#01579b",
                "a100": "#80d8ff",
                "a200": "#40c4ff",
                "a400": "#00b0ff",
                "a700": "#0091ea"
            },
            "cyan": {
                "50": "#e0f7fa",
                "100": "#b2ebf2",
                "200": "#80deea",
                "300": "#4dd0e1",
                "400": "#26c6da",
                "500": "#00bcd4",
                "600": "#00acc1",
                "700": "#0097a7",
                "800": "#00838f",
                "900": "#006064",
                "a100": "#84ffff",
                "a200": "#18ffff",
                "a400": "#00e5ff",
                "a700": "#00b8d4"
            },
            "teal": {
                "50": "#e0f2f1",
                "100": "#b2dfdb",
                "200": "#80cbc4",
                "300": "#4db6ac",
                "400": "#26a69a",
                "500": "#009688",
                "600": "#00897b",
                "700": "#00796b",
                "800": "#00695c",
                "900": "#004d40",
                "a100": "#a7ffeb",
                "a200": "#64ffda",
                "a400": "#1de9b6",
                "a700": "#00bfa5"
            },
            "green": {
                "50": "#e8f5e9",
                "100": "#c8e6c9",
                "200": "#a5d6a7",
                "300": "#81c784",
                "400": "#66bb6a",
                "500": "#4caf50",
                "600": "#43a047",
                "700": "#388e3c",
                "800": "#2e7d32",
                "900": "#1b5e20",
                "a100": "#b9f6ca",
                "a200": "#69f0ae",
                "a400": "#00e676",
                "a700": "#00c853"
            },
            "lightgreen": {
                "50": "#f1f8e9",
                "100": "#dcedc8",
                "200": "#c5e1a5",
                "300": "#aed581",
                "400": "#9ccc65",
                "500": "#8bc34a",
                "600": "#7cb342",
                "700": "#689f38",
                "800": "#558b2f",
                "900": "#33691e",
                "a100": "#ccff90",
                "a200": "#b2ff59",
                "a400": "#76ff03",
                "a700": "#64dd17"
            },
            "lime": {
                "50": "#f9fbe7",
                "100": "#f0f4c3",
                "200": "#e6ee9c",
                "300": "#dce775",
                "400": "#d4e157",
                "500": "#cddc39",
                "600": "#c0ca33",
                "700": "#afb42b",
                "800": "#9e9d24",
                "900": "#827717",
                "a100": "#f4ff81",
                "a200": "#eeff41",
                "a400": "#c6ff00",
                "a700": "#aeea00"
            },
            "yellow": {
                "50": "#fffde7",
                "100": "#fff9c4",
                "200": "#fff59d",
                "300": "#fff176",
                "400": "#ffee58",
                "500": "#ffeb3b",
                "600": "#fdd835",
                "700": "#fbc02d",
                "800": "#f9a825",
                "900": "#f57f17",
                "a100": "#ffff8d",
                "a200": "#ffff00",
                "a400": "#ffea00",
                "a700": "#ffd600"
            },
            "amber": {
                "50": "#fff8e1",
                "100": "#ffecb3",
                "200": "#ffe082",
                "300": "#ffd54f",
                "400": "#ffca28",
                "500": "#ffc107",
                "600": "#ffb300",
                "700": "#ffa000",
                "800": "#ff8f00",
                "900": "#ff6f00",
                "a100": "#ffe57f",
                "a200": "#ffd740",
                "a400": "#ffc400",
                "a700": "#ffab00"
            },
            "orange": {
                "50": "#fff3e0",
                "100": "#ffe0b2",
                "200": "#ffcc80",
                "300": "#ffb74d",
                "400": "#ffa726",
                "500": "#ff9800",
                "600": "#fb8c00",
                "700": "#f57c00",
                "800": "#ef6c00",
                "900": "#e65100",
                "a100": "#ffd180",
                "a200": "#ffab40",
                "a400": "#ff9100",
                "a700": "#ff6d00"
            },
            "deeporange": {
                "50": "#fbe9e7",
                "100": "#ffccbc",
                "200": "#ffab91",
                "300": "#ff8a65",
                "400": "#ff7043",
                "500": "#ff5722",
                "600": "#f4511e",
                "700": "#e64a19",
                "800": "#d84315",
                "900": "#bf360c",
                "a100": "#ff9e80",
                "a200": "#ff6e40",
                "a400": "#ff3d00",
                "a700": "#dd2c00"
            },
            "brown": {
                "50": "#efebe9",
                "100": "#d7ccc8",
                "200": "#bcaaa4",
                "300": "#a1887f",
                "400": "#8d6e63",
                "500": "#795548",
                "600": "#6d4c41",
                "700": "#5d4037",
                "800": "#4e342e",
                "900": "#3e2723"
            },
            "grey": {
                "50": "#fafafa",
                "100": "#f5f5f5",
                "200": "#eeeeee",
                "300": "#e0e0e0",
                "400": "#bdbdbd",
                "500": "#9e9e9e",
                "600": "#757575",
                "700": "#616161",
                "800": "#424242",
                "900": "#212121"
            },
            "bluegrey": {
                "50": "#eceff1",
                "100": "#cfd8dc",
                "200": "#b0bec5",
                "300": "#90a4ae",
                "400": "#78909c",
                "500": "#607d8b",
                "600": "#546e7a",
                "700": "#455a64",
                "800": "#37474f",
                "900": "#263238"
            }
        }

        // load assets for highlight helper
        loader.loadImage("glowSpark", glowSrc);
        loader.loadImage("shineSpark", shineSrc);

        this.TweenTrain = TweenTrain;
    }

    /**
     * @name GetColor
     * 
     * @description Converts the color from color palette to code usable Phaser Color Type. <br>
     * Colors: <br>
     * red, pink, purple, deeppurple, indigo, blue, lightblue, cyan, teal, green, <br>
     * lightgreen, lime, yellow, amber, orange, deeporange, brown, grey, bluegrey <br>
     * Subcodes: <br>
     * 50, 100, 200, ... 900, (a100, a200, a400, a700) <br>
     *  
     * @param {string} colorString - A string representing the main name of the color e.g. "red"
     * @param {string} subCode - A subcode to the main color which darkens it as it is increased.
     * 
     * @function
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    getColor(colorString = "", subCode = "") {
        // validate parameters
        if ((typeof colorString) == "string") {
            if (colorString.length == 0) {
                console.error(`HelperPhaser.GetColor : 0 length color string was given!`);
                return false;
            } else if (!this.colors[colorString]) {
                console.error(`HelperPhaser.GetColor : Invalid color string!`);
                return false;
            } else {
                if (!(typeof subCode) == "string") {
                    console.error(`HelperPhaser.GetColor : Sub code must be of type "integer"!`);
                    return false;
                } else if (!this.colors[colorString][subCode]) {
                    console.error(`HelperPhaser.GetColor : Invalid sub code`);
                    return false;
                }
            }
        } else {
            console.error(`HelperPhaser.GetColor : Color string must be of type "string"!`);
            return false;
        }

        return Phaser.Display.Color.HexStringToColor(this.colors[colorString][String(subCode)]).color
    }

    /**
     * @name Constrain
     * 
     * @description Constrains the input between min and max values. <br>
     * Useful especially when you don't know the return value of input and want to constrain it somehow. 
     * 
     * @param {number} input - Input value to be constrained
     * @param {number} min - Minimum value of the constrain
     * @param {number} max - Maximum value of the constrain
     * 
     * @function
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    constrain(input = 0.5, min = 0, max = 1) {
        if ((typeof input) != "number" || (typeof min) != "number" || (typeof max) != "number") {
            console.error(`HelperPhaser.Constrain : All parameters must be of type "number"!`);
            return false;
        }
        if (input < min) {
            return min;
        } else if (input > max) {
            return max;
        } else {
            return input;
        }
    }

    /**
     * @name Dist
     * 
     * @description Finds the distance between two objects. <br>
     * If you want to give points, then pass parameters as: dist({x: x1 , y: y1}, {x: x2, y: y2});
     * 
     * @param {Object} obj1 - First object
     * @param {Object} obj2 - Second object
     * 
     * @function
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    dist(obj1, obj2) {
        if (!obj1.x || !obj1.y || !obj2.x || !obj2.y) {
            console.error(`HelperPhaser.Dist : Invalid object parameter!`);
            return false;
        }
        return Math.sqrt(Math.pow(obj2.x - obj1.x, 2) + Math.pow(obj2.y - obj1.y, 2));
    }

    /**
     * @name Map
     * 
     * @description Linearly maps value from the range (a..b) to (c..d)
     * 
     * @param {integer} value - The value to be mapped
     * @param {integer} a - Lower boundary of input
     * @param {integer} b - Upper boundary of input
     * @param {integer} c - Lower boundary of output
     * @param {integer} d - Upper boundary of output
     * 
     * @function
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    map(value = 0, a = 0, b = 0, c = 0, d = 0) {
        if ((typeof value != "number") || (typeof a != "number") || (typeof b != "number") || (typeof c != "number") || (typeof d != "number")) {
            console.error(`HelperPhaser.Map : All parameters must be of type "number"!`);
            return false;
        } else {
            if (b - a == 0 || d - c == 0) {
                console.error(`HelperPhaser.Dist : (max - low) values cannot be 0!`);
                return false;
            }
        }
        // first map value from (a..b) to (0..1)
        value = (value - a) / (b - a);
        // then map it from (0..1) to (c..d) and return it
        return c + value * (d - c);
    }

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
     * @name GenerateBlankArray
     * 
     * @description Generate a blank array in which the value of the elements of the array are equal to their index numbers. <br>
     * This way, you can just use "for (let i of generateBlankArray(n))" instead of using the "i" syntax. <br>
     * This is for simplifying for loops and must only be used for the most basic cases. 
     * 
     * @param {number} n - Number of elements in the array. 0: generates a blank array with length 0
     * 
     * @function
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    generateBlankArray(n) {
        if ((typeof n != "integer")) {
            console.error(`HelperPhaser.GenerateBlankArray : N must be an integer!`);
            return false;
        }
        let tempArray = [];
        for (let i = 0; i < n; i++) {
            tempArray.push(i);
        }
        return tempArray;
    }
}

export default HelperPhaser;