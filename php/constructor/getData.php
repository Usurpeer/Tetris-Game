<?php
// получает количество всех фигур, структуру, id.
require_once('../db_connect.php');
header('Content-Type: application/json');
//////////////////////////////////////////
// запрос количество всех фигур
$sqlCountFigures = "SELECT COUNT(`id`) FROM `figures`";

$data = array();
$result = $conn->query($sqlCountFigures);

while ($row = $result->fetch_array()) {
    array_push($data, $row["COUNT(`id`)"]);
}
//////////////////////////////////////////

// фигура и ее id
$sqlAllFigures = "SELECT `structure`, `level`, `id` FROM `figures` ORDER BY `level`";

$result = $conn->query($sqlAllFigures);

while ($row = $result->fetch_array()) {
    array_push($data, $row["structure"], $row["id"]);
}
//////////////////////////////////////////

print json_encode($data);

?>