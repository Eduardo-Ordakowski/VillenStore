let cartList = localStorage.getItem('shopCartList') ? JSON.parse(localStorage.getItem("shopCartList")) : []

var itemListHTML = (document.querySelector(".shopCartItemsList"))
var summaryHTML = (document.querySelector(".shopCartSummary"))

var deleteButton = (document.querySelector(".deleteButton"))
var finishButton = (document.getElementById("finishButton"))

const coinFormatation =
{
    style: 'currency',
    currency: 'BRL'
}

const realFormat = new Intl.NumberFormat('pt-BR', coinFormatation);

showShopCartList();
showSummary();
calculateSummary();

function showShopCartList(){

    document.querySelectorAll('.shopCartItem').forEach(info => info.remove());
    
    cartList.forEach((element, index) => 
    {
        let itemList =
        `
        <div class="shopCartItem">
                
            <div class="shopCartProductImg">
                <img src="${element.cartProductImg}">
            </div>

            <div class="shopCartProductInfo">
                <p id="productTypeName"">${element.cartProductType} ${element.cartProductName}</p>
                <p id="productPrice">R$ ${element.cartProductPrice}</p>
                <p id="productQuantity">Quantidade: ${element.productQnt}</p>
            </div>
            
            <div class="shopCartTrashIcon">
                <button class="deleteButton" onclick="deleteInfo(${index})">
                    <img src="icons/trashIcon.png">
                </button>
            </div>
        </div>
        `
        itemListHTML.innerHTML += itemList
    });
}

function showSummary()
{
        let summary = 
        `
        <h1>Resumo da compra</h1>
            <div class="summaryQuantity">
                <div>Quantidade de itens:</div>
                <div id="summaryQuantityDisplay">0</div>
            </div>

            <div class="summaryTotalValue">
                <div>Valor total:</div>
                <div id="summaryTotalValueDisplay">R$0,00</div>
            </div>

            <div class="summaryButtons">
                <button id="finishButton" onclick="finishBuy(${true})">Finalizar Compra</button>
                <a href="index.html"><button id="keepBuyingButton">Continuar Comprando</button></a>
            </div>
        `
        summaryHTML.innerHTML += summary;
}

function calculateSummary()
{
    let auxQnt = 0
    let auxPrice = 0

    cartList.forEach((element)=>
    {
        auxQnt += element.productQnt
        auxPrice += (parseFloat(element.cartProductPrice) * element.productQnt)
        
        console.log("Analise:", element)
        console.log("Analise:", auxQnt)
        console.log("Analise:", auxPrice)

    })

    const productPriceHTML = (document.getElementById("summaryTotalValueDisplay"))
    const productQuantityHTML = (document.getElementById("summaryQuantityDisplay"))

    productPriceHTML.innerHTML = realFormat.format(auxPrice)
    productQuantityHTML.innerHTML = auxQnt
}
function deleteInfo(index) {

    if(confirm("Quer deletar o item?")) 
    {
        cartList.splice(index, 1);
        localStorage.setItem("shopCartList", JSON.stringify(cartList));
        
        showShopCartList();
    }
}

function finishBuy()
{
    cartList = []
    localStorage.removeItem("shopCartList", JSON.stringify(cartList))
    alert("Compra Finalizada!")
    showShopCartList();
    calculateSummary();
}