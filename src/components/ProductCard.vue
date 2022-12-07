<template>
  <b-card
    class="overflow-hidden product-card pink-background"
    no-body
    style="max-width: 580px; margin: 1rem"
  >
    <b-row no-gutters>
      <b-col class="d-flex align-items-center" md="6">
        <b-card-img alt="Image" class="rounded-0 product-img" :src="product.image"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body>
          <b-card-text>
            {{ product.category }}
          </b-card-text>
          <b-card-title title-tag="h4">{{ product.name }}</b-card-title>
          <b-card-title title-tag="h1">${{ price }}</b-card-title>
          <b-card-text>
            {{ product.description }}
          </b-card-text>
          <b-form-rating
            id="rating-10"
            class="rating"
            no-border
            readonly
            size="sm"
            :stars="5"
            :value="product.rating"
          ></b-form-rating>
        </b-card-body>
      </b-col>
      <b-col md="7">
        <b-form-radio-group
          v-model="selectedSize"
          :button-variant="product.color === 'pink' ? 'secondary' : 'primary'"
          buttons
          class="general"
          :options="product.sizes"
        ></b-form-radio-group>
      </b-col>
      <b-col class="mt" md="5">
        <b-button
          class="btn-add"
          :class="product.color === 'pink' ? 'pink-button-color' : 'blue-button-color'"
          @click="addToChart"
        >
          ADD TO BASKET
        </b-button>
        <div class="count-box">
          <b-form-select
            v-model="selectedCount"
            class="select-count"
            :options="countOptions"
            size="sm"
          ></b-form-select>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
  export default {
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        selectedSize: this.product.sizes[0].value, // Choosen size.
        selectedCount: 1, // Choosen piece.
        countOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Numbers of piece.
      };
    },
    computed: {
      // Calculate shoe' s price with product price, index of selectedSize at sizes array of product and selectedCount.
      price() {
        let indexOfSize = this.product.sizes.map((item) => item.value).indexOf(this.selectedSize);
        if (indexOfSize === -1) {
          indexOfSize = 0;
        }
        return (this.product.price + indexOfSize * 10) * this.selectedCount;
      },
    },
    methods: {
      // Emit a new product or updated product.
      addToChart() {
        let indexOfSize = this.product.sizes.map((item) => item.value).indexOf(this.selectedSize);
        let newProduct = {
          id: this.product.id,
          name: this.product.name,
          sizes: [
            {
              number: parseInt(this.selectedSize),
              piece: parseInt(this.selectedCount),
            },
          ],
          price: (this.product.price + indexOfSize * 10) * this.selectedCount,
          piece: this.selectedCount,
          image: this.product.image,
        };
        this.$emit("add-to-chart", newProduct);
        this.resetSelections();
      },
      // Given first valeus to selectCount and selectedSize.
      resetSelections() {
        this.selectedCount = 1;
        this.selectedSize = this.product.sizes[0].value;
      },
    },
  };
</script>

<style>
  .product-card {
    padding: 1rem;
    border: 1px solid #888888 !important;
    box-shadow: 0px 0px 5px #888888;
  }
  .product-img:hover {
    transform: scale(1.1);
  }
  .select-count {
    margin-left: 5px;
    border: none;
    outline: none;
    background: transparent;
  }
  .general {
    position: relative;
    gap: 5px;
  }
  .general label {
    background: transparent;
    color: black;
  }
  .general label input {
    visibility: hidden !important;
    position: absolute !important;
  }
</style>
