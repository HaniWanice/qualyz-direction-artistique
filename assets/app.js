/* Moodboard Qualyz : every block is generated here, then gets a 1-10 rating saved in localStorage. */
const KEY = 'qualyz-da-fondateurs-v1';
const MAIL_TO = 'haniwanice@gmail.com';
let S = {r:{}, c:{}, f:{}};
try { const raw = JSON.parse(localStorage.getItem(KEY)); if (raw && raw.r) S = Object.assign(S, raw); } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} paint(); };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const $ = s => document.querySelector(s);
const LABELS = {};
const rateSlot = (id, label) => { LABELS[id] = label; return `<div class="rate" data-id="${id}"></div>`; };
const GLOGO = '<svg class="gdot" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.6 12.3c0-.8-.1-1.5-.2-2.3H12v4.3h6a5.1 5.1 0 0 1-2.2 3.4v2.8h3.6c2.1-2 3.2-4.8 3.2-8.2z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.4-2.7l-3.6-2.8c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.6H2v2.9A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.7 14c-.2-.7-.4-1.3-.4-2s.2-1.4.4-2V7.1H2a11 11 0 0 0 0 9.8L5.7 14z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2 7.1L5.7 10c.9-2.6 3.4-4.6 6.3-4.6z"/></svg>';
const ARROW_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

/* ---------- palettes ---------- */
const PALS = [
  {k:1, n:'Crème et vert profond', d:'Calme et haut de gamme, le fond gris-crème que vous aimez.', sw:['#EEECE5','#0D4645','#239F9D','#D7EEEA','#F3E6CE']},
  {k:2, n:'Gris perle et pétrole', d:'Plus froid et plus net, très « cabinet de conseil ».', sw:['#ECEFEF','#0F3B44','#239F9D','#D9ECEC','#FFFFFF']},
  {k:3, n:'Blanc et bleu marine', d:'Le bleu de la confiance, comme les banques et les assurances.', sw:['#F7F9FB','#13284A','#239F9D','#DDF1EF','#E7ECF3']},
  {k:4, n:'Ivoire et or', d:'Le plus luxueux : ivoire, presque noir et une touche dorée.', sw:['#F5F1E8','#1C2B2A','#239F9D','#EBDDB8','#8A5A12']},
  {k:5, n:'Sable et terre cuite', d:'Chaleureux et humain, une touche orangée en plus du turquoise.', sw:['#F2ECE2','#0D4645','#239F9D','#EFCFB8','#A14824']},
  {k:6, n:'Turquoise affirmé', d:'Votre turquoise en couleur principale, frais et reconnaissable.', sw:['#E8F4F2','#14706E','#239F9D','#C8EAE5','#0B4C4A']},
  {k:7, n:'Nuit et menthe', d:'Un site sombre, très moderne. Plus risqué pour un public âgé.', sw:['#0E2423','#15312F','#8FD9D4','#3FC1BC','#F2F7F5']},
  {k:8, n:'Sauge et vert profond', d:'Des verts doux et naturels, apaisants.', sw:['#ECEEE7','#2F4A3A','#239F9D','#DCE6D9','#E8E1CE']}
];

/* ---------- shared mini-site content ---------- */
const FORMS = [['f-ssct','Formation SSCT','Santé, sécurité et conditions de travail'], ['f-eco','Formation économique','Comprendre les comptes de l’entreprise'], ['f-harc','Référent harcèlement','Prévenir, écouter, agir'], ['f-ia','Formation IA du CSE','Utiliser l’IA dans votre mandat']];
/* focal point of each photo, so faces stay in frame whatever the crop */
const FOCUS = {'f-formation':'50% 40%', 'f-elus':'38% 35%', 'f-ssct':'50% 25%', 'f-eco':'55% 40%', 'f-harc':'60% 30%', 'f-ia':'38% 40%', 'f-visio':'40% 35%'};
const img = (f, alt = '') => `<img src="assets/${f}.jpg" alt="${alt}" loading="lazy" style="object-position:${FOCUS[f] || 'center'}">`;
const NAV = `<div class="s-nav"><span class="logo" role="img" aria-label="Qualyz"></span><span class="s-links"><span>Formations</span><span>Financement</span><span>À propos</span></span><span class="s-cta">Demander un devis</span></div>`;
const H1 = `<h4 class="s-h1">Formez vos élus CSE avec un organisme <em>certifié</em>.</h4>`;
const SUB = `<p class="s-sub">SSCT, économique, référent harcèlement : en présentiel partout en France ou à distance, aux dates qui vous arrangent.</p>`;
const BTNS = `<div class="s-btns"><span class="s-btn">Demander un devis</span><span class="s-btn alt">Être rappelé</span></div>`;
const PROOF = `<div class="s-proof"><img src="assets/qualiopi.png" alt="Certifié Qualiopi"><span><b>600+</b>élus de CSE formés en 2026</span><span class="s-g">${GLOGO} Lire nos avis Google</span></div>`;
const TEXT = `<div class="s-text">${H1}${SUB}${BTNS}${PROOF}</div>`;
const TILES = (n = 3) => `<div class="s-tiles">${FORMS.slice(0, n).map(f => `<div class="s-tile">${img(f[0])}<div><b>${f[1]}</b><span>Voir la formation</span></div></div>`).join('')}</div>`;
const LAYOUT = {
  edito: () => `<div class="s-in">${NAV}<div class="s-grid">${TEXT}<div class="s-photo">${img('f-formation', 'Élus en formation autour d’une table')}</div></div>${TILES()}</div>`,
  band: () => `<div class="s-hero">${NAV}<div class="s-grid">${TEXT}<div class="s-photo">${img('f-elus', 'Une élue en formation, souriante')}</div></div></div><div class="s-in">${TILES()}</div>`,
  full: () => `<div class="s-cover">${img('f-visio', 'Formation à distance en visio')}${NAV}${TEXT}</div>${TILES()}`,
  soft: () => `<div class="s-in"><div class="s-panel"><span class="colibri" aria-hidden="true"></span>${NAV}<div class="s-grid">${TEXT}<div class="s-duo">${img('f-elus')}${img('f-ia')}</div></div></div>${TILES()}</div>`,
  center: () => `<div class="s-in">${NAV}${TEXT}<div class="s-cards">${FORMS.slice(0, 3).map(f => `<div class="s-card">${img(f[0])}<b>${f[1]}</b></div>`).join('')}</div></div>`,
  bento: () => `<div class="s-in">${NAV}<div class="s-bento">
      <div class="b b-main">${H1}${SUB}${BTNS}</div>
      <div class="b b-photo">${img('f-formation', 'Élus en formation autour d’une table')}</div>
      <div class="b b-num"><b>600+</b><span>élus de CSE formés en 2026</span></div>
      <div class="b b-proof"><img src="assets/qualiopi.png" alt="Certifié Qualiopi"><span class="s-g">${GLOGO} Nos avis Google</span></div>
      ${FORMS.slice(0, 3).map(f => `<div class="b b-tile">${img(f[0])}<div><b>${f[1]}</b><span>Voir la formation</span></div></div>`).join('')}
      <div class="b b-all"><b>Toutes nos formations</b><span>Voir le catalogue</span></div></div></div>`,
  split: () => `<div class="s-split"><div class="s-pane">${NAV}${TEXT}</div><div class="s-side">${img('f-elus', 'Une élue en formation, souriante')}</div></div>
      <div class="s-rows">${FORMS.map(f => `<div class="s-row">${img(f[0])}<div><b>${f[1]}</b><p>${f[2]}</p></div><span>Voir</span></div>`).join('')}</div>`,
  show: () => `<div class="s-in">${NAV}<div class="s-grid">${TEXT}<div class="s-photo">${img('f-elus', 'Une élue en formation, souriante')}</div></div></div>
      <div class="s-hero s-strip"><b>600+</b><p>élus de CSE formés en 2026, partout en France et à distance.</p><span class="s-btn">Demander un devis</span></div>
      <div class="s-in">${TILES(4)}<div class="s-callout"><b>On vous rappelle sous 15 minutes.</b><span class="s-btn alt">Être rappelé</span></div></div>`,
  mag: () => `<div class="s-in">${NAV}${H1}<div class="s-line">${SUB}<div>${BTNS}${PROOF}</div></div><div class="s-mcards">${FORMS.slice(0, 3).map(f => `<div class="s-mcard">${img(f[0])}<b>${f[1]}</b><span>${f[2]}</span></div>`).join('')}</div></div>`
};
const DIRS = [
  {id:'da-edito', lay:'edito', pal:1, t:'Éditorial classique', d:'Titre en serif, une photo de formation à côté, les trois formations dessous. Sobre et rassurant.'},
  {id:'da-band', lay:'band', pal:2, t:'Bandeau de couleur', d:'Tout le haut de page dans la couleur de la marque. On reconnaît Qualyz au premier coup d’œil.'},
  {id:'da-full', lay:'full', pal:3, t:'Grande photo plein cadre', d:'Une photo de formation sur toute la largeur, le texte posé dessus. L’allure d’une grande maison.'},
  {id:'da-soft', lay:'soft', pal:6, t:'Doux et arrondi', d:'Formes très arrondies, photos rondes, colibri en filigrane. Accueillant et souple.'},
  {id:'da-center', lay:'center', pal:4, t:'Centré et épuré', d:'Un titre centré, beaucoup d’air, puis trois grandes photos. Le plus « premium ».'},
  {id:'da-bento', lay:'bento', pal:7, t:'Mosaïque moderne', d:'Toutes les infos en cases : titre, photo, chiffre, preuves, formations. Très actuel.'},
  {id:'da-split', lay:'split', pal:5, t:'Moitié texte, moitié photo', d:'L’écran coupé en deux, puis les formations en liste, avec une petite photo chacune.'},
  {id:'da-mag', lay:'mag', pal:8, t:'Magazine', d:'Un très grand titre comme une couverture de magazine, puis trois grandes photos verticales.'}
];
let palPick = 0;
const palOf = d => palPick || d.pal;
$('#dirs').innerHTML = DIRS.map(d => `
  <article class="dir">
    <div class="dir__top"><h3>${d.t}</h3><p>${d.d}</p></div>
    <div class="scr"><div class="scr__bar"><i></i><i></i><i></i><span>qualyz.fr</span><em data-palname="${d.id}"></em></div><div class="site l-${d.lay}" data-theme="p${d.pal}" data-dir="${d.id}">${LAYOUT[d.lay]()}</div></div>
    ${rateSlot(d.id, 'Accueil : ' + d.t)}
  </article>`).join('');
const applyPal = () => {
  DIRS.forEach(d => { const el = document.querySelector(`[data-dir="${d.id}"]`); el.dataset.theme = 'p' + palOf(d);
    document.querySelector(`[data-palname="${d.id}"]`).textContent = 'Palette : ' + PALS[palOf(d) - 1].n; });
  document.querySelectorAll('.pchip').forEach(b => b.setAttribute('aria-pressed', +b.dataset.pal === palPick));
};
$('#palbar').innerHTML = `<span>Couleurs des maquettes</span><button class="pchip" data-pal="0" aria-pressed="true">D’origine</button>` +
  PALS.map(p => `<button class="pchip" data-pal="${p.k}" aria-pressed="false"><i aria-hidden="true">${p.sw.slice(0, 3).map(c => `<b style="background:${c}"></b>`).join('')}</i>${p.n}</button>`).join('');
$('#palbar').addEventListener('click', e => { const b = e.target.closest('[data-pal]'); if (!b) return; palPick = +b.dataset.pal; applyPal(); });
applyPal();

$('#pals').innerHTML = PALS.map(p => `
  <article class="pal">
    <div class="pal__head"><div><h3>${p.n}</h3><p>${p.d}</p></div><div class="pal__sw" aria-hidden="true">${p.sw.map(c => `<span><i style="background:${c}"></i>${c}</span>`).join('')}</div></div>
    <div class="scr"><div class="scr__bar"><i></i><i></i><i></i><span>qualyz.fr</span></div><div class="site l-show" data-theme="p${p.k}">${LAYOUT.show()}</div></div>
    <button class="pal__use" data-use="${p.k}">Appliquer aux 8 pages d’accueil</button>
    ${rateSlot('cp-' + p.k, 'Couleurs : ' + p.n)}
  </article>`).join('');
$('#pals').addEventListener('click', e => { const b = e.target.closest('[data-use]'); if (!b) return; palPick = +b.dataset.use; applyPal(); $('#styles').scrollIntoView(); });

/* ---------- tone ---------- */
const TONS = [
  {tag:'Produit direct', h:'Formations CSE obligatoires : SSCT, économique, référent harcèlement.', p:'Organisme certifié Qualiopi. Partout en France et à distance.', b:'Voir les formations'},
  {tag:'Produit direct', h:'La bonne formation pour chaque élu de votre CSE.', p:'Dites-nous qui doit être formé, on s’occupe du reste : programme, dates, documents.', b:'Demander un devis'},
  {tag:'Produit direct', h:'Nouvel élu au CSE ? Commencez par la bonne formation.', p:'En deux minutes, on vous dit lesquelles sont obligatoires pour vous et qui les paie.', b:'Trouver ma formation'},
  {tag:'Ressenti', warm:1, h:'Un CSE bien formé pèse dans l’entreprise.', p:'Vos élus connaissent leurs droits et savent s’en servir.', b:'Parler à un formateur'},
  {tag:'Ressenti', warm:1, h:'Votre mandat, maîtrisé de bout en bout.', p:'On forme vos élus, et on reste là après la formation pour répondre à leurs questions.', b:'Trouver ma formation'},
  {tag:'Ressenti', warm:1, h:'Être élu, ça s’apprend. On est là pour ça.', p:'Des formations concrètes, avec des cas réels, pour être à l’aise dès la première réunion.', b:'Découvrir les formations'},
  {tag:'Expert', h:'Le droit du CSE, expliqué par des gens de terrain.', p:'Des formateurs qui ont vu des centaines de situations, et qui parlent simplement.', b:'Rencontrer nos formateurs'},
  {tag:'Expert', h:'La formation CSE, faite sérieusement.', p:'Programme conforme, formateurs experts, documents Qualiopi fournis.', b:'Demander un devis'},
  {tag:'Souplesse', h:'Partout en France, en salle ou à distance, aux dates qui vous arrangent.', p:'Chez vous, dans nos salles ou en visio : vous choisissez, on s’adapte.', b:'Voir les dates'},
  {tag:'Souplesse', h:'Un devis en quelques clics, une réponse sous 15 minutes.', p:'Pas de formulaire interminable : la formation, vos dates, vos coordonnées. C’est tout.', b:'Demander un devis'}
];
$('#tons').innerHTML = TONS.map((x, i) => `
  <article class="ton"><span class="ton__tag${x.warm ? ' warm' : ''}">${x.tag}</span><h3>${x.h}</h3><p>${x.p}</p><span class="ton__btn">${x.b}</span>
  ${rateSlot('ton-' + (i + 1), 'Texte : « ' + x.h + ' »')}</article>`).join('');

/* ---------- icons (Iconify data stored locally in icons.js) ---------- */
const TOPICS = ['SSCT', 'Harcèlement', 'Économique', 'Trésorier', 'IA du CSE', 'Financement', 'Formateur', 'Calendrier', 'Téléphone', 'Certificat'];
$('#icfams').innerHTML = (window.ICON_LIBS || []).map(f => `
  <article class="icfam"><h3>${f.n}</h3><p>${f.d}</p>
    <div class="libgrid">${f.i.map((x, j) => x ? `<figure><span class="ico"><svg viewBox="0 0 ${x[1]} ${x[2]}" aria-hidden="true">${x[0]}</svg></span><figcaption>${TOPICS[j]}</figcaption></figure>` : '').join('')}</div>
    ${rateSlot('ic-' + f.k, 'Icônes : ' + f.n)}</article>`).join('');
$('#icons').addEventListener('click', e => {
  const b = e.target.closest('.icbar [data-c], .icbar [data-s]'); if (!b) return;
  const attr = b.dataset.c ? 'c' : 's';
  $('#icons').dataset[attr] = b.dataset[attr];
  b.parentElement.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', c === b));
  document.querySelectorAll('.icfam').forEach(f => f.classList.toggle('dark', $('#icons').dataset.c === 'dark'));
});

/* ---------- client logos (cut from the current qualyz.fr strip) ---------- */
const CLIENTS = [['onet','Onet',183,87],['leclerc','E.Leclerc',154,169],['fnac','Fnac',148,153],['carrefour','Carrefour',154,126],['intersport','Intersport',392,80],['defimat','Défi Mat',148,120],['hutchinson','Hutchinson',443,52],['stabilo','Stabilo',334,84],['uniqlo','Uniqlo',153,155],['connect','Connect',260,69]];
const GURL = 'https://www.google.com/search?q=Qualyz+formation+CSE+avis';
/* wide logos get less height and square ones less width, so every logo reads the same size */
const cl = (c, base) => { const h = Math.round(base * Math.pow(c[2] / c[3], -0.35)); return `<button class="cl" data-cl="${c[0]}" style="--h:${h}px; --b:${Math.round(base * .9)}px" aria-label="${c[1]}, voir l’avis"><img src="assets/clients/${c[0]}.png" alt="${c[1]}" width="${c[2]}" height="${c[3]}"></button>`; };
const PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5l12 7-12 7z"/></svg>', PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
const segNB = `<div class="seg" role="group" aria-label="Couleur des logos"><button data-nb="0" aria-pressed="true">Couleur</button><button data-nb="1" aria-pressed="false">Noir et blanc</button></div>`;
const marq = (cls = '', base = 64) => `<div class="marq ${cls}"><div class="marq__t">${CLIENTS.map(c => cl(c, base)).join('')}<span class="dup" style="display:contents">${CLIENTS.map(c => cl(c, base)).join('')}</span></div></div>`;
const PAUSEBTN = `<button class="tiny" data-marq>${PAUSE}Pause</button>`;
const LOGOS = [
  {id:'lg-couleur', pair:1, t:'En couleur', d:'Les vraies couleurs de chaque marque. Ça attire l’œil.', html:() => `<div class="clgrid">${CLIENTS.map(c => `<div>${cl(c, 62)}</div>`).join('')}</div>`},
  {id:'lg-nb', pair:1, nb:1, t:'En noir et blanc', d:'Plus calme et plus « grande maison ». La couleur revient au survol.', html:() => `<div class="clgrid">${CLIENTS.map(c => `<div>${cl(c, 62)}</div>`).join('')}</div>`},
  {id:'lg-bandeau', t:'Bandeau qui défile', d:'Les logos passent lentement, en continu. Tout s’arrête au survol et avec le bouton pause.',
   html:() => `${marq()}<div class="lgrow">${segNB}${PAUSEBTN}<button class="tiny" data-raw aria-pressed="false">Voir sans égaliser les tailles</button></div>`},
  {id:'lg-double', t:'Deux bandeaux en sens inverse', d:'Deux lignes qui glissent l’une contre l’autre. Plus dynamique, pour remplir une grande bande.',
   html:() => `${marq('', 58)}${marq('marq--rev', 58)}<div class="lgrow">${segNB}${PAUSEBTN}</div>`},
  {id:'lg-cartes', t:'Cartes logo et avis', d:'Chaque client avec un extrait de son avis. La carte renvoie vers votre fiche Google.',
   html:() => `<div class="lgcards">${CLIENTS.slice(0, 3).map(c => `<div class="lgcard">${cl(c, 56)}<q>L’avis de ce client viendra ici : la formation suivie et quelques mots.</q><small>${GLOGO}Lire l’avis sur Google</small></div>`).join('')}</div><div class="lgrow">${segNB}</div>`},
  {id:'lg-vitrine', t:'Vitrine, un client à la fois', d:'Un très grand logo et son avis, qui changent toutes les six secondes. Les flèches permettent de choisir.',
   html:() => `<div class="vit"><div class="vit__logo" id="vitL"></div><div class="vit__q"><q>L’avis de ce client viendra ici, en grand : deux ou trois lignes, avec la formation suivie.</q><a href="${GURL}" target="_blank" rel="noopener">${GLOGO}&nbsp;Voir tous nos avis Google</a>
     <div class="vit__nav"><button data-vit="-1" aria-label="Client précédent"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M15 5l-7 7 7 7"/></svg></button><span id="vitN"></span><button data-vit="1" aria-label="Client suivant"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M9 5l7 7-7 7"/></svg></button></div></div></div><div class="lgrow">${segNB}</div>`}
];
const lgCard = x => `<article class="lg${x.nb ? ' nb' : ''}" id="${x.id}"><div class="lg__top"><h3>${x.t}</h3><p>${x.d}</p></div>${x.html()}${rateSlot(x.id, 'Logos : ' + x.t)}</article>`;
$('#lgs').innerHTML = `<div class="lgpair">${LOGOS.filter(x => x.pair).map(lgCard).join('')}</div>` + LOGOS.filter(x => !x.pair).map(lgCard).join('');
$('#lgs').addEventListener('click', e => {
  const sg = e.target.closest('[data-nb]'); if (sg) { sg.closest('.lg').classList.toggle('nb', sg.dataset.nb === '1'); sg.parentElement.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b === sg)); }
  const mq = e.target.closest('[data-marq]'); if (mq) { const p = mq.closest('.lg').classList.toggle('paused'); mq.innerHTML = p ? PLAY + 'Relancer' : PAUSE + 'Pause'; }
  const rw = e.target.closest('[data-raw]'); if (rw) { const on = rw.closest('.lg').classList.toggle('raw'); rw.setAttribute('aria-pressed', on); rw.textContent = on ? 'Revenir aux tailles égales' : 'Voir sans égaliser les tailles'; }
  const vb = e.target.closest('[data-vit]'); if (vb) { vit(vi + +vb.dataset.vit); vitAuto(); }
});
let vi = 0, vt;
const vit = i => { vi = (i + CLIENTS.length) % CLIENTS.length; $('#vitL').innerHTML = `<div class="fade">${cl(CLIENTS[vi], 130)}</div>`; $('#vitN').textContent = (vi + 1) + ' sur ' + CLIENTS.length; };
const vitAuto = () => { clearInterval(vt); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) vt = setInterval(() => vit(vi + 1), 6000); };
vit(0); vitAuto();

/* review popup: shows on mouse enter, hides on mouse leave; a tap on touch screens */
const pop = document.createElement('div'); pop.className = 'pop'; pop.setAttribute('role', 'tooltip'); document.body.appendChild(pop);
let popFor = null;
const showPop = el => { const c = CLIENTS.find(x => x[0] === el.dataset.cl); if (!c) return;
  pop.innerHTML = `<b>${c[1]}</b><q>L’avis de ce client viendra ici : la formation suivie, la note et quelques mots.</q><small>${GLOGO}Avis Google</small>`;
  pop.classList.add('on'); const r = el.getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight;
  const x = Math.max(10, Math.min(innerWidth - pw - 10, r.left + r.width / 2 - pw / 2)); let y = r.top - ph - 10; if (y < 74) y = r.bottom + 10;
  pop.style.left = x + 'px'; pop.style.top = y + 'px'; popFor = el; };
const hidePop = () => { pop.classList.remove('on'); popFor = null; };
const touchy = matchMedia('(hover: none)').matches;
document.addEventListener('mouseover', e => { const el = e.target.closest('.cl'); if (el && el !== popFor) showPop(el); });
document.addEventListener('mouseout', e => { const el = e.target.closest('.cl'); if (el && !el.contains(e.relatedTarget)) hidePop(); });
document.addEventListener('focusin', e => { const el = e.target.closest('.cl'); if (el) showPop(el); });
document.addEventListener('focusout', e => { if (e.target.closest('.cl')) hidePop(); });
document.addEventListener('click', e => { const el = e.target.closest('.cl');
  if (!el) { hidePop(); return; }
  if (touchy && popFor !== el) { showPop(el); return; }
  window.open(GURL, '_blank', 'noopener'); });
addEventListener('scroll', () => { if (!popFor) return; touchy ? hidePop() : showPop(popFor); }, {passive:true});

/* ---------- devis and sessions ---------- */
const FORM = [{k:'ssct', n:'SSCT', c:'var(--f-ssct)'}, {k:'eco', n:'Économique', c:'var(--f-eco)'}, {k:'harc', n:'Référent harcèlement', c:'var(--f-harc)'}, {k:'treso', n:'Trésorier', c:'var(--f-treso)'}, {k:'ia', n:'IA du CSE', c:'var(--f-ia)'}];
const MONTHS = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
const ARROW = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="${d ? 'M9 5l7 7-7 7' : 'M15 5l-7 7 7 7'}"/></svg>`;
/* fictional sessions, January and February 2027 (examples only) */
const SESS = {ssct:[[0,11,15],[0,25,29],[1,15,19]], eco:[[0,18,22],[1,8,12]], harc:[[0,7,7],[0,21,21],[1,4,4]], treso:[[0,13,14],[1,23,24]], ia:[[0,27,27],[1,17,17]]};
const calHTML = (y, m, cellFn, nav, id) => {
  const off = (new Date(y, m, 1).getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
  let g = ['L','M','M','J','V','S','D'].map(d => `<span aria-hidden="true">${d}</span>`).join('');
  for (let i = 0; i < off; i++) g += '<span class="cal__d off"></span>';
  for (let d = 1; d <= days; d++) g += cellFn(d, ((off + d - 1) % 7) >= 5);
  const da = id ? ` data-cal="${id}"` : '';
  return `<div class="cal__h"><b>${MONTHS[m][0].toUpperCase() + MONTHS[m].slice(1)} ${y}</b><div><button data-cm="-1"${da} aria-label="Mois précédent" ${nav === 0 ? 'disabled' : ''}>${ARROW(0)}</button><button data-cm="1"${da} aria-label="Mois suivant" ${nav === 1 ? 'disabled' : ''}>${ARROW(1)}</button></div></div><div class="cal__g">${g}</div>`;
};
const chips = (sel, attr, multi = true) => FORM.map(f => `<button class="fchip" style="--c:${f.c}" ${attr}="${f.k}" aria-pressed="${multi ? sel.has(f.k) : sel === f.k}"><i></i>${f.n}</button>`).join('');
const range = (a, b) => a === b ? 'le ' + a : 'du ' + a + ' au ' + b;
const TRY = mode => `<button class="btn open try" data-dv="${mode}">Essayer ${ARROW_R}</button>`;
const cmpCard = (id, t, d, demo, side = '') => `<article class="cmp"><div><h3>${t}</h3><p>${d}</p>${side}${rateSlot(id, 'Devis et sessions : ' + t)}</div><div class="mock">${demo}</div></article>`;
const frameChips = FORM.slice(0, 3).map((f, i) => `<span class="fchip" style="--c:${f.c}" aria-pressed="${i === 0}"><i></i>${f.n}</span>`).join('');
const page = '<div class="frame__page"><i></i><i></i><i></i><i></i><i></i></div>';
$('#devis').innerHTML = [
  cmpCard('co-devis-fenetre', 'Une fenêtre, trois questions', 'Une fenêtre s’ouvre au milieu de la page. Une question à la fois : la formation, les dates souhaitées, les coordonnées.',
    `<div class="frame frame--modal" aria-hidden="true">${page}<div class="frame__over"><b>Quelle formation vous intéresse ?</b><div class="fchips">${frameChips}</div></div></div>`, TRY('modal')),
  cmpCard('co-devis-plein', 'Plein écran, une question à la fois', 'L’écran entier pour une seule question, en très gros. Zéro distraction, la charge mentale la plus faible.',
    `<div class="frame frame--full" aria-hidden="true">${page}<div class="frame__over"><b>Quelle formation vous intéresse ?</b><div class="fchips">${frameChips}</div></div></div>`, TRY('full')),
  cmpCard('co-devis-tiroir', 'Un panneau qui glisse sur le côté', 'Le formulaire arrive par la droite, tout sur un seul écran. La page reste visible derrière.',
    `<div class="frame frame--drawer" aria-hidden="true">${page}<div class="frame__over"><b>Demander un devis</b><div class="fchips">${frameChips}</div><div class="ln"></div><div class="ln"></div><div class="ln"></div></div></div>`, TRY('drawer')),
  cmpCard('co-devis-rappel', 'Juste « Être rappelé »', 'Un seul champ, le téléphone. Pour ceux qui préfèrent parler à quelqu’un plutôt que remplir un formulaire.',
    `<div class="rappel" id="rappel"><b>On vous rappelle sous 15 minutes.</b><p>Laissez votre numéro, un conseiller vous appelle pour parler de votre formation.</p><form><label class="sr" for="rpTel">Votre téléphone</label><input id="rpTel" type="tel" inputmode="tel" autocomplete="tel" placeholder="06 12 34 56 78"><button class="btn" type="submit">Me rappeler</button></form></div>`)
].join('');
$('#sess').innerHTML = [
  cmpCard('co-sess-mois', 'Le calendrier du mois', 'On touche une ou plusieurs formations, elles prennent leur couleur, et leurs dates apparaissent dans le calendrier.',
    `<div class="fchips" id="mChips" role="group" aria-label="Formations"></div><div class="cal" id="mCal"></div><div class="legend" id="mLeg"></div>`),
  cmpCard('co-sess-liste', 'La liste des prochaines sessions', 'Comme un agenda : la date en gros, la formation, et un bouton pour demander cette date.',
    `<div class="fchips" id="lChips" role="group" aria-label="Formations"></div><div class="slist" id="lList"></div>`),
  cmpCard('co-sess-pas', 'Choisir sa formation, puis ses jours', 'D’abord la formation, ensuite le nombre de jours, enfin le jour de départ. Tout est libre : c’est un souhait, on confirme ensuite.',
    `<div class="pas__lab">1. La formation</div><div class="fchips" id="pChips"></div><div class="pas__lab">2. Combien de jours ?</div><div class="fchips" id="pDays"></div><div class="pas__lab">3. Le jour de départ</div><div class="cal" id="pCal"></div><div class="pas__sum" id="pSum"></div>`)
].join('');

let mSel = new Set(['ssct']), mM = 0;
const paintM = () => {
  $('#mChips').innerHTML = chips(mSel, 'data-mf');
  $('#mCal').innerHTML = calHTML(2027, mM, (d, we) => { const hits = FORM.filter(f => mSel.has(f.k) && SESS[f.k].some(s => s[0] === mM && d >= s[1] && d <= s[2]));
    return `<span class="cal__d${we ? ' we' : ''}${hits.length ? ' has' : ''}" style="--c:${hits[0] ? hits[0].c : 'var(--line)'}">${d}<span class="dots">${hits.map(h => `<i style="--c:${h.c}"></i>`).join('')}</span></span>`; }, mM, 'm');
  const rows = FORM.filter(f => mSel.has(f.k)).flatMap(f => SESS[f.k].filter(s => s[0] === mM).map(s => `<div style="--c:${f.c}"><i></i>${f.n} <span>${range(s[1], s[2])} ${MONTHS[mM]}</span></div>`));
  $('#mLeg').innerHTML = rows.length ? rows.join('') : '<div><span>Touchez une formation pour voir ses dates.</span></div>'; };
let lSel = new Set(FORM.map(f => f.k));
const MSHORT = ['janv.', 'févr.'];
const paintL = () => {
  $('#lChips').innerHTML = chips(lSel, 'data-lf');
  const items = FORM.filter(f => lSel.has(f.k)).flatMap(f => SESS[f.k].map(s => ({f, m:s[0], a:s[1], b:s[2]}))).sort((x, y) => x.m - y.m || x.a - y.a);
  $('#lList').innerHTML = items.length ? items.map(x => `<div class="sitem" style="--c:${x.f.c}"><div class="sitem__d"><b>${x.a}${x.a !== x.b ? '-' + x.b : ''}</b><span>${MSHORT[x.m]}</span></div><div><h4>${x.f.n}</h4><p>${x.b - x.a + 1} jour${x.b > x.a ? 's' : ''}, en présentiel ou à distance</p></div><button class="tiny" data-ask="${x.f.k}">Demander cette date</button></div>`).join('') : '<p>Touchez une formation pour voir ses sessions.</p>'; };
let pF = 'ssct', pN = 5, pStart = null, pM = 0;
const pDays = d0 => { const out = []; let d = d0; const dim = new Date(2027, pM + 1, 0).getDate();
  while (out.length < pN && d <= dim) { const w = new Date(2027, pM, d).getDay(); if (w !== 0 && w !== 6) out.push(d); d++; } return out; };
const paintP = () => {
  const f = FORM.find(x => x.k === pF);
  $('#pChips').innerHTML = chips(pF, 'data-pf', false);
  $('#pDays').innerHTML = [1, 2, 3, 4, 5].map(n => `<button class="fchip" style="--c:${f.c}" data-pn="${n}" aria-pressed="${n === pN}">${n} jour${n > 1 ? 's' : ''}</button>`).join('');
  const picked = pStart ? pDays(pStart) : [];
  $('#pCal').innerHTML = calHTML(2027, pM, (d, we) => `<button class="cal__d${we ? ' we' : ''}${picked.includes(d) ? ' pick' : ''}" style="--c:${f.c}" data-pd="${d}" ${we ? 'disabled' : ''} aria-pressed="${picked.includes(d)}">${d}</button>`, pM, 'p');
  $('#pSum').textContent = picked.length ? `${f.n}, ${pN} jour${pN > 1 ? 's' : ''} : ${range(picked[0], picked[picked.length - 1])} ${MONTHS[pM]} 2027 (souhait, à confirmer)` : 'Touchez le jour de départ souhaité.'; };
paintM(); paintL(); paintP();
const tog = (set, k) => set.has(k) ? set.delete(k) : set.add(k);
$('#sess').addEventListener('click', e => {
  const t = e.target.closest('button'); if (!t) return; const ds = t.dataset;
  if (ds.mf) { tog(mSel, ds.mf); paintM(); }
  if (ds.cal === 'm') { mM = Math.max(0, Math.min(1, mM + +ds.cm)); paintM(); }
  if (ds.lf) { tog(lSel, ds.lf); paintL(); }
  if (ds.ask) { dvF = new Set([ds.ask]); openDv('modal', 1); }
  if (ds.pf) { pF = ds.pf; paintP(); }
  if (ds.pn) { pN = +ds.pn; paintP(); }
  if (ds.pd) { pStart = +ds.pd; paintP(); }
  if (ds.cal === 'p') { pM = Math.max(0, Math.min(1, pM + +ds.cm)); pStart = null; paintP(); }
});
$('#rappel form').addEventListener('submit', e => { e.preventDefault();
  $('#rappel').innerHTML = `<b>C’est noté.</b><div class="ok"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Un conseiller vous rappelle sous 15 minutes.</div><p>Démo : rien n’est envoyé.</p>`; });

/* devis dialog: centred window, full screen or side drawer */
const dv = $('#dv'); let step = 0, dvF = new Set(), dvD = new Set(), dvM = 0, dvMode = 'modal';
const now = new Date(), dvY0 = now.getFullYear(), dvM0 = now.getMonth();
const FIELDS = `<label>Nom et prénom<input autocomplete="name" placeholder="Ex. Marie Dupont"></label><label>Entreprise<input autocomplete="organization"></label><label>Téléphone<input type="tel" autocomplete="tel" inputmode="tel"></label><label>E-mail<input type="email" autocomplete="email"></label>`;
const dvChips = () => `<div class="fchips">${FORM.map(f => `<button class="fchip" style="--c:${f.c}" data-df="${f.k}" aria-pressed="${dvF.has(f.k)}"><i></i>${f.n}</button>`).join('')}<button class="fchip" style="--c:var(--f-other)" data-df="autre" aria-pressed="${dvF.has('autre')}"><i></i>Je ne sais pas encore</button></div>`;
const hint = t => `<p style="font-size:17px; color:var(--muted); margin-top:8px">${t}</p>`;
const dvRender = () => {
  const drawer = dvMode === 'drawer';
  $('#dvStep').textContent = step === 3 ? 'Demande envoyée' : drawer ? 'Demande de devis' : `Question ${step + 1} sur 3`;
  $('#dvBar').style.transform = `scaleX(${(step + 1) / 3})`;
  $('#dvNav').style.display = step < 3 ? '' : 'none';
  $('#dvBack').style.visibility = step && !drawer ? 'visible' : 'hidden';
  $('#dvNext').textContent = step === 2 || drawer ? 'Envoyer ma demande' : 'Continuer';
  const b = $('#dvBody');
  if (step === 3) { b.innerHTML = `<div class="dv__ok"><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="var(--turq-soft)"/><path d="M20 33 l8 8 l16 -18" fill="none" stroke="var(--turq-ink)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg><h4 id="dvTitle">Merci, on vous rappelle sous 15 minutes.</h4><p>Ici, rien n’est envoyé : c’est une démo.<br>Vous pouvez refermer et continuer à lire.</p><button class="btn" id="dvDone">Fermer</button></div>`; return; }
  if (drawer) { b.innerHTML = `<h4 id="dvTitle">Demander un devis</h4>${hint('Tout sur un écran. Réponse sous 15 minutes.')}${dvChips()}<label>Dates souhaitées (facultatif)<input placeholder="Ex. la semaine du 18 janvier"></label>${FIELDS}`; return; }
  if (step === 0) b.innerHTML = `<h4 id="dvTitle">Quelle formation vous intéresse ?</h4>${hint('Plusieurs choix possibles.')}${dvChips()}`;
  if (step === 1) { const d0 = new Date(dvY0, dvM0 + dvM, 1), y = d0.getFullYear(), m = d0.getMonth();
    const cell = (d, we) => { const k = `${y}-${m}-${d}`; return `<button class="cal__d${we ? ' we' : ''}${dvD.has(k) ? ' sel' : ''}" data-dd="${k}" aria-pressed="${dvD.has(k)}" aria-label="${d} ${MONTHS[m]}">${d}</button>`; };
    b.innerHTML = `<h4 id="dvTitle">Quelles dates vous arrangent ?</h4>${hint('Touchez les jours souhaités. Sans engagement : on vous confirme la disponibilité.')}<div class="cal">${calHTML(y, m, cell, dvM === 0 ? 0 : dvM === 5 ? 1 : -1)}</div><div class="note">Dates indicatives, sous réserve de disponibilité.</div>`; }
  if (step === 2) b.innerHTML = `<h4 id="dvTitle">Où peut-on vous joindre ?</h4>${FIELDS}`;
};
const openDv = (mode, from = 0) => { dvMode = mode; dv.className = mode; step = from; dvRender(); dv.showModal(); };
$('#devis').addEventListener('click', e => { const b = e.target.closest('[data-dv]'); if (b) openDv(b.dataset.dv); });
$('#dvClose').addEventListener('click', () => dv.close());
$('#dvNext').addEventListener('click', () => { step = dvMode === 'drawer' ? 3 : Math.min(3, step + 1); dvRender(); });
$('#dvBack').addEventListener('click', () => { step = Math.max(0, step - 1); dvRender(); });
dv.addEventListener('click', e => {
  if (e.target === dv) return dv.close();
  const f = e.target.closest('[data-df]'); if (f) { tog(dvF, f.dataset.df); f.setAttribute('aria-pressed', dvF.has(f.dataset.df)); }
  const d = e.target.closest('[data-dd]'); if (d) { tog(dvD, d.dataset.dd); dvRender(); }
  const m = e.target.closest('[data-cm]'); if (m) { dvM = Math.max(0, Math.min(5, dvM + +m.dataset.cm)); dvRender(); }
  if (e.target.closest('#dvDone')) dv.close();
});

/* ---------- references ---------- */
const REFS = [
  ['leeto','Leeto','https://www.leeto.co/','Le même public que vous, les élus de CSE, avec un site moderne. Le mot « simple » entouré, la preuve juste dessous.'],
  ['oscar','Oscar','https://www.hioscar.com/','La photo prise sur le vif, en plein écran. Et « Appeler » aussi visible que le bouton principal.'],
  ['payfit','PayFit','https://payfit.com/fr/','Un vrai client en photo, avec sa citation signée. Le titre en serif, très posé.'],
  ['indy','Indy','https://www.indy.fr/','Fond crème, serif élégant, des morceaux d’interface autour du titre. Premium sans être froid.'],
  ['mercury','Mercury','https://mercury.com/','Une seule promesse, en grand, et beaucoup d’espace. Le luxe de dire peu.'],
  ['alan','Alan','https://alan.com/fr-fr','« Mon devis en 2 min » dans le menu et un menu Accessibilité. Pensé pour tous les âges.'],
  ['qonto','Qonto','https://qonto.com/fr','Trois mots en très grand sur une photo. La typographie fait tout le travail.'],
  ['pennylane','Pennylane','https://www.pennylane.com/fr/','Le chiffre de clients avec « Voir les témoignages » juste à côté : la preuve est toujours à un clic.'],
  ['shine','Shine','https://www.shine.fr/','« Parler à notre équipe » en second bouton, plutôt qu’un vague « En savoir plus ».'],
  ['chapter','Chapter','https://askchapter.org/','Pour les retraités : « Parler à un conseiller » en premier, les horaires à côté du numéro.'],
  ['swile','Swile','https://www.swile.co/fr-fr','Avantages salariés, donc le monde du CSE. Un bouton « Des questions ? » toujours présent.'],
  ['elusio','Elusio','https://www.elusio-formation.fr/','Un concurrent : illustrations, bulles, avis Google sous le titre. Clair, mais le dessin peut sembler léger.']
];
$('#refs').innerHTML = REFS.map(x => `
  <article class="ref"><button data-lb="${x[0]}" aria-label="Agrandir la capture de ${x[1]}"><img src="assets/${x[0]}.jpg" alt="Page d’accueil de ${x[1]}" loading="lazy" width="1200" height="750"></button>
  <div class="ref__b"><h3>${x[1]}<a href="${x[2]}" target="_blank" rel="noopener">Voir le site</a></h3><p>${x[3]}</p>${rateSlot('ref-' + x[0], 'Référence : ' + x[1])}</div></article>`).join('');
const lb = $('#lb');
document.addEventListener('click', e => { const b = e.target.closest('[data-lb]'); if (!b) return; $('#lbImg').src = 'assets/' + b.dataset.lb + '.jpg'; lb.showModal(); });
lb.addEventListener('click', e => { if (e.target === lb || e.target.id === 'lbImg') lb.close(); });

/* ---------- rating widgets ---------- */
const RATES = [...document.querySelectorAll('.rate')];
RATES.forEach(r => { const id = r.dataset.id;
  r.innerHTML = `<div class="rate__q"><span>Votre note</span><span class="rate__v"></span></div>
    <div class="rate__row" role="radiogroup" aria-label="Note de 1 à 10 : ${esc(LABELS[id])}">${Array.from({length:10}, (_, i) => `<button role="radio" data-n="${i + 1}" aria-checked="false">${i + 1}</button>`).join('')}</div>
    <button class="rate__more" aria-expanded="false">Ajouter un commentaire</button><textarea hidden rows="2" placeholder="Un mot, une nuance…" aria-label="Commentaire : ${esc(LABELS[id])}"></textarea>`;
  const ta = r.querySelector('textarea'), more = r.querySelector('.rate__more');
  if (S.c[id]) { ta.value = S.c[id]; ta.hidden = false; more.textContent = 'Commentaire'; more.setAttribute('aria-expanded', 'true'); }
  more.addEventListener('click', () => { ta.hidden = !ta.hidden; more.setAttribute('aria-expanded', !ta.hidden); if (!ta.hidden) ta.focus(); });
  let tm; ta.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(() => { const v = ta.value.trim(); v ? S.c[id] = v : delete S.c[id]; save(); }, 300); });
  r.querySelector('.rate__row').addEventListener('click', e => { const b = e.target.closest('[data-n]'); if (!b) return; const n = +b.dataset.n; S.r[id] === n ? delete S.r[id] : S.r[id] = n; save(); });
});
const paintRates = () => RATES.forEach(r => { const v = S.r[r.dataset.id];
  r.querySelectorAll('[data-n]').forEach(b => { const n = +b.dataset.n; b.setAttribute('aria-checked', n === v); b.classList.toggle('lit', !!v && n < v); });
  r.querySelector('.rate__v').textContent = v ? v + ' sur 10' : ''; });

/* ---------- summary and export ---------- */
const ALL = RATES.map(r => r.dataset.id);
const paint = () => {
  paintRates();
  const n = ALL.filter(id => S.r[id]).length;
  $('#progtxt').textContent = n + (n > 1 ? ' notées' : ' notée') + ' sur ' + ALL.length;
  $('#progbar').style.transform = `scaleX(${n / ALL.length})`;
  $('#sumN').textContent = n; $('#sumOf').textContent = 'sur ' + ALL.length + ' propositions';
  const rated = ALL.filter(id => S.r[id]).map(id => [id, S.r[id]]);
  const top = rated.filter(x => x[1] >= 8).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const low = rated.filter(x => x[1] <= 4).sort((a, b) => a[1] - b[1]).slice(0, 6);
  const li = arr => `<ol>${arr.map(x => `<li>${esc(LABELS[x[0]])} <b>${x[1]}</b></li>`).join('')}</ol>`;
  $('#sumTop').innerHTML = top.length ? li(top) : '<p class="nil">Les notes de 8 à 10 s’afficheront ici.</p>';
  $('#sumLow').innerHTML = low.length ? li(low) : '<p class="nil">Les notes de 1 à 4 s’afficheront ici.</p>';
};
['fName', 'fPlus', 'fMoins'].forEach(k => { const el = document.getElementById(k); el.value = S.f[k] || ''; el.addEventListener('input', () => { S.f[k] = el.value; save(); }); });
const SECS = [['da-', 'Pages d’accueil'], ['cp-', 'Couleurs'], ['ton-', 'Texte d’accueil'], ['ic-', 'Icônes'], ['lg-', 'Logos clients'], ['co-', 'Devis et sessions'], ['ref-', 'Références']];
const exportText = () => {
  const who = (S.f.fName || '').trim();
  let t = `Retours direction artistique Qualyz${who ? ' : ' + who : ''}\n${new Date().toLocaleDateString('fr-FR')}\n`;
  SECS.forEach(([p, name]) => { t += `\n${name.toUpperCase()}\n`;
    ALL.filter(id => id.startsWith(p)).forEach(id => { const lab = LABELS[id].replace(/^[^:]+: /, ''); t += `- ${lab} : ${S.r[id] ? S.r[id] + '/10' : 'pas noté'}${S.c[id] ? ' (' + S.c[id] + ')' : ''}\n`; }); });
  if ((S.f.fPlus || '').trim()) t += `\nCE QUI M'A LE PLUS PLU\n${S.f.fPlus.trim()}\n`;
  if ((S.f.fMoins || '').trim()) t += `\nCE QU'IL NE FAUT SURTOUT PAS\n${S.f.fMoins.trim()}\n`;
  return t;
};
const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('on'); setTimeout(() => t.classList.remove('on'), 2400); };
const copy = async () => { const t = exportText(); try { await navigator.clipboard.writeText(t); } catch (e) {
  const ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); } toast('Texte copié'); };
$('#copyBtn').addEventListener('click', copy);
$('#shareBtn').addEventListener('click', async () => { const t = exportText();
  if (navigator.share) { try { await navigator.share({title:'Retours direction artistique Qualyz', text:t}); } catch (e) {} } else copy(); });
/* Gmail: a new tab on a computer, the Gmail app on iPhone (Mail as fallback), the default mail app on Android */
$('#mailBtn').addEventListener('click', e => { e.preventDefault();
  const who = (S.f.fName || '').trim(), su = encodeURIComponent('Retours DA Qualyz' + (who ? ' : ' + who : '')), body = encodeURIComponent(exportText()), to = encodeURIComponent(MAIL_TO);
  const ua = navigator.userAgent, ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1), android = /Android/.test(ua);
  const mailto = `mailto:${MAIL_TO}?subject=${su}&body=${body}`;
  if (ios) { const t = setTimeout(() => { if (!document.hidden) location.href = mailto; }, 1800); addEventListener('pagehide', () => clearTimeout(t), {once:true}); location.href = `googlegmail:///co?to=${to}&subject=${su}&body=${body}`; }
  else if (android) location.href = mailto;
  else window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${body}`, '_blank', 'noopener'); });

/* French typography: a narrow no-break space before : ? ! ; so they never start a line */
const nbsp = root => { const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
  while ((n = w.nextNode())) { if (n.parentElement.closest('script, style, textarea')) continue; const v = n.nodeValue.replace(/ ([:?!;»])/g, ' $1').replace(/« /g, '« '); if (v !== n.nodeValue) n.nodeValue = v; } };
nbsp(document.body);

/* ---------- page chrome ---------- */
paint();
const top_ = $('#top'); addEventListener('scroll', () => top_.classList.toggle('scrolled', scrollY > 10), {passive:true});
const navs = [...document.querySelectorAll('.top nav a')];
const sio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) navs.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id)); }), {rootMargin:'-40% 0px -55% 0px'});
document.querySelectorAll('main > section[id]').forEach(s => sio.observe(s));
