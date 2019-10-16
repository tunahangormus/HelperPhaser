/**
 * 
 *
 * @class MathsHelper
 */
class MathsHelper {

    /**
     * @description Constrains the input between min and max values. <br>
     * Useful especially when you don't know the return value of input and want to constrain it somehow. 
     *
     * @static
     * @param {number} [input=0] - Input value to be constrained
     * @param {number} [min=0] - Minimum value of the constrain
     * @param {number} [max=1] - Maximum value of the constrain
     * @returns {number} [result=0] || false
     * @memberof MathsHelper
     * 
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    static constrain(input = 0, min = 0, max = 1) {
        // validate parameters
        if ((typeof input) != "number" || (typeof min) != "number" || (typeof max) != "number") {
            console.warn(`MathsHelper.Constrain : All parameters must be of type "number"!
            Log => input: ${input}, min: ${min}, max: ${max}`);
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
     * @description Finds the distance between two objects. <br>
     * If you want to use points, then pass parameters as: <br>
     * dist({x: x1 , y: y1}, {x: x2, y: y2});
     *
     * @static
     * @param {object} obj1 - First object
     * @param {object} obj2 - Second object
     * @returns {number} || false
     * @memberof MathsHelper
     * 
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    static dist(obj1, obj2) {
        // validate parameters
        if ((typeof obj1.x != "number") || (typeof obj1.y != "number") || (typeof obj2.x != "number") || (typeof obj2.y != "number")) {
            console.warn(`MathsHelper.Dist : Invalid parameter(s)!
            Log => obj1: ${JSON.stringify(obj1)}, obj2: ${JSON.stringify(obj2)}`);
            return false;
        }

        return Math.sqrt(Math.pow(obj2.x - obj1.x, 2) + Math.pow(obj2.y - obj1.y, 2));
    }

    /**
     * @description Linearly maps value from the range (a..b) to (c..d)
     *
     * @static
     * @param {number} [value=0] - The value to be mapped
     * @param {number} [a=0] - Lower boundary of input
     * @param {number} [b=1] - Upper boundary of input
     * @param {number} [c=0] - Lower boundary of output
     * @param {number} [d=1] - Upper boundary of output
     * @returns {number} || false
     * @memberof MathsHelper
     * 
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    static mapValue(value = 0, a = 0, b = 1, c = 0, d = 1) {
        // validate parameters
        if ((typeof value != "number") || (typeof a != "number") || (typeof b != "number") || (typeof c != "number") || (typeof d != "number")) {
            console.warn(`MathsHelper.MapValue : All parameters must be of type "number"!
            Log => value: ${value}, a: ${a}, b: ${b}, c: ${c}, d: ${d}`);
            return false;
        } else {
            if (b - a == 0 || d - c == 0) {
                console.warn(`MathsHelper.MapValue : (max - low) values cannot be 0!
                Log => b: ${b}, a: ${a}, d: ${d}, c: ${c}`);
                return false;
            }
        }

        // first map value from (a..b) to (0..1)
        value = (value - a) / (b - a);
        // then map it from (0..1) to (c..d) and return it
        return c + value * (d - c);
    }

    /**
     * @description Convert number to K-M-B notation, with given decimals, <br>
     * and constrains the number to positive or negative region if needed.
     *
     * @static
     * @param {number} [num=0] - The number to be converted
     * @param {number} [decimal=0] - The number of decimal places to be used in the conversion. Can be 0, 1 or 2
     * @param {string} [constrain="none"] - "pos": positive constrain, "neg": negative constrain, "none": no constrain
     * @returns {string} || false
     * @memberof MathsHelper
     * 
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    static convertNumToCustomFormat(num = 0, decimal = 0, constrain = "none") {
        if ((typeof num != "number")) {
            console.warn(`MathsHelper.ConvertNumToCustomFormat : num must be of type "number"!
            Log => num: ${num}`);
            return false;
        } else {
            if (!Number.isInteger(decimal)) {
                console.warn(`MathsHelper.ConvertNumToCustomFormat : decimal must be an integer!
                Log => decimal: ${decimal}`);
                return false;
            } else {
                if (decimal > 2) {
                    console.warn(`MathsHelper.ConvertNumToCustomFormat : Invalid decimal parameter
                    Log => decimal: ${decimal}`);
                    return false;
                } else {
                    if ((typeof constrain != "string")) {
                        console.warn(`MathsHelper.ConvertNumToCustomFormat : constrain must be a string!
                        Log => constrain: ${constrain}`);
                        return false;
                    } else {
                        if (!(constrain == "pos" || constrain == "neg" || constrain == "none")) {
                            console.warn(`MathsHelper.ConvertNumToCustomFormat : Invalid constrain type!
                            Log => constrain: ${constrain}`);
                            return false;
                        }
                    }
                }
            }
        }

        let newNum;
        if (constrain == "pos") {
            newNum = hP.constrain(num, 0, Infinity).toFixed(0);
        } else if (constrain == "neg") {
            newNum = hP.constrain(num, -1 * Infinity, 0).toFixed(0);
        } else if (constrain == "none") {
            newNum = num.toFixed(0)
        }

        // get number before period
        let preNum = newNum;
        if (newNum.length >= 10) {
            preNum = `${newNum.slice(0, newNum.length - 9)}`;
        } else if (newNum.length >= 7) {
            preNum = `${newNum.slice(0, newNum.length - 6)}`;
        } else if (newNum.length >= 4) {
            preNum = `${newNum.slice(0, newNum.length - 3)}`;
        }

        // don't put period if decimal = 0
        let dot = "";
        if (decimal > 0 && newNum.length >= 4) {
            dot = ".";
        }

        // get number after period
        let postNum = "";
        if (newNum.length >= 10) {
            postNum = `${newNum.slice(newNum.length - 9, newNum.length - 9 + decimal)}`;
        } else if (newNum.length >= 7) {
            postNum = `${newNum.slice(newNum.length - 6, newNum.length - 6 + decimal)}`;
        } else if (newNum.length >= 4) {
            postNum = `${newNum.slice(newNum.length - 3, newNum.length - 3 + decimal)}`;
        }

        // insert annotation
        let postLetter = "";
        if (newNum.length >= 10) {
            postLetter = `B`;
        } else if (newNum.length >= 7) {
            postLetter = `M`;
        } else if (newNum.length >= 4) {
            postLetter = `K`;
        }

        return preNum + dot + postNum + postLetter;
    }

    /**
     * @description Generate a blank array in which the value of the elements of the array are equal to their index numbers. <br>
     * This way, you can just use "for (let i of generateBlankArray(n))" instead of using the "i" syntax. <br>
     * This is for simplifying "for" loops and must only be used for the most basic cases.
     *
     * @static
     * @param {number} [n=0] - Number of elements in the array
     * @param {boolean} [ascending=true] - Changes whether the blank array ascend or descend in values.
     * @returns {object} || false
     * @memberof MathsHelper
     * 
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    static generateBlankArray(n = 0, ascending = true) {
        if (!Number.isInteger(n)) {
            console.warn(`MathsHelper.GenerateBlankArray : N must be an integer!
            Log => n: ${n}`);
            return false;
        } else {
            if (typeof ascending != "boolean") {
                console.warn(`MathsHelper.GenerateBlankArray : ascending must be of type "boolean"!
                Log => ascending: ${ascending}`);
                return false;
            }
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

    /**
     * @description Lists the properties of the helper to the console
     *
     * @static
     * @memberof MathsHelper
     * 
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    static help() {
        let list = Object.getOwnPropertyNames(MathsHelper);
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

export default MathsHelper;