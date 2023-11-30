<?php
// по полученному ID поменять уровень фигуры на 
require_once('../db_connect.php');

if (isset($_POST)) {
    $data = json_decode(file_get_contents('php://input'), true);
    // операции с данными
    $level = $data['lvl'];
    $heigth = $data['heigth'];
    $width = $data['width'];
    $speed = $data['speed'];
    $countLines = $data['countLines'];
    $score = $data['score'];


    $sqlUpdateFigure = "UPDATE `levelsettings` SET `height`=$heigth,`width`=$width,`speed`=$speed,`countOfLines`=$countLines,`pointsOfLine`=$score WHERE `level`=$level";

    // проверка была ли удалена фигура
    if ($conn->query($sqlUpdateFigure) == TRUE && $conn->affected_rows > 0) {
        $result = '1';
    } else {
        $result = '0';
    }
    /// ответ от сервера
    $data2 = array();
    array_push($data2, $result);
    echo json_encode($data2);
}

?>