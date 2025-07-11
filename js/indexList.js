let productList = localStorage.getItem('productData') ? JSON.parse(localStorage.getItem("productData")) : []
let cartList = localStorage.getItem('shopCartList') ? JSON.parse(localStorage.getItem("shopCartList")) : []

const addToCart = (document.getElementById("addToCart"))
var productIndexInfos = (document.querySelector(".productList"))

showInfo()

console.log(cartList)

function showInfo()
{
    productList.forEach((element, index) =>
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
                <button id="addToCart" onclick="addToCartList(${index},'${element.productImg}','${element.productType}', '${element.productName}',
                                                            '${element.productPrice}')">Adicionar no carrinho</button>
            </div>
        </div>
        `
        productIndexInfos.innerHTML += productListHtml      
    })
}

    function addToCartList(index, img, type, name, price) 
    {   
        const existInCart = cartList.findIndex(item => item.cartProductIndex     === index);
            
            if(existInCart !== -1)
            {
                cartList[existInCart].productQnt++;
            }
            else
            {
                const shopCartInformation = 
                {
                    cartProductIndex : index,
                    cartProductImg : img,
                    cartProductType : type,
                    cartProductName : name,
                    cartProductPrice : price,
                    productQnt : 1
                }

                cartList.push(shopCartInformation)
            }

        localStorage.setItem('shopCartList', JSON.stringify(cartList))

        alert("Item adicionado ao carrinho!")
    }