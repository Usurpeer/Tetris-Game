// работа с конструктором

let allFigures = [], // [i][0] - строка фигуры, [i][1] - ID
  indexAllFigures = 0, // индекс отображаемой фигуры, чтобы знать какая сейчас на экране и удалить изменить ее легко
  figuresOnLvl = [],
  indexFiguresOnLvl = 0;

window.onload() = go();

async function go(){
    console.log("go");

  // инициализация всех данных из бд
  await getDataFigures();
  console.log(allFigures);
}