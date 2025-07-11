//A quantidade de comentários nesse codigo é uma pratica ruim em um software. Mas como esse foi feito para o MEU aprendizado pessoal...
//Comentei a logica linha por linha para reforçar o meu compreendimento de cada elemento que faz esse codigo rodar.

/*Utilizamos uma variável que armazena as direções de diversas informações, retirando as informações do forms*/
var form = document.getElementById("productRegister"), //Definindo por Id qual onde está o forms
    imgInput = document.querySelector(".img"), //Utilizando o query para que ele localize algo que tenha ".img", da forma como esta meu HTML poderia ser um elementById.
    file = document.getElementById("imgInput"), //Localiza o "botão" de inserir imagens
    itemName = document.getElementById("name"), //Localiza a barra de inserção do nome
    itemPrice = document.getElementById("price"), //Localiza a barra de inserção preço do produto
    itemType = document.getElementById("type"), //Localiza a barra de inserção tipo do produto
    submitButton = document.querySelector(".buttonRegister"), //Localiza o botão que cadastra o produto
    productInfo = document.getElementById("data"), //Aqui é onde deve ser imprimido a parte HTML visual da lista
    modal = document.getElementById("productForm") // Parte visual do modal
    modalTitle = document.querySelector("#productForm .modal-title") //Titulo do modal para futura alteração no código

    const insertButton = document.querySelector('.insertButton') //Localizando insertButton (Poderia estar junto de var)

    /* Variável let (Só funciona dentro de um espaço específico {})
        variável getData recebe o resultado da operação;
        "?"é uma verificação logica (If else) 
        -> se tiver valores na operação ele armazenará em getData, caso contrário ele mantera como um array vazio (getData trabalha como um array)
            -> Para que localStorage salve as infos, precisamos tranforamar todos os dados em texto (essa logica ele aplica lá na frente),
                Aqui estamos convertendo as infos de JSON para o seu estado original, salvando assim em getData os dados originais para que sejam lidos futuramente.
        -> Se não existir valores na operação, ele simplesmente diz que getData(que é um array) é vazio;        
    */
    let getData = localStorage.getItem("productData") ? JSON.parse(localStorage.getItem('productData')) : []

    let isEdit = false, editId //Define isEdit como falso sempre. editId é declarada junto com a variável

    showInfo() //Carrega os itens sempre que a página é carregada.

    //Função para resetar o formulário sempre que insertButton for clicado.
    //Desta forma ao editar itens ele retorna visualmente para a parte de inserção. Detalhe que editar também cadastra no sistema, mas acabei não alterando isso.
    insertButton.addEventListener('click', function () {
        
        form.reset() //Reseta as informações do formulário

        imgInput.src="icons/imgHolderIcon.png" //Reseta a imagem para a placeholder
        submitButton.innerText = "Cadastrar"  //Altera o texto escrito no botão submit (modal)
        modalTitle.innerText = "Cadastrar Produto" //Altera o texto do titulo do modal

    });
    //Função para verificação e troca da imagem
    file.onchange = function() //Ativa a função sempre que o elemento controlado por file for alterado.
    {
        if(file.files[0].size <1000000) //verifica o tamanho da file (1mb)
        {
        
            var fileReader = new FileReader(); //Define um objeto FileReader

            fileReader.onload = function(e) //Quando fileReader terminar de ler o arquivo, ativa a função recebendo o parametro e.
            { 
                //imgUrl recebe o parametro e (que contém as infos do arquivo carregado) de target (fileReader)
                //Especificamente recebendo o .result (que é o resultado da leitura como um URL)

                imgUrl = e.target.result
                imgInput.src = imgUrl //imgInput = recebe a imagem alocada em imgUrl atravez de .src, sendo interpretado pelo navegador como imagem.
            }
            
            fileReader.readAsDataURL(file.files[0]) //Aqui chama fileReader para ler os arquivos e os devolva como dataURL
        }
        else //Caso o arquivo não atender aos requisitos lógicos.
        {
            alert("Arquivo muito grande!") //imprime um alerta no navegador.
        }
    }

    function showInfo() //função para carregar as informações dos produtos
    {   
        document.querySelectorAll('.productDetails').forEach(info => info.remove()) //Faz a leitura de todas as informações na lista utilizando foreach e as exclui
        getData.forEach((element, index) => 
        //Chama getData (que contém as informações salvas) passa para forEach rodar baseado em element e index.
        {   
            //let (a variável que só roda em operações dentro de {}) 
            //createElement recebe toda a montagem HTML trocando as informações baseadas nos parametros passados NAS posições que foram criadas
            let createElement = 
            `<tr class="productDetails">
                <td>${index}</td>
                <td><img src=${element.productImg} width="50" height="50"></img></td>
                <td>${element.productName}</td>
                <td>${element.productPrice}</td>
                <td>${element.productType}</td>

                <td>
                    <button class="editButton" onclick="editInfo(${index}, '${element.productImg}', '${element.productName}', '${element.productPrice}','${element.productType}')"data-bs-toggle="modal" data-bs-target="#productForm">Editar</button>
                    <button class="deleteButton" onclick="deleteInfo(${index})">Deletar</button>
                </td>
            </tr>`

            productInfo.innerHTML += createElement 
            //ProductInfo recebe e adiciona com oq já tem na variável .innerHTML
            //ProductInfo contém a localização no HTML de data, que por sua vez é onde será imprimido a lista no HTMl
            //A cada rodada do foreach ele adiciona as linhas em productInfo
        })
    }

    function editInfo (index, Img, Name, Price, Type)
    {
        submitButton.innerText = "Atualizar" //Muda o botão do modal
        modalTitle.innerText = "Atualizar Produto" //muda o titulo do modal

        isEdit = true //Define isEdit como verdadeiro
        editId = index //editId recebe o index que contém a posicão do item exato que queremos alterar
        imgInput.src = Img,
        itemName.value = Name,
        itemPrice.value = Price,
        itemType.value = Type

        //As variáveis acima contém a localização no HTML de onde as infos devem ser impressas. Desta forma definimos o .value desses elementos no formulário com os novos dados.

        submitButton.addEventListener('click', function()
        {
            submitButton.innerText = "Cadastrar" 
            modalTitle.innerText = "Cadastrar Produto"
        })//Reseta o modal para o estágio de cadastro
        

    }
    function deleteInfo(index) //Deleta os dados do array e imprime a tabela atualizada
    {
        if(confirm("Quer deletar o item?"))
        {
            getData.splice(index, 1) //splice corta as informações da seguinte maneira: Começa baseado em index e corta 1 item fora.
            localStorage.setItem("productData", JSON.stringify(getData)) 
            //Como nos cortamos dados com splice, local storage vai receber os novos dados atualizado como string, para futuramente no codigo serem convertidos novamente.
            showInfo() //Mostra a lista com os dados  atualizados
        }
    }

    //Estamos adicionado um listener em submit, que o botão e apontando para uma função com o parametro e
    form.addEventListener('submit', (e)=>
    {
        e.preventDefault() //Impede que quando o formulário for enviado a pagina recarregue. Ao invez disso, o JavaScript fica responsável pela logica de atualizar as infos.

        const information = // const informação recebe:
        {
            productImg: imgInput.src == undefined ?"icons/imgHolderIcon.png" : imgInput.src, 
            //productImg recebe (:) imgInput que compara a seguinte questão: undefined is true? caso sim: recebe o placeHolder, se não recebe a imagem que foi salva
            productName: itemName.value, 
            // productName recebe itemName.value
            // Ou seja, recebe a posicão do elemento que itemName tem armazenado no HTML e seu atributo .value que contem a informação; 
            productPrice: itemPrice.value, //idem
            productType: itemType.value //idem
        }

        if(!isEdit) //Se isEdit diferente de true (false)
        {
            getData.push(information) //Ignoramos a logica de editar e damos um Push nas infos. Ou seja, ele adiciona os novos dados em uma nova posição no vetor
        }
        else //Se for true
        {
            isEdit = false //isEdit agora é false
            getData[editId] = information //Get data vai receber as novas informações baseadas no que editId recebe, que é a posição (função vista acima/editId recebe index)
        }

        localStorage.setItem('productData', JSON.stringify(getData)) //localStorage está recebendo o resultado de uma operação que transforma todos os dados de getData em strings

        showInfo() //Carrega a lista atualizada

        imgInput.src="icons/imgHolderIcon.png" //Reseta a imagem do formulário para o placeHolder
        form.reset() //Reseta os campos do forms
    })