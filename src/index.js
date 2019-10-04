module.exports = function multiply(first, second) {
    let firstNum = castStringToNums(first);
    let secondNum = castStringToNums(second);
    let tempMas=[];
    let result=[0];
    let answer='';
    for(let i = secondNum.length-1, p=0;i>=0;i--,p++){
        tempMas = multiplyMasForNum(firstNum, secondNum[i]);
        tempMas = multiplyMasToZeros(tempMas,p);
        result = sumMasToMas(result, tempMas);
    }
    for(let num of result){
        answer+=String(num);
    }
    return answer;
}
function castStringToNums(str) {
    let mas = str.split('');
    for (let i=0;i<str.length; i++){
        mas[i] = Number(mas[i]);
    }
    return mas;
}
function multiplyMasForNum(mas, num) {
    let result =[];
    for(let i=mas.length-1; i>=0; i--){
        result.push(mas[i]*num);
    }
    result.push(0);
    for(let i=0;i<result.length;i++){
        if (result[i]>=10){
            result[i+1] = result[i+1]+Math.trunc(result[i]/10);
            result[i] = result[i]%10;
        }
    }
    if(result[result.length-1] ===0){
        result.pop();
    }
    return result.reverse();
}
function sumMasToMas(first, second) {
    if(first.length>second.length){
        second = doSameLength(first, second);
    } else{
        first = doSameLength(first, second);
    }

    second = second.reverse();
    first = first.reverse();
    let result=0, residue=0;
    let answer = [];
    for (let i =0; i<first.length;i++){
        result = first[i]+second[i]+residue;
        if (result>=10){
            residue = Math.trunc(result/10);
            result = result%10;
        } else {
            residue=0;
        }
        answer.push(result);
    }
    answer.push(residue);
    if(answer[answer.length-1]===0){
        answer.pop();
    }
    return answer.reverse();
}
function doSameLength(first, second) {
    let max = 0;
    if(first.length>second.length){
        max = first.length;
        while (second.length<max){
            second.unshift(0);
        }
        return second;
    } else{
        max = second.length;
        while (first.length<max){
            first.unshift(0);
        }
        return first;
    }
}
function multiplyMasToZeros(nums, pow) {
    for(let i=0; i<pow; i++){
        nums.push(0);
    }
    return nums;
}
