<?php
// по полученному ID, строки фигуры отправляет запрос на обновление данных
require_once('../db_connect.php');

if (isset($_POST)) {
    $data = json_decode(file_get_contents('php://input'), true);
    // операции с данными
    $id = $data['id'];

    $sqlUpdateFigure = "UPDATE `figures` SET `level`=0 WHERE `id`=$id";

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