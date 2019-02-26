<?php
	include 'connect.php';

	$pageNo = $_GET['pageNo'];
	// echo $pageNo;
	$pageCount = $pageNo * 10;

	mysqli_query($conn, 'set names utf8');
	$sql = "
		SELECT * FROM `jilu`
		LIMIT $pageCount, 10;
	";

	$result = $conn->query($sql);
	$arr = array();

	if($result->num_rows > 0) {
		while (($res = $result->fetch_assoc()) !== null) {
			$arr [] = $res;
		}
		echo json_encode($arr);
	} else {
		echo json_encode($arr);
	}

	$conn->close();
?>