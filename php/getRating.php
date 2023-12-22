<?php
require_once('db_connect.php');
header('Content-Type: application/json');

//////////////////////////////////////////
$sqlCountFigures = "SELECT COUNT(`id`) FROM `users` WHERE `user_role`=0 ORDER BY `ratingScore` DESC LIMIT 10";
$data = array();
$result = $conn->query($sqlCountFigures);

while ($row = $result->fetch_array()) {
    if ($row["COUNT(`id`)"] > 10) {
        $row["COUNT(`id`)"] = 10;
    }
    array_push($data, $row["COUNT(`id`)"]);
}

// запрос количество фигур на все три уровня
$sqlCountFigures = "SELECT * FROM `users` WHERE `user_role`=0 ORDER BY `ratingScore` DESC LIMIT 10";

$result = $conn->query($sqlCountFigures);

while ($row = $result->fetch_array()) {
    array_push($data, $row["login"], $row["ratingScore"]);
}
//////////////////////////////////////////
$sqlCountFigures = "SELECT COUNT(`id`) FROM `users` WHERE `user_role`=0 ORDER BY `ratingScore` DESC LIMIT 10";
$result = $conn->query($sqlCountFigures);

while ($row = $result->fetch_array()) {
    array_push($data, $row["COUNT(`id`)"]);
}
// фигура и ее принадлежность к уровню
$sqlAllFigures = "SELECT * FROM `users` WHERE `user_role`=0 ORDER BY `ratingTime` DESC LIMIT 10";

$result = $conn->query($sqlAllFigures);

while ($row = $result->fetch_array()) {
    array_push($data, $row["login"], $row["ratingTime"]);
}
//////////////////////////////////////////


print json_encode($data);

?>