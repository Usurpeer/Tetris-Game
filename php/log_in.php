<?php
require_once('db_connect.php');


$login = $_POST['login'];
$password = $_POST['password'];

if (strlen($login) < 4 || strlen($login) > 12) {
    echo 'Недопустимая длина логина';
} else if (strlen($password) < 4 || strlen($password) > 12) {
    echo 'Недопустимая длина пароля';
} else {
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

            header("Location: ..\pages\player_menu.html", true, 302);
            die();
        } else if ($user_role['user_role'] == '1') {
            setcookie('role', 1, 0, "/");
            setcookie('login', $login, 0, "/");

            header("Location: ..\pages\admin_menu.html");
            die();
        }

    } else {
        echo 'Неверный логин или пароль';
    }
}

?>