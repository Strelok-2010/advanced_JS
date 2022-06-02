// "use strict";

const goods = [
	{ title: 'Shirt', price: 150 },
	{ title: 'Socks', price: 50 },
	{ title: 'Jacket', price: 350 },
	{ title: 'Shoes', price: 250 },
];


const BASE_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GOODS = `${BASE_URL}/catalogData.json`
const CARTS = `${BASE_URL}/getBasket.json`

function service(url) {
	return fetch(url).then((res) => res.json())

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
	list = [];
	filteredItems = [];
	fetchData() {
		return service(GOODS).then((data) => {
			this.list = data;
			this.filteredItems = data;
			return data;
		});
	}

	filter(str) {
		this.filteredItems = this.list.filter(({ product_name }) => {
			return (new RegExp(str, 'i')).test(product_name);
		})
	}

	render() {
		const goodsList = this.filteredItems.map(item => {
			const goodsItem = new GoodsItem(item);
			return goodsItem.render()

		}).join('');
		document.querySelector('.goods-list').innerHTML = goodsList;

	}
}


const goodsList = new GoodsList();
goodsList.fetchData().then(() => {
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
	cartsData() {
		return service(CARTS).then((data) => {             //создание корзины
			this.list = data;
			return (data);
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
	}

	summaList() {
		const summa = cartsList.getCount();
		const cartsItem = new CartsItem();
		const summaBlock = cartsItem.render(summa);                          //посчитаная сумма
		const amount = cartsItem.render(this.list.amount);                          //выведенная сумма из массива

		document.querySelector('.summa').innerHTML = summaBlock;
		document.querySelector('.amount').innerHTML = amount;
	}
}

const cartsList = new CartsList();
cartsList.cartsData().then(() => {
	cartsList.render();
	cartsList.summaList();
})


document.getElementsByClassName('search-button')[0].addEventListener('click', () => {
	const input = document.getElementsByClassName('goods-search')[0];
	debugger
	goodsList.filter(input.value);
	goodsList.render(input.value);
})


