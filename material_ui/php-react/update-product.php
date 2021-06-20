<?php
// update-user.php is for updating an existing user.
// Method: POST - http://localhost/php-react/update-user.php
// Required Fields: id --> EmpId, user_name --> EmpName, user_email --> JobTitle

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->Product_ID)
    && isset($data->Product_Name)
    && isset($data->Product_UnitPrice)
    && isset($data->Product_Cost)
    && !empty(trim($data->Product_Name))
    && !empty(trim($data->Product_UnitPrice))
    && !empty(trim($data->Product_Cost))
) {
    $ProductName = mysqli_real_escape_string($db_connection, trim($data->Product_Name));
    $ProductId = mysqli_real_escape_string($db_connection, trim($data->Product_ID));
    $ProductUnitprice = mysqli_real_escape_string($db_connection, trim($data->Product_UnitPrice));
    $ProductCost = mysqli_real_escape_string($db_connection, trim($data->Product_Cost));
    $updateProduct = mysqli_query($db_connection, "UPDATE `product` SET `ProdName`='$ProductName', `Unitprice`='$ProductUnitprice', `Cost` = '$ProductCost' WHERE `ProdID`='$ProductId'");
    if ($updateProduct) {
        echo json_encode(["success" => 1, "msg" => "Product Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Product Not Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>