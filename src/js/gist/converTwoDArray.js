export default function converTwoDArray(arrToConvert) {
    let result = [];

    for(var i = 0; i < arrToConvert.length; i++)
    {
        result = result.concat(arrToConvert[i]);
    }
    
    return result;
}