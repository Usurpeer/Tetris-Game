<?php
require_once('db_connect.php');


$login = $_POST['login'];
$password = $_POST['password'];
$repeat_password = $_POST['repeat_password'];

if (strlen($login) < 4 || strlen($login) > 12) {
    echo 'Недопустимая длина логина';
} else if (strlen($password) < 4 || strlen($password) > 12) {
    echo 'Недопустимая длина пароля';
} else if ($repeat_password != $password) {
    echo "Пароли не совпадают";
} else {
    //запрос на уникальность
    $sqlAllFigures = "SELECT * FROM `users` WHERE login = '$login'";
    $result = $conn->query($sqlAllFigures);

    if ($result->num_rows > 0) {
        echo 'Пользователь уже существует.';
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

            header("Location: ..\pages\player_menu.html", true, 302);
            die();

        } else {
            echo "Ошибка регистрации";
        }
    }

}


?>