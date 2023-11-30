<?php
// получает ширину, высоту, скорость, количество рядов, кол-во очков за линию
require_once('../db_connect.php');

if (isset($_POST)) {
    $intputData = json_decode(file_get_contents('php://input'), true);
    // операции с данными
    $currentLvl = $intputData['lvl'];

    $data = array();
    // таблица настроек уровня
    $sqlAllLvlSettings = "SELECT * FROM `levelsettings` WHERE `level`=$currentLvl";

    $result = $conn->query($sqlAllLvlSettings);

    while ($row = $result->fetch_array()) {
        array_push($data, $row["height"], $row["width"], $row["speed"], $row["countOfLines"], $row["pointsOfLine"]);
    }

    echo json_encode($data);
}

?>