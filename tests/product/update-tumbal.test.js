import { check, sleep } from "k6";
import { SharedArray } from "k6/data";
import { productOptions } from "../../config/options/product.options.js";
import { authSetup } from "../../helpers/setup.helper.js";
import { updateProduct } from "../../services/product.service.js";

export const options = productOptions;

const tumbalList = new SharedArray("daftar tumbal", function () {
  return JSON.parse(open("../../data/tumbal-products.json"));
});

export const setup = authSetup;

export default function (data) {
  const item = tumbalList[(__VU - 1) % tumbalList.length];
  const res = updateProduct(item.id, `${item.title} (Updated)`, data.token);

  check(res, { "update 200": (r) => r.status === 200 });
  sleep(1);
}
