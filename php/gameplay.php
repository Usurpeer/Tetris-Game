<?php
require_once('../db_connect.php');
header('Content-Type: application/json');

//////////////////////////////////////////
// запрос количество фигур на все три уровня
$sqlCountFigures = "SELECT COUNT(`id`) FROM `figures` WHERE level > 0";

$data = array();
$result = $conn -> query($sqlCountFigures);

while($row = $result -> fetch_array())
{       
    array_push($data, $row["COUNT(`id`)"]);
}
//////////////////////////////////////////

//////////////////////////////////////////
$sqlAllFigures = "SELECT `structure`, `level` FROM `figures` WHERE level > 0 ORDER BY `level`";

$result = $conn -> query($sqlAllFigures);

while($row = $result -> fetch_array())
{       
    array_push($data, $row["structure"], $row["level"]);
}
//////////////////////////////////////////

// таблица настроек уровня
$sqlAllLvlSettings = "SELECT * FROM `levelsettings`";

$result = $conn -> query($sqlAllLvlSettings);

while($row = $result -> fetch_array())
{       
    array_push($data, $row["height"], $row["width"], $row["speed"], $row["countOfLines"], $row["pointsOfLine"]);
}

print json_encode($data);

?>