<?php
// add-Product.php is for inserting new Products into the database.
// Method: POST - http://localhost/php-react/add-Product.php
// Required Fields – Product_name --> EmpName, Product_email --> JobTitle

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
    isset($data->Product_Name)
    && isset($data->Product_ID)
    && !empty(trim($data->Product_Name))
    && !empty(trim($data->Product_ID))
) {
    $Productname = mysqli_real_escape_string($db_connection, trim($data->Product_Name));
    $ProdID = mysqli_real_escape_string($db_connection, trim($data->Product_ID));
    $UnitPrice = mysqli_real_escape_string($db_connection, trim($data->Product_UnitPrice));
    $Cost = mysqli_real_escape_string($db_connection, trim($data->Product_Cost));
    $insertProduct = mysqli_query($db_connection, "INSERT INTO `product`(`ProdName`,`ProdID`,`UnitPrice`,`Cost`) VALUES('$Productname','$ProdID','$UnitPrice','$Cost ')");
    if ($insertProduct) {
        $last_id = mysqli_insert_id($db_connection);
        echo json_encode(["success" => 1, "msg" => "Product Inserted.", "id" => $last_id]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Product Not Inserted!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>