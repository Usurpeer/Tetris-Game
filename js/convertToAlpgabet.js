export default class ConvertAlphabet {
  convertNumbInAplphabet(inputArray) {
    const numbArray = inputArray;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let outputArray = [];

    // цикл по всем строкам
    for (let i = 0; i < numbArray.length; i++) {
      let symbol = alphabet[i];
      let str = numbArray[i] + "";
      let outputStr = "";
      outputArray[i] = [];
      for (let j = 0; j < str.length; j++) {
        if (str[j] == 1) {
          outputStr += symbol + "";
        } else {
          outputStr += "0";
        }
      }
      outputArray[i] = outputStr;
    }
    return outputArray;
  }
}
