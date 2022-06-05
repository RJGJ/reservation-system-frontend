<template>
  <section class="p-5">
    <div class="container">
      <h2 class="pb-5">Checkout</h2>

      <div class="row">
        <div class="col">
          <form class="text-start" @submit.prevent="pay">
            <h3>Billing Details</h3>

            <div class="row">
              <div class="col">
                <div class="pb-3">
                  <label for="f-name">First Name:</label>
                  <input type="text" name="f-name" id="f-name" class="form-control" />
                </div>
              </div>
              <div class="col">
                <div class="pb-3">
                  <label for="l-name">Last Name:</label>
                  <input type="text" name="l-name" id="l-name" class="form-control" />
                </div>
              </div>
            </div>

            <div class="pb-3">
              <label for="address">Adress:</label>
              <input type="text" name="adress" id="address" class="form-control" />
            </div>

            <div class="pb-3">
              <label for="phone">Phone Number:</label>
              <input type="text" name="phone" id="phone" class="form-control" />
            </div>

            <div class="pb-3">
              <label for="email">Email Address:</label>
              <input type="email" name="email" id="email" class="form-control" />
            </div>

            <div class="pb-3">
              <label for="notes">Order notes:</label>
              <textarea name="notes" id="notes" class="form-control"></textarea>
            </div>

            <StripeElements
              v-if="stripeLoaded"
              v-slot="{ elements, instance }"
              ref="elms"
              :stripe-key="stripeKey"
              :instance-options="instanceOptions"
              :elements-options="{
                appearance: {
                  theme: 'stripe',
                },
              }"
              class="form-conttrol pb-3"
            >
              <StripeElement ref="card" :elements="elements" :options="cardOptions" />
            </StripeElements>
            <input type="submit" value="Place Order" class="btn btn-primary" />
          </form>
        </div>
        <div class="col">
          <h3>Oder Details</h3>
          <!-- <StripeCheckout /> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// import { StripeCheckout } from "@vue-stripe/vue-stripe";
import { loadStripe } from "@stripe/stripe-js";
import { ref, onBeforeMount } from "vue";
import { StripeElement, StripeElements } from "vue-stripe-js";
import { STRIPE_KEY } from "../config";

const stripeLoaded = ref(false);
const stripeKey = ref(STRIPE_KEY);
const card = ref();
const elms = ref();
const instanceOptions = ref({
  // https://stripe.com/docs/js/initializing#init_stripe_js-options
});
const elementsOptions = ref({
  // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
});
const cardOptions = ref({
  // https://stripe.com/docs/stripe.js#element-options
  value: {
    postalCode: "12345",
  },
});

function pay() {
  // Get stripe element
  const cardElement = card.value.stripeElement;

  // Access instance methods, e.g. createToken()
  elms.value.instance.createToken(cardElement).then((result) => {
    // Handle result.error or result.token
    console.log(result);
  });
}

onBeforeMount(() => {
  const stripePromise = loadStripe(STRIPE_KEY);
  stripePromise.then(() => {
    stripeLoaded.value = true;
  });
});
</script>

<style scoped>
section {
  background-color: #f5f5f5;
}
</style>
