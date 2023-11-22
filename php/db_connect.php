<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "TetrisGame";

$conn = mysqli_connect($servername, $username, $password, $dbname);


if (!$conn)
    die("Connection to DB failed!" . mysqli_connect_error());
else {

}
?>