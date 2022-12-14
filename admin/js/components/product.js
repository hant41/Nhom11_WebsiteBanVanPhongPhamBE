import { $, $$ } from "../configs/constants.js";
import { baseURL } from "../configs/configs.js";
let id = Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
).id;
let product;
let capacities;
async function getProduct() {
    try {
        await new Promise((resolve, reject) => {
            fetch(`${baseURL}admin/controller/product.php?id=${id}`, {
                method: "GET",
                credentials: "include",
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    res.text().then((res) => {
                        product = JSON.parse(res);
                        resolve();
                    });
                } else {
                    reject();
                }
            });
        });
    } catch (err) {}
}
async function getCapacities() {
    try {
        await new Promise((resolve, reject) => {
            fetch(
                `${baseURL}admin/controller/capacities.php?product_id=${id}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            ).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    res.text().then((res) => {
                        capacities = JSON.parse(res);
                        resolve();
                    });
                } else {
                    reject();
                }
            });
        });
    } catch (err) {}
}
async function main() {
    try {
        await getProduct();
        await getCapacities();
        renderProductContainer();
    } catch (err) {}
}
function renderCapacities() {
    let dataRes = "";
    capacities.forEach((capacity) => {
        let capacitiesHref = `index.php?view=change-capacity-product&id=${capacity['id']}`;
        dataRes+=`
            <tr>
                <td>${capacity["capacity_name"]}</td>
                <td>${capacity["quantity"]}</td>
                <td>${capacity["price"]}</td>
                <td>
                    <a class="btn" href="${capacitiesHref}" data-id="${capacity['id']}">S???a</a>
                </td>
            </tr>
        '`;
    });
    return dataRes;
}
function renderProductContainer(){
    let productContainer = document.getElementById("product-container")
    let productContent = `
    <h2 style="text-align:right">Th??ng tin s???n ph???m</h2>
    <div class="product__detail">
        <ul class="product__detail__infor">
            <li><span>T??n</span><span>${product["model"]}</span> </li>
            <li><span>Lo???i s???n ph???m</span><span>${product["nameBrand"]}</span> </li>
            <li><span>Xu???t x???</span><span>${product["screen"]}</span> </li>
            <li><span>Tr???ng l?????ng</span><span>${product["RAM"]}</span> </li>
            <li><span>K??ch th?????c</span><span>${product["hardware"]}</span> </li>
            <li><span>M?? t???</span><span>${product["OS"]}</span> </li>
            <li><span>Th????ng hi???u</span><span>${product["CPU"]}</span> </li>
            <li><span>B???o qu???n</span><span>${product["VGA"]}</span> </li>
            <li><span>???nh</span><span><img src="'.$background.'" alt=""></span> </li>
            <li><span>Ti??u chu???n</span><span>${product["warranty"]}</span> </li>
            <li><span>Gi???m gi??</span><span>${product["discount"]}%</span> </li>
            <li><span>M??u</span><span>${product["color"]}</span> </li>
            <li><span>T???o b???i</span><span>${product["nameUser"]}</span> </li>
        </ul>
        <div class="product__detail__capacity">
            <table border="1">
                <tr>
                    <th>Th??? lo???i</th>
                    <th>S??? l?????ng</th>
                    <th>Gi??</th>
                    <th>Thao t??c</th>
                </tr>
                ${renderCapacities()}
            </table>
        </div>
        <a class="btn" href="index.php?view=add-capacity-product&id-product=${id}">Th??m</a>
        <a class="btn" href="index.php?view=change-product&id=${id}">S???a</a>
    </div> `
    productContainer.innerHTML=productContent
}
main();
