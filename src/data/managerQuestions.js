//radna verzija pitanja, treba ispraviti kad se prava posalju
export const managerQuestions = {
    sr: {
        REZULTATI: [
            // STUB: KRATKOROČNI CILJEVI
            {
                id: "MR_KC_1.1C",
                pillar: "KRATKOROČNI CILJEVI",
                dimension: "REZULTATI",
                facet: "Postavljanje ciljeva i operativni fokus, Rešavanje problema i donošenje odluka, Upravljanje učinkom, Reagovanje u kriznim situacijama",
                type: "core",
                text: "MP – Osnovni scenario 1.1: Početak je zahtevnog kvartala. Kako ova osoba obično pristupa postavljanju ciljeva i upravljanju učinkom svog tima ili ličnim ciljevima tokom kvartala?",
                options: [
                    { score: 3, text: "A. Postavlja jasne ciljeve na početku kvartala i redovno prati napredak. Uglavnom ispunjava ciljeve na vreme, mada ponekad zahteva usmeravanje ili korekcije tokom kvartala." },
                    { score: 1, text: "B. Reaguje na prioritete onako kako se pojavljuju i rešava probleme sa učinkom tek kada postanu hitni. Rezultati su neujednačeni i zavise od toga koliko dobro anticipira promene." },
                    { score: 5, text: "C. Proaktivno povezuje ciljeve sa organizacionom strategijom, planira unapred i preuzima punu odgovornost za ostvarivanje rezultata. Isporuke su predvidive i retko dolazi do iznenađenja u poslednjem trenutku." }
                ]
            },
            {
                id: "MR_KC_1.1R",
                pillar: "KRATKOROČNI CILJEVI",
                dimension: "REZULTATI",
                type: "reflection",
                text: "MP – Refleksija o uticaju 1.1: Kada se pojave propusti u učinku ove osobe, šta je obično osnovni uzrok?",
                options: [
                    { score: 5, text: "A. Ova osoba razume šta se od nje očekuje, preuzima odgovornost i prilagođava pristup kada naiđe na prepreke — bez potrebe za čestom intervencijom." },
                    { score: 3, text: "B. Ciljevi ponekad zahtevaju prilagođavanja zbog novih informacija, ali ova osoba se generalno prilagođava i ostaje na pravom putu uz određenu podršku." },
                    { score: 1, text: "C. Propusti su često posledica nedovoljno jasnih ciljeva ili nagle promene prioriteta, a ova osoba ima poteškoća da sama koriguje kurs bez direktnog usmeravanja." }
                ]
            },
            {
                id: "MR_KC_1.2C",
                pillar: "KRATKOROČNI CILJEVI",
                dimension: "REZULTATI",
                type: "core",
                text: "MP – Osnovni scenario 1.2: Dogodi se neočekivana operativna greška koja ugrožava ključni rok. Kako ova osoba obično reaguje u kriznoj situaciji?",
                options: [
                    { score: 1, text: "A. Preuzima kontrolu rešavanjem problema ili ubrzavanjem tempa, što adresira hitan rok, ali slični problemi se ponavljaju, što ukazuje na fokus na simptome umesto uzroke." },
                    { score: 5, text: "B. Mirno stabilizuje situaciju, zatim istražuje suštinski uzrok i radi na sistemskim rešenjima koja sprečavaju ponavljanje." },
                    { score: 3, text: "C. Ostaje miran/mirna, organizovano pristupa dijagnozi problema i donosi strukturiranu odluku za rešavanje uz održavanje fokusa na rok i kvalitet." }
                ]
            },
            {
                id: "MR_KC_1.2R",
                pillar: "KRATKOROČNI CILJEVI",
                dimension: "REZULTATI",
                type: "reflection",
                text: "MP – Refleksija o uticaju 1.2: Kada ova osoba reši operativnu krizu, šta se obično dešava u narednom periodu?",
                options: [
                    { score: 3, text: "A. Srodne situacije se ponovo pojavljuju, ali ova osoba se generalno nosi s njima bolje zahvaljujući prethodnom iskustvu." },
                    { score: 1, text: "B. Slični problemi se brzo ponavljaju, što sugeriše da rešenja adresiraju simptome, a ne suštinske uzroke." },
                    { score: 5, text: "C. Slični problemi se retko ponavljaju; sistemske korekcije se održavaju i ova osoba postaje otpornija u prevenciji budućih problema." }
                ]
            },
            // STUB: DUGOROČNA PROMENA
            {
                id: "MR_DP_1.3C",
                pillar: "DUGOROČNA PROMENA",
                dimension: "REZULTATI",
                facet: "Strateško razmišljanje i vizija, Implementacija procesa promene, Inovacija i optimizacija procesa, Razvoj resursa i sposobnosti",
                type: "core",
                text: "MP – Osnovni scenario 1.3: Organizacija prolazi kroz stratešku promenu koja zahteva razvoj novih sposobnosti. Kako ova osoba obično pristupa dugoročnom razvoju sposobnosti i vođenju promena?",
                options: [
                    { score: 3, text: "A. Objašnjava strateško obrazloženje za promenu i razvija plan za sticanje novih sposobnosti, radeći na usklađivanju tekućih operacija i budućeg pravca." },
                    { score: 1, text: "B. Najavljuje novi pravac i očekuje da tim ili ona sama razvije potrebne veštine u sopstvenom tempu, fokusirajući se pretežno na kratkoročnu isporuku." },
                    { score: 5, text: "C. Prevodi tržišnu dinamiku u jasnu viziju, proaktivno gradi sposobnosti i podstiče eksperimentisanje i učenje tokom adaptacije." }
                ]
            },
            {
                id: "MR_DP_1.3R",
                pillar: "DUGOROČNA PROMENA",
                dimension: "REZULTATI",
                type: "reflection",
                text: "MP – Refleksija o uticaju 1.3: Koje prepreke se obično pojavljuju kada ova osoba radi na dugoročnom razvoju sposobnosti?",
                options: [
                    { score: 1, text: "A. Teško usklađuje učenje sa svakodnevnim obavezama; pritisci često odlažu napore za izgradnju sposobnosti, a rezultati kasne za planiranim tempom." },
                    { score: 5, text: "B. Uglavnom napreduje prema planu, prilagođavajući viziju kada tržišni uslovi ili nove spoznaje otkriju nove prioritete." },
                    { score: 3, text: "C. Napredak je stabilan, ali neravnomerno raspoređen; neke planirane sposobnosti zahtevaju više vremena nego što je predviđeno." }
                ]
            },
            {
                id: "MR_DP_1.4C",
                pillar: "DUGOROČNA PROMENA",
                dimension: "REZULTATI",
                type: "core",
                text: "MP – Osnovni scenario 1.4: Organizacija prolazi kroz veliku transformaciju, a istovremeno postoji potreba za optimizacijom postojećih procesa. Kako ova osoba balansira između pokretanja promena i osiguravanja operativne stabilnosti?",
                options: [
                    { score: 5, text: "A. Zagovara transformaciju i aktivno uključuje tim u oblikovanje načina implementacije, podsticaći inovacije procesa koje su u skladu sa novim pravcem." },
                    { score: 1, text: "B. Prioritet daje usklađivanju sa organizacionom transformacijom i stabilnosti, odlažući lokalne inovacije procesa za bolji trenutak." },
                    { score: 3, text: "C. Razvija plan za implementaciju transformacije i istovremeno ostavlja prostor za inkrementalne inovacije procesa koje se uklapaju u novi pravac." }
                ]
            },
            {
                id: "MR_DP_1.4R",
                pillar: "DUGOROČNA PROMENA",
                dimension: "REZULTATI",
                type: "reflection",
                text: "MP – Refleksija o uticaju 1.4: Kada ova osoba vodi inicijativu organizacione promene, u kojoj meri se njeni pristupi šire i usvajaju od strane drugih?",
                options: [
                    { score: 3, text: "A. Neki drugi timovi usvajaju pristupe ove osobe, ali uglavnom uz značajna prilagođavanja jer kontekst varira." },
                    { score: 1, text: "B. Inovacije ove osobe se retko prenose van njenog neposrednog konteksta; prepreke u sistemu ili prioritetima ograničavaju šire usvajanje." },
                    { score: 5, text: "C. Drugi timovi pokazuju interesovanje za pristup ove osobe; ona dokumentuje naučeno i aktivno pomaže drugima da prilagode rešenja svom kontekstu." }
                ]
            }
        ],
        MINDSET: [
            // STUB: PREMA SEBI
            {
                id: "MM_PS_2.1C",
                pillar: "PREMA SEBI",
                dimension: "NAČIN RAZMIŠLJANJA",
                facet: "Samosvest, Mentalitet rasta i agilnost učenja, Otpornost, Spremnost za promene",
                type: "core",
                text: "MP – Osnovni scenario 2.1: Ova osoba dobija konstruktivnu povratnu informaciju o svom pristupu radu i istovremeno doživljava neuspehe na projektu. Kako obično obrađuje povratne informacije i reaguje na izazove?",
                options: [
                    { score: 3, text: "A. Sluša povratnu informaciju, razmatra šta je validno i pravi konkretna prilagođavanja. Metodično radi na prevazilaženju neuspeha prilagođavanjem pristupa." },
                    { score: 1, text: "B. Inicijalno brani svoj pristup kada dobija povratnu informaciju. Neuspesi izazivaju frustraciju i ona se drži postojećih metoda umesto da brzo menja pristup." },
                    { score: 5, text: "C. Aktivno traži povratne informacije iz više izvora, na neuspehe gleda kao na podatke za poboljšanje i otvoreno razgovara o tome na čemu radi, modelujući da su poteškoće deo rasta." }
                ]
            },
            {
                id: "MM_PS_2.1R",
                pillar: "PREMA SEBI",
                dimension: "NAČIN RAZMIŠLJANJA",
                type: "reflection",
                text: "MP – Refleksija o uticaju 2.1: Kada ova osoba dobije povratnu informaciju koja dovodi u pitanje njen pristup, kako je obično obrađuje?",
                options: [
                    { score: 1, text: "A. U početku pruža otpor ili brani se od povratne informacije; treba joj vremena pre nego što može iskreno razmotriti promenu pristupa." },
                    { score: 5, text: "B. Iskreno je znatiželjna u vezi sa povratnim informacijama, čak i kada ih je teško čuti; traži obrasce i eksperimentiše sa novim pristupima." },
                    { score: 3, text: "C. Selektivno usvaja povratne informacije — menja pristup kada se poklapa sa njenim sopstvenim zapažanjima." }
                ]
            },
            {
                id: "MM_PS_2.2C",
                pillar: "PREMA SEBI",
                dimension: "NAČIN RAZMIŠLJANJA",
                type: "core",
                text: "MP – Osnovni scenario 2.2: Kompanija uvodi značajnu organizacionu promenu koja zahteva učenje potpuno novih sistema. Kako ova osoba obično upravlja sopstvenim mentalitetom i emocijama tokom ovog perioda?",
                options: [
                    { score: 1, text: "A. Prihvata promenu jer mora, ali preferira zadržavanje etabliranih metoda; uči nove sisteme oprezno, ne tražeći aktivno načine da ih iskoristi." },
                    { score: 5, text: "B. Vidi promenu kao priliku da preispita stare načine rada; aktivno istražuje nove sisteme, eksperimentiše i deli naučeno sa kolegama." },
                    { score: 3, text: "C. Prihvata da je promena neophodna, metodično prolazi kroz krivulju učenja i ostaje fokusirana na isporuku rezultata tokom tranzicije." }
                ]
            },
            {
                id: "MM_PS_2.2R",
                pillar: "PREMA SEBI",
                dimension: "NAČIN RAZMIŠLJANJA",
                type: "reflection",
                text: "MP – Refleksija o uticaju 2.2: Kada ova osoba prolazi kroz značajnu promenu, kako obično upravlja sopstvenim mentalitetom?",
                options: [
                    { score: 5, text: "A. Gleda na promenu kao normalan deo rada; koristi poremećaj kao priliku za preispitivanje i učenje." },
                    { score: 3, text: "B. Prilagođava se po potrebi i nastavlja dalje, ponekad tražeći ono što nedostaje iz starog načina rada, ali bez značajnog stresa." },
                    { score: 1, text: "C. Pokazuje anksioznost ili frustraciju; funkcioniše, ali prilagođavanje joj je vidno neprijatno." }
                ]
            },
            // STUB: PREMA DRUGIMA
            {
                id: "MM_PD_2.3C",
                pillar: "PREMA DRUGIMA",
                dimension: "NAČIN RAZMIŠLJANJA",
                facet: "Empatija, Posvećenost timu i saradnja, Mentalitet rešavanja konflikata, Inkluzivno liderstvo",
                type: "core",
                text: "MP – Osnovni scenario 2.3: Dvoje kolega su u žestokom neslaganju, a novi član tima se muči da izrazi mišljenje. Kako ova osoba obično interveniše ili doprinosi dinamici tima?",
                options: [
                    { score: 3, text: "A. Sluša obe strane i pomaže im da razumeju međusobne brige; ciljano pita novog člana tima za doprinos." },
                    { score: 1, text: "B. Ostaje neutralna u sukobima kolega osim ako je direktno zamolena za pomoć; ne podstiče aktivno tihe članove tima da se uključe." },
                    { score: 5, text: "C. Gleda na konflikt kao na priliku za jačanje odnosa; postavlja pitanja koja pomažu da se artikulišu pozicije i eksplicitno poziva novog člana tima da doprinese." }
                ]
            },
            {
                id: "MM_PD_2.3R",
                pillar: "PREMA DRUGIMA",
                dimension: "NAČIN RAZMIŠLJANJA",
                type: "reflection",
                text: "MP – Refleksija o uticaju 2.3: Kako ova osoba obično pristupa razumevanju različitih perspektiva u konfliktima?",
                options: [
                    { score: 1, text: "A. Sasluša obe strane, ali ponekad brzo proceni ko je u pravu; ne istražuje uvek dublje suštinske motive iza neslaganja." },
                    { score: 5, text: "B. Iskreno je znatiželjna zašto se ljudi ne slažu, čak i kada u početku ima jasno mišljenje; postavlja pitanja o pokretačima perspektive i često otkriva legitimne brige." },
                    { score: 3, text: "C. Pažljivo sluša, postavlja pitanja za pojašnjenje i priznaje validne tačke sa obe strane, čak i kada se ne slaže sa celokupnom pozicijom." }
                ]
            },
            {
                id: "MM_PD_2.4C",
                pillar: "PREMA DRUGIMA",
                dimension: "NAČIN RAZMIŠLJANJA",
                type: "core",
                text: "MP – Osnovni scenario 2.4: Tim radi na složenom projektu koji zahteva duboku saradnju. Kako ova osoba obično doprinosi timskoj posvećenosti i saradnji?",
                options: [
                    { score: 5, text: "A. Proaktivno nudi podršku kolegama, rado deli znanje i resurse, i aktivno traži prilike za jačanje načina na koji tim funkcioniše zajedno." },
                    { score: 1, text: "B. Fokusira se na sopstvene zadatke i deli informacije kada je to traženo, ali ne prati aktivno potrebe tima." },
                    { score: 3, text: "C. Učestvuje u timskim aktivnostima, deli znanje kada je upitana i povremeno proverava da li kolegama treba podrška." }
                ]
            },
            {
                id: "MM_PD_2.4R",
                pillar: "PREMA DRUGIMA",
                dimension: "NAČIN RAZMIŠLJANJA",
                type: "reflection",
                text: "MP – Refleksija o uticaju 2.4: Kada kolega ove osobe se muči ili radi u izolaciji, kako ova osoba obično reaguje?",
                options: [
                    { score: 3, text: "A. Primećuje kada kolege deluju izolovano i nudi pomoć; ponekad se javi ako misli da bi njen doprinos bio koristan." },
                    { score: 1, text: "B. Često ne primećuje, ili pretpostavlja da se kolege sami snalaze; reaguje tek kada problem postane vidljiv." },
                    { score: 5, text: "C. Redovno proverava kolege i traži znakove da im može biti potrebna podrška; proaktivno se obraća i nalazi načine za saradnju." }
                ]
            },
            // STUB: PREMA KOMPANIJI I POZICIJI
            {
                id: "MM_KP_2.5C",
                pillar: "PREMA KOMPANIJI I POZICIJI",
                dimension: "NAČIN RAZMIŠLJANJA",
                facet: "Odgovornost i vlasništvo, Moć odlučivanja, Strateško vlasništvo, Liderstvo zasnovano na vrednostima",
                type: "core",
                text: "MP – Osnovni scenario 2.5: Projekat visoke vidljivosti koji ova osoba vodi doživljava značajan neuspeh. Treba da donese tešku odluku pod pritiskom koja je u skladu sa vrednostima kompanije, ali može biti nepopularna. Kako obično reaguje?",
                options: [
                    { score: 3, text: "A. Preuzima odgovornost za svoj deo u neuspehu, donosi odluku u skladu sa vrednostima kompanije i objašnjava obrazloženje, čak i ako odluka nije popularna." },
                    { score: 5, text: "B. Preuzima punu odgovornost, istražuje sistemske uzroke neuspeha, donosi odluku usklađenu sa vrednostima i transparentno komunicira zašto je to pravi put, čak i pod pritiskom." },
                    { score: 1, text: "C. Ističe spoljne faktore koji su doprineli neuspehu; neodlučna je u teškim trenucima i donosi odluke sporije nego što situacija zahteva." }
                ]
            },
            {
                id: "MM_KP_2.5R",
                pillar: "PREMA KOMPANIJI I POZICIJI",
                dimension: "NAČIN RAZMIŠLJANJA",
                type: "reflection",
                text: "MP – Refleksija o uticaju 2.5: Kada ova osoba donese tešku, nepopularnu odluku, kako se nosi sa otporom?",
                options: [
                    { score: 1, text: "A. Brani odluku, ali ponekad se pita da li je trebalo dublje razmotriti brige pre donošenja." },
                    { score: 5, text: "B. Ostaje čvrsta pri odluci, traži načine da ublaži negativan uticaj i naknadno razmišlja da li je pristup mogao biti bolje komuniciran." },
                    { score: 3, text: "C. Objašnjava obrazloženje, ostaje otvorena za povratne informacije, ali ne menja odluku kada veruje da je u skladu sa vrednostima kompanije." }
                ]
            },
            {
                id: "MM_KP_2.6C",
                pillar: "PREMA KOMPANIJI I POZICIJI",
                dimension: "NAČIN RAZMIŠLJANJA",
                type: "core",
                text: "MP – Osnovni scenario 2.6: Ova osoba identifikuje značajnu stratešku priliku koja izaziva postojeće norme i može naići na otpor. Kako obično zagovara ovu inicijativu?",
                options: [
                    { score: 1, text: "A. Razvija snažan poslovni slučaj sa podacima i logikom, i predstavlja ga donosiocima odluka; fokusira se na argument umesto na izgradnju šire podrške." },
                    { score: 3, text: "B. Gradi snažan poslovni slučaj i angažuje ključne zainteresovane strane, uzimajući u obzir njihove brige pre predstavljanja višem rukovodstvu." },
                    { score: 5, text: "C. Aktivno uključuje zainteresovane strane u razvoj predloga, sluša brige i prilagođava pristup; uverljivo zagovara čak i kada postoji kontinuiran otpor." }
                ]
            },
            {
                id: "MM_KP_2.6R",
                pillar: "PREMA KOMPANIJI I POZICIJI",
                dimension: "NAČIN RAZMIŠLJANJA",
                type: "reflection",
                text: "MP – Refleksija o uticaju 2.6: Kada ova osoba predloži stratešku inicijativu koja nailazi na otpor, šta se obično desi?",
                options: [
                    { score: 1, text: "A. Predlog zastane ili bude odbijen; ova osoba prelazi na druge prioritete i nije uvek jasno da li otpor potiče od suštine ideje ili organizacione politike." },
                    { score: 5, text: "B. Nastavlja da zagovara i angažuje zainteresovane strane; predlog bude usvojen ili ona dođe do tačke gde zna da je iznela najjači mogući argument." },
                    { score: 3, text: "C. Adresira brige i repozicionira predlog koji na kraju dobija zamah i napreduje sa dovoljno podrške." }
                ]
            }
        ],
        VEŠTINE: [
            // STUB: LIČNA EFIKASNOST
            {
                id: "MV_LE_3.1C",
                pillar: "LIČNA EFIKASNOST",
                dimension: "VEŠTINE",
                facet: "Upravljanje prioritetima i vremenom, Lično rešavanje problema, Prilagodljivost, Taktike upravljanja promenama",
                type: "core",
                text: "MP – Osnovni scenario 3.1: Ova osoba upravlja velikom količinom posla sa više konkurentskih prioriteta, a uveden je novi softver koji menja radni tok. Kako obično upravlja prioritetima i prilagođava se novoj tehnologiji?",
                options: [
                    { score: 3, text: "A. Uspostavlja sistem prioriteta zasnovan na važnosti i rokovima i sistematično uči novi softver, osiguravajući da produktivnost ostane na nivou tokom tranzicije." },
                    { score: 1, text: "B. Reaguje na ono što je najurgentnije i uči novi softver postepeno; preferira da ne menja procese dok nije apsolutno neophodno." },
                    { score: 5, text: "C. Promišljeno dizajnira sistem prioriteta, rano se upoznaje sa novim softverom, eksperimentiše i deli naučeno — tražeći u novom alatu prilike za poboljšanje." }
                ]
            },
            {
                id: "MV_LE_3.1R",
                pillar: "LIČNA EFIKASNOST",
                dimension: "VEŠTINE",
                type: "reflection",
                text: "MP – Refleksija o uticaju 3.1: Kada se ova osoba morala prilagoditi značajnim promenama u alatima ili procesima, koliko je tranzicija glatko prošla?",
                options: [
                    { score: 5, text: "A. Relativno se brzo prilagodila; počela je da pronalazi efikasnosti sa novim alatom u kratkom periodu, mada je potpuna optimizacija trajala duže." },
                    { score: 1, text: "B. Tranzicija je bila izazovna i trajala je duže nego što se očekivalo; pad produktivnosti i frustracija bili su vidljivi tokom perioda prilagođavanja." },
                    { score: 3, text: "C. Prilagodila se sa podnošljivim poremećajem; početna usporenost je bila prisutna, ali se produktivnost vratila na normalan nivo u razumnom roku." }
                ]
            },
            {
                id: "MV_LE_3.2C",
                pillar: "LIČNA EFIKASNOST",
                dimension: "VEŠTINE",
                type: "core",
                text: "MP – Osnovni scenario 3.2: Postoji ponavljajući problem u radnom toku koji uzrokuje kašnjenja, a najavljena je organizaciona promena koja zahteva prilagođavanje procesa. Kako ova osoba obično pristupa rešavanju problema i vođenju kroz promenu?",
                options: [
                    { score: 1, text: "A. Fokusira se na upravljanje oko ponavljajućeg problema eskalirajući ga stručnjacima, i drži se estableciranih procesa tokom promene, implementirajući nove zahteve samo kada su obavezni." },
                    { score: 5, text: "B. Sistematski istražuje suštinski uzrok ponavljajućeg problema i razvija rešenje koje poboljšava radni tok; promišljeno prilagođava procese tokom organizacione promene i pomaže timu kroz tranziciju." },
                    { score: 3, text: "C. Analizira faktore koji doprinose ponavljajućem problemu i implementira rešenje; vodi tim kroz organizacionu promenu i prilagođava procese uz održavanje efikasnosti." }
                ]
            },
            {
                id: "MV_LE_3.2R",
                pillar: "LIČNA EFIKASNOST",
                dimension: "VEŠTINE",
                type: "reflection",
                text: "MP – Refleksija o uticaju 3.2: Kada ova osoba reši ponavljajući problem, koliko se rešenje zaista održava tokom vremena?",
                options: [
                    { score: 3, text: "A. Rešenje efikasno adresira problem i generalno se održava uz manja prilagođavanja." },
                    { score: 5, text: "B. Rešenje adresira suštinski uzrok i ostaje trajno; naučene lekcije se primenjuju i fundamentalna popravka sprečava ponavljanje." },
                    { score: 1, text: "C. Rešenje u početku funkcioniše, ali problem ima tendenciju da se ponovo pojavi ili evoluira; pristup se mora više puta modifikovati." }
                ]
            },
            // STUB: KOMUNIKACIJA
            {
                id: "MV_KO_3.3C",
                pillar: "KOMUNIKACIJA",
                dimension: "VEŠTINE",
                facet: "Komunikacija zasnovana na vrednostima, Strateško slušanje, Uticaj koji pokreće na akciju, Navigacija među zainteresovanim stranama",
                type: "core",
                text: "MP – Osnovni scenario 3.3: Ova osoba treba da objasni složenu stratešku inicijativu skeptičnom rukovodiocu koji je zauzet i daje neodređen odgovor. Kako obično pristupa ovom komunikacionom izazovu?",
                options: [
                    { score: 3, text: "A. Priprema poruku imajući na umu prioritete zainteresovane strane i sluša brige, prilagođavajući objašnjenje po potrebi." },
                    { score: 1, text: "B. Priprema temeljno objašnjenje strateških prednosti i fokusira se na logički argument, ne predviđajući uvek specifične brige zainteresovane strane unapred." },
                    { score: 5, text: "C. Unapred razmišlja o prioritetima zainteresovane strane i uokvirava inicijativu u kontekstu njihovih ciljeva; pažljivo sluša i prilagođava poruku; spreman/a je da pregovara o detaljima implementacije." }
                ]
            },
            {
                id: "MV_KO_3.3R",
                pillar: "KOMUNIKACIJA",
                dimension: "VEŠTINE",
                type: "reflection",
                text: "MP – Refleksija o uticaju 3.3: Kada ova osoba komunicira inicijativu skeptičnoj zainteresovanoj strani, šta se obično desi?",
                options: [
                    { score: 1, text: "A. Zainteresovana strana ostaje skeptična ili odbija; objašnjenje ne adresira ključne brige ili stvarna ograničenja sprečavaju saglasnost." },
                    { score: 5, text: "B. Zainteresovana strana razume inicijativu, postavlja pitanja za pojašnjenje i angažuje se oko praktičnih detalja implementacije." },
                    { score: 3, text: "C. Zainteresovana strana razume inicijativu i nastavlja dalje nakon razgovora o brigama; dolazi do određene razmene, ali odluka se zajednički donosi." }
                ]
            },
            {
                id: "MV_KO_3.4C",
                pillar: "KOMUNIKACIJA",
                dimension: "VEŠTINE",
                type: "core",
                text: "MP – Osnovni scenario 3.4: Ova osoba treba da obezbedi kritičan resurs od drugog odeljenja gde nema formalni autoritet, a oni imaju konkurentske prioritete. Kako obično pristupa ovoj saradnji?",
                options: [
                    { score: 1, text: "A. Direktno upućuje zahtev objašnjavajući zašto je resurs potreban, ne razumejući uvek u potpunosti ograničenja drugog odeljenja unapred." },
                    { score: 5, text: "B. Gleda na ovo kao na prilike za izgradnju saradničkog odnosa; uokvirava zahtev u kontekstu koristi za oba tima i istražuje kreativna rešenja koja funkcionišu za obe strane." },
                    { score: 3, text: "C. Obraća se drugom odeljenju, objašnjava potrebu i pita o njihovim prioritetima; traži načine na koje bi se ciljevi mogli uskladiti i predlaže rešenja koja funkcionišu za oba tima." }
                ]
            },
            {
                id: "MV_KO_3.4R",
                pillar: "KOMUNIKACIJA",
                dimension: "VEŠTINE",
                type: "reflection",
                text: "MP – Refleksija o uticaju 3.4: Kada ova osoba traži podršku iz drugih segmenata, šta je obično rezultat?",
                options: [
                    { score: 1, text: "A. Drugo odeljenje odbija ili značajno odlaže; unatoč objašnjenju potrebe, ne mogu ili ne žele da je ispune, pa ova osoba traži alternativna rešenja." },
                    { score: 5, text: "B. Drugo odeljenje razume zahtev i može da pomogne; angažuje se u zajedničkom rešavanju problema i brzo odgovara." },
                    { score: 3, text: "C. Drugo odeljenje pruža podršku, mada ne bez pregovora o rokovima ili obimu; zajedno se pronalazi put napred." }
                ]
            },
            // STUB: RAZVOJ TIMA I LJUDI
            {
                id: "MV_RTL_3.5C",
                pillar: "RAZVOJ TIMA I LJUDI",
                dimension: "VEŠTINE",
                facet: "Podsticajno delegiranje, Upravljanje učinkom, Priznanje i uvažavanje, Teški razgovori",
                type: "core",
                text: "MP – Osnovni scenario 3.5: Ova osoba ima člana tima visokog potencijala koji je spreman za izazovan zadatak, ali i konzistentnog izvršioca koji pokazuje malo inicijative za rast. Kako obično pristupa razvoju ovih osoba?",
                options: [
                    { score: 1, text: "A. Pružа bliski nadzor nad izazovnim zadatkom i za konzistentnog izvršioca održava stabilna očekivanja, prepuštajući im da sami odrede tempo rasta." },
                    { score: 3, text: "B. Odabira izazovne zadatke sa razvojnom namenom, daje početno usmeravanje i prostor za samostalan rad; sa konzistentnim izvršiocem razgovara o interesovanjima i predlaže oblasti za rast." },
                    { score: 5, text: "C. Namerno delegira izazovne zadatke dajući autonomiju i razvojnu podršku; za konzistentnog izvršioca vodi dublje razgovore i zajedno identifikuje prilike za rast usklađene sa njihovim interesovanjima." }
                ]
            },
            {
                id: "MV_RTL_3.5R",
                pillar: "RAZVOJ TIMA I LJUDI",
                dimension: "VEŠTINE",
                type: "reflection",
                text: "MP – Refleksija o uticaju 3.5: Kada ova osoba delegira izazovan zadatak članu tima, šta se obično desi?",
                options: [
                    { score: 1, text: "A. Član tima se značajno muči i treba mu suštinska pomoć; ova osoba postaje prilično uključena u obezbeđivanje uspeha, što ograničava razvoj vlasništva." },
                    { score: 3, text: "B. Član tima radi na izazovima uz periodične provere; razvija se, ostvaruje zadatak i uči iz iskustva." },
                    { score: 5, text: "C. Član tima preuzima vlasništvo i samostalno upravlja većinom izazova; dolazi sa specifičnim pitanjima i primenjuje naučene lekcije u kasnijem radu." }
                ]
            },
            {
                id: "MV_RTL_3.6C",
                pillar: "RAZVOJ TIMA I LJUDI",
                dimension: "VEŠTINE",
                type: "core",
                text: "MP – Osnovni scenario 3.6: Ova osoba treba da reši konzistentno negativno ponašanje direktnog podređenog, a istovremeno tim postiže značajan rezultat. Kako obično upravlja ovim izazovnim interakcijama i timskim dostignućima?",
                options: [
                    { score: 1, text: "A. Daje negativnom ponašanju vreme da se razreši samo; za postignuti cilj zahvaljuje na trudu, mada se više fokusira na završen posao nego na individualno priznanje." },
                    { score: 3, text: "B. Priprema konkretne primere i zakazuje privatan razgovor o negativnom ponašanju; za postignuti cilj javno prizna napore i individualne doprinose u razgovorima jedan-na-jedan." },
                    { score: 5, text: "C. Temeljno se priprema za težak razgovor, planira pristup i prilagođava ga ako osoba postane defanzivna; za postignuti cilj osmišljava specifično priznanje koje ističe individualne doprinose i jača tim." }
                ]
            },
            {
                id: "MV_RTL_3.6R",
                pillar: "RAZVOJ TIMA I LJUDI",
                dimension: "VEŠTINE",
                type: "reflection",
                text: "MP – Refleksija o uticaju 3.6: Kada ova osoba da tešku povratnu informaciju članu tima, kakav je bio ishod?",
                options: [
                    { score: 1, text: "A. Razgovor je bio nelagodan ili defanzivan; член tima je pružao otpor i nije bilo jasno da li razume šta treba da se promeni." },
                    { score: 3, text: "B. Razgovor je bio jasan i profesionalan; član tima je razumeo očekivano poboljšanje, mada je bilo određenog početnog otpora." },
                    { score: 5, text: "C. Razgovor je bio produktivan; član tima je razumeo povratnu informaciju, angažovao se i zajedno su razvili plan koji je doveo do vidljivih promena." }
                ]
            }
        ],
        UTICAJ: [
            // STUB: KAKO SE TIM OSEĆA?
            {
                id: "MU_KTO_4.1C",
                pillar: "KAKO SE TIM OSEĆA?",
                dimension: "UTICAJ",
                facet: "Autentično prisustvo, Emocionalna inteligencija, Inkluzija i pripadnost, Izgradnja poverenja",
                type: "core",
                text: "MP – Osnovni scenario 4.1: Tim raspravlja o osetljivoj organizacionoj promeni na sastanku. Neki su vidno uznemireni, drugi se ustežu da izraze brige. Kako ova osoba obično upravlja emocionalnom klimom i podstičе inkluzivno okruženje?",
                options: [
                    { score: 3, text: "A. Prizna da promena može izazvati anksioznost i pozove tim da podeli brige; posebno se potrudi da pita tiše članove tima za mišljenje." },
                    { score: 1, text: "B. Predstavlja činjenice jasno i direktno, ostavljajući prostor da ljudi odgovore, ali ne poziva aktivno na emocionalne reakcije ili brige." },
                    { score: 5, text: "C. Aktivno stvara prostor za emocionalne reakcije; specifično poziva perspektive od tiših članova tima i pomaže timu da vidi kako različite brige vode ka zajedničkim ciljevima." }
                ]
            },
            {
                id: "MU_KTO_4.1R",
                pillar: "KAKO SE TIM OSEĆA?",
                dimension: "UTICAJ",
                type: "reflection",
                text: "MP – Refleksija o uticaju 4.1: Kada ova osoba vodi sastanak sa uznemirenim ili neodlučnim članovima tima, šta se obično desi?",
                options: [
                    { score: 1, text: "A. Neki ostaju vidno uznemireni ili povučeni; uprkos priznavanju, ne otvaraju se i nije jasno da li se osećaju saslušano." },
                    { score: 5, text: "B. Više članova tima doprinosi perspektivama koje inače ne bi izneli; diskusija je otvorenija i ljudi se angažuju sa različitim pogledima." },
                    { score: 3, text: "C. Nekoliko članova tima deli brige, ton se popravlja i ljudi deluju angažovanije, mada nisu svi progovorili." }
                ]
            },
            {
                id: "MU_KTO_4.2C",
                pillar: "KAKO SE TIM OSEĆA?",
                dimension: "UTICAJ",
                type: "core",
                text: "MP – Osnovni scenario 4.2: Ova osoba donela je tešku odluku koja negativno utiče na neke pojedince, ali je neophodna za širu korist tima. Kako obično komunicira ovakvu odluku?",
                options: [
                    { score: 5, text: "A. Komunicira transparentno, objašnjava obrazloženje i teška ograničenja, sastaję se sa pogođenima da sasluša brige i prati ih naknadno." },
                    { score: 1, text: "B. Komunicira jasno i direktno, naglašavajući poslovnu neophodnost, ali ne istražuje detaljno emocionalni uticaj na pogođene." },
                    { score: 3, text: "C. Komunicira sa punom transparentnošću, prizna uticaj i nudi specifičnu podršku gde je moguće; naknadno se javi pogođenima da osigura razumevanje." }
                ]
            },
            {
                id: "MU_KTO_4.2R",
                pillar: "KAKO SE TIM OSEĆA?",
                dimension: "UTICAJ",
                type: "reflection",
                text: "MP – Refleksija o uticaju 4.2: Kada ova osoba komunicira tešku odluku koja negativno utiče na neke, kakav je bio ishod?",
                options: [
                    { score: 1, text: "A. Neki su se osećali zatečeno; objašnjenje nije adresiralo ključne brige i ostaju frustrirani ili nesigurni." },
                    { score: 3, text: "B. Razumeli su obrazloženje i kompromise; neki se nisu slagali, ali su se osećali saslušano tokom diskusije." },
                    { score: 5, text: "C. Razumeli su odluku i njenu vezu sa organizacionim potrebama; mogli su da vide da je ova osoba uzela u obzir njihove brige." }
                ]
            },
            // STUB: KAKO POKREĆE NA AKCIJU?
            {
                id: "MU_KPA_4.3C",
                pillar: "KAKO POKREĆE NA AKCIJU?",
                dimension: "UTICAJ",
                facet: "Vizionarska inspiracija, Osnaživanje i odgovornost, Liderstvo u promenama, Strateški uticaj",
                type: "core",
                text: "MP – Osnovni scenario 4.3: Tim radi na složenom projektu visokog rizika, a neki članovi deluju nezainteresovano. Ključna strateška inicijativa zahteva podršku drugog odeljenja. Kako ova osoba inspiriše vlasništvo i pokreće saradnju?",
                options: [
                    { score: 3, text: "A. Aktivno se angažuje na projektu, komunicira važnost i nudi pomoć kolegama u teškoćama; obraća se drugom odeljenju i traži načine da se ciljevi usklade." },
                    { score: 1, text: "B. Fokusira se na sopstvene zadatke i prepušta drugima da sami prolaze kroz izazove; za saradnju između segmenata upućuje zahteve samo kada je neophodno." },
                    { score: 5, text: "C. Predviđa prepreke i proaktivno radi na njihovom rešavanju; pomaže timu da razume kako se doprinosi uklapaju u širu sliku; za saradnju između segmenata uokvirava zahteve u kontekstu obostrane koristi." }
                ]
            },
            {
                id: "MU_KPA_4.3R",
                pillar: "KAKO POKREĆE NA AKCIJU?",
                dimension: "UTICAJ",
                type: "reflection",
                text: "MP – Refleksija o uticaju 4.3: Kada ova osoba pokušava da inspiriše vlasništvo na izazovnom projektu, šta se obično desi?",
                options: [
                    { score: 5, text: "A. Članovi tima preuzimaju više vlasništva; vidljivo je povećanje inicijative i razumevanja šire slike." },
                    { score: 1, text: "B. Neki ostaju nezainteresovani uprkos naporima; ova osoba ne zna uvek kako da ih pokrene napred." },
                    { score: 3, text: "C. Neke osobe povećavaju angažovanje; vidljivo je određeno povećanje inicijative, mada ne od svih." }
                ]
            },
            {
                id: "MU_KPA_4.4C",
                pillar: "KAKO POKREĆE NA AKCIJU?",
                dimension: "UTICAJ",
                type: "core",
                text: "MP – Osnovni scenario 4.4: Ova osoba identifikuje ambiciozan strateški pravac koji izaziva postojeće norme i može naići na otpor. Kako obično zagovara ovu inicijativu?",
                options: [
                    { score: 1, text: "A. Razvija sveobuhvatan poslovni slučaj sa podacima i ublažavanjem rizika; pretpostavlja da će dobro konstruisan argument imati težinu bez potrebe za izgradnjom šire podrške." },
                    { score: 3, text: "B. Gradi snažan poslovni slučaj i angažuje ključne zainteresovane strane u oblikovanju predloga; predstavlja ga sa podrškom zainteresovanih strana." },
                    { score: 5, text: "C. Identifikuje ko treba da podrži inicijativu i angažuje ih u razvoju predloga; sluša brige, prilagođava pristup i uporno zagovara pravac u koji veruje." }
                ]
            },
            {
                id: "MU_KPA_4.4R",
                pillar: "KAKO POKREĆE NA AKCIJU?",
                dimension: "UTICAJ",
                type: "reflection",
                text: "MP – Refleksija o uticaju 4.4: Kada ova osoba zagovara stratešku inicijativu koja nailazi na otpor, kakav je rezultat?",
                options: [
                    { score: 1, text: "A. Inicijativa bude odbijena ili značajno odložena; zainteresovane strane nisu ubeđene ili imaju konkurentske prioritete." },
                    { score: 5, text: "B. Zainteresovane strane suštinski razmatraju predlog i podržavaju napredovanje; spremne su da rasporede resurse." },
                    { score: 3, text: "C. Inicijativa dobija zamah i napreduje sa dovoljno podrške da se isproba, uz određenu tekuću diskusiju." }
                ]
            }
        ]
    },
    eng: {
        RESULTS: [
            // PILLAR: SHORT-TERM GOALS
            {
                id: "MR_STG_1.1C",
                pillar: "SHORT-TERM GOALS",
                dimension: "RESULTS",
                facet: "Goal Setting & Operational Focus, Problem-Solving & Decision Making, Performance Management, Crisis Response",
                type: "core",
                text: "MA - Core Scenario 1.1: It is the start of a busy quarter. How does this person typically approach goal-setting and performance management through the quarter?",
                options: [
                    { score: 3, text: "A. Sets clear goals at the start of the quarter and tracks progress regularly. Generally delivers on time, though sometimes requires guidance or course corrections during the quarter." },
                    { score: 1, text: "B. Reacts to priorities as they emerge and addresses performance issues only when they become urgent. Results are uneven depending on how well they anticipate shifting priorities." },
                    { score: 5, text: "C. Proactively connects goals to organizational strategy, plans ahead, and takes full ownership of results. Delivery is predictable with few last-minute surprises." }
                ]
            },
            {
                id: "MR_STG_1.1R",
                pillar: "SHORT-TERM GOALS",
                dimension: "RESULTS",
                type: "reflection",
                text: "MA - Reflection on Impact 1.1: When performance gaps appear with this person, what is typically the root cause?",
                options: [
                    { score: 5, text: "A. They understand what is expected, take ownership, and adjust their approach when obstacles arise — requiring minimal intervention." },
                    { score: 3, text: "B. Goals sometimes need adjustment due to new information, but they generally adapt and stay on track with some support." },
                    { score: 1, text: "C. Gaps often stem from unclear goals or sudden priority shifts; they struggle to self-correct without direct guidance." }
                ]
            },
            {
                id: "MR_STG_1.2C",
                pillar: "SHORT-TERM GOALS",
                dimension: "RESULTS",
                type: "core",
                text: "MA - Core Scenario 1.2: An unexpected operational error threatens a key deadline and causes immediate panic. How does this person typically respond in a crisis?",
                options: [
                    { score: 1, text: "A. Takes control by fixing the problem themselves or pushing for faster work — addressing the immediate deadline, but similar problems tend to recur, suggesting a focus on symptoms rather than causes." },
                    { score: 5, text: "B. Calmly stabilizes the situation, then investigates the root cause and works on systemic fixes that prevent recurrence." },
                    { score: 3, text: "C. Stays calm, organizes a structured diagnosis, and makes a clear decision to resolve the issue while maintaining focus on quality and deadline." }
                ]
            },
            {
                id: "MR_STG_1.2R",
                pillar: "SHORT-TERM GOALS",
                dimension: "RESULTS",
                type: "reflection",
                text: "MA - Reflection on Impact 1.2: When this person resolves an operational crisis, what typically happens in the weeks that follow?",
                options: [
                    { score: 3, text: "A. Related challenges occasionally recur, but they generally handle them better based on previous experience." },
                    { score: 1, text: "B. Similar problems resurface quickly, suggesting their solutions address symptoms rather than underlying causes." },
                    { score: 5, text: "C. Similar problems rarely recur; systemic fixes hold, and they become more resilient in preventing future issues." }
                ]
            },
            // PILLAR: LONG-TERM CHANGE
            {
                id: "MR_LTC_1.3C",
                pillar: "LONG-TERM CHANGE",
                dimension: "RESULTS",
                facet: "Strategic Thinking & Vision, Change Process Implementation, Innovation & Process Optimization, Capability Development",
                type: "core",
                text: "MA - Core Scenario 1.3: The organization is going through a strategic change requiring new capabilities. How does this person typically approach long-term capability development and leading change?",
                options: [
                    { score: 3, text: "A. Explains the strategic rationale and develops a plan for new capabilities, working to balance current operations with the future direction." },
                    { score: 1, text: "B. Announces the new direction and expects the team or themselves to develop needed skills at their own pace, staying focused mainly on short-term delivery." },
                    { score: 5, text: "C. Translates market dynamics into a clear vision, proactively builds capabilities, and encourages experimentation and learning through adaptation." }
                ]
            },
            {
                id: "MR_LTC_1.3R",
                pillar: "LONG-TERM CHANGE",
                dimension: "RESULTS",
                type: "reflection",
                text: "MA - Reflection on Impact 1.3: What obstacles typically arise when this person works on long-term capability development?",
                options: [
                    { score: 1, text: "A. Struggles to balance learning with day-to-day demands; pressures often delay capability-building efforts and results lag behind the planned pace." },
                    { score: 5, text: "B. Generally progresses according to plan, adjusting the vision when market conditions or new insights reveal new priorities." },
                    { score: 3, text: "C. Progress is steady but uneven; some planned capabilities take longer than expected." }
                ]
            },
            {
                id: "MR_LTC_1.4C",
                pillar: "LONG-TERM CHANGE",
                dimension: "RESULTS",
                type: "core",
                text: "MA - Core Scenario 1.4: The organization is undergoing a major transformation while process optimization is also needed. How does this person balance driving change with maintaining operational stability?",
                options: [
                    { score: 5, text: "A. Champions the transformation and actively involves the team in shaping implementation, encouraging process innovations aligned with the new direction." },
                    { score: 1, text: "B. Prioritizes alignment with the organizational transformation and stability, deferring local process innovations for a better moment." },
                    { score: 3, text: "C. Develops a plan for transformation implementation while also creating space for incremental process innovations that fit the new direction." }
                ]
            },
            {
                id: "MR_LTC_1.4R",
                pillar: "LONG-TERM CHANGE",
                dimension: "RESULTS",
                type: "reflection",
                text: "MA - Reflection on Impact 1.4: When this person leads a change initiative, to what extent do their approaches spread and get adopted by others?",
                options: [
                    { score: 3, text: "A. Some other teams adopt their approaches but usually with significant adaptation because context varies." },
                    { score: 1, text: "B. Their innovations rarely transfer beyond their immediate context; systemic barriers or competing priorities limit broader adoption." },
                    { score: 5, text: "C. Other teams show interest in their approach; they document learnings and actively help others adapt solutions to their context." }
                ]
            }
        ],
        MINDSET: [
            // PILLAR: TOWARDS SELF
            {
                id: "MM_TS_2.1C",
                pillar: "TOWARDS SELF",
                dimension: "MINDSET",
                facet: "Self-Awareness, Growth Mindset & Learning Agility, Resilience, Openness to Change",
                type: "core",
                text: "MA - Core Scenario 2.1: This person receives constructive feedback about their approach and simultaneously encounters setbacks on a project. How do they typically process feedback and respond to challenges?",
                options: [
                    { score: 3, text: "A. Listens to feedback, considers what is valid, and makes concrete adjustments. Works methodically through setbacks by adapting their approach." },
                    { score: 1, text: "B. Initially defends their approach when receiving feedback. Setbacks cause frustration and they tend to stick to existing methods rather than quickly changing course." },
                    { score: 5, text: "C. Actively seeks feedback from multiple sources, treats setbacks as data for improvement, and openly discusses what they are working on — modeling that difficulties are part of growth." }
                ]
            },
            {
                id: "MM_TS_2.1R",
                pillar: "TOWARDS SELF",
                dimension: "MINDSET",
                type: "reflection",
                text: "MA - Reflection on Impact 2.1: When this person receives feedback that challenges their approach, how do they typically process it?",
                options: [
                    { score: 1, text: "A. Initially resists or defends against the feedback; needs time before they can genuinely consider changing their approach." },
                    { score: 5, text: "B. Genuinely curious about feedback, even when difficult to hear; looks for patterns and experiments with new approaches based on what they learn." },
                    { score: 3, text: "C. Selectively incorporates feedback — changes approach when it aligns with their own observations." }
                ]
            },
            {
                id: "MM_TS_2.2C",
                pillar: "TOWARDS SELF",
                dimension: "MINDSET",
                type: "core",
                text: "MA - Core Scenario 2.2: The company introduces a significant organizational change requiring entirely new systems. How does this person typically manage their mindset and emotions during this period?",
                options: [
                    { score: 1, text: "A. Accepts the change because they have to but prefers established methods; learns new systems cautiously without actively seeking opportunities to leverage them." },
                    { score: 5, text: "B. Sees change as an opportunity to reassess old ways of working; actively explores new systems, experiments, and shares learnings with colleagues." },
                    { score: 3, text: "C. Accepts that change is necessary, works methodically through the learning curve, and maintains focus on delivering results during the transition." }
                ]
            },
            {
                id: "MM_TS_2.2R",
                pillar: "TOWARDS SELF",
                dimension: "MINDSET",
                type: "reflection",
                text: "MA - Reflection on Impact 2.2: When this person goes through a significant change, how do they typically manage their mindset?",
                options: [
                    { score: 5, text: "A. Treats change as a normal part of work; uses disruption as an opportunity for reflection and learning." },
                    { score: 3, text: "B. Adapts as needed and moves forward, occasionally reflecting on what they miss from the old way, but without significant stress." },
                    { score: 1, text: "C. Shows anxiety or frustration; functions, but adaptation is visibly uncomfortable." }
                ]
            },
            // PILLAR: TOWARDS OTHERS
            {
                id: "MM_TO_2.3C",
                pillar: "TOWARDS OTHERS",
                dimension: "MINDSET",
                facet: "Empathy, Team Commitment & Collaboration, Conflict Resolution Mindset, Inclusive Leadership",
                type: "core",
                text: "MA - Core Scenario 2.3: Two colleagues are in a heated disagreement and a new team member is struggling to voice their opinion. How does this person typically intervene or contribute to team dynamics?",
                options: [
                    { score: 3, text: "A. Listens to both sides and helps them understand each other's concerns; specifically asks the new team member for their input." },
                    { score: 1, text: "B. Stays neutral in colleague conflicts unless directly asked for help; does not actively encourage quieter team members to engage." },
                    { score: 5, text: "C. Sees conflict as an opportunity to strengthen relationships; asks questions that help articulate positions and explicitly invites the new team member to contribute." }
                ]
            },
            {
                id: "MM_TO_2.3R",
                pillar: "TOWARDS OTHERS",
                dimension: "MINDSET",
                type: "reflection",
                text: "MA - Reflection on Impact 2.3: How does this person typically approach understanding different perspectives in conflicts?",
                options: [
                    { score: 1, text: "A. Listens to both sides but sometimes quickly judges who is right; doesn't always explore the deeper motivations behind the disagreement." },
                    { score: 5, text: "B. Genuinely curious about why people disagree, even when they initially have a clear view; asks about the drivers of each perspective and often discovers legitimate concerns." },
                    { score: 3, text: "C. Listens carefully, asks clarifying questions, and acknowledges valid points from both sides, even when disagreeing with an overall position." }
                ]
            },
            {
                id: "MM_TO_2.4C",
                pillar: "TOWARDS OTHERS",
                dimension: "MINDSET",
                type: "core",
                text: "MA - Core Scenario 2.4: The team is working on a complex project requiring deep collaboration. How does this person typically contribute to team commitment and collaboration?",
                options: [
                    { score: 5, text: "A. Proactively offers support to colleagues, freely shares knowledge and resources, and actively looks for opportunities to strengthen how the team works together." },
                    { score: 1, text: "B. Focuses on their own tasks and shares information when asked, but does not actively track the team's needs." },
                    { score: 3, text: "C. Participates in team activities, shares knowledge when asked, and occasionally checks whether colleagues need support." }
                ]
            },
            {
                id: "MM_TO_2.4R",
                pillar: "TOWARDS OTHERS",
                dimension: "MINDSET",
                type: "reflection",
                text: "MA - Reflection on Impact 2.4: When a colleague of this person is struggling or working in isolation, how does this person typically respond?",
                options: [
                    { score: 3, text: "A. Notices when colleagues seem isolated and offers help; sometimes reaches out if they think their contribution would be useful." },
                    { score: 1, text: "B. Often doesn't notice, or assumes colleagues are managing; responds only when a problem becomes visible." },
                    { score: 5, text: "C. Regularly checks on colleagues and looks for signs that support may be needed; proactively reaches out and finds ways to collaborate." }
                ]
            },
            // PILLAR: TOWARDS COMPANY & ROLE
            {
                id: "MM_TCR_2.5C",
                pillar: "TOWARDS COMPANY & ROLE",
                dimension: "MINDSET",
                facet: "Accountability & Ownership, Decision-Making, Strategic Ownership, Values-Based Leadership",
                type: "core",
                text: "MA - Core Scenario 2.5: A high-visibility project this person leads experiences a significant failure. They need to make a difficult decision under pressure that aligns with company values but may be unpopular. How do they typically respond?",
                options: [
                    { score: 3, text: "A. Takes responsibility for their part in the failure, makes a decision aligned with company values, and explains the rationale — even when the decision is not popular." },
                    { score: 5, text: "B. Takes full ownership, investigates systemic causes of the failure, makes a values-aligned decision, and transparently communicates why it is the right path — even under pressure." },
                    { score: 1, text: "C. Highlights external factors that contributed to the failure; tends to be indecisive in difficult moments and makes decisions more slowly than the situation requires." }
                ]
            },
            {
                id: "MM_TCR_2.5R",
                pillar: "TOWARDS COMPANY & ROLE",
                dimension: "MINDSET",
                type: "reflection",
                text: "MA - Reflection on Impact 2.5: When this person makes a difficult, unpopular decision, how do they handle resistance?",
                options: [
                    { score: 1, text: "A. Defends the decision but sometimes wonders whether concerns should have been more deeply considered before deciding." },
                    { score: 5, text: "B. Holds firm while acknowledging concerns and looks for ways to mitigate negative impact; later reflects on whether the approach could have been better communicated." },
                    { score: 3, text: "C. Explains the rationale and remains open to feedback but does not change the decision when they believe it aligns with company values." }
                ]
            },
            {
                id: "MM_TCR_2.6C",
                pillar: "TOWARDS COMPANY & ROLE",
                dimension: "MINDSET",
                type: "core",
                text: "MA - Core Scenario 2.6: This person identifies a significant strategic opportunity that challenges existing norms and may face resistance. How do they typically advocate for this initiative?",
                options: [
                    { score: 1, text: "A. Develops a strong business case with data and risk mitigation, presenting it to decision-makers and assuming a well-constructed argument will carry weight without building broader support." },
                    { score: 3, text: "B. Builds a strong business case and engages key stakeholders in shaping the proposal, incorporating feedback before presenting to senior leadership." },
                    { score: 5, text: "C. Actively involves stakeholders in developing the proposal, listens to concerns, adapts the approach where it strengthens the initiative, and persistently advocates even when resistance continues." }
                ]
            },
            {
                id: "MM_TCR_2.6R",
                pillar: "TOWARDS COMPANY & ROLE",
                dimension: "MINDSET",
                type: "reflection",
                text: "MA - Reflection on Impact 2.6: When this person proposes a strategic initiative that faces resistance, what typically happens?",
                options: [
                    { score: 1, text: "A. The proposal stalls or is rejected; they move to other priorities and it is not always clear whether resistance stemmed from the idea itself or organizational politics." },
                    { score: 5, text: "B. They continue to advocate and engage stakeholders; the proposal is either adopted or they reach a point where they know they have made the strongest possible case." },
                    { score: 3, text: "C. Addresses concerns and repositions the proposal, which eventually gains momentum and moves forward with enough support to be piloted." }
                ]
            }
        ],
        SKILLS: [
            // PILLAR: PERSONAL EFFECTIVENESS
            {
                id: "MV_PE_3.1C",
                pillar: "PERSONAL EFFECTIVENESS",
                dimension: "SKILLS",
                facet: "Priority & Time Management, Problem-Solving, Adaptability, Change Management",
                type: "core",
                text: "MA - Core Scenario 3.1: This person manages a large workload with competing priorities, and new software has been introduced that changes their workflow. How do they typically manage priorities and adapt to new technology?",
                options: [
                    { score: 3, text: "A. Establishes a priority system based on importance and deadlines and learns the new software systematically, ensuring productivity remains stable through the transition." },
                    { score: 1, text: "B. Reacts to what is most urgent and learns the new software gradually; prefers not to change processes until absolutely necessary." },
                    { score: 5, text: "C. Thoughtfully designs a priority system, learns the new software early, experiments with it, and shares learnings — looking for opportunities to improve through the new tool." }
                ]
            },
            {
                id: "MV_PE_3.1R",
                pillar: "PERSONAL EFFECTIVENESS",
                dimension: "SKILLS",
                type: "reflection",
                text: "MA - Reflection on Impact 3.1: When this person has had to adapt to significant changes in tools or processes, how smoothly did the transition typically go?",
                options: [
                    { score: 5, text: "A. Adapted relatively quickly; began finding efficiencies with the new tool in a short period, though full optimization took longer." },
                    { score: 1, text: "B. The transition was challenging and took longer than expected; a drop in productivity and frustration were visible during the adjustment period." },
                    { score: 3, text: "C. Adapted with manageable disruption; an initial slowdown was present but productivity returned to normal levels within a reasonable timeframe." }
                ]
            },
            {
                id: "MV_PE_3.2C",
                pillar: "PERSONAL EFFECTIVENESS",
                dimension: "SKILLS",
                type: "core",
                text: "MA - Core Scenario 3.2: A recurring workflow problem is causing delays, and an organizational change requires process adaptation. How does this person typically approach solving the problem and leading through the change?",
                options: [
                    { score: 1, text: "A. Manages around the recurring problem by escalating to experts and sticks to established processes during the change, implementing new requirements only when mandatory." },
                    { score: 5, text: "B. Systematically investigates root causes of the recurring problem and develops a workflow-improving solution; thoughtfully adapts processes during organizational change and helps the team through the transition." },
                    { score: 3, text: "C. Analyzes contributing factors to the recurring problem and implements a solution; leads the team through organizational change and adapts processes while maintaining efficiency." }
                ]
            },
            {
                id: "MV_PE_3.2R",
                pillar: "PERSONAL EFFECTIVENESS",
                dimension: "SKILLS",
                type: "reflection",
                text: "MA - Reflection on Impact 3.2: When this person solves a recurring problem, how well does the solution hold over time?",
                options: [
                    { score: 3, text: "A. The solution effectively addresses the problem and generally holds with minor adjustments." },
                    { score: 5, text: "B. The solution addresses the root cause and remains lasting; lessons learned are applied and the fundamental fix prevents recurrence." },
                    { score: 1, text: "C. The solution works initially but the problem tends to resurface or evolve; the approach needs to be modified multiple times." }
                ]
            },
            // PILLAR: COMMUNICATION
            {
                id: "MV_CO_3.3C",
                pillar: "COMMUNICATION",
                dimension: "SKILLS",
                facet: "Values-Based Communication, Strategic Listening, Action-Driving Influence, Stakeholder Navigation",
                type: "core",
                text: "MA - Core Scenario 3.3: This person needs to explain a complex strategic initiative to a skeptical, busy senior leader who gives a vague initial 'no'. How do they typically approach this communication challenge?",
                options: [
                    { score: 3, text: "A. Prepares their message with the stakeholder's priorities in mind and listens to concerns, adapting the explanation as needed." },
                    { score: 1, text: "B. Prepares a thorough explanation of the strategic benefits and focuses on the logical argument, not always anticipating the stakeholder's specific concerns upfront." },
                    { score: 5, text: "C. Thinks ahead about the stakeholder's priorities and frames the initiative in the context of their goals; listens carefully and adapts the message; is willing to negotiate implementation details to find a path that works for both." }
                ]
            },
            {
                id: "MV_CO_3.3R",
                pillar: "COMMUNICATION",
                dimension: "SKILLS",
                type: "reflection",
                text: "MA - Reflection on Impact 3.3: When this person communicates an initiative to a skeptical stakeholder, what typically happens?",
                options: [
                    { score: 1, text: "A. The stakeholder remains skeptical or declines; the explanation does not address key concerns or real constraints prevent agreement." },
                    { score: 5, text: "B. The stakeholder understands the initiative, asks clarifying questions, and engages around practical implementation details." },
                    { score: 3, text: "C. The stakeholder understands the initiative and agrees to move forward after discussing concerns; some exchange occurs but a decision is reached together." }
                ]
            },
            {
                id: "MV_CO_3.4C",
                pillar: "COMMUNICATION",
                dimension: "SKILLS",
                type: "core",
                text: "MA - Core Scenario 3.4: This person needs to secure a critical resource from another department where they have no formal authority, and that department has competing priorities. How do they typically approach this cross-functional collaboration?",
                options: [
                    { score: 1, text: "A. Makes a direct request explaining why the resource is needed, without always fully understanding the other department's constraints upfront." },
                    { score: 5, text: "B. Sees this as an opportunity to build a collaborative relationship; frames the request in the context of mutual benefit and explores creative solutions that work for both sides." },
                    { score: 3, text: "C. Reaches out to the other department, explains the need, and asks about their priorities; looks for ways their goals can align and proposes solutions that work for both teams." }
                ]
            },
            {
                id: "MV_CO_3.4R",
                pillar: "COMMUNICATION",
                dimension: "SKILLS",
                type: "reflection",
                text: "MA - Reflection on Impact 3.4: When this person seeks support from other segments, what is typically the result?",
                options: [
                    { score: 1, text: "A. The other department declines or significantly delays; despite explaining the need, they cannot or will not fulfill it, and this person finds alternative solutions." },
                    { score: 5, text: "B. The other department understands the request and is able to help; they engage in joint problem-solving and respond promptly." },
                    { score: 3, text: "C. The other department provides support, though not without negotiating timelines or scope; a workable path forward is found together." }
                ]
            },
            // PILLAR: TEAM & PEOPLE DEVELOPMENT
            {
                id: "MV_TPD_3.5C",
                pillar: "TEAM & PEOPLE DEVELOPMENT",
                dimension: "SKILLS",
                facet: "Empowering Delegation, Performance Management, Recognition & Appreciation, Difficult Conversations",
                type: "core",
                text: "MA - Core Scenario 3.5: This person has a high-potential team member ready for a challenge and a consistent performer showing little growth initiative. How do they typically approach developing these individuals?",
                options: [
                    { score: 1, text: "A. Provides close oversight of the challenging task and maintains stable expectations for the consistent performer, leaving them to determine their own growth pace." },
                    { score: 3, text: "B. Selects challenging tasks with developmental intent, provides initial guidance and space for independent work; discusses career interests with the consistent performer and suggests growth areas." },
                    { score: 5, text: "C. Intentionally delegates challenging tasks with autonomy and developmental support; conducts deeper conversations with the consistent performer to identify growth opportunities aligned with their interests and team needs." }
                ]
            },
            {
                id: "MV_TPD_3.5R",
                pillar: "TEAM & PEOPLE DEVELOPMENT",
                dimension: "SKILLS",
                type: "reflection",
                text: "MA - Reflection on Impact 3.5: When this person delegates a challenging task to a team member, what typically happens?",
                options: [
                    { score: 1, text: "A. The team member struggles significantly and needs substantial help; this person becomes quite involved in ensuring success, limiting the team member's ownership of the outcome." },
                    { score: 3, text: "B. The team member works through challenges with periodic check-ins; they develop, complete the task, and learn from both successes and setbacks along the way." },
                    { score: 5, text: "C. The team member takes ownership and independently manages most challenges; they come with specific questions and apply lessons learned to subsequent work." }
                ]
            },
            {
                id: "MV_TPD_3.6C",
                pillar: "TEAM & PEOPLE DEVELOPMENT",
                dimension: "SKILLS",
                type: "core",
                text: "MA - Core Scenario 3.6: This person needs to address consistently negative behavior from a direct report, while the team is also achieving a significant result. How do they typically manage these challenging interactions and team achievements?",
                options: [
                    { score: 1, text: "A. Gives the negative behavior time to resolve itself before intervening; thanks the team for effort on the achievement but focuses more on the completed work than on individual recognition." },
                    { score: 3, text: "B. Prepares specific examples and schedules a private conversation about the negative behavior; publicly acknowledges team efforts and recognizes individual contributions in one-on-one conversations." },
                    { score: 5, text: "C. Thoroughly prepares for the difficult conversation, plans their approach and adapts it if the person becomes defensive; designs recognition for the achievement that highlights specific contributions and strengthens the team." }
                ]
            },
            {
                id: "MV_TPD_3.6R",
                pillar: "TEAM & PEOPLE DEVELOPMENT",
                dimension: "SKILLS",
                type: "reflection",
                text: "MA - Reflection on Impact 3.6: When this person delivers difficult feedback to a team member, what is typically the outcome?",
                options: [
                    { score: 1, text: "A. The conversation is uncomfortable or defensive; the team member resists and it is unclear whether they understand what needs to change." },
                    { score: 3, text: "B. The conversation is clear and professional; the team member understands the expected improvement, though some initial resistance is present." },
                    { score: 5, text: "C. The conversation is productive; the team member understands the feedback, engages on how to improve, and together they develop a plan that leads to visible behavioral changes." }
                ]
            }
        ],
        IMPACT: [
            // PILLAR: HOW DOES THE TEAM FEEL?
            {
                id: "MU_HTF_4.1C",
                pillar: "HOW DOES THE TEAM FEEL?",
                dimension: "IMPACT",
                facet: "Authentic Presence, Emotional Intelligence, Inclusion & Belonging, Building Trust",
                type: "core",
                text: "MA - Core Scenario 4.1: The team is discussing a sensitive organizational change. Some members are visibly upset; others are hesitant to voice concerns. How does this person typically manage the emotional climate and foster an inclusive environment?",
                options: [
                    { score: 3, text: "A. Acknowledges that change can cause anxiety and invites the team to share concerns; makes a point of asking quieter team members for their perspective." },
                    { score: 1, text: "B. Presents the facts clearly and directly, leaving space for responses but not actively inviting emotional reactions or concerns." },
                    { score: 5, text: "C. Actively creates space for emotional reactions; specifically invites perspectives from quieter team members and helps the team see how different concerns connect to shared goals." }
                ]
            },
            {
                id: "MU_HTF_4.1R",
                pillar: "HOW DOES THE TEAM FEEL?",
                dimension: "IMPACT",
                type: "reflection",
                text: "MA - Reflection on Impact 4.1: When this person leads a meeting with upset or hesitant team members, what typically happens?",
                options: [
                    { score: 1, text: "A. Some team members remain visibly upset or withdrawn; despite acknowledgment, they don't open up and it is unclear whether they feel heard." },
                    { score: 5, text: "B. More team members contribute perspectives they might not otherwise have shared; the discussion becomes more open and people engage with diverse views." },
                    { score: 3, text: "C. Several team members share concerns after being invited; the tone improves and people seem more engaged, though not everyone speaks up." }
                ]
            },
            {
                id: "MU_HTF_4.2C",
                pillar: "HOW DOES THE TEAM FEEL?",
                dimension: "IMPACT",
                type: "core",
                text: "MA - Core Scenario 4.2: This person has made a difficult decision that negatively affects some individuals but is necessary for the broader team. How do they typically communicate such a decision?",
                options: [
                    { score: 5, text: "A. Communicates transparently, explains the rationale and difficult constraints, meets with affected individuals to hear their concerns, and follows up afterward." },
                    { score: 1, text: "B. Communicates clearly and directly, emphasizing business necessity, but does not explore the emotional impact on affected individuals in depth." },
                    { score: 3, text: "C. Communicates with full transparency, acknowledges the impact, and offers specific support where possible; follows up with affected individuals to ensure understanding." }
                ]
            },
            {
                id: "MU_HTF_4.2R",
                pillar: "HOW DOES THE TEAM FEEL?",
                dimension: "IMPACT",
                type: "reflection",
                text: "MA - Reflection on Impact 4.2: When this person communicates a difficult decision that negatively affects some, what is typically the outcome?",
                options: [
                    { score: 1, text: "A. Some feel blindsided; the explanation does not address key concerns and they remain frustrated or uncertain." },
                    { score: 3, text: "B. They understand the rationale and trade-offs; some disagree but feel heard during the discussion." },
                    { score: 5, text: "C. They understand the decision and its connection to organizational needs; they can see that this person took their concerns into account." }
                ]
            },
            // PILLAR: HOW DO THEY DRIVE ACTION?
            {
                id: "MU_HDA_4.3C",
                pillar: "HOW DO THEY DRIVE ACTION?",
                dimension: "IMPACT",
                facet: "Visionary Inspiration, Empowerment & Accountability, Change Leadership, Strategic Influence",
                type: "core",
                text: "MA - Core Scenario 4.3: The team is working on a high-stakes project with some disengaged members. A key strategic initiative also requires support from another department. How does this person inspire ownership and drive collaboration?",
                options: [
                    { score: 3, text: "A. Actively engages on the project, communicates the importance, and offers help to colleagues who are struggling; reaches out to the other department and looks for ways to align goals." },
                    { score: 1, text: "B. Focuses on their own responsibilities and lets others navigate their own challenges; makes cross-functional requests only when necessary." },
                    { score: 5, text: "C. Anticipates obstacles and proactively works to remove them; helps the team understand how contributions fit into the bigger picture; frames cross-functional requests in terms of mutual benefit." }
                ]
            },
            {
                id: "MU_HDA_4.3R",
                pillar: "HOW DO THEY DRIVE ACTION?",
                dimension: "IMPACT",
                type: "reflection",
                text: "MA - Reflection on Impact 4.3: When this person tries to inspire ownership on a challenging project, what typically happens?",
                options: [
                    { score: 5, text: "A. Team members take on more ownership; a visible increase in initiative and understanding of the bigger picture is apparent." },
                    { score: 1, text: "B. Some remain disengaged despite efforts; this person is not always sure how to move them forward." },
                    { score: 3, text: "C. Some people increase their engagement; a certain increase in initiative is visible, though not from everyone." }
                ]
            },
            {
                id: "MU_HDA_4.4C",
                pillar: "HOW DO THEY DRIVE ACTION?",
                dimension: "IMPACT",
                type: "core",
                text: "MA - Core Scenario 4.4: This person identifies an ambitious strategic direction that challenges existing norms and may face resistance. How do they typically advocate for this initiative?",
                options: [
                    { score: 1, text: "A. Develops a comprehensive business case with data and risk mitigation; assumes a well-constructed argument will carry weight without building broader political support." },
                    { score: 3, text: "B. Builds a strong business case and engages key stakeholders in shaping the proposal; presents it with stakeholder support, showing how it aligns with company goals." },
                    { score: 5, text: "C. Carefully identifies who needs to support the initiative and engages them in developing the proposal; listens to concerns, adapts the approach, and persistently advocates for the direction they believe in." }
                ]
            },
            {
                id: "MU_HDA_4.4R",
                pillar: "HOW DO THEY DRIVE ACTION?",
                dimension: "IMPACT",
                type: "reflection",
                text: "MA - Reflection on Impact 4.4: When this person advocates for a strategic initiative that faces resistance, what is typically the result?",
                options: [
                    { score: 1, text: "A. The initiative is rejected or significantly delayed; stakeholders are not convinced or have competing priorities that prevent adoption." },
                    { score: 5, text: "B. Stakeholders substantively engage with the proposal and support moving forward; they are willing to allocate resources and work on implementation." },
                    { score: 3, text: "C. The initiative gains momentum and moves forward with enough support to be piloted, with some ongoing discussion about implementation." }
                ]
            }
        ]
    }
};
