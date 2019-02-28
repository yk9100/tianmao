//let proArray = JSON.parse(decodeURIComponent(location.search.slice(5)));
//let proArray = decodeURIComponent(location.search.slice(5));
//console.log(proArray);

const getCookie = (key) => {
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



let username = getCookie('username');


if(username !== null && username !== '') {
	//console.log('我是有内容的');
	document.querySelector('nav div.w div.l a:nth-of-type(1)').style.display = 'none';
	document.querySelector('nav div.w div.l span.user').innerHTML = `欢迎，${username}`;
	document.querySelector('.relogin').style.display = 'none';
	document.querySelector('.relogout').style.display = 'inline-block';
	document.querySelector('.relogout').onclick = (e) => {
		//console.log('aa');
		e.preventDefault();
		let xhr = new XMLHttpRequest();
		xhr.open('get', `./js/api/delCookie.php`, true);
		xhr.onreadystatechange = function () {
			if(this.readyState !==4) {
				console.log(this.status);
				return;
			}
			if(this.status >= 200 && this.status < 300) {
				history.go(0);
			}
		}
		xhr.send();
	}
} else {
	document.querySelector('nav div.w div.l a:nth-of-type(1)').style.display = 'inline-block';
	document.querySelector('.relogin').style.display = 'inline-block';
	document.querySelector('.relogout').style.display = 'none';
}

//轮播
let lb = document.querySelectorAll('section#banner ul.slide li');
let stick = document.querySelectorAll('section#banner ul.stick li')
let len = lb.length;
let currentIndex = 0;
const slideTo = (index) => {
	document.querySelector('.sfocus').className = '';
	stick[index].className = 'sfocus';

	document.querySelector('.focus').className = '';
	lb[index].className = 'focus';
}

const slidePrev = () =>{
	currentIndex++;
	if(currentIndex === len) {
		currentIndex = 0;
	}
	slideTo(currentIndex);
}

const autoPlay = () =>{
	setInterval(()=> {
		slidePrev();
	},2000)
}
autoPlay();


//轮播下的小杠杠stick
for(let i = 0; i < stick.length; i++) {
	stick[i].onclick = () => {
		currentIndex = i;
		slideTo(currentIndex);
	}
}


//今日疯抢
let qie = document.querySelectorAll('section.mart div.down div.r ul.qie li');
let huan = document.querySelector('section.mart div.down div.r div.huan img');
//console.log(huan);
let qLen = qie.length;
let qIndex = 0;
let huanMap = [{
	src:"./resource/imgs/m4.jpg"
},{
	src:"./resource/imgs/m5.jpg"
}]

const fq = (index) => {
	document.querySelector('.qfocus').className = '';
	qie[index].className = 'qfocus';
	huan.src = huanMap[index].src;
}

const fqNext = () => {
	qIndex++;
	if(qIndex === qLen) {
		qIndex = 0;
	}
	// console.log(qIndex);
	fq(qIndex);
}

const fqAuto = () => {
	setInterval(() => {
		fqNext();
	},2000);
}
fqAuto();

//返回顶部
let fanhui = document.querySelector('div#lfixed ul li:last-child');
let lfixed = document.querySelector('div#lfixed');
fanhui.onclick = () => {
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
}



//也跟屏幕滚动有点关系
window.onscroll = () => {
	let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	if(scrollTop > 800) {
		lfixed.style.display = 'block';
	} else {
		lfixed.style.display = 'none';
	}

	//判断图片是否应该加载
	if(isNeedLazyLoad()) {
		lazyLoad();
	}
	
}

//判断图片是否应该加载
const isNeedLazyLoad = () => {
	let last = document.querySelector('section.lmart div.w ul li:last-of-type img');
	let top = last.getBoundingClientRect().top;
	if(top < window.innerHeight) {
		return true
	}
	return false;
}

//传说中的懒加载
let start = (new Date()).getTime();
const lazyLoad = () => {
	let now = (new Date()).getTime();
	if((now - start) < 1000) {
		return
	}
	start = now;
	let xhr = new XMLHttpRequest();
	xhr.open('get', './js/json/pro.json', true);
	xhr.onreadystatechange = function () {
		if(this.readyState !== 4) {
			return;
		}
		if(this.status >= 200 && this.status < 300) {
			let data = JSON.parse(this.responseText);
			for(let i = 0; i < data.length; i++) {
				createPro(data[i].src);
			}
		}
	}
	xhr.send();
}

const createPro = (src) => {
	let li = document.createElement('li');
	let liInner = `
		<a href="javascript:;">
												<img src="${src}" alt="">
												<p>妮维雅男士洗面奶控油去黑头洗面奶深层清洁祛痘印青少年学生洁面</p>
												<span>￥35</span>
											</a>
	`;
	li.innerHTML = liInner;
	document.querySelector('section.lmart div.w ul').appendChild(li);
}

