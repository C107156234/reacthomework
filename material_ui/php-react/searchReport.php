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
    isset($data->startDate)
    && isset($data->lastDate)
    && !empty(trim($data->startDate))
    && !empty(trim($data->lastDate))
) {
    $startDate = mysqli_real_escape_string($db_connection, trim($data->startDate));
    $lastDate = mysqli_real_escape_string($db_connection, trim($data->lastDate));
    $loginUser = mysqli_query($db_connection, "SELECT salesorder.OrderDate, salesorder.OrderId, customer.CustName,employee.EmpName, round(sum(orderdetail.Qty*product.UnitPrice*orderdetail.Discount),0) as money, round(sum(orderdetail.Qty*(product.UnitPrice*orderdetail.Discount - product.Cost)),0) as profit
    FROM employee, salesorder, orderdetail, product, customer
    WHERE salesorder.EmpId = employee.EmpId
    and salesorder.CustId = customer.CustId
    and salesorder.seq = orderdetail.seq
    and orderdetail.ProdId = product.ProdID
    and salesorder.OrderDate BETWEEN '$startDate' and '$lastDate'
    GROUP by salesorder.OrderId");
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