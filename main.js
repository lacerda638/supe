const apiKey = "a57573ceac50140567dc9a042645ef47";

// ==========================
// URLS
// ==========================

const climaAtualURL =
`https://api.openweathermap.org/data/2.5/weather?q=Guarulhos&appid=${apiKey}&units=metric&lang=pt_br`;

const previsaoURL =
`https://api.openweathermap.org/data/2.5/forecast?q=Guarulhos&appid=${apiKey}&units=metric&lang=pt_br`;

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
// BAIRROS
// ==========================

const bairros = [

{
nome: "Centro",
coords: [-23.468, -46.528],
vulnerabilidade: 3,
historico: 6,
drenagem: 7
},

{
nome: "Macedo",
coords: [-23.458, -46.518],
vulnerabilidade: 2,
historico: 4,
drenagem: 5
},

{
nome: "Bom Clima",
coords: [-23.447, -46.519],
vulnerabilidade: 2,
historico: 4,
drenagem: 5
},

{
nome: "Gopoúva",
coords: [-23.468, -46.541],
vulnerabilidade: 3,
historico: 5,
drenagem: 6
},

{
nome: "Vila Augusta",
coords: [-23.477, -46.543],
vulnerabilidade: 3,
historico: 5,
drenagem: 6
},

{
nome: "Torres Tibagy",
coords: [-23.456, -46.550],
vulnerabilidade: 4,
historico: 7,
drenagem: 7
},

{
nome: "Vila Galvão",
coords: [-23.451, -46.561],
vulnerabilidade: 4,
historico: 7,
drenagem: 7
},

{
nome: "Cabuçu",
coords: [-23.391, -46.548],
vulnerabilidade: 8,
historico: 8,
drenagem: 8
},

{
nome: "Recreio São Jorge",
coords: [-23.385, -46.545],
vulnerabilidade: 8,
historico: 8,
drenagem: 8
},

{
nome: "Jardim Continental",
coords: [-23.421, -46.552],
vulnerabilidade: 4,
historico: 5,
drenagem: 6
},

{
nome: "Parque Continental",
coords: [-23.420, -46.550],
vulnerabilidade: 4,
historico: 5,
drenagem: 6
},

{
nome: "Palmares",
coords: [-23.383, -46.512],
vulnerabilidade: 6,
historico: 6,
drenagem: 6
},

{
nome: "Bananal",
coords: [-23.381, -46.505],
vulnerabilidade: 6,
historico: 6,
drenagem: 6
},

{
nome: "Pimentas",
coords: [-23.448, -46.417],
vulnerabilidade: 8,
historico: 8,
drenagem: 8
},

{
nome: "Jardim Maria Dirce",
coords: [-23.450, -46.425],
vulnerabilidade: 8,
historico: 8,
drenagem: 8
},

{
nome: "Jardim Centenário",
coords: [-23.451, -46.410],
vulnerabilidade: 8,
historico: 8,
drenagem: 8
},

{
nome: "Cumbica",
coords: [-23.442, -46.467],
vulnerabilidade: 8,
historico: 9,
drenagem: 9
},

{
nome: "Jardim Nova Cumbica",
coords: [-23.445, -46.455],
vulnerabilidade: 8,
historico: 9,
drenagem: 9
},

{
nome: "Bonsucesso",
coords: [-23.416, -46.411],
vulnerabilidade: 6,
historico: 7,
drenagem: 7
},

{
nome: "Água Chata",
coords: [-23.435, -46.402],
vulnerabilidade: 6,
historico: 7,
drenagem: 7
},

{
nome: "Vila Any",
coords: [-23.488, -46.428],
vulnerabilidade: 9,
historico: 10,
drenagem: 10
},

{
nome: "Jardim Pantanal",
coords: [-23.491, -46.418],
vulnerabilidade: 9,
historico: 10,
drenagem: 10
},

{
nome: "Novo Recreio",
coords: [-23.401, -46.540],
vulnerabilidade: 9,
historico: 10,
drenagem: 10
},

{
nome: "Cidade Soberana",
coords: [-23.400, -46.455],
vulnerabilidade: 6,
historico: 7,
drenagem: 7
},

{
nome: "Cidade Seródio",
coords: [-23.408, -46.461],
vulnerabilidade: 6,
historico: 7,
drenagem: 7
},

{
nome: "Jardim São João",
coords: [-23.395, -46.463],
vulnerabilidade: 5,
historico: 6,
drenagem: 6
},

{
nome: "Lavras",
coords: [-23.382, -46.438],
vulnerabilidade: 6,
historico: 5,
drenagem: 6
},

{
nome: "Taboão",
coords: [-23.435, -46.495],
vulnerabilidade: 5,
historico: 7,
drenagem: 7
},

{
nome: "Parque Cecap",
coords: [-23.442, -46.505],
vulnerabilidade: 3,
historico: 4,
drenagem: 5
},

{
nome: "Itapegica",
coords: [-23.483, -46.539],
vulnerabilidade: 5,
historico: 8,
drenagem: 7
},

{
nome: "Ponte Grande",
coords: [-23.496, -46.545],
vulnerabilidade: 4,
historico: 7,
drenagem: 7
},

{
nome: "Porto da Igreja",
coords: [-23.485, -46.525],
vulnerabilidade: 5,
historico: 8,
drenagem: 8
},

{
nome: "Picanço",
coords: [-23.445, -46.540],
vulnerabilidade: 2,
historico: 4,
drenagem: 5
},

{
nome: "Jardim Paraventi",
coords: [-23.445, -46.522],
vulnerabilidade: 2,
historico: 4,
drenagem: 5
},

{
nome: "Jardim Maia",
coords: [-23.455, -46.520],
vulnerabilidade: 2,
historico: 4,
drenagem: 5
},

{
nome: "Vila Rio de Janeiro",
coords: [-23.435, -46.538],
vulnerabilidade: 4,
historico: 5,
drenagem: 6
},

{
nome: "Jardim Bela Vista",
coords: [-23.432, -46.518],
vulnerabilidade: 2,
historico: 4,
drenagem: 5
},

{
nome: "Jardim Presidente Dutra",
coords: [-23.415, -46.455],
vulnerabilidade: 6,
historico: 7,
drenagem: 7
},

{
nome: "Itaim",
coords: [-23.495, -46.402],
vulnerabilidade: 8,
historico: 9,
drenagem: 9
},

{
nome: "Várzea do Palácio",
coords: [-23.465, -46.495],
vulnerabilidade: 6,
historico: 8,
drenagem: 8
},

{
nome: "Vila Barros",
coords: [-23.445, -46.510],
vulnerabilidade: 4,
historico: 6,
drenagem: 6
},

{
nome: "Vila Fátima",
coords: [-23.450, -46.501],
vulnerabilidade: 4,
historico: 5,
drenagem: 6
},

{
nome: "Inocoop",
coords: [-23.410, -46.440],
vulnerabilidade: 4,
historico: 5,
drenagem: 6
},

{
nome: "Aracília",
coords: [-23.430, -46.388],
vulnerabilidade: 7,
historico: 8,
drenagem: 8
},

{
nome: "Vila Carmela",
coords: [-23.415, -46.425],
vulnerabilidade: 5,
historico: 6,
drenagem: 6
},

{
nome: "Haroldo Veloso",
coords: [-23.405, -46.450],
vulnerabilidade: 6,
historico: 7,
drenagem: 7
},

{
nome: "Vila Tranquilidade",
coords: [-23.468, -46.551],
vulnerabilidade: 3,
historico: 5,
drenagem: 6
},

{
nome: "Vila São Rafael",
coords: [-23.485, -46.555],
vulnerabilidade: 4,
historico: 7,
drenagem: 7
},

{
nome: "Vila das Palmeiras",
coords: [-23.475, -46.515],
vulnerabilidade: 4,
historico: 6,
drenagem: 6
},

{
nome: "Mato Dentro",
coords: [-23.360, -46.565],
vulnerabilidade: 5,
historico: 3,
drenagem: 4
},

{
nome: "Água Azul",
coords: [-23.345, -46.445],
vulnerabilidade: 6,
historico: 4,
drenagem: 4
},

{
nome: "Morro Grande",
coords: [-23.325, -46.485],
vulnerabilidade: 5,
historico: 3,
drenagem: 4
},

{
nome: "Morungaba",
coords: [-23.335, -46.555],
vulnerabilidade: 5,
historico: 3,
drenagem: 4
},

{
nome: "Capelinha",
coords: [-23.355, -46.475],
vulnerabilidade: 5,
historico: 3,
drenagem: 4
}

];

// ==========================
// CLIMA ATUAL
// ==========================

fetch(climaAtualURL)

.then(response => response.json())

.then(data => {

const temperatura =
Math.round(data.main.temp);

const sensacao =
Math.round(data.main.feels_like);

const umidade =
data.main.humidity;

const vento =
Math.round(data.wind.speed * 3.6);

const descricao =
data.weather[0].description;

document.getElementById("clima-painel")
.innerHTML = descricao;

const clima =
data.weather[0].main.toLowerCase();

// ==========================
// DATA ATUAL
// ==========================

const hoje = new Date();

const diasSemana = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado"
];

const meses = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro"
];

const dataFormatada =

`${diasSemana[hoje.getDay()]},
${hoje.getDate()} de
${meses[hoje.getMonth()]}`;

document.getElementById("data-clima")
.innerHTML = dataFormatada;

// ==========================
// EMOJIS
// ==========================

let emoji = "☁️";

if (clima.includes("clear")) {

emoji = "☀️";

}

else if (clima.includes("cloud")) {

emoji = "☁️";

}

else if (clima.includes("rain")) {

emoji = "🌧️";

}

else if (clima.includes("drizzle")) {

emoji = "🌦️";

}

else if (clima.includes("thunderstorm")) {

emoji = "⛈️";

}

else if (clima.includes("snow")) {

emoji = "❄️";

}

else if (clima.includes("mist")) {

emoji = "🌫️";

}

// emoji separado
document.getElementById("emoji-clima")
.innerHTML = emoji;

// temperatura
document.getElementById("temperatura")
.innerHTML = `${temperatura}°C`;

// descrição
document.getElementById("descricao-clima")
.innerHTML = descricao;

// criar infos extras
document.getElementById("info-clima")
.innerHTML = `

<div class="info-item-clima">

<span>Umidade do Ar</span>

<strong>${umidade}%</strong>

</div>

<div class="info-item-clima">

<span>Velocidade do Vento</span>

<strong>${vento} km/h</strong>

</div>

<div class="info-item-clima">

<span>Sensação Térmica</span>

<strong>${sensacao}°C</strong>

</div>

`;

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

document.getElementById("clima-painel")
.innerHTML = descricao;

document.getElementById("descricao-clima")
.innerHTML = descricao;
// ==========================
// CHUVA
// ==========================

const chuvaAtual =
data.rain?.["1h"] || 0;



// ==========================
// CALCULAR RISCO
// ==========================

bairros.forEach(bairro => {

let impactoChuva = 0;

// ==========================
// BASE DO RISCO
// ==========================

const baseRisco = (

bairro.vulnerabilidade * 0.40 +
bairro.historico * 0.30 +
(10 - bairro.drenagem) * 0.20

) / 10;

// ==========================
// IMPACTO DA CHUVA
// ==========================

// chuva leve
if (chuvaAtual >= 1 && chuvaAtual < 5) {

impactoChuva =
bairro.vulnerabilidade * 0.010;

}

// chuva moderada
else if (chuvaAtual >= 5 && chuvaAtual < 15) {

impactoChuva =
bairro.vulnerabilidade * 0.025;

}

// chuva forte
else if (chuvaAtual >= 15 && chuvaAtual < 30) {

impactoChuva =
bairro.vulnerabilidade * 0.045;

}

// tempestade extrema
else if (chuvaAtual >= 30) {

impactoChuva =
bairro.vulnerabilidade * 0.070;

}

// ==========================
// RISCO FINAL
// ==========================

bairro.risco =
Math.min(baseRisco + impactoChuva, 1);


// sem chuva não deixa EXTREMO
if (chuvaAtual < 1 && bairro.risco > 0.80) {

bairro.risco = 0.80;

}

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

if (maiorRisco >= 0.75) {

riscoPredominante = "Extremo";

}

else if (maiorRisco >= 0.55) {

riscoPredominante = "Alto";

}

else if (maiorRisco >= 0.35) {

riscoPredominante = "Médio";

}

const riscoPainel =
document.getElementById("risco-painel");

riscoPainel.innerHTML =
riscoPredominante;

riscoPainel.className = "";

if (riscoPredominante === "Extremo") {

  riscoPainel.classList.add("risco-extremo");

}

else if (riscoPredominante === "Alto") {

  riscoPainel.classList.add("risco-alto");

}

else if (riscoPredominante === "Médio") {

  riscoPainel.classList.add("risco-medio");

}

else {

  riscoPainel.classList.add("risco-baixo");

}

console.log("Maior risco:", maiorRisco);

const statusSistema =
document.getElementById("status-sistema");

if (riscoPredominante === "Extremo") {

statusSistema.innerHTML =
"🔴 Risco extremo detectado.";

}

else if (riscoPredominante === "Alto") {

statusSistema.innerHTML =
"🟠 Áreas em atenção.";

}

else {

statusSistema.innerHTML =
"🟢 Monitoramento ativo.";

}

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

bairros.forEach(bairro => {

let nivel = "Baixo";

if (bairro.risco >= 0.75) {

nivel = "Extremo";

}

else if (bairro.risco >= 0.55) {

nivel = "Alto";

}

else if (bairro.risco >= 0.35) {

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
Risco numérico:
${bairro.risco.toFixed(2)}
</p>

<p>
Chuva atual:
${chuvaAtual} mm
</p>

</div>

`);

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


// ==========================
// PREVISÃO
// ==========================

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

const sensacao =
Math.round(item.main.feels_like);

const umidade =
item.main.humidity;

const descricao =
item.weather[0].description;

container.innerHTML += `

<div class="previsao-card">

<h3>${nomeDia}</h3>

<p class="temperatura-dia">
${temperatura}°C
</p>

<p>${descricao}</p>

<div class="extra-info">

💧 Umidade: ${umidade}%<br>

🌡️ Sensação: ${sensacao}°C

</div>
</div>

`;

});

});

// Ano atual no footer
document.getElementById("ano").textContent = new Date().getFullYear();