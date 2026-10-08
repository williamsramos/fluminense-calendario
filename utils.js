/* ===========================================================
   Utilitários Globais — Compartilhados entre páginas
   =========================================================== */

// ===== TOAST NOTIFICATIONS =====
function initToastContainer() {
  if (!document.getElementById('toastContainer')) {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}

function showToast(message, type = 'success', duration = 3000) {
  initToastContainer();
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  if (duration > 0) {
    setTimeout(() => {
      toast.style.animation = 'slideInRight 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
}

// ===== TAILWIND CONFIG (Centralizado - Fluminense) =====
function initTailwindConfig() {
  if (!window.tailwindInitialized) {
    if (typeof tailwind !== 'undefined') {
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              navy: { 950: '#030B18', 900: '#071329', 800: '#0E1F3F', 700: '#152C56', 600: '#1D3B70' },
              azul: { DEFAULT: '#00468C', 600: '#003366', 400: '#0056F3' },
              vermelho: { DEFAULT: '#E31C22', 600: '#B31217', 400: '#FF3B3B' },
              branco: { DEFAULT: '#FFFFFF', 100: '#F1F5F9', 200: '#E2E8F0' },
              ouro: { DEFAULT: '#FFD700', 600: '#CCAC00', 400: '#FFE033' },
              blaugrana: { DEFAULT: '#00468C', 600: '#003366' },
              garnet: { DEFAULT: '#E31C22', 600: '#B31217', 400: '#FF3B3B' },
              gold: { DEFAULT: '#FFD700', 600: '#CCAC00' }
            },
            fontFamily: {
              display: ['Oswald', 'sans-serif'],
              body: ['Inter', 'sans-serif'],
              mono: ['JetBrains Mono', 'monospace'],
            },
          }
        }
      };
    }
    window.tailwindInitialized = true;
  }
}

// ===== ARMAZENAMENTO LOCAL =====
const LocalStorage = {
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (error) { console.error('Erro ao salvar dados:', error); return false; }
  },
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) { console.error('Erro ao carregar dados:', error); return defaultValue; }
  },
  remove(key) {
    try { localStorage.removeItem(key); return true; }
    catch (error) { console.error('Erro ao remover dados:', error); return false; }
  },
  clear() {
    try { localStorage.clear(); return true; }
    catch (error) { console.error('Erro ao limpar dados:', error); return false; }
  }
};

// 📊 Classificação da Série A - 2026
// (o campo "status" é recalculado pela posição; aqui só serve de valor inicial)
const dadosClassificacao = [
  { pos: 1, clube: "Flamengo", slug: "flamengo", pts: 60, pj: 28, vit: 18, e: 6, der: 4, gm: 55, gc: 23, sg: 32, ultimas: ["V", "V", "V", "V", "V"], proximo: "santos", status: "libertadores_fase_grupos" },
  { pos: 2, clube: "Palmeiras", slug: "palmeiras", pts: 57, pj: 28, vit: 16, e: 9, der: 3, gm: 47, gc: 21, sg: 26, ultimas: ["V", "E", "E", "V", "E"], proximo: "bahia", status: "libertadores_fase_grupos" },
  { pos: 3, clube: "Athletico-PR", slug: "athletico-pr", pts: 49, pj: 28, vit: 14, e: 7, der: 7, gm: 43, gc: 32, sg: 11, ultimas: ["V", "E", "D", "E", "V"], proximo: "atletico-mg", status: "libertadores_fase_grupos" },
  { pos: 4, clube: "Fluminense", slug: "fluminense", pts: 48, pj: 28, vit: 13, e: 9, der: 6, gm: 44, gc: 36, sg: 8, ultimas: ["V", "E", "V", "D", "V"], proximo: "coritiba", status: "libertadores_fase_grupos" },
  { pos: 5, clube: "Bahia", slug: "bahia", pts: 46, pj: 28, vit: 12, e: 10, der: 6, gm: 43, gc: 35, sg: 8, ultimas: ["V", "V", "V", "V", "D"], proximo: "palmeiras", status: "pre_libertadores" },
  { pos: 6, clube: "Cruzeiro", slug: "cruzeiro", pts: 45, pj: 28, vit: 13, e: 6, der: 9, gm: 42, gc: 40, sg: 2, ultimas: ["V", "D", "V", "D", "V"], proximo: "sao-paulo", status: "sul_americana" },
  { pos: 7, clube: "Atlético-MG", slug: "atletico-mg", pts: 40, pj: 27, vit: 11, e: 7, der: 9, gm: 36, gc: 32, sg: 4, ultimas: ["E", "V", "D", "V", "E"], proximo: "athletico-pr", status: "sul_americana" },
  { pos: 8, clube: "Santos", slug: "santos", pts: 38, pj: 27, vit: 10, e: 8, der: 9, gm: 41, gc: 40, sg: 1, ultimas: ["E", "V", "V", "V", "V"], proximo: "flamengo", status: "sul_americana" },
  { pos: 9, clube: "Coritiba", slug: "coritiba", pts: 38, pj: 28, vit: 10, e: 8, der: 10, gm: 37, gc: 43, sg: -6, ultimas: ["V", "V", "D", "E", "D"], proximo: "fluminense", status: "sul_americana" },
  { pos: 10, clube: "Bragantino", slug: "bragantino", pts: 36, pj: 27, vit: 10, e: 6, der: 11, gm: 33, gc: 31, sg: 2, ultimas: ["V", "D", "D", "E", "D"], proximo: "mirassol", status: "sul_americana" },
  { pos: 11, clube: "São Paulo", slug: "sao-paulo", pts: 36, pj: 27, vit: 10, e: 6, der: 11, gm: 32, gc: 30, sg: 2, ultimas: ["D", "V", "V", "D", "V"], proximo: "cruzeiro", status: "sul_americana" },
  { pos: 12, clube: "Botafogo", slug: "botafogo", pts: 35, pj: 28, vit: 9, e: 8, der: 11, gm: 41, gc: 45, sg: -4, ultimas: ["D", "E", "E", "V", "D"], proximo: "vasco", status: "neutro" },
  { pos: 13, clube: "Vitória", slug: "vitoria", pts: 33, pj: 28, vit: 9, e: 6, der: 13, gm: 28, gc: 42, sg: -14, ultimas: ["D", "D", "V", "E", "D"], proximo: "chapecoense", status: "neutro" },
  { pos: 14, clube: "Corinthians", slug: "corinthians", pts: 32, pj: 28, vit: 8, e: 8, der: 12, gm: 29, gc: 32, sg: -3, ultimas: ["D", "D", "D", "D", "D"], proximo: "internacional", status: "neutro" },
  { pos: 15, clube: "Mirassol", slug: "mirassol", pts: 32, pj: 28, vit: 8, e: 8, der: 12, gm: 33, gc: 42, sg: -9, ultimas: ["E", "D", "V", "E", "V"], proximo: "bragantino", status: "neutro" },
  { pos: 16, clube: "Vasco da Gama", slug: "vasco", pts: 31, pj: 27, vit: 8, e: 7, der: 12, gm: 34, gc: 41, sg: -7, ultimas: ["D", "V", "D", "V", "V"], proximo: "botafogo", status: "neutro" },
  { pos: 17, clube: "Grêmio", slug: "gremio", pts: 29, pj: 28, vit: 7, e: 8, der: 13, gm: 30, gc: 38, sg: -8, ultimas: ["V", "D", "D", "D", "E"], proximo: "remo", status: "rebaixamento" },
  { pos: 18, clube: "Internacional", slug: "internacional", pts: 28, pj: 28, vit: 6, e: 10, der: 12, gm: 30, gc: 36, sg: -6, ultimas: ["E", "D", "D", "V", "D"], proximo: "corinthians", status: "rebaixamento" },
  { pos: 19, clube: "Remo", slug: "remo", pts: 23, pj: 28, vit: 5, e: 8, der: 15, gm: 32, gc: 47, sg: -15, ultimas: ["D", "D", "D", "D", "D"], proximo: "gremio", status: "rebaixamento" },
  { pos: 20, clube: "Chapecoense", slug: "chapecoense", pts: 18, pj: 27, vit: 3, e: 9, der: 15, gm: 29, gc: 53, sg: -24, ultimas: ["V", "D", "V", "D", "E"], proximo: "vitoria", status: "rebaixamento" }
];

// ===== ZONAS (fonte única de cores e textos: tabela, filtros e legenda) =====
const legendaQualificacaoRebaixamento = {
  libertadores_fase_grupos: { label: "1º - 4º: Libertadores (G4)", cor: "#234bc5" },
  pre_libertadores:         { label: "5º: Pré-Libertadores",       cor: "#447eff" },
  sul_americana:            { label: "6º - 11º: Sul-Americana",    cor: "#358856" },
  neutro:                   { label: "12º - 16º: Neutro",          cor: "#64748b" },
  rebaixamento:             { label: "17º - 20º: Rebaixamento",    cor: "#d93829" }
};

// Define a zona pela POSIÇÃO atual (o simulador reordena a tabela)
function statusPorPosicao(pos) {
  if (pos <= 4) return "libertadores_fase_grupos";
  if (pos <= 5) return "pre_libertadores";
  if (pos <= 11) return "sul_americana";
  if (pos <= 16) return "neutro";
  return "rebaixamento";
}

// ===== FILTROS POR ZONA =====
let filtroClassificacao = "todos";
let ultimosDadosClassificacao = dadosClassificacao;

const filtrosClassificacao = [
  { id: "libertadores_fase_grupos", label: "Libertadores - G4", faixa: "1º ao 4º" },
  { id: "pre_libertadores",         label: "Pré-Libertadores",  faixa: "5º" },
  { id: "sul_americana",            label: "Sul-Americana",     faixa: "6º ao 11º" },
  { id: "neutro",                   label: "Neutro",            faixa: "12º ao 16º" },
  { id: "rebaixamento",             label: "Rebaixamento",      faixa: "17º ao 20º" },
  { id: "todos",                    label: "Ver tudo",          faixa: "" }
];

function renderizarFiltros() {
  const container = document.getElementById("filtros-classificacao");
  if (!container) return;

  container.innerHTML = filtrosClassificacao.map(f => {
    const ativo = f.id === filtroClassificacao;
    const zona = legendaQualificacaoRebaixamento[f.id];
    const base = "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition ";
    const tema = f.id === "todos"
      ? "bg-navy-950 text-white border border-gold/40 hover:border-gold "
      : "bg-slate-200 text-navy-950 hover:bg-white ";
    const anel = ativo ? "ring-2 ring-gold ring-offset-2 ring-offset-navy-950" : "";
    const dot = zona ? `<span class="w-2.5 h-2.5 rounded-full inline-block" style="background:${zona.cor}" aria-hidden="true"></span>` : "";
    const faixa = f.faixa ? `<span class="opacity-60 text-[11px]">${f.faixa}</span>` : "";
    return `<button type="button" data-filtro="${f.id}" aria-pressed="${ativo}" class="${base}${tema}${anel}">${dot}<span>${f.label}</span>${faixa}</button>`;
  }).join("");

  container.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      filtroClassificacao = btn.dataset.filtro;
      renderizarFiltros();
      renderizarTabelaClassificacao(ultimosDadosClassificacao);
    });
  });
}

// 📊 Escudos dos times
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
  "o-higgins": "img/o-higgins.png",
  "montevideo-city": "img/montevideo-city.png"
};

function getTeam(slug) {
  // Usa o nome oficial (com acentos) quando o clube existe na tabela
  const clube = dadosClassificacao.find(t => t.slug === slug);
  const name = clube
    ? clube.clube
    : (slug || "").split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const logo = teamLogos[slug] || 'img/default.png';
  return { name, logo };
}

function renderizarTabelaClassificacao(dados = dadosClassificacao) {
  const tbody = document.getElementById("tabela-corpo");
  if (!tbody) return;

  ultimosDadosClassificacao = dados;
  tbody.innerHTML = "";

  const visiveis = filtroClassificacao === "todos"
    ? dados
    : dados.filter(i => statusPorPosicao(i.pos) === filtroClassificacao);

  visiveis.forEach((item) => {
    const isfluminense = item.slug === "fluminense";
    const teamData = getTeam(item.slug);
    const proximoData = getTeam(item.proximo || "");

    const status = statusPorPosicao(item.pos);
    const cor = legendaQualificacaoRebaixamento[status].cor;

    let posBadgeClass = "font-mono px-2 py-0.5 rounded text-xs font-bold text-white border";
    let posBadgeStyle = `background:${cor}55; border-color:${cor};`;
    let trClasses = "hover:bg-navy-800/50 transition-colors ";
    if (status === "rebaixamento") trClasses += "bg-rose-950/20 ";

    if (isfluminense) {
      trClasses = "bg-gradient-to-r from-azul-600/40 via-navy-800 to-vermelho-600/30 font-bold text-white border-l-4 border-gold shadow-lg shadow-blue-900/40 scale-[1.01] transition-transform";
      posBadgeClass = "bg-gold text-navy-950 font-black px-2 py-0.5 rounded text-xs border border-gold shadow";
      posBadgeStyle = "";
    }

    const ultimosHTML = (item.ultimas || []).map(resultado => {
      if (resultado === 'V') {
        return `<span class="w-5 h-5 inline-flex items-center justify-center bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full text-[10px] font-extrabold">V</span>`;
      } else if (resultado === 'E') {
        return `<span class="w-5 h-5 inline-flex items-center justify-center bg-slate-500/20 text-slate-300 border border-slate-500/40 rounded-full text-[10px] font-extrabold">E</span>`;
      }
      return `<span class="w-5 h-5 inline-flex items-center justify-center bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-full text-[10px] font-extrabold">D</span>`;
    }).join(' ');

    let sgClass = "font-mono ";
    if (item.sg > 0) sgClass += isfluminense ? "text-emerald-300 font-bold" : "text-emerald-400 font-medium";
    else if (item.sg < 0) sgClass += "text-rose-400 font-medium";
    else sgClass += "text-slate-400";

    const tr = document.createElement("tr");
    tr.className = trClasses.trim();

    tr.innerHTML = `
      <td class="py-3 px-4"><span class="${posBadgeClass}" style="${posBadgeStyle}">${item.pos}º</span></td>
      <td class="py-3 px-4 flex items-center gap-2.5 font-medium text-slate-200">
        <img src="${teamData.logo}" alt="Escudo do ${item.clube}" class="w-6 h-6 object-contain shrink-0 drop-shadow" onerror="this.onerror=null; this.src='img/default.png';">
        <span class="${isfluminense ? 'text-white font-black tracking-wide' : ''}">${item.clube}</span>
        ${isfluminense ? '<span class="ml-1 text-[10px] bg-gold/20 text-gold border border-gold/40 px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wider">tricolor</span>' : ''}
      </td>
      <td class="py-3 px-3 text-center font-mono ${isfluminense ? 'text-gold font-black text-lg' : 'font-bold text-white'}">${item.pts}</td>
      <td class="py-3 px-3 text-center ${isfluminense ? 'text-white font-bold' : 'text-slate-300'}">${item.pj}</td>
      <td class="py-3 px-3 text-center ${isfluminense ? 'text-white font-bold' : 'text-slate-300'}">${item.vit}</td>
      <td class="py-3 px-3 text-center ${isfluminense ? 'text-white font-bold' : 'text-slate-300'}">${item.e}</td>
      <td class="py-3 px-3 text-center ${isfluminense ? 'text-white font-bold' : 'text-slate-300'}">${item.der}</td>
      <td class="py-3 px-3 text-center ${isfluminense ? 'text-white font-bold' : 'text-slate-300'}">${item.gm}</td>
      <td class="py-3 px-3 text-center ${isfluminense ? 'text-white font-bold' : 'text-slate-300'}">${item.gc}</td>
      <td class="py-3 px-3 text-center ${sgClass}">${item.sg > 0 ? '+' + item.sg : item.sg}</td>
      <td class="py-3 px-3 text-center">
        <div class="flex items-center justify-center gap-1">${ultimosHTML}</div>
      </td>
      <td class="py-3 px-3 text-center">
        <div class="flex items-center justify-center gap-1.5" title="Próximo jogo contra ${proximoData.name}">
          <img src="${proximoData.logo}" alt="Escudo do ${proximoData.name}" class="w-5 h-5 object-contain" onerror="this.onerror=null; this.src='img/default.png';">
          <span class="text-xs text-slate-300 hidden md:inline">${proximoData.name}</span>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });

  if (visiveis.length === 0) {
    tbody.innerHTML = `<tr><td colspan="12" class="py-6 text-center text-slate-400">Nenhum clube nesta zona.</td></tr>`;
  }
}

function renderizarLegendaClassificacao() {
  const containerTabela = document.getElementById("tabela-corpo")?.closest('.overflow-x-auto') || document.getElementById("tabela-corpo")?.parentElement;
  if (!containerTabela || document.getElementById("legenda-classificacao")) return;

  // Legenda gerada do mesmo objeto que define as cores da tabela
  const itens = Object.values(legendaQualificacaoRebaixamento).map(l => `
    <div class="flex items-center gap-2">
      <span class="w-3.5 h-3.5 rounded inline-block" style="background:${l.cor}"></span>
      <span>${l.label}</span>
    </div>`).join("");

  const legendaHTML = `
    <div id="legenda-classificacao" class="mt-6 p-4 bg-navy-900 border border-navy-800 rounded-xl flex flex-wrap gap-4 text-xs font-medium justify-between items-center text-slate-300">
      ${itens}
    </div>
  `;
  containerTabela.insertAdjacentHTML('afterend', legendaHTML);
}

// ===== DICIONÁRIO DE PRÓXIMOS CONFRONTOS POR RODADA =====
const proximosJogosPorRodada = {
  29: {
    "bragantino": "mirassol", "mirassol": "bragantino",
    "internacional": "corinthians", "corinthians": "internacional",
    "remo": "gremio", "gremio": "remo",
    "vitoria": "chapecoense", "chapecoense": "vitoria",
    "botafogo": "vasco", "vasco": "botafogo",
    "cruzeiro": "sao-paulo", "sao-paulo": "cruzeiro",
    "santos": "flamengo", "flamengo": "santos",
    "athletico-pr": "atletico-mg", "atletico-mg": "athletico-pr",
    "fluminense": "coritiba", "coritiba": "fluminense",
    "palmeiras": "bahia", "bahia": "palmeiras"
  },
  30: {
    "vasco": "remo", "remo": "vasco",
    "sao-paulo": "vitoria", "vitoria": "sao-paulo",
    "atletico-mg": "santos", "santos": "atletico-mg",
    "flamengo": "fluminense", "fluminense": "flamengo",
    "palmeiras": "corinthians", "corinthians": "palmeiras",
    "gremio": "internacional", "internacional": "gremio",
    "coritiba": "botafogo", "botafogo": "coritiba",
    "bahia": "mirassol", "mirassol": "bahia",
    "chapecoense": "athletico-pr", "athletico-pr": "chapecoense",
    "bragantino": "cruzeiro", "cruzeiro": "bragantino"
  },
  31: {
    "mirassol": "internacional", "internacional": "mirassol",
    "botafogo": "chapecoense", "chapecoense": "botafogo",
    "atletico-mg": "coritiba", "coritiba": "atletico-mg",
    "athletico-pr": "palmeiras", "palmeiras": "athletico-pr",
    "sao-paulo": "vasco", "vasco": "sao-paulo",
    "fluminense": "santos", "santos": "fluminense",
    "gremio": "cruzeiro", "cruzeiro": "gremio",
    "bahia": "flamengo", "flamengo": "bahia",
    "remo": "bragantino", "bragantino": "remo",
    "corinthians": "vitoria", "vitoria": "corinthians"
  },
  32: {
    "cruzeiro": "remo", "remo": "cruzeiro",
    "mirassol": "sao-paulo", "sao-paulo": "mirassol",
    "internacional": "botafogo", "botafogo": "internacional",
    "vitoria": "athletico-pr", "athletico-pr": "vitoria",
    "vasco": "corinthians", "corinthians": "vasco",
    "palmeiras": "bragantino", "bragantino": "palmeiras",
    "chapecoense": "fluminense", "fluminense": "chapecoense",
    "santos": "bahia", "bahia": "santos",
    "coritiba": "gremio", "gremio": "coritiba",
    "flamengo": "atletico-mg", "atletico-mg": "flamengo"
  },
  33: {
    "fluminense": "internacional", "internacional": "fluminense",
    "santos": "palmeiras", "palmeiras": "santos",
    "bragantino": "chapecoense", "chapecoense": "bragantino",
    "bahia": "sao-paulo", "sao-paulo": "bahia",
    "remo": "botafogo", "botafogo": "remo",
    "atletico-mg": "cruzeiro", "cruzeiro": "atletico-mg",
    "coritiba": "vitoria", "vitoria": "coritiba",
    "vasco": "flamengo", "flamengo": "vasco",
    "gremio": "athletico-pr", "athletico-pr": "gremio",
    "corinthians": "mirassol", "mirassol": "corinthians"
  },
  34: {
    "bragantino": "santos", "santos": "bragantino",
    "chapecoense": "mirassol", "mirassol": "chapecoense",
    "internacional": "coritiba", "coritiba": "internacional",
    "flamengo": "gremio", "gremio": "flamengo",
    "athletico-pr": "vasco", "vasco": "athletico-pr",
    "botafogo": "atletico-mg", "atletico-mg": "botafogo",
    "sao-paulo": "corinthians", "corinthians": "sao-paulo",
    "palmeiras": "remo", "remo": "palmeiras",
    "cruzeiro": "bahia", "bahia": "cruzeiro",
    "vitoria": "fluminense", "fluminense": "vitoria"
  }
};

function atualizarRodadaTabela(numeroRodada) {
  const mapaConfrontos = proximosJogosPorRodada[numeroRodada];
  if (!mapaConfrontos) return;

  dadosClassificacao.forEach(item => {
    if (mapaConfrontos[item.slug]) item.proximo = mapaConfrontos[item.slug];
  });

  const tabelaAtual = LocalStorage.get("tabela_classificacao", dadosClassificacao);
  renderizarTabelaClassificacao(tabelaAtual);
}

// ===== CALENDÁRIO COMPLETO DAS RODADAS =====
const calendarioRodadas = [
  {
    rodada: 29,
    jogos: [
      { id: "r29_j1", mandante: "bragantino", visitante: "mirassol", data: "Quarta-feira, 07/10", hora: "19:30", estadio: "Cícero Souza Marques" },
      { id: "r29_j2", mandante: "internacional", visitante: "corinthians", data: "Quarta-feira, 07/10", hora: "19:30", estadio: "Beira-Rio" },
      { id: "r29_j3", mandante: "remo", visitante: "gremio", data: "Quarta-feira, 07/10", hora: "19:30", estadio: "Mangueirão" },
      { id: "r29_j4", mandante: "vitoria", visitante: "chapecoense", data: "Quarta-feira, 07/10", hora: "20:00", estadio: "Barradão" },
      { id: "r29_j5", mandante: "botafogo", visitante: "vasco", data: "Quarta-feira, 07/10", hora: "20:30", estadio: "Nilton Santos" },
      { id: "r29_j6", mandante: "cruzeiro", visitante: "sao-paulo", data: "Quarta-feira, 07/10", hora: "21:30", estadio: "Mineirão" },
      { id: "r29_j7", mandante: "santos", visitante: "flamengo", data: "Quinta-feira, 08/10", hora: "19:30", estadio: "Vila Belmiro" },
      { id: "r29_j8", mandante: "athletico-pr", visitante: "atletico-mg", data: "Quinta-feira, 08/10", hora: "20:00", estadio: "Arena da Baixada" },
      { id: "r29_j9", mandante: "fluminense", visitante: "coritiba", data: "Quinta-feira, 08/10", hora: "21:30", estadio: "Maracanã" },
      { id: "r29_j10", mandante: "palmeiras", visitante: "bahia", data: "Quinta-feira, 08/10", hora: "21:30", estadio: "Nubank Parque" }
    ]
  },
  {
    rodada: 30,
    jogos: [
      { id: "r30_j1", mandante: "vasco", visitante: "remo", data: "Sábado, 10/10", hora: "17:00", estadio: "São Januário" },
      { id: "r30_j2", mandante: "sao-paulo", visitante: "vitoria", data: "Sábado, 10/10", hora: "21:00", estadio: "Morumbis" },
      { id: "r30_j3", mandante: "atletico-mg", visitante: "santos", data: "Domingo, 11/10", hora: "16:00", estadio: "Arena MRV" },
      { id: "r30_j4", mandante: "flamengo", visitante: "fluminense", data: "Domingo, 11/10", hora: "17:30", estadio: "Maracanã" },
      { id: "r30_j5", mandante: "palmeiras", visitante: "corinthians", data: "Domingo, 11/10", hora: "17:30", estadio: "Nubank Parque" },
      { id: "r30_j6", mandante: "gremio", visitante: "internacional", data: "Domingo, 11/10", hora: "17:30", estadio: "Arena do Grêmio" },
      { id: "r30_j7", mandante: "coritiba", visitante: "botafogo", data: "Domingo, 11/10", hora: "19:30", estadio: "Couto Pereira" },
      { id: "r30_j8", mandante: "bahia", visitante: "mirassol", data: "Domingo, 11/10", hora: "19:30", estadio: "Arena Fonte Nova" },
      { id: "r30_j9", mandante: "chapecoense", visitante: "athletico-pr", data: "Segunda-feira, 12/10", hora: "19:30", estadio: "Arena Condá" },
      { id: "r30_j10", mandante: "bragantino", visitante: "cruzeiro", data: "Segunda-feira, 12/10", hora: "21:00", estadio: "Cícero Souza Marques" }
    ]
  },
  {
    rodada: 31,
    jogos: [
      { id: "r31_j1", mandante: "mirassol", visitante: "internacional", data: "Sexta-feira, 16/10", hora: "20:00", estadio: "Estádio Maião" },
      { id: "r31_j2", mandante: "botafogo", visitante: "chapecoense", data: "Sábado, 17/10", hora: "18:00", estadio: "Nilton Santos" },
      { id: "r31_j3", mandante: "atletico-mg", visitante: "coritiba", data: "Sábado, 17/10", hora: "18:30", estadio: "Arena MRV" },
      { id: "r31_j4", mandante: "athletico-pr", visitante: "palmeiras", data: "Sábado, 17/10", hora: "19:30", estadio: "Arena da Baixada" },
      { id: "r31_j5", mandante: "sao-paulo", visitante: "vasco", data: "Sábado, 17/10", hora: "21:00", estadio: "Morumbis" },
      { id: "r31_j6", mandante: "fluminense", visitante: "santos", data: "Domingo, 18/10", hora: "16:00", estadio: "Maracanã" },
      { id: "r31_j7", mandante: "gremio", visitante: "cruzeiro", data: "Domingo, 18/10", hora: "16:00", estadio: "Arena do Grêmio" },
      { id: "r31_j8", mandante: "bahia", visitante: "flamengo", data: "Domingo, 18/10", hora: "18:30", estadio: "Arena Fonte Nova" },
      { id: "r31_j9", mandante: "remo", visitante: "bragantino", data: "Domingo, 18/10", hora: "19:30", estadio: "Mangueirão" },
      { id: "r31_j10", mandante: "corinthians", visitante: "vitoria", data: "Segunda-feira, 19/10", hora: "20:00", estadio: "Neo Química Arena" }
    ]
  },
  {
    rodada: 32,
    jogos: [
      { id: "r32_j1", mandante: "cruzeiro", visitante: "remo", data: "Sexta-feira, 23/10", hora: "20:00", estadio: "Mineirão" },
      { id: "r32_j2", mandante: "mirassol", visitante: "sao-paulo", data: "Sábado, 24/10", hora: "16:30", estadio: "Estádio Maião" },
      { id: "r32_j3", mandante: "internacional", visitante: "botafogo", data: "Sábado, 24/10", hora: "16:30", estadio: "Beira-Rio" },
      { id: "r32_j4", mandante: "vitoria", visitante: "athletico-pr", data: "Sábado, 24/10", hora: "16:30", estadio: "Barradão" },
      { id: "r32_j5", mandante: "vasco", visitante: "corinthians", data: "Sábado, 24/10", hora: "18:30", estadio: "São Januário" },
      { id: "r32_j6", mandante: "palmeiras", visitante: "bragantino", data: "Sábado, 24/10", hora: "18:30", estadio: "Arena Barueri" },
      { id: "r32_j7", mandante: "chapecoense", visitante: "fluminense", data: "Sábado, 24/10", hora: "19:30", estadio: "Arena Condá" },
      { id: "r32_j8", mandante: "santos", visitante: "bahia", data: "Sábado, 24/10", hora: "21:00", estadio: "Vila Belmiro" },
      { id: "r32_j9", mandante: "coritiba", visitante: "gremio", data: "Segunda-feira, 26/10", hora: "19:30", estadio: "Couto Pereira" },
      { id: "r32_j10", mandante: "flamengo", visitante: "atletico-mg", data: "Segunda-feira, 26/10", hora: "20:00", estadio: "Maracanã" }
    ]
  },
  {
    rodada: 33,
    jogos: [
      { id: "r33_j1", mandante: "fluminense", visitante: "internacional", data: "Quarta-feira, 28/10", hora: "19:30", estadio: "Maracanã" },
      { id: "r33_j2", mandante: "santos", visitante: "palmeiras", data: "Quarta-feira, 28/10", hora: "19:30", estadio: "Vila Belmiro" },
      { id: "r33_j3", mandante: "bragantino", visitante: "chapecoense", data: "Quarta-feira, 28/10", hora: "19:30", estadio: "Cícero Souza Marques" },
      { id: "r33_j4", mandante: "bahia", visitante: "sao-paulo", data: "Quarta-feira, 28/10", hora: "21:30", estadio: "Arena Fonte Nova" },
      { id: "r33_j5", mandante: "remo", visitante: "botafogo", data: "Quarta-feira, 28/10", hora: "21:30", estadio: "Mangueirão" },
      { id: "r33_j6", mandante: "atletico-mg", visitante: "cruzeiro", data: "Quinta-feira, 29/10", hora: "19:30", estadio: "Arena MRV" },
      { id: "r33_j7", mandante: "coritiba", visitante: "vitoria", data: "Quinta-feira, 29/10", hora: "19:30", estadio: "Couto Pereira" },
      { id: "r33_j8", mandante: "vasco", visitante: "flamengo", data: "Quinta-feira, 29/10", hora: "20:00", estadio: "A definir" },
      { id: "r33_j9", mandante: "gremio", visitante: "athletico-pr", data: "Quinta-feira, 29/10", hora: "21:30", estadio: "Arena do Grêmio" },
      { id: "r33_j10", mandante: "corinthians", visitante: "mirassol", data: "Sexta-feira, 30/10", hora: "20:00", estadio: "Neo Química Arena" }
    ]
  },
  {
    rodada: 34,
    jogos: [
      { id: "r34_j1", mandante: "bragantino", visitante: "santos", data: "Segunda-feira, 02/11", hora: "20:00", estadio: "Cícero Souza Marques" },
      { id: "r34_j2", mandante: "chapecoense", visitante: "mirassol", data: "Terça-feira, 03/11", hora: "19:30", estadio: "Arena Condá" },
      { id: "r34_j3", mandante: "internacional", visitante: "coritiba", data: "Terça-feira, 03/11", hora: "21:30", estadio: "Beira-Rio" },
      { id: "r34_j4", mandante: "flamengo", visitante: "gremio", data: "Quarta-feira, 04/11", hora: "19:30", estadio: "Maracanã" },
      { id: "r34_j5", mandante: "athletico-pr", visitante: "vasco", data: "Quarta-feira, 04/11", hora: "19:30", estadio: "Arena da Baixada" },
      { id: "r34_j6", mandante: "botafogo", visitante: "atletico-mg", data: "Quarta-feira, 04/11", hora: "21:30", estadio: "Nilton Santos" },
      { id: "r34_j7", mandante: "sao-paulo", visitante: "corinthians", data: "Quarta-feira, 04/11", hora: "21:30", estadio: "A definir" },
      { id: "r34_j8", mandante: "palmeiras", visitante: "remo", data: "Quinta-feira, 05/11", hora: "19:30", estadio: "Nubank Parque" },
      { id: "r34_j9", mandante: "cruzeiro", visitante: "bahia", data: "Quinta-feira, 05/11", hora: "21:30", estadio: "Mineirão" },
      { id: "r34_j10", mandante: "vitoria", visitante: "fluminense", data: "Sexta-feira, 06/11", hora: "20:00", estadio: "Barradão" }
    ]
  }
];

// Mescla placares salvos (por id do jogo) com o calendário atual,
// assim rodadas novas aparecem mesmo para quem já tem dados salvos.
function carregarJogosSalvos() {
  const salvos = LocalStorage.get("jogos_calendario", []);
  const placares = {};
  (salvos || []).forEach(r => (r.jogos || []).forEach(j => {
    if (j.golsMandante !== undefined || j.golsVisitante !== undefined) {
      placares[j.id] = { golsMandante: j.golsMandante, golsVisitante: j.golsVisitante };
    }
  }));
  return calendarioRodadas.map(r => ({
    ...r,
    jogos: r.jogos.map(j => ({ ...j, ...(placares[j.id] || {}) }))
  }));
}

// ===== SIMULADOR DE CLASSIFICAÇÃO =====
function recalcularClassificacaoComPlacares(jogosAgendados) {
  const tabelaProcessada = dadosClassificacao.map(time => ({ ...time }));

  jogosAgendados.forEach(rodadaObj => {
    (rodadaObj.jogos || []).forEach(jogo => {
      if (
        jogo.golsMandante !== undefined && jogo.golsMandante !== null && jogo.golsMandante !== "" &&
        jogo.golsVisitante !== undefined && jogo.golsVisitante !== null && jogo.golsVisitante !== ""
      ) {
        const gM = parseInt(jogo.golsMandante, 10);
        const gV = parseInt(jogo.golsVisitante, 10);
        if (isNaN(gM) || isNaN(gV)) return;

        const mandante = tabelaProcessada.find(t => t.slug === jogo.mandante);
        const visitante = tabelaProcessada.find(t => t.slug === jogo.visitante);

        if (mandante && visitante) {
          mandante.pj += 1;
          visitante.pj += 1;
          mandante.gm += gM;
          mandante.gc += gV;
          visitante.gm += gV;
          visitante.gc += gM;

          if (gM > gV) {
            mandante.pts += 3; mandante.vit += 1; visitante.der += 1;
          } else if (gM < gV) {
            visitante.pts += 3; visitante.vit += 1; mandante.der += 1;
          } else {
            mandante.pts += 1; visitante.pts += 1; mandante.e += 1; visitante.e += 1;
          }

          mandante.sg = mandante.gm - mandante.gc;
          visitante.sg = visitante.gm - visitante.gc;
        }
      }
    });
  });

  // Critérios de desempate: pontos, vitórias, saldo, gols pró
  tabelaProcessada.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.vit !== a.vit) return b.vit - a.vit;
    if (b.sg !== a.sg) return b.sg - a.sg;
    return b.gm - a.gm;
  });

  // Atualiza posição e zona de cada clube
  tabelaProcessada.forEach((item, idx) => {
    item.pos = idx + 1;
    item.status = statusPorPosicao(item.pos);
  });

  LocalStorage.set("tabela_classificacao", tabelaProcessada);
  renderizarTabelaClassificacao(tabelaProcessada);
}

// ===== EVENTOS E TROCA DE RODADAS =====
function aoMudarRodadaNoCalendario(numeroRodada) {
  atualizarRodadaTabela(numeroRodada);
  if (typeof renderizarJogosDoCalendario === 'function') {
    renderizarJogosDoCalendario(numeroRodada);
  }
}

/* ======================= HAMBURGER MENU ======================= */
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburgerIcon = document.getElementById('hamburgerIcon');

  if (mobileMenu) {
    const isHidden = mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex', !isHidden);

    if (hamburgerIcon) {
      hamburgerIcon.innerHTML = !isHidden
        ? '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>'
        : '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>';
    }
  }
}

function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  if (hamburgerBtn) {
    // Clona o botão para remover listeners antigos
    const newBtn = hamburgerBtn.cloneNode(true);
    hamburgerBtn.parentNode.replaceChild(newBtn, hamburgerBtn);
    newBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMobileMenu();
    });
  }
}

// Listener dinâmico para os campos de placar
document.addEventListener('input', (event) => {
  if (event.target.classList.contains('input-placar')) {
    const jogoId = event.target.dataset.jogoId;
    const inputMandante = document.querySelector(`[data-mandante-id="${jogoId}"]`);
    const inputVisitante = document.querySelector(`[data-visitante-id="${jogoId}"]`);
    if (!inputMandante || !inputVisitante) return;

    const jogosSalvos = carregarJogosSalvos();
    jogosSalvos.forEach(rodadaObj => {
      const jogo = rodadaObj.jogos.find(j => j.id === jogoId);
      if (jogo) {
        jogo.golsMandante = inputMandante.value;
        jogo.golsVisitante = inputVisitante.value;
      }
    });

    LocalStorage.set("jogos_calendario", jogosSalvos);
    recalcularClassificacaoComPlacares(jogosSalvos);
    showToast("Placar e classificação atualizados!", "success");
  }
});

// ===== INICIALIZAÇÃO ÚNICA =====
document.addEventListener('DOMContentLoaded', () => {
  initTailwindConfig();
  initToastContainer();
  initHamburgerMenu();

  // Restaura simulação salva (mesclada com o calendário atual)
  recalcularClassificacaoComPlacares(carregarJogosSalvos());

  renderizarFiltros();
  renderizarLegendaClassificacao();
});