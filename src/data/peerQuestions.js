//radna verzija pitanja, treba ispraviti kad se prava posalju
export const peerQuestions = {
    sr: {
        REZULTATI: [
            // STUB: KRATKOROČNI CILJEVI
            {
                id: "PR_KC_1.1C",
                pillar: "KRATKOROČNI CILJEVI",
                dimension: "REZULTATI",
                facet: "Fokus na izvršenje i isporuku, Rešavanje problema, Pouzdanost i konzistentnost, Reagovanje pod pritiskom",
                type: "core",
                text: "PP – Osnovni scenario 1.1: Tokom zahtevnih perioda sa roku, kako ova osoba obično pristupa svom radu i doprinosu timskim ciljevima?",
                options: [
                    { score: 3, text: "A. Organizovana je i fokusirana na isporuku; generalno ispunjava rokove sa prihvatljivim kvalitetom, mada ponekad zahteva podsetnik ili koordinaciju od strane kolega." },
                    { score: 1, text: "B. Uglavnom reaguje na ono što je najhitnije u datom trenutku; isporuke su neujednačene i kolege ponekad ne znaju šta da očekuju od nje." },
                    { score: 5, text: "C. Proaktivno planira i preuzima vlasništvo nad rezultatima; kolege mogu da se oslone na nju — isporuke su predvidive i retko se pojavljuju iznenađenja." }
                ]
            },
            {
                id: "PR_KC_1.1R",
                pillar: "KRATKOROČNI CILJEVI",
                dimension: "REZULTATI",
                type: "reflection",
                text: "PP – Refleksija o uticaju 1.1: Kada dođe do kašnjenja ili propusta u isporuci ove osobe, šta je obično uzrok?",
                options: [
                    { score: 5, text: "A. Ova osoba preuzima odgovornost i prilagođava pristup kada nailazi na prepreke — kašnjenja su retka i kada se pojave, brzo se samostalno rešavaju." },
                    { score: 3, text: "B. Ponekad se pojave neočekivane okolnosti koje zahtevaju prilagođavanja, ali ova osoba se generalno nosi s njima uz minimalnu koordinaciju." },
                    { score: 1, text: "C. Propusti se često ponavljaju i kolege moraju da prate ili da podsetnik daju kako bi ova osoba ostala na pravom putu." }
                ]
            },
            {
                id: "PR_KC_1.2C",
                pillar: "KRATKOROČNI CILJEVI",
                dimension: "REZULTATI",
                type: "core",
                text: "PP – Osnovni scenario 1.2: Dođe do neočekivanog problema koji ometa zajednički posao i izaziva pritisak u timu. Kako ova osoba obično reaguje kada je tim pod stresom?",
                options: [
                    { score: 1, text: "A. Fokusira se na brzo rešavanje, što pomaže na kratki rok, ali slični problemi se ponavljaju jer uzroci nisu sistemski adresirali." },
                    { score: 5, text: "B. Ostaje mirna i stabilizujuće deluje na tim; ne samo da doprinosi rešavanju hitnog problema, već proaktivno razmišlja o tome kako sprečiti ponavljanje." },
                    { score: 3, text: "C. Ostaje mirna i organizovano doprinosi rešavanju problema, pomažući timu da se stabilizuje i nastavi sa radom bez daljeg remećenja." }
                ]
            },
            {
                id: "PR_KC_1.2R",
                pillar: "KRATKOROČNI CILJEVI",
                dimension: "REZULTATI",
                type: "reflection",
                text: "PP – Refleksija o uticaju 1.2: Kada ova osoba doprinese rešavanju zajedničkog problema, koliko se dugo rešenje održava?",
                options: [
                    { score: 3, text: "A. Rešenje uglavnom funkcioniše, mada se ponekad pojave srodni izazovi koje tim rešava zajedno." },
                    { score: 1, text: "B. Slični problemi se relativno brzo ponavljaju, što sugeriše da doprinos ove osobe adresira simptome, a ne suštinu." },
                    { score: 5, text: "C. Slični problemi se retko ponavljaju; doprinos ove osobe ima trajni pozitivan efekat na način rada tima." }
                ]
            },
            // STUB: DUGOROČNA PROMENA
            {
                id: "PR_DP_1.3C",
                pillar: "DUGOROČNA PROMENA",
                dimension: "REZULTATI",
                facet: "Adaptacija na promenu, Inicijativa i unapređenje procesa, Deljenje znanja, Doprinos razvoju tima",
                type: "core",
                text: "PP – Osnovni scenario 1.3: Organizacija uvodi promene koje zahtevaju učenje novih načina rada. Kako ova osoba obično doprinosi prilagođavanju tima i razvoju novih načina rada?",
                options: [
                    { score: 3, text: "A. Prihvata promene i ulaže napor u sticanje novih veština; deli ono što nauči sa kolegama kada ih pitaju." },
                    { score: 1, text: "B. Prilagođava se sporo i preferira ustaljene metode; njen doprinos prilagođavanju tima je ograničen i kolege često ne mogu da se oslone na nju u ovim trenucima." },
                    { score: 5, text: "C. Entuzijastično prihvata promene, eksperimentiše sa novim pristupima i proaktivno deli naučeno sa timom — ubrzavajući kolektivnu adaptaciju." }
                ]
            },
            {
                id: "PR_DP_1.3R",
                pillar: "DUGOROČNA PROMENA",
                dimension: "REZULTATI",
                type: "reflection",
                text: "PP – Refleksija o uticaju 1.3: Koliko brzo i glatko ova osoba obično prihvata i implementira nove načine rada?",
                options: [
                    { score: 1, text: "A. Prilagođavanje traje duže nego kod kolega; ova osoba ima tendenciju da ostaje pri starim navikama i to usporava tim." },
                    { score: 5, text: "B. Brzo usvaja nove načine rada i njen entuzijazam pozitivno deluje na ceo tim; postaje resurs za kolege tokom tranzicije." },
                    { score: 3, text: "C. Prilagođava se u razumnom roku bez većih poteškoća; doprinos je adekvatan mada ne izuzetno ubrzan." }
                ]
            },
            {
                id: "PR_DP_1.4C",
                pillar: "DUGOROČNA PROMENA",
                dimension: "REZULTATI",
                type: "core",
                text: "PP – Osnovni scenario 1.4: Tim prolazi kroz period organizacione transformacije, a istovremeno postoji potreba za poboljšanjem postojećih procesa. Kako ova osoba obično doprinosi ovom procesu?",
                options: [
                    { score: 5, text: "A. Aktivno učestvuje u oblikovanju načina implementacije promena; predlaže poboljšanja procesa i radi na izgradnji zajedničke podrške unutar tima." },
                    { score: 1, text: "B. Fokusira se na ispunjavanje zahteva transformacije bez aktivnog doprinosa poboljšanjima procesa; oslanja se na druge da oblikuju promenu." },
                    { score: 3, text: "C. Razume i prihvata organizacionu transformaciju i povremeno predlaže inkrementalna poboljšanja procesa koja su u skladu sa novim pravcem." }
                ]
            },
            {
                id: "PR_DP_1.4R",
                pillar: "DUGOROČNA PROMENA",
                dimension: "REZULTATI",
                type: "reflection",
                text: "PP – Refleksija o uticaju 1.4: Kada ova osoba predloži novi pristup ili poboljšanje, koliko se drugi angažuju sa tim predlogom?",
                options: [
                    { score: 3, text: "A. Kolege razmatraju predloge ove osobe, ali ih ne usvajaju uvek jer kontekst ili prioriteti variraju." },
                    { score: 1, text: "B. Predlozi ove osobe retko nailaze na širi odziv; ili se ne prenose lako na druge ili ne dobijaju dovoljno pažnje." },
                    { score: 5, text: "C. Kolege aktivno razmatraju predloge ove osobe i često ih usvajaju ili prilagođavaju; ona postaje referentna tačka za poboljšanja u timu." }
                ]
            }
        ],
        MINDSET: [
            // STUB: PREMA SEBI
            {
                id: "PM_PS_2.1C",
                pillar: "PREMA SEBI",
                dimension: "NAČIN RAZMIŠLJANJA",
                facet: "Samosvest, Mentalitet rasta i agilnost učenja, Otpornost, Otvorenost prema promenama",
                type: "core",
                text: "PP – Osnovni scenario 2.1: Ova osoba dobija konstruktivnu povratnu informaciju od kolega o svom pristupu radu i istovremeno doživljava neuspehe na projektu. Kako obično reaguje na ove situacije?",
                options: [
                    { score: 3, text: "A. Sluša povratnu informaciju i razmatra šta je validno; metodično radi na prevazilaženju neuspeha prilagođavanjem pristupa." },
                    { score: 1, text: "B. Inicijalno brani pristup kada dobija povratnu informaciju; frustrira je kada stvari ne idu prema planu i sporije se prilagođava novim okolnostima." },
                    { score: 5, text: "C. Aktivno traži povratne informacije, na neuspehe gleda kao na prilike za učenje i otvoreno deli sa kolegama na čemu radi i šta planira da poboljša." }
                ]
            },
            {
                id: "PM_PS_2.1R",
                pillar: "PREMA SEBI",
                dimension: "NAČIN RAZMIŠLJANJA",
                type: "reflection",
                text: "PP – Refleksija o uticaju 2.1: Kada ova osoba dobije povratnu informaciju od kolege koja dovodi u pitanje njen pristup, kako je obično obrađuje?",
                options: [
                    { score: 1, text: "A. U početku pruža otpor ili brani pristup; treba joj vremena pre nego što može iskreno da razmotri promenu." },
                    { score: 5, text: "B. Iskreno je znatiželjna u vezi sa povratnim informacijama i eksperimentiše sa novim pristupima na osnovu onoga što čuje od kolega." },
                    { score: 3, text: "C. Selektivno usvaja povratne informacije — menja pristup kada se poklapa sa njenim sopstvenim zapažanjima." }
                ]
            },
            {
                id: "PM_PS_2.2C",
                pillar: "PREMA SEBI",
                dimension: "NAČIN RAZMIŠLJANJA",
                type: "core",
                text: "PP – Osnovni scenario 2.2: Tim prolazi kroz periode promena i uvođenja novih alata ili procesa. Kako ova osoba obično reaguje na promene i izazove koji su van njene zone komfora?",
                options: [
                    { score: 1, text: "A. Preferira poznate metode i sporo usvaja promene; njena rezervisanost prema novim načinima rada može da uspori ceo tim." },
                    { score: 5, text: "B. Vidi promenu kao prirodan i pozitivan deo rada; brzo se prilagođava, entuzijastično istražuje nove mogućnosti i inspiriše kolege da učine isto." },
                    { score: 3, text: "C. Prihvata promene kao neophodne i metodično se prilagođava; nije najoduševljenija kada je u pitanju promena, ali se prilagođava bez velikog otpora." }
                ]
            },
            {
                id: "PM_PS_2.2R",
                pillar: "PREMA SEBI",
                dimension: "NAČIN RAZMIŠLJANJA",
                type: "reflection",
                text: "PP – Refleksija o uticaju 2.2: Kako ova osoba obično deluje na ostatak tima tokom perioda promena?",
                options: [
                    { score: 5, text: "A. Njen entuzijazam i otvorenost prema promeni pozitivno deluju na moral i tempo prilagođavanja tima." },
                    { score: 3, text: "B. Njen pristup promeni je neutralan — ne podstičе ni ne koči prilagođavanje tima." },
                    { score: 1, text: "C. Njena nelagodnost ili otpor prema promeni ponekad negativno utiče na moral ili tempo prilagođavanja tima." }
                ]
            },
            // STUB: PREMA DRUGIMA
            {
                id: "PM_PD_2.3C",
                pillar: "PREMA DRUGIMA",
                dimension: "NAČIN RAZMIŠLJANJA",
                facet: "Empatija, Posvećenost timu i saradnja, Konstruktivno rešavanje neslaganja, Inkluzivnost",
                type: "core",
                text: "PP – Osnovni scenario 2.3: U timu postoje neslaganja oko pristupa projektu, a jedan od članova tima se muči da izrazi mišljenje. Kako ova osoba obično doprinosi grupnoj dinamici u takvim situacijama?",
                options: [
                    { score: 3, text: "A. Sluša različite perspektive i pomaže da se razumeju brige svake strane; trudi se da podrži tiše kolege da izraze mišljenje." },
                    { score: 1, text: "B. Ostaje uglavnom neutralna u konfliktima, prepuštajući kolegama da sami reše neslaganja; ne podstiče aktivno inkluzivno učešće." },
                    { score: 5, text: "C. Aktivno doprinosi konstruktivnom razrešenju neslaganja, postavljajući pitanja koja pomažu da se razumeju perspektive; eksplicitno poziva kolege koji se ustežu da podele mišljenje." }
                ]
            },
            {
                id: "PM_PD_2.3R",
                pillar: "PREMA DRUGIMA",
                dimension: "NAČIN RAZMIŠLJANJA",
                type: "reflection",
                text: "PP – Refleksija o uticaju 2.3: Kako ova osoba obično pristupa razumevanju različitih perspektiva kada se ne slaže sa kolegama?",
                options: [
                    { score: 1, text: "A. Sluša, ali ponekad brzo zauzme stranu; ne istražuje uvek dublje motive iza različitih pozicija." },
                    { score: 5, text: "B. Iskreno je znatiželjna za perspektive kolega čak i kada u početku ima jasno mišljenje; često otkriva legitimne brige koje je ranije previda." },
                    { score: 3, text: "C. Pažljivo sluša i pita za pojašnjenje; priznaje validne tačke čak i kada se ne slaže sa celokupnom pozicijom kolege." }
                ]
            },
            {
                id: "PM_PD_2.4C",
                pillar: "PREMA DRUGIMA",
                dimension: "NAČIN RAZMIŠLJANJA",
                type: "core",
                text: "PP – Osnovni scenario 2.4: Tim radi na složenom projektu koji zahteva blisku saradnju i deljenje znanja. Kako ova osoba obično doprinosi saradnji i posvećenosti tima?",
                options: [
                    { score: 5, text: "A. Proaktivno nudi pomoć kolegama, rado deli znanje i veštine, i aktivno traži prilike da doprinese uspehu celog tima — ne samo svojih zadataka." },
                    { score: 1, text: "B. Fokusira se na sopstvene zadatke i deli informacije samo kada su direktno upitana; ne prati aktivno potrebe kolega." },
                    { score: 3, text: "C. Učestvuje u timskim aktivnostima i deli znanje kada je upitana; povremeno se javi da ponudi pomoć, mada ne uvek proaktivno." }
                ]
            },
            {
                id: "PM_PD_2.4R",
                pillar: "PREMA DRUGIMA",
                dimension: "NAČIN RAZMIŠLJANJA",
                type: "reflection",
                text: "PP – Refleksija o uticaju 2.4: Kada kolega ove osobe se muči ili radi u izolaciji, kako ova osoba obično reaguje?",
                options: [
                    { score: 3, text: "A. Primećuje kada se kolega muči i ponudi pomoć; povremeno se javi ako misli da bi njen doprinos bio koristan." },
                    { score: 1, text: "B. Često ne primećuje ili pretpostavlja da se kolege sami snalaze; reaguje tek kada problem postane vidljiv ili kolega direktno zatraži pomoć." },
                    { score: 5, text: "C. Redovno obraća pažnju na to kako se kolege snalaze i proaktivno se obraća kada primeti da neko može imati koristi od podrške." }
                ]
            },
            // STUB: PREMA KOMPANIJI I POSLU
            {
                id: "PM_KP_2.5C",
                pillar: "PREMA KOMPANIJI I POSLU",
                dimension: "NAČIN RAZMIŠLJANJA",
                facet: "Odgovornost i vlasništvo, Pouzdanost, Usklađenost sa vrednostima, Profesionalni integritet",
                type: "core",
                text: "PP – Osnovni scenario 2.5: Projekat na kome ova osoba radi zajedno sa timom nailazi na prepreke ili neuspehe. Kako obično reaguje i preuzima odgovornost?",
                options: [
                    { score: 3, text: "A. Preuzima odgovornost za svoj deo u neuspehu i identifikuje šta može poboljšati; konstruktivno doprinosi pronalaženju rešenja." },
                    { score: 5, text: "B. Preuzima punu odgovornost, aktivno analizira šta je doprinelo neuspehu i predlaže sistemska poboljšanja koja bi sprečila ponavljanje." },
                    { score: 1, text: "C. Uglavnom ističe spoljne faktore ili doprinos drugih; neodlučna je u teškim trenucima i sporo prelazi na rešavanje problema." }
                ]
            },
            {
                id: "PM_KP_2.5R",
                pillar: "PREMA KOMPANIJI I POSLU",
                dimension: "NAČIN RAZMIŠLJANJA",
                type: "reflection",
                text: "PP – Refleksija o uticaju 2.5: Koliko se kolege mogu osloniti na ovu osobu da preuzme vlasništvo nad onim na šta se obavezala?",
                options: [
                    { score: 1, text: "A. Kolege ponekad moraju da prate ili podsećaju ovu osobu; može biti nepouzdana i to narušava poverenje u timu." },
                    { score: 5, text: "B. Kolege se u potpunosti mogu osloniti na ovu osobu; ona isporučuje ono što kaže da će isporučiti i proaktivno komunicira ako nešto ne može da ispuni." },
                    { score: 3, text: "C. Kolege se generalno mogu osloniti na nju; povremeno joj je potrebno usmeravanje, ali retko razočara bez najave." }
                ]
            },
            {
                id: "PM_KP_2.6C",
                pillar: "PREMA KOMPANIJI I POSLU",
                dimension: "NAČIN RAZMIŠLJANJA",
                type: "core",
                text: "PP – Osnovni scenario 2.6: Ova osoba ima ideju ili predlog za poboljšanje zajedničkog rada koji bi mogao naići na otpor u timu. Kako obično zagovara svoje ideje?",
                options: [
                    { score: 1, text: "A. Iznosi predlog direktno i pretpostavlja da će logika sama da govori; ne gradi uvek širu podršku pre iznošenja ideje." },
                    { score: 3, text: "B. Priprema dobar argument i deli ga sa kolegama, uzimajući u obzir njihove brige i prilagođavajući predlog tamo gde ima smisla." },
                    { score: 5, text: "C. Proaktivno angažuje kolege u razvoju ideje, sluša brige i aktivno prilagođava pristup; zagovara ono u što veruje na konstruktivan i ubeđujući način." }
                ]
            },
            {
                id: "PM_KP_2.6R",
                pillar: "PREMA KOMPANIJI I POSLU",
                dimension: "NAČIN RAZMIŠLJANJA",
                type: "reflection",
                text: "PP – Refleksija o uticaju 2.6: Kada ova osoba iznese predlog ili ideju koja nailazi na otpor u timu, šta se obično desi?",
                options: [
                    { score: 1, text: "A. Ideja obično ne napreduje; ova osoba nije uvek sigurna zašto nailazi na otpor i brzo napušta predlog." },
                    { score: 5, text: "B. Ova osoba nastavlja da zagovara i angažuje kolege; ideja se ili usvoji ili je jasno da je iznela najjači mogući argument." },
                    { score: 3, text: "C. Ideja polako dobija podršku nakon što ova osoba adresira brige; napreduje uz dovoljno podrške da se isproba." }
                ]
            }
        ],
        VEŠTINE: [
            // STUB: LIČNA EFIKASNOST I SARADNJA
            {
                id: "PV_LE_3.1C",
                pillar: "LIČNA EFIKASNOST I SARADNJA",
                dimension: "VEŠTINE",
                facet: "Upravljanje prioritetima, Rešavanje problema, Prilagodljivost, Pouzdanost",
                type: "core",
                text: "PP – Osnovni scenario 3.1: Tim je pod pritiskom — obim posla je velik, rokovi su kratki i uveden je novi alat ili proces koji menja radni tok. Kako ova osoba obično upravlja sopstvenim obimom rada i doprinosi efikasnosti tima?",
                options: [
                    { score: 3, text: "A. Organizuje sopstveni posao sistematično, uči novi alat metodično i uspeva da ispuni obaveze bez negativnog uticaja na kolege tokom tranzicije." },
                    { score: 1, text: "B. Reaguje na hitne zadatke, sporo usvaja novi alat i ponekad stvara uska grla koja usporavaju rad kolega." },
                    { score: 5, text: "C. Promišljeno organizuje sopstveni posao, brzo savladava novi alat i aktivno deli naučeno sa timom — ubrzavajući kolektivno usvajanje." }
                ]
            },
            {
                id: "PV_LE_3.1R",
                pillar: "LIČNA EFIKASNOST I SARADNJA",
                dimension: "VEŠTINE",
                type: "reflection",
                text: "PP – Refleksija o uticaju 3.1: Kada je tim prolazio kroz period promena ili uvođenja novih alata, kako je doprinos ove osobe uticao na kolege?",
                options: [
                    { score: 5, text: "A. Njena brzina usvajanja i proaktivno deljenje znanja pozitivno su ubrzali prilagođavanje celog tima." },
                    { score: 1, text: "B. Njena spora adaptacija ponekad je stvarala teškoće za kolege koji su zavisili od njene isporuke ili znanja." },
                    { score: 3, text: "C. Njen doprinos je bio adekvatan — prilagodila se bez ometanja kolega, mada nije posebno ubrzala prilagođavanje tima." }
                ]
            },
            {
                id: "PV_LE_3.2C",
                pillar: "LIČNA EFIKASNOST I SARADNJA",
                dimension: "VEŠTINE",
                type: "core",
                text: "PP – Osnovni scenario 3.2: Tim se suočava sa ponavljajućim problemom koji uzrokuje kašnjenja u zajedničkom radu. Kako ova osoba obično pristupa rešavanju ovog problema?",
                options: [
                    { score: 1, text: "A. Uglavnom pronalazi načine da zaobiđe problem dok ne bude adresiran od strane nekog drugog; ne inicira sistematično rešavanje." },
                    { score: 5, text: "B. Proaktivno identifikuje suštinski uzrok problema i predlaže ili implementira sistemsko rešenje, poboljšavajući radni tok za ceo tim." },
                    { score: 3, text: "C. Analizira problem i predlaže rešenje; doprinosi rešavanju, mada inicijativa za dublje sistemske promene obično dolazi od nekoga drugog." }
                ]
            },
            {
                id: "PV_LE_3.2R",
                pillar: "LIČNA EFIKASNOST I SARADNJA",
                dimension: "VEŠTINE",
                type: "reflection",
                text: "PP – Refleksija o uticaju 3.2: Kada ova osoba doprinese rešavanju zajedničkog problema u timu, koliko dugo se rešenje zaista održava?",
                options: [
                    { score: 3, text: "A. Rešenje funkcioniše i generalno se održava uz manja prilagođavanja tima." },
                    { score: 5, text: "B. Rešenje adresira suštinski uzrok i ima trajni efekat; doprinos ove osobe podiže kvalitet rada celog tima na duži rok." },
                    { score: 1, text: "C. Rešenje u početku funkcioniše ali problem ima tendenciju da se ponovo pojavi; nije uvek jasno da li je suštinski uzrok adresiran." }
                ]
            },
            // STUB: KOMUNIKACIJA
            {
                id: "PV_KO_3.3C",
                pillar: "KOMUNIKACIJA",
                dimension: "VEŠTINE",
                facet: "Jasnoća i preciznost u komunikaciji, Aktivno slušanje, Uticaj na kolege, Konstruktivnost u iznošenju stavova",
                type: "core",
                text: "PP – Osnovni scenario 3.3: Ova osoba treba da iznese složenu ili kontroverznу ideju kolegama koji su skeptični ili zauzeti. Kako obično pristupa ovom komunikacionom izazovu?",
                options: [
                    { score: 3, text: "A. Priprema jasnu poruku imajući na umu perspektivu kolega i prilagođava objašnjenje kada sluša brige." },
                    { score: 1, text: "B. Iznosi detaljan argument fokusiran na logiku, ne predviđajući uvek brige ili perspektivu kolega unapred." },
                    { score: 5, text: "C. Razmišlja unapred o perspektivi kolega i uokviruje ideju u kontekstu zajedničkih ciljeva; pažljivo sluša i prilagođava komunikaciju — tražeći pristup koji funkcioniše za sve." }
                ]
            },
            {
                id: "PV_KO_3.3R",
                pillar: "KOMUNIKACIJA",
                dimension: "VEŠTINE",
                type: "reflection",
                text: "PP – Refleksija o uticaju 3.3: Kada ova osoba iznese ideju ili predlog skeptičnim kolegama, šta se obično desi?",
                options: [
                    { score: 1, text: "A. Kolege ostaju skeptične ili ne usvajaju ideju; objašnjenje ne adresira ključne brige ili ideja ne dobija širu podršku." },
                    { score: 5, text: "B. Kolege razumeju ideju, angažuju se sa njom i zajednički razrađuju praktične detalje implementacije." },
                    { score: 3, text: "C. Kolege razumeju ideju i pristaju na nastavak nakon razgovora; dolazi do određene razmene, ali se zajednički donosi odluka." }
                ]
            },
            {
                id: "PV_KO_3.4C",
                pillar: "KOMUNIKACIJA",
                dimension: "VEŠTINE",
                type: "core",
                text: "PP – Osnovni scenario 3.4: Ova osoba treba da koordinira ili dobije podršku od kolega ili drugog tima koji ima konkurentske prioritete i obaveze. Kako obično pristupa ovoj vrsti koordinacije?",
                options: [
                    { score: 1, text: "A. Upućuje direktan zahtev objašnjavajući šta joj treba, ne razumejući uvek u potpunosti ograničenja i prioritete kolega unapred." },
                    { score: 5, text: "B. Gleda na koordinaciju kao na prilike za izgradnju odnosa; uokviruje zahteve u kontekstu zajedničkih koristi i istražuje fleksibilna rešenja koja funkcionišu za obe strane." },
                    { score: 3, text: "C. Obraća se kolegama, objašnjava potrebu i pita o njihovim prioritetima; traži načine na koje bi se zajednički ciljevi mogli uskladiti." }
                ]
            },
            {
                id: "PV_KO_3.4R",
                pillar: "KOMUNIKACIJA",
                dimension: "VEŠTINE",
                type: "reflection",
                text: "PP – Refleksija o uticaju 3.4: Kada ova osoba traži koordinaciju ili podršku od kolega, šta je obično rezultat?",
                options: [
                    { score: 1, text: "A. Kolege teško ispunjavaju zahteve ili ih odlažu; ova osoba mora tražiti alternative ili eskalirati." },
                    { score: 5, text: "B. Kolege razumeju zahtev, angažuju se brzo i zajednički rade na rešenju; saradnja se odvija glatko." },
                    { score: 3, text: "C. Kolege pružaju podršku, mada ponekad uz pregovore o rokovima ili obimu; zajedno se pronalazi prihvatljiv put." }
                ]
            },
            // STUB: DOPRINOS TIMU I RAZVOJ
            {
                id: "PV_DT_3.5C",
                pillar: "DOPRINOS TIMU I RAZVOJ",
                dimension: "VEŠTINE",
                facet: "Mentorstvo i podrška kolegama, Davanje i primanje povratnih informacija, Učestvovanje u razvoju tima, Konstruktivni razgovori",
                type: "core",
                text: "PP – Osnovni scenario 3.5: Novi ili manje iskusni kolega se muči sa zadatkom, a tim je istovremeno postigao zajednički uspeh vredan priznavanja. Kako ova osoba obično odgovara na ove situacije?",
                options: [
                    { score: 1, text: "A. Ne primeću'e uvek kada se kolega muči ili ostavlja im da sami dođu do rešenja; za postignuti uspeh uglavnom ćuti ili daje generičke komentare." },
                    { score: 3, text: "B. Ponudi pomoć ako je kolega upita ili ako je situacija očigledna; za postignuti uspeh pruža iskrenu i konkretnu pohvalu." },
                    { score: 5, text: "C. Proaktivno primeću'e kada se kolega muči i nudi podršku pre nego što je zamolena; za postignuti uspeh konkretno ističe individualne doprinose i jača tim." }
                ]
            },
            {
                id: "PV_DT_3.5R",
                pillar: "DOPRINOS TIMU I RAZVOJ",
                dimension: "VEŠTINE",
                type: "reflection",
                text: "PP – Refleksija o uticaju 3.5: Koliko bi ste se vi kao kolega mogli osloniti na ovu osobu da vam pomogne kada se suočite sa izazovom?",
                options: [
                    { score: 1, text: "A. Ova osoba retko nudi pomoć bez direktnog traženja i ponekad ima ograničenu raspoloživost ili volju da pomogne." },
                    { score: 3, text: "B. Ova osoba bi pomogla ako bi je pitao/la; generalno je pouzdana kada ju zatražimo za podršku." },
                    { score: 5, text: "C. Ova osoba bi primetila ako bi se mučio/la i ponudila bi pomoć pre nego što bih morao/la da tražim; aktivno doprinosi razvoju kolega." }
                ]
            },
            {
                id: "PV_DT_3.6C",
                pillar: "DOPRINOS TIMU I RAZVOJ",
                dimension: "VEŠTINE",
                type: "core",
                text: "PP – Osnovni scenario 3.6: Postoji situacija u kojoj je potrebno dati konstruktivnu povratnu informaciju kolegi čije ponašanje negativno utiče na timski rad. Kako ova osoba obično pristupa ovim teškim razgovorima?",
                options: [
                    { score: 1, text: "A. Uglavnom izbegava direktne razgovore o problematičnom ponašanju, preferirajući da se nada da će se problem sam razrešiti ili da će neko drugi intervenisati." },
                    { score: 3, text: "B. Pristupa razgovoru diplomatično, iznosi konkretne primere i jasno opisuje uticaj na tim; ostaje profesionalna i konstruktivna." },
                    { score: 5, text: "C. Priprema se za razgovor, razmišlja o tome kako kolega može reagovati i planira pristup; iznosi povratnu informaciju na način koji podstiče razumevanje i rast, a ne defanzivnost." }
                ]
            },
            {
                id: "PV_DT_3.6R",
                pillar: "DOPRINOS TIMU I RAZVOJ",
                dimension: "VEŠTINE",
                type: "reflection",
                text: "PP – Refleksija o uticaju 3.6: Kada ova osoba da konstruktivnu povratnu informaciju kolegi, kakav je obično ishod?",
                options: [
                    { score: 1, text: "A. Razgovor je nelagodan ili ne postiže cilj; kolega se brani ili nije jasno da li razume šta treba da se promeni." },
                    { score: 3, text: "B. Razgovor je jasan i profesionalan; kolega razume poruku, mada može biti određenog početnog otpora." },
                    { score: 5, text: "C. Razgovor je produktivan; kolega se angažuje konstruktivno i dolazi do vidljivih promena u ponašanju." }
                ]
            }
        ],
        UTICAJ: [
            // STUB: KAKO DOPRINOSI ATMOSFERI U TIMU?
            {
                id: "PU_AT_4.1C",
                pillar: "ATMOSFERA U TIMU",
                dimension: "UTICAJ",
                facet: "Autentičnost, Emocionalna prisutnost, Inkluzivnost, Izgradnja poverenja",
                type: "core",
                text: "PP – Osnovni scenario 4.1: Tim prolazi kroz period neizvesnosti ili napetosti. Neki kolege su vidno uznemireni, drugi se ustežu da izraze brige. Kako ova osoba obično doprinosi emocionalnoj klimi i psihološkoj bezbednosti tima?",
                options: [
                    { score: 3, text: "A. Primećuje kada su kolege uznemireni i aktivno im otvara prostor da podele brige; trudi se da uključi one koji se ustežu." },
                    { score: 1, text: "B. Fokusira se na posao i ne inicira razgovore o emocionalnoj klimi; pretpostavlja da će kolege sami izneti brige ako žele." },
                    { score: 5, text: "C. Aktivno stvara prostor za otvorenu komunikaciju; uznaje da je neizvesnost normalna i pomaže kolegama da se osećaju saslušano i prihvaćeno." }
                ]
            },
            {
                id: "PU_AT_4.1R",
                pillar: "ATMOSFERA U TIMU",
                dimension: "UTICAJ",
                type: "reflection",
                text: "PP – Refleksija o uticaju 4.1: Kako prisustvo ove osobe obično utiče na atmosferu u timu?",
                options: [
                    { score: 1, text: "A. Prisustvo ove osobe ponekad dodaje napetost ili je neutralno; njen doprinos atmosferi nije posebno pozitivan." },
                    { score: 5, text: "B. Ova osoba ima izražen pozitivan efekat na atmosferu; kolege se osećaju sigurnije, otvorenije i angažovanije kada je ona prisutna." },
                    { score: 3, text: "C. Prisustvo ove osobe je generalno pozitivno; kolege se osećaju ugodnije, mada njen uticaj na klimu nije posebno izražen." }
                ]
            },
            {
                id: "PU_AT_4.2C",
                pillar: "ATMOSFERA U TIMU",
                dimension: "UTICAJ",
                type: "core",
                text: "PP – Osnovni scenario 4.2: Doneta je teška timska odluka koja negativno utiče na neke kolege. Ova osoba nije bila donosilac odluke. Kako obično reaguje i komunicira u ovakvim situacijama?",
                options: [
                    { score: 5, text: "A. Pomaže kolegama da razumeju kontekst odluke ako ga poznaje; aktivno sluša brige pogođenih i pomaže u održavanju kohezije tima čak i kada je situacija teška." },
                    { score: 1, text: "B. Ne uključuje se posebno u razgovor o odluci; fokusira se na sopstveni posao i prepušta pogođenim kolegama da sami obrađuju situaciju." },
                    { score: 3, text: "C. Sluša brige pogođenih kolega i nudi podršku; ne preuzima aktivnu ulogu u objašnjavanju odluke, ali pomaže u održavanju pozitivne klime." }
                ]
            },
            {
                id: "PU_AT_4.2R",
                pillar: "ATMOSFERA U TIMU",
                dimension: "UTICAJ",
                type: "reflection",
                text: "PP – Refleksija o uticaju 4.2: Kada tim prolazi kroz tešku promenu ili odluku, kakav je doprinos ove osobe koheziji tima?",
                options: [
                    { score: 1, text: "A. Ova osoba se uglavnom povlači ili ostaje neutralna; njen doprinos koheziji tima u teškim trenucima je minimalan." },
                    { score: 3, text: "B. Ova osoba pruža podršku kolegama i doprinosi pozitivnoj atmosferi u meri u kojoj može." },
                    { score: 5, text: "C. Ova osoba aktivno pomaže u održavanju kohezije tima; njena prisutnost i podrška imaju značajan pozitivan efekat na moral i tim." }
                ]
            },
            // STUB: KAKO POKREĆE KOLEGE NA AKCIJU?
            {
                id: "PU_KPA_4.3C",
                pillar: "KAKO POKREĆE KOLEGE?",
                dimension: "UTICAJ",
                facet: "Inspiracija i motivacija kolega, Podrška angažovanosti, Zagovaranje za tim, Uticaj bez autoriteta",
                type: "core",
                text: "PP – Osnovni scenario 4.3: Tim radi na zahtevnom projektu sa kratkim rokom, a neke kolege deluju nezainteresovano ili demotivisano. Kako ova osoba obično doprinosi motivaciji i angažovanosti tima?",
                options: [
                    { score: 3, text: "A. Aktivno se angažuje u poslu i komunicira važnost; nudi pomoć kolegama koji se muče i trudi se da tim ostane motivisan." },
                    { score: 1, text: "B. Fokusira se na sopstvene zadatke i prepušta drugima da sami regulišu sopstvenu motivaciju." },
                    { score: 5, text: "C. Proaktivno pomaže kolegama da razumeju smisao i važnost svog doprinosa; energizuje tim i podiže moral čak i u teškim periodima." }
                ]
            },
            {
                id: "PU_KPA_4.3R",
                pillar: "KAKO POKREĆE KOLEGE?",
                dimension: "UTICAJ",
                type: "reflection",
                text: "PP – Refleksija o uticaju 4.3: Kada ova osoba pokušava da motivishe ili angažuje kolege, šta se obično desi?",
                options: [
                    { score: 5, text: "A. Kolege reaguju pozitivno; vidljivo je povećanje angažovanosti i motivacije u timu." },
                    { score: 1, text: "B. Efekat na kolege je ograničen; ova osoba ne uspeva uvek da pokrene druge i zna kako to da uradi." },
                    { score: 3, text: "C. Neke kolege reaguju pozitivno; dolazi do određenog povećanja angažovanosti, mada ne kod svih." }
                ]
            },
            {
                id: "PU_KPA_4.4C",
                pillar: "KAKO POKREĆE KOLEGE?",
                dimension: "UTICAJ",
                type: "core",
                text: "PP – Osnovni scenario 4.4: Ova osoba identifikuje nešto što bi moglo poboljšati način rada tima, ali zna da predlog može naići na otpor kod kolega ili nadređenih. Kako obično zagovara promene koje smatra važnim?",
                options: [
                    { score: 1, text: "A. Iznosi predlog direktno i pretpostavlja da će argument sam da govori; ne gradi uvek podršku pre iznošenja ideje." },
                    { score: 3, text: "B. Priprema dobar argument i deli ga sa relevantnim kolegama, uzimajući u obzir njihove brige i prilagođavajući pristup." },
                    { score: 5, text: "C. Aktivno angažuje kolege u razvoju ideje, sluša brige i prilagođava predlog; zagovara konstruktivno i uporno, čak i kada nailazi na otpor." }
                ]
            },
            {
                id: "PU_KPA_4.4R",
                pillar: "KAKO POKREĆE KOLEGE?",
                dimension: "UTICAJ",
                type: "reflection",
                text: "PP – Refleksija o uticaju 4.4: Kada ova osoba zagovara promenu ili poboljšanje koje nailazi na otpor, šta se obično desi?",
                options: [
                    { score: 1, text: "A. Ideja obično ne napreduje; ova osoba nije uvek sigurna zašto nailazi na otpor i brzo odustaje od predloga." },
                    { score: 5, text: "B. Ova osoba nastavlja da zagovara i angažuje kolege; ideja se ili usvoji ili je jasno da je iznela najjači mogući argument." },
                    { score: 3, text: "C. Ideja polako dobija podršku; napreduje uz dovoljno podrške kolega da se isproba." }
                ]
            }
        ]
    },
    eng: {
        RESULTS: [
            // PILLAR: SHORT-TERM GOALS
            {
                id: "PR_STG_1.1C",
                pillar: "SHORT-TERM GOALS",
                dimension: "RESULTS",
                facet: "Execution Focus & Delivery, Problem-Solving, Reliability & Consistency, Performance Under Pressure",
                type: "core",
                text: "PA - Core Scenario 1.1: During demanding periods with tight deadlines, how does this person typically approach their work and contribution to shared team goals?",
                options: [
                    { score: 3, text: "A. Organized and focused on delivery; generally meets deadlines with acceptable quality, though sometimes needs reminders or coordination from colleagues." },
                    { score: 1, text: "B. Mostly reacts to what is most urgent at any given moment; delivery is uneven and colleagues sometimes don't know what to expect from them." },
                    { score: 5, text: "C. Plans proactively and takes ownership of outcomes; colleagues can rely on them — delivery is predictable and surprises are rare." }
                ]
            },
            {
                id: "PR_STG_1.1R",
                pillar: "SHORT-TERM GOALS",
                dimension: "RESULTS",
                type: "reflection",
                text: "PA - Reflection on Impact 1.1: When this person's delivery is delayed or falls short, what is typically the cause?",
                options: [
                    { score: 5, text: "A. They take ownership and adjust their approach when obstacles appear — delays are rare, and when they occur, they are resolved independently and quickly." },
                    { score: 3, text: "B. Unexpected circumstances sometimes require adjustments, but they generally handle these with minimal coordination from colleagues." },
                    { score: 1, text: "C. Shortfalls repeat and colleagues need to track or remind this person to stay on track." }
                ]
            },
            {
                id: "PR_STG_1.2C",
                pillar: "SHORT-TERM GOALS",
                dimension: "RESULTS",
                type: "core",
                text: "PA - Core Scenario 1.2: An unexpected problem disrupts shared work and creates pressure on the team. How does this person typically respond when the team is under stress?",
                options: [
                    { score: 1, text: "A. Focuses on resolving the immediate problem quickly, which helps in the short term, but similar issues recur because underlying causes are not systematically addressed." },
                    { score: 5, text: "B. Stays calm and has a stabilizing effect on the team; not only contributes to resolving the immediate issue, but proactively thinks about preventing recurrence." },
                    { score: 3, text: "C. Stays calm and contributes in an organized way to resolving the problem, helping the team stabilize and continue without further disruption." }
                ]
            },
            {
                id: "PR_STG_1.2R",
                pillar: "SHORT-TERM GOALS",
                dimension: "RESULTS",
                type: "reflection",
                text: "PA - Reflection on Impact 1.2: When this person contributes to solving a shared team problem, how long does the solution typically hold?",
                options: [
                    { score: 3, text: "A. The solution generally works, though related challenges occasionally emerge that the team works through together." },
                    { score: 1, text: "B. Similar problems recur relatively quickly, suggesting their contribution addresses symptoms rather than the underlying cause." },
                    { score: 5, text: "C. Similar problems rarely recur; their contribution has a lasting positive effect on how the team works." }
                ]
            },
            // PILLAR: LONG-TERM CHANGE
            {
                id: "PR_LTC_1.3C",
                pillar: "LONG-TERM CHANGE",
                dimension: "RESULTS",
                facet: "Adapting to Change, Initiative & Process Improvement, Knowledge Sharing, Contributing to Team Development",
                type: "core",
                text: "PA - Core Scenario 1.3: The organization is introducing changes that require learning new ways of working. How does this person typically contribute to the team's adaptation and development of new approaches?",
                options: [
                    { score: 3, text: "A. Embraces the changes and invests effort in acquiring new skills; shares what they learn with colleagues when asked." },
                    { score: 1, text: "B. Adapts slowly and prefers established methods; their contribution to the team's adaptation is limited and colleagues often cannot rely on them in these moments." },
                    { score: 5, text: "C. Enthusiastically embraces changes, experiments with new approaches, and proactively shares learnings with the team — accelerating collective adaptation." }
                ]
            },
            {
                id: "PR_LTC_1.3R",
                pillar: "LONG-TERM CHANGE",
                dimension: "RESULTS",
                type: "reflection",
                text: "PA - Reflection on Impact 1.3: How quickly and smoothly does this person typically adopt and implement new ways of working?",
                options: [
                    { score: 1, text: "A. Adaptation takes longer than colleagues; they tend to stay with old habits and this can slow down the team." },
                    { score: 5, text: "B. Quickly adopts new ways of working and their enthusiasm positively energizes the whole team; they become a resource for colleagues during transitions." },
                    { score: 3, text: "C. Adapts within a reasonable timeframe without major difficulty; their contribution is adequate though not exceptionally fast." }
                ]
            },
            {
                id: "PR_LTC_1.4C",
                pillar: "LONG-TERM CHANGE",
                dimension: "RESULTS",
                type: "core",
                text: "PA - Core Scenario 1.4: The team is going through an organizational transformation while there is also a need to improve existing processes. How does this person typically contribute to this process?",
                options: [
                    { score: 5, text: "A. Actively participates in shaping how changes are implemented; proposes process improvements and works to build shared support within the team." },
                    { score: 1, text: "B. Focuses on meeting the requirements of the transformation without actively contributing to process improvements; relies on others to shape the change." },
                    { score: 3, text: "C. Understands and accepts the organizational transformation and occasionally proposes incremental process improvements that align with the new direction." }
                ]
            },
            {
                id: "PR_LTC_1.4R",
                pillar: "LONG-TERM CHANGE",
                dimension: "RESULTS",
                type: "reflection",
                text: "PA - Reflection on Impact 1.4: When this person proposes a new approach or improvement, how much do others engage with that proposal?",
                options: [
                    { score: 3, text: "A. Colleagues consider their proposals but don't always adopt them because context or priorities vary." },
                    { score: 1, text: "B. Their proposals rarely get broader uptake; either they don't transfer easily to others or they don't attract sufficient attention." },
                    { score: 5, text: "C. Colleagues actively consider their proposals and often adopt or adapt them; they become a reference point for improvements in the team." }
                ]
            }
        ],
        MINDSET: [
            // PILLAR: TOWARDS SELF
            {
                id: "PM_TS_2.1C",
                pillar: "TOWARDS SELF",
                dimension: "MINDSET",
                facet: "Self-Awareness, Growth Mindset & Learning Agility, Resilience, Openness to Change",
                type: "core",
                text: "PA - Core Scenario 2.1: This person receives constructive feedback from colleagues about their approach and simultaneously encounters setbacks on a project. How do they typically respond to these situations?",
                options: [
                    { score: 3, text: "A. Listens to feedback and considers what is valid; works methodically through setbacks by adapting their approach." },
                    { score: 1, text: "B. Initially defends their approach when receiving feedback; is frustrated when things don't go according to plan and is slower to adapt to new circumstances." },
                    { score: 5, text: "C. Actively seeks feedback, sees setbacks as learning opportunities, and openly shares with colleagues what they are working on and what they plan to improve." }
                ]
            },
            {
                id: "PM_TS_2.1R",
                pillar: "TOWARDS SELF",
                dimension: "MINDSET",
                type: "reflection",
                text: "PA - Reflection on Impact 2.1: When this person receives feedback from a colleague that challenges their approach, how do they typically process it?",
                options: [
                    { score: 1, text: "A. Initially resists or defends their approach; needs time before they can genuinely consider a change." },
                    { score: 5, text: "B. Genuinely curious about feedback and experiments with new approaches based on what they hear from colleagues." },
                    { score: 3, text: "C. Selectively incorporates feedback — changes approach when it aligns with their own observations." }
                ]
            },
            {
                id: "PM_TS_2.2C",
                pillar: "TOWARDS SELF",
                dimension: "MINDSET",
                type: "core",
                text: "PA - Core Scenario 2.2: The team goes through periods of change and introduction of new tools or processes. How does this person typically respond to changes and challenges outside their comfort zone?",
                options: [
                    { score: 1, text: "A. Prefers familiar methods and adopts changes slowly; their reluctance toward new ways of working can slow down the whole team." },
                    { score: 5, text: "B. Sees change as a natural and positive part of work; adapts quickly, enthusiastically explores new possibilities, and inspires colleagues to do the same." },
                    { score: 3, text: "C. Accepts changes as necessary and adapts methodically; not the most enthusiastic about change, but adapts without significant resistance." }
                ]
            },
            {
                id: "PM_TS_2.2R",
                pillar: "TOWARDS SELF",
                dimension: "MINDSET",
                type: "reflection",
                text: "PA - Reflection on Impact 2.2: How does this person typically affect the rest of the team during periods of change?",
                options: [
                    { score: 5, text: "A. Their enthusiasm and openness to change positively affect team morale and the pace of adaptation." },
                    { score: 3, text: "B. Their approach to change is neutral — they neither encourage nor hinder the team's adaptation." },
                    { score: 1, text: "C. Their discomfort or resistance to change sometimes negatively affects team morale or the pace of adaptation." }
                ]
            },
            // PILLAR: TOWARDS OTHERS
            {
                id: "PM_TO_2.3C",
                pillar: "TOWARDS OTHERS",
                dimension: "MINDSET",
                facet: "Empathy, Team Commitment & Collaboration, Constructive Disagreement, Inclusiveness",
                type: "core",
                text: "PA - Core Scenario 2.3: There are disagreements in the team about a project approach, and a team member is struggling to voice their opinion. How does this person typically contribute to group dynamics in such situations?",
                options: [
                    { score: 3, text: "A. Listens to different perspectives and helps clarify each side's concerns; makes an effort to support quieter colleagues in expressing their views." },
                    { score: 1, text: "B. Mostly stays neutral in conflicts, leaving colleagues to resolve disagreements themselves; does not actively encourage inclusive participation." },
                    { score: 5, text: "C. Actively contributes to constructive resolution of disagreements by asking questions that help illuminate perspectives; explicitly invites colleagues who are hesitant to share their view." }
                ]
            },
            {
                id: "PM_TO_2.3R",
                pillar: "TOWARDS OTHERS",
                dimension: "MINDSET",
                type: "reflection",
                text: "PA - Reflection on Impact 2.3: How does this person typically approach understanding different perspectives when they disagree with colleagues?",
                options: [
                    { score: 1, text: "A. Listens but sometimes quickly takes sides; doesn't always explore the deeper motivations behind different positions." },
                    { score: 5, text: "B. Genuinely curious about colleagues' perspectives even when they initially have a clear view; often discovers legitimate concerns they had previously overlooked." },
                    { score: 3, text: "C. Listens carefully and asks for clarification; acknowledges valid points even when disagreeing with a colleague's overall position." }
                ]
            },
            {
                id: "PM_TO_2.4C",
                pillar: "TOWARDS OTHERS",
                dimension: "MINDSET",
                type: "core",
                text: "PA - Core Scenario 2.4: The team is working on a complex project requiring close collaboration and knowledge sharing. How does this person typically contribute to team collaboration and commitment?",
                options: [
                    { score: 5, text: "A. Proactively offers help to colleagues, freely shares knowledge and skills, and actively looks for opportunities to contribute to the success of the whole team — not just their own tasks." },
                    { score: 1, text: "B. Focuses on their own tasks and shares information only when directly asked; does not actively track the needs of colleagues." },
                    { score: 3, text: "C. Participates in team activities and shares knowledge when asked; occasionally reaches out to offer help, though not always proactively." }
                ]
            },
            {
                id: "PM_TO_2.4R",
                pillar: "TOWARDS OTHERS",
                dimension: "MINDSET",
                type: "reflection",
                text: "PA - Reflection on Impact 2.4: When a colleague of this person is struggling or working in isolation, how does this person typically respond?",
                options: [
                    { score: 3, text: "A. Notices when a colleague seems to be struggling and offers help; sometimes reaches out if they think their contribution would be useful." },
                    { score: 1, text: "B. Often doesn't notice, or assumes colleagues are managing on their own; responds only when a problem becomes visible or a colleague directly asks for help." },
                    { score: 5, text: "C. Regularly pays attention to how colleagues are managing and proactively reaches out when they notice someone could benefit from support." }
                ]
            },
            // PILLAR: TOWARDS COMPANY & WORK
            {
                id: "PM_TCW_2.5C",
                pillar: "TOWARDS COMPANY & WORK",
                dimension: "MINDSET",
                facet: "Accountability & Ownership, Reliability, Values Alignment, Professional Integrity",
                type: "core",
                text: "PA - Core Scenario 2.5: A project this person is working on with the team encounters obstacles or failures. How do they typically respond and take ownership?",
                options: [
                    { score: 3, text: "A. Takes responsibility for their part in the failure and identifies what they can improve; constructively contributes to finding a solution." },
                    { score: 5, text: "B. Takes full ownership, actively analyzes what contributed to the failure, and proposes systemic improvements that would prevent recurrence." },
                    { score: 1, text: "C. Mostly highlights external factors or the contributions of others; tends to be indecisive in difficult moments and is slow to move to problem-solving." }
                ]
            },
            {
                id: "PM_TCW_2.5R",
                pillar: "TOWARDS COMPANY & WORK",
                dimension: "MINDSET",
                type: "reflection",
                text: "PA - Reflection on Impact 2.5: How much can colleagues rely on this person to take ownership of what they commit to?",
                options: [
                    { score: 1, text: "A. Colleagues sometimes have to track or remind this person; they can be unreliable and this erodes trust in the team." },
                    { score: 5, text: "B. Colleagues can fully rely on this person; they deliver what they say they will and proactively communicate when they cannot meet a commitment." },
                    { score: 3, text: "C. Colleagues can generally rely on them; occasionally they need guidance, but rarely disappoint without warning." }
                ]
            },
            {
                id: "PM_TCW_2.6C",
                pillar: "TOWARDS COMPANY & WORK",
                dimension: "MINDSET",
                type: "core",
                text: "PA - Core Scenario 2.6: This person has an idea or proposal to improve the way the team works that may face resistance from colleagues or managers. How do they typically advocate for their ideas?",
                options: [
                    { score: 1, text: "A. Presents the proposal directly and assumes the argument will speak for itself; doesn't always build support before putting forward the idea." },
                    { score: 3, text: "B. Prepares a good argument and shares it with colleagues, taking their concerns into account and adapting the proposal where it makes sense." },
                    { score: 5, text: "C. Proactively engages colleagues in developing the idea, listens to concerns, and actively adapts the approach; advocates constructively and persistently even when facing resistance." }
                ]
            },
            {
                id: "PM_TCW_2.6R",
                pillar: "TOWARDS COMPANY & WORK",
                dimension: "MINDSET",
                type: "reflection",
                text: "PA - Reflection on Impact 2.6: When this person puts forward a proposal or idea that faces resistance from colleagues, what typically happens?",
                options: [
                    { score: 1, text: "A. The idea typically doesn't progress; this person is not always sure why they face resistance and quickly abandons the proposal." },
                    { score: 5, text: "B. They continue to advocate and engage colleagues; the idea is either adopted or it becomes clear they have made the strongest possible case." },
                    { score: 3, text: "C. The idea gradually gains support; it moves forward with enough colleagues on board to be tried." }
                ]
            }
        ],
        SKILLS: [
            // PILLAR: PERSONAL EFFECTIVENESS & COLLABORATION
            {
                id: "PV_PEC_3.1C",
                pillar: "PERSONAL EFFECTIVENESS & COLLABORATION",
                dimension: "SKILLS",
                facet: "Priority Management, Problem-Solving, Adaptability, Reliability",
                type: "core",
                text: "PA - Core Scenario 3.1: The team is under pressure — the workload is high, deadlines are tight, and a new tool or process has been introduced that changes the workflow. How does this person typically manage their own workload and contribute to team efficiency?",
                options: [
                    { score: 3, text: "A. Organizes their own work systematically, learns the new tool methodically, and manages to meet their commitments without negatively affecting colleagues during the transition." },
                    { score: 1, text: "B. Reacts to urgent tasks, adopts the new tool slowly, and sometimes creates bottlenecks that slow down colleagues." },
                    { score: 5, text: "C. Thoughtfully organizes their own work, masters the new tool quickly, and actively shares learnings with the team — accelerating collective adoption." }
                ]
            },
            {
                id: "PV_PEC_3.1R",
                pillar: "PERSONAL EFFECTIVENESS & COLLABORATION",
                dimension: "SKILLS",
                type: "reflection",
                text: "PA - Reflection on Impact 3.1: When the team went through a period of change or adoption of new tools, how did this person's contribution affect colleagues?",
                options: [
                    { score: 5, text: "A. Their speed of adoption and proactive knowledge sharing positively accelerated the whole team's adaptation." },
                    { score: 1, text: "B. Their slow adaptation sometimes created difficulties for colleagues who depended on their delivery or knowledge." },
                    { score: 3, text: "C. Their contribution was adequate — they adapted without disrupting colleagues, though they did not particularly accelerate the team's adaptation." }
                ]
            },
            {
                id: "PV_PEC_3.2C",
                pillar: "PERSONAL EFFECTIVENESS & COLLABORATION",
                dimension: "SKILLS",
                type: "core",
                text: "PA - Core Scenario 3.2: The team is facing a recurring problem that causes delays in shared work. How does this person typically approach solving this problem?",
                options: [
                    { score: 1, text: "A. Mostly finds ways to work around the problem until it is addressed by someone else; does not initiate systematic resolution." },
                    { score: 5, text: "B. Proactively identifies the root cause and proposes or implements a systemic solution, improving the workflow for the whole team." },
                    { score: 3, text: "C. Analyzes the problem and proposes a solution; contributes to resolving it, though the initiative for deeper systemic changes usually comes from someone else." }
                ]
            },
            {
                id: "PV_PEC_3.2R",
                pillar: "PERSONAL EFFECTIVENESS & COLLABORATION",
                dimension: "SKILLS",
                type: "reflection",
                text: "PA - Reflection on Impact 3.2: When this person contributes to solving a shared team problem, how long does the solution typically hold?",
                options: [
                    { score: 3, text: "A. The solution works and generally holds with minor team adjustments." },
                    { score: 5, text: "B. The solution addresses the root cause and has a lasting effect; their contribution raises the quality of the whole team's work over time." },
                    { score: 1, text: "C. The solution works initially but the problem tends to resurface; it is not always clear whether the underlying cause was fully addressed." }
                ]
            },
            // PILLAR: COMMUNICATION
            {
                id: "PV_CO_3.3C",
                pillar: "COMMUNICATION",
                dimension: "SKILLS",
                facet: "Clarity & Precision, Active Listening, Peer Influence, Constructive Dialogue",
                type: "core",
                text: "PA - Core Scenario 3.3: This person needs to present a complex or controversial idea to colleagues who are skeptical or busy. How do they typically approach this communication challenge?",
                options: [
                    { score: 3, text: "A. Prepares a clear message with colleagues' perspectives in mind and adjusts the explanation when listening to concerns." },
                    { score: 1, text: "B. Presents a detailed argument focused on logic, not always anticipating the concerns or perspectives of colleagues upfront." },
                    { score: 5, text: "C. Thinks ahead about colleagues' perspectives and frames the idea in the context of shared goals; listens carefully and adapts the communication — seeking an approach that works for everyone." }
                ]
            },
            {
                id: "PV_CO_3.3R",
                pillar: "COMMUNICATION",
                dimension: "SKILLS",
                type: "reflection",
                text: "PA - Reflection on Impact 3.3: When this person presents an idea or proposal to skeptical colleagues, what typically happens?",
                options: [
                    { score: 1, text: "A. Colleagues remain skeptical or don't adopt the idea; the explanation doesn't address key concerns or the idea doesn't gain broader support." },
                    { score: 5, text: "B. Colleagues understand the idea, engage with it, and work together on the practical implementation details." },
                    { score: 3, text: "C. Colleagues understand the idea and agree to proceed after discussion; some exchange takes place but a decision is reached together." }
                ]
            },
            {
                id: "PV_CO_3.4C",
                pillar: "COMMUNICATION",
                dimension: "SKILLS",
                type: "core",
                text: "PA - Core Scenario 3.4: This person needs to coordinate or get support from colleagues or another team that has competing priorities and commitments. How do they typically approach this kind of coordination?",
                options: [
                    { score: 1, text: "A. Makes a direct request explaining what they need, without always fully understanding colleagues' constraints and priorities upfront." },
                    { score: 5, text: "B. Sees coordination as an opportunity to build relationships; frames requests in the context of mutual benefits and explores flexible solutions that work for both sides." },
                    { score: 3, text: "C. Reaches out to colleagues, explains the need, and asks about their priorities; looks for ways to align shared goals." }
                ]
            },
            {
                id: "PV_CO_3.4R",
                pillar: "COMMUNICATION",
                dimension: "SKILLS",
                type: "reflection",
                text: "PA - Reflection on Impact 3.4: When this person seeks coordination or support from colleagues, what is typically the result?",
                options: [
                    { score: 1, text: "A. Colleagues have difficulty fulfilling requests or delay them; this person must find alternatives or escalate." },
                    { score: 5, text: "B. Colleagues understand the request, engage quickly, and work together on a solution; collaboration runs smoothly." },
                    { score: 3, text: "C. Colleagues provide support, though sometimes with negotiation on timelines or scope; an acceptable path forward is found together." }
                ]
            },
            // PILLAR: TEAM CONTRIBUTION & DEVELOPMENT
            {
                id: "PV_TCD_3.5C",
                pillar: "TEAM CONTRIBUTION & DEVELOPMENT",
                dimension: "SKILLS",
                facet: "Peer Mentoring & Support, Giving & Receiving Feedback, Contributing to Team Development, Constructive Conversations",
                type: "core",
                text: "PA - Core Scenario 3.5: A new or less experienced colleague is struggling with a task, while the team has also achieved a shared success worth recognizing. How does this person typically respond to these situations?",
                options: [
                    { score: 1, text: "A. Doesn't always notice when a colleague is struggling or leaves them to find their own solution; for shared success, mostly stays quiet or gives generic comments." },
                    { score: 3, text: "B. Offers help if the colleague asks or if the situation is obvious; for shared success, gives sincere and specific praise." },
                    { score: 5, text: "C. Proactively notices when a colleague is struggling and offers support before being asked; for shared success, specifically highlights individual contributions and strengthens the team." }
                ]
            },
            {
                id: "PV_TCD_3.5R",
                pillar: "TEAM CONTRIBUTION & DEVELOPMENT",
                dimension: "SKILLS",
                type: "reflection",
                text: "PA - Reflection on Impact 3.5: As a colleague, how much could you rely on this person to help you when you face a challenge?",
                options: [
                    { score: 1, text: "A. This person rarely offers help without being directly asked and sometimes has limited availability or willingness to help." },
                    { score: 3, text: "B. This person would help if asked; they are generally reliable when approached for support." },
                    { score: 5, text: "C. This person would notice if you were struggling and offer help before you had to ask; they actively contribute to colleagues' development." }
                ]
            },
            {
                id: "PV_TCD_3.6C",
                pillar: "TEAM CONTRIBUTION & DEVELOPMENT",
                dimension: "SKILLS",
                type: "core",
                text: "PA - Core Scenario 3.6: There is a situation where constructive feedback needs to be given to a colleague whose behavior is negatively affecting the team's work. How does this person typically approach these difficult conversations?",
                options: [
                    { score: 1, text: "A. Mostly avoids direct conversations about problematic behavior, preferring to hope the issue resolves itself or that someone else will intervene." },
                    { score: 3, text: "B. Approaches the conversation diplomatically, presents specific examples and describes the impact on the team; remains professional and constructive." },
                    { score: 5, text: "C. Prepares for the conversation, thinks about how the colleague might react, and plans their approach; delivers the feedback in a way that encourages understanding and growth rather than defensiveness." }
                ]
            },
            {
                id: "PV_TCD_3.6R",
                pillar: "TEAM CONTRIBUTION & DEVELOPMENT",
                dimension: "SKILLS",
                type: "reflection",
                text: "PA - Reflection on Impact 3.6: When this person delivers constructive feedback to a colleague, what is typically the outcome?",
                options: [
                    { score: 1, text: "A. The conversation is uncomfortable or doesn't achieve its goal; the colleague becomes defensive or it's unclear whether they understand what needs to change." },
                    { score: 3, text: "B. The conversation is clear and professional; the colleague understands the message, though some initial resistance may be present." },
                    { score: 5, text: "C. The conversation is productive; the colleague engages constructively and visible behavioral changes follow." }
                ]
            }
        ],
        IMPACT: [
            // PILLAR: TEAM ATMOSPHERE
            {
                id: "PU_TA_4.1C",
                pillar: "TEAM ATMOSPHERE",
                dimension: "IMPACT",
                facet: "Authenticity, Emotional Presence, Inclusiveness, Building Trust",
                type: "core",
                text: "PA - Core Scenario 4.1: The team is going through a period of uncertainty or tension. Some colleagues are visibly upset; others are hesitant to voice concerns. How does this person typically contribute to the team's emotional climate and psychological safety?",
                options: [
                    { score: 3, text: "A. Notices when colleagues are upset and actively opens space for them to share concerns; makes an effort to include those who are hesitant." },
                    { score: 1, text: "B. Focuses on the work and doesn't initiate conversations about the emotional climate; assumes colleagues will raise concerns if they want to." },
                    { score: 5, text: "C. Actively creates space for open communication; acknowledges that uncertainty is normal and helps colleagues feel heard and accepted." }
                ]
            },
            {
                id: "PU_TA_4.1R",
                pillar: "TEAM ATMOSPHERE",
                dimension: "IMPACT",
                type: "reflection",
                text: "PA - Reflection on Impact 4.1: How does this person's presence typically affect the team atmosphere?",
                options: [
                    { score: 1, text: "A. Their presence sometimes adds tension or is neutral; their contribution to the team atmosphere is not particularly positive." },
                    { score: 5, text: "B. They have a markedly positive effect on the atmosphere; colleagues feel safer, more open, and more engaged when they are present." },
                    { score: 3, text: "C. Their presence is generally positive; colleagues feel more comfortable, though their influence on the climate is not particularly pronounced." }
                ]
            },
            {
                id: "PU_TA_4.2C",
                pillar: "TEAM ATMOSPHERE",
                dimension: "IMPACT",
                type: "core",
                text: "PA - Core Scenario 4.2: A difficult team decision has been made that negatively affects some colleagues. This person was not the decision-maker. How do they typically respond and communicate in such situations?",
                options: [
                    { score: 5, text: "A. Helps colleagues understand the context of the decision if they know it; actively listens to the concerns of those affected and helps maintain team cohesion even when the situation is difficult." },
                    { score: 1, text: "B. Doesn't particularly engage in conversations about the decision; focuses on their own work and leaves affected colleagues to process the situation on their own." },
                    { score: 3, text: "C. Listens to the concerns of affected colleagues and offers support; doesn't take an active role in explaining the decision but helps maintain a positive climate." }
                ]
            },
            {
                id: "PU_TA_4.2R",
                pillar: "TEAM ATMOSPHERE",
                dimension: "IMPACT",
                type: "reflection",
                text: "PA - Reflection on Impact 4.2: When the team goes through a difficult change or decision, what is this person's contribution to team cohesion?",
                options: [
                    { score: 1, text: "A. This person mostly withdraws or stays neutral; their contribution to team cohesion in difficult moments is minimal." },
                    { score: 3, text: "B. This person supports colleagues and contributes to a positive atmosphere to the extent they can." },
                    { score: 5, text: "C. This person actively helps maintain team cohesion; their presence and support have a significant positive effect on morale and the team." }
                ]
            },
            // PILLAR: HOW DO THEY MOTIVATE COLLEAGUES?
            {
                id: "PU_HMC_4.3C",
                pillar: "HOW DO THEY MOTIVATE COLLEAGUES?",
                dimension: "IMPACT",
                facet: "Peer Inspiration & Motivation, Supporting Engagement, Advocating for the Team, Influence Without Authority",
                type: "core",
                text: "PA - Core Scenario 4.3: The team is working on a demanding project with tight deadlines, and some colleagues seem disengaged or demotivated. How does this person typically contribute to team motivation and engagement?",
                options: [
                    { score: 3, text: "A. Actively engages in the work and communicates its importance; offers help to struggling colleagues and tries to keep the team motivated." },
                    { score: 1, text: "B. Focuses on their own tasks and leaves others to manage their own motivation." },
                    { score: 5, text: "C. Proactively helps colleagues understand the meaning and importance of their contribution; energizes the team and lifts morale even during difficult periods." }
                ]
            },
            {
                id: "PU_HMC_4.3R",
                pillar: "HOW DO THEY MOTIVATE COLLEAGUES?",
                dimension: "IMPACT",
                type: "reflection",
                text: "PA - Reflection on Impact 4.3: When this person tries to motivate or engage colleagues, what typically happens?",
                options: [
                    { score: 5, text: "A. Colleagues respond positively; a visible increase in team engagement and motivation is apparent." },
                    { score: 1, text: "B. The effect on colleagues is limited; this person doesn't always succeed in moving others and knows how to do it." },
                    { score: 3, text: "C. Some colleagues respond positively; a certain increase in engagement occurs, though not from everyone." }
                ]
            },
            {
                id: "PU_HMC_4.4C",
                pillar: "HOW DO THEY MOTIVATE COLLEAGUES?",
                dimension: "IMPACT",
                type: "core",
                text: "PA - Core Scenario 4.4: This person identifies something that could improve the way the team works but knows the proposal may face resistance from colleagues or managers. How do they typically advocate for changes they consider important?",
                options: [
                    { score: 1, text: "A. Presents the proposal directly and assumes the argument will speak for itself; doesn't always build support before putting forward the idea." },
                    { score: 3, text: "B. Prepares a good argument and shares it with relevant colleagues, taking their concerns into account and adapting the approach." },
                    { score: 5, text: "C. Actively engages colleagues in developing the idea, listens to concerns, and adapts the proposal; advocates constructively and persistently even when facing resistance." }
                ]
            },
            {
                id: "PU_HMC_4.4R",
                pillar: "HOW DO THEY MOTIVATE COLLEAGUES?",
                dimension: "IMPACT",
                type: "reflection",
                text: "PA - Reflection on Impact 4.4: When this person advocates for a change or improvement that faces resistance, what typically happens?",
                options: [
                    { score: 1, text: "A. The idea typically doesn't progress; this person is not always sure why they face resistance and quickly drops the proposal." },
                    { score: 5, text: "B. They continue to advocate and engage colleagues; the idea is either adopted or it becomes clear they have made the strongest possible case." },
                    { score: 3, text: "C. The idea gradually gains support; it moves forward with enough colleagues on board to be tried." }
                ]
            }
        ]
    }
};
