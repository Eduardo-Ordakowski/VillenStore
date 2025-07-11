var form = document.getElementById("productRegister"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"), 
    itemName = document.getElementById("name"), 
    itemPrice = (document.getElementById("price")),
    itemType = document.getElementById("type"),
    submitButton = document.querySelector(".buttonRegister"),
    productInfo = document.getElementById("data"),
    modal = document.getElementById("productForm"),
    modalTitle = document.querySelector("#productForm .modal-title");

var controllerModal = new bootstrap.Modal(modal);
const insertButton = document.querySelector('.insertButton');

let getData = localStorage.getItem("productData") ? JSON.parse(localStorage.getItem('productData')) : [];

let isEdit = false, editId;

showInfo();

insertButton.addEventListener('click', function () {
    form.reset();
    imgInput.src="icons/imgHolderIcon.png";
    submitButton.innerText = "Cadastrar";
    modalTitle.innerText = "Cadastrar Produto";
});

file.onchange = function() {
    if(file.files[0].size < 10000000) {
        var fileReader = new FileReader();

        fileReader.onload = function(e) { 
            imgUrl = e.target.result;
            imgInput.src = imgUrl;
        }
        
        fileReader.readAsDataURL(file.files[0]);
    } else {
        alert("Arquivo muito grande!");
    }
}

function showInfo() {   
    document.querySelectorAll('.productDetails').forEach(info => info.remove());
    getData.forEach((element, index) => {   
        let createElement = 
        `<tr class="productDetails">
            <td>${index}</td>
            <td><img src=${element.productImg}></img></td>
            <td>${element.productName}</td>
            <td>R$ ${element.productPrice}</td>
            <td>${element.productType}</td>
            <td>
                <button class="editButton" onclick="editInfo(${index}, '${element.productImg}', '${element.productName}', '${element.productPrice}','${element.productType}')"data-bs-toggle="modal" data-bs-target="#productForm">Editar</button>
                <button class="deleteButton" onclick="deleteInfo(${index})">Deletar</button>
            </td>
        </tr>`;

        productInfo.innerHTML += createElement;
    });
}

function editInfo (index, Img, Name, Price, Type) {
    submitButton.innerText = "Atualizar";
    modalTitle.innerText = "Atualizar Produto";

    isEdit = true;
    editId = index;
    imgInput.src = Img;
    itemName.value = Name;
    itemPrice.value = Price;
    itemType.value = Type;

}

function deleteInfo(index) {
    if(confirm("Quer deletar o item?")) {
        getData.splice(index, 1);
        localStorage.setItem("productData", JSON.stringify(getData));
        showInfo();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const information = {
        productImg: imgInput.src == undefined ? "icons/imgHolderIcon.png" : imgInput.src, 
        productName: itemName.value, 
        productPrice: parseFloat(itemPrice.value.replace(/\./g , '').replace(',' , '.')).toFixed(2),
        productType: itemType.value
    }

    if(!isEdit) {
        getData.push(information);
    } else {
        isEdit = false;
        getData[editId] = information;
    }

    localStorage.setItem('productData', JSON.stringify(getData));

    showInfo();
    controllerModal.hide()
    
    imgInput.src="icons/imgHolderIcon.png";
    form.reset();
});