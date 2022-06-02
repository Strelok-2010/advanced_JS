// "use strict";

const BASE_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GOODS = `${BASE_URL}/catalogData.json`
const CARTS = `${BASE_URL}/getBasket.json`

function service(url, callback) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	const loadHandler = () => {
		callback(JSON.parse(xhr.response));
	}
	xhr.onload = loadHandler;
	xhr.send();
}

class GoodsItem {
	constructor({ product_name = "Продукт не опознан", price = "Уточните цену" }) {
		this.title = product_name;
		this.price = price;
	}
	render() {
		return `
		     <div class="goods-item">
		 		<img class="img-tovar" src="img/tovar.jpg" alt="Товар">
		 		<h3>Название: ${this.title}</h3>
		    	<p>Цена: ${this.price}</p>
		     </div>
		`
	}
}

class GoodsList {
	fetchData(callback) {
		service(GOODS, (data) => {
			this.list = data;
			callback();
		});
	}

	render() {
		const goodsList = this.list.map(item => {
			const goodsItem = new GoodsItem(item);
			return goodsItem.render()

		}).join('');
		document.querySelector('.goods-list').innerHTML = goodsList;

	}
}






const goodsList = new GoodsList();
goodsList.fetchData(() => {
	goodsList.render();
})







// корзина

class CartsItem {
	render(size) {
		return `
    <div class="goods-item">
		<h3>Общая сумма заказа ${size}</h3>
    </div>
  `;
	}
}

class CartsList {
	cartsData(callback) {
		service(CARTS, (data) => {             //создание корзины
			this.list = data;
			callback();
		});
	}

	getCount() {
		return this.list.contents.reduce((prev, { price }) => {           //Сумма Прайса
			return prev + price;

		}, 0)
	}

	render() {
		const cartsMap = this.list.contents.map(item => {
			const goodsItem = new GoodsItem(item);
			return goodsItem.render()
		}).join('');
		document.querySelector('.carts').innerHTML = cartsMap;
		const summa = cartsList.getCount();
		const cartsItem = new CartsItem();
		const summaBlock = cartsItem.render(summa);                          //посчитаная сумма
		const amount = cartsItem.render(this.list.amount);                          //выведенная сумма из массива

		document.querySelector('.summa').innerHTML = summaBlock;
		document.querySelector('.amount').innerHTML = amount;
	}
}

const cartsList = new CartsList();
cartsList.cartsData(() => {
	cartsList.render();

})