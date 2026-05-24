const apiKey = "a57573ceac50140567dc9a042645ef47";

// ==========================
// CLIMA EM TEMPO REAL
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

  document.getElementById("descricao-clima")
  .innerHTML = descricao;

  const alertaBox =
  document.getElementById("alerta-box");

const alertaTitulo =
  document.getElementById("alerta-titulo");

const alertaTexto =
  document.getElementById("alerta-texto");

// ==========================
// ALERTAS
// ==========================

if (
  clima.includes("thunderstorm")
) {

  alertaBox.classList.add("alerta-vermelho");

  alertaTitulo.innerHTML =
    "⚠️ Alerta de tempestade";

  alertaTexto.innerHTML =
    "Há risco de chuva intensa e alagamentos em Guarulhos.";

    document.getElementById("alerta-topo")
  .style.display = "block";

}

else if (
  clima.includes("rain")
) {

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
    "Não há alertas climáticos no momento.";

}

    document.getElementById("temperatura")
      .innerHTML = `${temperatura}°C`;

    document.getElementById("descricao-clima")
      .innerHTML = descricao;

  });

// ==========================
// PREVISÃO DA SEMANA
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

      const dataCompleta = item.dt_txt;

      const dia =
        dataCompleta.split(" ")[0];

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

        const dataObjeto =
          new Date(item.dt_txt);

        const nomeDia =
          nomesDias[dataObjeto.getDay()];

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

            <p>
              ${descricao}
            </p>

          </div>

        `;

      });

  });

  const mapa = L.map('mapa-guarulhos')
  .setView([-23.4543, -46.5333], 12);
  L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; OpenStreetMap'
  }
).addTo(mapa);
L.circle(

  [-23.4620, -46.5330],

  {
    color: 'red',
    fillColor: 'red',
    fillOpacity: 0.4,
    radius: 700
  }

).addTo(mapa)

.bindPopup("Área de alto risco");
L.circle(

  [-23.4480, -46.5200],

  {
    color: 'orange',
    fillColor: 'orange',
    fillOpacity: 0.4,
    radius: 500
  }

).addTo(mapa)

.bindPopup("Área de médio risco");
L.circle(

  [-23.4700, -46.5500],

  {
    color: 'green',
    fillColor: 'green',
    fillOpacity: 0.4,
    radius: 400
  }

).addTo(mapa)

.bindPopup("Área de baixo risco");