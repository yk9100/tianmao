<?php
	include 'connect.php';

	$username = $_POST['username'];


	$sql = "  
		SELECT * FROM `user`
		WHERE `username`='$username'

	";
	//echo $sql;

	$result = $conn->query($sql);

	if($result->num_rows > 0) {
		//echo $sql;
		echo  'true';
	} else {
		echo  'false';
	}

?>