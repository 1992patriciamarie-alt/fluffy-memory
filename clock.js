// clock.js - multi-timezone digital clock
const initialZones = ['UTC','America/New_York','Europe/London','Asia/Tokyo'];
const tzSelect = document.getElementById('tz-select');
const addBtn = document.getElementById('add-btn');
const addLocalBtn = document.getElementById('add-local');
const clocksEl = document.getElementById('clocks');

// Try to populate timezone list from the platform if available
function getAllTimeZones(){
  if (typeof Intl === 'object' && typeof Intl.supportedValuesOf === 'function'){
    try { return Intl.supportedValuesOf('timeZone'); } catch(e) {}
  }
  // Fallback: a compact list of common zones
  return [
    'UTC','America/New_York','America/Chicago','America/Denver','America/Los_Angeles',
    'Europe/London','Europe/Paris','Europe/Berlin','Europe/Madrid',
    'Asia/Tokyo','Asia/Shanghai','Asia/Kolkata','Asia/Singapore',
    'Australia/Sydney'
  ];
}

const allZones = getAllTimeZones();
allZones.forEach(tz => {
  const opt = document.createElement('option'); opt.value = tz; opt.textContent = tz.replace('_',' ');
  tzSelect.appendChild(opt);
});

function formatTimeForZone(tz){
  const now = new Date();
  const time = now.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false, timeZone:tz});
  const date = now.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric', timeZone:tz});
  return {time,date};
}

function createClockCard(tz){
  const card = document.createElement('article');
  card.className = 'clock-card';
  card.dataset.tz = tz;

  const header = document.createElement('div'); header.className = 'clock-header';
  const name = document.createElement('div'); name.className = 'tz-name'; name.textContent = tz.replace('_',' ');
  const remove = document.createElement('button'); remove.className = 'remove-btn'; remove.textContent = 'Remove';
  remove.addEventListener('click', () => card.remove());
  header.appendChild(name); header.appendChild(remove);

  const timeEl = document.createElement('div'); timeEl.className = 'time'; timeEl.textContent = '—:—:—';
  const dateEl = document.createElement('div'); dateEl.className = 'date'; dateEl.textContent = '';

  card.appendChild(header); card.appendChild(timeEl); card.appendChild(dateEl);
  clocksEl.appendChild(card);
  updateClockCard(card);
}

function updateClockCard(card){
  const tz = card.dataset.tz;
  try{
    const {time,date} = formatTimeForZone(tz);
    card.querySelector('.time').textContent = time;
    card.querySelector('.date').textContent = date;
  }catch(e){
    card.querySelector('.time').textContent = 'Invalid TZ';
    card.querySelector('.date').textContent = '';
  }
}

function addZone(tz){
  // avoid duplicates
  if ([...clocksEl.children].some(c=>c.dataset.tz===tz)) return;
  createClockCard(tz);
}

addBtn.addEventListener('click', ()=>{
  addZone(tzSelect.value);
});

addLocalBtn.addEventListener('click', ()=>{
  addZone(Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC');
});

// seed initial zones
initialZones.forEach(addZone);

// update loop
setInterval(()=>{
  [...clocksEl.children].forEach(updateClockCard);
},1000);
