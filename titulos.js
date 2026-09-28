/* ==========================================================================
   1. DADOS DAS CONQUISTAS COM AS IMAGENS DOS TROFÉUS (FLUMINENSE FC)
   ========================================================================== */
const conquistasFluminense = [
  {
    id: "libertadores",
    categoria: "internacional",
    titulo: "COPA LIBERTADORES DA AMÉRICA",
    quantidade: 1,
    anosTexto: "2023",
    imagemTrofeu: "liberta.png",
    corBg: "bg-emerald-800",
    corTexto: "text-emerald-100",
    detalhes: [
      { ano: 2023, destaque: "Conquista inédita contra o Boca Juniors no Maracanã." }
    ]
  },
  {
    id: "recopa",
    categoria: "internacional",
    titulo: "RECOPA SUL-AMERICANA",
    quantidade: 1,
    anosTexto: "2024",
    imagemTrofeu: "recopa.jpg",
    corBg: "bg-teal-700",
    corTexto: "text-teal-100",
    detalhes: [
      { ano: 2024, destaque: "Título sob a LDU no Maracanã." }
    ]
  },
  {
    id: "copa-rio",
    categoria: "internacional",
    titulo: "COPA RIO INTERNACIONAL",
    quantidade: 1,
    anosTexto: "1952",
    imagemTrofeu: "trofeu_copa_rio.jpg",
    corBg: "bg-amber-600",
    corTexto: "text-amber-100",
    detalhes: [
      { ano: 1952, destaque: "Campeão invicto no Maracanã contra o Corinthians." }
    ]
  },
  {
    id: "br",
    categoria: "nacional",
    titulo: "CAMPEONATO BRASILEIRO",
    quantidade: 4,
    anosTexto: "1970, 1984, 2010 e 2012",
    imagemTrofeu: "trofeu_serieA.jpg",
    corBg: "bg-rose-900",
    corTexto: "text-rose-100",
    detalhes: [
      { ano: 1970, destaque: "Taça de Prata com o time de Rivelino e Marco Antônio." },
      { ano: 1984, destaque: "Título nacional com o Casal 20 (Assis e Washington)." },
      { ano: 2010, destaque: "Tetra com Conca e Muricy Ramalho." },
      { ano: 2012, destaque: "Penta antecipado com Fred artilheiro." }
    ]
  },
  {
    id: "cb",
    categoria: "nacional",
    titulo: "COPA DO BRASIL",
    quantidade: 1,
    anosTexto: "2007",
    imagemTrofeu: "trofeu_copadobrasil.jpg",
    corBg: "bg-red-800",
    corTexto: "text-red-100",
    detalhes: [
      { ano: 2007, destaque: "Campeão diante do Figueirense fora de casa." }
    ]
  },
  {
    id: "rj",
    categoria: "estadual",
    titulo: "CAMPEONATO CARIOCA",
    quantidade: 33,
    anosTexto: "1906, 1907, 1908, 1909, 1911, 1917, 1918, 1919, 1924, 1936, 1937, 1938, 1940, 1941, 1946, 1951, 1959, 1964, 1969, 1971, 1973, 1975, 1976, 1980, 1983, 1984, 1985, 1995, 2002, 2005, 2012, 2022 e 2023",
    imagemTrofeu: "trofeu_estadual_rj.png",
    corBg: "bg-red-700",
    corTexto: "text-red-100",
    detalhes: []
  },
  {
    id: "rio-sp",
    categoria: "regional",
    titulo: "TORNEIO RIO-SÃO PAULO",
    quantidade: 2,
    anosTexto: "1957 e 1960",
    imagemTrofeu: "trofeu_riosp.jpg",
    corBg: "bg-amber-700",
    corTexto: "text-amber-100",
    detalhes: []
  }
];

/* ==========================================================================
   2. DADOS DOS ÍDOLOS (HALL DAS LENDAS) COM FOTOS REAIS
   ========================================================================== */
const idolosFluminense = [
  { nome: "Castilho", periodo: "1946–1965", jogos: 698, gols: 0, foto: "castilho.jpg", papel: "Maior Jogador da História do Clube" },
  { nome: "Fred", periodo: "2009–2022", jogos: 382, gols: 199, foto: "fred.jpg", papel: "2º Maior Artilheiro e Ídolo Moderno" },
  { nome: "Rivelino", periodo: "1975–1978", jogos: 158, gols: 53, foto: "rivelino.jpg", papel: "Líder da Máquina Tricolor" },
  { nome: "Waldo", periodo: "1954–1961", jogos: 403, gols: 319, foto: "waldo.png", papel: "Maior Artilheiro da História do Clube" }
];

/* ==========================================================================
   3. RENDERIZAÇÃO DA GALERIA DE TROFÉUS
   ========================================================================== */
function renderizarTrofeus(filtro = "todos") {
  const container = document.getElementById("grid-conquistas");
  if (!container) return;

  const itensFiltrados = filtro === "todos" 
    ? conquistasFluminense 
    : conquistasFluminense.filter(c => c.categoria === filtro);

  container.innerHTML = itensFiltrados.map(item => `
    <div class="relative overflow-hidden rounded-xl ${item.corBg} p-6 shadow-xl text-white transition-all hover:scale-[1.01]">
      
      <!-- Número Total em Destaque no Canto Superior Direito -->
      <div class="absolute top-4 right-6 text-6xl sm:text-7xl font-black tracking-tighter opacity-90 font-display">
        ${item.quantidade}
      </div>

      <!-- Troféu em Foto Real e Título -->
      <div class="flex items-center gap-4 mb-4">
        <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm shrink-0 border border-white/20 p-1 flex items-center justify-center">
          <img src="${item.imagemTrofeu}" alt="${item.titulo}" class="w-full h-full object-contain">
        </div>
        <h3 class="text-xl sm:text-2xl font-black tracking-wider uppercase font-display max-w-[65%]">
          ${item.titulo}
        </h3>
      </div>

      <!-- Anos das Conquistas -->
      <p class="text-xs sm:text-sm font-semibold leading-relaxed tracking-wide ${item.corTexto} max-w-[85%]">
        ${item.anosTexto}
      </p>

    </div>
  `).join('');
}

/* ==========================================================================
   4. RENDERIZAÇÃO DO HALL DOS ÍDOLOS
   ========================================================================== */
function renderizarIdolos() {
  const container = document.getElementById("grid-idolos");
  if (!container) return;

  container.innerHTML = idolosFluminense.map(idolo => `
    <div class="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all">
      <div class="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-emerald-500/50">
        <img src="${idolo.foto}" alt="${idolo.nome}" class="w-full h-full object-cover">
      </div>
      <div>
        <h4 class="text-base font-bold text-white">${idolo.nome}</h4>
        <p class="text-xs text-emerald-400 font-medium">${idolo.papel}</p>
        <p class="text-[11px] text-slate-400 mt-1">${idolo.periodo} • ${idolo.jogos} jogos • ${idolo.gols} gols</p>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   5. INICIALIZAÇÃO E EVENTOS DE FILTRO
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderizarTrofeus();
  renderizarIdolos();

  document.querySelectorAll('.btn-filtro').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-filtro').forEach(b => {
        b.className = "btn-filtro px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-slate-400 border border-slate-800 hover:text-white transition-all shrink-0";
      });

      e.currentTarget.className = "btn-filtro px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-950/60 text-white border border-emerald-600 transition-all shrink-0";
      
      const filtro = e.currentTarget.dataset.filter;
      renderizarTrofeus(filtro);
    });
  });
});