/* ===========================================================
   Calendário Tricolor Fluminense — COM ESTATÍSTICAS AVANÇADAS
   + Suporte a Categorias (Masculino/Feminino)
   =========================================================== */

/* ===========================================================
   1. FUNÇÕES UTILITÁRIAS (UTILS INTEGRADO)
   =========================================================== */

function cryptoId() { 
  return 'g_' + Math.random().toString(36).slice(2, 10); 
}

function slugify(str) {
  if (!str) return '';
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const StorageUtils = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error(`Erro ao ler ${key} do localStorage:`, e);
      return defaultValue;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Erro ao salvar ${key} no localStorage:`, e);
    }
  }
};

function parseDate(dstr) {
  if (!dstr) return new Date();
  const [d, m] = dstr.split("/").map(Number);
  const year = 2026;
  return new Date(year, m - 1, d);
}

function fmtLongDate(dstr) {
  const dt = parseDate(dstr);
  return dt.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" }).replace(".", "");
}

function today() {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}

function obterJogosFemininos(lista) {
  return lista.filter(jogo => jogo.category === "feminino");
}

function obterJogosFemininosPorComp(lista) {
  const compsFemininas = ["brasileiro_fem", "copa-brasil-fem"];
  return lista.filter(jogo => compsFemininas.includes(jogo.comp));
}

/* ===========================================================
   2. DADOS E ESTADO — COM CATEGORIAS
   =========================================================== */

const listaAtualizadaDeGames = [
  // MASCULINO — BRASILEIRÃO · 1º TURNO
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "1ª Rodada", date: "28/01", team1: "fluminense", team2: "gremio", stadium: "Maracanã", time: "20:00", score: "2 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "2ª Rodada", date: "05/02", team1: "bahia", team2: "fluminense", stadium: "Arena Fonte Nova", time: "19:00", score: "1 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "3ª Rodada", date: "12/02", team1: "fluminense", team2: "botafogo", stadium: "Maracanã", time: "19:30", score: "1 x 0" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "4ª Rodada", date: "25/02", team1: "palmeiras", team2: "fluminense", stadium: "Nubank park", time: "21:30", score: "2 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "5ª Rodada", date: "12/03", team1: "remo", team2: "fluminense", stadium: "Mangueirão", time: "19:00", score: "0 x 2" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "6ª Rodada", date: "15/03", team1: "fluminense", team2: "athletico-pr", stadium: "Maracanã", time: "16:00", score: "3 x 2" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "7ª Rodada", date: "18/03", team1: "vasco", team2: "fluminense", stadium: "Maracanã", time: "21:30", score: "2 x 0" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "8ª Rodada", date: "21/03", team1: "fluminense", team2: "atletico-mg", stadium: "Maracanã", time: "18:30", score: "1 x 0" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "9ª Rodada", date: "01/04", team1: "fluminense", team2: "corinthians", stadium: "Maracanã", time: "21:30", score: "3 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "10ª Rodada", date: "04/04", team1: "coritiba", team2: "fluminense", stadium: "Couto Pereira", time: "20:30", score: "1 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "11ª Rodada", date: "12/04", team1: "fluminense", team2: "flamengo", stadium: "Maracanã", time: "18:00", score: "1 x 2" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "12ª Rodada", date: "19/04", team1: "santos", team2: "fluminense", stadium: "Vila Belmiro", time: "16:00", score: "2 x 3" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "13ª Rodada", date: "25/04", team1: "fluminense", team2: "chapecoense", stadium: "Maracanã", time: "20:30", score: "2 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "14ª Rodada", date: "03/05", team1: "internacional", team2: "fluminense", stadium: "Beira Rio", time: "18:30", score: "2 x 0" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "15ª Rodada", date: "09/05", team1: "fluminense", team2: "vitoria", stadium: "Maracanã", time: "18:00", score: "2 x 2" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "16ª Rodada", date: "16/05", team1: "fluminense", team2: "sao-paulo", stadium: "Maracanã", time: "19:00", score: "2 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "17ª Rodada", date: "23/05", team1: "mirassol", team2: "fluminense", stadium: "Maião", time: "19:00", score: "1 x 0" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "18ª Rodada", date: "31/05", team1: "cruzeiro", team2: "fluminense", stadium: "Mineirão", time: "20:30", score: "1 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "19ª Rodada", date: "21/07", team1: "fluminense", team2: "bragantino", stadium: "Maracanã", time: "20:00", score: "1 x 1" },

  // MASCULINO — AMISTOSOS
  { id: cryptoId(), category: "masculino", comp: "amistoso", round: "Amistoso", date: "12/07", team1: "fluminense", team2: "bahia", stadium: "Maracanã", time: "16:00", score: "2 x 0" },

  // MASCULINO — BRASILEIRÃO · 2º TURNO
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "20ª Rodada", date: "26/07", team1: "gremio", team2: "fluminense", stadium: "Arena do Grêmio", time: "18:30", score: "1 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "21ª Rodada", date: "29/07", team1: "fluminense", team2: "bahia", stadium: "Maracanã", time: "21:30", score: "0 x 0" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "22ª Rodada", date: "08/08", team1: "botafogo", team2: "fluminense", stadium: "Nilton Santos", time: "21:00", score: "1 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "23ª Rodada", date: "15/08", team1: "fluminense", team2: "palmeiras", stadium: "Maracanã", time: "16:30", score: "3 x 2" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "24ª Rodada", date: "22/08", team1: "fluminense", team2: "remo", stadium: "Maracanã", time: "16:00", score: "2 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "25ª Rodada", date: "30/08", team1: "athletico-pr", team2: "fluminense", stadium: "Arena da Baixada", time: "11:00", score: "3 x 3" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "26ª Rodada", date: "05/09", team1: "fluminense", team2: "fluminense", stadium: "Maracanã", time: "21:00", score: "1x0" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "27ª Rodada", date: "12/09", team1: "atletico-mg", team2: "fluminense", stadium: "Arena MRV", time: "16:00", score: "3x1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "28ª Rodada", date: "20/09", team1: "corinthians", team2: "fluminense", stadium: "Neo Quimica", time: "19:30", score: "1x3" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "29ª Rodada", date: "08/10", team1: "fluminense", team2: "coritiba", stadium: "Maracanã", time: "21:30", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "30ª Rodada", date: "11/10", team1: "flamengo", team2: "fluminense", stadium: "Maracanã", time: "17:30", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "31ª Rodada", date: "18/10", team1: "fluminense", team2: "santos", stadium: "Maracanã", time: "16:00", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "32ª Rodada", date: "24/10", team1: "chapecoense", team2: "fluminense", stadium: "Arena Condá", time: "19:30", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "33ª Rodada", date: "28/10", team1: "fluminense", team2: "internacional", stadium: "Maracanã", time: "19:30", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "34ª Rodada", date: "06/11", team1: "vitoria", team2: "fluminense", stadium: "Barradão", time: "20:00", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "35ª Rodada", date: "18/11", team1: "sao-paulo", team2: "fluminense", stadium: "MorumBis", time: "19:30", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "36ª Rodada", date: "22/11", team1: "fluminense", team2: "mirassol", stadium: "Maracanã", time: "16:00", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "37ª Rodada", date: "29/11", team1: "fluminense", team2: "cruzeiro", stadium: "Maracanã", time: "16:00", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "38ª Rodada", date: "02/12", team1: "bragantino", team2: "fluminense", stadium: "Estádio Municipal Cícero de Souza Marques", time: "21:30", score: "x" },

  // MASCULINO — LIBERTADORES
  { id: cryptoId(), category: "masculino", comp: "libertadores", round: "Fase de Grupos- Grupo C", round: "1ª Rodada", date: "07/04", team1: "la-guardia", team2: "fluminense", stadium: "Estadio Olímpico de la UCV", time: "19:00", score: "0 x 0" },
  { id: cryptoId(), category: "masculino", comp: "libertadores", round: "Fase de Grupos- Grupo C", round: "2ª Rodada" , date: "15/04", team1: "fluminense", team2: "rivadavia", stadium: "Maracanã", time: "19:00", score: "1x2" },
  { id: cryptoId(), category: "masculino", comp: "libertadores", round: "Fase de Grupos- Grupo C", round: "3ª Rodada" , date: "30/04", team1: "bolivar", team2: "fluminense", stadium: "Estadio Hernando Siles", time: "19:00", score: "2x0" },
  { id: cryptoId(), category: "masculino", comp: "libertadores", round: "Fase de Grupos- Grupo C", round: "4ª Rodada" , date: "06/05", team1: "rivadavia", team2: "fluminense", stadium: "Malvinas Argentinas (Mendoza)", time: "21:30", score: "1x1" },
  { id: cryptoId(), category: "masculino", comp: "libertadores", round: "Fase de Grupos- Grupo C", round: "5ª Rodada" , date: "19/05", team1: "fluminense", team2: "bolivar", stadium: "Maracanã", time: "19:00", score: "2x1" },
  { id: cryptoId(), category: "masculino", comp: "libertadores", round: "Fase de Grupos- Grupo C", round: "6ª Rodada" , date: "27/05", team1: "fluminense", team2: "la-guardia", stadium: "Maracanã", time: "21:30", score: "3x1" },
  { id: cryptoId(), category: "masculino", comp: "libertadores", round: "Fase de Grupos- Grupo C", round: "Oitavas de Final - Ida " , date: "11/08", team1: "fluminense", team2: "rivadavia", stadium: "Maracanã", time: "19:00", score: "0x0" },
  { id: cryptoId(), category: "masculino", comp: "libertadores", round: "Fase de Grupos- Grupo C", round: "Oitavas de Final - Volta" , date: "18/08", team1: "rivadavia", team2: "fluminense", stadium: "Malvinas Argentinas (Mendoza)", time: "21:30", score: "1x1(pen. 4 x 5)" },
  { id: cryptoId(), category: "masculino", comp: "libertadores", round: "Fase de Grupos- Grupo C", round: "Quartas de Final - Ida" , date: "08/09", team1: "fluminense", team2: "platense", stadium: "Maracanã", time: "19:00", score: "2x0" },
  { id: cryptoId(), category: "masculino", comp: "libertadores", round: "Fase de Grupos- Grupo C", round: "Quartas de Final - Volta" , date: "15/09", team1: "platense", team2: "fluminense", stadium: "Ciudad de Vicente López", time: "19:00", score: "2x1" },
  { id: cryptoId(), category: "masculino", comp: "libertadores", round: "Fase de Grupos- Grupo C", round: "SemiFinal - Ida" , date: "14/10", team1: "fluminense", team2: "palmeiras", stadium: "Maracanã", time: "21:30", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "libertadores", round: "Fase de Grupos- Grupo C", round: "SemiFinal - Volta" , date: "21/10", team1: "palmeiras", team2: "fluminense", stadium: "Maracanã", time: "21:30", score: "X" },

  // MASCULINO — COPA DO BRASIL
  { id: cryptoId(), category: "masculino", comp: "copadobrasil", round: "5ª Fase (Ida)", date: "23/04", team1: "operario-pr", team2: "fluminense", stadium: "Germano Krüger", time: "21:30", score: "0 x 0" },
  { id: cryptoId(), category: "masculino", comp: "copadobrasil", round: "5ª Fase (Volta)", date: "12/05", team1: "fluminense", team2: "operario-pr", stadium: "Maracanã", time: "21:30", score: "2 x 1" },
  { id: cryptoId(), category: "masculino", comp: "copadobrasil", round: "Oitavas de Final (Ida)", date: "01/08", team1: "vasco", team2: "fluminense", stadium: "Maracanã", time: "17:30", score: "0 x 0" },
  { id: cryptoId(), category: "masculino", comp: "copadobrasil", round: "Oitavas de Final (Volta)", date: "05/08", team1: "fluminense", team2: "vasco", stadium: "Maracanã", time: "21:30", score: "1 x 3" },

  // MASCULINO — CARIOCA
  { id: cryptoId(), category: "masculino", comp: "carioca", round: "Final", date: "08/03", team1: "fluminense", team2: "flamengo", stadium: "Maracanã", time: "18:00", score: "0x0(Pen. 4 x 5)" },
];


let games = StorageUtils.get("flu_games", listaAtualizadaDeGames);
let editingGameId = null;

let activeCategory = "masculino"; // "masculino" | "feminino"

function saveGames() {
  StorageUtils.set("flu_games", games);
}

/* ===========================================================
   3. MAPEAMENTO DE ESCUDOS E EQUIPES
   =========================================================== */

const teamLogos = {
  "bahia": "img/bahia.png",
  "vitoria": "img/vitoria.png",
  "flamengo": "img/flamengo.png",
  "palmeiras": "img/palmeiras.png",
  "corinthians": "img/corinthians.png",
  "sao-paulo": "img/sao-paulo.jpg",
  "gremio": "img/gremio.png",
  "internacional": "img/internacional.png",
  "atletico-mg": "img/atletico-mg.png",
  "cruzeiro": "img/cruzeiro.svg",
  "botafogo": "img/botafogo.png",
  "fluminense": "img/fluminense.png",
  "athletico-pr": "img/athletico-pr.png",
  "santos": "img/santos.png",
  "bragantino": "img/bragantino.png",
  "vasco": "img/vasco.png",
  "coritiba": "img/coritiba.png",
  "chapecoense": "img/chapecoense.png",
  "remo": "img/remo.png",
  "mirassol": "img/mirassol.png",
  "bolivar" : "img/bolivar.png",
  "la-guardia": "img/la-guardia.png",
  "platense": "img/platense.png",
  "rivadavia": "img/rivadavia.svg",
  "operario-pr": "img/operario-pr.png"
};

function getTeam(slug) {
  if (!slug) return { name: "Desconhecido", logo: "img/default.png" };
  const name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const logo = teamLogos[slug] || 'img/default.png';
  return { name, logo };
}

/* ===========================================================
   4. COMPETIÇÕES — ADAPTADAS PARA CATEGORIAS
   =========================================================== */

const COMPS_MASCULINO = [
  { id: "todos",       label: "Todos" },
  { id: "brasileiro",  label: "Brasileiro Série A" },
  { id: "libertadores", label: "Libertadores" },
  { id: "copadobrasil",       label: "Copa", match: ["copadobrasil"] },
  { id: "carioca",    label: "Carioca", match: ["carioca"] },
  { id: "amistoso",    label: "Amistosos" },
];

// const COMPS_FEMININO = [
//   { id: "todos",       label: "Todos" },
//   { id: "brasileiro_fem", label: "Brasileiro Série A Fem." },
//   { id: "copas_fem",   label: "Copas", match: ["copa-brasil-fem"] },
//   { id: "estadual_fem", label: "Baiano", match: ["baiano-fem"] },
//   { id: "amistoso_fem", label: "Amistosos" },
// ];

const mandos = [
  { id: "todos", label: "Todos os Mandos" },
  { id: "casa", label: "Em Casa" },
  { id: "fora", label: "Fora de Casa" }
];

const posicoesCompeticao = {
  "todos": "4º",
  "brasileiro": "4º",
  "libertadores": "Semifinal",
  "copadobrasil": "Caiu nas Oitavas ",
  "estadual": "Vice-Campeão",
  "amistoso": "-"
};

function getActiveComps() {
  return activeCategory === "feminino" ? COMPS_FEMININO : COMPS_MASCULINO;
}

let activeTab = "todos";
let activeSub = "todos";
let activeMandoFilter = "todos";

/* ===========================================================
   6. CONTROLE DE TEMPORADA E FILTRAGEM
   =========================================================== */

function gamesForTab(tabId) {
  // 1. Filtra pela categoria ativa (masculino / feminino)
  let list = games.filter(g => (g.category || "masculino") === activeCategory);

  // 2. Filtra por Aba / Competição
  if (tabId !== "todos") {
    const currentComps = typeof getActiveComps === "function" ? getActiveComps() : COMPS_MASCULINO;
    const comp = currentComps.find(c => c.id === tabId);

    if (comp && comp.match) {
      list = list.filter(g => comp.match.includes(g.comp));
    } else {
      list = list.filter(g => g.comp === tabId || (tabId === "estadual" && g.comp === "carioca"));
    }
  }

  // 3. Filtra por Mando de Campo
  if (typeof activeMandoFilter !== "undefined") {
    if (activeMandoFilter === "casa") {
      list = list.filter(g => g.team1 === "fluminense");
    } else if (activeMandoFilter === "fora") {
      list = list.filter(g => g.team2 === "fluminense");
    }
  }

  return list;
}

function renderApp() {
  const emptyCard = document.getElementById("empty-card");
  const heroNext = document.getElementById("heroNext");
  const dashboardSection = document.getElementById("dashboardSection");
  const progressWrap = document.getElementById("progressWrap");
  const tabsNav = document.getElementById("tabsNav");
  const subFilterBar = document.getElementById("subFilterBar");
  const listsWrap = document.getElementById("listsWrap");
  const btnAdd = document.getElementById("btnAddGame");
  const btnAddMobile = document.getElementById("btnAddGameMobile");

  // Temporada 2027 (ou qualquer temporada sem tabela divulgada): mostra apenas o aviso
  const isFutureSeason = activeSeason !== "2026";

  if (emptyCard) emptyCard.classList.toggle("hidden", !isFutureSeason);
  if (heroNext) heroNext.classList.toggle("hidden", isFutureSeason);
  if (dashboardSection) dashboardSection.classList.toggle("hidden", isFutureSeason);
  if (progressWrap) progressWrap.classList.toggle("hidden", isFutureSeason);
  if (tabsNav) tabsNav.classList.toggle("hidden", isFutureSeason);
  if (subFilterBar) subFilterBar.classList.toggle("hidden", isFutureSeason);
  if (listsWrap) listsWrap.classList.toggle("hidden", isFutureSeason);
  // style.display (em vez de classList) porque esses botões já usam classes
  // responsivas (hidden sm:flex) que a classe "hidden" sozinha não sobrepõe
  if (btnAdd) btnAdd.style.display = isFutureSeason ? "none" : "";
  if (btnAddMobile) btnAddMobile.style.display = isFutureSeason ? "none" : "";

  if (isFutureSeason) {
    if (countdownInterval) clearInterval(countdownInterval);
    return;
  }

  render();
}

function setSeason(season) {
  activeSeason = season;

  const btn2026 = document.getElementById("btnSeason2026");
  const btn2027 = document.getElementById("btnSeason2027");
  const activeClass = "flex-1 py-1 text-xs font-bold rounded-lg bg-amber-400 text-slate-950 transition-all";
  const inactiveClass = "flex-1 py-1 text-xs font-bold rounded-lg text-slate-400 transition-all";

  if (btn2026) btn2026.className = season === "2026" ? activeClass : inactiveClass;
  if (btn2027) btn2027.className = season === "2027" ? activeClass : inactiveClass;

  renderApp();
}


/* ===========================================================
   5. ⭐ ESTATÍSTICAS AVANÇADAS — PRINCIPAL
   =========================================================== */

function calcularEstatisticasAvancadas(filtroComp = 'todos') {
  const jogosFiltrados = gamesForTab(filtroComp);
  const jogados = jogosFiltrados.filter(g => g.score && g.score.trim().toLowerCase() !== "x");

  if (jogados.length === 0) return null;

  const stats = {
    totalJogados: 0,
    vitoria: 0,
    empate: 0,
    derrota: 0,
    golsPro: 0,
    golsContra: 0,
    saldoGols: 0,
    
    casa_jogados: 0,
    casa_vitoria: 0,
    casa_empate: 0,
    casa_derrota: 0,
    casa_golsPro: 0,
    casa_golsContra: 0,
    casa_pontos: 0,
    casa_aproveitamento: 0,
    
    fora_jogados: 0,
    fora_vitoria: 0,
    fora_empate: 0,
    fora_derrota: 0,
    fora_golsPro: 0,
    fora_golsContra: 0,
    fora_pontos: 0,
    fora_aproveitamento: 0,
    
    cleanSheets: 0,
    ataqueBranco: 0,
    ambasMarcam: 0,
    
    ultimosJogos: [],
    maiorSequenciaVitorias: 0,
    maiorSequenciaInvencibilidade: 0,
    
    mediaGolsPro: 0,
    mediaGolsContra: 0,
  };

  jogados.forEach(jogo => {
    const cleanScore = jogo.score.split("(")[0].trim();
    const scores = cleanScore.toLowerCase().split("x").map(s => parseInt(s.trim(), 10));

    if (scores.length === 2 && !isNaN(scores[0]) && !isNaN(scores[1])) {
      const [s1, s2] = scores;
      const fluminenseEmCasa = jogo.team1 === "fluminense";
      const golsFlu = fluminenseEmCasa ? s1 : s2;
      const golsAdv = fluminenseEmCasa ? s2 : s1;

      let resultado = '';
      if (golsFlu > golsAdv) {
        stats.vitoria++;
        resultado = 'V';
      } else if (golsFlu < golsAdv) {
        stats.derrota++;
        resultado = 'D';
      } else {
        stats.empate++;
        resultado = 'E';
      }

      stats.ultimosJogos.push(resultado);
      stats.totalJogados++;
      stats.golsPro += golsFlu;
      stats.golsContra += golsAdv;

      if (fluminenseEmCasa) {
        stats.casa_jogados++;
        stats.casa_golsPro += golsFlu;
        stats.casa_golsContra += golsAdv;
        if (golsFlu > golsAdv) {
          stats.casa_vitoria++;
          stats.casa_pontos += 3;
        } else if (golsFlu === golsAdv) {
          stats.casa_empate++;
          stats.casa_pontos += 1;
        } else {
          stats.casa_derrota++;
        }
      } else {
        stats.fora_jogados++;
        stats.fora_golsPro += golsFlu;
        stats.fora_golsContra += golsAdv;
        if (golsFlu > golsAdv) {
          stats.fora_vitoria++;
          stats.fora_pontos += 3;
        } else if (golsFlu === golsAdv) {
          stats.fora_empate++;
          stats.fora_pontos += 1;
        } else {
          stats.fora_derrota++;
        }
      }

      if (golsAdv === 0) stats.cleanSheets++;
      if (golsFlu === 0) stats.ataqueBranco++;
      if (golsFlu > 0 && golsAdv > 0) stats.ambasMarcam++;
    }
  });

  if (stats.ultimosJogos.length > 5) {
    stats.ultimosJogos = stats.ultimosJogos.slice(-5);
  }

  stats.saldoGols = stats.golsPro - stats.golsContra;
  stats.mediaGolsPro = stats.totalJogados ? (stats.golsPro / stats.totalJogados).toFixed(2) : 0;
  stats.mediaGolsContra = stats.totalJogados ? (stats.golsContra / stats.totalJogados).toFixed(2) : 0;

  stats.casa_aproveitamento = stats.casa_jogados
    ? ((stats.casa_vitoria * 3 + stats.casa_empate) / (stats.casa_jogados * 3) * 100).toFixed(1)
    : 0;

  stats.fora_aproveitamento = stats.fora_jogados
    ? ((stats.fora_vitoria * 3 + stats.fora_empate) / (stats.fora_jogados * 3) * 100).toFixed(1)
    : 0;

  stats.maiorSequenciaVitorias = calcularMaiorSequencia(stats.ultimosJogos, 'V');
  stats.maiorSequenciaInvencibilidade = calcularMaiorSequencia(stats.ultimosJogos, ['V', 'E']);

  return stats;
}

function calcularMaiorSequencia(resultados, filtro) {
  if (resultados.length === 0) return 0;
  const filtroArray = Array.isArray(filtro) ? filtro : [filtro];
  let maiorSeq = 0;
  let seqAtual = 0;

  resultados.forEach(r => {
    if (filtroArray.includes(r)) {
      seqAtual++;
      maiorSeq = Math.max(maiorSeq, seqAtual);
    } else {
      seqAtual = 0;
    }
  });

  return maiorSeq;
}

function renderizarEstatisticasAvancadas() {
  const container = document.getElementById('dashboardEstatisticasAvancadas');
  if (!container) return;

  const stats = calcularEstatisticasAvancadas(activeTab === 'todos' ? 'todos' : activeTab);

  if (!stats) {
    container.innerHTML = `
      <div class="text-center py-8 text-slate-400 text-sm">
        <p>⏳ Nenhum jogo com placar definido ainda</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="space-y-4">
      <h3 class="font-display text-sm text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-gold"></span>
        📊 Desempenho e Mando de Campo
      </h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="bg-navy-900/60 border border-navy-700/60 rounded-xl p-4">
          <p class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">📍 Em Casa</p>
          <div class="space-y-1.5 text-xs">
            <div class="flex justify-between items-center">
              <span class="text-slate-400">Jogos:</span>
              <span class="text-sm font-bold text-white">${stats.casa_jogados}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-400">Apr:</span>
              <span class="text-sm font-bold text-gold">${stats.casa_aproveitamento}%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-400">Pontos:</span>
              <span class="text-sm font-bold text-emerald-400">${stats.casa_pontos}</span>
            </div>
          </div>
        </div>

        <div class="bg-navy-900/60 border border-navy-700/60 rounded-xl p-4">
          <p class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">🛣️ Fora de Casa</p>
          <div class="space-y-1.5 text-xs">
            <div class="flex justify-between items-center">
              <span class="text-slate-400">Jogos:</span>
              <span class="text-sm font-bold text-white">${stats.fora_jogados}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-400">Apr:</span>
              <span class="text-sm font-bold text-gold">${stats.fora_aproveitamento}%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-400">Pontos:</span>
              <span class="text-sm font-bold text-emerald-400">${stats.fora_pontos}</span>
            </div>
          </div>
        </div>

        <div class="bg-navy-900/60 border border-navy-700/60 rounded-xl p-4">
          <p class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">🛡️ Defesa</p>
          <div class="space-y-1.5 text-xs">
            <div class="flex justify-between items-center">
              <span class="text-slate-400">Clean Sheets:</span>
              <span class="text-sm font-bold text-emerald-400">${stats.cleanSheets}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-400">Média GC:</span>
              <span class="text-sm font-bold text-slate-300">${stats.mediaGolsContra}</span>
            </div>
          </div>
        </div>

        <div class="bg-navy-900/60 border border-navy-700/60 rounded-xl p-4">
          <p class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">⚽ Ataque</p>
          <div class="space-y-1.5 text-xs">
            <div class="flex justify-between items-center">
              <span class="text-slate-400">Ataque Branco:</span>
              <span class="text-sm font-bold text-red-400">${stats.ataqueBranco}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-400">Média GP:</span>
              <span class="text-sm font-bold text-amber-400">${stats.mediaGolsPro}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-4 mt-6">
      <h3 class="font-display text-sm text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-gold"></span>
        🎯 Gols e Saldo
      </h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div class="bg-blue-900/20 border border-blue-700/40 rounded-xl p-4 text-center">
          <p class="text-[10px] text-blue-300 uppercase tracking-wider font-semibold mb-2">Gols Marcados</p>
          <p class="font-display text-3xl font-bold text-blue-300">${stats.golsPro}</p>
        </div>

        <div class="bg-red-900/20 border border-red-700/40 rounded-xl p-4 text-center">
          <p class="text-[10px] text-red-300 uppercase tracking-wider font-semibold mb-2">Gols Sofridos</p>
          <p class="font-display text-3xl font-bold text-red-300">${stats.golsContra}</p>
        </div>

        <div class="bg-emerald-900/20 border border-emerald-700/40 rounded-xl p-4 text-center">
          <p class="text-[10px] text-emerald-300 uppercase tracking-wider font-semibold mb-2">Saldo</p>
          <p class="font-display text-3xl font-bold ${stats.saldoGols >= 0 ? 'text-emerald-400' : 'text-red-400'}">
            ${stats.saldoGols >= 0 ? '+' : ''}${stats.saldoGols}
          </p>
        </div>

        <div class="bg-purple-900/20 border border-purple-700/40 rounded-xl p-4 text-center">
          <p class="text-[10px] text-purple-300 uppercase tracking-wider font-semibold mb-2">Ambas Marcam</p>
          <p class="font-display text-3xl font-bold text-purple-300">${stats.ambasMarcam}</p>
        </div>

        <div class="bg-slate-900/20 border border-slate-700/40 rounded-xl p-4 text-center col-span-2">
          <p class="text-[10px] text-slate-300 uppercase tracking-wider font-semibold mb-2">Média de Gols/Jogo</p>
          <p class="space-x-2">
            <span class="font-display text-2xl font-bold text-blue-400">${stats.mediaGolsPro}</span>
            <span class="text-slate-500">×</span>
            <span class="font-display text-2xl font-bold text-red-400">${stats.mediaGolsContra}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="space-y-4 mt-6">
      <h3 class="font-display text-sm text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-gold"></span>
        📈 Sequências e Forma Recente
      </h3>
      
      <div class="bg-navy-900/60 border border-navy-700/60 rounded-xl p-4">
        <p class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-3">Últimos ${stats.ultimosJogos.length} Jogos</p>
        <div class="flex justify-center gap-2">
          ${stats.ultimosJogos.map((resultado) => {
            let corBg = '';
            let corTexto = '';
            if (resultado === 'V') {
              corBg = 'bg-emerald-500/20 border-emerald-500/50';
              corTexto = 'text-emerald-400';
            } else if (resultado === 'E') {
              corBg = 'bg-slate-500/20 border-slate-500/50';
              corTexto = 'text-slate-300';
            } else {
              corBg = 'bg-red-500/20 border-red-500/50';
              corTexto = 'text-red-400';
            }
            return `
              <div class="w-10 h-10 rounded-lg border ${corBg} flex items-center justify-center" title="${resultado === 'V' ? 'Vitória' : resultado === 'E' ? 'Empate' : 'Derrota'}">
                <span class="font-display font-bold text-sm ${corTexto}">${resultado}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="bg-emerald-900/20 border border-emerald-700/40 rounded-xl p-4">
          <p class="text-[10px] text-emerald-300 uppercase tracking-wider font-semibold mb-2">Maior Seq. Vitórias</p>
          <p class="font-display text-3xl font-bold text-emerald-400">${stats.maiorSequenciaVitorias}</p>
          <p class="text-[10px] text-slate-500 mt-1">jogos</p>
        </div>

        <div class="bg-blue-900/20 border border-blue-700/40 rounded-xl p-4">
          <p class="text-[10px] text-blue-300 uppercase tracking-wider font-semibold mb-2">Invencibilidade (V+E)</p>
          <p class="font-display text-3xl font-bold text-blue-400">${stats.maiorSequenciaInvencibilidade}</p>
          <p class="text-[10px] text-slate-500 mt-1">jogos</p>
        </div>
      </div>
    </div>
  `;
}

/* ===========================================================
   6. CONTADOR REGRESSIVO E HERO
   =========================================================== */

let countdownInterval = null;

function startCountdown(nextGameDate, timeStr) {
  if (countdownInterval) clearInterval(countdownInterval);
  const timerEl = document.getElementById("heroCountdown");
  if (!timerEl) return;

  const [d, m] = nextGameDate.split("/").map(Number);
  const year = m >= 7 ? 2026 : 2027;
  const [hh, mm] = (timeStr || "20:00").split(":").map(Number);
  const targetTime = new Date(year, m - 1, d, hh, mm, 0).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetTime - now;

    if (diff <= 0) {
      timerEl.innerHTML = `<span class="text-gold font-bold">Jogo em andamento ou encerrado!</span>`;
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timerEl.innerHTML = `
      <div class="flex items-center gap-1.5 font-mono text-xs sm:text-sm text-gold">
        <span class="bg-navy-950/80 px-2 py-1 rounded border border-white/10 font-bold">${days}d</span>:
        <span class="bg-navy-950/80 px-2 py-1 rounded border border-white/10 font-bold">${String(hours).padStart(2, '0')}h</span>:
        <span class="bg-navy-950/80 px-2 py-1 rounded border border-white/10 font-bold">${String(minutes).padStart(2, '0')}m</span>:
        <span class="bg-navy-950/80 px-2 py-1 rounded border border-white/10 font-bold">${String(seconds).padStart(2, '0')}s</span>
      </div>`;
  }

  update();
  countdownInterval = setInterval(update, 1000);
}

function getNextGame() {
  return gamesForTab(activeTab === 'todos' ? 'todos' : activeTab)
    .filter(g => !g.score || g.score.trim().toLowerCase() === "x")
    .sort((a, b) => parseDate(a.date) - parseDate(b.date))[0] || null;
}

function renderHero() {
  const box = document.getElementById("heroNext");
  if (!box) return;

  const next = getNextGame();
  if (!next) { 
    box.innerHTML = ""; 
    box.classList.add("hidden"); 
    if (countdownInterval) clearInterval(countdownInterval);
    return; 
  }
  
  box.classList.remove("hidden");
  const t1 = getTeam(next.team1), t2 = getTeam(next.team2);

  box.innerHTML = `
    <div class="ticket next-game rise-in rounded-2xl border border-navy-600/60 px-4 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-navy-900/80 backdrop-blur-md">
      <div class="flex flex-col items-center sm:items-start gap-2 shrink-0">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-gold animate-pulse"></span>
          <span class="text-[11px] font-bold tracking-[0.2em] text-gold uppercase">Próximo Jogo</span>
        </div>
        <div id="heroCountdown" class="mt-1"></div>
      </div>
      <div class="flex items-center gap-3 sm:gap-6 flex-1 justify-center w-full min-w-0">
        <div class="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <span class="font-display text-xs sm:text-lg text-slate-200 truncate text-right">${t1.name}</span>
          <img src="${t1.logo}" alt="${t1.name}" class="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0">
        </div>
        <span class="font-display text-slate-500 text-sm shrink-0">vs</span>
        <div class="flex items-center gap-2 flex-1 min-w-0">
          <img src="${t2.logo}" alt="${t2.name}" class="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0">
          <span class="font-display text-xs sm:text-lg text-slate-200 truncate">${t2.name}</span>
        </div>
      </div>
      <div class="text-center sm:text-right shrink-0">
        <p class="font-mono text-xs text-slate-400">${fmtLongDate(next.date)} · ${next.time || "--:--"}</p>
        <p class="text-[11px] text-slate-500 mt-0.5">${next.stadium || "Estádio a definir"}</p>
      </div>
    </div>`;

  startCountdown(next.date, next.time);
}

/* ===========================================================
   7. DASHBOARD DE ESTATÍSTICAS BÁSICAS
   =========================================================== */

function computeStats(list) {
  const jogados = list.filter(g => g.score && g.score.trim().toLowerCase() !== "x");
  
  let v = 0, e = 0, d = 0, gp = 0, gc = 0;
  let jogosSemSofrerGols = 0;
  let vCasa = 0, eCasa = 0, dCasa = 0, pontosCasa = 0;
  let vFora = 0, eFora = 0, dFora = 0, pontosFora = 0;
  
  const resultados = [];
  let streakVitoriasAtual = 0, maxVitorias = 0;
  let streakInvencivelAtual = 0, maxInvencivel = 0;

  jogados.forEach(g => {
    const cleanScore = g.score.split("(")[0].trim();
    const scores = cleanScore.toLowerCase().split("x").map(s => parseInt(s.trim(), 10));

    if (scores.length === 2 && !isNaN(scores[0]) && !isNaN(scores[1])) {
      const [s1, s2] = scores;
      const fluEmCasa = g.team1 === "fluminense";
      const golsFl = fluEmCasa ? s1 : s2;
      const golsAdv = fluEmCasa ? s2 : s1;

      gp += golsFl; 
      gc += golsAdv;

      if (golsAdv === 0) jogosSemSofrerGols++;

      if (golsFl > golsAdv) {
        v++;
        resultados.push("V");
        if (fluEmCasa) vCasa++; else vFora++;
        streakVitoriasAtual++;
        if (streakVitoriasAtual > maxVitorias) maxVitorias = streakVitoriasAtual;
        streakInvencivelAtual++;
        if (streakInvencivelAtual > maxInvencivel) maxInvencivel = streakInvencivelAtual;

      } else if (golsFl === golsAdv) {
        e++;
        resultados.push("E");
        if (fluEmCasa) eCasa++; else eFora++;
        streakVitoriasAtual = 0;
        streakInvencivelAtual++;
        if (streakInvencivelAtual > maxInvencivel) maxInvencivel = streakInvencivelAtual;

      } else {
        d++;
        resultados.push("D");
        if (fluEmCasa) dCasa++; else dFora++;
        streakVitoriasAtual = 0;
        streakInvencivelAtual = 0;
      }
    }
  });

  const totalJogados = jogados.length;
  const pontos = (v * 3) + e;
  const saldoGols = gp - gc;
  const mediaGolsPro = totalJogados ? (gp / totalJogados).toFixed(2) : "0.00";
  const aproveitamento = totalJogados ? Math.round((pontos / (totalJogados * 3)) * 100) : 0;
  const posicao = posicoesCompeticao[activeTab] || "-";

  const totalCasa = vCasa + eCasa + dCasa;
  pontosCasa = (vCasa * 3) + eCasa;
  const aproveitamentoCasa = totalCasa ? Math.round((pontosCasa / (totalCasa * 3)) * 100) : 0;

  const totalFora = vFora + eFora + dFora;
  pontosFora = (vFora * 3) + eFora;
  const aproveitamentoFora = totalFora ? Math.round((pontosFora / (totalFora * 3)) * 100) : 0;

  const ultimos5 = resultados.slice(-5);

  return { 
    v, e, d, gp, gc, pontos, aproveitamento, totalJogados, posicao, 
    saldoGols, mediaGolsPro, jogosSemSofrerGols,
    ultimos5, maxVitorias, maxInvencivel,
    pontosCasa, aproveitamentoCasa, totalCasa,
    pontosFora, aproveitamentoFora, totalFora
  };
}

function renderFormaRecente(ultimos5) {
  if (!ultimos5 || ultimos5.length === 0) return '<span class="text-slate-500 text-sm">-</span>';

  return `
    <div class="flex items-center justify-center gap-1 mt-1">
      ${ultimos5.map(res => {
        let bgClass = "bg-slate-700 text-slate-300";
        if (res === "V") bgClass = "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
        if (res === "E") bgClass = "bg-slate-500/20 text-slate-300 border border-slate-500/30";
        if (res === "D") bgClass = "bg-red-500/20 text-red-400 border border-red-500/30";
        
        return `<span class="w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center ${bgClass}">${res}</span>`;
      }).join("")}
    </div>
  `;
}

function statCard(label, value, colorClass) {
  return `
    <div class="stat-card bg-navy-900/60 border border-white/5 rounded-xl px-3 sm:px-4 py-3.5 text-center flex flex-col justify-center items-center">
      <p class="text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">${label}</p>
      <div class="font-display text-xl sm:text-2xl font-semibold ${colorClass}">${value}</div>
    </div>`;
}

function renderDashboard() {
  const list = gamesForTab(activeTab);
  const s = computeStats(list);
  const compLabel = getActiveComps().find(c => c.id === activeTab)?.label || "Geral";

  const titleEl = document.getElementById("dashboardTitle");
  if (titleEl) titleEl.textContent = `Desempenho · ${compLabel}`;

  const isBrasileiro = activeTab === "brasileiro" || activeTab === "brasileiro_fem";

  const saldoFormatado = s.saldoGols > 0 ? `+${s.saldoGols}` : s.saldoGols;
  const corSaldo = s.saldoGols > 0 ? "text-emerald-400" : (s.saldoGols < 0 ? "text-red-400" : "text-slate-300");

  const gridEl = document.getElementById("statGrid");
  if (gridEl) {
    gridEl.innerHTML = `
      ${statCard("Posição", s.posicao, "text-gold")}
      ${isBrasileiro ? statCard("Pontos", `${s.pontos} <span class="text-xs text-slate-400">pts</span>`, "text-gold") : ""}
      ${statCard("Jogos", s.totalJogados, "text-slate-200")}
      ${statCard("Aproveitamento Geral", s.aproveitamento + "%", "text-gold")}
      ${statCard("Aprov. Casa", s.aproveitamentoCasa + "%", "text-emerald-400")}
      ${statCard("Aprov. Fora", s.aproveitamentoFora + "%", "text-blue-400")}
      ${isBrasileiro ? statCard("Pontos Casa / Fora", `${s.pontosCasa} <span class="text-slate-500 text-sm">/</span> ${s.pontosFora}`, "text-gold") : ""}
      ${statCard("Triunfos", s.v, "text-emerald-400")}
      ${statCard("Empates", s.e, "text-slate-300")}
      ${statCard("Derrotas", s.d, "text-red-400")}
      ${statCard("Forma Recente", renderFormaRecente(s.ultimos5), "")}
      ${statCard("Gols Pró / Contra", `${s.gp} <span class="text-slate-500 text-sm">/</span> ${s.gc}`, "text-blue-400")}
      ${statCard("Saldo de Gols", saldoFormatado, corSaldo)}
      ${statCard("Maior Seq. Triunfos", `${s.maxVitorias} <span class="text-xs text-slate-400">jogos</span>`, "text-emerald-400")}
      ${statCard("Maior Invencibilidade", `${s.maxInvencivel} <span class="text-xs text-slate-400">jogos</span>`, "text-gold")}
    `;
  }

  renderizarEstatisticasAvancadas();
}

function renderProgress() {
  const list = gamesForTab(activeTab);
  const total = list.length;
  const jogados = list.filter(g => g.score && g.score.trim().toLowerCase() !== "x").length;
  const pct = total ? Math.round((jogados / total) * 100) : 0;

  const labelEl = document.getElementById("progressLabel");
  const pctEl = document.getElementById("progressPct");
  const fillEl = document.getElementById("progressFill");
  const wrapEl = document.getElementById("progressWrap");

  if (labelEl) labelEl.textContent = `${jogados} de ${total} jogos disputados`;
  if (pctEl) pctEl.textContent = `${pct}%`;
  if (fillEl) fillEl.style.width = `${pct}%`;
  if (wrapEl) wrapEl.classList.toggle("hidden", total === 0);
}

function renderTabs() {
  const bar = document.getElementById("tabBar");
  if (!bar) return;
  bar.innerHTML = "";

  const comps = getActiveComps();
  comps.forEach(c => {
    const count = gamesForTab(c.id).length;
    const btn = document.createElement("button");
    btn.className = `relative shrink-0 pb-1 text-sm font-semibold font-display tracking-wide transition-colors ${
      activeTab === c.id ? "text-gold border-b-2 border-gold" : "text-slate-400 hover:text-slate-200"
    }`;
    btn.innerHTML = `${c.label} <span class="text-[11px] font-mono ml-1 ${activeTab === c.id ? 'text-gold' : 'text-slate-500'}">${count}</span>`;
    btn.onclick = () => { activeTab = c.id; render(); };
    bar.appendChild(btn);
  });
}

function renderSubFilters() {
  const bar = document.getElementById("subFilterBar");
  if (!bar) return;

  const opts = [
    { id: "todos", label: "Todos" },
    { id: "recentes", label: "Resultados" },
    { id: "proximos", label: "Próximos" },
  ];
  bar.innerHTML = "";

  opts.forEach(o => {
    const btn = document.createElement("button");
    const isActive = activeSub === o.id;
    btn.className = `text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
      isActive ? "bg-gold text-navy-950 border-gold" : "border-navy-700 text-slate-400 hover:border-slate-500"
    }`;
    btn.textContent = o.label;
    btn.onclick = () => { activeSub = o.id; render(); };
    bar.appendChild(btn);
  });

  renderMandoFilters();
}

function renderMandoFilters() {
  const mandoContainer = document.getElementById("mandoFilterBar");
  if (!mandoContainer) return;

  mandoContainer.innerHTML = mandos.map(m => `
    <button onclick="setMandoFilter('${m.id}')" class="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
      activeMandoFilter === m.id 
        ? "bg-navy-800 text-gold border-gold" 
        : "border-navy-700/50 text-slate-400 hover:text-slate-200"
    }">
      ${m.label}
    </button>
  `).join("");
}

function setMandoFilter(type) {
  activeMandoFilter = type;
  render();
}

function renderCard(g, isNext) {
  const played = g.score && g.score.trim().toLowerCase() !== "x";
  const t1 = getTeam(g.team1), t2 = getTeam(g.team2);
  const compObj = getActiveComps().find(c => c.id === g.comp || (c.match && c.match.includes(g.comp)));
  const compLabel = compObj ? compObj.label : g.comp;

  const exibeCentro = played ? g.score : (g.time || "--:--");

  return `
  <div class="ticket ${isNext ? "border-gold" : "border-white/10"} bg-navy-900/60 backdrop-blur-md rise-in rounded-xl overflow-hidden flex border group mb-3">
    <div class="w-20 sm:w-28 shrink-0 flex flex-col items-center justify-center py-4 bg-navy-950/50">
      <span class="font-mono text-[10px] text-slate-400 uppercase">${fmtLongDate(g.date).split(" ")[0]}</span>
      <span class="font-display text-xl sm:text-2xl text-white font-semibold leading-none mt-0.5">${g.date.split("/")[0]}</span>
      <span class="font-mono text-[10px] text-slate-400 uppercase mt-0.5">${fmtLongDate(g.date).split(" ").slice(1).join(" ")}</span>
    </div>
    <div class="flex-1 px-3 sm:px-5 py-4 min-w-0 flex flex-col justify-between">
      <div class="flex items-center justify-between">
        <p class="text-[10px] sm:text-[11px] font-semibold text-gold uppercase tracking-wider truncate mr-1">
          ${compLabel} <span class="text-slate-400 font-normal">• ${g.round || "Rodada"}</span>
          ${isNext ? '<span class="ml-2 text-gold">★ Próximo</span>' : ""}
        </p>
        <div class="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button onclick="editGame('${g.id}')" class="text-slate-400 hover:text-gold p-1" title="Editar jogo">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </button>
          <button onclick="deleteGame('${g.id}')" class="text-slate-500 hover:text-red-400 p-1" title="Remover jogo">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
          </button>
        </div>
      </div>

      <div class="flex items-center justify-between my-2">
        <div class="flex items-center gap-2 flex-1 min-w-0">
          <img src="${t1.logo}" alt="${t1.name}" class="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0">
          <span class="font-display text-xs sm:text-sm text-slate-200 truncate">${t1.name}</span>
        </div>

        <div class="px-3 py-1 rounded bg-navy-950 font-mono text-sm font-bold text-white shrink-0 border border-white/5 flex items-center justify-center">
          ${exibeCentro}
        </div>

        <div class="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <span class="font-display text-xs sm:text-sm text-slate-200 truncate text-right">${t2.name}</span>
          <img src="${t2.logo}" alt="${t2.name}" class="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0">
        </div>
      </div>

      <p class="text-[11px] text-slate-400 font-mono">${g.stadium || "Estádio não informado"}</p>
    </div>
  </div>`;
}

function renderLists() {
  const list = gamesForTab(activeTab);
  const nextGame = getNextGame();

  const recentes = list.filter(g => g.score && g.score.trim().toLowerCase() !== "x");
  const proximos = list.filter(g => !g.score || g.score.trim().toLowerCase() === "x");

  const secRecentes = document.getElementById("section-recentes");
  const secProximos = document.getElementById("section-proximos");
  const containerRecentes = document.getElementById("listRecentes");
  const containerProximos = document.getElementById("listProximos");
  const emptyState = document.getElementById("emptyState");

  if (containerRecentes) {
    containerRecentes.innerHTML = recentes.map(g => renderCard(g, false)).join("");
    if (secRecentes) secRecentes.classList.toggle("hidden", activeSub === "proximos" || recentes.length === 0);
  }

  if (containerProximos) {
    containerProximos.innerHTML = proximos.map(g => renderCard(g, nextGame && g.id === nextGame.id)).join("");
    if (secProximos) secProximos.classList.toggle("hidden", activeSub === "recentes" || proximos.length === 0);
  }

  if (emptyState) {
    const totalVisible = (activeSub === "recentes" ? recentes.length : activeSub === "proximos" ? proximos.length : list.length);
    emptyState.classList.toggle("hidden", totalVisible > 0);
  }
}

/* ===========================================================
   8. GERENCIAMENTO DE TEMA E CATEGORIAS
   =========================================================== */

function initThemeToggle() {
  const themeBtn = document.getElementById("themeToggleBtn");
  const currentTheme = StorageUtils.get("fluminense_theme", "dark");

  if (currentTheme === "light") {
    document.documentElement.classList.add("light-theme");
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isLight = document.documentElement.classList.toggle("light-theme");
      StorageUtils.set("fluminense_theme", isLight ? "light" : "dark");
    });
  }
}

function setCategory(category) {
  activeCategory = category;
  
  const btnM = document.getElementById("btnCategoryMasculino");
  const btnF = document.getElementById("btnCategoryFeminino");
  
  if (category === "masculino") {
    if (btnM) btnM.className = "px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 bg-gold text-navy-950 shadow-md";
    if (btnF) btnF.className = "px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 text-slate-400 hover:text-white";
  } else {
    if (btnF) btnF.className = "px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 bg-gold text-navy-950 shadow-md";
    if (btnM) btnM.className = "px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 text-slate-400 hover:text-white";
  }
  
  activeTab = "todos";
  activeSub = "todos";
  activeMandoFilter = "todos";
  
  render();
}

/* ===========================================================
   9. AÇÕES DOS JOGOS (EDIÇÃO & REMOÇÃO)
   =========================================================== */

function deleteGame(id) {
  games = games.filter(g => g.id !== id);
  saveGames();
  render();
}

function editGame(id) {
  const game = games.find(g => g.id === id);
  if (!game) return;

  editingGameId = id;

  const modalTitle = document.getElementById("modalTitle");
  const submitLabel = document.getElementById("submitLabel");

  if (modalTitle) modalTitle.textContent = "Editar jogo";
  if (submitLabel) submitLabel.textContent = "Atualizar jogo";

  if (document.getElementById("fComp")) document.getElementById("fComp").value = game.comp || "brasileiro";
  if (document.getElementById("fRound")) document.getElementById("fRound").value = game.round || "";
  if (document.getElementById("fTime")) document.getElementById("fTime").value = game.time || "20:00";
  if (document.getElementById("fStadium")) document.getElementById("fStadium").value = game.stadium || "";
  if (document.getElementById("fScore")) document.getElementById("fScore").value = game.score || "x";

  if (game.date && game.date.includes("/") && document.getElementById("fDate")) {
    const [d, m] = game.date.split("/");
    const y = Number(m) >= 7 ? 2026 : 2027;
    document.getElementById("fDate").value = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }

  const emCasa = game.team1 === "fluminense";
  const rivalSlug = emCasa ? game.team2 : game.team1;
  if (document.getElementById("fRival")) {
    document.getElementById("fRival").value = getTeam(rivalSlug).name;
  }

  document.querySelectorAll(".mando-btn").forEach(btn => {
    const isCasaBtn = btn.dataset.mando === "casa";
    const isActive = (emCasa && isCasaBtn) || (!emCasa && !isCasaBtn);

    btn.classList.toggle("active", isActive);
    btn.className = isActive 
      ? "mando-btn active flex-1 py-2 rounded-xl text-xs font-semibold border border-rose-600 bg-rose-950/40 text-white transition-all"
      : "mando-btn flex-1 py-2 rounded-xl text-xs font-semibold border border-slate-700/60 bg-navy-950/50 text-slate-300 hover:text-white transition-all";
  });

  const modal = document.getElementById("modalOverlay");
  if (modal) modal.classList.remove("hidden");
}

/* ===========================================================
   10. RENDER GERAL E INICIALIZAÇÃO
   =========================================================== */

function render() {
  renderHero();
  renderDashboard();
  renderProgress();
  renderTabs();
  renderSubFilters();
  renderLists();
}

function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburgerBtn && mobileMenu) {
    const newBtn = hamburgerBtn.cloneNode(true);
    hamburgerBtn.parentNode.replaceChild(newBtn, hamburgerBtn);

    newBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const isHidden = mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex', !isHidden);

      const svg = newBtn.querySelector('svg');
      if (svg) {
        if (!isHidden) {
          svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
        } else {
          svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
        }
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  render();
  initHamburgerMenu();

  document.querySelectorAll(".mando-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".mando-btn").forEach(b => {
        b.classList.remove("active");
        b.className = "mando-btn flex-1 py-2 rounded-xl text-xs font-semibold border border-slate-700/60 bg-navy-950/50 text-slate-300 hover:text-white transition-all";
      });

      btn.classList.add("active");
      btn.className = "mando-btn active flex-1 py-2 rounded-xl text-xs font-semibold border border-rose-600 bg-rose-950/40 text-white transition-all";
    });
  });

  const modal = document.getElementById("modalOverlay");
  const btnAdd = document.getElementById("btnAddGame");
  const btnAddMobile = document.getElementById("btnAddGameMobile");
  const btnClose = document.getElementById("btnCloseModal");
  const gameForm = document.getElementById("gameForm");

  const openModal = () => {
    editingGameId = null;
    const modalTitle = document.getElementById("modalTitle");
    const submitLabel = document.getElementById("submitLabel");
    if (modalTitle) modalTitle.textContent = "Adicionar jogo";
    if (submitLabel) submitLabel.textContent = "Salvar jogo";
    if (gameForm) gameForm.reset();
    if (modal) modal.classList.remove("hidden");
  };

  const closeModal = () => {
    editingGameId = null;
    if (modal) modal.classList.add("hidden");
  };

  if (btnAdd) btnAdd.addEventListener("click", openModal);
  if (btnAddMobile) btnAddMobile.addEventListener("click", openModal);
  if (btnClose) btnClose.addEventListener("click", closeModal);

  if (gameForm) {
    gameForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const comp = document.getElementById("fComp").value;
      const round = document.getElementById("fRound").value || "Rodada";
      const dateRaw = document.getElementById("fDate").value;
      const time = document.getElementById("fTime").value || "20:00";
      const rival = slugify(document.getElementById("fRival").value || "Adversario");
      const stadium = document.getElementById("fStadium").value || "Fonte Nova";
      const score = document.getElementById("fScore").value.trim() || "x";

      let dateFmt = "01/01";
      if (dateRaw) {
        const parts = dateRaw.split("-");
        dateFmt = `${parts[2]}/${parts[1]}`;
      }

      const mandoBtn = document.querySelector(".mando-btn.active");
      const emCasa = mandoBtn ? mandoBtn.dataset.mando === "casa" : true;

      if (editingGameId) {
        const index = games.findIndex(g => g.id === editingGameId);
        if (index !== -1) {
          games[index] = {
            ...games[index],
            comp,
            round,
            date: dateFmt,
            time,
            team1: emCasa ? "fluminense" : rival,
            team2: emCasa ? rival : "fluminense",
            stadium,
            score
          };
        }
      } else {
        const newGame = {
          id: cryptoId(),
          category: activeCategory,
          comp,
          round,
          date: dateFmt,
          time,
          team1: emCasa ? "fluminense" : rival,
          team2: emCasa ? rival : "fluminense",
          stadium,
          score
        };
        games.push(newGame);
      }

      saveGames();
      closeModal();
      gameForm.reset();
      render();
    });
  }
});
