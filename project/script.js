


const BASE_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GOODS = `${BASE_URL}/catalogData.json`
const CARTS = `${BASE_URL}/getBasket.json`

function service(url) {
	return fetch(url).then((res) => res.json())
}
let app = null

window.onload = () => {
	Vue.component('custom_input', {
		model: {
			prop: 'entry',
			event: 'change'
		},
		props: {
			entry: String
		},
		template: `
		<input
			type="text" 
			class="goods-search"
			v-bind:entry="entry"
			v-on:change="$emit('change', $event.target.value)"
		/>
		`
	})
	Vue.component('custom_button', {
		template: `
		<button class="cart-button" type="button" @click="$emit('click')">
			<slot></slot>
		</button>
		`
	})
	Vue.component('good', {
		props: [
			'item'
		],
		template: `
			<div class="goods-item">
				<h3>{{ item.product_name }}</h3>
				<p>{{ item.price }}</p>
			</div>
			`
	})
	Vue.component('snackbar', {
		props: [
			'error',
			'snack'
		],
		template: `
		<div class="bug">
			<div class="error">{{error}}</div>
			<custom_button @click="snack">Close</custom_button>
		</div>
			`
	})



	app = new Vue({
		el: '#root',
		data: {
			items: [],
			itemsCarts: [],
			searchValue: '',
			isVisibleCart: false,
			snackbar: false,
			errorMessage: ''
		},
		methods: {
			fetchGoods() {
				service(GOODS).then((data) => {
					this.items = data;
				});
			},
			fetchCarts() {
				service(CARTS).then((data) => {
					this.itemsCarts = data;
				});
			},
			visiblCart() {
				if (this.isVisibleCart == true) {
					this.isVisibleCart = false;
				}
				else {
					this.isVisibleCart = true;
				}
			},
			visiblBug() {
				this.snackbar = !this.snackbar
			},
			timeVisiblBug() {
				this.snackbar = !this.snackbar;
				setTimeout(() => {
					this.snackbar = false;
				}, "3000")
			}
		},
		computed: {
			calculatePrice() {
				return this.filteredItems.reduce((prev, { price }) => {
					return prev + price;
				}, 0)
			},
			filteredItems() {
				return this.items.filter(({ product_name }) => {
					return product_name.match(new RegExp(this.searchValue, 'gui'))
				})
			}
		},
		mounted() {
			this.fetchGoods();
			this.fetchCarts()
		},

		created() {
			fetch("https://api.npms.io/v2/invalid-url")
				.then(async response => {
					const data = await response.json();
					if (!response.ok) {
						const error = (data && data.message + response.status) || response.statusText;
						return Promise.reject(error);
					}
					this.totalVuePackages = data.total;
				})
				.catch(error => {
					this.errorMessage = error;
					this.timeVisiblBug();
				});
		}
	})
}
