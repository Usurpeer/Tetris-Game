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


}


?>