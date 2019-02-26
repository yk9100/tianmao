<?php
	include 'connect.php';

	
	$sql = "
		SELECT * FROM `jilu`;
		
	";

	$result = $conn->query($sql);
	

	if($result->num_rows > 0) {
		echo $result->num_rows;
	} else {
	}

	$conn->close();
?>