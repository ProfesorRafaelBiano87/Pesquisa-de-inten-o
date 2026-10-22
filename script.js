
const perguntas = [
  {
    numero: 1,
    texto: "Você é a favor do Comando Vermelho e da Milícia do RJ terem influência direta na presidência da república?"
  },
  {
    numero: 2,
    texto: "Você concorda com a exploração do Brasil pelos EUA?"
  },
  {
    numero: 3,
    texto: "Você é a favor de orgias com menores de idade refugiadas de guerra?"
  },
  {
    numero: 4,
    texto: "Você é a favor da Polícia Federal não investigar nenhum político corrupto?"
  },
  {
    numero: 5,
    texto: "Você concorda com a perseguição à Igreja Católica?"
  },
  {
    numero: 6,
    texto: "Você concorda com a perseguição ao direito de professar uma fé, só porque pensa diferente?"
  },
  {
    numero: 7,
    texto: "Você concorda em vender estatais com desconto de 90% para o estrangeiro?"
  },
  {
    numero: 8,
    texto: "Você concorda com a livre exploração dos recursos naturais do Brasil por outros países?"
  },
  {
    numero: 9,
    texto: "Você é a favor de crianças terem acesso a armas de fogo, podendo causar até mesmo mortes acidentais?"
  },
  {
    numero: 10,
    texto: "Você é a favor que Daniel Vorcaro do Banco Master seja inocentado?"
  },
  {
    numero: 11,
    texto: "Você é a favor de políticos bancarem regalias eróticas a ministros do STF em troca de favores?"
  },
  {
    numero: 12,
    texto: "Você concorda com a venda de empresas como a Petrobras, que gera muitos empregos e lucro?"
  },
  {
    numero: 14,
    texto: "Você concorda que um presidente seja eleito sem propostas?"
  },
  {
    numero: 15,
    texto: "Você acha justo que o salário mínimo não tenha aumento acima da inflação?"
  },
  {
    numero: 16,
    texto: "Você acha justo se aposentar só com 70 anos?"
  },
  {
    numero: 17,
    texto: "Você acha justo o valor da aposentadoria não receber reajuste?"
  },
  {
    numero: 18,
    texto: "Você acha justo o SUS não oferecer mais tratamentos e vacinação gratuitos?"
  },
  {
    numero: 19,
    texto: "Você é a favor da diminuição de 90% do orçamento das universidades e institutos federais?"
  },
  {
    numero: 20,
    texto: "Você é a favor da diminuição do orçamento da farmácia popular?"
  }
];

const lista = document.getElementById("listaPerguntas");
const formulario = document.getElementById("formPesquisa");
const aviso = document.getElementById("aviso");
const contador = document.getElementById("contador");
const preenchimento = document.getElementById("preenchimento");
const barra = document.getElementById("barraProgresso");

function criarPerguntas() {
  lista.innerHTML = "";

  perguntas.forEach((pergunta) => {
    const card = document.createElement("section");
    card.className = "pergunta";
    card.id = `pergunta-${pergunta.numero}`;

    const numero = document.createElement("span");
    numero.className = "numero";
    numero.textContent = `PERGUNTA ${pergunta.numero}`;

    const titulo = document.createElement("h3");
    titulo.textContent = pergunta.texto;

    const opcoes = document.createElement("div");
    opcoes.className = "opcoes";

    [
      { valor: "sim", legenda: "Sim 22" },
      { valor: "nao", legenda: "Não 13" }
    ].forEach((opcao) => {
      const label = document.createElement("label");
      label.className = "opcao";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${pergunta.numero}`;
      input.value = opcao.valor;
      input.required = true;

      input.addEventListener("change", () => {
        card.classList.remove("incompleta");
        aviso.textContent = "";
        atualizarProgresso();
      });

      const texto = document.createElement("span");
      texto.textContent = opcao.legenda;

      label.append(input, texto);
      opcoes.appendChild(label);
    });

    card.append(numero, titulo, opcoes);
    lista.appendChild(card);
  });
}

function obterRespostas() {
  return perguntas.map((pergunta) => {
    const selecionado = formulario.querySelector(
      `input[name="q${pergunta.numero}"]:checked`
    );

    return {
      numero: pergunta.numero,
      texto: pergunta.texto,
      valor: selecionado ? selecionado.value : null
    };
  });
}

function atualizarProgresso() {
  const respostas = obterRespostas();
  const respondidas = respostas.filter(
    (resposta) => resposta.valor !== null
  ).length;

  const percentual = (respondidas / perguntas.length) * 100;

  contador.textContent =
    `${respondidas} de ${perguntas.length} respondidas`;

  preenchimento.style.width = `${percentual}%`;
  barra.setAttribute("aria-valuenow", respondidas);
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const respostas = obterRespostas();
  const incompletas = respostas.filter(
    (resposta) => resposta.valor === null
  );

  if (incompletas.length > 0) {
    aviso.textContent =
      `Responda às ${incompletas.length} pergunta(s) restante(s).`;

    incompletas.forEach((resposta) => {
      document.getElementById(
        `pergunta-${resposta.numero}`
      ).classList.add("incompleta");
    });

    document.getElementById(
      `pergunta-${incompletas[0].numero}`
    ).scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    return;
  }

  const totalSim = respostas.filter(
    (resposta) => resposta.valor === "sim"
  ).length;

  const totalNao = respostas.filter(
    (resposta) => resposta.valor === "nao"
  ).length;

  document.getElementById("totalSim").textContent = totalSim;
  document.getElementById("totalNao").textContent = totalNao;

  const mensagem = document.getElementById("mensagemFinal");

  if (totalSim > totalNao) {
    mensagem.textContent =
      "Você marcou mais SIM 22! Que pena voce precisa urgente repensar suas opiniões,mas ainda da tempo pense e reflita e vamos de de LULA 13 ";
  } else if (totalNao > totalSim) {
    mensagem.textContent =
      "Você marcou mais NÃO 13! Veja Você é consciente e Claro vai de LULA 13 para Presidente.";
  } else {
    mensagem.textContent =
      "Suas respostas ficaram divididas igualmente!";
  }

  const resumo = document.getElementById("resumoRespostas");
  resumo.innerHTML = "";

  respostas.forEach((resposta) => {
    const item = document.createElement("div");
    item.className = "resposta-resumo";

    const titulo = document.createElement("strong");
    titulo.textContent = `Pergunta ${resposta.numero}: `;

    const texto = document.createElement("span");
    texto.textContent =
      resposta.valor === "sim" ? "Sim 22" : "Não 13";

    item.append(titulo, texto);
    resumo.appendChild(item);
  });

  document.getElementById("pesquisa").classList.add("oculto");
  document.getElementById("resultado").classList.remove("oculto");

  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("refazer").addEventListener("click", () => {
  formulario.reset();

  document.getElementById("resultado").classList.add("oculto");
  document.getElementById("pesquisa").classList.remove("oculto");

  document.querySelectorAll(".pergunta").forEach((card) => {
    card.classList.remove("incompleta");
  });

  aviso.textContent = "";
  atualizarProgresso();

  window.scrollTo({ top: 0, behavior: "smooth" });
});

criarPerguntas();
atualizarProgresso();
