import axios from "axios";

const $axios = axios.create({
  baseURL: "https://fourpet.onrender.com",
  withCredentials: true,
});

// const $axios = axios.create({
//   //
//   baseURL: "https://fourpet.onrender.com",
//   withCredentials: true,
// });

export default $axios;
