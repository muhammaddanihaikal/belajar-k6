import { check, sleep } from "k6";
import { SharedArray } from "k6/data";
import { productOptions } from "../../config/options/product.options.js";
import { authSetup } from "../../helpers/setup.helper.js";
import { deleteProduct } from "../../services/product.service.js";

export const options = productOptions;

const tumbalList = new SharedArray("daftar tumbal", function () {
  return JSON.parse(open("../../data/tumbal-products.json"));
});

export const setup = authSetup;

export default function (data) {
  const item = tumbalList[(__VU - 1) % tumbalList.length];
  const res = deleteProduct(item.id, data.token);

  check(res, { "delete 200": (r) => r.status === 200 });
  sleep(1);
}
