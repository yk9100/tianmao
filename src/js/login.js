// let aLogin = document.querySelector('.aLogin');
// aLogin.onclick = () => {
// 	alert('aLogin');
// }


let login = document.querySelector('div.login button');
login.onclick = () => {
	let xhr = new XMLHttpRequest();
	xhr.open('post', '../js/api/login.php', true);
	xhr.onreadystatechange = function () {
		if(this.readyState !== 4) {
			return;
		}
		if(this.status >= 200 && this.status < 300) {

			console.log(this.responseText);
		}
	} 
	let username = document.querySelector('div.login input:nth-of-type(1)').value;
	let password = document.querySelector('div.login input:nth-of-type(2)').value;
	xhr.setRequestHeader('content-type', 'application/www-x-form-urlencoded');
	xhr.send(`username=${username}&password=${password}`);
}