<?php
	include "connect.php";

	$username = $_POST['username'];
	$password = $_POST['password'];

	$sql = "
		INSERT INTO `user`(`username`, `password`)
		VALUES ('$username', '$password')
		
	";

	$result = $conn->query($sql);

	if($result) {
		echo '注册成功';
	} else {
		echo '注册失败';
	}
?>