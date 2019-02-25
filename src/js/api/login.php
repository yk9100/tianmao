<?php
	include "connect.php";

	$username = $_POST['username'];
	$password = $_POST['password'];

	$sql = "
		SELECT * FROM 'user'
		WHERE 'username'=$username AND 'password'=$password
	";

	$result = $conn->query($sql);

	if($result->num_rows > 0) {
		echo '登录成功'
	} else {
		echo '登录失败'
	}
?>