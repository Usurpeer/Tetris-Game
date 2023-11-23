import ConstructorGame from "./constructorGame.js";

const allFigures = [
    ["1000100010001000"], // линия
    ["1100110000000000"], // квадрат
    ["0100111000000000"], // T образная
    ["0110110000000000"], // S
    ["1100011000000000"], // Z
    ["1000100011000000"], // L
    ["0100010011000000"], // Other L
    // отсуда свои фигуры
    /*["0110110001000000"], // H 1
    ["1100110010000000"], // I 2
    ["1100100010001000"], // J 3
    ["0100010011001000"], // K 4
    ["0100010011100000"], // L 5
    ["1110101000000000"], // M 6
    ["1110100010000000"], // N 7
    ["0010011011000000"], // O 8
    ["0100111001000000"], // P 9
    ["1000110010001000"], // Q 10
    ["0110010011000000"], // R 11*/
  ],
  newFigureLine = "1000100010001000", // Line
  newFigureSquare = "1100110000000000", // квадрат
  newFigureT = "0100111000000000", // T образная
  newFigureL = "1000100011000000", // L
  newFigureOtherL = "0100010011000000", // Other L
  newFigureZ = "1100011000000000",
  //testFig = "1011100110011111";
  //
  testFig = "1111101111011111";

const constructorGame = new ConstructorGame(allFigures, testFig);

constructorGame.isCorrect();

window.gaconstructorGameme = constructorGame;
