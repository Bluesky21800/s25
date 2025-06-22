/* ---------- CONFIG  ---------- */
const imageNames = [
    'mem1.jpeg','mem2.jpeg','mem3.jpeg','mem4.jpeg','mem5.jpeg','mem6.jpeg',
    'mem7.jpeg','mem8.jpeg','mem9.jpeg','mem10.jpeg','mem11.jpeg','mem12.jpeg',
    'mem13.jpeg','mem14.jpeg','mem15.jpeg','mem16.jpeg','mem17.jpeg','mem18.jpeg'
  ];                    // 18 unique → duplicated to 36 cards
  
  /* ---------- UTIL ---------- */
  function shuffle(arr){
    for(let i=arr.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  }
  
  /* ---------- GAME ---------- */
  function setupMemoryGame(){
    const board=document.getElementById('game-board');
    if(!board) return;                 // safety check
  
    board.innerHTML='';                // reset on re-entry
    const deck=shuffle([...imageNames,...imageNames]);
    let first=null, lock=false;
  
    deck.forEach(name=>{
      const card=document.createElement('div');
      card.className='memory-card';
      card.dataset.name=name;
  
      const img=document.createElement('img');
      img.src=`images/${name}`;        // adjust if images are elsewhere
      img.alt='memory';
      card.appendChild(img);
  
      card.onclick=()=>{
        if(lock||card.classList.contains('flipped','matched')) return;
        card.classList.add('flipped');
  
        if(!first){
          first=card;
        }else{
          lock=true;
          if(first.dataset.name===card.dataset.name){
            first.classList.add('matched');
            card.classList.add('matched');
            first=null; lock=false;
          }else{
            setTimeout(()=>{
              first.classList.remove('flipped');
              card.classList.remove('flipped');
              first=null; lock=false;
            },800);
          }
        }
      };
      board.appendChild(card);
    });
  }
  
  /* ---------- SLIDE NAV ---------- */
  const slides=document.querySelectorAll('.slide');
  const nextBtns=document.querySelectorAll('.next-btn');
  const prevBtns=document.querySelectorAll('.prev-btn');
  let current=0;
  
  nextBtns.forEach(btn=>btn.onclick=()=>showSlide(current+1));
  prevBtns.forEach(btn=>btn.onclick=()=>showSlide(current-1));
  
  function showSlide(n){
    slides[current].classList.remove('active');
    current=Math.max(0,Math.min(n,slides.length-1));
    slides[current].classList.add('active');
    if(slides[current].id==='slide3') setupMemoryGame();   // initialise once visible
  }
  
  /* ---------- FIRST LOAD ---------- */
  showSlide(0);                         // show first slide on page load

/* ------------ HEART CONFETTI (fixed) ------------ */
function spawnHearts(count = 30) {

    // store each emoji as a separate array element
    const hearts = ["💗","💖","💕","💞","💘","💝"];
  
    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      span.className = 'heart';
  
      // pick one emoji at random
      span.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  
      // randomise look & motion
      span.style.left = Math.random() * 100 + 'vw';
      span.style.fontSize = (Math.random() * 1.4 + 0.6).toFixed(2) + 'rem';
      span.style.animationDuration = (6 + Math.random() * 6).toFixed(2) + 's';
      span.style.animationDelay = (Math.random() * 5).toFixed(2) + 's';
  
      document.body.appendChild(span);
    }
  }
  
  window.addEventListener('load', () => spawnHearts(30));
  
  