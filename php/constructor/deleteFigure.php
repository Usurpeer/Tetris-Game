<?php
// по полученному ID отправляет запрос на удаление фигуры из бд
require_once('../db_connect.php');

if (isset($_POST)) {
    $data = json_decode(file_get_contents('php://input'), true);
    // операции с данными
    $strID = $data['id'];

    $sqlDeleteFigure = "DELETE FROM `figures` WHERE `id` = $strID";

    // проверка была ли удалена фигура
    if ($conn->query($sqlDeleteFigure) == TRUE && $conn->affected_rows > 0) {
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