<?php
// данные игры в бд, после окончания игры, получить логин, рейтинг, время
// if data[time] == 0{то это очки}
require_once('db_connect.php');

if (isset($_POST)) {
    $data = json_decode(file_get_contents('php://input'), true);
    // операции с данными
    $id = $data['id']; // логин пользователя
    $login = str_replace(' ', '', $login);
    $isScoreTime = $data['time']; // подсчет по времени? 

    $scoreTime = (double) $data['scoreTime']; // время игры 
    $score = (int) $data['score']; // набранные очки

    $data2 = array();

    $sqlUpdateFigure = "UPDATE `users` SET `ratingScore`=$score WHERE `id`=$id AND `ratingScore` < $score";

    $user = "user001";
    if ($isScoreTime == "1" || $isScoreTime == 1) {
        $sqlUpdateFigure = "UPDATE `users` SET `ratingTime`=$scoreTime WHERE `id`=$id AND `ratingTime` < $scoreTime";
    }

    // проверка была ли удалена фигура
    if ($conn->query($sqlUpdateFigure) == TRUE && $conn->affected_rows > 0) {
        $result = '1';
    } else {
        $result = '0';
    }
    /// ответ от сервера

    array_push($data2, $result);
    echo json_encode($data2);
}
?>