<?php
// получает количество всех фигур, структуру, id, 
require_once('../db_connect.php');

if (isset($_POST)) {
    $intputData = json_decode(file_get_contents('php://input'), true);
    // операции с данными
    $currentLvl = $intputData['lvl'];
    ///////////////////

    // запрос количество всех фигур
    $sqlCountFigures = "SELECT COUNT(`id`) FROM `figures`";

    $data = array();
    $result = $conn->query($sqlCountFigures);

    while ($row = $result->fetch_array()) {
        array_push($data, $row["COUNT(`id`)"]);
    }
    //////////////////////////////////////////

    // фигура и ее id
    $sqlAllFigures = "SELECT `structure`, `level`, `id` FROM `figures` ORDER BY `level`";

    $result = $conn->query($sqlAllFigures);

    while ($row = $result->fetch_array()) {
        array_push($data, $row["structure"], $row["id"]);
    }
    //////////////////////////////////////////

    // запрос количество всех фигур
    $sqlCountFigures = "SELECT COUNT(`id`) FROM `figures` WHERE `level` > 0 AND `level` <= $currentLvl";

    $result = $conn->query($sqlCountFigures);

    while ($row = $result->fetch_array()) {
        array_push($data, $row["COUNT(`id`)"]);
    }
    //////////////////////////////////////////

    // фигура и ее id
    $sqlAllFigures = "SELECT `structure`, `level`, `id` FROM `figures` WHERE `level` > 0 AND `level` <= $currentLvl ORDER BY `level`";

    $result = $conn->query($sqlAllFigures);

    while ($row = $result->fetch_array()) {
        array_push($data, $row["structure"], $row["id"]);
    }
    //////////////////////////////////////////

    echo json_encode($data);
}

?>