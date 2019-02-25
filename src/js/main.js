//let proArray = JSON.parse(decodeURIComponent(location.search.slice(5)));
let proArray = decodeURIComponent(location.search.slice(5));
//console.log(proArray);
if(proArray !== null && proArray !== '') {
	//console.log('我是有内容的');
	document.querySelector('nav div.w div.l a:nth-of-type(1)').style.display = 'none';
	document.querySelector('nav div.w div.l span.user').innerHTML = `欢迎，${proArray}`;
} else {
	document.querySelector('nav div.w div.l a:nth-of-type(1)').style.display = 'inline-block';
}

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


//今日疯抢
let qie = document.querySelectorAll('section.mart div.down div.r ul.qie li');
let huan = document.querySelector('section.mart div.down div.r div.huan img');
console.log(huan);
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
window.onscroll = () => {
	let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	if(scrollTop > 800) {
		lfixed.style.display = 'block';
	} else {
		lfixed.style.display = 'none';
	}
}

