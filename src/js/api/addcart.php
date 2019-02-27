<?php
	include 'connect.php';
	$username = $_POST['username'];
	$count = $_POST['count'];

	mysqli_query($conn, 'set names utf8');

	$sql = "  
		INSERT INTO `cart`
		(`username`, `detail`, `count`, `price`)
		VALUES
		('$username', '圆领毛衣a', $count, 369);
	";

	echo $sql;

	$result = $conn->query($sql);

	

	$conn->close();
?>