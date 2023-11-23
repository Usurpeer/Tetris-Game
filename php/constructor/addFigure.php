<?php
// добавляет фигуру в бд
require_once('../db_connect.php');

if (isset($_POST)) {
    $data = json_decode(file_get_contents('php://input'), true);
    // операции с данными
    $strFig = $data['figure'];
    $sqlUpdateFigure = "INSERT INTO `figures`(`structure`, `level`) VALUES ('$strFig','0')";
    if ($conn->query($sqlUpdateFigure) === TRUE) {
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