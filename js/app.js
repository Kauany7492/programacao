/* ──────────────────────────────────────────────────────────────────────── */
/* Data */
/* ──────────────────────────────────────────────────────────────────────── */

const timelineEvents = [
    { year: "1801", label: "Tear de Jacquard", desc: "Joseph-Marie Jacquard cria o tear programável com cartões perfurados — o primeiro uso de código binário para automatizar um processo." },
    { year: "1822", label: "Máquina Analítica", desc: "Charles Babbage projeta o primeiro computador mecânico em Londres, baseado nos cartões perfurados de Jacquard." },
    { year: "1843", label: "Primeiro Algoritmo", desc: "Ada Lovelace escreve o primeiro método para calcular a sequência de Bernoulli usando a máquina de Babbage." },
    { year: "1947", label: "Assembly", desc: "Kathleen Booth cria a linguagem Assembly na Inglaterra, traduzindo zeros e uns em palavras compreensíveis." },
    { year: "1972", label: "Linguagem C", desc: "Dennis Ritchie cria a linguagem C — a mãe das linguagens modernas, base de Linux, Windows, Java, Python e muito mais." },
    { year: "1995", label: "JavaScript", desc: "Brendan Eich cria o JavaScript para a Netscape, tornando a web interativa. Hoje é a linguagem mais usada no mundo." },
    { year: "Hoje", label: "Era Digital", desc: "A programação permeia toda a sociedade: bancos, redes sociais, transporte, saúde e comunicação dependem diretamente dela." },
];

const quizQuestions = [
    {
        question: "Quem é considerado o pai da programação?",
        options: ["Alan Turing", "Charles Babbage", "Joseph-Marie Jacquard", "Dennis Ritchie"],
        correct: 2,
        explanation: "Joseph-Marie Jacquard criou em 1801 o tear programável com cartões perfurados, sendo o pioneiro no uso de código binário para automatizar um processo."
    },
    {
        question: "Em que ano foi criada a linguagem Assembly?",
        options: ["1843", "1947", "1972", "1995"],
        correct: 1,
        explanation: "A linguagem Assembly foi criada em 1947 por Kathleen Booth na Inglaterra, tornando o código binário mais compreensível ao traduzir zeros e uns em palavras."
    },
    {
        question: "Quem criou a linguagem C?",
        options: ["Brendan Eich", "Kathleen Booth", "Ada Lovelace", "Dennis Ritchie"],
        correct: 3,
        explanation: "Dennis Ritchie criou a linguagem C em 1972. Ela se tornou a base de praticamente todas as linguagens e sistemas operacionais modernos."
    },
    {
        question: "O que a linguagem C representa para a programação moderna?",
        options: ["A linguagem mais difícil", "A mãe das linguagens atuais", "A primeira linguagem de programação", "A linguagem do futuro"],
        correct: 1,
        explanation: "A linguagem C é chamada de 'mãe das linguagens atuais', pois serviu de base para C#, Java, JavaScript, PHP, Python e sistemas como Linux, Unix e Windows."
    },
    {
        question: "Em que ano foi lançado o JavaScript?",
        options: ["1972", "1985", "1993", "1995"],
        correct: 3,
        explanation: "O JavaScript foi lançado em 1995 por Brendan Eich, enquanto trabalhava para a Netscape, com o objetivo de tornar os sites mais interativos."
    },
    {
        question: "Quem criou o JavaScript?",
        options: ["Dennis Ritchie", "Brendan Eich", "Alan Turing", "Tim Berners-Lee"],
        correct: 1,
        explanation: "Brendan Eich foi contratado pela Netscape para criar uma linguagem 'pequena' que tornasse os sites interativos — e assim nasceu o JavaScript."
    },
    {
        question: "Qual linguagem de programação foi desenvolvida no Brasil?",
        options: ["Python", "Ruby", "Lua", "Pascal"],
        correct: 2,
        explanation: "Lua é uma linguagem criada em 1993 no Brasil, sendo uma das poucas linguagens de impacto global desenvolvidas fora dos EUA ou Europa."
    },
    {
        question: "Qual era o princípio de funcionamento do tear de Jacquard?",
        options: ["Cabos elétricos ligados/desligados", "Cartões perfurados representando 0 e 1", "Sequências de letras em código", "Engrenagens mecânicas numeradas"],
        correct: 1,
        explanation: "O tear de Jacquard usava cartões perfurados: furo = 1, sem furo = 0. Esse código binário definia a passagem dos fios, automatizando o padrão do tecido."
    },
];

/* ──────────────────────────────────────────────────────────────────────── */
/* Application State */
/* ──────────────────────────────────────────────────────────────────────── */

const appState = {
    currentTab: 'inicio',
    activeTimelineIndex: null,
    quizAnswers: new Array(quizQuestions.length).fill(null),
    quizSubmitted: false,
    menuOpen: false,
};

/* ──────────────────────────────────────────────────────────────────────── */
/* DOM Elements */
/* ──────────────────────────────────────────────────────────────────────── */

const elements = {
    menuToggle: document.getElementById('menuToggle'),
    menuOverlay: document.getElementById('menuOverlay'),
    mobileMenu: document.getElementById('mobileMenu'),
    tabs: document.querySelectorAll('[data-tab]'),
    tabContents: document.querySelectorAll('.tab-content'),
    timelineDetail: document.getElementById('timelineDetail'),
    quizForm: document.getElementById('quizForm'),
    submitBtn: document.getElementById('submitBtn'),
    answeredCount: document.getElementById('answeredCount'),
    quizResult: document.getElementById('quizResult'),
    resetBtn: document.getElementById('resetBtn'),
};

/* ──────────────────────────────────────────────────────────────────────── */
/* Tab Navigation */
/* ──────────────────────────────────────────────────────────────────────── */

function switchTab(tabId) {
    // Close mobile menu if open
    closeMobileMenu();
    
    // Update state
    appState.currentTab = tabId;
    
    // Hide all tab contents
    elements.tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Show active tab content
    const activeContent = document.getElementById(`tab-${tabId}`);
    if (activeContent) {
        activeContent.classList.add('active');
    }
    
    // Update active buttons
    elements.tabs.forEach(tab => {
        const isActive = tab.dataset.tab === tabId;
        tab.classList.toggle('active', isActive);
    });
    
    // Update sidebar links
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.toggle('active', link.dataset.tab === tabId);
    });
    
    // Update mobile header buttons
    document.querySelectorAll('.mobile-actions .tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    
    // Update mobile menu items
    document.querySelectorAll('.mobile-menu-item').forEach(item => {
        item.classList.toggle('active', item.dataset.tab === tabId);
    });
    
    // Handle quiz-specific initialization
    if (tabId === 'quiz' && !appState.quizInitialized) {
        initializeQuiz();
        appState.quizInitialized = true;
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ──────────────────────────────────────────────────────────────────────── */
/* Mobile Menu */
/* ──────────────────────────────────────────────────────────────────────── */

function toggleMobileMenu() {
    appState.menuOpen = !appState.menuOpen;
    updateMobileMenuUI();
}

function closeMobileMenu() {
    appState.menuOpen = false;
    updateMobileMenuUI();
}

function updateMobileMenuUI() {
    const isOpen = appState.menuOpen;
    elements.mobileMenu.classList.toggle('active', isOpen);
    elements.menuOverlay.classList.toggle('active', isOpen);
    
    if (isOpen) {
        elements.menuToggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    } else {
        elements.menuToggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    }
}

/* ──────────────────────────────────────────────────────────────────────── */
/* Timeline */
/* ──────────────────────────────────────────────────────────────────────── */

function renderTimelineItems() {
    // Render desktop timeline dots
    const timelineDots = document.querySelectorAll('.timeline-dot');
    timelineDots.forEach((dot, index) => {
        dot.textContent = timelineEvents[index].year;
        dot.addEventListener('click', () => selectTimelineItem(index));
    });
    
    // Render mobile timeline
    const mobileTimeline = document.querySelector('.timeline-vertical');
    mobileTimeline.innerHTML = '';
    
    timelineEvents.forEach((event, index) => {
        const item = document.createElement('button');
        item.className = 'timeline-item';
        item.innerHTML = `
            <button class="timeline-dot" data-index="${index}">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <circle cx="6" cy="6" r="3"/>
                </svg>
            </button>
            <div>
                <div class="timeline-year" style="font-family: 'Courier Prime', monospace; font-size: 0.75rem; color: #d4a017; font-weight: 700;">${event.year}</div>
                <div class="timeline-label" style="font-family: 'Courier Prime', monospace; font-size: 0.875rem; color: rgba(245, 245, 245, 0.9);">${event.label}</div>
                <div class="timeline-desc" style="display: none; margin-top: 0.5rem; font-size: 0.75rem; color: #9ca3af; font-family: 'DM Sans', sans-serif; line-height: 1.5;">${event.desc}</div>
            </div>
        `;
        item.addEventListener('click', () => selectTimelineItem(index));
        mobileTimeline.appendChild(item);
    });
}

function selectTimelineItem(index) {
    // Toggle if already selected (for mobile)
    if (appState.activeTimelineIndex === index) {
        appState.activeTimelineIndex = null;
    } else {
        appState.activeTimelineIndex = index;
    }
    
    updateTimelineUI();
}

function updateTimelineUI() {
    const index = appState.activeTimelineIndex;
    
    // Update desktop timeline dots
    document.querySelectorAll('.timeline-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    // Update mobile timeline
    document.querySelectorAll('.timeline-item').forEach((item, i) => {
        const desc = item.querySelector('.timeline-desc');
        if (i === index) {
            desc.style.display = 'block';
        } else {
            desc.style.display = 'none';
        }
    });
    
    // Update detail panel (desktop only)
    if (index !== null) {
        const event = timelineEvents[index];
        elements.timelineDetail.innerHTML = `
            <div class="timeline-detail-title">${event.year} — ${event.label}</div>
            <p class="timeline-detail-desc">${event.desc}</p>
        `;
        elements.timelineDetail.classList.add('active');
    } else {
        elements.timelineDetail.classList.remove('active');
    }
}

/* ──────────────────────────────────────────────────────────────────────── */
/* Quiz */
/* ──────────────────────────────────────────────────────────────────────── */

function initializeQuiz() {
    renderQuizForm();
    updateQuizUI();
}

function renderQuizForm() {
    elements.quizForm.innerHTML = '';
    
    quizQuestions.forEach((question, qIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.dataset.questionIndex = qIndex;
        
        let questionHTML = `
            <div class="question-header">
                <span class="question-number">${qIndex + 1}.</span>
                <p class="question-text">${question.question}</p>
            </div>
            <div class="question-options">
        `;
        
        question.options.forEach((option, oIndex) => {
            questionHTML += `
                <button 
                    class="option" 
                    data-option-index="${oIndex}"
                    onclick="selectQuizAnswer(${qIndex}, ${oIndex})"
                >
                    <span class="option-letter">${String.fromCharCode(65 + oIndex)})</span>
                    ${option}
                </button>
            `;
        });
        
        questionHTML += `
            </div>
        `;
        
        questionDiv.innerHTML = questionHTML;
        elements.quizForm.appendChild(questionDiv);
    });
}

function selectQuizAnswer(qIndex, aIndex) {
    if (appState.quizSubmitted) return;
    
    appState.quizAnswers[qIndex] = aIndex;
    updateQuizUI();
}

function submitQuiz() {
    if (appState.quizAnswers.some(a => a === null)) return;
    
    appState.quizSubmitted = true;
    updateQuizUI();
}

function resetQuiz() {
    appState.quizAnswers = new Array(quizQuestions.length).fill(null);
    appState.quizSubmitted = false;
    updateQuizUI();
    renderQuizForm();
}

function updateQuizUI() {
    const submitting = appState.quizSubmitted;
    const answered = appState.quizAnswers.filter(a => a !== null).length;
    
    // Update answered count
    if (!submitting) {
        elements.answeredCount.textContent = `${answered}/${quizQuestions.length} respondidas`;
        elements.answeredCount.classList.remove('hidden');
    } else {
        elements.answeredCount.classList.add('hidden');
    }
    
    // Update submit button
    const allAnswered = appState.quizAnswers.every(a => a !== null);
    elements.submitBtn.disabled = !allAnswered || submitting;
    
    // Update options styling
    document.querySelectorAll('.question').forEach((questionDiv, qIndex) => {
        const question = quizQuestions[qIndex];
        const userAnswer = appState.quizAnswers[qIndex];
        const isCorrect = userAnswer === question.correct;
        
        if (submitting) {
            questionDiv.classList.remove('question');
            if (isCorrect) {
                questionDiv.classList.add('correct');
            } else if (userAnswer !== null) {
                questionDiv.classList.add('incorrect');
            }
        }
        
        questionDiv.querySelectorAll('.option').forEach((option, oIndex) => {
            const isSelected = userAnswer === oIndex;
            const isCorrectOption = oIndex === question.correct;
            
            option.classList.remove('selected', 'correct', 'incorrect', 'disabled-other');
            option.disabled = submitting;
            
            if (!submitting && isSelected) {
                option.classList.add('selected');
            } else if (submitting) {
                if (isCorrectOption) {
                    option.classList.add('correct');
                } else if (isSelected && !isCorrectOption) {
                    option.classList.add('incorrect');
                } else {
                    option.classList.add('disabled-other');
                }
            }
        });
        
        // Show/hide explanation
        let explanationDiv = questionDiv.querySelector('.question-explanation');
        
        if (submitting && !isCorrect && userAnswer !== null) {
            if (!explanationDiv) {
                explanationDiv = document.createElement('div');
                explanationDiv.className = 'question-explanation';
                questionDiv.appendChild(explanationDiv);
            }
            explanationDiv.innerHTML = `
                <svg class="explanation-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="12 1 3 21 12 17 21 21 12 1"></polyline>
                </svg>
                <p class="explanation-text">${question.explanation}</p>
            `;
        } else if (explanationDiv) {
            explanationDiv.remove();
        }
    });
    
    // Update result panel
    if (submitting) {
        const score = appState.quizAnswers.filter((a, i) => a === quizQuestions[i].correct).length;
        const total = quizQuestions.length;
        
        let resultClass = 'failure';
        let message = 'Continue estudando! Releia os tópicos para fixar o conteúdo.';
        
        if (score === total) {
            resultClass = 'success';
            message = 'Perfeito! Você domina a história da programação.';
        } else if (score >= 6) {
            resultClass = 'success';
            message = 'Ótimo resultado! Você conhece bem o conteúdo.';
        } else if (score >= 4) {
            resultClass = 'partial';
            message = 'Bom trabalho! Revise os tópicos que errou.';
        }
        
        elements.quizResult.className = `quiz-result ${resultClass}`;
        elements.quizResult.innerHTML = `
            <div class="quiz-result-score">${score}/${total} acertos</div>
            <div class="quiz-result-message">${message}</div>
        `;
        
        elements.resetBtn.classList.add('visible');
        elements.submitBtn.style.display = 'none';
    } else {
        elements.quizResult.classList.add('hidden');
        elements.resetBtn.classList.remove('visible');
        elements.submitBtn.style.display = 'block';
    }
}

/* ──────────────────────────────────────────────────────────────────────── */
/* Event Listeners */
/* ──────────────────────────────────────────────────────────────────────── */

// Menu toggle
elements.menuToggle.addEventListener('click', toggleMobileMenu);
elements.menuOverlay.addEventListener('click', closeMobileMenu);

// Tab navigation - all sources
document.addEventListener('click', (e) => {
    if (e.target.closest('[data-tab]')) {
        const tabId = e.target.closest('[data-tab]').dataset.tab;
        switchTab(tabId);
    }
});

// Mobile menu items
document.querySelectorAll('.mobile-menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = item.dataset.tab;
        switchTab(tabId);
    });
});

// Quiz form submit
elements.quizForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitQuiz();
});

// Reset button
elements.resetBtn.addEventListener('click', resetQuiz);

/* ──────────────────────────────────────────────────────────────────────── */
/* Initialization */
/* ──────────────────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
    // Render timeline
    renderTimelineItems();
    
    // Initialize first tab
    switchTab('inicio');
    
    // Set up keyboard shortcuts (optional)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && appState.menuOpen) {
            closeMobileMenu();
        }
    });
});

/* ──────────────────────────────────────────────────────────────────────── */
/* Utility Functions */
/* ──────────────────────────────────────────────────────────────────────── */

// Smooth scroll for all anchor links
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
