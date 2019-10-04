/**
 * @name MathLib
 * 
 * @class
 * @classdesc This library contains necessary functions to make your everyday math life a tad bit more enjoyable
 * 
 * @author Tayfun Turgut <tyfn.trgt@gmail.com>
 */
class MathLib {
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
     * @static
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    static constrain(input = 0, min = 0, max = 1) {
        // validate parameters
        if ((typeof input) != "number" || (typeof min) != "number" || (typeof max) != "number") {
            console.warn(`MathLib.Constrain : All parameters must be of type "number"!`);
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
     * If you want to use points, then pass parameters as: <br>
     * dist({x: x1 , y: y1}, {x: x2, y: y2});
     * 
     * @param {object} obj1 - First object
     * @param {object} obj2 - Second object
     * 
     * @static
     * @function
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    static dist(obj1, obj2) {
        // validate parameters
        if ((typeof obj1.x != "number") || (typeof obj1.y != "number") || (typeof obj2.x != "number") || (typeof obj2.y != "number")) {
            console.warn(`MathLib.Dist : Invalid parameter(s)!`);
            return false;
        }
        return Math.sqrt(Math.pow(obj2.x - obj1.x, 2) + Math.pow(obj2.y - obj1.y, 2));
    }

    /**
     * @name MapValue
     * 
     * @description Linearly maps value from the range (a..b) to (c..d)
     * 
     * @param {number} value - The value to be mapped
     * @param {number} a - Lower boundary of input
     * @param {number} b - Upper boundary of input
     * @param {number} c - Lower boundary of output
     * @param {number} d - Upper boundary of output
     * 
     * @static
     * @function
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    static mapValue(value = 0, a = 0, b = 1, c = 0, d = 1) {
        // validate parameters
        if ((typeof value != "number") || (typeof a != "number") || (typeof b != "number") || (typeof c != "number") || (typeof d != "number")) {
            console.warn(`MathLib.MapValue : All parameters must be of type "number"!`);
            return false;
        } else {
            if (b - a == 0 || d - c == 0) {
                console.warn(`MathLib.MapValue : (max - low) values cannot be 0!`);
                return false;
            }
        }
        // first map value from (a..b) to (0..1)
        value = (value - a) / (b - a);
        // then map it from (0..1) to (c..d) and return it
        return c + value * (d - c);
    }

    /**
     * @name ConvertNumToCustomFormat
     * 
     * @description Convert number to K-M-B notation, with given decimals, <br>
     * and constrains the number to positive or negative region if needed.  
     * 
     * @param {number} num - The number to be converted
     * @param {integer} decimal - The number of decimal places to be used in the conversion. Can be 0, 1 or 2
     * @param {string} constrain - "pos": positive constrain, "neg": negative constrain, "none": no constrain
     * 
     * @static
     * @function
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    static convertNumToCustomFormat(num = 0, decimal = 0, constrain = "none") {
        if ((typeof num != "number")) {
            console.warn(`MathLib.ConvertNumToCustomFormat : num must be of type "number"!`);
            return false;
        } else if (!Number.isInteger(decimal)) {
            console.warn(`MathLib.ConvertNumToCustomFormat : decimal must be an integer!`);
            return false;
        } else if (decimal > 2) {
            console.warn(`MathLib.ConvertNumToCustomFormat : Invalid decimal parameter`);
            return false;
        } else if ((typeof constrain != "string")) {
            console.warn(`MathLib.ConvertNumToCustomFormat : constrain must be a string!`);
            return false;
        } else if (!(constrain == "pos" || constrain == "neg" || constrain == "none")) {
            console.warn(`MathLib.ConvertNumToCustomFormat : Invalid constrain type!`);
            return false;
        }
        let newNum;
        if (constrain == "pos") {
            newNum = MathLib.constrain(num, 0, Infinity).toFixed(0);
        } else if (constrain == "neg") {
            newNum = MathLib.constrain(num, -1 * Infinity, 0).toFixed(0);
        } else if (constrain == "none") {
            newNum = num.toFixed(0)
        }
        let dot;
        if (decimal > 0) {
            dot = ".";
        } else {
            dot = "";
        }
        if (newNum.length >= 10) {
            newNum = `${newNum.slice(0, newNum.length - 9)}${dot}${newNum.slice(newNum.length - 9, decimal)}B`;
        } else if (newNum.length >= 7) {
            newNum = `${newNum.slice(0, newNum.length - 6)}${dot}${newNum.slice(newNum.length - 6, decimal)}M`;
        } else if (newNum.length >= 4) {
            newNum = `${newNum.slice(0, newNum.length - 3)}${dot}${newNum.slice(newNum.length - 3, decimal)}K`;
        }
        return newNum;
    }

    /**
     * @name GenerateBlankArray
     * 
     * @description Generate a blank array in which the value of the elements of the array are equal to their index numbers. <br>
     * This way, you can just use "for (let i of generateBlankArray(n))" instead of using the "i" syntax. <br>
     * This is for simplifying for loops and must only be used for the most basic cases. 
     * 
     * @param {integer} n - Number of elements in the array. 0: generates a blank array
     * @param {boolean} ascending - Changes whether the blank array ascend or descent in values.
     * 
     * @static
     * @function
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    static generateBlankArray(n = 0, ascending = true) {
        if (!Number.isInteger(n)) {
            console.error(`HelperPhaser.GenerateBlankArray : N must be an integer!`);
            return false;
        }
        let tempArray = [];
        if (ascending) {
            for (let i = 0; i < n; i++) {
                tempArray.push(i);
            }
        } else {
            for (let i = n - 1; i > -1; i--) {
                tempArray.push(i);
            }
        }
        return tempArray;
    }
}

export default MathLib;