<?php
	include 'connect.php';
	$username = $_POST['username'];

	mysqli_query($conn, 'set names utf8');

	$sql = "  
		SELECT * FROM `cart`
		WHERE `username` = '$username';
	";

	$result = $conn->query($sql);

	$arr = array();
	if($result->num_rows > 0) {
		while (($res = $result->fetch_assoc()) !==null) {
			$arr [] = $res;	
		}
		echo json_encode($arr);
	} else {
		echo json_encode($arr);
	}

	$conn->close();
?>