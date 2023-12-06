<?php
require_once('db_connect.php');

if (isset($_POST)) {
    $data = json_decode(file_get_contents('php://input'), true);
    // операции с данными
    $login = $data['login']; // логин пользователя
    $password = $data['password'];

    $data2 = array();


    //запрос к бд
    $password = md5($password);
    $sqlAllFigures = "SELECT * FROM `users` WHERE login = '$login' AND password = '$password'";
    $result = $conn->query($sqlAllFigures);

    if ($result->num_rows > 0) {
        $user_role = ($result->fetch_assoc());

        if ($user_role['user_role'] == 0) {
            setcookie('role', 0, 0, "/");
            setcookie('login', $login, 0, "/");
            setcookie('id', $user_role['id'], 0, "/");
            setcookie('gridOn', 1, 0, "/");
            setcookie('musicOn', 1, 0, "/");
            setcookie('countScore', 1, 0, "/");
            setcookie('ratingTime', $user_role['ratingTime'], 0, "/");
            setcookie('ratingScore', $user_role['ratingScore'], 0, "/");

            array_push($data2, 0);
            echo json_encode($data2);
        } else if ($user_role['user_role'] == '1') {
            setcookie('role', 1, 0, "/");
            setcookie('login', $login, 0, "/");

            array_push($data2, 1);
            echo json_encode($data2);
        }

    } else {
        array_push($data2, -1);
        echo json_encode($data2);
    }


}
?>