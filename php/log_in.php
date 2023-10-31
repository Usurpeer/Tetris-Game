<?php
require_once('db_connect.php');


$login = $_POST['login'];
$password = $_POST['password'];

if(strlen($login) < 4 || strlen($login) > 12){
    echo'Недопустимая длина логина';
}
else if(strlen($password) < 4 || strlen($password) > 12){
    echo'Недопустимая длина пароля';
}
else{
    //запрос к бд
    $password = md5($password);
    $sql = "SELECT * FROM `users` WHERE login = '$login' AND password = '$password'";
    $result = $conn -> query($sql);

    if($result -> num_rows > 0){
        $user_role = ($result -> fetch_assoc())['user_role'];
        if($user_role == 0){
            setcookie('role', 0, 0,"/");
            setcookie('login', $login, 0,"/");
            header("Location: ..\pages\player_menu_2.html", true, 302);
            die();
        } 
        else if($user_role == '1'){
            setcookie('role', 1, 0,"/");
            setcookie('login', $login, 0,"/");
            header("Location: ..\pages\admin_menu.html");
            die();
        }
        
    }
    else{
        echo 'Неверный логин или пароль';
    }
}

?>