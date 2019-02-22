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