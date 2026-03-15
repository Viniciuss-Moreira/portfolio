const cursos = [
  { nome: "Advanced Machine Learning Operations", carga: "40h", ano: 2026 },
  { nome: "Estatística para Ciência de Dados e Machine Learning", carga: "90h", ano: 2025 },
  { nome: "Super Academia Estatística - 9 cursos em 1", carga: "20h", ano: 2025 },
  { nome: "Curso Básico de Programação com Python", carga: "40h", ano: 2022 },
];

const projetos = [
  {
    nome: "Padawan Wallet",
    descricao: "Construção de duas telas mobile para novas features, construção da suíte de testes automatizados (E2E, integração, unitários, UI) e desenvolvimento do pipeline CI inicial para garantir o build do aplicativo.",
    tecnologias: ["Swift", "SwiftUI", "Testes automatizados", "CI/CD"],
    categoria: "Open Source",
    link: "https://github.com/thunderbiscuit/padawan-wallet",
  },
  {
    nome: "Bitchat",
    descricao: "Refatoração no código de uma tela, adicionando strings localizáveis e removendo duplicação de código.",
    tecnologias: ["Swift", "SwiftUI"],
    categoria: "Open Source",
    link: "https://github.com/permissionlesstech/bitchat",
  },
  {
    nome: "Detector de Fake News",
    descricao: "Aplicativo para detecção de notícias falsas, com modelo de classificação de texto local em um app react native com componentes nativos em swift.",
    tecnologias: ["Python", "TensorFlow", "Pandas", "Scikit-learn"],
    categoria: "Mobile",
    link: "https://github.com/Viniciuss-Moreira/text-classification",
  },
];

const habilidadesTecnicas = [
  "MLOps", "Python", "Pytorch",
  "Amazon Bedrock", "AWS", "Langchain", "Docker"
];

const habilidadesInterpessoais = [
  "Comunicação", "Trabalho em Equipe", "Organização",
  "Proatividade", "Resolução de Problemas", "Criatividade",
  "Adaptabilidade", "Pensamento Crítico"
];

let currentSection = 0;
let isAnimating = false;
let sections = [];
let dots = [];
const TRANSITION_DURATION = 800;

const sectionLabels = [
  "Início", "Sobre", "Formação", "Cursos", "Projetos", "Competências", "Contato"
];

function inicializarFullpage() {
  sections = document.querySelectorAll(".fp-section");
  const dotsContainer = document.getElementById("pageDots");

  let dotsHtml = "";
  for (let i = 0; i < sections.length; i++) {
    dotsHtml += '<button class="page-dot' + (i === 0 ? " active" : "") + '" data-index="' + i + '" data-label="' + sectionLabels[i] + '"></button>';
  }
  dotsContainer.innerHTML = dotsHtml;
  dots = dotsContainer.querySelectorAll(".page-dot");

  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      navegarParaSecao(index);
    });
  }

  atualizarTemaDots();
}

function navegarParaSecao(index) {
  if (isAnimating || index === currentSection || index < 0 || index >= sections.length) {
    return;
  }

  isAnimating = true;
  const direction = index > currentSection ? "down" : "up";
  const currentEl = sections[currentSection];
  const nextEl = sections[index];

  if (direction === "down") {
    currentEl.classList.add("leaving-up");
  } else {
    currentEl.classList.add("leaving-down");
  }

  if (direction === "down") {
    nextEl.style.transform = "translateY(60px)";
  } else {
    nextEl.style.transform = "translateY(-60px)";
  }

  setTimeout(function () {
    nextEl.classList.add("active");
    nextEl.style.transform = "";
  }, 30);

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  dots[index].classList.add("active");

  setTimeout(function () {
    currentEl.classList.remove("active", "leaving-up", "leaving-down");
    currentSection = index;
    isAnimating = false;
    atualizarTemaDots();
    atualizarNavbar();
  }, TRANSITION_DURATION);
}

function atualizarTemaDots() {
  const dotsContainer = document.getElementById("pageDots");
  dotsContainer.classList.add("on-dark");
}

function atualizarNavbar() {
}

function configurarEventosNavegacao() {
  let cooldown = false;

  document.addEventListener("wheel", function (e) {
    e.preventDefault();

    if (isAnimating || cooldown) {
      return;
    }

    if (Math.abs(e.deltaY) < 5) {
      return;
    }

    if (e.deltaY > 0) {
      navegarParaSecao(currentSection + 1);
    } else {
      navegarParaSecao(currentSection - 1);
    }

    cooldown = true;
    setTimeout(function () {
      cooldown = false;
    }, TRANSITION_DURATION + 200);
  }, { passive: false });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
      e.preventDefault();
      navegarParaSecao(currentSection + 1);
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      navegarParaSecao(currentSection - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      navegarParaSecao(0);
    } else if (e.key === "End") {
      e.preventDefault();
      navegarParaSecao(sections.length - 1);
    }
  });

  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener("touchstart", function (e) {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener("touchend", function (e) {
    touchEndY = e.changedTouches[0].screenY;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > 60) {
      if (diff > 0) {
        navegarParaSecao(currentSection + 1);
      } else {
        navegarParaSecao(currentSection - 1);
      }
    }
  }, { passive: true });
}

function exibirSaudacao() {
  const hora = new Date().getHours();
  const greetingEl = document.getElementById("greeting");

  if (hora >= 5 && hora < 12) {
    greetingEl.textContent = "Bom dia! Bem-vindo(a) ao meu portfólio.";
  } else if (hora >= 12 && hora < 18) {
    greetingEl.textContent = "Boa tarde! Bem-vindo(a) ao meu portfólio.";
  } else {
    greetingEl.textContent = "Boa noite! Bem-vindo(a) ao meu portfólio.";
  }
}

function renderizarCursos() {
  const container = document.getElementById("coursesContainer");
  let html = "";

  for (let i = 0; i < cursos.length; i++) {
    html += '<div class="course-card reveal">' +
      '<h3>' + cursos[i].nome + '</h3>' +
      '<div class="course-meta">' +
      '<span>⏱ ' + cursos[i].carga + '</span>' +
      '<span>' + cursos[i].ano + '</span>' +
      '</div></div>';
  }

  container.innerHTML = html;
}

function renderizarProjetos(filtro) {
  const container = document.getElementById("projectsContainer");
  let html = "";

  for (let i = 0; i < projetos.length; i++) {
    const projeto = projetos[i];

    if (filtro && filtro !== "todos" && projeto.categoria !== filtro) {
      continue;
    }

    let tagsHtml = "";
    for (let j = 0; j < projeto.tecnologias.length; j++) {
      tagsHtml += '<span class="tech-tag">' + projeto.tecnologias[j] + '</span>';
    }

    html += '<div class="project-card reveal" data-categoria="' + projeto.categoria + '">' +
      '<h3>' + projeto.nome + '</h3>' +
      '<p>' + projeto.descricao + '</p>' +
      '<div class="project-techs">' + tagsHtml + '</div>' +
      (projeto.link ? '<a href="' + projeto.link + '" target="_blank" class="project-link">Repositório</a>' : "") +
      '</div>';
  }

  container.innerHTML = html;
}

function renderizarHabilidades() {
  const techContainer = document.getElementById("techSkillsContainer");
  const softContainer = document.getElementById("softSkillsContainer");

  let techHtml = "";
  for (let i = 0; i < habilidadesTecnicas.length; i++) {
    techHtml += '<span class="skill-chip reveal">' + habilidadesTecnicas[i] + '</span>';
  }
  techContainer.innerHTML = techHtml;

  let softHtml = "";
  for (let i = 0; i < habilidadesInterpessoais.length; i++) {
    softHtml += '<span class="skill-chip reveal">' + habilidadesInterpessoais[i] + '</span>';
  }
  softContainer.innerHTML = softHtml;
}

function configurarFiltros() {
  const botoes = document.querySelectorAll(".filter-btn");

  for (let i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", function () {
      for (let j = 0; j < botoes.length; j++) {
        botoes[j].classList.remove("active");
      }
      this.classList.add("active");

      const filtro = this.getAttribute("data-filter");
      renderizarProjetos(filtro);
    });
  }
}

function configurarMenuMobile() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  toggle.addEventListener("click", function () {
    toggle.classList.toggle("active");
    links.classList.toggle("open");
  });

  const itens = links.querySelectorAll("a");
  for (let i = 0; i < itens.length; i++) {
    itens[i].addEventListener("click", function (e) {
      e.preventDefault();
      toggle.classList.remove("active");
      links.classList.remove("open");

      const targetId = this.getAttribute("href").replace("#", "");
      for (let s = 0; s < sections.length; s++) {
        if (sections[s].id === targetId) {
          navegarParaSecao(s);
          break;
        }
      }
    });
  }
}

function configurarNavLinks() {
  const links = document.querySelectorAll('a[href^="#"]');

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.length > 1) {
        e.preventDefault();
        const targetId = href.replace("#", "");
        for (let s = 0; s < sections.length; s++) {
          if (sections[s].id === targetId) {
            navegarParaSecao(s);
            break;
          }
        }
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  exibirSaudacao();
  renderizarCursos();
  renderizarProjetos("todos");
  renderizarHabilidades();
  inicializarFullpage();
  configurarEventosNavegacao();
  configurarFiltros();
  configurarMenuMobile();
  configurarNavLinks();
  atualizarNavbar();
});
