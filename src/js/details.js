const myCookie = (key) => {
	let cookie = document.cookie;
	let arr = cookie.split('; ');
	let value;
	for(let i = 0; i < arr.length; i++) {
		value = arr[i].split('=');
		if( value[0] === key) {
			return value[1];
		} else {
			return null;
		}
	}
}

let username = myCookie('username');
if(username !== null && username !== '') {
	//console.log('我是有内容的');
	document.querySelector('nav div.w div.l a:nth-of-type(1)').style.display = 'none';
	document.querySelector('nav div.w div.l span.user').innerHTML = `欢迎，${username}`;
} else {
	document.querySelector('nav div.w div.l a:nth-of-type(1)').style.display = 'inline-block';
}


let slide = document.querySelector('section#fangd div.w div.left div.slide');
let box = document.querySelector('section#fangd div.w div.left div.small');
let big = document.querySelector('section#fangd div.w div.left div.big');
let slideW;
let boxW = box.offsetWidth;
let boxH = box.offsetHeight;
box.onmouseover = (e) => {
	big.style.display = 'block';
	slide.style.display = 'block';
	slideW = slide.offsetWidth;
}
box.onmousemove = (e) => {
	let left = e.offsetX - slideW / 2;
	let top = e.offsetY - slideW /2;
	if(left < 0) {
		left = 0;
	}
	if(top < 0) {
		top = 0;
	}
	if(e.offsetX > (boxW - slideW / 2)) {
		left = boxW - slideW ;
		//console.log(left)
	}
	if(e.offsetY > (boxH - slideW / 2)) {
		top = boxH - slideW ;
	}

	let bLeft = 2.5 * -left;
	let bTop = 2.5 * -top;
	big.style.backgroundPosition = `${bLeft}px ${bTop}px`;

	slide.style.left = left  + 'px';
	slide.style.top = top  + 'px';

}
box.onmouseout = () => {
	big.style.display = 'none';
	slide.style.display = 'none';
}

let lis = document.querySelectorAll('section#fangd div.w div.left ul li');
for(let i = 0 ; i < lis.length; i++) {
	lis[i].onmouseover = function () {
		document.querySelector('.fdfocus').className = '';
		this.className = 'fdfocus';
		box.querySelector('img').src = `../resource/imgs/fdn${i+1}.jpg`;
		big.style.background = `url("../resource/imgs/fdg${i+1}.jpg")`;
	}
}

let jian = document.querySelector('.jian');
let jia = document.querySelector('.jia')
let count = document.querySelector('.count').value;
jia.onclick = () => {
	count++;
	document.querySelector('.count').value = count;
}
jian.onclick = () => {
	count--;
	if(count < 1) {
		count=1;
	}
	document.querySelector('.count').value = count;
}

let canshu = document.querySelectorAll('main div.middle ul.canshu li');
for(let i = 0; i < canshu.length; i++) {
	canshu[i].onclick = function () {
		document.querySelector('.csfocus').className = '';
		// console.log(this);
		this.className = 'csfocus';
	}
}

//加载用户评论
let pageNo = 1;

	let xhr = new XMLHttpRequest();
	let xhr2 = new XMLHttpRequest();
	xhr2.open('get', `../js/api/page.php`, true);
	xhr2.onreadystatechange = function () {
		if(this.readyState !==4) {
			
			return;
		}
		if(this.status >= 200 && this.status < 300) {
			let page = Math.floor(this.responseText/10);
			for(let i = 1; i <= page; i++) {
				createLi(i);
			}
		}
	}
	xhr2.send();

	xhr.open('get', `../js/api/pinglun.php?pageNo=${pageNo}`, true);
	xhr.onreadystatechange = function () {
		if(this.readyState !==4) {
			return;
		}
		if(this.status >= 200 && this.status < 300) {
			//console.log(this.responseText);
			let data = JSON.parse(this.responseText);
			//console.log(data);
			for(let i = 0; i < data.length; i++) {
				createTr(data[i]);
			}
		}
	}
	xhr.send();


const createTr = (data) => {
	let tr = document.createElement('tr');
	let trInner = `
		<td class="first">
							<div class="text">${data.detail}</div>
							<div class="photo"></div>
							<div class="data">${data.data}</div>
		</td>
		<td class="middle">
							<p>颜色:<span>${data.color}</span></p>
							<p>尺码:<span>${data.size}</span></p>
		</td>
		<td class="last">
							<p>${data.user}</p>
		</td>
	`
	tr.innerHTML = trInner;
	document.querySelector('tbody').appendChild(tr);
}
const createLi = (index) => {
	let li = document.createElement('li');
	li.innerHTML = index;
	document.querySelector('main div.middle ul.page').appendChild(li);
}

//传递数据到购物车界面
document.querySelector('.cart').onclick = function () {
	let count = document.querySelector('.count').value;

	let xhr = new XMLHttpRequest();
	xhr.open('post', `../js/api/addcart.php`, true);
	xhr.onreadystatechange = function () {
		if(this.readyState !==4) {
			
			return;
		}
		if(this.status >= 200 && this.status < 300) {
			// let data = JSON.parse(`'${this.responseText}'`);
			console.log(this.responseText);
			// location.href="../html/cart.html";
		}
	}
	xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
	xhr.send(`username=${username}&count=${count}`);
}



//分页
window.onload = function () {
	//alert('页面加载完了');
let page = document.querySelectorAll('main div.middle ul.page li');

for(let i = 0; i < page.length; i++) {
	page[i].onclick = function () {

		let xhr = new XMLHttpRequest();
		xhr.open('get', `../js/api/pinglun.php?pageNo=${i}`, true);
		xhr.onreadystatechange = function () {
			if(this.readyState !==4) {
				return;
			}
			if(this.status >= 200 && this.status < 300) {
				document.querySelector('tbody').innerHTML = '';
				let data = JSON.parse(this.responseText);
				for(let i = 0; i < data.length; i++) {
					createTr(data[i]);
				}
			}
		}
		xhr.send();
	}
}
}