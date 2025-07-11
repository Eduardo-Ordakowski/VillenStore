let productList = localStorage.getItem("productData") ? JSON.parse(localStorage.getItem("productData")) : []

var productIndexInfos = (document.querySelector(".productList"))

showInfo()

function showInfo()
{
    productList.forEach((element) =>
    {
        let productListHtml = 
        `
        <div class ="productCard">
            <div class="productImgCard">
                <img class="productImg"src="${element.productImg}" alt="productImg">
            </div>
            <div class="productCardInfos">
                <p id="productDescr">${element.productType} ${element.productName}</p>
                <p id="productPrice">R$ ${element.productPrice}</p>
            </div>
            <div class="buttonAdd">
                <button class="addCart" onclick="">Adicionar no carrinho</button>
            </div>
        </div>
        `
        productIndexInfos.innerHTML += productListHtml      
    })
}