<?php
// по полученному ID отправляет запрос на удаление фигуры из бд
require_once('../db_connect.php');

if (isset($_POST)) {
    // сначала нужно посчитать количество фигур
    // запрос количество всех фигур
    $sqlCountFigures = "SELECT COUNT(`id`) FROM `figures`";

    $data2 = array();
    $result = $conn->query($sqlCountFigures);

    while ($row = $result->fetch_array()) {
        array_push($data2, $row["COUNT(`id`)"]);
    }

    //если количество фигур <= 3
    if ($row["COUNT(`id`)"] <= 3) {
        array_push($data2, "Недопустимое количество фигур");
    } else {
        $data = json_decode(file_get_contents('php://input'), true);
        // операции с данными
        $level = $data['id'];

        $sqlDeleteFigure = "DELETE FROM `figures` WHERE `id` = $level";

        // проверка была ли удалена фигура
        if ($conn->query($sqlDeleteFigure) == TRUE && $conn->affected_rows > 0) {
            $result = '1';
        } else {
            $result = '0';
        }
        /// ответ от сервера
        $data2 = array();
        array_push($data2, $result);

    }
    echo json_encode($data2);
}

?>