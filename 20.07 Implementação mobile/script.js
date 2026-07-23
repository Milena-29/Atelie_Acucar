const menuMobile = document.getElementById("menu-mobile");
const menu = document.getElementById("menu");

if (menuMobile && menu) {
  menuMobile.addEventListener("click", () => {
    menu.classList.toggle("ativo");
  });
}

let carrinho = JSON.parse(localStorage.getItem("carrinho_atelie")) || [];

function salvarEAtualizar() {
  localStorage.setItem("carrinho_atelie", JSON.stringify(carrinho));
  atualizarInterface();
}

function adicionarAoCarrinho(nome, preco) {
  const itemExistente = carrinho.find(item => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({ nome, preco: parseFloat(preco), quantidade: 1 });
  }
  salvarEAtualizar();
}

function alterarQuantidade(index, mudanca) {
  carrinho[index].quantidade += mudanca;
  if (carrinho[index].quantidade <= 0) {
    carrinho.splice(index, 1);
  }
  salvarEAtualizar();
}

function atualizarInterface() {
  const contadorCarrinho = document.getElementById("contador-carrinho");
  const listaCarrinho = document.getElementById("lista-carrinho");
  const totalCarrinho = document.getElementById("total-carrinho");

  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  if (contadorCarrinho) {
    contadorCarrinho.innerText = totalItens;
  }

  if (listaCarrinho) {
    listaCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
      listaCarrinho.innerHTML = "<li style='text-align:center; padding: 10px;'>Seu carrinho está vazio.</li>";
    } else {
      carrinho.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "item-carrinho";
        li.innerHTML = `
          <div class="info-item">
            <strong>${item.nome}</strong><br>
            <small>R$ ${item.preco.toFixed(2)} cada</small>
          </div>
          <div class="qtd-controles">
            <button onclick="alterarQuantidade(${index}, -1)">-</button>
            <span>${item.quantidade}</span>
            <button onclick="alterarQuantidade(${index}, 1)">+</button>
          </div>
          <div class="subtotal">
            R$ ${(item.preco * item.quantidade).toFixed(2)}
          </div>
        `;
        listaCarrinho.appendChild(li);
      });
    }
  }

  const valorTotal = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  if (totalCarrinho) {
    totalCarrinho.innerText = valorTotal.toFixed(2).replace(".", ",");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-adicionar").forEach(botao => {
    botao.addEventListener("click", (e) => {
      const nome = e.target.getAttribute("data-nome");
      const preco = e.target.getAttribute("data-preco");
      if (nome && preco) {
        adicionarAoCarrinho(nome, preco);
      }
    });
  });

  document.querySelectorAll(".btn-adicionar-bebida").forEach(botao => {
    botao.addEventListener("click", (e) => {
      const titulo = e.target.getAttribute("data-titulo");
      const idSabor = e.target.getAttribute("data-sabor");
      const idTamanho = e.target.getAttribute("data-tamanho");

      const selectSabor = document.getElementById(idSabor);
      const selectTamanho = document.getElementById(idTamanho);

      if (selectSabor && selectTamanho) {
        const sabor = selectSabor.value;
        const tamanhoTexto = selectTamanho.options[selectTamanho.selectedIndex].text;
        const preco = parseFloat(selectTamanho.value);

        const nomeCompleto = `${titulo} (${sabor} - ${tamanhoTexto.split(' - ')[0]})`;
        adicionarAoCarrinho(nomeCompleto, preco);
      }
    });
  });

  const btnCarrinho = document.getElementById("btn-carrinho");
  const modalCarrinho = document.getElementById("modal-carrinho");
  const btnFecharCarrinho = document.getElementById("fechar-carrinho");

  if (btnCarrinho && modalCarrinho) {
    btnCarrinho.addEventListener("click", () => {
      modalCarrinho.classList.remove("hidden");
    });
  }

  if (btnFecharCarrinho && modalCarrinho) {
    btnFecharCarrinho.addEventListener("click", () => {
      modalCarrinho.classList.add("hidden");
    });
  }

  const btnFinalizar = document.getElementById("btn-finalizar");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
      if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
      }

      let mensagem = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
      let total = 0;

      carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        mensagem += `• ${item.quantidade}x ${item.nome} - R$ ${subtotal.toFixed(2)}\n`;
      });

      mensagem += `\n*Total: R$ ${total.toFixed(2)}*`;

      const numeroWhatsapp = "5500000000000";
      const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
      
      window.open(url, "_blank");
    });
  }

  atualizarInterface();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('./sw.js')
      .then(function () {
        console.log('Service Worker registrado.');
      })
      .catch(function (erro) {
        console.error('Erro ao registrar Service Worker:', erro);
      });
  });
}