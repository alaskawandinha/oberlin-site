let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];


function adicionarCarrinho(nome, preco, imagem) {

    let produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1
        });
    }

    salvarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");

    mostrarCarrinho();
}


function salvarCarrinho() {

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

}



function verProduto(nome, preco, imagem) {

    let produto = {
        nome: nome,
        preco: preco,
        imagem: imagem
    };

    localStorage.setItem(
        "produtoSelecionado",
        JSON.stringify(produto)
    );

    window.location.href = "produto.html";

}



function carregarProduto() {

    let produto = JSON.parse(
        localStorage.getItem("produtoSelecionado")
    );

    if (!produto) {
        return;
    }

    let imagem = document.getElementById("produto-imagem");
    let nome = document.getElementById("produto-nome");
    let preco = document.getElementById("produto-preco");
    let tecido = document.getElementById("produto-tecido");
    let descricao = document.getElementById("produto-descricao");

    if (!imagem || !nome || !preco) {
        return;
    }

    imagem.src = produto.imagem;

    nome.innerHTML = produto.nome;

    preco.innerHTML =
        "R$ " +
        produto.preco.toFixed(2).replace(".", ",");

    if (tecido) {
        tecido.innerHTML =
            "Tecido confortável e de alta qualidade.";
    }

    if (descricao) {
        descricao.innerHTML =
            "Uma peça Oberlin criada para unir estilo, conforto e qualidade.";
    }

}



let tamanhoSelecionado = "";

function escolherTamanho(tamanho) {

    tamanhoSelecionado = tamanho;

    let tamanhoTexto =
        document.getElementById("tamanho-escolhido");

    if (tamanhoTexto) {
        tamanhoTexto.innerHTML =
            "Tamanho escolhido: " + tamanho;
    }

}



function adicionarProdutoDetalhes() {

    let produto = JSON.parse(
        localStorage.getItem("produtoSelecionado")
    );

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (tamanhoSelecionado === "") {
        alert("Escolha um tamanho primeiro!");
        return;
    }

    let produtoExistente = carrinho.find(
        item =>
            item.nome === produto.nome &&
            item.tamanho === tamanhoSelecionado
    );

    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            tamanho: tamanhoSelecionado,
            quantidade: 1
        });

    }

    salvarCarrinho();

    alert("Produto adicionado ao carrinho!");

    window.location.href = "carrinho.html";

}


function mostrarCarrinho() {

    let lista =
        document.getElementById("lista-carrinho");

    let total =
        document.getElementById("total-carrinho");

    let botaoFinalizar =
        document.getElementById("botao-finalizar");

    if (!lista || !total) {
        return;
    }

    lista.innerHTML = "";

    if (botaoFinalizar) {

        if (carrinho.length > 0) {
            botaoFinalizar.style.display = "inline-block";
        } else {
            botaoFinalizar.style.display = "none";
        }

    }

    if (carrinho.length === 0) {

        lista.innerHTML =
            "<p>Seu carrinho está vazio.</p>";

        total.innerHTML =
            "Total: R$ 0,00";

        return;
    }

    let valorTotal = 0;

    carrinho.forEach(function(produto, index) {

        let quantidade =
            produto.quantidade || 1;

        let subtotal =
            produto.preco * quantidade;

        valorTotal += subtotal;

        let tamanho = "";

        if (produto.tamanho) {

            tamanho =
                "<p>Tamanho: " +
                produto.tamanho +
                "</p>";

        }

        lista.innerHTML += `

            <div class="produto-carrinho">

                <img src="${produto.imagem}">

                <div>

                    <h3>
                        ${produto.nome}
                    </h3>

                    <p>
                        R$ ${produto.preco
                            .toFixed(2)
                            .replace(".", ",")}
                    </p>

                    ${tamanho}

                    <p>
                        Quantidade: ${quantidade}
                    </p>

                    <button onclick="diminuirProduto(${index})">
                        -
                    </button>

                    <button onclick="aumentarProduto(${index})">
                        +
                    </button>

                    <button onclick="removerProduto(${index})">
                        Remover
                    </button>

                </div>

            </div>

        `;

    });

    total.innerHTML =
        "Total: R$ " +
        valorTotal.toFixed(2).replace(".", ",");

}


function aumentarProduto(index) {

    carrinho[index].quantidade++;

    salvarCarrinho();

    mostrarCarrinho();

}


function diminuirProduto(index) {

    if (carrinho[index].quantidade > 1) {

        carrinho[index].quantidade--;

    } else {

        carrinho.splice(index, 1);

    }

    salvarCarrinho();

    mostrarCarrinho();

}


function removerProduto(index) {

    carrinho.splice(index, 1);

    salvarCarrinho();

    mostrarCarrinho();

}


function finalizarCompra() {

    let pagamento =
        document.getElementById("pagamento");

    if (pagamento) {
        pagamento.style.display = "block";
    }

}


function confirmarPagamento() {

    let pagamento = document.querySelector(
        'input[name="pagamento"]:checked'
    );

    if (!pagamento) {

        alert("Escolha uma forma de pagamento.");

        return;
    }

    alert(
        "Pagamento escolhido: " +
        pagamento.value +
        "\nCompra finalizada com sucesso!"
    );

}

mostrarCarrinho();

carregarProduto();
