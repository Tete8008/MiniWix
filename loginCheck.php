<?php
    $user="root";
    $pass="";

    $response=array(
        "connected"=>false,
        "templates"=>array(),
        "errorMsg"=>""
    );


    if (isset($_POST["username"]) && isset($_POST["password"])){
        $username=$_POST["username"];
        $password=$_POST["password"];

        try{
            $db = new PDO('mysql:host=localhost;dbname=miniwix', $user, $pass);

            $stmt=$db->prepare("SELECT * FROM users WHERE username = :username");
            $stmt->execute(array(
                ":username"=>$username
            ));
    
            $result=$stmt->fetch(PDO::FETCH_ASSOC);
    
            if (empty($result)){
                $response["errorMsg"]="Username ".$username." does not exist.";
            }else{
                //passwords are hashed in the data base, so we just compare the hash of the password filled in with the stored password.
                if (hash("md5",$password) == $result["Password"]){
                    
                    $response["connected"]=true;
                    session_start();
                    $_SESSION["connected"]=true;
                    $_SESSION["username"]=$username;
                    session_write_close();
                    
                    $userId=$result["ID"];
                    //get the templates from the templates table with the id from the users table
                    $stmt=$db->prepare("SELECT TemplatesData, ID FROM templates WHERE UserID = :id");
                    $stmt->execute(array(
                        ":id"=>$userId
                    ));
                    $result=$stmt->fetchAll(PDO::FETCH_ASSOC);
                    $response["templates"]=$result;

                    //update the lastLoginDate
                    //actually doesn't seem to update the date for some obscure reason
                    $stmt=$db->prepare("UPDATE users SET LastLoginDate = :logindate WHERE ID = :id");
                    $stmt->execute(array(
                        ":logindate"=>date ("Y-m-d H:i:s"),
                        ":id"=>$userId
                    ));

                }else{
                    $response["errorMsg"]="Incorrect password";
                }
            }
        }catch(Exception $e){
            $response["errorMsg"]="Could not reach the database. Please try again later or contact the webmaster.";
        }
        
        echo json_encode($response);

    }



?>