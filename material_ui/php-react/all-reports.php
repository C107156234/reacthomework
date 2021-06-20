<?php
// all-users.php is to fetch all users that exist in the database.
// Method: GET - http://localhost/php-react/all-users.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$allUsers = mysqli_query($db_connection, "SELECT salesorder.OrderDate, salesorder.OrderId, customer.CustName,employee.EmpName, round(sum(orderdetail.Qty*product.UnitPrice*(CAST(orderdetail.Discount AS decimal(9,2)))),0) as money, round(sum(orderdetail.Qty*(product.UnitPrice*(CAST(orderdetail.Discount AS decimal(9,2))) - product.Cost)),0) as profit
FROM employee, salesorder, orderdetail, product, customer
WHERE salesorder.EmpId = employee.EmpId
and salesorder.CustId = customer.CustId
and salesorder.OrderId = orderdetail.OrderId
and orderdetail.ProdId = product.ProdID
GROUP by salesorder.OrderId");
if (mysqli_num_rows($allUsers) > 0) {
    $all_users = mysqli_fetch_all($allUsers, MYSQLI_ASSOC);
    // json_encode([],JSON_UNESCAPED_UNICODE) 參數一定要加才會正確顯示中文
    echo json_encode(["success" => 1, "reports" => $all_users], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["success" => 0]);
}
?>
