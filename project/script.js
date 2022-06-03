


const BASE_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GOODS = `${BASE_URL}/catalogData.json`
const CARTS = `${BASE_URL}/getBasket.json`

function service(url) {
	return fetch(url).then((res) => res.json())
}
let app = null

window.onload = () => {

	app = new Vue({
		el: '#root',
		data: {
			items: [],
			itemsCarts: [],
			searchValue: '',
			isVisibleCart: false,
			carts: []
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
		}
	})
}
