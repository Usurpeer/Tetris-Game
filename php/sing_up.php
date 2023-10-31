<?php
require_once('db_connect.php');


$login = $_POST['login'];
$password = $_POST['password'];
$repeat_password = $_POST['repeat_password'];

if(strlen($login) < 4 || strlen($login) > 12){
    echo'Недопустимая длина логина';
}
else if(strlen($password) < 4 || strlen($password) > 12){
    echo'Недопустимая длина пароля';
}
else if($repeat_password != $password){
    echo "Пароли не совпадают";
}
else{
    //запрос на уникальность
    $sql = "SELECT * FROM `users` WHERE login = '$login'";
    $result = $conn -> query($sql);

    if($result -> num_rows > 0){
        echo 'Пользователь уже существует.';
    }
    else{
        //запрос к бд на регистрацию
        $password = md5($password);
        

        $sql = "INSERT INTO `users` (login, password, ratingScore, ratingTime, user_role) VALUES ('$login', '$password', 0, 0, 0)";

        if($conn -> query($sql) === TRUE){
            setcookie('role', 0, 0,"/");
            setcookie('login', $login, 0,"/");
            header("Location: ..\pages\player_menu_2.html", true, 302);
            die();
            
        }
        else{
            echo "Ошибка регистрации";
        }
    }

}


?>