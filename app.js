    let currentLanguage = 'bs';
    let phoneTimer = null;
	let viewers = 0;
    let adminLanguage = 'bs';
    let currentAdminCategory = 'history';
    let editingQuestionIndex = null;
    let soundEnabled = true;
    let currentTheme = 'dark';
    let gameStats = {
      totalGames: 0,
      totalScore: 0,
      bestScore: 0,
      currentStreak: 0,
      lastGameWon: false,
      badges: []
    };
    let wrongQuestionData = null;

function hashString(str) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }

  return hash.toString(36);
}

function makeQuestionId(q) {
  return hashString(q.question);
}

function getSeenQuestions() {
  return JSON.parse(localStorage.getItem("seenQuestions") || "[]");
}

function saveSeenQuestion(id) {
  const seen = getSeenQuestions();

  seen.push(id);

  if (seen.length > 3000) {
    seen.splice(0, 500);
  }

  localStorage.setItem("seenQuestions", JSON.stringify(seen));
}

    const translations = {
      bs: {
        question: "Pitanje",
        of: "od",
        congratulations: "Čestitamo!",
        gameOver: "Kraj Igre",
        youWon: "Osvojili ste",
        wrongAnswer: "Nažalost, pogrešan odgovor.",
        incredible: "Nevjerovatno! Osvojili ste milion!",
        playAgain: "Igraj Ponovo",
        close: "Zatvori",
        phoneTitle: "📞 Phone a Friend",
        audienceTitle: "👥 Ask the Audience",
        audienceResults: "Rezultati glasanja publike:",
        friendSays: "",
        calling: "Zovem prijatelja...",
        explanation: "Objašnjenje",
        commonMistake: "Najčešća greška",
        correctAnswer: "Tačan odgovor",
        statistics: "Statistika",
        totalGames: "Ukupno igara",
        avgScore: "Prosječan rezultat",
        bestScore: "Najbolji rezultat",
        currentStreak: "Trenutni niz",
        badges: "Bedževi",
        share: "Podijeli"
      },
  ge: {
        question: "Pitanje",
        of: "od",
        congratulations: "Čestitamo!",
        gameOver: "Kraj Igre",
        youWon: "Osvojili ste",
        wrongAnswer: "Nažalost, pogrešan odgovor.",
        incredible: "Nevjerovatno! Osvojili ste milion!",
        playAgain: "Igraj Ponovo",
        close: "Zatvori",
        phoneTitle: "📞 Phone a Friend",
        audienceTitle: "👥 Ask the Audience",
        audienceResults: "Rezultati glasanja publike:",
        friendSays: "",
        calling: "Zovem prijatelja...",
        explanation: "Objašnjenje",
        commonMistake: "Najčešća greška",
        correctAnswer: "Tačan odgovor",
        statistics: "Statistika",
        totalGames: "Ukupno igara",
        avgScore: "Prosječan rezultat",
        bestScore: "Najbolji rezultat",
        currentStreak: "Trenutni niz",
        badges: "Bedževi",
        share: "Podijeli"
      },
	 gk: {
        question: "Pitanje",
        of: "od",
        congratulations: "Čestitamo!",
        gameOver: "Kraj Igre",
        youWon: "Osvojili ste",
        wrongAnswer: "Nažalost, pogrešan odgovor.",
        incredible: "Nevjerovatno! Osvojili ste milion!",
        playAgain: "Igraj Ponovo",
        close: "Zatvori",
        phoneTitle: "📞 Phone a Friend",
        audienceTitle: "👥 Ask the Audience",
        audienceResults: "Rezultati glasanja publike:",
        friendSays: "",
        calling: "Zovem prijatelja...",
        explanation: "Objašnjenje",
        commonMistake: "Najčešća greška",
        correctAnswer: "Tačan odgovor",
        statistics: "Statistika",
        totalGames: "Ukupno igara",
        avgScore: "Prosječan rezultat",
        bestScore: "Najbolji rezultat",
        currentStreak: "Trenutni niz",
        badges: "Bedževi",
        share: "Podijeli"
      },  
	  
      en: {
        question: "Question",
        of: "of",
        congratulations: "Congratulations!",
        gameOver: "Game Over",
        youWon: "You won",
        wrongAnswer: "Unfortunately, wrong answer.",
        incredible: "Incredible! You won a million!",
        playAgain: "Play Again",
        close: "Close",
        phoneTitle: "📞 Phone a Friend",
        audienceTitle: "👥 Ask the Audience",
        audienceResults: "Audience Poll Results:",
        friendSays: "",
        calling: "Calling friend...",
        explanation: "Explanation",
        commonMistake: "Common Mistake",
        correctAnswer: "Correct Answer",
        statistics: "Statistics",
        totalGames: "Total Games",
        avgScore: "Average Score",
        bestScore: "Best Score",
        currentStreak: "Current Streak",
        badges: "Badges",
        share: "Share"
      }
    };
    
    // Sound Functions
    function playSound(soundId) {
      if (!soundEnabled) return;
      const sound = document.getElementById(soundId);
      if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
      }
    }
    
    // Confetti Animation
  function createConfetti() {
  const colors = [
    '#FFD700', '#FFC300', '#FFDF00', '#FFFFFF',
    '#fbbf24', '#f59e0b', '#3b82f6', '#8b5cf6',
    '#10b981', '#ef4444'
  ];

  for (let i = 0; i < 120; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';

      // 📍 pozicija
      confetti.style.left = Math.random() * 100 + '%';

      // 📏 RANDOM veličina (KLJUČ)
      const size = Math.random() * 6 + 4;
      confetti.style.width = size + 'px';
      confetti.style.height = size + 'px';

      // 🎨 boja
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      // ⏱ random trajanje pada
      confetti.style.animationDuration = (Math.random() * 2 + 2.5) + 's';

      // 🔄 random rotacija start
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

      // ✨ malo “shine” efekta
      confetti.style.boxShadow = "0 0 6px rgba(255,215,0,0.6)";

      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 5000);
    }, i * 12); // gušći pad = bolji efekat
  }
}
    
    // Load stats from localStorage
    function loadStats() {
      const saved = localStorage.getItem('millionaireStats');
      if (saved) {
        gameStats = JSON.parse(saved);
      }
    }
    
    // Save stats to localStorage
    function saveStats() {
      localStorage.setItem('millionaireStats', JSON.stringify(gameStats));
    }
    
    // Update stats display
    function updateStatsDisplay() {
      const t = translations[currentLanguage];
      document.getElementById('totalGames').textContent = gameStats.totalGames;
      document.getElementById('avgScore').textContent = gameStats.totalGames > 0 
        ? Math.round(gameStats.totalScore / gameStats.totalGames) 
        : 0;
      document.getElementById('bestScore').textContent = gameStats.bestScore;
      document.getElementById('currentStreak').textContent = gameStats.currentStreak;
      
      // Update badge labels
      document.getElementById('totalGamesLabel').textContent = t.totalGames;
      document.getElementById('avgScoreLabel').textContent = t.avgScore;
      document.getElementById('bestScoreLabel').textContent = t.bestScore;
      document.getElementById('currentStreakLabel').textContent = t.currentStreak;
      document.getElementById('badgesLabel').textContent = t.badges;
      document.getElementById('statsTitle').textContent = t.statistics;
      
      // Display badges
      displayBadges();
    }
    
    // Check and award badges
    function checkBadges(score, usedLifelines) {
      const newBadges = [];
      
      if (score >= 10 && !gameStats.badges.includes('10_questions')) {
        newBadges.push({ id: '10_questions', name: currentLanguage === 'bs' ? '🎯 Prvih 10' : '🎯 First 10', desc: currentLanguage === 'bs' ? 'Prešao 10 pitanja' : 'Passed 10 questions' });
        gameStats.badges.push('10_questions');
      }
      
      if (score >= 15 && !gameStats.badges.includes('math_master')) {
        newBadges.push({ id: 'math_master', name: currentLanguage === 'bs' ? '👑 Math Master' : '    Math Master', desc: currentLanguage === 'bs' ? 'Osvojio milion!' : 'Won a million!' });
        gameStats.badges.push('math_master');
      }
      
      if (score >= 5 && !usedLifelines && !gameStats.badges.includes('no_lifelines')) {
        newBadges.push({ id: 'no_lifelines', name: currentLanguage === 'bs' ? '💪 Samostalno' : '💪 Solo Player', desc: currentLanguage === 'bs' ? 'Prešao 5+ bez jokera' : 'Passed 5+ without lifelines' });
        gameStats.badges.push('no_lifelines');
      }
      
      if (gameStats.currentStreak >= 3 && !gameStats.badges.includes('streak_3')) {
        newBadges.push({ id: 'streak_3', name: currentLanguage === 'bs' ? '🔥 U vatri' : '   On Fire', desc: currentLanguage === 'bs' ? '3 igre zaredom' : '3 games in a row' });
        gameStats.badges.push('streak_3');
      }
      
      if (gameStats.totalGames >= 10 && !gameStats.badges.includes('veteran')) {
        newBadges.push({ id: 'veteran', name: currentLanguage === 'bs' ? '🎖️ Veteran' : '🎖️ Veteran', desc: currentLanguage === 'bs' ? '10+ odigranih igara' : '10+ games played' });
        gameStats.badges.push('veteran');
      }
      
      return newBadges;
    }
    
    // Display badges
    function displayBadges() {
      const badgesList = document.getElementById('badgesList');
      badgesList.innerHTML = '';
      
      const badgeDefinitions = {
        '10_questions': { name: currentLanguage === 'bs' ? '🎯 Prvih 10' : '🎯 First 10', desc: currentLanguage === 'bs' ? 'Prešao 10 pitanja' : 'Passed 10 questions' },
        'math_master': { name: currentLanguage === 'bs' ? '👑 Math Master' : '👑 Math Master', desc: currentLanguage === 'bs' ? 'Osvojio milion!' : 'Won a million!' },
        'no_lifelines': { name: currentLanguage === 'bs' ? '💪 Samostalno' : '    Solo Player', desc: currentLanguage === 'bs' ? 'Prešao 5+ bez jokera' : 'Passed 5+ without lifelines' },
        'streak_3': { name: currentLanguage === 'bs' ? '🔥 U vatri' : '🔥 On Fire', desc: currentLanguage === 'bs' ? '3 igre zaredom' : '3 games in a row' },
        'veteran': { name: currentLanguage === 'bs' ? '  ️ Veteran' : '🎖️ Veteran', desc: currentLanguage === 'bs' ? '10+ odigranih igara' : '10+ games played' }
      };
      
      if (gameStats.badges.length === 0) {
        badgesList.innerHTML = '<p class="text-gray-400 text-sm">' + 
          (currentLanguage === 'bs' ? 'Još nemaš bedževa. Nastavi igrati!' : 'No badges yet. Keep playing!') + 
          '</p>';
        return;
      }
      
      gameStats.badges.forEach(badgeId => {
        const badge = badgeDefinitions[badgeId];
        if (badge) {
          const badgeEl = document.createElement('div');
          badgeEl.className = 'bg-yellow-600 bg-opacity-30 border-2 border-yellow-500 rounded-lg px-3 py-2 text-sm';
          badgeEl.title = badge.desc;
          badgeEl.innerHTML = badge.name;
          badgesList.appendChild(badgeEl);
        }
      });
    }
    
    // Theme toggle
    function toggleTheme() {
      if (currentTheme === 'dark') {
        currentTheme = 'light';
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        document.getElementById('themeToggle').textContent = '☀️';
      } else {
        currentTheme = 'dark';
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        document.getElementById('themeToggle').textContent = '🌙';
      }
      localStorage.setItem('theme', currentTheme);
    }
    
    // Load theme
function loadTheme() {
  const saved = localStorage.getItem('theme');

  if (saved === 'light') {
    currentTheme = 'light';
    document.body.classList.add('light-mode');
    document.getElementById('themeToggle').textContent = '☀️';
  } else {
    // 👇 DEFAULT = DARK
    currentTheme = 'dark';
    document.body.classList.add('dark-mode');
    document.getElementById('themeToggle').textContent = '🌙';
  }
}
    
    function selectLanguage(lang) {
      currentLanguage = lang;
      document.getElementById('languageScreen').classList.add('hidden');
      document.getElementById('gameScreen').classList.remove('hidden');
      document.getElementById('gameScreen').classList.add('flex');
      initGame();
    }
    
    const questionBank = {
bs: {
history: {
easy: [
{ question: "Šta je 'Apsolutna vrijednost' broja -15?", answers: { A: "0", B: "-15", C: "15", D: "1" }, correct: "C" },
{ question: "Koji je simbol za skup cijelih brojeva?", answers: { A: "N", B: "Q", C: "Z", D: "R" }, correct: "C" },
{ question: "Kako se zove linija koja spaja dva nesusjedna vrha mnogougla?", answers: { A: "Dijagonala", B: "Stranica", C: "Tetiva", D: "Visina" }, correct: "A" },
{ question: "Kako se naziva broj koji se može podijeliti samo sa 1 i sa samim sobom?", answers: { A: "Složen broj", B: "Prost broj", C: "Parni broj", D: "Savršen broj" }, correct: "B" },
{ question: "Kako se zove broj koji je jednak zbiru svojih kubova (npr. 153 = 1³ + 5³ + 3³)?", answers: { A: "Savršen broj", B: "Eulerov broj", C: "Prost broj", D: "Armstrongov broj" }, correct: "D" },
{ question: "Kako se naziva geometrijski oblik koji ima beskonačan obim, a konačnu površinu?", answers: { A: "Fraktal", B: "Krug", C: "Elipsa", D: "Hiperbola" }, correct: "A" },
{ question: "Koliko iznosi zbir svih unutrašnjih uglova u bilo kojem trouglu na sferi (zakrivljenoj površini)?", answers: { A: "Tačno 180°", B: "Manje od 180°", C: "Više od 180°", D: "Uvijek 360°" }, correct: "C" },
{ question: "Kako se zove paradoks koji kaže da je nemoguće preći put, jer prvo moraš preći polovinu, pa polovinu preostalog?", answers: { A: "Zenonov paradoks", B: "Russellov paradoks", C: "Hilbertov hotel", D: "Paradoks lažljivca" }, correct: "A" },
{ question: "Kako se naziva broj koji se dobije kada se 1 podijeli sa nulom (u ne-standardnoj analizi)?", answers: { A: "Nula", B: "Beskonačnost", C: "Jedan", D: "Nedefinisano" }, correct: "B" },
{ question: "Koji oblik imaju ćelije u pčelinjem saću jer je to najefikasnije za popunjavanje prostora?", answers: { A: "Dodekagon", B: "Oktagon", C: "Heksagon", D: "Pentagon" }, correct: "C" },
{ question: "Koliko iznosi vjerovatnoća da će se nešto desiti ako je to 'siguran događaj'?", answers: { A: "0", B: "0.5", C: "1", D: "100" }, correct: "C" },
{ question: "Koliko lica ima 'Torus' (oblik krofne)?", answers: { A: "1", B: "2", C: "0", D: "Beskonačno" }, correct: "A" },
{ question: "Šta znači prefiks 'Tera' u mjernim jedinicama (npr. terabajt)?", answers: { A: "Milion", B: "Milijarda", C: "Trilion", D: "Kvadrilion" }, correct: "C" },
{ question: "Koji broj dobijemo kada kvadriramo broj 111?", answers: { A: "11111", B: "12321", C: "12121", D: "12221" }, correct: "B" },
{ question: "Kako se naziva trougao čije su stranice 3, 4 i 5?", answers: { A: "Egipatski trougao", B: "Grčki trougao", C: "Rimski trougao", D: "Babilonski trougao" }, correct: "A" },
{ question: "Koliko iznosi zbir svih brojeva od 1 do 100?", answers: { A: "5000", B: "5050", C: "5100", D: "4950" }, correct: "B" },
{ question: "Šta je 'Palindrom' u svijetu brojeva?", answers: { A: "Broj djeljiv sa 11", B: "Broj koji se isto čita s obje strane", C: "Prost broj", D: "Broj bez nula" }, correct: "B" },
{ question: "Koji broj u matematici predstavlja bazu prirodnog logaritma?", answers: { A: "π", B: "e", C: "φ", D: "i" }, correct: "B" },
{ question: "Kako se zove tijelo koje nastaje rotacijom pravougaonika oko jedne njegove stranice?", answers: { A: "Kupa", B: "Sfera", C: "Valjak", D: "Prizma" }, correct: "C" },
{ question: "Koji broj nastavlja niz: 1, 4, 16, 64, ...?", answers: { A: "128", B: "256", C: "512", D: "100" }, correct: "B" },
{ question: "Kako se zove četverougao koji ima dva para susjednih jednakih stranica (oblik zmaja)?", answers: { A: "Romb", B: "Trapez", C: "Paralelogram", D: "Deltoid" }, correct: "D" },
{ question: "Koliko iznosi zbir prvih deset prirodnih brojeva (1+2+...+10)?", answers: { A: "55", B: "45", C: "50", D: "60" }, correct: "A" },
{ question: "Koliko stepeni ima svaki ugao u pravilnom šestouglu?", answers: { A: "90°", B: "100°", C: "110°", D: "120°" }, correct: "D" },
{ question: "Koji je rimski simbol za broj 40?", answers: { A: "XXXX", B: "XL", C: "LX", D: "VL" }, correct: "B" },
{ question: "Koji je sljedeći broj u nizu prostih brojeva: 2, 3, 5, 7, ...?", answers: { A: "9", B: "10", C: "11", D: "13" }, correct: "C" },
{ question: "Koji je rimski simbol za broj 400?", answers: { A: "CCCC", B: "CD", C: "DC", D: "LD" }, correct: "B" },
{ question: "Koji je najmanji broj koji se može podijeliti sa svim brojevima od 1 do 10?", answers: { A: "1000", B: "5040", C: "1260", D: "2520" }, correct: "D" },
{ question: "Koji matematičar je kao dijete sabrao sve brojeve od 1 do 100 za par sekundi?", answers: { A: "Carl Friedrich Gauss", B: "Isaac Newton", C: "Albert Einstein", D: "Pythagora" }, correct: "A" },
{ question: "Koji broj se smatra 'najmagičnijim' u prirodi i naziva se Phi (φ)?", answers: { A: "3.14", B: "1.618", C: "2.718", D: "1.414" }, correct: "B" },
{ question: "Kako se zove broj koji se čita isto i s lijeva i s desna (npr. 12321)?", answers: { A: "Armstrongov broj", B: "Savršen broj", C: "Palindrom", D: "Sretni broj" }, correct: "C" },
{ question: "Koliko iznosi zbir suprotnih strana na običnoj kockici za igru?", answers: { A: "7", B: "6", C: "8", D: "5" }, correct: "A" },
{ question: "Koji je 'najpopularniji' broj na svijetu prema mnogim online anketama?", answers: { A: "3", B: "13", C: "7", D: "67" }, correct: "C" },
{ question: "Koliko miješanja je potrebno da se špil od 52 karte savršeno promiješa?", answers: { A: "7", B: "50", C: "100", D: "12" }, correct: "A" },
{ question: "Koji broj u Japanu i Kini izbjegavaju jer zvuči kao riječ 'smrt'?", answers: { A: "7", B: "13", C: "8", D: "4" }, correct: "D" },
{ question: "Kako se naziva grana matematike koja proučava vjerovatnoću igara na sreću?", answers: { A: "Geometrija", B: "Kombinatorika", C: "Analiza", D: "Statistika" }, correct: "B" },
{ question: "Kako se naziva 'strah od brojeva' uopšte?", answers: { A: "Aritmofobija", B: "Triskaidekafobija", C: "Nomofobija", D: "Tetrafobija" }, correct: "A" },
{ question: "Kako se zove broj koji je jednak zbiru svojih faktora (uključujući 1, npr. 28 = 1+2+4+7+14)?", answers: { A: "Armstrongov broj", B: "Sretni broj", C: "Savršeni broj", D: "Fibonaccijev broj" }, correct: "C" },
{ question: "Koji oblik imaju stop znakovi na cestama u većini zemalja?", answers: { A: "Heksagon", B: "Pentagon", C: "Krug", D: "Oktagon" }, correct: "D" },
{ question: "Koliko lica (strana) ima ikozaedar, jedno od Platonovih tijela?", answers: { A: "20", B: "12", C: "8", D: "4" }, correct: "A" },
{ question: "Koji matematičar je prvi dokazao da je broj Pi (π) iracionalan?", answers: { A: "Euler", B: "Archimedes", C: "Johann Lambert", D: "Gauss" }, correct: "C" },
{ question: "Koliko minuta ima u 10% jednog sata?", answers: { A: "10", B: "1", C: "5", D: "6" }, correct: "D" },
{ question: "Šta dobijemo kada kvadriramo bilo koji negativan broj?", answers: { A: "Pozitivan broj", B: "Negativan broj", C: "Nulu", D: "Kompleksan broj" }, correct: "A" },
{ question: "Šta znači prefiks 'Giga' u mjerama?", answers: { A: "Milion", B: "Hiljada", C: "Trilion", D: "Milijarda" }, correct: "D" },
{ question: "Kako se zove kriva linija koja izgleda kao sedlo ili 'Pringles' čips?", answers: { A: "Parabola", B: "Torus", C: "Elipsa", D: "Hiperbolički paraboloid" }, correct: "D" },
{ question: "Kako se naziva skup brojeva {..., -2, -1, 0, 1, 2, ...}?", answers: { A: "Prirodni", B: "Cijeli brojevi", C: "Racionalni", D: "Realni" }, correct: "B" },
{ question: "Koji je sljedeći broj u nizu: 2, 4, 16, 256...?", answers: { A: "512", B: "1024", C: "2048", D: "65536" }, correct: "D" },
{ question: "Kako se zove broj koji dobijemo kada pomnožimo broj sam sa sobom tri puta (x³)?", answers: { A: "Kvadrat", B: "Kub", C: "Faktorijel", D: "Korijen" }, correct: "B" },
{ question: "Koji broj u matematici označava bazu prirodnog logaritma?", answers: { A: "π", B: "i", C: "φ", D: "e" }, correct: "D" },
{ question: "Kako se zove tijelo koje ima samo jednu plohu, a nema ivica ni vrhova?", answers: { A: "Valjak", B: "Sfera", C: "Kupa", D: "Torus" }, correct: "B" },
{ question: "Koji je sljedeći broj u nizu: 1, 3, 4, 7, 11... (Lucasov niz)?", answers: { A: "15", B: "18", C: "21", D: "23" }, correct: "B" },
{ question: "Kako se naziva broj koji se dobije kada saberemo prva dva prosta broja?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "C" },
{ question: "Koji je rimski simbol za broj 150?", answers: { A: "CL", B: "LC", C: "LI", D: "DL" }, correct: "A" },
{ question: "Koliko iznosi 0.5% od broja 1000?", answers: { A: "0.05", B: "0.5", C: "5", D: "50" }, correct: "C" },
{ question: "Šta znači prefiks 'Piko' (npr. pikosekunda)?", answers: { A: "Milioniti dio", B: "Milijarditi dio", C: "Bilioniti dio", D: "Trilioniti dio " }, correct: "D" },
{ question: "Koliko načina postoji da se promiješa špil od 52 karte (52!)?", answers: { A: "Oko milijardu", B: "52 načina", C: "Oko trilion", D: "Više nego što ima atoma na Zemlji" }, correct: "D" },
{ question: "Kako se zove 'najljepša jednačina' koja spaja 5 osnovnih konstanti (e, i, π, 1, 0)?", answers: { A: "Pitagorina teorema", B: "Newtonov zakon", C: "Eulerov identitet", D: "Gausova kriva" }, correct: "C" },
{ question: "Koliko puta bi teoretski morao presaviti papir da bi dosegao debljinu poznatog svemira?", answers: { A: "103 puta", B: "1000 puta", C: "Milion puta", D: "42 puta" }, correct: "A" },
{ question: "Šta se dešava sa površinom kruga ako mu udvostručimo poluprečnik?", answers: { A: "Udvostruči se", B: "Ostaje ista", C: "Poveća se tri puta", D: "Poveća se četiri puta" }, correct: "D" },
{ question: "Kako se zove paradoks koji kaže da se jedna kugla može rastaviti i sastaviti u dvije identične kugle?", answers: { A: "Banach-Tarski paradoks", B: "Russellov paradoks", C: "Zenov paradoks", D: "Fermi paradoks" }, correct: "A" },
{ question: "Koji matematičar je umro nakon dvoboja pištoljima u 20. godini, ostavivši temelje moderne algebre?", answers: { A: "Évariste Galois", B: "Niels Abel", C: "Blaise Pascal", D: "Bernhard Riemann" }, correct: "A" }, 
{ question: "Šta je 'Mengerova spužva'?", answers: { A: "Fraktal beskonačne površine, a nulte zapremine", B: "Geometrijsko tijelo", C: "Matematički alat", D: "Vrsta trougla" }, correct: "A" },
{ question: "Kako se naziva broj koji ima beskonačno mnogo decimala koje se ne ponavljaju?", answers: { A: "Racionalan", B: "Iracionalan", C: "Cijeli", D: "Prirodan" }, correct: "B" },
{ question: "Koliko ukupno dijagonala ima trougao?", answers: { A: "0", B: "1", C: "3", D: "2" }, correct: "A" },
{ question: "Kako se zove naučnik koji je dešifrovao Enigmu koristeći matematiku?", answers: { A: "Alan Turing", B: "John Nash", C: "Albert Einstein", D: "Bill Gates" }, correct: "A" },
{ question: "Kako se naziva broj koji nastavlja niz: 1, 3, 4, 7, 11, 18, ...?", answers: { A: "25", B: "29", C: "31", D: "21" }, correct: "B" },
{ question: "Šta znači prefiks 'Atto' u mjernim jedinicama (10^-18)?", answers: { A: "Milijarditi", B: "Bilioniti", C: "Trilioniti", D: "Kvadrilioniti" }, correct: "D" },
{ question: "Koliko ivica ima jedna piramida sa kvadratnom bazom?", answers: { A: "8", B: "6", C: "4", D: "10" }, correct: "A" },
{ question: "Šta u matematici označava simbol 'Σ' (Sigma)?", answers: { A: "Proizvod", B: "Razliku", C: "Sumu (Zbir)", D: "Količnik" }, correct: "C" },
{ question: "Ako je danas petak, koji je dan za 11 dana?", answers: { A: "Utorak", B: "Ponedjeljak", C: "Subota", D: "Nedjelja" }, correct: "A" },
{ question: "Koliko je 15% od 200?", answers: { A: "25", B: "35", C: "30", D: "40" }, correct: "C" },
{ question: "Koliko je 50% od 60?", answers: { A: "20", B: "25", C: "30", D: "35" }, correct: "C" },
{ question: "Koliko je 25% od 80?", answers: { A: "10", B: "20", C: "25", D: "30" }, correct: "B" },
{ question: "Koliko je 2³ + 1?", answers: { A: "7", B: "8", C: "9", D: "10" }, correct: "C" },
{ question: "Ako je a = 3 i b = 4, koliko je a² + b²?", answers: { A: "12", B: "20", C: "25", D: "7" }, correct: "C" },
{ question: "Koliko je 30% od 200?", answers: { A: "70", B: "60", C: "50", D: "80" }, correct: "B" }
  ],
   
hard: [
{ question: "Naziv za broj 'Nula' potiče od arapske riječi 'sifr', što znači:", answers: { A: "Prazno", B: "Krug", C: "Početak", D: "Malo" }, correct: "A" },
{ question: "Riječ 'Algoritam' je latinizirano ime kojeg slavnog matematičara?", answers: { A: "Aristotela", B: "Archimedesa", C: "Al-Khwarizmija", D: "Al-Haithama" }, correct: "C" },
{ question: "Šta na latinskom jeziku izvorno znači riječ 'Calculus'?", answers: { A: "Mašina", B: "Pero za pisanje", C: "Teška odluka", D: "Mali kamenčić" }, correct: "D" },
{ question: "Riječ 'Statistika' potiče od latinske riječi 'status', što se prvobitno odnosilo na:", answers: { A: "Brojeve", B: "Političko stanje ili državu", C: "Stabilnost", D: "Tabele" }, correct: "B" },
{ question: "Ko je uveo znak jednakosti (=) jer su 'dvije paralelne linije najsličnije stvari na svijetu'?", answers: { A: "John Napier", B: "René Descartes", C: "Robert Recorde", D: "Isaac Newton" }, correct: "C" }, 
{ question: "Kako se zove grana matematike koja se bavi proučavanjem 'vjerovatnoće' ishoda?", answers: { A: "Statistika", B: "Logika", C: "Teorija vjerovatnoće", D: "Analiza" }, correct: "C" },
{ question: "Koliko stepeni iznosi svaki unutrašnji ugao jednakostraničnog trougla?", answers: { A: "45°", B: "90°", C: "60°", D: "120°" }, correct: "C" },
{ question: "Koji broj se u matematici naziva 'imaginarna jedinica'?", answers: { A: "0", B: "korijen iz -1", C: "π", D: "e" }, correct: "B" },
{ question: "Koliko je 0.5 u procentima?", answers: { A: "5%", B: "50%", C: "0.5%", D: "500%" }, correct: "B" },
{ question: "Šta dobijemo kada bilo koji broj podijelimo sa samim sobom (osim nule)?", answers: { A: "0", B: "Taj isti broj", C: "Beskonačno", D: "1" }, correct: "D" },
{ question: "Koja civilizacija je prva uvela koncept nule kao broja u računanju?", answers: { A: "Rimljani", B: "Indijci", C: "Grci", D: "Egipćani" }, correct: "B" },
{ question: "Koji se broj dobije kada se pomnože prva tri prosta broja (2, 3 i 5)?", answers: { A: "10", B: "15", C: "25", D: "30" }, correct: "D" },
{ question: "Kako se zove nauka koja koristi matematiku za šifrovanje i dešifrovanje poruka?", answers: { A: "Kriptografija", B: "Kartografija", C: "Topologija", D: "Kodologija" }, correct: "A" },
{ question: "Koliki je zbir uglova u bilo kojem četverouglu?", answers: { A: "180°", B: "360°", C: "540°", D: "720°" }, correct: "B" },
{ question: "Koja je najmanja dvocifrena vrijednost prostog broja?", answers: { A: "11", B: "10", C: "13", D: "17" }, correct: "A" },
{ question: "Kako se zove geometrijski oblik koji izgleda kao krofna?", answers: { A: "Sfera", B: "Torus", C: "Cilindar", D: "Elipsa" }, correct: "B" },
{ question: "Koji je jedini broj koji je ujedno i prost i paran?", answers: { A: "2", B: "4", C: "1", D: "0" }, correct: "A" },
{ question: "Koliko iznosi kvadratni korijen iz broja 0.25?", answers: { A: "0.05", B: "0.1", C: "0.2", D: "0.5" }, correct: "D" },
{ question: "Kako se naziva poligon (mnogougao) sa deset stranica?", answers: { A: "Heksagon", B: "Heptagon", C: "Dekagon", D: "Nonagon" }, correct: "C" },
{ question: "Koji je rimski simbol za broj 50?", answers: { A: "C", B: "D", C: "L", D: "M" }, correct: "C" },
{ question: "Koliko nula ima broj trilion (na evropskoj skali)?", answers: { A: "12", B: "9", C: "15", D: "18" }, correct: "A" },
{ question: "Kako se zove instrument koji se nekada koristio za računanje pomoću kuglica na žicama?", answers: { A: "Sextant", B: "Astrolab", C: "Abakus", D: "Logaritmar" }, correct: "C" },
{ question: "Šta dobijemo kada pomnožimo bilo koji broj sa nulom?", answers: { A: "0", B: "1", C: "Beskonačno", D: "Taj isti broj" }, correct: "A" },
{ question: "Kako se zove tijelo koje ima 20 strana (pravilnih trouglova)?", answers: { A: "Dodekaedar", B: "Ikozaedar", C: "Oktaedar", D: "Tetraedar" }, correct: "B" },
{ question: "Koja je jedina cifra koja se ne može napisati rimskim brojevima?", answers: { A: "Nula", B: "Hiljada", C: "Petsto", D: "Pedeset" }, correct: "A" }
],
  
hardest: [
{ question: "Mersenneovi brojevi su posebna klasa prostih brojeva. Koja organizacija je prvenstveno odgovorna za otkrivanje najvećih poznatih prostih brojeva?", answers: { A: "NASA", B: "GIMPS", C: "CERN", D: "MIT" }, correct: "B" },
{ question: "Ko je dokazao Taniyama-Shimura hipotezu za polustavne eliptičke krivulje?", answers: { A: "Andrew Wiles", B: "Richard Taylor", C: "Goro Shimura", D: "Yutaka Taniyama" }, correct: "A" },
{ question: "Ko je dobio Fields medalju 2014. za rad na dinamičkim sistemima?", answers: { A: "Maryam Mirzakhani", B: "Manjul Bhargava", C: "Artur Avila", D: "Martin Hairer" }, correct: "C" },
{ question: "Ko je odbio Fields medalju 2006?", answers: { A: "Terence Tao", B: "Grigori Perelman", C: "Andrei Okounkov", D: "Wendelin Werner" }, correct: "B" },
{ question: "Ko je razvio teoriju kategorija?", answers: { A: "Samuel Eilenberg", B: "Saunders Mac Lane", C: "Alexander Grothendieck", D: "A i B" }, correct: "D" },
{ question: "Ko je riješio Hilbertov 10. problem?", answers: { A: "Turing", B: "Church", C: "Matiyasevich", D: "Gödel" }, correct: "C" },
{ question: "Koji je matematičar dokazao 'Teorem nepotpunosti', poljuljavši temelje logike?", answers: { A: "Hilbert", B: "Cantor", C: "Russell", D: "Kurt Gödel" }, correct: "D" },
{ question: "Koji je matematičar razvio 'Binomni teorem' u 17. vijeku?", answers: { A: "Isaac Newton", B: "Pascal", C: "Euler", D: "Fermat" }, correct: "A" },
{ question: "Ko je uveo kategorijsku teoriju zajedno sa Mac Laneom?", answers: { A: "Grothendieck", B: "Lawvere", C: "Kan", D: "Eilenberg" }, correct: "D" },
{ question: "Ko je formulirao teoriju relativnosti u matematičkom obliku?", answers: { A: "Einstein", B: "Lorentz", C: "Riemann", D: "Minkowski" }, correct: "D" },
{ question: "Ko je prvi definisao pojam 'matematička logika' u modernom obliku?", answers: { A: "Gödel", B: "Turing", C: "Russell", D: "Frege" }, correct: "D" },
{ question: "Ko je otkrio 'četiri boje' teorem (prvo dokazano računarom)?", answers: { A: "Fourier", B: "Gauss", C: "Euler", D: "Appel i Haken" }, correct: "D" },
{ question: "Ko je prvi dokazao Fermatovu posljednju teoremu?", answers: { A: "Fermat", B: "Taylor", C: "Taniyama", D: "Wiles" }, correct: "D" },
{ question: "Banach-Tarski paradoks tvrdi da loptu možete?", answers: { A: "Prerezati na 5 dijelova i složiti u 2 lopte", B: "Rastegnuti beskonačno", C: "Kompresovati u tačku", D: "Rotirati u 4D" }, correct: "A" },
{ question: "Gabriel's Horn ima?", answers: { A: "Konačnu zapreminu, beskonačnu površinu", B: "Beskonačnu zapreminu, konačnu površinu", C: "Oboje konačno", D: "Oboje beskonačno" }, correct: "A" },
{ question: "Koliko je suma 1+2+3+4+... do beskonačnosti u analitičkom smislu (Ramanujan suma)?", answers: { A: "∞", B: "-1/12", C: "Divergira", D: "0" }, correct: "B" },
{ question: "Koliko je 1/0 u matematici?", answers: { A: "0", B: "∞", C: "1", D: "Nedefinisano" }, correct: "D" },
{ question: "Koja je vrijednost log(1)?", answers: { A: "1", B: "Nedefinisano", C: "∞", D: "0" }, correct: "D" },
{ question: "Koliko je √(-1)?", answers: { A: "-i", B: "1", C: "Nedefinisano", D: "i" }, correct: "D" },
{ question: "Koja je vrijednost sin(0)?", answers: { A: "1", B: "-1", C: "Nedefinisano", D: "0" }, correct: "D" },
{ question: "Ko drži rekord u pamćenju broja Pi (π) sa preko 70.000 izgovorenih decimala?", answers: { A: "Akira Haraguchi", B: "Albert Einstein", C: "Rajveer Meena", D: "Stephen Hawking" }, correct: "C" },
{ question: "Koja država je osvojila najviše zlatnih medalja na Međunarodnoj matematičkoj olimpijadi (IMO)?", answers: { A: "SAD", B: "Rusija", C: "Kina", D: "Njemačka" }, correct: "C" },
{ question: "Kako se zove najbrži ljudski 'kompjuter', žena koja je mentalno množila dva 13-cifrena broja?", answers: { A: "Marie Curie", B: "Shakuntala Devi", C: "Ada Lovelace", D: "Katherine Johnson" }, correct: "B" },
{ question: "Koji je najveći ikad izračunati prost broj (Mersenne prime) od 2024. godine?", answers: { A: "Ima 11 miliona cifara", B: "Ima preko 41 milion cifara", C: "Ima 21 miliona cifara", D: "Ima tačno 100 miliona cifara" }, correct: "B" },
{ question: "Koji matematičar drži rekord po broju objavljenih naučnih radova (preko 1500)?", answers: { A: "Paul Erdős", B: "Leonhard Euler", C: "Carl Friedrich Gauss", D: "Isaac Newton" }, correct: "A" },
{ question: "Koja je najskuplja matematička knjiga ikada prodata (kupio je Bill Gates)?", answers: { A: "Elementi", B: "Codex Leicester", C: "Principia Mathematica", D: "Almagest" }, correct: "B" },
{ question: "Koliko je trajao rekord za najduži matematički dokaz (Fermatova posljednja teorema) prije nego je riješen?", answers: { A: "158 godina", B: "258 godina", C: "358 godina", D: "5567 godina" }, correct: "C" },
{ question: "Ko je najmlađa osoba koja je ikada osvojila Fieldsovu medalju (matematički Nobel)?", answers: { A: "Jean-Pierre Serre", B: "Terence Tao", C: "Maryna Viazovska", D: "Grigori Perelman" }, correct: "A" },
{ question: "Koji je rekord za najviše ljudi koji su istovremeno rješavali matematički test?", answers: { A: "Oko 10000", B: "Preko 150000", C: "Preko milion", D: "Oko 50000" }, correct: "C" },
{ question: "Ko je prvi riješio jedan od sedam 'Milenijumskih problema' (Poincaréovu pretpostavku)?", answers: { A: "Grigori Perelman", B: "Andrew Wiles", C: "Edward Witten", D: "John Nash" }, correct: "A" },
{ question: "Koja je osnovna jedinica za masu u Međunarodnom sistemu jedinica (SI)?", answers: { A: "Gram", B: "Tona", C: "Kilogram", D: "Miligram" }, correct: "C" },
{ question: "Koliko čvorova iznosi brzina od jedne nautičke milje na sat?", answers: { A: "10", B: "1", C: "1.85", D: "0.5" }, correct: "B" },
{ question: "Koliko kvadratnih metara ima jedan hektar?", answers: { A: "100", B: "1000", C: "10000", D: "100000" }, correct: "C" },
{ question: "Koliko stopa (feet) čini jedan jard (yard)?", answers: { A: "2", B: "3", C: "5", D: "12" }, correct: "B" },
{ question: "Koliko iznosi zapremina jednog 'barela' nafte u litrima (približno)?", answers: { A: "101", B: "59", C: "159", D: "259" }, correct: "C" },
{ question: "Koji broj se u matematici i umjetnosti naziva 'Božanski omjer' ili 'Zlatni rez'?", answers: { A: "Pi (π)", B: "e (Eulerov broj)", C: "Phi (φ)", D: "Korijen iz 2" }, correct: "C" },
{ question: "Koji je jedini broj koji se rimskim ciframa ne može napisati?", answers: { A: "1000", B: "50", C: "0", D: "Milion" }, correct: "C" },
{ question: "Kako se zove geometrijski oblik koji ima samo jednu stranu i jednu ivicu?", answers: { A: "Torus", B: "Möbiusova traka", C: "Sfera", D: "Kliješta" }, correct: "B" },
{ question: "Koliko je 111,111,111 pomnoženo sa samim sobom?", answers: { A: "121212121", B: "111111111", C: "12345678987654321", D: "999999999" }, correct: "C" },
{ question: "Koji broj nazivamo 'Savršenim' jer je jednak zbiru svojih djelilaca?", answers: { A: "6", B: "10", C: "12", D: "28" }, correct: "A" },
{ question: "Kako se zove kriva linija koja se dobije bacanjem lopte u zrak?", answers: { A: "Parabola", B: "Hiperbola", C: "Elipsa", D: "Kružnica" }, correct: "A" },
{ question: "Ako se broji 24 vremenske zone na 360°, koliko stepeni otpada na jednu zonu?", answers: { A: "10°", B: "12°", C: "15°", D: "20°" }, correct: "C" },
{ question: "Kako se zove hipoteza koja tvrdi da svaki paran broj veći od 2 može biti prikazan kao zbir dva prosta broja?", answers: { A: "Riemannova hipoteza", B: "Goldbachova konjektura", C: "Fermatova teorema", D: "Poincaréova pretpostavka" }, correct: "B" },
{ question: "Koliko iznosi rješenje 'Baselovog problema' (zbir svih recipročnih kvadrata prirodnih brojeva)?", answers: { A: "π²/6", B: "π²/4", C: "e/2", D: "√2" }, correct: "A" },
{ question: "Koji matematički teorem dokazuje da u svakom dovoljno snažnom sistemu postoje tvrdnje koje se ne mogu ni dokazati ni opovrgnuti?", answers: { A: "Teorem o srednjoj vrijednosti", B: "Bayesov teorem", C: "Gödelov teorem nepotpunosti", D: "Cantorov teorem" }, correct: "C" },
{ question: "Koja je jedina funkcija koja je identična svom izvodu (derivaciji)?", answers: { A: "f(x) = x²", B: "f(x) = ln(x)", C: "f(x) = sin(x)", D: "f(x) = e^x" }, correct: "D" },
{ question: "Kako se naziva najmanji kardinalni broj beskonačnog skupa (skup prirodnih brojeva)?", answers: { A: "Alef-nula (ℵ₀)", B: "Omega (ω)", C: "Gugol", D: "Kontinuum" }, correct: "A" }
  ]
},

geography: {
  easy: [
{ question: "Koliko je 40% od 500?", answers: { A: "150", B: "250", C: "200", D: "300" }, correct: "C" },
{ question: "Koji je sljedeći broj u nizu 1, 1, 2, 3, 5, 8, ?", answers: { A: "11", B: "13", C: "12", D: "15" }, correct: "B" },
{ question: "Kojim slovom označavamo skup prirodnih brojeva?", answers: { A: "Z", B: "N", C: "R", D: "Q" }, correct: "B" },
{ question: "Kojim slovom označavamo skup cijelih brojeva?", answers: { A: "N", B: "Q", C: "Z", D: "R" }, correct: "C" },
{ question: "Kojim slovom označavamo skup racionalnih brojeva?", answers: { A: "Q", B: "R", C: "Z", D: "N" }, correct: "A" },
{ question: "Kojim slovom označavamo skup kompleksnih brojeva?", answers: { A: "R", B: "C", C: "Z", D: "Q" }, correct: "B" },
{ question: "Kojim slovom označavamo skup realnih brojeva?", answers: { A: "Q", B: "Z", C: "R", D: "C" }, correct: "C" },
{ question: "Koliki je zbir prvih pet prostih brojeva?", answers: { A: "26", B: "28", C: "30", D: "32" }, correct: "B" },
{ question: "Pravougli trougao ima katete 12 i 5. Kolika je hipotenuza?", answers: { A: "12", B: "13", C: "17", D: "15" }, correct: "B" },
{ question: "Pravougli trougao ima katete 8 i 6. Kolika je hipotenuza?", answers: { A: "10", B: "12", C: "14", D: "9" }, correct: "A" },
{ question: "Pravougli trougao ima katete 3 i 4. Kolika je hipotenuza?", answers: { A: "6", B: "5", C: "7", D: "4" }, correct: "B" },
{ question: "Koliko sati ima u 4 dana?", answers: { A: "72", B: "96", C: "88", D: "100" }, correct: "B" },
{ question: "Koliko sati ima u 6 dana?", answers: { A: "120", B: "132", C: "144", D: "150" }, correct: "C" },
{ question: "Koliko sati ima u 2 sedmice?", answers: { A: "336", B: "320", C: "360", D: "300" }, correct: "A" },
{ question: "S kojim brojem se ne može dijeliti?", answers: { A: "-1", B: "0", C: "2", D: "10000" }, correct: "B" },
{ question: "Ako je a = -2, koliko je a na treću?", answers: { A: "-6", B: "6", C: "-8", D: "8" }, correct: "C" },
{ question: "Koliko je 30% od 400?", answers: { A: "100", B: "140", C: "120", D: "160" }, correct: "C" },
{ question: "Koliko dijagonala ima šestougao?", answers: { A: "6", B: "9", C: "12", D: "15" }, correct: "B" },
{ question: "Koliko dijagonala ima sedmougao?", answers: { A: "9", B: "14", C: "12", D: "16" }, correct: "B" },
{ question: "Koliko dijagonala ima osmougao?", answers: { A: "16", B: "18", C: "20", D: "14" }, correct: "C" },
{ question: "Koja figura nastaje okretanjem poluprečnika oko centra?", answers: { A: "Trougao", B: "Krug", C: "Kvadrat", D: "Pravougaonik" }, correct: "B" },
{ question: "Šta predstavlja broj π u geometriji?", answers: { A: "Omjer prečnika i poluprečnika", B: "Omjer obima i prečnika kruga", C: "Razliku površina krugova", D: "Kvadrat poluprečnika" }, correct: "B" },
{ question: "Koji je sljedeći broj: 2, 6, 12, 20, 30, ?", answers: { A: "40", B: "41", C: "42", D: "44" }, correct: "C" },
{ question: "Koliko je 11² - 10²?", answers: { A: "19", B: "20", C: "21", D: "22" }, correct: "C" },
{ question: "Koji broj nedostaje: 1, 4, 9, 16, ?, 36", answers: { A: "20", B: "24", C: "25", D: "30" }, correct: "C" },
{ question: "Koliko je 99 × 101?", answers: { A: "9999", B: "10099", C: "9801", D: "10001" }, correct: "A" },
{ question: "Ako je a=2, b=3, koliko je a³ + b³?", answers: { A: "25", B: "35", C: "27", D: "29" }, correct: "B" },
{ question: "Koliko je 1 + 2 + 3 + ... + 20?", answers: { A: "190", B: "200", C: "210", D: "220" }, correct: "C" },
{ question: "Koliko dijagonala ima heksagon?", answers: { A: "6", B: "9", C: "12", D: "15" }, correct: "B" },
{ question: "Ako je 7x = 1, koliko je x?", answers: { A: "1/7", B: "7", C: "0", D: "1" }, correct: "A" },
{ question: "Koji broj je sljedeći: 1, 2, 6, 24, 120, ?", answers: { A: "600", B: "720", C: "840", D: "500" }, correct: "B" },
{ question: "Koliko je 50² - 49²?", answers: { A: "99", B: "100", C: "101", D: "98" }, correct: "A" },
{ question: "Koliko je 25% od 240?", answers: { A: "50", B: "60", C: "70", D: "80" }, correct: "B" },
{ question: "Koji broj u Fibonaccijevom nizu dolazi nakon 13?", answers: { A: "18", B: "20", C: "21", D: "22" }, correct: "C" },
{ question: "Koliko je √196?", answers: { A: "12", B: "13", C: "14", D: "15" }, correct: "C" },
{ question: "Koliko je 15 × 15 - 10 × 10?", answers: { A: "125", B: "150", C: "175", D: "200" }, correct: "A" },
{ question: "Koji broj nedostaje: 3, 9, 27, ?, 243", answers: { A: "54", B: "72", C: "81", D: "108" }, correct: "C" },
{ question: "Koliko je 2⁸?", answers: { A: "128", B: "256", C: "512", D: "1024" }, correct: "B" },
{ question: "Koliko je 2^30 približno?", answers: { A: "1.07×10^9", B: "1.07×10^8", C: "1.07×10^10", D: "1.07×10^7" }, correct: "A" },
{ question: "Koliko je 75% od 360?", answers: { A: "260", B: "270", C: "280", D: "300" }, correct: "B" },
{ question: "Koliko je 1 + 2 + 3 + ... + 20?", answers: { A: "200", B: "210", C: "220", D: "190" }, correct: "B" },
{ question: "Ako je danas srijeda, koji je dan za 365 dana?", answers: { A: "Srijeda", B: "Četvrtak", C: "Utorak", D: "Petak" }, correct: "B" },
{ question: "Ko je uveo simbol za beskonačno?", answers: { A: "Isaac Newton", B: "Leonhard Euler", C: "John Wallis", D: "René Descartes" }, correct: "C" },
{ question: "Ko je prvi upotrijebio decimalni zapis u matematici?", answers: { A: "Fibonacci", B: "Al-Khwarizmi", C: "Simon Stevin", D: "Descartes" }, correct: "C" },
{ question: "Koji je broj Ludolph van Ceulen izračunavao do 35 decimala?", answers: { A: "e", B: "π", C: "φ", D: "√2" }, correct: "B" },
{ question: "Kako je Carl Friedrich Gauss bio poznat po nadimku?", answers: { A: "Kralj matematike", B: "Otac algebre", C: "Princ matematike", D: "Genije brojeva" }, correct: "C" },
{ question: "Ko je izumio logaritme?", answers: { A: "Gottfried Leibniz", B: "Isaac Newton", C: "Leonhard Euler", D: "John Napier" }, correct: "D" },
{ question: "Ko je prvi koristio negativne brojeve u matematici?", answers: { A: "Kinezi", B: "Grci", C: "Rimljani", D: "Egipćani" }, correct: "A" },
{ question: "Ko je formalno definisao funkciju?", answers: { A: "Descartes", B: "Fermat", C: "Euler", D: "Leibniz" }, correct: "C" },
{ question: "Ko je poznat kao 'otac geometrije'?", answers: { A: "Pitagora", B: "Euklid", C: "Arhimed", D: "Platon" }, correct: "B" },
{ question: "U kojoj državi je nastao arapski brojčani sistem?", answers: { A: "Arabija", B: "Egipat", C: "Indija", D: "Kina" }, correct: "C" },
{ question: "Koji simbol se koristi za beskonačnost?", answers: { A: "α", B: "∞", C: "Ω", D: "π" }, correct: "B" },
{ question: "Koliko je 1 + 3 + 5 + 7 + ... + 19?", answers: { A: "81", B: "100", C: "121", D: "90" }, correct: "B" },
{ question: "Koliko je 3⁴?", answers: { A: "64", B: "72", C: "81", D: "90" }, correct: "C" },
{ question: "U kojem vijeku je nastala algebra?", answers: { A: "5. vijek", B: "7. vijek", C: "9. vijek", D: "11. vijek" }, correct: "C" },
{ question: "Kako se zove funkcija koja je jednaka svojoj inverznoj funkciji?", answers: { A: "Eksponencijalna funkcija", B: "Identitet funkcija", C: "Kvadratna funkcija", D: "Recipročna funkcija" }, correct: "B" },
{ question: "Koliko je 3^10?", answers: { A: "59049", B: "59000", C: "60000", D: "50000" }, correct: "A" },
{ question: "Kako se zove matematički dokaz koji polazi od pretpostavke da je tvrdnja netačna?", answers: { A: "Direktni dokaz", B: "Indukcija", C: "Dokaz kontradikcijom", D: "Konstruktivni dokaz" }, correct: "C" },
{ question: "Koliko je 5^6?", answers: { A: "15625", B: "15000", C: "16000", D: "17000" }, correct: "A" },
{ question: "Koliko je 7^3?", answers: { A: "343", B: "333", C: "353", D: "363" }, correct: "A" },
{ question: "Koliko je 11^2?", answers: { A: "121", B: "111", C: "131", D: "141" }, correct: "A" },
{ question: "Ko je prvi formulirao aksiome geometrije u modernom obliku?", answers: { A: "Hilbert", B: "Euclid", C: "Pascal", D: "Gauss" }, correct: "A" },
{ question: "Ko je prvi dokazao fundamentalnu teoremu algebre?", answers: { A: "Gauss", B: "Euler", C: "Descartes", D: "Cauchy" }, correct: "A" },
{ question: "Kako se zovu brojevi koji se ne mogu zapisati kao razlomak?", answers: { A: "Racionalni", B: "Prirodni", C: "Iracionalni", D: "Cijeli" }, correct: "C" },
{ question: "Ko je dokazao nekompletnost formalnih sistema?", answers: { A: "Kurt Gödel", B: "Alan Turing", C: "David Hilbert", D: "John von Neumann" }, correct: "A" },
{ question: "Ko je uveo pojam 'grupa' u algebri?", answers: { A: "Galois", B: "Noether", C: "Lagrange", D: "Cayley" }, correct: "A" },
{ question: "Koliko je 50² − 49²?", answers: { A: "1", B: "50", C: "99", D: "100" }, correct: "C" },
{ question: "Koliko je 0.25 × 0.25?", answers: { A: "0.5", B: "0.125", C: "0.0625", D: "0.25" }, correct: "C" },
{ question: "Koliko m² ima 2.5 km²?", answers: { A: "250 000", B: "2 500 000", C: "25 000 000", D: "250 000 000" }, correct: "B" },
{ question: "Koji oblik ima 10 strana?", answers: { A: "Oktagon", B: "Dekagon", C: "Hendekagon", D: "Heksagon" }, correct: "B" }
  ],
  
  hard: [
{ question: "Koliko iznosi zbir svih brojeva na točku ruleta (od 1 do 36)?", answers: { A: "555", B: "1000", C: "666", D: "777" }, correct: "C" },
{ question: "Kako se zove najduža stranica u pravouglom trouglu?", answers: { A: "Kateta", B: "Baza", C: "Visina", D: "Hipotenuza" }, correct: "D" },
{ question: "Koji broj nazivamo 'Googol'?", answers: { A: "1 sa 10 nula", B: "1 sa 100 nula", C: "1 sa 1000 nula", D: "Beskonačno" }, correct: "B" },
{ question: "Koliko sekundi ima u jednom satu?", answers: { A: "60", B: "600", C: "3600", D: "360" }, correct: "C" },
{ question: "Koji je sljedeći broj u Fibonaccijevom nizu: 1, 1, 2, 3, 5, 8...?", answers: { A: "13", B: "11", C: "12", D: "15" }, correct: "A" },
{ question: "Kako se zove ugao koji je veći od 90°, a manji od 180°?", answers: { A: "Oštar ugao", B: "Pravi ugao", C: "Pun ugao", D: "Tupi ugao" }, correct: "D" },
{ question: "Koja matematička konstanta se dobije dijeljenjem obima kruga njegovim prečnikom?", answers: { A: "e", B: "π (Pi)", C: "φ (Phi)", D: "√2" }, correct: "B" },
{ question: "Ako saviješ obični list papira 42 puta, njegova debljina bi teoretski dosegla:", answers: { A: "Mjesec", B: "Vrh Everesta", C: "Oblake", D: "Središte Zemlje" }, correct: "A" },
{ question: "Kako se zove kriva linija koja se neprestano približava osi, ali je nikada ne dodiruje?", answers: { A: "Parabola", B: "Asimptota", C: "Hiperbola", D: "Tangenta" }, correct: "B" },
{ question: "Koji je rimski simbol za broj 500?", answers: { A: "D", B: "C", C: "M", D: "L" }, correct: "A" },
{ question: "Koliko stepeni iznosi puni krug?", answers: { A: "180°", B: "270°", C: "360°", D: "400°" }, correct: "C" },
{ question: "Kako se zove grana matematike koja koristi slova umjesto brojeva za rješavanje jednačina?", answers: { A: "Geometrija", B: "Statistika", C: "Topologija", D: "Algebra" }, correct: "D" },
{ question: "Koji je rezultat operacije 0 podijeljeno sa 5?", answers: { A: "5", B: "0", C: "1", D: "Nedefinisano" }, correct: "B" },
{ question: "Kako se zove trougao kod kojeg su sve tri stranice jednake dužine?", answers: { A: "Raznostranični", B: "Pravougli", C: "Jednakostranični", D: "Jednakokraki" }, correct: "C" },
{ question: "Koji je simbol za skup realnih brojeva?", answers: { A: "Z", B: "Q", C: "N", D: "R" }, correct: "D" },
{ question: "Šta predstavlja pojam 'medijana' u statistici?", answers: { A: "Srednju vrijednost niza", B: "Najčešći broj u nizu", C: "Razliku najvećeg i najmanjeg", D: "Zbir svih brojeva" }, correct: "A" },
{ question: "Koji broj dobijemo kada kvadriramo broj 12?", answers: { A: "122", B: "144", C: "132", D: "156" }, correct: "B" },
{ question: "Kako se zove matematički iskaz za koji se pretpostavlja da je tačan bez dokaza?", answers: { A: "Aksiom", B: "Teorema", C: "Hipoteza", D: "Lema" }, correct: "A" },
{ question: "Kako se zove broj koji se ne može izraziti kao razlomak dva cijela broja?", answers: { A: "Cijeli broj", B: "Racionalni broj", C: "Iracionalni broj", D: "Prirodni broj" }, correct: "C" },
{ question: "Koliko nula ima broj milion?", answers: { A: "6", B: "5", C: "7", D: "9" }, correct: "A" },
{ question: "Kako se zove naučnik koji je dokazao da se kvadrat nad hipotenuzom jednak zbiru kvadrata nad katetama?", answers: { A: "Aristotel", B: "Pitagora", C: "Euklid", D: "Arhimed" }, correct: "B" },
{ question: "Koji je rezultat bilo kojeg broja (osim nule) na nulti stepen (x⁰)?", answers: { A: "0", B: "x", C: "1", D: "Beskonačno" }, correct: "C" },
{ question: "Kako se zove donji broj u razlomku?", answers: { A: "Brojnik", B: "Nazivnik", C: "Razlomakačka crta", D: "Ostatak" }, correct: "B" },
{ question: "Ko se smatra 'ocem kompjutera' i tvorcem prve mehaničke računske mašine?", answers: { A: "Alan Turing", B: "Charles Babbage", C: "Ada Lovelace", D: "John von Neumann" }, correct: "B" },
{ question: "Kako se zove linija koja dodiruje krug u samo jednoj tački?", answers: { A: "Tetiva", B: "Sječica", C: "Tangenta", D: "Normala" }, correct: "C" },
{ question: "Koliko iznosi zbir unutrašnjih uglova u petouglu?", answers: { A: "560°", B: "550°", C: "540°", D: "520°" }, correct: "C" }
  ],
   
  hardest: [
{ question: "Koji matematičar je riješio Fermatovu posljednju teoremu 1994. godine?", answers: { A: "Grigori Perelman", B: "Terence Tao", C: "John Nash", D: "Andrew Wiles" }, correct: "D" },
{ question: "Šta proučava topološki problem poznat kao 'Problem sedam mostova Königsberga'?", answers: { A: "Teoriju grafova", B: "Kombinatoriku", C: "Diferencijalne jednačine", D: "Vjerovatnoću" }, correct: "A" },
{ question: "Koji broj je osnova prirodnih logaritama, poznat kao Eulerov broj?", answers: { A: "3.14159", B: "2.71828", C: "1.61803", D: "1.41421" }, correct: "B" },
{ question: "Kako se naziva skup tačaka u kompleksnoj ravni koji formira čuveni fraktal?", answers: { A: "Pascalov trougao", B: "Fibonaccijev niz", C: "Mandelbrotov skup", D: "Kochova pahulja" }, correct: "C" },
{ question: "Koji je rezultat integrala funkcije 1/x?", answers: { A: "x", B: "x²", C: "e^x", D: "ln|x| + C" }, correct: "D" },
{ question: "Kako se zove teorem koji povezuje broj vrhova (V), ivica (E) i strana (F) poliedra (V - E + F = 2)?", answers: { A: "Eulerova karakteristika", B: "Pitagorina teorema", C: "Lagrangeov teorem", D: "Newtonov binom" }, correct: "A" },
{ question: "Šta definiše 'Russellov paradoks' u teoriji skupova?", answers: { A: "Skup svih skupova koji ne sadrže sebe", B: "Beskonačnost brojeva", C: "Dijeljenje sa nulom", D: "Prazan skup" }, correct: "A" },
{ question: "Kako se zove grana matematike koja se bavi brzinama promjena i površinama ispod krivi?", answers: { A: "Linearna algebra", B: "Diskretna matematika", C: "Trigonometrija", D: "Infinitezimalni račun" }, correct: "D" },
{ question: "Koji je najmanji broj sa 12 djelitelja?", answers: { A: "60", B: "72", C: "48", D: "120" }, correct: "A" },
{ question: "U statistici, šta predstavlja 'Standardna devijacija'?", answers: { A: "Prosječnu vrijednost", B: "Sredinu niza", C: "Najčešći podatak", D: "Mjeru raspršenosti podataka" }, correct: "D" },
{ question: "Koja je vrijednost determinante jedinične matrice bilo kojeg reda?", answers: { A: "0", B: "Beskonačno", C: "1", D: "-1" }, correct: "C" },
{ question: "Koji matematičar je prvi upotrijebio termin 'funkcija'?", answers: { A: "Leibniz", B: "Euler", C: "Descartes", D: "Newton" }, correct: "A" },
{ question: "Koliko iznosi binomni koeficijent '5 iznad 2'?", answers: { A: "5", B: "10", C: "20", D: "15" }, correct: "B" },
{ question: "Kako se naziva kriva čija je jednačina x²/a² + y²/b² = 1?", answers: { A: "Hiperbola", B: "Parabola", C: "Kružnica", D: "Elipsa" }, correct: "D" },
{ question: "Kako se naziva kriva čija je jednačina x²/a² - y²/b² = 1?", answers: { A: "Hiperbola", B: "Parabola", C: "Kružnica", D: "Elipsa" }, correct: "A" },
{ question: "Šta je 'Derivacija' funkcije u datoj tački?", answers: { A: "Nagib tangente na grafu", B: "Površina ispod grafa", C: "Vrijednost funkcije", D: "Sjecište sa x-osom" }, correct: "A" },
{ question: "Koji sistem brojeva koristi bazu 16?", answers: { A: "Binarni", B: "Oktalni", C: "Decimalni", D: "Heksadecimalni" }, correct: "D" },
{ question: "Šta je 'Kardinalnost' skupa?", answers: { A: "Broj elemenata u skupu", B: "Zbir elemenata", C: "Vrsta elemenata", D: "Uređenost skupa" }, correct: "A" },
{ question: "Koliko iznosi limes (granična vrijednost) od sin(x)/x kada x teži nuli?", answers: { A: "0", B: "1", C: "Beskonačno", D: "Nedefinisano" }, correct: "B" },
{ question: "Kako se naziva matrica koja ima isti broj redova i kolona?", answers: { A: "Nula matrica", B: "Jedinična matrica", C: "Kvadratna matrica", D: "Identiti matrica" }, correct: "C" },
{ question: "Koji teorem kaže da prostih brojeva ima beskonačno mnogo?", answers: { A: "Pitagorin teorem", B: "Fermatov teorem", C: "Eratostenov teorem", D: "Euklidov teorem" }, correct: "D" },
{ question: "U teoriji vjerovatnoće, šta je 'Komplementaran događaj' događaju A?", answers: { A: "Događaj koji se desi ako se A ne desi", B: "Događaj koji se desi istovremeno sa A", C: "Nemoguć događaj", D: "Siguran događaj" }, correct: "A" },
{ question: "Koji broj je 'neutral' za operaciju množenja matrica?", answers: { A: "Nula matrica", B: "Jedinična matrica", C: "Skalarna matrica", D: "Transponovana matrica" }, correct: "B" },
{ question: "Kako se naziva funkcija oblika f(x) = ax + b?", answers: { A: "Kvadratna", B: "Eksponencijalna", C: "Linearna", D: "Logaritamska" }, correct: "C" },
{ question: "Koji je rezultat množenja dva imaginarna broja (npr. 2i * 3i)?", answers: { A: "6", B: "6i", C: "0", D: "-6" }, correct: "D" },
{ question: "Koliko rješenja može imati kvadratna jednačina u skupu realnih brojeva?", answers: { A: "Uvijek dva", B: "Uvijek jedno", C: "Nula, jedno ili dva", D: "Beskonačno" }, correct: "C" },
{ question: "Šta je 'Faktorijel' broja n (n!)?", answers: { A: "Zbir brojeva od 1 do n", B: "n na kvadrat", C: "n podijeljeno sa 2", D: "Proizvod svih prirodnih brojeva od 1 do n" }, correct: "D" },
{ question: "Koja je oznaka za skup kompleksnih brojeva?", answers: { A: "C", B: "K", D: "Cx", D: "Kx" }, correct: "A" },
{ question: "Kako se naziva problem u kojem se traži najkraći put koji posjećuje svaki grad tačno jednom i vraća se u početni?", answers: { A: "Problem trgovačkog putnika", B: "Problem kineskog poštara", C: "Dijkstrin algoritam", D: "Problem ruksaka" }, correct: "A" },
{ question: "Koji Millennium problem se bavi pitanjem da li se svaki problem čije rješenje možemo brzo provjeriti može i brzo riješiti?", answers: { A: "Riemannova hipoteza", B: "Navier-Stokes", C: "P vs NP", D: "Hodgeova konjektura" }, correct: "C" },
{ question: "Kako se naziva paradoks koji kaže da ako imamo dovoljno veliku grupu ljudi, dvoje će imati isti broj dlaka na glavi?", answers: { A: "Dirichletov princip", B: "Paradoks lažljivca", C: "Russellov paradoks", D: "Banachov paradoks" }, correct: "A" },
{ question: "Kako se naziva skup brojeva koji se ne mogu dobiti kao rješenje bilo koje polinomske jednačine sa cijelim koeficijentima?", answers: { A: "Prirodni brojevi", B: "Racionalni brojevi", C: "Transcendentni brojevi", D: "Imaginarni brojevi" }, correct: "C" },
{ question: "Koji je rezultat operacije log(1) za bilo koju bazu?", answers: { A: "1", B: "Baza logaritma", C: "0", D: "Beskonačno" }, correct: "C" },
{ question: "Šta je 'Jacobijan' u multivarijabilnoj analizi?", answers: { A: "Determinanta matrice parcijalnih izvoda", B: "Zbir svih brojeva", C: "Vrsta integrala", D: "Vektor normale" }, correct: "A" },
{ question: "Kako se naziva tačka u kojoj se funkcija mijenja iz konveksne u konkavnu?", answers: { A: "Ekstrem", B: "Prevojna tačka (infleksija)", C: "Nula funkcije", D: "Asimptota" }, correct: "B" },
{ question: "Koji matematičar je poznat po razvoju 'Teorije katastrofa'?", answers: { A: "Benoit Mandelbrot", B: "John von Neumann", C: "René Thom", D: "Henri Poincaré" }, correct: "C" },  { question: "Kako se zove teorem koji kaže da se svaki prost broj oblika 4n+1 može prikazati kao zbir dva kvadrata?", answers: { A: "Fermatov teorem o dva kvadrata", B: "Lagrangeov teorem", C: "Eulerov teorem", D: "Gausov teorem" }, correct: "A" },
{ question: "Kako se zove kriva koja predstavlja putanju tačke na kružnici koja se kotrlja po pravoj liniji?", answers: { A: "Cikloida", B: "Parabola", C: "Elipsa", D: "Hiperbola" }, correct: "A" },
{ question: "Koji Millennium problem je jedini riješen do danas?", answers: { A: "Riemannova hipoteza", B: "Navier-Stokes", C: "Poincaréova pretpostavka", D: "P vs NP" }, correct: "C" },
{ question: "Koliko iznosi determinanta matrice 2x2: [[a,b],[c,d]]?", answers: { A: "ad + bc", B: "ab - cd", C: "ad - bc", D: "ac - bd" }, correct: "C" },
{ question: "Šta je 'Gausova kriva'?", answers: { A: "Normalna raspodjela", B: "Kružnica", C: "Putanja komete", D: "Vrsta integrala" }, correct: "A" },
{ question: "Koji je rezultat operacije sin²(x) + cos²(x)?", answers: { A: "0", B: "sin(2x)", C: "1", D: "tan(x)" }, correct: "C" },
{ question: "Kako se naziva pravilo za računanje limesa neodređenih oblika (0/0 ili ∞/∞)?", answers: { A: "Pitagorino pravilo", B: "L'Hôpitalovo pravilo", C: "Gausovo pravilo", D: "Newtonovo pravilo" }, correct: "B" },
{ question: "Koji Millennium problem se odnosi na distribuciju prostih brojeva?", answers: { A: "Birch i Swinnerton-Dyer", B: "Riemannova hipoteza", C: "Yang-Mills", D: "Hodgeova konjektura" }, correct: "B" },
{ question: "Koliko iznosi imaginarni dio broja z = 5 + 3i?", answers: { A: "5", B: "-1", C: "3i", D: "3" }, correct: "D" },
{ question: "Koliko iznosi volumen sfere poluprečnika r?", answers: { A: "4πr²", B: "2πr²", C: "πr²", D: "(4/3)πr³" }, correct: "D" },
{ question: "Koliko krakova ima standardna pahulja zbog molekularne strukture leda?", answers: { A: "4", B: "5", C: "6", D: "7" }, correct: "C" }
]
},

funFacts: {
  easy: [
{ question: "Koliko je 2 na petu?", answers: { A: "32", B: "16", C: "25", D: "64" }, correct: "A" },
{ question: "Koji kvadrat je najbliži broju 1000?", answers: { A: "30²", B: "32²", C: "31²", D: "33²" }, correct: "B" },
{ question: "Kako se zove razlomak kod kojeg je brojnik veći od nazivnika?", answers: { A: "Nepotpuni razlomak", B: "Mješoviti broj", C: "Nepopravljeni razlomak", D: "Nepravilan razlomak" }, correct: "D" },
{ question: "Nastavni niz: 2, 6, 12, 20, 30, ... Koji je sljedeći član?", answers: { A: "36", B: "40", C: "42", D: "56" }, correct: "C" },
{ question: "Rene Dekart je poznat po svojoj slavnoj izreci:", answers: { A: "'Mislim, dakle postojim'", B: "'Znanje je moć'", C: "'Eureka!'", D: "'Sve je relativno'" }, correct: "A" },
{ question: "Kako se zove oblik sa 8 strana?", answers: { A: "Heksagon", B: "Oktagon", C: "Dekagon", D: "Tetraedr" }, correct: "B" },
{ question: "Kako se zove čuveni paradoks sa beskonačnim koracima gdje Ahil ne može sustići kornjaču?", answers: { A: "Paradox smrti", B: "Zenonov Paradox", C: "Simpsonov paradoks", D: "Galilejev paradoks" }, correct: "B" },
{ question: "Koliki je kubni korijen iz 27?", answers: { A: "3", B: "9", C: "27", D: "6" }, correct: "A" },
{ question: "U kojoj zemlji je rođen matematičar Gauss?", answers: { A: "Njemačka", B: "Švicarska", C: "Austrija", D: "Francuska" }, correct: "A" },
{ question: "U kojoj zemlji je rođen matematičar Fermat?", answers: { A: "Italija", B: "Španija", C: "Francuska", D: "Engleska" }, correct: "C" },
{ question: "U kojem gradu je rođen matematičar Pascal?", answers: { A: "Pariz", B: " Clermont-Ferrand", C: "Marseille", D: "Nice" }, correct: "B" },
{ question: "U kojoj zemlji je rođen matematičar Newton?", answers: { A: "Škotska", B: "Engleska", C: "Irska", D: "Wales" }, correct: "B" },
{ question: "Koji je rimski znak za broj 50?", answers: { A: "L", B: "C", C: "V", D: "X" }, correct: "A" },
{ question: "Koji je rimski znak za broj 100?", answers: { A: "D", B: "L", C: "C", D: "X" }, correct: "C" },
{ question: "Koji je rimski znak za broj 1000?", answers: { A: "M", B: "D", C: "C", D: "X" }, correct: "A" },
{ question: "Koji je rimski znak za broj 10?", answers: { A: "V", B: "X", C: "L", D: "I" }, correct: "B" },
{ question: "Koji je rimski znak za broj 500?", answers: { A: "M", B: "D", C: "C", D: "L" }, correct: "B" },
{ question: "Koje je četvrto slovo grčkog alfabeta?", answers: { A: "Gamma", B: "Delta", C: "Beta", D: "Epsilon" }, correct: "B" },
{ question: "Koje je treće slovo grčkog alfabeta?", answers: { A: "Beta", B: "Delta", C: "Gamma", D: "Alpha" }, correct: "C" },
{ question: "Koje je posljednje slovo grčkog alfabeta?", answers: { A: "Sigma", B: "Omega", C: "Psi", D: "Theta" }, correct: "B" },
{ question: "U kojem gradu je osnovan Institut Clay Mathematics?", answers: { A: "New York", B: "Cambridge", C: "San Francisco", D: "Seattle" }, correct: "B" },
{ question: "Gdje se nalazi 'Eulerova soba' u čast Leonharda Eulera?", answers: { A: "Bern", B: "Zürich", C: "Basel", D: "Berlin" }, correct: "C" },
{ question: "U kojoj zemlji se nalazi najveća matematička biblioteka (Bibliothèque de mathématiques)?", answers: { A: "Francuska", B: "Njemačka", C: "SAD", D: "Italija" }, correct: "A" },
{ question: "Gdje se nalazi najveći matematički muzej na svijetu (Museum of Mathematics)?", answers: { A: "New York", B: "London", C: "Berlin", D: "Tokyo" }, correct: "A" },
{ question: "U kojem gradu se nalazi 'Københavns Universitet' gdje je radio Niels Bohr?", answers: { A: "Stockholm", B: "Kopenhagen", C: "Oslo", D: "Helsinki" }, correct: "B" },
{ question: "Koja je prva civilizacija razvila metodu rješavanja kvadratnih jednačina?", answers: { A: "Egipćani", B: "Babilonci", C: "Grci", D: "Kinezi" }, correct: "B" },
{ question: "U kojem gradu se nalazi čuveni Most matematike?", answers: { A: "London", B: "Pariz", C: "Cambridge", D: "Oxford" }, correct: "C" },
{ question: "U kojoj zemlji je rođen Pitagora?", answers: { A: "Grčka", B: "Italija", C: "Turska", D: "Egipat" }, correct: "A" },
{ question: "Gdje se nalazi Institut za napredne studije gdje je radio Einstein?", answers: { A: "Boston", B: "Princeton", C: "Cambridge", D: "New York" }, correct: "B" },
{ question: "U kojem gradu se nalazi Fields Institut za matematiku?", answers: { A: "Vancouver", B: "Montreal", C: "Toronto", D: "Ottawa" }, correct: "C" },
{ question: "Gdje je rođen matematičar Leonhard Euler?", answers: { A: "Njemačka", B: "Švicarska", C: "Austrija", D: "Holandija" }, correct: "B" },
{ question: "U kojoj zemlji se nalazi čuvena Library of Alexandria, poznata po matematičkoj tradiciji?", answers: { A: "Egipat", B: "Grčka", C: "Italija", D: "Francuska" }, correct: "A" },
{ question: "U kojem gradu je osnovan Institut za matematičke nauke (IMS)?", answers: { A: "Beijing", B: "New York", C: "Singapore", D: "Paris" }, correct: "C" },
{ question: "Gdje se nalazi CERN, poznat po matematičkim i fizičkim istraživanjima?", answers: { A: "Švicarska", B: "Francuska", C: "Njemačka", D: "Italija" }, correct: "A" },
{ question: "U kojem gradu se nalazi MIT, poznat po matematici i tehnologiji?", answers: { A: "Boston", B: "Cambridge, Massachusetts", C: "San Francisco", D: "Seattle" }, correct: "B" },
{ question: "Kako se zove mnogougao sa 12 strana?", answers: { A: "Dekagon", B: "Dodekagon", C: "Hendekagon", D: "Oktagon" }, correct: "B" },
{ question: "Ko je prvi matematički opisao zlatni presjek?", answers: { A: "Euklid", B: "Newton", C: "Euler", D: "Gauss" }, correct: "A" },
{ question: "Koji broj je jedini koji je i paran i prost?", answers: { A: "0", B: "1", C: "2", D: "3" }, correct: "C" },
{ question: "Koliko sati ima u jednoj sedmici?", answers: { A: "144", B: "160", C: "168", D: "176" }, correct: "C" },
{ question: "Na koliko načina se mogu posložiti 3 različita predmeta u red?", answers: { A: "3", B: "6", C: "9", D: "12" }, correct: "B" },
{ question: "Na koliko načina se mogu posložiti 4 različita predmeta u red?", answers: { A: "12", B: "16", C: "24", D: "32" }, correct: "C" },
{ question: "Kolika je površina kruga poluprečnika 7 cm?", answers: { A: "49π", B: "14π", C: "21π", D: "28π" }, correct: "A" },
{ question: "Kolika je površina kruga poluprečnika 8 cm?", answers: { A: "16π", B: "64π", C: "32π", D: "8π" }, correct: "B" },
{ question: "Kolika je površina kruga poluprečnika 10 cm?", answers: { A: "20π", B: "50π", C: "100π", D: "10π" }, correct: "C" },
{ question: "Koji matematički simbol koristimo za približno jednako?", answers: { A: "≈", B: "=", C: "≠", D: "≤" }, correct: "A" },
{ question: "Koji je najveći prosti broj manji od 100?", answers: { A: "97", B: "91", C: "89", D: "99" }, correct: "A" },
{ question: "Za šta se koristi Pascalov trougao?", answers: { A: "Geometriju kružnice", B: "Kombinatoriku i binomne koeficijente", C: "Rješavanje integrala", D: "Logaritamske funkcije" }, correct: "B" },
{ question: "Po kojem matematičaru je nazvana metoda dijeljenja polinoma?", answers: { A: "Newton", B: "Horner", C: "Gauss", D: "Lagrange" }, correct: "B" },
{ question: "Koliko stranica ima dodekaedar?", answers: { A: "10", B: "12", C: "14", D: "16" }, correct: "B" },
{ question: "Koliko je 1+1 u modularnoj aritmetici mod 2?", answers: { A: "0", B: "1", C: "2", D: "Nedefinisano" }, correct: "A" },
{ question: "Koja konstanta je približno 2.718?", answers: { A: "π", B: "e", C: "φ", D: "γ" }, correct: "B" },
{ question: "Koji je jedini broj koji se ne može napisati rimskim brojevima?", answers: { A: "0", B: "1", C: "1000", D: "Milion" }, correct: "A" },
{ question: "Koliko stranica ima kocka?", answers: { A: "4", B: "6", C: "8", D: "12" }, correct: "B" },
{ question: "Šta znači prefiks 'kilo'?", answers: { A: "100", B: "1000", C: "10000", D: "1000000" }, correct: "B" },
{ question: "Kako se zove trijada brojeva kod Pitagorine teoreme?", answers: { A: "Pitagorina trojka", B: "Euklid trojka", C: "Matematička trojka", D: "Geometrijska trojka" }, correct: "A" },
{ question: "Koliko stepeni ima pun krug?", answers: { A: "180°", B: "270°", C: "360°", D: "450°" }, correct: "C" },
{ question: "Koliko je 0! (faktorijel nule)?", answers: { A: "0", B: "1", C: "2", D: "Nedefinisano" }, correct: "B" },
{ question: "Koja je jedina cifra koja se ne pojavljuje u binarnom sistemu?", answers: { A: "0", B: "1", C: "2", D: "Nijedna" }, correct: "C" },
{ question: "Šta je najmanji prirodan broj koji nije prost, a nije ni složen?", answers: { A: "1", B: "2", C: "3", D: "4" }, correct: "A" }
	],
	
  hard: [
{ question: "Šta je 'Aritmetička sredina'?", answers: { A: "Najveći broj u nizu", B: "Zbir podijeljen sa brojem elemenata", C: "Srednji broj po rangu", D: "Najmanji broj u nizu" }, correct: "B" },
{ question: "Kako se zove gornji dio razlomka?", answers: { A: "Nazivnik", B: "Količnik", C: "Brojnik", D: "Ostatak" }, correct: "C" },
{ question: "Koji je rimski simbol za broj 1000?", answers: { A: "D", B: "L", C: "M", D: "C" }, correct: "C" },
{ question: "Koliko iznosi kvadrat broja 15?", answers: { A: "215", B: "225", C: "155", D: "250" }, correct: "B" },
{ question: "Kako se zove naučnik koji je povikao 'Eureka!' u kadi?", answers: { A: "Arhimed", B: "Pitagora", C: "Euklid", D: "Galileo" }, correct: "A" },
{ question: "Šta znači prefiks 'Kilo' u mjernim jedinicama?", answers: { A: "Sto", B: "Deset", C: "Hiljada", D: "Milion" }, correct: "C" },
{ question: "Kako se zove ugao od tačno 90 stepeni?", answers: { A: "Pravi ugao", B: "Oštar ugao", C: "Tupi ugao", D: "Pun ugao" }, correct: "A" },
{ question: "Koji je simbol za skup cijelih brojeva?", answers: { A: "N", B: "R", C: "Z", D: "Q" }, correct: "C" },
{ question: "Kako se zove prva programerka u historiji, saradnica Charlesa Babbagea?", answers: { A: "Ada Lovelace", B: "Marie Curie", C: "Rosalind Franklin", D: "Grace Hopper" }, correct: "A" },
{ question: "Koliko milimetara ima u jednom centimetru?", answers: { A: "100", B: "Milion", C: "1000", D: "10" }, correct: "D" },
{ question: "Kako se zove broj koji ima samo dva djelioca (1 i samog sebe)?", answers: { A: "Složen broj", B: "Prost broj", C: "Parni broj", D: "Negativni broj" }, correct: "B" },
{ question: "Koliko ivica ima kocka?", answers: { A: "8", B: "10", C: "12", D: "6" }, correct: "C" },
{ question: "Kako se zove četverougao koji ima sve četiri stranice jednake, ali uglovi nisu nužno 90°?", answers: { A: "Kvadrat", B: "Romb", C: "Trapez", D: "Paralelogram" }, correct: "B" },
{ question: "Koji broj dobijemo kada 100 podijelimo sa 0.5?", answers: { A: "50", B: "200", C: "150", D: "25" }, correct: "B" },
{ question: "Koliko minuta ima u jednom danu?", answers: { A: "1240", B: "1340", C: "1440", D: "1640" }, correct: "C" },
{ question: "Koji je rimski simbol za broj 500?", answers: { A: "C", B: "L", C: "M", D: "D" }, correct: "D" },
{ question: "Kako se zove najveća tetiva u krugu?", answers: { A: "Radijus", B: "Prečnik (Dijametar)", C: "Tangenta", D: "Sječica" }, correct: "B" },
{ question: "Koliko iznosi kvadratni korijen iz 81?", answers: { A: "9", B: "7", C: "8", D: "10" }, correct: "A" },
{ question: "Koliko stepeni iznosi zbir uglova u pravouglom trouglu?", answers: { A: "90°", B: "180°", C: "270°", D: "360°" }, correct: "B" },
{ question: "Šta je 'skup' u matematici?", answers: { A: "Kolekcija dobro definisanih objekata", B: "Zbir brojeva", C: "Rezultat množenja", D: "Geometrijski crtež" }, correct: "A" },
{ question: "Koji je sljedeći broj u nizu: 1, 4, 9, 16, 25...?", answers: { A: "30", B: "35", C: "36", D: "49" }, correct: "C" },
{ question: "Koliko iznosi 2 na petu (2⁵)?", answers: { A: "10", B: "16", C: "32", D: "64" }, correct: "C" },
{ question: "Koji je jedini cijeli broj koji nije ni pozitivan ni negativan?", answers: { A: "0", B: "1", C: "-1", D: "Beskonačno" }, correct: "A" },
{ question: "Koja je oznaka za skup prirodnih brojeva bez nule?", answers: { A: "N", B: "N₀", C: "Z", D: "R" }, correct: "A" },
{ question: "Kako se zove poligon sa 6 stranica?", answers: { A: "Pentagon", B: "Heksagon", C: "Heptagon", D: "Oktagon" }, correct: "B" },
{ question: "Koliko litara vode stane u jedan kubni metar (1 m³)?", answers: { A: "100", B: "500", C: "1000", D: "10000" }, correct: "C" }
  ],
  
  hardest: [
{ question: "Koliko iznosi zbir recipročnih vrijednosti kvadrata prirodnih brojeva (Baselov problem)?", answers: { A: "π²/6", B: "π/4", C: "e²", D: "ln(2)" }, correct: "A" },
{ question: "Koliko iznosi Eulerova karakteristika (χ) za površinu torusa?", answers: { A: "2", B: "1", C: "0", D: "-1" }, correct: "C" },
{ question: "Kako se zove funkcija koja je svuda neprekidna, ali nigdje diferencijabilna?", answers: { A: "Weierstrassova", B: "Dirichletova", C: "Gausova", D: "Taylorova" }, correct: "A" },
{ question: "Koji teorem kaže da u svakom formalnom sistemu postoje istine koje se ne mogu dokazati?", answers: { A: "Cantorov teorem", B: "Gödelov teorem", C: "Russellov teorem", D: "Nashov teorem" }, correct: "B" },
{ question: "Koliko iznosi vrijednost Zeta funkcije ζ(2)?", answers: { A: "π²/6", B: "1", C: "0", D: "Beskonačno" }, correct: "A" },
{ question: "Kako se naziva preslikavanje koje čuva udaljenosti između tačaka?", answers: { A: "Izometrija", B: "Projekcija", C: "Rotacija", D: "Dilatacija" }, correct: "A" },
{ question: "Koliko iznosi sinus od π/2?", answers: { A: "0", B: "0.5", C: "1", D: "-1" }, correct: "C" },
{ question: "Kako se zove matrica čija je determinanta nula?", answers: { A: "Regularna", B: "Singularna", C: "Jedinična", D: "Invertibilna" }, correct: "B" },
{ question: "Koliko rješenja ima kvadratna jednačina s negativnom diskriminantom u skupu R?", answers: { A: "2", B: "1", C: "0", D: "Beskonačno" }, correct: "C" },
{ question: "Koliko iznosi log10(1000)?", answers: { A: "1", B: "2", C: "3", D: "10" }, correct: "C" },
{ question: "Koliko iznosi 0! (nula faktorijel)?", answers: { A: "0", B: "1", C: "Beskonačno", D: "Nedefinisano" }, correct: "B" },
{ question: "Koliko iznosi unutrašnji ugao u pravilnom petouglu (pentagonu)?", answers: { A: "108°", B: "72°", C: "90°", D: "120°" }, correct: "A" },
{ question: "Ko je autor čuvene knjige 'Elementi'?", answers: { A: "Pitagora", B: "Euklid", C: "Arhimed", D: "Platon" }, correct: "B" },
{ question: "Šta je 'Obim' kvadrata stranice 3?", answers: { A: "9", B: "6", C: "12", D: "15" }, correct: "C" },
{ question: "Šta je 'Kvadratni korijen' iz 1600?", answers: { A: "40", B: "80", C: "400", D: "200" }, correct: "A" },
{ question: "Koji je matematičar toliko volio kafu da je tvrdio da je 'matematičar mašina koja kafu pretvara u teoreme'?", answers: { A: "Isaac Newton", B: "Paul Erdős", C: "Leonhard Euler", D: "Blaise Pascal" }, correct: "B" },
{ question: "Koji je antički matematičar ubijen jer je branio svoje geometrijske krugove nacrtane u pijesku od rimskog vojnika?", answers: { A: "Pitagora", B: "Euklid", C: "Arhimed", D: "Tales" }, correct: "C" },
{ question: "Kako se zove prva žena u historiji koja je smatrana profesionalnom matematičarkom (antička Grčka)?", answers: { A: "Hypatia", B: "Ada Lovelace", C: "Sophie Germain", D: "Emmy Noether" }, correct: "A" },
{ question: "Koji je matematičar bio i vrhunski fizičar, a jabuka mu je navodno pomogla da shvati gravitaciju?", answers: { A: "Galileo", B: "Kepler", C: "Leibniz", D: "Isaac Newton" }, correct: "D" },
{ question: "Koji je francuski matematičar poginuo u dvoboju pištoljima u svojoj 20. godini, ostavivši temelje moderne algebre?", answers: { A: "Évariste Galois", B: "Augustin-Louis Cauchy", C: "Pierre de Fermat", D: "Joseph Fourier" }, correct: "A" },
{ question: "Ko se smatra 'ocem kompjutera' jer je dizajnirao prvu analitičku mašinu?", answers: { A: "Alan Turing", B: "Charles Babbage", C: "John von Neumann", D: "Blaise Pascal" }, correct: "B" },
{ question: "Koji je matematičar oslijepio u jednom oku, a kasnije i potpuno, ali je nastavio diktirati radove napamet?", answers: { A: "Carl Friedrich Gauss", B: "Isaac Newton", C: "Leonhard Euler", D: "Bernhard Riemann" }, correct: "C" },
{ question: "Kako se zvala saradnica Charlesa Babbagea koja je napisala prvi program za mašinu?", answers: { A: "Hypatia", B: "Marie Curie", C: "Grace Hopper", D: "Ada Lovelace" }, correct: "D" },
{ question: "Šta je 'Banach-Tarski paradoks'?", answers: { A: "Dijeljenje sa nulom", B: "Rastavljanje kugle na dijelove od kojih se prave dvije identične kugle", C: "Niz koji nema limes", D: "Geometrija bez tačaka" }, correct: "B" },
{ question: "Kako se naziva hipoteza koja kaže da ne postoji skup čija je kardinalnost između cijelih i realnih brojeva?", answers: { A: "Hipoteza kontinuuma", B: "Zermelov aksiom", C: "Aksiom izbora", D: "Cantorov aksiom" }, correct: "A" },
{ question: "Kako se naziva niz u kojem je svaki član zbir prethodna dva, ali počinje sa 2 i 1?", answers: { A: "Fibonaccijev", B: "Lucasov", C: "Pascalov", D: "Taylorov" }, correct: "B" },
{ question: "Šta tvrdi 'Greenov teorem'?", answers: { A: "Povezuje linijski integral sa dvostrukim integralom po oblasti", B: "Boja je bitna u topologiji", C: "Sve krive su zelene", D: "Zbir uglova je 180°" }, correct: "A" },
{ question: "Koji je naziv za preslikavanje koje čuva uglove ali ne nužno i dužine?", answers: { A: "Izometrija", B: "Konformno preslikavanje", C: "Linearno preslikavanje", D: "Inverzija" }, correct: "B" },
{ question: "Koliko iznosi Gausova zakrivljenost 'pseudofere'?", answers: { A: "Konstantna pozitivna", B: "Nula", C: "Konstantna negativna", D: "Promjenjiva" }, correct: "C" },
{ question: "Šta je 'L'Hôpitalovo pravilo'?", answers: { A: "Pravilo za bolnice", B: "Pravilo za rješavanje limesa oblika 1/n", C: "Geometrijski teorem", D: "Metod za rješavanje limesa oblika 0/0" }, correct: "D" },
{ question: "Šta je 'Bijekcija'?", answers: { A: "Samo 1-1 preslikavanje", B: "Injektivno preslikavanje", C: "Sirjektivno preslikavanje", D: "Preslikavanje koje je i injektivno i sirjektivno" }, correct: "D" },
{ question: "Ko je uveo notaciju za integral ∫?", answers: { A: "Leibniz", B: "Newton", C: "Euler", D: "Riemann" }, correct: "A" },
{ question: "Ko je prvi upotrijebio znak '=' za jednakost?", answers: { A: "Descartes", B: "Robert Recorde", C: "Leibniz", D: "Newton" }, correct: "B" },
{ question: "Kada je objavljena Euklidova knjiga 'Elementi'?", answers: { A: "500. p.n.e.", B: "300. p.n.e.", C: "100. p.n.e.", D: "100. n.e." }, correct: "B" },
{ question: "Koliko rješenja ima jednačina x^2 = -1 u realnim brojevima?", answers: { A: "2", B: "1", C: "0", D: "Beskonačno" }, correct: "C" },
{ question: "Ko je riješio Poincareovu hipotezu?", answers: { A: "Andrew Wiles", B: "Terence Tao", C: "Grigori Perelman", D: "John Nash" }, correct: "C" },
{ question: "U kojoj godini je Emmy Noether objavila svoju čuvenu teoremu?", answers: { A: "1905", B: "1915", C: "1918", D: "1925" }, correct: "C" },
{ question: "Ko je uveo koncept matematičke rigoroznosti u analizi (ε-δ definicija limita)?", answers: { A: "Cauchy", B: "Weierstrass", C: "Riemann", D: "Bolzano" }, correct: "B" },
{ question: "Ko je prvi formalno definisao kontinuum u realnim brojevima?", answers: { A: "Cantor", B: "Dedekind", C: "Weierstrass", D: "Hilbert" }, correct: "B" },
{ question: "Ko je uveo aksiomatski pristup geometriji u 19. vijeku?", answers: { A: "Hilbert", B: "Euclid", C: "Bolyai", D: "Lobachevsky" }, correct: "A" },
{ question: "Koja evropska država je dom velikom broju matematičkih muzeja i instituta, uključujući CERN?", answers: { A: "Švicarska", B: "Francuska", C: "Njemačka", D: "Italija" }, correct: "A" },
{ question: "Koji grad in Italiji je bio dom Fibonacci-a, poznatog po Fibonaccijevom nizu?", answers: { A: "Pisa", B: "Florencija", C: "Rim", D: "Milano" }, correct: "A" },
{ question: "Koja država je rodno mjesto Renea Descartesa, poznatog po analitičkoj geometriji?", answers: { A: "Belgija", B: "Francuska", C: "Švicarska", D: "Holandija" }, correct: "B" },
{ question: "U kojem evropskom gradu se nalazi čuveni Institut Henri Poincaré, poznat po matematičkoj fizici i teoriji haosa?", answers: { A: "Pariz", B: "Berlin", C: "London", D: "Madrid" }, correct: "A" },
{ question: "Koja azijska zemlja je doprinijela razvoju negativnih brojeva u ranoj matematici?", answers: { A: "Kina", B: "Indija", C: "Japan", D: "Arabija" }, correct: "A" },
{ question: "U kojoj zemlji je rođen matematičar Riemann?", answers: { A: "Francuska", B: "Austrija", C: "Švicarska", D: "Njemačka" }, correct: "D" },
{ question: "U kojoj zemlji je rođen matematičar Hilbert?", answers: { A: "Njemačka", B: "Poljska", C: "Češka", D: "Austrija" }, correct: "A" },
{ question: "U kojoj zemlji je rođen matematičar Kolmogorov?", answers: { A: "Rusija", B: "Ukrajina", C: "Poljska", D: "Bjelorusija" }, correct: "A" }
]
},

interestingFacts: {
easy: [
{ question: "Koliki je zbir uglova u trouglu?", answers: { A: "360°", B: "90°", C: "270°", D: "180°" }, correct: "D" },
{ question: "Ako avion padne na granici dvije države, gdje se sahranjuju preživjeli?", answers: { A: "U prvoj državi", B: "U drugoj", C: "Na granici", D: "Ne sahranjuju se" }, correct: "D" },
{ question: "Koliko puta dnevno se poklope kazaljke na satu?", answers: { A: "12", B: "22", C: "24", D: "48" }, correct: "B" },
{ question: "Koji od ponuđenih brojeva je jednak zbiru svojih cifara pomnoženih sa 3?", answers: { A: "12", B: "18", C: "27", D: "36" }, correct: "C" },
{ question: "Ako se broj poveća za 20% pa smanji za 20%, rezultat je:", answers: { A: "Veći", B: "Manji", C: "Isti", D: "Zavisi" }, correct: "B" },
{ question: "Koliko dijagonala ima kvadrat?", answers: { A: "1", B: "2", C: "4", D: "6" }, correct: "B" },
{ question: "Ako baciš novčić 3 puta, koliko je mogućih ishoda?", answers: { A: "6", B: "8", C: "4", D: "3" }, correct: "B" },
{ question: "Koji je najmanji broj koji je djeljiv sa svim brojevima od 1 do 5?", answers: { A: "20", B: "60", C: "30", D: "120" }, correct: "B" },
{ question: "Koji broj je palindrom?", answers: { A: "123", B: "121", C: "132", D: "231" }, correct: "B" },
{ question: "Koliko je suma beskonačnog niza 1/2 + 1/4 + 1/8 + ...?", answers: { A: "1", B: "2", C: "∞", D: "1/2" }, correct: "A" },
{ question: "Ako imaš 5 različitih knjiga, koliko načina da ih poredaš?", answers: { A: "25", B: "120", C: "60", D: "100" }, correct: "B" },
{ question: "Koji broj je kvadrat?", answers: { A: "361", B: "256", C: "121", D: "Svi navedeni" }, correct: "D" },
{ question: "Ako je 5 mašina potrebno 5 minuta da naprave 5 proizvoda, koliko treba 100 mašina za 100 proizvoda?", answers: { A: "100 min", B: "5 min", C: "50 min", D: "1 min" }, correct: "B" },
{ question: "Koliko je 2^10 + 2^10?", answers: { A: "1024", B: "2048", C: "4096", D: "512" }, correct: "B" },
{ question: "Koliko je √2 na 2 decimale?", answers: { A: "1.41", B: "1.42", C: "1.43", D: "1.44" }, correct: "A" },
{ question: "Koji je najmanji broj koji je djeljiv sa 1 do 10?", answers: { A: "2520", B: "5040", C: "720", D: "360" }, correct: "A" },
{ question: "Koja je vrijednost 2^5?", answers: { A: "16", B: "32", C: "64", D: "128" }, correct: "B" },
{ question: "Šta je zlatni presjek približno?", answers: { A: "1.414", B: "1.618", C: "2.718", D: "3.142" }, correct: "B" },
{ question: "Koliko je 2^0?", answers: { A: "2", B: "0", C: "1", D: "Nedefinisano" }, correct: "C" },
{ question: "Koliko je 6666 × 6667?", answers: { A: "44442222", B: "33333333", C: "22224444", D: "55552222" }, correct: "A" },
{ question: "Koji broj je djeljiv sa 6?", answers: { A: "214", B: "222", C: "230", D: "212" }, correct: "B" },
{ question: "Šta je NZS u matematici?", answers: { A: "Najveći zajednički sadržilac", B: "Najmanji zajednički sadržalac", C: "Najmanji zajednički djelilac", D: "Neparni zajednički skup" }, correct: "B" },
{ question: "Šta je NZD u matematici?", answers: { A: "Najveći zajednički djelilac", B: "Najmanji zajednički djelilac", C: "Najmanji zajednički sadržalac", D: "Negativni zbir dijelitelja" }, correct: "A" },
{ question: "Zlatni rez je povezan sa kojim nizom?", answers: { A: "Lucasov niz", B: "Pitagorin niz", C: "Fibonaccijev niz", D: "Geometrijski niz" }, correct: "C" },
{ question: "Kako se najčešće prikazuje odnos skupova?", answers: { A: "Histogram", B: "Vennov dijagram", C: "Linijski graf", D: "Tabelarni prikaz" }, correct: "B" },
{ question: "Koji broj je djeljiv sa 3?", answers: { A: "124", B: "222", C: "121", D: "101" }, correct: "B" },
{ question: "Koji simbol označava presjek skupova?", answers: { A: "∪", B: "∩", C: "⊂", D: "∈" }, correct: "B" },
{ question: "Šta je decimalni zapis broja 1/3?", answers: { A: "0.34", B: "0.3", C: "0.333", D: "0.333..." }, correct: "D" },
{ question: "Koliko uglova ima pentagon?", answers: { A: "4", B: "5", C: "6", D: "7" }, correct: "B" },
{ question: "Koji je zbir prva tri prosta broja?", answers: { A: "8", B: "10", C: "12", D: "15" }, correct: "B" },
{ question: "Koliko ivica ima tetraedar?", answers: { A: "4", B: "6", C: "8", D: "12" }, correct: "B" },
{ question: "Koliko je 1 + 2 + 3 + ... + 10?", answers: { A: "45", B: "50", C: "60", D: "55" }, correct: "D" },
{ question: "Koliki je zbir unutrašnjih uglova u pentagonu?", answers: { A: "360°", B: "720°", C: "480°", D: "540°" }, correct: "D" },
{ question: "Koliko je 5! (faktorijel pet)?", answers: { A: "60", B: "24", C: "720", D: "120" }, correct: "D" },
{ question: "Ako baciš dvije kocke, kolika je vjerovatnoća da dobiješ zbir 7?", answers: { A: "1/6", B: "1/12", C: "1/36", D: "1/3" }, correct: "A" },
{ question: "Koliko ima prostih brojeva manjih od 10?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "B" },
{ question: "Koji broj je jedini koji je i kvadrat i prost?", answers: { A: "1", B: "4", C: "9", D: "Nijedan" }, correct: "D" },
{ question: "Ako je x + x = x, šta je x?", answers: { A: "1", B: "0", C: "2", D: "-1" }, correct: "B" },
{ question: "Ko je rekao 'Eureka!'?", answers: { A: "Pitagora", B: "Euklid", C: "Arhimed", D: "Newton" }, correct: "C" },
{ question: "Ko je otkrio zakon gravitacije?", answers: { A: "Galileo", B: "Newton", C: "Einstein", D: "Kepler" }, correct: "B" },
{ question: "Koliki je treći ugao u trouglu ako su druga dva 50° i 60°?", answers: { A: "70°", B: "65°", C: "80°", D: "75°" }, correct: "A" },
{ question: "Ako se na svako sljedeće polje šahovske table broj zrna riže udvostručuje počevši od 1, koliko zrna ima na 64. polju?", answers: { A: "Oko 100 kg riže", B: "Jedan kamion riže", C: "Više nego ukupna proizvodnja riže na Zemlji", D: "Nemoguće izračunati" }, correct: "C" },
{ question: "Koliko puta se papir može presaviti u praksi?", answers: { A: "7 puta", B: "10 puta", C: "67", D: "Beskonačno" }, correct: "A" },
{ question: "Koliko pravih se može provući kroz 4 različite tačke (u opštem slučaju)?", answers: { A: "3", B: "4", C: "6", D: "Neodređeno" }, correct: "C" },
{ question: "Šta su kolinearne tačke?", answers: { A: "Tačke na istoj kružnici", B: "Tačke na istoj pravoj", C: "Tačke u ravni", D: "Nasumične tačke" }, correct: "B" },
{ question: "Šta su nekolinearne tačke?", answers: { A: "Tačke na istoj pravoj", B: "Tačke koje leže na kružnici", C: "Tačke koje ne leže na istoj pravoj", D: "Tačke u istom centru" }, correct: "C" },
{ question: "Koji su osnovni pojmovi u geometriji koji se ne definišu?", answers: { A: "Tačka, prava, ravnina", B: "Ugao, duž, krug", C: "Tijelo, volumen, površina", D: "Vektor, matrica, funkcija" }, correct: "A" },
{ question: "Kako se zvala grčka škola gdje je otkrivena iracionalnost brojeva?", answers: { A: "Platonova akademija", B: "Pitagorejska škola", C: "Aristotelova škola", D: "Euklidova škola" }, correct: "B" },
{ question: "Koji umjetnik je koristio matematičke proporcije i zlatni rez u 'Posljednjoj večeri'?", answers: { A: "Michelangelo", B: "Leonardo da Vinci", C: "Raphael", D: "Donatello" }, correct: "B" },
{ question: "Gdje se u prirodi može pronaći Fibonacci niz?", answers: { A: "Cjetovima", B: "U pahuljama i školjkama", C: "Spiralim oblicima", D: "U svim navedenim primjerima" }, correct: "D" },
{ question: "Kako se naziva četverougao čije su sve stranice jednake dužine, ali uglovi nisu pravi?", answers: { A: "Kvadrat", B: "Pravougaonik", C: "Romb", D: "Paralelogram" }, correct: "C" },
{ question: "Koliko je najmanji savršen broj?", answers: { A: "1", B: "6", C: "28", D: "496" }, correct: "B" },
{ question: "Ko je otac modernog računarstva?", answers: { A: "Ada Lovelace", B: "Alan Turing", C: "John von Neumann", D: "Charles Babbage" }, correct: "B" },
{ question: "Ko je uveo simbol π?", answers: { A: "Euler", B: "Gauss", C: "Newton", D: "Wiliam Jones" }, correct: "D" },
{ question: "Ko je osnovao modernu teoriju vjerojatnosti?", answers: { A: "Pascal", B: "Bernoulli", C: "Laplace", D: "Kolmogorov" }, correct: "D" },
{ question: "Ko je poznat kao 'otac moderne logike'?", answers: { A: "Aristotel", B: "Gödel", C: "Frege", D: "Boole" }, correct: "C" },
{ question: "Koji je matematičar postavio teorem koji je ostao neriješen više od 350 godina, sve do 1994. godine?", answers: { A: "Isaac Newton", B: "Pierre de Fermat", C: "Leonhard Euler", D: "Carl Friedrich Gauss" }, correct: "B" },
{ question: "Koji je broj poznat kao 'najmanji Armstrong broj'?", answers: { A: "370", B: "371", C: "407", D: "153" }, correct: "D" },
{ question: "Koji od ponuđenih brojeva je i kvadrat i kub?", answers: { A: "1 i 64", B: "0 i 1", C: "1 i 729", D: "4 i 8" }, correct: "A" }
],

hard: [
{ question: "Kako se zove tijelo koje ima sve tačke jednako udaljene od centra u prostoru?", answers: { A: "Krug", B: "Sfera", C: "Cilindar", D: "Elipsa" }, correct: "B" },
{ question: "Koliko iznosi 15% od 300?", answers: { A: "30", B: "45", C: "60", D: "15" }, correct: "B" },
{ question: "Koji je rimski simbol za broj 90?", answers: { A: "LXXXX", B: "XC", C: "LX", D: "CX" }, correct: "B" },
{ question: "Koliko vrhova ima piramida sa kvadratnom bazom?", answers: { A: "4", B: "5", C: "6", D: "8" }, correct: "B" },
{ question: "Koliko iznosi kvadratni korijen iz 225?", answers: { A: "15", B: "25", C: "12", D: "20" }, correct: "A" },
{ question: "Koji prefiks označava milioniti dio jedinice (10⁻⁶)?", answers: { A: "Mili", B: "Nano", C: "Mikro", D: "Piko" }, correct: "C" },
{ question: "Koliko stepeni iznosi zbir dva komplementna ugla?", answers: { A: "45°", B: "180°", C: "90°", D: "360°" }, correct: "C" },
{ question: "Kako se zove četverougao koji ima samo jedan par paralelnih stranica?", answers: { A: "Romb", B: "Paralelogram", C: "Trapez", D: "Deltoid" }, correct: "C" },
{ question: "Koliko sekundi ima u jednom danu?", answers: { A: "3600", B: "86400", C: "43200", D: "60000" }, correct: "B" },
{ question: "Kako se zove grana matematike koja se bavi prikupljanjem i analizom podataka?", answers: { A: "Geometrija", B: "Algebra", C: "Topologija", D: "Statistika" }, correct: "D" },
{ question: "Šta je 'Modus' u statistici?", answers: { A: "Najčešća vrijednost u nizu", B: "Srednja vrijednost", C: "Najveći broj", D: "Zbir svih vrijednosti" }, correct: "A" },
{ question: "Koliko iznosi 3 na četvrtu (3⁴)?", answers: { A: "12", B: "27", C: "64", D: "81" }, correct: "D" },
{ question: "Koji je sljedeći broj u nizu: 100, 81, 64, 49...?", answers: { A: "40", B: "36", C: "25", D: "32" }, correct: "B" },
{ question: "Koliko iznosi polovina od trećine broja 18?", answers: { A: "3", B: "6", C: "2", D: "9" }, correct: "A" },
{ question: "Kako se zove unutrašnji dio kružnice?", answers: { A: "Obim", B: "Krug", C: "Poluprečnik", D: "Centar" }, correct: "B" },
{ question: "Koji broj nastavlja niz: 2, 5, 11, 23, ...?", answers: { A: "35", B: "41", C: "47", D: "46" }, correct: "C" },
{ question: "Koliko iznosi zbir svih uglova u pravougaoniku?", answers: { A: "180°", B: "270°", C: "360°", D: "540°" }, correct: "C" },
{ question: "Kako se zove grana matematike koja se bavi analizom oblika i prostora?", answers: { A: "Aritmetika", B: "Algebra", C: "Statistika", D: "Geometrija" }, correct: "D" },
{ question: "Koji je najbrži način da pomnožiš dvocifren broj sa 11 (npr. 25 * 11)?", answers: { A: "Dodaš nulu na kraj", B: "Sabeš cifre (2+5) i staviš ih u sredinu (275)", C: "Pomnožiš sa 10 pa dodaš 5", D: "Oduzmeš 11 od broja" }, correct: "B" },
{ question: "Kako se zove sistem računanja koji koristi bazu 60 (stari Babilonci), a koristimo ga i danas za vrijeme?", answers: { A: "Binarni", B: "Decimalni", C: "Heksadecimalni", D: "Seksagezimalni" }, correct: "D" },
{ question: "Koliko iznosi zbir svih uglova u bilo kojem spoljašnjem dijelu poligona?", answers: { A: "180°", B: "360°", C: "540°", D: "720°" }, correct: "B" },
{ question: "Kako se zove dio matematike koji proučava vjerovatnoću igara na sreću?", answers: { A: "Kombinatorika", B: "Geometrija", C: "Aritmetika", D: "Topologija" }, correct: "A" },
{ question: "Koji je sljedeći broj u nizu: 2, 4, 8, 14, 22... ?", answers: { A: "30", B: "32", C: "28", D: "34" }, correct: "B" },
{ question: "Kako se zove razlomak kod kojeg su brojnik i nazivnik zamijenili mjesta?", answers: { A: "Suprotni", B: "Negativni", C: "Recipročni", D: "Složeni" }, correct: "C" },
{ question: "Koliko iznosi korijen iz broja 1000000 (milion)?", answers: { A: "100", B: "1000", C: "10000", D: "10" }, correct: "B" },
{ question: "U kojem se vijeku u Evropi počela masovno koristiti nula?", answers: { A: "5. vijek", B: "9. vijek", C: "12. vijek", D: "15. vijek" }, correct: "C" },
{ question: "Šta označava grčko slovo Delta (Δ) u matematičkim jednačinama?", answers: { A: "Zbir", B: "Nepoznatu", C: "Proizvod", D: "Promjenu ili razliku" }, correct: "D" },
{ question: "Koliko iznosi 0.5 podijeljeno sa 0.5?", answers: { A: "0.25", B: "0.5", C: "1", D: "2" }, correct: "C" },
{ question: "Zagonetka: Ako 9 sati dodaš 5 sati i dobiješ 2, šta gledaš?", answers: { A: "Kalendar", B: "Termometar", C: "Digitron", D: "Sat" }, correct: "D" },
{ question: "Koji oblik nastaje presjekom kupe i ravni paralelne bazi?", answers: { A: "Krug", B: "Elipsa", C: "Trougao", D: "Kvadrat" }, correct: "A" },
{ question: "Koliko iznosi 20% od 50?", answers: { A: "5", B: "10", C: "15", D: "20" }, correct: "B" },
{ question: "Koji je rimski simbol za broj 40?", answers: { A: "XL", B: "XXXX", C: "LX", D: "VL" }, correct: "A" },
{ question: "Koliko iznosi kvadratni korijen iz broja 1600?", answers: { A: "40", B: "400", C: "80", D: "20" }, correct: "A" },
{ question: "Koji je sljedeći broj u nizu: 1, 3, 9, 27...?", answers: { A: "36", B: "54", C: "81", D: "45" }, correct: "C" },
{ question: "Koliko ivica ima tetraedar?", answers: { A: "3", B: "6", C: "8", D: "4" }, correct: "B" },
{ question: "Koji prefiks označava hiljaditi dio jedinice (10⁻³)?", answers: { A: "Centi", B: "Mili", C: "Mikro", D: "Kilo" }, correct: "B" },
{ question: "Kako se zove linija koja spaja centar kruga sa bilo kojom tačkom na kružnici?", answers: { A: "Prečnik", B: "Poluprečnik", C: "Tetiva", D: "Tangenta" }, correct: "B" },
{ question: "Koliko iznosi 5 na treću (5³)?", answers: { A: "15", B: "75", C: "125", D: "225" }, correct: "C" }
],

hardest: [
{ question: "U kojoj zemlji je rođen matematičar Noether?", answers: { A: "Njemačka", B: "Austrija", C: "Švicarska", D: "Italija" }, correct: "A" },
{ question: "U kojoj zemlji je rođen matematičar Cantor?", answers: { A: "Rusija", B: "Švedska", C: "Danska", D: "Nizozemska" }, correct: "A" },
{ question: "Ko je dokazao Fermatovu veliku teoremu?", answers: { A: "Andrew Wiles", B: "Grigori Perelman", C: "Terence Tao", D: "Paul Erdős" }, correct: "A" },
{ question: "U kojem gradu se održava Međunarodni matematički kongres svake 4 godine?", answers: { A: "Uvijek u istom", B: "Rotira se po svijetu", C: "Samo u Evropi", D: "Samo u USA" }, correct: "B" },
{ question: "Gdje se nalazi Matematički institut Steklov?", answers: { A: "Sankt Peterburg", B: "Moskva", C: "Kijev", D: "Minsk" }, correct: "B" },
{ question: "U kojem gradu je Al-Khwarizmi pisao svoje radove o algebri?", answers: { A: "Bagdad", B: "Damask", C: "Kairo", D: "Medina" }, correct: "A" },
{ question: "Ko se smatra prvom poznatom matematičarkom?", answers: { A: "Ada Lovelace", B: "Emmy Noether", C: "Hypatia", D: "Marie Curie" }, correct: "C" },
{ question: "Kako se rimskim brojevima piše 2026?", answers: { A: "MMXXVI", B: "MMXVI", C: "MCMXXVI", D: "MMXXIV" }, correct: "A" },
{ question: "U kojem gradu se nalazi Institut Max Planck za matematiku?", answers: { A: "Berlin", B: "Bonn", C: "Munich", D: "Hamburg" }, correct: "B" },
{ question: "Gdje se nalazi 'Mathematical Sciences Research Institute' (MSRI)?", answers: { A: "Berkeley", B: "Stanford", C: "Princeton", D: "Harvard" }, correct: "A" },
{ question: "U kojem gradu je osnovan 'Institut für Mathematik' u Göttingenu?", answers: { A: "Berlin", B: "Göttingen", C: "Munich", D: "Frankfurt" }, correct: "B" },
{ question: "U kojoj zemlji je rođen matematičar Grothendieck?", answers: { A: "Njemačka", B: "Francuska", C: "Švicarska", D: "Belgija" }, correct: "A" },
{ question: "U kojoj zemlji je rođen matematičar Gödel?", answers: { A: "Austrija", B: "Češka", C: "Njemačka", D: "Švicarska" }, correct: "B" },
{ question: "U kojoj zemlji je rođen matematičar Turing?", answers: { A: "Engleska", B: "Škotska", C: "Irska", D: "Wales" }, correct: "A" },
{ question: "U kojoj zemlji je rođen matematičar Perelman?", answers: { A: "Rusija", B: "Ukrajina", C: "Bjelorusija", D: "Litvanija" }, correct: "A" },
{ question: "U kojoj zemlji je rođen matematičar Wiles?", answers: { A: "Engleska", B: "SAD", C: "Kanada", D: "Australija" }, correct: "A" },
{ question: "U kom gradu se nalazi Institut Henri Poincaré?", answers: { A: "Lyon", B: "Marseille", C: "Pariz", D: "Toulouse" }, correct: "C" },
{ question: "Gdje je osnovana prva Akademija nauka (uključujući matematiku)?", answers: { A: "London", B: "Pariz", C: "Berlin", D: "Firence" }, correct: "D" },
{ question: "Gdje se nalazi Tata Institute of Fundamental Research (TIFR)?", answers: { A: "Indija", B: "Japan", C: "Kina", D: "Koreja" }, correct: "A" },
{ question: "Gdje je održan prvi Internacionalni matematički kongres (1897)?", answers: { A: "Berlin", B: "Pariz", C: "Zürich", D: "London" }, correct: "C" },
{ question: "Šta je Goldbachova hipoteza?", answers: { A: "Svaki parni broj je zbir 2 prosta", B: "Ima beskonačno prostih", C: "π je iracionalan", D: "e je transcendentan" }, correct: "A" },
{ question: "Koliko Platonovih tijela postoji?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "C" },
{ question: "Koliko dimenzija ima Leech rešetka?", answers: { A: "8", B: "16", C: "24", D: "32" }, correct: "C" },
{ question: "Ko je otkrio zakon gravitacije?", answers: { A: "Galileo", B: "Newton", C: "Einstein", D: "Kepler" }, correct: "B" },
{ question: "Ko je poznat po teoriji relativnosti?", answers: { A: "Newton", B: "Planck", C: "Bohr", D: "Einstein" }, correct: "D" },
{ question: "Ko je otac modernog računarstva?", answers: { A: "Ada Lovelace", B: "Alan Turing", C: "John von Neumann", D: "Charles Babbage" }, correct: "B" },
{ question: "Ko je uveo simbol π?", answers: { A: "Euler", B: "Gauss", C: "Newton", D: "Wiliam Jones" }, correct: "D" },
{ question: "Ko je osnovao modernu teoriju vjerojatnosti?", answers: { A: "Pascal", B: "Bernoulli", C: "Laplace", D: "Kolmogorov" }, correct: "D" },
{ question: "Koliko je zlatni presek φ na 3 decimale?", answers: { A: "1.414", B: "1.618", C: "1.732", D: "2.236" }, correct: "B" },
{ question: "Ko je razvio teoriju skupova?", answers: { A: "Dedekind", B: "Cantor", C: "Hilbert", D: "Frege" }, correct: "B" },
{ question: "Ko je riješio kubnu jednačinu u 16. vijeku?", answers: { A: "Cardano", B: "Tartaglia", C: "Ferrari", D: "Viète" }, correct: "A" },
{ question: "Ko je dokazao da je e transcendentan?", answers: { A: "Hermite", B: "Lindemann", C: "Cantor", D: "Weierstrass" }, correct: "A" },
{ question: "Ko je otkrio neEuklidsku geometriju?", answers: { A: "Gauss", B: "Bolyai", C: "Lobačevski", D: "Svi navedeni" }, correct: "D" },
{ question: "Ko je razvio teoriju grupa u modernom obliku?", answers: { A: "Noether", B: "Jordan", C: "Lagrange", D: "Galois" }, correct: "D" },
{ question: "Ko je uveo simbol ∑ za sumu?", answers: { A: "Gauss", B: "Leibniz", C: "Bernoulli", D: "Euler" }, correct: "D" },
{ question: "Koju vrstu simetrije pokazuju krila leptira?", answers: { A: "Rotacionu simetriju", B: "Centralnu simetriju", C: "Bilateralnu simetriju", D: "Translacionu simetriju" }, correct: "C" },
{ question: "Rimski broj XC u arapskom zapisu je?", answers: { A: "90", B: "110", C: "80", D: "100" }, correct: "A" },
{ question: "Koliki je najmanji zajednički sadržalac brojeva 15 i 20?", answers: { A: "45", B: "30", C: "75", D: "60" }, correct: "D" },
{ question: "Koliko je √2 približno (na 3 decimale)?", answers: { A: "1.415", B: "1.416", C: "1.417", D: "1.414" }, correct: "D" },
{ question: "Koliko je √3 približno (na 2 decimale)?", answers: { A: "1.72", B: "1.73", C: "1.74", D: "1.75" }, correct: "B" },
{ question: "Koliko je √5 približno (na 2 decimale)?", answers: { A: "2.22", B: "2.24", C: "2.26", D: "2.28" }, correct: "B" },
{ question: "Koliko je log10(1000)?", answers: { A: "2", B: "1", C: "4", D: "3" }, correct: "D" },
{ question: "U kojem vijeku je nastao matematički kalkulus?", answers: { A: "15. vijek", B: "16. vijek", C: "17. vijek", D: "18. vijek" }, correct: "C" },
{ question: "Ko je prvi dokazao da postoje beskonačno prosti brojevi?", answers: { A: "Euclid", B: "Euler", C: "Gauss", D: "Cantor" }, correct: "A" },
{ question: "Ko je prvi populizirao simbol 'i' za imaginarni broj?", answers: { A: "Euler", B: "Gauss", C: "Descartes", D: "Cauchy" }, correct: "A" },
{ question: "Ko je uveo pojam 'kompleksnih brojeva' u modernoj matematici?", answers: { A: "Caspar Wessel", B: "Euler", C: "Gauss", D: "Descartes" }, correct: "A" },
{ question: "Ko je prvi definisao pojam 'topologija'?", answers: { A: "Riemann", B: "Poincaré", C: "Euler", D: "Cantor" }, correct: "B" }
  ]
},

numbers: {
  easy: [
{ question: "Koliko je e^(iπ) + 1?", answers: { A: "0", B: "1", C: "i", D: "-1" }, correct: "A" },
{ question: "Koji je broj 2^8?", answers: { A: "512", B: "128", C: "1024", D: "256" }, correct: "D" },
{ question: "Koja je vrijednost sin(90°)?", answers: { A: "0", B: "0.5", C: "√2/2", D: "1" }, correct: "D" },
{ question: "Proizvod neparnog i parnog broja je uvijek?", answers: { A: "Neparan", B: "Paran", C: "Negativan", D: "0" }, correct: "B" },
{ question: "Proizvod pozitivnog i negativnog broja je?", answers: { A: "Pozitivan", B: "0", C: "Negativan", D: "Neodređen" }, correct: "C" },
{ question: "Zbir dva negativna broja je?", answers: { A: "Pozitivan", B: "Negativan", C: "0", D: "Neodređen" }, correct: "B" },
{ question: "Proizvod dva negativna broja je?", answers: { A: "Negativan", B: "0", C: "Pozitivan", D: "Neodređen" }, correct: "C" },
{ question: "Kako se zove prosječna vrijednost skupa podataka?", answers: { A: "Medijana", B: "Mod", C: "Aritmetička sredina", D: "Varijansa" }, correct: "C" },
{ question: "Kako se zovu dva ugla čiji je zbir 90°?", answers: { A: "Suplementarni", B: "Komplementarni", C: "Vertikalni", D: "Adjacenti" }, correct: "B" },
{ question: "Kako se zovu dva ugla čiji je zbir 180°?", answers: { A: "Komplementarni", B: "Vertikalni", C: "Suplementarni", D: "Paralelni" }, correct: "C" },
{ question: "Koje je veliko životno dostignuće osobe koja je doživjela 117 godina i 27 dana(Okawa iz Japana)?", answers: { A: "50000 dana života", B: "10000 sedmica života", C: "Preko milion sati života", D: "Sve navedeno" }, correct: "C" },
{ question: "Koji je sljedeći prosti broj nakon 97?", answers: { A: "99", B: "101", C: "103", D: "107" }, correct: "B" },
{ question: "Koliko je e (Eulerova konstanta) na 2 decimale?", answers: { A: "2.52", B: "2.62", C: "2.72", D: "2.82" }, correct: "C" },
{ question: "Ko je dokazao da je set realnih brojeva neprenumerabilan?", answers: { A: "Gödel", B: "Hilbert", C: "Dedekind", D: "Cantor" }, correct: "D" },
{ question: "Hotel sa beskonačno soba je pun. Dolazi nova osoba. Može li se smjestiti?", answers: { A: "Ne", B: "Da", C: "Samo u hodniku", D: "Zavisi od sobe" }, correct: "B" },
{ question: "Monty Hall problem: mijenjate vrata?", answers: { A: "Da", B: "Ne", C: "Svejedno", D: "Zavisi" }, correct: "A" },
{ question: "Birthday paradox: Koliko ljudi treba da je 50% šansa da dvoje dijele rođendan?", answers: { A: "183", B: "100", C: "50", D: "23" }, correct: "D" },
{ question: "Koliko je 2 + 2 × 2 - 2 / 2?", answers: { A: "5", B: "7", C: "4", D: "6" }, correct: "A" },
{ question: "Koji je broj 3 puta veći od 1/3?", answers: { A: "2", B: "3", C: "4", D: "1" }, correct: "D" },
{ question: "Ako je x = 2 i y = 3, koliko je x^y?", answers: { A: "6", B: "9", C: "8", D: "27" }, correct: "C" },
{ question: "Koji je najmanji prosti broj?", answers: { A: "0", B: "1", C: "2", D: "3" }, correct: "C" },
{ question: "Koliko nula ima milion?", answers: { A: "4", B: "5", C: "6", D: "7" }, correct: "C" },
{ question: "Koliko je 2 na 10?", answers: { A: "512", B: "1024", C: "2048", D: "4096" }, correct: "B" },
{ question: "Koji broj je savršen (jednak je sumi svojih djelilaca)?", answers: { A: "4", B: "6", C: "8", D: "10" }, correct: "B" },
{ question: "Ako u sobi ima 5 mačaka i uđe još 5 pasa, koliko nogu ima?", answers: { A: "20", B: "40", C: "42", D: "44" }, correct: "B" },
{ question: "Dva oca i dva sina ulove 3 ribe. Svako dobije po jednu. Kako?", answers: { A: "Nemoguće", B: "Djed, otac, sin", C: "Podijele jednu", D: "Otpuste jednu" }, correct: "B" },
{ question: "Ako 3 mačke imaju 12 nogu, koliko nogu imaju 6 mačaka?", answers: { A: "18", B: "30", C: "36", D: "24" }, correct: "D" },
{ question: "Koliko je 2 + 2 * 2?", answers: { A: "4", B: "10", C: "8", D: "6" }, correct: "D" },
{ question: "Koliko je 20% od 100?", answers: { A: "10", B: "30", C: "40", D: "20" }, correct: "D" },
{ question: "Ako je 1/2 + 1/3 + 1/6 = ?", answers: { A: "2", B: "3", C: "0.5", D: "1" }, correct: "D" },
{ question: "Ako je 5x = 25, koliko je x?", answers: { A: "10", B: "15", C: "20", D: "5" }, correct: "D" },
{ question: "Koliko je 1/2 od 1/2?", answers: { A: "1/2", B: "1", C: "2", D: "1/4" }, correct: "D" },
{ question: "Ako je danas srijeda, koji dan je za 100 dana?", answers: { A: "Petak", B: "Subota", C: "Nedjelja", D: "Četvrtak" }, correct: "A" },
{ question: "Koliko ima načina da se baci kocka i dobije paran broj?", answers: { A: "2", B: "3", C: "4", D: "5" }, correct: "B" },
{ question: "Koji broj ima tačno 3 djelitelja?", answers: { A: "4", B: "6", C: "8", D: "12" }, correct: "A" },
{ question: "Koji broj ima najviše djelitelja među 1–20?", answers: { A: "12", B: "18", C: "20", D: "16" }, correct: "A" },
{ question: "Koji broj slijedi u Fibonaccijevom nizu nakon 0, 1, 1, 2, 3?", answers: { A: "4", B: "5", C: "6", D: "8" }, correct: "B" },
{ question: "Koji pojam opisuje beskonačan skup koji se može prebrojati?", answers: { A: "Neprebrojiv", B: "Konačan", C: "Gust", D: "Prebrojiv" }, correct: "D" },
{ question: "Koja je treća cifra broja π (nakon decimalnog zareza)?", answers: { A: "3", B: "1", C: "4", D: "5" }, correct: "B" },
{ question: "Koliko je kvadratni korijen iz 361?", answers: { A: "19", B: "20", C: "18", D: "21" }, correct: "A" },
{ question: "Koji od ovih brojeva je prost?", answers: { A: "21", B: "29", C: "39", D: "51" }, correct: "B" },
{ question: "Koji je zbir unutrašnjih uglova petougla?", answers: { A: "360°", B: "540°", C: "720°", D: "450°" }, correct: "B" },
{ question: "Koliki je kvadrat broja 21?", answers: { A: "441", B: "420", C: "400", D: "4410" }, correct: "A" },
{ question: "Koliko je π na 2 decimale?", answers: { A: "3.12", B: "3.14", C: "3.16", D: "3.18" }, correct: "B" },
{ question: "Koliko rješenja ima jednačina x³ + y³ = z³ za prirodne brojeve?", answers: { A: "Beskonačno", B: "Dva", C: "0", D: "Samo jedno" }, correct: "C" },
{ question: "Koja je gustoća prostih brojeva kod broja n?", answers: { A: "1/n", B: "1/ln(n)", C: "1/√n", D: "1/n²" }, correct: "B" },
{ question: "Koji je najmanji netrivijalni triperfect broj?", answers: { A: "120", B: "672", C: "523776", D: "Nepoznato" }, correct: "C" },
{ question: "Koliko je 0.999... (beskonačno ponavljanje) u decimalnom obliku?", answers: { A: "0.9", B: "0.99", C: "Nedefinisano", D: "1" }, correct: "D" },
{ question: "Koliko je 2^10 + 2^9?", answers: { A: "1024", B: "2048", C: "512", D: "1536" }, correct: "D" },
{ question: "Koji je rimski simbol za broj 100?", answers: { A: "D", B: "M", C: "L", D: "C" }, correct: "D" },
{ question: "Koji broj dobijemo kada kvadriramo 0.1?", answers: { A: "0.01", B: "0.2", C: "0.1", D: "1" }, correct: "A" },
{ question: "Koliko je 1000 podijeljeno sa 8?", answers: { A: "125", B: "150", C: "250", D: "115" }, correct: "A" },
{ question: "Šta dobijemo kada saberemo dva negativna broja?", answers: { A: "Pozitivan broj", B: "Negativan broj", C: "Nulu", D: "Parni broj" }, correct: "B" },
{ question: "Koliko stepeni iznosi zbir uglova u šestouglu?", answers: { A: "760°", B: "720°", C: "740°", D: "700°" }, correct: "B" },
{ question: "Koji je sljedeći broj u nizu: 1, 8, 27, 64, ...?", answers: { A: "100", B: "121", C: "125", D: "144" }, correct: "C" },
{ question: "Koliko je 2 na desetu, što je često osnovna jedinica u informatici (Kilo)?", answers: { A: "1000", B: "1024", C: "512", D: "2048" }, correct: "B" },
{ question: "Koji matematički simbol je uveo Robert Recorde?", answers: { A: "Plus (+)", B: "Minus (-)", C: "Jednako (=)", D: "Beskonačno (∞)" }, correct: "C" },
{ question: "Šta je 'Faktorijel' broja 4 (oznaka 4!)?", answers: { A: "8", B: "16", C: "24", D: "12" }, correct: "C" },
{ question: "Koji je jedini paran prost broj?", answers: { A: "0", B: "4", C: "2", D: "6" }, correct: "C" },
{ question: "Znak za plus (+) je zapravo skraćenica latinske riječi 'et' koja znači:", answers: { A: "Više", B: "I", C: "Oduzmi", D: "Jednako" }, correct: "B" },
{ question: "Šta izvorno predstavlja simbol za beskonačno (∞)?", answers: { A: "Grčko slovo omega", B: "Krug koji se lomi", C: "Broj 8 u ležećem položaju", D: "Rimski broj 1000 (CIƆ)" }, correct: "D" },
{ question: "Ko je uveo upotrebu slova (x, y, z) za nepoznate veličine u matematici?", answers: { A: "René Descartes", B: "Albert Einstein", C: "Galileo Galilei", D: "Blaise Pascal" }, correct: "A" },
{ question: "Latinska riječ 'Axioma', od koje potiče naš termin aksiom, znači:", answers: { A: "Početna tačka", B: "Ono što se smatra dostojnim ili istinitim", C: "Težak problem", D: "Skriveni dokaz" }, correct: "B" },
{ question: "Ko je prvi počeo koristiti grčko slovo π (pi) za označavanje konstante kruga?", answers: { A: "Archimedes", B: "Pitagora", C: "Euclid", D: "William Jones" }, correct: "D" },
{ question: "Simbol za integral (∫) koji je uveo Leibniz zapravo je izduženo slovo 'S', što označava:", answers: { A: "Symmetry", B: "Solution", C: "Section", D: "Summa (suma)" }, correct: "D" },
{ question: "Riječ 'Aritmetika' potiče od grčke riječi 'arithmos', što znači:", answers: { A: "Broj", B: "Zakon", C: "Vještina", D: "Istina" }, correct: "A" },
{ question: "Iz kojeg jezika potiče riječ 'Algebra'?", answers: { A: "Grčkog", B: "Sanskrita", C: "Arapskog", D: "Latinskog" }, correct: "C" },
{ question: "Šta izvorno znači arapska riječ 'al-jabr' od koje je nastala Algebra?", answers: { A: "Sastavljanje polomljenih dijelova", B: "Računanje", C: "Skriveni broj", D: "Mudrost" }, correct: "A" },
{ question: "Riječ 'Geometrija' bukvalno znači:", answers: { A: "Crtanje oblika", B: "Zapisivanje prostora", C: "Nauka o uglovima", D: "Mjerenje Zemlje" }, correct: "D" },
{ question: "Od koje latinske riječi potiče termin 'procenat' (percent)?", answers: { A: "Per centuria (po vijeku)", B: "Per centum (po stotini)", C: "Pro centum (za dio)", D: "Pre cent (prije svega)" }, correct: "B" },
  ],
  
  hard: [
{ question: "Šta je 'Apsolutna vrijednost' broja?", answers: { A: "Njegova udaljenost od nule", B: "Njegov kvadrat", C: "Suprotan broj", D: "Recipročan broj" }, correct: "A" },
{ question: "Koliko iznosi 0,1 + 0,01 + 0,001?", answers: { A: "0,3", B: "0,111", C: "0,011", D: "1,11" }, correct: "B" },
{ question: "Koliko iznosi 10% od 10% od 100?", answers: { A: "10", B: "0.01", C: "0.1", D: "1" }, correct: "D" },
{ question: "Kako se zove četverougao čije su sve stranice jednake i svi uglovi pravi?", answers: { A: "Pravougaonik", B: "Romb", C: "Kvadrat", D: "Trapez" }, correct: "C" },
{ question: "Zagonetka: Imao si 5 jabuka, uzeo si 3. Koliko jabuka imaš?", answers: { A: "3", B: "2", C: "5", D: "8" }, correct: "A" },
{ question: "Koliko sekundi ima u 12 minuta?", answers: { A: "600", B: "1200", C: "360", D: "720" }, correct: "D" },
{ question: "Kako se naziva broj koji se dobije množenjem broja samim sobom?", answers: { A: "Kub", B: "Faktorijel", C: "Faktor", D: "Kvadrat" }, correct: "D" },
{ question: "Koji je sljedeći broj u nizu: 5, 10, 20, 40, ...?", answers: { A: "60", B: "50", C: "80", D: "100" }, correct: "C" },
{ question: "Koliko iznosi 25% od broja 200?", answers: { A: "40", B: "25", C: "50", D: "75" }, correct: "C" },
{ question: "Šta je 'Hipotenuza'?", answers: { A: "Najkraća stranica trougla", B: "Ugao od 90 stepeni", C: "Najduža stranica u pravouglom trouglu", D: "Pitagorina teorema" }, correct: "C" },
{ question: "Koji broj je neutralan element za sabiranje?", answers: { A: "0", B: "1", C: "-1", D: "10" }, correct: "A" },
{ question: "Koji je rezultat operacije 3³ (tri na treću)?", answers: { A: "9", B: "27", C: "12", D: "81" }, correct: "B" },
{ question: "Kako se naziva dio kruga omeđen dvama poluprečnicima i lukom?", answers: { A: "Isječak", B: "Odsječak", C: "Tetiva", D: "Sječica" }, correct: "A" },
{ question: "Koji je najmanji prost broj?", answers: { A: "0", B: "1", C: "2", D: "3" }, correct: "C" },
{ question: "Koji broj nastavlja niz: 1, 3, 6, 10, 15...?", answers: { A: "21", B: "23", C: "25", D: "20" }, correct: "A" },
{ question: "Koji od ovih brojeva je prost broj?", answers: { A: "9", B: "15", C: "17", D: "21" }, correct: "C" },
{ question: "Koliko stranica ima dekagon?", answers: { A: "20", B: "8", C: "12", D: "10" }, correct: "D" },
{ question: "Koji broj je neutralan element za množenje?", answers: { A: "0", B: "1", C: "10", D: "-1" }, correct: "B" },
{ question: "Koliko iznosi zbir brojeva od 1 do 10?", answers: { A: "50", B: "55", C: "60", D: "45" }, correct: "B" },
{ question: "Šta dobijemo kada broj pomnožimo sa njegovom recipročnom vrijednošću?", answers: { A: "0", B: "1", C: "Sam taj broj", D: "Kvadrat broja" }, correct: "B" },
{ question: "Koliko ukupno vrhova ima jedna kocka?", answers: { A: "6", B: "12", C: "8", D: "10" }, correct: "C" },
{ question: "Koji broj nastavlja niz: 100, 90, 81, 73... (razlika se smanjuje za 1)?", answers: { A: "66", B: "67", C: "68", D: "69" }, correct: "A" },
{ question: "Šta dobijemo kada pomnožimo dvije negativne vrijednosti?", answers: { A: "Negativan broj", B: "Pozitivan broj", C: "Nulu", D: "Imaginaran broj" }, correct: "B" },
{ question: "Kako se zove prava koja siječe kružnicu u dvije tačke?", answers: { A: "Tangenta", B: "Sječica (Sekanta)", C: "Radijus", D: "Normala" }, correct: "B" },
{ question: "Kako se zove poligon sa sedam stranica?", answers: { A: "Heksagon", B: "Oktagon", C: "Heptagon", D: "Nonagon" }, correct: "C" },
{ question: "Koji je sljedeći broj u nizu: 1, 4, 9, 16, 25, ...?", answers: { A: "30", B: "40", C: "36", D: "49" }, correct: "C" },
{ question: "Koji je njemački matematičar dokazao 'Fundamentalni teorem algebre'?", answers: { A: "Hilbert", B: "Riemann", C: "Carl Friedrich Gauss", D: "Cantor" }, correct: "C" },
{ question: "Koji je britanski matematičar dešifrovao nacističku Enigmu tokom Drugog svjetskog rata?", answers: { A: "Stephen Hawking", B: "John Nash", C: "Isaac Newton", D: "Alan Turing" }, correct: "D" },
{ question: "Koji je matematičar bio vegetarijanac i vjerovao je da je grijeh jesti grah?", answers: { A: "Pitagora", B: "Euklid", C: "Arhimed", D: "Aristotel" }, correct: "A" },
{ question: "Koji je matematičar napisao 'Elemente', knjigu koja se koristila kao udžbenik preko 2000 godina?", answers: { A: "Tales", B: "Euklid", C: "Platon", D: "Arhimed" }, correct: "B" },
{ question: "Koji je matematičar (i pravnik) poznat po 'Posljednjoj teoremi' koju je zapisao na margini knjige?", answers: { A: "Descartes", B: "Euler", C: "Pierre de Fermat", D: "Cauchy" }, correct: "C" },
{ question: "Koji je matematičar uveo simbol za beskonačnost (∞)?", answers: { A: "Isaac Newton", B: "Leonhard Euler", C: "Robert Recorde", D: "John Wallis" }, correct: "D" },
{ question: "Koji je matematičar tvorac 'Teorije skupova' i dokazao da postoje različite veličine beskonačnosti?", answers: { A: "Georg Cantor", B: "Kurt Gödel", C: "David Hilbert", D: "Bernhard Riemann" }, correct: "A" },
{ question: "Koji je matematičar dobio Nobelovu nagradu za ekonomiju, a o njegovom životu je snimljen film 'Genijalni um'?", answers: { A: "Alan Turing", B: "John Nash", C: "Paul Erdős", D: "Andrew Wiles" }, correct: "B" },
{ question: "Koji je matematičar prvi počeo koristiti slovo π (Pi) za oznaku odnosa obima i prečnika?", answers: { A: "Arhimed", B: "Newton", C: "William Jones", D: "Euler" }, correct: "C" },
{ question: "Koji je matematičar razvio 'Koordinatnu geometriju' spajajući algebru i geometriju?", answers: { A: "Fermat", B: "Pascal", C: "Lagrange", D: "René Descartes" }, correct: "D" },
{ question: "Koji je matematičar indijskog porijekla tvrdio da mu boginja Namagiri diktira formule u snovima?", answers: { A: "Srinivasa Ramanujan", B: "Aryabhata", C: "Brahmagupta", D: "Bhaskara" }, correct: "A" },
{ question: "Koji je matematičar odbio nagradu od milion dolara za rješenje Poincaréove pretpostavke?", answers: { A: "Euler", B: "John Nash", C: "Andrew Wiles", D: "Grigori Perelman" }, correct: "D" },
{ question: "Koji je matematičar (i filozof) rekao 'Mislim, dakle jesam'?", answers: { A: "René Descartes", B: "Blaise Pascal", C: "Leibniz", D: "Kant" }, correct: "A" },
{ question: "Koji je matematičar razvio infinitezimalni račun istovremeno kad i Newton, ali nezavisno od njega?", answers: { A: "Euler", B: "Leibniz", C: "Bernoulli", D: "Kepler" }, correct: "B" },
{ question: "Koja je matematičarka, uprkos zabranama za žene, pisala radove pod muškim pseudonimom Monsieur LeBlanc?", answers: { A: "Ada Lovelace", B: "Hypatia", C: "Sophie Germain", D: "Emmy Noether" }, correct: "C" },
{ question: "Koji je matematičar bio učitelj cara Aleksandra Velikog?", answers: { A: "Aristotel", B: "Platon", C: "Sokrat", D: "Pitagora" }, correct: "A" },
{ question: "Koji je arapski matematičar napisao knjigu 'Al-Jabr' po kojoj je algebra dobila ime?", answers: { A: "Al-Haitham", B: "Al-Biruni", C: "Al-Khwarizmi", D: "Omar Khayyam" }, correct: "C" },
{ question: "Koji je matematičar (i astronom) prvi rekao da se Zemlja okreće oko Sunca?", answers: { A: "Galileo", B: "Kepler", C: "Newton", D: "Aristah sa Samosa" }, correct: "D" },
{ question: "Koji je matematičar poznat po razvoju 'Fraktala'?", answers: { A: "Benoît Mandelbrot", B: "Georg Cantor", C: "David Hilbert", D: "Henri Poincaré" }, correct: "A" },
{ question: "Koja je njemačka matematičarka proglašena 'najznačajnijom ženom u historiji matematike' od strane Einsteina?", answers: { A: "Ada Lovelace", B: "Emmy Noether", C: "Sophie Germain", D: "Hypatia" }, correct: "B" },
{ question: "Koji je matematičar (i pisac) napisao 'Alisu u zemlji čuda'?", answers: { A: "Oscar Wilde", B: "Charles Dickens", C: "Mark Twain", D: "Lewis Carroll" }, correct: "D" },
{ question: "Koji je antički matematičar prvi izračunao obim Zemlje koristeći sjene u bunarima?", answers: { A: "Eratosten", B: "Pitagora", C: "Euklid", D: "Ptolomej" }, correct: "A" },
{ question: "Koji je matematičar (i fizičar) otkrio zakon poluge i zapreminu krune?", answers: { A: "Eratosten", B: "Arhimed", C: "Tales", D: "Euklid" }, correct: "B" },
{ question: "Koji je matematičar uveo nulu u evropsku matematiku kroz knjigu 'Liber Abaci'?", answers: { A: "Pacioli", B: "Descartes", C: "Leonardo Fibonacci", D: "Tartaglia" }, correct: "C" }
   ],
   
  hardest: [
{ question: "Ko je formulirao Hilbertove probleme 1900. godine?", answers: { A: "David Hilbert", B: "Felix Klein", C: "Hermann Minkowski", D: "Bernhard Riemann" }, correct: "A" },
{ question: "U kojoj godini je Gauss objavio 'Disquisitiones Arithmeticae'?", answers: { A: "1791", B: "1801", C: "1811", D: "1821" }, correct: "B" },
{ question: "Koji je matematičar (i biskup) prvi upotrijebio grafički prikaz koordinata prije Descartesa?", answers: { A: "Copernicus", B: "Kepler", C: "Nicole Oresme", D: "Galileo" }, correct: "C" },
{ question: "Koji je matematičar bio fasciniran brojem 1729, koji je postao poznat kao njegov broj?", answers: { A: "Hardy", B: "Littlewood", C: "Erdős", D: "Srinivasa Ramanujan" }, correct: "D" },
{ question: "Koji je matematičar bio osnivač škole u kojoj je bio moto: 'Sve je broj'?", answers: { A: "Tales", B: "Pitagora", C: "Platon", D: "Zeno" }, correct: "B" },
{ question: "Koji je matematičar poznat po listi od 23 neriješena problema?", answers: { A: "David Hilbert", B: "Bernhard Riemann", C: "Henri Poincaré", D: "Felix Klein" }, correct: "A" },
{ question: "Koji je matematičar preživio u zatočeništvu u Rusiji rješavajući geometriju (Ponceletov teorem)?", answers: { A: "Monge", B: "Jean-Victor Poncelet", C: "Carnot", D: "Fourier" }, correct: "B" },
{ question: "Koji je matematičar smislio igru 'Game of Life'?", answers: { A: "John Nash", B: "Stephen Hawking", C: "John Conway", D: "Martin Gardner" }, correct: "C" },
{ question: "Koji je matematičar (i astronom) otkrio planetu Neptun pomoću proračuna?", answers: { A: "Herschel", B: "Kepler", C: "Galileo", D: "Urbain Le Verrier" }, correct: "D" },
{ question: "Koji je matematičar poznat po trouglu za binomne koeficijente?", answers: { A: "Blaise Pascal", B: "Descartes", C: "Euler", D: "Newton" }, correct: "A" },
{ question: "Koji je matematičar tvorac ne-euklidske geometrije (zajedno sa Bolyaijem)?", answers: { A: "Gauss", B: "Nikolai Lobachevsky", C: "Riemann", D: "Hilbert" }, correct: "B" },
{ question: "Koji je matematičar preveo Newtonovu 'Principiu' na francuski?", answers: { A: "Sophie Germain", B: "Ada Lovelace", C: "Émilie du Châtelet", D: "Hypatia" }, correct: "C" },
{ question: "Koji je matematičar razvio dijagrame za skupove?", answers: { A: "Boole", B: "Russell", C: "Cantor", D: "John Venn" }, correct: "D" },
{ question: "Koji je matematičar prvi definisao broj 'e'?", answers: { A: "Leonhard Euler", B: "Napier", C: "Bernoulli", D: "Leibniz" }, correct: "A" },
{ question: "Koji je matematičar bio osnivač 'Kolektivnog matematičara' pod imenom Nicolas Bourbaki?", answers: { A: "Grupa francuskih matematičara", B: "Ruski genije", C: "Američki tim", D: "Jedan ekscentrični Švicarac" }, correct: "A" },
{ question: "Koji je matematičar poznat po efektu leptira?", answers: { A: "Mandelbrot", B: "Poincaré", C: "Newton", D: "Edward Lorenz" }, correct: "D" },
{ question: "Koji je matematičar bio poznat po tome što je uvijek putovao sa koferom punim radova, nazivajući djecu 'epsilonima'?", answers: { A: "Paul Erdős", B: "Euler", C: "Gauss", D: "Newton" }, correct: "A" },
{ question: "Koji je matematičar (i logičar) bio zatvoren jer je bio homoseksualac, uprkos tome što je spasio milione života?", answers: { A: "John Nash", B: "Alan Turing", C: "Bertrand Russell", D: "Ludwig Wittgenstein" }, correct: "B" },
{ question: "Koji je matematičar prvi dokazao da je korijen iz 2 iracionalan broj?", answers: { A: "Pitagora", B: "Euklid", C: "Hipas sa Metaponta", D: "Arhimed" }, correct: "C" },
{ question: "Koji je matematičar prvi koristio termin 'Stochastik'?", answers: { A: "Gauss", B: "Jakob Bernoulli", C: "Poisson", D: "Markov" }, correct: "B" },
{ question: "Koji je matematičar (i fizičar) uveo pojam 'entropija' u informacione teorije?", answers: { A: "Turing", B: "Von Neumann", C: "Claude Shannon", D: "Wiener" }, correct: "C" },
{ question: "Ko je dokazao 'Teorem o četiri boje' uz pomoć kompjutera (prvi takav dokaz)?", answers: { A: "Appel i Haken", B: "Wiles", C: "Perelman", D: "Tao" }, correct: "A" },
{ question: "Koji je matematičar (i filozof) tvorac teorije 'Monada'?", answers: { A: "Descartes", B: "Leibniz", C: "Pascal", D: "Spinoza" }, correct: "B" },
{ question: "Koji je matematičar poznat kao 'Napoleonov matematičar'?", answers: { A: "Fourier", B: "Lagrange", C: "Pierre-Simon Laplace", D: "Cauchy" }, correct: "C" },
{ question: "Koji je matematičar bio pionir u 'Teoriji haosa'?", answers: { A: "Newton", B: "Einstein", C: "Mandelbrot", D: "Henri Poincaré" }, correct: "D" },
{ question: "Koji je matematičar (i izumitelj) izmislio logaritme?", answers: { A: "John Napier", B: "Briggs", C: "Euler", D: "Kepler" }, correct: "A" },
{ question: "Koji je matematičar autor djela 'Arithmetica', koje je inspirisalo Fermata?", answers: { A: "Euklid", B: "Diofant", C: "Pitagora", D: "Arhimed" }, correct: "B" },
{ question: "Koji je matematičar (i umjetnik) poznat po crtežu 'Vruvijski čovjek'?", answers: { A: "Michelangelo", B: "Rafael", C: "Leonardo da Vinci", D: "Donatello" }, correct: "C" },
{ question: "Koji je matematičar poznat po 'Normalnoj krivi'?", answers: { A: "Carl Friedrich Gauss", B: "Laplace", C: "Euler", D: "Poisson" }, correct: "A" },
{ question: "Koji je matematičar tvorac 'Vektorske analize'?", answers: { A: "Newton", B: "Josiah Willard Gibbs", C: "Maxwell", D: "Heaviside" }, correct: "B" },
{ question: "Koji je matematičar poznat po aksiomima za prirodne brojeve?", answers: { A: "Hilbert", B: "Cantor", C: "Giuseppe Peano", D: "Dedekind" }, correct: "C" },
{ question: "Koji je matematičar prvi uveo koordinatni sistem sa negativnim brojevima?", answers: { A: "René Descartes", B: "Fermat", C: "Newton", D: "Leibniz" }, correct: "A" },
{ question: "Koji je matematičar bio poznat po rješavanju jednačina trećeg stepena (kubnih)?", answers: { A: "Pacioli", B: "Gerolamo Cardano", C: "Ferrari", D: "Bombelli" }, correct: "B" },
{ question: "Koji je matematičar dokazao da je krug nemoguće kvadrirati linijarom i šestarom?", answers: { A: "Lambert", B: "Hermite", C: "Ferdinand von Lindemann", D: "Gauss" }, correct: "C" },
{ question: "Koji je matematičar tvorac moderne 'Matematičke analize'?", answers: { A: "Euler", B: "Newton", C: "Leibniz", D: "Augustin-Louis Cauchy" }, correct: "D" },
{ question: "Koji je matematičar prvi upotrijebio riječ 'milion'?", answers: { A: "Marco Polo", B: "Fibonacci", C: "Pacioli", D: "Chuquet" }, correct: "A" },
{ question: "Koji je matematičar (i astronom) formulisao tri zakona kretanja planeta?", answers: { A: "Newton", B: "Johannes Kepler", C: "Copernicus", D: "Brahe" }, correct: "B" },
{ question: "Koji je matematičar prvi koristio simbol 'e' za bazu prirodnog logaritma?", answers: { A: "Napier", B: "Bernoulli", C: "Newton", D: "Leonhard Euler" }, correct: "D" },
{ question: "Koji je matematičar (i statističar) razvio 'Studentov t-test'?", answers: { A: "William Sealy Gosset", B: "Fisher", C: "Pearson", D: "Bayes" }, correct: "A" },
{ question: "Koji je matematičar bio osnivač 'Kyoto škole' matematike?", answers: { A: "Oka", B: "Teiji Takagi", C: "Iwasawa", D: "Sato" }, correct: "B" },
{ question: "Koji je matematičar izumio 'logaritamski linijar'?", answers: { A: "Napier", B: "Briggs", C: "William Oughtred", D: "Gunter" }, correct: "C" },
{ question: "Koji je matematičar bio poznat po proučavanju 'Konusa' (kupe)?", answers: { A: "Arhimed", B: "Euklid", C: "Pitagora", D: "Apolonije" }, correct: "D" },
{ question: "Koji je matematičar autor djela 'Ars Magna'?", answers: { A: "Gerolamo Cardano", B: "Pacioli", C: "Tartaglia", D: "Ferrari" }, correct: "A" },
{ question: "Koji je matematičar (i genetičar) razvio zakone nasljeđivanja?", answers: { A: "Darwin", B: "Galton", C: "Gregor Mendel", D: "Fisher" }, correct: "C" },
{ question: "Koji je matematičar prvi dokazao da postoji beskonačno mnogo prostih brojeva?", answers: { A: "Arhimed", B: "Pitagora", C: "Tales", D: "Euklid" }, correct: "D" },
{ question: "Koji je matematičar autor knjige 'Godel, Escher, Bach'?", answers: { A: "Douglas Hofstadter", B: "John Conway", C: "Martin Gardner", D: "Benoit Mandelbrot" }, correct: "A" },
{ question: "Koji je matematičar bio najmlađi profesor na Cambridgeu (Lucasova katedra)?", answers: { A: "Newton", B: "Stephen Hawking", C: "Dirac", D: "Babbage" }, correct: "B" },
{ question: "Koji je matematičar (i ekonomista) dobio Nobelovu nagradu za teoriju igara?", answers: { A: "Von Neumann", B: "Morgenstern", C: "John Nash", D: "Selten" }, correct: "C" }
  ]
}
},

en: {
history: {
easy: [
{ question: "If today is Friday, what day is it in 11 days?", answers: { A: "Tuesday", B: "Monday", C: "Saturday", D: "Sunday" }, correct: "A" },
{ question: "What is 15% of 200?", answers: { A: "25", B: "35", C: "30", D: "40" }, correct: "C" },
{ question: "What is 50% of 60?", answers: { A: "20", B: "25", C: "30", D: "35" }, correct: "C" },
{ question: "What is 25% of 80?", answers: { A: "10", B: "20", C: "25", D: "30" }, correct: "B" },
{ question: "What is 2³ + 1?", answers: { A: "7", B: "8", C: "9", D: "10" }, correct: "C" },
{ question: "If a = 3 and b = 4, what is a² + b²?", answers: { A: "12", B: "20", C: "25", D: "7" }, correct: "C" },
{ question: "What is 30% of 200?", answers: { A: "70", B: "60", C: "50", D: "80" }, correct: "B" },
{ question: "What is 40% of 500?", answers: { A: "150", B: "250", C: "200", D: "300" }, correct: "C" },
{ question: "What is the next number in the sequence 1, 1, 2, 3, 5, 8, ?", answers: { A: "11", B: "13", C: "12", D: "15" }, correct: "B" },
{ question: "Which letter denotes the set of natural numbers?", answers: { A: "Z", B: "N", C: "R", D: "Q" }, correct: "B" },
{ question: "Which letter denotes the set of integers?", answers: { A: "N", B: "Q", C: "Z", D: "R" }, correct: "C" },
{ question: "Which letter denotes the set of rational numbers?", answers: { A: "Q", B: "R", C: "Z", D: "N" }, correct: "A" },
{ question: "Which letter denotes the set of complex numbers?", answers: { A: "R", B: "C", C: "Z", D: "Q" }, correct: "B" },
{ question: "Which letter denotes the set of real numbers?", answers: { A: "Q", B: "Z", C: "R", D: "C" }, correct: "C" },
{ question: "What is the sum of the first five prime numbers?", answers: { A: "26", B: "28", C: "30", D: "32" }, correct: "B" },
{ question: "A right triangle has legs of 12 and 5. What is the hypotenuse?", answers: { A: "12", B: "13", C: "17", D: "15" }, correct: "B" },
{ question: "A right triangle has legs of 8 and 6. What is the hypotenuse?", answers: { A: "10", B: "12", C: "14", D: "9" }, correct: "A" },
{ question: "A right triangle has legs of 3 and 4. What is the hypotenuse?", answers: { A: "6", B: "5", C: "7", D: "4" }, correct: "B" },
{ question: "How many hours are in 4 days?", answers: { A: "72", B: "96", C: "88", D: "100" }, correct: "B" },
{ question: "How many hours are in 6 days?", answers: { A: "120", B: "132", C: "144", D: "150" }, correct: "C" },
{ question: "How many hours are in 2 weeks?", answers: { A: "336", B: "320", C: "360", D: "300" }, correct: "A" },
{ question: "Which number can you not divide by?", answers: { A: "-1", B: "0", C: "2", D: "10000" }, correct: "B" },
{ question: "If a = -2, what is a cubed?", answers: { A: "-6", B: "6", C: "-8", D: "8" }, correct: "C" },
{ question: "What is 30% of 400?", answers: { A: "100", B: "140", C: "120", D: "160" }, correct: "C" },
{ question: "How many diagonals does a hexagon have?", answers: { A: "6", B: "9", C: "12", D: "15" }, correct: "B" },
{ question: "How many diagonals does a heptagon have?", answers: { A: "9", B: "14", C: "12", D: "16" }, correct: "B" },
{ question: "How many diagonals does an octagon have?", answers: { A: "16", B: "18", C: "20", D: "14" }, correct: "C" },
{ question: "What shape is formed by rotating a radius around a center point?", answers: { A: "Triangle", B: "Circle", C: "Square", D: "Rectangle" }, correct: "B" },
{ question: "What does the number π represent in geometry?", answers: { A: "Ratio of diameter to radius", B: "Ratio of circumference to diameter", C: "Difference between circle areas", D: "Square of the radius" }, correct: "B" },
{ question: "What is the next number: 2, 6, 12, 20, 30, ?", answers: { A: "40", B: "41", C: "42", D: "44" }, correct: "C" },
{ question: "What is 11² - 10²?", answers: { A: "19", B: "20", C: "21", D: "22" }, correct: "C" },
{ question: "Which number is missing: 1, 4, 9, 16, ?, 36", answers: { A: "20", B: "24", C: "25", D: "30" }, correct: "C" },
{ question: "What is 99 × 101?", answers: { A: "9999", B: "10099", C: "9801", D: "10001" }, correct: "A" },
{ question: "If a=2, b=3, what is a³ + b³?", answers: { A: "25", B: "35", C: "27", D: "29" }, correct: "B" },
{ question: "What is 1 + 2 + 3 + ... + 20?", answers: { A: "190", B: "200", C: "210", D: "220" }, correct: "C" },
{ question: "How many diagonals does a hexagon have?", answers: { A: "6", B: "9", C: "12", D: "15" }, correct: "B" },
{ question: "If 7x = 1, what is x?", answers: { A: "1/7", B: "7", C: "0", D: "1" }, correct: "A" },
{ question: "What is the next number: 1, 2, 6, 24, 120, ?", answers: { A: "600", B: "720", C: "840", D: "500" }, correct: "B" },
{ question: "What is 50² - 49²?", answers: { A: "99", B: "100", C: "101", D: "98" }, correct: "A" },
{ question: "What is 25% of 240?", answers: { A: "50", B: "60", C: "70", D: "80" }, correct: "B" },
{ question: "Which number in the Fibonacci sequence comes after 13?", answers: { A: "18", B: "20", C: "21", D: "22" }, correct: "C" },
{ question: "What is √196?", answers: { A: "12", B: "13", C: "14", D: "15" }, correct: "C" },
{ question: "What is 15 × 15 - 10 × 10?", answers: { A: "125", B: "150", C: "175", D: "200" }, correct: "A" },
{ question: "Which number is missing: 3, 9, 27, ?, 243", answers: { A: "54", B: "72", C: "81", D: "108" }, correct: "C" },
{ question: "What is 2⁸?", answers: { A: "128", B: "256", C: "512", D: "1024" }, correct: "B" }

],
hard: [ 
{ question: "What is the approximate value of 2^30?", answers: { A: "1.07×10^9", B: "1.07×10^8", C: "1.07×10^10", D: "1.07×10^7" }, correct: "A" },
{ question: "What is 75% of 360?", answers: { A: "260", B: "270", C: "280", D: "300" }, correct: "B" },
{ question: "What is the sum of 1 + 2 + 3 + ... + 20?", answers: { A: "200", B: "210", C: "220", D: "190" }, correct: "B" },
{ question: "If today is Wednesday, what day will it be in 365 days?", answers: { A: "Wednesday", B: "Thursday", C: "Tuesday", D: "Friday" }, correct: "B" },
{ question: "Who introduced the symbol for infinity?", answers: { A: "Isaac Newton", B: "Leonhard Euler", C: "John Wallis", D: "René Descartes" }, correct: "C" },
{ question: "Who first used decimal notation in mathematics?", answers: { A: "Fibonacci", B: "Al-Khwarizmi", C: "Simon Stevin", D: "Descartes" }, correct: "C" },
{ question: "Which number did Ludolph van Ceulen calculate to 35 decimal places?", answers: { A: "e", B: "π", C: "φ", D: "√2" }, correct: "B" },
{ question: "What was Carl Friedrich Gauss's famous nickname?", answers: { A: "King of Mathematics", B: "Father of Algebra", C: "Prince of Mathematics", D: "Genius of Numbers" }, correct: "C" },
{ question: "Who invented logarithms?", answers: { A: "Gottfried Leibniz", B: "Isaac Newton", C: "Leonhard Euler", D: "John Napier" }, correct: "D" },
{ question: "Who first used negative numbers in mathematics?", answers: { A: "Chinese", B: "Greeks", C: "Romans", D: "Egyptians" }, correct: "A" },
{ question: "Who formally defined the concept of a function?", answers: { A: "Descartes", B: "Fermat", C: "Euler", D: "Leibniz" }, correct: "C" },
{ question: "Who is known as the 'father of geometry'?", answers: { A: "Pythagoras", B: "Euclid", C: "Archimedes", D: "Plato" }, correct: "B" },
{ question: "In which country did the Arabic numeral system originate?", answers: { A: "Arabia", B: "Egypt", C: "India", D: "China" }, correct: "C" },
{ question: "Which symbol is used for infinity?", answers: { A: "α", B: "∞", C: "Ω", D: "π" }, correct: "B" },
{ question: "What is the sum of 1 + 3 + 5 + 7 + ... + 19?", answers: { A: "81", B: "100", C: "121", D: "90" }, correct: "B" },
{ question: "What is 3⁴?", answers: { A: "64", B: "72", C: "81", D: "90" }, correct: "C" },
{ question: "In which century did algebra originate?", answers: { A: "5th century", B: "7th century", C: "9th century", D: "11th century" }, correct: "C" },
{ question: "What is a function called that is equal to its own inverse?", answers: { A: "Exponential function", B: "Identity function", C: "Quadratic function", D: "Reciprocal function" }, correct: "B" },
{ question: "What is 3^10?", answers: { A: "59049", B: "59000", C: "60000", D: "50000" }, correct: "A" },
{ question: "What is a mathematical proof called that starts by assuming the statement is false?", answers: { A: "Direct proof", B: "Induction", C: "Proof by contradiction", D: "Constructive proof" }, correct: "C" },
{ question: "What is 5^6?", answers: { A: "15625", B: "15000", C: "16000", D: "17000" }, correct: "A" },
{ question: "What is 7^3?", answers: { A: "343", B: "333", C: "353", D: "363" }, correct: "A" },
{ question: "What is 11^2?", answers: { A: "121", B: "111", C: "131", D: "141" }, correct: "A" },
{ question: "Who first formulated the axioms of geometry in their modern form?", answers: { A: "Hilbert", B: "Euclid", C: "Pascal", B: "Gauss" }, correct: "A" },
{ question: "Who first proved the fundamental theorem of algebra?", answers: { A: "Gauss", B: "Euler", C: "Descartes", D: "Cauchy" }, correct: "A" },
{ question: "What are numbers called that cannot be written as a fraction?", answers: { A: "Rational", B: "Natural", C: "Irrational", D: "Integers" }, correct: "C" }
],
hardest: [
{ question: "Who proved the incompleteness of formal systems?", answers: { A: "Kurt Gödel", B: "Alan Turing", C: "David Hilbert", D: "John von Neumann" }, correct: "A" },
{ question: "Who introduced the term 'group' in algebra?", answers: { A: "Galois", B: "Noether", C: "Lagrange", D: "Cayley" }, correct: "A" },
{ question: "What is 50² − 49²?", answers: { A: "1", B: "50", C: "99", D: "100" }, correct: "C" },
{ question: "What is 0.25 × 0.25?", answers: { A: "0.5", B: "0.125", C: "0.0625", D: "0.25" }, correct: "C" },
{ question: "How many m² are in 2.5 km²?", answers: { A: "250,000", B: "2,500,000", C: "25,000,000", D: "250,000,000" }, correct: "B" },
{ question: "Who introduced the notation for the integral ∫?", answers: { A: "Leibniz", B: "Newton", C: "Euler", D: "Riemann" }, correct: "A" },
{ question: "Who first used the '=' sign for equality?", answers: { A: "Descartes", B: "Robert Recorde", C: "Leibniz", D: "Newton" }, correct: "B" },
{ question: "When was Euclid's book 'Elements' published?", answers: { A: "500 BC", B: "300 BC", C: "100 BC", D: "100 AD" }, correct: "B" },
{ question: "How many solutions does the equation x^2 = -1 have in real numbers?", answers: { A: "2", B: "1", C: "0", D: "Infinite" }, correct: "C" },
{ question: "Who solved the Poincaré conjecture?", answers: { A: "Andrew Wiles", B: "Terence Tao", C: "Grigori Perelman", D: "John Nash" }, correct: "C" },
{ question: "In which year did Emmy Noether publish her famous theorem?", answers: { A: "1905", B: "1915", C: "1918", D: "1925" }, correct: "C" },
{ question: "Who introduced the concept of mathematical rigor in analysis (ε-δ definition of limits)?", answers: { A: "Cauchy", B: "Weierstrass", C: "Riemann", D: "Bolzano" }, correct: "B" },
{ question: "Who first formally defined the continuum in real numbers?", answers: { A: "Cantor", B: "Dedekind", C: "Weierstrass", D: "Hilbert" }, correct: "B" },
{ question: "Who introduced the axiomatic approach to geometry in the 19th century?", answers: { A: "Hilbert", B: "Euclid", C: "Bolyai", D: "Lobachevsky" }, correct: "A" }
]
},

geography: {
easy: [
{ question: "Which shape has 10 sides?", answers: { A: "Octagon", B: "Decagon", C: "Hendecagon", D: "Hexagon" }, correct: "B" },
{ question: "What is 2 to the fifth power?", answers: { A: "32", B: "16", C: "25", D: "64" }, correct: "A" },
{ question: "Which square is closest to the number 1000?", answers: { A: "30²", B: "32²", C: "31²", D: "33²" }, correct: "B" },
{ question: "What is a fraction called where the numerator is greater than the denominator?", answers: { A: "Incomplete fraction", B: "Mixed number", C: "Uncorrected fraction", D: "Improper fraction" }, correct: "D" },
{ question: "Sequence: 2, 6, 12, 20, 30, ... What is the next term?", answers: { A: "36", B: "40", C: "42", D: "56" }, correct: "C" },
{ question: "René Descartes is known for his famous saying:", answers: { A: "'I think, therefore I am'", B: "'Knowledge is power'", C: "'Eureka!'", D: "'Everything is relative'" }, correct: "A" },
{ question: "What is a shape with 8 sides called?", answers: { A: "Hexagon", B: "Octagon", C: "Decagon", D: "Tetrahedron" }, correct: "B" },
{ question: "What is the famous paradox involving infinite steps where Achilles cannot catch the tortoise?", answers: { A: "Death Paradox", B: "Zeno's Paradox", C: "Simpson's Paradox", D: "Galileo's Paradox" }, correct: "B" },
{ question: "What is the cube root of 27?", answers: { A: "3", B: "9", C: "27", D: "6" }, correct: "A" },
{ question: "In which country was the mathematician Gauss born?", answers: { A: "Germany", B: "Switzerland", C: "Austria", D: "France" }, correct: "A" },
{ question: "In which country was the mathematician Fermat born?", answers: { A: "Italy", B: "Spain", C: "France", D: "England" }, correct: "C" },
{ question: "In which city was the mathematician Pascal born?", answers: { A: "Paris", B: "Clermont-Ferrand", C: "Marseille", D: "Nice" }, correct: "B" },
{ question: "In which country was the mathematician Newton born?", answers: { A: "Scotland", B: "England", C: "Ireland", D: "Wales" }, correct: "B" },
{ question: "What is the Roman numeral for the number 50?", answers: { A: "L", B: "C", C: "V", D: "X" }, correct: "A" },
{ question: "What is the Roman numeral for the number 100?", answers: { A: "D", B: "L", C: "C", D: "X" }, correct: "C" },
{ question: "What is the Roman numeral for the number 1000?", answers: { A: "M", B: "D", C: "C", D: "X" }, correct: "A" },
{ question: "What is the Roman numeral for the number 10?", answers: { A: "V", B: "X", C: "L", D: "I" }, correct: "B" },
{ question: "What is the Roman numeral for the number 500?", answers: { A: "M", B: "D", C: "C", D: "L" }, correct: "B" },
{ question: "What is the fourth letter of the Greek alphabet?", answers: { A: "Gamma", B: "Delta", C: "Beta", D: "Epsilon" }, correct: "B" },
{ question: "What is the third letter of the Greek alphabet?", answers: { A: "Beta", B: "Delta", C: "Gamma", D: "Alpha" }, correct: "C" },
{ question: "What is the last letter of the Greek alphabet?", answers: { A: "Sigma", B: "Omega", C: "Psi", D: "Theta" }, correct: "B" }
],
hard: [
{ question: "In which city was the Clay Mathematics Institute founded?", answers: { A: "New York", B: "Cambridge", C: "San Francisco", D: "Seattle" }, correct: "B" },
{ question: "Where is the 'Euler Room' located in honor of Leonhard Euler?", answers: { A: "Bern", B: "Zürich", C: "Basel", D: "Berlin" }, correct: "C" },
{ question: "In which country is the largest mathematics library (Bibliothèque de mathématiques) located?", answers: { A: "France", B: "Germany", C: "USA", D: "Italy" }, correct: "A" },
{ question: "Where is the largest mathematics museum in the world (Museum of Mathematics) located?", answers: { A: "New York", B: "London", C: "Berlin", D: "Tokyo" }, correct: "A" },
{ question: "In which city is 'Københavns Universitet' located, where Niels Bohr worked?", answers: { A: "Stockholm", B: "Copenhagen", C: "Oslo", D: "Helsinki" }, correct: "B" },
{ question: "Which was the first civilization to develop a method for solving quadratic equations?", answers: { A: "Egyptians", B: "Babylonians", C: "Greeks", D: "Chinese" }, correct: "B" },
{ question: "In which city is the famous Mathematical Bridge located?", answers: { A: "London", B: "Paris", C: "Cambridge", D: "Oxford" }, correct: "C" },
{ question: "In which country was Pythagoras born?", answers: { A: "Greece", B: "Italy", C: "Turkey", D: "Egypt" }, correct: "A" },
{ question: "Where is the Institute for Advanced Study located, where Einstein worked?", answers: { A: "Boston", B: "Princeton", C: "Cambridge", D: "New York" }, correct: "B" },
{ question: "In which city is the Fields Institute for Research in Mathematical Sciences located?", answers: { A: "Vancouver", B: "Montreal", C: "Toronto", D: "Ottawa" }, correct: "C" },
{ question: "Where was the mathematician Leonhard Euler born?", answers: { A: "Germany", B: "Switzerland", C: "Austria", D: "Netherlands" }, correct: "B" },
{ question: "In which country is the famous Library of Alexandria, known for its mathematical tradition, located?", answers: { A: "Egypt", B: "Greece", C: "Italy", D: "France" }, correct: "A" },
{ question: "In which city was the Institute for Mathematical Sciences (IMS) founded?", answers: { A: "Beijing", B: "New York", C: "Singapore", D: "Paris" }, correct: "C" },
{ question: "Where is CERN located, known for mathematical and physical research?", answers: { A: "Switzerland", B: "France", C: "Germany", D: "Italy" }, correct: "A" },
{ question: "In which city is MIT, famous for mathematics and technology, located?", answers: { A: "Boston", B: "Cambridge, Massachusetts", C: "San Francisco", D: "Seattle" }, correct: "B" },
{ question: "Which European country is home to a large number of mathematical museums and institutes, including CERN?", answers: { A: "Switzerland", B: "France", C: "Germany", D: "Italy" }, correct: "A" },
{ question: "Which city in Italy was home to Fibonacci, known for the Fibonacci sequence?", answers: { A: "Pisa", B: "Florence", C: "Rome", D: "Milan" }, correct: "A" },
{ question: "Which country is the birthplace of René Descartes, known for analytical geometry?", answers: { A: "Belgium", B: "France", C: "Switzerland", D: "Netherlands" }, correct: "B" },
{ question: "In which European city is the famous Institut Henri Poincaré located?", answers: { A: "Paris", B: "Berlin", C: "London", D: "Madrid" }, correct: "A" },
{ question: "Which Asian country contributed to the development of negative numbers in early mathematics?", answers: { A: "China", B: "India", C: "Japan", D: "Arabia" }, correct: "A" },
{ question: "In which country was the mathematician Riemann born?", answers: { A: "France", B: "Austria", C: "Switzerland", D: "Germany" }, correct: "D" },
{ question: "In which country was the mathematician Hilbert born?", answers: { A: "Germany", B: "Poland", C: "Czech Republic", D: "Austria" }, correct: "A" },
{ question: "In which country was the mathematician Kolmogorov born?", answers: { A: "Russia", B: "Ukraine", C: "Poland", D: "Belarus" }, correct: "A" },
{ question: "In which country was the mathematician Noether born?", answers: { A: "Germany", B: "Austria", C: "Switzerland", D: "Italy" }, correct: "A" },
{ question: "In which country was the mathematician Cantor born?", answers: { A: "Russia", B: "Sweden", C: "Denmark", D: "Netherlands" }, correct: "A" },
{ question: "In which city is the International Congress of Mathematicians held every 4 years?", answers: { A: "Always the same one", B: "It rotates around the world", C: "Only in Europe", D: "Only in the USA" }, correct: "B" },
{ question: "Where is the Steklov Institute of Mathematics located?", answers: { A: "Saint Petersburg", B: "Moscow", C: "Kyiv", D: "Minsk" }, correct: "B" },
{ question: "In which city did Al-Khwarizmi write his works on algebra?", answers: { A: "Baghdad", B: "Damascus", C: "Cairo", D: "Medina" }, correct: "A" },
{ question: "Who is considered the first known female mathematician?", answers: { A: "Ada Lovelace", B: "Emmy Noether", C: "Hypatia", D: "Marie Curie" }, correct: "C" },
{ question: "How is 2026 written in Roman numerals?", answers: { A: "MMXXVI", B: "MMXVI", C: "MCMXXVI", D: "MMXXIV" }, correct: "A" },
{ question: "What is a polygon with 12 sides called?", answers: { A: "Decagon", B: "Dodecagon", C: "Hendecagon", D: "Octagon" }, correct: "B" },
{ question: "Who first mathematically described the golden ratio?", answers: { A: "Euclid", B: "Newton", C: "Euler", D: "Gauss" }, correct: "A" }
], 
hardest: [ 
{ question: "In which city is the Max Planck Institute for Mathematics located?", answers: { A: "Berlin", B: "Bonn", C: "Munich", D: "Hamburg" }, correct: "B" },
{ question: "Where is the Mathematical Sciences Research Institute (MSRI) located?", answers: { A: "Berkeley", B: "Stanford", C: "Princeton", D: "Harvard" }, correct: "A" },
{ question: "In which city was the 'Institut für Mathematik' in Göttingen founded?", answers: { A: "Berlin", B: "Göttingen", C: "Munich", D: "Frankfurt" }, correct: "B" },
{ question: "In which country was the mathematician Grothendieck born?", answers: { A: "Germany", B: "France", C: "Switzerland", D: "Belgium" }, correct: "A" },
{ question: "In which country was the mathematician Gödel born?", answers: { A: "Austria", B: "Czech Republic", C: "Germany", D: "Switzerland" }, correct: "B" },
{ question: "In which country was the mathematician Turing born?", answers: { A: "England", B: "Scotland", C: "Ireland", D: "Wales" }, correct: "A" },
{ question: "In which country was the mathematician Perelman born?", answers: { A: "Russia", B: "Ukraine", C: "Belarus", D: "Lithuania" }, correct: "A" },
{ question: "In which country was the mathematician Wiles born?", answers: { A: "England", B: "USA", C: "Canada", D: "Australia" }, correct: "A" },
{ question: "In which city is the Institut Henri Poincaré located?", answers: { A: "Lyon", B: "Marseille", C: "Paris", D: "Toulouse" }, correct: "C" },
{ question: "Where was the first Academy of Sciences (including mathematics) founded?", answers: { A: "London", B: "Paris", C: "Berlin", D: "Florence" }, correct: "D" },
{ question: "Where is the Tata Institute of Fundamental Research (TIFR) located?", answers: { A: "India", B: "Japan", C: "China", D: "Korea" }, correct: "A" },
{ question: "Where was the first International Congress of Mathematicians (1897) held?", answers: { A: "Berlin", B: "Paris", C: "Zürich", D: "London" }, correct: "C" }
]
},

funFacts: {
easy: [
{ question: "Which number is the only one that is both even and prime?", answers: { A: "0", B: "1", C: "2", D: "3" }, correct: "C" },
{ question: "How many hours are in one week?", answers: { A: "144", B: "160", C: "168", D: "176" }, correct: "C" },
{ question: "In how many ways can 3 different objects be arranged in a row?", answers: { A: "3", B: "6", C: "9", D: "12" }, correct: "B" },
{ question: "In how many ways can 4 different objects be arranged in a row?", answers: { A: "12", B: "16", C: "24", D: "32" }, correct: "C" },
{ question: "What is the area of a circle with a radius of 7 cm?", answers: { A: "49π", B: "14π", C: "21π", D: "28π" }, correct: "A" },
{ question: "What is the area of a circle with a radius of 8 cm?", answers: { A: "16π", B: "64π", C: "32π", D: "8π" }, correct: "B" },
{ question: "What is the area of a circle with a radius of 10 cm?", answers: { A: "20π", B: "50π", C: "100π", D: "10π" }, correct: "C" },
{ question: "Which mathematical symbol is used for 'approximately equal to'?", answers: { A: "≈", B: "=", C: "≠", D: "≤" }, correct: "A" },
{ question: "What is the largest prime number less than 100?", answers: { A: "97", B: "91", C: "89", D: "99" }, correct: "A" },
{ question: "What is Pascal's triangle used for?", answers: { A: "Circle geometry", B: "Combinatorics and binomial coefficients", C: "Solving integrals", D: "Logarithmic functions" }, correct: "B" },
{ question: "Which mathematician is the polynomial division method named after?", answers: { A: "Newton", B: "Horner", C: "Gauss", D: "Lagrange" }, correct: "B" },
{ question: "How many faces does a dodecahedron have?", answers: { A: "10", B: "12", C: "14", D: "16" }, correct: "B" },
{ question: "What is 1+1 in modular arithmetic mod 2?", answers: { A: "0", B: "1", C: "2", D: "Undefined" }, correct: "A" },
{ question: "Which constant is approximately 2.718?", answers: { A: "π", B: "e", C: "φ", D: "γ" }, correct: "B" },
{ question: "What is the only number that cannot be written in Roman numerals?", answers: { A: "0", B: "1", C: "1000", D: "Million" }, correct: "A" },
{ question: "How many faces does a cube have?", answers: { A: "4", B: "6", C: "8", D: "12" }, correct: "B" },
{ question: "What does the prefix 'kilo' mean?", answers: { A: "100", B: "1000", C: "10000", D: "1000000" }, correct: "B" },
{ question: "What is a set of three integers that satisfy the Pythagorean theorem called?", answers: { A: "Pythagorean triple", B: "Euclidean triple", C: "Mathematical triple", D: "Geometric triple" }, correct: "A" },
{ question: "How many degrees are in a full circle?", answers: { A: "180°", B: "270°", C: "360°", D: "450°" }, correct: "C" },
{ question: "What is 0! (zero factorial)?", answers: { A: "0", B: "1", C: "2", D: "Undefined" }, correct: "B" },
{ question: "Which digit is the only one that does not appear in the binary system?", answers: { A: "0", B: "1", C: "2", D: "None" }, correct: "C" },
{ question: "What is the smallest natural number that is neither prime nor composite?", answers: { A: "1", B: "2", C: "3", D: "4" }, correct: "A" },
{ question: "What is the sum of the angles in a triangle?", answers: { A: "360°", B: "90°", C: "270°", D: "180°" }, correct: "D" },
{ question: "If a plane crashes on the border of two countries, where are the survivors buried?", answers: { A: "In the first country", B: "In the second", C: "On the border", D: "They are not buried" }, correct: "D" },
{ question: "How many times a day do the hands of a clock overlap?", answers: { A: "12", B: "22", C: "24", D: "48" }, correct: "B" },
{ question: "Which of the following numbers is equal to the sum of its digits multiplied by 3?", answers: { A: "12", B: "18", C: "27", D: "36" }, correct: "C" },
{ question: "If a number is increased by 20% and then decreased by 20%, the result is:", answers: { A: "Larger", B: "Smaller", C: "The same", D: "It depends" }, correct: "B" },
{ question: "How many diagonals does a square have?", answers: { A: "1", B: "2", C: "4", D: "6" }, correct: "B" },
{ question: "If you flip a coin 3 times, how many possible outcomes are there?", answers: { A: "6", B: "8", C: "4", D: "3" }, correct: "B" },
{ question: "What is the smallest number divisible by all numbers from 1 to 5?", answers: { A: "20", B: "60", C: "30", D: "120" }, correct: "B" },
{ question: "Which number is a palindrome?", answers: { A: "123", B: "121", C: "132", D: "231" }, correct: "B" },
{ question: "What is the sum of the infinite series 1/2 + 1/4 + 1/8 + ...?", answers: { A: "1", B: "2", C: "∞", D: "1/2" }, correct: "A" },
{ question: "If you have 5 different books, how many ways can you arrange them?", answers: { A: "25", B: "120", C: "60", D: "100" }, correct: "B" },
{ question: "Which number is a perfect square?", answers: { A: "361", B: "256", C: "121", D: "All of the above" }, correct: "D" },
{ question: "If it takes 5 machines 5 minutes to make 5 products, how long does it take 100 machines to make 100 products?", answers: { A: "100 min", B: "5 min", C: "50 min", D: "1 min" }, correct: "B" }
],
hard: [
{ question: "What is 2^10 + 2^10?", answers: { A: "1024", B: "2048", C: "4096", D: "512" }, correct: "B" },
{ question: "What is √2 to 2 decimal places?", answers: { A: "1.41", B: "1.42", C: "1.43", D: "1.44" }, correct: "A" },
{ question: "What is the smallest number divisible by all numbers from 1 to 10?", answers: { A: "2520", B: "5040", C: "720", D: "360" }, correct: "A" },
{ question: "What is the value of 2^5?", answers: { A: "16", B: "32", C: "64", D: "128" }, correct: "B" },
{ question: "What is the maximum number of colors needed to color any map?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "B" },
{ question: "What is Goldbach's conjecture?", answers: { A: "Every even integer is the sum of two primes", B: "There are infinitely many primes", C: "π is irrational", D: "e is transcendental" }, correct: "A" },
{ question: "How many Platonic solids exist?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "C" },
{ question: "What is the approximate value of the golden ratio?", answers: { A: "1.414", B: "1.618", C: "2.718", D: "3.142" }, correct: "B" },
{ question: "What is 0.5 as a percentage?", answers: { A: "5%", B: "50%", C: "0.5%", D: "500%" }, correct: "B" },
{ question: "What is the shortest path between two points on a plane?", answers: { A: "Curve", B: "Parabola", C: "Zig-zag", D: "Straight line" }, correct: "D" },
{ question: "What is 2^0?", answers: { A: "2", B: "0", C: "1", D: "Undefined" }, correct: "C" },
{ question: "What is 6666 × 6667?", answers: { A: "44442222", B: "33333333", C: "22224444", D: "55552222" }, correct: "A" },
{ question: "Which number is divisible by 6?", answers: { A: "214", B: "222", C: "230", D: "212" }, correct: "B" },
{ question: "What is LCM in mathematics?", answers: { A: "Largest Common Multiplier", B: "Least Common Multiple", C: "Least Common Divisor", D: "Odd Common Set" }, correct: "B" },
{ question: "What is GCD in mathematics?", answers: { A: "Greatest Common Divisor", B: "Least Common Divisor", C: "Least Common Multiple", D: "Negative Sum of Divisors" }, correct: "A" },
{ question: "The golden ratio is connected to which sequence?", answers: { A: "Lucas sequence", B: "Pythagorean sequence", C: "Fibonacci sequence", D: "Geometric sequence" }, correct: "C" },
{ question: "How is the relationship between sets most commonly displayed?", answers: { A: "Histogram", B: "Venn diagram", C: "Line graph", D: "Tabular display" }, correct: "B" },
{ question: "Which number is divisible by 3?", answers: { A: "124", B: "222", C: "121", D: "101" }, correct: "B" },
{ question: "Which symbol denotes the intersection of sets?", answers: { A: "∪", B: "∩", C: "⊂", D: "∈" }, correct: "B" },
{ question: "What is the decimal representation of 1/3?", answers: { A: "0.34", B: "0.3", C: "0.333", D: "0.333..." }, correct: "D" },
{ question: "What type of symmetry do butterfly wings show?", answers: { A: "Rotational symmetry", B: "Central symmetry", C: "Bilateral symmetry", D: "Translational symmetry" }, correct: "C" },
{ question: "What is the Roman numeral XC in Arabic numerals?", answers: { A: "90", B: "110", C: "80", D: "100" }, correct: "A" }
], 
hardest: [ 
{ question: "What is the least common multiple of 15 and 20?", answers: { A: "45", B: "30", C: "75", D: "60" }, correct: "D" },
{ question: "What is √2 approximately (to 3 decimal places)?", answers: { A: "1.415", B: "1.416", C: "1.417", D: "1.414" }, correct: "D" },
{ question: "What is √3 approximately (to 2 decimal places)?", answers: { A: "1.72", B: "1.73", C: "1.74", D: "1.75" }, correct: "B" },
{ question: "What is √5 approximately (to 2 decimal places)?", answers: { A: "2.22", B: "2.24", C: "2.26", D: "2.28" }, correct: "B" },
{ question: "What is log10(1000)?", answers: { A: "2", B: "1", C: "4", D: "3" }, correct: "D" },
{ question: "In which century did mathematical calculus originate?", answers: { A: "15th century", B: "16th century", C: "17th century", D: "18th century" }, correct: "C" },
{ question: "Who first proved that there are infinitely many prime numbers?", answers: { A: "Euclid", B: "Euler", C: "Gauss", D: "Cantor" }, correct: "A" },
{ question: "Who first popularized the symbol 'i' for an imaginary number?", answers: { A: "Euler", B: "Gauss", C: "Descartes", D: "Cauchy" }, correct: "A" },
{ question: "Who introduced the term 'complex numbers' to modern mathematics?", answers: { A: "Caspar Wessel", B: "Euler", C: "Gauss", D: "Descartes" }, correct: "A" },
{ question: "Who first defined the term 'topology'?", answers: { A: "Riemann", B: "Poincaré", C: "Euler", D: "Cantor" }, correct: "B" },
{ question: "Who formulated Hilbert's problems in 1900?", answers: { A: "David Hilbert", B: "Felix Klein", C: "Hermann Minkowski", D: "Bernhard Riemann" }, correct: "A" },
{ question: "Who proved Fermat's Last Theorem?", answers: { A: "Andrew Wiles", B: "Grigori Perelman", C: "Terence Tao", D: "Paul Erdős" }, correct: "A" },
{ question: "In which year did Gauss publish 'Disquisitiones Arithmeticae'?", answers: { A: "1791", B: "1801", C: "1811", D: "1821" }, correct: "B" }
]
},
 
interestingFacts: {
easy: [
{ question: "How many angles does a pentagon have?", answers: { A: "4", B: "5", C: "6", D: "7" }, correct: "B" },
{ question: "What is the sum of the first three prime numbers?", answers: { A: "8", B: "10", C: "12", D: "15" }, correct: "B" },
{ question: "How many edges does a tetrahedron have?", answers: { A: "4", B: "6", C: "8", D: "12" }, correct: "B" },
{ question: "What is 1 + 2 + 3 + ... + 10?", answers: { A: "45", B: "50", C: "60", D: "55" }, correct: "D" },
{ question: "What is the sum of the interior angles of a pentagon?", answers: { A: "360°", B: "720°", C: "480°", D: "540°" }, correct: "D" },
{ question: "What is 5! (five factorial)?", answers: { A: "60", B: "24", C: "720", D: "120" }, correct: "D" },
{ question: "If you roll two dice, what is the probability of getting a sum of 7?", answers: { A: "1/6", B: "1/12", C: "1/36", D: "1/3" }, correct: "A" },
{ question: "How many prime numbers are there less than 10?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "B" },
{ question: "Which number is the only one that is both a perfect square and prime?", answers: { A: "1", B: "4", C: "9", D: "None" }, correct: "D" },
{ question: "If x + x = x, what is x?", answers: { A: "1", B: "0", C: "2", D: "-1" }, correct: "B" },
{ question: "Who said 'Eureka!'?", answers: { A: "Pythagoras", B: "Euclid", C: "Archimedes", D: "Newton" }, correct: "C" },
{ question: "Who discovered the law of universal gravitation?", answers: { A: "Galileo", B: "Newton", C: "Einstein", D: "Kepler" }, correct: "B" },
{ question: "What is the third angle in a triangle if the other two are 50° and 60°?", answers: { A: "70°", B: "65°", C: "80°", D: "75°" }, correct: "A" },
{ question: "If the number of rice grains on each subsequent square of a chessboard doubles starting from 1, how many grains are on the 64th square?", answers: { A: "About 100 kg of rice", B: "One truck of rice", C: "More than the total global rice production", D: "Impossible to calculate" }, correct: "C" },
{ question: "How many times can a piece of paper be folded in practice?", answers: { A: "7 times", B: "10 times", C: "67", D: "Infinitely" }, correct: "A" },
{ question: "How many straight lines can be drawn through 4 distinct points (in a general case)?", answers: { A: "3", B: "4", C: "6", D: "Indeterminate" }, correct: "C" },
{ question: "What are collinear points?", answers: { A: "Points on the same circle", B: "Points on the same line", C: "Points in a plane", D: "Random points" }, correct: "B" },
{ question: "What are non-collinear points?", answers: { A: "Points on the same line", B: "Points lying on a circle", C: "Points that do not lie on the same line", D: "Points in the same center" }, correct: "C" },
{ question: "What are the basic terms in geometry that are not defined?", answers: { A: "Point, line, plane", B: "Angle, segment, circle", C: "Solid, volume, area", D: "Vector, matrix, function" }, correct: "A" },
{ question: "What was the name of the Greek school where the irrationality of numbers was discovered?", answers: { A: "Plato's Academy", B: "Pythagorean School", C: "Aristotle's Lyceum", D: "Euclidean School" }, correct: "B" },
{ question: "Which artist used mathematical proportions and the golden ratio in 'The Last Supper'?", answers: { A: "Michelangelo", B: "Leonardo da Vinci", C: "Raphael", D: "Donatello" }, correct: "B" },
{ question: "Where can the Fibonacci sequence be found in nature?", answers: { A: "Flowers", B: "Snowflakes and shells", C: "Spiral shapes", D: "All of the above" }, correct: "D" },
{ question: "What is a quadrilateral called where all sides are equal in length, but the angles are not right angles?", answers: { A: "Square", B: "Rectangle", C: "Rhombus", D: "Parallelogram" }, correct: "C" }
],
hard: [
{ question: "What is the smallest perfect number?", answers: { A: "1", B: "6", C: "28", D: "496" }, correct: "B" },
{ question: "Who is the father of modern computing?", answers: { A: "Ada Lovelace", B: "Alan Turing", C: "John von Neumann", D: "Charles Babbage" }, correct: "B" },
{ question: "Who introduced the symbol π?", answers: { A: "Euler", B: "Gauss", C: "Newton", D: "William Jones" }, correct: "D" },
{ question: "Who founded modern probability theory?", answers: { A: "Pascal", B: "Bernoulli", C: "Laplace", D: "Kolmogorov" }, correct: "D" },
{ question: "Who is known as the 'father of modern logic'?", answers: { A: "Aristotle", B: "Gödel", C: "Frege", D: "Boole" }, correct: "C" },
{ question: "Which mathematician proposed a theorem that remained unsolved for over 350 years until 1994?", answers: { A: "Isaac Newton", B: "Pierre de Fermat", C: "Leonhard Euler", D: "Carl Friedrich Gauss" }, correct: "B" },
{ question: "Which number is known as the 'smallest Armstrong number'?", answers: { A: "370", B: "371", C: "407", D: "153" }, correct: "D" },
{ question: "Which of these numbers is both a square and a cube?", answers: { A: "1 and 64", B: "0 and 1", C: "1 and 729", D: "4 and 8" }, correct: "A" },
{ question: "What is the value of e^(iπ) + 1?", answers: { A: "0", B: "1", C: "i", D: "-1" }, correct: "A" },
{ question: "What is the maximum number of intersection points of n circles?", answers: { A: "n²", B: "n(n-1)", C: "2n", D: "n!" }, correct: "B" },
{ question: "What is the first Carmichael number?", answers: { A: "341", B: "451", C: "561", D: "671" }, correct: "C" },
{ question: "Which number is known as the smallest multi-perfect number?", answers: { A: "120", B: "30240", C: "8128", D: "672" }, correct: "A" },
{ question: "What is the value of 2^8?", answers: { A: "512", B: "128", C: "1024", D: "256" }, correct: "D" },
{ question: "What is the value of sin(90°)?", answers: { A: "0", B: "0.5", C: "√2/2", D: "1" }, correct: "D" },
{ question: "The product of an odd and an even number is always?", answers: { A: "Odd", B: "Even", C: "Negative", D: "0" }, correct: "B" },
{ question: "The product of a positive and a negative number is?", answers: { A: "Positive", B: "0", C: "Negative", D: "Indeterminate" }, correct: "C" },
{ question: "The sum of two negative numbers is?", answers: { A: "Positive", B: "Negative", C: "0", D: "Indeterminate" }, correct: "B" },
{ question: "The product of two negative numbers is?", answers: { A: "Negative", B: "0", C: "Positive", D: "Indeterminate" }, correct: "C" },
{ question: "What is the average value of a data set called?", answers: { A: "Median", B: "Mode", C: "Arithmetic mean", D: "Variance" }, correct: "C" },
{ question: "What are two angles called if their sum is 90°?", answers: { A: "Supplementary", B: "Complementary", C: "Vertical", D: "Adjacent" }, correct: "B" },
{ question: "What are two angles called if their sum is 180°?", answers: { A: "Complementary", B: "Vertical", C: "Supplementary", D: "Parallel" }, correct: "C" },
{ question: "What is a major mathematical milestone for someone who lives 114 years (like Okawa from Japan)?", answers: { A: "50,000 days of life", B: "10,000 weeks of life", C: "Over one million hours of life", D: "All of the above" }, correct: "C" }
],
hardest: [
{ question: "What is the smallest perfect number?", answers: { A: "1", B: "6", C: "28", D: "496" }, correct: "B" },
{ question: "Who is the father of modern computing?", answers: { A: "Ada Lovelace", B: "Alan Turing", C: "John von Neumann", D: "Charles Babbage" }, correct: "B" },
{ question: "Who introduced the symbol π?", answers: { A: "Euler", B: "Gauss", C: "Newton", D: "William Jones" }, correct: "D" },
{ question: "Who founded modern probability theory?", answers: { A: "Pascal", B: "Bernoulli", C: "Laplace", D: "Kolmogorov" }, correct: "D" },
{ question: "Who is known as the 'father of modern logic'?", answers: { A: "Aristotle", B: "Gödel", C: "Frege", D: "Boole" }, correct: "C" },
{ question: "Which mathematician set a theorem that remained unsolved for over 350 years, until 1994?", answers: { A: "Isaac Newton", B: "Pierre de Fermat", C: "Leonhard Euler", D: "Carl Friedrich Gauss" }, correct: "B" },
{ question: "Which number is known as the 'smallest Armstrong number'?", answers: { A: "370", B: "371", C: "407", D: "153" }, correct: "D" },
{ question: "Which of the following numbers is both a square and a cube?", answers: { A: "1 and 64", B: "0 and 1", C: "1 and 729", D: "4 and 8" }, correct: "A" },
{ question: "What is e^(iπ) + 1?", answers: { A: "0", B: "1", C: "i", D: "-1" }, correct: "A" },
{ question: "What is the maximum number of intersection points for n circles?", answers: { A: "n²", B: "n(n-1)", C: "2n", D: "n!" }, correct: "B" },
{ question: "What is the first Carmichael number?", answers: { A: "341", B: "451", C: "561", D: "671" }, correct: "C" },
{ question: "Which number is known as the 'smallest multi-perfect number'?", answers: { A: "120", B: "30240", C: "8128", D: "672" }, correct: "D" },
{ question: "What is the value of 2^8?", answers: { A: "512", B: "128", C: "1024", D: "256" }, correct: "D" },
{ question: "What is the value of sin(90°)?", answers: { A: "0", B: "0.5", C: "√2/2", D: "1" }, correct: "D" },
{ question: "The product of an odd and an even number is always?", answers: { A: "Odd", B: "Even", C: "Negative", D: "0" }, correct: "B" },
{ question: "The product of a positive and a negative number is?", answers: { A: "Positive", B: "0", C: "Negative", D: "Indeterminate" }, correct: "C" },
{ question: "The sum of two negative numbers is?", answers: { A: "Positive", B: "Negative", C: "0", D: "Indeterminate" }, correct: "B" },
{ question: "The product of two negative numbers is?", answers: { A: "Negative", B: "0", C: "Positive", D: "Indeterminate" }, correct: "C" },
{ question: "What is the average value of a data set called?", answers: { A: "Median", B: "Mode", C: "Arithmetic mean", D: "Variance" }, correct: "C" },
{ question: "What are two angles called if their sum is 90°?", answers: { A: "Supplementary", B: "Complementary", C: "Vertical", D: "Adjacent" }, correct: "B" },
{ question: "What are two angles called if their sum is 180°?", answers: { A: "Complementary", B: "Vertical", C: "Supplementary", D: "Parallel" }, correct: "C" },
{ question: "What is a major life milestone for someone who lives to be 114 years old?", answers: { A: "50,000 days of life", B: "10,000 weeks of life", C: "Over one million hours of life", D: "All of the above" }, correct: "D" },
{ question: "How many solutions does the equation x³ + y³ = z³ have for natural numbers?", answers: { A: "Infinite", B: "Two", C: "0", D: "Only one" }, correct: "C" },
{ question: "What is the density of prime numbers near number n?", answers: { A: "1/n", B: "1/ln(n)", C: "1/√n", D: "1/n²" }, correct: "B" },
{ question: "What is Catalan's constant G to 2 decimal places?", answers: { A: "0.85", B: "0.92", C: "1.08", D: "1.15" }, correct: "B" },
{ question: "What is the smallest non-trivial triperfect number?", answers: { A: "120", B: "672", C: "523776", D: "Unknown" }, correct: "C" },
{ question: "How many dimensions does the Leech lattice have?", answers: { A: "8", B: "16", C: "24", D: "32" }, correct: "C" },
{ question: "What is 0.999... (repeating infinitely) in decimal form?", answers: { A: "0.9", B: "0.99", C: "Undefined", D: "1" }, correct: "D" },
{ question: "What is 2^10 + 2^9?", answers: { A: "1024", B: "2048", C: "512", D: "1536" }, correct: "D" }
]
},

numbers: {
easy: [
{ question: "What is the smallest prime number?", answers: { A: "0", B: "1", C: "2", D: "3" }, correct: "C" },
{ question: "How many zeros are in a million?", answers: { A: "4", B: "5", C: "6", D: "7" }, correct: "C" },
{ question: "What is 2 to the power of 10?", answers: { A: "512", B: "1024", C: "2048", D: "4096" }, correct: "B" },
{ question: "Which number is perfect (equal to the sum of its proper divisors)?", answers: { A: "4", B: "6", C: "8", D: "10" }, correct: "B" },
{ question: "If there are 5 cats in a room and 5 dogs enter, how many legs are there in total?", answers: { A: "20", B: "40", C: "42", D: "44" }, correct: "B" },
{ question: "Two fathers and two sons catch 3 fish. Each gets exactly one fish. How?", answers: { A: "It's impossible", B: "Grandfather, father, and son", C: "They share one", D: "They release one" }, correct: "B" },
{ question: "If 3 cats have 12 legs, how many legs do 6 cats have?", answers: { A: "18", B: "30", C: "36", D: "24" }, correct: "D" },
{ question: "What is 2 + 2 * 2?", answers: { A: "4", B: "10", C: "8", D: "6" }, correct: "D" },
{ question: "What is 20% of 100?", answers: { A: "10", B: "30", C: "40", D: "20" }, correct: "D" },
{ question: "What is 1/2 + 1/3 + 1/6?", answers: { A: "2", B: "3", C: "0.5", D: "1" }, correct: "D" },
{ question: "If 5x = 25, what is x?", answers: { A: "10", B: "15", C: "20", D: "5" }, correct: "D" },
{ question: "What is 1/2 of 1/2?", answers: { A: "1/2", B: "1", C: "2", D: "1/4" }, correct: "D" },
{ question: "If today is Wednesday, what day will it be in 100 days?", answers: { A: "Friday", B: "Saturday", C: "Sunday", D: "Thursday" }, correct: "A" },
{ question: "How many ways are there to roll a die and get an even number?", answers: { A: "2", B: "3", C: "4", D: "5" }, correct: "B" },
{ question: "Which number has exactly 3 divisors?", answers: { A: "4", B: "6", C: "8", D: "12" }, correct: "A" },
{ question: "Which number has the most divisors between 1 and 20?", answers: { A: "12", B: "18", C: "20", D: "16" }, correct: "A" },
{ question: "Which number follows 0, 1, 1, 2, 3 in the Fibonacci sequence?", answers: { A: "4", B: "5", C: "6", D: "8" }, correct: "B" },
{ question: "Which term describes an infinite set that can be counted?", answers: { A: "Uncountable", B: "Finite", C: "Dense", D: "Countable" }, correct: "D" },
{ question: "What is the third digit of π (after the decimal point)?", answers: { A: "3", B: "1", C: "4", D: "5" }, correct: "B" },
{ question: "What is the square root of 361?", answers: { A: "19", B: "20", C: "18", D: "21" }, correct: "A" },
{ question: "Which of these numbers is prime?", answers: { A: "21", B: "29", C: "39", D: "51" }, correct: "B" },
{ question: "What is the sum of the interior angles of a pentagon?", answers: { A: "360°", B: "540°", C: "720°", D: "450°" }, correct: "B" },
{ question: "What is the square of 21?", answers: { A: "441", B: "420", C: "400", D: "4410" }, correct: "A" },
{ question: "What is π to 2 decimal places?", answers: { A: "3.12", B: "3.14", C: "3.16", D: "3.18" }, correct: "B" }
],
hard: [
{ question: "What is the next prime number after 97?", answers: { A: "99", B: "101", C: "103", D: "107" }, correct: "B" },
{ question: "What is e (Euler's constant) to 2 decimal places?", answers: { A: "2.52", B: "2.62", C: "2.72", D: "2.82" }, correct: "C" },
{ question: "Who discovered the law of universal gravitation?", answers: { A: "Galileo", B: "Newton", C: "Einstein", D: "Kepler" }, correct: "B" },
{ question: "Who is known for the theory of relativity?", answers: { A: "Newton", B: "Planck", C: "Bohr", D: "Einstein" }, correct: "D" },
{ question: "Who is considered the father of modern computer science?", answers: { A: "Ada Lovelace", B: "Alan Turing", C: "John von Neumann", D: "Charles Babbage" }, correct: "B" },
{ question: "Who introduced the symbol π?", answers: { A: "Euler", B: "Gauss", C: "Newton", D: "William Jones" }, correct: "D" },
{ question: "Who founded modern probability theory?", answers: { A: "Pascal", B: "Bernoulli", C: "Laplace", D: "Kolmogorov" }, correct: "D" },
{ question: "What is the golden ratio φ to 3 decimal places?", answers: { A: "1.414", B: "1.618", C: "1.732", D: "2.236" }, correct: "B" },
{ question: "Who developed set theory?", answers: { A: "Dedekind", B: "Cantor", C: "Hilbert", D: "Frege" }, correct: "B" },
{ question: "Who solved the cubic equation in the 16th century?", answers: { A: "Cardano", B: "Tartaglia", C: "Ferrari", D: "Viète" }, correct: "A" },
{ question: "Who proved that e is transcendental?", answers: { A: "Hermite", B: "Lindemann", C: "Cantor", D: "Weierstrass" }, correct: "A" },
{ question: "Who discovered non-Euclidean geometry?", answers: { A: "Gauss", B: "Bolyai", C: "Lobachevsky", D: "All of the above" }, correct: "D" },
{ question: "Who developed group theory in its modern form?", answers: { A: "Noether", B: "Jordan", C: "Lagrange", D: "Galois" }, correct: "D" },
{ question: "Who introduced the symbol ∑ for summation?", answers: { A: "Gauss", B: "Leibniz", C: "Bernoulli", D: "Euler" }, correct: "D" },
{ question: "Who proved that the set of real numbers is uncountable?", answers: { A: "Gödel", B: "Hilbert", C: "Dedekind", D: "Cantor" }, correct: "D" },
{ question: "A hotel with infinitely many rooms is full. A new guest arrives. Can they be accommodated?", answers: { A: "No", B: "Yes", C: "Only in the hallway", D: "Depends on the room" }, correct: "B" },
{ question: "In the Monty Hall problem, should you switch doors?", answers: { A: "Yes", B: "No", C: "It doesn't matter", D: "It depends" }, correct: "A" },
{ question: "Birthday paradox: How many people are needed for a 50% chance that two share a birthday?", answers: { A: "183", B: "100", C: "50", D: "23" }, correct: "D" },
{ question: "What is 2 + 2 × 2 - 2 / 2?", answers: { A: "5", B: "7", C: "4", D: "6" }, correct: "A" },
{ question: "Which number is 3 times larger than 1/3?", answers: { A: "2", B: "3", C: "4", D: "1" }, correct: "D" },
{ question: "If x = 2 and y = 3, what is x to the power of y?", answers: { A: "6", B: "9", C: "8", D: "27" }, correct: "C" }
],
hardest: [
{ question: "What is the value of Apéry's constant ζ(3) to 2 decimal places?", answers: { A: "1.20", B: "1.50", C: "1.80", D: "2.10" }, correct: "A" },
{ question: "How many digits does a Googolplex have?", answers: { A: "10^100", B: "10^(10^100)", C: "10^1000", D: "10^10000" }, correct: "B" },
{ question: "What is Graham's number G1?", answers: { A: "3↑↑3", B: "3↑↑↑↑3", C: "3→3→3", D: "3^(3^27)" }, correct: "B" },
{ question: "Mersenne numbers are a special class of prime numbers. Which organization is primarily responsible for discovering the largest known prime numbers?", answers: { A: "NASA", B: "GIMPS", C: "CERN", D: "MIT" }, correct: "B" },
{ question: "Who proved the Taniyama-Shimura conjecture for semistable elliptic curves?", answers: { A: "Andrew Wiles", B: "Richard Taylor", C: "Goro Shimura", D: "Yutaka Taniyama" }, correct: "A" },
{ question: "Who received the Fields Medal in 2014 for work on dynamical systems?", answers: { A: "Maryam Mirzakhani", B: "Manjul Bhargava", C: "Artur Avila", D: "Martin Hairer" }, correct: "C" },
{ question: "Who declined the Fields Medal in 2006?", answers: { A: "Terence Tao", B: "Grigori Perelman", C: "Andrei Okounkov", D: "Wendelin Werner" }, correct: "B" },
{ question: "Who developed category theory?", answers: { A: "Samuel Eilenberg", B: "Saunders Mac Lane", C: "Alexander Grothendieck", D: "A and B" }, correct: "D" },
{ question: "Who solved Hilbert's 10th problem?", answers: { A: "Turing", B: "Church", C: "Matiyasevich", D: "Gödel" }, correct: "C" },
{ question: "Who introduced category theory along with Mac Lane?", answers: { A: "Grothendieck", B: "Lawvere", C: "Kan", D: "Eilenberg" }, correct: "D" },
{ question: "Who formulated the theory of relativity in mathematical form?", answers: { A: "Einstein", B: "Lorentz", C: "Riemann", D: "Minkowski" }, correct: "D" },
{ question: "Who first defined the term 'mathematical logic' in its modern form?", answers: { A: "Gödel", B: "Turing", C: "Russell", D: "Frege" }, correct: "D" },
{ question: "Who discovered the 'four color' theorem (the first to be proven by computer)?", answers: { A: "Fourier", B: "Gauss", C: "Euler", D: "Appel and Haken" }, correct: "D" },
{ question: "Who first proved Fermat's Last Theorem?", answers: { A: "Fermat", B: "Taylor", C: "Taniyama", D: "Wiles" }, correct: "D" },
{ question: "The Banach-Tarski paradox claims that you can?", answers: { A: "Cut a ball into 5 pieces and reassemble them into 2 balls", B: "Stretch it infinitely", C: "Compress it into a point", D: "Rotate it in 4D" }, correct: "A" },
{ question: "Gabriel's Horn has?", answers: { A: "Finite volume, infinite surface area", B: "Infinite volume, finite surface area", C: "Both finite", D: "Both infinite" }, correct: "A" },
{ question: "What is the sum of 1+2+3+4+... to infinity in an analytical sense (Ramanujan sum)?", answers: { A: "∞", B: "-1/12", C: "Diverges", D: "0" }, correct: "B" },
{ question: "What is 1/0 in mathematics?", answers: { A: "0", B: "∞", C: "1", D: "Undefined" }, correct: "D" },
{ question: "What is the value of log(1)?", answers: { A: "1", B: "Undefined", C: "∞", D: "0" }, correct: "D" },
{ question: "What is √(-1)?", answers: { A: "-i", B: "1", C: "Undefined", D: "i" }, correct: "D" },
{ question: "What is the value of sin(0)?", answers: { A: "1", B: "-1", C: "Undefined", D: "0" }, correct: "D" },
{ question: "If there are 24 time zones across 360°, how many degrees are allocated to one zone?", answers: { A: "10°", B: "12°", C: "15°", D: "20°" }, correct: "C" }
]
}
},

gk: {

history: {
easy: [
{ question: "How old was Neil Armstrong when he walked on the Moon?", answers: { A: "67", B: "21", C: "36", D: "38" }, correct: "D" },
{ question: "What is the name of the currency used in Japan?", answers: { A: "Yuan", B: "Won", C: "Japanese Won", D: "Yen" }, correct: "D" },
{ question: "Which chemical element did Marie Curie name after her homeland to draw attention to the fact that it was not an independent state at the time?", answers: { A: "Germanium", B: "Francium", C: "Polonium", D: "Europium" }, correct: "C" },
{ question: "What colors are the two letters G in the Google logo?", answers: { A: "Blue", B: "Red", C: "Yellow", D: "Green" }, correct: "A" },
{ question: "How many seconds does it take light to travel the distance from the Moon to the Earth (approximately)?", answers: { A: "0.5", B: "1.3", C: "2.0", D: "3.5" }, correct: "B" },
{ question: "How many seconds would it take light to travel around the Earth at the equator (seven and a half laps)?", answers: { A: "0.13", B: "1.5", C: "5.0", D: "10.0" }, correct: "A" },
{ question: "How many countries in Asia have direct access to the sea or ocean?", answers: { A: "26", B: "36", C: "16", D: "46" }, correct: "B" },
{ question: "What is the name of the list of literary works that students are required to read according to the curriculum?", answers: { A: "Syllabus", B: "Required reading", C: "Canon", D: "Reading plan" }, correct: "B" },
{ question: "Which city in BiH is known as the 'city of salt'?", answers: { A: "Zenica", B: "Tuzla", C: "Bihać", D: "Prijedor" }, correct: "B" },
{ question: "Which country was the first to recognize the independence of Bosnia and Herzegovina on January 15, 1992?", answers: { A: "Germany", B: "USA", C: "Turkey", D: "Bulgaria" }, correct: "D" },
{ question: "Which mountain is the highest in Bosnia and Herzegovina?", answers: { A: "Prenj", B: "Maglić", C: "Vranica", D: "Treskavica" }, correct: "B" },
{ question: "Which element has the highest atomic number that occurs naturally in the Earth's crust in significant quantities?", answers: { A: "Uranium", B: "Plutonium", C: "Radon", D: "Radium" }, correct: "A" },
{ question: "Which is the only country in the world that does not have an official capital city?", answers: { A: "Nauru", B: "Palau", C: "Island", D: "Monaco" }, correct: "A" },
{ question: "Which country has the most borders with other countries in the world (as many as 14)?", answers: { A: "Germany", B: "Switzerland", C: "Brazil", D: "China" }, correct: "D" },
{ question: "Which rapper is the main character in the semi-autobiographical film '8 Mile'?", answers: { A: "Drake", B: "50 Cent", C: "Snoop Dogg", D: "Eminem" }, correct: "D" },
{ question: "Which SI unit of measurement can also be called a kilogram-meter per second squared?", answers: { A: "Joule", B: "Newton", C: "Pascal", D: "Watt" }, correct: "B" },
{ question: "The father of which dramatic character was killed during an afternoon nap by poison poured into his ear?", answers: { A: "Fortinbras", B: "Laertes", C: "Hamlet", D: "Othello" }, correct: "C" },
{ question: "Which two-letter abbreviation in Great Britain denotes the time before noon?", answers: { A: "GMT", B: "PM", C: "AM", D: "UTC" }, correct: "C" },
{ question: "In which of the 5 New York boroughs is Greenwich Village located?", answers: { A: "Brooklyn", B: "Manhattan", C: "Queens", D: "Bronx" }, correct: "B" },
{ question: "Daylight saving time in the European Union begins on the last Sunday of which month?", answers: { A: "April", B: "May", C: "March", D: "June" }, correct: "C" },
{ question: "To which family of mammals do zebras belong?", answers: { A: "Antelopes", B: "Cattle", C: "Horses", D: "Donkeys" }, correct: "C" },
{ question: "How many countries in Europe are full members of the UN?", answers: { A: "60", B: "36", C: "40", D: "44" }, correct: "D" },
{ question: "How many internationally recognized countries are there in Africa?", answers: { A: "85", B: "75", C: "64", D: "54" }, correct: "D" },
{ question: "How many sovereign states are located in Asia according to the UN classification?", answers: { A: "28", B: "38", C: "48", D: "58" }, correct: "C" },
{ question: "How many internationally recognized sovereign states are in North America (including the Caribbean and Central America)?", answers: { A: "23", B: "21", C: "19", D: "25" }, correct: "A" },
{ question: "How many countries does South America have?", answers: { A: "10", B: "12", C: "14", D: "16" }, correct: "B" },
{ question: "How many internationally recognized countries are located in the region of Australia and Oceania?", answers: { A: "10", B: "14", C: "12", D: "8" }, correct: "B" },
{ question: "The plot of which play takes place at Christmas time in the house of bank clerk Torvald Helmer?", answers: { A: "Hedda Gabler", B: "A Doll's House", C: "The Minister's Wife", D: "Anna Karenina" }, correct: "B" },
{ question: "With which metal was the fleet financed with which the Athenians defeated the Persians at Salamis?", answers: { A: "Silver", B: "Gold", C: "Copper", D: "Iron" }, correct: "A" },
{ question: "The name of which geometric body comes from the ancient Greek word for a small table?", answers: { A: "Prism", B: "Cube", C: "Pyramid", D: "Trapezium" }, correct: "D" },
{ question: "Welshman Ian Rush is, with 346 goals, the top scorer in the history of which club?", answers: { A: "Liverpool", B: "Manchester United", C: "Arsenal", D: "Chelsea" }, correct: "A" },
{ question: "Which fictional doctor's best friend is oncologist James Wilson?", answers: { A: "Dr. Watson", B: "Dr. House", C: "Dr. Strange", D: "Dr. McCoy" }, correct: "B" },
{ question: "What is the name of the currency unit in Turkey?", answers: { A: "Turkish dirham", B: "Dinar", C: "Lira", D: "Euro" }, correct: "C" },
{ question: "The name of which liver disease comes from the Greek word for 'orange-yellow'?", answers: { A: "Virosis", B: "Hepatitis", C: "Steatosis", D: "Cirrhosis" }, correct: "D" },
{ question: "Which letter of the English alphabet is used in mathematics to denote the set of rational numbers?", answers: { A: "R", B: "Q", C: "Z", D: "N" }, correct: "B" },
{ question: "Which band sings about Selena, Šeki, Sejo, and Abid on their first album?", answers: { A: "Parni Valjak", B: "Indexi", C: "Bijelo dugme", D: "Zabranjeno pušenje" }, correct: "D" },
{ question: "Which country, whose name in Latin means 'Southern Land', is the sixth largest in the world?", answers: { A: "Australia", B: "South Africa", C: "Antarctica", D: "Arctic" }, correct: "A" },
{ question: "In which US state is Denali, the highest peak in the USA, located?", answers: { A: "Nevada", B: "Alaska", C: "Colorado", D: "Montana" }, correct: "B" },
{ question: "Which nucleic acid contains the base uracil?", answers: { A: "tRNA", B: "DNA", C: "RNA", D: "mRNA" }, correct: "C" },
{ question: "During puberty, the body grows rapidly due to the action of which chemical substances?", answers: { A: "Minerals", B: "Enzymes", C: "Vitamins", D: "Hormones" }, correct: "D" },
{ question: "Which boxer was stripped of his title in 1967 because he refused to serve in the Vietnam War?", answers: { A: "Mike Tyson", B: "George Foreman", C: "Muhammad Ali", D: "Joe Frazier" }, correct: "C" },
{ question: "Into which sea do the Vistula, Odra, and Neva rivers flow?", answers: { A: "Baltic", B: "Black", C: "North", D: "Aegean" }, correct: "A" },
{ question: "Which was the first planet discovered by telescope and the only one named after a Greek rather than a Roman god?", answers: { A: "Uranus", B: "Neptune", C: "Pluto", D: "Saturn" }, correct: "A" },
{ question: "Which African country did Napoleon I conquer in 1798?", answers: { A: "Algeria", B: "Egypt", C: "Libya", D: "Morocco" }, correct: "B" },
{ question: "Which is the only planet in the solar system whose name begins and ends with the same letter?", answers: { A: "Neptune", B: "Uranus", C: "Saturn", D: "Venus" }, correct: "A" },
{ question: "The Pennine Alps are located in Switzerland and Italy, but the Pennines are in which country?", answers: { A: "Great Britain", B: "Ireland", C: "Norway", D: "Scotland" }, correct: "A" },
{ question: "Which Italian fashion company's logo features a stylized image of the mythological Medusa?", answers: { A: "Gucci", B: "Versace", C: "Prada", D: "Armani" }, correct: "B" },
{ question: "How many countries have access to the Adriatic Sea?", answers: { A: "5", B: "6", C: "7", D: "8" }, correct: "B" },
{ question: "Which country has the most islands in the world (over 220,000)?", answers: { A: "Indonesia", B: "Philippines", C: "Sweden", D: "Greece" }, correct: "C" },
{ question: "Which is the smallest continent by area?", answers: { A: "Europe", B: "Australia", C: "South America", D: "Antarctica" }, correct: "B" },
{ question: "Through how many countries does the Danube River flow?", answers: { A: "6-7", B: "8", C: "9", D: "10" }, correct: "D" },
{ question: "What is the highest mountain in Africa?", answers: { A: "Kilimanjaro", B: "Atlas", C: "Kenya", D: "Stanley" }, correct: "A" },
{ question: "Who holds the record for the most points scored in NBA history (over 43,000+ points)?", answers: { A: "Michael Jordan", B: "Kareem Abdul-Jabbar", C: "LeBron James", D: "Kobe Bryant" }, correct: "C" },
{ question: "How many minutes does extra time last in a football match (two halves of how many)?", answers: { A: "10 min", B: "15 min", C: "20 min", D: "5 min" }, correct: "B" },
{ question: "Which tennis player has won the most trophies at Roland Garros?", answers: { A: "Novak Djokovic", B: "Roger Federer", C: "Bjorn Borg", D: "Rafael Nadal" }, correct: "D" },
{ question: "In what year was the first FIFA World Cup held?", answers: { A: "1920", B: "1930", C: "1940", D: "1916" }, correct: "B" },
{ question: "In which sport is the term 'hole-in-one' used?", answers: { A: "Golf", B: "Tenis", C: "Billiards", D: "Darts" }, correct: "A" },
{ question: "Which singer has the nickname 'Queen Bey'?", answers: { A: "Beyoncé", B: "Madonna", C: "Rihanna", D: "Adele" }, correct: "A" },
{ question: "Which country does the group ABBA come from?", answers: { A: "Norway", B: "Denmark", C: "Finland", D: "Sweden" }, correct: "D" },
{ question: "Which country is the world's largest producer of coffee?", answers: { A: "Ethiopia", B: "Colombia", C: "Brazil", D: "Vietnam" }, correct: "C" },
{ question: "What is the name of the Mexican avocado-based sauce?", answers: { A: "Salsa", B: "Hummus", C: "Guacamole", D: "Pesto" }, correct: "C" },
{ question: "Which spice is the most expensive in the world by weight?", answers: { A: "Vanilla", B: "Saffron", C: "Cardamom", D: "Pepper" }, correct: "B" },
{ question: "Which film won the Oscar for Best Picture in 2024?", answers: { A: "Barbie", B: "Oppenheimer", C: "Poor Things", D: "Dune 2" }, correct: "B" },
{ question: "What is the name of the capital city in the series 'Game of Thrones'?", answers: { A: "Winterfell", B: "Dragonstone", C: "King's Landing", D: "Braavos" }, correct: "C" },
{ question: "Who directed the films 'Inception', 'Interstellar', and 'The Dark Knight'?", answers: { A: "Steven Spielberg", B: "Quentin Tarantino", C: "Martin Scorsese", D: "Christopher Nolan" }, correct: "D" },
{ question: "Which actor plays Iron Man in the Marvel movies?", answers: { A: "Chris Evans", B: "Robert Downey Jr.", C: "Chris Hemsworth", D: "Tom Holland" }, correct: "B" },
{ question: "What is the name of the fictional town where the Simpsons live?", answers: { A: "Springfield", B: "Quahog", C: "South Park", D: "Riverdale" }, correct: "A" },
{ question: "Who was the supreme god in Greek mythology?", answers: { A: "Poseidon", B: "Hades", C: "Apollo", D: "Zeus" }, correct: "D" },
{ question: "What was the name of the Egyptian goddess of fertility and motherhood?", answers: { A: "Isis", B: "Bastet", C: "Nefertiti", D: "Hathor" }, correct: "A" },
{ question: "In Norse mythology, what is the name of the home of the gods?", answers: { A: "Valhalla", B: "Jotunheim", C: "Midgard", D: "Asgard" }, correct: "D" },
{ question: "Which Roman god is the equivalent of the Greek god Ares?", answers: { A: "Mars", B: "Neptune", C: "Mercury", D: "Jupiter" }, correct: "A" },
{ question: "What does 'Pandora's box' symbolize in Greek mythology?", answers: { A: "Eternal wealth", B: "Immortality", C: "Knowledge", D: "All the evils of the world" }, correct: "D" },
{ question: "Who wrote the novel 'Crime and Punishment'?", answers: { A: "Leo Tolstoy", B: "Fyodor Dostoevsky", C: "Anton Chekhov", D: "Ivan Turgenev" }, correct: "B" },
{ question: "What is the name of the region in the novel 'The Lord of the Rings' where Sauron's seat is located?", answers: { A: "Gondor", B: "Rohan", C: "Mordor", D: "Isengard" }, correct: "C" },
{ question: "Which fictional detective lives at 221B Baker Street?", answers: { A: "Hercule Poirot", B: "Philip Marlowe", C: "Arsène Lupin", D: "Sherlock Holmes" }, correct: "D" },
{ question: "Which author wrote the Harry Potter series?", answers: { A: "Agatha Christie", B: "J.K. Rowling", C: "Virginia Woolf", D: "Enid Blyton" }, correct: "B" },
{ question: "Which three-letter word is in the names of three of the five largest California cities?", answers: { A: "Los", B: "San", C: "Las", D: "New" }, correct: "B" },
{ question: "Which vitamin do we get from sunbathing or consuming fish oil?", answers: { A: "A", B: "C", C: "D", D: "K" }, correct: "C" },
{ question: "Which animal from the Bovidae family is featured in the crown of the coat of arms of the Republic of Croatia?", answers: { A: "Deer", B: "Lion", C: "Goat", D: "Wolf" }, correct: "C" },
{ question: "Which chemical element with atomic number 63 is named after a continent?", answers: { A: "Europium", B: "Asia", C: "Africa", D: "Americia" }, correct: "A" },
{ question: "Which is the most populous US city after New York and Los Angeles?", answers: { A: "Houston", B: "Chicago", C: "Miami", D: "Dallas" }, correct: "B" },
{ question: "Which programmer is the main character of the film advertised with the slogan 'You don't get to 500 million friends without making a few enemies'?", answers: { A: "Bill Gates", B: "Steve Jobs", C: "Elon Musk", D: "Mark Zuckerberg" }, correct: "D" },
{ question: "What is the Latin abbreviation for the phrase 'and so on'?", answers: { A: "am.", B: "e.g.", C: "i.e.", D: "etc." }, correct: "D" },
{ question: "How many pedestrians are crossing the zebra in Ian McMillan's iconic music photo?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "B" },
{ question: "On which continent do ferns not grow?", answers: { A: "Antarctica", B: "Arctic", C: "Australia", D: "Africa" }, correct: "A" },
{ question: "What do Germans call their largest federal state?", answers: { A: "Bayern", B: "Sachsen", C: "Hessen", D: "NRW" }, correct: "A" },
{ question: "Which railway in northern Bosnia was built in a youth action immediately after the end of WWII?", answers: { A: "Sarajevo–Mostar", B: "Brčko–Banovići", C: "Doboj–Tuzla", D: "Bihać–Knin" }, correct: "B" },
{ question: "What is the oldest university in the world still in operation?", answers: { A: "Oxford", B: "Sorbonne", C: "Al-Qarawiyyin", D: "Bologna" }, correct: "C" },
{ question: "Which Greek philosopher was the teacher of Alexander the Great?", answers: { A: "Socrates", B: "Plato", C: "Aristotle", D: "Diogenes" }, correct: "C" },
{ question: "What is the oldest written epic in the world?", answers: { A: "Iliad", B: "Odyssey", C: "Hamlet", D: "Epic of Gilgamesh" }, correct: "D" },
{ question: "Which planet has the most known natural satellites?", answers: { A: "Jupiter", B: "Saturn", C: "Uranus", D: "Neptune" }, correct: "B" },
{ question: "Which part of the human brain is responsible for balance and coordination?", answers: { A: "Cerebrum", B: "Cerebellum", C: "Medulla oblongata", D: "Hypothalamus" }, correct: "B" },
{ question: "Which vitamin is crucial for blood clotting?", answers: { A: "Vitamin A", B: "Vitamin B12", C: "Vitamin C", D: "Vitamin K" }, correct: "D" },
{ question: "Which organ in the human body produces insulin?", answers: { A: "Pancreas", B: "Liver", C: "Kidneys", D: "Spleen" }, correct: "A" },
{ question: "Deli merchant Richard Hellman achieved wealth by selling which condiment?", answers: { A: "Ketchup", B: "Ajvar", C: "Mustard", D: "Mayonnaise" }, correct: "D" },
{ question: "In which Lovrak novel do students found the 'Sloga' cooperative to overcome obstacles on their way back from a school trip?", answers: { A: "The Gang of Pero Kvržica", B: "Anja Loves Petar", C: "Micek, Mucek and Dedek", D: "Train in the Snow" }, correct: "D" },
{ question: "Which is the largest country by area in the world where Cyrillic is the official script?", answers: { A: "Ukraine", B: "Kazakhstan", C: "Russia", D: "Belarus" }, correct: "C" },
{ question: "Which name does the head of a dervish order share with a chess term for the end of a game?", answers: { A: "Shah", B: "Mat", C: "Castling", D: "Stalemate" }, correct: "B" },
{ question: "Which three-letter city in eastern Serbia is known for large copper deposits?", answers: { A: "Bor", B: "Niš", C: "Zaj", D: "Kru" }, correct: "A" },
{ question: "In the delta of which river is the Russian city of Astrakhan located?", answers: { A: "Don", B: "Dnieper", C: "Ural", D: "Volga" }, correct: "D" }
],
hard: [ 
{ question: "The regular three-dimensional arrangement of a crystal's building particles is called a crystal-what?", answers: { A: "Web", B: "Lattice", C: "Structure", D: "Form" }, correct: "B" },
{ question: "Which convention is referred to when discussing the proper treatment of prisoners of war?", answers: { A: "Helsinki", B: "Rome", C: "Geneva", D: "Paris" }, correct: "C" },
{ question: "What is called 'korenje' in Slovenia and 'šargarepa' in Serbia called in Croatia?", answers: { A: "Carrot (Mrkva)", B: "Parsley", C: "Celery", D: "Turnip" }, correct: "A" },
{ question: "Which country joined the NATO alliance in 1999 along with Poland and the Czech Republic?", answers: { A: "Romania", B: "Slovakia", C: "Slovenia", D: "Hungary" }, correct: "D" },
{ question: "Which game console and competitor to Sony's PlayStation did Microsoft introduce in 2001?", answers: { A: "Sega Dreamcast", B: "Nintendo 64", C: "Xbox", D: "Atari" }, correct: "C" },
{ question: "According to the 1982 census, which city was the third largest in Yugoslavia with nearly half a million inhabitants?", answers: { A: "Belgrade", B: "Sarajevo", C: "Zagreb", D: "Skopje" }, correct: "D" },
{ question: "The name of which oriental wide trousers is hidden in an anagram of the word 'mediji'?", answers: { A: "Dimije", B: "Shalwar", C: "Sarong", D: "Kaftan" }, correct: "A" },
{ question: "The 13-day escalation of relations between the USSR and the USA in 1962 is known as what 'crisis'?", answers: { A: "Iranian", B: "Russian", C: "Cuban", D: "Vietnam" }, correct: "C" },
{ question: "What is the name of the medical test for measuring lung volume and capacity?", answers: { A: "Cardiology", B: "Bronchoscopy", C: "Electrocardiography", D: "Spirometry" }, correct: "D" },
{ question: "Which noble gas used to fill lighting fixtures has atomic number 10?", answers: { A: "Helium", B: "Argon", C: "Neon", D: "Nitrogen" }, correct: "C" },
{ question: "Which Korean martial art developed from karate after World War II?", answers: { A: "Hapkido", B: "Judo", C: "Taekwondo", D: "Kendo" }, correct: "C" },
{ question: "Which fish product will you get if you rearrange the letters in the word 'akvarij'?", answers: { A: "Tuna", B: "Salmon", C: "Sardine", D: "Caviar" }, correct: "D" },
{ question: "The phrase 'mixing pears and apples' is equivalent to the idiom 'adding grandmas and'-whom?", answers: { A: "Birds", B: "Cats", C: "Frogs (Žabe)", D: "Fish" }, correct: "C" },
{ question: "After which ancient Roman goddess of fertility is the entire animal kingdom named?", answers: { A: "Diana", B: "Fauna", C: "Venus", D: "Minerva" }, correct: "B" },
{ question: "How many Smurfs does Gargamel need to make a potion that turns metal into gold?", answers: { A: "67", B: "6", C: "9", D: "11" }, correct: "B" },
{ question: "What does the FKK label on a beach signify about the type of beach?", answers: { A: "Wild", B: "Sandy", C: "Private", D: "Nudist" }, correct: "D" },
{ question: "Which Latin name is shared by a space nebula and an award for the best SF book?", answers: { A: "Stella", B: "Nova", C: "Cosmos", D: "Nebula" }, correct: "D" },
{ question: "Which New York fashion designer launched the Polo clothing line in 1967?", answers: { A: "Emporio Armani", B: "Calvin Klein", C: "Ralph Lauren", D: "Marc Jacobs" }, correct: "C" },
{ question: "What is the minimum number of land borders you must cross on the way from Norway to North Korea?", answers: { A: "1", B: "2", C: "3", D: "4" }, correct: "B" },
{ question: "Which type of coniferous forest spread in the north occupies a third of the forest area on Earth?", answers: { A: "Taiga", B: "Savannah", C: "Rainforest", D: "Steppe" }, correct: "A" },
{ question: "After which dangerous animal is the Marvel 'Avenger' Natasha Romanoff named?", answers: { A: "Panther", B: "Tiger", C: "Snake", D: "Black Widow" }, correct: "D" },
{ question: "In which group of organic compounds do we include enzymes and antibodies?", answers: { A: "Proteins", B: "Carbohydrates", C: "Lipids", D: "Vitamins" }, correct: "A" },
{ question: "Which software for video communication via the internet did Microsoft buy for $8.5 billion in 2011?", answers: { A: "Skype", B: "Zoom", C: "Teams", D: "Discord" }, correct: "A" },
{ question: "After which inventor is the electric car company from Palo Alto, California named?", answers: { A: "Volta", B: "Edison", C: "Faraday", D: "Tesla" }, correct: "D" },
{ question: "In physics, what is an empty space called that contains no material particles?", answers: { A: "Black hole", B: "Plasma", C: "Ether", D: "Vacuum" }, correct: "D" },
{ question: "Which country has the most neighboring states in Africa?", answers: { A: "Sudan", B: "Congo", C: "Tanzania", D: "Niger" }, correct: "B" },
{ question: "What is the highest capital city in the world?", answers: { A: "Quito", B: "La Paz", C: "Bogota", D: "Lhasa" }, correct: "B" },
{ question: "Approximately how many countries in the world have fewer than 1 million inhabitants?", answers: { A: "10", B: "20", C: "30", D: "40" }, correct: "C" },
{ question: "Approximately how many inhabitants per square kilometer does the country with the lowest population density in the world, Mongolia, have?", answers: { A: "2", B: "50", C: "100", D: "200" }, correct: "A" },
{ question: "How many bytes are in 1 kilobyte in modern computers (binary definition)?", answers: { A: "1000", B: "1024", C: "1048", D: "1100" }, correct: "B" },
{ question: "Which length in km is traditionally attributed to the Nile River, long considered the longest in the world?", answers: { A: "4,200", B: "6,650", C: "5,100", D: "7,800" }, correct: "B" },
{ question: "In which animated film named after a Provençal dish does Remy the rat save a French restaurant?", answers: { A: "Ratatouille", B: "Shrek", C: "Madagascar", D: "Cars" }, correct: "A" },
{ question: "In which country are the famous tourist destinations Hurghada and Sharm-el-Sheikh located?", answers: { A: "Tunisia", B: "Morocco", C: "Egypt", D: "Turkey" }, correct: "C" },
{ question: "Which actor in the 1999 film 'Notting Hill' plays a bookseller who charms Julia Roberts?", answers: { A: "Colin Firth", B: "Hugh Grant", C: "Jude Law", D: "Richard Gere" }, correct: "B" },
{ question: "Which metal creates a protective oxide layer in the air that preserves it from further decay (passivation)?", answers: { A: "Iron", B: "Copper", C: "Gold", D: "Aluminum" }, correct: "D" },
{ question: "What marks the boundary between prehistoric and historical eras?", answers: { A: "The appearance of writing", B: "The discovery of fire", C: "The melting of metal", D: "First cities" }, correct: "A" },
{ question: "Which airline (now defunct) was the Slovenian national carrier?", answers: { A: "Slovenia Airlines", B: "Adria Airways", C: "Jat Airways", D: "Air Love" }, correct: "B" },
{ question: "Which port on the coast of the Yellow Sea is China's largest industrial and commercial center?", answers: { A: "Hong Kong", B: "Beijing", C: "Shanghai", D: "Guangzhou" }, correct: "C" },
{ question: "In which Olympic team sport do players use glue for better ball control?", answers: { A: "Basketball", B: "Volleyball", C: "Water polo", D: "Handball" }, correct: "D" },
{ question: "In which city is the al-Haram mosque, the largest and holiest mosque in the world, located?", answers: { A: "Medina", B: "Mecca", C: "Jerusalem", D: "Istanbul" }, correct: "B" },
{ question: "From which planet did the aliens come in Wells' novel 'The War of the Worlds'?", answers: { A: "Venus", B: "Jupiter", C: "Mars", D: "Saturn" }, correct: "C" },
{ question: "Which unit of 1000 tons denotes the energy released during a nuclear bomb explosion?", answers: { A: "Megaton", B: "Gigaton", C: "Kiloton", D: "Teraton" }, correct: "C" },
{ question: "To which armored vehicle in World War I did officer Ernest Swinton give the name?", answers: { A: "Tank", B: "IFV", C: "Amphibian", D: "Jeep" }, correct: "A" },
{ question: "How many points in American football (NFL) does a touchdown bring?", answers: { A: "3", B: "7", C: "6", D: "5" }, correct: "C" },
{ question: "What is the name of the unit of measurement for the distance light travels in one year?", answers: { A: "Kilometer", B: "Nautical mile", C: "Light-year", D: "Parsec" }, correct: "C" },
{ question: "In which African country are the Yoruba, Hausa, and Igbo languages spoken?", answers: { A: "Nigeria", B: "Kenya", C: "Ethiopia", D: "Ghana" }, correct: "A" },
{ question: "Which Spanish football manager won both the World Cup (2010) and the European Championship (2012)?", answers: { A: "Luis Aragonés", B: "Vicente del Bosque", C: "Pep Guardiola", D: "Luis Enrique" }, correct: "B" },
{ question: "Who painted the famous 'The Scream'?", answers: { A: "Edvard Munch", B: "Pablo Picasso", C: "Vincent van Gogh", D: "Auguste Rodin" }, correct: "A" },
{ question: "What is additionally recorded alongside the name, species, and subspecies in Latin taxonomy?", answers: { A: "Family", B: "Genus", C: "Color of the organism", D: "Author and year of description" }, correct: "D" },
{ question: "Which snake has the Latin name 'Natrix natrix'?", answers: { A: "Viper", B: "Grass snake", C: "Cobra", D: "Anaconda" }, correct: "B" }


],
hardest: [
{ question: "Which philosopher is hidden in the anagram of the name 'Kratos', the personification of strength in Greek mythology?", answers: { A: "Socrates", B: "Plato", C: "Aristotle", D: "Diogenes" }, correct: "A" },
{ question: "Which chemical element in the human body is present in enough quantity to produce about 900 pencils?", answers: { A: "Hydrogen", B: "Calcium", C: "Carbon", D: "Oxygen" }, correct: "C" },
{ question: "The largest pyramid in Egypt is?", answers: { A: "Pyramid of Khafre", B: "Bent Pyramid", C: "Pyramid of Menkaure", D: "Pyramid of Cheops" }, correct: "D" },
{ question: "Which country has the most volcanoes?", answers: { A: "Philippines", B: "Indonesia", C: "Japan", D: "Italy" }, correct: "B" },
{ question: "Hamlet was the prince of which country?", answers: { A: "Denmark", B: "England", C: "Wales", D: "Scotland" }, correct: "A" },
{ question: "What is the name of the main prize at the Cannes Film Festival?", answers: { A: "Golden Wolf", B: "Golden Bear", C: "Golden Globe", D: "Palme d'Or" }, correct: "D" },
{ question: "Who held legislative power in Ancient Rome?", answers: { A: "The Church", B: "The Pope", C: "The Senate", D: "The President" }, correct: "C" },
{ question: "Who takes the Hippocratic Oath?", answers: { A: "Members of Parliament", B: "Doctors", C: "Lawyers", D: "The Prime Minister" }, correct: "B" },
{ question: "Which gas, when inhaled, makes the human voice squeaky and high-pitched?", answers: { A: "Oxygen", B: "Helium", C: "Argon", D: "Neon" }, correct: "B" },
{ question: "Brass is an alloy of which two metals?", answers: { A: "Copper and zinc", B: "Gold and copper", C: "Gold and tin", D: "Tin and copper" }, correct: "A" },
{ question: "When we say 'The Eternal City', we mean:", answers: { A: "Paris", B: "Rome", C: "London", D: "Athens" }, correct: "B" },
{ question: "Which country was the first to win Eurovision after the introduction of televoting (1997)?", answers: { A: "Croatia", B: "Ireland", C: "Germany", D: "United Kingdom" }, correct: "D" },
{ question: "Where is the Gobi Desert located?", answers: { A: "Africa", B: "North America", C: "Asia", D: "Australia" }, correct: "C" },
{ question: "To how many points is the FIFTH set played in volleyball?", answers: { A: "10", B: "15", C: "20", D: "25" }, correct: "B" },
{ question: "What is the name of the first book of the Old Testament?", answers: { A: "Exodus", B: "Leviticus", C: "Genesis", D: "Psalms" }, correct: "C" },
{ question: "A dynamometer is used to measure?", answers: { A: "Force", B: "Speed", C: "Voltage", D: "Density" }, correct: "A" },
{ question: "Which two countries share the record for the most Eurovision wins (7) as of 2025?", answers: { A: "Sweden and Ireland", B: "France and Germany", C: "Great Britain and Sweden", D: "Ireland and Italy" }, correct: "A" },
{ question: "All organic compounds contain?", answers: { A: "Nitrogen", B: "Oxygen", C: "Hydrogen", D: "Carbon" }, correct: "D" },
{ question: "How many hours does it take for light to reach the farthest planet, Neptune, from the Sun?", answers: { A: "About 1 hour", B: "About 4 hours", C: "About 10 hours", D: "About 24 hours" }, correct: "B" },
{ question: "Which player holds the record for the most goals in a single World Cup?", answers: { A: "Miroslav Klose", B: "Just Fontaine", C: "Ronaldo Nazário", D: "Gerd Müller" }, correct: "B" },
{ question: "Which English term is used for an abandoned building that people occupy illegally?", answers: { A: "Squat", B: "Loft", C: "Block", D: "Slum" }, correct: "A" },
{ question: "Which English navigator was knighted in 1581 after circumnavigating the world?", answers: { A: "James Cook", B: "Francis Drake", C: "Walter Raleigh", D: "Henry Hudson" }, correct: "B" },
{ question: "Topology is a branch of?", answers: { A: "Geography", B: "Mathematics", C: "Biology", D: "Linguistics" }, correct: "B" },
{ question: "Who is the only American president in history to resign from office?", answers: { A: "Andrew Johnson", B: "Richard Nixon", C: "Bill Clinton", D: "Gerald Ford" }, correct: "B" },
{ question: "Which river is considered the deepest in the world, with depths exceeding 220 meters in places?", answers: { A: "Amazon", B: "Nile", C: "Congo", D: "Yangtze" }, correct: "C" },
{ question: "What is the name of the theory in biology stating that organelles like mitochondria were once free-living organisms?", answers: { A: "Endosymbiosis", B: "Exogenesis", C: "Panspermia", D: "Phagocytosis" }, correct: "A" },
{ question: "What was the first artificial satellite launched into orbit by the USSR in 1957?", answers: { A: "Vostok 2", B: "Sputnik 2", C: "Sputnik 1", D: "Vostok 1" }, correct: "C" },
{ question: "Which strait is located between Tasmania and mainland Australia?", answers: { A: "Bass Strait", B: "Cook Strait", C: "Torres Strait", D: "Strait of Magellan" }, correct: "A" },
{ question: "What color is the instrument that records flight data in an airplane?", answers: { A: "Yellow", B: "Orange", C: "Red", D: "Black" }, correct: "B" },
{ question: "Four bytes consist of?", answers: { A: "4 bits", B: "12 bits", C: "32 bits", D: "128 bits" }, correct: "C" },
{ question: "What is the deepest point in the Mariana Trench called?", answers: { A: "Challenger Deep", B: "Abyss", C: "Horizon Deep", D: "Sirena Deep" }, correct: "A" },
{ question: "What is the name of the transition period between the Stone Age and the Bronze Age?", answers: { A: "Iron Age", B: "Mesolithic", C: "Eneolithic (Copper Age)", D: "Antiquity" }, correct: "C" },
{ question: "What is the oldest daily newspaper still in publication today (founded 1703)?", answers: { A: "The Times", B: "Die Welt", C: "Le Monde", D: "Wiener Zeitung" }, correct: "D" },
{ question: "Which city was the capital of Upper Egypt and is famous for the temples in Karnak and Luxor?", answers: { A: "Cairo", B: "Giza", C: "Alexandria", D: "Thebes" }, correct: "D" },
{ question: "What is the largest natural satellite in the Solar System (larger even than the planet Mercury)?", answers: { A: "Titan", B: "Moon", C: "Europa", D: "Ganymede" }, correct: "D" },
{ question: "What is the study of flags called?", answers: { A: "Heraldry", B: "Vexillology", C: "Numismatics", D: "Genealogy" }, correct: "B" },
{ question: "In the textile industry, what is the most expensive wool in the world, coming from a small wild llama of the Andes?", answers: { A: "Cashmere", B: "Angora", C: "Vicuña", D: "Merino" }, correct: "C" },
{ question: "What is the archaeological scientific method of determining the age of organic materials called?", answers: { A: "Radiocarbon dating", B: "Stratigraphy", C: "Thermoluminescence", D: "Dendrochronology" }, correct: "A" },
{ question: "What is the name of the instrument that measures wind speed?", answers: { A: "Barometer", B: "Hygrometer", C: "Seismometer", D: "Anemometer" }, correct: "D" },
{ question: "In cryptography, what is the encryption technique where each letter is shifted by a fixed number of places in the alphabet?", answers: { A: "Caesar cipher", B: "Enigma", C: "RSA cipher", D: "Hex algorithm" }, correct: "A" },
{ question: "What is the highest waterfall in Europe?", answers: { A: "Skogafoss", B: "Vinnufossen", C: "Rheinfall", D: "Kravice" }, correct: "B" },
{ question: "What is the study of earthquakes called?", answers: { A: "Volcanology", B: "Seismology", C: "Tectonics", D: "Speleology" }, correct: "B" },
{ question: "Which document from 1215 is considered the foundation of English and world democracy?", answers: { A: "UN Charter", B: "Constitution", C: "Magna Carta", D: "Declaration of Independence" }, correct: "C" },
{ question: "In which country is the highest waterfall in Europe located?", answers: { A: "Iceland", B: "Finland", C: "Sweden", D: "Norway" }, correct: "D" },
{ question: "What is the name of the Slavic goddess of spring?", answers: { A: "Lada", B: "Lela", C: "Zivna", D: "Vesna" }, correct: "D" },
{ question: "Which Italianism is used for correcting or canceling a wrongly booked entry in bookkeeping?", answers: { A: "Balance", B: "Storno", C: "Rebate", D: "Lombard" }, correct: "B" },
{ question: "In which city is Hajdučka Česma located, the venue of the concert from Bijelo Dugme's cult live album?", answers: { A: "Sarajevo", B: "Split", C: "Belgrade", D: "Zagreb" }, correct: "C" },
{ question: "Where were paper banknotes first used?", answers: { A: "China", B: "Egypt", C: "Greece", D: "England" }, correct: "A" },
{ question: "Which boxing punch is thrown with the hand closer to the opponent?", answers: { A: "Crossover", B: "Straight", C: "Jab", D: "Uppercut" }, correct: "C" },
{ question: "Which is the only capital city in the world that directly borders two countries?", answers: { A: "Bratislava", B: "Vienna", C: "Ljubljana", D: "Prague" }, correct: "A" }
]
},

geography: {
easy: [
{ question: "The deepest lake in the world is?", answers: { A: "Caspian", B: "Victoria", C: "Baikal", D: "Boračko" }, correct: "C" },
{ question: "What is the fastest traveling signal in the human body (nerve impulse speed)?", answers: { A: "Up to 120 m/s", B: "Up to 10 m/s", C: "Up to 500 m/s", D: "Up to 1000 m/s" }, correct: "A" },
{ question: "How many countries in Africa have no access to the sea (landlocked countries)?", answers: { A: "5", B: "16", C: "30", D: "45" }, correct: "B" },
{ question: "How many seconds does one full cardiac cycle (beat) last in an average resting adult?", answers: { A: "0.8 seconds", B: "1.5 seconds", C: "2.2 seconds", D: "3.0 seconds" }, correct: "A" },
{ question: "How many liters of blood on average flow through the body of an adult?", answers: { A: "3 liters", B: "5 liters", C: "7 liters", D: "1 liter" }, correct: "B" },
{ question: "What is the most common blood type in the world?", answers: { A: "A+", B: "B-", C: "0+", D: "AB+" }, correct: "C" },
{ question: "What is the name of the founder of the company Amazon?", answers: { A: "Bill Gates", B: "Jeff Bezos", C: "Steve Jobs", D: "Mark Zuckerberg" }, correct: "B" },
{ question: "How many countries in the world have more than 100 million inhabitants (approximately)?", answers: { A: "10", B: "12", C: "15", D: "18" }, correct: "C" },
{ question: "What is the name of the belt that signifies the highest level of mastery in karate?", answers: { A: "Blue", B: "White", C: "Red", D: "Black" }, correct: "D" },
{ question: "How many rounds does a professional boxing match for a world title last (men, modern rule)?", answers: { A: "5", B: "10", C: "11", D: "12" }, correct: "D" },
{ question: "What is the name of the referee's decision in boxing when the fight ends before the rounds expire due to a fighter's inability to continue?", answers: { A: "KO (knockout)", B: "TKO (technical knockout)", C: "DQ (disqualification)", D: "Draw" }, correct: "B" },
{ question: "Which national team has won the most trophies in the history of men's handball World Championships (up to 2025)?", answers: { A: "Croatia", B: "Sweden", C: "Germany", D: "France" }, correct: "D" },
{ question: "What is the term for the explosive death of a star?", answers: { A: "Nova", B: "Supernova", C: "Quasar", D: "Pulsar" }, correct: "B" },
{ question: "What is the capital of Norway?", answers: { A: "Stockholm", B: "Oslo", C: "Copenhagen", D: "Reykjavik" }, correct: "B" },
{ question: "Which city is known as the 'City of Canals'?", answers: { A: "Amsterdam", B: "Venice", C: "Bruges", D: "Copenhagen" }, correct: "B" },
{ question: "What is the term for 'false' memories that the brain can create?", answers: { A: "Amnesia", B: "Hallucination", C: "Confabulation", D: "Illusion" }, correct: "C" },
{ question: "Which is the largest city in the world in terms of population density?", answers: { A: "Beijing", B: "Manila", C: "Mumbai", D: "New York" }, correct: "B" },
{ question: "Which of these cities has the most inhabitants?", answers: { A: "New Delhi", B: "Tokyo", C: "Shanghai", D: "Sao Paulo" }, correct: "B" },
{ question: "From which port city in England did the Titanic depart in 1912?", answers: { A: "Dover", B: "Liverpool", C: "Southampton", D: "Grimsby" }, correct: "C" },
{ question: "Which of these famous composers was deaf?", answers: { A: "Beethoven", B: "Mozart", C: "Bach", D: "Handel" }, correct: "A" },
{ question: "Which two countries have the longest border?", answers: { A: "Russia and China", B: "USA and Mexico", C: "USA and Canada", D: "Russia and Ukraine" }, correct: "C" },
{ question: "How long does sunlight travel to reach Earth?", answers: { A: "8 seconds", B: "8 minutes", C: "8 hours", D: "8 days" }, correct: "B" },
{ question: "Which of these flags does NOT contain a crescent and a star?", answers: { A: "Pakistan", B: "Tunisia", C: "Morocco", D: "Turkey" }, correct: "C" },
{ question: "What is the fashion item 'espadrille'?", answers: { A: "Hat", B: "Dress", C: "Coat", D: "Shoes" }, correct: "D" },
{ question: "Which Tolstoy novel begins with 'All happy families are alike...'?", answers: { A: "War and Peace", B: "The Death of Ivan Ilyich", C: "Anna Karenina", D: "Resurrection" }, correct: "C" },
{ question: "In which country was the Caesar salad invented?", answers: { A: "Greece", B: "Mexico", C: "Italy", D: "France" }, correct: "B" },
{ question: "What nuts is marzipan made from?", answers: { A: "Almonds", B: "Walnuts", C: "Hazelnuts", D: "Peanuts" }, correct: "A" },
{ question: "Which part of the body is reshaped in rhinoplasty?", answers: { A: "Arms", B: "Knees", C: "Mouth", D: "Nose" }, correct: "D" },
{ question: "The beaver is the national emblem of which country?", answers: { A: "Canada", B: "Mexico", C: "Sweden", D: "Russia" }, correct: "A" },
{ question: "Who won the first FIFA World Cup in 1930?", answers: { A: "Brazil", B: "Argentina", C: "Italy", D: "Uruguay" }, correct: "D" },
{ question: "In which country did French fries originate?", answers: { A: "Belgium", B: "USA", C: "France", D: "England" }, correct: "A" },
{ question: "In which country did Halloween originate?", answers: { A: "America", B: "England", C: "Ireland", D: "Romania" }, correct: "C" },
{ question: "In what year was the first iPhone model released?", answers: { A: "2005", B: "2006", C: "2007", D: "2008" }, correct: "C" },
{ question: "The Roman numeral 50 is written as?", answers: { A: "X", B: "L", C: "C", D: "D" }, correct: "B" },
{ question: "How many eyes does a bee have?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "C" },
{ question: "What is the pH value of pure water?", answers: { A: "5", B: "6", C: "7", D: "8" }, correct: "C" },
{ question: "Which is the only planet in the Solar System not named after a Greek or Roman god or goddess?", answers: { A: "Mars", B: "Earth", C: "Venus", D: "Mercury" }, correct: "B" },
{ question: "In what year did World War I begin?", answers: { A: "1938", B: "1945", C: "1918", D: "1914" }, correct: "D" },
{ question: "How many circles of Hell are there in Dante's Divine Comedy?", answers: { A: "10", B: "8", C: "7", D: "9" }, correct: "D" },
{ question: "What is the most common letter in the English alphabet?", answers: { A: "A", B: "E", C: "I", D: "O" }, correct: "B" },
{ question: "How many players are in a water polo team on the field?", answers: { A: "5", B: "6", C: "7", D: "8" }, correct: "C" },
{ question: "How many ribs does a human have in total, including both left and right sides?", answers: { A: "12", B: "20", C: "22", D: "24" }, correct: "D" },
{ question: "How many hearts does an octopus have?", answers: { A: "1", B: "2", C: "3", D: "4" }, correct: "C" },
{ question: "Russia is the largest by area; which is the second largest country in the world by area?", answers: { A: "China", B: "Canada", C: "USA", D: "Brazil" }, correct: "B" },
{ question: "What is the average surface temperature on Venus?", answers: { A: "320°C", B: "4000°C", C: "100°C", D: "460°C" }, correct: "D" },
{ question: "In which city is Leonardo da Vinci's Mona Lisa exhibited?", answers: { A: "Rome", B: "Milan", C: "Paris", D: "Madrid" }, correct: "C" },
{ question: "In which country is the Taj Mahal located?", answers: { A: "Pakistan", B: "India", C: "Bangladesh", D: "Nepal" }, correct: "B" },
{ question: "William Shakespeare was born in which year?", answers: { A: "1464", B: "1564", C: "1664", D: "1764" }, correct: "B" },
{ question: "Approximately how many countries in the world have direct access to the sea or ocean?", answers: { A: "50", B: "90", C: "120", D: "150" }, correct: "D" },
{ question: "How many time zones does Russia officially use?", answers: { A: "7", B: "9", C: "11", D: "13" }, correct: "C" },
{ question: "Approximately how many seconds does a standard lap in Formula 1 take (average range)?", answers: { A: "60–80 seconds", B: "20–30 seconds", C: "90–120 seconds", D: "40–50 seconds" }, correct: "A" },
{ question: "What color is the planet Neptune?", answers: { A: "Red", B: "Green", C: "White", D: "Blue" }, correct: "D" },
{ question: "Which piece is the most powerful in chess?", answers: { A: "Rook", B: "King", C: "Queen", D: "Pawn" }, correct: "C" },
{ question: "Which continent is the largest by area?", answers: { A: "Africa", B: "Asia", C: "Europe", D: "South America" }, correct: "B" },
{ question: "In which city is the United Nations headquarters located?", answers: { A: "Geneva", B: "London", C: "New York", D: "Brussels" }, correct: "C" },
{ question: "What is the chemical symbol for Chlorine?", answers: { A: "Cl", B: "Hl", C: "Ch", D: "Cr" }, correct: "A" },
{ question: "The Roman numeral 100 is written as?", answers: { A: "L", B: "C", C: "D", D: "M" }, correct: "B" },
{ question: "What is the chemical symbol for silver?", answers: { A: "Au", B: "Si", C: "Sr", D: "Ag" }, correct: "D" },
{ question: "Which part of the atom has a negative electric charge?", answers: { A: "Proton", B: "Neutron", C: "Nucleus", D: "Electron" }, correct: "D" },
{ question: "If a doctor prescribes three tablets and says to take one every half hour, how long will it take until you take all three?", answers: { A: "Half an hour", B: "One hour", C: "Hour and a half", D: "Two hours" }, correct: "B" },
{ question: "What is the name of the main character in the game 'The Legend of Zelda'?", answers: { A: "Link", B: "Zelda", C: "Ganondorf", D: "Mario" }, correct: "A" },
{ question: "Which game consists of building and destroying blocks in a 3D world?", answers: { A: "Roblox", B: "Minecraft", C: "Fortnite", D: "Terraria" }, correct: "B" },
{ question: "What is the name of the fictional city where GTA San Andreas takes place?", answers: { A: "Liberty City", B: "Las Vegas", C: "Vice City", D: "Los Santos" }, correct: "D" },
{ question: "Approximately how many years does it take for a plastic bottle to decompose in nature?", answers: { A: "50 years", B: "250 years", C: "450 years", D: "1050 years" }, correct: "C" },
{ question: "Which country is considered the cleanest in the world according to the Environmental Performance Index?", answers: { A: "Italy", B: "Bosnia and Herzegovina", C: "Germany", D: "Denmark" }, correct: "D" },
{ question: "Which of the following pollutes the oceans most with microplastics?", answers: { A: "Synthetic clothing", B: "Straws", C: "Car tires", D: "Bags" }, correct: "C" },
{ question: "Who is the pseudonymous creator of Bitcoin?", answers: { A: "Vitalik Buterin", B: "Satoshi Nakamoto", C: "Elon Musk", D: "Charlie Lee" }, correct: "B" },
{ question: "What is the name of the technology that cryptocurrencies are based on (digital chain of blocks)?", answers: { A: "Mainframe", B: "Cloud", C: "Blockchain", D: "Data Lake" }, correct: "C" },
{ question: "What does the abbreviation NFT stand for in the world of digital art?", answers: { A: "New Form Token", B: "Non-Fungible Token", C: "Net Free Trade", D: "Node File Transfer" }, correct: "B" },
{ question: "Which is the second-largest cryptocurrency by market value (after Bitcoin)?", answers: { A: "Cardano", B: "Solana", C: "Ethereum", D: "Dogecoin" }, correct: "C" },
{ question: "In which city is the current tallest building in the world, the Burj Khalifa, located?", answers: { A: "Abu Dhabi", B: "Doha", C: "Dubai", D: "Riyadh" }, correct: "C" },
{ question: "What is the name of the famous opera building in Australia with sail-shaped roofs?", answers: { A: "Sydney Opera House", B: "Melbourne Arts Centre", C: "Perth Concert Hall", D: "Brisbane Stage" }, correct: "A" },
{ question: "Which city is famous for its modern Guggenheim Museum (designed by Frank Gehry)?", answers: { A: "Madrid", B: "Bilbao", C: "Barcelona", D: "Seville" }, correct: "B" },
{ question: "In which country was 'The Line', a futuristic city in the shape of a straight line, built?", answers: { A: "Qatar", B: "UAE", C: "Saudi Arabia", D: "Kuwait" }, correct: "C" },
{ question: "Which country has the oldest valid constitution in the world (from 1787)?", answers: { A: "United Kingdom", B: "France", C: "Switzerland", D: "USA" }, correct: "D" },
{ question: "Which woman was the first female Chancellor of Germany?", answers: { A: "Ursula von der Leyen", B: "Angela Merkel", C: "Annalena Baerbock", D: "Margaret Thatcher" }, correct: "B" },
{ question: "What is the name of the largest telescope ever launched into space (the successor to Hubble)?", answers: { A: "James Webb", B: "Galileo", C: "Kepler", D: "Voyager" }, correct: "A" },
{ question: "What is Earth's only natural satellite?", answers: { A: "Europa", B: "Moon", C: "Titan", D: "Io" }, correct: "B" },
{ question: "In which city does the Spanish series 'La Casa de Papel' (Money Heist) take place?", answers: { A: "Barcelona", B: "Madrid", C: "Valencia", D: "Seville" }, correct: "B" },
{ question: "What is the largest city in the world located north of the Arctic Circle?", answers: { A: "Reykjavik", B: "Murmansk", C: "Tromsø", D: "Anchorage" }, correct: "B" },
{ question: "What is the most expensive nut in the world?", answers: { A: "Cashew", B: "Macadamia", C: "Pistachio", D: "Pecan" }, correct: "B" },
{ question: "In Egyptian mythology, what is the name of the god of the underworld who weighs the hearts of the deceased?", answers: { A: "Ra", B: "Set", C: "Osiris", D: "Anubis" }, correct: "D" },
{ question: "Which Greek god was known as the protector of travelers and thieves, and the messenger of the gods?", answers: { A: "Apollo", B: "Hermes", C: "Dionysus", D: "Hephaestus" }, correct: "B" },
{ question: "What is a market called where stock prices are constantly rising?", answers: { A: "Bull Market", B: "Bear Market", C: "Flat Market", D: "Volatile Market" }, correct: "A" },
{ question: "What is the name of the psychological phenomenon where people overestimate their abilities in areas where they are unskilled?", answers: { A: "Barnum effect", B: "Dunning-Kruger effect", C: "Halo effect", D: "Placebo effect" }, correct: "B" },
{ question: "What does the Latin phrase represented by the sports brand ASICS mean?", answers: { A: "Speed is strength", B: "A healthy mind in a healthy body", C: "Just do it", D: "Defeat yourself" }, correct: "B" },
{ question: "What is the name of the fictitious force characteristic of circular motion?", answers: { A: "Gravitational force", B: "Elastic force", C: "Centripetal force", D: "Centrifugal force" }, correct: "D" },
{ question: "What is the capital of Portugal?", answers: { A: "Porto", B: "Benfica", C: "Sporting", D: "Lisbon" }, correct: "D" },
{ question: "How much is 100 to the third power?", answers: { A: "10,000", B: "100,000", C: "1,000,000", D: "10,000,000" }, correct: "C" },
{ question: "Which board game consists of 40 spaces including 28 properties, four railroads, two utilities, three Chance spaces, three Community Chest spaces, a Luxury Tax space, an Income Tax space, and four corner squares: GO, Jail, Free Parking, and Go to Jail?", answers: { A: "Risk", B: "Uno", C: "Jenga", D: "Monopoly" }, correct: "D" },
{ question: "Which letter in mathematics denotes the set of integers?", answers: { A: "N", B: "Q", C: "C", D: "Z" }, correct: "D" },
{ question: "What is the name of the longest mountain range in South America?", answers: { A: "Himalayas", B: "Andes", C: "Carpathians", D: "Dinarides" }, correct: "B" },
{ question: "Which city serves as the location for the fictional King's Landing in Game of Thrones?", answers: { A: "Split", B: "New York", C: "Zagreb", D: "Dubrovnik" }, correct: "D" },
{ question: "Which subject, according to the title track's lyrics, is studied on Bajaga's first solo album 'Pozitivna geografija'?", answers: { A: "Politics", B: "Chemistry", C: "Mathematics", D: "Physics" }, correct: "D" },
{ question: "Which chess piece is featured in the logo of the world chess organization FIDE?", answers: { A: "Rook", B: "King", C: "Knight", D: "Bishop" }, correct: "C" },
{ question: "According to a Bijelo Dugme song, what is a 'terrible, terrible hassle in life'?", answers: { A: "Love", B: "Life", C: "War", D: "Sorrow" }, correct: "A" },
{ question: "From which part of the sugarcane plant is sucrose obtained?", answers: { A: "Leaf", B: "Root", C: "Stem", D: "Flower" }, correct: "C" },
{ question: "Which Alpine country has the highest peak Dufour (4634 m) on Monte Rosa?", answers: { A: "Austria", B: "Germany", C: "Italy", D: "Switzerland" }, correct: "D" },
{ question: "To which piece of military equipment does the Spartan saying 'with it or on it' refer?", answers: { A: "Shield", B: "Sword", C: "Horse", D: "Armor" }, correct: "A" },
{ question: "After which freshwater fish did Schubert name his piano quintet?", answers: { A: "Trout", B: "Carp", C: "Perch", D: "Salmon" }, correct: "A" }

],
hard: [
{ question: "Who painted the artwork titled 'Guernica'?", answers: { A: "Salvador Dalí", B: "Claude Monet", C: "Vincent van Gogh", D: "Pablo Picasso" }, correct: "D" },
{ question: "Who said 'Veni, vidi, vici' (I came, I saw, I conquered)?", answers: { A: "Augustus", B: "Julius Caesar", C: "Nero", D: "Mark Antony" }, correct: "B" },
{ question: "Which gland secretes growth hormone?", answers: { A: "Pituitary gland", B: "Adrenal gland", C: "Thyroid gland", D: "Pancreas" }, correct: "A" },
{ question: "What is the chemical symbol for silver?", answers: { A: "Ag", B: "Au", C: "Si", D: "Sr" }, correct: "A" },
{ question: "How many red blood cells does a human have on average (per microliter)?", answers: { A: "4–5 million", B: "6–7 million", C: "10–15 million", D: "1–2 million" }, correct: "A" },
{ question: "How many white squares are on a chessboard?", answers: { A: "32", B: "64", C: "8", D: "16" }, correct: "A" },
{ question: "C++, Java, and Pascal are..?", answers: { A: "Operating systems", B: "Network protocols", C: "Databases", D: "Programming languages" }, correct: "D" },
{ question: "What is the formula for table salt?", answers: { A: "NaCl", B: "KCl", C: "CaCl2", D: "NaCO3" }, correct: "A" },
{ question: "What does the abbreviation HTTP stand for in web addresses?", answers: { A: "High Transfer Text Protocol", B: "Hyperlink Type Text Process", C: "HyperText Transfer Protocol", D: "Home Tool Transfer Process" }, correct: "C" },
{ question: "How many bits make up a standard byte?", answers: { A: "4", B: "8", C: "16", D: "32" }, correct: "B" },
{ question: "Which ancient Mycenaean city can be entered through the famous 'Lion Gate'?", answers: { A: "Troy", B: "Mycenae", C: "Knossos", D: "Sparta" }, correct: "B" },
{ question: "Lake Nyasa (Malawi) makes up more than a fifth of the surface area of which African country?", answers: { A: "Zambia", B: "Malawi", C: "Tanzania", D: "Mozambique" }, correct: "B" },
{ question: "What is the body temperature in the diagnosis 'status febrilis'?", answers: { A: "Lowered", B: "Normal", C: "Elevated", D: "Current" }, correct: "C" },
{ question: "What is the name of the shortest and most nervous Dalton brother in Lucky Luke?", answers: { A: "William", B: "Jack", C: "Averell", D: "Joe" }, correct: "D" },
{ question: "Which martial art originates from Japan and focuses on throwing and controlling the opponent?", answers: { A: "Kendo", B: "Judo", C: "Karate", D: "Aikido" }, correct: "B" },
{ question: "On the border of Hungary with which country are the crossings Horgoš 1 and Horgoš 2 located?", answers: { A: "Croatia", B: "Romania", C: "Serbia", D: "Slovakia" }, correct: "C" },
{ question: "Which German general was nicknamed 'Wüstenfuchs' (Desert Fox)?", answers: { A: "Rommel", B: "Guderian", C: "Keitel", D: "Manstein" }, correct: "A" },
{ question: "What is the fear of spiders called?", answers: { A: "Acrophobia", B: "Arachnophobia", C: "Claustrophobia", D: "Agoraphobia" }, correct: "B" },
{ question: "How many pairs of chromosomes does a human have in somatic cells?", answers: { A: "22", B: "23", C: "24", D: "44" }, correct: "B" },
{ question: "Which art movement was led by Salvador Dalí?", answers: { A: "Cubism", B: "Expressionism", C: "Fauvism", D: "Surrealism" }, correct: "D" },
{ question: "What percentage of DNA structure do humans share with each other (approximately)?", answers: { A: "50%", B: "75%", C: "99.9%", D: "10%" }, correct: "C" },
{ question: "Which acid is found in the stomach and helps break down food?", answers: { A: "Citric", B: "Hydrochloric", C: "Acetic", D: "Lactic" }, correct: "B" },
{ question: "How many seconds does the average human reflex response to a painful stimulus last?", answers: { A: "0.02–0.04", B: "0.2–0.3", C: "0.5–0.6", D: "1.0–1.2" }, correct: "B" },
{ question: "In which month and year did World War II end?", answers: { A: "August 1945", B: "September 1945", C: "October 1945", D: "July 1945" }, correct: "B" },
{ question: "At what speed does air leave us when we cough?", answers: { A: "80 km/h", B: "100 km/h", C: "140 km/h", D: "200 km/h" }, correct: "C" },
{ question: "What is the difference in days between the Julian and Gregorian calendars?", answers: { A: "10 days", B: "11 days", C: "12 days", D: "13 days" }, correct: "D" },
{ question: "What is the maximum number of liters our lungs can hold?", answers: { A: "4 liters", B: "5 liters", C: "6 liters", D: "7 liters" }, correct: "C" },
{ question: "What is the name of the painting depicting Jesus eating at a long table with all his disciples?", answers: { A: "The Last Judgment", B: "The Last Supper", C: "Jesus' Gathering", D: "Holy Feast" }, correct: "B" },
{ question: "In which galaxy do we live?", answers: { A: "The Milky Way", B: "Andromeda", C: "Sombrero", D: "Orion" }, correct: "A" },
{ question: "Which film was the first in history to win the Oscar for Best Picture in color (Technicolor era)?", answers: { A: "Gone with the Wind", B: "Ben-Hur", C: "Cleopatra", D: "Casablanca" }, correct: "A" },
{ question: "Which director directed the films 'Psycho', 'Vertigo', and 'Rear Window'?", answers: { A: "Stanley Kubrick", B: "Alfred Hitchcock", C: "Orson Welles", D: "David Lynch" }, correct: "B" },
{ question: "Which film is the first feature-length animated film in history?", answers: { A: "Pinocchio", B: "Snow White and the Seven Dwarfs", C: "Fantasia", D: "Dumbo" }, correct: "B" },
{ question: "What is the only fruit that has its seeds on the outside?", answers: { A: "Raspberry", B: "Blackberry", C: "Strawberry", D: "Blueberry" }, correct: "C" },
{ question: "Which country gave the Statue of Liberty to the USA?", answers: { A: "France", B: "Netherlands", C: "Spain", D: "Italy" }, correct: "A" },
{ question: "Which date is celebrated as Halloween?", answers: { A: "October 30th", B: "October 31st", C: "November 1st", D: "October 29th" }, correct: "B" },
{ question: "Which part of the atom has no electric charge?", answers: { A: "Proton", B: "Electron", C: "Neutron", D: "Positron" }, correct: "C" },
{ question: "Which blood vessels carry oxygen-rich blood from the heart to the rest of the body?", answers: { A: "Veins", B: "Capillaries", C: "Lymph vessels", D: "Arteries" }, correct: "D" },
{ question: "Which planet has the most gravity?", answers: { A: "Saturn", B: "Earth", C: "Jupiter", D: "Neptune" }, correct: "C" },
{ question: "Which element is said to keep bones strong?", answers: { A: "Calcium", B: "Sodium", C: "Iron", D: "Potassium" }, correct: "A" },
{ question: "Which is the largest island in the world?", answers: { A: "Greenland", B: "Madagascar", C: "Borneo", D: "New Guinea" }, correct: "A" },
{ question: "What eye color do most people have?", answers: { A: "Blue", B: "Green", C: "Brown", D: "Grey" }, correct: "C" },
{ question: "Which crunchy Spanish fritters are served as a dessert with chocolate sauce?", answers: { A: "Tapas", B: "Churros", C: "Tortilla", D: "Gazpacho" }, correct: "B" },
{ question: "What can be an entertainment magazine, a department store, and a firearm container?", answers: { A: "Gazin", B: "Magazine", C: "Arsenal", D: "Vault" }, correct: "B" },
{ question: "Which athlete holds the record for the most Grand Slam titles in men's tennis (singles)?", answers: { A: "Rafael Nadal", B: "Roger Federer", C: "Novak Djokovic", D: "Pete Sampras" }, correct: "C" },
{ question: "Which tool uses a magnetic needle that points north?", answers: { A: "Barometer", B: "Termometer", C: "Altimeter", D: "Compass" }, correct: "D" },
{ question: "What does HB stand for in a biological sense?", answers: { A: "Hormone base", B: "Hematological basin", C: "Hydro base", D: "Hemoglobin" }, correct: "D" },
{ question: "Which instrument has the most keys in standard orchestral use?", answers: { A: "Piano", B: "Accordion", C: "Harp", D: "Organ" }, correct: "D" },
{ question: "Which musical genre originated in the Bronx in the 1970s and includes DJing, MCing, and breakdancing?", answers: { A: "Jazz", B: "Rock", C: "Hip-hop", D: "Techno" }, correct: "C" },
{ question: "Which event is considered the beginning of World War I?", answers: { A: "Invasion of Poland", B: "The Sarajevo Assassination", C: "Battle of the Thames", D: "Pearl Harbor" }, correct: "B" },
{ question: "Which country was the first to introduce universal suffrage for women?", answers: { A: "USA", B: "France", C: "New Zealand", D: "Switzerland" }, correct: "C" }



], 
hardest: [ 
{ question: "How many degrees are in a half circle?", answers: { A: "90°", B: "270°", C: "180°", D: "360°" }, correct: "C" },
{ question: "How many times a day does the average American open the refrigerator?", answers: { A: "67", B: "11", C: "22", D: "33" }, correct: "C" },
{ question: "What does the white dove symbolize?", answers: { A: "Peace", B: "European Union", C: "War", D: "Happiness" }, correct: "A" },
{ question: "For which vegetable and herb is the other name 'selen' used?", answers: { A: "Celery", B: "Parsley", C: "Violet", D: "Lovage" }, correct: "D" },
{ question: "Earthquakes are measured by which scale?", answers: { A: "Kelvin", B: "Richter", C: "Newton", D: "Pascal" }, correct: "B" },
{ question: "Who was the first woman to receive a Nobel Prize in 1903?", answers: { A: "Marie Curie", B: "Rosalind Franklin", C: "Ada Lovelace", D: "Dorothy Hodgkin" }, correct: "A" },
{ question: "From which language did the word 'ketchup' originate?", answers: { A: "Japanese", B: "Chinese", C: "Korean", D: "Vietnamese" }, correct: "B" },
{ question: "What is the capital of America?", answers: { A: "New York", B: "Los Angeles", C: "Washington D.C.", D: "Chicago" }, correct: "C" },
{ question: "Which national team won the 2022 World Cup?", answers: { A: "France", B: "Brazil", C: "Argentina", D: "Croatia" }, correct: "C" },
{ question: "Which singer is known for the 'Moonwalk' dance performed in 1983?", answers: { A: "Prince", B: "Elvis Presley", C: "Michael Jackson", D: "Stevie Wonder" }, correct: "C" },
{ question: "Harry, Niall, Louis, Liam, and Zayn were in a band. What was the name of the band?", answers: { A: "5 Seconds of Summer", B: "One Direction", C: "Westlife", D: "The Wanted" }, correct: "B" },
{ question: "What is the name of the actor who played Jack in Titanic?", answers: { A: "Brad Pitt", B: "Johnny Depp", C: "Leonardo DiCaprio", D: "Tom Cruise" }, correct: "C" },
{ question: "What percentage of people in the world are left-handed?", answers: { A: "5%", B: "8%", C: "10%", D: "15%" }, correct: "C" },
{ question: "Which Dutch painter cut off his own ear?", answers: { A: "Johannes Vermeer", B: "Rembrandt", C: "Vincent van Gogh", D: "Piet Mondrian" }, correct: "C" },
{ question: "Which country in Asia (and the world) has the longest coastline thanks to its islands?", answers: { A: "China", B: "Indonesia", C: "India", D: "Japan" }, correct: "B" },
{ question: "Which film has won the most Oscars in history (tied with other films at the top of the list)?", answers: { A: "Titanic", B: "The Lord of the Rings: The Return of the King", C: "Ben-Hur", D: "All of the above share the same record" }, correct: "D" },
{ question: "From which Čolić song is the lyric 'Izgledaš mi kao lutkica iz Trsta'?", answers: { A: "Pusti, pusti modu", B: "Ti si mi u krvi", C: "Produži dalje", D: "Jedina" }, correct: "A" },
{ question: "What do we call a car that has both a gasoline and an electric motor?", answers: { A: "Electric", B: "Hybrid", C: "Gasoline", D: "Diesel" }, correct: "B" },
{ question: "In snooker, which color ball is worth the most points after the black ball?", answers: { A: "Pink", B: "Blue", C: "Red", D: "Yellow" }, correct: "A" },
{ question: "Which element has the highest boiling point of all elements in the periodic table?", answers: { A: "Carbon", B: "Tungsten", C: "Rhenium", D: "Osmium" }, correct: "B" },
{ question: "What is the name of the theoretical boundary beyond which not even light can escape a black hole's gravity?", answers: { A: "Singularity", B: "Event horizon", C: "Accretion disk", D: "Schwarzschild zone" }, correct: "B" },
{ question: "Which constant in physics has an approximate value of 9.81 m/s²?", answers: { A: "Newton's constant", B: "Acceleration due to gravity on Earth", C: "Planck's constant", D: "Coulomb's constant" }, correct: "B" },
{ question: "Which type of star has the highest density known in the universe (excluding black holes)?", answers: { A: "Red giant", B: "White dwarf", C: "Neutron star", D: "Supernova" }, correct: "C" },
{ question: "Which algorithm is used to find the shortest paths in graphs with negative weights?", answers: { A: "Bellman-Ford", B: "Dijkstra", C: "Prim", D: "Kruskal" }, correct: "A" },
{ question: "What is the oldest known written language in human history?", answers: { A: "Sanskrit", B: "Egyptian hieroglyphs", C: "Sumerian cuneiform", D: "Greek Linear B" }, correct: "C" },
{ question: "Which element has the highest electronegativity in the periodic table?", answers: { A: "Chlorine", B: "Oxygen", C: "Nitrogen", D: "Fluorine" }, correct: "D" },
{ question: "Which mathematician proved Fermat's Last Theorem in 1994?", answers: { A: "Andrew Wiles", B: "Pierre de Fermat", C: "Leonhard Euler", D: "David Hilbert" }, correct: "A" },
{ question: "What is the correct order of the main phases of the Moon in a synodic revolution (starting from the New Moon)?", answers: { A: "New Moon → First Quarter → Full Moon → Last Quarter", B: "New Moon → Full Moon → First Quarter → Last Quarter", C: "New Moon → Last Quarter → First Quarter → Full Moon", D: "Full Moon → New Moon → First Quarter → Last Quarter" }, correct: "A" },
{ question: "Which version of the Schrödinger equation describes the time evolution of a quantum system?", answers: { A: "Stationary form", B: "Relativistic form", C: "Time-dependent form", D: "Operator form" }, correct: "C" },
{ question: "Which layer of the Earth's atmosphere contains the maximum concentration of ozone?", answers: { A: "Troposphere", B: "Stratosphere", C: "Mesosphere", D: "Thermosphere" }, correct: "B" },
{ question: "Which value of the fine-structure constant α is approximately correct?", answers: { A: "1/137", B: "1/10", C: "1/1000", D: "1/27" }, correct: "A" },
{ question: "Which of the following numbers is NOT prime, but has exactly two distinct prime divisors?", answers: { A: "4", B: "6", C: "9", D: "12" }, correct: "B" },
{ question: "In linguistics, which word denotes a word that is spelled the same but has a different pronunciation and meaning?", answers: { A: "Homograph", B: "Homonym", C: "Antonym", D: "Synonym" }, correct: "A" },
{ question: "In what year was the first official season of the Formula 1 World Championship held?", answers: { A: "1920", B: "1950", C: "1975", D: "1990" }, correct: "B" },
{ question: "How many three-digit numbers in the set of natural numbers can be formed using only the digits 0 and 1?", answers: { A: "1", B: "2", C: "3", D: "4" }, correct: "D" },
{ question: "What is the term for puppets with movable limbs that a puppeteer moves by pulling strings?", answers: { A: "Marionettes", B: "Mimes", C: "Pantomimes", D: "Figurines" }, correct: "A" },
{ question: "After which Beatles song are Villarreal players nicknamed because of their distinctive jersey color?", answers: { A: "Hey Jude", B: "Yellow Submarine", C: "Let It Be", D: "Help!" }, correct: "B" },
{ question: "According to Norman Bates, 'a boy's best friend is his'-who?", answers: { A: "Sister", B: "Wife", C: "Brother", D: "Mother" }, correct: "D" },
{ question: "Approximately how many nerve cells (neurons) does the human brain have?", answers: { A: "1 million", B: "86 billion", C: "500 billion", D: "1 trillion" }, correct: "B" },
{ question: "In which city in June 2011 did Amy Winehouse start her never-completed tour?", answers: { A: "London", B: "Zagreb", C: "Dubrovnik", D: "Belgrade" }, correct: "D" },
{ question: "Which is the only chemical element that has a lower density in its solid state than in its liquid state, similar to water?", answers: { A: "Bismuth", B: "Antimony", C: "Silicon", D: "Iron" }, correct: "A" },
{ question: "What is the physical phenomenon called where a liquid defies gravity and rises up the walls of narrow tubes?", answers: { A: "Viscosity", B: "Bernoulli effect", C: "Capillarity", D: "Magnus effect" }, correct: "C" },
{ question: "Which mathematician received the Nobel Prize in Economics despite struggling with schizophrenia?", answers: { A: "John Nash", B: "Alan Turing", C: "Kurt Gödel", D: "John von Neumann" }, correct: "A" },
{ question: "Which is the only country in Africa that was never formally colonized?", answers: { A: "Liberia", B: "Ghana", C: "Ethiopia", D: "Botswana" }, correct: "C" },
{ question: "Which is the first country in history to adopt Christianity as its state religion (around 301 AD)?", answers: { A: "Ethiopia", B: "Armenia", C: "Georgia", D: "Roman Empire" }, correct: "B" },
{ question: "Which Latinism is used for the set of procedures or means for preventing conception?", answers: { A: "Antisepsis", B: "Sterilization", C: "Contraception", D: "Prevention" }, correct: "C" },
{ question: "Which controversial artist wrote the autobiography 'Diary of a Genius'?", answers: { A: "Pablo Picasso", B: "Salvador Dalí", C: "Frida Kahlo", D: "Andy Warhol" }, correct: "B" },
{ question: "To which country does the McCallister family travel for the Christmas holidays in the first 'Home Alone' movie?", answers: { A: "Italy", B: "France", C: "England", D: "Germany" }, correct: "B" },
{ question: "What is the common term for peoples without a permanent home who move constantly?", answers: { A: "Migrants", B: "Musafirs", C: "Colonists", D: "Nomads" }, correct: "D" },
{ question: "What is the Latin name for the Christian prayer 'Hail Mary'?", answers: { A: "Ave Maria", B: "Ave Caesar", C: "Servus Maria", D: "Santa Maria" }, correct: "A" }

]
},

funFacts: {
easy: [
{ question: "What anglicism do we use for a rifle with an optical sight for precision shooting?", answers: { A: "Shotgun", B: "Rifle", C: "Sniper", D: "AK 47" }, correct: "C" },
{ question: "Which right tributary of the Una is named after the Latin word for health?", answers: { A: "Sana", B: "Sava", C: "Vrbas", D: "Unac" }, correct: "A" },
{ question: "How many sovereign states in the world use the US Dollar (USD) as their official currency?", answers: { A: "5", B: "11", C: "25", D: "40" }, correct: "B" },
{ question: "How many seconds does an average eye blink last?", answers: { A: "0.1–0.2", B: "0.3–0.4", C: "0.5–0.6", D: "0.8–1.0" }, correct: "B" },
{ question: "19 and 21 are the titles of Adele's first two albums; what is the third one called?", answers: { A: "20", B: "22", C: "24", D: "25" }, correct: "D" },
{ question: "Odontology is the term for total knowledge regarding which organs?", answers: { A: "Bones", B: "Gums", C: "Mouth", D: "Teeth" }, correct: "D" },
{ question: "Which computer scientist was played by Ashton Kutcher in 2013 and Michael Fassbender in 2015?", answers: { A: "Steve Jobs", B: "Bill Gates", C: "Elon Musk", D: "Mark Zuckerberg" }, correct: "A" },
{ question: "Which animal can sleep for up to 22 hours a day?", answers: { A: "Cat", B: "Koala", C: "Sloth", D: "Panda" }, correct: "B" },
{ question: "Which was the first film to win the Academy Award for Best Picture?", answers: { A: "Casablanca", B: "Gone with the Wind", C: "Wings", D: "Citizen Kane" }, correct: "C" },
{ question: "What is the main ingredient in the Japanese dish miso soup?", answers: { A: "Soybean paste", B: "Rice", C: "Seaweed", D: "Fish" }, correct: "A" },
{ question: "What does the abbreviation GDP stand for in economics?", answers: { A: "Gross state income", B: "Balance of social consumption", C: "Banking foreign exchange", D: "Gross domestic product" }, correct: "D" },
{ question: "Which currency was the official legal tender in Germany before the introduction of the Euro?", answers: { A: "Franc", B: "Lira", C: "Mark", D: "Schilling" }, correct: "C" },
{ question: "Who is the founder of psychoanalysis?", answers: { A: "Sigmund Freud", B: "Carl Jung", C: "B.F. Skinner", D: "Abraham Maslow" }, correct: "A" },
{ question: "Which company was the first to introduce the seat belt as a standard feature?", answers: { A: "Mercedes-Benz", B: "Volvo", C: "Toyota", D: "Ford" }, correct: "B" },
{ question: "In which style were most medieval castles with thick walls and small windows built before the Gothic period?", answers: { A: "Baroque", B: "Renaissance", C: "Romanesque", D: "Classicism" }, correct: "C" },
{ question: "What is the phenomenon called when a person changes their opinion or behavior due to group pressure?", answers: { A: "Conformity", B: "Introversion", C: "Empathy", D: "Cognitive dissonance" }, correct: "A" },
{ question: "What is the fear of enclosed spaces called?", answers: { A: "Agoraphobia", B: "Claustrophobia", C: "Acrophobia", D: "Hydrophobia" }, correct: "B" },
{ question: "Which fashion brand has a logo with two interlocking 'C' letters?", answers: { A: "Gucci", B: "Chanel", C: "Cartier", D: "Coach" }, correct: "B" },
{ question: "Which country is the home of the luxury watch brand 'Rolex'?", answers: { A: "France", B: "Italy", C: "Switzerland", D: "Germany" }, correct: "C" },
{ question: "Which country is the home of the car manufacturer 'Volvo'?", answers: { A: "Germany", B: "Sweden", C: "Norway", D: "Japan" }, correct: "B" },
{ question: "What is the best-selling car model in history (globally)?", answers: { A: "Volkswagen Golf", B: "Ford F-Series", C: "Honda Civic", D: "Toyota Corolla" }, correct: "D" },
{ question: "In which city is the headquarters of the company 'BMW' located?", answers: { A: "Berlin", B: "Stuttgart", C: "Frankfurt", D: "Munich" }, correct: "D" },
{ question: "Which Italian brand is known for the 'Aventador' and 'Huracán' models?", answers: { A: "Ferrari", B: "Lamborghini", C: "Alfa Romeo", D: "Fiat" }, correct: "B" },
{ question: "Which gas is the primary cause of the greenhouse effect on Earth?", answers: { A: "Nitrogen", B: "Oxygen", C: "Argon", D: "Carbon dioxide" }, correct: "D" },
{ question: "What is the building style characterized by pointed arches and stained glass (e.g., Notre Dame Cathedral)?", answers: { A: "Romanesque", B: "Baroque", C: "Gothic", D: "Renaissance" }, correct: "C" },
{ question: "Which architect designed the famous Sagrada Familia church in Barcelona?", answers: { A: "Antoni Gaudi", B: "Le Corbusier", C: "Frank Lloyd Wright", D: "Oscar Niemeyer" }, correct: "A" },
{ question: "What is the name of the largest amphitheater ever built, located in the center of Rome?", answers: { A: "Pantheon", B: "Forum", C: "Colosseum", D: "Acropolis" }, correct: "C" },
{ question: "Which type of coffee has the most milk?", answers: { A: "Espresso", B: "Macchiato", C: "Latte", D: "Americano" }, correct: "C" },
{ question: "Which planet is known as the 'Red Planet'?", answers: { A: "Mars", B: "Jupiter", C: "Venus", D: "Saturn" }, correct: "A" },
{ question: "Which is the closest star to Earth?", answers: { A: "The Sun", B: "Alpha Centauri", C: "Sirius", D: "Polaris" }, correct: "A" },
{ question: "Which country is the home of Anime cartoons?", answers: { A: "China", B: "South Korea", C: "Thailand", D: "Japan" }, correct: "D" },
{ question: "In which fictional city does Spider-Man live?", answers: { A: "Gotham", B: "Metropolis", C: "New York", D: "Central City" }, correct: "C" },
{ question: "Which dog is Mickey Mouse's best friend?", answers: { A: "Pluto", B: "Goofy", C: "Snoopy", D: "Scooby-Doo" }, correct: "A" },
{ question: "What does the Latin phrase 'Carpe Diem' mean?", answers: { A: "I think, therefore I am", B: "Seize the day", C: "I came, I saw, I conquered", D: "Knowledge is power" }, correct: "B" },
{ question: "From which language does the word 'robot' originate?", answers: { A: "Czech", B: "German", C: "Russian", D: "English" }, correct: "A" },
{ question: "What is the name of the highest peak in Bosnia and Herzegovina?", answers: { A: "Vlašić", B: "Maglić", C: "Prenj", D: "Bjelašnica" }, correct: "B" },
{ question: "In what year did the South African leader Nelson Mandela pass away?", answers: { A: "2010", B: "2013", C: "2015", D: "2018" }, correct: "B" },
{ question: "Which famous boxer was born with the name Cassius Clay?", answers: { A: "Mike Tyson", B: "Joe Frazier", C: "Muhammad Ali", D: "George Foreman" }, correct: "C" },
{ question: "Which was the first social network to introduce the concept of 'Stories'?", answers: { A: "Facebook", B: "Instagram", C: "Snapchat", D: "WhatsApp" }, correct: "C" },
{ question: "Which scientist established the three laws of motion?", answers: { A: "Albert Einstein", B: "Stephen Hawking", C: "Nikola Tesla", D: "Isaac Newton" }, correct: "D" },
{ question: "In which family of insects do we include the European hornet, Latin name 'Vespa crabro'?", answers: { A: "Bees", B: "Flies", C: "Wasps", D: "Ants" }, correct: "C" },
{ question: "What is the official color combination on the jerseys of Newcastle, Udinese, and PAOK?", answers: { A: "Red-blue", B: "Black-red", C: "Black-white", D: "Blue-yellow" }, correct: "C" },
{ question: "Who wrote and first performed the hit 'I Shot the Sheriff', later covered by Clapton?", answers: { A: "Bob Dylan", B: "Bob Marley", C: "Elvis Presley", D: "Eric Clapton" }, correct: "B" },
{ question: "Which physical quantity is also called acceleration?", answers: { A: "Velocity", B: "Force", C: "Acceleration", D: "Free fall" }, correct: "C" },
{ question: "What is the name of Pushkin's 1833 novel in verse?", answers: { A: "Ruslan and Ludmila", B: "The Captain's Daughter", C: "Eugene Onegin", D: "Boris Godunov" }, correct: "C" },
{ question: "In which city did the Prophet Muhammad (PBUH) die in 632?", answers: { A: "Medina", B: "Mecca", C: "Jerusalem", D: "Damascus" }, correct: "A" },
{ question: "What do we call the upper road layer made of regularly arranged stone cubes, brought to our regions by the Turks?", answers: { A: "Asphalt", B: "Kaldrma (Cobblestone)", C: "Gravel", D: "Concrete" }, correct: "B" },
{ question: "Who introduced himself to Polyphemus with the words 'My name is Nobody...'?", answers: { A: "Achilles", B: "Odysseus", C: "Hector", D: "Perseus" }, correct: "B" },
{ question: "Which part of the eye is responsible for regulating the amount of light?", answers: { A: "Cornea", B: "Retina", C: "Pupil", D: "Lens" }, correct: "C" },
{ question: "What is the name of the black hole at the center of our galaxy?", answers: { A: "Andromeda X", B: "Sagittarius A*", C: "Cygnus X-1", D: "Orion Core" }, correct: "B" },
{ question: "Which hormone is known as the 'stress hormone'?", answers: { A: "Adrenaline", B: "Serotonin", C: "Melatonin", D: "Insulin" }, correct: "A" },
{ question: "Which planet has the shortest day (fastest rotation)?", answers: { A: "Mars", B: "Jupiter", C: "Mercury", D: "Saturn" }, correct: "B" },
{ question: "Which part of the human body has no direct blood supply?", answers: { A: "Cornea of the eye", B: "Tongue", C: "Ear", D: "Brain" }, correct: "A" },
{ question: "Which star is the closest to Earth after the Sun?", answers: { A: "Proxima Centauri", B: "Sirius", C: "Betelgeuse", D: "Vega" }, correct: "A" },
{ question: "How many bones are in an adult human arm (including the hand)?", answers: { A: "27", B: "33", C: "37", D: "41" }, correct: "A" },
{ question: "What is the name of the only internal organ in the human body that can fully regenerate?", answers: { A: "Heart", B: "Brain", C: "Liver", D: "Lungs" }, correct: "C" },
{ question: "What is the name of the volleyball player specialized in defense and service reception?", answers: { A: "Libero", B: "Opposite hitter", C: "Middle blocker", D: "Outside hitter" }, correct: "A" },
{ question: "What is the name of the giant rat who is the teacher of the Ninja Turtles?", answers: { A: "Splinter", B: "Shredder", C: "Master Rat", D: "Karai" }, correct: "A" },
{ question: "Slovenian Peter Prevc was the first ski jumper to fly how many meters?", answers: { A: "230 m", B: "240 m", C: "250 m", D: "260 m" }, correct: "C" },
{ question: "Which alphabet consists of 6 raised dots that can be combined in different patterns?", answers: { A: "Morse", B: "Braille", C: "Latin", D: "Greek" }, correct: "B" },
{ question: "Which surname connects the British economist Friedrich and the Mexican actress Salma?", answers: { A: "Smith", B: "Hayek", C: "Gomez", D: "Lopez" }, correct: "B" },
{ question: "With which country does Ecuador border to the south and east?", answers: { A: "Peru", B: "Chile", C: "Bolivia", D: "Colombia" }, correct: "A" },
{ question: "How many Quidditch teams play the annual tournament in the Harry Potter novels?", answers: { A: "2", B: "3", C: "4", D: "5" }, correct: "C" },
{ question: "Which is the most populous city in India?", answers: { A: "New Delhi", B: "Mumbai", C: "Kolkata", D: "Bangalore" }, correct: "B" },
{ question: "Which country hosted the 2014 World Cup?", answers: { A: "Russia", B: "Brazil", C: "South Africa", D: "Qatar" }, correct: "B" },
{ question: "What does a boxing coach throw into the ring when they want to stop a fight?", answers: { A: "Glove", B: "White towel", C: "Rope", D: "Stick" }, correct: "B" },
{ question: "To which tribe of warrior women does the superhero Wonder Woman belong?", answers: { A: "Spartans", B: "Vikings", C: "Amazons", D: "Mayans" }, correct: "C" },
{ question: "In which European country is Catalan the only official language?", answers: { A: "Andorra", B: "Spain", C: "France", D: "Italy" }, correct: "A" },
{ question: "In a triangle, what is the name of the segment connecting a vertex to the midpoint of the opposite side?", answers: { A: "Angle bisector", B: "Median", C: "Altitude", D: "Orthocenter" }, correct: "B" },
{ question: "Which internet encyclopedia's logo features an unfinished sphere made of puzzle pieces?", answers: { A: "Britannica", B: "WikiLeaks", C: "ChatGPT", D: "Wikipedia" }, correct: "D" },
{ question: "What is the name of the capital of Pakistan, from which we can infer the majority religion of its inhabitants?", answers: { A: "Karachi", B: "Lahore", C: "Islamabad", D: "Peshawar" }, correct: "C" },
{ question: "Which city hosts the Australian Grand Prix and the Australian Open tennis tournament?", answers: { A: "Sydney", B: "Brisbane", C: "Melbourne", D: "Perth" }, correct: "C" },
{ question: "By what single word do we refer to the northwest African countries of Algeria, Morocco, Libya, and Tunisia?", answers: { A: "Levant", B: "Maghreb", C: "Sahel", D: "Sahara" }, correct: "B" },
{ question: "In which city are the headquarters of the European Space Agency, OECD, and UNESCO located?", answers: { A: "Geneva", B: "Brussels", C: "Paris", D: "Berlin" }, correct: "C" },
{ question: "Which rapper founded the record label Shady Records in 1999?", answers: { A: "Dr. Dre", B: "Eminem", C: "50 Cent", D: "Snoop Dogg" }, correct: "B" },
{ question: "What is the move called when a volleyball player hits the ball powerfully toward the opponent's court?", answers: { A: "Block", B: "Serve", C: "Spike (Smash)", D: "Dig" }, correct: "C" },
{ question: "In anatomy, what are the small sacs in the ovary, thyroid gland, or at the root of a hair called?", answers: { A: "Vesicles", B: "Alveoli", C: "Follicles", D: "Tubules" }, correct: "C" },
{ question: "What else do we call crawling animals, based on their Latin name?", answers: { A: "Amphibians", B: "Reptiles", C: "Mammalia", D: "Aves" }, correct: "B" },
{ question: "Which European capital is divided into 23 districts?", answers: { A: "Berlin", B: "Prague", C: "Vienna", D: "Budapest" }, correct: "C" },
{ question: "Which city in Bosnia and Herzegovina was called Pucarevo during the Yugoslav era?", answers: { A: "Zenica", B: "Travnik", C: "Novi Travnik", D: "Bugojno" }, correct: "C" },
{ question: "What color are the 5 five-pointed stars on the Chinese flag?", answers: { A: "Red", B: "Blue", C: "Yellow", D: "White" }, correct: "C" },
{ question: "The novel 'Mrs. Dalloway' depicts how many days in the life of the title character?", answers: { A: "One", B: "Two", C: "Seven", D: "Thirty" }, correct: "A" },
{ question: "According to legend, which fabulist was thrown from a cliff after being falsely accused of theft at the temple of Delphi?", answers: { A: "Aesop", B: "Homer", C: "Sophocles", D: "Herodotus" }, correct: "A" },
{ question: "How many centimeters are in a foot?", answers: { A: "25.48 cm", B: "28.50 cm", C: "30.48 cm", D: "33.48 cm" }, correct: "C" },
{ question: "What is the maximum number of seconds a player can hold the ball in handball without passing or shooting?", answers: { A: "11", B: "3", C: "24", D: "8" }, correct: "B" },
{ question: "How many bones does the adult human body have?", answers: { A: "206", B: "201", C: "216", D: "198" }, correct: "A" },
{ question: "How many substitutions does FIFA allow in a regular football match (according to 2020s rules)?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "C" },
{ question: "What is the maximum number of sets a men's Grand Slam tennis match can last?", answers: { A: "3", B: "5", C: "7", D: "6" }, correct: "B" },
{ question: "With which letter do the names of the largest number of European capitals begin?", answers: { A: "A", B: "B", C: "C", D: "D" }, correct: "B" },
{ question: "What did Peter Pan lose in Wendy Darling's room, which she later sewed back on for him?", answers: { A: "Shoe", B: "Cap", C: "Glove", D: "Shadow" }, correct: "D" },
{ question: "Cynology is the science that deals with the study and breeding of which animals?", answers: { A: "Cats", B: "Horses", C: "Birds", D: "Dogs" }, correct: "D" },
{ question: "The hair of which animal is used to produce the expensive wool known as mohair?", answers: { A: "Sheep", B: "Tiger", C: "Llama", D: "Goat" }, correct: "D" },
{ question: "Which substances in the human organism cause rapid physical growth during puberty?", answers: { A: "Enzymes", B: "Vitamins", C: "Hormones", D: "Minerals" }, correct: "C" },
{ question: "To which country does Komodo Island, famous for the world's largest lizards, belong?", answers: { A: "Malaysia", B: "Indonesia", C: "Philippines", D: "Papua New Guinea" }, correct: "B" },
{ question: "What is the largest digit that can be entered into a single cell of a Sudoku puzzle?", answers: { A: "6", B: "7", C: "8", D: "9" }, correct: "D" },
{ question: "Which Facebook founder was played by Jesse Eisenberg in the film 'The Social Network'?", answers: { A: "Elon Musk", B: "Bill Gates", C: "Mark Zuckerberg", D: "Steve Jobs" }, correct: "C" },
{ question: "Whose 41st Symphony in C major remains known by the nickname 'Jupiter Symphony'?", answers: { A: "Beethoven", B: "Mozart", C: "Haydn", D: "Bach" }, correct: "B" },
{ question: "Which gymnastics discipline involving jumps became an official Olympic sport in 2000?", answers: { A: "Trampoline", B: "Vault", C: "Tumbling", D: "Acrobatics" }, correct: "A" },
{ question: "Into which sea do the major European rivers Vistula, Odra, and Neva flow?", answers: { A: "Black Sea", B: "Baikal Sea", C: "North Sea", D: "Baltic Sea" }, correct: "D" },
{ question: "What is the standard net height in women's volleyball?", answers: { A: "2.20 m", B: "2.24 m", C: "2.30 m", D: "2.43 m" }, correct: "B" }


],
hard: [
{ question: "What is the name of the highest mountain in Kenya?", answers: { A: "Kilimanjaro", B: "Elgon", C: "Ruwenzori", D: "Mount Kenya" }, correct: "D" },
{ question: "How old is Harry Potter in the first novel in which he appears?", answers: { A: "15", B: "13", C: "9", D: "11" }, correct: "D" },
{ question: "Which large island group in Oceania is named after a large number of islands, over 1,000 of them?", answers: { A: "Melanesia", B: "Micronesia", C: "Polynesia", D: "Indonesia" }, correct: "C" },
{ question: "How many lines does the basic form of an Italian sonnet have?", answers: { A: "12", B: "13", C: "14", D: "15" }, correct: "C" },
{ question: "Approximately how many countries in the world have a name starting with the letter 'A'?", answers: { A: "6-7", B: "8-9", C: "11-12", D: "15-16" }, correct: "C" },
{ question: "How many players from one team are on the court at the same time in volleyball?", answers: { A: "5", B: "6", C: "7", D: "8" }, correct: "B" },
{ question: "Which American actress has the same first and last name as Shakespeare's wife?", answers: { A: "Emma Stone", B: "Anne Hathaway", C: "Scarlett Johansson", D: "Natalie Portman" }, correct: "B" },
{ question: "What name is shared by a moderate-tempo Spanish dance and a short women's jacket?", answers: { A: "Flamenco", B: "Salsa", C: "Bolero", D: "Tango" }, correct: "C" },
{ question: "In which notorious prison did Al Capone serve most of his sentence?", answers: { A: "Alcatraz", B: "Sing Sing", C: "San Quentin", D: "Rikers" }, correct: "A" },
{ question: "Which is the most populous country with a majority Catholic population?", answers: { A: "China", B: "USA", C: "Italy", D: "Brazil" }, correct: "D" },
{ question: "Which anglicism denotes a stick used for playing video games?", answers: { A: "Gamepad", B: "Joystick", C: "Controller", D: "Arcade stick" }, correct: "B" },
{ question: "Which country accounted for 15% of the world's leather shoe exports in 2014?", answers: { A: "Spain", B: "France", C: "Turkey", D: "Italy" }, correct: "D" },
{ question: "Which word of French origin is used for the forced removal of tenants based on a final court decision?", answers: { A: "Deposition", B: "Eviction (Deložacija)", C: "Eviction", D: "Expropriation" }, correct: "B" },
{ question: "Which word of Greek origin denotes a medical institution with a large number of specialist clinics?", answers: { A: "Clinic", B: "Polyclinic", C: "Hospital", D: "Infirmary" }, correct: "B" },
{ question: "Which football team has been runner-up three times but never world champion?", answers: { A: "Belgium", B: "Croatia", C: "Netherlands", D: "Japan" }, correct: "C" },
{ question: "With which three-letter Germanism for 'well-done' (reš) does the twentieth letter of the Hebrew alphabet share its name?", answers: { A: "Resh", B: "Well", C: "Gut", D: "Top" }, correct: "A" },
{ question: "Which Germanism for an expert or master (maher) is hidden in the anagram of the word 'harem'?", answers: { A: "Mehar", B: "Maher", C: "Hamer", D: "Rehma" }, correct: "B" },
{ question: "Which chemical synthesis takes place in the green parts of plants using light energy and chlorophyll?", answers: { A: "Respiration", B: "Chlorophyllation", C: "Fermentation", D: "Photosynthesis" }, correct: "D" },
{ question: "Which branch of internal medicine deals with the treatment of diseases of the heart and blood vessels?", answers: { A: "Neurology", B: "Endocrinology", C: "Pulmonology", D: "Cardiology" }, correct: "D" },
{ question: "Which is the most populous Asian country after China and India?", answers: { A: "Pakistan", B: "Bangladesh", C: "Japan", D: "Indonesia" }, correct: "D" },
{ question: "What is the abbreviation for the UN organization for science, education, and culture?", answers: { A: "UNICEF", B: "UN NOK", C: "UNDP", D: "UNESCO" }, correct: "D" },
{ question: "How long is one half in a handball match?", answers: { A: "20 minutes", B: "25 minutes", C: "30 minutes", D: "45 minutes" }, correct: "C" },
{ question: "Which country is the most successful in women's handball at the World Championships (up to 2025)?", answers: { A: "Norway", B: "Russia", C: "Denmark", D: "France" }, correct: "A" },
{ question: "How many meters is the distance of the penalty line from the goal in handball?", answers: { A: "6 meters", B: "7 meters", C: "9 meters", D: "5 meters" }, correct: "B" },
{ question: "Which player is known by the nickname 'La Pulga' (The Flea)?", answers: { A: "Luis Suárez", B: "Sergio Agüero", C: "Lionel Messi", D: "Ángel Di María" }, correct: "C" },
{ question: "Which children's novel by Felix Salten is subtitled 'A Life in the Woods'?", answers: { A: "Bambi", B: "The Little Prince", C: "Pinocchio", D: "The Jungle Book" }, correct: "A" },
{ question: "If we are indifferent toward someone, we care for them like 'last year's snow' (lanjski snijeg)?", answers: { A: "Yesterday's", B: "Last year's", C: "Winter's", D: "Spring's" }, correct: "B" },
{ question: "Which US state has the longest border with Mexico?", answers: { A: "California", B: "Arizona", C: "Texas", D: "New Mexico" }, correct: "C" },
{ question: "Which Bayern Munich player scored 5 goals in 9 minutes against Wolfsburg in 2015?", answers: { A: "Mats Hummels", B: "Edin Džeko", C: "Marco Reus", D: "Robert Lewandowski" }, correct: "D" },
{ question: "What percentage of the Earth's landmass is occupied by islands?", answers: { A: "7%", B: "10%", C: "15%", D: "20%" }, correct: "A" },
{ question: "What is the name for malicious software that locks user data and demands a ransom?", answers: { A: "Spyware", B: "Ransomware", C: "Adware", D: "Trojan" }, correct: "B" },
{ question: "What does the abbreviation VPN stand for in the digital world?", answers: { A: "Virtual Private Network", B: "Visual Protocol Node", C: "Verified Path Number", D: "Variable Port Node" }, correct: "A" },
{ question: "How many meters is one nanometer?", answers: { A: "One millionth of a meter", B: "One billionth of a meter", C: "One thousandth of a meter", D: "One trillionth of a meter" }, correct: "B" },
{ question: "What is the name of the most famous railway connecting Moscow and Vladivostok?", answers: { A: "Orient Express", B: "Blue Train", C: "Silk Road", D: "Trans-Siberian Railway" }, correct: "D" },
{ question: "Which part of the cell is known as the 'powerhouse' because it produces energy (ATP)?", answers: { A: "Mitochondria", B: "Ribosomes", C: "Nucleus", D: "Golgi apparatus" }, correct: "A" },
{ question: "Which organelle contains the cell's genetic material (DNA)?", answers: { A: "Cytoplasm", B: "Ribosomes", C: "Vacuole", D: "Nucleus" }, correct: "D" },
{ question: "What is the name of the famous stone used to decipher Egyptian hieroglyphs?", answers: { A: "Giza Stone", B: "Emerald Tablet", C: "Hammurabi Stone", D: "Rosetta Stone" }, correct: "D" },
{ question: "Which marine mammal is known as the 'killer whale,' even though it actually belongs to the dolphin family?", answers: { A: "Narwhal", B: "Orca", C: "Beluga", D: "Humpback whale" }, correct: "B" },
{ question: "Which national team has won the most ice hockey World Championship titles?", answers: { A: "USA", B: "Sweden", C: "Russia (including USSR)", D: "Canada" }, correct: "D" },
{ question: "In which sport do national teams compete for the trophy called the 'Webb Ellis Cup'?", answers: { A: "Football", B: "Rugby", C: "Cricket", D: "Polo" }, correct: "B" },
{ question: "On what date is Boxing Day celebrated in England?", answers: { A: "25.12.", B: "26.12.", C: "27.12.", D: "01.01." }, correct: "B" },
{ question: "What word is represented by the circled letter C in the symbol protecting creative works?", answers: { A: "Patent", B: "Trademark", C: "Copyright", D: "License" }, correct: "C" },
{ question: "If Inner Mongolia is inside China, in which country is Outer Mongolia?", answers: { A: "Russia", B: "China", C: "Nepal", D: "Mongolia" }, correct: "D" },
{ question: "How many red balls are there in total in snooker?", answers: { A: "15", B: "17", C: "18", D: "21" }, correct: "A" },
{ question: "With which chess piece is the move 'en passant' associated?", answers: { A: "King", B: "Queen", C: "Bishop", D: "Pawn" }, correct: "D" },
{ question: "What do we call an area with large mineral deposits (ore-what)?", answers: { A: "Basin", B: "System", C: "Fire", D: "Region" }, correct: "A" },
{ question: "How many points are needed to win a set in standard volleyball (with at least a 2-point lead)?", answers: { A: "21", B: "25", C: "30", D: "15" }, correct: "B" },
{ question: "Who is the author of the painting 'The Red Vineyard,' which the Belgian painter Anna Boch bought for 400 francs?", answers: { A: "Claude Monet", B: "Vincent van Gogh", C: "Paul Cézanne", D: "Edgar Degas" }, correct: "B" },
{ question: "Which programming language has a coffee cup as its symbol?", answers: { A: "Python", B: "C++", C: "Java", D: "Ruby" }, correct: "C" },
{ question: "Which was the first planet on which a spacecraft sent from Earth landed?", answers: { A: "Mars", B: "Venus", C: "Moon", D: "Mercury" }, correct: "B" }

], 
hardest: [ 
{ question: "Which Nobel laureate was the first female lecturer at the Paris Sorbonne?", answers: { A: "Rosalind Franklin", B: "Marie Curie", C: "Irène Joliot-Curie", D: "Dorothy Hodgkin" }, correct: "B" },
{ question: "In which controversial novel does Dan Brown present a theory about the living descendants of Christ?", answers: { A: "Angels & Demons", B: "Inferno", C: "The Da Vinci Code", D: "The Lost Symbol" }, correct: "C" },
{ question: "In which part of the ear is the Eustachian tube located?", answers: { A: "Outer ear", B: "Middle ear", C: "Inner ear", D: "Eardrum" }, correct: "B" },
{ question: "Which country won Euro 2020 (played in 2021)?", answers: { A: "England", B: "Spain", C: "Italy", D: "France" }, correct: "C" },
{ question: "Which pigment is insufficiently present in the bodies of people with albinism?", answers: { A: "Chlorophyll", B: "Hemoglobin", C: "Melanin", D: "Keratin" }, correct: "C" },
{ question: "By which English word do we call female hostesses at various commercial events?", answers: { A: "Assistants", B: "Hostesses", C: "Guides", D: "Influencers" }, correct: "B" },
{ question: "In gymnastics, what is the rotation of the body in flight forward or backward by at least 360 degrees called?", answers: { A: "Somersault", B: "Spiral", C: "Jump", D: "Turn" }, correct: "A" },
{ question: "What does the abbreviation of the game GTA stand for?", answers: { A: "Grand Tactical Assault", B: "Great Theft Action", C: "Grand Theft Auto", D: "Global Transport Agency" }, correct: "C" },
{ question: "Which science did Carl Leverkus, after whom a German city was named in 1930, practice?", answers: { A: "Physics", B: "Chemistry", C: "Biology", D: "Mathematics" }, correct: "B" },
{ question: "For which country did singer Conchita Wurst bring a Eurovision victory?", answers: { A: "Switzerland", B: "Sweden", C: "Germany", D: "Austria" }, correct: "D" },
{ question: "Which country's vehicle code is first on the alphabetical list of international registration codes?", answers: { A: "Albania", B: "Andorra", C: "Australia", D: "Austria" }, correct: "D" },
{ question: "In which city is the Dome of the Rock, the oldest Islamic building in the world, located?", answers: { A: "Mecca", B: "Medina", C: "Damascus", D: "Jerusalem" }, correct: "D" },
{ question: "On which island are Cagliari and Sassari the largest cities?", answers: { A: "Sicily", B: "Corsica", C: "Sardinia", D: "Malta" }, correct: "C" },
{ question: "In chemistry, what are the salts of carbonic acid called?", answers: { A: "Sulfates", B: "Nitrates", C: "Carbonates", D: "Phosphates" }, correct: "C" },
{ question: "Which is the only chemical element that is liquid at room temperature and is not a metal?", answers: { A: "Iodine", B: "Chlorine", C: "Bromine", D: "Mercury" }, correct: "C" },
{ question: "Which country in the world is the largest producer of uranium, covering over 40% of global needs?", answers: { A: "Australia", B: "Kazakhstan", C: "Canada", D: "Russia" }, correct: "B" },
{ question: "What is the name of the first woman to fly into space in 1963 aboard the Vostok 6 spacecraft?", answers: { A: "Sally Ride", B: "Svetlana Savitskaya", C: "Judith Resnik", D: "Valentina Tereshkova" }, correct: "D" },
{ question: "Which strait is known by the nickname 'Gate of Tears'?", answers: { A: "Strait of Hormuz", B: "Bab-el-Mandeb", C: "Strait of Malacca", D: "Bosphorus" }, correct: "B" },
{ question: "In which country is the world's largest monolith, known as Uluru, located?", answers: { A: "South Africa", B: "Brazil", C: "Australia", D: "USA" }, correct: "C" },
{ question: "Which is the only mammal in the world that has scales?", answers: { A: "Pangolin", B: "Armadillo", C: "Anteater", D: "Thylacine" }, correct: "A" },
{ question: "Which is the only monarchy among the five permanent members of the UN Security Council?", answers: { A: "France", B: "China", C: "United Kingdom", D: "USA" }, correct: "C" },
{ question: "Which is the only Latin American country where French is the official language?", answers: { A: "Guyana", B: "Ecuador", C: "Haiti", D: "Suriname" }, correct: "C" },
{ question: "Which country participates in the 6 Nations rugby tournament along with France, England, Ireland, Scotland, and Wales?", answers: { A: "Italy", B: "Germany", C: "Spain", D: "Netherlands" }, correct: "A" },
{ question: "Which people have given the largest number of popes in history?", answers: { A: "French", B: "Spanish", C: "Argentinians", D: "Italians" }, correct: "D" },
{ question: "Which is the most famous ancient city-state that was the main rival of Athens in the Peloponnesian War?", answers: { A: "Sparta", B: "Troy", C: "Thebes", D: "Corinth" }, correct: "A" },
{ question: "In geology, what is the scale that measures the hardness of minerals from 1 to 10 called?", answers: { A: "Richter scale", B: "Celsius scale", C: "Mohs scale", D: "Kelvin scale" }, correct: "C" },
{ question: "What is the literary style that uses exaggeration to achieve an effect (e.g., 'a million chores await me') called?", answers: { A: "Metaphor", B: "Irony", C: "Personification", D: "Hyperbole" }, correct: "D" },
{ question: "In biology, what is a community of organisms living together and benefiting from each other called?", answers: { A: "Symbiosis", B: "Parasitism", C: "Predation", D: "Cannibalism" }, correct: "A" },
{ question: "In chemistry, what are the elements in the 18th group of the periodic table that are very unreactive called?", answers: { A: "Alkali metals", B: "Halogens", C: "Noble gases", D: "Lanthanides" }, correct: "C" },
{ question: "In maritime law, what is the international distress signal (SOS) called?", answers: { A: "Mayday", B: "Roger", C: "Over", D: "Copy" }, correct: "A" },
{ question: "What is the name of the highest active volcano in Europe?", answers: { A: "Vesuvius", B: "Santorini", C: "Etna", D: "Stromboli" }, correct: "C" },
{ question: "In economics, what is a sudden and uncontrolled increase in prices called?", answers: { A: "Deflation", B: "Recession", C: "Stagnation", D: "Hyperinflation" }, correct: "D" },
{ question: "In linguistics, what is a word that is spelled the same but has a different meaning (e.g., kosa) called?", answers: { A: "Synonym", B: "Homonym", C: "Antonym", D: "Archaism" }, correct: "B" },
{ question: "What is the name of the fictional detective created by Agatha Christie, known for his 'little grey cells'?", answers: { A: "Sherlock Holmes", B: "Philip Marlowe", C: "Arsène Lupin", D: "Hercule Poirot" }, correct: "D" },
{ question: "Which part of the human ear is responsible for maintaining balance?", answers: { A: "Eardrum", B: "Semicircular canals", C: "Hammer, anvil, and stirrup", D: "Cochlea" }, correct: "B" },
{ question: "In digital technology, what does the abbreviation URL stand for?", answers: { A: "User Remote Link", B: "Universal Radio Line", C: "United Resource Locator", D: "Uniform Resource Locator" }, correct: "D" },
{ question: "What is the science that studies clouds called?", answers: { A: "Speleology", B: "Ichthyology", C: "Nephology", D: "Petrology" }, correct: "C" },
{ question: "Which of the following biological terms denotes 'programmed cell death'?", answers: { A: "Mitosis", B: "Meiosis", C: "Apoptosis", D: "Necrosis" }, correct: "C" },
{ question: "What is the logical negation of the statement: 'All people are mortal'?", answers: { A: "No person is mortal", B: "Some people are not mortal", C: "All people are immortal", D: "Some people are mortal" }, correct: "B" },
{ question: "Which country was the first in the world to introduce a general income tax in its modern form?", answers: { A: "USA", B: "France", C: "Great Britain", D: "Germany" }, correct: "C" },
{ question: "Which country has the most Nobel Prizes per capita (historically)?", answers: { A: "Switzerland", B: "Sweden", C: "Denmark", D: "Norway" }, correct: "B" },
{ question: "Which battle is considered the turning point of World War II on the Eastern Front?", answers: { A: "Battle of Moscow", B: "Battle of Stalingrad", C: "Battle of Kursk", D: "Battle of Leningrad" }, correct: "B" },
{ question: "What is the ethical theory that claims the right action is the one that brings the greatest happiness to the greatest number of people?", answers: { A: "Egoism", B: "Stoicism", C: "Utilitarianism", D: "Hedonism" }, correct: "C" },
{ question: "In microbiology, what are organisms that can survive in extreme conditions such as a vacuum or high radiation called?", answers: { A: "Extremophiles", B: "Amoebas", C: "Paramecia", D: "Saprophytes" }, correct: "A" },
{ question: "Which noble metal, besides gold, is most used in electronics due to its exceptional conductivity and corrosion resistance?", answers: { A: "Zinc", B: "Copper", C: "Silver", D: "Aluminum" }, correct: "C" },
{ question: "What is the main ingredient of the world's most expensive coffee (Kopi Luwak) which passes through an animal's digestive system?", answers: { A: "Asian palm civet feces", B: "Cactus juice", C: "Swallow saliva", D: "Fermented rice" }, correct: "A" },
{ question: "To which series does the 2015 film 'The Force Awakens' belong?", answers: { A: "Lord of the Rings", B: "Star Trek", C: "Star Wars", D: "The Matrix" }, correct: "C" },
{ question: "Which dog breed is named after the largest Canadian peninsula?", answers: { A: "Husky", B: "Labrador", C: "Malamute", D: "Golden retriever" }, correct: "B" },
{ question: "Which NBA team has won the most titles in history?", answers: { A: "Los Angeles Lakers", B: "Boston Celtics", C: "Chicago Bulls", D: "Golden State Warriors" }, correct: "B" },
{ question: "What is the standard net height in men's volleyball?", answers: { A: "2.24 m", B: "2.35 m", C: "2.43 m", D: "2.50 m" }, correct: "C" }

]
},

interestingFacts: {
easy: [
{ question: "Which infantry army of the Ottoman Empire was abolished in 1826?", answers: { A: "Spahis", B: "Janissaries", C: "Mamluks", D: "Sipahi" }, correct: "B" },
{ question: "Which national team won the 2018 World Cup?", answers: { A: "Germany", B: "France", C: "Argentina", D: "Brazil" }, correct: "B" },
{ question: "Which is the best-selling gaming console in history?", answers: { A: "PlayStation 2", B: "PS5", C: "Xbox 360", D: "Nintendo Switch" }, correct: "A" },
{ question: "How many natural satellites (moons) does the planet Mars have?", answers: { A: "0", B: "2", C: "15", D: "60" }, correct: "B" },
{ question: "What is the longest and strongest bone in the human body?", answers: { A: "Rib", B: "Femur", C: "Clavicle", D: "Ulna" }, correct: "B" },
{ question: "Where is the smallest bone in the human body (stapes) located?", answers: { A: "In the nose", B: "In the foot", C: "In the ear", D: "In the hand" }, correct: "C" },
{ question: "How many bones are in the human foot (one foot)?", answers: { A: "20", B: "22", C: "24", D: "26" }, correct: "D" },
{ question: "Which country has the most active volcanoes?", answers: { A: "Japan", B: "Indonesia", C: "Iceland", D: "Italy" }, correct: "B" },
{ question: "What was the first movie to earn over 1 billion dollars?", answers: { A: "Titanic", B: "Avatar", C: "Avatar 2", D: "Star Wars" }, correct: "A" },
{ question: "What is the fastest animal on the planet?", answers: { A: "Cheetah", B: "Peregrine falcon", C: "Lion", D: "Antelope" }, correct: "B" },
{ question: "What is the drink Sake made from?", answers: { A: "Rice", B: "Potatoes", C: "Wheat", D: "Corn" }, correct: "A" },
{ question: "What is the smallest muscle in the human body (located in the ear)?", answers: { A: "Sartorius", B: "Stapedius", C: "Masseter", D: "Gluteus" }, correct: "B" },
{ question: "Where in the human body are red blood cells produced?", answers: { A: "In the bone marrow", B: "In the liver", C: "In the heart", D: "In the spleen" }, correct: "A" },
{ question: "Who is the only Disney princess based on a real historical figure?", answers: { A: "Snow White", B: "Rapunzel", C: "Cinderella", D: "Pocahontas" }, correct: "D" },
{ question: "What goes up and down but never moves?", answers: { A: "Elevator", B: "Temperature", C: "Rain", D: "Stairs" }, correct: "D" },
{ question: "Which word do all people always pronounce incorrectly?", answers: { A: "Alphabet", B: "Incorrectly", C: "Word", D: "Names" }, correct: "B" },
{ question: "In which game do you fight monsters in a world called 'The Lands Between'?", answers: { A: "Dark Souls", B: "Elden Ring", C: "Bloodborne", D: "Skyrim" }, correct: "B" },
{ question: "Which country was the first in the world to introduce a Carbon Tax?", answers: { A: "Sweden", B: "New Zealand", C: "Norway", D: "Finland" }, correct: "D" },
{ question: "Which type of packaging can be recycled infinitely many times without loss of quality?", answers: { A: "Plastic", B: "Paper", C: "Cardboard", D: "Glass and aluminum" }, correct: "D" },
{ question: "What is the smallest unit of Bitcoin called?", answers: { A: "Satoshi", B: "Bit", C: "Wei", D: "Lito" }, correct: "A" },
{ question: "Which is the saltiest ocean in the world?", answers: { A: "Pacific", B: "Indian", C: "Arctic", D: "Atlantic" }, correct: "D" },
{ question: "What is the phenomenon of warm water currents in the Pacific that affects the climate of the entire Earth?", answers: { A: "El Niño", B: "Tides", C: "Gulf Stream", D: "Jet Stream" }, correct: "A" },
{ question: "What is the most widespread mineral in the Earth's crust?", answers: { A: "Feldspar", B: "Quartz", C: "Mica", D: "Diamond" }, correct: "A" },
{ question: "What is the upper, solid layer of the Earth that includes the crust called?", answers: { A: "Mesosphere", B: "Asthenosphere", C: "Biosphere", D: "Lithosphere" }, correct: "D" },
{ question: "Which period of prehistory is known as the 'New Stone Age'?", answers: { A: "Paleolithic", B: "Mesolithic", C: "Neolithic", D: "Eneolithic" }, correct: "C" },
{ question: "What is the name of the extinct relative of modern humans whose remains were first found in Germany?", answers: { A: "Homo Erectus", B: "Neanderthal", C: "Homo Habilis", D: "Australopithecus" }, correct: "B" },
{ question: "How many symphonies did Ludwig van Beethoven compose?", answers: { A: "5", B: "7", C: "9", D: "11" }, correct: "C" },
{ question: "Which composer is known as a 'child prodigy' and the author of 'The Magic Flute'?", answers: { A: "Bach", B: "Mozart", C: "Vivaldi", D: "Chopin" }, correct: "B" },
{ question: "What is the name of the famous opera house in Milan?", answers: { A: "La Scala", B: "Bolshoi", C: "Metropolitan", D: "Milan Opera" }, correct: "A" },
{ question: "Who is considered the author of the first opera in history ('Dafne')?", answers: { A: "Verdi", B: "Puccini", C: "Wagner", D: "Jacopo Peri" }, correct: "D" },
{ question: "Which painting technique uses pigments mixed with egg yolk?", answers: { A: "Watercolor", B: "Gouache", C: "Tempera", D: "Oil paints" }, correct: "C" },
{ question: "What is the name of the technique of painting on wet plaster?", answers: { A: "Fresco", B: "Mosaic", C: "Collage", D: "Encaustic" }, correct: "A" },
{ question: "From which language does the word 'alcohol' originate?", answers: { A: "Greek", B: "Latin", C: "Arabic", D: "English" }, correct: "C" },
{ question: "Which language is considered a direct descendant of the Old Norse language?", answers: { A: "Swedish", B: "English", C: "German", D: "Icelandic" }, correct: "D" },
{ question: "In photography, what does the abbreviation ISO stand for?", answers: { A: "Shutter speed", B: "Sensor sensitivity to light", C: "Aperture size", D: "Image resolution" }, correct: "B" },
{ question: "Which airline is the national carrier of Germany?", answers: { A: "Wizz Air", B: "Lufthansa", C: "KLM", D: "DHL Air" }, correct: "B" },
{ question: "What is the name of the largest passenger aircraft in the world (with two decks)?", answers: { A: "Boeing 747", B: "Boeing 777", C: "Concorde", D: "Airbus A380" }, correct: "D" },
{ question: "What is the SI unit for electrical resistance?", answers: { A: "Volt", B: "Ampere", C: "Ohm", D: "Watt" }, correct: "C" },
{ question: "Which plant is considered the fastest-growing in the world?", answers: { A: "Bamboo", B: "Oak", C: "Cactus", D: "Sunflower" }, correct: "A" },
{ question: "Who is considered the 'father of genetics' due to experiments with peas?", answers: { A: "Charles Darwin", B: "Gregor Mendel", C: "James Watson", D: "Francis Crick" }, correct: "B" },
{ question: "What was the name of Christopher Columbus's flagship on his first voyage to America?", answers: { A: "Niña", B: "Pinta", C: "Mayflower", D: "Santa Maria" }, correct: "D" },
{ question: "Which country was the first to legalize Bitcoin as legal tender?", answers: { A: "El Salvador", B: "Japan", C: "Switzerland", D: "Germany" }, correct: "A" },
{ question: "Which is the most-viewed YouTube video of all time?", answers: { A: "Baby Shark", B: "Despacito", C: "Gangnam Style", D: "Shape of You" }, correct: "A" },
{ question: "Which is the most-played video game of all time?", answers: { A: "Minecraft", B: "GTA V", C: "Tetris", D: "Fortnite" }, correct: "C" },
{ question: "Which book has been translated into the most languages in the world after the Bible?", answers: { A: "The Little Prince", B: "Don Quixote", C: "Harry Potter", D: "The Alchemist" }, correct: "A" },
{ question: "Which country has the most pyramids?", answers: { A: "Egypt", B: "Sudan", C: "Mexico", D: "Peru" }, correct: "B" },
{ question: "Which dynasty ruled China during the 'Golden Age' (618–907), when poetry and Silk Road trade flourished?", answers: { A: "Ming", B: "Han", C: "Yang", D: "Tang" }, correct: "D" },
{ question: "Who was the first Roman emperor?", answers: { A: "Julius Caesar", B: "Romulus and Remus", C: "Nero", D: "Augustus" }, correct: "D" },
{ question: "Which country after Russia has the most borders with other countries in Europe?", answers: { A: "Hungary", B: "Switzerland", C: "France", D: "Germany" }, correct: "D" },
{ question: "Which country has the most active volcanoes in Europe?", answers: { A: "Italy", B: "Cyprus", C: "Greece", D: "Iceland" }, correct: "D" },
{ question: "Which is the smallest country in the world by area?", answers: { A: "Monaco", B: "San Marino", C: "Vatican City", D: "Liechtenstein" }, correct: "C" },
{ question: "Which continent has the largest number of countries?", answers: { A: "Africa", B: "Asia", C: "Europe", D: "South America" }, correct: "A" },
{ question: "Picasso and Braque are the most important representatives of the art movement named after which geometric shape?", answers: { A: "Sphere", B: "Pyramid", C: "Cube (Cubism)", D: "Cylinder" }, correct: "C" },
{ question: "Which sticker is proof of paid highway tolls?", answers: { A: "Vignette", B: "Toll pass", C: "Sticker pass", D: "Toll ACC" }, correct: "A" },
{ question: "What name is shared by an Asian kingdom and an alkane with 4 carbon atoms?", answers: { A: "Bhutan (Butane)", B: "Propane", C: "Pentane", D: "Ethane" }, correct: "A" },
{ question: "Which Turkism do we use for the blossom of a fruit tree?", answers: { A: "Đul", B: "Behar", C: "Lale", D: "Zumbul" }, correct: "B" },
{ question: "Italian fascists wear black shirts, while Brazilian integralists wear shirts of which color?", answers: { A: "Blue", B: "Red", C: "White", D: "Green" }, correct: "D" },
{ question: "At which position on the list of the largest islands in the world is Great Britain located?", answers: { A: "3rd", B: "5th", C: "7th", D: "9th" }, correct: "D" },
{ question: "Which Roman playwright established long ago in his 'The Asses' that 'man is a wolf to man'?", answers: { A: "Aristophanes", B: "Plautus", C: "Sophocles", D: "Euripides" }, correct: "B" },
{ question: "What is the name of the protective bulletproof vest worn by soldiers and police officers?", answers: { A: "Corselet", B: "Body armor (Pancir)", C: "Armor", D: "Guard" }, correct: "B" },
{ question: "What do we call the instinctive, irresistible urge to start fires?", answers: { A: "Kleptomania", B: "Pyromania", C: "Arsonphobia", D: "Pathomania" }, correct: "B" },
{ question: "How many small squares are there in total on a classic Rubik's Cube?", answers: { A: "48", B: "50", C: "54", D: "56" }, correct: "C" },
{ question: "With which country does Russia have its shortest land border, only 18 km long?", answers: { A: "Norway", B: "China", C: "North Korea", D: "Finland" }, correct: "C" },
{ question: "Which mythological character had daughters Prophasis and Metamelia, meaning Excuse and Regret?", answers: { A: "Pandora", B: "Hera", C: "Athena", D: "Artemis" }, correct: "A" },
{ question: "The term embryo is used for a germ; what Greek term is used for the offspring later in development?", answers: { A: "Zygote", B: "Fetus", C: "Larva", D: "Blastula" }, correct: "B" },
{ question: "From which country did Great Britain seize Canada in 1763?", answers: { A: "Spain", B: "France", C: "Portugal", D: "Netherlands" }, correct: "B" },
{ question: "In which city was the oldest university in Slavic countries founded in 1348?", answers: { A: "Prague", B: "Krakow", C: "Belgrade", D: "Sofia" }, correct: "A" },
{ question: "How many years ago did Einstein publish the article 'The Foundation of the General Theory of Relativity'?", answers: { A: "1905", B: "1915", C: "1916", D: "1920" }, correct: "C" },
{ question: "For which country's Grand Prix is Formula 1 driven at the Silverstone circuit?", answers: { A: "Italy", B: "Great Britain", C: "Germany", D: "France" }, correct: "B" },
{ question: "Although Swedish is spoken on them, the Åland Islands are an autonomous province of which country?", answers: { A: "Sweden", B: "Norway", C: "Finland", D: "Denmark" }, correct: "C" },
{ question: "Which country has won the most medals at the Winter Olympics?", answers: { A: "Germany", B: "Canada", C: "Russia", D: "Norway" }, correct: "D" },
{ question: "In which language was 'The Alchemist', one of the most translated novels, written?", answers: { A: "Spanish", B: "Portuguese", C: "Polish", D: "French" }, correct: "B" },
{ question: "By which grecism do we call the typographic 'star' symbol?", answers: { A: "Ampersand", B: "Asterisk", C: "Obelus", D: "Tilde" }, correct: "B" },
{ question: "What is the part of the soil called that is formed from dead organic matter and determines soil quality?", answers: { A: "Humus", B: "Loam", C: "Sand", D: "Peat" }, correct: "A" },
{ question: "Which country founded its own Foreign Legion in 1920, modeled after the French one?", answers: { A: "Italy", B: "Spain", C: "Germany", D: "Greece" }, correct: "B" },
{ question: "Which light-related phenomenon gave its name to the largest battery manufacturer in Croatia?", answers: { A: "Munja (Lightning)", B: "Iskra", C: "Flash", D: "Dawn" }, correct: "A" },
{ question: "James Bond is Agent 007; which title film character is Agent 47?", answers: { A: "John Wick", B: "Jason Bourne", C: "Jack Reacher", D: "Hitman" }, correct: "D" },
{ question: "In which country is the top football league called Ekstraklasa?", answers: { A: "Czech Republic", B: "Slovakia", C: "Hungary", D: "Poland" }, correct: "D" },
{ question: "Where does 'Bijelo Dugme' invite 'girls, boys, students, pupils, and policemen'?", answers: { A: "To the sea", B: "To the city", C: "To the mountains", D: "To the village" }, correct: "C" },
{ question: "Which actor replaced Charlie Sheen in the series 'Two and a Half Men'?", answers: { A: "Jon Cryer", B: "Ashton Kutcher", C: "Steve Carell", D: "Matthew Perry" }, correct: "B" },
{ question: "What does the girl Liesel steal during Nazi Germany in Markus Zusak's bestseller?", answers: { A: "Food", B: "Money", C: "Books", D: "Letters" }, correct: "C" },
{ question: "Which ancient conqueror was nicknamed 'dog-headed' because, according to folk belief, he was half man, half dog?", answers: { A: "Julius Caesar", B: "Attila", C: "Alexander the Great", D: "Genghis Khan" }, correct: "B" },
{ question: "With which animal do we associate the physicist Schrödinger?", answers: { A: "Cat", B: "Rabbit", C: "Mouse", D: "Dog" }, correct: "A" },
{ question: "On the edge of which river's delta is the Pakistani city of Karachi located?", answers: { A: "Indus", B: "Nile", C: "Euphrates", D: "Tigris" }, correct: "A" },
{ question: "Which name is shared by a transparent optical body and an annual protein-rich legume?", answers: { A: "Lens (Leća)", B: "Bean", C: "Soy", D: "Lupin" }, correct: "A" },
{ question: "What is the largest professional social network by number of users?", answers: { A: "Facebook", B: "Instagram", C: "LinkedIn", D: "X (Twitter)" }, correct: "C" },
{ question: "The American company 'Alcoa' is the world's largest producer of which metal?", answers: { A: "Steel", B: "Copper", C: "Aluminum", D: "Titanium" }, correct: "C" },
{ question: "How many hours are in 3540 minutes?", answers: { A: "58", B: "59", C: "60", D: "61" }, correct: "B" },
{ question: "Which museum is located in Paris and houses the 'Mona Lisa'?", answers: { A: "Musée d'Orsay", B: "Louvre", C: "Centre Pompidou", D: "Versailles" }, correct: "B" },
{ question: "Which French ruler was crowned Emperor in 1804?", answers: { A: "Louis XIV", B: "Napoleon Bonaparte", C: "Charles de Gaulle", D: "Louis XVI" }, correct: "B" },
{ question: "What do we call the time from the entry of a pathogen into the body until the first signs of illness appear?", answers: { A: "Reaction", B: "Incubation", C: "Infection", D: "Remission" }, correct: "B" },
{ question: "What is the abbreviation of the virus that causes AIDS?", answers: { A: "HPV", B: "HBV", C: "HIV", D: "HCV" }, correct: "C" },
{ question: "Which quadrilateral is named after the fourth letter of the Greek alphabet?", answers: { A: "Trapezium", B: "Square", C: "Rhombus", D: "Deltoid" }, correct: "D" },
{ question: "Which football stadium is known as the 'Theatre of Dreams'?", answers: { A: "Camp Nou", B: "Santiago Bernabéu", C: "Old Trafford", D: "San Siro" }, correct: "C" },
{ question: "Which city was the first host of the modern Olympic Games in 1896?", answers: { A: "Paris", B: "London", C: "Athens", D: "Rome" }, correct: "C" },
{ question: "Which country was the first to recognize the independence of the United States de facto (before the 1783 treaty)?", answers: { A: "France", B: "Spain", C: "Netherlands", D: "Russia" }, correct: "A" },
{ question: "Which country has the most UNESCO World Heritage sites (2025 ranking)?", answers: { A: "Bosnia and Herzegovina", B: "Germany", C: "Spain", D: "Italy" }, correct: "D" },
{ question: "Which chess player became the youngest world champion in history in December 2024?", answers: { A: "Magnus Carlsen", B: "Bobby Fischer", C: "Garry Kasparov", D: "Gukesh Dommaraju" }, correct: "D" },
{ question: "Which is the longest known meaningful sentence palindrome in the English language?", answers: { A: "Never odd or even", B: "Madam I'm Adam", C: "A man a plan a canal Panama", D: "No lemon no melon" }, correct: "C" },
{ question: "Which driver holds the record for the most consecutive Formula 1 World Championship titles?", answers: { A: "Lewis Hamilton", B: "Sebastian Vettel", C: "Michael Schumacher", D: "Max Verstappen" }, correct: "C" }



],
hard: [
{ question: "Which subspecies of peach is named after sweet floral juice?", answers: { A: "Plum", B: "Apricot", C: "Clementine", D: "Nectarine" }, correct: "D" },
{ question: "Which Germanism can denote both a rebellion and a bundle?", answers: { A: "Sturm", B: "Uprising", C: "Kampf", D: "Bunt" }, correct: "D" },
{ question: "Which art movement is characterized by strong emotions and dramatic expression in the 17th century?", answers: { A: "Baroque", B: "Realism", C: "Impressionism", D: "Modernism" }, correct: "A" },
{ question: "Which phenomenon causes GPS to require constant correction?", answers: { A: "Time relativity", B: "Magnetism", C: "Solar storms", D: "Moon gravity" }, correct: "A" },
{ question: "Which algorithm is behind Google Search (the basis for ranking)?", answers: { A: "PageRank", B: "SortNet", C: "SearchFlow", D: "RankBoost" }, correct: "A" },
{ question: "Which European country legalized euthanasia in 2001?", answers: { A: "Netherlands", B: "Switzerland", C: "Germany", D: "Denmark" }, correct: "A" },
{ question: "Which polysaccharide is often called animal starch?", answers: { A: "Cellulose", B: "Glycogen", C: "Starch", D: "Lignin" }, correct: "B" },
{ question: "The Nobel Peace Prize in 1917, 1944, and 1963 was not awarded to an individual but to which organization?", answers: { A: "UNICEF", B: "UNESCO", C: "Red Cross", D: "WHO" }, correct: "C" },
{ question: "Which pipe in the shape of a horizontal letter F connects various drainage devices to the sewer?", answers: { A: "Valve", B: "Siphon", C: "Filter", D: "Pump" }, correct: "B" },
{ question: "Which double bag is carried over the shoulder or tied to a saddle so that it hangs on both sides?", answers: { A: "Backpack", B: "Saddlebags (Bisage)", C: "Pouch", D: "Belt" }, correct: "B" },
{ question: "In which gender does color blindness (daltonism) occur more frequently?", answers: { A: "Female", B: "Male", C: "Both equally", D: "Neither" }, correct: "B" },
{ question: "HNO3 is the formula for which acid?", answers: { A: "Chloric", B: "Sulfuric", C: "Nitric", D: "Phosphoric" }, correct: "C" },
{ question: "What is the name of the logical number game whose name in Japanese means 'single number'?", answers: { A: "Nonogram", B: "Sudoku", C: "Kakuro", D: "KenKen" }, correct: "B" },
{ question: "What is the name of the scam method where a user is tricked into revealing a password via fake emails?", answers: { A: "Spamming", B: "Hacking", C: "Phishing", D: "Buffering" }, correct: "C" },
{ question: "What does the 'S' stand for in the HTTPS protocol?", answers: { A: "System", B: "Server", C: "Secure", D: "Standard" }, correct: "C" },
{ question: "In which country was the world's first public railway line opened in 1825?", answers: { A: "Great Britain", B: "USA", C: "France", D: "Germany" }, correct: "A" },
{ question: "What is the name of the famous luxury train that connected Paris and Istanbul for decades?", answers: { A: "Blue Train", B: "Orient Express", C: "Flying Scotsman", D: "TGV" }, correct: "B" },
{ question: "In which sport do national teams compete for the 'Davis Cup'?", answers: { A: "Table tennis", B: "Golf", C: "Tennis", D: "Football" }, correct: "C" },
{ question: "Which country always enters the stadium first during the Olympic Games opening ceremony?", answers: { A: "The host", B: "Last year's host", C: "Greece", D: "Olympic winner" }, correct: "C" },
{ question: "What does the Latin expression 'persona non grata' mean in diplomacy?", answers: { A: "Trusted person", B: "Temporary representative", C: "Unwelcome person", D: "Guest of honor" }, correct: "C" },
{ question: "What is the only organ in the human body that has no sense of pain?", answers: { A: "Heart", B: "Liver", C: "Brain", D: "Lungs" }, correct: "C" },
{ question: "What is the fear of strangers and the unknown called?", answers: { A: "Xenophobia", B: "Agoraphobia", C: "Claustrophobia", D: "Homophobia" }, correct: "A" },
{ question: "How many countries in the world have a name consisting of exactly two words (e.g., Saudi Arabia, South Korea)?", answers: { A: "About 10", B: "About 30", C: "About 50", D: "About 5" }, correct: "B" },
{ question: "Which civilization built the city of Machu Picchu?", answers: { A: "Mayans", B: "Incas", C: "Aztecs", D: "Olmecs" }, correct: "B" },
{ question: "The former wife of Michael Jackson and Nicolas Cage was the only child of which musician?", answers: { A: "Elvis Presley", B: "Frank Sinatra", C: "Prince", D: "Chuck Berry" }, correct: "A" },
{ question: "Which British comedian started his film career in 1983 with a supporting role in 'Never Say Never Again'?", answers: { A: "Rowan Atkinson", B: "Mr. Bean", C: "John Cleese", D: "Sacha Baron Cohen" }, correct: "A" },
{ question: "Which country boasts the most Nobel Prizes in Literature?", answers: { A: "Germany", B: "France", C: "Great Britain", D: "Italy" }, correct: "B" },
{ question: "The Spanish Viceroyalty of the Río de la Plata included parts of Chile, Paraguay, Uruguay, Bolivia, and which other country?", answers: { A: "Brazil", B: "Argentina", C: "Peru", D: "Colombia" }, correct: "B" },
{ question: "Since an honest man is hard to find, what did Diogenes use to search for one during the day?", answers: { A: "A mirror", B: "A candle", C: "A lamp", D: "A torch" }, correct: "B" },
{ question: "Which university did Mark Zuckerberg attend when Facebook was conceived?", answers: { A: "MIT", B: "Stanford", C: "Harvard", D: "Yale" }, correct: "C" },
{ question: "Which British Overseas Territory is named after the military leader Tariq ibn-Ziyad?", answers: { A: "Malta", B: "Gibraltar", C: "Cyprus", D: "Bermuda" }, correct: "B" },
{ question: "Which lymphoid glands in the human throat are commonly removed?", answers: { A: "Lymph nodes", B: "Tonsils", C: "Thymus", D: "Spleen" }, correct: "B" },
{ question: "Which grecism denotes a special suit for divers, pilots, and astronauts?", answers: { A: "Overalls", B: "Spacesuit (Skafander)", C: "Aerosuit", D: "Diver suit" }, correct: "B" },
{ question: "Which young Croatian innovator is best known for constructing electric cars?", answers: { A: "Davor Šuker", B: "Ivan Mrvoš", C: "Mate Rimac", D: "Nikola Tesla" }, correct: "C" },
{ question: "What is the surname of the young charismatic tycoon from '50 Shades of Grey'?", answers: { A: "Grey", B: "Black", C: "White", D: "Stone" }, correct: "A" },
{ question: "What Latinism do we use for the shaping of relief through the destruction of the Earth's crust by water or ice?", answers: { A: "Erosion", B: "Sedimentation", C: "Corrosion", D: "Deformation" }, correct: "A" },
{ question: "What name is shared by the semiconductor element that replaced the vacuum tube and a small portable radio?", answers: { A: "Transistor", B: "Diode", C: "Integrated circuit", D: "Resistor" }, correct: "A" },
{ question: "In which country's first football league are there 6 clubs with the word 'Hapoel' in their name?", answers: { A: "Egyptian", B: "Greek", C: "Turkish", D: "Israeli" }, correct: "D" },
{ question: "Which planet is approximately 150 million kilometers away from the Sun?", answers: { A: "Venus", B: "Jupiter", C: "Mars", D: "Earth" }, correct: "D" },
{ question: "How do you say 'Great Prize' in French?", answers: { A: "Grande Course", B: "Grand Prix", C: "Prix Grand", D: "Course Royale" }, correct: "B" },
{ question: "Margaret Thatcher was the 'Iron Lady', but which statesman was the 'Iron Chancellor'?", answers: { A: "Helmut Kohl", B: "Konrad Adenauer", C: "Willy Brandt", D: "Otto von Bismarck" }, correct: "D" },
{ question: "How many letters in the Serbo-Croatian alphabet are written the same in both Latin and Cyrillic scripts?", answers: { A: "5", B: "6", C: "7", D: "8" }, correct: "C" },
{ question: "Which female name means 'wisdom' in Greek?", answers: { A: "Helena", B: "Katherine", C: "Sophia", D: "Irene" }, correct: "C" },
{ question: "At which track was the first official Formula 1 World Championship race held in 1950?", answers: { A: "Monza", B: "Silverstone", C: "Spa-Francorchamps", D: "Monaco" }, correct: "B" },
{ question: "Which planet takes approximately 88 Earth days for one orbit around the Sun?", answers: { A: "Venus", B: "Mercury", C: "Mars", D: "Pluto" }, correct: "B" },
{ question: "Under which ordinal number in the periodic table of elements is Mendelevium found?", answers: { A: "99", B: "100", C: "101", D: "102" }, correct: "C" },
{ question: "Which singer won the Grammy for Album of the Year in both 2010 and 2016?", answers: { A: "Adele", B: "Taylor Swift", C: "Rihanna", D: "Beyoncé" }, correct: "B" },
{ question: "What do we call the hospitality service of preparing, delivering, and serving food at social events?", answers: { A: "Buffet", B: "Banquet", C: "Delivery", D: "Catering" }, correct: "D" },
{ question: "Which surgical procedure is performed when a normal birth is not possible?", answers: { A: "Laparoscopy", B: "Transplantation", C: "Caesarean section", D: "Endoscopy" }, correct: "C" },
{ question: "What is the name for the area around a magnet where magnetic forces act?", answers: { A: "Electric field", B: "Gravitational field", C: "Magnetic field", D: "Force field" }, correct: "C" }

],
hardest: [
{ question: "In which Scottish city was the first Encyclopedia Britannica printed in 1768?", answers: { A: "Glasgow", B: "Edinburgh", C: "Aberdeen", D: "Dundee" }, correct: "B" },
{ question: "Since 2000, which color has been used in the US to denote states won by Republicans?", answers: { A: "Red", B: "Green", C: "Blue", D: "Yellow" }, correct: "A" },
{ question: "What do we call rocks formed by the deposition of fragments of other rocks?", answers: { A: "Metamorphic", B: "Volcanic", C: "Sedimentary rocks", D: "Crystalline" }, correct: "C" },
{ question: "Which country occupies 47% of the continent it is located on?", answers: { A: "Argentina", B: "Brazil", C: "Colombia", D: "Peru" }, correct: "B" },
{ question: "Which Japanese company created the character Sonic the Hedgehog and the Genesis gaming console?", answers: { A: "Nintendo", B: "Sony", C: "Sega", D: "Capcom" }, correct: "C" },
{ question: "In which city is the neofuturistic skyscraper the Shard, the tallest building in Europe, located?", answers: { A: "London", B: "Paris", C: "Berlin", D: "Madrid" }, correct: "A" },
{ question: "Which two former Yugoslav republics celebrate Statehood Day on the same date (June 25th)?", answers: { A: "BiH and Serbia", B: "Croatia and Slovenia", C: "Macedonia and Montenegro", D: "Serbia and Montenegro" }, correct: "B" },
{ question: "Which three-letter English abbreviation denotes a grill or meat cooked on a grill?", answers: { A: "BBQ", B: "GRL", C: "RIB", D: "FRY" }, correct: "A" },
{ question: "What name is shared by the three-headed dog of Greek mythology and the surname of tennis player Angelique?", answers: { A: "Hydra", B: "Hades", C: "Cerberus", D: "Kerber" }, correct: "D" },
{ question: "Which country, along with Russia, the USA, the UK, and China, makes up the Big Five of the UN Security Council?", answers: { A: "Germany", B: "Italy", C: "Japan", D: "France" }, correct: "D" },
{ question: "Who was named Person of the Year by 'Time' magazine in December 2015?", answers: { A: "Angela Merkel", B: "Donald Trump", C: "Pope Francis", D: "Barack Obama" }, correct: "A" },
{ question: "What is the only chemical element named after a peninsula?", answers: { A: "Germanium", B: "Scandium", C: "Gallium", D: "Indium" }, correct: "B" },
{ question: "Which celestial body was stolen by the villain Gru?", answers: { A: "The Sun", B: "The Moon", C: "Mars", D: "A Star" }, correct: "B" },
{ question: "What is the name of the protective atmospheric layer located at an altitude of 15 to 35 kilometers?", answers: { A: "Mesosphere", B: "Ozone layer", C: "Troposphere", D: "Exosphere" }, correct: "B" },
{ question: "Which gas is most commonly used in advertising lamps to produce a bright orange color?", answers: { A: "Argon", B: "Neon", C: "Helium", D: "Krypton" }, correct: "B" },
{ question: "What is the name of the scientific discipline that studies caves and groundwater?", answers: { A: "Geology", B: "Hydrology", C: "Speleology", D: "Archaeology" }, correct: "C" },
{ question: "In mathematics, what is the number obtained by multiplying all natural numbers from 1 to that number called?", answers: { A: "Exponent", B: "Logarithm", C: "Integral", D: "Factorial" }, correct: "D" },
{ question: "In biology, what is the process of cell aging called?", answers: { A: "Mitosis", B: "Meiosis", C: "Senescence", D: "Apoptosis" }, correct: "C" },
{ question: "Which engine manufacturer won the most consecutive constructors' titles as an engine supplier in the modern era (V6 hybrid era since 2014)?", answers: { A: "Ferrari", B: "Honda", C: "Renault", D: "Mercedes" }, correct: "D" },
{ question: "Which two letters denote the medium hardness of pencils?", answers: { A: "HH", B: "H", C: "BB", D: "HB" }, correct: "D" },
{ question: "What was the first capital of the Roman Empire in the East during the tetrarchy?", answers: { A: "Constantinople", B: "Nicomedia", C: "Antioch", D: "Thessaloniki" }, correct: "B" },
{ question: "Which is the only country in South America where English is the official language?", answers: { A: "Suriname", B: "Guyana", C: "Uruguay", D: "Ecuador" }, correct: "B" },
{ question: "Which element in the periodic table was first discovered on the Sun rather than on Earth?", answers: { A: "Hydrogen", B: "Helium", C: "Neon", D: "Argon" }, correct: "B" },
{ question: "What is the name of the highest mountain (volcano) in the Solar System?", answers: { A: "Mauna Kea", B: "Mt. Montes", C: "Valles Marineris", D: "Olympus Mons" }, correct: "D" },
{ question: "Which Roman emperor was the last ruler of the unified Empire before the 395 AD division?", answers: { A: "Constantine the Great", B: "Justinian I", C: "Valentinian III", D: "Theodosius I" }, correct: "D" },
{ question: "Who was the first scientist to mathematically describe the law of gravitation?", answers: { A: "Galileo Galilei", B: "Albert Einstein", C: "Johannes Kepler", D: "Isaac Newton" }, correct: "D" },
{ question: "Which city was the center of the Ottoman Empire before Istanbul?", answers: { A: "Edirne", B: "Ankara", C: "Bursa", D: "Izmir" }, correct: "C" },
{ question: "Which scientist first proved that the Earth orbits the Sun using a heliocentric model?", answers: { A: "Kepler", B: "Galileo", C: "Copernicus", D: "Newton" }, correct: "C" },
{ question: "Which battle is considered the end of Napoleon's reign?", answers: { A: "Waterloo", B: "Austerlitz", C: "Borodino", D: "Trafalgar" }, correct: "A" },
{ question: "What is the oldest known code of laws in human history?", answers: { A: "Code of Hammurabi", B: "Code of Justinian", C: "Roman Law of the Twelve Tables", D: "Solon's Laws" }, correct: "A" },
{ question: "Which country was the first in the world to establish a central bank?", answers: { A: "England", B: "France", C: "Netherlands", D: "Sweden" }, correct: "D" },
{ question: "Which city was the center of the Abbasid Caliphate during its Golden Age?", answers: { A: "Damascus", B: "Baghdad", C: "Cairo", D: "Cordoba" }, correct: "B" },
{ question: "Which document is the first constitution in the modern sense that is still in force?", answers: { A: "US Constitution", B: "Magna Carta", C: "Napoleonic Code", D: "Declaration of the Rights of Man" }, correct: "A" },
{ question: "Which mathematical problem is one of the Millennium Prize Problems?", answers: { A: "Riemann Hypothesis", B: "Fermat's Theorem", C: "Euler's Bridges Problem", D: "Gauss's Conjecture" }, correct: "A" },
{ question: "What is the name of the hypothesis in astrobiology suggesting that life arrived on Earth via meteorites or comets?", answers: { A: "Abiogenesis", B: "Closed System", C: "Exogenesis", D: "Panspermia" }, correct: "D" },
{ question: "With which magic phrase is the treasure cave opened in the story of Ali Baba?", answers: { A: "Open up", B: "Open Sesame", C: "Treasure, show yourself", D: "Close the door" }, correct: "B" },
{ question: "In which country did the role of the Ombudsman, tasked with protecting citizens from illegal actions by state bodies, originate?", answers: { A: "Norway", B: "Finland", C: "Denmark", D: "Sweden" }, correct: "D" },
{ question: "Which bird has the largest wingspan in the world, reaching up to 3.5 meters?", answers: { A: "Wandering Albatross", B: "Andean Condor", C: "Golden Eagle", D: "Pelican" }, correct: "A" },
{ question: "Which city was the first capital of the Ottoman Empire in Europe?", answers: { A: "Istanbul", B: "Edirne", C: "Bursa", D: "Ankara" }, correct: "B" },
{ question: "Which phenomenon in physics describes the propagation of light as a wave that bends around obstacles?", answers: { A: "Reflection", B: "Refraction", C: "Diffraction", D: "Polarization" }, correct: "C" },
{ question: "Which chemical element was the first to be artificially synthesized in a laboratory (not found naturally)?", answers: { A: "Technetium", B: "Promethium", C: "Neptunium", D: "Uranium" }, correct: "A" },
{ question: "Which civilization was the first to develop the system of zero as a number?", answers: { A: "Egyptians", B: "Mayans", C: "Romans", D: "Greeks" }, correct: "B" },
{ question: "What is the maximum number of characters in a single SMS message using standard GSM encoding?", answers: { A: "120", B: "140", C: "160", D: "200" }, correct: "C" },
{ question: "What is the shortest possible chess game ending in checkmate (known as 'Fool’s Mate') under standard rules?", answers: { A: "1 move", B: "2 moves", C: "3 moves", D: "4 moves" }, correct: "B" },
{ question: "What is the oldest known written law code in history, discovered on Sumerian clay tablets?", answers: { A: "Code of Ur-Nammu", B: "Code of Hammurabi", C: "Code of Justinian", D: "Law of the Twelve Tables" }, correct: "A" },
{ question: "What is the longest official tennis match (Grand Slam history before final set tie-break rule changes)?", answers: { A: "Wimbledon 2010 Isner–Mahut", B: "US Open 2012 Djokovic–Nadal", C: "Roland Garros 2008 Nadal–Federer", D: "Wimbledon 2008 Federer–Roddick" }, correct: "A" },
{ question: "Which athlete holds the record for the most titles won in the MotoGP class (premier class)?", answers: { A: "Valentino Rossi", B: "Marc Márquez", C: "Giacomo Agostini", D: "Mick Doohan" }, correct: "C" },
{ question: "Which athlete was the first to score a hat-trick in a FIFA World Cup final?", answers: { A: "Pelé", B: "Geoff Hurst", C: "Miroslav Klose", D: "Cristiano Ronaldo" }, correct: "B" },
{ question: "Which driver is the only one in modern F1 history to win the title with a team that debuted that same season (2009)?", answers: { A: "Sebastian Vettel", B: "Jenson Button", C: "Lewis Hamilton", D: "Rubens Barrichello" }, correct: "B" },
{ question: "Which chess match is known as the 'Game of the Century' and was played in 1956?", answers: { A: "Fischer–Spassky", B: "Kasparov–Topalov", C: "Byrne–Fischer", D: "Tal–Botvinnik" }, correct: "C" }
]
},

numbers: {
easy: [
{ question: "Which is the largest planet in the Solar System?", answers: { A: "Earth", B: "Saturn", C: "Jupiter", D: "Mars" }, correct: "C" },
{ question: "What is the first video ever uploaded to YouTube?", answers: { A: "Me at the zoo", B: "Hello world", C: "First upload", D: "Intro video" }, correct: "A" },
{ question: "Which object in space has gravity so strong that not even light can escape?", answers: { A: "Black hole", B: "Neutron star", C: "Supernova", D: "Quasar" }, correct: "A" },
{ question: "Which is the only continent without ants?", answers: { A: "Africa", B: "Antarctica", C: "Australia", D: "Europe" }, correct: "B" },
{ question: "What is the most expensive object ever built in human history?", answers: { A: "ISS (International Space Station)", B: "Burj Khalifa", C: "Titanic", D: "LHC Accelerator" }, correct: "A" },
{ question: "Which animal has the longest recorded lifespan?", answers: { A: "Turtle", B: "Whale", C: "Turritopsis jellyfish", D: "Elephant" }, correct: "C" },
{ question: "Which city was the first in the world to reach one million inhabitants?", answers: { A: "Cairo", B: "Baghdad", C: "London", D: "Rome" }, correct: "D" },
{ question: "What was the first website ever created?", answers: { A: "info.cern.ch", B: "google.com", C: "apple.com", D: "yahoo.com" }, correct: "A" },
{ question: "Which animal can regenerate its entire body from a single part?", answers: { A: "Planarian", B: "Snake", C: "Fish", D: "Frog" }, correct: "A" },
{ question: "Which animal has the largest brain relative to its body size?", answers: { A: "Whale", B: "Ant", C: "Dolphin", D: "Elephant" }, correct: "B" },
{ question: "What is the best-selling phone of all time?", answers: { A: "iPhone 5S", B: "Nokia 1100", C: "Samsung S3", D: "iPhone 14 Pro Max" }, correct: "B" },
{ question: "What is the capital of Canada?", answers: { A: "Toronto", B: "Vancouver", C: "Montreal", D: "Ottawa" }, correct: "D" },
{ question: "What is the chemical symbol for gold?", answers: { A: "Au", B: "Ag", C: "Go", D: "Zl" }, correct: "A" },
{ question: "Which city was the seat of the powerful Venetian Republic?", answers: { A: "Venice", B: "Genoa", C: "Rome", D: "Naples" }, correct: "A" },
{ question: "Who was the first European to reach India by sea?", answers: { A: "Vasco da Gama", B: "Magellan", C: "Amerigo Vespucci", D: "Marco Polo" }, correct: "A" },
{ question: "How many legs do all insects have?", answers: { A: "4", B: "6", C: "8", D: "10" }, correct: "B" },
{ question: "In which country did the custom of decorating a Christmas tree originate?", answers: { A: "Germany", B: "Italy", C: "Ireland", D: "USA" }, correct: "A" },
{ question: "Which philosopher is the author of the saying 'I know that I know nothing'?", answers: { A: "Plato", B: "Aristotle", C: "Socrates", D: "Diogenes" }, correct: "C" },
{ question: "In which city were the first Winter Olympic Games held in 1924?", answers: { A: "Chamonix", B: "St. Moritz", C: "Sarajevo", D: "Oslo" }, correct: "A" },
{ question: "In which city is the headquarters of INTERPOL located?", answers: { A: "Lyon", B: "Paris", C: "Brussels", D: "Geneva" }, correct: "A" },
{ question: "Which color in psychology is most often associated with calmness and trust (often used by banks)?", answers: { A: "Red", B: "Yellow", C: "Blue", D: "Purple" }, correct: "C" },
{ question: "Which color is proven to stimulate appetite the most (often used by fast food chains)?", answers: { A: "Green", B: "Blue", C: "Black", D: "Red" }, correct: "D" },
{ question: "What is the right of a head of state to refuse to sign a law called?", answers: { A: "Veto", B: "Amendment", C: "Immunity", D: "Referendum" }, correct: "A" },
{ question: "In what year was the World Wide Web (WWW) network officially launched?", answers: { A: "1979", B: "1984", C: "1989", D: "1994" }, correct: "C" },
{ question: "Which current brings warm water from the Gulf of Mexico toward Europe, softening its climate?", answers: { A: "Mexican Current", B: "Benguela Current", C: "Gulf Stream", D: "American Current" }, correct: "C" },
{ question: "What is the name of the supercontinent that existed about 300 million years ago?", answers: { A: "Gondwana", B: "Pangea", C: "Laurasia", D: "Rodinia" }, correct: "B" },
{ question: "Who wrote the famous play 'Waiting for Godot'?", answers: { A: "Moliere", B: "Henrik Ibsen", C: "Anton Chekhov", D: "Samuel Beckett" }, correct: "D" },
{ question: "What is the name for the textual template of an opera?", answers: { A: "Script", B: "Libretto", C: "Manifesto", D: "Score" }, correct: "B" },
{ question: "From which language does the word 'chocolate' (xocolātl) originate?", answers: { A: "Aztec", B: "Mayan", C: "Quechua", D: "Spanish" }, correct: "A" },
{ question: "Which country is the home of the airline 'Qantas'?", answers: { A: "Canada", B: "South Africa", C: "New Zealand", D: "Australia" }, correct: "D" },
{ question: "Which unit is used to measure magnetic induction?", answers: { A: "Tesla (T)", B: "Weber (Wb)", C: "Farad (F)", D: "Henry (H)" }, correct: "A" },
{ question: "What is the name of the skill of growing miniature trees in containers?", answers: { A: "Ikebana", B: "Bonsai", C: "Feng Shui", D: "Origami" }, correct: "B" },
{ question: "What is the primary function of stomata on plant leaves?", answers: { A: "Water absorption", B: "Sugar storage", C: "Attracting insects", D: "Gas exchange" }, correct: "D" },
{ question: "What name do we call alternative forms of the same gene?", answers: { A: "Chromosomes", B: "Phenotype", C: "Mutations", D: "Alleles" }, correct: "D" },
{ question: "In which city is the famous Bridge of Sighs (Ponte dei Sospiri) located?", answers: { A: "Florence", B: "Paris", C: "Rome", D: "Venice" }, correct: "D" },
{ question: "Which philosopher claimed that at birth the human mind is a 'Tabula rasa' (blank slate)?", answers: { A: "John Locke", B: "Descartes", C: "Kant", D: "Hume" }, correct: "A" },
{ question: "Which ancient philosopher claimed that a happy life is one lived in virtue and the golden mean?", answers: { A: "Aristotle", B: "Socrates", C: "Plato", D: "Epicurus" }, correct: "A" },
{ question: "Which city is the only one in history to have hosted both the Summer (2008) and Winter (2022) Olympic Games?", answers: { A: "Tokyo", B: "Paris", C: "London", D: "Beijing" }, correct: "D" },
{ question: "Which belt in most martial arts denotes a beginner?", answers: { A: "Yellow", B: "White", C: "Green", D: "Black" }, correct: "B" },
{ question: "What is the name for the molten mass that comes out of a volcano while it is still below the Earth's surface?", answers: { A: "Lava", B: "Pyroclast", C: "Basalt", D: "Magma" }, correct: "D" },
{ question: "Which volcano destroyed the city of Pompeii in 79 AD?", answers: { A: "Vesuvius", B: "Etna", C: "Stromboli", D: "Krakatoa" }, correct: "A" },
{ question: "In Chinese mythology, which animal symbolizes power, luck, and the emperor?", answers: { A: "Tiger", B: "Turtle", C: "Phoenix", D: "Dragon" }, correct: "D" },
{ question: "Which composer wrote the music for the ballets 'Swan Lake' and 'The Nutcracker'?", answers: { A: "Stravinsky", B: "Tchaikovsky", C: "Prokofiev", D: "Chopin" }, correct: "B" },
{ question: "What is the name of the legendary creature believed to live in a lake in Scotland?", answers: { A: "Nessie", B: "Bigfoot", C: "Chupacabra", D: "Yeti" }, correct: "A" },
{ question: "How many days are in a leap year?", answers: { A: "365", B: "366", C: "364", D: "367" }, correct: "B" },
{ question: "What is the hardest natural material?", answers: { A: "Gold", B: "Diamond", C: "Iron", D: "Quartz" }, correct: "B" },
{ question: "Which is the largest ocean in the world?", answers: { A: "Atlantic", B: "Indian", C: "Pacific", D: "Arctic" }, correct: "C" },
{ question: "What is the primary language in Brazil?", answers: { A: "Spanish", B: "Portuguese", C: "English", D: "French" }, correct: "B" },
{ question: "Which constant represents the ratio of a circle's circumference to its diameter?", answers: { A: "Euler's number", B: "Golden ratio", C: "Planck's constant", D: "Pi" }, correct: "D" },
{ question: "What is the deepest oceanic trench on Earth?", answers: { A: "Tonga Trench", B: "Philippine Trench", C: "Kuril Trench", D: "Mariana Trench" }, correct: "D" },
{ question: "Which chemical element has the symbol W?", answers: { A: "Wolframium", B: "Vanadium", C: "Wolframid", D: "Tungsten" }, correct: "D" },
{ question: "Which country has the most time zones in the world (including overseas territories)?", answers: { A: "USA", B: "Russia", C: "United Kingdom", D: "France" }, correct: "D" },
{ question: "If the flag of Andorra did not have a coat of arms, it would be identical to the flag of which country?", answers: { A: "Romania", B: "Moldova", C: "Chad", D: "Belgium" }, correct: "A" },
{ question: "After Indonesia, which is the second most populous Muslim-majority country in the world?", answers: { A: "Bangladesh", B: "Pakistan", C: "Iran", D: "Egypt" }, correct: "B" },
{ question: "In Dante's 'Divine Comedy', Hell is divided into 9 circles, and Heaven into how many spheres?", answers: { A: "7", B: "8", C: "9", D: "10" }, correct: "C" },
{ question: "The difference of the squares of the numbers 5 and 3 gives the square of which number?", answers: { A: "2", B: "5", C: "3", D: "4" }, correct: "D" },
{ question: "So-called Legionnaires' disease is actually a severe inflammation of which organ?", answers: { A: "Lungs", B: "Liver", C: "Kidneys", D: "Heart" }, correct: "A" },
{ question: "What is the abbreviation for the British secret service that James Bond works for?", answers: { A: "MI5", B: "MI6", C: "CIA", D: "KGB" }, correct: "B" },
{ question: "Who recorded the infectious song 'Thrift Shop' with Ryan Lewis?", answers: { A: "Drake", B: "Eminem", C: "Macklemore", D: "Kanye West" }, correct: "C" },
{ question: "Which French pilot shot down in WWI is best known as the eponym of a major tennis tournament?", answers: { A: "Napoleon", B: "Charles de Gaulle", C: "Louis Blériot", D: "Roland Garros" }, correct: "D" },
{ question: "To which plant family does the genus of tulips belong?", answers: { A: "Lilies", B: "Roses", C: "Orchids", D: "Grasses" }, correct: "A" },
{ question: "In which circle of Hell did Dante place traitors to relatives, homeland, party, guests, and benefactors?", answers: { A: "Seventh", B: "Ninth", C: "Fifth", D: "Third" }, correct: "B" },
{ question: "Which beast from the dog family has the Latin name 'Vulpes vulpes'?", answers: { A: "Wolf", B: "Dog", C: "Fox", D: "Hyena" }, correct: "C" },
{ question: "From which country is the youngest Nobel Peace Prize winner, who was awarded in 2014?", answers: { A: "India", B: "Iran", C: "Afghanistan", D: "Pakistan" }, correct: "D" },
{ question: "Which film holds the title of the highest-grossing film of all time (without adjusting for inflation)?", answers: { A: "Titanic", B: "Avatar", C: "Avengers: Endgame", D: "Star Wars" }, correct: "B" },
{ question: "In cartography, what is the number indicating the height of a terrain point above or below a certain level called?", answers: { A: "Relief", B: "Elevation (Kota)", B: "Contour line", D: "Slope" }, correct: "B" },
{ question: "Which chemical element is named after the inventor of the periodic table of elements?", answers: { A: "Einsteinium", B: "Curium", C: "Mendelevium", D: "Nobelium" }, correct: "C" },
{ question: "In Serbo-Croatian, which domestic animal can become a 'belt', 'waist', or 'pass in football' by changing the accent?", answers: { A: "Cat", B: "Cow", C: "Horse", D: "Dog (Pas)" }, correct: "D" },
{ question: "What is the Bosnian word for the hungarism 'astal'?", answers: { A: "Table", B: "Bed", C: "Wardrobe", D: "Bench" }, correct: "A" },
{ question: "After which mathematician did Niklaus Wirth name his high-level programming language?", answers: { A: "Newton", B: "Blaise Pascal", C: "Euclid", D: "Descartes" }, correct: "B" },
{ question: "In geography, what do we call the shield built of old rocks in the area of Norway, Sweden, and Finland?", answers: { A: "Alpine Shield", B: "Scandinavian Shield", C: "Baltic Shield", D: "Ural Shield" }, correct: "C" },
{ question: "Which two continents are located entirely within the Earth's Southern Hemisphere?", answers: { A: "Australia and Antarctica", B: "Africa and South America", C: "Australia and Africa", D: "Antarctica and Asia" }, correct: "A" },
{ question: "After the USSR and the USA, which was the third country to independently send a human into Earth's orbit?", answers: { A: "Japan", B: "China", C: "India", D: "France" }, correct: "B" },
{ question: "What is the three-letter acronym for the portable document format developed by Adobe in 1993?", answers: { A: "DOC", B: "TXT", C: "PDF", D: "XLS" }, correct: "C" },
{ question: "Which goddess from Greek mythology is often accompanied and symbolized by a small owl?", answers: { A: "Hera", B: "Artemis", C: "Aphrodite", D: "Athena" }, correct: "D" },
{ question: "Which English word for 'peak' denotes a conference of the highest representatives of certain states?", answers: { A: "Summit", B: "Peak", C: "Top", D: "Crown" }, correct: "A" },
{ question: "According to European legends, how many eyes does a unicorn have?", answers: { A: "1", B: "2", C: "3", D: "4" }, correct: "B" },
{ question: "Which palindromic word describes a mathematical expression with only one term?", answers: { A: "Binomial", B: "Polynomial", C: "Monomial", D: "Trinomial" }, correct: "C" },
{ question: "In which Tim Burton film is Anne Hathaway the White Queen and Johnny Depp the Mad Hatter?", answers: { A: "Sweeney Todd", B: "Charlie and the Chocolate Factory", C: "Corpse Bride", D: "Alice in Wonderland" }, correct: "D" },
{ question: "Which overseas territory features a red fortress and a golden key on its flag?", answers: { A: "Cyprus", B: "Bermuda", C: "Falklands", D: "Gibraltar" }, correct: "D" },
{ question: "Under the license of which German company did the Sarajevo Automobile Factory (TAS) operate?", answers: { A: "BMW", B: "Opel", C: "Volkswagen", D: "Mercedes-Benz" }, correct: "C" },
{ question: "Which Emir Kusturica film won the Palme d'Or at Cannes in 1995?", answers: { A: "Arizona Dream", B: "Underground", C: "When Father Was Away on Business", D: "Time of the Gypsies" }, correct: "B" },
{ question: "What was the name of the animated Homer Simpson's father?", answers: { A: "Abraham Simpson", B: "Herbert Simpson", C: "George Simpson", D: "Peter Simpson" }, correct: "A" },
{ question: "How long does an NBA game last (regulation time)?", answers: { A: "40 minutes", B: "48 minutes", C: "60 minutes", D: "45 minutes" }, correct: "B" },
{ question: "Which geometric shape gets its name from the Greek word for a small table?", answers: { A: "Trapezium", B: "Prism", C: "Pyramid", D: "Cube" }, correct: "A" },
{ question: "Which airline owned flight MH17, which was shot down over Ukraine in 2014?", answers: { A: "Lufthansa", B: "Malaysia Airlines", C: "KLM", D: "Aeroflot" }, correct: "B" },
{ question: "What is the Italian term for a completely calm sea with no wind?", answers: { A: "Bonaccia", B: "Mare calma", C: "Aqua mare", D: "Quieto mare" }, correct: "A" },
{ question: "What is the maximum number of points that can be scored in a single throw (three arrows) in darts?", answers: { A: "150", B: "180", C: "200", D: "100" }, correct: "B" },
{ question: "From which city does the football club Crystal Palace come?", answers: { A: "Manchester", B: "London", C: "Liverpool", D: "Birmingham" }, correct: "B" },
{ question: "How many strings does a standard classical guitar have?", answers: { A: "4", B: "5", C: "6", D: "7" }, correct: "C" },
{ question: "How many seconds does one full rotation of the Earth relative to the Sun last (approximately, one day)?", answers: { A: "86,400", B: "84,600", C: "88,200", D: "82,800" }, correct: "A" },
{ question: "How many hours long is one day on Jupiter, the fastest-rotating planet in the Solar System?", answers: { A: "100 hours", B: "50 hours", C: "24 hours", D: "10 hours" }, correct: "D" },
{ question: "How many days long is one year on the planet Mercury (closest to the Sun)?", answers: { A: "88 days", B: "200 days", C: "365 days", D: "500 days" }, correct: "A" },
{ question: "How many keys (black and white combined) does a standard concert piano have?", answers: { A: "54", B: "66", C: "88", D: "102" }, correct: "C" },
{ question: "How many countries originally founded the United Nations in 1945?", answers: { A: "41", B: "51", C: "57", D: "67" }, correct: "B" },
{ question: "How many countries founded the NATO alliance in 1949?", answers: { A: "12", B: "25", C: "5", D: "30" }, correct: "A" },
{ question: "How many kilometers long is the Earth's equator (approximately)?", answers: { A: "60,075 km", B: "30,075 km", C: "50,075 km", D: "40,075 km" }, correct: "D" },
{ question: "How many vertebrae (bones) make up the human spine?", answers: { A: "15", B: "20", C: "33", D: "50" }, correct: "C" },
{ question: "How many countries are members of the NATO alliance (as of 2024/2025)?", answers: { A: "42", B: "12", C: "22", D: "32" }, correct: "D" },
{ question: "Which chemical element similar to lead has the atomic symbol Tl?", answers: { A: "Titanium", B: "Thorium", C: "Tellurium", D: "Thallium" }, correct: "D" }



],
hard: [
{ question: "Which animal did the Little Prince tame in 'The Little Prince'?", answers: { A: "A wolf", B: "A fox", C: "A dog", D: "A rabbit" }, correct: "B" },
{ question: "In biology, what denotes the liquid part of blood, and in physics, a state of completely ionized matter?", answers: { A: "Serum", B: "Lymph", C: "Plasma", D: "Electrolyte" }, correct: "C" },
{ question: "Who is the last person from the USA to be awarded the Nobel Peace Prize?", answers: { A: "Jimmy Carter", B: "Al Gore", C: "Joe Biden", D: "Barack Obama" }, correct: "D" },
{ question: "How many hurdles are in the path of athletes in a 110 m hurdles race?", answers: { A: "10", B: "11", C: "12", D: "9" }, correct: "A" },
{ question: "Which planet in the Solar System rotates backwards?", answers: { A: "Mars", B: "Venus", C: "Uranus", D: "Neptune" }, correct: "B" },
{ question: "What is the only bird that can fly backwards?", answers: { A: "Swallow", B: "Falcon", C: "Hummingbird", D: "Crow" }, correct: "C" },
{ question: "Which US state is the only North American indigenous long-haired cat breed named after?", answers: { A: "Maine", B: "Alaska", C: "Texas", D: "Oregon" }, correct: "A" },
{ question: "In which gulf did the largest oil spill in history occur in April 2010?", answers: { A: "Persian Gulf", B: "Gulf of Mexico", C: "Bay of Bengal", D: "Gulf of Oman" }, correct: "B" },
{ question: "In which season is the Tour de France bicycle race held?", answers: { A: "Spring", B: "Autumn", C: "Winter", D: "Summer" }, correct: "D" },
{ question: "Which number is in the title of Umberto Eco's last novel from 2015?", answers: { A: "One", B: "Two", C: "Three", D: "Zero" }, correct: "D" },
{ question: "Which player holds the record for the most NBA rings won?", answers: { A: "Michael Jordan", B: "Kobe Bryant", C: "Bill Russell", D: "LeBron James" }, correct: "C" },
{ question: "Which European island nation is advertised in tourist brochures as the 'Land of Fire and Ice'?", answers: { A: "Ireland", B: "Iceland", C: "Malta", D: "Cyprus" }, correct: "B" },
{ question: "Which body fluid is secreted by the lacrimal glands?", answers: { A: "Sweat", B: "Blood", C: "Tears", D: "Saliva" }, correct: "C" },
{ question: "The largest US state, Alaska, was admitted to the union as which number state?", answers: { A: "47th", B: "48th", C: "49th", D: "50th" }, correct: "C" },
{ question: "Anetoderma is a condition that affects which organ of the human body?", answers: { A: "Heart", B: "Lungs", C: "Liver", D: "Skin" }, correct: "D" },
{ question: "Which capital city is led by Sadiq Khan, a Sunni Muslim originally from Pakistan?", answers: { A: "Berlin", B: "Madrid", C: "Cardiff", D: "London" }, correct: "D" },
{ question: "Which dish is the cause of the accidental kiss in the Disney classic 'Lady and the Tramp'?", answers: { A: "Pizza", B: "Hamburger", C: "Doner", D: "Spaghetti" }, correct: "D" },
{ question: "What was the surname of the ballerina Anna after whom the cake made of sugar, egg whites, whipped cream, and strawberries was named?", answers: { A: "Kirova", B: "Pavlova", C: "Nijinska", D: "Volkova" }, correct: "B" },
{ question: "The authorization that representatives receive from voters to represent them in parliament is called a representative — what?", answers: { A: "Mandate", B: "Decree", C: "Amendment", D: "Statute" }, correct: "A" },
{ question: "Which country is the home of Hello Kitty?", answers: { A: "Japan", B: "China", C: "South Korea", D: "Thailand" }, correct: "A" },
{ question: "In which part of the United Kingdom is the city of Londonderry located?", answers: { A: "Scotland", B: "Wales", C: "England", D: "Northern Ireland" }, correct: "D" },
{ question: "Which American city is the three-inch deep-dish pizza, where ingredients are layered both inside and on the surface, named after?", answers: { A: "New York", B: "Los Angeles", C: "Chicago", D: "Boston" }, correct: "C" },
{ question: "Which plastic toy is the subject of Aqua's big hit from 1997?", answers: { A: "Barbie doll", B: "Teddy Bear", C: "Lego blocks", D: "Playmobil" }, correct: "A" },
{ question: "Which third-largest Australian city is the capital of Queensland?", answers: { A: "Sydney", B: "Melbourne", C: "Brisbane", D: "Perth" }, correct: "C" },
{ question: "How many torches were on the coat of arms of the SFRY from 1963 onwards?", answers: { A: "5", B: "6", C: "7", D: "8" }, correct: "B" },
{ question: "In which city is the headquarters of the European Central Bank (ECB) located?", answers: { A: "Brussels", B: "Paris", C: "Frankfurt", D: "Strasbourg" }, correct: "C" },
{ question: "Which country is the home of the martial art Krav Maga?", answers: { A: "Japan", B: "Israel", C: "China", D: "Thailand" }, correct: "B" },
{ question: "What is the curved line called along which planets move around the Sun?", answers: { A: "Parabola", B: "Circle", C: "Ellipse", D: "Hyperbola" }, correct: "C" },
{ question: "What is the study of bees called?", answers: { A: "Apiology", B: "Myrmecology", C: "Arachnology", D: "Ecology" }, correct: "A" },
{ question: "What is the name of the science that studies the origin and meaning of words?", answers: { A: "Onomastics", B: "Lexicology", C: "Semantics", D: "Etymology" }, correct: "D" },
{ question: "In music theory, what is the eight-tone interval between two notes of the same name called?", answers: { A: "Fifth", B: "Third", C: "Octave", D: "Fourth" }, correct: "C" },
{ question: "Which is the largest and deepest ocean on planet Earth?", answers: { A: "Atlantic Ocean", B: "Indian Ocean", C: "Arctic Ocean", D: "Pacific Ocean" }, correct: "D" },
{ question: "In Norse mythology, what is the name of the god Thor's famous hammer?", answers: { A: "Gungnir", B: "Excalibur", C: "Yggdrasil", D: "Mjolnir" }, correct: "D" },
{ question: "Which chemical element makes up most of the Sun's mass?", answers: { A: "Hydrogen", B: "Helium", C: "Oxygen", D: "Carbon" }, correct: "A" },
{ question: "In optics, what is the term for the bending of light as it passes from one medium to another?", answers: { A: "Reflection", B: "Refraction", C: "Diffraction", D: "Dispersion" }, correct: "B" },
{ question: "What was the original character limit for a single post on the social network Twitter (now X)?", answers: { A: "100", B: "140", C: "280", D: "500" }, correct: "B" },
{ question: "What was the name of the first publicly available web browser that popularized the World Wide Web in 1993?", answers: { A: "Google Chrome", B: "Internet Explorer", C: "Mosaic", D: "Firefox" }, correct: "C" },
{ question: "How many Academy Awards did the movie 'Titanic' win?", answers: { A: "9", B: "10", C: "11", D: "12" }, correct: "C" },
{ question: "Which country won the 1992 European Championship despite not initially qualifying?", answers: { A: "Denmark", B: "Netherlands", C: "Germany", D: "Sweden" }, correct: "A" },
{ question: "What kind of oriental head covering is worn by the figure in Vermeer's 'Girl with a Pearl Earring'?", answers: { A: "Cap", B: "Scarf", C: "Hat", D: "Turban" }, correct: "D" },
{ question: "What is in the mouth of the sailor silhouette on the Sampdoria football club crest?", answers: { A: "Cigarette", B: "Pipe", C: "Knife", D: "Book" }, correct: "B" },
{ question: "In which long-running anime series do we follow the adventures of the powerful alien Goku?", answers: { A: "Naruto", B: "One Piece", C: "Bleach", D: "Dragon Ball" }, correct: "D" },
{ question: "In which year did the EU experience its fifth and largest expansion, with 10 countries joining?", answers: { A: "2000", B: "2002", C: "2004", D: "2006" }, correct: "C" },
{ question: "To what number did the periodic table grow with the addition of 4 new elements at the end of 2015?", answers: { A: "116", B: "117", C: "118", D: "120" }, correct: "C" },
{ question: "Which training device provides conditions similar to those experienced when driving a car or flying a plane?", answers: { A: "Simulator", B: "Generator", C: "Compressor", D: "Apparatus" }, correct: "A" },
{ question: "Which fighting video game series has a name that translates from Japanese as 'Iron Fist'?", answers: { A: "Street Fighter", B: "Mortal Kombat", C: "Tekken", D: "Dead or Alive" }, correct: "C" },
{ question: "What is the nationality of the highest-scoring European player in NBA history?", answers: { A: "French", B: "Spanish", C: "Serbian", D: "German" }, correct: "D" },
{ question: "What is the name of Italy's second-tier football league?", answers: { A: "Serie A", B: "Serie C", C: "Coppa Italia", D: "Serie B" }, correct: "D" },
{ question: "Which was the first Euro championship in which 24 national teams participated?", answers: { A: "Euro 2008", B: "Euro 2012", C: "Euro 2016", D: "Euro 2020" }, correct: "C" },
{ question: "Which Caucasian country features five crosses on its flag?", answers: { A: "Armenia", B: "Georgia", C: "Azerbaijan", D: "Moldova" }, correct: "B" }
],
hardest: [
{ question: "What happens to our peripheral blood vessels due to cold?", answers: { A: "They expand", B: "They burst", C: "They disappear", D: "They constrict" }, correct: "D" },
{ question: "Which city is home to the zoo with the largest number of animal species in the world?", answers: { A: "Paris", B: "London", C: "Berlin", D: "Vienna" }, correct: "C" },
{ question: "Translated into English, what would be the names of the French newspaper 'Le Monde' and the German newspaper 'Die Welt'?", answers: { A: "Earth", B: "Europe", C: "People", D: "World" }, correct: "D" },
{ question: "What does the letter H stand for in the abbreviation 'pH', the number used to measure acidity or alkalinity?", answers: { A: "Hydrogen", B: "Helium", C: "Chlorine", D: "Hematite" }, correct: "A" },
{ question: "What is the deepest female voice in the classification of the three basic types?", answers: { A: "Soprano", B: "Mezzo-soprano", C: "Tenor", D: "Alto" }, correct: "D" },
{ question: "According to Greek myth, which city was founded by Cadmus and destroyed by Alexander the Great?", answers: { A: "Athens", B: "Thebes", C: "Sparta", D: "Corinth" }, correct: "B" },
{ question: "Which string instrument from the Dinaric region usually has one or two strings made of horsehair?", answers: { A: "Šargija", B: "Gusle", C: "Tamburica", D: "Lijerica" }, correct: "B" },
{ question: "Which name is shared by a billiard cue and the Italianism for a high heel?", answers: { A: "Patina", B: "Talon", C: "Tak", D: "Heel" }, correct: "C" },
{ question: "How many players from one team are on the court at the same time in basketball?", answers: { A: "4", B: "5", C: "6", D: "7" }, correct: "B" },
{ question: "Which national team is the only one to have won the World Cup three times in a row?", answers: { A: "Brazil", B: "Italy", C: "Germany", D: "None" }, correct: "D" },
{ question: "Which 190 km long island is the largest island in the US state of New York?", answers: { A: "Staten Island", B: "Manhattan", C: "Brooklyn", D: "Long Island" }, correct: "D" },
{ question: "Who is known in the world of snooker as 'The Rocket' due to his fast and attractive playing style?", answers: { A: "Ronnie O’Sullivan", B: "Stephen Hendry", C: "Mark Selby", D: "Judd Trump" }, correct: "A" },
{ question: "Which word from the French language refers to a painter's workshop?", answers: { A: "Studio", B: "Atelier", C: "Workshop", D: "Gallery" }, correct: "B" },
{ question: "To which protein in red blood cells does carbon monoxide bind 20 times faster than oxygen?", answers: { A: "Myoglobin", B: "Keratin", C: "Fibrinogen", D: "Hemoglobin" }, correct: "D" },
{ question: "In which discipline did Japan's Noriaki Kasai compete a record 7 times at the Winter Olympics?", answers: { A: "Swimming", B: "Biathlon", C: "Cross-country skiing", D: "Ski jumping" }, correct: "D" },
{ question: "Which country has organized the Summer Olympic Games four times?", answers: { A: "USA", B: "France", C: "Greece", D: "Japan" }, correct: "A" },
{ question: "Which largest and northernmost region of Finland occupies more than a quarter of the country's total area?", answers: { A: "Uusimaa", B: "Lapland", C: "Savo", D: "Ostrobothnia" }, correct: "B" },
{ question: "Which sport did astronaut Alan Shepard play on the Moon on February 6, 1971?", answers: { A: "Tennis", B: "Basketball", C: "Baseball", D: "Golf" }, correct: "D" },
{ question: "How many minutes does one quarter of a game last in European basketball?", answers: { A: "11", B: "8", C: "12", D: "10" }, correct: "D" },
{ question: "How many black keys does a standard concert piano have?", answers: { A: "34", B: "36", C: "38", D: "40" }, correct: "B" },
{ question: "How many white keys does a standard concert piano have?", answers: { A: "44", B: "48", C: "50", D: "52" }, correct: "D" },
{ question: "Which is the longest river that flows entirely through a single country?", answers: { A: "Nile", B: "Amazon", C: "Yangtze", D: "Yellow River" }, correct: "C" },
{ question: "Which part of the brain is considered responsible for movement coordination, balance, and fine motor skills?", answers: { A: "Thalamus", B: "Hypothalamus", C: "Cerebellum", D: "Medulla oblongata" }, correct: "C" },
{ question: "In linguistics, what is the smallest unit of meaning in a language called (not necessarily a whole word)?", answers: { A: "Phoneme", B: "Grapheme", C: "Morpheme", D: "Lexeme" }, correct: "C" },
{ question: "Which was the world's first operational nuclear power plant, which began operating in 1954 in the USSR?", answers: { A: "Obninsk", B: "Chernobyl", C: "Kozloduy", D: "Zaporizhzhia" }, correct: "A" },
{ question: "Which animal is the fastest in water, reaching speeds of over 100 kilometers per hour?", answers: { A: "Blue shark", B: "Blue whale", C: "Sailfish", D: "Dolphin" }, correct: "C" },
{ question: "Which substance has the lowest boiling point of all known elements (-268.9 °C)?", answers: { A: "Hydrogen", B: "Neon", C: "Helium", D: "Nitrogen" }, correct: "C" },
{ question: "Which composer wrote the opera 'Fidelio', his only opera, on which he worked for over ten years?", answers: { A: "Mozart", B: "Wagner", C: "Verdi", D: "Beethoven" }, correct: "D" },
{ question: "In which Italian city is St. Mark's Basilica located, famous for its Byzantine mosaics?", answers: { A: "Rome", B: "Florence", C: "Venice", D: "Milan" }, correct: "C" },
{ question: "Which chemical element was named after a mythical character condemned to eternal thirst and hunger in water that would recede whenever he tried to drink?", answers: { A: "Promethium", B: "Sisyphus", C: "Tantalum", D: "Titanium" }, correct: "C" },
{ question: "Which is the only landlocked country in the world that is entirely surrounded by the territory of only one other country (an enclave), other than San Marino or Vatican City?", answers: { A: "Lesotho", B: "Eswatini", C: "Andorra", D: "Monaco" }, correct: "A" },
{ question: "Which strait is located between Tierra del Fuego and Antarctica, and is considered the stormiest sea in the world?", answers: { A: "Drake Passage", B: "Strait of Magellan", C: "Cook Strait", D: "Bering Strait" }, correct: "A" },
{ question: "What is the name of the process by which plants release excess water in the form of droplets through pores on the edges of leaves (not to be confused with dew)?", answers: { A: "Transpiration", B: "Guttation", C: "Osmosis", D: "Photosynthesis" }, correct: "B" },
{ question: "Who is the only Nobel Prize in Literature winner who also won an Oscar for his screenplay?", answers: { A: "George Bernard Shaw", B: "Ernest Hemingway", C: "Jean-Paul Sartre", D: "Samuel Beckett" }, correct: "A" },
{ question: "Which ancient mathematician was the first to fairly accurately calculate the circumference of the Earth using shadows in two different cities?", answers: { A: "Thales", B: "Eratosthenes", C: "Archimedes", D: "Euclid" }, correct: "B" },
{ question: "What is the name of the most distant man-made object from Earth, currently located in interstellar space?", answers: { A: "Pioneer 10", B: "Voyager 1", C: "Voyager 2", D: "New Horizons" }, correct: "B" },
{ question: "Which chemical element with atomic number 118 is located at the very end of the current periodic table?", answers: { A: "Oganesson", B: "Tennessine", C: "Livermorium", D: "Moscovium" }, correct: "A" },
{ question: "What is the rarest blood type in the world, also known as 'Golden Blood,' possessed by fewer than 50 people?", answers: { A: "AB negative", B: "O negative", C: "Rh-null", D: "Bombay phenotype" }, correct: "C" },
{ question: "Which animal was the first living species to orbit the Moon and successfully return to Earth (Zond 5 mission)?", answers: { A: "Dog", B: "Monkey", C: "Turtle", D: "Rat" }, correct: "C" },
{ question: "How many days long is one year on the planet Mars (approximately)?", answers: { A: "365", B: "687", C: "424", D: "780" }, correct: "B" },
{ question: "How many bones are in the human skull (adult)?", answers: { A: "22", B: "24", C: "26", D: "28" }, correct: "A" },
{ question: "How many minutes does one hockey period last in the NHL?", answers: { A: "15", B: "18", C: "20", D: "25" }, correct: "C" },
{ question: "What is the first general-purpose programmable computer in history?", answers: { A: "ENIAC", B: "Z3", C: "UNIVAC I", D: "Colossus" }, correct: "B" },
{ question: "Which animal has the largest brain-to-body size ratio in the marine world?", answers: { A: "Dolphin", B: "Octopus", C: "Killer whale", D: "Shark" }, correct: "B" },
{ question: "Which city was a major center of the Maya civilization on the Yucatan Peninsula?", answers: { A: "Teotihuacan", B: "Chichen Itza", C: "Tikal", D: "Monte Alban" }, correct: "B" },
{ question: "What is the largest known prime number discovered by the beginning of 2025?", answers: { A: "2^136279841 - 1", B: "2^82589933 - 1", C: "2^77232917 - 1", D: "2^61 - 1" }, correct: "A" },
{ question: "Which book is considered the first book printed using movable metal type in Europe?", answers: { A: "Gutenberg Bible", B: "Quran", C: "Iliad", D: "Mahabharata" }, correct: "A" },
{ question: "Which scientist first performed the pendulum experiment that proved the Earth's rotation?", answers: { A: "Newton", B: "Galileo", C: "Foucault", D: "Kepler" }, correct: "C" },
{ question: "What is the longest nerve in the human body?", answers: { A: "Sciatic nerve", B: "Optic nerve", C: "Vagus nerve", D: "Radial nerve" }, correct: "A" },
{ question: "Which of the following metals has the lowest melting point after mercury?", answers: { A: "Gallium", B: "Francium", C: "Zinc", D: "Cesium" }, correct: "D" }
]
}
},

ge: {
	

history: {
easy: [
{ question: "Koliko je godina imao Neil Armstrong kad je hodao po Mjesecu?", answers: { A: "67", B: "21", C: "36", D: "38" }, correct: "D" },
{ question: "Kako se zove valuta koja se koristi u Japanu?", answers: { A: "Juan", B: "Von", C: "Japanski Von", D: "Jen" }, correct: "D" },
{ question: "Koji je hemijski element Marie Curie nazvala po svojoj domovini kako bi skrenula pažnju na to da ona u to vrijeme nije bila nezavisna država?", answers: { A: "Germanij", B: "Francij", C: "Polonij", D: "Europij" }, correct: "C" },
{ question: "Koje su boje dva slova G u Googleovom logu?", answers: { A: "Plave", B: "Crvene", C: "Žute", D: "Zelene" }, correct: "A" },
{ question: "Koliko sekundi traje svjetlosti da pređe udaljenost od Mjeseca do Zemlje (približno)?", answers: { A: "0.5", B: "1.3", C: "2.0", D: "3.5" }, correct: "B" },
{ question: "Koliko sekundi bi svjetlosti trebalo da obiđe oko Zemlje na ekvatoru (sedam i po krugova)?", answers: { A: "0.13", B: "1.5", C: "5.0", D: "10.0" }, correct: "A" },
{ question: "Koliko država u Aziji ima direktan izlaz na more ili okean?", answers: { A: "26", B: "36", C: "16", D: "46" }, correct: "B" },
{ question: "Kako se zove popis književnih djela koja su učenici, prema nastavnom planu obavezni pročitati?", answers: { A: "Syllabus", B: "Lektira", C: "Kanon", D: "Plan čitanja" }, correct: "B" },
{ question: "Koji grad u BiH je poznat kao ‘grad soli’?", answers: { A: "Zenica", B: "Tuzla", C: "Bihać", D: "Prijedor" }, correct: "B" },
{ question: "Koja država je prva priznala nezavisnost Bosne i Hercegovine 15. januara 1992. godine?", answers: { A: "Njemačka", B: "SAD", C: "Turska", D: "Bugarska" }, correct: "D" },
{ question: "Koja planina je najviša u Bosni i Hercegovini?", answers: { A: "Prenj", B: "Maglić", C: "Vranica", D: "Treskavica" }, correct: "B" },
{ question: "Koji element ima najveći atomski broj koji se prirodno pojavljuje u Zemljinoj kori u značajnijim količinama?", answers: { A: "Uranij", B: "Plutonij", C: "Radon", D: "Radij" }, correct: "A" },
{ question: "Koja je jedina država na svijetu koja nema službenu prijestolnicu?", answers: { A: "Nauru", B: "Palau", C: "Island", D: "Monako" }, correct: "A" },
{ question: "Koja država ima najviše granica s drugim državama u svijetu (čak 14)?", answers: { A: "Njemačka", B: "Švicarska", C: "Brazil", D: "Kina" }, correct: "D" },
{ question: "Koji je reper glavni lik u polu-autobiografskom filmu „8 milja“?", answers: { A: "Drake", B: "50 Cent", C: "Snoop Dogg", D: "Eminem" }, correct: "D" },
{ question: "Koja se mjerna jedinica SI sistema može nazvati i kilogram-metar u sekundi na kvadrat?", answers: { A: "Džul", B: "Njutn", C: "Paskal", D: "Vat" }, correct: "B" },
{ question: "Otac kojeg je dramskog junaka ubijen za popodnevnog drijemeža otrovom ulivenim u uho?", answers: { A: "Fortinbrasa", B: "Laerta", C: "Hamleta", D: "Othella" }, correct: "C" },
{ question: "Koja dvoslovna kratica u Velikoj Britaniji označava vrijeme prije podneva?", answers: { A: "GMT", B: "PM", C: "AM", D: "UTC" }, correct: "C" },
{ question: "U kojem je od 5 njujorških upravnih područja smješten Greenwich village?", answers: { A: "Brooklynu", B: "Manhattanu", C: "Queensu", D: "Bronxu" }, correct: "B" },
{ question: "Ljetno računanje vremena u Europskoj Uniji počinje posljednje nedjelje kojeg mjeseca?", answers: { A: "Aprila", B: "Maja", C: "Marta", D: "Juna" }, correct: "C" },
{ question: "Kojoj porodici sisavaca pripadaju zebre?", answers: { A: "Antilopama", B: "Govedima", C: "Konjima", D: "Magarcima" }, correct: "C" },
{ question: "Koliko država u Evropi su punopravne članice UN-a?", answers: { A: "60", B: "36", C: "40", D: "44" }, correct: "D" },
{ question: "Koliko međunarodno priznatih država ima Afrika?", answers: { A: "85", B: "75", C: "64", D: "54" }, correct: "D" },
{ question: "Koliko suverenih država se nalazi u Aziji prema UN klasifikaciji?", answers: { A: "28", B: "38", C: "48", D: "58" }, correct: "C" },
{ question: "Koliko međunarodno priznatih suverenih država ima Sjeverna Amerika (uključujući Karibe i Centralnu Ameriku)?", answers: { A: "23", B: "21", C: "19", D: "25" }, correct: "A" },
{ question: "Koliko država ima Južna Amerika?", answers: { A: "10", B: "12", C: "14", D: "16" }, correct: "B" },
{ question: "Koliko međunarodno priznatih država se nalazi u regiji Australije i Okeanije?", answers: { A: "10", B: "14", C: "12", D: "8" }, correct: "B" },
{ question: "Radnja koje se drame odvija u božićno vrijeme u kući bankovnog činovnika Torvalda Helmera?", answers: { A: "Hedda Gabler", B: "Nora", C: "Gospođa ministarka", D: "Anna Karenina" }, correct: "B" },
{ question: "Kojim je metalom financirana flota kojom su Atenjanini porazili Perzijance kod Salamine?", answers: { A: "Srebrom", B: "Zlatom", C: "Bakarom", D: "Željezom" }, correct: "A" },
{ question: "Ime kojeg geometrijskog tijela dolazi od starogrčke riječi za stolić?", answers: { A: "Prizma", B: "Kocka", C: "Piramida", D: "Trapeza" }, correct: "D" },
{ question: "Velšanin Ian Rush je, s 346 golova, najbolji strijelac u povijesti-kojeg kluba?", answers: { A: "Liverpoola", B: "Manchester Uniteda", C: "Arsenala", D: "Chelsea" }, correct: "A" },
{ question: "Kojem je fikcijskom doktoru najbolji prijatelj onkolog James Wilson?", answers: { A: "Dr.Watsonu", B: "Dr.Houseu", C: "Dr.Strangeu", D: "Dr.McCoyu" }, correct: "B" },
{ question: "Kako se zove novčana jedinica u Turskoj?", answers: { A: "Turski dirhem", B: "Dinar", C: "Lira", D: "Euro" }, correct: "C" },
{ question: "Ime koje bolesti jetre dolazi od grčke riječi za „narančasto-žut“?", answers: { A: "Viroza", B: "Hepatitis", C: "Steatoza", D: "Ciroza" }, correct: "D" },
{ question: "Kojim se slovom engleske abecede u matematici označava skup racionalnih brojeva?", answers: { A: "R", B: "Q", C: "Z", D: "N" }, correct: "B" },
{ question: "Koji bend na prvom albumu pjeva o Seleni,Šekiju,Seji i Abidu?", answers: { A: "Parni Valjak", B: "Indexi", C: "Bijelo dugme", D: "Zabranjeno pušenje" }, correct: "D" },
{ question: "Koja je država čiji naziv na latinskom znači „Južna zemlja“ šesta najveća na svijetu?", answers: { A: "Australija", B: "Južna Afrika", C: "Antartik", D: "Artik" }, correct: "A" },
{ question: "U kojoj se američkoj saveznoj državi nalazi Denali, najviši vrh SAD-a?", answers: { A: "Nevadi", B: "Aljasci", C: "Coloradu", D: "Montani" }, correct: "B" },
{ question: "Koja nukleinska kiselina sadrži bazu uracil?", answers: { A: "tRNA", B: "DNK", C: "RNK", D: "mRNA" }, correct: "C" },
{ question: "Za vrijeme puberteta tijelo naglo raste djelovanjem kojih hemijskih tvari?", answers: { A: "Minerala", B: "Enzima", C: "Vitamina", D: "Hormona" }, correct: "D" },
{ question: "Kojem je boksaču 1967 oduzeta titula jer je odbio služiti u Vijetnamskom ratu?", answers: { A: "Mike Tysonu", B: "George Foremanu", C: "Muhamedu Aliju", D: "Joe Frazieru" }, correct: "C" },
{ question: "U koje more utječu rijeka Wisla,Odra i Neva?", answers: { A: "Baltičko", B: "Crno", C: "Sjeverno", D: "Egejsko" }, correct: "A" }, 
{ question: "Koji je prvi planet otkriven teleskopom jedini nazvan po grčkom, a ne po rimskom bogu?", answers: { A: "Uran", B: "Neptun", C: "Pluton", D: "Saturn" }, correct: "A" },
{ question: "Koju je afričku državu Napoleon I. osvojio 1798?", answers: { A: "Alžir", B: "Egipat", C: "Libija", D: "Maroko" }, correct: "B" },
{ question: "Koji je jedini planet sunčeva sustava čije ime počinje i završava istim slovom?", answers: { A: "Neptun", B: "Uran", C: "Saturn", D: "Venera" }, correct: "A" },
{ question: "Peninske alpe se nalaze u Švicarskoj i Italiji, a Peninsko gorje u kojoj državi?", answers: { A: "Velikoj Britaniji", B: "Irskoj", C: "Norveškoj", D: "Škotskoj" }, correct: "A" },
{ question: "Na logu koje je talijanske modne tvrtke stilizirani lik mitološke meduze?", answers: { A: "Gucci", B: "Versace", C: "Prada", D: "Armani" }, correct: "B" },
{ question: "Koliko država ima izlaz na Jadransko more?", answers: { A: "5", B: "6", C: "7", D: "8" }, correct: "B" },
{ question: "Koja država ima najviše ostrva na svijetu (preko 220.000)?", answers: { A: "Indonezija", B: "Filipini", C: "Švedska", D: "Grčka" }, correct: "C" },
{ question: "Koji je najmanji kontinent po površini?", answers: { A: "Evropa", B: "Australija", C: "Južna Amerika", D: "Antarktika" }, correct: "B" },
{ question: "Kroz koliko država protiče rijeka Dunav?", answers: { A: "6-7", B: "8", C: "9", D: "10" }, correct: "D" },
{ question: "Koja je najviša planina u Africi?", answers: { A: "Kilimandžaro", B: "Atlas", C: "Kenija", D: "Stenli" }, correct: "A" },
{ question: "Ko drži rekord za najviše postignutih poena u historiji NBA lige (preko 43000+ koševa)?", answers: { A: "Michael Jordan", B: "Kareem Abdul-Jabbar", C: "LeBron James", D: "Kobe Bryant" }, correct: "C" },
{ question: "Koliko minuta traje produžetak u fudbalskoj utakmici (dva poluvremena po koliko)?", answers: { A: "10 min", B: "15 min", C: "20 min", D: "5 min" }, correct: "B" },
{ question: "Koji teniser ima najviše osvojenih trofeja na Roland Garrosu?", answers: { A: "Novak Đoković", B: "Roger Federer", C: "Bjorn Borg", D: "Rafael Nadal" }, correct: "D" },
{ question: "Koje godine je održano prvo Svjetsko prvenstvo u fudbalu?", answers: { A: "1920", B: "1930", C: "1940", D: "1916" }, correct: "B" },
{ question: "U kojem sportu se koristi termin 'hole-in-one'?", answers: { A: "Golf", B: "Tenis", C: "Bilijar", D: "Pikado" }, correct: "A" },
{ question: "Koja pjevačica ima nadimak 'Queen Bey'?", answers: { A: "Beyoncé", B: "Madonna", C: "Rihanna", D: "Adele" }, correct: "A" },
{ question: "Iz koje države dolazi grupa ABBA?", answers: { A: "Norveške", B: "Danske", C: "Finske", D: "Švedske" }, correct: "D" },
{ question: "Koja država je najveći proizvođač kafe na svijetu?", answers: { A: "Etiopija", B: "Kolumbija", C: "Brazil", D: "Vijetnam" }, correct: "C" },
{ question: "Kako se zove meksički umak od avokada?", answers: { A: "Salsa", B: "Humus", C: "Guacamole", D: "Pesto" }, correct: "C" },
{ question: "Koji začin je najskuplji na svijetu po težini?", answers: { A: "Vanilija", B: "Šafran", C: "Kardamom", D: "Biber" }, correct: "B" },
{ question: "Koji film je osvojio Oskara za najbolji film 2024. godine?", answers: { A: "Barbie", B: "Oppenheimer", C: "Poor Things", D: "Dune 2" }, correct: "B" },
{ question: "Kako se zove glavni grad u seriji 'Game of Thrones'?", answers: { A: "Winterfell", B: "Dragonstone", C: "King's Landing", D: "Braavos" }, correct: "C" },
{ question: "Ko je režirao filmove 'Inception', 'Interstellar' i 'The Dark Knight'?", answers: { A: "Steven Spielberg", B: "Quentin Tarantino", C: "Martin Scorsese", D: "Christopher Nolan" }, correct: "D" },
{ question: "Koji glumac tumači lik Iron Mana u Marvelovim filmovima?", answers: { A: "Chris Evans", B: "Robert Downey Jr.", C: "Chris Hemsworth", D: "Tom Holland" }, correct: "B" },
{ question: "Kako se zove fiktivni grad u kojem žive Simpsoni?", answers: { A: "Springfield", B: "Quahog", C: "South Park", D: "Riverdale" }, correct: "A" },
{ question: "Ko je bio vrhovni bog u grčkoj mitologiji?", answers: { A: "Posejdon", B: "Had", C: "Apolon", D: "Zeus" }, correct: "D" },
{ question: "Kako se zvala egipatska boginja plodnosti i majčinstva?", answers: { A: "Izida", B: "Bastet", C: "Nefertiti", D: "Hator" }, correct: "A" },
{ question: "U nordijskoj mitologiji, kako se zove prebivalište bogova?", answers: { A: "Valhala", B: "Jotunhajm", C: "Midgard", D: "Asgard" }, correct: "D" },
{ question: "Koji rimski bog je ekvivalent grčkom bogu Aresu?", answers: { A: "Mars", B: "Neptun", C: "Merkur", D: "Jupiter" }, correct: "A" },
{ question: "Šta u grčkoj mitologiji simbolizuje 'Pandorina kutija'?", answers: { A: "Vječno bogatstvo", B: "Besmrtnost", C: "Znanje", D: "Sva zla svijeta" }, correct: "D" },
{ question: "Ko je napisao roman 'Zločin i kazna'?", answers: { A: "Lav Tolstoj", B: "Fjodor Dostojevski", C: "Anton Čehov", D: "Ivan Turgenjev" }, correct: "B" },
{ question: "Kako se zove glavni grad u romanu 'Gospodar prstenova' u kojem se nalazi sjedište Saurona?", answers: { A: "Gondor", B: "Rohan", C: "Mordor", D: "Isengard" }, correct: "C" },
{ question: "Koji fiktivni detektiv živi na adresi Baker Street 221B?", answers: { A: "Hercule Poirot", B: "Philip Marlowe", C: "Arsène Lupin", D: "Sherlock Holmes" }, correct: "D" },
{ question: "Koja autorica je napisala serijal o Harryju Potteru?", answers: { A: "Agatha Christie", B: "J.K. Rowling", C: "Virginia Woolf", D: "Enid Blyton" }, correct: "B" },
{ question: "Koja je troslovna riječ u imenima triju od pet najvećih kalifornijskih gradova?", answers: { A: "Los", B: "San", C: "Las", D: "New" }, correct: "B" },
{ question: "Koji vitamin dobivamo sunčanjem ili konzumacijom ribljeg ulja?", answers: { A: "A", B: "C", C: "D", D: "K" }, correct: "C" },
{ question: "Koja je životinja iz porodice šupljorožaca u kruni grba Republike Hrvatske?", answers: { A: "Jelen", B: "Lav", C: "Koza", D: "Vuk" }, correct: "C" },
{ question: "Po kojem je kontinentu nazvan hemijski element s atomskim brojem 63?", answers: { A: "Europi", B: "Aziji", C: "Africi", D: "Americi" }, correct: "A" },
{ question: "Koji je, nakon New Yorka i Los Angelesa, najmnogoljudniji američki grad?", answers: { A: "Houston", B: "Chicago", C: "Miami", D: "Dallas" }, correct: "B" },
{ question: "Koji je programer glavni lik filma najavljivanog sloganom „Ne možete imati 500 milijuna prijatelja i nijednog neprijatelja“?", answers: { A: "Bill Gates", B: "Steve Jobs", C: "Elon Musk", D: "Mark Zuckerberg" }, correct: "D" },
{ question: "Koja je latinska kratica za izraz „i tako dalje“?", answers: { A: "am.", B: "e.g.", C: "i.e.", D: "etc." }, correct: "D" },
{ question: "Koliko pješaka prelazi zebru na kultnoj glazbenoj fotografiji Iana McMillana?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "B" },
{ question: "Na kojem kontinentu ne rastu paprati?", answers: { A: "Antarktici", B: "Arktiku", C: "Australiji", D: "Africi" }, correct: "A" },
{ question: "Kako Nijemci zovu svoju najveću saveznu zemlju?", answers: { A: "Bayern", B: "Sachsen", C: "Hessen", D: "NRW" }, correct: "A" },
{ question: "Koja je pruga u sjevernoj Bosni izgrađena u omladinskoj akciji neposredno nakon završetka 2. svj. rata?", answers: { A: "Sarajevo–Mostar", B: "Brčko–Banovići", C: "Doboj–Tuzla", D: "Bihać–Knin" }, correct: "B" },
{ question: "Koji je najstariji univerzitet na svijetu koji i danas radi?", answers: { A: "Oxford", B: "Sorbonne", C: "Al-Qarawiyyin", D: "Bologna" }, correct: "C" },
{ question: "Koji je grčki filozof bio učitelj Aleksandra Velikog?", answers: { A: "Sokrat", B: "Platon", C: "Aristotel", D: "Diogen" }, correct: "C" },
{ question: "Koji je najstariji pisani ep na svijetu?", answers: { A: "Ilijada", B: "Odiseja", C: "Hamlet", D: "Ep o Gilgamešu" }, correct: "D" },
{ question: "Koja planeta ima najviše poznatih prirodnih satelita?", answers: { A: "Jupiter", B: "Saturn", C: "Uran", D: "Neptun" }, correct: "B" },
{ question: "Koji dio ljudskog mozga je odgovoran za ravnotežu i koordinaciju?", answers: { A: "Veliki mozak", B: "Mali mozak", C: "Produžena moždina", D: "Hipotalamus" }, correct: "B" },
{ question: "Koji vitamin je ključan za zgrušavanje krvi?", answers: { A: "Vitamin A", B: "Vitamin B12", C: "Vitamin C", D: "Vitamin K" }, correct: "D" },
{ question: "Koji organ u ljudskom tijelu proizvodi inzulin?", answers: { A: "Gušterača", B: "Jetra", C: "Bubrezi", D: "Slezena" }, correct: "A" },
{ question: "Trgovac delicijama Richard Hellman postigao je bogatstvo prodajom kojeg dodatka jelima?", answers: { A: "Kečap", B: "Ajvar", C: "Senf", D: "Majoneza" }, correct: "D" },
{ question: "U kojem Lovrakovom romanu đaci osnivaju zadrugu 'Sloga' kako bi zajednički savladali prepreke na povratku sa školskog izleta?", answers: { A: "Družba Pere Kvržice", B: "Anja voli Petra", C: "Micek, Mucek i Dedek", D: "Vlak u snijegu" }, correct: "D" },
{ question: "Koja je površinom najveća država na svijetu u kojoj je ćirilica službeno pismo?", answers: { A: "Ukrajina", B: "Kazahstan", C: "Rusija", D: "Bjelorusija" }, correct: "C" },
{ question: "Koji naziv dijeli poglavar derviškog reda sa šahovskim pojmom za kraj partije?", answers: { A: "šah", B: "mat", C: "rokada", D: "pat" }, correct: "B" },
{ question: "Koji troslovni grad u istočnoj Srbiji je poznat po velikim nalazištima bakra?", answers: { A: "Bor", B: "Niš", C: "Zaj", D: "Kru" }, correct: "A" },
{ question: "U delti koje rijeke se nalazi ruski grad Astrahan?", answers: { A: "Don", B: "Dnjepar", C: "Ural", D: "Volga" }, correct: "D" }
],
hard: [ 
{ question: "Pravilan trodimenzionalni raspored građevnih čestica kristala nazivamo kristalna-što?", answers: { A: "Mreža", B: "Rešetka", C: "Struktura", D: "Forma" }, correct: "B" },
{ question: "Na koju se konvenciju poziva kada se govori o pravilnom postupanju s ratnim zarobljenicima?", answers: { A: "Helsinšku", B: "Rimsku", C: "Ženevsku", D: "Parišku" }, correct: "C" },
{ question: "Ono što je u Sloveniji korenje, a u Srbiji šargarepa, u Hrvatskoj je-što?", answers: { A: "Mrkva", B: "Peršun", C: "Celer", D: "Repa" }, correct: "A" },
{ question: "Koja država je 1999. zajedno s Poljskom i Češkom ušla u NATO savez?", answers: { A: "Rumunija", B: "Slovačka", C: "Slovenija", D: "Mađarska" }, correct: "D" },
{ question: "Koju je igraću konzolu i konkurent Sonyjevu PlayStationu tvrtka Microsoft predstavila 2001?", answers: { A: "Sega Dreamcast", B: "Nintendo 64", C: "Xbox", D: "Atari" }, correct: "C" },
{ question: "Koji je grad, po popisu iz 1982 bio treći najveći grad u Jugoslaviji s gotovo pola milijuna stanovnika?", answers: { A: "Beograd", B: "Sarajevo", C: "Zagreb", D: "Skoplje" }, correct: "D" },
{ question: "Naziv kojih se orijentalnih širokih hlača krije u anagramu riječi „mediji“?", answers: { A: "Dimije", B: "Šalvare", C: "Sarong", D: "Kaftan" }, correct: "A" },
{ question: "13-dnevno zaoštravanje odnosa SSSR-a i SAD-a 1962 poznato je kao kakva „kriza“?", answers: { A: "Iranska", B: "Ruska", C: "Kubanska", D: "Vijetnamska" }, correct: "C" },
{ question: "Kako se zove medicinska pretraga mjerenja plućnog volumena i kapaciteta pluća?", answers: { A: "Kardiologija", B: "Bronhoskopija", C: "Elektrokardiografija", D: "Spirometrija" }, correct: "D" },
{ question: "Koji plemeniti plin kojim se pune rasvjetna tijela ima atomski broj 10?", answers: { A: "Helij", B: "Argon", C: "Neon", D: "Azot" }, correct: "C" },
{ question: "Koja se korejska borilačka vještina razvila iz karatea nakon 2. svj. rata?", answers: { A: "Hapkido", B: "Judo", C: "Taekwondo", D: "Kendo" }, correct: "C" },
{ question: "Koji ćemo riblji proizvod dobiti ako ispremiješamo slova u riječi „akvarij“?", answers: { A: "Tuna", B: "Losos", C: "Sardina", D: "Kavijar" }, correct: "D" },
{ question: "Frazom „Miješati kruške i jabuke“ istoznačan je frazemu „Zbrajati babe i“-koga?", answers: { A: "Ptice", B: "Mačke", C: "Žabe", D: "Ribe" }, correct: "C" },
{ question: "Po kojoj je starorimskoj božici plodnosti nazvan sveukupni životinjski svijet?", answers: { A: "Diani", B: "Fauni", C: "Venusi", D: "Minervi" }, correct: "B" },
{ question: "Koliko je Štrumpfova potrebno Gargamelu kako bi napravio napitak koji pretvara metal u zlato?", answers: { A: "67", B: "6", C: "9", D: "11" }, correct: "B" },
{ question: "Plaža s oznakom FKK označava da je riječ o kakvoj plaži?", answers: { A: "Divljoj", B: "Pješčanoj", C: "Privatnoj", D: "Nudističkoj" }, correct: "D" },
{ question: "Koji latinski naziv dijele svemirska maglica i nagrada za najbolju SF-knjigu?", answers: { A: "Stella", B: "Nova", C: "Cosmos", D: "Nebula" }, correct: "D" },
{ question: "Koji je njujorški modni dizajner 1967. pokrenuo liniju odjeće Polo?", answers: { A: "Emporio Armani", B: "Calvin Klein", C: "Ralph Lauren", D: "Marc Jacobs" }, correct: "C" },
{ question: "Koliko najmanje kopnenih granica morate prijeći na putu od Norveške do Sjeverne Koreje?", answers: { A: "1", B: "2", C: "3", D: "4" }, correct: "B" },
{ question: "Koji tip crnogoričnih šuma raširen na sjeveru zauzima trećinu šumske površine na Zemlji?", answers: { A: "Tajge", B: "Savane", C: "Prašume", D: "Stepe" }, correct: "A" },
{ question: "Po kojoj je opasnoj životinji nazvana Marvelova „Osvetnica“ Nataša Romanoff?", answers: { A: "Panteri", B: "Tigru", C: "Zmiji", D: "Crnoj udovici" }, correct: "D" },
{ question: "U koju skupinu organskih spojeva ubrajamo enzime i protutijela?", answers: { A: "Bjelančevine", B: "Ugljikohidrate", C: "Lipide", D: "Vitamine" }, correct: "A" },
{ question: "Koji je softver za videokomunikaciju putem interneta 2011. Microsoft kupio za 8,5 milijardi dolara?", answers: { A: "Skype", B: "Zoom", C: "Teams", D: "Discord" }, correct: "A" },
{ question: "Po kojem je izumitelju nazvana tvrtka za proizvodnju električnih automobila iz kalifornijskog Palo Alta?", answers: { A: "Volti", B: "Edisonu", C: "Faradayu", D: "Tesli" }, correct: "D" },
{ question: "Kako se, u fizici, naziva prazan prostor u kojem nema nikakvih materijalnih čestica?", answers: { A: "Crna rupa", B: "Plazma", C: "Eter", D: "Vakuum" }, correct: "D" },
{ question: "Koja država ima najviše susjednih država u Africi?", answers: { A: "Sudan", B: "Kongo", C: "Tanzanija", D: "Niger" }, correct: "B" },
{ question: "Koji je najviši glavni grad na svijetu?", answers: { A: "Quito", B: "La Paz", C: "Bogota", D: "Lhasa" }, correct: "B" },
{ question: "Koliko država u svijetu ima manje od 1 milion stanovnika (približno)?", answers: { A: "10", B: "20", C: "30", D: "40" }, correct: "C" },
{ question: "Približno koliko stanovnika ima država sa najmanjom gustinom naseljenosti na svijetu, Mongolija, po kvadratnom kilometru?", answers: { A: "2", B: "50", C: "100", D: "200" }, correct: "A" },
{ question: "Koliko bajtova ima 1 kilobajt u modernim računarima (binarna definicija)?", answers: { A: "1000", B: "1024", C: "1048", D: "1100" }, correct: "B" },
{ question: "Koja se dužina u km tradicionalno pripisuje rijeci Nil, koja se dugo smatrala najdužom na svijetu?", answers: { A: "4.200", B: "6.650", C: "5.100", D: "7.800" }, correct: "B" },
{ question: "U kojem animiranom filmu nazvanom po provansalskom jelu štakor Remy spašava francuski restoran?", answers: { A: "Ratatouille", B: "Shrek", C: "Madagascar", D: "Cars" }, correct: "A" },
{ question: "U kojoj se državi nalaze poznata turistička odredišta Hurghada i Sharm-el-Sheikh?", answers: { A: "Tunis", B: "Maroko", C: "Egipat", D: "Turska" }, correct: "C" },
{ question: "Koji glumac u filmu 'Notting Hill' iz 1999. glumi prodavača knjiga koji šarmira Juliu Roberts?", answers: { A: "Colin Firth", B: "Hugh Grant", C: "Jude Law", D: "Richard Gere" }, correct: "B" },
{ question: "Koji metal na zraku stvara zaštitni sloj oksida koji ga čuva od daljeg propadanja (pasivizacija)?", answers: { A: "Željezo", B: "Bakar", C: "Zlato", D: "Aluminij" }, correct: "D" },
{ question: "Šta označava granicu između prahistorijskog i historijskog doba?", answers: { A: "Pojava pisma", B: "Otkriće vatre", C: "Topljenje metala", D: "Prvi gradovi" }, correct: "A" },
{ question: "Koja je aviokompanija (danas ugašena) bila slovenski nacionalni prijevoznik?", answers: { A: "Slovenia Airlines", B: "Adria Airways", C: "Jat Airways", D: "Air Love" }, correct: "B" },
{ question: "Koja je luka na obali Žutog mora najveće kinesko industrijsko i trgovačko središte?", answers: { A: "Hong Kong", B: "Peking", C: "Šangaj", D: "Guangzhou" }, correct: "C" },
{ question: "U kojem se olimpijskom ekipnom sportu igrači koriste ljepilom za bolju kontrolu lopte?", answers: { A: "Košarka", B: "Odbojka", C: "Vaterpolo", D: "Rukomet" }, correct: "D" },
{ question: "U kojem se gradu nalazi džamija al-Haram, najveća i najsvetija džamija na svijetu?", answers: { A: "Medina", B: "Meka", C: "Jeruzalem", D: "Istanbul" }, correct: "B" },
{ question: "S kojeg su planeta došli izvanzemaljci u Wellsovom romanu 'Rat svjetova'?", answers: { A: "Venera", B: "Jupiter", C: "Mars", D: "Saturn" }, correct: "C" },
{ question: "Kojom se jedinicom od 1000 tona označava oslobođena energija pri eksploziji nuklearne bombe?", answers: { A: "Megatona", B: "Gigatona", C: "Kilotona", D: "Teratona" }, correct: "C" },
{ question: "Kojem je oklopnom vozilu u Prvom svjetskom ratu časnik Ernest Swinton dao ime?", answers: { A: "Tenk", B: "BVP", C: "Amfibija", D: "Džip" }, correct: "A" },
{ question: "Koliko bodova u američkom nogometu (NFL) donosi touchdown (polaganje)?", answers: { A: "3", B: "7", C: "6", D: "5" }, correct: "C" },
{ question: "Kako se zove mjerna jedinica za udaljenost koju svjetlost pređe za jednu godinu?", answers: { A: "Kilometar", B: "Nautička milja", C: "Svjetlosna godina", D: "Parsek" }, correct: "C" },
{ question: "U kojoj se afričkoj državi govore jezici naroda Yoruba, Hausa i Igbo?", answers: { A: "Etiopija", B: "Kenija", C: "Gana", D: "Nigerija" }, correct: "D" },
{ question: "Koji je španski nogometni selektor osvojio i Svjetsko (2010) i Europsko prvenstvo (2012)?", answers: { A: "Luis Aragones", B: "Vicente del Bosque", C: "Pep Guardiola", D: "Luis Enrique" }, correct: "B" },
{ question: "Ko je naslikao čuveni 'Krik' (The Scream)?", answers: { A: "Edvard Munch", B: "Pablo Picasso", C: "Vincent van Gogh", D: "Auguste Rodin" }, correct: "A" },
{ question: "Šta se dodatno bilježi uz ime, vrstu i podvrstu u latinskoj taksonomiji?", answers: { A: "Porodica", B: "Rod", C: "Boja organizma", D: "Autor i godina opisa" }, correct: "D" },
{ question: "Koja zmija ima latinski naziv 'Natrix natrix'?", answers: { A: "Poskok", B: "Bjelouška", C: "Kobra", D: "Anakonda" }, correct: "B" }


],
hardest: [
{ question: "Koji se filozof krije u anagramu imena „Kratos“, personifikaciji sile u grčkoj mitologiji?", answers: { A: "Sokrat", B: "Platon", C: "Aristotel", D: "Diogen" }, correct: "A" },
{ question: "Kojeg hemijskog elementa u ljudskom tijelu ima dovoljno za proizvodnju oko 900 olovaka?", answers: { A: "Vodika", B: "Kalcija", C: "Ugljika", D: "Kisika" }, correct: "C" },
{ question: "Najveća piramida u Egiptu je? 138,75 m", answers: { A: "Kefrenova piramida", B: "Sneferuova piramida", C: "Menkorova piramida", D: "Keopsova piramida" }, correct: "D" },
{ question: "U kojoj se državi nalazi najviše vulkana? 130", answers: { A: "Filipini", B: "Indonezija", C: "Japan", D: "Italija" }, correct: "B" },
{ question: "Hamlet je bio princ? Hamlet je tragedija Williama Shakespearea, jedna od njegovih najpoznatijih i najizvođenijih tragedija na pozornicama širom svijeta. Mjesto radnje je Danska, kraljevski dvorac Elsinore.", answers: { A: "Danske", B: "Engleske", C: "Welsa", D: "Škotske" }, correct: "A" },
{ question: "Kako se zove glavna nagrada na Kanskom festivalu?", answers: { A: "zlatni vuk", B: "zlatni medvjed", C: "zlatni globus", D: "zlatna palma" }, correct: "D" },
{ question: "Ko je imao zakonodavnu vlast u Starom Rimu?", answers: { A: "crkva", B: "papa", C: "senat", D: "predsjednik" }, correct: "C" },
{ question: "Ko polaže Hipokratovu zakletvu?", answers: { A: "poslanici", B: "ljekari", C: "advokati", D: "premijer" }, correct: "B" },
{ question: "Koji gas udisati čini ljudski glas pištavim i visokim?", answers: { A: "Kiseonik", B: "Helijum", C: "Argon", D: "Neon" }, correct: "B" },
{ question: "Mesing je legura koja dva metala?", answers: { A: "bakra i cinka", B: "zlata i bakra", C: "zlata i kalaja", D: "kalaja i bakra" }, correct: "A" },
{ question: "Kada kažemo “Vječni grad” mislimo na", answers: { A: "Paris", B: "Rim", C: "London", D: "Atinu" }, correct: "B" },
{ question: "Koja država je prva osvojila Eurosong nakon uvođenja televotinga (1997.)?", answers: { A: "Hrvatska", B: "Irska", C: "Njemačka", D: "Ujedinjeno Kraljevstvo" }, correct: "D" },
{ question: "Gdje se nalazi pustinja Gobi?", answers: { A: "Africi", B: "Sjevernoj Americi", C: "Aziji", D: "Australiji" }, correct: "C" },
{ question: "Do kojeg poena se igra PETI set u odbojci?", answers: { A: "10", B: "15", C: "20", D: "25" }, correct: "B" },
{ question: "Kako se zove prva knjiga Starog zavjeta?", answers: { A: "Izlazak", B: "Levitski zakonik", C: "Postanak", D: "Psalmi" }, correct: "C" },
{ question: "Dinamometar služi za mjerenje?", answers: { A: "Sile", B: "brzine", C: "napona", D: "gustine" }, correct: "A" },
{ question: "Koje dvije države dijele rekord s najviše pobjeda (7) na Eurosongu zaključno s 2025. godinom?", answers: { A: "Švedska i Irska", B: "Francuska i Njemačka", C: "Velika Britanija i Švedska", D: "Irska i Italija" }, correct: "A" },
{ question: "Sva organska jedinjenja sadrže?", answers: { A: "azot", B: "kisik", C: "vodik", D: "ugljik" }, correct: "D" },
{ question: "Koliko sati je potrebno svjetlosti da stigne od Sunca do najudaljenije planete, Neptuna?", answers: { A: "Oko 1 sat", B: "Oko 4 sata", C: "Oko 10 sati", D: "Oko 24 sata" }, correct: "B" },
{ question: "Koji igrač drži rekord po broju golova na jednom Svjetskom prvenstvu?", answers: { A: "Miroslav Klose", B: "Just Fontaine", C: "Ronaldo Nazário", D: "Gerd Müller" }, correct: "B" },
{ question: "Koji se engleski izraz koristi za napuštenu zgradu koju ljudi bespravno nastanjuju?", answers: { A: "squat", B: "loft", C: "block", D: "slum" }, correct: "A" },
{ question: "Koji engleski moreplovac je 1581. proglašen vitezom nakon oplovljavanja svijeta?", answers: { A: "James Cook", B: "Francis Drake", C: "Walter Raleigh", D: "Henry Hudson" }, correct: "B" },
{ question: "Topologija je grana?", answers: { A: "geografije", B: "matematike", C: "biologije", D: "lingvistike" }, correct: "B" },
{ question: "Koji je jedini američki predsjednik u historiji koji je podnio ostavku na tu dužnost?", answers: { A: "Andrew Johnson", B: "Richard Nixon", C: "Bill Clinton", D: "Gerald Ford" }, correct: "B" },
{ question: "Koja se rijeka smatra najdubljom na svijetu, sa dubinom koja na pojedinim mjestima prelazi 220 metara?", answers: { A: "Amazon", B: "Nil", C: "Kongo", D: "Jangce" }, correct: "C" },
{ question: "Kako se zove teorija u biologiji prema kojoj su organele poput mitohondrija nekada bile slobodni organizmi?", answers: { A: "Endosimbioza", B: "Egzogeneza", C: "Panspermija", D: "Fagocitoza" }, correct: "A" },
{ question: "Koji je prvi vještački satelit koji je SSSR lansirao u orbitu 1957. godine?", answers: { A: "Vostok 2", B: "Sputnjik 2", C: "Sputnjik 1", D: "Vostok 1" }, correct: "C" },
{ question: "Koji se moreuz nalazi između Tasmanije i kopnenog dijela Australije?", answers: { A: "Bassov prolaz", B: "Cookov prolaz", C: "Torresov prolaz", D: "Magelanov prolaz" }, correct: "A" },
{ question: "Koje je boje instrument koji snima podatke o letu aviona?", answers: { A: "žute", B: "naranđaste", C: "crvene", D: "crne" }, correct: "B" },
{ question: "Četiri bajta se sastoje od?", answers: { A: "4 bita", B: "12 bitova", C: "32 bitova", D: "128 bitova" }, correct: "C" },
{ question: "Kako se naziva najdublja tačka u Marijanskom rovu?", answers: { A: "Challenger Deep", B: "Abyss", C: "Horizon Deep", D: "Sirena Deep" }, correct: "A" },
{ question: "Kako se zove prelazni period između kamenog i bronzanog doba?", answers: { A: "Gvozdeno doba", B: "Mezolit", C: "Eneolit)", D: "Antika" }, correct: "C" },
{ question: "Koji je najstariji dnevni list koji još uvijek izlazi na svijetu (osnovan 1703)?", answers: { A: "The Times", B: "Die Welt", C: "Le Monde", D: "Wiener Zeitung" }, correct: "D" },
{ question: "Koji je grad bio prijestolnica Gornjeg Egipta i poznat po hramovima u Karnaku i Luksoru?", answers: { A: "Kairo", B: "Giza", C: "Aleksandrija", D: "Teba" }, correct: "D" },
{ question: "Koji je najveći prirodni satelit u Sunčevom sistemu (veći je i od planete Merkur)?", answers: { A: "Titan", B: "Mjesec", C: "Europa", D: "Ganimed" }, correct: "D" },
{ question: "Kako se naziva nauka o zastavama?", answers: { A: "Heraldika", B: "Veksilologija", C: "Numizmatika", D: "Genealogija" }, correct: "B" },
{ question: "U tekstilnoj industriji, kako se naziva najskuplja vuna na svijetu koja potiče od male divlje lame s Anda?", answers: { A: "Kašmir", B: "Angora", C: "Vikuja", D: "Merino" }, correct: "C" },
{ question: "Kako se u arheologiji naziva naučna metoda određivanja starosti organskih materijala?", answers: { A: "Radiokarbonsko datiranje", B: "Stratigrafija", C: "Termoluminis archelogis", D: "Dendrohronologija" }, correct: "A" },
{ question: "Kako se zove instrument koji mjeri brzinu vjetra?", answers: { A: "Barometar", B: "Higrometar", C: "Seizmometar", D: "Anemometar" }, correct: "D" },
{ question: "U kriptografiji, kako se zove tehnika šifrovanja gdje se svako slovo pomjera za fiksni broj mjesta u abecedi?", answers: { A: "Cezarova šifra", B: "Enigma", C: "RSA šifra", D: "Heksa algoritam" }, correct: "A" },
{ question: "Koji je najviši vodopad u Evropi?", answers: { A: "Skogafoss", B: "Vinnufossen", C: "Rheinfall", D: "Kravice" }, correct: "B" },
{ question: "Kako se naziva nauka o potresima?", answers: { A: "Vulkanologija", B: "Seizmologija", C: "Tektonika", D: "Speleologija" }, correct: "B" },
{ question: "Koji dokument iz 1215. godine se smatra temeljem engleske i svjetske demokratije?", answers: { A: "Povelja UN", B: "Ustav", C: "Magna Carta", D: "Deklaracija o nezavisnosti" }, correct: "C" },
{ question: "U kojoj zemlji se nalazi najveći vodopad u Evropi?", answers: { A: "Island", B: "Finska", C: "Švedska", D: "Norveška" }, correct: "D" },
{ question: "Kako se zove staroslavenska boginja proljeća?", answers: { A: "Lada", B: "Lela", C: "Živna", D: "Vesna" }, correct: "D" },
{ question: "Koji se talijanizam koristi za ispravljanje ili poništavanje pogrešno uknjižene stavke u knjigovodstvu?", answers: { A: "Saldo", B: "Storno", C: "Rabat", D: "Lombard" }, correct: "B" },
{ question: "U kojem se gradu nalazi Hajdučka česma, mjesto održavanja koncerta s kultnog live-albuma „Bijelog dugmeta“?", answers: { A: "Sarajevo", B: "Split", C: "Beograd", D: "Zagreb" }, correct: "C" },
{ question: "Gdje su se prvo počele koristiti papirne novčanice?", answers: { A: "Kina", B: "Egipat", C: "Grčka", D: "Engleska" }, correct: "A" },
{ question: "Koji udarac u boksu se izvodi rukom koja je bliža protivniku?", answers: { A: "Krosover", B: "Direkt", C: "Džeb", D: "Aperkat" }, correct: "C" },
{ question: "Koji je jedini glavni grad na svijetu koji direktno graniči sa dvije države?", answers: { A: "Bratislava", B: "Beč", C: "Ljubljana", D: "Prag" }, correct: "A" }

]
},

geography: {
easy: [
{ question: "Najdublje jezero na svijetu je?", answers: { A: "Kaspijsko", B: "Viktorijino", C: "Bajkajsko", D: "Boračko" }, correct: "C" },
{ question: "Koji je najbrži putujući signal u ljudskom tijelu (brzina nervnog impulsa)?", answers: { A: "Do 120 m/s", B: "Do 10 m/s", C: "Do 500 m/s", D: "Do 1000 m/s" }, correct: "A" },
{ question: "Koliko država u Africi nema izlaz na more (kopnene države)?", answers: { A: "5", B: "16", C: "30", D: "45" }, correct: "B" },
{ question: "Koliko sekundi traje jedan puni srčani ciklus (otkucaj) kod prosječne odrasle osobe u mirovanju?", answers: { A: "0.8 sekundi", B: "1.5 sekundi", C: "2.2 sekunde", D: "3.0 sekunde" }, correct: "A" },
{ question: "Koliko litara krvi prosječno struji kroz tijelo odrasle osobe?", answers: { A: "3 litra", B: "5 litara", C: "7 litara", D: "1 litar" }, correct: "B" },
{ question: "Koja je najčešća krvna grupa na svijetu?", answers: { A: "A+", B: "B-", C: "0+", D: "AB+" }, correct: "C" },
{ question: "Kako se zove osnivač kompanije Amazon?", answers: { A: "Bill Gates", B: "Jeff Bezos", C: "Steve Jobs", D: "Mark Zuckerberg" }, correct: "B" },
{ question: "Koliko država u svijetu ima više od 100 miliona stanovnika (približno)?", answers: { A: "10", B: "12", C: "15", D: "18" }, correct: "C" },
{ question: "Kako se zove pojas koji označava najviši nivo majstorstva u karateu?", answers: { A: "Plavi", B: "Bijeli", C: "Crveni", D: "Crni" }, correct: "D" },
{ question: "Koliko rundi traje profesionalni bokserski meč za svjetsku titulu (muškarci, moderno pravilo)?", answers: { A: "5", B: "10", C: "11", D: "12" }, correct: "D" },
{ question: "Kako se zove sudijska odluka u boksu kada borba završi prije isteka rundi zbog nesposobnosti borca da nastavi?", answers: { A: "KO (nokaut)", B: "TKO (tehnički nokaut)", C: "DQ (diskvalifikacija)", D: "Draw (neriješeno)" }, correct: "B" },
{ question: "Koja reprezentacija je najtrofejnija u historiji muškog rukometa na Svjetskim prvenstvima (do 2025.)?", answers: { A: "Hrvatska", B: "Švedska", C: "Njemačka", D: "Francuska" }, correct: "D" },
{ question: "Koji je naziv za eksplozivnu smrt zvijezde?", answers: { A: "Nova", B: "Supernova", C: "Kvazar", D: "Pulsar" }, correct: "B" },
{ question: "Koji je glavni grad Norveške?", answers: { A: "Stockholm", B: "Oslo", C: "Kopenhagen", D: "Reykjavik" }, correct: "B" },
{ question: "Koji grad je poznat kao 'Grad kanala'?", answers: { A: "Amsterdam", B: "Venecija", C: "Brugge", D: "Kopenhagen" }, correct: "B" },
{ question: "Koji je naziv za 'lažne' memorije koje mozak može stvoriti?", answers: { A: "Amnezija", B: "Halucinacija", C: "Konfabulacija", D: "Iluzija" }, correct: "C" },
{ question: "Koji je najveći grad na svijetu u smislu gustine naseljenosti?", answers: { A: "Peking", B: "Manila", C: "Mumbai", D: "New York" }, correct: "B" },
{ question: "Koji od ovih gradova ima najviše stanovnika?", answers: { A: "New Delhi", B: "Tokio", C: "Shanghai", D: "Sao Paulo" }, correct: "B" },
{ question: "Iz kog lučkog grada u Engleskoj je Titanik otišao 1912.?", answers: { A: "Dover", B: "Liverpool", C: "Southampton", D: "Grimsby" }, correct: "C" },
{ question: "Koji je od ovih poznatih kompozitora bio gluh?", answers: { A: "Beethoven", B: "Mozart", C: "Bach", D: "Handel" }, correct: "A" },
{ question: "Koje dvije države imaju najdužu granicu?", answers: { A: "Rusija i Kina", B: "Amerika i Meksiko", C: "Amerika i Kanada", D: "Rusija i Ukrajina" }, correct: "C" },
{ question: "Koliko sunčeva svjetlost putuje da stigne do Zemlje?", answers: { A: "8 sekundi", B: "8 minuta", C: "8 sati", D: "8 dana" }, correct: "B" },
{ question: "Koja od ovih zastava NE sadrži polumjesec i zvijezdu?", answers: { A: "Pakistan", B: "Tunis", C: "Maroko", D: "Turska" }, correct: "C" },
{ question: "Šta je modni komad espadrila?", answers: { A: "šešir", B: "haljina", C: "kaput", D: "cipele" }, correct: "D" },
{ question: "Koji Tolstojev roman započinje 'Sve su sretne porodice slične...'", answers: { A: "Rat i mir", B: "Smrt Ivana Iljiča", C: "Ana Karenjina", D: "Uskrsnuće" }, correct: "C" },
{ question: "U kojoj zemlji je izmišljena Cezar salata?", answers: { A: "Grčkoj", B: "Meksiku", C: "Italiji", D: "Francuskoj" }, correct: "B" },
{ question: "Od kojih se orašastih plodova pravi marcipan?", answers: { A: "Bademi", B: "orasi", C: "lješnjci", D: "kikiriki" }, correct: "A" },
{ question: "Koji se dio tijela preoblikuje u rinoplastici?", answers: { A: "ruke", B: "koljena", C: "usta", D: "nos" }, correct: "D" },
{ question: "Dabar je nacionalni amblem koje države?", answers: { A: "Kanade", B: "Meksika", C: "Švedske", D: "Rusije" }, correct: "A" },
{ question: "Ko je osvojio prvo FIFA Svjetsko prvenstvo 1930?", answers: { A: "Brazil", B: "Argentina", C: "Italija", D: "Urugvaj" }, correct: "D" },
{ question: "Iz koje zemlje potiče pomfrit?", answers: { A: "Belgija", B: "USA", C: "Francuska", D: "Engleska" }, correct: "A" },
{ question: "U kojoj zemlji je nastao Halloween?", answers: { A: "Americi", B: "Engleska", C: "Irska", D: "Rumunija" }, correct: "C" },
{ question: "Koje je godine objavljen prvi model iPhone-a?", answers: { A: "2005", B: "2006", C: "2007", D: "2008" }, correct: "C" },
{ question: "Rimski broj 50 se piše kao?", answers: { A: "X", B: "L", C: "C", D: "D" }, correct: "B" },
{ question: "Koliko pčela ima očiju?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "C" },
{ question: "Koju pH vrijednost ima voda?", answers: { A: "5", B: "6", C: "7", D: "8" }, correct: "C" },
{ question: "Koja je jedina planeta u Sunčevom sistemu koja nije dobila ime po grčkom bogu ili boginji?", answers: { A: "Mars", B: "Zemlja", C: "Venera", D: "Merkur" }, correct: "B" },
{ question: "Koje je godine započeo Prvi svjetski rat?", answers: { A: "1938", B: "1945", C: "1918", D: "1914" }, correct: "D" },
{ question: "Koliko krugova Pakla ima u Danteovoj Božanstvenoj komediji?", answers: { A: "10", B: "8", C: "7", D: "9" }, correct: "D" },
{ question: "Koje je najčešće slovo u engleskoj abecedi?", answers: { A: "A", B: "E", C: "I", D: "O" }, correct: "B" },
{ question: "Koliko ima igrača u vaterpolo ekipi?", answers: { A: "5", B: "6", C: "7", D: "8" }, correct: "C" },
{ question: "Koliko rebara ima čovjek ukupno i na lijevoj i na desnoj strani kad se sabere?", answers: { A: "12", B: "20", C: "22", D: "24" }, correct: "D" },
{ question: "Koliko srca ima hobotnica?", answers: { A: "1", B: "2", C: "3", D: "4" }, correct: "C" },
{ question: "Najveća po površini je Rusija, koja je druga najveća zemlja po povšini na svijetu?", answers: { A: "Kina", B: "Kanada", C: "SAD", D: "Brazil" }, correct: "B" },
{ question: "Kolika je prosječna temperatura na Veneri?", answers: { A: "320°C", B: "4000°C", C: "100°C", D: "460°C" }, correct: "D" },
{ question: "U kojem gradu je izložena Mona Lisa Leonarda da Vincija?", answers: { A: "Rim", B: "Milano", C: "Pariz", D: "Madrid" }, correct: "C" },
{ question: "U kojoj državi se nalazi Taj Mahal?", answers: { A: "Pakistan", B: "Indija", C: "Bangladeš", D: "Nepal" }, correct: "B" },
{ question: "William Shakespeare je rođen koje godine?", answers: { A: "1464", B: "1564", C: "1664", D: "1764" }, correct: "B" },
{ question: "Koliko država u svijetu ima direktan izlaz na more ili okean (približno)?", answers: { A: "50", B: "90", C: "120", D: "150" }, correct: "D" },
{ question: "Koliko vremenskih zona zvanično koristi Rusija?", answers: { A: "7", B: "9", C: "11", D: "13" }, correct: "C" },
{ question: "Koliko sekundi traje jedan krug u Formuli 1 (standardno mjerena trka, u minutima i sekundama varira, ali krug se obično kreće u ovom rasponu)?", answers: { A: "60–80 sekundi", B: "20–30 sekundi", C: "90–120 sekundi", D: "40–50 sekundi" }, correct: "A" },
{ question: "Koje je boje Neptun?", answers: { A: "Crvene", B: "Zelene", C: "Bijele", D: "Plave" }, correct: "D" },
{ question: "Koja figura je najjača u šahu?", answers: { A: "Top", B: "Kralj", C: "Kraljica", D: "Pijun" }, correct: "C" },
{ question: "Koji kontinent je najveći po površini?", answers: { A: "Afrika", B: "Azija", C: "Evropa", D: "Južna Amerika" }, correct: "B" },
{ question: "U kojem gradu se nalazi sjedište Ujedinjenih Nacija?", answers: { A: "Ženeva", B: "London", C: "New York", D: "Brisel" }, correct: "C" },
{ question: "Koja je hemijska oznaka za Hlor?", answers: { A: "Cl", B: "Hl", C: "Ch", D: "Cr" }, correct: "A" },
{ question: "Rimski broj 100 se piše kao?", answers: { A: "L", B: "C", C: "D", D: "M" }, correct: "B" },
{ question: "Koji je hemijski simbol za srebro?", answers: { A: "Au", B: "Si", C: "Sr", D: "Ag" }, correct: "D" },
{ question: "Koji dio atoma ima negativan električni naboj?", answers: { A: "Proton", B: "Neutron", C: "Jezgro", D: "Elektron" }, correct: "D" },
{ question: "Ako doktor prepiše tri tablete i kaže da ih pijete svakih pola sata, koliko će trajati dok ne popijete sve tri?", answers: { A: "Pola sata", B: "Jedan sat", C: "Sat i po", D: "Dva sata" }, correct: "B" },
{ question: "Kako se zove glavni lik u igri 'The Legend of Zelda'?", answers: { A: "Link", B: "Zelda", C: "Ganondorf", D: "Mario" }, correct: "A" },
{ question: "Koja igra se sastoji od građenja i uništavanja blokova u 3D svijetu?", answers: { A: "Roblox", B: "Minecraft", C: "Fortnite", D: "Terraria" }, correct: "B" },
{ question: "Kako se zove fiktivni grad u kojem se odvija radnja igre GTA San Andreas?", answers: { A: "Liberty City", B: "Las Vegas", C: "Vice City", D: "Los Santos" }, correct: "D" },
{ question: "Koliko je godina otprilike potrebno jednoj plastičnoj boci da se razgradi u prirodi?", answers: { A: "50 godina", B: "250 godina", C: "450 godina", D: "1050 godina" }, correct: "C" },
{ question: "Koja država se smatra najčišća na svijetu prema indeksu ekološke učinkovitosti?", answers: { A: "Italija", B: "Bosna i Hercegovina", C: "Njemčka", D: "Danska" }, correct: "D" },
{ question: "Šta od navedenog najviše zagađuje okeane mikroplastikom?", answers: { A: "Sintetička odjeća", B: "Slamke", C: "Gume automobila", D: "Kese" }, correct: "C" },
{ question: "Ko je pseudonimni tvorac Bitcoina?", answers: { A: "Vitalik Buterin", B: "Satoshi Nakamoto", C: "Elon Musk", D: "Charlie Lee" }, correct: "B" },
{ question: "Kako se zove tehnologija na kojoj se zasnivaju kriptovalute (digitalni lanac blokova)?", answers: { A: "Mainframe", B: "Cloud", C: "Blockchain", D: "Data Lake" }, correct: "C" },
{ question: "Šta znači skraćenica NFT u svijetu digitalne umjetnosti?", answers: { A: "New Form Token", B: "Non-Fungible Token", C: "Net Free Trade", D: "Node File Transfer" }, correct: "B" },
{ question: "Koja je druga najveća kriptovaluta po tržišnoj vrijednosti (nakon Bitcoina)?", answers: { A: "Cardano", B: "Solana", C: "Ethereum", D: "Dogecoin" }, correct: "C" },
{ question: "U kojem gradu se nalazi trenutno najviša zgrada na svijetu, Burj Khalifa?", answers: { A: "Abu Dhabi", B: "Doha", C: "Dubai", D: "Rijad" }, correct: "C" },
{ question: "Kako se zove čuvena zgrada opere u Australiji sa krovovima u obliku jedara?", answers: { A: "Sydney Opera House", B: "Melbourne Arts Centre", C: "Perth Concert Hall", D: "Brisbane Stage" }, correct: "A" },
{ question: "Koji grad je poznat po modernom muzeju Guggenheim (dizajn Frank Gehry)?", answers: { A: "Madrid", B: "Bilbao", C: "Barcelona", D: "Sevilla" }, correct: "B" },
{ question: "U kojoj državi je izgrađena 'The Line', futuristički grad u obliku prave linije?", answers: { A: "Katar", B: "UAE", C: "Saudijska Arabija", D: "Kuvajt" }, correct: "C" },
{ question: "Koja država ima najstariji važeći ustav na svijetu (iz 1787. godine)?", answers: { A: "Ujedinjeno Kraljevstvo", B: "Francuska", C: "Švicarska", D: "SAD" }, correct: "D" },
{ question: "Koja žena je bila prva kancelarka Njemačke?", answers: { A: "Ursula von der Leyen", B: "Angela Merkel", C: "Annalena Baerbock", D: "Margaret Thatcher" }, correct: "B" },
{ question: "Kako se zove najveći teleskop ikada lansiran u svemir (nasljednik Hubbla)?", answers: { A: "James Webb", B: "Galileo", C: "Kepler", D: "Voyager" }, correct: "A" },
{ question: "Koji je jedini prirodni satelit Zemlje?", answers: { A: "Europa", B: "Mjesec", C: "Titan", D: "Io" }, correct: "B" },
{ question: "U kojem gradu se odvija radnja španske serije 'La Casa de Papel' (Money Heist)?", answers: { A: "Barcelona", B: "Madrid", C: "Valencia", D: "Sevilla" }, correct: "B" },
{ question: "Koji je najveći grad na svijetu koji se nalazi sjeverno od Arktičkog kruga?", answers: { A: "Reykjavik", B: "Murmansk", C: "Tromsø", D: "Anchorage" }, correct: "B" },
{ question: "Koji je najskuplji orašasti plod na svijetu?", answers: { A: "Indijski orah", B: "Makadamija", C: "Pistaći", D: "Pekan orah" }, correct: "B" },
{ question: "Kako se u egipatskoj mitologiji zove bog podzemlja koji vaga srce umrlih?", answers: { A: "Ra", B: "Set", C: "Osiris", D: "Anubis" }, correct: "D" },
{ question: "Koji grčki bog je bio poznat kao zaštitnik putnika, lopova i glasnik bogova?", answers: { A: "Apolon", B: "Hermes", C: "Dioniz", D: "Hefest" }, correct: "B" },
{ question: "Kako se naziva tržište na kojem cijene dionica stalno rastu?", answers: { A: "Bull Market", B: "Bear Market", C: "Flat Market", D: "Volatile Market" }, correct: "A" },
{ question: "Kako se zove psihološki fenomen u kojem ljudi precjenjuju svoje sposobnosti u oblastima u kojima su nestručni?", answers: { A: "Barnum efekat", B: "Dunning-Kruger efekat", C: "Halo efekat", D: "Placebo efekat" }, correct: "B" },
{ question: "Šta predstavlja skraćenica brenda sportske opreme ASICS na latinskom?", answers: { A: "Brzina je snaga", B: "U zdravom tijelu zdrav duh", C: "Samo uradi to", D: "Pobijedi sebe" }, correct: "B" },
{ question: "Kako se zove fiktivna sila karakteristična za kružno kretanje?", answers: { A: "Gravitaciona sila", B: "Elastična sila", C: "Centripetalna sila", D: "Centrifugalna sila" }, correct: "D" },
{ question: "Koji je glavni grad Portugala?", answers: { A: "Porto", B: "Benfica", C: "Sporting", D: "Lisabon" }, correct: "D" },
{ question: "Koliko je 100 na treću?", answers: { A: "10000", B: "100000", C: "1000000", D: "10000000" }, correct: "C" },
{ question: "Koja se igra na ploči sastoji od 40 prostora koji sadrže 28 objekata, četiri željeznice, dva komunalije, tri prostora šansi, tri prostora sanduka zajednice, luksuzni porezni prostor, prostor poreza na dohodak i četiri uglasta kvadrata: GO, zatvor, besplatan parking i Idite u zatvor?", answers: { A: "Risko", B: "Uno", C: "Jenga", D: "Monopol" }, correct: "D" },
{ question: "Kojim slovom u matematici se označava skup cijelih brojeva?", answers: { A: "N", B: "Q", C: "C", D: "Z" }, correct: "D" },
{ question: "Kako se zove najduži planinski lanac u Južnoj Americi?", answers: { A: "Himelaji", B: "Ande", C: "Karpati", D: "Dinaridi" }, correct: "B" },
{ question: "Koji grad nudi lokaciju za izmišljeno sletanje kraljeva u GOT?", answers: { A: "Split", B: "New York", C: "Zagreb", D: "Dubrovnik" }, correct: "D" },
{ question: "Koji se predmet, prema stihovima naslovne pjesme, uči na Bajaginom prvom solo albumu 'Pozitivna geografija'?", answers: { A: "Politika", B: "Hemija", C: "Matematika", D: "Fizika" }, correct: "D" },
{ question: "Koja šahovska figura se nalazi u logu svjetske šahovske organizacije FIDE?", answers: { A: "Top", B: "Kralj", C: "Konj", D: "Lovac" }, correct: "C" },
{ question: "Šta je, po pjesmi Bijelog dugmeta, 'strašna, strašna gnjavaža u životu'?", answers: { A: "Ljubav", B: "Život", C: "Rat", D: "Tuga" }, correct: "A" },
{ question: "Iz kojeg dijela biljke šećerne trske se dobiva saharoza?", answers: { A: "List", B: "Korijen", C: "Stabljika", D: "Cvijet" }, correct: "C" },
{ question: "Koja alpska država ima najviši vrh Dufour (4634 m) na Monte Rosu?", answers: { A: "Austrija", B: "Njemačka", C: "Italija", D: "Švicarska" }, correct: "D" },
{ question: "Na koji dio vojne opreme se odnosi spartanska izreka 's njim ili na njemu'?", answers: { A: "Štit", B: "Mač", C: "Konj", D: "Oklop" }, correct: "A" },
{ question: "Po kojoj potočnoj ribi je Schubert nazvao svoj glasovirski kvintet?", answers: { A: "Pastrmka", B: "Šaran", C: "Smuđ", D: "Losos" }, correct: "A" }

],
hard: [
{ question: "Ko je naslikao sliku pod nazivom “Gernika”?", answers: { A: "Salvador Dali", B: "Claude Monet", C: "Vincent van Gogh", D: "Pablo Picasso" }, correct: "D" },
{ question: "Ko je rekao “Veni, vidi, vici” (Dođoh, vidjeh, pobjedih)?", answers: { A: "Augustus", B: "Julije Cezar", C: "Neron", D: "Marko Antonije" }, correct: "B" },
{ question: "Koja žlijezda luči hormon rasta?", answers: { A: "Hipofiza", B: "Nadbubrežna žlijezda", C: "Štitna žlijezda", D: "Gušterača" }, correct: "A" },
{ question: "Hemijska oznaka za srebro je?", answers: { A: "Ag", B: "Au", C: "Si", D: "Sr" }, correct: "A" },
{ question: "Koliko čovjek u prosjeku ima crvenih krvnih zrnaca?", answers: { A: "4–5 miliona", B: "6–7 miliona", C: "10-15 miliona", D: "1–2 miliona" }, correct: "A" },
{ question: "Koliko bijelih polja ima na šahovskoj tabli?", answers: { A: "32", B: "64", C: "8", D: "16" }, correct: "A" },
{ question: "C++, Java, Paskal su..?", answers: { A: "Operativni sistemi", B: "Mrežni protokoli", C: "Baze podataka", D: "Programski jezici" }, correct: "D" },
{ question: "Koja je oznaka za kuhinjsku sol?", answers: { A: "NaCl", B: "KCl", C: "CaCl2", D: "NaCO3" }, correct: "A" },
{ question: "Šta znači skraćenica HTTP u web adresama?", answers: { A: "High Transfer Text Protocol", B: "Hyperlink Type Text Process", C: "HyperText Transfer Protocol", D: "Home Tool Transfer Process" }, correct: "C" },
{ question: "Koliko bitova čini jedan standardni bajt (byte)?", answers: { A: "4", B: "8", C: "16", D: "32" }, correct: "B" },
{ question: "Kroz koji se drevni mikenski grad može ući kroz čuvena 'Lavlja vrata'?", answers: { A: "Troja", B: "Mikena", C: "Knosos", D: "Sparta" }, correct: "B" },
{ question: "Jezero Nyasa (Malawi) čini više od petine površine koje afričke države?", answers: { A: "Zambija", B: "Malavi", C: "Tanzanija", D: "Mozambik" }, correct: "B" },
{ question: "Kakva je tjelesna temperatura kod dijagnoze 'status febrilis'?", answers: { A: "Snižena", B: "Normalna", C: "Povišena", D: "Trenutna" }, correct: "C" },
{ question: "Kako se zove najniži i najživčaniji brat Dalton u Lucky Lukeu?", answers: { A: "William", B: "Jack", C: "Averell", D: "Joe" }, correct: "D" },
{ question: "Koja borilačka vještina potiče iz Japana i fokusira se na bacanja i kontrolu protivnika?", answers: { A: "Kendo", B: "Judo", C: "Karate", D: "Aikido" }, correct: "B" },
{ question: "Na granici Mađarske s kojom državom se nalaze prijelazi Horgoš 1 i Horgoš 2?", answers: { A: "Hrvatska", B: "Rumunija", C: "Srbija", D: "Slovačka" }, correct: "C" },
{ question: "Koji njemački general je imao nadimak 'Wüstenfuchs' (Pustinjska lisica)?", answers: { A: "Rommel", B: "Guderian", C: "Keitel", D: "Manstein" }, correct: "A" },
{ question: "Kako se zove strah od paukova?", answers: { A: "Akrofobija", B: "Arahnofobija", C: "Klaustrofobija", D: "Agorafobija" }, correct: "B" },
{ question: "Koliko pari hromozoma ima čovjek u somatskim ćelijama?", answers: { A: "22", B: "23", C: "24", D: "44" }, correct: "B" },
{ question: "Koji umjetnički pravac je predvodio Salvador Dali?", answers: { A: "Kubizam", B: "Ekspresionizam", C: "Fovizam", D: "Nadrealizam" }, correct: "D" },
{ question: "Koliko postotaka DNK strukture ljudi dijele jedni s drugima (približno)?", answers: { A: "50%", B: "75%", C: "99.9%", D: "10%" }, correct: "C" },
{ question: "Koja kiselina se nalazi u želucu i pomaže u razgradnji hrane?", answers: { A: "Limunska", B: "Hlorovodonična", C: "Sirćetna", D: "Mliječna" }, correct: "B" },
{ question: "Koliko sekundi traje prosječan refleksni odgovor čovjeka na bolni stimulus?", answers: { A: "0.02–0.04", B: "0.2–0.3", C: "0.5–0.6", D: "1.0–1.2" }, correct: "B" },
{ question: "U kojem mjesecu i koje godine je završen 2. svjetski rat?", answers: { A: "August 1945", B: "Septembar 1945", C: "Oktobar 1945", D: "Juli 1945" }, correct: "B" },
{ question: "Kojom brzinom izlazi vazduh iz nas kada kašljemo?", answers: { A: "80 km/h", B: "100 km/h", C: "140 km/h", D: "200 km/h" }, correct: "C" },
{ question: "Kolika je razlika u danima između Julijanskog i Gregorijanskog kalendara?", answers: { A: "10 dana", B: "11 dana", C: "12 dana", D: "13 dana" }, correct: "D" },
{ question: "Koliko maksimalno litara može stati u naša pluća?", answers: { A: "4 litra", B: "5 litara", C: "6 litara", D: "7 litara" }, correct: "C" },
{ question: "Kako se zove slika koja prikazuje Isusa kako jede za dugačkim stolom sa svim svojim učenicima?", answers: { A: "Posljednji sud", B: "Posljednja večera", C: "Isusovo okupljanje", D: "Sveta gozba" }, correct: "B" },
{ question: "U kojoj galaksiji živimo?", answers: { A: "Mliječni put", B: "Andromeda", C: "Sombrero", D: "Orion" }, correct: "A" },
{ question: "Koji film je prvi u historiji osvojio Oskara za najbolji film u boji (Technicolor era)?", answers: { A: "Zameo ih vjetar", B: "Ben-Hur", C: "Kleopatra", D: "Casablanca" }, correct: "A" },
{ question: "Koji reditelj je režirao filmove 'Psycho', 'Vertigo' i 'Rear Window'?", answers: { A: "Stanley Kubrick", B: "Alfred Hitchcock", C: "Orson Welles", D: "David Lynch" }, correct: "B" },
{ question: "Koji film je prvi dugometražni animirani film u historiji?", answers: { A: "Pinokio", B: "Snjeguljica i sedam patuljaka", C: "Fantasia", D: "Dumbo" }, correct: "B" },
{ question: "Koje je jedino voće koje izvana ima sjeme?", answers: { A: "Malina", B: "Kupina", C: "Jagoda", D: "Borovnica" }, correct: "C" },
{ question: "Koja je država SAD-u dodijelila Kip slobode?", answers: { A: "Francuska", B: "Nizozemska", C: "Španija", D: "Italija" }, correct: "A" },
{ question: "Koji se datum obilježava kao Halloween – Noć vještica?", answers: { A: "30. oktobar", B: "31. oktobar", C: "1. novembar", D: "29. oktobar" }, correct: "B" },
{ question: "Koji dio atoma nema električni naboj?", answers: { A: "Proton", B: "Elektron", C: "Neutron", D: "Pozitron" }, correct: "C" },
{ question: "Koji krvni sudovi nose krv bogatu kiseonikom iz srca prema ostatku tijela?", answers: { A: "Vene", B: "Kapilari", C: "Limfni sudovi", D: "Arterije" }, correct: "D" },
{ question: "Koji planet ima najviše gravitacije?", answers: { A: "Saturn", B: "Zemlja", C: "Jupiter", D: "Neptun" }, correct: "C" },
{ question: "Za koji se element kaže da održava kosti jakim?", answers: { A: "Kalcij", B: "Natrij", C: "Željezo", D: "Kalij" }, correct: "A" },
{ question: "Koji je najveći svjetski otok?", answers: { A: "Grenland", B: "Madagaskar", C: "Borneo", D: "Nova Gvineja" }, correct: "A" },
{ question: "Kakvu boju očiju ima većina ljudi?", answers: { A: "Plavu", B: "Zelenu", C: "Smeđu", D: "Sivu" }, correct: "C" },
{ question: "Koji se hrskavi španjolski uštipci poslužuju kao desert uz umak od čokolade?", answers: { A: "Tapas", B: "Churros", C: "Tortilla", D: "Gazpacho" }, correct: "B" },
{ question: "Šta može biti zabavni časopis, robna kuća i spremnik vatrenog oružja?", answers: { A: "Gazin", B: "Magazin", C: "Arsenal", D: "Trezor" }, correct: "B" },
{ question: "Koji sportista drži rekord po broju osvojenih Grand Slam titula u muškom tenisu (singl)?", answers: { A: "Rafael Nadal", B: "Roger Federer", C: "Novak Đoković", D: "Pete Sampras" }, correct: "C" },
{ question: "Koji alat koristi magnetnu iglu koja pokazuje sjever?", answers: { A: "Barometar", B: "Termometar", C: "Altimetar", D: "Kompas" }, correct: "D" },
{ question: "Šta HB znači u biološkom smislu?", answers: { A: "Hormon baza", B: "Hematološki bazen", C: "Hidro baza", D: "Hemoglobin" }, correct: "D" },
{ question: "Koji instrument ima najviše tipki u standardnoj orkestralnoj upotrebi?", answers: { A: "Klavir", B: "Harmonika", C: "Harfa", D: "Orgulje" }, correct: "D" },
{ question: "Koji muzički pravac je nastao u Bronxu 1970-ih i uključuje DJ-ing, MC-ing i breakdance?", answers: { A: "Jazz", B: "Rock", C: "Hip-hop", D: "Techno" }, correct: "C" },
{ question: "Koji događaj se smatra početkom Prvog svjetskog rata?", answers: { A: "Napad na Poljsku", B: "Sarajevski atentat", C: "Bitka na Temzi", D: "Perl Harbur" }, correct: "B" },
{ question: "Koja država je prva uvela opće pravo glasa za žene?", answers: { A: "SAD", B: "Francuska", C: "Novi Zeland", D: "Švicarska" }, correct: "C" }

], 
hardest: [ 
{ question: "Koliko stepeni ima u pola kruga?", answers: { A: "90°", B: "270°", C: "180°", D: "360°" }, correct: "C" },
{ question: "Koliko puta dnevno prosječni Amerikanac otvori frižider?", answers: { A: "67", B: "11", C: "22", D: "33" }, correct: "C" },
{ question: "Šta simbolizira bijela golubica?", answers: { A: "Mir", B: "Europsku uniju", C: "Rat", D: "Sreća" }, correct: "A" },
{ question: "Za koju je povrtnu i začinsku biljku drugi naziv selen?", answers: { A: "Celer", B: "Peršun", C: "Ljubičica", D: "Ljubčac" }, correct: "D" },
{ question: "Zemljotres se mjeri kojom skalom?", answers: { A: "Kelvinova", B: "Richterova", C: "Newtonova", D: "Pascalova" }, correct: "B" },
{ question: "Ko je prva žena koja je dobila Nobelovu nagradu 1903.?", answers: { A: "Marie Curie", B: "Rosalind Franklin", C: "Ada Lovelace", D: "Dorothy Hodgkin" }, correct: "A" },
{ question: "Iz kojeg je jezika došla riječ kečap?", answers: { A: "Japanski", B: "Kineski", C: "Korejski", D: "Vijetnamski" }, correct: "B" },
{ question: "Koji je glavni grad Amerike?", answers: { A: "New York", B: "Los Angeles", C: "Washington D.C.", D: "Chicago" }, correct: "C" },
{ question: "Koja reprezentacija je osvojila Svjetsko prvenstvo 2022. godine?", answers: { A: "Francuska", B: "Brazil", C: "Argentina", D: "Hrvatska" }, correct: "C" },
{ question: "Za kojeg pjevača je značajan “Moonwalk” ples koji je izveo 1983.?", answers: { A: "Prince", B: "Elvis Presley", C: "Michael Jackson", D: "Stevie Wonder" }, correct: "C" },
{ question: "Harry, Niall, Louis, Liam i Zayn bili su u bendu. Kako se zvao bend?", answers: { A: "5 Seconds of Summer", B: "One Direction", C: "Westlife", D: "The Wanted" }, correct: "B" },
{ question: "Kako se zove glumac koji je glumio Jacka u Titanicu?", answers: { A: "Brad Pitt", B: "Johnny Depp", C: "Leonardo DiCaprio", D: "Tom Cruise" }, correct: "C" },
{ question: "Koliko posto ljudi na svijetu su ljevaci?", answers: { A: "5%", B: "8%", C: "10%", D: "15%" }, correct: "C" },
{ question: "Koji je holandski slikar odsjekao sebi uho?", answers: { A: "Johannes Vermeer", B: "Rembrandt", C: "Vincent van Gogh", D: "Piet Mondrian" }, correct: "C" },
{ question: "Koja država u Aziji (i na svijetu) ima najdužu obalnu liniju zahvaljujući svojim ostrvima?", answers: { A: "Kina", B: "Indonezija", C: "Indija", D: "Japan" }, correct: "B" },
{ question: "Koji film ima najviše osvojenih Oskara u historiji (vezano s drugim filmovima na vrhu liste)?", answers: { A: "Titanic", B: "The Lord of the Rings: The Return of the King", C: "Ben-Hur", D: "Sve navedeno imaju isti rekord" }, correct: "D" },
{ question: "Iz koje je Čolićeve pjesme stih „Izgledaš mi kao lutkica iz Trsta“?", answers: { A: "Pusti, pusti modu", B: "Ti si mi u krvi", C: "Produži dalje", D: "Jedina" }, correct: "A" },
{ question: "Za automobil koji ima i benzinski i elektro-motor kažemo da se kreće na-kakav pogon?", answers: { A: "Električni", B: "Hibridni", C: "Benzinski", D: "Dizelski" }, correct: "B" },
{ question: "Kugla koje boje,u snookeru,nakon crne vrijedi najviše bodova?", answers: { A: "Roza", B: "Plava", C: "Crvena", D: "Žuta" }, correct: "A" },
{ question: "Koji element ima najvišu tačku ključanja od svih elemenata u periodnom sistemu?", answers: { A: "Ugljik", B: "Volfram", C: "Renijum", D: "Osmijum" }, correct: "B" },
{ question: "Kako se zove teorijska granica iza koje ni svjetlost ne može pobjeći gravitaciji crne rupe?", answers: { A: "Singularitet", B: "Horizont događaja", C: "Akrecioni disk", D: "Schwarzschildova zona" }, correct: "B" },
{ question: "Koja konstanta u fizici ima približnu vrijednost 9.81 m/s²?", answers: { A: "Newtonova konstanta", B: "Ubrzanje slobodnog pada na Zemlji", C: "Planckova konstanta", D: "Coulombova konstanta" }, correct: "B" },
{ question: "Koja vrsta zvijezde ima najveću gustinu poznatu u svemiru (osim crne rupe)?", answers: { A: "Crveni div", B: "Bijeli patuljak", C: "Neutronska zvijezda", D: "Supernova" }, correct: "C" },
{ question: "Koji algoritam se koristi za pronalazak najkraćih puteva u grafovima sa negativnim težinama?", answers: { A: "Bellman-Ford", B: "Dijkstra", C: "Prim", D: "Kruskal" }, correct: "A" },
{ question: "Koji je najstariji poznati zapisani jezik u historiji čovječanstva?", answers: { A: "Sanskrit", B: "Egipatski hijeroglifi", C: "Sumerski klinopis", D: "Grčki linear B" }, correct: "C" },
{ question: "Koji element ima najvišu elektronegativnost u periodnom sistemu?", answers: { A: "Hlor", B: "Kiseonik", C: "Azot", D: "Fluor" }, correct: "D" },
{ question: "Koji matematičar je dokazao Fermatovu posljednju teoremu 1994. godine?", answers: { A: "Andrew Wiles", B: "Pierre de Fermat", C: "Leonhard Euler", D: "David Hilbert" }, correct: "A" },
{ question: "Koji je tačan redoslijed glavnih faza Mjeseca u jednoj sinodičkoj revoluciji (od mladog Mjeseca)?", answers: { A: "Mladi Mjesec → Prva četvrt → Pun Mjesec → Posljednja četvrt", B: "Mladi Mjesec → Pun Mjesec → Prva četvrt → Posljednja četvrt", C: "Mladi Mjesec → Posljednja četvrt → Prva četvrt → Pun Mjesec", D: "Pun Mjesec → Mladi Mjesec → Prva četvrt → Posljednja četvrt" }, correct: "A" },
{ question: "Koja verzija Schrödingerove jednadžbe opisuje vremensku evoluciju kvantnog sistema?", answers: { A: "Stacionarna forma", B: "Relativistička forma", C: "Vremenski zavisna forma", D: "Operatorna forma" }, correct: "C" },
{ question: "Koji sloj Zemljine atmosfere sadrži maksimum koncentracije ozona?", answers: { A: "Troposfera", B: "Stratosfera", C: "Mezosfera", D: "Termosfera" }, correct: "B" },
{ question: "Koja vrijednost konstante fine strukture α je približno tačna?", answers: { A: "1/137", B: "1/10", C: "1/1000", D: "1/27" }, correct: "A" },
{ question: "Koji od sljedećih brojeva NIJE prost, ali ima tačno dva različita prosta djelitelja?", answers: { A: "4", B: "6", C: "9", D: "12" }, correct: "B" },
{ question: "Koja riječ u lingvistici označava riječ koja se isto piše, ali ima različit izgovor i značenje?", answers: { A: "Homograf", B: "Homonim", C: "Antonim", D: "Sinonim" }, correct: "A" },
{ question: "Koje godine je održana prva zvanična sezona Svjetskog prvenstva Formule 1?", answers: { A: "1920.", B: "1950.", C: "1975.", D: "1990." }, correct: "B" },
{ question: "Koliko se trocifrenih brojeva u skupu prirodnih brojeva može dobiti od cifara 0 i 1?", answers: { A: "1", B: "2", C: "3", D: "4" }, correct: "D" },
{ question: "Kako se nazivaju lutke s pokretnim udovima koje lutkar pomiče povlačeći konce?", answers: { A: "Marionete", B: "Mimovi", C: "Pantomime", D: "Figurice" }, correct: "A" },
{ question: "Po kojoj su pjesmi „Beatlesa“ nazvani igrači Villarreala zbog prepoznatljive boje dresova?", answers: { A: "Hey Jude", B: "Yellow Submarine", C: "Let It Be", D: "Help!" }, correct: "B" },
{ question: "Ako je vjerovati Normanu Batesu,“dječakov najbolji prijatelj je njegova“-ko?", answers: { A: "Sestra", B: "Žena", C: "Brat", D: "Majka" }, correct: "D" },
{ question: "Približno koliko nervnih ćelija (neurona) ima ljudski mozak?", answers: { A: "1 milion", B: "86 milijardi", C: "500 milijardi", D: "1 trilion" }, correct: "B" },
{ question: "U kojem je gradu u junu 2011. započeta nikad dovršena turneja Amy Winehouse?", answers: { A: "London", B: "Zagreb", C: "Dubrovnik", D: "Beograd" }, correct: "D" },
{ question: "Koji je jedini hemijski element koji u čvrstom stanju ima manju gustinu nego u tečnom, slično kao voda?", answers: { A: "Bizmuta", B: "Antimon", C: "Silicijum", D: "Gvožđe" }, correct: "A" },
{ question: "Kako se zove pojava u fizici gdje tečnost prkosi gravitaciji i penje se uz zidove uskih cijevi?", answers: { A: "Viskoznost", B: "Bernoullijev efekt", C: "Kapilarnost", D: "Magnusov efekt" }, correct: "C" },
{ question: "Koji je matematičar dobio Nobelovu nagradu za ekonomiju uprkos borbi sa šizofrenijom?", answers: { A: "John Nash", B: "Alan Turing", C: "Kurt Gödel", D: "John von Neumann" }, correct: "A" },
{ question: "Koja je jedina država u Africi koja nikada nije bila formalno kolonizovana?", answers: { A: "Liberija", B: "Gana", C: "Etiopija", D: "Bocvana" }, correct: "C" },
{ question: "Koja je prva država u historiji koja je usvojila hrišćanstvo kao državnu religiju (oko 301. godine)?", answers: { A: "Etiopija", B: "Armenija", C: "Gruzija", D: "Rimsko carstvo" }, correct: "B" },
{ question: "Koji se latinizam koristi za skup postupaka ili sredstava za sprječavanje začeća?", answers: { A: "Antisepsa", B: "Sterilizacija", C: "Kontracepcija", D: "Prevencija" }, correct: "C" },
{ question: "Koji je kontroverzni umjetnik napisao svojevrsnu autobiografiju „Dnevnik genija“?", answers: { A: "Pablo Picasso", B: "Salvador Dali", C: "Frida Kahlo", D: "Andy Warhol" }, correct: "B" },
{ question: "U koju državu za božićne praznike putuje porodica McCallister u prvom dijelu serijala „Sam u kući“?", answers: { A: "Italiju", B: "Francusku", C: "Englesku", D: "Njemačku" }, correct: "B" },
{ question: "Kako se uobičajeno nazivaju narodi bez stalne postojbine koji se se stalno sele?", answers: { A: "Migranti", B: "Musafiri", C: "Kolonisti", D: "Nomadi" }, correct: "D" },
{ question: "Kako se na latinskom zove kršćanska molitva „Zdravo Marijo“?", answers: { A: "Ave Maria", B: "Ave Cezar", C: "Servus Maria", D: "Santa Maria" }, correct: "A" }
]
},

funFacts: {
easy: [
{ question: "Kojim anglizmom nazivamo pušku s optičkim nišanom za precizno gađanje?", answers: { A: "Shotgun", B: "Rifle", C: "Snajper", D: "AK 47" }, correct: "C" },
{ question: "Koji je desni pritok Une nazvan po latinskoj riječi za zdravlje?", answers: { A: "Sana", B: "Sava", C: "Vrbas", D: "Unac" }, correct: "A" },
{ question: "Koliko suverenih država u svijetu koristi američki dolar (USD) kao svoju zvaničnu valutu?", answers: { A: "5", B: "11", C: "25", D: "40" }, correct: "B" },
{ question: "Koliko sekundi traje prosječan treptaj oka?", answers: { A: "0.1–0.2", B: "0.3–0.4", C: "0.5–0.6", D: "0.8–1.0" }, correct: "B" },
{ question: "19 i 21 nazivi su prva 2 albuma pjevačice Adele,a treći se zove-kako?", answers: { A: "20", B: "22", C: "24", D: "25" }, correct: "D" },
{ question: "Odontologija je naziv za ukupno znanje o-kojim organima?", answers: { A: "Kostima", B: "Desnima", C: "Ustima", D: "Zubima" }, correct: "D" },
{ question: "Kojeg je informatičara 2013 glumio Ashton Kutcher,a 2015 Michael Fassbender?", answers: { A: "Steve Jobs", B: "Bill Gates", C: "Elon Musk", D: "Mark Zuckerberg" }, correct: "A" },
{ question: "Koja životinja može spavati i do 22 sata dnevno?", answers: { A: "Mačka", B: "Koala", C: "Lenjivac", D: "Panda" }, correct: "B" },
{ question: "Koji je prvi film koji je osvojio Oscara za najbolji film?", answers: { A: "Casablanca", B: "Gone with the Wind", C: "Wings", D: "Citizen Kane" }, correct: "C" },
{ question: "Koji je glavni sastojak japanskog jela miso supa?", answers: { A: "Soja pasta", B: "Riža", C: "Alge", D: "Riba" }, correct: "A" },
{ question: "Šta znači skraćenica BDP (engl. GDP) u ekonomiji?", answers: { A: "Bruto državni prihod", B: "Bilans društvene potrošnje", C: "Bankarski devizni promet", D: "Bruto domaći proizvod" }, correct: "D" },
{ question: "Koja valuta je bila zvanično sredstvo plaćanja u Njemačkoj prije uvođenja eura?", answers: { A: "Franak", B: "Lira", C: "Marka", D: "Šiling" }, correct: "C" },
{ question: "Ko je osnivač psihoanalize?", answers: { A: "Sigmund Freud", B: "Carl Jung", C: "B.F. Skinner", D: "Abraham Maslow" }, correct: "A" },
{ question: "Koja je prva kompanija uvela sigurnosni pojas kao standard?", answers: { A: "Mercedes-Benz", B: "Volvo", C: "Toyota", D: "Ford" }, correct: "B" },
{ question: "U kojem se stilu gradi većina srednjovjekovnih dvoraca s debelim zidovima i malim prozorima prije gotike?", answers: { A: "Barok", B: "Renesansa", C: "Romanika", D: "Klasicizam" }, correct: "C" },
{ question: "Kako se naziva pojava u kojoj osoba pod pritiskom grupe mijenja svoje mišljenje ili ponašanje?", answers: { A: "Konformizam", B: "Introverzija", C: "Empatija", D: "Kognitivna disonanca" }, correct: "A" },
{ question: "Kako se zove strah od zatvorenog prostora?", answers: { A: "Agorafobija", B: "Klaustrofobija", C: "Akrofobija", D: "Hidrofobija" }, correct: "B" },
{ question: "Koji modni brend ima logo sa dva isprepletena slova 'C'?", answers: { A: "Gucci", B: "Chanel", C: "Cartier", D: "Coach" }, correct: "B" },
{ question: "Koja država je domovina luksuznog brenda satova 'Rolex'?", answers: { A: "Francuska", B: "Italija", C: "Švicarska", D: "Njemačka" }, correct: "C" },
{ question: "Koja država je domovina proizvođača automobila 'Volvo'?", answers: { A: "Njemačka", B: "Švedska", C: "Norveška", D: "Japan" }, correct: "B" },
{ question: "Kako se zove najprodavaniji model automobila u historiji (svjetski nivo)?", answers: { A: "Volkswagen Golf", B: "Ford F-Series", C: "Honda Civic", D: "Toyota Corolla" }, correct: "D" },
{ question: "U kojem gradu se nalazi sjedište kompanije 'BMW'?", answers: { A: "Berlin", B: "Stuttgart", C: "Frankfurt", D: "München" }, correct: "D" },
{ question: "Koji italijanski brend je poznat po modelima 'Aventador' i 'Huracán'?", answers: { A: "Ferrari", B: "Lamborghini", C: "Alfa Romeo", D: "Fiat" }, correct: "B" },
{ question: "Koji gas je primarni uzročnik efekta staklene bašte na Zemlji?", answers: { A: "Azot", B: "Kiseonik", C: "ArgonU", D: "gljik-dioksid" }, correct: "D" },
{ question: "Kako se zove stil gradnje karakterističan po oštrim lukovima i vitražima (npr. katedrala Notre Dame)?", answers: { A: "Romanika", B: "Barok", C: "Gotika", D: "Renesansa" }, correct: "C" },
{ question: "Koji arhitekta je dizajnirao čuvenu crkvu Sagrada Familia u Barceloni?", answers: { A: "Antoni Gaudi", B: "Le Corbusier", C: "Frank Lloyd Wright", D: "Oscar Niemeyer" }, correct: "A" },
{ question: "Kako se zove najveći amfiteatar ikada izgrađen, smješten u centru Rima?", answers: { A: "Panteon", B: "Forum", C: "Koloseum", D: "Akropolj" }, correct: "C" },
{ question: "Koja vrsta kafe ima najviše mlijeka?", answers: { A: "Espresso", B: "Macchiato", C: "Latte", D: "Americano" }, correct: "C" },
{ question: "Koja planeta je poznata kao 'Crvena planeta'?", answers: { A: "Mars", B: "Jupiter", C: "Venera", D: "Saturn" }, correct: "A" },
{ question: "Koja je najbliža zvijezda Zemlji?", answers: { A: "Sunce", B: "Alfa Centauri", C: "Sirius", D: "Polaris" }, correct: "A" },
{ question: "Koja država je domovina Anime crtanih filmova?", answers: { A: "Kina", B: "Južna Koreja", C: "Tajland", D: "Japan" }, correct: "D" },
{ question: "U kojem fiktivnom gradu živi Spider-Man?", answers: { A: "Gotham", B: "Metropolis", C: "New York", D: "Central City" }, correct: "C" },
{ question: "Koji pas je najbolji prijatelj Mickey Mousea?", answers: { A: "Pluto", B: "Šiljo (Goofy)", C: "Snoopy", D: "Scooby-Doo" }, correct: "A" },
{ question: "Šta znači latinska fraza 'Carpe Diem'?", answers: { A: "Mislim, dakle postojim", B: "Iskoristi dan", C: "Dođoh, vidjeh, pobijedih", D: "Znanje je moć" }, correct: "B" },
{ question: "Iz kojeg jezika potiče riječ 'robot'?", answers: { A: "Češkog", B: "Njemačkog", C: "Ruskog", D: "Engleskog" }, correct: "A" },
{ question: "Kako se zove najviši vrh Bosne i Hercegovine?", answers: { A: "Vlašić", B: "Maglić", C: "Prenj", D: "Bjelašnica" }, correct: "B" },
{ question: "Koje godine je preminuo južnoafrički lider Nelson Mandela?", answers: { A: "2010.", B: "2013.", C: "2015.", D: "2018." }, correct: "B" },
{ question: "Koji poznati bokser je rođen pod imenom Cassius Clay?", answers: { A: "Mike Tyson", B: "Joe Frazier", C: "Muhammad Ali", D: "George Foreman" }, correct: "C" },
{ question: "Koja je prva društvena mreža koja je uvela koncept 'storija' (Stories)?", answers: { A: "Facebook", B: "Instagram", C: "Snapchat", D: "WhatsApp" }, correct: "C" },
{ question: "Koji naučnik je postavio tri zakona kretanja?", answers: { A: "Albert Einstein", B: "Stephen Hawking", C: "Nikola Tesla", D: "Isaac Newton" }, correct: "D" },
{ question: "U koju porodicu insekata ubrajamo ljutog stršljena latinskog naziva „vespa crabro“?", answers: { A: "Pčele", B: "Muhe", C: "Ose", D: "Mrave" }, correct: "C" },
{ question: "Koja je službena kombinacija boja na dresovima „Newcastlea“,“Udinesea“ i „PAOK“-a?", answers: { A: "Crveno-plava", B: "Crno-crvena", C: "Crno-bijela", D: "Plavo-žuta" }, correct: "C" },
{ question: "Ko je napisao i prvi izvodio Claptonov hit I shot the seriff?", answers: { A: "Bob Dylan", B: "Bob Marley", C: "Elvis Presley", D: "Eric Clapton" }, correct: "B" },
{ question: "Koju fizikalnu veličinu nazivamo i akceleracija?", answers: { A: "Brzina", B: "Sila", C: "Ubrzanje", D: "Slobodan pad" }, correct: "C" },
{ question: "Kako se zove Puškinov roman u stihovima iz 1833?", answers: { A: "Ruslan i Ljudmila", B: "Kapetanova kći", C: "Jevgenij Onjegin", D: "Boris Godunov" }, correct: "C" },
{ question: "U kojem je gradu 632. umro poslanik Muhamed s.a.w.s?", answers: { A: "Medini", B: "Meki", C: "Jerusalemu", D: "Damasku" }, correct: "A" },
{ question: "Kako zovemo gornji sloj ceste od pravilno složenih kamenih kocki koji su u naše krajeve donijeli Turci?", answers: { A: "Asfalt", B: "Kaldrma", C: "Šljunak", D: "Beton" }, correct: "B" },
{ question: "Ko se Polifernu predstavio riječima „Moje ime je niko...“?", answers: { A: "Ahil", B: "Odisej", C: "Hektor", D: "Persej" }, correct: "B" },
{ question: "Koji je dio oka odgovoran za regulaciju količine svjetlosti?", answers: { A: "Rožnjača", B: "Mrežnjača", C: "Zjenica", D: "Očna leća" }, correct: "C" },
{ question: "Koji je naziv za crnu rupu u centru naše galaksije?", answers: { A: "Andromeda X", B: "Sagittarius A*", C: "Cygnus X-1", D: "Orion Core" }, correct: "B" },
{ question: "Koji hormon je poznat kao 'hormon stresa'?", answers: { A: "Adrenalin", B: "Serotonin", C: "Melatonin", D: "Insulin" }, correct: "A" },
{ question: "Koji planet ima najkraći dan (najbržu rotaciju)?", answers: { A: "Mars", B: "Jupiter", C: "Merkur", D: "Saturn" }, correct: "B" },
{ question: "Koji dio ljudskog tijela nema direktan dotok krvi?", answers: { A: "Rožnjača oka", B: "Jezik", C: "Uho", D: "Mozak" }, correct: "A" },
{ question: "Koja zvijezda je najbliža Zemlji nakon Sunca?", answers: { A: "Proxima Centauri", B: "Sirius", C: "Betelgeuse", D: "Vega" }, correct: "A" },
{ question: "Koliko kostiju ima odrasla ljudska ruka (uključujući šaku)?", answers: { A: "27", B: "33", C: "37", D: "41" }, correct: "A" },
{ question: "Kako se naziva jedini unutrašnji organ u ljudskom tijelu koji se može potpuno regenerisati?", answers: { A: "Srce", B: "Mozak", C: "Jetra", D: "Pluća" }, correct: "C" },
{ question: "Kako se zove igrač u odbojci koji je specijalizovan za odbranu i prijem servisa?", answers: { A: "Libero", B: "Korektor", C: "Srednji bloker", D: "Pucač" }, correct: "A" },
{ question: "Kako se zove divovski štakor,učitelj Nindža kornjača?", answers: { A: "Splinter", B: "Shredder", C: "Master Rat", D: "Karai" }, correct: "A" },
{ question: "Slovenac Peter Prevc prvi je skijaš-skakač koji je letio-koliko metara?", answers: { A: "230 m", B: "240 m", C: "250 m", D: "260 m" }, correct: "C" },
{ question: "Koja se abeceda sastoji od 6 ispupčenih točaka koje se mogu kombinirati u različitim oblicima?", answers: { A: "Morseova", B: "Brailleova", C: "Latinska", D: "Grčka" }, correct: "B" },
{ question: "Koja prezime povezuje britanskog ekonomistu Friedricha i meksičku glumicu Salmu?", answers: { A: "Smith", B: "Hayek", C: "Gomez", D: "Lopez" }, correct: "B" },
{ question: "S kojom državom Ekvador graniči na jugu i na istoku?", answers: { A: "Peru", B: "Čile", C: "Bolivija", D: "Kolumbija" }, correct: "A" },
{ question: "Koliko metlobojskih momčadi igra godišnji turnir u romanima u Harryju Potteru?", answers: { A: "2", B: "3", C: "4", D: "5" }, correct: "C" },
{ question: "Koji je najmnogoljudniji grad u Indiji?", answers: { A: "New Delhi", B: "Mumbai", C: "Kolkata", D: "Bangalore" }, correct: "B" },
{ question: "Koja država je bila domaćin Svjetskog prvenstva 2014. godine?", answers: { A: "Rusija", B: "Brazil", C: "Južna Afrika", D: "Katar" }, correct: "B" },
{ question: "Šta u ring baca trener boksača kad želi prekinuti borbu?", answers: { A: "Rukavicu", B: "Peškir bijeli", C: "Uže", D: "Štap" }, correct: "B" },
{ question: "Kojem plemenu žena-ratnica pripada super-junakinja Wonder Woman?", answers: { A: "Spartankama", B: "Vikinzima", C: "Amazonkama", D: "Maje" }, correct: "C" },
{ question: "U kojoj je europskoj državi katalonski jedini službeni jezik?", answers: { A: "Andora", B: "Španija", C: "Francuska", D: "Italija" }, correct: "A" },
{ question: "Kako se, kod trougla, zove dužina koja spaja vrh trokuta s polovištem suprotne stranice?", answers: { A: "Simetrala ugla", B: "Težišnica", C: "Visina", D: "Ortocentar" }, correct: "B" },
{ question: "U logu koje se internetske enciklopedije nalazi nedovršena kugla od puzzli?", answers: { A: "Britannica", B: "WikiLeaks", C: "ChatGPT", D: "Wikipedia" }, correct: "D" },
{ question: "Kako se zove glavni grad Pakistana iz čijeg imena možemo zaključiti koja je većinska religija njegovih stanovnika?", answers: { A: "Karachi", B: "Lahore", C: "Islamabad", D: "Peshawar" }, correct: "C" },
{ question: "Koji je grad domaćin automobilističke Velike nagrade Australije i teniskog Australian opena?", answers: { A: "Sydney", B: "Brisbane", C: "Melbourne", D: "Perth" }, correct: "C" },
{ question: "Kako jednom riječju nazivamo zemlje sjeverozapadne Afrike Alžir, Maroko, Libiju i Tunis?", answers: { A: "Levant", B: "Magreb", C: "Sahel", D: "Sahara" }, correct: "B" },
{ question: "U kojem su gradu sjedište Europske svemirske agencije, OECD-a i UNESCO-a?", answers: { A: "Ženevi", B: "Bruxellesu", C: "Parizu", D: "Berlinu" }, correct: "C" },
{ question: "Koji je reper 1999. osnovao diskografsku kuću Shady Records?", answers: { A: "Dr. Dre", B: "Eminem", C: "50 Cent", D: "Snoop Dogg" }, correct: "B" },
{ question: "Kako se zove potez kada igrač u odbojci snažno udara loptu prema protivničkom terenu?", answers: { A: "Blok", B: "Servis", C: "Smeč", D: "Dig" }, correct: "C" },
{ question: "Kako se u anatomiji zovu sitni mjehurići u jajniku, štitnoj žlijezdi ili uz korijen dlake?", answers: { A: "Vezikule", B: "Alveole", C: "Folikule", D: "Tubule" }, correct: "C" },
{ question: "Kako još zovemo gmizavce, prema njihovom latinskom imenu?", answers: { A: "Amfibije", B: "Reptili", C: "Mammalia", D: "Aves" }, correct: "B" },
{ question: "Koji je europski glavni grad podijeljen na 23 distrikta?", answers: { A: "Berlin", B: "Prag", C: "Beč", D: "Budimpešta" }, correct: "C" },
{ question: "Koji se bosansko-hercegovački grad u doba Jugoslavije zvao Pucarevo?", answers: { A: "Zenica", B: "Travnik", C: "Novi Travnik", D: "Bugojno" }, correct: "C" },
{ question: "Koje je boje 5 zvijezda petokraka na kineskoj zastavi?", answers: { A: "Crvene", B: "Plave", C: "Žute", D: "Bijele" }, correct: "C" },
{ question: "Roman „Gospođica Dalloway“ prikazuje koliko dana u životu naslovne junakinje?", answers: { A: "Jedan", B: "Dva", C: "Sedam", D: "Trideset" }, correct: "A" },
{ question: "Koji je basnopisac, prema predaji, bačen s litice nakon što je lažno optužen za krađu u delfskom hramu?", answers: { A: "Ezop", B: "Homer", C: "Sofoklo", D: "Herodot" }, correct: "A" },
{ question: "Koliko centimetara ima stopa?", answers: { A: "25.48 cm", B: "28.50 cm", C: "30.48 cm", D: "33.48 cm" }, correct: "C" },
{ question: "Koliko sekundi traje maksimalno držanje lopte u rukometu bez dodavanja ili šuta?", answers: { A: "11", B: "3", C: "24", D: "8" }, correct: "B" },
{ question: "Koliko kostiju ima ljudsko tijelo odrasle osobe?", answers: { A: "206", B: "201", C: "216", D: "198" }, correct: "A" },
{ question: "Koliko izmjena maksimalno dozvoljava FIFA u regularnoj fudbalskoj utakmici (od 2020-ih pravila)?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "C" },
{ question: "Koliko setova maksimalno može trajati tenis meč u muškoj Grand Slam konkurenciji?", answers: { A: "3", B: "5", C: "7", D: "6" }, correct: "B" },
{ question: "Kojim slovom počinju imena najvećeg broja europskih glavnih gradova?", answers: { A: "A", B: "B", C: "C", D: "D" }, correct: "B" },
{ question: "Šta je Petar Pan izgubio u sobi Wendy Darling, pa mu je ona to kasnije sašila nazad?", answers: { A: "cipelu", B: "kapu", C: "rukavicu", D: "sjenu" }, correct: "D" },
{ question: "Kinologija je nauka koja se bavi proučavanjem i uzgojem kojih životinja?", answers: { A: "mačke", B: "konji", C: "ptice", D: "psi" }, correct: "D" },
{ question: "Dlaka koje se životinje koristi za proizvodnju skupocjene vune poznate kao moher?", answers: { A: "ovca", B: "tigar", C: "lama", D: "koza" }, correct: "D" },
{ question: "Koje tvari u ljudskom organizmu uzrokuju nagli fizički rast tokom puberteta?", answers: { A: "enzimi", B: "vitamini", C: "hormoni", D: "minerali" }, correct: "C" },
{ question: "Kojoj državi pripada otok Komodo, poznat po najvećim gušterima na svijetu?", answers: { A: "Malezija", B: "Indonezija", C: "Filipini", D: "Papua Nova Gvineja" }, correct: "B" },
{ question: "Koja je najveća cifra (broj) koja se može upisati u jedno polje Sudoku slagalice?", answers: { A: "6", B: "7", C: "8", D: "9" }, correct: "D" },
{ question: "Kojeg osnivača Facebooka je glumio Jesse Eisenberg u filmu 'The Social Network'?", answers: { A: "Elon Musk", B: "Bill Gates", C: "Mark Zuckerberg", D: "Steve Jobs" }, correct: "C" },
{ question: "Čija je 41. simfonija u C-duru ostala poznata pod nadimkom 'Jupiterova simfonija'?", answers: { A: "Beethoven", B: "Mozart", C: "Haydn", D: "Bach" }, correct: "B" },
{ question: "Koja je gimnastička disciplina sa skokovima od 2000. godine postala zvanični olimpijski sport?", answers: { A: "Trampolin", B: "Preskok", C: "Trampulin", D: "Akrobatika" }, correct: "A" },
{ question: "U koje more utječu velike evropske rijeke Wisla, Odra i Neva?", answers: { A: "Crno more", B: "Balkajsko more", C: "Sjeverno more", D: "Baltičko more" }, correct: "D" },
{ question: "Kolika je standardna visina mreže u ženskoj odbojci?", answers: { A: "2.20 m", B: "2.24 m", C: "2.30 m", D: "2.43 m" }, correct: "B" }

],
hard: [
{ question: "Kako se zove najviša planina u Keniji?", answers: { A: "Kilimandžaro", B: "Elgon", C: "Ruwenzori", D: "Mount Kenya" }, correct: "D" },
{ question: "Koliko godina ima Harry Potter u prvom romanu u kojem se pojavljuje?", answers: { A: "15", B: "13", C: "9", D: "11" }, correct: "D" },
{ question: "Koja je velika otočna skupina u Oceaniji nazvana po velikom broju otoka, njih više od 1000?", answers: { A: "Melanezija", B: "Mikronezija", C: "Polinezija", D: "Indonezija" }, correct: "C" },
{ question: "Koliko stihova ima osnovni oblik talijanskog soneta?", answers: { A: "12", B: "13", C: "14", D: "15" }, correct: "C" },
{ question: "Koliko država u svijetu ima ime koje počinje slovom 'A' (približno)?", answers: { A: "6-7", B: "8-9", C: "11-12", D: "15-16" }, correct: "C" },
{ question: "Koliko igrača jedne ekipe je istovremeno na terenu u odbojci?", answers: { A: "5", B: "6", C: "7", D: "8" }, correct: "B" },
{ question: "Koja se američka glumica zove i preziva kao Shakespeareova supruga?", answers: { A: "Emma Stone", B: "Anne Hathaway", C: "Scarlett Johansson", D: "Natalie Portman" }, correct: "B" },
{ question: "Koji naziv dijele španjolski ples umjerenog tempa i kratak ženski kaputić?", answers: { A: "Flamenco", B: "Salsa", C: "Bolero", D: "Tango" }, correct: "C" },
{ question: "U kojem je zloglasnom zatvoru najveći dio kazne odslužio Al Capone?", answers: { A: "Alcatraz", B: "Sing Sing", C: "San Quentin", D: "Rikers" }, correct: "A" },
{ question: "Koja je najmnogoljudnija država s većinskim katoličkim stanovništvom?", answers: { A: "Kina", B: "SAD", C: "Italija", D: "Brazil" }, correct: "D" },
{ question: "Koji anglizam označava palicu za igranje video-igara?", answers: { A: "Gamepad", B: "Joystick", C: "Controller", D: "Arcade stick" }, correct: "B" },
{ question: "Koja je država 2014. ostvarila 15% svjetskog izvoza kožnih cipela?", answers: { A: "Španija", B: "Francuska", C: "Turska", D: "Italija" }, correct: "D" },
{ question: "Koja se riječ francuskog porijekla koristi za prisilno iseljenje stanara na temelju pravomoćne sudske odluke?", answers: { A: "Depozicija", B: "Deložacija", C: "Evikcija", D: "Eksproprijacija" }, correct: "B" },
{ question: "Koja riječ grčkog porijekla označava medicinsku ustanovu s većim brojem specijalističkih ambulanti?", answers: { A: "Klinika", B: "Poliklinika", C: "Bolnica", D: "Bolnica" }, correct: "B" },
{ question: "Koja je nogometna reprezentacija triput bila vice-prvak, a nijednom prvak svijeta?", answers: { A: "Belgija", B: "Hrvatska", C: "Nizozemska", D: "Japan" }, correct: "C" },
{ question: "S kojim troslovnim germanizmom za „dobro pečeno“ naziv dijeli dvadeseto slovo hebrejskog pisma?", answers: { A: "Reš", B: "Well", C: "Gut", D: "Top" }, correct: "A" },
{ question: "Koji se germanizam za stručnjaka i vrsnog znalca krije u anagramu riječi „harem“?", answers: { A: "Mehar", B: "Maher", C: "Hamer", D: "Rehma" }, correct: "B" },
{ question: "Koja se hemijska sinteza u zelenim dijelovima biljke odvija pomoću svjetlosne energije i klorofila?", answers: { A: "Respiracija", B: "Hlorofiacija", C: "Fermentacija", D: "Fotosinteza" }, correct: "D" },
{ question: "Koja se grana interne medicine bavi liječenjem bolesti srca i krvnih žila?", answers: { A: "Neurologija", B: "Endokrinologija", C: "Pulmologija", D: "Kardiologija" }, correct: "D" },
{ question: "Koja je, nakon Kine i Indije, najmnogoljudnija azijska država?", answers: { A: "Pakistan", B: "Bangladeš", C: "Japan", D: "Indonezija" }, correct: "D" },
{ question: "Kako glasi skraćenica organizacije UN-a za nauku, obrazovanje i kulturu?", answers: { A: "UNICEF", B: "UN NOK", C: "UNDP", D: "UNESCO" }, correct: "D" },
{ question: "Koliko traje jedno poluvrijeme u rukometnoj utakmici?", answers: { A: "20 minuta", B: "25 minuta", C: "30 minuta", D: "45 minuta" }, correct: "C" },
{ question: "Koja država je najuspješnija u ženskom rukometu na Svjetskim prvenstvima (do 2025.)?", answers: { A: "Norveška", B: "Rusija", C: "Danska", D: "Francuska" }, correct: "A" },
{ question: "Koliko metara iznosi udaljenost linije penala od gola u rukometu?", answers: { A: "6 metara", B: "7 metara", C: "9 metara", D: "5 metara" }, correct: "B" },  
{ question: "Koji igrač je poznat po nadimku 'La Pulga' (Buha)?", answers: { A: "Luis Suárez", B: "Sergio Agüero", C: "Lionel Messi", D: "Ángel Di María" }, correct: "C" },
{ question: "Kojem je dječjem romanu Felixa Saltena podnaslov „Jedan život u šumi“?", answers: { A: "Bambi", B: "Mali princ", C: "Pinokio", D: "Knjiga o džungli" }, correct: "A" },
{ question: "Ako smo ravnodušni prema nekom, za njega marimo kao za kakav „snijeg“?", answers: { A: "Jučerašnji", B: "Lanjski", C: "Zimski", D: "Proljetni" }, correct: "B" },
{ question: "Koja savezna država SAD-a ima najdužu granicu s Meksikom?", answers: { A: "Kalifornija", B: "Arizona", C: "Texas", D: "Novi Meksiko" }, correct: "C" },
{ question: "Koji je igrač „Bayern Minhena“ 2015. u 9 minuta „Wolfsburgu“ zabio 5 puta?", answers: { A: "Mats Hummels", B: "Edin Džeko", C: "Marco Reus", D: "Robert Lewandowski" }, correct: "D" },
{ question: "Koji postotak zemljina kopna zauzimaju otoci?", answers: { A: "7%", B: "10%", C: "15%", D: "20%" }, correct: "A" },
{ question: "Kako se naziva zlonamjerni softver koji zaključa podatke korisnika i traži otkupninu?", answers: { A: "Spyware", B: "Ransomware", C: "Adware", D: "Trojanac" }, correct: "B" },
{ question: "Šta u digitalnom svijetu označava kratica VPN?", answers: { A: "Virtual Private Network", B: "Visual Protocol Node", C: "Verified Path Number", D: "Variable Port Node" }, correct: "A" },
{ question: "Koliko metara iznosi jedan nanometar?", answers: { A: "Milioniti dio metra", B: "Milijarditi dio metra", C: "Hiljaditi dio metra", D: "Trilioniti dio metra" }, correct: "B" },
{ question: "Kojim imenom nazivamo najpoznatiju prugu koja spaja Moskvu i Vladivostok?", answers: { A: "Orient Express", B: "Blue Train", C: "Svileni put", D: "Transsibirska željeznica" }, correct: "D" },
{ question: "Koji dio ćelije je poznat kao 'elektrana' jer proizvodi energiju (ATP)?", answers: { A: "Mitohondrija", B: "Ribozomi", C: "Jedro", D: "Golđijev aparat" }, correct: "A" },
{ question: "Koji organel sadrži genetski materijal (DNA) ćelije?", answers: { A: "Citoplazma", B: "Ribozomi", C: "Vakuola", D: "Nukleus" }, correct: "D" },
{ question: "Kako se zove čuveni kamen pomoću kojeg su dešifrovani egipatski hijeroglifi?", answers: { A: "Kamen iz Gize", B: "Smaragdna ploča", C: "Hamurabijev kamen", D: "Kamen iz Rozete" }, correct: "D" },
{ question: "Koji morski sisar je poznat kao 'kit ubica', iako zapravo pripada porodici delfina?", answers: { A: "Narval", B: "Orka", C: "Beluga", D: "Grbavi kit" }, correct: "B" },
{ question: "Koja reprezentacija je osvojila najviše titula svjetskog prvaka u hokeju na ledu?", answers: { A: "SAD", B: "Švedska", C: "Rusija (sa SSSR)", D: "Kanada" }, correct: "D" },
{ question: "U kojem sportu se reprezentacije bore za trofej pod nazivom 'Webb Ellis Cup'?", answers: { A: "Fudbalu", B: "Ragbiju", C: "Kriketu", D: "Polu" }, correct: "B" },
{ question: "Kojeg se datuma u Engleskoj obilježava Boxing Day?", answers: { A: "25.12.", B: "26.12.", C: "27.12.", D: "01.01." }, correct: "B" },
{ question: "Koju riječ označava zaokruženo slovo C u znaku kojim su zaštićena autorska prava?", answers: { A: "Patent", B: "Trademark", C: "Copyright", D: "Licence" }, correct: "C" },
{ question: "Ako je unutar Kine Unutarnja Mongolija, u kojoj je državi Vanjska Mongolija?", answers: { A: "Rusiji", B: "Kini", C: "Nepalu", D: "Mongoliji" }, correct: "D" },
{ question: "Koliko je ukupno crvenih kugli u snookeru/bilijaru?", answers: { A: "15", B: "17", C: "18", D: "21" }, correct: "A" },
{ question: "Uz koju se šahovsku figuru povezuje potez „en passant“?", answers: { A: "Kralj", B: "Kraljica", C: "Lovac", D: "Pijun" }, correct: "D" },
{ question: "Područje velikih rudnih ležišta nazivamo rudni-što?", answers: { A: "Bazen", B: "Sistem", C: "Požar", D: "Rejon" }, correct: "A" },
{ question: "Koliko poena je potrebno za osvajanje seta u standardnoj odbojci (uz minimalno 2 poena razlike)?", answers: { A: "21", B: "25", C: "30", D: "15" }, correct: "B" },
{ question: "Ko je autor slike „Crveni vinograd“ koju je belgijska slikarica Anna Boch kupila za 400 franaka?", answers: { A: "Claude Monet", B: "Vincent van Gogh", C: "Paul Cézanne", D: "Edgar Degas" }, correct: "B" },
{ question: "Kojem je programskom jeziku simbol šalica kave?", answers: { A: "Python", B: "C++", C: "Java", D: "Ruby" }, correct: "C" },
{ question: "Koji je prvi planet na koji je sletjela letjelica poslana sa Zemlje?", answers: { A: "Mars", B: "Venera", C: "Mjesec", D: "Merkur" }, correct: "B" }

], 
hardest: [ 
{ question: "Koja je nobelovka bila prva predavačica na pariškoj Sorboni?", answers: { A: "Rosalind Franklin", B: "Marie Curie", C: "Irène Joliot-Curie", D: "Dorothy Hodgkin" }, correct: "B" },
{ question: "U kojem kontroverznom romanu Dan Brown iznosi teoriju o živućim Kristovim potomcima?", answers: { A: "Anđeli i demoni", B: "Inferno", C: "Da Vincijev kod", D: "Izgubljeni simbol" }, correct: "C" },
{ question: "U kojem je dijelu uha smještena eustahijeva tuba?", answers: { A: "Vanjsko uho", B: "Srednje uho", C: "Unutrašnje uho", D: "Bubna opna" }, correct: "B" },
{ question: "Koja država je osvojila Euro 2020 (igran 2021)?", answers: { A: "Engleska", B: "Španija", C: "Italija", D: "Francuska" }, correct: "C" },
{ question: "Koji pigment nije u dovoljnoj količini zastupljen u organizmu albino osoba?", answers: { A: "Klorofil", B: "Hemoglobin", C: "Melanin", D: "Keratin" }, correct: "C" },
{ question: "Kojom engleskom riječju zovemo djevojke domaćice na raznim gospodarskim priredbama?", answers: { A: "Assistants", B: "Hostesses", C: "Guides", D: "Influencers" }, correct: "B" },
{ question: "Kako se, u gimnastici, zove okret tijela u letu prema naprijed ili natrag za najmanje 360 stepeni?", answers: { A: "Salta", B: "Spirala", C: "Skok", D: "Okret" }, correct: "A" },
{ question: "Šta znači skraćenica igrice GTA?", answers: { A: "Grand Tactical Assault", B: "Great Theft Action", C: "Grand Theft Auto", D: "Global Transport Agency" }, correct: "C" },
{ question: "Kojom se naukom bavio Carl Leverkus po kojem je 1930. nazvan jedan njemački grad?", answers: { A: "Fizikom", B: "Hemijom", C: "Biologijom", D: "Matematikom" }, correct: "B" },
{ question: "Kojoj je državi pobjedu na Eurosongu donijela pjevačica Conchita Wurst?", answers: { A: "Švicarskoj", B: "Švedskoj", C: "Njemačkoj", D: "Austriji" }, correct: "D" },
{ question: "Auto-oznaka koje je države prva na abecednom popisu međunarodnih registracijskih oznaka?", answers: { A: "Albanije", B: "Andore", C: "Australije", D: "Austrije" }, correct: "D" },
{ question: "U kojem se gradu nalazi Kupola na stijeni, najstarija islamska građevina na svijetu?", answers: { A: "Meki", B: "Medini", C: "Damasku", D: "Jerusalemu" }, correct: "D" },
{ question: "Na kojem su otoku Cagliari i Sassari najveći gradovi?", answers: { A: "Siciliji", B: "Korzici", C: "Sardiniji", D: "Malti" }, correct: "C" },
{ question: "Kako se u hemiji nazivaju soli ugljične kiseline?", answers: { A: "Sulfati", B: "Nitratu", C: "Karbonati", D: "Fosfati" }, correct: "C" },
{ question: "Koji je jedini hemijski element koji je tečan na sobnoj temperaturi, a nije metal?", answers: { A: "Jod", B: "Hlor", C: "Brom", D: "Živa" }, correct: "C" },
{ question: "Koja je država na svijetu najveći proizvođač uranijuma, pokrivajući preko 40% potreba?", answers: { A: "Australija", B: "Kazahstan", C: "Kanada", D: "Rusija" }, correct: "B" },
{ question: "Kako se zove prva žena koja je poletjela u svemir 1963. godine letjelicom Vostok 6?", answers: { A: "Sally Ride", B: "Svetlana Savitskaya", C: "Judith Resnik", D: "Valentina Tereškova" }, correct: "D" },
{ question: "Koji je moreuz poznat pod nadimkom 'Vrata suza'?", answers: { A: "Hormuški tjesnac", B: "Bab-el-Mandeb", C: "Malajski prolaz", D: "Bosfor" }, correct: "B" },
{ question: "U kojoj se državi nalazi najveći monolit na svijetu poznat kao Uluru?", answers: { A: "Južna Afrika", B: "Brazil", C: "Australija", D: "SAD" }, correct: "C" },
{ question: "Koji je jedini sisar na svijetu koji ima krljušti?", answers: { A: "Pangolin", B: "Armadilo", C: "Mravojed", D: "Torbarski vuk" }, correct: "A" },
{ question: "Koja je jedina monarhija među pet stalnih članica Vijeća sigurnosti UN-a?", answers: { A: "Francuska", B: "Kina", C: "Ujedinjeno Kraljevstvo", D: "SAD" }, correct: "C" },
{ question: "Koja je jedina država Latinske Amerike u kojoj je službeni jezik francuski?", answers: { A: "Gvajana", B: "Ekvador)", C: "Haiti", D: "Surinam" }, correct: "C" },
{ question: "Koja država učestvuje u ragbi turniru 6 nacija uz Francusku, Englesku, Irsku, Škotsku i Wales?", answers: { A: "Italija", B: "Njemačka", C: "Španija", D: "Nizozemska" }, correct: "A" },
{ question: "Koji je narod dao najveći broj papa u povijesti?", answers: { A: "Francuzi", B: "Španci", C: "Argentinci", D: "Talijani" }, correct: "D" },
{ question: "Koji je najpoznatiji antički grad-država koji je bio glavni rival Atine u Peloponeskom ratu?", answers: { A: "Sparta", B: "Troja", C: "Tebe", D: "Korint" }, correct: "A" },
{ question: "U geologiji, kako se naziva skala koja mjeri tvrdoću minerala od 1 do 10?", answers: { A: "Richterova skala", B: "Celsiusova skala", C: "Mohsova skala", D: "Kelvinova skala" }, correct: "C" },
{ question: "Kako se naziva književni stil koji koristi pretjerivanje radi postizanja efekta (npr. 'čeka me milion obaveza')?", answers: { A: "Metafora", B: "Ironija", C: "Personifikacija", D: "Hiperbola" }, correct: "D" },
{ question: "U biologiji, kako se naziva zajednica organizama koji žive zajedno i imaju koristi jedni od drugih?", answers: { A: "Simbioza", B: "Parazitizam", C: "Predacija", D: "Kanibalizam" }, correct: "A" },
{ question: "U hemiji, kako se nazivaju elementi koji se nalaze u 18. grupi periodnog sistema i vrlo su nereaktivni?", answers: { A: "Alkalni metali", B: "Halogeni elementi", C: "Plemeniti gasovi", D: "Lanthanoidi" }, correct: "C" },
{ question: "U pomorskom pravu, kako se naziva međunarodni signal za pomoć (SOS)?", answers: { A: "Mayday", B: "Roger", C: "Over", D: "Copy" }, correct: "A" },
{ question: "Kako se zove najviši aktivni vulkan u Evropi?", answers: { A: "Vezuv", B: "Santorini", C: "Etna", D: "Stromboli" }, correct: "C" },
{ question: "U ekonomiji, kako se naziva nagli i nekontrolisani porast cijena?", answers: { A: "Deflacija", B: "Recesija", C: "Stagnacija", D: "Hiperinflacija" }, correct: "D" },
{ question: "Kako se u lingvistici naziva riječ koja se piše isto, ali ima različito značenje (npr. kosa)?", answers: { A: "Sinonim", B: "Homonim", C: "Antonim", D: "Arhaizam" }, correct: "B" },
{ question: "Kako se zove fiktivni detektiv kojeg je kreirala Agatha Christie, poznat po svojim 'malim sivim ćelijama'?", answers: { A: "Sherlock Holmes", B: "Philip Marlowe", C: "Arsène Lupin", D: "Hercule Poirot" }, correct: "D" },
{ question: "Koji dio ljudskog uha je odgovoran za održavanje ravnoteže?", answers: { A: "Bubna opna", B: "Polukružni kanalići", C: "Čekić, nakovanj i uzengija", D: "Pužnica" }, correct: "B" },
{ question: "U digitalnoj tehnologiji, šta označava kratica URL?", answers: { A: "User Remote Link", B: "Universal Radio Line", C: "United Resource Locator", D: "Uniform Resource Locator" }, correct: "D" },
{ question: "Kako se naziva nauka koja proučava oblake?", answers: { A: "Speleologija", B: "Ihtiologija", C: "Nefologija", D: "Petrologija" }, correct: "C" },
{ question: "Koji od sljedećih pojmova u biologiji označava 'programiranu smrt ćelije'?", answers: { A: "Mitoza", B: "Mejoza", C: "Apoptoza", D: "Nekroza" }, correct: "C" },
{ question: "Koja je logička negacija tvrdnje: 'Svi ljudi su smrtni'?", answers: { A: "Nijedan čovjek nije smrtan", B: "Neki ljudi nisu smrtni", C: "Svi ljudi su besmrtni", D: "Neki ljudi su smrtni" }, correct: "B" },
{ question: "Koja država je prva na svijetu uvela opšti porez na dohodak (income tax) u modernom obliku?", answers: { A: "SAD", B: "Francuska", C: "Velika Britanija", D: "Njemačka" }, correct: "C" },
{ question: "Koja država ima najviše Nobelovih nagrada po glavi stanovnika (historijski)?", answers: { A: "Švicarska", B: "Švedska", C: "Danska", D: "Norveška" }, correct: "B" },
{ question: "Koja bitka se smatra prekretnicom Drugog svjetskog rata na istočnom frontu?", answers: { A: "Bitka za Moskvu", B: "Bitka za Staljingrad", C: "Bitka za Kursk", D: "Bitka za Lenjingrad" }, correct: "B" },
{ question: "Kako se naziva etička teorija koja tvrdi da je ispravno ono djelo koje donosi najveću sreću najvećem broju ljudi?", answers: { A: "Egoizam", B: "Stoicizam", C: "Utilitarizam", D: "Hedonizam" }, correct: "C" },
{ question: "U mikrobiologiji, kako se nazivaju organizmi koji mogu preživjeti u ekstremnim uslovima poput vakuuma ili visoke radijacije?", answers: { A: "Ekstremofili", B: "Amibe", C: "Paramecijumi", D: "Saprofiti" }, correct: "A" },
{ question: "Koji se plemeniti metal, osim zlata, najviše koristi u elektronici zbog izuzetne provodljivosti i otpornosti na koroziju?", answers: { A: "Cink", B: "Bakar", C: "Srebro", D: "Aluminijum" }, correct: "C" },
{ question: "Koji je glavni sastojak najskuplje kafe na svijetu (Kopi Luwak) koja prolazi kroz probavni sistem životinje?", answers: { A: "Izmet azijske cibetke", B: "Sok od kaktusa", C: "Pljuvačka laste", D: "Fermentisana riža" }, correct: "A" },
{ question: "Kojem serijalu pripada film „Sila se budi“ iz 2015?", answers: { A: "Gospodar prstenova", B: "Star Trek", C: "Ratovi zvijezda", D: "Matrix" }, correct: "C" },
{ question: "Koja je pasmina pasa nazvana po najvećem kanadskom poluotoku?", answers: { A: "Husky", B: "Labrador", C: "Malamut", D: "Golden retriever" }, correct: "B" },
{ question: "Koja NBA ekipa ima najviše osvojenih titula u historiji?", answers: { A: "Los Angeles Lakers", B: "Boston Celtics", C: "Chicago Bulls", D: "Golden State Warriors" }, correct: "B" },
{ question: "Koja visina mreže je standardna u muškoj odbojci?", answers: { A: "2.24 m", B: "2.35 m", C: "2.43 m", D: "2.50 m" }, correct: "C" }
]
},
 interestingFacts: {
easy: [
{ question: "Koja je pješačka vojska Osmanskog carstva ukinuta 1826.?", answers: { A: "Spahije", B: "Janjičari", C: "Mamluci", D: "Sipahi" }, correct: "B" },
{ question: "Koja reprezentacija je osvojila Svjetsko prvenstvo 2018. godine?", answers: { A: "Njemačka", B: "Francuska", C: "Argentina", D: "Brazil" }, correct: "B" },
{ question: "Koji je najprodavaniji gaming konzol u historiji?", answers: { A: "PlayStation 2", B: "PS5", C: "Xbox 360", D: "Nintendo Switch" }, correct: "A" },
{ question: "Koliko prirodnih satelita (mjeseca) ima planeta Mars?", answers: { A: "0", B: "2", C: "15", D: "60" }, correct: "B" },
{ question: "Koja je najduža i najjača kost u ljudskom tijelu?", answers: { A: "Rebro", B: "Bedrena kost", C: "Ključna kost", D: "Lakatna kost" }, correct: "B" },
{ question: "Gdje se nalazi najmanja kost u ljudskom tijelu (uzengija/stapes)?", answers: { A: "U nosu", B: "U stopalu", C: "U uhu", D: "U šaci" }, correct: "C" },
{ question: "Koliko kostiju ima ljudsko stopalo (jedno stopalo)?", answers: { A: "20", B: "22", C: "24", D: "26" }, correct: "D" },
{ question: "Koja država ima najviše aktivnih vulkana?", answers: { A: "Japan", B: "Indonezija", C: "Island", D: "Italija" }, correct: "B" },
{ question: "Koji je prvi film koji je zaradio preko 1 milijarde dolara?", answers: { A: "Titanic", B: "Avatar", C: "Avatar 2", D: "Ratovi zvijezda" }, correct: "A" },
{ question: "Koja je najbrža životinja na planeti?", answers: { A: "Gepard", B: "Sivi sokol", C: "Lav", D: "Antilopa" }, correct: "B" },
{ question: "Od čega se pravi piće Sake?", answers: { A: "Riže", B: "Krompira", C: "Pšenice", D: "Kukuruza" }, correct: "A" },
{ question: "Koji je najmanji mišić u ljudskom tijelu (nalazi se u uhu)?", answers: { A: "Sartorius", B: "Stapedius", C: "Masseter", D: "Gluteus" }, correct: "B" },
{ question: "Gdje se u ljudskom tijelu proizvode crvena krvna zrnca?", answers: { A: "U koštanoj srži", B: "U jetri", C: "U srcu", D: "U slezeni" }, correct: "A" },
{ question: "Koja je jedina Diznijeva princeza koja je bazirana na stvarnoj istorijskoj ličnosti?", answers: { A: "Snjeguljica", B: "Zlatokosa", C: "Pepeljuga", D: "Pocahontas" }, correct: "D" },
{ question: "Šta ide gore i dolje, ali se nikada ne miče?", answers: { A: "Lift", B: "Temperatura", C: "Kiša", D: "Stepenice" }, correct: "D" },
{ question: "Koju riječ svi ljudi uvijek izgovaraju pogrešno?", answers: { A: "Abeceda", B: "Pogrešno", C: "Riječ", D: "Imena" }, correct: "B" },
{ question: "U kojoj igri se borite protiv čudovišta u svijetu pod nazivom 'The Lands Between'?", answers: { A: "Dark Souls", B: "Elden Ring", C: "Bloodborne", D: "Skyrim" }, correct: "B" },
{ question: "Koja država je prva na svijetu uvela porez na ugljik (Carbon Tax)?", answers: { A: "Švedska", B: "Novi Zeland", C: "Norveška", D: "Finska" }, correct: "D" },
{ question: "Koji tip ambalaže se može reciklirati beskonačno puta bez gubitka kvaliteta?", answers: { A: "Plastika", B: "Papir", C: "Karton", D: "Staklo i aluminij" }, correct: "D" },
{ question: "Kako se zove najmanja jedinica Bitcoina?", answers: { A: "Satoshi", B: "Bit", C: "Wei", D: "Lito" }, correct: "A" },
{ question: "Koji je najslaniji okean na svijetu?", answers: { A: "Tihi", B: "Indijski", C: "Arktički", D: "Atlantski" }, correct: "D" },
{ question: "Kako se zove pojava strujanja tople vode u Pacifiku koja utiče na klimu cijele Zemlje?", answers: { A: "El NiñoLa", B: "Plima i oseka", C: "Golfska struja", D: "Mlazna struja" }, correct: "A" },
{ question: "Koji je najrasprostranjeniji mineral u Zemljinoj kori?", answers: { A: "Feldspat", B: "Kvarc", C: "Mika", D: "Dijamant" }, correct: "A" },
{ question: "Kako se naziva gornji, čvrsti sloj Zemlje koji uključuje koru?", answers: { A: "Mezosfera", B: "Astenosfera", C: "Biosfera", D: "Litosfera" }, correct: "D" },
{ question: "Koji period prahistorije je poznat kao 'mlađe kameno doba'?", answers: { A: "Paleolit", B: "Mezolit", C: "Neolit", D: "Eneolit" }, correct: "C" },
{ question: "Kako se zove izumrli rođak modernog čovjeka čiji su ostaci prvi put pronađeni u Njemačkoj?", answers: { A: "Homo Erectus", B: "Neandertalac", C: "Homo Habilis", D: "Australopitekus" }, correct: "B" },
{ question: "Koliko simfonija je komponovao Ludwig van Beethoven?", answers: { A: "5", B: "7", C: "9", D: "11" }, correct: "C" },
{ question: "Koji kompozitor je poznat kao 'čudo od djeteta' i autor 'Čarobne frule'?", answers: { A: "Bach", B: "Mozart", C: "Vivaldi", D: "Chopin" }, correct: "B" },
{ question: "Kako se zove čuvena operska kuća u Milanu?", answers: { A: "La Scala", B: "Boljšoj", C: "Metropolitan", D: "Milano Opera" }, correct: "A" },
{ question: "Ko se smatra autorom prve opere u historiji ('Dafne')?", answers: { A: "Verdi", B: "Puccini", C: "Wagner", D: "Jacopo Peri" }, correct: "D" },
{ question: "Koja slikarska tehnika koristi pigmente pomiješane sa žumancetom jajeta?", answers: { A: "Akvarel", B: "Gvaš", C: "Tempera", D: "Uljane boje" }, correct: "C" },
{ question: "Kako se zove tehnika slikanja na vlažnom malteru?", answers: { A: "Freska", B: "Mozaik", C: "Kolaž", D: "Enkaustika" }, correct: "A" },
{ question: "Iz kojeg jezika potiče riječ 'alkohol'?", answers: { A: "Grčkog", B: "Latinskog", C: "Arapskog", D: "Engleskog" }, correct: "C" },
{ question: "Koji jezik se smatra direktnim potomkom staronordijskog jezika?", answers: { A: "Švedski", B: "Engleski", C: "Njemački", D: "Islanski" }, correct: "D" },
{ question: "Šta u fotografiji označava kratica ISO?", answers: { A: "Brzinu zatvarača", B: "Osjetljivost senzora na svjetlost", C: "Veličinu otvora blende", D: "Rezoluciju slike" }, correct: "B" },
{ question: "Koja aviokompanija je nacionalni prevoznik Njemačke?", answers: { A: "Wizz Air", B: "Lufthansa", C: "KLM", D: "DHL Air" }, correct: "B" },
{ question: "Kako se zove najveći putnički avion na svijetu (sa dvije palube)?", answers: { A: "Boeing 747", B: "Boeing 777", C: "Concorde", D: "Airbus A380" }, correct: "D" },
{ question: "Koja je SI jedinica za električni otpor?", answers: { A: "Volt", B: "Amper", C: "Om", D: "Vat" }, correct: "C" },
{ question: "Koja biljka se smatra najbrže rastućom na svijetu?", answers: { A: "Bambus", B: "Hrast", C: "Kaktus", D: "Suncokret" }, correct: "A" },
{ question: "Ko se smatra 'ocem genetike' zbog eksperimenata sa graškom?", answers: { A: "Charles Darwin", B: "Gregor Mendel", C: "James Watson", D: "Francis Crick" }, correct: "B" },
{ question: "Kako se zvao vodeći brod Kristofora Kolumba na prvom putovanju u Ameriku?", answers: { A: "Niña", B: "Pinta", C: "Mayflower", D: "Santa Maria" }, correct: "D" },
{ question: "Koja država je prva legalizovala bitcoin kao zakonito sredstvo plaćanja?", answers: { A: "El Salvador", B: "Japan", C: "Švicarska", D: "Njemačka" }, correct: "A" },
{ question: "Koji je najgledaniji YouTube video svih vremena?", answers: { A: "Baby Shark", B: "Despacito", C: "Gangnam Style", D: "Shape of You" }, correct: "A" },
{ question: "Koja igra je najigranija video igra svih vremena?", answers: { A: "Minecraft", B: "GTA V", C: "Tetris", D: "Fortnite" }, correct: "C" },
{ question: "Koja knjiga je najviše puta prevedena na svijetu nakon Biblije?", answers: { A: "Mali princ", B: "Don Kihot", C: "Harry Potter", D: "Alkemičar" }, correct: "A" },
{ question: "Koja država ima najviše piramida?", answers: { A: "Egipat", B: "Sudan", C: "Meksiko", D: "Peru" }, correct: "B" },
{ question: "Koja je dinastija vladala Kinom u periodu 'Zlatnog doba' (618–907), kada je cvjetala poezija i trgovina Putem svile?", answers: { A: "Ming", B: "Han", C: "Jang", D: "Tang" }, correct: "D" },
{ question: "Ko je bio prvi rimski car?", answers: { A: "Julije Cezar", B: "Romul i Rem", C: "Neron", D: "August" }, correct: "D" },
{ question: "Koja država nakon Rusije ima najviše granica s drugim državama u Evropi?", answers: { A: "Mađarska", B: "Švicarska", C: "Francuska", D: "Njemačka" }, correct: "D" },
{ question: "Koja država ima najviše aktivnih vulkana u Evropi?", answers: { A: "Italija", B: "Kipar", C: "Grčka", D: "Island" }, correct: "D" },
{ question: "Koja je najmanja država na svijetu po površini?", answers: { A: "Monako", B: "San Marino", C: "Vatikan", D: "Lihtenštajn" }, correct: "C" },
{ question: "Koji kontinent ima najveći broj država?", answers: { A: "Afrika", B: "Azija", C: "Evropa", D: "Južna Amerika" }, correct: "A" },
{ question: "Picasso i Braque najvažniji su predstavnici slikarskog pravca nazvanog po kojem geometrijskom tijelu?", answers: { A: "Kugli", B: "Piramidi", C: "Kocki", D: "Valjku" }, correct: "C" },
{ question: "Koja je naljepnica dokaz o plaćenoj vožnji autocestama?", answers: { A: "Vinjeta", B: "Toll pass", C: "Sticker pass", D: "Cestarina ACC" }, correct: "A" },
{ question: "Koji naziv dijele azijska kraljevina i alkan s 4 atoma ugljika?", answers: { A: "Butan", B: "Propan", C: "Pentan", D: "Etan" }, correct: "A" },
{ question: "Kojim se turcizmom u nas naziva cvijet neke voćke?", answers: { A: "Đul", B: "Behar", C: "Lale", D: "Zumbul" }, correct: "B" },
{ question: "Talijanski fašisti nose crne košulje, a brazilski integralisti košulje koje boje?", answers: { A: "Plave", B: "Crvene", C: "Bijele", D: "Zelene" }, correct: "D" },
{ question: "Na kojem mjestu na listi najvećih otoka na svijetu se nalazi Velika Britanija?", answers: { A: "3.", B: "5.", C: "7.", D: "9." }, correct: "D" },
{ question: "Koji je rimski komediograf još davno, u svojim „Magarcima“, utvrdio da je „čovjek čovjeku vuk“?", answers: { A: "Aristofan", B: "Plaut", C: "Sofoklo", D: "Euripid" }, correct: "B" },
{ question: "Kako se zove zaštitni neprobojni prsluk koji nose vojnici i policajci?", answers: { A: "Korzlet", B: "Pancir", C: "Oklop", D: "Štitnik" }, correct: "B" },
{ question: "Kako zovemo nagonsku neodoljivu potrebu za podmetanjem požara?", answers: { A: "Kleptomanija", B: "Piromanija", C: "Arsonfobija", D: "Patomanija" }, correct: "B" },
{ question: "Koliko je sveukupno kvadratića na klasičnoj Rubikovoj kocki?", answers: { A: "48", B: "50", C: "54", D: "56" }, correct: "C" },
{ question: "S kojom državom Rusija ima najkraću kopnenu granicu, dugu samo 18 km?", answers: { A: "Norveškom", B: "Kinom", C: "Sjevernom Korejom", D: "Finskom" }, correct: "C" },
{ question: "Koja je mitološka junakinja imala kćeri Profasis i Metameliju, odnosno Ispriku i Žaljenje?", answers: { A: "Pandora", B: "Hera", C: "Atena", D: "Artemida" }, correct: "A" },
{ question: "Za zametak se koristi grčki naziv embrij, a za plod koji grčki naziv?", answers: { A: "Zigot", B: "Fetus", C: "Larva", D: "Blastula" }, correct: "B" },
{ question: "Kojoj je državi 1763 Velika Britanija preotela Kanadu?", answers: { A: "Španiji", B: "Francuskoj", C: "Portugalu", D: "Nizozemskoj" }, correct: "B" },
{ question: "U kojem je gradu 1348 osnovano najstarije sveučilište u slavenskim zemljama?", answers: { A: "Prag", B: "Krakow", C: "Beograd", D: "Sofija" }, correct: "A" },
{ question: "Prije koliko je godina Einstein objavio članak „Temelji opće teorije relativnosti“?", answers: { A: "1905", B: "1915", C: "1916", D: "1920" }, correct: "C" },
{ question: "Za veliku nagradu koje se države vozi Formula 1 na stazi u Silverstoneu?", answers: { A: "Italije", B: "Velike Britanije", C: "Njemačke", D: "Francuske" }, correct: "B" },
{ question: "Iako se na njima govori švedski, Ålandski otoci autonomna su pokrajina koje države?", answers: { A: "Švedske", B: "Norveške", C: "Finske", D: "Danske" }, correct: "C" },
{ question: "Koja je zemlja osvojila najviše medalja na zimskim Olimpijskim igrama?", answers: { A: "Njemačka", B: "Kanada", C: "Rusija", D: "Norveška" }, correct: "D" },
{ question: "Na kojem je jeziku napisan „Alkemičar“, jedan od najprevođenijih romana?", answers: { A: "Španskom", B: "Portugalskom", C: "Poljskom", D: "Francuskom" }, correct: "B" },
{ question: "Kojim grecizmom nazivamo tipografski znak „zvjezdicu“?", answers: { A: "Ampersand", B: "Asterisk", C: "Obelus", D: "Tilde" }, correct: "B" },
{ question: "Kako se zove dio tla nastao od mrtve organske tvari o kojem ovisi kvaliteta tla?", answers: { A: "Humus", B: "Ilovača", C: "Pijesak", D: "Treset" }, correct: "A" },
{ question: "Koja je država 1920. po uzoru na Francusku osnovala svoju Legiju stranaca?", answers: { A: "Italija", B: "Španija", C: "Njemačka", D: "Grčka" }, correct: "B" },
{ question: "Kako je, po svjetlosnoj pojavi, nazvan najveći proizvođač akumulatora u Hrvatskoj?", answers: { A: "Munja", B: "Iskra", C: "Bljesak", D: "Zora" }, correct: "A" },
{ question: "James Bond je Agent 007, a Agent 47 je koji naslovni filmski lik?", answers: { A: "John Wick", B: "Jason Bourne", C: "Jack Reacher", D: "Hitman" }, correct: "D" },
{ question: "Najjača nogometna liga koje se zemlje zove Ekstraklasa?", answers: { A: "Češke", B: "Slovačke", C: "Mađarske", D: "Poljske" }, correct: "D" },
{ question: "Kamo „Bijelo dugme“ poziva „Curice, dječake, studente, đake i milicajce“?", answers: { A: "Na more", B: "U grad", C: "U planine", D: "Na selo" }, correct: "C" },
{ question: "Koji je glumac zamijenio Charliea Sheena u seriji „2 i pol muškarca“?", answers: { A: "Jon Cryer", B: "Ashton Kutcher", C: "Steve Carell", D: "Matthew Perry" }, correct: "B" },
{ question: "Što, za vrijeme nacističke Njemačke, krade djevojčica Liesel iz bestselera Markusa Zusaka?", answers: { A: "Hranu", B: "Novac", C: "Knjige", D: "Pisma" }, correct: "C" },
{ question: "Koji je antički osvajač dobio nadimak „pasoglavi“ jer je, po pučkom vjerovanju, bio pola čovjek, pola pas?", answers: { A: "Julije Cezar", B: "Atila", C: "Aleksandar Veliki", D: "Džingis Kan" }, correct: "B" },
{ question: "Uz fizičara Schrödingera povezujemo koju životinju?", answers: { A: "Mačku", B: "Zeca", C: "Miša", D: "Psa" }, correct: "A" },
{ question: "Na rubu delte koje je rijeke pakistanski grad Karachi?", answers: { A: "Inda", B: "Nila", C: "Eufrata", D: "Tigra" }, correct: "A" },
{ question: "Koje ime dijele prozirno optičko tijelo i jednogodišnja mahunarka bogata bjelančevinama?", answers: { A: "Leća", B: "Grah", C: "Soja", D: "Lupina" }, correct: "A" },
{ question: "Koja je, po broju korisnika, najveća poslovna društvena mreža?", answers: { A: "Facebook", B: "Instagram", C: "LinkedIn", D: "X (Twitter)" }, correct: "C" },
{ question: "Američka tvrtka „Alcoa“ najveći je svjetski proizvođač kojeg metala?", answers: { A: "Čelika", B: "Bakar", C: "Aluminij", D: "Titan" }, correct: "C" },
{ question: "Koliko je sati u 3540 minuta?", answers: { A: "58", B: "59", C: "60", D: "61" }, correct: "B" },
{ question: "Koji muzej se nalazi u Parizu i čuva 'Mona Lisu'?", answers: { A: "Musée d'Orsay", B: "Louvre", C: "Centre Pompidou", D: "Versailles" }, correct: "B" },
{ question: "Koji francuski vladar je krunisan za cara 1804. godine?", answers: { A: "Luj XIV", B: "Napoleon Bonaparta", C: "Šarl de Gol", D: "Luj XVI" }, correct: "B" },
{ question: "Kako nazivamo vrijeme od ulaza uzročnika u organizam do prvih znakova bolesti?", answers: { A: "Reakcija", B: "Inkubacija", C: "Infekcija", D: "Remisija" }, correct: "B" },
{ question: "Koja je skraćenica virusa uzročnika side?", answers: { A: "HPV", B: "HBV", C: "HIV", D: "HCV" }, correct: "C" },
{ question: "Koji je četverokut nazvan prema četvrtom slovu grčkog alfabeta?", answers: { A: "Trapez", B: "Kvadrat", C: "Romb", D: "Deltoid" }, correct: "D" },
{ question: "Koji fudbalski stadion je poznat kao ‘Teatar snova’?", answers: { A: "Camp Nou", B: "Santiago Bernabéu", C: "Old Trafford", D: "San Siro" }, correct: "C" },
{ question: "Koji grad je bio prvi domaćin modernih Olimpijskih igara 1896. godine?", answers: { A: "Pariz", B: "London", C: "Atina", D: "Rim" }, correct: "C" },
{ question: "Koja država je prva priznala nezavisnost Sjedinjenih Američkih Država de facto (prije 1783. ugovora)?", answers: { A: "Francuska", B: "Španija", C: "Nizozemska", D: "Rusija" }, correct: "A" },
{ question: "Koja država ima najviše UNESCO svjetske baštine lokacija (2025. rang)?", answers: { A: "Bosna i Hercegovina", B: "Njemačka", C: "Španija", D: "Italija" }, correct: "D" },
{ question: "Koji šahista je postao najmlađi svjetski prvak u historiji šaha u decembru 2024. godine?", answers: { A: "Magnus Carlsen", B: "Bobby Fischer", C: "Garry Kasparov", D: "Gukesh Dommaraju" }, correct: "D" },
{ question: "Koji je najduži poznati rečenički palindrom u engleskom jeziku koji ima smisleno značenje u lingvistici?", answers: { A: "Never odd or even", B: "Madam I'm Adam", C: "A man a plan a canal Panama", D: "No lemon no melon" }, correct: "C" },
{ question: "Koji vozač drži rekord po broju osvojenih uzastopnih titula svjetskog prvaka u Formuli 1?", answers: { A: "Lewis Hamilton", B: "Sebastian Vettel", C: "Michael Schumacher", D: "Max Verstappen" }, correct: "C" }

],
hard: [
{ question: "Koja je podvrsta breskve nazvana po slatkom cvjetnom soku?", answers: { A: "Šljiva", B: "Kajsija", C: "Klementina", D: "Nektarina" }, correct: "D" },
{ question: "Koji germanizam može označavati pobunu i svežanj?", answers: { A: "Sturm", B: "Ustanak", C: "Kampf", D: "Bunt" }, correct: "D" },
{ question: "Koji umjetnički pravac je karakterističan po jakim emocijama i dramatičnom izrazu u 17. vijeku?", answers: { A: "Barok", B: "Realizam", C: "Impresionizam", D: "Modernizam" }, correct: "A" },
{ question: "Koji fenomen uzrokuje da GPS mora stalno da se koriguje?", answers: { A: "Relativnost vremena", B: "Magnetizam", C: "Sunčeve oluje", D: "Gravitacija Mjeseca" }, correct: "A" },
{ question: "Koji algoritam stoji iza Google pretrage (osnova rankanja)?", answers: { A: "PageRank", B: "SortNet", C: "SearchFlow", D: "RankBoost" }, correct: "A" },
{ question: "Koja je europska država 2001. legalizirala eutanaziju?", answers: { A: "Nizozemska", B: "Švicarska", C: "Njemačka", D: "Danska" }, correct: "A" },
{ question: "Koji polisaharid često nazivaju životinjskim škrobom?", answers: { A: "Celuloza", B: "Glikogen", C: "Skrob", D: "Lignin" }, correct: "B" },
{ question: "Nobelovu nagradu za mir 1917, 1944 i 1963. nije dobio pojedinac nego koja organizacija?", answers: { A: "UNICEF", B: "UNESCO", C: "Crveni križ", D: "WHO" }, correct: "C" },
{ question: "Koja cijev u obliku položenog slova F spaja različite izljevne uređaje s odvodnim kanalom?", answers: { A: "Ventil", B: "Sifon", C: "Filter", D: "Pumpa" }, correct: "B" },
{ question: "Koja se dvostruka torba nosi preko ramena ili veže na sedlo tako da visi s obje strane?", answers: { A: "Ranac", B: "Bisage", C: "Torbica", D: "Pojas" }, correct: "B" },
{ question: "Kod kojeg se spola češće pojavljuje daltonizam?", answers: { A: "Ženskog", B: "Muškog", C: "Oba jednako", D: "Nijednog" }, correct: "B" },
{ question: "HNO3 je formula koje kiseline?", answers: { A: "Hlorne", B: "Sumporne", C: "Dušične", D: "Fosforne" }, correct: "C" },
{ question: "Kako se zove logička igra sa brojevima čije ime na japanskom znači 'jedini broj'?", answers: { A: "Nonogram", B: "Sudoku", C: "Kakuro", D: "KenKen" }, correct: "B" },
{ question: "Kako se zove metoda prevare gdje se korisnik navodi da otkrije lozinku putem lažnih e-mailova?", answers: { A: "Spamming", B: "Hacking", C: "Phishing", D: "Buffering" }, correct: "C" },
{ question: "Šta označava 'S' u protokolu HTTPS?", answers: { A: "System", B: "Server", C: "Secure", D: "Standard" }, correct: "C" },
{ question: "U kojoj državi je 1825. godine otvorena prva javna željeznička linija na svijetu?", answers: { A: "Velikoj Britaniji", B: "SAD", C: "Francuskoj", D: "Njemačkoj" }, correct: "A" },
{ question: "Kako se zove čuveni luksuzni voz koji je decenijama povezivao Pariz i Istanbul?", answers: { A: "Blue Train", B: "Orient Express", C: "Flying Scotsman", D: "TGV" }, correct: "B" },
{ question: "U kojem sportu se reprezentacije takmiče za 'Davis Cup'?", answers: { A: "Stonom tenisu", B: "Golfu", C: "Tenisu", D: "Nogometu" }, correct: "C" },
{ question: "Koja država uvijek prva ulazi na stadion tokom ceremonije otvaranja Olimpijskih igara?", answers: { A: "Domaćin", B: "Prošlogodišnji domaćin", C: "Grčka", D: "Pobjednik OI" }, correct: "C" },
{ question: "Šta znači latinski izraz 'persona non grata' u diplomatiji?", answers: { A: "Osoba od povjerenja", B: "Privremeni zastupnik", C: "Nepoželjna osoba", D: "Počasni gost" }, correct: "C" },
{ question: "Koji je jedini organ u ljudskom tijelu koji nema osjećaj bola?", answers: { A: "Srce", B: "Jetra", C: "Mozak", D: "Pluća" }, correct: "C" },
{ question: "Kako se naziva strah od stranaca i nepoznatog?", answers: { A: "Ksenofobija", B: "Agorafobija", C: "Klaustrofobija", D: "Homofobija" }, correct: "A" },
{ question: "Koliko država na svijetu ima ime koje se sastoji od samo dvije riječi (npr. Saudijska Arabija, Južna Koreja)?", answers: { A: "Oko 10", B: "Oko 30", C: "Oko 50", D: "Oko 5" }, correct: "B" },
{ question: "Koja civilizacija je izgradila grad Machu Picchu?", answers: { A: "Maje", B: "Inke", C: "Asteci", D: "Olmeci" }, correct: "B" },
{ question: "Bivša supruga Michaela Jacksona i Nicholasa Cagea bila je jedino dijete kojeg muzičara?", answers: { A: "Elvisa Presleya", B: "Frank Sinatre", C: "Princea", D: "Chuck Berryja" }, correct: "A" },
{ question: "Koji je britanski komičar filmsku karijeru započeo 1983. sporednom ulogom u „Nikad ne reci nikad“?", answers: { A: "Rowan Atkinson", B: "Mr. Bean", C: "John Cleese", D: "Sacha Baron Cohen" }, correct: "A" },
{ question: "Koja se država može pohvaliti s najviše Nobelovih nagrada za književnost?", answers: { A: "Njemačka", B: "Francuska", C: "Velika Britanija", D: "Italija" }, correct: "B" },
{ question: "Španjolsko potkraljevstvo La Plata obuhvaćalo je dio Čilea, Paragvaj, Urugvaj, Boliviju i koju još državu?", answers: { A: "Brazil", B: "Argentina", C: "Peru", D: "Kolumbija" }, correct: "B" },
{ question: "Budući da je poštenog čovjeka teško naći, Diogen ga je po danu tražio čime?", answers: { A: "Ogledalom", B: "Svijećom", C: "Lampom", D: "Bakljom" }, correct: "B" },
{ question: "Koje je sveučilište pohađao Mark Zuckerberg kad je osmišljen Facebook?", answers: { A: "MIT", B: "Stanford", C: "Harvard", D: "Yale" }, correct: "C" },
{ question: "Koji je britanski prekomorski posjed nazvan po vojskovođi Tariku ibn-Ziyadu?", answers: { A: "Malta", B: "Gibraltar", C: "Cyprus", D: "Bermuda" }, correct: "B" },
{ question: "Koje se limfne žlijezde u čovjekovu ždrijelu odstranjuju?", answers: { A: "Limfni čvorovi", B: "Krajnici", C: "Timus", D: "Slezena" }, correct: "B" },
{ question: "Koji grecizam označava specijalno odijelo za ronioce, pilote i astronaute?", answers: { A: "Kombinezon", B: "Skafander", C: "Aerosuit", D: "Diver suit" }, correct: "B" },
{ question: "Koji je HR mladi inovator najpoznatiji po konstrukciji električnih automobila?", answers: { A: "Davor Šuker", B: "Ivan Mrvoš", C: "Mate Rimac", D: "Nikola Tesla" }, correct: "C" },
{ question: "Kako se preziva mladi karizmatični tajkun iz „50 nijansi sive“?", answers: { A: "Grey", B: "Black", C: "White", D: "Stone" }, correct: "A" },
{ question: "Kojim latinizmom nazivamo oblikovanje reljefa razaranjem zemljine kore pomoću vode ili leda?", answers: { A: "Erozija", B: "Sedimentacija", C: "Korozija", D: "Deformacija" }, correct: "A" },
{ question: "Koji naziv dijele poluvodički element koji je zamijenio elektronsku cijev i mali prijenosni radio aparat?", answers: { A: "Tranzistor", B: "Diode", C: "Integrisano kolo", D: "Resistor" }, correct: "A" },
{ question: "U čijoj je prvoj nogometnoj ligi 6 klubova s riječju „Hapoel“ u imenu?", answers: { A: "Egipatskoj", B: "Grčkoj", C: "Turskoj", D: "Izraelskoj" }, correct: "D" },
{ question: "Koji je planet otprilike 150 milijuna kilometara udaljen od Sunca?", answers: { A: "Venera", B: "Jupiter", C: "Mars", D: "Zemlja" }, correct: "D" },
{ question: "Kako se na francuskom kaže „Velika nagrada“?", answers: { A: "Grande Course", B: "Grand Prix", C: "Prix Grand", D: "Course Royale" }, correct: "B" },
{ question: "Margaret Thatcher je bila „Željezna lady“, a „Željezni kancelar“ je bio koji državnik?", answers: { A: "Helmut Kohl", B: "Konrad Adenauer", C: "Willy Brandt", D: "Otto von Bismarck" }, correct: "D" },
{ question: "Koliko se slova naše abecede jednako piše i na latinici i na ćirilici?", answers: { A: "5", B: "6", C: "7", D: "8" }, correct: "C" },
{ question: "Koje žensko ime na grčkom jeziku znači 'mudrost'?", answers: { A: "Helena", B: "Katarina", C: "Sofija", D: "Irena" }, correct: "C" },
{ question: "Na kojoj stazi je održana prva zvanična trka Formule 1 Svjetskog prvenstva 1950. godine?", answers: { A: "Monza", B: "Silverstone", C: "Spa-Francorchamps", D: "Monaco" }, correct: "B" },
{ question: "Kojem planetu treba približno 88 zemaljskih dana za jedan obilazak oko Sunca?", answers: { A: "Venera", B: "Merkur", C: "Mars", D: "Pluton" }, correct: "B" },
{ question: "Pod kojim se rednim brojem u periodnom sustavu elemenata nalazi Mendelevij?", answers: { A: "99", B: "100", C: "101", D: "102" }, correct: "C" },
{ question: "Koja je pjevačica 2010. i 2016. dobila Grammy za album godine?", answers: { A: "Adele", B: "Taylor Swift", C: "Rihanna", D: "Beyoncé" }, correct: "B" },
{ question: "Kako nazivamo ugostiteljsku uslugu pripreme, dostave i posluživanja hrane na društvenim događanjima?", answers: { A: "Buffet", B: "Banquet", C: "Delivery", D: "Catering" }, correct: "D" },
{ question: "Koji se hirurški zahvat izvodi kad normalan porod nije moguć?", answers: { A: "Laparoskopija", B: "Transplantacija", C: "Carski rez", D: "Endoskopija" }, correct: "C" },
{ question: "Kako se zove prostor oko magneta u kojem djeluju magnetske sile?", answers: { A: "Električno polje", B: "Gravitaciono polje", C: "Magnetsko polje", D: "Polje sile" }, correct: "C" }

],
hardest: [
{ question: "U kojem je škotskom gradu 1768. štampana prva Enciklopedija Britannica?", answers: { A: "Glasgow", B: "Edinburgh", C: "Aberdeen", D: "Dundee" }, correct: "B" },
{ question: "Kojom se bojom od 2000. u SAD-u označavaju države u kojima su pobijedili Republikanci?", answers: { A: "Crvenom", B: "Zelenom", C: "Plavom", D: "Žutom" }, correct: "A" },
{ question: "Kako još zovemo taložne stijene koje su nastale taloženjem ostataka drugih stijena?", answers: { A: "Metamorfne", B: "Vulkanske", C: "Sedimentne stijene", D: "Kristalne" }, correct: "C" },
{ question: "Koja država zauzima 47% kontinenta na kojem se nalazi?", answers: { A: "Argentina", B: "Brazil", C: "Kolumbija", D: "Peru" }, correct: "B" },
{ question: "Koja je japanska kompanija osmislila lik Sonic the Hedgehoga i igraću konzolu Genesis?", answers: { A: "Nintendo", B: "Sony", C: "Sega", D: "Capcom" }, correct: "C" },
{ question: "U kojem je gradu neofuturistički neboder Shard, najviša zgrada u Europi?", answers: { A: "London", B: "Pariz", C: "Berlin", D: "Madrid" }, correct: "A" },
{ question: "Koje dvije jugoslavenske republike obilježavaju Dan državnosti istog dana (25.6.)?", answers: { A: "BiH i Srbija", B: "Hrvatska i Slovenija", C: "Makedonija i Crna Gora", D: "Srbija i Crna Gora" }, correct: "B" },
{ question: "Koja troslovna engleska kratica označava roštilj ili meso pečeno na roštilju?", answers: { A: "BBQ", B: "GRL", C: "RIB", D: "FRY" }, correct: "A" },
{ question: "Koje ime dijele troglavi pas iz grčke mitologije i prezime tenisačice Angelique?", answers: { A: "Hydra", B: "Hades", C: "Cerberus", D: "Kerber" }, correct: "D" },
{ question: "Koja zemlja, uz Rusiju, SAD, Veliku Britaniju i Kinu čini veliku petorku Vijeća sigurnosti UN-a?", answers: { A: "Njemačka", B: "Italija", C: "Japan", D: "Francuska" }, correct: "D" },
{ question: "Koga je u decembru 2015. magazin „Time“ proglasio osobom godine?", answers: { A: "Angela Merkel", B: "Donald Trump", C: "Pape Franjo", D: "Barack Obama" }, correct: "A" },
{ question: "Koji je jedini hemijski element nazvan po poluotoku?", answers: { A: "Germanij", B: "Skandij", C: "Galij", D: "Indij" }, correct: "B" },
{ question: "Koje je nebesko tijelo ukrao zločesti Gru?", answers: { A: "Sunce", B: "Mjesec", C: "Mars", D: "Zvijezdu" }, correct: "B" },
{ question: "Kako se zove zaštitni sloj atmosfere koji se nalazi na visini od 15 do 35 kilometara?", answers: { A: "Mezosfera", B: "Ozonski omotač", C: "Troposfera", D: "Egzosfera" }, correct: "B" },
{ question: "Koji se gas najčešće koristi za punjenje reklamnih svjetiljki radi dobijanja jarko narandžaste boje?", answers: { A: "Argon", B: "Neon", C: "Helijum", D: "Kripton" }, correct: "B" },
{ question: "Kako se zove naučna disciplina koja proučava pećine i podzemne vode?", answers: { A: "Geologija", B: "Hidrologija", C: "Speleologija", D: "Arheologija" }, correct: "C" },
{ question: "U matematici, kako se naziva broj koji se dobije kada se pomnože svi prirodni brojevi od 1 do tog broja?", answers: { A: "Eksponent", B: "Logaritam", C: "Integral", D: "Faktorijel" }, correct: "D" },
{ question: "Kako se u biologiji naziva proces starenja ćelija?", answers: { A: "Mitoza", B: "Mejoza", C: "Senescencija", D: "Apoptoza" }, correct: "C" },
{ question: "Koji motor proizvođač je osvojio najviše uzastopnih konstruktorskih titula kao dobavljač motora u modernoj eri (V6 hibrid era od 2014.)?", answers: { A: "Ferrari", B: "Honda", C: "Renault", D: "Mercedes" }, correct: "D" },
{ question: "S koja 2 slova se označava srednja tvrdoća olovaka?", answers: { A: "HH", B: "H", C: "BB", D: "HB" }, correct: "D" },
{ question: "Koja je bila prva prijestolnica Rimskog Carstva na istoku tokom tetrarhije?", answers: { A: "Konstantinopolj", B: "Nikomedija", C: "Antiohija", D: "Solun" }, correct: "B" },
{ question: "Koja je jedina država u Južnoj Americi čiji je službeni jezik engleski?", answers: { A: "Surinam", B: "Gvajana", C: "Urugvaj", D: "Ekvador" }, correct: "B" },
{ question: "Koji je element u periodnom sistemu prvo otkriven na Suncu, a ne na Zemlji?", answers: { A: "Vodonik", B: "Helijum", C: "Neon", D: "Argon" }, correct: "B" },
{ question: "Kako se naziva najviša planina (vulkan) u Sunčevom sistemu, (visina: Između 21,2 km i 26 km)?", answers: { A: "Mauna Kea", B: "Mt. Montes", C: "Valles Marineris", D: "Olympus Mons" }, correct: "D" },
{ question: "Koji rimski car je bio posljednji vladar jedinstvenog Carstva prije podjele 395. godine?", answers: { A: "Konstantin Veliki", B: "Justinijan I", C: "Valentinijan III", D: "Teodosije I" }, correct: "D" },
{ question: "Ko je prvi naučnik koji je matematički opisao zakon gravitacije?", answers: { A: "Galileo Galilei", B: "Albert Einstein", C: "Johannes Kepler", D: "Isaac Newton" }, correct: "D" },
{ question: "Koji grad je bio centar Osmanskog carstva prije Istanbula?", answers: { A: "Edirne", B: "Ankara", C: "Bursa", D: "Izmir" }, correct: "C" },
{ question: "Koji naučnik je prvi dokazao da Zemlja orbitira oko Sunca heliocentričnim modelom?", answers: { A: "Kepler", B: "Galileo", C: "Kopernik", D: "Newton" }, correct: "C" },
{ question: "Koja bitka se smatra krajem Napoleonove vladavine?", answers: { A: "Waterloo", B: "Austerlitz", C: "Borodino", D: "Trafalgar" }, correct: "A" },
{ question: "Koji je najstariji poznati zakonik u historiji čovječanstva?", answers: { A: "Hamurabijev zakonik", B: "Justinijanov kodeks", C: "Rimski zakon 12 tablica", D: "Solonovi zakoni" }, correct: "A" },
{ question: "Koja država je prva u svijetu uvela centralnu banku?", answers: { A: "Engleska", B: "Francuska", C: "Holandija", D: "Švedska" }, correct: "D" },
{ question: "Koji grad je bio centar Abasidskog kalifata u njegovom zlatnom dobu?", answers: { A: "Damask", B: "Bagdad", C: "Kairo", D: "Kordoba" }, correct: "B" },
{ question: "Koji dokument je prvi ustav u modernom smislu koji je još uvijek na snazi?", answers: { A: "Ustav SAD", B: "Magna Carta", C: "Napoleonski kodeks", D: "Deklaracija prava čovjeka" }, correct: "A" },
{ question: "Koji matematički problem je jedan od Millennium Prize Problems?", answers: { A: "Riemannova hipoteza", B: "Fermatova teorema", C: "Eulerov problem mostova", D: "Gaussova pretpostavka" }, correct: "A" },
{ question: "Kako se zove hipoteza u astrobiologiji koja sugeriše da je život na Zemlju stigao putem meteorita ili kometa?", answers: { A: "Abiogeneza", B: "Zatvoreni sistem", C: "Egzogeneza", D: "Panspermija" }, correct: "D" },
{ question: "Kojom se magičnom rečenicom otvara pećina s blagom u priči o Ali-Babi?", answers: { A: "Otvorite se", B: "Sezame, otvori se", C: "Blago, pokaži se", D: "Zatvori vrata" }, correct: "B" },
{ question: "Iz koje države izvorno dolazi Ombudsman, zadužen za zaštitu građana od nezakonitih postupaka državnih tijela?", answers: { A: "Norveške", B: "Finske", C: "Danske", D: "Švedske" }, correct: "D" },
{ question: "Koja ptica ima najveći raspon krila na svijetu čak 3,5 metra?", answers: { A: "Albatros lutalica", B: "Andski kondor", C: "Kraljevski orao", D: "Pelikan" }, correct: "A" },
{ question: "Koji grad je bio prva prijestolnica Osmanskog carstva u Evropi?", answers: { A: "Istanbul", B: "Edirne", C: "Bursa", D: "Ankara" }, correct: "B" },
{ question: "Koji fenomen u fizici opisuje širenje svjetlosti kao talasa koji zaobilazi prepreke?", answers: { A: "Refleksija", B: "Refrakcija", C: "Difrakcija", D: "Polarizacija" }, correct: "C" },
{ question: "Koji hemijski element je prvi umjetno sintetizovan u laboratoriji (ne prirodno pronađen)?", answers: { A: "Tehnecij", B: "Prometij", C: "Neptunij", D: "Uranij" }, correct: "A" },
{ question: "Koja civilizacija je prva razvila poznati sistem nule kao broja?", answers: { A: "Egipćani", B: "Maje", C: "Rimljani", D: "Grci" }, correct: "B" },
{ question: "Koliko znakova (karaktera) maksimalno ima jedan SMS poruka u standardnom GSM kodiranju?", answers: { A: "120", B: "140", C: "160", D: "200" }, correct: "C" },
{ question: "Koja je najkraća moguća partija šaha koja završava matom (poznata kao 'Fool’s mate') u standardnim pravilima?", answers: { A: "1 potez", B: "2 poteza", C: "3 poteza", D: "4 poteza" }, correct: "B" },
{ question: "Koji je najstariji poznati pisani zakonik u historiji, otkriven na sumerskim glinenim pločicama?", answers: { A: "Ur-Nammuov zakonik", B: "Hamurabijev zakonik", C: "Justinijanov kodeks", D: "Zakon dvanaest ploča" }, correct: "A" },
{ question: "Koji je najduži službeni meč u tenisu (Grand Slam historija prije promjene pravila tie-breaka u finalnom setu)?", answers: { A: "Wimbledon 2010 Isner–Mahut", B: "US Open 2012 Djokovic–Nadal", C: "Roland Garros 2008 Nadal–Federer", D: "Wimbledon 2008 Federer–Roddick" }, correct: "A" },
{ question: "Koji sportista drži rekord po broju osvojenih titula u MotoGP klasi (premier class)?", answers: { A: "Valentino Rossi", B: "Marc Márquez", C: "Giacomo Agostini", D: "Mick Doohan" }, correct: "C" },
{ question: "Koji sportista je prvi postigao hat-trick u finalu FIFA Svjetskog prvenstva?", answers: { A: "Pelé", B: "Geoff Hurst", C: "Miroslav Klose", D: "Cristiano Ronaldo" }, correct: "B" },
{ question: "Koji vozač je jedini u modernoj historiji F1 osvojio titulu sa timom koji je debitovao te iste sezone (2009)?", answers: { A: "Sebastian Vettel", B: "Jenson Button", C: "Lewis Hamilton", D: "Rubens Barrichello" }, correct: "B" },
{ question: "Koja partija je poznata kao 'Partija stoljeća' i odigrana je 1956. godine?", answers: { A: "Fischer–Spassky", B: "Kasparov–Topalov", C: "Byrne–Fischer", D: "Tal–Botvinnik" }, correct: "C" }
 
]
},
numbers: {
easy: [
{ question: "Koja je najveća planeta Sunčevog sistema?", answers: { A: "Zemlja", B: "Saturn", C: "Jupiter", D: "Mars" }, correct: "C" },
{ question: "Koji je prvi video koji je ikad postavljen na YouTube?", answers: { A: "Me at the zoo", B: "Hello world", C: "First upload", D: "Intro video" }, correct: "A" },
{ question: "Koji objekt u svemiru ima gravitaciju toliko jaku da čak ni svjetlost ne može pobjeći?", answers: { A: "Crna rupa", B: "Neutron zvijezda", C: "Supernova", D: "Kvazar" }, correct: "A" },
{ question: "Koji je jedini kontinent bez mrava?", answers: { A: "Afrika", B: "Antarktika", C: "Australija", D: "Evropa" }, correct: "B" },
{ question: "Koji je najskuplji izgrađeni predmet u historiji čovječanstva?", answers: { A: "ISS (Međunarodna svemirska stanica)", B: "Burj Khalifa", C: "Titanic", D: "LHC akcelerator" }, correct: "A" },
{ question: "Koja životinja ima najduži zabilježen životni vijek?", answers: { A: "Kornjača", B: "Kit", C: "Meduza Turritopsis", D: "Slon" }, correct: "C" },
{ question: "Koji grad je prvi na svijetu imao milijun stanovnika?", answers: { A: "Kairo", B: "Bagdad", C: "London", D: "Rim" }, correct: "D" },
{ question: "Koji je prvi web sajt ikad napravljen?", answers: { A: "info.cern.ch", B: "google.com", C: "apple.com", D: "yahoo.com" }, correct: "A" },
{ question: "Koja životinja može da regeneriše cijelo tijelo iz jednog dijela?", answers: { A: "Planarija", B: "Zmija", C: "Riba", D: "Žaba" }, correct: "A" },
{ question: "Koja životinja ima najveći mozak u odnosu na tijelo?", answers: { A: "Kit", B: "Mrav", C: "Delfin", D: "Slon" }, correct: "B" },
{ question: "Koji je najprodavaniji telefon svih vremena?", answers: { A: "iPhone 5S", B: "Nokia 1100", C: "Samsung S3", D: "iPhone 14 Pro Max" }, correct: "B" },
{ question: "Koji je glavni grad Kanade?", answers: { A: "Toronto", B: "Vancouver", C: "Montreal", D: "Ottawa" }, correct: "D" },
{ question: "Koji je hemijski simbol za zlato?", answers: { A: "Au", B: "Ag", C: "Go", D: "Zl" }, correct: "A" },
{ question: "Koji grad je bio sjedište moćne Mletačke Republike?", answers: { A: "Venecija", B: "Genova", C: "Rim", D: "Napulj" }, correct: "A" },
{ question: "Ko je bio prvi Evropljanin koji je morskim putem stigao do Indije?", answers: { A: "Vasco da Gama", B: "Magelan", C: "Amerigo Vespucci", D: "Marco Polo" }, correct: "A" },
{ question: "Koliko nogu imaju svi insekti?", answers: { A: "4", B: "6", C: "8", D: "10" }, correct: "B" },
{ question: "U kojoj državi je nastao običaj kićenja božićne jelke?", answers: { A: "Njemačkoj", B: "Italiji", C: "Irskoj", D: "SAD" }, correct: "A" },
{ question: "Koji filozof je autor izreke 'Znam da ništa ne znam'?", answers: { A: "Platon", B: "Aristotel", C: "Sokrat", D: "Diogen" }, correct: "C" },
{ question: "U kojem gradu su održane prve Zimske olimpijske igre 1924.?", answers: { A: "Chamonix", B: "St. Moritz", C: "Sarajevo", D: "Oslo" }, correct: "A" },
{ question: "U kojem gradu se nalazi sjedište INTERPOL-a?", answers: { A: "Lyonnu", B: "Parizu", C: "Briselu", D: "Ženevi" }, correct: "A" },
{ question: "Koja boja se u psihologiji najčešće povezuje sa smirenošću i povjerenjem (često je koriste banke)?", answers: { A: "Crvena", B: "Žuta", C: "Plava", D: "Ljubičasta" }, correct: "C" },
{ question: "Koja boja dokazano najviše stimuliše apetit (često je koriste lanci brze hrane)?", answers: { A: "Zelena", B: "Plava", C: "Crna", D: "Crvena" }, correct: "D" },
{ question: "Kako se naziva pravo poglavara države da odbije potpisivanje zakona?", answers: { A: "Veto", B: "Amandman", C: "Imunitet", D: "Referendum" }, correct: "A" },
{ question: "Koje godine je zvanično pokrenuta World Wide Web (WWW) mreža?", answers: { A: "1979.", B: "1984.", C: "1989.", D: "1994." }, correct: "C" },
{ question: "Koja struja donosi toplu vodu iz Meksičkog zaliva prema Evropi, ublažavajući joj klimu?", answers: { A: "Meksička struja", B: "Benguelska struja", C: "Golfska struja", D: "Američka struja" }, correct: "C" },
{ question: "Kako se zove superkontinent koji je postojao prije oko 300 miliona godina?", answers: { A: "Gondvana", B: "Pangea", C: "Laurazija", D: "Rodinija" }, correct: "B" },
{ question: "Ko je napisao čuvenu dramu 'Čekajući Godoa'?", answers: { A: "Moliere", B: "Henrik Ibsen", C: "Anton Čehov", D: "Samuel Beckett" }, correct: "D" },
{ question: "Kako se naziva tekstualni predložak za operu?", answers: { A: "Scenario", B: "Libreto", C: "Manifest", D: "Partitura" }, correct: "B" },
{ question: "Iz kojeg jezika potiče riječ 'čokolada' (xocolātl)?", answers: { A: "Astečkog", B: "Majanskog", C: "Kečua", D: "Španskog" }, correct: "A" },
{ question: "Koja država je domovina aviokompanije 'Qantas'?", answers: { A: "Kanada", B: "Južna Afrika", C: "Novi Zeland", D: "Australija" }, correct: "D" },
{ question: "Koja jedinica se koristi za mjerenje magnetne indukcije?", answers: { A: "Tesla (T)", B: "Weber (Wb)", C: "Farad (F)", D: "Henrik (H)" }, correct: "A" },
{ question: "Kako se zove vještina uzgoja minijaturnog drveća u posudama?", answers: { A: "Ikebana", B: "Bonsai", C: "Feng Shui", D: "Origami" }, correct: "B" },
{ question: "Koja je osnovna funkcija stomata na listovima biljke?", answers: { A: "Apsorpcija vode", B: "Skladištenje šećera", C: "Privlačenje insekata", D: "Razmjena gasova" }, correct: "D" },
{ question: "Kojim imenom nazivamo alternativne oblike istog gena?", answers: { A: "Hromozomi", B: "Fenotip", C: "Mutacije", D: "Aleli" }, correct: "D" },
{ question: "U kojem se gradu nalazi čuveni most uzdaha (Ponte dei Sospiri)?", answers: { A: "Firenci", B: "Parizu", C: "Rimu", D: "Veneciji" }, correct: "D" },
{ question: "Koji je filozof tvrdio da je ljudski um pri rođenju 'Tabula rasa' (prazna ploča)?", answers: { A: "John Locke", B: "Descartes", C: "Kant", D: "Hume" }, correct: "A" },
{ question: "Koji je antički filozof tvrdio da je sretan život onaj proživljen u vrlini i sredini?", answers: { A: "Aristotel", B: "Sokrat", C: "Platon", D: "Epikur" }, correct: "A" },
{ question: "Koji grad je jedini u historiji bio domaćin i Ljetnih (2008) i Zimskih (2022) olimpijskih igara?", answers: { A: "Tokio", B: "Pariz", C: "London", D: "Peking" }, correct: "D" },
{ question: "Koji pojas u većini borilačkih vještina označava početnika?", answers: { A: "Žuti", B: "Bijeli", C: "Zeleni", D: "Crni" }, correct: "B" },
{ question: "Kako se naziva užarena masa koja izlazi iz vulkana, dok se još nalazi ispod površine Zemlje?", answers: { A: "Lava", B: "Piroklast", C: "Bazalt", D: "Magma" }, correct: "D" },
{ question: "Koji je vulkan 79. godine n.e. uništio grad Pompeju?", answers: { A: "Vezuv", B: "Etna", C: "Stromboli", D: "Krakatau" }, correct: "A" },
{ question: "U kineskoj mitologiji, koja životinja simbolizuje moć, sreću i cara?", answers: { A: "Tigar", B: "Kornjača", C: "Feniks", D: "Zmaj" }, correct: "D" },
{ question: "Koji kompozitor je napisao muziku za balete 'Labuđe jezero' i 'Krcko Oraščić'?", answers: { A: "Stravinski", B: "Čajkovski", C: "Prokofjev", D: "Šopen" }, correct: "B" },
{ question: "Kako se naziva legendarno stvorenje za koje se vjeruje da živi u jezeru u Škotskoj?", answers: { A: "Nessie", B: "Bigfoot", C: "Chupacabra", D: "Yeti" }, correct: "A" },
{ question: "Koliko dana ima prestupna godina?", answers: { A: "365", B: "366", C: "364", D: "367" }, correct: "B" },
{ question: "Koji je najtvrđi prirodni materijal?", answers: { A: "Zlato", B: "Dijamant", C: "Željezo", D: "Kvarc" }, correct: "B" },
{ question: "Koji je najveći okean na svijetu?", answers: { A: "Atlantski", B: "Indijski", C: "Tihi", D: "Arktički" }, correct: "C" },
{ question: "Koji je osnovni jezik u Brazilu?", answers: { A: "Španski", B: "Portugalski", C: "Engleski", D: "Francuski" }, correct: "B" },
{ question: "Koja konstanta predstavlja odnos obima i prečnika kruga?", answers: { A: "Eulerov broj", B: "Zlatni rez", C: "Planckova konstanta", D: "Pi" }, correct: "D" },
{ question: "Koji je najdublji okeanski rov na Zemlji?", answers: { A: "Tonganski rov", B: "Filipinski rov", C: "Kurilski rov", D: "Marijanski rov" }, correct: "D" },
{ question: "Koji je hemijski element sa simbolom W?", answers: { A: "Volframijum", B: "Vanadijum", C: "Volframid", D: "Volfram" }, correct: "D" },
{ question: "Koja država ima najviše vremenskih zona na svijetu (računajući i prekomorske teritorije)?", answers: { A: "SAD", B: "Rusija", C: "Ujedinjeno Kraljevstvo", D: "Francuska" }, correct: "D" },
{ question: "Kada zastava Andore na sebi ne bi imala grb, bila bi identična zastavi koje države?", answers: { A: "Rumunjske", B: "Moldavije", C: "Čada", D: "Belgije" }, correct: "A" },
{ question: "Koja je, nakon Indonezije, druga najmnogoljudnija većinski muslimanska država na svijetu?", answers: { A: "Bangladeš", B: "Pakistan", C: "Iran", D: "Egipat" }, correct: "B" },
{ question: "U Danteovoj „Božanstvenoj komediji“, Pakao je podijeljen na 9 krugova, a Raj na koliko nebesa?", answers: { A: "7", B: "8", C: "9", D: "10" }, correct: "C" },
{ question: "Razlika kvadrata brojeva 5 i 3 daje kvadrat kojeg broja?", answers: { A: "2", B: "5", C: "3", D: "4" }, correct: "D" },
{ question: "Takozvana legionarska bolest zapravo je teška upala kojeg organa?", answers: { A: "Pluća", B: "Jetre", C: "Bubrega", D: "Srca" }, correct: "A" },
{ question: "Kako glasi kratica britanske tajne službe za koju radi James Bond?", answers: { A: "MI5", B: "MI6", C: "CIA", D: "KGB" }, correct: "B" },
{ question: "Ko je s Ryanom Lewisom snimio zaraznu pjesmu „Thrift shop“?", answers: { A: "Drake", B: "Eminem", C: "Macklemore", D: "Kanye West" }, correct: "C" },
{ question: "Koji je francuski pilot oboren u 1. svj. ratu najpoznatiji kao eponim velikog teniskog turnira?", answers: { A: "Napoleon", B: "Charles de Gaulle", C: "Louis Blériot", D: "Roland Garros" }, correct: "D" },
{ question: "Kojoj biljnoj porodici pripada rod tulipana?", answers: { A: "Ljiljanima", B: "Ružama", C: "Orhidejama", D: "Travama" }, correct: "A" },
{ question: "U koji je krug pakla Dante smjestio izdajice rođaka, domovine, stranke, gostiju i dobročinitelja?", answers: { A: "Sedmi", B: "Deveti", C: "Peti", D: "Treći" }, correct: "B" },
{ question: "Kojoj je zvijeri iz porodice pasa latinski naziv „Vulpes vulpes“?", answers: { A: "Vuk", B: "Pas", C: "Lisici", D: "Hijeni" }, correct: "C" },
{ question: "Iz koje je zemlje najmlađa dobitnica Nobelove nagrade za mir kojoj je nagrada dodijeljena 2014?", answers: { A: "Indije", B: "Irana", C: "Afganistana", D: "Pakistana" }, correct: "D" },
{ question: "Koji film drži titulu filma s najvećom zaradom svih vremena (bez prilagođavanja inflaciji)?", answers: { A: "Titanic", B: "Avatar", C: "Avengers: Endgame", D: "Star Wars" }, correct: "B" },
{ question: "Kako se u kartografiji zove broj koji označuje visinu tačke terena iznad ili ispod neke razine?", answers: { A: "Reljef", B: "Kota", C: "Izohipsa", D: "Nagib" }, correct: "B" },
{ question: "Koji je hemijski element nazvan po izumitelju periodnog sustava elemenata?", answers: { A: "Einsteinium", B: "Curium", C: "Mendelevij", D: "Nobelij" }, correct: "C" },
{ question: "Koja domaća životinja promjenom naglaska može postati pojas, struk i dodavanje u nogometu?", answers: { A: "Mačka", B: "Krava", C: "Konj", D: "Pas" }, correct: "D" },
{ question: "Koja je bosanska riječ za hungarizam „astal“?", answers: { A: "Stol", B: "Krevet", C: "Ormar", D: "Klupa" }, correct: "A" },
{ question: "Po kojem je matematičaru Nikolaus Wirth nazvao svoj viši programski jezik?", answers: { A: "Newtonu", B: "Blaiseu Pascalu", C: "Euklidu", D: "Descartesu" }, correct: "B" },
{ question: "Kako u geografiji zovemo štit izgrađen od starih stijena na području Norveške, Švedske i Finske?", answers: { A: "Alpski štit", B: "Skandinavski štit", C: "Baltički štit", D: "Uralski štit" }, correct: "C" },
{ question: "Koja su dva kontinenta cijelom površinom smještena na južnoj Zemljinoj polusferi?", answers: { A: "Australija i Antarktika", B: "Afrika i Južna Amerika", C: "Australija i Afrika", D: "Antarktika i Azija" }, correct: "A" },
{ question: "Koja je, nakon SSSR-a i SAD-a, treća zemlja koja je samostalno poslala čovjeka u Zemljinu orbitu?", answers: { A: "Japan", B: "Kina", C: "Indija", D: "Francuska" }, correct: "B" },
{ question: "Koji je troslovni akronim prenosivog formata dokumenata koji je 1993. razvila tvrtka Adobe?", answers: { A: "DOC", B: "TXT", C: "PDF", D: "XLS" }, correct: "C" },
{ question: "Koju božicu iz grčke mitologije često prati i simbolizira mala sova?", answers: { A: "Hera", B: "Artemida", C: "Afrodita", D: "Atena" }, correct: "D" },
{ question: "Koja engleska riječ za „vrh“ označava konferenciju najviših predstavnika nekih država?", answers: { A: "Summit", B: "Peak", C: "Top", D: "Crown" }, correct: "A" },
{ question: "Prema europskim predajama, koliko očiju ima jednorog?", answers: { A: "1", B: "2", C: "3", D: "4" }, correct: "B" },
{ question: "Koja je palindromska riječ za matematički izraz sa samo jednim članom?", answers: { A: "Binom", B: "Polinom", C: "Monom", D: "Trinom" }, correct: "C" },
{ question: "U kojem je Burtonovu filmu Anne Hathaway Bijela Kraljica, a Johnny Depp Ludi Šeširdžija?", answers: { A: "Sweeney Todd", B: "Charlie i tvornica čokolade", C: "Corpse Bride", D: "Alisa u zemlji čudesa" }, correct: "D" },
{ question: "Koji prekomorski teritorij ima na zastavi crvenu tvrđavu i zlatni ključ?", answers: { A: "Kipar", B: "Bermuda", C: "Falklandi", D: "Gibraltar" }, correct: "D" },
{ question: "Po licenci koje njemačke kompanije je radila Tvornica automobila Sarajevo (TAS)?", answers: { A: "BMW", B: "Opel", C: "Volkswagen", D: "Mercedes-Benz" }, correct: "C" },
{ question: "Koji film Emira Kusturice je 1995. osvojio Zlatnu palmu u Cannesu?", answers: { A: "Arizona Dream", B: "Underground", C: "Otac na službenom putu", D: "Dom za vješanje" }, correct: "B" },
{ question: "Kako se zvao otac animiranog Homera Simpsona?", answers: { A: "Abraham Simpson", B: "Herbert Simpson", C: "George Simpson", D: "Peter Simpson" }, correct: "A" },
{ question: "Koliko traje jedna NBA utakmica (regularno vrijeme)?", answers: { A: "40 minuta", B: "48 minuta", C: "60 minuta", D: "45 minuta" }, correct: "B" },
{ question: "Koji geometrijski oblik ime dobija od grčke riječi za mali sto?", answers: { A: "trapez", B: "prizma", C: "piramida", D: "kocka" }, correct: "A" },
{ question: "Kojoj aviokompaniji je pripadao avion MH17 koji je srušen iznad Ukrajine 2014.?", answers: { A: "Lufthansa", B: "Malaysia Airlines", C: "KLM", D: "Aeroflot" }, correct: "B" },
{ question: "Kako glasi italijanski izraz za potpuno mirno more bez vjetra?", answers: { A: "bonaccia", B: "mare calma", C: "aqua mare", D: "quieto mare" }, correct: "A" },
{ question: "Koliki je maksimalni broj bodova koji se može osvojiti u jednom bacanju (tri strijele) u pikadu?", answers: { A: "150", B: "180", C: "200", D: "100" }, correct: "B" },
{ question: "Iz kojeg grada dolazi fudbalski klub Crystal Palace?", answers: { A: "Manchester", B: "London", C: "Liverpool", D: "Birmingham" }, correct: "B" },
{ question: "Koliko struna ima standardna klasična gitara?", answers: { A: "4", B: "5", C: "6", D: "7" }, correct: "C" },
{ question: "Koliko sekundi traje jedan puni okret Zemlje u odnosu na Sunce (približno, jedan dan)?", answers: { A: "86,400", B: "84,600", C: "88,200", D: "82,800" }, correct: "A" },
{ question: "Koliko sati traje jedan dan na Jupiteru, najbržoj planeti u Sunčevom sistemu?", answers: { A: "100 sati", B: "50 sata", C: "24 sati", D: "10 sati" }, correct: "D" },
{ question: "Koliko dana traje jedna godina na planeti Merkur (najbližoj Suncu)?", answers: { A: "88 dana", B: "200 dana", C: "365 dana", D: "500 dana" }, correct: "A" },
{ question: "Koliko tipki (crnih i bijelih ukupno) ima standardni koncertni klavir?", answers: { A: "54", B: "66", C: "88", D: "102" }, correct: "C" },
{ question: "Koliko država je originalno osnovalo Ujedinjene nacije 1945. godine?", answers: { A: "41", B: "51", C: "57", D: "67" }, correct: "B" },
{ question: "Koliko država je 1949. godine osnovalo NATO savez?", answers: { A: "12", B: "25", C: "5", D: "30" }, correct: "A" },
{ question: "Koliko kilometara iznosi dužina ekvatora Zemlje (približno)?", answers: { A: "60075 km", B: "30075 km", C: "50075 km", D: "40075 km" }, correct: "D" },
{ question: "Koliko pršljenova (kostiju) čini ljudsku kičmu?", answers: { A: "15", B: "20", C: "33", D: "50" }, correct: "C" },
{ question: "Koliko država je članica NATO saveza (stanje 2024/2025. godina)?", answers: { A: "42", B: "12", C: "22", D: "32" }, correct: "D" },
{ question: "Koji hemijski element sličan olovu ima atomski simbol Tl?", answers: { A: "titanij", B: "torij", C: "telur", D: "talij" }, correct: "D" }

],
hard: [
{ question: "Koju je životinju Mali princ pripitomio u „Malom princu“?", answers: { A: "Vuka", B: "Lisicu", C: "Psa", D: "Zeca" }, correct: "B" },
{ question: "Što u biologiji označava tekući dio krvi, a u fizici stanje potpuno ionizirane tvari?", answers: { A: "Serum", B: "Limfa", C: "Plazma", D: "Elektrolit" }, correct: "C" },
{ question: "Ko je posljednja osoba iz SAD-a ovjenčana Nobelom za mir?", answers: { A: "Jimmy Carter", B: "Al Gore", C: "Joe Biden", D: "Barack Obama" }, correct: "D" },
{ question: "Koliko je prepona na putu atletičarima na utrci 110 m s preponama?", answers: { A: "10", B: "11", C: "12", D: "9" }, correct: "A" },
{ question: "Koji se planet u Sunčevom sustavu okreće unatrag?", answers: { A: "Mars", B: "Venera", C: "Uran", D: "Neptun" }, correct: "B" },
{ question: "Koja je jedina ptica koja može letjeti unatrag?", answers: { A: "Lastavica", B: "Sokol", C: "Kolibri", D: "Vrana" }, correct: "C" },
{ question: "Po kojoj je američkoj saveznoj državi nazvana jedina sjevernoamerička autohtona pasmina dugodlakih mačaka?", answers: { A: "Maine", B: "Alaska", C: "Texas", D: "Oregon" }, correct: "A" },
{ question: "U kojem se zaljevu u travnju 2010. dogodio najveći izljev nafte u povijesti?", answers: { A: "Perzijski zaljev", B: "Meksički zaljev", C: "Bengalski zaljev", D: "Iranski zaljev" }, correct: "B" },
{ question: "U kojem se godišnjem dobu vozi biciklistička utrka Tour de France?", answers: { A: "Proljeće", B: "Jesen", C: "Zima", D: "Ljeto" }, correct: "D" },
{ question: "Koji se broj nalazi u naslovu posljednjeg romana Umberta Eca iz 2015?", answers: { A: "Jedan", B: "Dva", C: "Tri", D: "Nula" }, correct: "D" },
{ question: "Koji igrač drži rekord po broju osvojenih NBA prstenova?", answers: { A: "Michael Jordan", B: "Kobe Bryant", C: "Bill Russell", D: "LeBron James" }, correct: "C" },
{ question: "Koja se europska otočna država u turističkim prospektima reklamira kao „Zemlja vatre i leda“?", answers: { A: "Irska", B: "Island", C: "Malta", D: "Kipar" }, correct: "B" },
{ question: "Koju tjelesnu tekućinu izlučuju lakrimalne žlijezde?", answers: { A: "Znoj", B: "Krv", C: "Suze", D: "Sline" }, correct: "C" },
{ question: "Najveća američka savezna država Aljaska u uniju je primljena kao koja država po redu?", answers: { A: "47.", B: "48.", C: "49.", D: "50." }, correct: "C" },
{ question: "Anetodermija je stanje koje zahvata koji organ ljudskog tijela??", answers: { A: "Srce", B: "Pluća", C: "Jetru", D: "Kožu" }, correct: "D" },
{ question: "Na čelu kojeg je glavnog grada Sadiq Khan, sunitski musliman porijeklom iz Pakistana?", answers: { A: "Berlina", B: "Madrida", C: "Cardiffa", D: "London" }, correct: "D" },
{ question: "Koje je jelo uzrok slučajnog poljupca u Disneyjevu klasiku „Dama i skitnica“?", answers: { A: "Pizza", B: "Hamburger", C: "Doner", D: "Špageti" }, correct: "D" },
{ question: "Kako se prezivala balerina Ana po kojoj je nazvana torta od šećera, bjelanjka, slatkog vrhnja i jagoda?", answers: { A: "Kirov", B: "Pavlova", C: "Nijinska", D: "Volkova" }, correct: "B" },
{ question: "Ovlaštenje koje zastupnici dobivaju od birača za zastupanje u parlamentu zove se zastupnički – što?", answers: { A: "Mandat", B: "Dekret", C: "Amandman", D: "Statut" }, correct: "A" },
{ question: "Koja je država domovina mačkice Hello Kitty?", answers: { A: "Japan", B: "Kina", C: "Južna Koreja", D: "Tajland" }, correct: "A" },
{ question: "U kojem se dijelu Ujedinjenog Kraljevstva nalazi grad Londonderry?", answers: { A: "Škotska", B: "Wales", C: "Engleska", D: "Sjeverna Irska" }, correct: "D" },
{ question: "Po kojem je američkom gradu nazvana pizza duboka tri inča kojoj se sastojci slažu i unutra i na površini?", answers: { A: "New York", B: "Los Angeles", C: "Chicago", D: "Boston" }, correct: "C" },
{ question: "Koja je plastična igračka tema velikog hita grupe Aqua iz 1997?", answers: { A: "Lutka Barbie", B: "Teddy Bear", C: "Lego kockice", D: "Playmobil" }, correct: "A" },
{ question: "Koji je treći po veličini australski grad glavni grad Queenslanda?", answers: { A: "Sydney", B: "Melbourne", C: "Brisbane", D: "Perth" }, correct: "C" },
{ question: "Koliko je, od 1963, bilo baklji na grbu SFRJ?", answers: { A: "5", B: "6", C: "7", D: "8" }, correct: "B" },
{ question: "U kojem se gradu nalazi sjedište Evropske centralne banke (ECB)?", answers: { A: "Briselu", B: "Parizu", C: "Frankfurtu", D: "Strasbourgu" }, correct: "C" },
{ question: "Koja država je domovina borilačke vještine Krav Maga?", answers: { A: "Japan", B: "Izrael", C: "Kina", D: "Tajland" }, correct: "B" },
{ question: "Kako se naziva kriva linija kojom se planete kreću oko Sunca?", answers: { A: "Parabola", B: "Kružnica", C: "Elipsa", D: "Hiperbola" }, correct: "C" },
{ question: "Kako se naziva nauka o pčelama?", answers: { A: "Apiologija", B: "Mirmekologija", C: "Araknologija", D: "Ekologija" }, correct: "A" },
{ question: "Kako se naziva nauka koja proučava porijeklo i značenje riječi?", answers: { A: "Onomastika", B: "Leksikologija", C: "Semantika", D: "Etimologija" }, correct: "D" },
{ question: "U muzičkoj teoriji, kako se naziva razmak od osam tonova između dvije note istog imena?", answers: { A: "Kvinta", B: "Terca", C: "Oktava", D: "Kvarta" }, correct: "C" },
{ question: "Koji je najveći i najdublji okean na planeti Zemlji?", answers: { A: "Atlantski okean", B: "Indijski okean", C: "Arktički okean", D: "Tihi okean (Pacifik)" }, correct: "D" },
{ question: "U skandinavskoj mitologiji, kako se zove čuveni čekić boga Thora?", answers: { A: "Gungnir", B: "Excalibur", C: "Yggdrasil", D: "Mjolnir" }, correct: "D" },
{ question: "Koji hemijski element čini većinu mase Sunca?", answers: { A: "Vodonik", B: "Helijum", C: "Kiseonik", D: "Ugljik" }, correct: "A" },
{ question: "U optici, kako se naziva pojava prelamanja svjetlosti prilikom prelaska iz jedne sredine u drugu?", answers: { A: "Refleksija", B: "Refrakcija", C: "Difrakcija", D: "Disperzija" }, correct: "B" },
{ question: "Koliko je karaktera iznosio prvobitni limit za jednu objavu na društvenoj mreži Twitter (danas X)?", answers: { A: "100", B: "140", C: "280", D: "500" }, correct: "B" },
{ question: "Kako se naziva prvi javno dostupni internet pretraživač (browser) koji je popularizovao World Wide Web 1993. godine?", answers: { A: "Google Chrome", B: "Internet Explorer", C: "Mosaic", D: "Firefox" }, correct: "C" },
{ question: "Koliko Oscar nagrada je osvojio film 'Titanic'?", answers: { A: "9", B: "10", C: "11", D: "12" }, correct: "C" },
{ question: "Koja država je osvojila Evropsko prvenstvo 1992. godine iako se prvobitno nije ni kvalifikovala?", answers: { A: "Danska", B: "Holandija", C: "Njemačka", D: "Švedska" }, correct: "A" },
{ question: "Koju orijentalnu vrstu pokrivala za glavu nosi Vermeerova „Djevojka s bisernom naušnicom“?", answers: { A: "Kapa", B: "Marama", C: "Šešir", D: "Turban" }, correct: "D" },
{ question: "Šta je u ustima siluete mornara na grbu nogometnog kluba Sampdoria?", answers: { A: "Cigareta", B: "Lula", C: "Nož", D: "Knjiga" }, correct: "B" },
{ question: "U kojem dugovječnom anime-serijalu pratimo avanture snažnog svemirca Gokua?", answers: { A: "Naruto", B: "One Piece", C: "Bleach", D: "Dragon Ball" }, correct: "D" },
{ question: "Koje je godine EU doživjela svoje peto i najveće proširenje kad joj se priključilo 10 država?", answers: { A: "2000", B: "2002", C: "2004", D: "2006" }, correct: "C" },
{ question: "Do kojeg je broja periodni sistem elemenata narastao dodavanjem 4 novih elemenata krajem 2015?", answers: { A: "116", B: "117", C: "118", D: "120" }, correct: "C" },
{ question: "Koji drenažni uređaj omogućuje uvjete poput onih prilikom vožnje automobilom ili avionom?", answers: { A: "Simulator", B: "Generator", C: "Kompresor", D: "Aparat" }, correct: "A" },
{ question: "Kojem borilačkom serijalu video-igara ime u prevodu s japanskog znači „željezna šaka“?", answers: { A: "Street Fighter", B: "Mortal Kombat", C: "Tekken", D: "Dead or Alive" }, correct: "C" },
{ question: "Koje je nacionalnosti najbolji europski strijelac u historiji NBA lige?", answers: { A: "Francuske", B: "Španske", C: "Srpske", D: "Njemačke" }, correct: "D" },
{ question: "Kako se zove druga talijanska nogometna liga?", answers: { A: "Serie A", B: "Serie C", C: "Coppa Italia", D: "Serie B" }, correct: "D" },
{ question: "Koji je prvi Euro na kojem je učestvovalo 24 reprezentacije?", answers: { A: "Euro 2008", B: "Euro 2012", C: "Euro 2016", D: "Euro 2020" }, correct: "C" },
{ question: "Koja kavkaska država na svojoj zastavi ima čak 5 križeva?", answers: { A: "Jermenija", B: "Gruzija", C: "Azerbejdžan", D: "Moldavija" }, correct: "B" }



],
hardest: [
{ question: "Šta se događa s našim perifernim krvnim žilama uslijed hladnoće?", answers: { A: "Šire se", B: "Pucaju", C: "Nestaju", D: "Skupljaju se" }, correct: "D" },
{ question: "Koji je grad dom zoološkog vrta s najvećim brojem životinjskih vrsta na svijetu?", answers: { A: "Pariz", B: "London", C: "Berlin", D: "Beč" }, correct: "C" },
{ question: "Kako bi, preveden na bosanski, glasio naziv francuskih novina „Le Monde“ i njemačkih novina „Die Welt“?", answers: { A: "Zemlja", B: "Evropa", C: "Narod", D: "Svijet" }, correct: "D" },
{ question: "Šta označava slovo H u kratici „pH“, broju koji služi kao mjera kiselosti ili lužnatosti?", answers: { A: "Hidrogen", B: "Helij", C: "Hlor", D: "Hematit" }, correct: "A" },
{ question: "Koji je najdublji ženski glas u podjeli na tri osnovna?", answers: { A: "Sopran", B: "Mezzosopran", C: "Tenor", D: "Alt" }, correct: "D" },
{ question: "Koji je grad, prema grčkom mitu, osnovao Kadmo, a razorio Aleksandar Veliki?", answers: { A: "Atina", B: "Teba", C: "Sparta", D: "Korint" }, correct: "B" },
{ question: "Koji gudački instrument s dinarskog prostora obično ima jednu ili dvije žice od konjskog repa?", answers: { A: "Šargija", B: "Gusle", C: "Tamburica", D: "Lijerica" }, correct: "B" },
{ question: "KoJi naziv dijele biljarski štap i talijanizam za potpeticu?", answers: { A: "Patina", B: "Talon", C: "Tak", D: "Heel" }, correct: "C" },
{ question: "Koliko igrača jedne ekipe je istovremeno na terenu u košarci?", answers: { A: "4", B: "5", C: "6", D: "7" }, correct: "B" },
{ question: "Koja reprezentacija je jedina osvojila Svjetsko prvenstvo tri puta zaredom?", answers: { A: "Brazil", B: "Italija", C: "Njemačka", D: "Nijedna" }, correct: "D" },
{ question: "Koji je otok dug 190 km najveći otok američke savezne države New York?", answers: { A: "Staten Island", B: "Manhattan", C: "Brooklyn", D: "Long Island" }, correct: "D" },
{ question: "Ko je zbog brzog i atraktivnog stila igre u svijetu snookera poznat i kao „The Rocket“?", answers: { A: "Ronnie O’Sullivan", B: "Stephen Hendry", C: "Mark Selby", D: "Judd Trump" }, correct: "A" },
{ question: "Kojom se riječju iz francuskog jezika naziva slikarska radionica?", answers: { A: "Studio", B: "Atelje", C: "Radionica", D: "Galerija" }, correct: "B" },
{ question: "Na koju se bjelančevinu u crvenim krvnim stanicama ugljikov monoksid veže 20 puta brže od kisika?", answers: { A: "Mioglobin", B: "Keratin", C: "Fibrinogen", D: "Hemoglobin" }, correct: "D" },
{ question: "U kojoj je disciplini Japanac Noriaki Kasai na zimskim olimpijskim igrama nastupio rekordnih 7 puta?", answers: { A: "Plivanje", B: "Biatlon", C: "Skijaško trčanje", D: "Skijaški skokovi" }, correct: "D" },
{ question: "Koja je država četiri puta organizirala ljetne olimpijske igre?", answers: { A: "SAD", B: "Francuska", C: "Grčka", D: "Japan" }, correct: "A" },
{ question: "Koja najveća i najsjevernija regija Finske zauzima više od četvrtine ukupne površine te zemlje?", answers: { A: "Uusimaa", B: "Laponija", C: "Savo", D: "Ostrobotnija" }, correct: "B" },
{ question: "Koji je sport 6. februara 1971. astronaut Alan Shepard zaigrao na Mjesecu?", answers: { A: "Tenis", B: "Košarka", C: "Bejzbol", D: "Golf" }, correct: "D" },
{ question: "Koliko minuta traje jedna četvrtina utakmice u evropskoj košarci?", answers: { A: "11", B: "8", C: "12", D: "10" }, correct: "D" },
{ question: "Koliko crnih tipki ima standardni koncertni klavir?", answers: { A: "34", B: "36", C: "38", D: "40" }, correct: "B" },
{ question: "Koliko bijelih tipki ima standardni koncertni klavir?", answers: { A: "44", B: "48", C: "50", D: "52" }, correct: "D" },
{ question: "Koja je najduža rijeka koja teče isključivo kroz jednu državu?", answers: { A: "Nil", B: "Amazon", C: "Jangce", D: "Žuta rijeka" }, correct: "C" },
{ question: "Koji se dio mozga smatra odgovornim za koordinaciju pokreta, ravnotežu i preciznu motoriku?", answers: { A: "Talamus", B: "Hipotalamus", C: "Mali mozak", D: "Produžena moždina" }, correct: "C" },
{ question: "Kako se u lingvistici naziva najmanja jedinica značenja u jeziku (ne nužno cijela riječ)?", answers: { A: "Fonem", B: "Grafem", C: "Morfem", D: "Leksem" }, correct: "C" },
{ question: "Koja je prva operativna nuklearna elektrana na svijetu počela sa radom 1954. godine u SSSR-u?", answers: { A: "Obninsk", B: "Černobil", C: "Kozloduj", D: "Zaporožje" }, correct: "A" },
{ question: "Koja je životinja najbrža u vodi, dostižući brzinu od preko 100 kilometara na sat?", answers: { A: "Morski pas modrulj", B: "Plavi kit", C: "Sabljarka", D: "Delfin (Lagenorhynchus acutus)" }, correct: "C" },
{ question: "Koja supstanca ima najnižu tačku ključanja od svih poznatih elemenata (-268.9 °C)?", answers: { A: "Vodonik", B: "Neon", C: "Helijum", D: "Azot" }, correct: "C" },
{ question: "Koji je kompozitor napisao operu 'Fidelio', svoju jedinu operu na kojoj je radio preko deset godina?", answers: { A: "Mozart", B: "Wagner", C: "Verdi", D: "Beethoven" }, correct: "D" },
{ question: "U kojem se italijanskom gradu nalazi bazilika sv. Marka, poznata po vizantijskim mozaicima?", answers: { A: "Rim", B: "Firenca", C: "Venecija", D: "Milano" }, correct: "C" },
{ question: "Koji je hemijski element dobio ime po mitskom liku koji je bio osuđen na vječnu žeđ i glad u vodi koja bi se povukla kad god bi pokušao piti?", answers: { A: "Prometijum", B: "Sizif", C: "Tantal", D: "Titanijum" }, correct: "C" },
{ question: "Koja je jedina kopnena država na svijetu koja je u potpunosti okružena teritorijom samo jedne druge države (enklava), a da nije San Marino ili Vatikan?", answers: { A: "Lesoto", B: "Esvatini", C: "Andora", D: "Monako" }, correct: "A" },
{ question: "Koji se moreuz nalazi između Ognjene Zemlje (Tierra del Fuego) i Antarktika, te važi za najolujnije more na svijetu?", answers: { A: "Drakeov prolaz", B: "Magelanov prolaz", C: "Cookov prolaz", D: "Beringov prolaz" }, correct: "A" },
{ question: "Kako se zove proces kojim biljke oslobađaju višak vode u obliku kapljica kroz pore na ivicama listova (ne miješati sa rosom)?", answers: { A: "Transpiracija", B: "Gutacija", C: "Osmoza", D: "Fotosinteza" }, correct: "B" },
{ question: "Koji je jedini dobitnik Nobelove nagrade za književnost koji je ujedno osvojio i Oscara za svoj scenarij?", answers: { A: "George Bernard Shaw", B: "Ernest Hemingway", C: "Jean-Paul Sartre", D: "Samuel Beckett" }, correct: "A" },
{ question: "Koji je antički matematičar prvi prilično precizno izračunao obim Zemlje koristeći sjenke u dva različita grada?", answers: { A: "Tales", B: "Eratosten", C: "Arhimed", D: "Euklid" }, correct: "B" },
{ question: "Kako se zove najudaljeniji vještački objekat od Zemlje, koji se trenutno nalazi u međuzvjezdanom prostoru?", answers: { A: "Pioneer 10", B: "Voyager 1", C: "Voyager 2", D: "New Horizons" }, correct: "B" },
{ question: "Koji se hemijski element sa atomskim brojem 118 nalazi na samom kraju trenutnog periodnog sistema?", answers: { A: "Oganeson", B: "Tenecin", C: "Livermorijum", D: "Moskovijum" }, correct: "A" },
{ question: "Koja je najrjeđa krvna grupa na svijetu, poznata i kao 'Zlatna krv', koju posjeduje manje od 50 ljudi?", answers: { A: "AB negativna", B: "0 negativna", C: "Rh-null", D: "Bombay fenotip" }, correct: "C" },
{ question: "Koja je životinja bila prva živa vrsta koja je obletjela Mjesec i uspješno se vratila na Zemlju (misija Zond 5)?", answers: { A: "Pas", B: "Majmun", C: "Kornjača", D: "Štakor" }, correct: "C" },
{ question: "Koliko dana traje jedna godina na planeti Mars (približno)?", answers: { A: "365", B: "687", C: "424", D: "780" }, correct: "B" },
{ question: "Koliko kostiju ima ljudska lobanja (odrasla osoba)?", answers: { A: "22", B: "24", C: "26", D: "28" }, correct: "A" },
{ question: "Koliko minuta traje jedan hokejaški period u NHL-u?", answers: { A: "15", B: "18", C: "20", D: "25" }, correct: "C" },
{ question: "Koji je prvi programabilni računar opće namjene u historiji?", answers: { A: "ENIAC", B: "Z3", C: "UNIVAC I", D: "Colossus" }, correct: "B" },
{ question: "Koja životinja ima najveći omjer veličine mozga i tijela u morskom svijetu?", answers: { A: "Delfin", B: "Hobotnica", C: "Kit ubica", D: "Ajkula" }, correct: "B" },
{ question: "Koji grad je bio glavni centar civilizacije Maja na poluostrvu Jukatan?", answers: { A: "Teotihuacan", B: "Chichen Itza", C: "Tikal", D: "Monte Alban" }, correct: "B" },
{ question: "Koji je najveći poznati prosti broj otkriven do početka 2025. godine?", answers: { A: "2^136279841 - 1", B: "2^82589933 - 1", C: "2^77232917 - 1", D: "261 - 1" }, correct: "A" },
{ question: "Koja knjiga se smatra prvom knjigom štampanom pomoću pokretnih metalnih slova u Evropi?", answers: { A: "Gutenbergova Biblija", B: "Kur'an", C: "Ilijada", D: "Mahabharata" }, correct: "A" },
{ question: "Koji naučnik je prvi izveo eksperiment sa klatnom kojim je dokazao rotaciju Zemlje?", answers: { A: "Newton", B: "Galileo", C: "Foucault", D: "Kepler" }, correct: "C" },
{ question: "Koji je najduži nerv u ljudskom tijelu?", answers: { A: "Isijadični nerv", B: "Optički nerv", C: "Vagus nerv", D: "Radijalni nerv" }, correct: "A" },
{ question: "Koji od navedenih metala ima najnižu tačku topljenja nakon žive?", answers: { A: "Galij", B: "Francij", C: "Cink", D: "Cezij" }, correct: "D" }
]
}
}

};


let selectedQuestions = [];

const prizes = [
  "100", "200", "300", "500", "1,000",
  "2,000", "4,000", "8,000", "16,000", "32,000",
  "64,000", "125,000", "250,000", "500,000", "1,000,000"
];

const milestones = [4, 9, 14];

let currentQuestion = 0;
let lifelines = {
  fiftyFifty: true,
  phoneAFriend: true,
  askAudience: true
};

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function selectRandomQuestions() {
  const lang = currentLanguage;
  const bank = questionBank[lang];

  let seen = new Set(getSeenQuestions());

  const easy = [];
  const hard = [];
  const hardest = [];

  Object.keys(bank).forEach(category => {
    ["easy", "hard", "hardest"].forEach(diff => {
      if (bank[category][diff]) {
        bank[category][diff].forEach(q => {
          q._category = category;
          q._difficulty = diff;
        });

        if (diff === "easy") easy.push(...bank[category][diff]);
        if (diff === "hard") hard.push(...bank[category][diff]);
        if (diff === "hardest") hardest.push(...bank[category][diff]);
      }
    });
  });

  const filterSeen = (arr) => {
    let filtered = arr.filter(q => !seen.has(makeQuestionId(q)));

    // 🔥 FIX: ako je sve potrošeno → reset
    if (filtered.length === 0) {
      localStorage.removeItem("seenQuestions");
      seen = new Set();
      filtered = arr;
    }

    return filtered;
  };

  selectedQuestions = [
    ...shuffleArray(filterSeen(easy)).slice(0, 5),
    ...shuffleArray(filterSeen(hard)).slice(0, 5),
    ...shuffleArray(filterSeen(hardest)).slice(0, 5)
  ];
}

function initGame() {
  currentQuestion = 0;
  lifelines = {
    fiftyFifty: true,
    phoneAFriend: true,
    askAudience: true
  };
  
  selectRandomQuestions();
  updateLanguageLabels();
  renderPrizeLadder();
  loadQuestion();
  resetLifelines();
  document.getElementById('gameOverModal').classList.add('hidden');
}

function updateLanguageLabels() {
  const t = translations[currentLanguage];
  document.getElementById('questionLabel').textContent = t.question;
  document.getElementById('ofLabel').textContent = t.of;
}

function renderPrizeLadder() {
  const ladder = document.getElementById('prizeLadder');
  ladder.innerHTML = '';
  
  for (let i = prizes.length - 1; i >= 0; i--) {
    const prizeDiv = document.createElement('div');
    prizeDiv.className = 'prize-item px-2 py-1 text-center font-bold text-xs transition-all';
    prizeDiv.dataset.index = i;
    
    const isMilestone = milestones.includes(i);
    
    if (isMilestone) {
      prizeDiv.classList.add('prize-milestone');
    }
    
    if (i === currentQuestion) {
  prizeDiv.classList.add('prize-active');
  prizeDiv.classList.add('pulse-active');
      prizeDiv.classList.remove('prize-item');
      if (isMilestone) {
        prizeDiv.classList.remove('prize-milestone');
      }
      prizeDiv.classList.add('prize-active');
      const prizeNumber = `<span class="text-white font-extrabold text-sm">${i + 1}.</span>`;
      const prizeAmount = `<span class="text-white font-extrabold text-base ml-1">$ ${prizes[i]}</span>`;
      const milestone = isMilestone ? ' <span class="text-white text-lg ml-1">♦</span>' : '';
      prizeDiv.innerHTML = `${prizeNumber} ${prizeAmount}${milestone}`;
    } else if (i < currentQuestion) {
      prizeDiv.style.opacity = '0.4';
      const prizeNumber = `<span class="text-gray-500 text-sm">${i + 1}.</span>`;
      const prizeAmount = `<span class="text-gray-500 text-sm ml-1">$ ${prizes[i]}</span>`;
      const milestone = isMilestone ? ' <span class="text-gray-600 text-base ml-1">♦</span>' : '';
      prizeDiv.innerHTML = `${prizeNumber} ${prizeAmount}${milestone}`;
    } else {
      const prizeNumber = `<span class="text-blue-300 text-sm">${i + 1}.</span>`;
      const prizeAmount = `<span class="text-white text-sm ml-1">$ ${prizes[i]}</span>`;
      const milestone = isMilestone ? ' <span class="text-orange-400 text-base ml-1">♦</span>' : '';
      prizeDiv.innerHTML = `${prizeNumber} ${prizeAmount}${milestone}`;
    }
    
    ladder.appendChild(prizeDiv);
  }
}


function loadQuestion() {
  if (currentQuestion >= selectedQuestions.length) {
    endGame(true);
    return;
  }

  const q = selectedQuestions[currentQuestion];
saveSeenQuestion(makeQuestionId(q));

  document.getElementById('questionNumber').textContent = currentQuestion + 1;

  const questionEl = document.getElementById('questionText');

  // fade out
  questionEl.style.opacity = '0';
  questionEl.style.transform = 'translateY(10px)';
  questionEl.style.transition = 'all 0.25s ease';

  setTimeout(() => {
    questionEl.textContent = q.question;

    questionEl.style.opacity = '1';
    questionEl.style.transform = 'translateY(0)';
  }, 150);

  const answerButtons = document.querySelectorAll('.answer-btn');

  answerButtons.forEach((btn, index) => {
    const letter = btn.dataset.answer;

    btn.querySelector('.answer-text').textContent = q.answers[letter];

    btn.disabled = false;
    btn.style.pointerEvents = 'auto';
btn.style.cursor = 'pointer'; //

    btn.classList.remove('correct', 'wrong', 'selected');

    btn.style.opacity = '0';
    btn.style.transform = 'translateY(8px)';

    setTimeout(() => {
      btn.style.transition = 'all 0.2s ease';
      btn.style.opacity = '1';
      btn.style.transform = 'translateY(0)';
    }, index * 70);
  });

  renderPrizeLadder();
  updateMobileProgress();
}
function checkAnswer(selectedAnswer) {
  const q = selectedQuestions[currentQuestion];
  const answerButtons = document.querySelectorAll('.answer-btn');

  // lock input
  answerButtons.forEach(btn => {
    btn.disabled = true;
    btn.style.pointerEvents = 'none';
  });

  const selectedBtn = document.querySelector(`[data-answer="${selectedAnswer}"]`);
  const correctBtn = document.querySelector(`[data-answer="${q.correct}"]`);

  // show selection (orange)
  selectedBtn.classList.add('selected');
  playSound('lockSound');

  // small press effect
  selectedBtn.style.transform = 'scale(1.02)';
  selectedBtn.style.transition = 'all 0.15s ease';

  // ⏳ WAIT (TV QUIZ FEEL)
  setTimeout(() => {

    selectedBtn.classList.remove('selected');

    // ✅ CORRECT
    if (selectedAnswer === q.correct) {

      selectedBtn.classList.add('correct');
      playSound('correctSound');

      if (milestones.includes(currentQuestion)) {
setTimeout(() => {
  viewers += 250 + Math.random() * 300;

  if (viewers > 1500) viewers = 1500;

  document.getElementById("viewers").textContent =
    Math.floor(viewers).toLocaleString();
}, 500);
        setTimeout(() => {
          selectedBtn.classList.add('celebrate');
          playSound('milestoneSound');
          createConfetti();
setTimeout(createConfetti, 300);
setTimeout(createConfetti, 600);
        }, 400);
      }

      setTimeout(() => {
        currentQuestion++;
        loadQuestion();
      }, 1600);

    } 
    // ❌ WRONG
    else {

      selectedBtn.classList.add('wrong');
      correctBtn.classList.add('correct');
      playSound('wrongSound');

      wrongQuestionData = {
        question: q.question,
        answers: q.answers,
        correct: q.correct,
        selected: selectedAnswer,
        explanation: q.explanation || 'No explanation available.',
        commonMistake: q.commonMistake || 'No common mistake info.'
      };

      setTimeout(() => {
        endGame(false);
viewers -= 200 + Math.random() * 300;

if (viewers < 0) viewers = 0;

document.getElementById("viewers").textContent =
  Math.floor(viewers).toLocaleString();
      }, 2000);
    }

  }, 1500);
}


    function endGame(won) {
      const t = translations[currentLanguage];
      let prize = "$0";
      let message = "";
      let score = currentQuestion;
      
      // Update stats
      gameStats.totalGames++;
      gameStats.totalScore += score;
      if (score > gameStats.bestScore) {
        gameStats.bestScore = score;
      }
      
      // Update streak
      if (won || score >= 10) {
        gameStats.currentStreak++;
        gameStats.lastGameWon = true;
      } else {
        gameStats.currentStreak = 0;
        gameStats.lastGameWon = false;
      }
      
      // Check if any lifelines were used
      const usedLifelines = !lifelines.fiftyFifty || !lifelines.phoneAFriend || !lifelines.askAudience;
      
      // Check for new badges
      checkBadges(score, !usedLifelines);
      
      saveStats();
      
      if (won) {
        prize = "$ " + prizes[prizes.length - 1];
        message = t.incredible;
        document.getElementById('gameOverTitle').textContent = `🎉 ${t.congratulations} 🎉`;
        playSound('winSound');
        createConfetti();
setTimeout(createConfetti, 300);
setTimeout(createConfetti, 600);
      } else {
        for (let i = milestones.length - 1; i >= 0; i--) {
          if (currentQuestion > milestones[i]) {
            prize = "$ " + prizes[milestones[i]];
            break;
          }
        }
        message = t.wrongAnswer;
        document.getElementById('gameOverTitle').textContent = t.gameOver;
        playSound('loseSound');
        
        // Show explanation if wrong answer
        if (wrongQuestionData) {
          document.getElementById('explanationSection').classList.remove('hidden');
          document.getElementById('wrongQuestionText').textContent = wrongQuestionData.question;
          document.getElementById('wrongAnswerA').innerHTML = `A: ${wrongQuestionData.answers.A}`;
          document.getElementById('wrongAnswerB').innerHTML = `B: ${wrongQuestionData.answers.B}`;
          document.getElementById('wrongAnswerC').innerHTML = `C: ${wrongQuestionData.answers.C}`;
          document.getElementById('wrongAnswerD').innerHTML = `D: ${wrongQuestionData.answers.D}`;
          document.getElementById('correctAnswerDisplay').textContent = `${wrongQuestionData.correct}: ${wrongQuestionData.answers[wrongQuestionData.correct]}`;
          document.getElementById('explanationText').textContent = wrongQuestionData.explanation;
          document.getElementById('commonMistakeText').textContent = wrongQuestionData.commonMistake;
          
          // Update labels
          document.getElementById('explanationTitle').textContent = t.explanation;
          document.getElementById('correctAnswerLabel').textContent = t.correctAnswer;
          document.getElementById('explanationLabel').textContent = t.explanation;
          document.getElementById('commonMistakeLabel').textContent = t.commonMistake;
        }
      }
      
      document.getElementById('gameOverMessage').innerHTML = `${message}<br>${t.youWon}: <span id="finalPrize" class="text-green-400 font-bold">${prize}</span>`;
      document.querySelector('#playAgain').textContent = t.playAgain;
      document.getElementById('shareLabel').textContent = t.share;
      
      // Update stats display
      updateStatsDisplay();
      
      document.getElementById('gameOverModal').classList.remove('hidden');

    }

    function useFiftyFifty() {
  if (!lifelines.fiftyFifty) return;

  // 🎧 SOUND
  const audio = document.getElementById("fiftyFiftySound");
  if (audio) {
    audio.currentTime = 0;
    audio.volume = 0.8;
    audio.play().catch(() => {});
  }


  setTimeout(() => {
  }, 150);

  const q = selectedQuestions[currentQuestion];
  const answerButtons = document.querySelectorAll('.answer-btn');

  let wrongAnswers = [];

  answerButtons.forEach(btn => {
    if (btn.dataset.answer !== q.correct) {
      wrongAnswers.push(btn);
    }
  });

  for (let i = 0; i < 2 && wrongAnswers.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * wrongAnswers.length);
    const btnToDisable = wrongAnswers[randomIndex];

    btnToDisable.disabled = true;
    btnToDisable.style.opacity = '0.3';
    btnToDisable.style.cursor = 'not-allowed';

    wrongAnswers.splice(randomIndex, 1);
  }

  lifelines.fiftyFifty = false;
  document.getElementById('fiftyFifty').classList.add('lifeline-used');
  document.getElementById('joker1').style.opacity = '0.3';
  document.getElementById('joker1').classList.add('joker-crossed');
}
function usePhoneAFriend() {
  if (!lifelines.phoneAFriend) return;

  // 📞 SOUND START
  const phoneSound = document.getElementById("phoneFriendSound");
  phoneSound.currentTime = 0;
  phoneSound.play();

  const t = translations[currentLanguage];
  document.getElementById('lifelineTitle').textContent = t.phoneTitle;
  document.getElementById('lifelineMessage').textContent = t.calling;
  document.getElementById('timerCircle').classList.remove('hidden');
  document.getElementById('audienceGraph').classList.add('hidden');
  document.getElementById('lifelineModal').classList.remove('hidden');

  let timeLeft = 25;
  document.getElementById('timerValue').textContent = timeLeft;

  phoneTimer = setInterval(() => {
    timeLeft--;
    document.getElementById('timerValue').textContent = timeLeft;

    // 🎯 KAD “PRIJATELJ JAVI”
    if (timeLeft === 21) {
      const q = selectedQuestions[currentQuestion];
      const rand = Math.random();

      let friendAnswer = "";
      let friendMessage = "";

      // 80% TAČNO
      if (rand < 0.80) {
        friendAnswer = q.correct;
        friendMessage = "Mislim da je tačan odgovor pod: " + friendAnswer;

      // 10% NE ZNA (HUMOR)
      } else if (rand < 0.90) {
        const jokes = [
          "Izvini batice, stvarno ne znam ovo pitanje.. puno sreće 🍀",
          "Brate ovo je preteško, ne bih da te slažem 😅",
          "Ovo nisam nikad čuo, žao mi je.. ",
		  "Birani korisnik je nedostupan. Ostavite poruku poslije zvučnog signala..",
		  "Ne znam stvarno ali ako ne znaš idi pod C, pa kud puklo da puklo.. "
        ];
        friendAnswer = q.correct;
        friendMessage = jokes[Math.floor(Math.random() * jokes.length)];

      // 5% POGRIJEŠI
      } else if (rand < 0.95) {
        const wrongOptions = ['A', 'B', 'C', 'D'].filter(a => a !== q.correct);
        friendAnswer = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        friendMessage = `🤔 Nisam siguran... ali mislim da je: ${friendAnswer} Nemoj me držati za riječ.. 😬`;

      // 5% “100% SIGURAN”
      } else {
        friendAnswer = q.correct;
        friendMessage = `100% sam siguran! Tačan odgovor je pod: ${friendAnswer}🔥`;
      }

      document.getElementById('lifelineMessage').textContent =
        `${t.friendSays} ${friendMessage}`;
    }

    // ⏱ STOP
    if (timeLeft <= 0) {
      clearInterval(phoneTimer);
      document.getElementById('timerCircle').classList.add('hidden');
      phoneSound.pause();
    }
  }, 1000);

  // 🚫 disable lifeline
  lifelines.phoneAFriend = false;
  document.getElementById('phoneAFriend').classList.add('lifeline-used');
  document.getElementById('joker2').style.opacity = '0.3';
  document.getElementById('joker2').classList.add('joker-crossed');
}

function updateMobileProgress() {
  const wrapper = document.getElementById("stepsWrapper");
  if (!wrapper) return;

  const milestones = [4, 9, 14]; // 5,10,15 (0-based)

  // prvi put kreiraj krugove
  if (wrapper.children.length === 0) {
    for (let i = 0; i < 15; i++) {
      const step = document.createElement("div");
      step.className = "step-circle";

      if (milestones.includes(i)) {
        step.classList.add("milestone");
      }

      step.dataset.index = i;
      wrapper.appendChild(step);
    }
  }

  // update stanja
  const steps = document.querySelectorAll(".step-circle");

  steps.forEach((step, i) => {
    step.classList.remove("active", "done");

    if (i < currentQuestion) {
      step.classList.add("done");
    }

    if (i === currentQuestion) {
      step.classList.add("active");
    }
  });
}
function useAskAudience() {
  if (!lifelines.askAudience) return;

  // 🎧 AUDIO
  const audio = document.getElementById("askAudienceSound");
  if (audio) {
    audio.currentTime = 0;
    audio.volume = 0.8;
    audio.play().catch(() => {});
  }

  const q = selectedQuestions[currentQuestion];
  const correct = q.correct;

  let percentages = { A: 0, B: 0, C: 0, D: 0 };

  // 🎯 tačan odgovor (realan, ali ne prejak)
  percentages[correct] = 35 + Math.random() * 28; // 35–63%

  let remaining = 100 - percentages[correct];

  const others = ['A', 'B', 'C', 'D'].filter(a => a !== correct);

  // 📊 “ljudska” raspodjela (ne savršena matematika)
  others.forEach((letter, index) => {
    let value = 0;

    if (index === 0) {
      value = Math.random() * remaining * 0.5;
    } else if (index === 1) {
      value = Math.random() * remaining * 0.3;
    } else {
      value = remaining;
    }

    percentages[letter] = value;
    remaining -= value;
  });

  // 🎲 cleanup (da nema 0 i glupih vrijednosti)
  Object.keys(percentages).forEach(k => {
    percentages[k] = Math.max(3, Math.round(percentages[k]));
  });

  // 🔧 normalize na 100%
  let sum = Object.values(percentages).reduce((a, b) => a + b, 0);

  Object.keys(percentages).forEach(k => {
    percentages[k] = Math.round((percentages[k] / sum) * 100);
  });

  showAudienceGraph(percentages);

  lifelines.askAudience = false;
  document.getElementById('askAudience').classList.add('lifeline-used');
  document.getElementById('joker3').style.opacity = '0.3';
  document.getElementById('joker3').classList.add('joker-crossed');
}
function showAudienceGraph(percentages) {
  document.getElementById('lifelineTitle').textContent =
    translations[currentLanguage].audienceTitle;

  document.getElementById('lifelineMessage').textContent = '';
  document.getElementById('timerCircle').classList.add('hidden');
  document.getElementById('audienceGraph').classList.remove('hidden');
  document.getElementById('lifelineModal').classList.remove('hidden');

  setTimeout(() => {
    Object.keys(percentages).forEach((letter, i) => {
      const bar = document.getElementById(`bar${letter}`);
      const percent = document.getElementById(`percent${letter}`);
      const target = percentages[letter];

      let current = 0;

      setTimeout(() => {
        const interval = setInterval(() => {
          current++;

          bar.style.height = current + "%";
          percent.textContent = current + "%";

          if (current >= target) {
            clearInterval(interval);
          }
        }, 12);
      }, i * 180);
    });
  }, 250);
}

    function resetLifelines() {
      document.querySelectorAll('.lifeline-icon').forEach(btn => {
        btn.classList.remove('lifeline-used');
      });
      document.getElementById('joker1').style.opacity = '1';
      document.getElementById('joker2').style.opacity = '1';
      document.getElementById('joker3').style.opacity = '1';
      document.getElementById('joker1').classList.remove('joker-crossed');
      document.getElementById('joker2').classList.remove('joker-crossed');
      document.getElementById('joker3').classList.remove('joker-crossed');
    }

    document.querySelectorAll('.answer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!btn.disabled) {
          checkAnswer(btn.dataset.answer);
        }
      });
    });

    document.getElementById('fiftyFifty').addEventListener('click', useFiftyFifty);
    document.getElementById('phoneAFriend').addEventListener('click', usePhoneAFriend);
    document.getElementById('askAudience').addEventListener('click', useAskAudience);
    document.getElementById('playAgain').addEventListener('click', () => {
      document.getElementById('languageScreen').classList.remove('hidden');
      document.getElementById('gameScreen').classList.add('hidden');
      document.getElementById('explanationSection').classList.add('hidden');
      wrongQuestionData = null;
    });
    
    document.getElementById('shareScore').addEventListener('click', () => {
      const score = currentQuestion;
      const maxScore = 15;
      const percentage = Math.round((score / maxScore) * 100);
      const shareText = currentLanguage === 'bs' 
        ? `Upravo sam postigao ${score}/15 pitanja u Math Millionaire kvizu! 🎯 ${percentage}% tačnosti! Možeš li bolje? 🏆`
        : `I just scored ${score}/15 questions in Math Millionaire quiz! 🎯 ${percentage}% accuracy! Can you beat it? 🏆`;
      
      // Try to use Web Share API
      if (navigator.share) {
        navigator.share({
          title: 'Math Millionaire Quiz',
          text: shareText
        }).catch(() => {});
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
          const btn = document.getElementById('shareScore');
          const originalText = btn.innerHTML;
          btn.innerHTML = currentLanguage === 'bs' ? '    Kopirano!' : '✅ Copied!';
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 2000);
        }).catch(() => {});
      }
    });
    
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Load theme and stats on page load
    loadTheme();
    loadStats();
    document.getElementById('closeLifeline').addEventListener('click', () => {
      if (phoneTimer) {
        clearInterval(phoneTimer);
        phoneTimer = null;
      }
      document.getElementById('lifelineModal').classList.add('hidden');
      document.getElementById('timerCircle').classList.add('hidden');
      ['A', 'B', 'C', 'D'].forEach(letter => {
        document.getElementById(`bar${letter}`).style.height = '0%';
        document.getElementById(`percent${letter}`).textContent = '0%';
      });
    });

function hideIntro() {
  const intro = document.getElementById("introScreen");

  if (!intro) return;

  setTimeout(() => {
    intro.style.transition = "opacity 0.8s ease";
    intro.style.opacity = "0";

    setTimeout(() => intro.remove(), 800);
  }, 4200);
}

window.addEventListener("load", hideIntro);

    // Music Controls
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const volumeSlider = document.getElementById('volumeSlider');
    let isPlaying = true;
    let sliderTimeout;

    // Set initial volume
    music.volume = 0.5;

    // Show/hide slider when clicking music icon
    musicToggle.addEventListener('click', () => {
      if (volumeSlider.classList.contains('hidden')) {
        // Show slider
        volumeSlider.classList.remove('hidden');
        
        // Auto-hide after 3 seconds
        clearTimeout(sliderTimeout);
        sliderTimeout = setTimeout(() => {
          volumeSlider.classList.add('hidden');
        }, 3000);
      } else {
        // Toggle play/pause if slider is visible
        if (isPlaying) {
          music.pause();
          musicToggle.textContent = '🔇';
          isPlaying = false;
        } else {
          music.play();
          const volume = volumeSlider.value / 100;
          if (volume === 0) {
            musicToggle.textContent = '🔇';
          } else if (volume < 0.5) {
            musicToggle.textContent = '🔉';
          } else {
            musicToggle.textContent = '🔊';
          }
          isPlaying = true;
        }
      }
    });

    // Volume slider control
    volumeSlider.addEventListener('input', (e) => {
      const volume = e.target.value / 100;
      music.volume = volume;
      
      // Update icon based on volume
      if (volume === 0) {
        musicToggle.textContent = '🔇';
      } else if (volume < 0.5) {
        musicToggle.textContent = '🔉';
      } else {
        musicToggle.textContent = '🔊';
      }
      
      // Reset auto-hide timer
      clearTimeout(sliderTimeout);
      sliderTimeout = setTimeout(() => {
        volumeSlider.classList.add('hidden');
		clearTimeout(sliderTimeout);
      }, 3000);
    });

    // Handle autoplay restrictions - try to play when user interacts
    document.addEventListener('click', () => {
      if (music.paused && isPlaying) {
        music.play().catch(() => {
          // Autoplay was prevented
          musicToggle.textContent = '🔇';
          isPlaying = false;
        });
      }
    }, { once: true });

    // Admin Panel Functions
    function showAdminLogin() {
      document.getElementById('adminLoginModal').classList.remove('hidden');
      document.getElementById('loginError').classList.add('hidden');
      document.getElementById('adminUsername').value = '';
      document.getElementById('adminPassword').value = '';
    }

    function closeAdminLogin() {
      document.getElementById('adminLoginModal').classList.add('hidden');
    }

    function adminLogin() {
      const username = document.getElementById('adminUsername').value;
      const password = document.getElementById('adminPassword').value;
      
      if (username === 'admin' && password === 'root') {
        document.getElementById('adminLoginModal').classList.add('hidden');
        document.getElementById('languageScreen').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
        loadAdminQuestions();
      } else {
        document.getElementById('loginError').classList.remove('hidden');
      }
    }

    function logoutAdmin() {
      document.getElementById('adminPanel').classList.add('hidden');
      document.getElementById('languageScreen').classList.remove('hidden');
    }
 function setAdminLanguage(lang) {
      adminLanguage = lang;
      document.getElementById('adminLangBs').className = lang === 'bs' 
        ? 'bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-lg font-bold border-2 border-blue-400'
        : 'bg-gray-600 hover:bg-gray-500 px-8 py-3 rounded-lg font-bold border-2 border-gray-400';
      document.getElementById('adminLangEn').className = lang === 'en'
        ? 'bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-lg font-bold border-2 border-blue-400'
        : 'bg-gray-600 hover:bg-gray-500 px-8 py-3 rounded-lg font-bold border-2 border-gray-400';
      loadAdminQuestions();
    }

    function showCategory(category) {
      currentAdminCategory = category;
      document.querySelectorAll('.category-tab').forEach(btn => {
        btn.className = 'category-tab bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg font-bold border-2 border-purple-400';
      });
      event.target.className = 'category-tab bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg font-bold border-2 border-green-400';
      loadAdminQuestions();
    }

    function loadAdminQuestions() {
      const container = document.getElementById('questionsList');
      container.innerHTML = '';
      
      const category = questionBank[adminLanguage][currentAdminCategory];
      
      ['easy', 'hard', 'hardest'].forEach(difficulty => {
        const difficultyDiv = document.createElement('div');
        difficultyDiv.className = 'mb-6';
        
        const difficultyTitle = document.createElement('h3');
        difficultyTitle.className = 'text-2xl font-bold text-yellow-400 mb-3';
        difficultyTitle.textContent = `${difficulty.toUpperCase()} (${category[difficulty].length} questions)`;
        difficultyDiv.appendChild(difficultyTitle);
        
        category[difficulty].forEach((q, index) => {
          const questionCard = document.createElement('div');
          questionCard.className = 'bg-gray-800 bg-opacity-80 rounded-lg p-4 mb-3 border-2 border-gray-600 hover:border-blue-400 transition-all';
          
          questionCard.innerHTML = `
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <p class="text-white font-bold mb-2">${q.question}</p>
                <div class="grid grid-cols-2 gap-2 text-sm">
                  <span class="text-green-400">   ${q.correct}: ${q.answers[q.correct]}</span>
                  ${Object.keys(q.answers).filter(k => k !== q.correct).map(k => 
                    `<span class="text-gray-400">${k}: ${q.answers[k]}</span>`
                  ).join('')}
                </div>
              </div>
              <div class="flex gap-2 ml-4">
                <button onclick="editQuestion('${currentAdminCategory}', '${difficulty}', ${index})" class="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-sm font-bold">
                     Edit
                </button>
                <button onclick="deleteQuestion('${currentAdminCategory}', '${difficulty}', ${index})" class="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm font-bold">
                  🗑️ Delete
                </button>
              </div>
            </div>
          `;
          
          difficultyDiv.appendChild(questionCard);
        });
        
        container.appendChild(difficultyDiv);
  });
    }

    function showAddQuestion() {
      editingQuestionIndex = null;
      document.getElementById('editModalTitle').textContent = 'Add New Question';
      document.getElementById('editCategory').value = currentAdminCategory;
      document.getElementById('editDifficulty').value = 'easy';
      document.getElementById('editQuestion').value = '';
      document.getElementById('editAnswerA').value = '';
      document.getElementById('editAnswerB').value = '';
      document.getElementById('editAnswerC').value = '';
      document.getElementById('editAnswerD').value = '';
      document.getElementById('editCorrect').value = 'A';
      document.getElementById('editQuestionModal').classList.remove('hidden');
    }

    function editQuestion(category, difficulty, index) {
      editingQuestionIndex = { category, difficulty, index };
      const q = questionBank[adminLanguage][category][difficulty][index];
      
      document.getElementById('editModalTitle').textContent = 'Edit Question';
      document.getElementById('editCategory').value = category;
      document.getElementById('editDifficulty').value = difficulty;
      document.getElementById('editQuestion').value = q.question;
      document.getElementById('editAnswerA').value = q.answers.A;
      document.getElementById('editAnswerB').value = q.answers.B;
      document.getElementById('editAnswerC').value = q.answers.C;
      document.getElementById('editAnswerD').value = q.answers.D;
      document.getElementById('editCorrect').value = q.correct;
      document.getElementById('editQuestionModal').classList.remove('hidden');
    }

    function deleteQuestion(category, difficulty, index) {
      if (confirm('Are you sure you want to delete this question?')) {
        questionBank[adminLanguage][category][difficulty].splice(index, 1);
        loadAdminQuestions();
      }
    }




    function saveQuestion() {
      const category = document.getElementById('editCategory').value;
      const difficulty = document.getElementById('editDifficulty').value;
      const question = document.getElementById('editQuestion').value;
      const answerA = document.getElementById('editAnswerA').value;
      const answerB = document.getElementById('editAnswerB').value;
      const answerC = document.getElementById('editAnswerC').value;
      const answerD = document.getElementById('editAnswerD').value;
      const correct = document.getElementById('editCorrect').value;
      
      if (!question || !answerA || !answerB || !answerC || !answerD) {
        alert('Please fill in all fields!');
        return;
      }
      
      const newQuestion = {
        question: question,
        answers: {
          A: answerA,
          B: answerB,
          C: answerC,
          D: answerD
        },
        correct: correct
      };
      
      if (editingQuestionIndex) {
        // Update existing question
        questionBank[adminLanguage][editingQuestionIndex.category][editingQuestionIndex.difficulty][editingQuestionIndex.index] = newQuestion;
      } else {
        // Add new question
        if (!questionBank[adminLanguage][category]) {
          questionBank[adminLanguage][category] = { easy: [], hard: [], hardest: [] };
        }
        if (!questionBank[adminLanguage][category][difficulty]) {
          questionBank[adminLanguage][category][difficulty] = [];
        }
        questionBank[adminLanguage][category][difficulty].push(newQuestion);
      }
      
      closeEditModal();
      currentAdminCategory = category;
      loadAdminQuestions();
      
      // Update category tab selection
      document.querySelectorAll('.category-tab').forEach(btn => {
        if (btn.textContent.toLowerCase().includes(category.toLowerCase())) {
          btn.className = 'category-tab bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg font-bold border-2 border-green-400';
        } else {
          btn.className = 'category-tab bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg font-bold border-2 border-purple-400';
        }
      });
    }

    function closeEditModal() {
      document.getElementById('editQuestionModal').classList.add('hidden');
    }

    // Allow Enter key to submit login
    document.getElementById('adminPassword').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        adminLogin();
      }
    });
    
    // Confirm return to home
    function confirmReturnHome() {
      const message = currentLanguage === 'bs' 
        ? 'Da li ste sigurni da želite napustiti igru? Napredak neće biti sačuvan.'
        : 'Are you sure you want to leave the game? Progress will not be saved.';
      
 // Create custom confirmation modal
      const confirmModal = document.createElement('div');
      confirmModal.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-6 z-50';
      confirmModal.innerHTML = `
        <div class="bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg p-8 max-w-md w-full border-4 border-yellow-500">
          <h2 class="text-2xl font-bold text-yellow-400 mb-4 text-center">    ${currentLanguage === 'bs' ? 'Napusti Igru?' : 'Leave Game?'}</h2>
          <p class="text-white text-center mb-6">${message}</p>
          <div class="flex gap-4">
            <button onclick="returnToHome()" class="flex-1 bg-red-600 hover:bg-red-500 px-6 py-3 rounded-lg font-bold border-2 border-red-400">
              ${currentLanguage === 'bs' ? 'Da, Napusti' : 'Yes, Leave'}
            </button>
            <button onclick="closeConfirmModal()" class="flex-1 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-lg font-bold border-2 border-green-400">
              ${currentLanguage === 'bs' ? 'Ne, Nastavi' : 'No, Continue'}
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(confirmModal);
      window.currentConfirmModal = confirmModal;
    }
    
    function closeConfirmModal() {
      if (window.currentConfirmModal) {
        window.currentConfirmModal.remove();
        window.currentConfirmModal = null;
      }
    }
    
    function returnToHome() {
      closeConfirmModal();
      document.getElementById('gameScreen').classList.add('hidden');
      document.getElementById('languageScreen').classList.remove('hidden');
      // Reset game state
      currentQuestion = 0;
      lifelines = {
        fiftyFifty: true,
        phoneAFriend: true,
        askAudience: true
      };
    }


const baseViewers = 50;
const MAX_VIEWERS = 10000;

function updateViewers() {
  const el = document.getElementById("viewers");

  const progressionBoost = currentQuestion * 60; // jači rast po pitanju
  const fluctuation = (Math.random() - 0.5) * 80; // real TV varijacija

  viewers += progressionBoost * 0.05 + fluctuation;

  // granice
  if (viewers < 20) viewers = 20;
  if (viewers > MAX_VIEWERS) viewers = MAX_VIEWERS;

  el.textContent = Math.floor(viewers).toLocaleString();

  setTimeout(updateViewers, 1500 + Math.random() * 1000);
}

// start
viewers = baseViewers;
updateViewers();
