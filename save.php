<?php

$user="root";
$pass="";

$success=false;


$templateContent=$_POST["templateContent"];
session_start();
if (isset($_SESSION["username"])){

    $username=$_SESSION["username"];
    session_write_close();
    try{
        $db = new PDO('mysql:host=localhost;dbname=miniwix', $user, $pass);

        //retrieve user id
        $stmt=$db->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->execute(array(
            ":username"=>$username
        ));

        $result=$stmt->fetch(PDO::FETCH_ASSOC);

        if (empty($result)){
            $response["errorMsg"]="Username ".$username." does not exist.";
        }else{

            $userId=$result["ID"];

            
            $stmt=$db->prepare("INSERT INTO templates (TemplatesData, UserID) VALUES (:templates, :id)");
            $stmt->execute(array(
                ":templates"=>$templateContent,
                ":id"=>$userId
            ));

            $success=$stmt->fetch();
        }
    }catch(Exception $e){
        $success=false;
    }
        
}
echo $success;

?>