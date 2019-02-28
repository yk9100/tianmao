document.querySelector('.username').onkeyup = function () {
	let username = this.value;
	//console.log(username);
	let xhr = new XMLHttpRequest();
	xhr.open('post', '../js/api/reject.php', true);
	xhr.onreadystatechange = function () {
		if(this.readyState !== 4) {
			return;
		}
		if(this.status >= 200 && this.status < 300) {

			if(this.responseText === 'true') {
				alert('用户名已存在');
				return;
			} 
			//console.log(this.responseText);
		}
	} 

	xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
	xhr.send(`username=${username}`);
}