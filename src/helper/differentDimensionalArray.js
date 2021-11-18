// compare by 2 index in array
function differentDimensionalArray(old_dataArray, new_dataArray) {
    let result = [];

    for (let i = 0; i < new_dataArray.length; i++) {
        let isInOldArray = false;

        for (let j = 0; j < old_dataArray.length; j++) {
            let check = 0;

            if (old_dataArray[j][0] === new_dataArray[i][0]) {
                check++;
            };

            if (old_dataArray[j][1] === new_dataArray[i][1]) {
                check++;
            };

            if (check == 2) {
                isInOldArray = true;
                break;
            }
        };

        if (!isInOldArray) {
            result.push(new_dataArray[i]);
        };
    };
    return result;
}

module.exports = {
    differentDimensionalArray,
};