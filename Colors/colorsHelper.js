import colorsJSON from "./colors.json";
/**
 *
 *
 * @class ColorsHelper
 */
class ColorsHelper {

    /**
     * @description Converts the color from color palette to code usable Phaser Color Type. <br>
     * Colors: <br>
     * red, pink, purple, deeppurple, indigo, blue, lightblue, cyan, teal, green, <br>
     * lightgreen, lime, yellow, amber, orange, deeporange, brown, grey, bluegrey <br>
     * Subcodes: <br>
     * 50, 100, 200, ... 900, (a100, a200, a400, a700) <br>
     *
     * @static
     * @param {string} [colorString=""] - A string representing the main name of the color e.g. "red"
     * @param {string} [subCode=""] - A subcode to the main color which darkens it as it is increased.
     * @param {boolean} [hex=true] - false: returns a number instead of color with "#" prefix
     * @returns {string} || {number} || false
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     * @author Tunahan Gormus <tunahangormus@gmail.com>
     * 
     * @memberof ColorsHelper
     */
    static getColor(colorString = "", subCode = "", hex = true) {
        let colorsWithSubs = false;
        // validate parameters
        if ((typeof colorString) == "string") {
            if (colorString.length == 0) {
                console.warn(`ColorsHelper.GetColor : 0 length color string was given!
                Log => colorString: ${colorString}`);
                return false;
            } else {
                if (subCode.length == 0) {
                    if (!colorsJSON.colorPalette[colorString]) {
                        if (!colorsJSON.colorsWithSubs[colorString]) {
                            console.warn(`ColorsHelper.GetColor : Invalid color string!
                            Log => colorString: ${colorString}`);
                            return false;
                        } else {
                            colorsWithSubs = true;
                        }
                    }
                } else {

                    if (!colorsJSON.colorsWithSubs[colorString]) {
                        if (!colorsJSON.colorPalette[colorString]) {
                            console.warn(`ColorsHelper.GetColor : Invalid color string!
                            Log => colorString: ${colorString}`);
                            return false;
                        } else {
                            colorsWithSubs = false;
                        }
                    } else {

                        if (!(typeof subCode) == "string") {
                            console.warn(`ColorsHelper.GetColor : Sub code must be of type "integer"!
                            Log => subCode: ${subCode}`);
                            return false;
                        } else {

                            if (!colorsJSON.colorsWithSubs[colorString][subCode]) {
                                console.warn(`ColorsHelper.GetColor : Invalid sub code
                                Log => subCode: ${subCode}`);
                                return false;
                            } else {
                                colorsWithSubs = true;
                            }
                        }
                    }
                }



            }
        } else {
            console.warn(`ColorsHelper.GetColor : Color string must be of type "string"!
            Log => colorString: ${colorString}`);
            return false;
        }

        if (colorsWithSubs) {
            if (subCode.length == 0) {
                subCode = 900;
            }

            if (hex) {
                return colorsJSON.colorsWithSubs[colorString][String(subCode)];
            } else {
                // convert color to hexadecimal number
                return Phaser.Display.Color.HexStringToColor(colorsJSON.colorsWithSubs[colorString][String(subCode)]).color;
            }
        } else {
            if (hex) {
                return colorsJSON.colorPalette[colorString];
            } else {
                // convert color to hexadecimal number
                return Phaser.Display.Color.HexStringToColor(colorsJSON.colorPalette[colorString]).color;
            }
        }


    }

    /**
     * @description Returns a random color
     *
     * @static
     * @memberof ColorsHelper
     * @param {boolean} [hex=true] - false: returns a number instead of color with "#" prefix
     * 
     * @author Tunahan Gormus <tunahangormus@gmail.com>
     * @returns {string}
     */
    static getRandomColor(hex = true) {
        let randomColor = (Math.random() * 0xFFFFFF << 0).toString(16);
        return hex ? "#" + randomColor : "0x" + randomColor;
    }

    /**
     * @description Returns a gradient color array from given start color and end color.
     *
     * @static
     * @memberof ColorsHelper
     * @param {string} [startColor = ""] A string representing "start color" of the gradient array.
     * @param {string} [endColor = ""] A string representing "end color" of the gradient array.
     * @param {number} [colorCount = 10] Size of the gradient array.
     * @param {boolean} [hex=true] - false: returns a number instead of color with "#" prefix
     * 
     * @author Tunahan Gormus <tunahangormus@gmail.com>
     * @author Euler Junior <https://stackoverflow.com/users/5274306/euler-junior>
     * @returns {array}
     * 
     */
    static gradientColor(startColor = "", endColor = "", colorCount = 10, hex = true) {

        let start = this.convertToRGB(startColor);
        let end = this.convertToRGB(endColor);

        let alpha = 0.0;

        let colors = [];

        for (var i = 0; i < colorCount; i++) {
            let c = [];
            alpha += (1.0 / colorCount);

            c[0] = start[0] * alpha + (1 - alpha) * end[0];
            c[1] = start[1] * alpha + (1 - alpha) * end[1];
            c[2] = start[2] * alpha + (1 - alpha) * end[2];

            colors.push(this.convertToHex(c, hex));

        }

        return colors;
    }

    /**
     * @description Convert Rgb to hex string
     *
     * @static
     * @memberof ColorsHelper
     * @param {array} [rgb] An array which contains the RGB values
     * @param {string} [hex = "true"] false: returns a number instead of color with "#" prefix
     * 
     * @author Tunahan Gormus <tunahangormus@gmail.com>
     * @returns {array}
     * 
     */
    static convertToHex(rgb, hex = "true") {
        let calculateHex = function (c) {
            let s = "0123456789abcdef";
            let i = parseInt(c);
            if (i == 0 || isNaN(c))
                return "00";
            i = Math.round(Math.min(Math.max(0, i), 255));
            return s.charAt((i - i % 16) / 16) + s.charAt(i % 16);
        }

        let hexColor = calculateHex(rgb[0]) + calculateHex(rgb[1]) + calculateHex(rgb[2]);
        return hex ? "#" + hexColor : "0x" + hexColor;
    }


    /**
     * @description Convert a hex string to an RGB triplet
     *
     * @static
     * @memberof ColorsHelper
     * @param {string} [hex = ""] Hex string "can start with '#' or '0x' or without any"
     * 
     * @author Tunahan Gormus <tunahangormus@gmail.com>
     * @returns {array}
     */
    static convertToRGB(hex) {
        /* Removes '#' and '0x' in color hex string */

        let trim = function (s) {
            if (s.charAt(0) == '#') {
                return s.substring(1, 7);
            } else if (s.charAt(0) == '0' && s.charAt(1) == 'x') {
                return s.substring(2, 8);
            } else {
                return s;
            }
        };

        let color = [];
        color[0] = parseInt((trim(hex)).substring(0, 2), 16);
        color[1] = parseInt((trim(hex)).substring(2, 4), 16);
        color[2] = parseInt((trim(hex)).substring(4, 6), 16);
        return color;
    }


    /**
     * @description Lists the properties of the helper to the console
     *
     * @static
     * @memberof ColorsHelper
     * 
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    static help() {
        let list = Object.getOwnPropertyNames(ColorsHelper);
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

export default ColorsHelper;