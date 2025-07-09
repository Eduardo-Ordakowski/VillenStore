/*Destrinchando as informações em VARIAS VARIAVEIS (^^)*/
var form = document.getElementById("productRegister"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"), 
    itemName = document.getElementById("name"), 
    itemPrice = document.getElementById("price"),
    itemType = document.getElementById("type"),
    submitButton = document.querySelector(".buttonRegister"),
    productInfo = document.getElementById("data"),
    modal = document.getElementById("productForm")
    modalTitle = document.querySelector("#productForm .modal-title")

    const insertButton = document.querySelector('.insertButton')

    let getData = localStorage.getItem("productData") ? JSON.parse(localStorage.getItem('productData')) : []

    let isEdit = false, editId

    showInfo()

    insertButton.addEventListener('click', function() {
        
        form.reset() 

        imgInput.src="icons/imgHolderIcon.png"
        document.querySelector(".modal-backdrop").remove()
        
        submitButton.innerText = "Cadastrar" 
        modalTitle.innerText = "Cadastrar Produto"

    });

    file.onchange = function()
    {
        if(file.files[0].size <1000000)
        {
            var fileReader = new FileReader();

            fileReader.onload = function(e)
            { 
                imgUrl = e.target.result
                imgInput.src = imgUrl
            }
            
            fileReader.readAsDataURL(file.files[0])
        }
        else
        {
            alert("Arquivo muito grande!")
        }
    }

    function showInfo()
    {   
        document.querySelectorAll('.productDetails').forEach(info => info.remove()) 
        getData.forEach((element, index) => 
        {   
            let createElement = `<tr class="productDetails">
                    <td>${index}</td>
                    <td><img src="${element.productImg}" width="50" height="50"></img></td>
                    <td>${element.productName}</td>
                    <td>${element.productPrice}</td>
                    <td>${element.procuctType}</td>

                <td>
                    <button class="editButton" onclick="editInfo(${index}, '${element.productImg}', '${element.productName}', '${element.productPrice}','${element.procuctType}')"data-bs-toggle="modal" data-bs-target="#productForm">Editar</button>
                    <button class="deleteButton" onclick="deleteInfo(${index})">Deletar</button>
                </td>
            </tr>`

            productInfo.innerHTML += createElement
        })
    }

    function editInfo (index, img, name, price, type)
    {
        submitButton.innerText = "Atualizar"
        modalTitle.innerText = "Atualizar Produto"

        isEdit = true
        editId = index
        imgInput.src = img,
        itemName.value = name,
        itemPrice.value = price,
        itemType.valeu = type

        showInfo()
        

    }
    function deleteInfo(index) 
    {
        if(confirm("Quer deletar o item?"))
        {
            getData.splice(index, 1)
            localStorage.setItem("productData", JSON.stringify(getData))
            showInfo()
        }
    }

    form.addEventListener('submit', (e)=>
    {
        showInfo()

        e.preventDefault()

        const information = 
        {
            productImg: imgInput.src == undefined ?"icons/imgHolderIcon.png" : imgInput.src,
            productName: itemName.value,
            productPrice: price.value,
            procuctType: type.value
        }

        if(!isEdit)
        {
            getData.push(information)
        }
        else
        {
            isEdit = false
            getData[editId] = information
        }

        localStorage.setItem('productData', JSON.stringify(getData))

        showInfo()
    })
