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
        "Short-term Goals": [
            // Cluster 1: Operational Execution & Goal Achievement
            {
                id: "PE_STG_1_Q1", pillar: "Short-term Goals", dimension: "Results",
                cluster: "Operational Execution & Goal Achievement", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've observed how they set priorities, coordinate on shared goals, and manage execution — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They communicate their team's priorities and coordinate on dependencies when needed. Their execution approach is functional, though you sometimes need to follow up on commitments or clarify how their work aligns with cross-functional initiatives." },
                    { score: 3, text: "B. They clearly articulate goals and priorities, making coordination straightforward. They deliver reliably on shared commitments, make timely decisions that keep joint work moving, and proactively communicate when priorities shift." },
                    { score: 5, text: "C. They demonstrate exceptional clarity in goal-setting and execution that strengthens cross-functional work. They anticipate dependencies, make decisions that consider broader impact, and their execution discipline makes it easier for you to plan and deliver your own team's work." }
                ]
            },
            {
                id: "PE_STG_1_Q2", pillar: "Short-term Goals", dimension: "Results",
                cluster: "Operational Execution & Goal Achievement", type: "impact",
                text: "When you think about how [Name]'s execution and goal management affect shared work and joint deliverables, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Coordination happens and shared work progresses, though it sometimes requires extra effort to maintain alignment. Their team's delivery occasionally creates unexpected dependencies or timeline adjustments." },
                    { score: 0, text: "B. Their reliable execution makes cross-functional work predictable. Shared commitments are met consistently, and their clear priorities help you plan dependencies with confidence." },
                    { score: 1, text: "C. Their execution excellence has noticeably improved cross-functional outcomes. A specific indicator: shared initiatives with their team consistently deliver on time and with high quality, and their approach to managing commitments has reduced coordination friction." }
                ]
            },
            {
                id: "PE_STG_1_Q3", pillar: "Short-term Goals", dimension: "Results",
                cluster: "Operational Execution & Goal Achievement", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            },
            // Cluster 2: Problem-Solving & Performance Under Pressure
            {
                id: "PE_STG_2_Q1", pillar: "Short-term Goals", dimension: "Results",
                cluster: "Problem-Solving & Performance Under Pressure", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've worked together on solving complex problems or when unexpected challenges have affected shared work — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They contribute to problem-solving and respond to urgent situations affecting joint work. During pressure situations, coordination may require extra effort, and you may need to follow up to ensure alignment on solutions." },
                    { score: 3, text: "B. They bring structured thinking to problem-solving and maintain steady collaboration during crises. They analyse issues systematically, make timely decisions on shared challenges, and communicate effectively when urgent situations affect cross-functional work." },
                    { score: 5, text: "C. They elevate problem-solving through sophisticated analysis and demonstrate exceptional composure during crises. Their structured approach to urgent situations helps stabilize cross-functional coordination, and they often identify solutions that others miss." }
                ]
            },
            {
                id: "PE_STG_2_Q2", pillar: "Short-term Goals", dimension: "Results",
                cluster: "Problem-Solving & Performance Under Pressure", type: "impact",
                text: "When you think about how [Name]'s problem-solving and crisis management affect joint work outcomes, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Problems affecting shared work are addressed, though resolution sometimes requires additional coordination. During crises, joint work may experience delays or require adjustments as priorities shift." },
                    { score: 0, text: "B. Their problem-solving consistently helps resolve shared challenges effectively. During urgent situations, their steady approach maintains stability in cross-functional work, and coordination continues with minimal disruption." },
                    { score: 1, text: "C. Their problem-solving and crisis management have noticeably improved cross-functional outcomes. A specific indicator: solutions developed with their involvement tend to be more thorough and lasting, and their composure during recent crises helped you manage your own team's response more effectively." }
                ]
            },
            {
                id: "PE_STG_2_Q3", pillar: "Short-term Goals", dimension: "Results",
                cluster: "Problem-Solving & Performance Under Pressure", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            }
        ],
        "Long-term Change": [
            // Cluster 3: Strategic Vision & Change Leadership
            {
                id: "PE_LTC_3_Q1", pillar: "Long-term Change", dimension: "Results",
                cluster: "Strategic Vision & Change Leadership", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've discussed organizational strategy, future direction, or worked together on change initiatives — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They focus on current execution and coordinate on operational matters. In strategic or change discussions, they contribute when asked and implement required changes in their area, though they may not actively drive strategic thinking or change leadership." },
                    { score: 3, text: "B. They contribute meaningfully to strategic discussions and actively engage in change initiatives. They connect work to organizational objectives, think beyond immediate execution, and communicate proactively about change impacts to cross-functional work." },
                    { score: 5, text: "C. They take leadership in strategic thinking and organizational change. They elevate strategic conversations with forward-thinking perspectives, build cross-functional alignment during transformations, and often help you think more strategically about future direction or change implementation." }
                ]
            },
            {
                id: "PE_LTC_3_Q2", pillar: "Long-term Change", dimension: "Results",
                cluster: "Strategic Vision & Change Leadership", type: "impact",
                text: "When you think about how [Name]'s strategic thinking and change leadership affect cross-functional work and shared initiatives, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Joint planning focuses on operational coordination, and changes are implemented with basic coordination. Strategic alignment and change adoption in shared work may require additional discussion or follow-up." },
                    { score: 0, text: "B. Their strategic perspective improves joint planning, and their change management maintains stability in cross-functional work. Shared initiatives benefit from their ability to connect work to organizational goals and manage transitions smoothly." },
                    { score: 1, text: "C. Their strategic thinking and change leadership have noticeably strengthened cross-functional outcomes. A specific indicator: perspectives they've shared have influenced strategic decisions affecting shared work, or their change management approach has made organizational transitions easier for your team to navigate." }
                ]
            },
            {
                id: "PE_LTC_3_Q3", pillar: "Long-term Change", dimension: "Results",
                cluster: "Strategic Vision & Change Leadership", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            },
            // Cluster 4: Innovation & Capability Building
            {
                id: "PE_LTC_4_Q1", pillar: "Long-term Change", dimension: "Results",
                cluster: "Innovation & Capability Building", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've observed their approach to improving processes, innovating in shared work areas, and developing capabilities that affect cross-functional work — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They follow established processes and manage their team's resources to meet current commitments. In joint work, they contribute to improvement discussions when invited and focus on immediate skill needs." },
                    { score: 3, text: "B. They actively identify opportunities to improve shared processes and develop their team's capabilities in ways that strengthen cross-functional work. They propose practical solutions, implement process changes effectively, and allocate resources strategically to balance current needs with capability building." },
                    { score: 5, text: "C. They drive innovation in cross-functional processes and take leadership in capability development that benefits the broader organization. They create frameworks that elevate shared work, proactively build capabilities that enable new types of collaboration, and often inspire others to think more innovatively about improvement." }
                ]
            },
            {
                id: "PE_LTC_4_Q2", pillar: "Long-term Change", dimension: "Results",
                cluster: "Innovation & Capability Building", type: "impact",
                text: "When you think about how [Name]'s innovation and capability development affect cross-functional effectiveness and shared outcomes, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Joint processes function adequately and their team maintains capabilities needed for current shared work. Improvements address specific issues, though broader optimization or capability gaps occasionally create constraints." },
                    { score: 0, text: "B. Their process improvements consistently make cross-functional work more efficient, and their team's growing capabilities strengthen what can be achieved together. Shared processes benefit from their optimization efforts, and development investments improve collaboration over time." },
                    { score: 1, text: "C. Their innovation and capability development have noticeably enhanced cross-functional effectiveness. A specific indicator: a process or approach they developed has been adopted across multiple teams, capabilities they've built have enabled new collaboration opportunities, or their optimization work has measurably improved outcomes in shared work areas." }
                ]
            },
            {
                id: "PE_LTC_4_Q3", pillar: "Long-term Change", dimension: "Results",
                cluster: "Innovation & Capability Building", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            }
        ],
        "Towards Oneself": [
            // Cluster 5: Self-Awareness & Personal Growth
            {
                id: "PE_TO_5_Q1", pillar: "Towards Oneself", dimension: "Mindset",
                cluster: "Self-Awareness & Personal Growth", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've observed how they handle feedback, discuss their own development, respond to learning opportunities, and approach new challenges — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They participate in feedback conversations and engage with development opportunities when they arise. They may need encouragement to recognize how their approach affects shared work, and their openness to learning can vary depending on the situation." },
                    { score: 3, text: "B. They demonstrate solid self-awareness and genuine commitment to learning. They seek feedback on collaboration, respond constructively to input, actively pursue development opportunities, and openly discuss both their strengths and areas they're working to improve." },
                    { score: 5, text: "C. They model exceptional self-awareness and learning agility. They proactively ask how they can work more effectively with others, embrace challenging learning opportunities, demonstrate sophisticated understanding of their impact, and often help others develop greater self-awareness through their example." }
                ]
            },
            {
                id: "PE_TO_5_Q2", pillar: "Towards Oneself", dimension: "Mindset",
                cluster: "Self-Awareness & Personal Growth", type: "impact",
                text: "When you think about how [Name]'s self-awareness and approach to learning affect your working relationship and their effectiveness in shared work, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Collaboration functions adequately, and they engage with development when prompted. You sometimes need to provide direct feedback to address issues in how you work together, and their response helps maintain a functional relationship." },
                    { score: 0, text: "B. Their self-awareness makes collaboration smoother, and their learning translates into improved effectiveness. They recognize and address issues in joint work without requiring you to raise them, and you've observed measurable improvement in how they work over time." },
                    { score: 1, text: "C. Their self-awareness and learning agility have noticeably strengthened collaboration and outcomes. A specific indicator: they've proactively adjusted their approach in ways that improved shared work, their rapid learning has enabled new types of collaboration, or their openness about development has made it easier to navigate challenges together." }
                ]
            },
            {
                id: "PE_TO_5_Q3", pillar: "Towards Oneself", dimension: "Mindset",
                cluster: "Self-Awareness & Personal Growth", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            },
            // Cluster 6: Resilience & Adaptability
            {
                id: "PE_TO_6_Q1", pillar: "Towards Oneself", dimension: "Mindset",
                cluster: "Resilience & Adaptability", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've observed how they handle pressure, respond to setbacks, adapt to changing priorities, or manage uncertainty affecting shared work — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They work through challenging periods and adapt to changes affecting joint work. During sustained pressure or significant uncertainty, coordination may require extra effort, and recovery from setbacks affecting shared work can take time." },
                    { score: 3, text: "B. They maintain steady collaboration during pressure and adapt effectively to changing circumstances. They handle setbacks constructively, adjust to new priorities without significant disruption, and maintain reliable engagement even during uncertain periods." },
                    { score: 5, text: "C. They demonstrate exceptional resilience and adaptability that strengthens cross-functional work. They maintain composure and effectiveness during high-pressure situations, adapt quickly to changes affecting shared work, and often help you and others navigate uncertainty more effectively." }
                ]
            },
            {
                id: "PE_TO_6_Q2", pillar: "Towards Oneself", dimension: "Mindset",
                cluster: "Resilience & Adaptability", type: "impact",
                text: "When you think about how [Name]'s resilience and adaptability affect shared work during challenging periods or changes, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Joint work continues during difficult periods, though coordination may require additional effort. Adaptation to changes happens, though it may take time to reestablish smooth collaboration after significant setbacks or shifts." },
                    { score: 0, text: "B. Their steady approach maintains stability in cross-functional work during pressure. Shared work adapts to changes with minimal disruption, and collaboration remains effective even during uncertain periods." },
                    { score: 1, text: "C. Their resilience and adaptability have noticeably strengthened cross-functional outcomes during challenges. A specific indicator: during recent pressure situations, their composure helped maintain shared work quality, their quick adaptation to changes reduced disruption to joint initiatives, or their approach to setbacks helped you manage your own team's response." }
                ]
            },
            {
                id: "PE_TO_6_Q3", pillar: "Towards Oneself", dimension: "Mindset",
                cluster: "Resilience & Adaptability", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            }
        ],
        "Towards Others": [
            // Cluster 7: Empathy & Inclusive Collaboration
            {
                id: "PE_TOT_7_Q1", pillar: "Towards Others", dimension: "Mindset",
                cluster: "Empathy & Inclusive Collaboration", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've observed how they understand different perspectives, respond to others' needs, value diverse contributions, and create space for all voices — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They work cooperatively and acknowledge different viewpoints in joint work. They may need reminders to consider diverse perspectives fully, and their approach to ensuring all voices are heard can be inconsistent." },
                    { score: 3, text: "B. They consistently demonstrate empathy and value diverse contributions. They actively listen to different perspectives, respond thoughtfully to others' needs, create space for all voices in cross-functional discussions, and foster inclusive collaboration." },
                    { score: 5, text: "C. They champion empathy and inclusion in cross-functional work. They proactively seek out diverse perspectives, skillfully navigate situations where voices might be marginalized, actively celebrate different contributions, and create an environment where everyone feels genuinely valued." }
                ]
            },
            {
                id: "PE_TOT_7_Q2", pillar: "Towards Others", dimension: "Mindset",
                cluster: "Empathy & Inclusive Collaboration", type: "impact",
                text: "When you think about how [Name]'s empathy and inclusive approach affect cross-functional collaboration and team dynamics, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Joint work happens and different perspectives are considered. Collaboration functions adequately, though some voices may be more prominent than others in shared discussions." },
                    { score: 0, text: "B. Their empathetic and inclusive approach consistently strengthens cross-functional work. Diverse perspectives are actively integrated into shared decisions, and people from different backgrounds engage confidently in joint initiatives." },
                    { score: 1, text: "C. Their empathy and inclusion have noticeably enhanced cross-functional collaboration. A specific indicator: people actively seek to work with them because they feel heard and valued, their inclusive approach has improved how diverse perspectives are integrated into shared work, or they've helped you create more inclusive collaboration in your own area." }
                ]
            },
            {
                id: "PE_TOT_7_Q3", pillar: "Towards Others", dimension: "Mindset",
                cluster: "Empathy & Inclusive Collaboration", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            },
            // Cluster 8: Collaboration & Constructive Conflict
            {
                id: "PE_TOT_8_Q1", pillar: "Towards Others", dimension: "Mindset",
                cluster: "Collaboration & Constructive Conflict", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've observed their commitment to shared success, knowledge sharing, and how they handle disagreements or conflicts in cross-functional work — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They contribute to joint work and coordinate on shared goals. During disagreements, they may avoid difficult conversations or focus primarily on their team's interests, and knowledge sharing happens when requested." },
                    { score: 3, text: "B. They demonstrate genuine commitment to shared success, actively sharing knowledge and resources. They approach disagreements constructively, maintain objectivity during conflicts, and work collaboratively to find solutions that serve collective goals." },
                    { score: 5, text: "C. They champion cross-functional success and model exceptional collaboration. They proactively share knowledge, embrace healthy disagreement as valuable for better outcomes, create psychological safety for difficult conversations, and navigate conflicts in ways that strengthen cross-functional relationships." }
                ]
            },
            {
                id: "PE_TOT_8_Q2", pillar: "Towards Others", dimension: "Mindset",
                cluster: "Collaboration & Constructive Conflict", type: "impact",
                text: "When you think about how [Name]'s collaborative approach and conflict management affect shared work and cross-functional relationships, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Joint work progresses and conflicts are eventually resolved. Knowledge sharing happens, though you may need to request information, and some disagreements may require additional effort to work through." },
                    { score: 0, text: "B. Their collaborative approach consistently strengthens shared work. Knowledge flows effectively, disagreements are resolved constructively, and cross-functional relationships remain professional and productive even during tension." },
                    { score: 1, text: "C. Their collaboration and conflict management have noticeably improved cross-functional outcomes. A specific indicator: they've helped resolve complex disagreements in ways that strengthened relationships, their knowledge sharing has measurably improved joint work quality, or their approach to healthy conflict has influenced how you handle disagreements in your own area." }
                ]
            },
            {
                id: "PE_TOT_8_Q3", pillar: "Towards Others", dimension: "Mindset",
                cluster: "Collaboration & Constructive Conflict", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            }
        ],
        "Towards Company & Position": [
            // Cluster 9: Accountability & Decision Ownership
            {
                id: "PE_TCP_9_Q1", pillar: "Towards Company & Position", dimension: "Mindset",
                cluster: "Accountability & Decision Ownership", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've observed how they take ownership of shared outcomes, make decisions affecting cross-functional work, and demonstrate accountability for their commitments — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They accept responsibility for their part of joint work and make decisions within their area. During challenges affecting shared work, they may focus on external factors, and their decision-making on cross-functional matters may require consensus-building." },
                    { score: 3, text: "B. They consistently take ownership of shared outcomes and make timely decisions on cross-functional matters. They assume accountability for both successes and failures in joint work, make decisions with appropriate confidence, and follow through on commitments reliably." },
                    { score: 5, text: "C. They demonstrate exceptional ownership of cross-functional outcomes and decisive leadership. They proactively assume accountability for broader impacts, make confident decisions that move shared work forward, and create an environment where others feel empowered to make decisions and take ownership." }
                ]
            },
            {
                id: "PE_TCP_9_Q2", pillar: "Towards Company & Position", dimension: "Mindset",
                cluster: "Accountability & Decision Ownership", type: "impact",
                text: "When you think about how [Name]'s accountability and decision-making affect shared work and cross-functional outcomes, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Joint work progresses and decisions are made. When issues arise in shared work, they participate in addressing them, though accountability for cross-functional outcomes may sometimes be unclear." },
                    { score: 0, text: "B. Their clear ownership makes cross-functional work more effective. They take accountability for shared outcomes without deflecting, make decisions that keep joint work moving, and their reliable follow-through builds trust." },
                    { score: 1, text: "C. Their accountability and decision-making have noticeably strengthened cross-functional work. A specific indicator: their ownership of shared outcomes has improved how cross-functional accountability works, their decisive approach has accelerated joint initiatives, or their model of accountability has influenced how you think about ownership in your own area." }
                ]
            },
            {
                id: "PE_TCP_9_Q3", pillar: "Towards Company & Position", dimension: "Mindset",
                cluster: "Accountability & Decision Ownership", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            },
            // Cluster 10: Strategic Ownership & Values Alignment
            {
                id: "PE_TCP_10_Q1", pillar: "Towards Company & Position", dimension: "Mindset",
                cluster: "Strategic Ownership & Values Alignment", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've discussed how work connects to organizational strategy, observed their commitment to company mission and values, and seen how they make decisions — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They focus on executing current priorities and acknowledge organizational values when relevant. In strategic discussions, they understand current goals, though they may not actively connect work to longer-term organizational direction or consistently reference values in decision-making." },
                    { score: 3, text: "B. They effectively connect their work to organizational strategy and consistently demonstrate company values. They contribute meaningfully to strategic discussions, make decisions aligned with organizational mission, and help others see how shared work serves broader goals." },
                    { score: 5, text: "C. They champion organizational strategy and embody company values in ways that influence others. They proactively connect cross-functional work to strategic goals, inspire commitment to organizational mission, model values-driven decision-making that others reference, and actively shape how the broader organization thinks about strategy and culture." }
                ]
            },
            {
                id: "PE_TCP_10_Q2", pillar: "Towards Company & Position", dimension: "Mindset",
                cluster: "Strategic Ownership & Values Alignment", type: "impact",
                text: "When you think about how [Name]'s strategic ownership and values alignment affect cross-functional work and shared decisions, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Joint planning focuses on operational coordination, and values are acknowledged in shared discussions. Strategic alignment in cross-functional work is maintained through formal processes, and values alignment may be inconsistent when competing priorities arise." },
                    { score: 0, text: "B. Their strategic clarity and values alignment consistently strengthen cross-functional work. Shared decisions reflect organizational mission, and their genuine commitment to company values makes collaboration more purposeful and aligned." },
                    { score: 1, text: "C. Their strategic ownership and values leadership have noticeably influenced cross-functional culture. A specific indicator: they've connected shared work to organizational strategy in ways that improved decision-making, their values-driven approach has influenced how you or others make decisions in joint work, or their commitment to company mission has strengthened the overall quality of cross-functional collaboration." }
                ]
            },
            {
                id: "PE_TCP_10_Q3", pillar: "Towards Company & Position", dimension: "Mindset",
                cluster: "Strategic Ownership & Values Alignment", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            }
        ],
        "Personal Efficiency": [
            // Cluster 11: Priority Management & Personal Effectiveness
            {
                id: "PE_PE_11_Q1", pillar: "Personal Efficiency", dimension: "Skills",
                cluster: "Priority Management & Personal Effectiveness", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've observed how they manage competing priorities, solve problems independently, and adapt their approach when circumstances change in shared work — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They manage their workload and address shared problems when they arise. During periods of high demand or significant change, coordination may require extra effort, and they may need time to adapt their approach when joint priorities shift." },
                    { score: 3, text: "B. They effectively manage their commitments in cross-functional work, prioritizing clearly and solving shared problems with structured thinking. They adapt readily to changing priorities, communicate proactively about capacity, and maintain reliable delivery even when circumstances shift." },
                    { score: 5, text: "C. They demonstrate exceptional personal effectiveness that strengthens cross-functional work. They anticipate and communicate capacity constraints proactively, bring sophisticated problem-solving to shared challenges, and adapt so smoothly to changing circumstances that joint work rarely experiences disruption." }
                ]
            },
            {
                id: "PE_PE_11_Q2", pillar: "Personal Efficiency", dimension: "Skills",
                cluster: "Priority Management & Personal Effectiveness", type: "impact",
                text: "When you think about how [Name]'s personal effectiveness and adaptability affect shared work and joint deliverables, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Shared work progresses and problems are addressed, though coordination sometimes requires additional follow-up. During busy periods or significant changes, their delivery on joint commitments may require adjustment." },
                    { score: 0, text: "B. Their reliable personal effectiveness makes cross-functional coordination straightforward. Shared commitments are met consistently, problems are solved efficiently, and their adaptability means joint work continues smoothly through priority changes." },
                    { score: 1, text: "C. Their personal effectiveness has noticeably improved cross-functional outcomes. A specific indicator: their proactive communication about priorities has allowed you to plan shared work more confidently, their problem-solving has reduced time spent on shared challenges, or their adaptability during recent changes helped maintain joint delivery when it could have been disrupted." }
                ]
            },
            {
                id: "PE_PE_11_Q3", pillar: "Personal Efficiency", dimension: "Skills",
                cluster: "Priority Management & Personal Effectiveness", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            },
            // Cluster 12: Change Tactics & Implementation Capability
            {
                id: "PE_PE_12_Q1", pillar: "Personal Efficiency", dimension: "Skills",
                cluster: "Change Tactics & Implementation Capability", type: "behavioural",
                text: "In your collaborative work with [Name] — when organizational changes have affected shared work or when you've observed how they engage stakeholders and manage resistance during transitions — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They implement changes in their area and coordinate basic transition needs with you. Their approach to managing resistance is functional, though complex stakeholder situations or sustained resistance may require additional effort." },
                    { score: 3, text: "B. They apply structured change management approaches that make cross-functional transitions smoother. They engage key stakeholders proactively, address resistance constructively, and communicate clearly about change impacts, making shared transitions more manageable." },
                    { score: 5, text: "C. They demonstrate sophisticated change management that elevates cross-functional transitions. They build broad stakeholder coalitions, transform resistance into engagement, and create change communication that makes adoption feel natural rather than imposed. Their approach often helps your team navigate transitions more effectively." }
                ]
            },
            {
                id: "PE_PE_12_Q2", pillar: "Personal Efficiency", dimension: "Skills",
                cluster: "Change Tactics & Implementation Capability", type: "impact",
                text: "When you think about how [Name]'s change management approach has affected shared transitions and cross-functional adoption, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Cross-functional changes are implemented over time, though adoption may be uneven and some coordination challenges may persist. Their change management maintains basic stability in shared work during transitions." },
                    { score: 0, text: "B. Their structured change approach consistently makes cross-functional transitions smoother. Shared changes achieve solid adoption, resistance is addressed effectively, and coordination during transitions is maintained with reasonable stability." },
                    { score: 1, text: "C. Their change management has noticeably improved cross-functional transition outcomes. A specific indicator: a recent change they managed achieved faster or stronger adoption than similar changes, their stakeholder engagement approach reduced resistance in ways that benefited your team, or their change communication served as a model for how you approached a similar transition." }
                ]
            },
            {
                id: "PE_PE_12_Q3", pillar: "Personal Efficiency", dimension: "Skills",
                cluster: "Change Tactics & Implementation Capability", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            }
        ],
        "Communication": [
            // Cluster 13: Impactful Communication & Strategic Listening
            {
                id: "PE_CO_13_Q1", pillar: "Communication", dimension: "Skills",
                cluster: "Impactful Communication & Strategic Listening", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've observed how they communicate important messages, listen in conversations, and adapt their communication to different audiences — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They communicate clearly on topics relevant to shared work and listen to what is said in conversations. Their messages address the subject, though they may not consistently frame information in terms of what matters most to the recipient." },
                    { score: 3, text: "B. They frame messages in terms of clear value for the recipient and listen beyond stated positions to understand underlying concerns. Their communication creates genuine understanding, and their listening helps address the real drivers of issues in cross-functional conversations." },
                    { score: 5, text: "C. They demonstrate exceptional communication and listening that elevates cross-functional work. They anticipate what different stakeholders need to hear, craft messages that create commitment rather than just understanding, and use listening to identify hidden concerns or opportunities that others miss." }
                ]
            },
            {
                id: "PE_CO_13_Q2", pillar: "Communication", dimension: "Skills",
                cluster: "Impactful Communication & Strategic Listening", type: "impact",
                text: "When you think about how [Name]'s communication and listening affect cross-functional understanding and shared decisions, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Their communication ensures shared work is coordinated, and their listening helps address stated concerns. Some misalignment may persist after conversations, or follow-up may be needed to ensure full understanding of important messages." },
                    { score: 0, text: "B. Their communication consistently creates clear understanding among stakeholders in shared work. Their strategic listening addresses underlying concerns, and conversations with them tend to result in better-quality decisions and stronger alignment." },
                    { score: 1, text: "C. Their communication and listening have noticeably improved cross-functional outcomes. A specific indicator: their reframing of a message changed stakeholder perspectives in a way that unblocked shared work, their listening surfaced an important concern that improved a joint decision, or the quality of shared decisions has measurably improved because of how they facilitate conversations." }
                ]
            },
            {
                id: "PE_CO_13_Q3", pillar: "Communication", dimension: "Skills",
                cluster: "Impactful Communication & Strategic Listening", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            },
            // Cluster 14: Influence & Stakeholder Navigation
            {
                id: "PE_CO_14_Q1", pillar: "Communication", dimension: "Skills",
                cluster: "Influence & Stakeholder Navigation", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've observed how they gain support for ideas, remove barriers to shared initiatives, and navigate organizational dynamics — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They present their ideas and work to gain support for shared initiatives. Their influence approach is functional, though they may not consistently address the specific concerns of different stakeholders or remove the friction that creates resistance in cross-functional work." },
                    { score: 3, text: "B. They effectively influence stakeholders by framing requests in terms of mutual benefit and proactively addressing barriers. They navigate organizational dynamics skillfully, build productive relationships across teams, and help move shared initiatives forward with solid stakeholder support." },
                    { score: 5, text: "C. They demonstrate exceptional influence and organizational navigation that elevates cross-functional work. They design approaches that make desired actions compelling for all stakeholders, build coalitions that create momentum, and navigate complex dynamics in ways that transform how shared initiatives gain traction." }
                ]
            },
            {
                id: "PE_CO_14_Q2", pillar: "Communication", dimension: "Skills",
                cluster: "Influence & Stakeholder Navigation", type: "impact",
                text: "When you think about how [Name]'s influence and stakeholder navigation affect cross-functional initiatives and shared outcomes, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Shared initiatives progress and stakeholder support is gained over time. Some friction in cross-functional coordination persists, and gaining alignment on complex shared decisions may require additional effort." },
                    { score: 0, text: "B. Their influence approach consistently moves cross-functional initiatives forward. Stakeholders engage constructively, barriers to shared work are addressed effectively, and their organizational navigation helps maintain momentum on joint priorities." },
                    { score: 1, text: "C. Their influence and stakeholder navigation have noticeably improved cross-functional outcomes. A specific indicator: they've unblocked a shared initiative that was stalling due to stakeholder resistance, their coalition-building has accelerated a joint decision, or their approach to navigating organizational dynamics has helped you think about how to manage similar situations." }
                ]
            },
            {
                id: "PE_CO_14_Q3", pillar: "Communication", dimension: "Skills",
                cluster: "Influence & Stakeholder Navigation", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            }
        ],
        "Team & People Development": [
            // Cluster 15: Delegation & Performance Development
            {
                id: "PE_TPD_15_Q1", pillar: "Team & People Development", dimension: "Skills",
                cluster: "Delegation & Performance Development", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've observed how they delegate to their team, manage team member performance, and develop people in ways that affect cross-functional work — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They assign work to their team and manage performance to meet current commitments. Team members contribute to joint work at a functional level, though capability gaps occasionally create constraints in what can be accomplished together." },
                    { score: 3, text: "B. They delegate effectively with clear expectations, developing their team's capabilities in ways that strengthen cross-functional work. Their team members take ownership of joint commitments, and their performance management ensures reliable delivery on shared initiatives." },
                    { score: 5, text: "C. They build exceptional team capability and performance ownership that elevates cross-functional work. Their team members bring growing sophistication to shared initiatives, take accountability for joint outcomes, and often propose improvements to how cross-functional work is done." }
                ]
            },
            {
                id: "PE_TPD_15_Q2", pillar: "Team & People Development", dimension: "Skills",
                cluster: "Delegation & Performance Development", type: "impact",
                text: "When you think about how [Name]'s approach to delegation and performance development affects the capabilities available for cross-functional work, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Their team contributes to shared work at the required level. Occasional capability gaps or performance issues affect joint delivery, requiring adjustments to what can be accomplished together." },
                    { score: 0, text: "B. Their team's growing capabilities consistently strengthen cross-functional collaboration. Delegation and performance management produce team members who deliver reliably on shared commitments and contribute meaningfully to joint initiatives." },
                    { score: 1, text: "C. Their delegation and performance development approach has noticeably enhanced cross-functional effectiveness. A specific indicator: their team members have taken on more complex roles in shared initiatives, the quality of their team's contributions to joint work has measurably improved, or their approach to developing others has influenced how you think about delegation and development in your own area." }
                ]
            },
            {
                id: "PE_TPD_15_Q3", pillar: "Team & People Development", dimension: "Skills",
                cluster: "Delegation & Performance Development", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            },
            // Cluster 16: Recognition & Difficult Conversations
            {
                id: "PE_TPD_16_Q1", pillar: "Team & People Development", dimension: "Skills",
                cluster: "Recognition & Difficult Conversations", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've observed how they recognize contributions in cross-functional work and how they approach difficult conversations affecting shared initiatives — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They acknowledge significant contributions to joint work and address performance-related conversations when needed. Their recognition is generally positive, though it may not always acknowledge specific contributions to shared work, and they may avoid difficult cross-functional conversations." },
                    { score: 3, text: "B. They consistently recognize contributions to shared work in meaningful, specific ways. They approach difficult cross-functional conversations directly and constructively, maintaining professional relationships while addressing issues that affect joint outcomes." },
                    { score: 5, text: "C. They demonstrate exceptional recognition and conversational skill in cross-functional contexts. They find genuinely creative ways to celebrate cross-functional contributions, and they navigate difficult conversations about shared work with such skill that relationships are typically strengthened rather than strained." }
                ]
            },
            {
                id: "PE_TPD_16_Q2", pillar: "Team & People Development", dimension: "Skills",
                cluster: "Recognition & Difficult Conversations", type: "impact",
                text: "When you think about how [Name]'s approach to recognition and difficult conversations affects your working relationship and cross-functional dynamics, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Contributions to joint work are acknowledged and difficult conversations happen when necessary. Some recognition may feel routine rather than meaningful, and challenging cross-functional conversations may leave residual tension." },
                    { score: 0, text: "B. Their recognition of cross-functional contributions is consistently meaningful and motivating. Difficult conversations about shared work are handled constructively, and professional relationships remain strong even after challenging discussions." },
                    { score: 1, text: "C. Their recognition and conversational approach have noticeably strengthened cross-functional relationships. A specific indicator: their specific acknowledgment of a contribution changed how you or others engaged in shared work, a difficult conversation they managed resolved a persistent issue in cross-functional collaboration, or their approach to honest conversation has influenced how you handle similar situations." }
                ]
            },
            {
                id: "PE_TPD_16_Q3", pillar: "Team & People Development", dimension: "Skills",
                cluster: "Recognition & Difficult Conversations", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            }
        ],
        "How Do I Make My Team Feel?": [
            // Cluster 17: Authentic Presence & Emotional Impact
            {
                id: "PE_HMF_17_Q1", pillar: "How Do I Make My Team Feel?", dimension: "Influence",
                cluster: "Authentic Presence & Emotional Impact", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've observed how they show up in interactions, demonstrate emotional awareness, and create genuine connection in cross-functional contexts — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They are professionally present in cross-functional interactions and manage emotions appropriately. Their engagement is generally positive, though interactions may feel focused on task coordination rather than genuine connection." },
                    { score: 3, text: "B. They create authentic connection in cross-functional interactions, demonstrating genuine interest in others and emotional awareness. They read dynamics accurately, respond thoughtfully to concerns, and contribute to a positive emotional climate in shared work." },
                    { score: 5, text: "C. They demonstrate exceptional authentic presence and emotional intelligence that elevates cross-functional relationships. They create genuine connection that goes beyond task coordination, navigate complex emotional dynamics with sophistication, and contribute to psychological safety in shared work environments." }
                ]
            },
            {
                id: "PE_HMF_17_Q2", pillar: "How Do I Make My Team Feel?", dimension: "Influence",
                cluster: "Authentic Presence & Emotional Impact", type: "impact",
                text: "When you think about how [Name]'s authentic presence and emotional impact affect your working relationship and cross-functional dynamics, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Cross-functional interactions are professional and task-focused. Connection is maintained at a functional level, though the relationship may not extend significantly beyond operational coordination." },
                    { score: 0, text: "B. Their authentic presence and emotional awareness make cross-functional collaboration genuinely enjoyable and effective. People feel comfortable sharing real concerns, and the emotional climate in shared work is positive and productive." },
                    { score: 1, text: "C. Their authentic presence and emotional intelligence have noticeably strengthened cross-functional relationships. A specific indicator: their genuine engagement has made people more willing to raise difficult topics in shared work, their emotional awareness has helped navigate a sensitive cross-functional situation, or their presence in joint settings creates a noticeably more open and productive environment." }
                ]
            },
            {
                id: "PE_HMF_17_Q3", pillar: "How Do I Make My Team Feel?", dimension: "Influence",
                cluster: "Authentic Presence & Emotional Impact", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            },
            // Cluster 18: Inclusion, Belonging & Trust
            {
                id: "PE_HMF_18_Q1", pillar: "How Do I Make My Team Feel?", dimension: "Influence",
                cluster: "Inclusion, Belonging & Trust", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've observed how they create inclusion in cross-functional settings, build trust through their actions, and ensure all voices are heard in shared work — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They treat cross-functional colleagues fairly and maintain commitments in joint work. They may not consistently ensure all voices are equally heard in shared discussions, and trust-building behaviors may vary depending on the situation." },
                    { score: 3, text: "B. They actively ensure diverse perspectives are heard and valued in cross-functional work. They build trust through consistent, transparent behavior and reliable follow-through, creating an environment where people feel genuinely included and secure in shared work." },
                    { score: 5, text: "C. They champion inclusion and create exceptional trust in cross-functional relationships. They proactively ensure all voices contribute meaningfully in shared settings, address barriers to participation, and build trust so effectively that people feel confident raising difficult topics and taking risks in joint work." }
                ]
            },
            {
                id: "PE_HMF_18_Q2", pillar: "How Do I Make My Team Feel?", dimension: "Influence",
                cluster: "Inclusion, Belonging & Trust", type: "impact",
                text: "When you think about how [Name]'s approach to inclusion and trust-building affects cross-functional collaboration, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Cross-functional collaboration is professional and commitments are generally honoured. Some voices may be more prominent than others in shared discussions, and trust may not fully support the openness needed for challenging cross-functional conversations." },
                    { score: 0, text: "B. Their commitment to inclusion and trust-building consistently strengthens cross-functional work. Diverse perspectives are actively integrated, commitments are honoured reliably, and people feel secure raising concerns and sharing honest perspectives in shared settings." },
                    { score: 1, text: "C. Their inclusion and trust have noticeably transformed cross-functional collaboration. A specific indicator: people from diverse backgrounds participate with noticeably greater confidence in shared settings, a trust foundation they've built has enabled a difficult but important cross-functional conversation, or their approach to inclusion has influenced how you create belonging in your own area." }
                ]
            },
            {
                id: "PE_HMF_18_Q3", pillar: "How Do I Make My Team Feel?", dimension: "Influence",
                cluster: "Inclusion, Belonging & Trust", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            }
        ],
        "How Do I Induce Action?": [
            // Cluster 19: Visionary Inspiration & Empowerment
            {
                id: "PE_HIA_19_Q1", pillar: "How Do I Induce Action?", dimension: "Influence",
                cluster: "Visionary Inspiration & Empowerment", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've observed how they communicate purpose, inspire action in cross-functional settings, and create ownership in shared work — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They communicate about shared goals and assign responsibilities in joint work. Their approach is functional, though the connection to broader purpose may not always be clear, and driving progress in shared work may require regular coordination." },
                    { score: 3, text: "B. They articulate the \"why\" behind shared work compellingly and create genuine ownership in cross-functional initiatives. Their team members engage with joint work purposefully, and their approach to empowerment makes shared initiatives more self-sustaining." },
                    { score: 5, text: "C. They inspire genuine commitment to shared purpose and create exceptional ownership in cross-functional work. Their vision-setting and empowerment approach make joint initiatives energizing, and their team members bring proactive initiative and ownership to shared work that goes well beyond task completion." }
                ]
            },
            {
                id: "PE_HIA_19_Q2", pillar: "How Do I Induce Action?", dimension: "Influence",
                cluster: "Visionary Inspiration & Empowerment", type: "impact",
                text: "When you think about how [Name]'s inspiration and empowerment approach affect engagement and ownership in cross-functional work, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Shared work progresses with coordination and direction. Team members from their area complete joint responsibilities, though progress may require regular follow-up and ownership of cross-functional outcomes may be limited." },
                    { score: 0, text: "B. Their approach to inspiration and empowerment creates meaningful engagement in shared work. Team members take genuine ownership of joint commitments, and shared initiatives progress with greater self-direction than is typical." },
                    { score: 1, text: "C. Their visionary inspiration and empowerment have noticeably transformed cross-functional engagement. A specific indicator: their team members proactively drive improvements in shared work, joint initiatives have achieved results beyond original expectations because of their team's ownership, or their empowerment approach has influenced how you think about creating ownership in your own cross-functional relationships." }
                ]
            },
            {
                id: "PE_HIA_19_Q3", pillar: "How Do I Induce Action?", dimension: "Influence",
                cluster: "Visionary Inspiration & Empowerment", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            },
            // Cluster 20: Change Leadership & Strategic Influence
            {
                id: "PE_HIA_20_Q1", pillar: "How Do I Induce Action?", dimension: "Influence",
                cluster: "Change Leadership & Strategic Influence", type: "behavioural",
                text: "In your collaborative work with [Name] — when you've observed how they challenge existing approaches, lead change that affects shared work, and influence cross-functional initiatives — which description best fits what you typically observe?",
                options: [
                    { score: 1, text: "A. They implement changes in their area and participate in cross-functional change initiatives. Their influence approach is direct, and they work within established channels, though they may not consistently challenge existing processes or build the broader coalitions needed for significant cross-functional impact." },
                    { score: 3, text: "B. They actively challenge processes that limit effectiveness, lead change with clear rationale and stakeholder engagement, and influence cross-functional initiatives through well-designed strategies. They build coalitions, create positive momentum, and move shared priorities forward with broad support." },
                    { score: 5, text: "C. They drive innovation and strategic influence that transforms cross-functional work. They challenge the status quo compellingly, inspire others to lead change, and build powerful cross-functional coalitions that create lasting organizational impact well beyond their formal authority." }
                ]
            },
            {
                id: "PE_HIA_20_Q2", pillar: "How Do I Induce Action?", dimension: "Influence",
                cluster: "Change Leadership & Strategic Influence", type: "impact",
                text: "When you think about how [Name]'s change leadership and strategic influence have affected cross-functional initiatives and organizational direction, what do you typically observe?",
                options: [
                    { score: -2, text: "A. Changes affecting shared work are implemented and their influence achieves functional outcomes. Cross-functional initiatives progress with coordination, though complex organizational dynamics may limit broader impact on shared priorities." },
                    { score: 0, text: "B. Their change leadership creates genuine momentum in cross-functional initiatives. Their strategic influence advances shared priorities effectively, builds meaningful stakeholder support, and makes joint change initiatives more successful than they would be without their involvement." },
                    { score: 1, text: "C. Their change leadership and strategic influence have created noticeably lasting cross-functional impact. A specific indicator: an initiative they championed has fundamentally changed how cross-functional work is done, their influence has shaped organizational decisions affecting shared priorities, or their approach to leading change has influenced how you think about driving improvement in your own area." }
                ]
            },
            {
                id: "PE_HIA_20_Q3", pillar: "How Do I Induce Action?", dimension: "Influence",
                cluster: "Change Leadership & Strategic Influence", type: "frequency",
                text: "Thinking about the behaviours you described in the previous two questions, how consistently have you observed this pattern in your interactions with [Name]?",
                options: [
                    { score: 0.70, text: "A. Rarely — I've observed this occasionally, but it's not a consistent pattern in how they typically work" },
                    { score: 0.85, text: "B. Sometimes — I've observed this in roughly half of the relevant situations I can recall" },
                    { score: 1.00, text: "C. Consistently — This is how I typically experience this person across most relevant situations" }
                ]
            }
        ]
    }
};
