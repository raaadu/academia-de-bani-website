export const EXERCISES = [
  {
    id: 'q1',
    category: 'banci',
    level: 'incepator',
    xp: 25,
    format: 'danger',
    sceneIcon: '💸',
    sceneTitle: { ro: 'Transfer bancar online', en: 'Online Bank Transfer' },
    question: {
      ro: 'Maria vrea să trimită bani online fratelui ei. De ce are nevoie obligatoriu?',
      en: 'Maria wants to send money online to her brother. What does she absolutely need?',
    },
    options: {
      ro: ['Numărul de telefon', 'IBAN-ul', 'CNP-ul', 'Adresa fizică'],
      en: ['His phone number', 'The IBAN', 'His national ID number', 'His physical address'],
    },
    correct: 1,
    explanation: {
      ro: 'IBAN-ul este identificatorul unic al unui cont bancar pentru orice transfer electronic. Fără el, banca nu știe unde să trimită banii.',
      en: 'The IBAN is the unique identifier of a bank account for any electronic transfer. Without it, the bank does not know where to send the money.',
    },
  },
  {
    id: 'q2',
    category: 'banci',
    level: 'incepator',
    xp: 25,
    format: 'timeline',
    sceneIcon: '💰',
    sceneTitle: { ro: '5.000 RON la saltea — 3 ani', en: '5,000 RON under the mattress — 3 years' },
    timelineType: 'shrink',
    timelineYears: [0, 1, 2, 3],
    timelineValues: [5000, 4630, 4281, 3956],
    question: {
      ro: 'Ion ține 5.000 RON cash acasă de 3 ani. Inflația medie a fost 8%/an. Ce s-a întâmplat cu puterea lui de cumpărare?',
      en: 'Ion keeps 5,000 RON cash at home for 3 years. Average inflation was 8%/year. What happened to his purchasing power?',
    },
    options: {
      ro: ['A crescut', 'A rămas la fel', 'A scăzut cu ~22%', 'A scăzut cu 8%'],
      en: ['It increased', 'It stayed the same', 'It decreased by ~22%', 'It decreased by 8%'],
    },
    correct: 2,
    explanation: {
      ro: 'La 8% inflație anuală timp de 3 ani, puterea de cumpărare scade cu aproximativ 22% (formula: 1 - (1/1.08³) = 1 - 0.794 = 0.206 ≈ 22%).',
      en: 'At 8% annual inflation for 3 years, purchasing power drops by approximately 22% (formula: 1 - (1/1.08³) = 1 - 0.794 = 0.206 ≈ 22%).',
    },
  },
  {
    id: 'q3',
    category: 'banci',
    level: 'avansat',
    xp: 40,
    format: 'timeline',
    sceneIcon: '🏦',
    sceneTitle: { ro: 'Cont curent vs. cont de economii', en: 'Current account vs. savings account' },
    timelineType: 'grow',
    timelineYears: [0, 1, 2, 3],
    timelineValues: [5000, 5250, 5513, 5788],
    question: {
      ro: 'Care dintre următoarele este un avantaj AL contului de economii față de contul curent?',
      en: 'Which of the following is an advantage of a savings account over a current account?',
    },
    options: {
      ro: [
        'Poți plăti cu cardul din el',
        'Primești dobândă pentru banii depuși',
        'Ai acces instant la numerar',
        'Nu ai comision de administrare',
      ],
      en: [
        'You can pay with a card from it',
        'You earn interest on deposited funds',
        'You have instant cash access',
        "There's no administration fee",
      ],
    },
    correct: 1,
    explanation: {
      ro: 'Contul de economii oferă dobândă pentru banii depuși, spre deosebire de contul curent care are dobândă minimă sau zero. Restul avantajelor enumerate aparțin contului curent.',
      en: 'A savings account earns interest on deposited money, unlike a current account which offers minimal or no interest. The other advantages listed belong to the current account.',
    },
  },
  {
    id: 'q4',
    category: 'banci',
    level: 'avansat',
    xp: 40,
    format: 'swipe',
    sceneIcon: '🏛️',
    question: {
      ro: 'BNR este...',
      en: 'BNR is...',
    },
    options: {
      ro: [
        'O bancă unde persoanele fizice pot depune bani',
        'Banca centrală care supraveghează sistemul bancar românesc',
        'Un tip de cont de economii',
        'O instituție de creditare rapidă',
      ],
      en: [
        'A bank where individuals can deposit money',
        'The central bank that supervises the Romanian banking system',
        'A type of savings account',
        'A quick lending institution',
      ],
    },
    correct: 1,
    explanation: {
      ro: 'BNR (Banca Națională a României) este banca centrală — supraveghează sistemul bancar, stabilește politica monetară și protejează stabilitatea financiară. Nu lucrează direct cu persoane fizice.',
      en: 'BNR (National Bank of Romania) is the central bank — it supervises the banking system, sets monetary policy, and protects financial stability. It does not work directly with individuals.',
    },
  },
  {
    id: 'q5',
    category: 'inflatie',
    level: 'incepator',
    xp: 25,
    format: 'scenario',
    sceneIcon: '📈',
    sceneTitle: { ro: 'Inflație 10% / an', en: '10% annual inflation' },
    formula: { ro: '1.000 RON ÷ 1,10 = ?', en: '1,000 RON ÷ 1.10 = ?' },
    question: {
      ro: 'Dacă inflația anuală este 10% și tu ai 1.000 RON, care este puterea reală de cumpărare după 1 an?',
      en: 'If annual inflation is 10% and you have 1,000 RON, what is your real purchasing power after 1 year?',
    },
    options: {
      ro: ['1.100 RON', '1.000 RON', '~909 RON', '900 RON'],
      en: ['1,100 RON', '1,000 RON', '~909 RON', '900 RON'],
    },
    correct: 2,
    explanation: {
      ro: 'Puterea reală = 1000 / 1.10 = ~909 RON. Deși banii tăi nominal sunt tot 1.000 RON, cu ei poți cumpăra bunuri care valorau 909 RON acum un an.',
      en: 'Real purchasing power = 1000 / 1.10 = ~909 RON. Although your money is nominally still 1,000 RON, with it you can buy goods that were worth 909 RON a year ago.',
    },
  },
  {
    id: 'q6',
    category: 'inflatie',
    level: 'avansat',
    xp: 40,
    format: 'swipe',
    sceneIcon: '📊',
    question: {
      ro: 'Ce indicator folosește statul român pentru a măsura inflația?',
      en: 'What indicator does the Romanian state use to measure inflation?',
    },
    options: {
      ro: ['PIB', 'IPC (Indicele Prețurilor de Consum)', 'DAE', 'CAS'],
      en: ['GDP', 'CPI (Consumer Price Index)', 'APR', 'Social Insurance'],
    },
    correct: 1,
    explanation: {
      ro: 'IPC (Indicele Prețurilor de Consum) este calculat lunar de INS (Institutul Național de Statistică) și măsoară variația prețurilor unui coș reprezentativ de bunuri și servicii.',
      en: 'CPI (Consumer Price Index) is calculated monthly by INS (National Institute of Statistics) and measures the price variation of a representative basket of goods and services.',
    },
  },
  {
    id: 'q7',
    category: 'inflatie',
    level: 'avansat',
    xp: 40,
    format: 'scenario',
    sceneIcon: '💹',
    sceneTitle: { ro: '5% dobândă, 7% inflație', en: '5% interest, 7% inflation' },
    formula: { ro: '5% − 7% = ?', en: '5% − 7% = ?' },
    question: {
      ro: 'Andrei are 10.000 RON într-un cont de economii cu 5% dobândă anuală. Inflația este 7%. Care este randamentul real al economiilor lui?',
      en: 'Andrei has 10,000 RON in a savings account with 5% annual interest. Inflation is 7%. What is the real return on his savings?',
    },
    options: {
      ro: ['+5%', '+2%', '-2%', '0%'],
      en: ['+5%', '+2%', '-2%', '0%'],
    },
    correct: 2,
    explanation: {
      ro: 'Randament real = dobândă - inflație = 5% - 7% = -2%. Banii lui Andrei cresc numeric, dar pierd putere de cumpărare. El devine mai sărac în termeni reali, chiar dacă are mai mulți lei.',
      en: "Real return = interest - inflation = 5% - 7% = -2%. Andrei's money grows numerically but loses purchasing power. He is getting poorer in real terms, even though he has more lei.",
    },
  },
  {
    id: 'q8',
    category: 'inflatie',
    level: 'expert',
    xp: 60,
    format: 'danger',
    sceneIcon: '🛡️',
    sceneTitle: { ro: 'Strategii anti-inflație', en: 'Anti-inflation strategies' },
    question: {
      ro: 'Care dintre următoarele reprezintă o strategie validă de protecție împotriva inflației?',
      en: 'Which of the following is a valid strategy to protect against inflation?',
    },
    options: {
      ro: [
        'Ținerea banilor cash acasă',
        'Plasarea economiilor într-un cont fără dobândă',
        'Investiția în active care cresc odată cu inflația',
        'Cheltuirea rapidă a banilor',
      ],
      en: [
        'Keeping cash at home',
        'Placing savings in a zero-interest account',
        'Investing in assets that grow with inflation',
        'Spending money quickly',
      ],
    },
    correct: 2,
    explanation: {
      ro: 'Activele reale (imobiliare, acțiuni, mărfuri) tind să crească odată cu inflația, protejând puterea de cumpărare. Variantele A și B sunt cele mai proaste strategii — banii pierd valoare garantat.',
      en: 'Real assets (real estate, stocks, commodities) tend to grow with inflation, protecting purchasing power. Options A and B are the worst strategies — money is guaranteed to lose value.',
    },
  },
  {
    id: 'q9',
    category: 'credit',
    level: 'incepator',
    xp: 25,
    format: 'danger',
    sceneIcon: '⚠️',
    sceneTitle: { ro: 'Ofertă credit: 240% DAE!', en: 'Loan offer: 240% APR!' },
    question: {
      ro: "O reclamă spune: 'Credit 500 RON, rambursezi doar 520 RON!' DAE-ul din contract este 240%. Ce ar trebui să facă Maria?",
      en: "An ad says: 'Loan 500 RON, repay only 520 RON!' The APR in the contract is 240%. What should Maria do?",
    },
    options: {
      ro: [
        'Să semneze rapid, e o ofertă bună',
        'Să ignore DAE, contează doar suma finală',
        'Să refuze — DAE-ul real arată că plătește mult mai mult pe termen lung',
        'Să întrebe despre dobânda lunară',
      ],
      en: [
        'Sign quickly, it is a good deal',
        'Ignore APR, only the final amount matters',
        'Refuse — the real APR shows she pays much more in the long run',
        'Ask about the monthly interest rate',
      ],
    },
    correct: 2,
    explanation: {
      ro: 'DAE 240% înseamnă că pe an plătești de 2.4x suma împrumutată. Este un credit prădător. Suma "520 RON" din reclamă e valabilă doar dacă rambursezi în exact câteva zile — orice întârziere explodează costul.',
      en: '240% APR means you pay 2.4× the borrowed amount per year. It is a predatory loan. The "520 RON" in the ad only applies if you repay within a few days — any delay makes the cost explode.',
    },
  },
  {
    id: 'q10',
    category: 'credit',
    level: 'avansat',
    xp: 40,
    format: 'scenario',
    sceneIcon: '💼',
    sceneTitle: { ro: 'Salariu brut: 4.500 RON', en: 'Gross salary: 4,500 RON' },
    formula: { ro: '4.500 RON × 58% = ?', en: '4,500 RON × 58% = ?' },
    question: {
      ro: 'Andrei câștigă 4.500 RON brut. Reținerile totale (CAS + CASS + Impozit) sunt ~42%. Cât primește Andrei net în mână?',
      en: 'Andrei earns 4,500 RON gross. Total deductions (pension + health + tax) are ~42%. How much does Andrei receive net?',
    },
    options: {
      ro: ['4.500 RON', '3.800 RON', '~2.610 RON', '2.250 RON'],
      en: ['4,500 RON', '3,800 RON', '~2,610 RON', '2,250 RON'],
    },
    correct: 2,
    explanation: {
      ro: '4500 × (1 - 0.42) = 4500 × 0.58 = 2.610 RON. Diferența dintre salariul brut și cel net în România este semnificativă — ~42% se duc la stat prin CAS (pensie), CASS (sănătate) și impozit pe venit.',
      en: '4500 × (1 - 0.42) = 4500 × 0.58 = 2,610 RON. The difference between gross and net salary in Romania is significant — ~42% goes to the state through pension contributions, health insurance, and income tax.',
    },
  },
  {
    id: 'q11',
    category: 'credit',
    level: 'avansat',
    xp: 40,
    format: 'swipe',
    sceneIcon: '💹',
    question: {
      ro: 'Care este diferența cheie dintre dobânda simplă și dobânda compusă?',
      en: 'What is the key difference between simple interest and compound interest?',
    },
    options: {
      ro: [
        'Nu există diferență',
        'Dobânda compusă se calculează și pe dobânda acumulată anterior, generând creștere exponențială',
        'Dobânda simplă este întotdeauna mai mare',
        'Dobânda compusă se aplică doar la credite',
      ],
      en: [
        'There is no difference',
        'Compound interest is also calculated on previously accumulated interest, generating exponential growth',
        'Simple interest is always higher',
        'Compound interest only applies to loans',
      ],
    },
    correct: 1,
    explanation: {
      ro: 'Dobânda compusă ("dobânda la dobândă") generează creștere exponențială — benefică la economii, periculoasă la datorii. La dobânda simplă, calculul se face mereu pe suma inițială, fără să includă dobânzile acumulate.',
      en: 'Compound interest ("interest on interest") generates exponential growth — beneficial in savings, dangerous in debt. With simple interest, the calculation is always on the initial amount, without including accumulated interest.',
    },
  },
  {
    id: 'q12',
    category: 'credit',
    level: 'expert',
    xp: 60,
    format: 'swipe',
    sceneIcon: '🏖️',
    question: {
      ro: 'Raluca vrea să ia un credit de consum de 3.000 RON pentru o vacanță. Conform regulii de aur a creditului, aceasta este...',
      en: 'Raluca wants to take a 3,000 RON consumer loan for a vacation. According to the golden rule of credit, this is...',
    },
    options: {
      ro: [
        'O decizie financiară bună dacă dobânda e mică',
        'Acceptabilă dacă o rambursează în 6 luni',
        'O greșeală — creditul pentru consum nu generează valoare și creează datorii inutile',
        'Recomandată pentru a-și construi istoricul de credit',
      ],
      en: [
        'A good financial decision if the interest rate is low',
        'Acceptable if she repays it within 6 months',
        'A mistake — consumer credit generates no value and creates unnecessary debt',
        'Recommended to build her credit history',
      ],
    },
    correct: 2,
    explanation: {
      ro: 'Regula de aur: credit doar pentru active sau investiții cu ROI calculabil. O vacanță nu generează niciun randament financiar — plătești în plus (dobânda) pentru ceva ce oricum se consumă. Istoricul de credit se construiește mai ieftin printr-un card de credit utilizat și achitat lunar.',
      en: 'Golden rule: loan only for assets or investments with a calculable ROI. A vacation generates no financial return — you pay extra (the interest) for something that is consumed anyway. Credit history is built more cheaply with a credit card used and paid monthly.',
    },
  },
  {
    id: 'q13',
    category: 'buget',
    level: 'incepator',
    xp: 40,
    format: 'drag',
    sceneIcon: '⚖️',
    question: {
      ro: 'Cu un salariu de 3.000 RON net, ordonează prioritățile bugetare după regula 50/30/20:',
      en: 'With a 3,000 RON net salary, order the budget priorities by the 50/30/20 rule:',
    },
    // items in CORRECT order — component shuffles for display
    items: {
      ro: ['Chirie & mâncare (50%)', 'Activități dorite (30%)', 'Economii (20%)'],
      en: ['Rent & food (50%)', 'Desired activities (30%)', 'Savings (20%)'],
    },
    // initial display shuffle: indices into items array
    initialOrder: [2, 0, 1],
    correct: 0, // not used for drag format
    explanation: {
      ro: 'Regula 50/30/20: 50% pentru nevoi esențiale (chirie, mâncare), 30% pentru dorințe, 20% pentru economii. Nevoile de bază au întotdeauna prioritate față de plăceri.',
      en: 'The 50/30/20 rule: 50% for essential needs (rent, food), 30% for wants, 20% for savings. Basic needs always take priority over pleasures.',
    },
    options: { ro: [], en: [] }, // unused, satisfies shape
  },
]

export const DIAGNOSTIC_QUESTION_IDS = ['q1', 'q5', 'q9', 'q3', 'q7']

export const CATEGORIES = [
  { id: 'toate' },
  { id: 'banci' },
  { id: 'inflatie' },
  { id: 'credit' },
  { id: 'buget' },
]

export const LEVELS = [
  { id: 'incepator' },
  { id: 'avansat' },
  { id: 'expert' },
]

export const CATEGORY_META = {
  banci:    { emoji: '🏦', gradient: 'linear-gradient(135deg, #1a1f4e, #2d3561)' },
  inflatie: { emoji: '📈', gradient: 'linear-gradient(135deg, #1a3a2a, #1f5c3a)' },
  credit:   { emoji: '💳', gradient: 'linear-gradient(135deg, #3a1a1a, #5c1f1f)' },
  buget:    { emoji: '⚖️', gradient: 'linear-gradient(135deg, #2a1a3a, #3d1f5c)' },
}
