<?php
	include "connect.php";

	$username = $_POST['username'];
	$password = $_POST['password'];

	$sql = "
		SELECT * FROM `user`
		WHERE `username`='$username' AND `password`='$password';
	";

	$result = $conn->query($sql);

	$arr = array();
	if($result->num_rows > 0) {
		// while(($res=$result->fetch_assoc()) !== null) {
		// 	$arr [] = $res;
		// 	//echo json_encode($arr); 
		// }
		echo true;
	} else {
		echo '登录失败';
	}
?>