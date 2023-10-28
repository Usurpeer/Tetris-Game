<?php
require_once('db_connect.php');
die("Текст");


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
    $sql = "SELECT * FROM `users` WHERE login = '$login' AND password = '$password'";
    $result = $conn -> query($sql);

    if($result -> num_rows > 0){
        $user_role = ($result -> fetch_assoc())['user_role'];
        if($user_role == 0){
            header("Location: ..\pages\player_menu_2.html", true, 302);
        } 
        else if($user_role == '1'){
            header("Location: ..\pages\admin_menu.html");
        }
        
    }
    else{
        echo 'Пользователь не найден.';
    }
}


//$conn -> query($sql);
?>