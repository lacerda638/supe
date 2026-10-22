const apiKey = "a57573ceac50140567dc9a042645ef47";

// ==========================
// URLS OPENWEATHER
// ==========================
const climaAtualURL = `https://api.openweathermap.org/data/2.5/weather?q=Guarulhos&appid=${apiKey}&units=metric&lang=pt_br`;
const previsaoURL = `https://api.openweathermap.org/data/2.5/forecast?q=Guarulhos&appid=${apiKey}&units=metric&lang=pt_br`;

// Variáveis Globais de Estado
let chuvaRealAPI = 0;
let chuvaAtualGlobal = 0;
let filtroAtual = "todos";
let dadosClimaReal = null; // Guarda cache da API

// ==========================
// INICIALIZAÇÃO DO MAPA LEAFLET
// ==========================
const mapa = L.map("mapa-guarulhos").setView([-23.4543, -46.5333], 11);

// Camada Base Limpa e Minimalista (CartoDB Light - Sem chave necessária)
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
}).addTo(mapa);

// Grupos de Marcadores e Heatmap
const camadasMarcadores = L.layerGroup().addTo(mapa);
const camadaApoio = L.layerGroup().addTo(mapa);
const camadaRotasFuga = L.layerGroup().addTo(mapa);
let camadaHeatmap = null;

// ==========================
// BASE DE DADOS DOS BAIRROS (GUARULHOS)
// ==========================
const bairros = [
  { nome: "Centro", coords: [-23.468, -46.528], vulnerabilidade: 3, historico: 6, drenagem: 7 },
  { nome: "Macedo", coords: [-23.458, -46.518], vulnerabilidade: 2, historico: 4, drenagem: 5 },
  { nome: "Bom Clima", coords: [-23.447, -46.519], vulnerabilidade: 2, historico: 4, drenagem: 5 },
  { nome: "Gopoúva", coords: [-23.468, -46.541], vulnerabilidade: 3, historico: 5, drenagem: 6 },
  { nome: "Vila Augusta", coords: [-23.477, -46.543], vulnerabilidade: 3, historico: 5, drenagem: 6 },
  { nome: "Torres Tibagy", coords: [-23.456, -46.550], vulnerabilidade: 4, historico: 7, drenagem: 7 },
  { nome: "Vila Galvão", coords: [-23.451, -46.561], vulnerabilidade: 4, historico: 7, drenagem: 7 },
  { nome: "Cabuçu", coords: [-23.391, -46.548], vulnerabilidade: 8, historico: 8, drenagem: 8 },
  { nome: "Recreio São Jorge", coords: [-23.385, -46.545], vulnerabilidade: 8, historico: 8, drenagem: 8 },
  { nome: "Jardim Continental", coords: [-23.421, -46.552], vulnerabilidade: 4, historico: 5, drenagem: 6 },
  { nome: "Parque Continental", coords: [-23.420, -46.550], vulnerabilidade: 4, historico: 5, drenagem: 6 },
  { nome: "Palmares", coords: [-23.383, -46.512], vulnerabilidade: 6, historico: 6, drenagem: 6 },
  { nome: "Bananal", coords: [-23.381, -46.505], vulnerabilidade: 6, historico: 6, drenagem: 6 },
  { nome: "Pimentas", coords: [-23.448, -46.417], vulnerabilidade: 8, historico: 8, drenagem: 8 },
  { nome: "Jardim Maria Dirce", coords: [-23.450, -46.425], vulnerabilidade: 8, historico: 8, drenagem: 8 },
  { nome: "Jardim Centenário", coords: [-23.451, -46.410], vulnerabilidade: 8, historico: 8, drenagem: 8 },
  { nome: "Cumbica", coords: [-23.442, -46.467], vulnerabilidade: 8, historico: 9, drenagem: 9 },
  { nome: "Jardim Nova Cumbica", coords: [-23.445, -46.455], vulnerabilidade: 8, historico: 9, drenagem: 9 },
  { nome: "Bonsucesso", coords: [-23.416, -46.411], vulnerabilidade: 6, historico: 7, drenagem: 7 },
  { nome: "Água Chata", coords: [-23.435, -46.402], vulnerabilidade: 6, historico: 7, drenagem: 7 },
  { nome: "Vila Any", coords: [-23.488, -46.428], vulnerabilidade: 9, historico: 10, drenagem: 10 },
  { nome: "Jardim Pantanal", coords: [-23.491, -46.418], vulnerabilidade: 9, historico: 10, drenagem: 10 },
  { nome: "Novo Recreio", coords: [-23.401, -46.540], vulnerabilidade: 9, historico: 10, drenagem: 10 },
  { nome: "Cidade Soberana", coords: [-23.400, -46.455], vulnerabilidade: 6, historico: 7, drenagem: 7 },
  { nome: "Cidade Seródio", coords: [-23.408, -46.461], vulnerabilidade: 6, historico: 7, drenagem: 7 },
  { nome: "Jardim São João", coords: [-23.395, -46.463], vulnerabilidade: 5, historico: 6, drenagem: 6 },
  { nome: "Lavras", coords: [-23.382, -46.438], vulnerabilidade: 6, historico: 5, drenagem: 6 },
  { nome: "Taboão", coords: [-23.435, -46.495], vulnerabilidade: 5, historico: 7, drenagem: 7 },
  { nome: "Parque Cecap", coords: [-23.442, -46.505], vulnerabilidade: 3, historico: 4, drenagem: 5 },
  { nome: "Itapegica", coords: [-23.483, -46.539], vulnerabilidade: 5, historico: 8, drenagem: 7 },
  { nome: "Ponte Grande", coords: [-23.496, -46.545], vulnerabilidade: 4, historico: 7, drenagem: 7 },
  { nome: "Porto da Igreja", coords: [-23.485, -46.525], vulnerabilidade: 5, historico: 8, drenagem: 8 },
  { nome: "Picanço", coords: [-23.445, -46.540], vulnerabilidade: 2, historico: 4, drenagem: 5 },
  { nome: "Jardim Paraventi", coords: [-23.445, -46.522], vulnerabilidade: 2, historico: 4, drenagem: 5 },
  { nome: "Jardim Maia", coords: [-23.455, -46.520], vulnerabilidade: 2, historico: 4, drenagem: 5 },
  { nome: "Vila Rio de Janeiro", coords: [-23.435, -46.538], vulnerabilidade: 4, historico: 5, drenagem: 6 },
  { nome: "Jardim Bela Vista", coords: [-23.432, -46.518], vulnerabilidade: 2, historico: 4, drenagem: 5 },
  { nome: "Jardim Presidente Dutra", coords: [-23.415, -46.455], vulnerabilidade: 6, historico: 7, drenagem: 7 },
  { nome: "Itaim", coords: [-23.495, -46.402], vulnerabilidade: 8, historico: 9, drenagem: 9 },
  { nome: "Várzea do Palácio", coords: [-23.465, -46.495], vulnerabilidade: 6, historico: 8, drenagem: 8 },
  { nome: "Vila Barros", coords: [-23.445, -46.510], vulnerabilidade: 4, historico: 6, drenagem: 6 },
  { nome: "Vila Fátima", coords: [-23.450, -46.501], vulnerabilidade: 4, historico: 5, drenagem: 6 },
  { nome: "Inocoop", coords: [-23.410, -46.440], vulnerabilidade: 4, historico: 5, drenagem: 6 },
  { nome: "Aracília", coords: [-23.430, -46.388], vulnerabilidade: 7, historico: 8, drenagem: 8 },
  { nome: "Vila Carmela", coords: [-23.415, -46.425], vulnerabilidade: 5, historico: 6, drenagem: 6 },
  { nome: "Haroldo Veloso", coords: [-23.405, -46.450], vulnerabilidade: 6, historico: 7, drenagem: 7 },
  { nome: "Vila Tranquilidade", coords: [-23.468, -46.551], vulnerabilidade: 3, historico: 5, drenagem: 6 },
  { nome: "Vila São Rafael", coords: [-23.485, -46.555], vulnerabilidade: 4, historico: 7, drenagem: 7 },
  { nome: "Vila das Palmeiras", coords: [-23.475, -46.515], vulnerabilidade: 4, historico: 6, drenagem: 6 },
  { nome: "Mato Dentro", coords: [-23.360, -46.565], vulnerabilidade: 5, historico: 3, drenagem: 4 },
  { nome: "Água Azul", coords: [-23.345, -46.445], vulnerabilidade: 6, historico: 4, drenagem: 4 },
  { nome: "Morro Grande", coords: [-23.325, -46.485], vulnerabilidade: 5, historico: 3, drenagem: 4 },
  { nome: "Morungaba", coords: [-23.335, -46.555], vulnerabilidade: 5, historico: 3, drenagem: 4 },
  { nome: "Capelinha", coords: [-23.355, -46.475], vulnerabilidade: 5, historico: 3, drenagem: 4 }
];

// ==========================================
// BASE DE DADOS: PONTOS DE APOIO E ABRIGOS
// ==========================================
const pontosApoio = [
  {
    id: "ponto-1",
    nome: "Estádio Municipal Cícero Miranda",
    categoria: "ABRIGO_TEMPORARIO",
    tipo: "Ginásio / Alojamento",
    coords: [-23.4618, -46.5475],
    endereco: "Vila Galvão, Guarulhos - SP",
    capacidade: "500 pessoas",
    contato: "(11) 2451-5588",
    bairrosAtendidos: ["Vila Galvão", "Torres Tibagy", "Gopoúva"]
  },
  {
    id: "ponto-2",
    nome: "EPG Amador Bueno",
    categoria: "ABRIGO_TEMPORARIO",
    tipo: "Escola Municipal",
    coords: [-23.4475, -46.4180],
    endereco: "Pimentas, Guarulhos - SP",
    capacidade: "250 pessoas",
    contato: "(11) 2484-1000",
    bairrosAtendidos: ["Pimentas", "Jardim Maria Dirce", "Jardim Centenário"]
  },
  {
    id: "ponto-3",
    nome: "UPA Cumbica",
    categoria: "SAUDE_EMERGENCIA",
    tipo: "Unidade de Pronto Atendimento 24h",
    coords: [-23.4410, -46.4620],
    endereco: "Av. Curuçá, 250 - Cumbica",
    capacidade: "Atendimento 24h",
    contato: "192 / (11) 2412-0000",
    bairrosAtendidos: ["Cumbica", "Jardim Nova Cumbica"]
  },
  {
    id: "ponto-4",
    nome: "5º Grupamento de Bombeiros / Posto Macedo",
    categoria: "DEFESA_RESGATE",
    tipo: "Corpo de Bombeiros / Resgate",
    coords: [-23.4580, -46.5150],
    endereco: "Av. Mariana Ubaldina do Espírito Santo, 731",
    capacidade: "Unidade Operacional",
    contato: "193",
    bairrosAtendidos: ["Macedo", "Centro", "Bom Clima"]
  },
  {
    id: "ponto-5",
    nome: "CEU Paraíso Alvorada / EPG",
    categoria: "ABRIGO_TEMPORARIO",
    tipo: "CEU / Escola de Apoio",
    coords: [-23.4870, -46.4250],
    endereco: "Vila Any, Guarulhos - SP",
    capacidade: "400 pessoas",
    contato: "(11) 2480-2000",
    bairrosAtendidos: ["Vila Any", "Jardim Pantanal", "Itaim"]
  },
  {
    id: "ponto-6",
    nome: "CEU Pimentas",
    categoria: "ABRIGO_TEMPORARIO",
    tipo: "CEU / Centro Comunitário",
    coords: [-23.4402, -46.4023],
    endereco: "Estr. do Caminho Velho, 351 - Pimentas",
    capacidade: "600 pessoas",
    contato: "(11) 2484-4122",
    bairrosAtendidos: []
  },
  {
    id: "ponto-7",
    nome: "CEU Presidente Dutra",
    categoria: "ABRIGO_TEMPORARIO",
    tipo: "CEU / Centro Comunitário",
    coords: [-23.4158, -46.4431],
    endereco: "Rua Valdemar de Paula, 132 - Jd. Presidente Dutra",
    capacidade: "450 pessoas",
    contato: "(11) 2431-3000",
    bairrosAtendidos: []
  },
  {
    id: "ponto-8",
    nome: "CEU Bambi / Bonsucesso",
    categoria: "ABRIGO_TEMPORARIO",
    tipo: "CEU / Centro Comunitário",
    coords: [-23.3872, -46.4089],
    endereco: "Rua Virasoro, 400 - Parque Residencial Bambi",
    capacidade: "400 pessoas",
    contato: "(11) 2408-5500",
    bairrosAtendidos: []
  },
  {
    id: "ponto-9",
    nome: "CEU Continental",
    categoria: "ABRIGO_TEMPORARIO",
    tipo: "CEU / Centro Comunitário",
    coords: [-23.4198, -46.5491],
    endereco: "Rua Sete de Setembro, 257 - Parque Continental",
    capacidade: "350 pessoas",
    contato: "(11) 2086-1000",
    bairrosAtendidos: []
  },
  {
    id: "ponto-10",
    nome: "UPA São João",
    categoria: "SAUDE_EMERGENCIA",
    tipo: "Unidade de Pronto Atendimento 24h",
    coords: [-23.3981, -46.4621],
    endereco: "Rua Jamil João Zarif, 651 - Jd. São João",
    capacidade: "Atendimento 24h",
    contato: "192 / (11) 2468-0000",
    bairrosAtendidos: []
  },
  {
    id: "ponto-11",
    nome: "Hospital Geral de Guarulhos (HGG)",
    categoria: "SAUDE_EMERGENCIA",
    tipo: "Hospital Regional / Emergência",
    coords: [-23.4428, -46.5025],
    endereco: "Alameda dos Lírios, 300 - Parque Cecap",
    capacidade: "Atendimento de Alta Complexidade",
    contato: "(11) 2408-8000",
    bairrosAtendidos: []
  },
  {
    id: "ponto-12",
    nome: "Hospital Municipal Urgências (HMU)",
    categoria: "SAUDE_EMERGENCIA",
    tipo: "Hospital de Urgência",
    coords: [-23.4831, -46.5385],
    endereco: "Rua José Maurício, 191 - Centro",
    capacidade: "Atendimento 24h",
    contato: "(11) 2472-5000",
    bairrosAtendidos: []
  },
  {
    id: "ponto-13",
    nome: "CEU Cumbica",
    categoria: "ABRIGO_TEMPORARIO",
    tipo: "CEU / Centro Comunitário",
    coords: [-23.4431, -46.4528],
    endereco: "Av. Atalaia do Norte, 743 - Cumbica",
    capacidade: "500 pessoas",
    contato: "(11) 2412-1000",
    bairrosAtendidos: []
  },
  {
    id: "ponto-14",
    nome: "Sede da Defesa Civil de Guarulhos",
    categoria: "DEFESA_RESGATE",
    tipo: "Defesa Civil / Central de Resgate",
    coords: [-23.4688, -46.5262],
    endereco: "Rua Doutor Nilo Peçanha, 125 - Centro",
    capacidade: "Central de Operações e Monitoramento",
    contato: "199 / (11) 2408-3000",
    bairrosAtendidos: []
  }
];

// Helper para atualização de elementos DOM com verificação
function atualizarElemento(id, valor) {
  const elem = document.getElementById(id);
  if (elem) elem.innerHTML = valor;
}

// ==========================
// CONSULTA DE CLIMA EM TEMPO REAL
// ==========================
async function buscarClimaReal() {
  try {
    const response = await fetch(climaAtualURL);
    if (!response.ok) throw new Error("Erro ao consultar a API OpenWeather");
    
    dadosClimaReal = await response.json();
    chuvaRealAPI = dadosClimaReal.rain?.["1h"] || 0;

    const temperatura = Math.round(dadosClimaReal.main.temp);
    const sensacao = Math.round(dadosClimaReal.main.feels_like);
    const umidade = dadosClimaReal.main.humidity;
    const vento = Math.round(dadosClimaReal.wind.speed * 3.6);
    
    const hoje = new Date();
    const diasSemana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
    const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    const dataFormatada = `${diasSemana[hoje.getDay()]}, ${hoje.getDate()} de ${meses[hoje.getMonth()]}`;

    atualizarElemento("data-clima", dataFormatada);
    atualizarElemento("temperatura", `${temperatura}°C`);
    atualizarElemento("areas-painel", bairros.length);
    atualizarElemento("info-clima", `
      <div class="info-item-clima"><span>Umidade do Ar</span><strong>${umidade}%</strong></div>
      <div class="info-item-clima"><span>Velocidade do Vento</span><strong>${vento} km/h</strong></div>
      <div class="info-item-clima"><span>Sensação Térmica</span><strong>${sensacao}°C</strong></div>
    `);

    setSimulacao(chuvaRealAPI);

  } catch (err) {
    console.error("Erro no processamento do clima:", err);
    setSimulacao(0);
  }
}

// ==========================
// SIMULADOR DE IMPACTO PLUVIAL (GLOBAL)
// ==========================
function executarSimulacao(chuvaSimulada) {
  chuvaAtualGlobal = Number(chuvaSimulada);

  const sliderChuva = document.getElementById('slider-chuva');
  const valChuva = document.getElementById('val-chuva');
  if (sliderChuva) sliderChuva.value = chuvaAtualGlobal;
  if (valChuva) valChuva.innerText = chuvaAtualGlobal;

  let descricaoClima = "Tempo Ensolarado / Limpo";
  let emoji = "☀️";

  if (chuvaAtualGlobal > 0 && chuvaAtualGlobal < 5) {
    descricaoClima = "Chuva Leve / Garoa";
    emoji = "🌦️";
  } else if (chuvaAtualGlobal >= 5 && chuvaAtualGlobal < 25) {
    descricaoClima = "Chuva Moderada / Recorrente";
    emoji = "🌧️";
  } else if (chuvaAtualGlobal >= 25) {
    descricaoClima = "Tempestade Intensa com Raios";
    emoji = "⛈️";
  }

  atualizarElemento("descricao-clima", descricaoClima);
  atualizarElemento("clima-painel", descricaoClima);
  atualizarElemento("emoji-clima", emoji);
  atualizarElemento("chuva-painel", `${chuvaAtualGlobal} mm`);

  bairros.forEach(bairro => {
    const baseRisco = (
      bairro.vulnerabilidade * 0.40 +
      bairro.historico * 0.35 +
      (10 - bairro.drenagem) * 0.25
    ) / 10;

    if (chuvaAtualGlobal < 1) {
      bairro.risco = Number((baseRisco * 0.35).toFixed(2));
    } else {
      let fatorChuva = 0;
      if (chuvaAtualGlobal < 5) {
        fatorChuva = 0.05 + (bairro.vulnerabilidade / 10) * 0.10;
      } else if (chuvaAtualGlobal < 15) {
        fatorChuva = 0.12 + (bairro.vulnerabilidade / 10) * 0.20;
      } else if (chuvaAtualGlobal < 30) {
        fatorChuva = 0.25 + (bairro.vulnerabilidade / 10) * 0.30;
      } else {
        fatorChuva = 0.40 + (bairro.vulnerabilidade / 10) * 0.40;
      }
      bairro.risco = Number(Math.min(baseRisco * 0.45 + fatorChuva, 1.0).toFixed(2));
    }
  });

  const somaRisco = bairros.reduce((acc, b) => acc + b.risco, 0);
  const mediaRiscoCidade = somaRisco / bairros.length;

  let riscoPredominante = "Baixo";
  if (chuvaAtualGlobal >= 30 || mediaRiscoCidade >= 0.70) {
    riscoPredominante = "Extremo";
  } else if (chuvaAtualGlobal >= 15 || mediaRiscoCidade >= 0.50) {
    riscoPredominante = "Alto";
  } else if (chuvaAtualGlobal >= 2 || mediaRiscoCidade >= 0.28) {
    riscoPredominante = "Médio";
  }

  const riscoPainel = document.getElementById("risco-painel");
  if (riscoPainel) {
    riscoPainel.innerHTML = riscoPredominante;
    riscoPainel.className = "";

    if (riscoPredominante === "Extremo") riscoPainel.classList.add("risco-extremo");
    else if (riscoPredominante === "Alto") riscoPainel.classList.add("risco-alto");
    else if (riscoPredominante === "Médio") riscoPainel.classList.add("risco-medio");
    else riscoPainel.classList.add("risco-baixo");
  }

  const statusSistema = document.getElementById("status-sistema");
  if (statusSistema) {
    if (riscoPredominante === "Extremo") {
      statusSistema.innerHTML = "🔴 Alerta Vermelho: Risco elevado de alagamentos.";
    } else if (riscoPredominante === "Alto") {
      statusSistema.innerHTML = "🟠 Áreas de atenção monitoradas intensivamente.";
    } else if (riscoPredominante === "Médio") {
      statusSistema.innerHTML = "🟡 Atenção moderada para pancadas isoladas.";
    } else {
      statusSistema.innerHTML = "🟢 Condições estáveis e monitoramento ativo.";
    }
  }

  const alertaBox = document.getElementById("alerta-box");
  const alertaTitulo = document.getElementById("alerta-titulo");
  const alertaTexto = document.getElementById("alerta-texto");
  const alertaTopo = document.getElementById("alerta-topo");

  if (chuvaAtualGlobal >= 25 || riscoPredominante === "Extremo") {
    if (alertaBox) alertaBox.className = "alerta-box alerta-vermelho";
    if (alertaTitulo) alertaTitulo.innerHTML = "⚠️ Alerta de Tempestade Extrema";
    if (alertaTexto) alertaTexto.innerHTML = "Alto risco de alagamentos e enxurradas bruscas. Evite deslocamentos nas áreas vermelhas.";
    if (alertaTopo) {
      alertaTopo.style.display = "block";
      alertaTopo.innerHTML = "⚠️ ALERTA DE TEMPESTADE E RISCO DE ENCHENTE EM GUARULHOS";
    }
  } else if (chuvaAtualGlobal >= 5 || riscoPredominante === "Alto") {
    if (alertaBox) alertaBox.className = "alerta-box alerta-laranja";
    if (alertaTitulo) alertaTitulo.innerHTML = "🌧️ Alerta de Chuva Moderada / Atenção";
    if (alertaTexto) alertaTexto.innerHTML = "Pontos de alagamento transitórios podem se formar nos bairros vulneráveis.";
    if (alertaTopo) {
      alertaTopo.style.display = "block";
      alertaTopo.innerHTML = "🌧️ ATENÇÃO: PRECIPITAÇÃO MODERADA EM GUARULHOS";
    }
  } else {
    if (alertaBox) alertaBox.className = "alerta-box";
    if (alertaTitulo) alertaTitulo.innerHTML = "✅ Clima Estável / Monitoramento Ativo";
    if (alertaTexto) alertaTexto.innerHTML = "Sem alertas críticos de tempestade no momento.";
    if (alertaTopo) alertaTopo.style.display = "none";
  }

  renderizarMapa(chuvaAtualGlobal, filtroAtual);
  atualizarPontosApoioERotas(riscoPredominante, chuvaAtualGlobal);
}

function setSimulacao(mm) {
  executarSimulacao(mm);
}

function resetClimaReal() {
  executarSimulacao(chuvaRealAPI);
}

// ==========================
// RENDERIZAÇÃO DO MAPA & MARCADORES
// ==========================
function renderizarMapa(chuvaAtual, filtroNivel = "todos") {
  camadasMarcadores.clearLayers();
  if (camadaHeatmap) mapa.removeLayer(camadaHeatmap);

  const pontosHeat = [];

  bairros.forEach(bairro => {
    let nivel = "Baixo";
    if (bairro.risco >= 0.75) nivel = "Extremo";
    else if (bairro.risco >= 0.55) nivel = "Alto";
    else if (bairro.risco >= 0.35) nivel = "Médio";

    if (filtroNivel !== "todos" && nivel.toLowerCase() !== filtroNivel.toLowerCase()) return;

    pontosHeat.push([bairro.coords[0], bairro.coords[1], bairro.risco]);

    const corMarcador = nivel === "Extremo" ? "#8b0000" : nivel === "Alto" ? "#ff4d4d" : nivel === "Médio" ? "#f39c12" : "#2ecc71";

    const marker = L.circleMarker(bairro.coords, {
      radius: 9,
      fillColor: corMarcador,
      color: "#ffffff",
      weight: 2,
      fillOpacity: 0.95
    }).bindPopup(`
      <div class="popup-risco" style="padding: 5px;">
        <h3 style="margin: 0 0 5px 0; color: #1e293b;">${bairro.nome}</h3>
        <p style="margin: 3px 0;">Nível de risco: <strong style="color:${corMarcador}">${nivel}</strong></p>
        <p style="margin: 3px 0;">Índice numérico: <strong>${bairro.risco.toFixed(2)}</strong></p>
        <p style="margin: 3px 0;">Chuva Simulada: <strong>${chuvaAtual} mm</strong></p>
        <a href="#sos-emergencia" onclick="focarEmergencia('${bairro.nome}')" style="display:inline-block; margin-top:8px; color:#dc2626; font-weight:bold;">🚨 Ver Contatos SOS</a>
      </div>
    `);

    camadasMarcadores.addLayer(marker);
  });

  if (typeof L.heatLayer === "function" && pontosHeat.length > 0) {
    camadaHeatmap = L.heatLayer(pontosHeat, {
      radius: 45,
      blur: 35,
      maxZoom: 17,
      gradient: { 0.2: "#2ecc71", 0.5: "#f39c12", 0.8: "#ff4d4d", 1.0: "#8b0000" }
    }).addTo(mapa);
  }
}

// ==========================
// FILTRAGEM POR RISCO
// ==========================
function filtrarRisco(nivel, elementoBtn) {
  filtroAtual = nivel;
  
  const botoes = document.querySelectorAll(".btn-filtro");
  botoes.forEach(btn => btn.classList.remove("active"));

  if (elementoBtn) {
    elementoBtn.classList.add("active");
  } else {
    const btnEncontrado = Array.from(botoes).find(b => b.textContent.toLowerCase() === nivel.toLowerCase());
    if (btnEncontrado) btnEncontrado.classList.add("active");
  }

  renderizarMapa(chuvaAtualGlobal, filtroAtual);
}

// ==========================
// PREVISÃO DO TEMPO (CARDS 5 DIAS)
// ==========================
fetch(previsaoURL)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("previsao-cards");
    if (!container) return;

    container.innerHTML = "";
    const dias = {};

    data.list.forEach(item => {
      const dia = item.dt_txt.split(" ")[0];
      if (!dias[dia]) dias[dia] = item;
    });

    const nomesDias = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

    Object.values(dias)
      .slice(0, 5)
      .forEach(item => {
        const dataObj = new Date(item.dt_txt);
        const nomeDia = nomesDias[dataObj.getDay()];
        const temperatura = Math.round(item.main.temp);
        const sensacao = Math.round(item.main.feels_like);
        const umidade = item.main.humidity;
        const descricao = item.weather[0].description;

        container.innerHTML += `
          <div class="previsao-card">
            <h3>${nomeDia}</h3>
            <p class="temperatura-dia">${temperatura}°C</p>
            <p style="text-transform: capitalize;">${descricao}</p>
            <div class="extra-info">
              💧 Umidade: ${umidade}%<br>
              🌡️ Sensação: ${sensacao}°C
            </div>
          </div>
        `;
      });
  })
  .catch(err => console.error("Erro na previsão estendida:", err));

// ==========================
// GERADOR DE ÍCONES DE APOIO
// ==========================
function criarIconeApoio(categoria) {
  let classeCor = "marker-abrigo";
  let svgIcon = "";

  if (categoria === "ABRIGO_TEMPORARIO") {
    classeCor = "marker-abrigo";
    svgIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
  } else if (categoria === "SAUDE_EMERGENCIA") {
    classeCor = "marker-saude";
    svgIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"></path></svg>`;
  } else if (categoria === "DEFESA_RESGATE") {
    classeCor = "marker-resgate";
    svgIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
  }

  return L.divIcon({
    className: `custom-marker-icon ${classeCor}`,
    html: svgIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
}

// ==========================================
// HELPER: CÁLCULO DE DISTÂNCIA GEOGRÁFICA (HAVERSINE)
// ==========================================
function calcularDistancia(coords1, coords2) {
  const R = 6371; // Raio da Terra em km
  const dLat = (coords2[0] - coords1[0]) * (Math.PI / 180);
  const dLon = (coords2[1] - coords1[1]) * (Math.PI / 180);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coords1[0] * (Math.PI / 180)) * Math.cos(coords2[0] * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distância em km
}

// ==========================================
// RENDERIZAÇÃO DE PONTOS DE APOIO E ROTAS
// ==========================================
function atualizarPontosApoioERotas(riscoGeral, chuvaAtual) {
  camadaApoio.clearLayers();
  camadaRotasFuga.clearLayers();

  const deveExibir = chuvaAtual >= 5 || riscoGeral === "Alto" || riscoGeral === "Extremo";

  if (!deveExibir) return;

  // 1. Renderizar os marcadores dos Pontos de Apoio
  pontosApoio.forEach(ponto => {
    const marker = L.marker(ponto.coords, {
      icon: criarIconeApoio(ponto.categoria)
    }).bindPopup(`
      <div style="font-family: sans-serif; padding: 4px; max-width: 230px;">
        <span style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: #64748b;">
          ${ponto.categoria.replace("_", " ")}
        </span>
        <h4 style="margin: 3px 0 6px 0; color: #0f172a; font-size: 14px;">${ponto.nome}</h4>
        <p style="margin: 2px 0; font-size: 12px;"><strong>Tipo:</strong> ${ponto.tipo}</p>
        <p style="margin: 2px 0; font-size: 12px;"><strong>Capacidade:</strong> ${ponto.capacidade}</p>
        <p style="margin: 2px 0; font-size: 12px;"><strong>Endereço:</strong> ${ponto.endereco}</p>
        <p style="margin: 2px 0; font-size: 12px;"><strong>Contato:</strong> <a href="tel:${ponto.contato}" style="color: #dc2626; font-weight: bold;">${ponto.contato}</a></p>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${ponto.coords[0]},${ponto.coords[1]}" target="_blank" 
           style="display: block; text-align: center; margin-top: 8px; background: #2563eb; color: white; padding: 6px; border-radius: 4px; text-decoration: none; font-size: 12px; font-weight: bold;">
          🚗 Traçar Rota de Fuga
        </a>
      </div>
    `);

    camadaApoio.addLayer(marker);
  });

  // 2. Traçar rotas conectando cada bairro ao Ponto de Apoio MAIS PRÓXIMO
  bairros.forEach(bairro => {
    let nivelBairro = "Baixo";
    if (bairro.risco >= 0.75) nivelBairro = "Extremo";
    else if (bairro.risco >= 0.55) nivelBairro = "Alto";

    if (nivelBairro === "Alto" || nivelBairro === "Extremo") {
      let abrigoMaisProximo = null;
      let menorDistancia = Infinity;

      pontosApoio.forEach(ponto => {
        const dist = calcularDistancia(bairro.coords, ponto.coords);
        if (dist < menorDistancia) {
          menorDistancia = dist;
          abrigoMaisProximo = ponto;
        }
      });

      if (abrigoMaisProximo) {
        const rotaLinha = L.polyline([bairro.coords, abrigoMaisProximo.coords], {
          color: nivelBairro === "Extremo" ? "#dc2626" : "#f59e0b",
          weight: 4,
          opacity: 0.85,
          dashArray: "8, 12",
          className: "rota-fuga-animada"
        }).bindTooltip(`<strong>Rota de Evacuação:</strong> ${bairro.nome} ➔ ${abrigoMaisProximo.nome} (${menorDistancia.toFixed(1)} km)`, {
          sticky: true
        });

        camadaRotasFuga.addLayer(rotaLinha);
      }
    }
  });
}

// ==========================
// CONTROLE DE CAMADAS NO MAPA
// ==========================
const controleFiltros = L.control({ position: 'topright' });

controleFiltros.onAdd = function () {
  const div = L.DomUtil.create('div', 'painel-filtros-apoio');
  div.innerHTML = `
    <strong>🏥 Pontos de Emergência</strong><br>
    <label><input type="checkbox" id="chk-abrigos" checked onchange="toggleCamadaApoio(this.checked)"> Exibir Abrigos / UTIs</label><br>
    <label><input type="checkbox" id="chk-rotas" checked onchange="toggleCamadaRotas(this.checked)"> Exibir Linhas de Fuga</label>
  `;
  return div;
};

controleFiltros.addTo(mapa);

function toggleCamadaApoio(status) {
  if (status) mapa.addLayer(camadaApoio);
  else mapa.removeLayer(camadaApoio);
}

function toggleCamadaRotas(status) {
  if (status) mapa.addLayer(camadaRotasFuga);
  else mapa.removeLayer(camadaRotasFuga);
}

function focarEmergencia(nomeBairro) {
  const sosSection = document.getElementById("sos-emergencia");
  if (sosSection) {
    sosSection.scrollIntoView({ behavior: "smooth" });
  }
}

// ==========================================
// LÓGICA DE BUSCA DE BAIRRO (SUPORTE AO INDEX.HTML)
// ==========================================
function buscarBairro(termo) {
  const texto = termo.toLowerCase().trim();
  if (!texto) {
    renderizarMapa(chuvaAtualGlobal, filtroAtual);
    return;
  }

  const bairroEncontrado = bairros.find(b => b.nome.toLowerCase().includes(texto));

  if (bairroEncontrado) {
    selecionarBairro(bairroEncontrado);
  }
}

function limparBuscaBairro() {
  const inputBusca = document.getElementById("input-busca-bairro");
  if (inputBusca) inputBusca.value = "";
  mapa.setView([-23.4543, -46.5333], 11);
  renderizarMapa(chuvaAtualGlobal, filtroAtual);
}

function selecionarBairro(bairro) {
  let nivelBairro = "Baixo / Moderado";
  let corBadge = "#22c55e";
  
  if (bairro.risco >= 0.75) {
    nivelBairro = "EXTREMO";
    corBadge = "#dc2626";
  } else if (bairro.risco >= 0.55) {
    nivelBairro = "ALTO";
    corBadge = "#f59e0b";
  }

  let apoioProximo = null;
  let menorDistancia = Infinity;

  pontosApoio.forEach(ponto => {
    const dist = calcularDistancia(bairro.coords, ponto.coords);
    if (dist < menorDistancia) {
      menorDistancia = dist;
      apoioProximo = ponto;
    }
  });

  mapa.flyTo(bairro.coords, 14, {
    duration: 1.5
  });

  const popupContent = `
    <div style="font-family: sans-serif; padding: 4px; max-width: 220px;">
      <h3 style="margin: 0 0 4px 0; color: #0f172a; font-size: 15px;">${bairro.nome}</h3>
      <div style="margin-bottom: 8px;">
        Status de Risco: 
        <span style="background: ${corBadge}; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 11px;">
          ${nivelBairro}
        </span>
      </div>
      <hr style="border:0; border-top: 1px solid #e2e8f0; margin: 6px 0;">
      <div style="font-size: 12px; color: #334155;">
        <strong>Ponto de Apoio Referência:</strong><br>
        📍 ${apoioProximo ? apoioProximo.nome : "Não identificado"}<br>
        <span style="color: #64748b; font-size: 11px;">Distância: ~${menorDistancia.toFixed(1)} km</span>
      </div>
    </div>
  `;

  L.popup()
    .setLatLng(bairro.coords)
    .setContent(popupContent)
    .openOn(mapa);
}

// ==========================
// INICIALIZAÇÃO NA CARGA DA PÁGINA
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  buscarClimaReal();

  const sliderChuva = document.getElementById('slider-chuva');
  if (sliderChuva) {
    sliderChuva.addEventListener('input', (e) => {
      executarSimulacao(e.target.value);
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const btnTema = document.getElementById('btn-alternar-tema');
  const iconeTema = document.getElementById('icone-tema');
  const linkTema = document.getElementById('tema-css');

  const ARCHIVO_MODO_ESCURO = 'style_2.css'; 
  const ARCHIVO_MODO_CLARO = 'style_claro.css';

  function definirTema(tema) {
    if (tema === 'claro') {
      linkTema.setAttribute('href', ARCHIVO_MODO_CLARO);
      if (iconeTema) iconeTema.textContent = '☀️';
    } else {
      linkTema.setAttribute('href', ARCHIVO_MODO_ESCURO);
      if (iconeTema) iconeTema.textContent = '🌙';
    }
  }

  const temaSalvo = localStorage.getItem('tema_supe') || 'escuro';
  definirTema(temaSalvo);

  if (btnTema) {
    btnTema.addEventListener('click', () => {
      const eModoClaro = linkTema.getAttribute('href') === ARCHIVO_MODO_CLARO;
      const novoTema = eModoClaro ? 'escuro' : 'claro';
      
      definirTema(novoTema);
      localStorage.setItem('tema_supe', novoTema);
    });
  }
});