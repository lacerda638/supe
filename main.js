const apiKey = "a57573ceac50140567dc9a042645ef47";

// ==========================
// CLIMA ATUAL
// ==========================

const climaAtualURL =
  `https://api.openweathermap.org/data/2.5/weather?q=Guarulhos&appid=${apiKey}&units=metric&lang=pt_br`;

fetch(climaAtualURL)

.then(response => response.json())

.then(data => {

  const temperatura =
    Math.round(data.main.temp);

  const descricao =
    data.weather[0].description;

  const clima =
    data.weather[0].main.toLowerCase();

  document.getElementById("temperatura")
  .innerHTML = `${temperatura}°C`;

  document.getElementById("descricao-clima")
  .innerHTML = descricao;

  const alertaBox =
    document.getElementById("alerta-box");

  const alertaTitulo =
    document.getElementById("alerta-titulo");

  const alertaTexto =
    document.getElementById("alerta-texto");

  if (clima.includes("thunderstorm")) {

    alertaBox.classList.add("alerta-vermelho");

    alertaTitulo.innerHTML =
      "⚠️ Alerta de tempestade";

    alertaTexto.innerHTML =
      "Há risco de chuva intensa e alagamentos.";

    document.getElementById("alerta-topo")
    .style.display = "block";

  }

  else if (clima.includes("rain")) {

    alertaBox.classList.add("alerta-laranja");

    alertaTitulo.innerHTML =
      "🌧️ Alerta de chuva";

    alertaTexto.innerHTML =
      "Chuvas previstas nas próximas horas.";

  }

  else {

    alertaTitulo.innerHTML =
      "✅ Clima estável";

    alertaTexto.innerHTML =
      "Não há alertas no momento.";

  }

});

// ==========================
// PREVISÃO
// ==========================

const previsaoURL =
  `https://api.openweathermap.org/data/2.5/forecast?q=Guarulhos&appid=${apiKey}&units=metric&lang=pt_br`;

fetch(previsaoURL)

.then(response => response.json())

.then(data => {

  const container =
    document.getElementById("previsao-cards");

  container.innerHTML = "";

  const dias = {};

  data.list.forEach(item => {

    const dia =
      item.dt_txt.split(" ")[0];

    if (!dias[dia]) {

      dias[dia] = item;

    }

  });

  const nomesDias = [
    "DOM",
    "SEG",
    "TER",
    "QUA",
    "QUI",
    "SEX",
    "SÁB"
  ];

  Object.values(dias)

  .slice(0, 5)

  .forEach(item => {

    const dataObj =
      new Date(item.dt_txt);

    const nomeDia =
      nomesDias[dataObj.getDay()];

    const temperatura =
      Math.round(item.main.temp);

    const descricao =
      item.weather[0].description;

    container.innerHTML += `

      <div class="previsao-card">

        <h3>${nomeDia}</h3>

        <p class="temperatura-dia">
          ${temperatura}°C
        </p>

        <p>${descricao}</p>

      </div>

    `;

  });

});

// ==========================
// MAPA
// ==========================

const mapa = L.map("mapa-guarulhos")
.setView([-23.4543, -46.5333], 11);

L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution: "&copy; OpenStreetMap & CARTO"
  }
).addTo(mapa);

// ==========================
// RADAR DE CHUVA
// ==========================

L.tileLayer(
  `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
  {
    opacity: 0.45
  }
).addTo(mapa);

// ==========================
// DADOS DE CHUVA
// ==========================

fetch(climaAtualURL)

.then(response => response.json())

.then(data => {

const chuvaAtual =
  data.rain?.["1h"] || 0;

  // ==========================
  // BAIRROS
  // ==========================

  const bairros = [

    {
      nome: "Vila Augusta",
      coords: [-23.4708, -46.5380],
      vulnerabilidade: 8,
      historico: 8,
      drenagem: 5
    },

    {
      nome: "Jardim Maia",
      coords: [-23.4525, -46.5335],
      vulnerabilidade: 5,
      historico: 5,
      drenagem: 6
    },

    {
      nome: "Picanço",
      coords: [-23.4450, -46.5470],
      vulnerabilidade: 7,
      historico: 7,
      drenagem: 5
    },

    {
      nome: "Vila Galvão",
      coords: [-23.4442, -46.5488],
      vulnerabilidade: 7,
      historico: 7,
      drenagem: 4
    },

    {
      nome: "Macedo",
      coords: [-23.4660, -46.5315],
      vulnerabilidade: 5,
      historico: 5,
      drenagem: 5
    },

    {
      nome: "Centro",
      coords: [-23.4628, -46.5333],
      vulnerabilidade: 7,
      historico: 7,
      drenagem: 4
    },

    {
      nome: "Ponte Grande",
      coords: [-23.4850, -46.5450],
      vulnerabilidade: 10,
      historico: 10,
      drenagem: 3
    },

    {
      nome: "Parque Cecap",
      coords: [-23.4865, -46.5005],
      vulnerabilidade: 8,
      historico: 8,
      drenagem: 4
    },

    {
      nome: "Vila Rosália",
      coords: [-23.4520, -46.5610],
      vulnerabilidade: 3,
      historico: 3,
      drenagem: 7
    },

    {
      nome: "Gopoúva",
      coords: [-23.4755, -46.5455],
      vulnerabilidade: 5,
      historico: 6,
      drenagem: 5
    },

    {
      nome: "Jardim Flor da Montanha",
      coords: [-23.4485, -46.5340],
      vulnerabilidade: 5,
      historico: 5,
      drenagem: 5
    },

    {
      nome: "Torres Tibagy",
      coords: [-23.4555, -46.5485],
      vulnerabilidade: 5,
      historico: 4,
      drenagem: 5
    },

    {
      nome: "Jardim Tranquilidade",
      coords: [-23.4820, -46.5405],
      vulnerabilidade: 7,
      historico: 7,
      drenagem: 4
    },

    {
      nome: "Jardim Guaracy",
      coords: [-23.4690, -46.5150],
      vulnerabilidade: 10,
      historico: 10,
      drenagem: 2
    },

    {
      nome: "Jardim Paulista",
      coords: [-23.4705, -46.5205],
      vulnerabilidade: 2,
      historico: 2,
      drenagem: 8
    },

    {
      nome: "Vila Barros",
      coords: [-23.4825, -46.5170],
      vulnerabilidade: 8,
      historico: 8,
      drenagem: 3
    },

    {
      nome: "Bom Clima",
      coords: [-23.4685, -46.5260],
      vulnerabilidade: 5,
      historico: 5,
      drenagem: 5
    },

    {
      nome: "Jardim Presidente Dutra",
      coords: [-23.4405, -46.4305],
      vulnerabilidade: 8,
      historico: 8,
      drenagem: 4
    },

    {
      nome: "Cumbica",
      coords: [-23.4550, -46.4800],
      vulnerabilidade: 10,
      historico: 10,
      drenagem: 2
    },

    {
      nome: "Pimentas",
      coords: [-23.4727, -46.4167],
      vulnerabilidade: 10,
      historico: 10,
      drenagem: 2
    }

  ];

  // ==========================
  // CALCULAR RISCO
  // ==========================

  bairros.forEach(bairro => {

    const chuvaPeso =

      chuvaAtual <= 2
        ? chuvaAtual * 0.025

      : chuvaAtual <= 5
        ? 0.05 + (chuvaAtual - 2) * 0.02

      : chuvaAtual <= 10
        ? 0.11 + (chuvaAtual - 5) * 0.015

      : 0.185 + (chuvaAtual - 10) * 0.01;

    const vulnerabilidadePeso =
      bairro.vulnerabilidade * 0.03;

    const historicoPeso =
      bairro.historico * 0.02;

    const drenagemPeso =
      (10 - bairro.drenagem) * 0.015;

    bairro.risco =
      chuvaPeso +
      vulnerabilidadePeso +
      historicoPeso +
      drenagemPeso;

    bairro.risco =
      Math.min(bairro.risco, 1);

  });

  // ==========================
  // PAINEL
  // ==========================

  document.getElementById("chuva-painel")
  .innerHTML = `${chuvaAtual} mm`;

  document.getElementById("areas-painel")
  .innerHTML = bairros.length;

  const maiorRisco =
    Math.max(...bairros.map(b => b.risco));

  let riscoPredominante = "Baixo";

  if (maiorRisco >= 0.9) {

    riscoPredominante = "Extremo";

  }

  else if (maiorRisco >= 0.7) {

    riscoPredominante = "Alto";

  }

  else if (maiorRisco >= 0.45) {

    riscoPredominante = "Médio";

  }

  document.getElementById("risco-painel")
  .innerHTML = riscoPredominante;

  // ==========================
  // HEATMAP
  // ==========================

  const pontosHeat = bairros.map(bairro => [

    bairro.coords[0],
    bairro.coords[1],
    bairro.risco

  ]);

  L.heatLayer(pontosHeat, {

    radius: 50,

    blur: 40,

    maxZoom: 17,

    gradient: {

      0.2: "#2ecc71",
      0.5: "orange",
      0.8: "#ff4d4d",
      1.0: "#8b0000"

    }

  }).addTo(mapa);

  // ==========================
  // MARCADORES
  // ==========================

  bairros.forEach(bairro => {

    let nivel = "Baixo";

    if (bairro.risco >= 0.9) {

      nivel = "Extremo";

    }

    else if (bairro.risco >= 0.7) {

      nivel = "Alto";

    }

    else if (bairro.risco >= 0.45) {

      nivel = "Médio";

    }

    L.circleMarker(bairro.coords, {

      radius: 10,

      fillColor:

        nivel === "Extremo"
        ? "#8b0000"

        : nivel === "Alto"
        ? "#ff4d4d"

        : nivel === "Médio"
        ? "orange"

        : "#2ecc71",

      color: "white",

      weight: 2,

      fillOpacity: 1

    })

    .addTo(mapa)

    .bindPopup(`

      <div class="popup-risco">

        <h3>${bairro.nome}</h3>

        <p>
          Nível de risco:
          <strong>${nivel}</strong>
        </p>

        <p>
          Chuva atual:
          ${chuvaAtual} mm
        </p>

      </div>

    `)

    .bindTooltip(

      `${bairro.nome} • ${nivel} risco`,

      {
        direction: "top",
        offset: [0, -10]
      }

    );

  });

  // ==========================
  // ZOOM AUTOMÁTICO
  // ==========================

  const grupo = L.featureGroup(

    bairros.map(bairro =>
      L.marker(bairro.coords)
    )

  );

  mapa.fitBounds(
    grupo.getBounds(),
    {
      padding: [50, 50]
    }
  );

});