<?php
	include 'connect.php';
	$username = $_POST['username'];
	$count = $_POST['count'];
	$detail = $_POST['detail'];

	mysqli_query($conn, 'set names utf8');

	$sql = "  
		DELETE FROM `cart`
		WHERE `username`='$username' AND `count`='$count' AND `detail`='$detail'
	";

	echo $sql;

	$result = $conn->query($sql);

	

	$conn->close();

?>