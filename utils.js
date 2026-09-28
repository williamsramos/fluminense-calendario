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

// ===== TAILWIND CONFIG (Centralizado - EC fluminense) =====
function initTailwindConfig() {
  if (!window.tailwindInitialized) {
    if (typeof tailwind !== 'undefined') {
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              navy: { 
                950: '#030B18', 
                900: '#071329', 
                800: '#0E1F3F', 
                700: '#152C56', 
                600: '#1D3B70' 
              },
              azul: { 
                DEFAULT: '#00468C', 
                600: '#003366', 
                400: '#0056F3' 
              },
              vermelho: { 
                DEFAULT: '#E31C22', 
                600: '#B31217', 
                400: '#FF3B3B' 
              },
              branco: {
                DEFAULT: '#FFFFFF',
                100: '#F1F5F9',
                200: '#E2E8F0'
              },
              ouro: { 
                DEFAULT: '#FFD700', 
                600: '#CCAC00',
                400: '#FFE033'
              },
              blaugrana: { 
                DEFAULT: '#00468C', 
                600: '#003366' 
              },
              garnet: { 
                DEFAULT: '#E31C22', 
                600: '#B31217', 
                400: '#FF3B3B' 
              },
              gold: { 
                DEFAULT: '#FFD700', 
                600: '#CCAC00' 
              }
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
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      return false;
    }
  },

  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      return defaultValue;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Erro ao remover dados:', error);
      return false;
    }
  },

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      return false;
    }
  }
};

// 📊 Matriz com os dados atualizados da classificação da Serie A - 2026
const dadosClassificacao = [
  { pos: 1, clube: "Flamengo", slug: "flamengo", pts: 60, pj: 28, vit: 18, e: 6, der: 4, gm: 55, gc: 23, sg: 32, ultimas: ["V", "V", "V", "V", "V"], proximo: "santos", status: "libertadores_fase_grupos" },
  { pos: 2, clube: "Palmeiras", slug: "palmeiras", pts: 57, pj: 28, vit: 16, e: 9, der: 3, gm: 47, gc: 21, sg: 26, ultimas: ["V", "E", "E", "V", "E"], proximo: "bahia", status: "libertadores_fase_grupos" },
  { pos: 3, clube: "Athletico-PR", slug: "athletico-pr", pts: 49, pj: 28, vit: 14, e: 7, der: 7, gm: 43, gc: 32, sg: 11, ultimas: ["V", "E", "D", "E", "V"], proximo: "atletico-mg", status: "libertadores_fase_grupos" },
  { pos: 4, clube: "Fluminense", slug: "fluminense", pts: 48, pj: 28, vit: 13, e: 9, der: 6, gm: 44, gc: 36, sg: 8, ultimas: ["V", "E", "V", "D", "V"], proximo: "coritiba", status: "libertadores_fase_grupos" },
  { pos: 5, clube: "Bahia", slug: "bahia", pts: 46, pj: 28, vit: 12, e: 10, der: 6, gm: 43, gc: 35, sg: 8, ultimas: ["V", "V", "V", "V", "D"], proximo: "palmeiras", status: "libertadores_qualificatorias" },
  { pos: 6, clube: "Cruzeiro", slug: "cruzeiro", pts: 45, pj: 28, vit: 13, e: 6, der: 9, gm: 42, gc: 40, sg: 2, ultimas: ["V", "D", "V", "D", "V"], proximo: "sao-paulo", status: "sudamericana_fase_grupos" },
  { pos: 7, clube: "Atlético-MG", slug: "atletico-mg", pts: 40, pj: 27, vit: 11, e: 7, der: 9, gm: 36, gc: 32, sg: 4, ultimas: ["E", "V", "D", "V", "E"], proximo: "athletico-pr", status: "sudamericana_fase_grupos" },
  { pos: 8, clube: "Santos", slug: "santos", pts: 38, pj: 27, vit: 10, e: 8, der: 9, gm: 41, gc: 40, sg: 1, ultimas: ["E", "V", "V", "V", "V"], proximo: "flamengo", status: "sudamericana_fase_grupos" },
  { pos: 9, clube: "Coritiba", slug: "coritiba", pts: 38, pj: 28, vit: 10, e: 8, der: 10, gm: 37, gc: 43, sg: -6, ultimas: ["V", "V", "D", "E", "D"], proximo: "fluminense", status: "sudamericana_fase_grupos" },
  { pos: 10, clube: "Bragantino", slug: "bragantino", pts: 36, pj: 27, vit: 10, e: 6, der: 11, gm: 33, gc: 31, sg: 2, ultimas: ["V", "D", "D", "E", "D"], proximo: "mirassol", status: "sudamericana_fase_grupos" },
  { pos: 11, clube: "São Paulo", slug: "sao-paulo", pts: 36, pj: 27, vit: 10, e: 6, der: 11, gm: 32, gc: 30, sg: 2, ultimas: ["D", "V", "V", "D", "V"], proximo: "cruzeiro", status: "sudamericana_fase_grupos" },
  { pos: 12, clube: "Botafogo", slug: "botafogo", pts: 35, pj: 28, vit: 9, e: 8, der: 11, gm: 41, gc: 45, sg: -4, ultimas: ["D", "E", "E", "V", "D"], proximo: "vasco", status: null },
  { pos: 13, clube: "Vitória", slug: "vitoria", pts: 33, pj: 28, vit: 9, e: 6, der: 13, gm: 28, gc: 42, sg: -14, ultimas: ["D", "D", "V", "E", "D"], proximo: "chapecoense", status: null },
  { pos: 14, clube: "Corinthians", slug: "corinthians", pts: 32, pj: 28, vit: 8, e: 8, der: 12, gm: 29, gc: 32, sg: -3, ultimas: ["D", "D", "D", "D", "D"], proximo: "internacional", status: null },
  { pos: 15, clube: "Mirassol", slug: "mirassol", pts: 32, pj: 28, vit: 8, e: 8, der: 12, gm: 33, gc: 42, sg: -9, ultimas: ["E", "D", "V", "E", "V"], proximo: "bragantino", status: null },
  { pos: 16, clube: "Vasco da Gama", slug: "vasco", pts: 31, pj: 27, vit: 8, e: 7, der: 12, gm: 34, gc: 41, sg: -7, ultimas: ["D", "V", "D", "V", "V"], proximo: "botafogo", status: null },
  { pos: 17, clube: "Grêmio", slug: "gremio", pts: 29, pj: 28, vit: 7, e: 8, der: 13, gm: 30, gc: 38, sg: -8, ultimas: ["V", "D", "D", "D", "E"], proximo: "remo", status: "rebaixamento" },
  { pos: 18, clube: "Internacional", slug: "internacional", pts: 28, pj: 28, vit: 6, e: 10, der: 12, gm: 30, gc: 36, sg: -6, ultimas: ["E", "D", "D", "V", "D"], proximo: "corinthians", status: "rebaixamento" },
  { pos: 19, clube: "Remo", slug: "remo", pts: 23, pj: 28, vit: 5, e: 8, der: 15, gm: 32, gc: 47, sg: -15, ultimas: ["D", "D", "D", "D", "D"], proximo: "gremio", status: "rebaixamento" },
  { pos: 20, clube: "Chapecoense", slug: "chapecoense", pts: 18, pj: 27, vit: 3, e: 9, der: 15, gm: 29, gc: 53, sg: -24, ultimas: ["V", "D", "V", "D", "E"], proximo: "vitoria", status: "rebaixamento" }
];

// Rodada 30
// const dadosClassificacao = [
//   { pos: 1, clube: "Palmeiras", slug: "palmeiras", pts: 52, pj: 25, vit: 15, e: 7, der: 3, gm: 46, gc: 23, sg: 23, ultimas: ["D", "V", "D", "V", "E"], proximo: "corinthians" },
//   { pos: 2, clube: "Flamengo", slug: "flamengo", pts: 51, pj: 25, vit: 15, e: 6, der: 4, gm: 50, gc: 21, sg: 29, ultimas: ["V", "D", "V", "V", "V"], proximo: "fluminense" },
//   { pos: 3, clube: "Athletico-PR", slug: "athletico-pr", pts: 45, pj: 25, vit: 13, e: 6, der: 6, gm: 37, gc: 25, sg: 12, ultimas: ["V", "E", "V", "V", "E"], proximo: "chapecoense" },
//   { pos: 4, clube: "Fluminense", slug: "fluminense", pts: 45, pj: 26, vit: 12, e: 9, der: 5, gm: 39, gc: 31, sg: 8, ultimas: ["E", "V", "V", "E", "V"], proximo: "flamengo" },
//   { pos: 5, clube: "Bahia", slug: "bahia", pts: 43, pj: 26, vit: 11, e: 10, der: 5, gm: 40, gc: 32, sg: 8, ultimas: ["E", "E", "V", "V", "V"], proximo: "mirassol" },
//   { pos: 6, clube: "Cruzeiro", slug: "cruzeiro", pts: 39, pj: 25, vit: 11, e: 6, der: 8, gm: 35, gc: 35, sg: 0, ultimas: ["V", "V", "V", "V", "D"], proximo: "bragantino" },
//   { pos: 7, clube: "Coritiba", slug: "coritiba", pts: 37, pj: 25, vit: 10, e: 6, der: 9, gm: 33, gc: 33, sg: 0, ultimas: ["D", "V", "E", "V", "V"], proximo: "botafogo" },
//   { pos: 8, clube: "Atlético-MG", slug: "atletico-mg", pts: 36, pj: 25, vit: 10, e: 6, der: 9, gm: 32, gc: 31, sg: 1, ultimas: ["E", "V", "E", "V", "D"], proximo: "santos" },
//   { pos: 9, clube: "Bragantino", slug: "bragantino", pts: 35, pj: 25, vit: 10, e: 5, der: 10, gm: 31, gc: 28, sg: 3, ultimas: ["D", "E", "V", "D", "D"], proximo: "cruzeiro" },
//   { pos: 10, clube: "São Paulo", slug: "sao-paulo", pts: 33, pj: 25, vit: 9, e: 6, der: 10, gm: 31, gc: 28, sg: 3, ultimas: ["D", "E", "D", "V", "V"], proximo: "vitoria" },
//   { pos: 11, clube: "Corinthians", slug: "corinthians", pts: 32, pj: 25, vit: 8, e: 8, der: 9, gm: 26, gc: 25, sg: 1, ultimas: ["E", "V", "D", "D", "D"], proximo: "palmeiras" },
//   { pos: 12, clube: "Botafogo", slug: "botafogo", pts: 30, pj: 24, vit: 8, e: 6, der: 10, gm: 37, gc: 40, sg: -3, ultimas: ["V", "E", "D", "D", "D"], proximo: "coritiba" },
//   { pos: 13, clube: "Vitória", slug: "vitoria", pts: 29, pj: 25, vit: 8, e: 5, der: 12, gm: 24, gc: 37, sg: -13, ultimas: ["D", "D", "V", "D", "D"], proximo: "sao-paulo" },
//   { pos: 14, clube: "Santos", slug: "santos", pts: 29, pj: 24, vit: 7, e: 8, der: 9, gm: 36, gc: 32, sg: 4, ultimas: ["E", "D", "V", "E", "V"], proximo: "atletico-mg" },
//   { pos: 15, clube: "Grêmio", slug: "gremio", pts: 25, pj: 23, vit: 6, e: 7, der: 10, gm: 23, gc: 30, sg: -7, ultimas: ["D", "E", "V", "D", "D"], proximo: "internacional" },
//   { pos: 16, clube: "Mirassol", slug: "mirassol", pts: 25, pj: 25, vit: 6, e: 7, der: 11, gm: 27, gc: 39, sg: -12, ultimas: ["D", "D", "E", "E", "D"], proximo: "bahia" },
//   { pos: 17, clube: "Vasco da Gama", slug: "vasco", pts: 25, pj: 25, vit: 6, e: 7, der: 12, gm: 27, gc: 40, sg: -13, ultimas: ["E", "D", "D", "V", "D"], proximo: "remo" },
//   { pos: 18, clube: "Internacional", slug: "internacional", pts: 25, pj: 25, vit: 5, e: 10, der: 10, gm: 26, gc: 31, sg: -5, ultimas: ["E", "E", "E", "E", "D"], proximo: "gremio" },
//   { pos: 19, clube: "Remo", slug: "remo", pts: 23, pj: 25, vit: 5, e: 8, der: 12, gm: 30, gc: 42, sg: -12, ultimas: ["E", "E", "D", "D", "D"], proximo: "vasco" },
//   { pos: 20, clube: "Chapecoense", slug: "chapecoense", pts: 14, pj: 23, vit: 2, e: 8, der: 13, gm: 24, gc: 46, sg: -22, ultimas: ["D", "E", "D", "E", "V"], proximo: "athletico-pr" }
// ];


// 📊 Mapeamento dos escudos dos times
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
  const name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const logo = teamLogos[slug] || 'img/default.png';

  return { name, logo };
}

function renderizarTabelaClassificacao(dados = dadosClassificacao) {
  const tbody = document.getElementById("tabela-corpo");
  if (!tbody) return;

  tbody.innerHTML = "";

  dados.forEach((item) => {
    const isfluminense = item.slug === "fluminense";
    const teamData = getTeam(item.slug);
    const proximoData = getTeam(item.proximo || "");

    let posBadgeClass = "font-mono px-2 py-0.5 rounded text-xs font-bold ";
    let trClasses = "hover:bg-navy-800/50 transition-colors ";
    
    if (item.pos >= 1 && item.pos <= 4) {
      posBadgeClass += "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
    } else if (item.pos === 5) {
      posBadgeClass += "bg-amber-500/20 text-amber-400 border border-amber-500/30";
    } else if (item.pos >= 6 && item.pos <= 11) {
      posBadgeClass += "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30";
    } else if (item.pos >= 17 && item.pos <= 20) {
      posBadgeClass += "bg-rose-500/20 text-rose-400 border border-rose-500/30";
      trClasses += "bg-rose-950/20 ";
    } else {
      posBadgeClass += "text-slate-400 bg-navy-800/40";
    }

    if (isfluminense) {
      trClasses = "bg-gradient-to-r from-azul-600/40 via-navy-800 to-vermelho-600/30 font-bold text-white border-l-4 border-gold shadow-lg shadow-blue-900/40 scale-[1.01] transition-transform";
      posBadgeClass = "bg-gold text-navy-950 font-black px-2 py-0.5 rounded text-xs border border-gold shadow";
    }

    const ultimosHTML = (item.ultimas || []).map(resultado => {
      if (resultado === 'V') {
        return `<span class="w-5 h-5 inline-flex items-center justify-center bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full text-[10px] font-extrabold">V</span>`;
      } else if (resultado === 'E') {
        return `<span class="w-5 h-5 inline-flex items-center justify-center bg-slate-500/20 text-slate-300 border border-slate-500/40 rounded-full text-[10px] font-extrabold">E</span>`;
      } else {
        return `<span class="w-5 h-5 inline-flex items-center justify-center bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-full text-[10px] font-extrabold">D</span>`;
      }
    }).join(' ');

    let sgClass = "font-mono ";
    if (item.sg > 0) sgClass += isfluminense ? "text-emerald-300 font-bold" : "text-emerald-400 font-medium";
    else if (item.sg < 0) sgClass += "text-rose-400 font-medium";
    else sgClass += "text-slate-400";

    const tr = document.createElement("tr");
    tr.className = trClasses.trim();

    tr.innerHTML = `
      <td class="py-3 px-4"><span class="${posBadgeClass}">${item.pos}º</span></td>
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
}

function renderizarLegendaClassificacao() {
  const containerTabela = document.getElementById("tabela-corpo")?.closest('.overflow-x-auto') || document.getElementById("tabela-corpo")?.parentElement;
  
  if (!containerTabela || document.getElementById("legenda-classificacao")) return;

  const legendaHTML = `
    <div id="legenda-classificacao" class="mt-6 p-4 bg-navy-900 border border-navy-800 rounded-xl flex flex-wrap gap-4 text-xs font-medium justify-between items-center text-slate-300">
      <div class="flex items-center gap-2">
        <span class="w-3.5 h-3.5 rounded bg-emerald-500/30 border border-emerald-500/60 inline-block"></span>
        <span>1º ao 4º: Libertadores</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3.5 h-3.5 rounded bg-amber-500/30 border border-amber-500/60 inline-block"></span>
        <span>5º: Pré-Libertadores</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3.5 h-3.5 rounded bg-cyan-500/30 border border-cyan-500/60 inline-block"></span>
        <span>6º ao 11º: Sul-Americana</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3.5 h-3.5 rounded bg-rose-500/30 border border-rose-500/60 inline-block"></span>
        <span>17º ao 20º: Rebaixamento</span>
      </div>
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
  }
};

function atualizarRodadaTabela(numeroRodada) {
  const mapaConfrontos = proximosJogosPorRodada[numeroRodada];
  if (!mapaConfrontos) return;

  dadosClassificacao.forEach(item => {
    if (mapaConfrontos[item.slug]) {
      item.proximo = mapaConfrontos[item.slug];
    }
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
  }
];

// ===== SIMULADOR DE CLASSIFICAÇÃO =====
function recalcularClassificacaoComPlacares(jogosAgendados) {
  // Clona a estrutura base para acumular os pontos simulados
  const tabelaProcessada = dadosClassificacao.map(time => ({ ...time }));

  // Processa todos os jogos gravados com placar
  jogosAgendados.forEach(rodadaObj => {
    (rodadaObj.jogos || []).forEach(jogo => {
      if (
        jogo.golsMandante !== undefined && jogo.golsMandante !== null && jogo.golsMandante !== "" &&
        jogo.golsVisitante !== undefined && jogo.golsVisitante !== null && jogo.golsVisitante !== ""
      ) {
        const gM = parseInt(jogo.golsMandante, 10);
        const gV = parseInt(jogo.golsVisitante, 10);

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
            mandante.pts += 3;
            mandante.vit += 1;
            visitante.der += 1;
          } else if (gM < gV) {
            visitante.pts += 3;
            visitante.vit += 1;
            mandante.der += 1;
          } else {
            mandante.pts += 1;
            visitante.pts += 1;
            mandante.e += 1;
            visitante.e += 1;
          }

          mandante.sg = mandante.gm - mandante.gc;
          visitante.sg = visitante.gm - visitante.gc;
        }
      }
    });
  });

  // Reordena a tabela seguindo os critérios de desempate do Brasileirão
  tabelaProcessada.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts; // 1º Pontos
    if (b.vit !== a.vit) return b.vit - a.vit; // 2º Vitórias
    if (b.sg !== a.sg) return b.sg - a.sg;     // 3º Saldo de Gols
    return b.gm - a.gm;                        // 4º Gols Pró
  });

  // Atualiza as posições da tabela
  tabelaProcessada.forEach((item, idx) => item.pos = idx + 1);

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
      if (!isHidden) {
        hamburgerIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>';
      } else {
        hamburgerIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>';
      }
    }
  }
}

function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  
  if (hamburgerBtn) {
    // Remove listeners antigos criando um clone limpo do botão
    const newBtn = hamburgerBtn.cloneNode(true);
    hamburgerBtn.parentNode.replaceChild(newBtn, hamburgerBtn);

    newBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMobileMenu();
    });
  }
}

// Inicialização automática do menu ao carregar a página
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHamburgerMenu);
} else {
  initHamburgerMenu();
}


// Listener dinâmico para os campos de input de placar
document.addEventListener('input', (event) => {
  if (event.target.classList.contains('input-placar')) {
    const jogoId = event.target.dataset.jogoId;
    const inputMandante = document.querySelector(`[data-mandante-id="${jogoId}"]`);
    const inputVisitante = document.querySelector(`[data-visitante-id="${jogoId}"]`);

    if (!inputMandante || !inputVisitante) return;

    const jogosSalvos = LocalStorage.get("jogos_calendario", calendarioRodadas);

    // Localiza e atualiza o jogo na estrutura de rodadas
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
  
  // Restaura simulação salva ou exibe dados padrão
  const jogosSalvos = LocalStorage.get("jogos_calendario", calendarioRodadas);
  recalcularClassificacaoComPlacares(jogosSalvos);
  
  renderizarLegendaClassificacao();
  initHamburgerMenu();
});
