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