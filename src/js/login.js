// let aLogin = document.querySelector('.aLogin');
// aLogin.onclick = () => {
// 	alert('aLogin');
// }


let login = document.querySelector('div.login button');
login.onclick = () => {
	let username = document.querySelector('div.login input:nth-of-type(1)').value;
	let password = document.querySelector('div.login input:nth-of-type(2)').value;
	let xhr = new XMLHttpRequest();
	if(login.innerHTML === "登录") {
		xhr.open('post', '../js/api/login.php', true);
	}else {
		xhr.open('post', '../js/api/register.php', true);
	}
	xhr.onreadystatechange = function () {
		if(this.readyState !== 4) {
			return;
		}
		if(this.status >= 200 && this.status < 300) {

			if(this.responseText) {
				document.cookie =`username=${username}`;
				location.href="../index.html?pro=" + `${username}`;
			}

		}
	} 

	xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
	xhr.send(`username=${username}&password=${password}`);
}