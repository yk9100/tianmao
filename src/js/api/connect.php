<?php
	$server = "localhost";
	$db_user = "root";
	$db_pwd = "";
	$db_name = "tianmao";

	$conn = new mysqli($server,$db_user,$db_pwd,$db_name);

	if($conn->connect_error) {
		echo '连接失败'. $conn->connect_error;
	}
?>