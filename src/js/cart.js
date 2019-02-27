// let pro = parseInt(location.search.slice(5));
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

const getCartData = () => {
	let xhr = new XMLHttpRequest();
	xhr.open('post', `../js/api/cart.php`, true);
	xhr.onreadystatechange = function () {
		if(this.readyState !==4) {
			
			return;
		}
		if(this.status >= 200 && this.status < 300) {
			// let data = JSON.parse(`'${this.responseText}'`);
			let data = 	JSON.parse(this.responseText);
			for(let i = 0; i < data.length; i++) {
				createTr(data[i]);
			}
				build();
				totalPrice();

			
		}
	}
	xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
	xhr.send(`username=${username}`);
}
getCartData();


const createTr = (data) => {
	let tr = document.createElement('tr');
	let trInner = `
		<td><input type="checkbox" class="option" checked/>图片</td>
						<td class="detail">${data.detail}</td>
						<td class="price">${data.price}</td>
						<td class="cz"><span class="jian">-</span><input class="count" value="${data.count}" /><span class="jia">+</span></td>
						<td class="total">${data.price*data.count}</td>
						<td class="del">删除</td>
	`;
	tr.innerHTML = trInner;
	tr.className = 'item select';
	document.querySelector('tbody').appendChild(tr);
}

const build = () => {
	let $all = $('.all');
$all.click(function () {
	$('.option').prop('checked', this.checked);
	if(($(this).prop('checked')) === true) {
		$('.option').parents('tr').addClass('select');
	} else {
		$('.option').parents('tr').removeClass('select');
	}
	totalPrice();

});

$('.option').click(function () {
	let allLen = $('.option').length;
	let checkedLen = $('.option:checked').length;
	$all.prop('checked', allLen === checkedLen);

	//console.log($(this).prop('checked'));
	if(($(this).prop('checked')) === true) {
		$(this).parents('tr').addClass('select');
	} else {
		$(this).parents('tr').removeClass('select');
	}

	totalPrice();
});

$('.jia').click(function () {
	//console.log($(this).prev().val());
	let count = parseInt($(this).prev().val())+1
	$(this).prev().val(count);
	let price = parseInt($(this).parent().prev().html());
	// console.log('count',count);
	// console.log('price',price);
	$(this).parent().next().html(count*price);

	totalPrice();
});

$('.jian').click(function () {
	//console.log($(this).prev().val());
	let count = parseInt($(this).next().val());
	// console.log(count);
	let price = parseInt($(this).parent().prev().html());
	count--;
	if(count < 1) {
		count = 1;
	}
	$(this).next().val(count);
	$(this).parent().next().html(count*price);

	totalPrice();
});

	$('.del').click(function () {
		let detail = $(this).siblings('.detail').html();
		//console.log(detail);
		let count = parseInt($(this).siblings('.cz').find('input').val());
		let xhr = new XMLHttpRequest();

		xhr.open('post', `../js/api/delcart.php`, true);
		xhr.onreadystatechange = function () {
			if(this.readyState !==4) {
				
				return;
			}
			if(this.status >= 200 && this.status < 300) {
				// let data = JSON.parse(`'${this.responseText}'`);
				history.go(0);
			}
		}
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		xhr.send(`username=${username}&count=${count}&detail=${detail}`);

	});

}



const totalPrice = () => {
	let selectTr = document.querySelectorAll('main div.w table tr.select');
	let count = 0; 
	let total = 0;
	for(let i = 0; i < selectTr.length; i++) {
		count += parseInt(selectTr[i].querySelector('.count').value);
		total += parseInt(selectTr[i].querySelector('.total').innerHTML);
	}
	document.querySelector('.con').innerHTML = count;
	document.querySelector('.tot').innerHTML = total;
}

window.onload = () => {
	totalPrice();
}