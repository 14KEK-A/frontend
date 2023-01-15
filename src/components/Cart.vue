<template>
  <div class="box">
    <span v-if="!hasProduct()">No products :/</span>
    <div v-for="(product, index) in getProductsInCart" :key="index" class="box-item">
      <img alt="" class="item-thumb" :src="product.image" />
      <h3 class="item-name">{{ product.name }}</h3>
      <span class="item-amount">Amount: 1</span>
      <span class="item-price">R$ {{ product.price }}, 00</span>
    </div>
    <div v-if="hasProduct()" class="cart-info">
      <span>Total: R$ {{ totalPrice() }}, 00</span>
      <router-link to="/checkout">
        <btn btn-color="btn btn-small btn-info" @click="showPopupCart()">View cart</btn>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import btn from "./Btn";

  export default {
    components: {
      btn,
    },
    methods: {
      ...mapActions(["showOrHiddenPopupCart"]),
      hasProduct() {
        return this.getProductsInCart.length > 0;
      },
      totalPrice() {
        return this.getProductsInCart.reduce((current, next) => current + next.price, 0);
      },
      showPopupCart() {
        this.showOrHiddenPopupCart();
      },
    },
    computed: {
      ...mapGetters(["getProductsInCart"]),
    },
  };
</script>

<style scoped>
  .box {
    width: 400px;
    height: auto;
    background-color: #fafafa;
    box-shadow: 0px 0px 10px rgba(73, 74, 78, 0.1);
    border-radius: 5px;
    box-sizing: border-box;
    padding: 1em 0.5em;
    position: absolute;
    z-index: 1;
  }

  .box:after {
    content: "";
    width: 30px;
    height: 30px;
    transform: rotate(45deg);
    background: inherit;
    position: absolute;
    top: -15px;
    right: 15px;
  }

  .box-item {
    width: 100%;
    height: 130px;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 0 0.5em;
    margin-top: 0.3em;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  .item-thumb {
    max-width: 70%;
    grid-column: 1/2;
    grid-row: 1/4;
    align-self: center;
  }

  .item-name {
    grid-column: 2/4;
    grid-row: 1/2;
    font-weight: normal;
  }

  .item-amount {
    grid-column: 2/3;
    grid-row: 2/4;
    color: #ddd;
  }

  .cart-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
