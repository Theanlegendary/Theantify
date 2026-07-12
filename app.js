/* ====================================================================
   SOUNDIFY — app.js (Real Web Audio Synth DSP, Local Files, Persistence)
   ==================================================================== */

// ─────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────
const ALBUMS = [
  {
    id:'a1', title:'Synaptic Waves', artist:'Aethel', type:'Album',
    cover:'album1.jpg', color:'#5a3fa0', year:'2024', genre:'electronic',
    tracks:[
      {id:'t1',  title:'Neural Storm',      artist:'Aethel',  duration:213, album:'Synaptic Waves'},
      {id:'t2',  title:'Pulse Cascade',     artist:'Aethel',  duration:188, album:'Synaptic Waves'},
      {id:'t3',  title:'Electric Cortex',   artist:'Aethel',  duration:254, album:'Synaptic Waves'},
      {id:'t4',  title:'Midnight Algorithm',artist:'Aethel',  duration:197, album:'Synaptic Waves'},
      {id:'t5',  title:'Resonance Field',   artist:'Aethel',  duration:229, album:'Synaptic Waves'},
      {id:'t6',  title:'Quantum Echo',      artist:'Aethel',  duration:241, album:'Synaptic Waves'},
    ]
  },
  {
    id:'a2', title:'Synthwave Horizons', artist:'Night Drives', type:'Album',
    cover:'album2.jpg', color:'#a03a1a', year:'2024', genre:'synthwave',
    tracks:[
      {id:'t7',  title:'Neon Boulevard',    artist:'Night Drives', duration:210, album:'Synthwave Horizons'},
      {id:'t8',  title:'Chrome Dreams',     artist:'Night Drives', duration:195, album:'Synthwave Horizons'},
      {id:'t9',  title:'Retrograde Sun',    artist:'Night Drives', duration:234, album:'Synthwave Horizons'},
      {id:'t10', title:'Digital Horizon',   artist:'Night Drives', duration:178, album:'Synthwave Horizons'},
      {id:'t11', title:'Signal Drift',      artist:'Night Drives', duration:248, album:'Synthwave Horizons'},
    ]
  },
  {
    id:'a3', title:'Forest of Gold', artist:'Avenue of Oaks', type:'Album',
    cover:'album3.jpg', color:'#1a4a1a', year:'2024', genre:'ambient',
    tracks:[
      {id:'t12', title:'Golden Canopy',     artist:'Avenue of Oaks', duration:302, album:'Forest of Gold'},
      {id:'t13', title:'Ancient Roots',     artist:'Avenue of Oaks', duration:267, album:'Forest of Gold'},
      {id:'t14', title:'Whispering Leaves', artist:'Avenue of Oaks', duration:289, album:'Forest of Gold'},
      {id:'t15', title:'The Sacred Grove',  artist:'Avenue of Oaks', duration:315, album:'Forest of Gold'},
      {id:'t16', title:'Morning Mist',      artist:'Avenue of Oaks', duration:243, album:'Forest of Gold'},
    ]
  },
  {
    id:'a4', title:'Aquatic Dreams', artist:'Lumina Void', type:'Album',
    cover:'album4.jpg', color:'#0a2a5a', year:'2024', genre:'ambient',
    tracks:[
      {id:'t17', title:'Deep Ocean Floor',  artist:'Lumina Void', duration:358, album:'Aquatic Dreams'},
      {id:'t18', title:'Bioluminescence',   artist:'Lumina Void', duration:312, album:'Aquatic Dreams'},
      {id:'t19', title:'Current Drift',     artist:'Lumina Void', duration:278, album:'Aquatic Dreams'},
      {id:'t20', title:'Tidal Frequency',   artist:'Lumina Void', duration:341, album:'Aquatic Dreams'},
    ]
  },
  {
    id:'a5', title:'Neon Pulse', artist:'Synthwave Star', type:'Album',
    cover:'album5.jpg', color:'#8a0a5a', year:'2024', genre:'pop',
    tracks:[
      {id:'t21', title:'Pop Music Evolution', artist:'Synthwave Star', duration:185, album:'Neon Pulse'},
      {id:'t22', title:'Electric Youth',      artist:'Synthwave Star', duration:202, album:'Neon Pulse'},
      {id:'t23', title:'Candy Glitch',        artist:'Synthwave Star', duration:177, album:'Neon Pulse'},
      {id:'t24', title:'Arcade Hearts',       artist:'Synthwave Star', duration:211, album:'Neon Pulse'},
      {id:'t25', title:'Pixel Love',          artist:'Synthwave Star', duration:198, album:'Neon Pulse'},
      {id:'t26', title:'Dance Protocol',      artist:'Synthwave Star', duration:224, album:'Neon Pulse'},
    ]
  },
];

const DEFAULT_PLAYLISTS = [
  {
    id:'pl1', title:'Chill Vibes', type:'Playlist', cover:'album4.jpg',
    color:'#0a3a5a', description:'Relax and unwind with the best ambient sounds',
    genre:'ambient', trackIds:['t17','t18','t12','t13','t6','t19']
  },
  {
    id:'pl2', title:'Workout Fuel', type:'Playlist', cover:'album2.jpg',
    color:'#8a2a0a', description:'High energy tracks to power your workout',
    genre:'synthwave', trackIds:['t7','t21','t22','t24','t8','t23']
  },
  {
    id:'pl3', title:'Deep Focus', type:'Playlist', cover:'album1.jpg',
    color:'#2a1a5a', description:'Electronic beats for maximum concentration',
    genre:'electronic', trackIds:['t1','t2','t3','t4','t5','t20']
  },
];

const CATEGORIES = [
  {name:'Podcasts',   color:'#1e3264'}, {name:'Electronic', color:'#8400e7'},
  {name:'Pop',        color:'#c10000'}, {name:'Ambient',    color:'#006450'},
  {name:'Hip-Hop',    color:'#e8115b'}, {name:'Rock',       color:'#ba5d07'},
  {name:'Jazz',       color:'#0d73ec'}, {name:'Classical',  color:'#e13300'},
  {name:'R&B',        color:'#8d67ab'}, {name:'Metal',      color:'#503750'},
  {name:'Latin',      color:'#e91429'}, {name:'Dance',      color:'#1e6432'},
];

const GENRE_SCALES = {
  electronic: {notes:[0,3,5,7,10,12,15], tempo:128, waveform:'sawtooth', rootHz:110,  bassFreq:55,  cutoff:1200, delayFeedback:0.3},
  synthwave:  {notes:[0,2,4,7,9,12,14],  tempo:110, waveform:'square',   rootHz:130.8,bassFreq:65.4,cutoff:800,  delayFeedback:0.4},
  ambient:    {notes:[0,4,7,11,12,16,19],tempo:70,  waveform:'sine',     rootHz:82.4, bassFreq:41.2,cutoff:600,  delayFeedback:0.6},
  pop:        {notes:[0,2,4,5,7,9,11],   tempo:120, waveform:'triangle', rootHz:98,   bassFreq:49,  cutoff:2000, delayFeedback:0.25},
};

const ALL_TRACKS = [];
ALBUMS.forEach(al => al.tracks.forEach(t => ALL_TRACKS.push({...t, cover:al.cover, color:al.color, albumId:al.id, genre:al.genre})));

// ─────────────────────────────────────────────────────────────────────
// PERSISTENT STATE
// ─────────────────────────────────────────────────────────────────────
let S = {
  track:       null,
  playlist:    [],
  index:       0,
  playing:     false,
  shuffle:     false,
  repeat:      false,
  muted:       false,
  volume:      0.7,
  progress:    0,
  liked:       new Set(['t3','t7','t18']),
  earnings:    {total:0, streams:0, referrals:0, playlists:0},
  timer:       null,
  historyStack:['home'],
  historyIdx:  0,
  customPlaylists: [], // Saved to localStorage
  localFiles:  [],     // Locally uploaded audio files metadata
};

// Load saved state from LocalStorage
function loadState() {
  try {
    const savedLiked = localStorage.getItem('soundify_liked');
    if (savedLiked) S.liked = new Set(JSON.parse(savedLiked));

    const savedPlaylists = localStorage.getItem('soundify_playlists');
    if (savedPlaylists) S.customPlaylists = JSON.parse(savedPlaylists);

    const savedEarnings = localStorage.getItem('soundify_earnings');
    if (savedEarnings) S.earnings = JSON.parse(savedEarnings);

    const savedLocalFiles = localStorage.getItem('soundify_local_files');
    if (savedLocalFiles) {
      S.localFiles = JSON.parse(savedLocalFiles);
      // Re-add local files to ALL_TRACKS
      S.localFiles.forEach(file => {
        ALL_TRACKS.push(file);
      });
    }
  } catch(e) {
    console.error('Failed to load localStorage state:', e);
  }
}

function saveState() {
  try {
    localStorage.setItem('soundify_liked', JSON.stringify([...S.liked]));
    localStorage.setItem('soundify_playlists', JSON.stringify(S.customPlaylists));
    localStorage.setItem('soundify_earnings', JSON.stringify(S.earnings));
    localStorage.setItem('soundify_local_files', JSON.stringify(S.localFiles));
  } catch(e) {
    console.error('Failed to save state to localStorage:', e);
  }
}

function getTrackById(id){ 
  return ALL_TRACKS.find(t=>t.id===id); 
}
function getAlbumById(id){ 
  return ALBUMS.find(a=>a.id===id); 
}
function getCustomPlaylistById(id) {
  return S.customPlaylists.find(p => p.id === id);
}

// ─────────────────────────────────────────────────────────────────────
// WEB AUDIO SYNTH / DSP ENGINE
// ─────────────────────────────────────────────────────────────────────
let audioCtx       = null;
let masterGain     = null;
let delayNode      = null;
let delayGainNode  = null;
let filterNode     = null;

let arpNodes       = [];  
let bassNodes      = [];
let arpTimer       = null;
let arpStep        = 0;
let currentGenre   = 'electronic';

// DSP Control values
let dspSettings = {
  tempo: 120,
  cutoff: 1200,
  delayFeedback: 0.3,
  wave: 'sine'
};

// Local files audio storage
let localAudioBuffers = {}; // Map of id -> AudioBuffer
let activeFileSource  = null;

function initAudio() {
  if (audioCtx) return;
  audioCtx   = new (window.AudioContext || window.webkitAudioContext)();
  
  // Master chain nodes
  masterGain    = audioCtx.createGain();
  filterNode    = audioCtx.createBiquadFilter();
  delayNode     = audioCtx.createDelay(1.5);
  delayGainNode = audioCtx.createGain();

  // DSP default parameters
  masterGain.gain.value = S.volume;
  filterNode.type = 'lowpass';
  filterNode.frequency.value = dspSettings.cutoff;
  delayNode.delayTime.value = 0.3;
  delayGainNode.gain.value = dspSettings.delayFeedback;

  // Wire Delay feedback loop
  delayNode.connect(delayGainNode);
  delayGainNode.connect(delayNode);

  // Synth graph routing: Nodes -> Filter -> Master Gain -> Output
  // Delay is tapped from filter output and mixed into master gain
  filterNode.connect(masterGain);
  filterNode.connect(delayNode);
  delayNode.connect(masterGain);

  masterGain.connect(audioCtx.destination);
  
  updateDSPUI();
}

function stopAllAudio() {
  clearInterval(arpTimer);
  arpTimer = null;
  [...arpNodes, ...bassNodes].forEach(([node]) => {
    try { node.stop(); } catch(e){}
  });
  arpNodes  = [];
  bassNodes = [];
  arpStep   = 0;

  if (activeFileSource) {
    try { activeFileSource.stop(); } catch(e){}
    activeFileSource = null;
  }
}

function startMusicForGenre(genre) {
  stopAllAudio();
  currentGenre = genre || 'electronic';
  const cfg = GENRE_SCALES[currentGenre] || GENRE_SCALES.electronic;

  if (!audioCtx || audioCtx.state === 'suspended') return;

  // Load genre configs into DSP setting if not tweaked manually yet
  dspSettings.tempo         = cfg.tempo;
  dspSettings.cutoff        = cfg.cutoff;
  dspSettings.delayFeedback = cfg.delayFeedback;
  dspSettings.wave          = cfg.waveform;
  updateDSPUI();

  // Apply parameters dynamically
  filterNode.frequency.setValueAtTime(dspSettings.cutoff, audioCtx.currentTime);
  delayNode.delayTime.setValueAtTime(60 / dspSettings.tempo * 0.5, audioCtx.currentTime);
  delayGainNode.gain.setValueAtTime(dspSettings.delayFeedback, audioCtx.currentTime);

  // ---- Bass drone ----
  const bassOsc  = audioCtx.createOscillator();
  const bassGain = audioCtx.createGain();
  bassOsc.type   = 'sine';
  bassOsc.frequency.value = cfg.bassFreq;
  bassGain.gain.setValueAtTime(0, audioCtx.currentTime);
  
  bassOsc.connect(filterNode);
  bassOsc.start();
  bassGain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.5);
  bassNodes = [[bassOsc, bassGain]];

  // ---- Melody Sequence ----
  const notes  = cfg.notes;
  const rootHz = cfg.rootHz;
  const arpSec = 60 / dspSettings.tempo;

  function playArpNote(step) {
    const noteIdx = step % notes.length;
    const octave  = (Math.floor(step / notes.length) % 2 === 0) ? 1 : 2;
    const freq    = rootHz * Math.pow(2, (notes[noteIdx] / 12) + (octave - 1));

    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = dspSettings.wave;
    osc.frequency.value = freq;

    const now = audioCtx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + arpSec * 0.95);

    osc.connect(gain).connect(filterNode);
    osc.start(now);
    osc.stop(now + arpSec);
    arpNodes.push([osc, gain]);
  }

  arpStep = 0;
  playArpNote(arpStep++);
  arpTimer = setInterval(() => {
    if (!S.playing) return;
    playArpNote(arpStep++);
    arpNodes = arpNodes.filter(([osc]) => {
      try { return osc.context.state !== 'closed'; } catch(e){ return false; }
    });
  }, arpSec * 1000);
}

// Play decoded local audio file
function playLocalFileBuffer(id) {
  stopAllAudio();
  const buffer = localAudioBuffers[id];
  if (!buffer || !audioCtx) return;

  activeFileSource = audioCtx.createBufferSource();
  activeFileSource.buffer = buffer;
  
  // Route local file through the equalizer filter + visualizer graph
  activeFileSource.connect(filterNode);
  
  // Handle song ending
  activeFileSource.onended = () => {
    if (S.playing && activeFileSource) {
      nextTrack();
    }
  };

  activeFileSource.start(0);
}

function updateDSPUI() {
  const elTempo  = document.getElementById('val-tempo');
  const elCutoff = document.getElementById('val-cutoff');
  const elDelay  = document.getElementById('val-delay');
  
  if (elTempo)  elTempo.textContent  = dspSettings.tempo;
  if (elCutoff) elCutoff.textContent = dspSettings.cutoff;
  if (elDelay)  elDelay.textContent  = Math.round(dspSettings.delayFeedback * 100);

  const slideTempo  = document.getElementById('slider-tempo');
  const slideCutoff = document.getElementById('slider-cutoff');
  const slideDelay  = document.getElementById('slider-delay');
  const selectWave  = document.getElementById('select-wave');

  if (slideTempo)  slideTempo.value  = dspSettings.tempo;
  if (slideCutoff) slideCutoff.value = dspSettings.cutoff;
  if (slideDelay)  slideDelay.value  = Math.round(dspSettings.delayFeedback * 100);
  if (selectWave)  selectWave.value  = dspSettings.wave;
}

// ─────────────────────────────────────────────────────────────────────
// VISUALIZER
// ─────────────────────────────────────────────────────────────────────
const VIS_BARS = 14;
let visAnim = null;
let visPhase = 0;

function startVisualizer() {
  const canvas = document.getElementById('visualizer');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  cancelAnimationFrame(visAnim);

  function draw() {
    visAnim = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!S.playing) {
      ctx.fillStyle = '#535353';
      for (let i = 0; i < VIS_BARS; i++) {
        const x = (i / VIS_BARS) * canvas.width;
        ctx.fillRect(x + 1, canvas.height - 6, canvas.width / VIS_BARS - 2, 4);
      }
      return;
    }
    visPhase += 0.08;
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#1ed760');
    grad.addColorStop(1, '#1DB954');
    ctx.fillStyle = grad;
    for (let i = 0; i < VIS_BARS; i++) {
      const freq   = (i + 1) / VIS_BARS;
      const amp    = 0.4 + 0.6 * Math.sin(visPhase * (1 + freq * 2) + i * 0.7);
      const height = Math.max(3, amp * canvas.height * 0.88);
      const x      = (i / VIS_BARS) * canvas.width;
      const y      = canvas.height - height;
      const w      = canvas.width / VIS_BARS - 2;
      ctx.beginPath();
      ctx.roundRect(x + 1, y, w, height, 2);
      ctx.fill();
    }
  }
  draw();
}

// ─────────────────────────────────────────────────────────────────────
// FRIEND ACTIVITY DATA & MOCKS
// ─────────────────────────────────────────────────────────────────────
const FRIENDS = [
  { name: 'Alex Johnson', initial: 'A', online: true, trackId: 't1', ageSec: 4 },
  { name: 'Chloe Vance',  initial: 'C', online: true, trackId: 't8', ageSec: 12 },
  { name: 'Marcus Brody', initial: 'M', online: true, trackId: 't12', ageSec: 25 },
  { name: 'Sarah Connor', initial: 'S', online: false, trackId: null, ageSec: 3600 }
];

function toggleFriendSidebar() {
  const sidebar = document.getElementById('friend-sidebar');
  const app = document.getElementById('app');
  if (sidebar.classList.contains('hidden')) {
    sidebar.classList.remove('hidden');
    app.classList.add('with-friend-sidebar');
    renderFriendActivity();
  } else {
    sidebar.classList.add('hidden');
    app.classList.remove('with-friend-sidebar');
  }
}

function renderFriendActivity() {
  const body = document.getElementById('friend-sidebar-body');
  if (!body) return;
  body.innerHTML = '';
  FRIENDS.forEach(friend => {
    const row = document.createElement('div');
    row.className = 'friend-row';
    const tr = friend.trackId ? getTrackById(friend.trackId) : null;
    row.innerHTML = `
      <div class="friend-avatar-wrap">
        <div class="friend-avatar">${friend.initial}</div>
        <div class="friend-online-dot ${friend.online ? '' : 'offline'}"></div>
      </div>
      <div class="friend-info">
        <p class="friend-name">${friend.name}</p>
        ${friend.online && tr ? `
          <p class="friend-song" onclick="playFriendSong('${tr.id}')">⚡ ${tr.title}</p>
          <p class="friend-meta">${tr.artist} • ${tr.album}</p>
        ` : `
          <p class="friend-meta" style="color:var(--text-muted)">Offline</p>
        `}
      </div>
    `;
    body.appendChild(row);
  });
}

function playFriendSong(trackId) {
  const tr = getTrackById(trackId);
  if (tr) playTrack(tr, [tr], 0);
}

// Simulate friend activities changes
setInterval(() => {
  FRIENDS.forEach(f => {
    if (f.online && Math.random() > 0.6) {
      f.trackId = ALL_TRACKS[Math.floor(Math.random() * ALL_TRACKS.length)].id;
    }
  });
  renderFriendActivity();
}, 15000);

// ─────────────────────────────────────────────────────────────────────
// LOCAL FILE LOADER & DROPZONE
// ─────────────────────────────────────────────────────────────────────
function setupLocalFileHandlers() {
  const dropzone = document.getElementById('import-dropzone');
  const uploader = document.getElementById('file-uploader');
  
  if (!dropzone || !uploader) return;

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    handleImportedFiles(e.dataTransfer.files);
  });

  uploader.addEventListener('change', (e) => {
    handleImportedFiles(e.target.files);
  });
}

function handleImportedFiles(files) {
  if (!files || !files.length) return;
  initAudio();
  showToast(`⚡ Importing ${files.length} file(s)...`);

  Array.from(files).forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = function(evt) {
      audioCtx.decodeAudioData(evt.target.result, function(buffer) {
        const id = 'local-' + Date.now() + '-' + index;
        const localTrack = {
          id: id,
          title: file.name.replace(/\.[^/.]+$/, ""), // Strip extension
          artist: 'Local File',
          duration: buffer.duration,
          album: 'Imported Files',
          cover: 'album4.jpg',
          color: '#121212',
          genre: 'local'
        };

        // Save buffer globally to reference during play
        localAudioBuffers[id] = buffer;
        
        // Add to active state
        S.localFiles.push(localTrack);
        ALL_TRACKS.push(localTrack);
        saveState();

        showToast(`✅ Imported: ${localTrack.title}`);
        renderLibraryPage();
      }, function(err) {
        console.error('Audio decode failed:', err);
        showToast(`❌ Failed to decode: ${file.name}`);
      });
    };
    reader.readAsArrayBuffer(file);
  });
}

// ─────────────────────────────────────────────────────────────────────
// GREETING & SIDEBAR PLAYLISTS
// ─────────────────────────────────────────────────────────────────────
function renderSidebar() {
  const list = document.getElementById('sidebar-playlist-list');
  list.innerHTML = '';
  
  // Custom user playlists
  S.customPlaylists.forEach(pl => {
    const li = document.createElement('li');
    li.className = 'pl-item';
    li.textContent = pl.title;
    li.onclick = () => openDetail(pl);
    list.appendChild(li);
  });

  // Default playlists
  DEFAULT_PLAYLISTS.forEach(pl => {
    const li = document.createElement('li');
    li.className = 'pl-item';
    li.textContent = pl.title;
    li.onclick = () => openDetail(pl);
    list.appendChild(li);
  });

  // Albums
  ALBUMS.forEach(al => {
    const li = document.createElement('li');
    li.className = 'pl-item';
    li.textContent = al.title;
    li.onclick = () => openDetail(al);
    list.appendChild(li);
  });
}

// ─────────────────────────────────────────────────────────────────────
// DYNAMIC PLAYLIST CREATION
// ─────────────────────────────────────────────────────────────────────
function createNewPlaylist() {
  const count = S.customPlaylists.length + 1;
  const newPl = {
    id: 'userpl-' + Date.now(),
    title: 'My Playlist #' + count,
    type: 'Playlist',
    cover: 'album3.jpg',
    color: '#3a0a3a',
    description: 'Custom curated music library',
    genre: 'electronic',
    trackIds: []
  };

  S.customPlaylists.push(newPl);
  saveState();
  renderSidebar();
  openDetail(newPl);
  showToast('✨ Created New Playlist!');
}

function addCurrentCollectionToLibrary() {
  if (!detailCollection) return;
  showToast(`❤️ Added ${detailCollection.title} to your library`);
}

// ─────────────────────────────────────────────────────────────────────
// DETAIL PAGE
// ─────────────────────────────────────────────────────────────────────
let detailCollection = null;

function openDetail(item) {
  detailCollection = item;
  document.getElementById('detail-cover').src        = item.cover;
  document.getElementById('detail-title').textContent = item.title;
  document.getElementById('detail-type').textContent  = item.type || 'Album';

  const bg = document.getElementById('detail-header-bg');
  bg.style.background = `linear-gradient(180deg, ${item.color||'#333'} 0%, var(--bg-base) 60%)`;
  document.getElementById('detail-header').style.background = item.color || '#333';

  let tracks = resolveTracksForItem(item);
  const totalSec = tracks.reduce((s,t)=>s+(t.duration||0),0);
  document.getElementById('detail-meta').textContent =
    `${item.artist||'Soundify'} • ${item.year||'2024'} • ${tracks.length} songs, ${fmtTime(totalSec)}`;

  renderTrackList(document.getElementById('detail-tracks'), tracks);

  document.getElementById('detail-play-fab').onclick = () => playCollection(item);
  showPage('detail');
}

function resolveTracksForItem(item) {
  if (item.tracks) return item.tracks.map(t => {
    return {...t, cover:item.cover, color:item.color, genre:item.genre, albumId:item.id};
  });
  if (item.trackIds) return item.trackIds.map(id => getTrackById(id)).filter(Boolean);
  if (item.id && item.id.startsWith('t')) return [item];
  return [];
}

// ─────────────────────────────────────────────────────────────────────
// HOME PAGE & CARDS
// ─────────────────────────────────────────────────────────────────────
function renderHomePage() {
  renderQuickPicks();
  renderCardGrid('featured-grid', ALBUMS);
  renderCardGrid('recent-grid', [...DEFAULT_PLAYLISTS, ...ALBUMS].slice(0, 6));
  renderCardGrid('made-for-you-grid', DEFAULT_PLAYLISTS);
}

function renderQuickPicks() {
  const wrap = document.getElementById('quick-picks');
  wrap.innerHTML = '';
  [...ALBUMS, ...DEFAULT_PLAYLISTS].slice(0, 6).forEach(item => {
    const d = document.createElement('div');
    d.className = 'quick-pick';
    d.innerHTML = `
      <img src="${item.cover}" alt="${item.title}" loading="lazy"/>
      <span class="quick-pick-title">${item.title}</span>
      <button class="quick-pick-play" aria-label="Play ${item.title}">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>`;
    d.onclick = () => openDetail(item);
    d.querySelector('.quick-pick-play').onclick = e => { e.stopPropagation(); playCollection(item); };
    wrap.appendChild(d);
  });
}

function renderCardGrid(id, items) {
  const g = document.getElementById(id);
  if (!g) return;
  g.innerHTML = '';
  items.forEach(item => g.appendChild(makeCard(item)));
}

function makeCard(item) {
  const d = document.createElement('div');
  d.className = 'card';
  d.innerHTML = `
    <div class="card-cover-wrap">
      <img src="${item.cover}" alt="${item.title}" loading="lazy"/>
      <button class="card-play" aria-label="Play ${item.title}">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </div>
    <p class="card-title">${item.title}</p>
    <p class="card-subtitle">${item.artist || item.description || item.type}</p>`;
  d.onclick = () => openDetail(item);
  d.querySelector('.card-play').onclick = e => { e.stopPropagation(); playCollection(item); };
  return d;
}

// ─────────────────────────────────────────────────────────────────────
// SEARCH
// ─────────────────────────────────────────────────────────────────────
function renderSearchPage() {
  const g = document.getElementById('categories-grid');
  g.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const d = document.createElement('div');
    d.className = 'category-card';
    d.style.background = cat.color;
    d.innerHTML = `<h3>${cat.name}</h3>`;
    d.onclick = () => showToast(`🎵 Browsing ${cat.name}`);
    g.appendChild(d);
  });
}

function handleSearch(q) {
  const res    = document.getElementById('search-results');
  const browse = document.getElementById('browse-section');
  const grid   = document.getElementById('search-results-grid');
  if (!q.trim()) { res.classList.add('hidden'); browse.style.display = ''; return; }
  browse.style.display = 'none';
  res.classList.remove('hidden');
  grid.innerHTML = '';
  const lq = q.toLowerCase();
  const hits = [
    ...ALBUMS.filter(a => a.title.toLowerCase().includes(lq) || a.artist.toLowerCase().includes(lq)),
    ...DEFAULT_PLAYLISTS.filter(p => p.title.toLowerCase().includes(lq)),
    ...ALL_TRACKS.filter(t => t.title.toLowerCase().includes(lq) || t.artist.toLowerCase().includes(lq))
      .map(t => ({...t, description:t.artist})),
  ];
  if (!hits.length) { grid.innerHTML = '<p style="color:#b3b3b3;grid-column:1/-1;padding:20px">No results found.</p>'; return; }
  hits.slice(0, 12).forEach(item => {
    const card = makeCard(item);
    card.onclick = () => item.tracks || item.trackIds ? openDetail(item) : playTrack(getTrackById(item.id)||item, [item], 0);
    grid.appendChild(card);
  });
}

// ─────────────────────────────────────────────────────────────────────
// LIBRARY PAGE
// ─────────────────────────────────────────────────────────────────────
function renderLibraryPage() { 
  populateLibrary([...S.customPlaylists, ...ALBUMS, ...DEFAULT_PLAYLISTS]); 
}

function populateLibrary(items) {
  const list = document.getElementById('library-list');
  list.innerHTML = '';
  items.forEach(item => {
    const d = document.createElement('div');
    d.className = 'library-item';
    d.innerHTML = `
      <img src="${item.cover}" alt="${item.title}" loading="lazy"/>
      <div class="library-item-info">
        <p class="library-item-name">${item.title}</p>
        <p class="library-item-sub">${item.type || 'Collection'} • ${item.artist||'Created by You'}</p>
      </div>`;
    d.onclick = () => openDetail(item);
    list.appendChild(d);
  });
}

function filterLibrary(type, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const map = {all:[...S.customPlaylists, ...ALBUMS, ...DEFAULT_PLAYLISTS], playlists:[...S.customPlaylists, ...DEFAULT_PLAYLISTS], albums:ALBUMS};
  populateLibrary(map[type] || []);
}

// ─────────────────────────────────────────────────────────────────────
// LIKED SONGS
// ─────────────────────────────────────────────────────────────────────
function renderLikedPage() {
  const liked = ALL_TRACKS.filter(t => S.liked.has(t.id));
  document.getElementById('liked-count').textContent = liked.length;
  renderTrackList(document.getElementById('liked-tracks'), liked);
}

function playLiked() {
  const liked = ALL_TRACKS.filter(t => S.liked.has(t.id));
  if (liked.length) playTrack(liked[0], liked, 0);
}

// ─────────────────────────────────────────────────────────────────────
// TRACK LIST MAKER
// ─────────────────────────────────────────────────────────────────────
function renderTrackList(container, tracks) {
  container.innerHTML = `
    <div class="track-header">
      <span style="text-align:center">#</span>
      <span>Title</span>
      <span>Album</span>
      <span>Date Added</span>
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
    </div>`;
  tracks.forEach((track, i) => container.appendChild(makeTrackRow(track, i, tracks)));
}

function makeTrackRow(track, idx, playlist) {
  const row = document.createElement('div');
  row.className = 'track-row' + (S.track && S.track.id === track.id ? ' playing' : '');
  row.id = `tr-${track.id}`;
  row.innerHTML = `
    <div class="track-num-cell">
      <span class="track-num">${idx+1}</span>
      <span class="track-play-btn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
      <div class="playing-bars"><div class="bar"></div><div class="bar"></div><div class="bar"></div></div>
    </div>
    <div class="track-title-wrap">
      <img class="track-img" src="${track.cover}" alt="${track.title}" loading="lazy"/>
      <div class="track-info">
        <p class="track-title">${track.title}</p>
        <p class="track-artist">${track.artist}</p>
      </div>
    </div>
    <span class="track-album">${track.album||''}</span>
    <span style="font-size:.8rem;color:var(--text-secondary)">5 days ago</span>
    <span class="track-duration">${fmtTime(track.duration)}</span>`;
  row.ondblclick = () => playTrack(track, playlist, idx);
  row.onclick    = () => {
    document.querySelectorAll('.track-row.selected').forEach(r=>r.classList.remove('selected'));
    row.classList.add('selected');
  };
  return row;
}

// ─────────────────────────────────────────────────────────────────────
// PLAYBACK ENGINE
// ─────────────────────────────────────────────────────────────────────
function playTrack(track, playlist, index) {
  initAudio();

  S.track    = track;
  S.playlist = playlist;
  S.index    = index;
  S.playing  = true;
  S.progress = 0;

  // Track Earnings logic
  S.earnings.streams++;
  S.earnings.total = +(S.earnings.total + 0.004).toFixed(4);
  saveState();
  updateDashboard();

  updatePlayerUI();
  updateTrackHighlights();
  updateQueuePanel();
  startProgressTimer();
  showToast(`▶ ${track.title}`);

  if (track.genre === 'local') {
    // Play actual uploaded binary audio
    playLocalFileBuffer(track.id);
  } else {
    // Play real Web Audio synthesized soundscapes
    startMusicForGenre(track.genre || 'electronic');
  }

  if (audioCtx.state === 'suspended') audioCtx.resume();
  document.getElementById('np-cover-wrap').classList.add('spinning');
}

function playCollection(item) {
  const tracks = resolveTracksForItem(item);
  if (tracks.length) playTrack(tracks[0], tracks, 0);
}

function togglePlay() {
  if (!S.track) return;
  initAudio();
  S.playing = !S.playing;

  if (S.playing) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    if (S.track.genre === 'local') {
      playLocalFileBuffer(S.track.id);
    } else {
      startMusicForGenre(S.track.genre || 'electronic');
    }
    startProgressTimer();
    document.getElementById('np-cover-wrap').classList.add('spinning');
    showToast('▶ Playing');
  } else {
    stopAllAudio();
    clearInterval(S.timer);
    document.getElementById('np-cover-wrap').classList.remove('spinning');
    showToast('⏸ Paused');
  }
  updatePlayerUI();
}

function nextTrack() {
  if (!S.playlist.length) return;
  const nextIdx = S.shuffle
    ? Math.floor(Math.random() * S.playlist.length)
    : (S.index + 1) % S.playlist.length;
  playTrack(S.playlist[nextIdx], S.playlist, nextIdx);
}

function prevTrack() {
  if (!S.playlist.length) return;
  if (S.progress > 0.05) { S.progress = 0; updateProgress(); return; }
  const prevIdx = (S.index - 1 + S.playlist.length) % S.playlist.length;
  playTrack(S.playlist[prevIdx], S.playlist, prevIdx);
}

function toggleShuffle() {
  S.shuffle = !S.shuffle;
  document.querySelectorAll('#btn-shuffle,.shuffle-btn').forEach(b => b.classList.toggle('active', S.shuffle));
  showToast(S.shuffle ? '🔀 Shuffle on' : '🔀 Shuffle off');
}

function toggleRepeat() {
  S.repeat = !S.repeat;
  document.getElementById('btn-repeat').classList.toggle('active', S.repeat);
  showToast(S.repeat ? '🔁 Repeat on' : '🔁 Repeat off');
}

function toggleMute() {
  S.muted = !S.muted;
  setAudioVolume(S.muted ? 0 : S.volume);
  document.getElementById('vol-icon').classList.toggle('hidden', S.muted);
  document.getElementById('vol-mute-icon').classList.toggle('hidden', !S.muted);
  updateVolumeBar();
}

function setVolume(e) {
  const bar  = document.getElementById('volume-bar');
  const rect = bar.getBoundingClientRect();
  S.volume   = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  S.muted    = false;
  document.getElementById('vol-icon').classList.remove('hidden');
  document.getElementById('vol-mute-icon').classList.add('hidden');
  setAudioVolume(S.volume);
  updateVolumeBar();
}

function seekTo(e) {
  const bar  = document.getElementById('progress-bar');
  const rect = bar.getBoundingClientRect();
  S.progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  updateProgress();
}

function toggleLike() {
  if (!S.track) return;
  const id = S.track.id;
  if (S.liked.has(id)) {
    S.liked.delete(id);
    document.getElementById('np-heart').classList.remove('liked');
    showToast('💔 Removed from Liked Songs');
  } else {
    S.liked.add(id);
    document.getElementById('np-heart').classList.add('liked');
    showToast('💚 Added to Liked Songs');
  }
  saveState();
  renderLikedPage();
}

// ─────────────────────────────────────────────────────────────────────
// TIMERS & UI UPDATES
// ─────────────────────────────────────────────────────────────────────
function startProgressTimer() {
  clearInterval(S.timer);
  if (!S.track || !S.playing) return;
  const dur  = S.track.duration || 180;
  const step = 1 / (dur * 4);
  S.timer = setInterval(() => {
    if (!S.playing) return;
    S.progress = Math.min(1, S.progress + step);
    updateProgress();
    if (S.progress >= 1) {
      clearInterval(S.timer);
      S.repeat ? (() => { S.progress=0; startProgressTimer(); })() : nextTrack();
    }
  }, 250);
}

function updatePlayerUI() {
  const t = S.track;
  if (!t) return;
  document.getElementById('np-cover').src         = t.cover;
  document.getElementById('np-title').textContent  = t.title;
  document.getElementById('np-artist').textContent = t.artist;
  document.getElementById('play-icon').classList.toggle('hidden',  S.playing);
  document.getElementById('pause-icon').classList.toggle('hidden', !S.playing);
  document.getElementById('np-heart').classList.toggle('liked', S.liked.has(t.id));
  updateProgress();
  updateVolumeBar();
}

function updateProgress() {
  const t   = S.track;
  const dur = t ? (t.duration||0) : 0;
  const cur = S.progress * dur;
  const pct = (S.progress * 100).toFixed(2) + '%';
  document.getElementById('progress-fill').style.width = pct;
  document.getElementById('progress-thumb').style.left = pct;
  document.getElementById('time-current').textContent  = fmtTime(cur);
  document.getElementById('time-total').textContent    = fmtTime(dur);
}

function updateVolumeBar() {
  const vol = S.muted ? 0 : S.volume;
  const pct = (vol * 100).toFixed(1) + '%';
  document.getElementById('volume-fill').style.width = pct;
  document.getElementById('volume-thumb').style.left = pct;
}

function updateTrackHighlights() {
  document.querySelectorAll('.track-row').forEach(r => r.classList.remove('playing'));
  if (S.track) {
    const el = document.getElementById(`tr-${S.track.id}`);
    if (el) el.classList.add('playing');
  }
}

// ─────────────────────────────────────────────────────────────────────
// QUEUE & SYNTH POPUPS
// ─────────────────────────────────────────────────────────────────────
function toggleQueue() {
  const p = document.getElementById('queue-panel');
  p.classList.toggle('hidden');
  if (!p.classList.contains('hidden')) updateQueuePanel();
}

function updateQueuePanel() {
  const nowEl  = document.getElementById('queue-now');
  const nextEl = document.getElementById('queue-next');
  nowEl.innerHTML  = S.track ? queueTrackHTML(S.track) : '<p style="color:#b3b3b3;font-size:.85rem">Nothing playing</p>';
  nextEl.innerHTML = '';
  S.playlist.slice(S.index + 1, S.index + 7).forEach(t => { nextEl.innerHTML += queueTrackHTML(t); });
}

function queueTrackHTML(t) {
  return `<div class="queue-track" ondblclick="playTrack(getTrackById('${t.id}')||${JSON.stringify(t).replace(/</g,'\\u003c')}, S.playlist, ${S.playlist.findIndex(x=>x.id===t.id)})">
    <img src="${t.cover}" alt="${t.title}"/>
    <div><p class="queue-track-title">${t.title}</p><p class="queue-track-artist">${t.artist}</p></div>
  </div>`;
}

// Synth Settings Popover toggle
function toggleSynthPanel() {
  const panel = document.getElementById('synth-dsp-panel');
  panel.classList.toggle('hidden');
}

// Handle DSP sliders input dynamically
function setupDSPEvents() {
  const sliderTempo  = document.getElementById('slider-tempo');
  const sliderCutoff = document.getElementById('slider-cutoff');
  const sliderDelay  = document.getElementById('slider-delay');
  const selectWave  = document.getElementById('select-wave');

  if (sliderTempo) {
    sliderTempo.oninput = (e) => {
      dspSettings.tempo = parseInt(e.target.value);
      document.getElementById('val-tempo').textContent = dspSettings.tempo;
      if (S.playing && S.track && S.track.genre !== 'local') {
        // Live update sequencer tempo
        startMusicForGenre(S.track.genre);
      }
    };
  }

  if (sliderCutoff) {
    sliderCutoff.oninput = (e) => {
      dspSettings.cutoff = parseInt(e.target.value);
      document.getElementById('val-cutoff').textContent = dspSettings.cutoff;
      if (filterNode) {
        // Live change Biquad lowpass cutoff frequency
        filterNode.frequency.setValueAtTime(dspSettings.cutoff, audioCtx.currentTime);
      }
    };
  }

  if (sliderDelay) {
    sliderDelay.oninput = (e) => {
      dspSettings.delayFeedback = parseFloat(e.target.value) / 100;
      document.getElementById('val-delay').textContent = e.target.value;
      if (delayGainNode) {
        // Live change echo volume
        delayGainNode.gain.setValueAtTime(dspSettings.delayFeedback, audioCtx.currentTime);
      }
    };
  }

  if (selectWave) {
    selectWave.onchange = (e) => {
      dspSettings.wave = e.target.value;
    };
  }
}

// ─────────────────────────────────────────────────────────────────────
// PAGE ROUTING & NAVIGATION
// ─────────────────────────────────────────────────────────────────────
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  const pg = document.getElementById('page-' + name);
  if (pg) { pg.classList.remove('hidden'); pg.scrollTop = 0; }
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const nav = document.getElementById('nav-' + name);
  if (nav) nav.classList.add('active');
  if (S.historyStack[S.historyIdx] !== name) {
    S.historyStack = S.historyStack.slice(0, S.historyIdx + 1);
    S.historyStack.push(name);
    S.historyIdx++;
  }
  if (name === 'premium') setTimeout(drawEarningsChart, 100);
}

function historyBack()    { if (S.historyIdx > 0) { S.historyIdx--; showPage(S.historyStack[S.historyIdx]); } }
function historyForward() { if (S.historyIdx < S.historyStack.length - 1) { S.historyIdx++; showPage(S.historyStack[S.historyIdx]); } }

// ─────────────────────────────────────────────────────────────────────
// PREMIUM, DASHBOARD & INITIALIZATION CALLS
// ─────────────────────────────────────────────────────────────────────
function startPremium(plan) {
  showToast(`🎉 ${plan} Premium trial activated! 30 days free.`);
  setTimeout(() => showEarnModal('refer'), 2000);
}

const EARN_MODALS = {
  stream: {
    title: '🎵 Upload & Earn',
    body: `<p>Upload music to Soundify and earn <strong style="color:#1DB954">$0.004 per stream</strong>.</p>
           <input class="modal-input" type="text" placeholder="Artist name..." />
           <input class="modal-input" type="file" accept="audio/*" style="padding:10px"/>`,
    action: 'Upload My Music',
    fn: () => showToast('🚀 Music uploaded! Earning starts now.')
  },
  refer: {
    title: '👥 Refer & Earn $10',
    body: `<p>Share your link. Get <strong style="color:#1DB954">$10 cash</strong> for every signup.</p>
           <div class="referral-code" onclick="copyReferral()">SND-X7K2P9</div>`,
    action: 'Share My Link',
    fn: () => { S.earnings.referrals++; S.earnings.total = +(S.earnings.total + 10).toFixed(2); saveState(); updateDashboard(); showToast('🎉 Referral link copied!'); closeEarnModal(); }
  },
  playlist: {
    title: '📋 Curate Playlists',
    body: `<p>Monetize custom playlists. Get placements from records & labels.</p>
           <input class="modal-input" type="text" placeholder="Playlist title..." />`,
    action: 'Create & Monetize',
    fn: () => { S.earnings.playlists++; S.earnings.total = +(S.earnings.total + 75).toFixed(2); saveState(); updateDashboard(); showToast('📋 Curator account linked!'); closeEarnModal(); }
  },
  podcast: {
    title: '🎙️ Start Podcast',
    body: `<p>Record podcasts directly in the app. Earn through ads & listeners.</p>
           <input class="modal-input" type="text" placeholder="Podcast title..." />`,
    action: 'Launch Podcast',
    fn: () => { showToast('🎙️ Podcast submitted for validation!'); closeEarnModal(); }
  },
};

function showEarnModal(type) {
  const cfg = EARN_MODALS[type];
  if (!cfg) return;
  const content = document.getElementById('earn-modal-content');
  content.innerHTML = `
    <h2>${cfg.title}</h2>
    ${cfg.body}
    <button class="modal-btn" onclick="earnModalAction('${type}')">${cfg.action}</button>
    <a class="modal-link" href="#" onclick="closeEarnModal();return false">Maybe later</a>`;
  document.getElementById('earn-modal-overlay').classList.remove('hidden');
}

function earnModalAction(type) {
  const fn = EARN_MODALS[type]?.fn;
  if (fn) fn();
}

function copyReferral() {
  navigator.clipboard?.writeText('https://soundify.app/ref/SND-X7K2P9').catch(()=>{});
  showToast('📋 Referral code copied!');
}

function closeEarnModal() {
  document.getElementById('earn-modal-overlay').classList.add('hidden');
}

function updateDashboard() {
  const el_total     = document.getElementById('dash-total');
  const el_streams   = document.getElementById('dash-streams');
  const el_referrals = document.getElementById('dash-referrals');
  const el_playlists = document.getElementById('dash-playlists');
  if (el_total)     el_total.textContent     = '$' + S.earnings.total.toFixed(2);
  if (el_streams)   el_streams.textContent   = S.earnings.streams.toLocaleString();
  if (el_referrals) el_referrals.textContent = S.earnings.referrals;
  if (el_playlists) el_playlists.textContent = S.earnings.playlists;
}

// ─────────────────────────────────────────────────────────────────────
// GLOBAL INITIALIZATION & BINDINGS
// ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  setGreeting();
  renderSidebar();
  renderHomePage();
  renderSearchPage();
  renderLibraryPage();
  renderLikedPage();
  updatePlayerUI();
  startVisualizer();
  updateDashboard();
  setupLocalFileHandlers();
  setupDSPEvents();

  // Load first track for player preview
  const firstTrack = ALL_TRACKS[0];
  S.track    = firstTrack;
  S.playlist = ALBUMS[0].tracks.map(t => ({...t, cover:ALBUMS[0].cover, color:ALBUMS[0].color, genre:ALBUMS[0].genre}));
  S.index    = 0;
  S.playing  = false;
  updatePlayerUI();

  document.addEventListener('click', resumeAudioCtx, {once: true});
});

function setGreeting() {
  const h = new Date().getHours();
  const g = h < 12 ? 'Good morning ☀️' : h < 17 ? 'Good afternoon 🎵' : 'Good evening 🌙';
  document.getElementById('greeting-text').textContent = g;
}

function setAudioVolume(vol) {
  if (!masterGain) return;
  masterGain.gain.setValueAtTime(vol, audioCtx.currentTime);
}

function resumeAudioCtx() {
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().then(() => {
      if (S.playing && S.track && S.track.genre !== 'local') startMusicForGenre(S.track.genre);
    });
  }
}

// ─────────────────────────────────────────────────────────────────────
// CANVAS LINE CHART
// ─────────────────────────────────────────────────────────────────────
function drawEarningsChart() {
  const canvas = document.getElementById('earnings-canvas');
  if (!canvas) return;
  canvas.width  = canvas.offsetWidth  || 700;
  canvas.height = 140;
  const ctx  = canvas.getContext('2d');
  const w    = canvas.width;
  const h    = canvas.height;
  const data = [0.2, 0.8, 1.4, 0.9, 2.1, 1.7, 3.2, 2.8, 4.5, 3.9, 5.2, 6.1];
  const maxV = Math.max(...data) * 1.1;
  const step = w / (data.length - 1);

  ctx.clearRect(0, 0, w, h);

  // Area fill
  const areaGrad = ctx.createLinearGradient(0, 0, 0, h);
  areaGrad.addColorStop(0, 'rgba(29,185,84,0.35)');
  areaGrad.addColorStop(1, 'rgba(29,185,84,0)');
  ctx.beginPath();
  data.forEach((v, i) => {
    const x = i * step;
    const y = h - (v / maxV) * h * 0.85 - 10;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
  ctx.fillStyle = areaGrad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.strokeStyle = '#1DB954';
  ctx.lineWidth   = 2.5;
  ctx.lineJoin    = 'round';
  data.forEach((v, i) => {
    const x = i * step;
    const y = h - (v / maxV) * h * 0.85 - 10;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Dots + labels
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  data.forEach((v, i) => {
    const x = i * step;
    const y = h - (v / maxV) * h * 0.85 - 10;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#1DB954';
    ctx.fill();
    ctx.fillStyle = '#b3b3b3';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(months[i], x, h - 2);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.fillText('$' + v.toFixed(1), x, y - 8);
  });
}

// ─────────────────────────────────────────────────────────────────────
// DRAG-SEEK (progress & volume)
// ─────────────────────────────────────────────────────────────────────
(function () {
  let drag = false;
  const bar = document.getElementById('progress-bar');
  bar.addEventListener('mousedown', e => { drag = true; seekTo(e); });
  document.addEventListener('mousemove', e => { if (!drag) return; seekTo(e); });
  document.addEventListener('mouseup',   () => { drag = false; });
})();

(function () {
  let drag = false;
  const bar = document.getElementById('volume-bar');
  bar.addEventListener('mousedown', e => { drag = true; setVolume(e); });
  document.addEventListener('mousemove', e => { if (!drag) return; setVolume(e); });
  document.addEventListener('mouseup',   () => { drag = false; });
})();

// ─────────────────────────────────────────────────────────────────────
// SHORTCUTS & UTILS
// ─────────────────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (['INPUT','TEXTAREA'].includes(e.target.tagName)) return;
  switch (e.code) {
    case 'Space':      e.preventDefault(); togglePlay();    break;
    case 'ArrowRight': if (e.altKey) nextTrack();          break;
    case 'ArrowLeft':  if (e.altKey) prevTrack();          break;
    case 'KeyM':                           toggleMute();    break;
    case 'KeyS':       if (e.altKey)       toggleShuffle(); break;
    case 'KeyR':       if (e.altKey)       toggleRepeat();  break;
    case 'KeyQ':       if (e.altKey)       toggleQueue();   break;
  }
});

function fmtTime(s) {
  s = Math.floor(s || 0);
  return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
}

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

window.addEventListener('resize', () => {
  const pg = document.getElementById('page-premium');
  if (pg && !pg.classList.contains('hidden')) drawEarningsChart();
});
