class OperationsHelper {

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