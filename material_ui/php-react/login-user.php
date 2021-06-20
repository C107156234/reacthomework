<?php
// add-user.php is for logining new users into the database.
// Method: POST - http://localhost/php-react/add-user.php
// Required Fields – user_id --> EmpName, user_phone --> JobTitle

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->user_id)
    && isset($data->user_phone)
    && !empty(trim($data->user_id))
    && !empty(trim($data->user_phone))
) {
    $userid = mysqli_real_escape_string($db_connection, trim($data->user_id));
    $userphone = mysqli_real_escape_string($db_connection, trim($data->user_phone));
    $loginUser = mysqli_query($db_connection, "SELECT EmpId, EmpName , DeptName, Jobtitle  FROM employee , dept Where employee.DeptId = dept.DeptId and employee.empId = ('$userid') and employee.Phone =('$userphone')");
    if (mysqli_num_rows($loginUser) > 0) {
        $all_users = mysqli_fetch_all($loginUser, MYSQLI_ASSOC);
        echo json_encode(["success" => 1,  "id" => $all_users],JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(["success" => 0, "msg" => "User Not logined!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>