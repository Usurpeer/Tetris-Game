import ConstructorGame from "./constructorGame.js";

const allFigures = [
    ["A000A000A000A000"], // линия
    ["BB00BB0000000000"], // квадрат
    ["0C00CCC000000000"], // T образная
    ["0DD0DD0000000000"], // S
    ["EE000EE000000000"], // Z
    ["F000F000FF000000"], // L
    ["0G000G00GG000000"], // Other L
    // отсуда свои фигуры
    /*["0HH0HH000H000000"], // H 1
    ["II00II00I0000000"], // I 2
    ["JJ00J000J000J000"], // J 3
    ["0K000K00KK00K000"], // K 4
    ["0L000L00LLL00000"], // L 5
    ["MMM0M0M000000000"], // M 6
    ["NNN0N000N0000000"], // N 7
    ["00O00OO0OO000000"], // O 8
    ["0P00PPP00P000000"], // P 9
    ["Q000QQ00Q000Q000"], // Q 10
    ["0RR00R00RR000000"], // R 11*/
  ],
  newFigureLine = "AAAA000000000000", // Line
  newFigureSquare = "A000A000A000A000", // квадрат
  newFigureT = "A000A000A000A000", // T образная
  newFigureL = "A000A000A000A000", // L
  newFigureOtherL = "A000A000A000A000", // L в другую сторону
  newFigureZ = "A000A000A000A000"; //

const constructorGame = new ConstructorGame(allFigures, newFigureLine);

console.log("Проверка на уникальность: " + constructorGame.checkUnique() == 0 ? "уникальная" : "неуникальная");

window.gaconstructorGameme = constructorGame;
