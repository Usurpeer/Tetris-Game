<?php
require_once('db_connect.php');

if (isset($_POST)) {
    $data = json_decode(file_get_contents('php://input'), true);
    // операции с данными
    $login = $data['login']; // логин пользователя
    $password = $data['password'];
    $repPassword = $data['repPassword'];

    $data2 = array();


    //запрос на уникальность
    $sqlAllFigures = "SELECT * FROM `users` WHERE login = '$login'";
    $result = $conn->query($sqlAllFigures);

    if ($result->num_rows > 0) {
        array_push($data2, -1);
        echo json_encode($data2);
    } else {
        //запрос к бд на регистрацию
        $password = md5($password);

        $sqlAllFigures = "INSERT INTO `users` (login, password, ratingScore, ratingTime, user_role) VALUES ('$login', '$password', 0, 0, 0)";

        if ($conn->query($sqlAllFigures) === TRUE) {

            // нужно вытащить его id из бд
            $sqlAllFigures = "SELECT `id` FROM `users` WHERE login = '$login'";
            $result = $conn->query($sqlAllFigures);
            $user_role = ($result->fetch_assoc());
            setcookie('id', $user_role['id'], 0, "/");


            setcookie('role', 0, 0, "/");
            setcookie('login', $login, 0, "/");
            setcookie('gridOn', 1, 0, "/");
            setcookie('musicOn', 1, 0, "/");
            setcookie('countScore', 1, 0, "/");
            setcookie('ratingTime', 0, 0, "/");
            setcookie('ratingScore', 0, 0, "/");


            array_push($data2, 0);
            echo json_encode($data2);
        } else {
            array_push($data2, -2);
            echo json_encode($data2);
        }
    }
}
?>