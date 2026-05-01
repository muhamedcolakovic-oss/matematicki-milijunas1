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
      if (saved) {
        currentTheme = saved;
        if (currentTheme === 'light') {
          document.body.classList.add('light-mode');
          document.getElementById('themeToggle').textContent = '☀️';
        }
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
/* 1., 6. i 11. pitanje */
history: {
  easy: [
    { question: "Easy. Ako je danas petak, koji je dan za 11 dana?", answers: { A: "Utorak", B: "Ponedjeljak", C: "Subota", D: "Nedjelja" }, correct: "A" },
    { question: "Easy. Koliko je 15% od 200?", answers: { A: "25", B: "35", C: "30", D: "40" }, correct: "C" },
	{ question: "Easy. Koliko je 50% od 60?", answers: { A: "20", B: "25", C: "30", D: "35" }, correct: "C" },
    { question: "Easy. Koliko je 25% od 80?", answers: { A: "10", B: "20", C: "25", D: "30" }, correct: "B" },
    { question: "Easy. Koliko je 2³ + 1?", answers: { A: "7", B: "8", C: "9", D: "10" }, correct: "C" },
	{ question: "Hard. Ako je a = 3 i b = 4, koliko je a² + b²?", answers: { A: "12", B: "20", C: "25", D: "7" }, correct: "C" },
    { question: "Easy. Koliko je 30% od 200?", answers: { A: "70", B: "60", C: "50", D: "80" }, correct: "B" },
    { question: "Easy. Koliko je 40% od 500?", answers: { A: "150", B: "250", C: "200", D: "300" }, correct: "C" },
    { question: "Easy. Koji je sljedeći broj u nizu 1, 1, 2, 3, 5, 8, ?", answers: { A: "11", B: "13", C: "12", D: "15" }, correct: "B" },
    { question: "Easy. Kojim slovom označavamo skup prirodnih brojeva?", answers: { A: "Z", B: "N", C: "R", D: "Q" }, correct: "B" },
    { question: "Easy. Kojim slovom označavamo skup cijelih brojeva?", answers: { A: "N", B: "Q", C: "Z", D: "R" }, correct: "C" },
    { question: "Easy. Kojim slovom označavamo skup racionalnih brojeva?", answers: { A: "Q", B: "R", C: "Z", D: "N" }, correct: "A" },
    { question: "Easy. Kojim slovom označavamo skup kompleksnih brojeva?", answers: { A: "R", B: "C", C: "Z", D: "Q" }, correct: "B" },
    { question: "Easy. Kojim slovom označavamo skup realnih brojeva?", answers: { A: "Q", B: "Z", C: "R", D: "C" }, correct: "C" },
    { question: "Easy. Koliki je zbir prvih pet prostih brojeva?", answers: { A: "26", B: "28", C: "30", D: "32" }, correct: "B" },
    { question: "Easy. Pravougli trougao ima katete 12 i 5. Kolika je hipotenuza?", answers: { A: "12", B: "13", C: "17", D: "15" }, correct: "B" },
    { question: "Easy. Pravougli trougao ima katete 8 i 6. Kolika je hipotenuza?", answers: { A: "10", B: "12", C: "14", D: "9" }, correct: "A" },
    { question: "Easy. Pravougli trougao ima katete 3 i 4. Kolika je hipotenuza?", answers: { A: "6", B: "5", C: "7", D: "4" }, correct: "B" },
    { question: "Easy. Koliko sati ima u 4 dana?", answers: { A: "72", B: "96", C: "88", D: "100" }, correct: "B" },
    { question: "Easy. Koliko sati ima u 6 dana?", answers: { A: "120", B: "132", C: "144", D: "150" }, correct: "C" },
    { question: "Easy. Koliko sati ima u 2 sedmice?", answers: { A: "336", B: "320", C: "360", D: "300" }, correct: "A" },
    { question: "Easy. S kojim brojem se ne može dijeliti?", answers: { A: "-1", B: "0", C: "2", D: "10000" }, correct: "B" },
    { question: "Easy. Ako je a = -2, koliko je a na treću?", answers: { A: "-6", B: "6", C: "-8", D: "8" }, correct: "C" },
    { question: "Easy. Koliko je 30% od 400?", answers: { A: "100", B: "140", C: "120", D: "160" }, correct: "C" },
    { question: "Easy. Koliko dijagonala ima šestougao?", answers: { A: "6", B: "9", C: "12", D: "15" }, correct: "B" },
    { question: "Easy. Koliko dijagonala ima sedmougao?", answers: { A: "9", B: "14", C: "12", D: "16" }, correct: "B" },
    { question: "Easy. Koliko dijagonala ima osmougao?", answers: { A: "16", B: "18", C: "20", D: "14" }, correct: "C" },
    { question: "Easy. Koja figura nastaje okretanjem poluprečnika oko centra?", answers: { A: "Trougao", B: "Krug", C: "Kvadrat", D: "Pravougaonik" }, correct: "B" },
    { question: "Easy. Šta predstavlja broj π u geometriji?", answers: { A: "Omjer prečnika i poluprečnika", B: "Omjer obima i prečnika kruga", C: "Razliku površina krugova", D: "Kvadrat poluprečnika" }, correct: "B" }
   ],
hard: [
    { question: "Normal. Koliko je 2^30 približno?", answers: { A: "1.07×10^9", B: "1.07×10^8", C: "1.07×10^10", D: "1.07×10^7" }, correct: "A" },
	{ question: "Normal. Koliko je 75% od 360?", answers: { A: "260", B: "270", C: "280", D: "300" }, correct: "B" },
    { question: "Normal. Koliko je 1 + 2 + 3 + ... + 20?", answers: { A: "200", B: "210", C: "220", D: "190" }, correct: "B" },
    { question: "Normal. Ako je danas srijeda, koji je dan za 365 dana?", answers: { A: "Srijeda", B: "Četvrtak", C: "Utorak", D: "Petak" }, correct: "B" },
    { question: "Normal. Ko je uveo simbol za beskonačno?", answers: { A: "Isaac Newton", B: "Leonhard Euler", C: "John Wallis", D: "René Descartes" }, correct: "C" },
    { question: "Normal. Ko je prvi upotrijebio decimalni zapis u matematici?", answers: { A: "Fibonacci", B: "Al-Khwarizmi", C: "Simon Stevin", D: "Descartes" }, correct: "C" },
    { question: "Normal. Koji je broj Ludolph van Ceulen izračunavao do 35 decimala?", answers: {  A: "e", B: "π", C: "φ", D: "√2"  }, correct: "B" },
    { question: "Normal. Kako je Carl Friedrich Gauss bio poznat po nadimku?", answers: { A: "Kralj matematike", B: "Otac algebre", C: "Princ matematike", D: "Genije brojeva" }, correct: "C" },
    { question: "Normal. Ko je izumio logaritme?", answers: { A: "Gottfried Leibniz", B: "Isaac Newton", C: "Leonhard Euler", D: "John Napier" }, correct: "D" },
    { question: "Normal. Ko je prvi koristio negativne brojeve u matematici?", answers: { A: "Kinezi", B: "Grci", C: "Rimljani", D: "Egipćani" }, correct: "A" },
    { question: "Normal. Ko je formalno definisao funkciju?", answers: { A: "Descartes", B: "Fermat", C: "Euler", D: "Leibniz" }, correct: "C" },
    { question: "Normal. Ko je poznat kao 'otac geometrije'?", answers: { A: "Pitagora", B: "Euklid", C: "Arhimed", D: "Platon" }, correct: "B", explanation: "Euklid iz Aleksandrije (oko 300. p.n.e.) napisao je 'Elemente', najuticajniju matematičku knjigu svih vremena koja sistematizuje geometriju.", commonMistake: "Ljudi često misle na Pitagoru jer je poznatiji, ali Pitagora je 'otac trigonometrije', ne geometrije." },
    { question: "Normal. U kojoj državi je nastao arapski brojčani sistem?", answers: { A: "Arabija", B: "Egipat", C: "Indija", D: "Kina" }, correct: "C" },
    { question: "Normal. Koji simbol se koristi za beskonačnost?", answers: { A: "α", B: "∞", C: "Ω", D: "π" }, correct: "B" },
	{ question: "Normal. Koliko je 1 + 3 + 5 + 7 + ... + 19?", answers: { A: "81", B: "100", C: "121", D: "90" }, correct: "B" },
    { question: "Normal. Koliko je 3⁴?", answers: { A: "64", B: "72", C: "81", D: "90" }, correct: "C" },
    { question: "Normal. U kojem vijeku je nastala algebra?", answers: { A: "5. vijek", B: "7. vijek", C: "9. vijek", D: "11. vijek" }, correct: "C" },
    { question: "Normal. Kako se zove funkcija koja je jednaka svojoj inverznoj funkciji?", answers: { A: "Eksponencijalna funkcija", B: "Identitet funkcija", C: "Kvadratna funkcija", D: "Recipročna funkcija" }, correct: "B" },
    { question: "Normal. Koliko je 3^10?", answers: { A: "59049", B: "59000", C: "60000", D: "50000" }, correct: "A" },
    { question: "Normal. Kako se zove matematički dokaz koji polazi od pretpostavke da je tvrdnja netačna?", answers: { A: "Direktni dokaz", B: "Indukcija", C: "Dokaz kontradikcijom", D: "Konstruktivni dokaz" }, correct: "C" },
    { question: "Normal. Da li ima više racionalnih ili iracionalnih brojeva?", answers: { A: "Racionalnih", B: "Iracionalnih", C: "Jednako", D: "Ne može se odrediti" }, correct: "B" },
    { question: "Normal. Koliko je 5^6?", answers: { A: "15625", B: "15000", C: "16000", D: "17000" }, correct: "A" },
    { question: "Normal. Koliko je 7^3?", answers: { A: "343", B: "333", C: "353", D: "363" }, correct: "A" },
    { question: "Normal. Koliko je 11^2?", answers: { A: "121", B: "111", C: "131", D: "141" }, correct: "A" },
    { question: "Normal. Ko je prvi formulirao aksiome geometrije u modernom obliku?", answers: { A: "Hilbert", B: "Euclid", C: "Pascal", D: "Gauss" }, correct: "A" },
    { question: "Normal. Ko je prvi dokazao fundamentalnu teoremu algebre?", answers: { A: "Gauss", B: "Euler", C: "Descartes", D: "Cauchy" }, correct: "A" },
    { question: "Normal. Kako se zovu brojevi koji se ne mogu zapisati kao razlomak?", answers: { A: "Racionalni", B: "Prirodni", C: "Iracionalni", D: "Cijeli" }, correct: "C" }
  ],
  hardest: [
    { question: "Hard. Ko je dokazao nekompletnost formalnih sistema (Gödelove teoreme)?", answers: { A: "Kurt Gödel", B: "Alan Turing", C: "David Hilbert", D: "John von Neumann" }, correct: "A" },
    { question: "Hard. Ko je uveo pojam 'grupa' u algebri?", answers: { A: "Galois", B: "Noether", C: "Lagrange", D: "Cayley" }, correct: "A" },
	{ question: "Hard. Koliko je 50² − 49²?", answers: { A: "1", B: "50", C: "99", D: "100" }, correct: "C" },
    { question: "Hard. Koliko je 0.25 × 0.25?", answers: { A: "0.5", B: "0.125", C: "0.0625", D: "0.25" }, correct: "C" },
	{ question: "Hard. Koliko m² ima 2.5 km²?", answers: { A: "250 000", B: "2 500 000", C: "25 000 000", D: "250 000 000" }, correct: "B" },
    { question: "Hard. Ko je uveo notaciju za integral ∫?", answers: { A: "Leibniz", B: "Newton", C: "Euler", D: "Riemann" }, correct: "A" },
    { question: "Hard. Ko je prvi upotrijebio znak '=' za jednakost?", answers: { A: "Descartes", B: "Robert Recorde", C: "Leibniz", D: "Newton" }, correct: "B" },
    { question: "Hard. Kada je objavljena Euklidova knjiga 'Elementi'?", answers: { A: "500. p.n.e.", B: "300. p.n.e.", C: "100. p.n.e.", D: "100. n.e." }, correct: "B" },
    { question: "Hard. Koliko rješenja ima jednačina x^2 = -1 u realnim brojevima?", answers: { A: "2", B: "1", C: "0", D: "Beskonačno" }, correct: "C" },
    { question: "Hard. Ko je riješio Poincareovu hipotezu?", answers: { A: "Andrew Wiles", B: "Terence Tao", C: "Grigori Perelman", D: "John Nash" }, correct: "C" },
    { question: "Hard. U kojoj godini je Emmy Noether objavila svoju čuvenu teoremu?", answers: { A: "1905", B: "1915", C: "1918", D: "1925" }, correct: "C" },
    { question: "Hard. Ko je uveo koncept matematičke rigoroznosti u analizi (ε-δ definicija limita)?", answers: { A: "Cauchy", B: "Weierstrass", C: "Riemann", D: "Bolzano" }, correct: "B" },
    { question: "Hard. Ko je prvi formalno definisao kontinuum u realnim brojevima?", answers: { A: "Cantor", B: "Dedekind", C: "Weierstrass", D: "Hilbert" }, correct: "B" },
    { question: "Hard. Ko je uveo aksiomatski pristup geometriji u 19. vijeku?", answers: { A: "Hilbert", B: "Euclid", C: "Bolyai", D: "Lobachevsky" }, correct: "A" }
  ]
},


/* 2., 7. i 12. pitanje */
geography: {
  easy: [
    { question: "Easy. Koji oblik ima 10 strana?", answers: { A: "Oktagon", B: "Dekagon", C: "Hendekagon", D: "Heksagon" }, correct: "B" },
    { question: "Easy. Koliko je 2 na petu?", answers: { A: "32", B: "16", C: "25", D: "64" }, correct: "A" },
    { question: "Easy. Koji kvadrat je najbliži broju 1000?", answers: { A: "30²", B: "32²", C: "31²", D: "33²" }, correct: "B" },
    { question: "Easy. Kako se zove razlomak kod kojeg je brojnik veći od nazivnika?", answers: { A: "Nepotpuni razlomak", B: "Mješoviti broj", C: "Nepopravljeni razlomak", D: "Nepravilan razlomak" }, correct: "D" },
    { question: "Easy. Nastavni niz: 2, 6, 12, 20, 30, ... Koji je sljedeći član?", answers: { A: "36", B: "40", C: "42", D: "56" }, correct: "C" },
    { question: "Easy. Rene Dekart je poznat po svojoj slavnoj izreci:", answers: { A: "'Mislim, dakle postojim'", B: "'Znanje je moć'", C: "'Eureka!'", D: "'Sve je relativno'" }, correct: "A" },
    { question: "Easy. Kako se zove oblik sa 8 strana?", answers: { A: "Heksagon", B: "Oktagon", C: "Dekagon", D: "Tetraedr" }, correct: "B" },
    { question: "Easy. Kako se zove čuveni paradoks sa beskonačnim koracima gdje Ahil ne može sustići kornjaču?", answers: { A: "Paradox smrti", B: "Paradox Zena", C: "Simpsonov paradoks", D: "Galilejev paradoks" }, correct: "B" },
    { question: "Easy. Koliki je kubni korijen iz 27?", answers: { A: "3", B: "9", C: "27", D: "6" }, correct: "A" },
    { question: "Easy. U kojoj zemlji je rođen matematičar Gauss?", answers: { A: "Njemačka", B: "Švicarska", C: "Austrija", D: "Francuska" }, correct: "A" },
    { question: "Easy. U kojoj zemlji je rođen matematičar Fermat?", answers: { A: "Italija", B: "Španija", C: "Francuska", D: "Engleska" }, correct: "C" },
    { question: "Easy. U kojem gradu je rođen matematičar Pascal?", answers: { A: "Pariz", B: " Clermont-Ferrand", C: "Marseille", D: "Nice" }, correct: "B" },
    { question: "Easy. U kojoj zemlji je rođen matematičar Newton?", answers: { A: "Škotska", B: "Engleska", C: "Irska", D: "Wales" }, correct: "B" },
{ question: "Easy. Koji je rimski znak za broj 50?", answers: { A: "L", B: "C", C: "V", D: "X" }, correct: "A" },
    { question: "Easy. Koji je rimski znak za broj 100?", answers: { A: "D", B: "L", C: "C", D: "X" }, correct: "C" },
    { question: "Easy. Koji je rimski znak za broj 1000?", answers: { A: "M", B: "D", C: "C", D: "X" }, correct: "A" },
    { question: "Easy. Koji je rimski znak za broj 10?", answers: { A: "V", B: "X", C: "L", D: "I" }, correct: "B" },
    { question: "Easy. Koji je rimski znak za broj 500?", answers: { A: "M", B: "D", C: "C", D: "L" }, correct: "B" },
    { question: "Easy. Koje je četvrto slovo grčkog alfabeta?", answers: { A: "Gamma", B: "Delta", C: "Beta", D: "Epsilon" }, correct: "B" },
    { question: "Easy. Koje je treće slovo grčkog alfabeta?", answers: { A: "Beta", B: "Delta", C: "Gamma", D: "Alpha" }, correct: "C" },
    { question: "Easy. Koje slovo grčkog alfabeta predstavlja broj π?", answers: { A: "Pi", B: "Phi", C: "Psi", D: "Omega" }, correct: "A" },
    { question: "Easy. Koje je posljednje slovo grčkog alfabeta?", answers: { A: "Sigma", B: "Omega", C: "Psi", D: "Theta" }, correct: "B" }
  ],
  hard: [
    { question: "Normal. U kojem gradu je osnovan Institut Clay Mathematics?", answers: { A: "New York", B: "Cambridge", C: "San Francisco", D: "Seattle" }, correct: "B" },
    { question: "Normal. Gdje se nalazi 'Eulerova soba' u čast Leonharda Eulera?", answers: { A: "Bern", B: "Zürich", C: "Basel", D: "Berlin" }, correct: "C" },
    { question: "Normal. U kojoj zemlji se nalazi najveća matematička biblioteka (Bibliothèque de mathématiques)?", answers: { A: "Francuska", B: "Njemačka", C: "SAD", D: "Italija" }, correct: "A" },
    { question: "Normal. Gdje se nalazi najveći matematički muzej na svijetu (Museum of Mathematics)?", answers: { A: "New York", B: "London", C: "Berlin", D: "Tokyo" }, correct: "A" },
    { question: "Normal. U kojem gradu se nalazi 'Københavns Universitet' gdje je radio Niels Bohr?", answers: { A: "Stockholm", B: "Kopenhagen", C: "Oslo", D: "Helsinki" }, correct: "B" },
    { question: "Normal. Koja je prva civilizacija razvila metodu rješavanja kvadratnih jednačina?", answers: { A: "Egipćani", B: "Babilonci", C: "Grci", D: "Kinezi" }, correct: "B" },
    { question: "Normal. U kojem gradu se nalazi čuveni Most matematike?", answers: { A: "London", B: "Pariz", C: "Cambridge", D: "Oxford" }, correct: "C" },
    { question: "Normal. U kojoj zemlji je rođen Pitagora?", answers: { A: "Grčka", B: "Italija", C: "Turska", D: "Egipat" }, correct: "A" },
    { question: "Normal. Gdje se nalazi Institut za napredne studije gdje je radio Einstein?", answers: { A: "Boston", B: "Princeton", C: "Cambridge", D: "New York" }, correct: "B" },
    { question: "Normal. U kojem gradu se nalazi Fields Institut za matematiku?", answers: { A: "Vancouver", B: "Montreal", C: "Toronto", D: "Ottawa" }, correct: "C" },
    { question: "Normal. Gdje je rođen matematičar Leonhard Euler?", answers: { A: "Njemačka", B: "Švicarska", C: "Austrija", D: "Holandija" }, correct: "B" },
    { question: "Normal. U kojoj zemlji se nalazi čuvena Library of Alexandria, poznata po matematičkoj tradiciji?", answers: { A: "Egipat", B: "Grčka", C: "Italija", D: "Francuska" }, correct: "A" },
    { question: "Normal. U kojem gradu je osnovan Institut za matematičke nauke (IMS)?", answers: { A: "Beijing", B: "New York", C: "Singapore", D: "Paris" }, correct: "C" },
    { question: "Normal. Gdje se nalazi CERN, poznat po matematičkim i fizičkim istraživanjima?", answers: { A: "Švicarska", B: "Francuska", C: "Njemačka", D: "Italija" }, correct: "A" },
    { question: "Normal. U kojem gradu se nalazi MIT, poznat po matematici i tehnologiji?", answers: { A: "Boston", B: "Cambridge, Massachusetts", C: "San Francisco", D: "Seattle" }, correct: "B" },
    { question: "Normal. Koja evropska država je dom velikom broju matematičkih muzeja i instituta, uključujući CERN?", answers: { A: "Švicarska", B: "Francuska", C: "Njemačka", D: "Italija" }, correct: "A" },
    { question: "Normal. Koji grad u Italiji je bio dom Fibonacci-a, poznatog po Fibonaccijevom nizu?", answers: { A: "Pisa", B: "Florencija", C: "Rim", D: "Milano" }, correct: "A" },
    { question: "Normal. Koja država je rodno mjesto Renea Descartesa, poznatog po analitičkoj geometriji?", answers: { A: "Belgija", B: "Francuska", C: "Švicarska", D: "Holandija" }, correct: "B" },
    { question: "Normal. U kojem evropskom gradu se nalazi čuveni Institut Henri Poincaré, poznat po matematičkoj fizici i teoriji haosa?", answers: { A: "Pariz", B: "Berlin", C: "London", D: "Madrid" }, correct: "A" },
    { question: "Normal. Koja azijska zemlja je doprinijela razvoju negativnih brojeva u ranoj matematici?", answers: { A: "Kina", B: "Indija", C: "Japan", D: "Arabija" }, correct: "A" },
    { question: "Normal. U kojoj zemlji je rođen matematičar Riemann?", answers: { A: "Francuska", B: "Austrija", C: "Švicarska", D: "Njemačka" }, correct: "D" },
    { question: "Normal. U kojoj zemlji je rođen matematičar Hilbert?", answers: { A: "Njemačka", B: "Poljska", C: "Češka", D: "Austrija" }, correct: "A" },
    { question: "Normal. U kojoj zemlji je rođen matematičar Kolmogorov?", answers: { A: "Rusija", B: "Ukrajina", C: "Poljska", D: "Bjelorusija" }, correct: "A" },
    { question: "Normal. U kojoj zemlji je rođen matematičar Noether?", answers: { A: "Njemačka", B: "Austrija", C: "Švicarska", D: "Italija" }, correct: "A" },
    { question: "Normal. U kojoj zemlji je rođen matematičar Cantor?", answers: { A: "Rusija", B: "Švedska", C: "Danska", D: "Nizozemska" }, correct: "A" },
    { question: "Normal. U kojem gradu se održava Međunarodni matematički kongres svake 4 godine?", answers: { A: "Uvijek u istom", B: "Rotira se po svijetu", C: "Samo u Evropi", D: "Samo u USA" }, correct: "B" },
    { question: "Normal. Gdje se nalazi Matematički institut Steklov?", answers: { A: "Sankt Peterburg", B: "Moskva", C: "Kijev", D: "Minsk" }, correct: "B" },
    { question: "Normal. U kojem gradu je Al-Khwarizmi pisao svoje radove o algebri?", answers: { A: "Bagdad", B: "Damask", C: "Kairo", D: "Medina" }, correct: "A" },
    { question: "Normal. Ko se smatra prvom poznatom matematičarkom?", answers: { A: "Ada Lovelace", B: "Emmy Noether", C: "Hypatia", D: "Marie Curie" }, correct: "C" },
    { question: "Normal. Kako se rimskim brojevima piše 2026?", answers: { A: "MMXXVI", B: "MMXVI", C: "MCMXXVI", D: "MMXXIV" }, correct: "A" },
    { question: "Normal. Kako se zove mnogougao sa 12 strana?", answers: { A: "Dekagon", B: "Dodekagon", C: "Hendekagon", D: "Oktagon" }, correct: "B" },
    { question: "Normal. Ko je prvi matematički opisao zlatni presjek?", answers: { A: "Euklid", B: "Newton", C: "Euler", D: "Gauss" }, correct: "A" }
  ],
  hardest: [
    { question: "Hard. U kojem gradu se nalazi Institut Max Planck za matematiku?", answers: { A: "Berlin", B: "Bonn", C: "Munich", D: "Hamburg" }, correct: "B" },
    { question: "Hard. Gdje se nalazi 'Mathematical Sciences Research Institute' (MSRI)?", answers: { A: "Berkeley", B: "Stanford", C: "Princeton", D: "Harvard" }, correct: "A" },
    { question: "Hard. U kojem gradu je osnovan 'Institut für Mathematik' u Göttingenu?", answers: { A: "Berlin", B: "Göttingen", C: "Munich", D: "Frankfurt" }, correct: "B" },
    { question: "Hard. U kojoj zemlji je rođen matematičar Grothendieck?", answers: { A: "Njemačka", B: "Francuska", C: "Švicarska", D: "Belgija" }, correct: "A" },
    { question: "Hard. U kojoj zemlji je rođen matematičar Gödel?", answers: { A: "Austrija", B: "Češka", C: "Njemačka", D: "Švicarska" }, correct: "B" },
    { question: "Hard. U kojoj zemlji je rođen matematičar Turing?", answers: { A: "Engleska", B: "Škotska", C: "Irska", D: "Wales" }, correct: "A" },
    { question: "Hard. U kojoj zemlji je rođen matematičar Perelman?", answers: { A: "Rusija", B: "Ukrajina", C: "Bjelorusija", D: "Litvanija" }, correct: "A" },
    { question: "Hard. U kojoj zemlji je rođen matematičar Wiles?", answers: { A: "Engleska", B: "SAD", C: "Kanada", D: "Australija" }, correct: "A" },
    { question: "Hard. U kom gradu se nalazi Institut Henri Poincaré?", answers: { A: "Lyon", B: "Marseille", C: "Pariz", D: "Toulouse" }, correct: "C" },
    { question: "Hard. Gdje je osnovana prva Akademija nauka (uključujući matematiku)?", answers: { A: "London", B: "Pariz", C: "Berlin", D: "Firence" }, correct: "D" },
    { question: "Hard. Gdje se nalazi Tata Institute of Fundamental Research (TIFR)", answers: { A: "Indija", B: "Japan", C: "Kina", D: "Koreja" }, correct: "A" },
    { question: "Hard. Gdje je održan prvi Internacionalni matematički kongres (1897)?", answers: { A: "Berlin", B: "Pariz", C: "Zürich", D: "London" }, correct: "C" }
  ]
},


/* 3., 8. i 13. pitanje */
funFacts: {
  easy: [
    { question: "Easy. Koji broj je jedini koji je i paran i prost?", answers: { A: "0", B: "1", C: "2", D: "3" }, correct: "C" },
  { question: "Easy. Koliko sati ima u jednoj sedmici?", answers: { A: "144", B: "160", C: "168", D: "176" }, correct: "C" },
    { question: "Easy. Na koliko načina se mogu posložiti 3 različita predmeta u red?", answers: { A: "3", B: "6", C: "9", D: "12" }, correct: "B" },
    { question: "Easy. Na koliko načina se mogu posložiti 4 različita predmeta u red?", answers: { A: "12", B: "16", C: "24", D: "32" }, correct: "C" },
    { question: "Easy. Kolika je površina kruga poluprečnika 7 cm?", answers: { A: "49π", B: "14π", C: "21π", D: "28π" }, correct: "A" },
    { question: "Easy. Kolika je površina kruga poluprečnika 8 cm?", answers: { A: "16π", B: "64π", C: "32π", D: "8π" }, correct: "B" },
    { question: "Easy. Kolika je površina kruga poluprečnika 10 cm?", answers: { A: "20π", B: "50π", C: "100π", D: "10π" }, correct: "C" },
    { question: "Easy. Koji matematički simbol koristimo za približno jednako?", answers: { A: "≈", B: "=", C: "≠", D: "≤" }, correct: "A" },
    { question: "Easy. Koji je najveći prosti broj manji od 100?", answers: { A: "97", B: "91", C: "89", D: "99" }, correct: "A" },
    { question: "Easy. Za šta se koristi Pascalov trougao?", answers: { A: "Geometriju kružnice", B: "Kombinatoriku i binomne koeficijente", C: "Rješavanje integrala", D: "Logaritamske funkcije" }, correct: "B" },
    { question: "Easy. Po kojem matematičaru je nazvana metoda dijeljenja polinoma?", answers: { A: "Newton", B: "Horner", C: "Gauss", D: "Lagrange" }, correct: "B" },
    { question: "Easy. Koliko stranica ima dodekaedar?", answers: { A: "10", B: "12", C: "14", D: "16" }, correct: "B" },
    { question: "Easy. Koliko je 1+1 u modularnoj aritmetici mod 2?", answers: { A: "0", B: "1", C: "2", D: "Nedefinisano" }, correct: "A" },
    { question: "Easy. Koja konstanta je približno 2.718?", answers: { A: "π", B: "e", C: "φ", D: "γ" }, correct: "B" },
    { question: "Easy. Koji je jedini broj koji se ne može napisati rimskim brojevima?", answers: { A: "0", B: "1", C: "1000", D: "Milion" }, correct: "A" },
    { question: "Easy. Koliko stranica ima kocka?", answers: { A: "4", B: "6", C: "8", D: "12" }, correct: "B" },
    { question: "Easy. Šta znači prefiks 'kilo'?", answers: { A: "100", B: "1000", C: "10000", D: "1000000" }, correct: "B" },
    { question: "Easy. Kako se zove trijada brojeva kod Pitagorine teoreme?", answers: { A: "Pitagorina trojka", B: "Euklid trojka", C: "Matematička trojka", D: "Geometrijska trojka" }, correct: "A" },
    { question: "Easy. Koliko stepeni ima pun krug?", answers: { A: "180°", B: "270°", C: "360°", D: "450°" }, correct: "C" },
    { question: "Easy. Koliko je 0! (faktorijel nule)?", answers: { A: "0", B: "1", C: "2", D: "Nedefinisano" }, correct: "B" },
    { question: "Easy. Koja je jedina cifra koja se ne pojavljuje u binarnom sistemu?", answers: { A: "0", B: "1", C: "2", D: "Nijedna" }, correct: "C" },
    { question: "Easy. Šta je najmanji prirodan broj koji nije prost, a nije ni složen?", answers: { A: "1", B: "2", C: "3", D: "4" }, correct: "A" },
    { question: "Easy. Koliki je zbir uglova u trouglu?", answers: { A: "360°", B: "90°", C: "270°", D: "180°" }, correct: "D" },
    { question: "Easy. Ako avion padne na granici dvije države, gdje se sahranjuju preživjeli?", answers: { A: "U prvoj državi", B: "U drugoj", C: "Na granici", D: "Ne sahranjuju se" }, correct: "D" },
    { question: "Easy. Koliko puta dnevno se poklope kazaljke na satu?", answers: { A: "12", B: "22", C: "24", D: "48" }, correct: "B" },
    { question: "Easy. Koji od ponuđenih brojeva zadovoljava uslov da je jednak zbiru svojih cifara pomnoženih sa 3?", answers: { A: "12", B: "18", C: "27", D: "36" }, correct: "C" },
    { question: "Easy. Ako se broj poveća za 20% pa smanji za 20%, rezultat je:", answers: { A: "Veći", B: "Manji", C: "Isti", D: "Zavisi" }, correct: "B" },
    { question: "Easy. Koliko dijagonala ima kvadrat?", answers: { A: "1", B: "2", C: "4", D: "6" }, correct: "B" },
    { question: "Easy. Ako baciš novčić 3 puta, koliko je mogućih ishoda?", answers: { A: "6", B: "8", C: "4", D: "3" }, correct: "B" },
    { question: "Easy. Koji je najmanji broj koji je djeljiv sa svim brojevima od 1 do 5?", answers: { A: "20", B: "60", C: "30", D: "120" }, correct: "B" },
    { question: "Easy. Koji broj je palindrom?", answers: { A: "123", B: "121", C: "132", D: "231" }, correct: "B" },
    { question: "Easy. Koliko je suma beskonačnog niza 1/2 + 1/4 + 1/8 + ...?", answers: { A: "1", B: "2", C: "∞", D: "1/2" }, correct: "A" },
    { question: "Easy. Ako imaš 5 različitih knjiga, koliko načina da ih poredaš?", answers: { A: "25", B: "120", C: "60", D: "100" }, correct: "B" },
    { question: "Easy. Koji broj je kvadrat?", answers: { A: "361", B: "256", C: "121", D: "Svi navedeni" }, correct: "D" },
    { question: "Easy. Ako je 5 mašina potrebno 5 minuta da naprave 5 proizvoda, koliko treba 100 mašina za 100 proizvoda?", answers: { A: "100 min", B: "5 min", C: "50 min", D: "1 min" }, correct: "B" }
  ],
  hard: [
    { question: "Normal. Koliko je 2^10 + 2^10?", answers: { A: "1024", B: "2048", C: "4096", D: "512" }, correct: "B" },
    { question: "Normal. Koliko je √2 na 2 decimale?", answers: { A: "1.41", B: "1.42", C: "1.43", D: "1.44" }, correct: "A" },
    { question: "Normal. Koji je najmanji broj koji je djeljiv sa 1 do 10?", answers: { A: "2520", B: "5040", C: "720", D: "360" }, correct: "A" },
    { question: "Normal. Koja je vrijednost 2^5?", answers: { A: "16", B: "32", C: "64", D: "128" }, correct: "B" },
    { question: "Normal. Koliko je maksimalan broj boja potreban za bojenje bilo koje mape?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "B" },
    { question: "Normal. Šta je Goldbachova hipoteza?", answers: { A: "Svaki parni broj je zbir 2 prosta", B: "Ima beskonačno prostih", C: "π je iracionalan", D: "e je transcendentan" }, correct: "A" },
    { question: "Normal. Koliko Platonovih tijela postoji?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "C" },
    { question: "Normal. Šta je zlatni presjek približno?", answers: { A: "1.414", B: "1.618", C: "2.718", D: "3.142" }, correct: "B" },
    { question: "Normal. Koliko je 0.5 u procentima?", answers: { A: "5%", B: "50%", C: "0.5%", D: "500%" }, correct: "B" },
    { question: "Normal. Koja je najkraća putanja između dvije tačke u ravni?", answers: { A: "Kriva", B: "Parabola", C: "Cik-cak", D: "Prava" }, correct: "D" },
    { question: "Normal. Koliko je 2^0?", answers: { A: "2", B: "0", C: "1", D: "Nedefinisano" }, correct: "C" },
    { question: "Normal. Koliko je 6666 × 6667?", answers: { A: "44442222", B: "33333333", C: "22224444", D: "55552222" }, correct: "A" },
    { question: "Normal. Koji broj je djeljiv sa 6?", answers: { A: "214", B: "222", C: "230", D: "212" }, correct: "B" },
    { question: "Normal. Šta je NZS u matematici?", answers: { A: "Najveći zajednički sadržilac", B: "Najmanji zajednički sadržalac", C: "Najmanji zajednički djelilac", D: "Neparni zajednički skup" }, correct: "B" },
    { question: "Normal. Šta je NZD u matematici?", answers: { A: "Najveći zajednički djelilac", B: "Najmanji zajednički djelilac", C: "Najmanji zajednički sadržalac", D: "Negativni zbir dijelitelja" }, correct: "A" },
    { question: "Normal. Zlatni rez je povezan sa kojim nizom?", answers: { A: "Lucasov niz", B: "Pitagorin niz", C: "Fibonaccijev niz", D: "Geometrijski niz" }, correct: "C" },
    { question: "Normal. Kako se najčešće prikazuje odnos skupova?", answers: { A: "Histogram", B: "Vennov dijagram", C: "Linijski graf", D: "Tabelarni prikaz" }, correct: "B" },
    { question: "Normal. Koji broj je djeljiv sa 3?", answers: { A: "124", B: "222", C: "121", D: "101" }, correct: "B" },
    { question: "Normal. Koji simbol označava presjek skupova?", answers: { A: "∪", B: "∩", C: "⊂", D: "∈" }, correct: "B" },
    { question: "Normal. Šta je decimalni zapis broja 1/3?", answers: { A: "0.34", B: "0.3", C: "0.333", D: "0.333..." }, correct: "D" },
    { question: "Normal. Koju vrstu simetrije pokazuju krila leptira?", answers: { A: "Rotacionu simetriju", B: "Centralnu simetriju", C: "Bilateralnu simetriju", D: "Translacionu simetriju" }, correct: "C" },
    { question: "Normal. Rimski broj XC u arapskom zapisu je?", answers: { A: "90", B: "110", C: "80", D: "100" }, correct: "A" }
  ],
  hardest: [
    { question: "Hard. Koliki je najmanji zajednički sadržalac brojeva 15 i 20?", answers: { A: "45", B: "30", C: "75", D: "60" }, correct: "D" },
    { question: "Hard. Koliko je √2 približno (na 3 decimale)?", answers: { A: "1.415", B: "1.416", C: "1.417", D: "1.414" }, correct: "D" },
	{ question: "Hard. Koliko je √3 približno (na 2 decimale)?", answers: { A: "1.72", B: "1.73", C: "1.74", D: "1.75" }, correct: "B" },
    { question: "Hard. Koliko je √5 približno (na 2 decimale)?", answers: { A: "2.22", B: "2.24", C: "2.26", D: "2.28" }, correct: "B" },
    { question: "Hard. Koliko je log10(1000)?", answers: { A: "2", B: "1", C: "4", D: "3" }, correct: "D" },
	{ question: "Hard. U kojem vijeku je nastao matematički kalkulus?", answers: { A: "15. vijek", B: "16. vijek", C: "17. vijek", D: "18. vijek" }, correct: "C" },
    { question: "Hard. Ko je prvi dokazao da su postoje beskonačno prosti brojevi?", answers: { A: "Euclid", B: "Euler", C: "Gauss", D: "Cantor" }, correct: "A" },
    { question: "Hard. Ko je prvi populizirao simbol 'i' za imaginarni broj?", answers: { A: "Euler", B: "Gauss", C: "Descartes", D: "Cauchy" }, correct: "A" },
    { question: "Hard. Ko je uveo pojam 'kompleksnih brojeva' u modernoj matematici?", answers: { A: "Caspar Wessel", B: "Euler", C: "Gauss", D: "Descartes" }, correct: "A" },
    { question: "Hard. Ko je prvi definisao pojam 'topologija'?", answers: { A: "Riemann", B: "Poincaré", C: "Euler", D: "Cantor" }, correct: "B" },
    { question: "Hard. Ko je formulirao Hilbertove probleme 1900. godine?", answers: { A: "David Hilbert", B: "Felix Klein", C: "Hermann Minkowski", D: "Bernhard Riemann" }, correct: "A" },
    { question: "Hard. Ko je dokazao Fermatovu veliku teoremu?", answers: { A: "Andrew Wiles", B: "Grigori Perelman", C: "Terence Tao", D: "Paul Erdős" }, correct: "A" },
    { question: "Hard. U kojoj godini je Gauss objavio 'Disquisitiones Arithmeticae'?", answers: { A: "1791", B: "1801", C: "1811", D: "1821" }, correct: "B" }
	]
},

 



/* 4., 9. i 14. pitanje */
interestingFacts: {
  easy: [
    { question: "Easy. Koliko uglova ima pentagon?", answers: { A: "4", B: "5", C: "6", D: "7" }, correct: "B" },
    { question: "Easy. Koji je zbir prva tri prosta broja?", answers: { A: "8", B: "10", C: "12", D: "15" }, correct: "B" },
    { question: "Easy. Koliko ivica ima tetraedar?", answers: { A: "4", B: "6", C: "8", D: "12" }, correct: "B" },
    { question: "Easy. Koliko je 1 + 2 + 3 + ... + 10?", answers: { A: "45", B: "50", C: "60", D: "55" }, correct: "D" },
    { question: "Easy. Koliki je zbir unutrašnjih uglova u pentagonu?", answers: { A: "360°", B: "720°", C: "480°", D: "540°" }, correct: "D" },
    { question: "Easy. Koliko je 5! (faktorijel pet)?", answers: { A: "60", B: "24", C: "720", D: "120" }, correct: "D" },
    { question: "Easy. Ako baciš dvije kocke, kolika je vjerovatnoća da dobiješ zbir 7?", answers: { A: "1/6", B: "1/12", C: "1/36", D: "1/3" }, correct: "A" },
    { question: "Easy. Koliko ima prostih brojeva manjih od 10?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "B" },
    { question: "Easy. Koji broj je jedini koji je i kvadrat i prost?", answers: { A: "1", B: "4", C: "9", D: "Nijedan" }, correct: "D" },
    { question: "Easy. Ako je x + x = x, šta je x?", answers: { A: "1", B: "0", C: "2", D: "-1" }, correct: "B" },
    { question: "Easy. Ko je rekao 'Eureka!'?", answers: { A: "Pitagora", B: "Euklid", C: "Arhimed", D: "Newton" }, correct: "C" },
    { question: "Easy. Ko je otkrio zakon gravitacije?", answers: { A: "Galileo", B: "Newton", C: "Einstein", D: "Kepler" }, correct: "B" },
    { question: "Easy. Koliki je treći ugao u trouglu ako su druga dva 50° i 60°?", answers: { A: "70°", B: "65°", C: "80°", D: "75°" }, correct: "A" },
    { question: "Easy. Ako se na svako sljedeće polje šahovske table broj zrna riže udvostručuje počevši od 1, koliko zrna ima na 64. polju?", answers: { A: "Oko 100 kg riže", B: "Jedan kamion riže", C: "Više nego ukupna proizvodnja riže na Zemlji", D: "Nemoguće izračunati" }, correct: "C" },
    { question: "Easy. Koliko puta se papir može presaviti u praksi?", answers: { A: "7 puta", B: "10 puta", C: "67", D: "Beskonačno" }, correct: "A" },
    { question: "Easy. Koliko pravih se može provući kroz 4 različite tačke (u opštem slučaju)?", answers: { A: "3", B: "4", C: "6", D: "Neodređeno" }, correct: "C" },
    { question: "Easy. Šta su kolinearne tačke?", answers: { A: "Tačke na istoj kružnici", B: "Tačke na istoj pravoj", C: "Tačke u ravni", D: "Nasumične tačke" }, correct: "B" },
    { question: "Easy. Šta su nekolinearne tačke?", answers: { A: "Tačke na istoj pravoj", B: "Tačke koje leže na kružnici", C: "Tačke koje ne leže na istoj pravoj", D: "Tačke u istom centru" }, correct: "C" },
    { question: "Easy. Koji su osnovni pojmovi u geometriji koji se ne definišu?", answers: { A: "Tačka, prava, ravnina", B: "Ugao, duž, krug", C: "Tijelo, volumen, površina", D: "Vektor, matrica, funkcija" }, correct: "A" },
    { question: "Easy. Kako se zvala grčka škola gdje je otkrivena iracionalnost brojeva?", answers: { A: "Platonova akademija", B: "Pitagorejska škola", C: "Aristotelova škola", D: "Euklidova škola" }, correct: "B" },
    { question: "Easy. Koji umjetnik je koristio matematičke proporcije i zlatni rez u 'Posljednjoj večeri'?", answers: { A: "Michelangelo", B: "Leonardo da Vinci", C: "Raphael", D: "Donatello" }, correct: "B" },
    { question: "Easy. Gdje se u prirodi može pronaći Fibonacci niz?", answers: { A: "Cjetovima", B: "U pahuljama i školjkama", C: "Spiralim oblicima", D: "U svim navedenim primjerima" }, correct: "D" },
    { question: "Easy. Kako se naziva četverougao čije su sve stranice jednake dužine, ali uglovi nisu pravi?", answers: { A: "Kvadrat", B: "Pravougaonik", C: "Romb", D: "Paralelogram" }, correct: "C" }
  ],
  hard: [
    { question: "Normal. Koliko je najmanji savršen broj?", answers: { A: "1", B: "6", C: "28", D: "496" }, correct: "B" },
    { question: "Normal. 74. Ko je otac modernog računarstva?", answers: { A: "Ada Lovelace", B: "Alan Turing", C: "John von Neumann", D: "Charles Babbage" }, correct: "B" },
    { question: "Normal. Ko je uveo simbol π?", answers: { A: "Euler", B: "Gauss", C: "Newton", D: "Wiliam Jones" }, correct: "D" },
    { question: "Normal. Ko je osnovao modernu teoriju vjerojatnosti?", answers: { A: "Pascal", B: "Bernoulli", C: "Laplace", D: "Kolmogorov" }, correct: "D" },
    { question: "Normal. Ko je poznat kao 'otac moderne logike'?", answers: { A: "Aristotel", B: "Gödel", C: "Frege", D: "Boole" }, correct: "C" },
    { question: "Normal. Koji je matematičar postavio teorem koji je ostao neriješen više od 350 godina, sve do 1994. godine?", answers: { A: "Isaac Newton", B: "Pierre de Fermat", C: "Leonhard Euler", D: "Carl Friedrich Gauss" }, correct: "B" },
    { question: "Normal. Koji je broj poznat kao 'najmanji Armstrong broj'?", answers: { A: "370", B: "371", C: "407", D: "153" }, correct: "D" },
    { question: "Normal. Koji od ponuđenih brojeva je i kvadrat i kub?", answers: { A: "1 i 64", B: "0 i 1", C: "1 i 729", D: "4 i 8" }, correct: "A" },
    { question: "Normal. Koliko je e^(iπ) + 1?", answers: { A: "0", B: "1", C: "i", D: "-1" }, correct: "A" },
    { question: "Normal. Koliko je maksimalan broj tačaka preseka n krugova?", answers: { A: "n²", B: "n(n-1)", C: "2n", D: "n!" }, correct: "B" },
    { question: "Normal. Koji je prvi Carmichael broj?", answers: { A: "341", B: "451", C: "561", D: "671" }, correct: "C" },
    { question: "Normal. Koji je broj poznat kao 'najmanji višestruko savršen broj'?", answers: { A: "120", B: "30240", C: "8128", D: "672" }, correct: "D" },
    { question: "Normal. Koji je broj 2^8?", answers: { A: "512", B: "128", C: "1024", D: "256" }, correct: "D" },
    { question: "Normal. Koja je vrijednost sin(90°)?", answers: { A: "0", B: "0.5", C: "√2/2", D: "1" }, correct: "D" },
    { question: "Normal. Proizvod neparnog i parnog broja je uvijek?", answers: { A: "Neparan", B: "Paran", C: "Negativan", D: "0" }, correct: "B" },
    { question: "Normal. Proizvod pozitivnog i negativnog broja je?", answers: { A: "Pozitivan", B: "0", C: "Negativan", D: "Neodređen" }, correct: "C" },
    { question: "Normal. Zbir dva negativna broja je?", answers: { A: "Pozitivan", B: "Negativan", C: "0", D: "Neodređen" }, correct: "B" },
    { question: "Normal. Proizvod dva negativna broja je?", answers: { A: "Negativan", B: "0", C: "Pozitivan", D: "Neodređen" }, correct: "C" },
    { question: "Normal. Kako se zove prosječna vrijednost skupa podataka?", answers: { A: "Medijana", B: "Mod", C: "Aritmetička sredina", D: "Varijansa" }, correct: "C" },
    { question: "Normal. Kako se zovu dva ugla čiji je zbir 90°?", answers: { A: "Suplementarni", B: "Komplementarni", C: "Vertikalni", D: "Adjacenti" }, correct: "B" },
    { question: "Normal. Kako se zovu dva ugla čiji je zbir 180°?", answers: { A: "Komplementarni", B: "Vertikalni", C: "Suplementarni", D: "Paralelni" }, correct: "C" },
    { question: "Normal. Koje je veliko životno dostignuće osobe koja doživi 114 godina (Okawa iz Japana)?", answers: { A: "50000 dana života", B: "10000 sedmica života", C: "Preko milion sati života", D: "Sve navedeno" }, correct: "D" }  ],
  hardest: [
    { question: "Hard. Koliko rješenja ima jednačina x³ + y³ = z³ za prirodne brojeve?", answers: { A: "Beskonačno", B: "Dva", C: "0", D: "Samo jedno" }, correct: "C" },
    { question: "Hard. Koja je gustoća prostih brojeva kod broja n?", answers: { A: "1/n", B: "1/ln(n)", C: "1/√n", D: "1/n²" }, correct: "B" },
    { question: "Hard. Koliko je Catalan konstanta G na 2 decimale?", answers: { A: "0.85", B: "0.92", C: "1.08", D: "1.15" }, correct: "B" },
    { question: "Hard. Koji je najmanji netrivijalni triperfect broj?", answers: { A: "120", B: "672", C: "523776", D: "Nepoznato" }, correct: "C" },
    { question: "Hard. Koliko dimenzija ima Leech rešetka?", answers: { A: "8", B: "16", C: "24", D: "32" }, correct: "C" },
    { question: "Hard. Koliko je 0.999... (beskonačno ponavljanje) u decimalnom obliku?", answers: { A: "0.9", B: "0.99", C: "Nedefinisano", D: "1" }, correct: "D" },
    { question: "Hard. Koliko je 2^10 + 2^9?", answers: { A: "1024", B: "2048", C: "512", D: "1536" }, correct: "D" }
  ]
},



/* 5., 10. i 15. pitanje */
numbers: {
  easy: [
    { question: "Easy. Koji je najmanji prosti broj?", answers: { A: "0", B: "1", C: "2", D: "3" }, correct: "C" },
    { question: "Easy. Koliko nula ima milion?", answers: { A: "4", B: "5", C: "6", D: "7" }, correct: "C" },
    { question: "Easy. Koliko je 2 na 10?", answers: { A: "512", B: "1024", C: "2048", D: "4096" }, correct: "B" },
    { question: "Easy. Koji broj je savršen (jednak je sumi svojih djelilaca)?", answers: { A: "4", B: "6", C: "8", D: "10" }, correct: "B" },
    { question: "Easy. Ako u sobi ima 5 mačaka i uđe još 5 pasa, koliko nogu ima?", answers: { A: "20", B: "40", C: "42", D: "44" }, correct: "B" },
    { question: "Easy. Dva oca i dva sina ulove 3 ribe. Svako dobije po jednu. Kako?", answers: { A: "Nemoguće", B: "Djed, otac, sin", C: "Podijele jednu", D: "Otpuste jednu" }, correct: "B" },
    { question: "Easy. Ako 3 mačke imaju 12 nogu, koliko nogu imaju 6 mačaka?", answers: { A: "18", B: "30", C: "36", D: "24" }, correct: "D" },
    { question: "Easy. Koliko je 2 + 2 * 2?", answers: { A: "4", B: "10", C: "8", D: "6" }, correct: "D" },
    { question: "Easy. Koliko je 20% od 100?", answers: { A: "10", B: "30", C: "40", D: "20" }, correct: "D" },
    { question: "Easy. Ako je 1/2 + 1/3 + 1/6 = ?", answers: { A: "2", B: "3", C: "0.5", D: "1" }, correct: "D" },
    { question: "Easy. Ako je 5x = 25, koliko je x?", answers: { A: "10", B: "15", C: "20", D: "5" }, correct: "D" },
    { question: "Easy. Koliko je 1/2 od 1/2?", answers: { A: "1/2", B: "1", C: "2", D: "1/4" }, correct: "D" },
    { question: "Easy. Ako je danas srijeda, koji dan je za 100 dana?", answers: { A: "Petak", B: "Subota", C: "Nedjelja", D: "Četvrtak" }, correct: "A" },
    { question: "Easy. Koliko ima načina da se baci kocka i dobije paran broj?", answers: { A: "2", B: "3", C: "4", D: "5" }, correct: "B" },
    { question: "Easy. Koji broj ima tačno 3 djelitelja?", answers: { A: "4", B: "6", C: "8", D: "12" }, correct: "A" },
    { question: "Easy. Koji broj ima najviše djelitelja među 1–20?", answers: { A: "12", B: "18", C: "20", D: "16" }, correct: "A" },
    { question: "Easy. Koji broj slijedi u Fibonaccijevom nizu nakon 0, 1, 1, 2, 3?", answers: { A: "4", B: "5", C: "6", D: "8" }, correct: "B" },
    { question: "Easy. Koji pojam opisuje beskonačan skup koji se može prebrojati?", answers: { A: "Neprebrojiv", B: "Konačan", C: "Gust", D: "Prebrojiv" }, correct: "D" },
    { question: "Easy. Koja je treća cifra broja π (nakon decimalnog zareza)?", answers: { A: "3", B: "1", C: "4", D: "5" }, correct: "B" },
    { question: "Easy. Koliko je kvadratni korijen iz 361?", answers: { A: "19", B: "20", C: "18", D: "21" }, correct: "A" },
    { question: "Easy. Koji od ovih brojeva je prost?", answers: { A: "21", B: "29", C: "39", D: "51" }, correct: "B" },
    { question: "Easy. Koji je zbir unutrašnjih uglova petougla?", answers: { A: "360°", B: "540°", C: "720°", D: "450°" }, correct: "B" },
    { question: "Easy. Koliki je kvadrat broja 21?", answers: { A: "441", B: "420", C: "400", D: "4410" }, correct: "A" },
    { question: "Easy. Koliko je π na 2 decimale?", answers: { A: "3.12", B: "3.14", C: "3.16", D: "3.18" }, correct: "B" }
  ],
  hard: [
    { question: "Normal. Koji je sljedeći prosti broj nakon 97?", answers: { A: "99", B: "101", C: "103", D: "107" }, correct: "B" },
    { question: "Normal. Koliko je e (Eulerova konstanta) na 2 decimale?", answers: { A: "2.52", B: "2.62", C: "2.72", D: "2.82" }, correct: "C" },
    { question: "Normal. Ko je otkrio zakon gravitacije?", answers: { A: "Galileo", B: "Newton", C: "Einstein", D: "Kepler" }, correct: "B" },
    { question: "Normal. Ko je poznat po teoriji relativnosti?", answers: { A: "Newton", B: "Planck", C: "Bohr", D: "Einstein" }, correct: "D" },
    { question: "Normal. Ko je otac modernog računarstva?", answers: { A: "Ada Lovelace", B: "Alan Turing", C: "John von Neumann", D: "Charles Babbage" }, correct: "B" },
    { question: "Normal. Ko je uveo simbol π?", answers: { A: "Euler", B: "Gauss", C: "Newton", D: "Wiliam Jones" }, correct: "D" },
    { question: "Normal. Ko je osnovao modernu teoriju vjerojatnosti?", answers: { A: "Pascal", B: "Bernoulli", C: "Laplace", D: "Kolmogorov" }, correct: "D" },
    { question: "Normal. Koliko je zlatni presek φ na 3 decimale?", answers: { A: "1.414", B: "1.618", C: "1.732", D: "2.236" }, correct: "B" },
    { question: "Normal. Ko je razvio teoriju skupova?", answers: { A: "Dedekind", B: "Cantor", C: "Hilbert", D: "Frege" }, correct: "B" },
    { question: "Normal. Ko je riješio kubnu jednačinu u 16. vijeku?", answers: { A: "Cardano", B: "Tartaglia", C: "Ferrari", D: "Viète" }, correct: "A" },
    { question: "Normal. Ko je dokazao da je e transcendentan?", answers: { A: "Hermite", B: "Lindemann", C: "Cantor", D: "Weierstrass" }, correct: "A" },
    { question: "Normal. Ko je otkrio neEuklidsku geometriju?", answers: { A: "Gauss", B: "Bolyai", C: "Lobačevski", D: "Svi navedeni" }, correct: "D" },
    { question: "Normal. Ko je razvio teoriju grupa u modernom obliku?", answers: { A: "Noether", B: "Jordan", C: "Lagrange", D: "Galois" }, correct: "D" },
    { question: "Normal. Ko je uveo simbol ∑ za sumu?", answers: { A: "Gauss", B: "Leibniz", C: "Bernoulli", D: "Euler" }, correct: "D" },
    { question: "Normal. Ko je dokazao da je set realnih brojeva neprenumerabilan?", answers: { A: "Gödel", B: "Hilbert", C: "Dedekind", D: "Cantor" }, correct: "D" },
    { question: "Normal. Hotel sa beskonačno soba je pun. Dolazi nova osoba. Može li se smjestiti?", answers: { A: "Ne", B: "Da", C: "Samo u hodniku", D: "Zavisi od sobe" }, correct: "B" },
    { question: "Normal. Monty Hall problem: mijenjate vrata?", answers: { A: "Da", B: "Ne", C: "Svejedno", D: "Zavisi" }, correct: "A" },
    { question: "Normal. Birthday paradox: Koliko ljudi treba da je 50% šansa da dvoje dijele rođendan?", answers: { A: "183", B: "100", C: "50", D: "23" }, correct: "D" },
    { question: "Normal. Koliko je 2 + 2 × 2 - 2 / 2?", answers: { A: "5", B: "7", C: "4", D: "6" }, correct: "A" },
    { question: "Normal. Koji je broj 3 puta veći od 1/3?", answers: { A: "2", B: "3", C: "4", D: "1" }, correct: "D" },
    { question: "Normal. Ako je x = 2 i y = 3, koliko je x^y?", answers: { A: "6", B: "9", C: "8", D: "27" }, correct: "D" }
   ],
  hardest: [
    { question: "Hard. Koja je vrijednost Apéry konstante ζ(3) na 2 decimale?", answers: { A: "1.20", B: "1.50", C: "1.80", D: "2.10" }, correct: "A" },
    { question: "Hard. Koliko znamenaka ima Googolplex?", answers: { A: "10^100", B: "10^(10^100)", C: "10^1000", D: "10^10000" }, correct: "B" },
    { question: "Hard. Koji je Graham's broj G1?", answers: { A: "3↑↑3", B: "3↑↑↑↑3", C: "3→3→3", D: "3^(3^27)" }, correct: "B" },
    { question: "Hard. Mersenneovi brojevi su posebna klasa prostih brojeva. Koja organizacija je prvenstveno odgovorna za otkrivanje najvećih poznatih prostih brojeva?", answers: { A: "NASA", B: "GIMPS", C: "CERN", D: "MIT" }, correct: "B" },
    { question: "Hard. Ko je dokazao Taniyama-Shimura hipotezu za polustavne eliptičke krivulje?", answers: { A: "Andrew Wiles", B: "Richard Taylor", C: "Goro Shimura", D: "Yutaka Taniyama" }, correct: "A" },
    { question: "Hard. Ko je dobio Fields medalju 2014. za rad na dinamičkim sistemima?", answers: { A: "Maryam Mirzakhani", B: "Manjul Bhargava", C: "Artur Avila", D: "Martin Hairer" }, correct: "C" },
    { question: "Hard. Ko je odbio Fields medalju 2006?", answers: { A: "Terence Tao", B: "Grigori Perelman", C: "Andrei Okounkov", D: "Wendelin Werner" }, correct: "B" },
    { question: "Hard. Ko je razvio teoriju kategorija?", answers: { A: "Samuel Eilenberg", B: "Saunders Mac Lane", C: "Alexander Grothendieck", D: "A i B" }, correct: "D" },
    { question: "Hard. Ko je riješio Hilbertov 10. problem?", answers: { A: "Turing", B: "Church", C: "Matiyasevich", D: "Gödel" }, correct: "C" },
    { question: "Hard. Ko je uveo kategorijsku teoriju zajedno sa Mac Laneom?", answers: { A: "Grothendieck", B: "Lawvere", C: "Kan", D: "Eilenberg" }, correct: "D" },
    { question: "Hard. Ko je formulirao teoriju relativnosti u matematičkom obliku?", answers: { A: "Einstein", B: "Lorentz", C: "Riemann", D: "Minkowski" }, correct: "D" },
    { question: "Hard. Ko je prvi definisao pojam 'matematička logika' u modernom obliku?", answers: { A: "Gödel", B: "Turing", C: "Russell", D: "Frege" }, correct: "D" },
    { question: "Hard. Ko je otkrio 'četiri boje' teorem (prvo dokazano računarom)?", answers: { A: "Fourier", B: "Gauss", C: "Euler", D: "Appel i Haken" }, correct: "D" },
    { question: "Hard. Ko je prvi dokazao Fermatovu posljednju teoremu?", answers: { A: "Fermat", B: "Taylor", C: "Taniyama", D: "Wiles" }, correct: "D" },
    { question: "Hard. Banach-Tarski paradoks tvrdi da loptu možete?", answers: { A: "Prerezati na 5 dijelova i složiti u 2 lopte", B: "Rastegnuti beskonačno", C: "Kompresovati u tačku", D: "Rotirati u 4D" }, correct: "A" },
    { question: "Hard. Gabriel's Horn ima?", answers: { A: "Konačnu zapreminu, beskonačnu površinu", B: "Beskonačnu zapreminu, konačnu površinu", C: "Oboje konačno", D: "Oboje beskonačno" }, correct: "A" },
    { question: "Hard. Koliko je suma 1+2+3+4+... do beskonačnosti a analitičkom smislu (Ramanujan suma)?", answers: { A: "∞", B: "-1/12", C: "Divergira", D: "0" }, correct: "B" },
    { question: "Hard. Koliko je 1/0 u matematici?", answers: { A: "0", B: "∞", C: "1", D: "Nedefinisano" }, correct: "D" },
    { question: "Hard. Koja je vrijednost log(1)?", answers: { A: "1", B: "Nedefinisano", C: "∞", D: "0" }, correct: "D" },
    { question: "Hard. Koliko je √(-1)?", answers: { A: "-i", B: "1", C: "Nedefinisano", D: "i" }, correct: "D" },
    { question: "Hard. Koja je vrijednost sin(0)?", answers: { A: "1", B: "-1", C: "Nedefinisano", D: "0" }, correct: "D" },
	{ question: "Hard. Ako se broji 24 vremenske zone na 360°, koliko stepeni otpada na jednu zonu?", answers: { A: "10°", B: "12°", C: "15°", D: "20°" }, correct: "C" },
  ]
}
},

 en: {


/* Questions 1, 6 and 11 */
history: {
easy: [
{ question: "Easy. If today is Friday, what day is it in 11 days?", answers: { A: "Tuesday", B: "Monday", C: "Saturday", D: "Sunday" }, correct: "A" },
{ question: "Easy. What is 15% of 200?", answers: { A: "25", B: "35", C: "30", D: "40" }, correct: "C" },
{ question: "Easy. What is 30% of 200?", answers: { A: "70", B: "60", C: "50", D: "80" }, correct: "B" },
{ question: "Easy. What is 40% of 500?", answers: { A: "150", B: "250", C: "200", D: "300" }, correct: "C" },
{ question: "Easy. What is the next number in the sequence 1, 1, 2, 3, 5, 8, ?", answers: { A: "11", B: "13", C: "12", D: "15" }, correct: "B" },
{ question: "Easy. What letter is the set of natural numbers?", answers: { A: "Z", B: "N", C: "R", D: "Q" }, correct: "B" },
{ question: "Easy. What letter is the set of integers?", answers: { A: "N", B: "Q", C: "Z", D: "R" }, correct: "C" },
{ question: "Easy. What letter is the set of rational numbers?", answers: { A: "Q", B: "R", C: "Z", D: "N" }, correct: "A" },
{ question: "Easy. What letter do we use to denote the set of complex numbers?", answers: { A: "R", B: "C", C: "Z", D: "Q" }, correct: "B" },
{ question: "Easy. What letter do we use to denote the set of real numbers?", answers: { A: "Q", B: "Z", C: "R", D: "C" }, correct: "C" },
{ question: "Easy. What is the sum of the first five prime numbers?", answers: { A: "26", B: "28", C: "30", D: "32" }, correct: "B" },
{ question: "Easy. A right triangle has sides 12 and 5. What is the hypotenuse?", answers: { A: "12", B: "13", C: "17", D: "15" }, correct: "B" },
{ question: "Easy. A right triangle has sides 8 and 6. What is the hypotenuse?", answers: { A: "10", B: "12", C: "14", D: "9" }, correct: "A" },
{ question: "Easy. A right triangle has sides 3 and 4. What is the hypotenuse?", answers: { A: "6", B: "5", C: "7", D: "4" }, correct: "B" },
{ question: "Easy. How many hours are there in 4 days?", answers: { A: "72", B: "96", C: "88", D: "100" }, correct: "B" },
{ question: "Easy. How many hours are there in 6 days?", answers: { A: "120", B: "132", C: "144", D: "150" }, correct: "C" },
{ question: "Easy. How many hours are there in 2 weeks?", answers: { A: "336", B: "320", C: "360", D: "300" }, correct: "A" },
{ question: "Easy. With which number it is not allowed to divide?", answers: { A: "-1", B: "0", C: "2", D: "10000" }, correct: "B" },
{ question: "Easy. If a = -2, what is a to the third?", answers: { A: "-6", B: "6", C: "-8", D: "8" }, correct: "C" },
{ question: "Easy. What is 30% of 400?", answers: { A: "100", B: "140", C: "120", D: "160" }, correct: "C" },
{ question: "Easy. How many diagonals does a hexagon have?", answers: { A: "6", B: "9", C: "12", D: "15" }, correct: "B" },
{ question: "Easy. How many diagonals does a heptagon have?", answers: { A: "9", B: "14", C: "12", D: "16" }, correct: "B" },
{ question: "Easy. How many diagonals does an octagon have?", answers: { A: "16", B: "18", C: "20", D: "14" }, correct: "C" },
{ question: "Easy. What figure is formed by rotating a radius around the center?", answers: { A: "Triangle", B: "Circle", C: "Square", D: "Rectangle" }, correct: "B" }, 
{ question: "Easy. What does the number π represent in geometry?", answers: { A: "Ratio of diameter and radius", B: "Ratio of circumference and diameter of a circle", C: "Difference of the areas of circles", D: "Square of the radius" }, correct: "B" } 
],
hard: [ 
{ question: "Normal. How much is 2^30 approximately?", answers: { A: "1.07×10^9", B: "1.07×10^8", C: "1.07×10^10", D: "1.07×10^7" }, correct: "A" }, 
{ question: "Normal. Who introduced the symbol for infinity?", answers: { A: "Isaac Newton", B: "Leonhard Euler", C: "John Wallis", D: "René Descartes" }, correct: "C" },
{ question: "Normal. What number did Ludolph van Ceulen calculate to 35 decimal places?", answers: { A: "e", B: "π", C: "φ", D: "√2" }, correct: "B" },
{ question: "Normal. What was Carl Friedrich Gauss known by his nickname?", answers: { A: "King of Mathematics", B: "Father of Algebra", C: "Prince of Mathematics", D: "Genius of Numbers" }, correct: "C" },
{ question: "Normal. Who invented logarithms?", answers: { A: "Gottfried Leibniz", B: "Isaac Newton", C: "Leonhard Euler", D: "John Napier" }, correct: "D" },
{ question: "Normal. Who was the first to use negative numbers in mathematics?", answers: { A: "Chinese", B: "Greeks", C:"Romans", D: "Egyptians" }, correct: "A" }, 
{ question: "Normal.  Who formally defined the function??", answers: { A: "Descartes", B: "Fermat", C: "Euler", D: "Leibniz" }, correct: "C" }, 
{ question: "Normal. Who was the first to use the decimal notation of numbers?", answers: { A: "Indians", B: "Arabs", C: "Chinese", D: "Romans" }, correct: "A" }, 
{ question: "Normal. Who is known as the 'father of geometry'?", answers: { A: "Pythagoras", B: "Euclid", C: "Archimedes", D: "Plato" }, correct: "B", explanation: "Euclid of Alexandria (around 300 BC) wrote the 'Elements', the most influential mathematical book of all time systematizes geometry.", commonMistake: "People often think of Pythagoras because he is more famous, but Pythagoras is the 'father of trigonometry', not geometry." }, 
{ question: "Normal. In which country was the Arabic numeral system created?", answers: { A: "Arabia", B: "Egypt", C: "India", D: "China" }, correct: "C" }, 
{ question: "Normal. Which symbol is used for infinity?", answers: { A: "α", B: "∞", C: "Ω", D: "π" }, correct: "B" }, 
{ question: "Normal. In what century was algebra created?", answers: { A: "5th century", B: "7th century", C: "9th century", D: "11th century" }, correct: "C" }, 
{ question: "Normal. What is the name of a function that is equal to its inverse function?", answers: { A: "Exponential function", B: "Identity of functions", C: "Quadratic function", D: "Reciprocal function" }, correct: "B" }, 
{ question: "Normal. How much is 3^10?", answers: { A: "59049", B: "59000", C: "60000", D: "50000" }, correct: "A" }, 
{ question: "Normal. What is the name of a mathematical proof that starts from the assumption that the statement is false?", answers: { A: "Direct proof", B: "Induction", C: "Proof by contradiction", D: "Constructive proof" }, correct: "C" }, 
{ question: "Normal. Are there more rational or irrational numbers?", answers: { A: "Rational", B: "Irrational", C: "Equally", D: "Cannot be determined" }, correct: "B" }, 
{ question: "Normal. How much is 5^6?", answers: { A: "15625", B: "15000", C: "16000", D: "17000" }, correct: "A" },
{ question: "Normal. How much is 7^3?", answers: { A: "343", B: "333", C: "353", D: "363" }, correct: "A" },
{ question: "Normal. How much is 11^2?", answers: { A: "121", B: "111", C: "131", D: "141" }, correct: "A" },
{ question: "Normal. Who was the first to formulate the axioms of geometry in their modern form?", answers: { A: "Hilbert", B: "Euclid", C: "Pascal", D: "Gauss" }, correct: "A" },
{ question: "Normal. Who was the first to prove fundamental theorem of algebra?", answers: { A: "Gauss", B: "Euler", C: "Descartes", D: "Cauchy" }, correct: "A" },
{ question: "Normal. What are numbers that cannot be written as a fraction called?", answers: { A: "Rational", B: "Natural", C: "Irrational", D: "Integer" }, correct: "C" }
],
hardest: [
{ question: "Hard. Who proved the incompleteness of formal systems (Gödel's theorems)?", answers: { A: "Kurt Gödel", B: "Alan Turing", C: "David Hilbert", D: "John von Neumann" }, correct: "A" },
{ question: "Hard. Who introduced the concept of 'group' in algebra?", answers: { A: "Galois", B: "Noether", C: "Lagrange", D: "Cayley" }, correct: "A" },
{ question: "Hard. Who introduced the notation for the integral ∫?", answers: { A: "Leibniz", B: "Newton", C: "Euler", D: "Riemann" }, correct: "A" },
{ question: "Hard. Who first used the '=' sign for equality?", answers: { A: "Descartes", B: "Robert Recorde", C: "Leibniz", D: "Newton" }, correct: "B" },
{ question: "Hard. When was Euclid's book 'Elements' published?", answers: { A: "500 BC", B: "300 BC", C: "100 BC", D: "100 AD." }, correct: "B" },
{ question: "Hard. Who developed analytic geometry?", answers: { A: "Fermat", B: "Pascal", C: "Descartes", D: "Leibniz" }, correct: "C" },
{ question: "Hard. In which century did mathematical calculus arise?", answers: { A: "15th century", B: "16th century", C: "17th century", D: "18th century" }, correct: "C" },
{ question: "Hard. Who was the first to prove that infinitely prime numbers exist?", answers: { A: "Euclid", B: "Euler", C: "Gauss", D: "Cantor" }, correct: "A" },
{ question: "Hard. Who introduced the concept of 'complex numbers' in modern mathematics?", answers: { A: "Caspar Wessel", B: "Euler", C: "Gauss", D: "Descartes" }, correct: "A" }, 
{ question: "Hard. Who first defined the term 'topology'?", answers: { A: "Riemann", B: "Poincaré", C: "Euler", D: "Cantor" }, correct: "B" }, 
{ question: "Hard. Who introduced the concept of 'mathematical analysis' in the 18th century?", answers: { A: "Cauchy", B: "Newton", C: "Leibniz", D: "Euler" }, correct: "D" },
{ question: "Hard. Who formulated Hilbert's problems in 1900?", answers: { A: "David Hilbert", B: "Felix Klein", C: "Hermann Minkowski", D: "Bernhard Riemann" }, correct: "A" },
{ question: "Hard. Who proved Fermat's Last Theorem?", answers: { A: "Andrew Wiles", B: "Grigori Perelman", C: "Terence Tao", D: "Paul Erdős" }, correct: "A" },
{ question: "Hard. In what year did Gauss publish 'Disquisitiones Arithmeticae'?", answers: { A: "1791", B: "1801", C: "1811", D: "1821" }, correct: "B" },
{ question: "Hard. Who was the first to mathematically prove the existence of transcendent numbers?", answers: { A: "Cantor", B: "Liouville", C: "Hermite", D: "Lindemann" }, correct: "B" }, 
{ question: "Hard How many solutions does the equation x^2 = -1 have in real numbers?", answers: { A: "2", B: "1", C: "0", D: "Infinity" }, correct: "C" }, 
{ question: "Hard. Who solved Poincare's hypothesis?", answers: { A: "Andrew Wiles", B: "Terence Tao", C: "Grigori Perelman", D: "John Nash" }, correct: "C" }, 
{ question: "Hard. In what year did Emmy Noether publish her famous theorem?", answers: { A: "1905", B: "1915", C: "1918", D: "1925" }, correct: "C" }, 
{ question: "Hard. Who introduced the concept of mathematical rigor in analysis (ε-δ definition of limit)?", answers: { A: "Cauchy", B: "Weierstrass", C: "Riemann", D: "Bolzano" }, correct: "B" }, 
{ question: "Hard. Who first formally defined the continuum in real numbers?", answers: { A: "Cantor", B: "Dedekind", C: "Weierstrass", D: "Hilbert" }, correct: "B" }, 
{ question: "Hard. Who introduced the axiomatic approach to geometry in the 19th century?", answers: { A: "Hilbert", B: "Euclid", C: "Bolyai", D: "Lobachevsky" }, correct: "A" }
]
},



/* Questions 2, 7 and 12 */
geography: {
easy: [
{ question: "Easy. What shape has 10 sides?", answers: { A: "Octagon", B: "Decagon", C: "Hendecagon", D: "Hexagon" }, correct: "B" },
{ question: "Easy. What is 2 to the fifth?", answers: { A: "32", B: "16", C: "25", D: "64" }, correct: "A" },
{ question: "Easy. What is the closest square to 1000?", answers: { A: "30²", B: "32²", C: "31²", D: "33²" }, correct: "B" },
{ question: "Easy. The sequence: 2, 6, 12, 20, 30, ... What is the next term?", answers: { A: "36", B: "40", C: "42", D: "56" }, correct: "C" },
{ question: "Easy. Rene Descartes is known for his famous saying:", answers: { A: "'I think, therefore I am'", B: "'Knowledge is power'", C: "'Eureka!'", D: "'Everything is relative'" }, correct: "A" },
{ question: "Easy. What is the name of a shape with 8 sides?", answers: { A: "Hexagon", B: "Octagon", C: "Decagon", D: "Tetrahedron" }, correct: "B" },
{ question: "Easy. What is the name of the famous paradox with infinite steps where Achilles cannot catch up with the tortoise?", answers: { A: "Death Paradox", B: "Zeno's Paradox", C: "Simpson's Paradox", D: "Galileo's Paradox" }, correct: "B" },
{ question: "Easy. What is the cube root of 27?", answers: { A: "3", B: "9", C: "27", D: "6" }, correct: "A" },
{ question: "Easy. In which country is the largest mathematical library (Bibliothèque de mathématiques) located?", answers: { A: "France", B: "Germany", C: "USA", D: "Italy" }, correct: "A" },
{ question: "Easy. In which country was the mathematician Gauss born?", answers: { A: "Germany", B: "Switzerland", C: "Austria", D: "France" }, correct: "A" },
{ question: "Easy. In which country was the mathematician Fermat born?", answers: { A: "Italy", B: "Spain", C: "France", D: "England" }, correct: "C" },
{ question: "Easy. In which country was the mathematician Newton born?", answers: { A: "Scotland", B: "England", C: "Ireland", D: "Wales" }, correct: "B" },
{ question: "Easy. What is the Roman numeral for the number 50?", answers: { A: "L", B: "C", C: "V", D: "X" }, correct: "A" },
{ question: "Easy. What is the Roman numeral for 100?", answers: { A: "D", B: "L", C: "C", D: "X" }, correct: "C" },
{ question: "Easy. What is the Roman numeral for 1000?", answers: { A: "M", B: "D", C: "C", D: "X" }, correct: "A" },
{ question: "Easy. What is the Roman numeral for 10?", answers: { A: "V", B: "X", C: "L", D: "I" }, correct: "B" },
{ question: "Easy. What is the Roman numeral for 500?", answers: { A: "M", B: "D", C: "C", D: "L" }, correct: "B" },
{ question: "Easy. What is the fourth letter of the Greek alphabet?", answers: { A: "Gamma", B: "Delta", C: "Beta", D: "Epsilon" }, correct: "B" },
{ question: "Easy. What is the third letter of the Greek alphabet?", answers: { A: "Beta", B: "Delta", C: "Gamma", D: "Alpha" }, correct: "C" },
{ question: "Easy. What is the letter of the Greek alphabet that represents the number π?", answers: { A: "Pi", B: "Phi", C: "Psi", D: "Omega" }, correct: "A" },
{ question: "Easy. What is the last letter of the Greek alphabet?", answers: { A: "Sigma", B: "Omega", C: "Psi", D: "Theta" }, correct: "B" }
],
hard: [
{ question: "Normal. In which city was the mathematician Pascal born?", answers: { A: "Paris", B: "Clermont-Ferrand", C: "Marseille", D: "Nice" }, correct: "B" },
{ question: "Normal. Where is the 'Euler Room' in honor of Leonhard Euler located?", answers: { A: "Bern", B: "Zürich", C: "Basel", D: "Berlin" }, correct: "C" },
{ question: "Normal. Where is the largest mathematics museum in the world (Museum of Mathematics) located?", answers: { A: "New York", B: "London", C: "Berlin", D: "Tokyo" }, correct: "A" },
{ question: "Normal. In which city is the 'Københavns Universitet' where Niels Bohr worked?", answers: { A: "Stockholm", B: "Copenhagen", C: "Oslo", D: "Helsinki" }, correct: "B" }, 
{ question: "Normal. What was the first civilization to develop a method of solving quadratic equations?", answers: { A: "Egyptians", B: "Babylonians", C: "Greeks", D: "Chinese" }, correct: "B" }, 
{ question: "Normal. In which city is the famous Bridge of Mathematics?", answers: { A: "London", B: "Paris", C: "Cambridge", D: "Oxford" }, correct: "C" }, 
{ question: "Normal. In which country was Pythagoras born?", answers: { A: "Greece", B: "Italy", C: "Turkey", D: "Egypt" }, correct: "A" }, 
{ question: "Normal. Where is the Institute for Advanced Study where Einstein worked?", answers: { A: "Boston", B: "Princeton", C: "Cambridge", D: "New York" }, correct: "B" }, 
{ question: "Normal. In which city is the Fields Institute of Mathematics located?", answers: { A: "Vancouver", B: "Montreal", C: "Toronto", D: "Ottawa" }, correct: "C" }, 
{ question: "Normal. Where was the mathematician Leonhard Euler born?", answers: { A: "Germany", B: "Switzerland", C: "Austria", D: "Netherlands" }, correct: "B" }, 
{ question: "Normal. In which country is the famous Library of Alexandria, known for its mathematical tradition?", answers: { A: "Egypt", B: "Greece", C: "Italy", D: "France" }, correct: "A" }, 
{ question: "Normal. In which city was the Institute of Mathematical Sciences (IMS) founded?", answers: { A: "Beijing", B: "New York", C: "Singapore", D: "Paris" }, correct: "C" }, 
{ question: "Normal. Where is CERN, famous for mathematical and physical research?", answers: { A: "Switzerland", B: "France", C: "Germany", D: "Italy" }, correct: "A" }, 
{ question: "Normal. In which city is MIT, famous for mathematics and technology?", answers: { A: "Boston", B: "Cambridge, Massachusetts", C: "San Francisco", D: "Seattle" }, correct: "B" }, 
{ question: "Normal. Which European country is home to a large number of mathematical museums and institutes, including CERN?", answers: { A: "Switzerland", B: "France", C: "Germany", D: "Italy" }, correct: "A" }, 
{ question: "Normal. Which city in Italy was the home of Fibonacci, known for the Fibonacci sequence?", answers: { A: "Pisa", B: "Florence", C: "Rome", D: "Milan" }, correct: "A" }, 
{ question: "Normal. Which country is the birthplace of Rene Descartes, famous for analytical geometry?", answers: { A: "Belgium", B: "France", C: "Switzerland", D: "Netherlands" }, correct: "B" }, 
{ question: "Normal. In which European city is the famous Henri Poincaré Institute, known for mathematical physics and chaos theory?", answers: { A: "Paris", B: "Berlin", C: "London", D: "Madrid" }, correct: "A" }, 
{ question: "Normal. Which Asian country contributed to the development of negative numbers in early mathematics?", answers: { A: "China", B: "India", C: "Japan", D: "Arabia" }, correct: "A" }, 
{ question: "Normal. Where is the largest academy of sciences in Europe (Academia Europaea)?", answers: { A: "London", B: "Oxford", C: "Cambridge", D: "Paris" }, correct: "A" }, 
{ question: "Normal. ​​In which country was the mathematician Riemann born?", answers: { A: "France", B: "Austria", C: "Switzerland", D: "Germany" }, correct: "D" },
{ question: "Normal. In which country was the mathematician Hilbert born?", answers: { A: "Germany", B: "Poland", C: "Czech Republic", D: "Austria" }, correct: "A" },
{ question: "Normal. In which country was the mathematician Kolmogorov born?", answers: { A: "Russia", B: "Ukraine", C: "Poland", D: "Belarus" }, correct: "A" },
{ question: "Normal. In which country was the mathematician Noether born?", answers: { A: "Germany", B: "Austria", C: "Switzerland", D: "Italy" }, correct: "A" }, 
{ question: "Normal. In which country was the mathematician Cantor born?", answers: { A: "Germany", B: "Sweden", C: "Denmark", D: "The Netherlands" }, correct: "A" }, 
{ question: "Normal. In which city is the International Mathematical Congress held every 4 years?", answers: { A: "Always in the same one", B: "It rotates around the world", C: "Only in Europe", D: "Only in the USA" }, correct: "B" }, 
{ question: "Normal. Where is the Steklov Mathematical Institute located?", answers: { A: "St. Petersburg", B: "Moscow", C: "Kiev", D: "Minsk" }, correct: "B" },
{ question: "Normal. In which city did Al-Khwarizmi write his works on algebra?", answers: { A: "Baghdad", B: "Damascus", C: "Cairo", D: "Medina" }, correct: "A" },
{ question: "Normal. Who is considered the first known female mathematician?", answers: { A: "Ada Lovelace", B: "Emmy Noether", C: "Hypatia", D: "Marie Curie" }, correct: "C" },
{ question: "Normal. How do you write 2026 in Roman numerals?", answers: { A: "MMXXVI", B: "MMXVI", C: "MCMXXVI", D: "MMXXIV" }, correct: "A" }, 
{ question: "Normal. What is the name of a polygon with 12 sides?", answers: { A: "Decagon", B: "Dodecagon", C: "Hendecagon", D: "Octagon" }, correct: "B" }, 
{ question: "Normal. Who discovered the golden ratio?", answers: { A: "Euclid", B: "Newton", C: "Euler", D: "Gauss" }, correct: "A" } 
], 
hardest: [ 
{ question: "Hard. Where is the Bangalore Institute of Mathematical Sciences (TIFR) located?", answers: { A: "India", B: "Japan", C: "China", D: "Korea" }, correct: "A" },
{ question: "Hard. In which city is the Max Planck Institute for Mathematics located?", answers: { A: "Berlin", B: "Bonn", C: "Munich", D: "Hamburg" }, correct: "B" },
{ question: "Hard. Where is the 'Mathematical Sciences Research Institute' (MSRI) located?", answers: { A: "Berkeley", B: "Stanford", C: "Princeton", D: "Harvard" }, correct: "A" },
{ question: "Hard. In which city was the 'Institut für Mathematik' in Göttingen founded?", answers: { A: "Berlin", B: "Göttingen", C: "Munich", D: "Frankfurt" }, correct: "B" },
{ question: "Hard. In which country was the mathematician Grothendieck born?", answers: { A: "Germany", B: "France", C: "Switzerland", D: "Belgium" }, correct: "B" },
{ question: "Hard. In which country was the mathematician Gödel born?", answers: { A: "Austria", B: "Czech Republic", C: "Germany", D: "Switzerland" }, correct: "B" },
{ question: "Hard. In which country was the mathematician Turing born?", answers: { A: "England", B: "Scotland", C: "Ireland", D: "Wales" }, correct: "A" },
{ question: "Hard. In which country was the mathematician Perelman born?", answers: { A: "Russia", B: "Ukraine", C: "Belarus", D: "Lithuania" }, correct: "A" }, 
{ question: "Hard. In which country was the mathematician Wiles born?", answers: { A: "England", B: "USA", C: "Canada", D: "Australia" }, correct: "A" }, 
{ question: "Hard. Which university has the oldest continuously active mathematics department?", answers: { A: "Oxford", B: "Cambridge", C: "Sorbonne", D: "Bologna" }, correct: "A" }, 
{ question: "Hard. In which city is the Institut Henri Poincaré?", answers: { A: "Lyon", B: "Marseille", C: "Paris", D: "Toulouse" }, correct: "C" }, 
{ question: "Hard. Where was the first Academy of Sciences (including mathematics) founded?", answers: { A: "London", B: "Paris", C: "Berlin", D: "Florence" }, correct: "D" },
{ question: "Hard. In which country is the Tata Institute of Fundamental Research located?", answers: { A: "India", B: "Japan", C: "China", D: "Korea" }, correct: "A" },
{ question: "Hard. Where was the first International Mathematical Congress held (1897)?", answers: { A: "Berlin", B: "Paris", C: "Zürich", D: "London" }, correct: "C" }
]
},




/* Questions 3, 8 and 13 */
funFacts: {
easy: [
{ question: "Easy. What is the only number that is both even and prime?", answers: { A: "0", B: "1", C: "2", D: "3" }, correct: "C" },
{ question: "Easy. How many hours are there in a week?", answers: { A: "144", B: "160", C: "168", D: "176" }, correct: "C" },
{ question: "Easy. In how many ways can 3 different objects be arranged in a row?", answers: { A: "3", B: "6", C: "9", D: "12" }, correct: "B" },
{ question: "Easy. In how many ways can 4 different objects be arranged in a row?", answers: { A: "12", B: "16", C: "24", D: "32" }, correct: "C" },
{ question: "Easy. What is the area of ​​a circle with a radius of 7 cm?", answers: { A: "49π", B: "14π", C: "21π", D: "28π" }, correct: "A" },
{ question: "Easy. What is the area of ​​a circle with a radius of 8 cm?", answers: { A: "16π", B: "64π", C: "32π", D: "8π" }, correct: "B" },
{ question: "Easy. What is the area of ​​a circle with a radius of 10 cm?", answers: { A: "20π", B: "50π", C: "100π", D: "10π" }, correct: "C" },
{ question: "Easy. What mathematical symbol do we use for approximately equal to?", answers: { A: "≈", B: "=", C: "≠", D: "≤" }, correct: "A" }, 
{ question: "Easy. What is the largest prime number less than 100?", answers: { A: "97", B: "91", C: "89", D: "99" }, correct: "A" }, 
{ question: "Easy. What is Pascal's triangle used for?", answers: { A: "Circle geometry", B: "Combinatorics and binomial coefficients", C: "Solving integrals", D: "Logarithmic functions" }, correct: "B" }, 
{ question: "Easy. After which mathematician is the method of dividing polynomials (Horner's method) named?", answers: { A: "Newton", B: "Horner", C: "Gauss", D: "Lagrange" }, correct: "B" }, 
{ question: "Easy. How many sides does a dodecahedron have?", answers: { A: "10", B: "12", C: "14", D: "16" }, correct: "B" },
{ question: "Easy. How many sides does 1+1 have in modular arithmetic mod 2?", answers: { A: "0", B: "1", C: "2", D: "Undefined" }, correct: "A" },
{ question: "Easy. What constant is approximately 2.718?", answers: { A: "π", B: "e", C: "φ", D: "γ" }, correct: "B" },
{ question: "Easy. What is the only number that cannot be written in Roman numerals?", answers: { A: "0", B: "1", C: "1000", D: "Million" }, correct: "A" },
{ question: "Easy. How many sides does cube?", answers: { A: "4", B: "6", C: "8", D: "12" }, correct: "B" },
{ question: "Easy. What does the prefix 'kilo' mean?", answers: { A: "100", B: "1000", C: "10000", D: "1000000" }, correct: "B" },
{ question: "Easy. What is the name of the triad of numbers in the Pythagorean theorem?", answers: { A: "Pythagorean triple", B: "Euclid triple", C: "Mathematical triple", D: "Geometric triple" }, correct: "A" },
{ question: "Easy. How many degrees does a full circle have?", answers: { A: "180°", B: "270°", C: "360°", D: "450°" }, correct: "C" },
{ question: "Easy. What is 0! (factorial of zero)?", answers: { A: "0", B: "1", C: "2", D: "Undefined" }, correct: "B" },
{ question: "Easy. What is the only digit that does not appear in the binary system?", answers: { A: "0", B: "1", C: "2", D: "None" }, correct: "C" },
{ question: "Easy. What is the smallest natural number that is neither prime nor composite?", answers: { A: "1", B: "2", C: "3", D: "4" }, correct: "A" },
{ question: "Easy. What is the sum of the angles in a triangle?", answers: { A: "360°", B: "90°", C: "270°", D: "180°" }, correct: "D" },
{ question: "Easy. If a plane crashes on the border of two countries, where are the survivors buried?", answers: { A: "In the first country", B: "In the second", C: "On the border", D: "They are not buried" }, correct: "D" }, 
{ question: "Easy. How many times a day do the clock hands coincide?", answers: { A: "12", B: "22", C: "24", D: "48" }, correct: "B" }, 
{ question: "Easy. Which of the offered numbers satisfies the condition that it is equal to the sum of its digits multiplied by 3?", answers: { A: "12", B: "18", C: "27", D: "36" }, correct: "C" }, 
{ question: "Easy. If the number increases by 20% and decreases by 20%, the result is:", answers: { A: "Bigger", B: "Smaller", C: "Same", D: "Depends" }, correct: "B" },
{ question: "Easy. How many diagonals does a square have?", answers: { A: "1", B: "2", C: "4", D: "6" }, correct: "B" },
{ question: "Easy. If you flip a coin 3 times, how many possible outcomes are there?", answers: { A: "6", B: "8", C: "4", D: "3" }, correct: "B" },
{ question: "Easy. What is the smallest number that is divisible by all the numbers from 1 to 5?", answers: { A: "20", B: "60", C: "30", D: "120" }, correct: "B" },
{ question: "Easy. What number is a palindrome?", answers: { A: "123", B: "121", C: "132", D: "231" }, correct: "B" },
{ question: "Easy. What is the sum of the infinite series 1/2 + 1/4 + 1/8 + ...?", answers: { A: "1", B: "2", C: "∞", D: "1/2" }, correct: "A" },
{ question: "Easy. If you have 5 different books, how many ways can you arrange them?", answers: { A: "25", B: "120", C: "60", D: "100" }, correct: "B" }
],
hard: [
{ question: "Normal. What is 2^10 + 2^10?", answers: { A: "1024", B: "2048", C: "4096", D: "512" }, correct: "B" },
{ question: "Normal. What is √2 to 2 decimal places?", answers: { A: "1.41", B: "1.42", C: "1.43", D: "1.44" }, correct: "A" },
{ question: "Normal. What is the smallest number that is divisible by 1 to 10?", answers: { A: "2520", B: "5040", C: "720", D: "360" }, correct: "A" },
{ question: "Normal. What is the value of 2^5?", answers: { A: "16", B: "32", C: "64", D: "128" }, correct: "B" },
{ question: "Normal. What is the maximum number of colors needed to color any map?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "B" },
{ question: "Normal. What is Goldbach's conjecture?", answers: { A: "Every even number is the sum of 2 primes", B: "There are infinitely many primes", C: "π is irrational", D: "e is transcendental" }, correct: "A" },
{ question: "Normal. How many Platonic solids are there?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "C" },
{ question: "Normal. What is the golden ratio approximately?", answers: { A: "1.414", B: "1.618", C: "2.718", D: "3.142" }, correct: "B" }, 
{ question: "Normal. What is 0.5 in percent?", answers: { A: "5%", B: "50%", C: "0.5%", D: "500%" }, correct: "B" }, 
{ question: "Normal. What is the shortest path between two points in a plane?", answers: { A: "Curve", B: "Parabola", C: "Zigzag", D: "Straight line" }, correct: "D" }, 
{ question: "Normal. How much is 2^0?", answers: { A: "2", B: "0", C: "1", D: "Undefined" }, correct: "C" }, 
{ question: "Normal. What is the decimal representation of the number 1/3?", answers: { A: "0.34", B: "0.3", C: "0.333", D: "0.333..." }, correct: "D" }, 
{ question: "Normal. What type of symmetry do butterfly wings show?", answers: { A: "Rotational symmetry", B: "Central symmetry", C: "Bilateral symmetry", D: "Translational symmetry" }, correct: "C" }, 
{ question: "Normal. The Roman numeral XC in Arabic notation is?", answers: { A: "90", B: "110", C: "80", D: "100" }, correct: "A" } 
], 
hardest: [ 
{ question: "Hard. What is the smallest common factor of numbers 15 and 20?", answers: { A: "45", B: "30", C: "75", D: "60" }, correct: "D" }, 
{ question: "Hard. What is √2 approximately (to 3 decimal places)?", answers: { A: "1.415", B: "1.416", C: "1.417", D: "1.414" }, correct: "D" },
{ question: "Hard. What is log10(1000)?", answers: { A: "2", B: "1", C: "4", D: "3" }, correct: "D" },
{ question: "Hard. Ko je uveo simbol za integral ∫?", answers: { A: "Leibniz", B: "Newton", C: "Euler", D: "Riemann" }, correct: "A" },
{ question: "Hard. Ko je poznat po formuli e^(iπ)+1=0?", answers: { A: "Gauss", B: "Fermat", C: "Euler", D: "Hilbert" }, correct: "C" },
{ question: "Hard. Ko je učestvovao u razvoju teorije vjerovatnoće sa Fermatom?", answers: { A: "Pascal", B: "Newton", C: "Leibniz", D: "Gauss" }, correct: "A" },
{ question: "Hard. Ko je autor hipoteze o raspodjeli prostih brojeva?", answers: { A: "Riemann", B: "Fermat", C: "Gauss", D: "Cantor" }, correct: "A" },
{ question: "Hard. Ko je razvio moderni pojam funkcije u matematici?", answers: { A: "Dirichlet", B: "Newton", C: "Euler", D: "Fermat" }, correct: "A" },
{ question: "Hard. Ko je povezan sa normalnom distribucijom u statistici?", answers: { A: "Poisson", B: "Laplace", C: "Gauss", D: "Bernoulli" }, correct: "C" },
{ question: "Hard. Ko je razvio geometrijski prikaz kompleksnih brojeva?", answers: { A: "Riemann", B: "Euler", C: "Gauss", D: "Argand" }, correct: "D" },
{ question: "Hard. Ko je riješio problem mostova u Königsbergu?", answers: { A: "Pitagora", B: "Gauss", C: "Newton", D: "Euler" }, correct: "D" },
{ question: "Hard. Ko je iz porodice koja je dala više poznatih matematičara?", answers: { A: "Gauss", B: "Pascal", C: "Leibniz", D: "Bernoulli" }, correct: "D" }
]
},
 


/* Questions 4, 9 and 14 */
interestingFacts: {
easy: [
{ question: "Easy. How many angles does a pentagon have?", answers: { A: "4", B: "5", C: "6", D: "7" }, correct: "B" },
{ question: "Easy. What is the sum of the first three prime numbers?", answers: { A: "8", B: "10", C: "12", D: "15" }, correct: "B" },
{ question: "Easy. How many edges does a tetrahedron have?", answers: { A: "4", B: "6", C: "8", D: "12" }, correct: "B" },
{ question: "Easy. How many are 1 + 2 + 3 + ... + 10?", answers: { A: "45", B: "50", C: "60", D: "55" }, correct: "D" },
{ question: "Easy. What is the sum of the interior angles of a pentagon?", answers: { A: "360°", B: "720°", C: "480°", D: "540°" }, correct: "D" },
{ question: "Easy. What is 5! (factorial of five)?", answers: { A: "60", B: "24", C: "720", D: "120" }, correct: "D" },
{ question: "Easy. If you roll two dice, what is the probability that you get a sum of 7?", answers: { A: "1/6", B: "1/12", C: "1/36", D: "1/3" }, correct: "A" },
{ question: "Easy. How many prime numbers are there less than 10?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "B" },
{ question: "Easy. What is the only number that is both a square and a prime?", answers: { A: "1", B: "4", C: "9", D: "None" }, correct: "D" },
{ question: "Easy. If x + x = x, what is x?", answers: { A: "1", B: "0", C: "2", D: "-1" }, correct: "B" },
{ question: "Easy. Who said 'Eureka!'?", answers: { A: "Pythagoras", B: "Euclid", C: "Archimedes", D: "Newton" }, correct: "C" },
{ question: "Easy. Who discovered the law of gravity?", answers: { A: "Galileo", B: "Newton", C: "Einstein", D: "Kepler" }, correct: "B" }, 
{ question: "Easy. What is the third angle in a triangle if the other two are 50° and 60°?", answers: { A: "70°", B: "65°", C: "80°", D: "75°" }, correct: "A" }, 
{ question: "Easy. If the number of grains of rice doubles on each subsequent square of the chessboard, starting from 1, how many grains are there on the 64th square?", answers: { A: "About 100 kg of rice", B: "One truckload of rice", C: "More than the total production of rice on Earth", D: "Impossible to calculate" }, correct: "C" }, 
{ question: "Easy. How many times can you fold paper of any dimensions (theoretically)?", answers: { A: "7 times", B: "12 times", C: "67", D: "Infinite" }, correct: "A" }, 
{ question: "Easy. How many lines can be drawn through 4 different points (in the general case)?", answers: { A: "3", B: "4", C: "6", D: "Undetermined" }, correct: "C" }, 
{ question: "Easy. What are collinear points?", answers: { A: "Points on the same circle", B: "Points on the same line", C: "Points in a plane", D: "Random points" }, correct: "B" }, 
{ question: "Easy. What are non-collinear points?", answers: { A: "Points on the same line", B: "Points that lie on a circle", C: "Points that do not lie on the same line", D: "Points in the same center" }, correct: "C" }, 
{ question: "Easy. What are the basic terms in geometry that are not defined?", answers: { A: "Point, line, plane", B: "Angle, length, circle", C: "Body, volume, surface", D: "Vector, matrix, function" }, correct: "A" }, 
{ question: "Easy. What was the name of the Greek school where the irrationality of numbers was discovered?", answers: { A: "Plato's Academy", B: "Pythagorean School", C: "Aristotle's School", D: "Euclid's School" }, correct: "B" }, 
{ question: "Easy. Which artist used mathematical proportions and the golden ratio in 'The Last Supper'?", answers: { A: "Michelangelo", B: "Leonardo da Vinci", C: "Raphael", D: "Donatello" }, correct: "B" }, 
{ question: "Easy. 1Where in nature can you find Fibonacci sequence?", answers: { A: "Only in trees", B: "In snowflakes and shells", C: "In human bones", D: "In all the examples listed" }, correct: "D" },
{ question: "Easy. What is a quadrilateral whose sides are all the same length but whose angles are not right angles called?", answers: { A: "Square", B: "Rectangle", C: "Rhombus", D: "Parallelogram" }, correct: "C" }
],
hard: [
{ question: "Normal. What is the smallest perfect number?", answers: { A: "1", B: "6", C: "28", D: "496" }, correct: "B" },
{ question: "Normal. Who is the father of modern computing?", answers: { A: "Ada Lovelace", B: "Alan Turing", C: "John von Neumann", D: "Charles Babbage" }, correct: "B" },
{ question: "Normal. Who introduced the symbol π?", answers: { A: "Euler", B: "Gauss", C: "Newton", D: "Wiliam Jones" }, correct: "D" },
{ question: "Normal. Who founded the modern theory of probability?", answers: { A: "Pascal", B: "Bernoulli", C: "Laplace", D: "Kolmogorov" }, correct: "D" },
{ question: "Normal. Who is known as the 'father of modern logic'?", answers: { A: "Aristotle", B: "Gödel", C: "Frege", D: "Boole" }, correct: "D" },
{ question: "Normal. Which mathematician formulated a theorem that remained unsolved for over 350 years, until 1994?", answers: { A: "Isaac Newton", B: "Pierre de Fermat", C: "Leonhard Euler", D: "Carl Friedrich Gauss" }, correct: "B" },{ question: "Normal. 79. What is the number known as the 'smallest Armstrong number'?", answers: { A: "370", B: "371", C: "407", D: "153" }, correct: "D" },
{ question: "Normal. What is both a square and a cube?", answers: { A: "1 and 64", B: "0 and 1", C: "1 and 729", D: "4 and 8" }, correct: "A" },
{ question: "Normal. What is e^(iπ) + 1?", answers: { A: "0", B: "1", C: "i", D: "-1" }, correct: "A" },
{ question: "Normal. What is the maximum number of points of intersection of n circles?", answers: { A: "n²", B: "n(n-1)", C: "2n", D: "n!" }, correct: "B" },
{ question: "Normal. What is the first Carmichael number?", answers: { A: "341", B: "451", C: "561", D: "671" }, correct: "C" },
{ question: "Normal. What is the number 2^8?", answers: { A: "512", B: "128", C: "1024", D: "256" }, correct: "D" },
{ question: "Normal. What is the value of sin(90°)?", answers: { A: "0", B: "0.5", C: "√2/2", D: "1" }, correct: "D" },
{ question: "Normal. The product of an odd and an even number is always?", answers: { A: "Odd", B: "Even", C: "Negative", D: "0" }, correct: "B" },
{ question: "Normal. The product of a positive and a negative number is?", answers: { A: "Positive", B: "0", C: "Negative", D: "Undetermined" }, correct: "C" },
{ question: "Normal. The sum of two negative numbers is?", answers: { A: "Positive", B: "Negative", C: "0", D: "Undetermined" }, correct: "B" },
{ question: "Normal. The product of two negative numbers is?", answers: { A: "Negative", B: "0", C: "Positive", D: "Undetermined" }, correct: "C" }, 
{ question: "Normal. What is the name of the average value of a set of data?", answers: { A: "Median", B: "Mode", C: "Arithmetic mean", D: "Variance" }, correct: "C" }, 
{ question: "Normal. What are the names of two angles whose sum is 90°?", answers: { A: "Supplementary", B: "Complementary", C: "Vertical", D: "Adjacent" }, correct: "B" }, 
{ question: "Normal. What are the names of two angles whose sum is 180°?", answers: { A: "Complementary", B: "Vertical", C: "Supplementary", D: "Parallel" }, correct: "C" }
],
hardest: [
{ question: "Hard. How many solutions in set of Natural numbers does the equation x³ + y³ = z³ have for natural numbers?", answers: { A: "Infinite", B: "1729", C: "0", D: "Unknown" }, correct: "C" },
{ question: "Hard. What is the density of primes at n?", answers: { A: "1/n", B: "1/ln(n)", C: "1/√n", D: "1/n²" }, correct: "B" },
{ question: "Hard. What is the Catalan constant G to 2 decimal places?", answers: { A: "0.85", B: "0.92", C: "1.08", D: "1.15" }, correct: "B" },
{ question: "Hard. What is the smallest non-trivial triperfect number?", answers: { A: "120", B: "672", C: "523776", D: "Unknown" }, correct: "C" },
{ question: "Hard. How many dimensions does a Leech lattice have?", answers: { A: "8", B: "16", C: "24", D: "32" }, correct: "C" },
{ question: "Hard. What is 0.999... (infinite repetition) in decimal form?", answers: { A: "0.9", B: "0.99", C: "Undefined", D: "1" }, correct: "D" }, 
{ question: "Hard. How much is 2^10 + 2^9?", answers: { A: "1024", B: "2048", C: "512", D: "1536" }, correct: "D" } 
]
},


/* Questions 5, 10 and 15 */
numbers: {
easy: [
{ question: "Easy. What is the smallest prime number?", answers: { A: "0", B: "1", C: "2", D: "3" }, correct: "C" },
{ question: "Easy. How many zeros are in a million?", answers: { A: "4", B: "5", C: "6", D: "7" }, correct: "C" },
{ question: "Easy. What is 2 to 10?", answers: { A: "512", B: "1024", C: "2048", D: "4096" }, correct: "B" },
{ question: "Easy. What number is perfect (equal to the sum of its divisors)?", answers: { A: "4", B: "6", C: "8", D: "10" }, correct: "B" },
{ question: "Easy. If there are 5 cats in a room and 5 more dogs enter, how many legs do they have?", answers: { A: "20", B: "40", C: "42", D: "44" }, correct: "B" },
{ question: "Easy. Two fathers and two sons catch 3 fish. Each gets one. How?", answers: { A: "Impossible", B: "Grandfather, father, son", C: "Divide one", D: "Release one" }, correct: "B" },
{ question: "Easy. If 3 cats have 12 legs, how many legs do 6 cats have?", answers: { A: "18", B: "30", C: "36", D: "24" }, correct: "D" },
{ question: "Easy. How many 2 + 2 * 2?", answers: { A: "4", B: "10", C: "8", D: "6" }, correct: "D" }, 
{ question: "Easy. What is 20% of 100?", answers: { A: "10", B: "30", C: "40", D: "20" }, correct: "D" }, 
{ question: "Easy. If 1/2 + 1/3 + 1/6 = ?", answers: { A: "2", B: "3", C: "0.5", D: "1" }, correct: "D" }, 
{ question: "Easy. Who said 'Eureka!'?", answers: { A: "Pythagoras", B: "Euclid", C: "Archimedes", D: "Newton" }, correct: "C" },
{ question: "Easy. If 5x = 25, what is x?", answers: { A: "10", B: "15", C: "20", D: "5" }, correct: "D" },
{ question: "Easy. What is 1/2 of 1/2?", answers: { A: "1/2", B: "1", C: "2", D: "1/4" }, correct: "D" },
{ question: "Easy. If today is Wednesday, what day will it be in 100 days?", answers: { A: "Friday", B: "Saturday", C: "Sunday", D: "Thursday" }, correct: "A" },
{ question: "Easy. How many ways are there to roll a die and get an even number?", answers: { A: "2", B: "3", C: "4", D: "5" }, correct: "B" },
{ question: "Easy. Which number has exactly 3 divisors?", answers: { A: "4", B: "6", C: "8", D: "12" }, correct: "A" },
{ question: "Easy. Which number has the most divisors between 1–20?", answers: { A: "12", B: "18", C: "20", D: "16" }, correct: "A" },
{ question: "Easy. Which number comes after 0, 1, 1, 2, 3 in the Fibonacci sequence?", answers: { A: "4", B: "5", C: "6", D: "8" }, correct: "B" },
{ question: "Easy. Which term describes an infinite set that can be counted?", answers: { A: "Uncountable", B: "Finite", C: "Thick", D: "Countable" }, correct: "D" },
{ question: "Easy. What is the third digit of π (after the decimal point)?", answers: { A: "3", B: "1", C: "4", D: "5" }, correct: "B" },
{ question: "Easy. What is the square root of 361?", answers: { A: "19", B: "20", C: "18", D: "21" }, correct: "A" },
{ question: "Easy. Which of these numbers is prime?", answers: { A: "21", B: "29", C: "39", D: "51" }, correct: "B" },
{ question: "Easy. What is the square of 21?", answers: { A: "441", B: "420", C: "400", D: "4410" }, correct: "A" },
{ question: "Easy. What is π to 2 decimal places?", answers: { A: "3.12", B: "3.14", C: "3.16", D: "3.18" }, correct: "B" }
],
hard: [
{ question: "Normal. What is the next prime number after 97?", answers: { A: "99", B: "101", C: "103", D: "107" }, correct: "B" },
{ question: "Normal. What is e (Euler's constant) to 2 decimals?", answers: { A: "2.52", B: "2.62", C: "2.72", D: "2.82" }, correct: "C" },
{ question: "Normal. Who discovered the law of gravity?", answers: { A: "Galileo", B: "Newton", C: "Einstein", D: "Kepler" }, correct: "B" },
{ question: "Normal. Who is famous for the theory of relativity?", answers: { A: "Newton", B: "Planck", C: "Bohr", D: "Einstein" }, correct: "D" },
{ question: "Normal. Who introduced the symbol π?", answers: { A: "Euler", B: "Gauss", C: "Newton", D: "William Jones" }, correct: "D" },
{ question: "Normal. Who founded the modern theory of probability?", answers: { A: "Pascal", B: "Bernoulli", C: "Laplace", D: "Kolmogorov" }, correct: "D" },
{ question: "Normal. Who is known as the 'father of modern logic'?", answers: { A: "Aristotle", B: "Gödel", C: "Frege", D: "Boole" }, correct: "D" },
{ question: "Normal. What is the golden ratio φ to 3 decimal places?", answers: { A: "1.414", B: "1.618", C: "1.732", D: "2.236" }, correct: "B" },
{ question: "Normal. Who developed set theory?", answers: { A: "Dedekind", B: "Cantor", C: "Hilbert", D: "Frege" }, correct: "B" }, 
{ question: "Normal. Who solved the cubic equation in the 16th century?", answers: { A: "Cardano", B: "Tartaglia", C: "Ferrari", D: "Viète" }, correct: "A" }, 
{ question: "Normal. Who made the first mechanical calculating machine?", answers: { A: "Babbage", B: "Pascal", C: "Leibniz", D: "Schickard" }, correct: "D" }, 
{ question: "Normal. Who proved that e is transcendent?", answers: { A: "Hermite", B: "Lindemann", C: "Cantor", D: "Weierstrass" }, correct: "A" }, 
{ question: "Normal. Who discovered non-Euclidean geometry?", answers: { A: "Gauss", B: "Bolyai", C: "Lobachevsky", D: "All of the above" }, correct: "D" },
{ question: "Normal. Who developed group theory in its modern form?", answers: { A: "Noether", B: "Jordan", C: "Lagrange", D: "Galois" }, correct: "D" },
{ question: "Normal. Who introduced the symbol ∑ for sum?", answers: { A: "Gauss", B: "Leibniz", C: "Bernoulli", D: "Euler" }, correct: "D" },
{ question: "Normal. Who discovered the theory of linear algebra?", answers: { A: "Gauss", B: "Euler", C: "Hilbert", D: "Cayley" }, correct: "D" },
{ question: "Normal. Who proved that the set of real numbers is uncountable?", answers: { A: "Gödel", B: "Hilbert", C: "Dedekind", D: "Cantor" }, correct: "D" },
{ question: "Normal. Who introduced the concept of 'operator' in mathematics?", answers: { A: "Heisenberg", B: "Dirac", C: "von Neumann", D: "Hilbert" }, correct: "D" },
{ question: "Normal. A hotel with infinite rooms is full. A new person arrives. Can it fit?", answers: { A: "No", B: "Yes", C: "Only in the hallway", D: "Depends on the room" }, correct: "B" },
{ question: "Normal. Monty Hall problem: do you change the door?", answers: { A: "Yes", B: "No", C: "Anyway", D: "Depends" }, correct: "A" },
{ question: "Normal. Birthday paradox: How many people does it take for there to be a 50% chance that two people share a birthday?", answers: { A: "183", B: "100", C: "50", D: "23" }, correct: "D" },
{ question: "Normal. What is 2 + 2 × 2 - 2 / 2?", answers: { A: "5", B: "7", C: "4", D: "6" }, correct: "A" },
{ question: "Normal. What number is 3 times greater than 1/3?", answers: { A: "2", B: "3", C: "4", D: "1" }, correct: "D" },
{ question: "Normal. If x = 2 and y = 3, what is x^y?", answers: { A: "6", B: "9", C: "8", D: "27" }, correct: "C" }
],
hardest: [
{ question: "Hard. What is the value of the Apéry constant ζ(3) to 2 decimal places?", answers: { A: "1.20", B: "1.50", C: "1.80", D: "2.10" }, correct: "A" },
{ question: "Hard. How many digits does Googolplex have?", answers: { A: "10^100", B: "10^(10^100)", C: "10^1000", D: "10^10000" }, correct: "B" },
{ question: "Hard. What is Graham's number G1?", answers: { A: "3↑↑3", B: "3↑↑↑↑3", C: "3→3→3", D: "3^(3^27)" }, correct: "B" },
{ question: "Hard. Mersenne numbers are a special class of prime numbers. Which organization is primarily responsible for discovering the largest known prime numbers?", answers: { A: "NASA", B: "GIMPS", C: "CERN", D: "MIT" }, correct: "B" }, 
{ question: "Hard. Who proved the Taniyama-Shimura hypothesis for semistationary elliptic curves?", answers: { A: "Andrew Wiles", B: "Richard Taylor", C: "Goro Shimura", D: "Yutaka Taniyama" }, correct: "A" }, 
{ question: "Hard. Who won the 2014 Fields Medal for work on dynamical systems?", answers: { A: "Maryam Mirzakhani", B: "Manjul Bhargava", C: "Artur Avila", D: "Martin Hairer" }, correct: "C" },
{ question: "Hard. Who declined the 2006 Fields Medal?", answers: { A: "Terence Tao", B: "Grigori Perelman", C: "Andrei Okounkov", D: "Wendelin Werner" }, correct: "B" },
{ question: "Hard. Who developed category theory?", answers: { A: "Samuel Eilenberg", B: "Saunders Mac Lane", C: "Alexander Grothendieck", D: "A and B" }, correct: "D" },
{ question: "Hard. Who solved Hilbert's 10th problem?", answers: { A: "Turing", B: "Church", C: "Matiyasevich", D: "Gödel" }, correct: "C" },
{ question: "Hard. Who introduced category theory together with Mac Lane?", answers: { A: "Grothendieck", B: "Lawvere", C: "Kan", D: "Eilenberg" }, correct: "D" },
{ question: "Hard. Who formulated the theory of relativity in mathematical form?", answers: { A: "Einstein", B: "Lorentz", C: "Riemann", D: "Minkowski" }, correct: "D" },
{ question: "Hard. Who first defined the term 'mathematical logic' in its modern form?", answers: { A: "Gödel", B: "Turing", C: "Russell", D: "Frege" }, correct: "D" }, 
{ question: "Hard. Who discovered the 'four color' theorem (first proved by computer)?", answers: { A: "Fourier", B: "Gauss", C: "Euler", D: "Appel i Haken" }, correct: "D" }, 
{ question: "Hard. Who was the first to prove Fermat's last theorem?", answers: { A: "Fermat", B: "Taylor", C: "Taniyama", D: "Wiles" }, correct: "D" }, 
{ question: "Hard. The Banach-Tar paradox claims that you can?", answers: { A: "Cut into 5 parts and fold into 2 balls", B: "Stretch infinitely", C: "Compress to a point", D: "Rotate in 4D" }, correct: "A" }, 
{ question: "Hard. Gabriel's Horn has?", answers: { A: "Finite volume, infinite area", B: "Infinite volume, finite area", C: "Both finite", D: "Both infinite" }, correct: "A" }, 
{ question: "Hard. What is the sum of 1+2+3+4+... to infinity in the analytical sense (Ramanujan sum)?", answers: { A: "∞", B: "-1/12", C: "Diverges", D: "0" }, correct: "B" },
{ question: "Hard. What is 1/0 in mathematics?", answers: { A: "0", B: "∞", C: "1", D: "Undefined" }, correct: "D" },
{ question: "Hard. What is the value of log(1)?", answers: { A: "1", B: "Undefined", C: "∞", D: "0" }, correct: "D" },
{ question: "Hard. What is √(-1)?", answers: { A: "-i", B: "1", C: "Undefined", D: "i" }, correct: "D" },
{ question: "Hard. What is the value of sin(0)?", answers: { A: "1", B: "-1", C: "Undefined", D: "0" }, correct: "D" }
]
}
},


ge: {


/* Questions 1, 6 and 11 */
history: {
easy: [
  { question: "Koliko je godina imao Neil Armstrong kad je hodao po Mjesecu?", answers: { A: "67", B: "21", C: "36", D: "38" }, correct: "D" },
  { question: "Koji je hemijski element Marie Curie nazvala po svojoj domovini kako bi skrenula pažnju na to da ona u to vrijeme nije bila nezavisna država?", answers: { A: "Germanij", B: "Francij", C: "Polonij", D: "Europij" }, correct: "C" },
  { question: "Koje su boje dva slova G u Googleovom logu?", answers: { A: "Plave", B: "Crvene", C: "Žute", D: "Zelene" }, correct: "A" },
  { question: "Koliko sekundi traje svjetlosti da pređe udaljenost od Mjeseca do Zemlje (približno)?", answers: { A: "0.5", B: "1.3", C: "2.0", D: "3.5" }, correct: "B" },
  { question: "Koliko sekundi bi svjetlosti trebalo da obiđe oko Zemlje na ekvatoru (sedam i po krugova)?", answers: { A: "0.13", B: "1.5", C: "5.0", D: "10.0" }, correct: "A" },
  { question: "Koliko država u Aziji ima direktan izlaz na more ili okean?", answers: { A: "26", B: "36", C: "16", D: "46" }, correct: "B" },
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
  { question: "Koji je najstariji pisani ep na svijetu?", answers: { A: "Ilijada", B: "Odiseja", C: "", D: "Ep o Gilgamešu" }, correct: "D" },
  { question: "Koja planeta ima najviše poznatih prirodnih satelita?", answers: { A: "Jupiter", B: "Saturn", C: "Uran", D: "Neptun" }, correct: "B" },
  { question: "Koji dio ljudskog mozga je odgovoran za ravnotežu i koordinaciju?", answers: { A: "Veliki mozak", B: "Mali mozak", C: "Produžena moždina", D: "Hipotalamus" }, correct: "B" },
  { question: "Koji vitamin je ključan za zgrušavanje krvi?", answers: { A: "Vitamin A", B: "Vitamin B12", C: "Vitamin C", D: "Vitamin K" }, correct: "D" },
  { question: "Koji organ u ljudskom tijelu proizvodi inzulin?", answers: { A: "Gušterača", B: "Jetra", C: "Bubrezi", D: "Slezena" }, correct: "A" },
  { question: "Trgovac delicijama Richard Hellman postigao je bogatstvo prodajom kojeg dodatka jelima?", answers: { A: "Kečap", B: "Ajvar", C: "Senf", D: "Majoneza" }, correct: "D" },
  { question: "U kojem su Lovrakovu romanu glavni likovi 3 đaka iz Jabukovca koji pohađaju 4. razred?", answers: { A: "Družba Pere Kvržice", B: "Nevidljiva Iva", C: "Max i Maestral", D: "Vlak u snijegu" }, correct: "D" },
  { question: "Koja je površinom najveća država na svijetu u kojoj je ćirilica službeno pismo?", answers: { A: "Ukrajina", B: "Kazahstan", C: "Rusija", D: "Bjelorusija" }, correct: "C" },
  { question: "Koji naziv dijeli poglavar derviškog reda sa šahovskim pojmom za kraj partije?", answers: { A: "šah", B: "mat", C: "rokada", D: "pat" }, correct: "B" },
  { question: "Koji troslovni grad u istočnoj Srbiji je poznat po velikim nalazištima bakra?", answers: { A: "Bor", B: "Niš", C: "Zaj", D: "Kru" }, correct: "A" },
  { question: "U delti koje rijeke se nalazi ruski grad Astrahan?", answers: { A: "Don", B: "Dnjepar", C: "Ural", D: "Volga" }, correct: "D" }
],
hard: [ 
  { question: "Pravilan trodimenzionalni raspored građevnih čestica kristala nazivamo kristalna-što?", answers: { A: "Mreža", B: "Rešetka", C: "Struktura", D: "Forma" }, correct: "B" },
  { question: "Na koju se konvenciju poziva kada se govori o pravilnom postupanju s ratnim zarobljenicima?", answers: { A: "Helsinšku", B: "Rimsku", C: "Ženevsku", D: "Parišku" }, correct: "C" },
  { question: "Kako se zove popis književnih djela koja su učenici, prema nastavnom planu obavezni pročitati?", answers: { A: "Syllabus", B: "Lektira", C: "Kanon", D: "Plan čitanja" }, correct: "B" },
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
  { question: "Koja država ima najviše susjednih država u Africi?", answers: { A: "Sudan", B: "DR Kongo", C: "Tanzanija", D: "Niger" }, correct: "B" },
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
  { question: "Kroz koji se drevni mikenski grad može ući kroz čuvena 'Lavlja vrata'?", answers: { A: "Troja", B: "Mikena", C: "Knosos", D: "Sparta" }, correct: "B" },
  { question: "Jezero Nyasa (Malawi) čini više od petine površine koje afričke države?", answers: { A: "Zambija", B: "Malavi", C: "Tanzanija", D: "Mozambik" }, correct: "B" },
  { question: "Kako se u hemiji nazivaju soli ugljične kiseline?", answers: { A: "Sulfati", B: "Nitratu", C: "Karbonati", D: "Fosfati" }, correct: "C" },
  { question: "Koja je jedina monarhija među pet stalnih članica Vijeća sigurnosti UN-a?", answers: { A: "Francuska", B: "Kina", C: "Ujedinjeno Kraljevstvo", D: "SAD" }, correct: "C" },
  { question: "Koja je jedina država Latinske Amerike u kojoj je službeni jezik francuski?", answers: { A: "Gvajana", B: "Ekvador)", C: "Haiti", D: "Surinam" }, correct: "C" },
  { question: "Koja država učestvuje u ragbi turniru 6 nacija uz Francusku, Englesku, Irsku, Škotsku i Wales?", answers: { A: "Italija", B: "Njemačka", C: "Španija", D: "Nizozemska" }, correct: "A" },
  { question: "Kakva je tjelesna temperatura kod dijagnoze 'status febrilis'?", answers: { A: "Snižena", B: "Normalna", C: "Povišena", D: "Trenutna" }, correct: "C" },
  { question: "Kako se zove najniži i najživčaniji brat Dalton u Lucky Lukeu?", answers: { A: "William", B: "Jack", C: "Averell", D: "Joe" }, correct: "D" },
  { question: "Koja borilačka vještina potiče iz Japana i fokusira se na bacanja i kontrolu protivnika?", answers: { A: "Kendo", B: "Judo", C: "Karate", D: "Aikido" }, correct: "B" },
  { question: "Na granici Mađarske s kojom državom se nalaze prijelazi Horgoš 1 i Horgoš 2?", answers: { A: "Hrvatska", B: "Rumunija", C: "Srbija", D: "Slovačka" }, correct: "C" },
  { question: "Koji njemački general je imao nadimak 'Wüstenfuchs' (Pustinjska lisica)?", answers: { A: "Rommel", B: "Guderian", C: "Keitel", D: "Manstein" }, correct: "A" },
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
  { question: "Mesing je legura koja dva metala?", answers: { A: "bakra i cinka", B: "zlata i bakra", C: "zlata i kalaja", D: "kalaja i bakra" }, correct: "A" },
  { question: "Kada kažemo “Vječni grad” mislimo na", answers: { A: "Paris", B: "Rim", C: "London", D: "Atinu" }, correct: "B" },
  { question: "Koja država je prva osvojila Eurosong nakon uvođenja televotinga (1997.)?", answers: { A: "Hrvatska", B: "Irska", C: "Njemačka", D: "Ujedinjeno Kraljevstvo" }, correct: "D" },
  { question: "Gdje se nalazi pustinja Gobi?", answers: { A: "Africi", B: "Sjevernoj Americi", C: "Aziji", D: "Australiji" }, correct: "C" },
  { question: "Do kojeg poena se igra PETI set u odbojci?", answers: { A: "10", B: "15", C: "20", D: "25" }, correct: "B" },
  { question: "Dinamometar služi za mjerenje?", answers: { A: "Sile", B: "brzine", C: "napona", D: "gustine" }, correct: "A" },
  { question: "Koje dvije države dijele rekord s najviše pobjeda (7) na Eurosongu zaključno s 2025. godinom?", answers: { A: "Švedska i Irska", B: "Francuska i Njemačka", C: "Velika Britanija i Švedska", D: "Irska i Italija" }, correct: "A" },
  { question: "Sva organska jedinjenja sadrže?", answers: { A: "azot", B: "kisik", C: "vodik", D: "ugljik" }, correct: "D" },
  { question: "Koliko sati je potrebno svjetlosti da stigne od Sunca do najudaljenije planete, Neptuna?", answers: { A: "Oko 1 sat", B: "Oko 4 sata", C: "Oko 10 sati", D: "Oko 24 sata" }, correct: "B" },
  { question: "Koji igrač drži rekord po broju golova na jednom Svjetskom prvenstvu?", answers: { A: "Miroslav Klose", B: "Just Fontaine", C: "Ronaldo Nazário", D: "Gerd Müller" }, correct: "B" },
  { question: "Koji se engleski izraz koristi za napuštenu zgradu koju ljudi bespravno nastanjuju?", answers: { A: "squat", B: "loft", C: "block", D: "slum" }, correct: "A" },
  { question: "Koji engleski moreplovac je 1581. proglašen vitezom nakon oplovljavanja svijeta?", answers: { A: "James Cook", B: "Francis Drake", C: "Walter Raleigh", D: "Henry Hudson" }, correct: "B" },
  { question: "Topologija je grana?", answers: { A: "geografije", B: "matematike", C: "biologije", D: "lingvistike" }, correct: "B" },
  { question: "Koje je boje instrument koji snima podatke o letu aviona?", answers: { A: "žute", B: "naranđaste", C: "crvene", D: "crne" }, correct: "B" },
  { question: "Četiri bajta se sastoje od?", answers: { A: "4 bita", B: "12 bitova", C: "16 bitova", D: "128 bitova" }, correct: "C" },
  { question: "U kojoj zemlji se nalazi najveći vodopad u Evropi?", answers: { A: "Island", B: "Finska", C: "Švedska", D: "Norveška" }, correct: "D" },
  { question: "Kako se zove staroslavenska boginja proljeća?", answers: { A: "Lada", B: "Lela", C: "Živna", D: "Vesna" }, correct: "D" },
  { question: "Koji se talijanizam koristi za ispravljanje ili poništavanje pogrešno uknjižene stavke u knjigovodstvu?", answers: { A: "Saldo", B: "Storno", C: "Rabat", D: "Lombard" }, correct: "B" },
  { question: "U kojem se gradu nalazi Hajdučka česma, mjesto održavanja koncerta s kultnog live-albuma „Bijelog dugmeta“?", answers: { A: "Sarajevo", B: "Split", C: "Beograd", D: "Zagreb" }, correct: "C" },
  { question: "Gdje su se prvo počele koristiti papirne novčanice?", answers: { A: "Kina", B: "Egipat", C: "Grčka", D: "Engleska" }, correct: "A" },
  { question: "Koji udarac u boksu se izvodi rukom koja je bliža protivniku?", answers: { A: "Krosover", B: "Direkt", C: "Džeb", D: "Aperkat" }, correct: "C" },
  { question: "Koji je jedini glavni grad na svijetu koji direktno graniči sa dvije države?", answers: { A: "Bratislava", B: "Beč", C: "Ljubljana", D: "Prag" }, correct: "A" }

]
},



/* Questions 2, 7 and 12 */
geography: {
easy: [
  { question: "Najdublje jezero na svijetu je?", answers: { A: "Kaspijsko", B: "Viktorijino", C: "Balkajsko", D: "Boračko" }, correct: "C" },
  { question: "Koji je najbrži putujući signal u ljudskom tijelu (brzina nervnog impulsa)?", answers: { A: "Do 120 m/s", B: "Do 10 m/s", C: "Do 500 m/s", D: "Do 1000 m/s" }, correct: "A" },
  { question: "Koliko država u Africi nema izlaz na more (kopnene države)?", answers: { A: "5", B: "16", C: "30", D: "45" }, correct: "B" },
  { question: "Koliko sekundi traje jedan puni srčani ciklus (otkucaj) kod prosječne odrasle osobe u mirovanju?", answers: { A: "0.8 sekundi", B: "1.5 sekundi", C: "2.2 sekunde", D: "3.0 sekunde" }, correct: "A" },
  { question: "Koliko litara krvi prosječno struji kroz tijelo odrasle osobe?", answers: { A: "3 litra", B: "5 litara", C: "7 litara", D: "1 litar" }, correct: "B" },
  { question: "Koja je najčešća krvna grupa na svijetu?", answers: { A: "A+", B: "B-", C: "0+", D: "AB+" }, correct: "C" },
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
  { question: "Koliko bitova čini jedan standardni bajt (byte)?", answers: { A: "4", B: "8", C: "16", D: "32" }, correct: "B" },
  { question: "Koliko pari hromozoma ima čovjek u somatskim ćelijama?", answers: { A: "22", B: "23", C: "24", D: "44" }, correct: "B" },
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
  { question: "Koja država u Aziji (i na svijetu) ima najdužu obalnu liniju zahvaljujući svojim ostrvima?", answers: { A: "Kina", B: "Indonezija", C: "Indija", D: "Japan" }, correct: "B" },
  { question: "Koji film ima najviše osvojenih Oskara u historiji (vezano s drugim filmovima na vrhu liste)?", answers: { A: "Titanic", B: "The Lord of the Rings: The Return of the King", C: "Ben-Hur", D: "Sve navedeno imaju isti rekord" }, correct: "D" },
  { question: "Iz koje je Čolićeve pjesme stih „Izgledaš mi kao lutkica iz Trsta“?", answers: { A: "Pusti, pusti modu", B: "Ti si mi u krvi", C: "Produži dalje", D: "Jedina" }, correct: "A" },
  { question: "Za automobil koji ima i benzinski i elektro-motor kažemo da se kreće na-kakav pogon?", answers: { A: "Električni", B: "Hibridni", C: "Benzinski", D: "Dizelski" }, correct: "B" },
  { question: "Kugla koje boje,u snookeru,nakon crne vrijedi najviše bodova?", answers: { A: "Roza", B: "Plava", C: "Crvena", D: "Žuta" }, correct: "A" },
  { question: "Koje godine je održana prva zvanična sezona Svjetskog prvenstva Formule 1?", answers: { A: "1920.", B: "1950.", C: "1975.", D: "1990." }, correct: "B" },
  { question: "Koliko se trocifrenih brojeva u skupu prirodnih brojeva može dobiti od cifara 0 i 1?", answers: { A: "1", B: "2", C: "3", D: "4" }, correct: "D" },
  { question: "Kako se nazivaju lutke s pokretnim udovima koje lutkar pomiče povlačeći konce?", answers: { A: "Marionete", B: "Mimovi", C: "Pantomime", D: "Figurice" }, correct: "A" },
  { question: "Po kojoj su pjesmi „Beatlesa“ nazvani igrači Villarreala zbog prepoznatljive boje dresova?", answers: { A: "Hey Jude", B: "Yellow Submarine", C: "Let It Be", D: "Help!" }, correct: "B" },
  { question: "Ako je vjerovati Normanu Batesu,“dječakov najbolji prijatelj je njegova“-ko?", answers: { A: "Sestra", B: "Žena", C: "Brat", D: "Majka" }, correct: "D" },
  { question: "Približno koliko nervnih ćelija (neurona) ima ljudski mozak?", answers: { A: "1 milion", B: "86 milijardi", C: "500 milijardi", D: "1 trilion" }, correct: "B" },
  { question: "U kojem je gradu u junu 2011. započeta nikad dovršena turneja Amy Winehouse?", answers: { A: "London", B: "Zagreb", C: "Dubrovnik", D: "Beograd" }, correct: "D" },
  { question: "Koji se latinizam koristi za skup postupaka ili sredstava za sprječavanje začeća?", answers: { A: "Antisepsa", B: "Sterilizacija", C: "Kontracepcija", D: "Prevencija" }, correct: "C" },
  { question: "Koji je kontroverzni umjetnik napisao svojevrsnu autobiografiju „Dnevnik genija“?", answers: { A: "Pablo Picasso", B: "Salvador Dali", C: "Frida Kahlo", D: "Andy Warhol" }, correct: "B" },
  { question: "U koju državu za božićne praznike putuje porodica McCallister u prvom dijelu serijala „Sam u kući“?", answers: { A: "Italiju", B: "Francusku", C: "Englesku", D: "Njemačku" }, correct: "B" },
  { question: "Kako se uobičajeno nazivaju narodi bez stalne postojbine koji se se stalno sele?", answers: { A: "Migranti", B: "Musafiri", C: "Kolonisti", D: "Nomadi" }, correct: "D" },
  { question: "Kako se na latinskom zove kršćanska molitva „Zdravo Marijo“?", answers: { A: "Ave Maria", B: "Ave Cezar", C: "Servus Maria", D: "Santa Maria" }, correct: "A" }
]
},




/* Questions 3, 8 and 13 */
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
  { question: "Koji je jedini organ koji se može regenerirati u velikoj mjeri?", answers: { A: "Srce", B: "Mozak", C: "Jetra", D: "Pluća" }, correct: "C" },
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
  { question: "Kako se, kod trougla, zove dužina koja spaja vrh trokuta s polovištem suprotne stranice?", answers: { A: "Simetrala", B: "Težišnica", C: "Visina", D: "Medijana" }, correct: "B" },
  { question: "U logu koje se internetske enciklopedije nalazi nedovršena kugla od puzzli?", answers: { A: "Britannica", B: "WikiLeaks", C: "ChatGPT", D: "Wikipedia" }, correct: "D" },
  { question: "Kako se zove glavni grad Pakistana iz čijeg imena možemo zaključiti koja je većinska religija njegovih stanovnika?", answers: { A: "Karachi", B: "Lahore", C: "Islamabad", D: "Peshawar" }, correct: "C" },
  { question: "Koji je grad domaćin automobilističke Velike nagrade Australije i teniskog Australian opena?", answers: { A: "Sydney", B: "Brisbane", C: "Melbourne", D: "Perth" }, correct: "C" },
  { question: "Kako jednom riječju nazivamo zemlje sjeverozapadne Afrike Alžir, Maroko, Libiju i Tunis?", answers: { A: "Levant", B: "Magreb", C: "Sahel", D: "Sahara" }, correct: "B" },
  { question: "U kojem su gradu sjedište Europske svemirske agencije, OECD-a i UNESCO-a?", answers: { A: "Ženevi", B: "Bruxellesu", C: "Parizu", D: "Berlinu" }, correct: "C" },
  { question: "Koji je reper 1999. osnovao diskografsku kuću Shady Records?", answers: { A: "Dr. Dre", B: "Eminem", C: "50 Cent", D: "Snoop Dogg" }, correct: "B" },
  { question: "Kako se zove potez kada igrač u odbojci snažno udara loptu prema protivničkom terenu?", answers: { A: "Blok", B: "Servis", C: "Smash", D: "Dig" }, correct: "C" },
  { question: "Kako se u anatomiji zovu sitni mjehurići u jajniku, štitnoj žlijezdi ili uz korijen dlake?", answers: { A: "Vezikule", B: "Alveole", C: "Folikule", D: "Tubule" }, correct: "C" },
  { question: "Kako još zovemo gmizavce, prema njihovom latinskom imenu?", answers: { A: "Amfibije", B: "Reptili", C: "Mammalia", D: "Aves" }, correct: "B" },
  { question: "Koji je europski glavni grad podijeljen na 23 distrikta?", answers: { A: "Berlin", B: "Prag", C: "Beč", D: "Budimpešta" }, correct: "C" },
  { question: "Koji se bosansko-hercegovački grad u doba Jugoslavije zvao Pucarevo?", answers: { A: "Zenica", B: "Travnik", C: "Novi Travnik", D: "Bugojno" }, correct: "C" },
  { question: "Koje je boje 5 zvijezda petokraka na kineskoj zastavi?", answers: { A: "Crvene", B: "Plave", C: "Žute", D: "Bijele" }, correct: "C" },
  { question: "Roman „Gospođica Dalloway“ prikazuje koliko dana u životu naslovne junakinje?", answers: { A: "Jedan", B: "Dva", C: "Sedam", D: "Trideset" }, correct: "A" },
  { question: "Koji je basnopisac, prema predaji, bačen s litice nakon što je lažno optužen za krađu u delfskom hramu?", answers: { A: "Ezop", B: "Homer", C: "Sofoklo", D: "Herodot" }, correct: "A" },
  { question: "Koliko centimetara ima stopa?", answers: { A: "25.48 cm", B: "28.50 cm", C: "30.48 cm", D: "33.48 cm" }, correct: "C" },
  { question: "Koliko sekundi traje maksimalno držanje lopte u rukometu bez dodavanja ili šuta?", answers: { A: "11", B: "3", C: "24", D: "8" }, correct: "D" },
  { question: "Koliko kostiju ima ljudsko tijelo odrasle osobe?", answers: { A: "206", B: "201", C: "216", D: "198" }, correct: "A" },
  { question: "Koliko izmjena maksimalno dozvoljava FIFA u regularnoj fudbalskoj utakmici (od 2020-ih pravila)?", answers: { A: "3", B: "4", C: "5", D: "6" }, correct: "C" },
  { question: "Koliko setova maksimalno može trajati tenis meč u muškoj Grand Slam konkurenciji?", answers: { A: "3", B: "5", C: "7", D: "6" }, correct: "B" },
  { question: "Kojim slovom počinju imena najvećeg broja europskih glavnih gradova?", answers: { A: "S", B: "D", C: "A", D: "B" }, correct: "D" },
  { question: "Šta je Petar Pan izgubio u sobi Wendy Darling, pa mu je ona to kasnije sašila nazad?", answers: { A: "cipelu", B: "kapu", C: "rukavicu", D: "sjenu" }, correct: "D" },
  { question: "Kinologija je nauka koja se bavi proučavanjem i uzgojem kojih životinja?", answers: { A: "mačke", B: "konji", C: "ptice", D: "psi" }, correct: "C" },
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
  { question: "Koji je igrač „Borussije Dortmund“ 2015. u 9 minuta „Wolfsburgu“ zabio 5 puta?", answers: { A: "Mats Hummels", B: "Jude Bellingem", C: "Marco Reus", D: "Robert Lewandowski" }, correct: "D" },
  { question: "Koji postotak zemljina kopna zauzimaju otoci?", answers: { A: "7%", B: "10%", C: "15%", D: "20%" }, correct: "A" },
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
  { question: "Kako nazivamo dio drveta koji ostaje uz korijen kad se stablo otpili i sruši?", answers: { A: "Panj", B: "Grana", C: "Koren", D: "Trupac" }, correct: "A" },
  { question: "Auto-oznaka koje je države prva na abecednom popisu međunarodnih registracijskih oznaka?", answers: { A: "Albanije", B: "Andore", C: "Australije", D: "Austrije" }, correct: "D" },
  { question: "U kojem se gradu nalazi Kupola na stijeni, najstarija islamska građevina na svijetu?", answers: { A: "Meki", B: "Medini", C: "Damasku", D: "Jerusalemu" }, correct: "D" },
  { question: "Na kojem su otoku Cagliari i Sassari najveći gradovi?", answers: { A: "Siciliji", B: "Korzici", C: "Sardiniji", D: "Malti" }, correct: "C" },
  { question: "Koji je narod dao najveći broj papa u povijesti?", answers: { A: "Francuzi", B: "Španci", C: "Argentinci", D: "Talijani" }, correct: "D" },
  { question: "Kojem serijalu pripada film „Sila se budi“ iz 2015?", answers: { A: "Gospodar prstenova", B: "Star Trek", C: "Ratovi zvijezda", D: "Matrix" }, correct: "C" },
  { question: "Koja je pasmina pasa nazvana po najvećem kanadskom poluotoku?", answers: { A: "Husky", B: "Labrador", C: "Malamut", D: "Golden retriever" }, correct: "B" },
  { question: "Koja NBA ekipa ima najviše osvojenih titula u historiji?", answers: { A: "Los Angeles Lakers", B: "Boston Celtics", C: "Chicago Bulls", D: "Golden State Warriors" }, correct: "B" },
  { question: "Koja visina mreže je standardna u muškoj odbojci?", answers: { A: "2.24 m", B: "2.35 m", C: "2.43 m", D: "2.50 m" }, correct: "C" },
  { question: "Koja država je najtrofejnija u ženskoj odbojci na Olimpijskim igrama (do 2025.)?", answers: { A: "Kina", B: "Brazil", C: "SAD", D: "Rusija" }, correct: "C" }



]
},
 


/* Questions 4, 9 and 14 */
interestingFacts: {
easy: [
  { question: "Koja je pješačka vojska Osmanskog carstva ukinuta 1826.?", answers: { A: "Spahije", B: "Janjičari", C: "Mamluci", D: "Sipahi" }, correct: "B" },
  { question: "Koja reprezentacija je osvojila Svjetsko prvenstvo 2018. godine?", answers: { A: "Njemačka", B: "Francuska", C: "Argentina", D: "Brazil" }, correct: "B" },
  { question: "Koji je najprodavaniji gaming konzol u historiji?", answers: { A: "PlayStation 2", B: "PS5", C: "Xbox 360", D: "Nintendo Switch" }, correct: "A" },
  { question: "Koji grad ima metro koji radi bez vozača (prvi u svijetu)?", answers: { A: "London", B: "Dubai", C: "Tokio", D: "Pariz" }, correct: "D" },
  { question: "Koliko prirodnih satelita (mjeseca) ima planeta Mars?", answers: { A: "0", B: "2", C: "15", D: "60" }, correct: "B" },
  { question: "Koja je najduža i najjača kost u ljudskom tijelu?", answers: { A: "Rebro", B: "Bedrena kost", C: "Ključna kost", D: "Lakatna kost" }, correct: "B" },
  { question: "Gdje se nalazi najmanja kost u ljudskom tijelu (uzengija/stapes)?", answers: { A: "U nosu", B: "U stopalu", C: "U uhu", D: "U šaci" }, correct: "C" },
  { question: "Koliko kostiju ima ljudsko stopalo (jedno stopalo)?", answers: { A: "20", B: "22", C: "24", D: "26" }, correct: "D" },
  { question: "Koja država ima najviše aktivnih vulkana?", answers: { A: "Japan", B: "Indonezija", C: "Island", D: "Italija" }, correct: "B" },
  { question: "Koji je prvi film koji je zaradio preko 1 milijarde dolara?", answers: { A: "Titanic", B: "Avatar", C: "Avatar 2", D: "Ratovi zvijezda" }, correct: "A" },
  { question: "Koja je najbrža životinja na planeti?", answers: { A: "Gepard", B: "Sivi sokol", C: "Lav", D: "Antilopa" }, correct: "B" },
  { question: "Koja država je prva legalizovala bitcoin kao zakonito sredstvo plaćanja?", answers: { A: "El Salvador", B: "Japan", C: "Švicarska", D: "Njemačka" }, correct: "A" },
  { question: "Koji je najgledaniji YouTube video svih vremena?", answers: { A: "Baby Shark", B: "Despacito", C: "Gangnam Style", D: "Shape of You" }, correct: "A" },
  { question: "Koja igra je najigranija video igra svih vremena?", answers: { A: "Minecraft", B: "GTA V", C: "Tetris", D: "Fortnite" }, correct: "C" },
  { question: "Koja knjiga je najviše puta prevedena na svijetu nakon Biblije?", answers: { A: "Mali princ", B: "Don Kihot", C: "Harry Potter", D: "Alkemičar" }, correct: "A" },
  { question: "Koja država ima najviše piramida?", answers: { A: "Egipat", B: "Sudan", C: "Meksiko", D: "Peru" }, correct: "B" },
  { question: "Koja je dinastija vladala Kinom u periodu 'Zlatnog doba' (618–907), kada je cvjetala poezija i trgovina Putem svile?", answers: { A: "Ming", B: "Han", C: "Jang", D: "Tang" }, correct: "D" },
  { question: "Ko je bio prvi rimski car?", answers: { A: "Julije Cezar", B: "Romul i Rem", C: "Neron", D: "August" }, correct: "D" },
  { question: "Koja država nakon Rusije ima najviše granica s drugim državama u Evropi?", answers: { A: "Mađarska", B: "Švicarska", C: "Francuska", D: "Njemačka" }, correct: "D" },
  { question: "Koja država ima najviše aktivnih vulkana u Evropi?", answers: { A: "Italija", B: "Kipar", C: "Grčka", D: "Island" }, correct: "B" },
  { question: "Koja je najmanja država na svijetu po površini?", answers: { A: "Monako", B: "San Marino", C: "Vatikan", D: "Lihtenštajn" }, correct: "C" },
  { question: "Koji kontinent ima najveći broj država?", answers: { A: "Afrika", B: "Azija", C: "Evropa", D: "Južna Amerika" }, correct: "A" },
  { question: "Picasso i Braque najvažniji su predstavnici slikarskog pravca nazvanog po kojem geometrijskom tijelu?", answers: { A: "Kugli", B: "Piramidi", C: "Kocki", D: "Valjku" }, correct: "C" },
  { question: "Koja je naljepnica dokaz o plaćenoj vožnji autocestama?", answers: { A: "Vinjeta", B: "Toll pass", C: "Sticker pass", D: "Cestarina ACC" }, correct: "A" },
  { question: "Koji naziv dijele azijska kraljevina i alkan s 4 atoma ugljika?", answers: { A: "Butan", B: "Propan", C: "Pentan", D: "Etan" }, correct: "A" },
  { question: "Kojim se turcizmom u nas naziva cvijet neke voćke?", answers: { A: "Đul", B: "Behar", C: "Lale", D: "Zumbul" }, correct: "B" },
  { question: "Talijanski fašisti nose crne košulje, a brazilski integralisti košulje koje boje?", answers: { A: "Plave", B: "Crvene", C: "Bijele", D: "Zelene" }, correct: "D" },
  { question: "Na kojem mjestu na listi najvećih otoka na svijetu se nalazi Velika Britanija?", answers: { A: "3.", B: "5.", C: "7.", D: "9." }, correct: "D" },
  { question: "Koji je grčki komediograf još davno, u svojim „Magarcima“, utvrdio da je „čovjek čovjeku vuk“?", answers: { A: "Aristofan", B: "Plaut", C: "Sofoklo", D: "Euripid" }, correct: "B" },
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
  { question: "Koji je najduži poznati riječnički palindrom u engleskom jeziku koji ima smisleno značenje u lingvistici?", answers: { A: "Never odd or even", B: "Madam I'm Adam", C: "A man a plan a canal Panama", D: "No lemon no melon" }, correct: "C" },
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
  { question: "Na kojoj stazi je održana prva zvanična trka Formule 1 Svjetskog prvenstva 1950. godine?", answers: { A: "Monza", B: "Silverstone", C: "Spa-Francorchamps", D: "Monaco" }, correct: "B" },
  { question: "Kojem planetu treba približno 88 zemaljskih dana za jedan obilazak oko Sunca?", answers: { A: "Venera", B: "Merkur", C: "Mars", D: "Pluton" }, correct: "B" },
  { question: "Koji čikaški košarkaški klub na svom grbu ima most?", answers: { A: "Chicago Bulls", B: "Chicago Bears", C: "Chicago Sky", D: "Golden State Warriors" }, correct: "A" },
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
  { question: "Koje je nebesko tijelo u Pixarovom crtiću ukrao zločesti Gru?", answers: { A: "Sunce", B: "Mjesec", C: "Mars", D: "Zvijezdu" }, correct: "B" },
  { question: "Koji motor proizvođač je osvojio najviše uzastopnih konstruktorskih titula kao dobavljač motora u modernoj eri (V6 hibrid era od 2014.)?", answers: { A: "Ferrari", B: "Honda", C: "Renault", D: "M" }, correct: "D" },
  { question: "S koja 2 slova se označava srednja tvrdoća olovaka?", answers: { A: "HH", B: "H", C: "BB", D: "HB" }, correct: "D" },
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


/* Questions 5, 10 and 15 */
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
{ question: "U kojoj se američkoj saveznoj državi nalazi Philadelphija, peti najmnogoljudniji američki grad?", answers: { A: "Pennsylvaniji", B: "New York", C: "Ohio", D: "Virginia" }, correct: "A" },
{ question: "Koji prekomorski teritorij ima na zastavi crvenu tvrđavu i zlatni ključ?", answers: { A: "Kipar", B: "Bermuda", C: "Falklandi", D: "Gibraltar" }, correct: "A" },
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
{ question: "Upalu kojeg organa ljudskog tijela nazivamo anetodermija?", answers: { A: "Srca", B: "Pluća", C: "Jetre", D: "Kože" }, correct: "D" },
{ question: "Na čelu kojeg je glavnog grada Sadiq Khan, sunitski musliman porijeklom iz Pakistana?", answers: { A: "Berlina", B: "Madrida", C: "Cardiffa", D: "London" }, correct: "D" },
{ question: "Koje je jelo uzrok slučajnog poljupca u Disneyjevu klasiku „Dama i skitnica“?", answers: { A: "Pizza", B: "Hamburger", C: "Doner", D: "Špageti" }, correct: "D" },
{ question: "Kako se prezivala balerina Ana po kojoj je nazvana torta od šećera, bjelanjka, slatkog vrhnja i jagoda?", answers: { A: "Kirov", B: "Pavlova", C: "Nijinska", D: "Volkova" }, correct: "B" },
{ question: "Ovlaštenje koje zastupnici dobivaju od birača za zastupanje u parlamentu zove se zastupnički – što?", answers: { A: "Mandat", B: "Dekret", C: "Amandman", D: "Statut" }, correct: "A" },
{ question: "Koja je država domovina mačkice Hello Kitty?", answers: { A: "Japan", B: "Kina", C: "Južna Koreja", D: "Tajland" }, correct: "A" },
{ question: "U kojem se dijelu Ujedinjenog Kraljevstva nalazi grad Londonderry?", answers: { A: "Škotska", B: "Wales", C: "Engleska", D: "Sjeverna Irska" }, correct: "D" },
{ question: "Po kojem je američkom gradu nazvana pizza duboka tri inča kojoj se sastojci slažu i unutra i na površini?", answers: { A: "New York", B: "Los Angeles", C: "Chicago", D: "Boston" }, correct: "C" },
{ question: "Koja je plastična igračka tema velikog hita grupe Aqua iz 1997?", answers: { A: "Lutka Barbie", B: "Teddy Bear", C: "Lego", D: "Playmobil" }, correct: "A" },
{ question: "Koji je treći po veličini australski grad glavni grad Queenslanda?", answers: { A: "Sydney", B: "Melbourne", C: "Brisbane", D: "Perth" }, correct: "C" },
{ question: "Koliko je, od 1963, bilo baklji na grbu SFRJ?", answers: { A: "5", B: "6", C: "7", D: "8" }, correct: "B" },
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
{ question: "Na koju se bjelančevinu u crvenim krvnim stanicama ugljikov monoksid veže 20 puta brže od kisika?", answers: { A: "Mioglobin", B: "Keratin", C: "Hemoglobin", D: "Fibrinogen" }, correct: "C" },
{ question: "U kojoj je disciplini Japanac Noriaki Kasai na zimskim olimpijskim igrama nastupio rekordnih 7 puta?", answers: { A: "Plivanje", B: "Biatlon", C: "Skijaško trčanje", D: "Skijaški skokovi" }, correct: "D" },
{ question: "Koja je država četiri puta organizirala ljetne olimpijske igre?", answers: { A: "SAD", B: "Francuska", C: "Grčka", D: "Japan" }, correct: "A" },
{ question: "Koja najveća i najsjevernija regija Finske zauzima više od četvrtine ukupne površine te zemlje?", answers: { A: "Uusimaa", B: "Laponija", C: "Savo", D: "Ostrobotnija" }, correct: "B" },
{ question: "Koji je sport 6. februara 1971. astronaut Alan Shepard zaigrao na Mjesecu?", answers: { A: "Tenis", B: "Košarka", C: "Golf", D: "Bejzbol" }, correct: "C" },
{ question: "Koliko minuta traje jedna četvrtina utakmice u evropskoj košarci?", answers: { A: "11", B: "8", C: "12", D: "10" }, correct: "D" },
{ question: "Koliko crnih tipki ima standardni koncertni klavir?", answers: { A: "34", B: "36", C: "38", D: "40" }, correct: "B" },
{ question: "Koliko bijelih tipki ima standardni koncertni klavir?", answers: { A: "44", B: "48", C: "50", D: "52" }, correct: "D" },
{ question: "Koliko dana traje jedna godina na planeti Mars (približno)?", answers: { A: "365", B: "687", C: "424", D: "780" }, correct: "B" },
{ question: "Koliko kostiju ima ljudska lobanja (odrasla osoba)?", answers: { A: "22", B: "24", C: "26", D: "28" }, correct: "A" },
{ question: "Koliko minuta traje jedan hokejaški period u NHL-u?", answers: { A: "15", B: "18", C: "20", D: "25" }, correct: "C" },
{ question: "Koji je prvi programabilni računar opće namjene u historiji?", answers: { A: "ENIAC", B: "Z3", C: "UNIVAC I", D: "Colossus" }, correct: "B" },
{ question: "Koja životinja ima najveći omjer veličine mozga i tijela u morskom svijetu?", answers: { A: "Delfin", B: "Hobotnica", C: "Kit ubica", D: "Ajkula" }, correct: "B" },
{ question: "Koji grad je bio glavni centar civilizacije Maja na poluostrvu Jukatan?", answers: { A: "Teotihuacan", B: "Chichen Itza", C: "Tikal", D: "Monte Alban" }, correct: "B" },
{ question: "Koji je najveći poznati prosti broj otkriven do početka 2025. godine (poznat i kao M136279841)?", answers: { A: "2^136,279,841 - 1", B: "2^82,589,933 - 1", C: "2^77,232,917 - 1", D: "2^61 - 1" }, correct: "A" },
{ question: "Koja knjiga se smatra prvom knjigom štampanom pomoću pokretnih metalnih slova u Evropi?", answers: { A: "Gutenbergova Biblija", B: "Kur'an", C: "Ilijada", D: "Mahabharata" }, correct: "A" },
{ question: "Koji naučnik je prvi izveo eksperiment sa klatnom kojim je dokazao rotaciju Zemlje?", answers: { A: "Newton", B: "Galileo", C: "Foucault", D: "Kepler" }, correct: "C" },
{ question: "Koji je najduži nerv u ljudskom tijelu?", answers: { A: "Isijadični nerv", B: "Optički nerv", C: "Vagus nerv", D: "Radijalni nerv" }, correct: "A" },
{ question: "Koji od navedenih metala ima najnižu tačku topljenja nakon žive, te se može otopiti na dlanu ruke?", answers: { A: "Galij", B: "Francij", C: "Cink", D: "Cezij" }, correct: "D" }
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

  const seen = new Set(getSeenQuestions());

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

  // ❌ ukloni već viđena
  const filterSeen = (arr) =>
    arr.filter(q => !seen.has(makeQuestionId(q)));

  const selectedEasy = shuffleArray(filterSeen(easy)).slice(0, 5);
  const selectedHard = shuffleArray(filterSeen(hard)).slice(0, 5);
  const selectedHardest = shuffleArray(filterSeen(hardest)).slice(0, 5);

  selectedQuestions = [
    ...selectedEasy,
    ...selectedHard,
    ...selectedHardest
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
        friendMessage = " Mislim da je tačan odgovor pod: " + friendAnswer;

      // 10% NE ZNA (HUMOR)
      } else if (rand < 0.90) {
        const jokes = [
          "Izvini batice, stvarno ne znam ovo pitanje... puno sreće 🍀",
          "Brate ovo je preteško, ne bih da te slažem 😅",
          "Ovo nisam nikad čuo, žao mi je.. "
        ];
        friendAnswer = q.correct;
        friendMessage = jokes[Math.floor(Math.random() * jokes.length)];

      // 5% POGRIJEŠI
      } else if (rand < 0.95) {
        const wrongOptions = ['A', 'B', 'C', 'D'].filter(a => a !== q.correct);
        friendAnswer = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        friendMessage = `🤔 Nisam siguran... ali mislim da je: ${friendAnswer} (Nemoj me držati za riječ.. 😬)`;

      // 5% “100% SIGURAN”
      } else {
        friendAnswer = q.correct;
        friendMessage = `100% sam siguran! Tačan odgovor je pod: ${friendAnswer} nema greške, siuuu! 🔥`;
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
