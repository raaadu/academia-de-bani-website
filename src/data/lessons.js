export const LESSONS = [
  {
    id: 1,
    number: '01',
    title: { ro: 'Bănci & Conturi', en: 'Banks & Accounts' },
    tag: { ro: 'Fundamente', en: 'Fundamentals' },
    duration: '~8 min',
    xp: 150,
    badge: { id: 'primul-pas', name: 'Primul Pas', emoji: '🏦' },
    sections: [
      {
        id: 's1',
        title: { ro: 'Ce este banca și de ce există', en: 'What is a bank and why does it exist' },
        content: [
          {
            type: 'text',
            text: {
              ro: 'O bancă este un intermediar financiar de încredere — ia banii celor care economisesc și îi împrumută celor care au nevoie de capital pentru afaceri, locuințe sau consum. Fără bănci, fiecare om ar trebui să-și găsească singur pe cineva care vrea să împrumute exact suma de care are nevoie.',
              en: 'A bank is a trusted financial intermediary — it takes money from those who save and lends it to those who need capital for businesses, homes, or consumption. Without banks, everyone would have to find on their own someone willing to lend exactly the amount they need.',
            },
          },
          {
            type: 'text',
            text: {
              ro: 'În România, sistemul bancar este supravegheat de <chip>BNR</chip> (Banca Națională a României) — instituția care stabilește regulile, monitorizează băncile și protejează deponenții. BNR nu lucrează cu persoane fizice; ea e "banca băncilor".',
              en: 'In Romania, the banking system is supervised by <chip>BNR</chip> (National Bank of Romania) — the institution that sets the rules, monitors banks, and protects depositors. BNR does not work with individuals; it is the "bank of banks".',
            },
          },
          {
            type: 'highlight',
            text: {
              ro: 'Băncile comerciale (BCR, BRD, ING, Raiffeisen etc.) sunt cele cu care interacționezi direct. BNR le supraveghează pe toate.',
              en: 'Commercial banks (BCR, BRD, ING, Raiffeisen etc.) are those you interact with directly. BNR supervises them all.',
            },
          },
        ],
      },
      {
        id: 's2',
        title: { ro: 'Cont curent vs. Cont de economii', en: 'Current account vs. Savings account' },
        content: [
          {
            type: 'text',
            text: {
              ro: 'Contul curent este contul de zi cu zi. Îl folosești pentru salarii, plăți cu cardul, transferuri. Dobânda este aproape zero — banii sunt mereu disponibili, dar nu cresc.',
              en: 'The current account is your everyday account. You use it for salaries, card payments, and transfers. Interest is nearly zero — your money is always available, but it does not grow.',
            },
          },
          {
            type: 'text',
            text: {
              ro: 'Contul de economii este conceput pentru banii pe care nu îi atingi o perioadă. Dobânda poate fi între 2% și 8% pe an, în funcție de bancă și perioada blocată. Cu cât ții banii mai mult, cu atât dobânda e mai mare.',
              en: 'The savings account is designed for money you will not touch for a period. Interest can be between 2% and 8% per year, depending on the bank and the term locked in. The longer you keep the money, the higher the interest.',
            },
          },
          {
            type: 'comparison',
            left: {
              label: { ro: 'Cont Curent', en: 'Current Account' },
              points: {
                ro: ['Acces instant', 'Card debit atașat', 'Dobândă ~0%', 'Plăți zilnice'],
                en: ['Instant access', 'Attached debit card', '~0% interest', 'Daily payments'],
              },
            },
            right: {
              label: { ro: 'Cont Economii', en: 'Savings Account' },
              points: {
                ro: ['Acces limitat', 'Fără card direct', 'Dobândă 2–8%', 'Economisire pe termen'],
                en: ['Limited access', 'No direct card', '2–8% interest', 'Long-term saving'],
              },
            },
          },
        ],
      },
    ],
    checkpoint: {
      afterSection: 1,
      question: {
        ro: 'Care este diferența principală dintre un cont curent și un cont de economii?',
        en: 'What is the main difference between a current account and a savings account?',
      },
      options: {
        ro: [
          'Contul curent are dobândă mai mare',
          'Contul de economii oferă dobândă pentru banii depuși, contul curent nu',
          'Contul de economii permite plăți cu cardul',
          'Nu există diferențe semnificative',
        ],
        en: [
          'The current account has higher interest',
          'The savings account earns interest on deposits, the current account does not',
          'The savings account allows card payments',
          'There are no significant differences',
        ],
      },
      correct: 1,
      explanation: {
        ro: 'Contul de economii generează dobândă pentru banii depuși, în timp ce contul curent este conceput pentru tranzacții zilnice și oferă dobândă minimă sau zero.',
        en: 'A savings account earns interest on deposited money, while a current account is designed for daily transactions and offers minimal or no interest.',
      },
    },
    sections2: [
      {
        id: 's3',
        title: { ro: 'IBAN-ul — cheia contului tău bancar', en: 'IBAN — the key to your bank account' },
        content: [
          {
            type: 'text',
            text: {
              ro: '<chip>IBAN</chip> (International Bank Account Number) este identificatorul unic al contului tău bancar. Fără el, niciun transfer electronic nu poate ajunge la tine.',
              en: '<chip>IBAN</chip> (International Bank Account Number) is the unique identifier of your bank account. Without it, no electronic transfer can reach you.',
            },
          },
          {
            type: 'text',
            text: {
              ro: 'Un IBAN românesc arată astfel: RO49AAAA1B31007593840000. Primele două litere (RO) indică țara. Urmează 2 cifre de control, codul băncii (4 caractere) și numărul contului.',
              en: 'A Romanian IBAN looks like this: RO49AAAA1B31007593840000. The first two letters (RO) indicate the country, followed by 2 check digits, the bank code (4 characters), and the account number.',
            },
          },
          {
            type: 'highlight',
            text: {
              ro: 'Reține: IBAN-ul nu este secret — îl dai oricui vrea să îți trimită bani. Nu este același lucru cu parola sau PIN-ul cardului.',
              en: 'Remember: your IBAN is not secret — give it to anyone who wants to send you money. It is not the same as your password or card PIN.',
            },
          },
        ],
      },
      {
        id: 's4',
        title: { ro: 'Capcana banilor sub saltea', en: 'The under-the-mattress money trap' },
        content: [
          {
            type: 'text',
            text: {
              ro: 'Mulți oameni cred că banii cash acasă sunt "în siguranță". În realitate, inflația îi erodează silențios în fiecare an.',
              en: 'Many people believe that cash at home is "safe". In reality, inflation silently erodes it every year.',
            },
          },
          {
            type: 'example',
            title: { ro: 'Calcul real', en: 'Real calculation' },
            text: {
              ro: 'Dacă ai 10.000 RON sub saltea și inflația e 7% pe an, după 3 ani puterea de cumpărare a banilor tăi este de doar ~8.163 RON — ai pierdut echivalentul a 1.837 RON fără să cheltuiești nimic.',
              en: 'If you have 10,000 RON under the mattress and inflation is 7% per year, after 3 years the purchasing power of your money is only ~8,163 RON — you have lost the equivalent of 1,837 RON without spending anything.',
            },
          },
          {
            type: 'text',
            text: {
              ro: 'Un cont de economii cu 5% dobândă anuală nu bate inflația de 7%, dar pierderea e mult mai mică. Scopul este să minimizezi eroziunea, nu neapărat să câștigi real.',
              en: 'A savings account with 5% annual interest does not beat 7% inflation, but the loss is much smaller. The goal is to minimize erosion, not necessarily to gain in real terms.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    number: '02',
    title: { ro: 'Inflație & Puterea Banilor', en: 'Inflation & The Power of Money' },
    tag: { ro: 'Economie', en: 'Economy' },
    duration: '~10 min',
    xp: 150,
    badge: { id: 'economist', name: 'Economist', emoji: '📈' },
    sections: [
      {
        id: 's1',
        title: { ro: 'Ce este inflația', en: 'What is inflation' },
        content: [
          {
            type: 'text',
            text: {
              ro: 'Inflația este creșterea generalizată a prețurilor în timp. Nu înseamnă că doar un produs se scumpește — ci că, în medie, totul costă mai mult față de anul trecut.',
              en: 'Inflation is the generalized increase in prices over time. It does not mean just one product gets more expensive — it means that, on average, everything costs more than last year.',
            },
          },
          {
            type: 'example',
            title: { ro: 'Exemplu concret', en: 'Concrete example' },
            text: {
              ro: 'O pâine costă 3 RON în 2015. În 2024, aceeași pâine costă ~7 RON. Asta nu înseamnă că pâinea e mai valoroasă — înseamnă că leul a slăbit. Cu același leu cumperi mai puțin.',
              en: 'A loaf of bread costs 3 RON in 2015. In 2024, the same bread costs ~7 RON. That does not mean bread is more valuable — it means the leu has weakened. With the same amount you buy less.',
            },
          },
          {
            type: 'text',
            text: {
              ro: 'Inflația există în toate economiile. O inflație mică (~2%) este normală și chiar sănătoasă. Problema apare când depășește 5–7% și erodează rapid economiile populației.',
              en: 'Inflation exists in all economies. A small rate (~2%) is normal and even healthy. Problems arise when it exceeds 5–7% and rapidly erodes people\'s savings.',
            },
          },
        ],
      },
      {
        id: 's2',
        title: { ro: 'Cum măsoară statul inflația', en: 'How the state measures inflation' },
        content: [
          {
            type: 'text',
            text: {
              ro: 'Statul român calculează inflația prin <chip>IPC</chip> (Indicele Prețurilor de Consum). Institutul Național de Statistică (INS) monitorizează prețurile unui "coș" reprezentativ de bunuri și servicii (alimente, utilități, transport, sănătate etc.).',
              en: 'The Romanian state calculates inflation through the <chip>IPC</chip> (Consumer Price Index). The National Institute of Statistics (INS) monitors the prices of a representative "basket" of goods and services (food, utilities, transport, health, etc.).',
            },
          },
          {
            type: 'text',
            text: {
              ro: 'Dacă coșul a costat 1.000 RON în ianuarie 2023 și 1.070 RON în ianuarie 2024, inflația anuală este 7%. Simplu, dar puternic ca instrument de diagnostic economic.',
              en: 'If the basket cost 1,000 RON in January 2023 and 1,070 RON in January 2024, annual inflation is 7%. Simple but powerful as an economic diagnostic tool.',
            },
          },
          {
            type: 'highlight',
            text: {
              ro: 'IPC nu reflectă perfect experiența ta — dacă nu ai mașină, inflația la combustibil nu te afectează la fel. Dar e cel mai bun indicator macro disponibil.',
              en: 'CPI does not perfectly reflect your experience — if you do not have a car, fuel inflation does not affect you the same way. But it is the best macro indicator available.',
            },
          },
        ],
      },
    ],
    checkpoint: {
      afterSection: 1,
      question: {
        ro: 'Ce măsoară IPC (Indicele Prețurilor de Consum)?',
        en: 'What does CPI (Consumer Price Index) measure?',
      },
      options: {
        ro: [
          'Rata de creștere a PIB-ului',
          'Variația medie a prețurilor unui coș reprezentativ de bunuri și servicii',
          'Valoarea totală a exporturilor României',
          'Numărul de angajați din economie',
        ],
        en: [
          'The GDP growth rate',
          'The average price change of a representative basket of goods and services',
          'The total value of Romanian exports',
          'The number of employed people in the economy',
        ],
      },
      correct: 1,
      explanation: {
        ro: 'IPC măsoară variația prețurilor unui coș reprezentativ de bunuri și servicii consumate de gospodăriile din România, calculat lunar de INS.',
        en: 'CPI measures the price variation of a representative basket of goods and services consumed by Romanian households, calculated monthly by INS.',
      },
    },
    sections2: [
      {
        id: 's3',
        title: { ro: 'Impactul asupra economiilor tale', en: 'Impact on your savings' },
        content: [
          {
            type: 'text',
            text: {
              ro: 'Să vedem cu cifre ce înseamnă 7% inflație anuală timp de 5 ani pentru 1.000 RON ținuți fără dobândă:',
              en: "Let's see in numbers what 7% annual inflation means over 5 years for 1,000 RON kept without interest:",
            },
          },
          {
            type: 'example',
            title: { ro: 'Calculul pierderii reale', en: 'Real loss calculation' },
            text: {
              ro: 'Formula: Valoare reală = 1000 / (1.07)^5 = 1000 / 1.4026 ≈ 713 RON\n\nÎn 5 ani, 1.000 RON de azi au puterea de cumpărare a 713 RON. Ai "pierdut" 287 RON fără să cheltuiești nimic — inflația i-a mâncat.',
              en: 'Formula: Real value = 1000 / (1.07)^5 = 1000 / 1.4026 ≈ 713 RON\n\nIn 5 years, today\'s 1,000 RON has the purchasing power of 713 RON. You have "lost" 287 RON without spending anything — inflation ate them.',
            },
          },
          {
            type: 'text',
            text: {
              ro: 'Dacă acei 1.000 RON ar fi stat într-un cont cu 5% dobândă anuală, după 5 ani ar fi 1.276 RON nominal — dar puterea reală ar fi 1.276 / 1.4026 ≈ 910 RON. Pierdere de doar 90 RON, față de 287 RON.',
              en: 'If those 1,000 RON were in an account with 5% annual interest, after 5 years they would be 1,276 RON nominally — but real purchasing power would be 1,276 / 1.4026 ≈ 910 RON. A loss of only 90 RON vs. 287 RON.',
            },
          },
        ],
      },
      {
        id: 's4',
        title: { ro: 'Cum te protejezi de inflație', en: 'How to protect yourself from inflation' },
        content: [
          {
            type: 'text',
            text: {
              ro: 'Nu există protecție perfectă, dar există strategii mai bune decât banii sub saltea:',
              en: 'There is no perfect protection, but there are better strategies than cash under the mattress:',
            },
          },
          {
            type: 'list',
            items: {
              ro: [
                '💰 Conturi de economii cu dobândă — minimizează pierderea',
                '📊 Depozite bancare la termen — dobânzi mai mari dacă blochezi banii',
                '🏦 Fonduri de investiții — accesibile și cu risc gestionat',
                '📚 Educație financiară — cunoașterea este cel mai bun scut',
              ],
              en: [
                '💰 Savings accounts with interest — minimizes the loss',
                '📊 Time deposits — higher interest rates if you lock the money in',
                '🏦 Investment funds — accessible and with managed risk',
                '📚 Financial education — knowledge is the best shield',
              ],
            },
          },
          {
            type: 'highlight',
            text: {
              ro: 'Regula de bază: orice randament mai mic decât rata inflației înseamnă că pierzi bani real. Obiectivul minim este să "bați" inflația.',
              en: 'The basic rule: any return lower than the inflation rate means you are losing money in real terms. The minimum objective is to "beat" inflation.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 3,
    number: '03',
    title: { ro: 'Dobândă, Credit & Capcane', en: 'Interest, Credit & Traps' },
    tag: { ro: 'Risc & Protecție', en: 'Risk & Protection' },
    duration: '~12 min',
    xp: 150,
    badge: { id: 'detectiv-financiar', name: 'Detectiv Financiar', emoji: '🔍' },
    sections: [
      {
        id: 's1',
        title: { ro: 'Ce este dobânda', en: 'What is interest' },
        content: [
          {
            type: 'text',
            text: {
              ro: 'Dobânda este prețul banilor împrumutați. Când iei un credit, plătești băncii o taxă pentru că ți-a pus la dispoziție banii ei. Când depui bani la bancă, banca îți plătește o taxă pentru că folosește banii tăi.',
              en: 'Interest is the price of borrowed money. When you take out a loan, you pay the bank a fee for making its money available to you. When you deposit money at a bank, the bank pays you a fee for using your money.',
            },
          },
          {
            type: 'comparison',
            left: {
              label: { ro: 'Dobândă Simplă', en: 'Simple Interest' },
              points: {
                ro: [
                  'Se calculează doar pe suma inițială',
                  'Liniară în timp',
                  'Ex: 1000 RON × 10% × 3 ani = 300 RON dobândă',
                  'Total: 1.300 RON',
                ],
                en: [
                  'Calculated only on the initial amount',
                  'Linear over time',
                  'Ex: 1000 RON × 10% × 3 years = 300 RON interest',
                  'Total: 1,300 RON',
                ],
              },
            },
            right: {
              label: { ro: 'Dobândă Compusă', en: 'Compound Interest' },
              points: {
                ro: [
                  'Se calculează și pe dobânda acumulată',
                  'Exponențială în timp',
                  'Ex: 1000 RON la 10%/an, 3 ani = 331 RON dobândă',
                  'Total: 1.331 RON',
                ],
                en: [
                  'Calculated on accumulated interest too',
                  'Exponential over time',
                  'Ex: 1000 RON at 10%/year, 3 years = 331 RON interest',
                  'Total: 1,331 RON',
                ],
              },
            },
          },
          {
            type: 'highlight',
            text: {
              ro: 'Dobânda compusă este "al 8-lea miracol al lumii" (atribuită lui Einstein). Lucrează pentru tine la economii, împotriva ta la credite.',
              en: 'Compound interest is "the 8th wonder of the world" (attributed to Einstein). It works for you in savings, against you in debt.',
            },
          },
        ],
      },
      {
        id: 's2',
        title: { ro: 'DAE — singura cifră care contează', en: 'APR — the only number that matters' },
        content: [
          {
            type: 'text',
            text: {
              ro: '<chip>DAE</chip> (Dobânda Anuală Efectivă) include TOATE costurile unui credit: dobânda nominală + comisioane de administrare + asigurări obligatorii + orice altă taxă. Este standardizată prin lege exact pentru a permite compararea corectă între credite.',
              en: '<chip>DAE</chip> (Annual Effective Rate / APR) includes ALL costs of a loan: nominal interest + administration fees + mandatory insurance + any other tax. It is standardized by law precisely to allow correct comparison between loans.',
            },
          },
          {
            type: 'text',
            text: {
              ro: 'O reclamă poate spune "dobândă 0%" — dar DAE poate fi 45% dacă există comisioane mari. Dacă nu te uiți la DAE, ești orbit de marketing.',
              en: 'An ad might say "0% interest" — but APR can be 45% if there are large fees. If you do not look at APR, you are blinded by marketing.',
            },
          },
          {
            type: 'example',
            title: { ro: 'Regulă practică', en: 'Practical rule' },
            text: {
              ro: 'Când compari două credite, ignoră orice altă cifră și compară doar DAE. Cel cu DAE mai mic este întotdeauna mai ieftin, indiferent cum arată restul ofertei.',
              en: 'When comparing two loans, ignore any other number and compare only APR. The one with a lower APR is always cheaper, no matter how the rest of the offer looks.',
            },
          },
        ],
      },
    ],
    checkpoint: {
      afterSection: 1,
      question: {
        ro: 'De ce este DAE mai importantă decât dobânda nominală?',
        en: 'Why is APR more important than the nominal interest rate?',
      },
      options: {
        ro: [
          'DAE este întotdeauna mai mică decât dobânda nominală',
          'DAE include toate costurile creditului (dobândă + comisioane + taxe), permițând compararea reală',
          'DAE se aplică doar la credite imobiliare',
          'DAE nu are nicio relevanță practică',
        ],
        en: [
          'APR is always lower than the nominal interest rate',
          'APR includes all loan costs (interest + fees + taxes), enabling real comparison',
          'APR only applies to mortgage loans',
          'APR has no practical relevance',
        ],
      },
      correct: 1,
      explanation: {
        ro: 'DAE (Dobânda Anuală Efectivă) include toate costurile asociate unui credit — dobânda nominală plus comisioane, asigurări și orice altă taxă. Este singurul indicator care permite compararea corectă a două credite diferite.',
        en: 'APR (Annual Effective Rate) includes all costs associated with a loan — nominal interest plus fees, insurance, and any other tax. It is the only indicator that allows correct comparison of two different loans.',
      },
    },
    sections2: [
      {
        id: 's3',
        title: { ro: 'Capcana "Credit cu buletinul"', en: 'The "Quick Loan" trap' },
        content: [
          {
            type: 'text',
            text: {
              ro: 'Creditele IFN (Instituții Financiare Nebancare) — cunoscute ca "credite rapide" sau "credit cu buletinul" — par atractive prin rapiditate și accesibilitate. Sunt de fapt unele dintre cele mai scumpe produse financiare din România.',
              en: 'Non-banking financial institution (IFN) loans — known as "quick loans" or "ID-only loans" — seem attractive due to their speed and accessibility. They are actually some of the most expensive financial products in Romania.',
            },
          },
          {
            type: 'example',
            title: { ro: 'Calcul real: credit 500 RON, DAE 380%', en: 'Real calculation: 500 RON loan, 380% APR' },
            text: {
              ro: 'Împrumuți 500 RON pe 30 de zile cu DAE 380%.\nDobânda zilnică = 380% / 365 = ~1.04% pe zi\nDobândă totală 30 zile = 500 × 1.04% × 30 = ~156 RON\nRambursezi: 500 + 156 = 656 RON\n\nPentru 500 RON folosiți o lună, plătești 156 RON extra — 31% din suma împrumutată!',
              en: 'You borrow 500 RON for 30 days at 380% APR.\nDaily interest = 380% / 365 = ~1.04% per day\nTotal interest 30 days = 500 × 1.04% × 30 = ~156 RON\nYou repay: 500 + 156 = 656 RON\n\nFor 500 RON used for one month, you pay 156 RON extra — 31% of the borrowed amount!',
            },
          },
          {
            type: 'text',
            text: {
              ro: 'Dacă nu rambursezi la timp, penalitățile se adaugă și datoria poate deveni de 2–3× suma inițială în câteva luni. Acesta este mecanismul prin care oamenii ajung în spirala datoriilor.',
              en: 'If you do not repay on time, penalties add up and the debt can become 2–3× the original amount within a few months. This is the mechanism that traps people in a debt spiral.',
            },
          },
        ],
      },
      {
        id: 's4',
        title: { ro: 'Regula de aur a creditului', en: 'The golden rule of credit' },
        content: [
          {
            type: 'text',
            text: {
              ro: 'Nu toate creditele sunt rele. Există credite justificate și credite distructive.',
              en: 'Not all loans are bad. There are justified loans and destructive loans.',
            },
          },
          {
            type: 'comparison',
            left: {
              label: { ro: 'Credit justificat ✓', en: 'Justified loan ✓' },
              points: {
                ro: [
                  'Credit imobiliar — locuința are valoare pe termen lung',
                  'Credit pentru educație cu ROI calculabil',
                  'Credit pentru un mijloc de producție (unelte, echipament)',
                  'Refinanțare la o rată mai mică',
                ],
                en: [
                  'Mortgage — property has long-term value',
                  'Education loan with calculable ROI',
                  'Loan for a means of production (tools, equipment)',
                  'Refinancing at a lower rate',
                ],
              },
            },
            right: {
              label: { ro: 'Credit evitat ✗', en: 'Loan to avoid ✗' },
              points: {
                ro: [
                  'Credit pentru vacanță',
                  'Credit pentru telefon nou sau haine',
                  'Credit pentru consum cotidian',
                  '"Credit cu buletinul" pentru cheltuieli urgente',
                ],
                en: [
                  'Loan for a vacation',
                  'Loan for a new phone or clothes',
                  'Loan for everyday consumption',
                  '"Quick loan" for urgent expenses',
                ],
              },
            },
          },
          {
            type: 'highlight',
            text: {
              ro: 'Regula de aur: ia credit DOAR pentru active sau investiții cu ROI (Return on Investment) calculabil și mai mare decât DAE. Orice altceva te îmbogățește pe creditor, nu pe tine.',
              en: 'Golden rule: take a loan ONLY for assets or investments with a calculable ROI (Return on Investment) greater than APR. Anything else enriches the lender, not you.',
            },
          },
        ],
      },
    ],
  },
]
