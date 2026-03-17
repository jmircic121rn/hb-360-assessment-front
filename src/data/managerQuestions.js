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
        "Short-term Goals": [
            // Cluster 1: Operational Execution & Goal Achievement
            {
                id: "ME_STG_1_Q1", pillar: "Short-term Goals", dimension: "Results",
                cluster: "Operational Execution & Goal Achievement", type: "behavioural",
                text: "When you observe how [Name] sets goals, manages day-to-day execution, and drives their team to deliver results, which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They set goals that address immediate priorities and monitor team progress. Their approach to execution is functional, though they may need guidance on complex prioritization, resource allocation, or when goals require adjustment due to changing circumstances." },
                    { score: 3, text: "B. They establish clear, measurable goals aligned with strategic objectives and manage execution effectively. They track progress consistently, make timely decisions to keep work on track, and ensure their team understands priorities and delivers against expectations." },
                    { score: 5, text: "C. They proactively set ambitious yet realistic goals with strong strategic alignment, anticipating execution challenges and resource constraints. They make sophisticated decisions that balance competing priorities, adapt goals skilfully when conditions change, and create an execution rhythm that keeps the team focused and productive." }
                ]
            },
            {
                id: "ME_STG_1_Q2", pillar: "Short-term Goals", dimension: "Results",
                cluster: "Operational Execution & Goal Achievement", type: "impact",
                text: "When you review the results [Name]'s team delivers against their goals and operational commitments, what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. The team delivers on most goals, though some require mid-period adjustments or your intervention. Execution challenges occasionally create delays or quality issues that need to be addressed." },
                    { score: 0, text: "B. The team consistently meets goals and operational commitments. Progress is predictable, decisions lead to effective outcomes, and the team maintains steady performance against expectations." },
                    { score: 1, text: "C. The team consistently exceeds expectations with strong execution discipline. A specific indicator: their goals are achieved with minimal intervention from you, and their execution approach has become a reference point for how other teams should operate." }
                ]
            },
            {
                id: "ME_STG_1_Q3", pillar: "Short-term Goals", dimension: "Results",
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
                id: "ME_STG_2_Q1", pillar: "Short-term Goals", dimension: "Results",
                cluster: "Problem-Solving & Performance Under Pressure", type: "behavioural",
                text: "When you observe how [Name] handles complex problems, makes decisions under pressure, and manages their team through unexpected challenges or crises, which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They address problems as they arise and work to stabilize difficult situations. Under pressure, they may need guidance on root cause analysis, managing team stress, or balancing immediate response with longer-term solutions." },
                    { score: 3, text: "B. They systematically analyze problems, make timely decisions considering both immediate and long-term implications, and maintain team stability during crises. They handle pressure well, communicate clearly during urgent situations, and resolve most challenges independently." },
                    { score: 5, text: "C. They demonstrate sophisticated problem-solving and exceptional composure under pressure. They proactively identify issues before they escalate, make well-reasoned decisions in high-stakes situations, and guide their team through crises in ways that build resilience and often prevent similar problems from recurring." }
                ]
            },
            {
                id: "ME_STG_2_Q2", pillar: "Short-term Goals", dimension: "Results",
                cluster: "Problem-Solving & Performance Under Pressure", type: "impact",
                text: "When you review how [Name]'s team performs during challenging situations and the lasting impact of their problem-solving, what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. Problems are addressed and the team manages through difficult periods, though resolution may take time or require your support. Similar issues sometimes resurface, suggesting solutions addressed symptoms rather than root causes." },
                    { score: 0, text: "B. Their problem-solving consistently resolves issues effectively, and the team maintains reasonable performance during pressure situations. Crises are managed with appropriate composure, and operations stabilize in reasonable timeframes." },
                    { score: 1, text: "C. Their problem-solving produces lasting solutions and their crisis management builds team resilience. A specific indicator: similar problems rarely recur after they've addressed them, and their team demonstrates notable composure and effectiveness even during high-pressure situations." }
                ]
            },
            {
                id: "ME_STG_2_Q3", pillar: "Short-term Goals", dimension: "Results",
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
                id: "ME_LTC_3_Q1", pillar: "Long-term Change", dimension: "Results",
                cluster: "Strategic Vision & Change Leadership", type: "behavioural",
                text: "When you observe how [Name] thinks strategically about the future, communicates vision, and leads organizational change initiatives, which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They focus primarily on current execution and implement required changes. When discussing strategy or leading change, they may need support in connecting work to long-term direction, managing stakeholder resistance, or anticipating future implications." },
                    { score: 3, text: "B. They effectively balance operational focus with strategic thinking, articulating a clear vision for their team's direction. They plan and execute change initiatives with structured approaches, communicate change effectively, and consider how emerging trends should influence their area." },
                    { score: 5, text: "C. They demonstrate sophisticated strategic thinking and change leadership. They proactively shape organizational direction with compelling vision, lead complex transformations that build strong stakeholder coalitions, and anticipate future developments in ways that position the organization advantageously." }
                ]
            },
            {
                id: "ME_LTC_3_Q2", pillar: "Long-term Change", dimension: "Results",
                cluster: "Strategic Vision & Change Leadership", type: "impact",
                text: "When you review how [Name]'s strategic thinking and change leadership influence organizational direction and transformation outcomes, what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. Their team executes current priorities effectively. Change initiatives are implemented, though adoption may take time or require additional support, and strategic contributions emerge primarily through guidance from you or senior leadership." },
                    { score: 0, text: "B. Their team demonstrates clear strategic understanding, and change initiatives achieve solid adoption. They independently align work with strategic priorities and successfully guide their team through transitions with reasonable stakeholder buy-in." },
                    { score: 1, text: "C. Their strategic thinking has influenced organizational direction, and their change initiatives achieve exceptional adoption. A specific indicator: they've proactively proposed strategic initiatives that were adopted, their change management approach has created advocates rather than just compliance, or their vision has measurably influenced how others think about future direction." }
                ]
            },
            {
                id: "ME_LTC_3_Q3", pillar: "Long-term Change", dimension: "Results",
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
                id: "ME_LTC_4_Q1", pillar: "Long-term Change", dimension: "Results",
                cluster: "Innovation & Capability Building", type: "behavioural",
                text: "When you observe how [Name] drives innovation, optimizes processes, and develops their team's capabilities for long-term organizational strength, which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They implement improvements when directed and manage current resource allocation to meet immediate needs. They may need support in identifying strategic capability gaps, challenging existing processes, or creating comprehensive development plans aligned with long-term organizational needs." },
                    { score: 3, text: "B. They regularly identify improvement opportunities and effectively develop team capabilities. They implement process changes successfully, allocate resources to balance current delivery with capability building, and create structured development plans that produce measurable improvements." },
                    { score: 5, text: "C. They demonstrate sophisticated innovation and capability development. They create systematic approaches to continuous improvement, design innovative development programs that others adopt, and strategically build capabilities that strengthen the broader organization and create lasting competitive advantage." }
                ]
            },
            {
                id: "ME_LTC_4_Q2", pillar: "Long-term Change", dimension: "Results",
                cluster: "Innovation & Capability Building", type: "impact",
                text: "When you review the impact of [Name]'s innovation efforts and the capabilities their team has developed, what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. Improvements are implemented and the team maintains necessary skills for current work. Innovation addresses specific issues and development happens, though capability building may be reactive to emerging needs rather than strategically planned." },
                    { score: 0, text: "B. Their process improvements deliver measurable efficiency gains, and their team demonstrates steady capability growth aligned with organizational needs. Innovation efforts produce practical solutions, and development investments improve team performance over time." },
                    { score: 1, text: "C. Their innovation work has produced significant, lasting improvements, and their team has developed distinctive capabilities. A specific indicator: process changes they've implemented have been adopted by other teams, capabilities they've built are now leveraged across the organization, or their approach to capability development has been recognized as a model." }
                ]
            },
            {
                id: "ME_LTC_4_Q3", pillar: "Long-term Change", dimension: "Results",
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
                id: "ME_TO_5_Q1", pillar: "Towards Oneself", dimension: "Mindset",
                cluster: "Self-Awareness & Personal Growth", type: "behavioural",
                text: "When you observe how [Name] demonstrates understanding of their strengths and limitations, responds to feedback, embraces learning opportunities, and believes in their ability to develop, which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They show basic awareness of their capabilities and accept feedback when provided. They may need prompting to recognize blind spots or development needs, and their engagement with learning opportunities can be inconsistent or require encouragement." },
                    { score: 3, text: "B. They accurately assess their strengths and development areas, proactively seek feedback, and consistently pursue learning opportunities. They demonstrate belief in their ability to grow, respond constructively to input, and actively work on developing new capabilities." },
                    { score: 5, text: "C. They demonstrate deep self-awareness and exceptional learning agility. They anticipate their own development needs, actively seek diverse perspectives on their impact, embrace challenging learning opportunities, and model growth mindset practices that inspire others to develop." }
                ]
            },
            {
                id: "ME_TO_5_Q2", pillar: "Towards Oneself", dimension: "Mindset",
                cluster: "Self-Awareness & Personal Growth", type: "impact",
                text: "When you provide feedback to [Name] or observe their response to development opportunities and challenges, what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. They receive feedback and generally work to address it, though behavior change may be gradual. They engage with development opportunities when provided, though they may need support in translating feedback into action or maintaining momentum in their growth." },
                    { score: 0, text: "B. They respond constructively to feedback with specific development plans and demonstrate consistent behavior change. They independently pursue learning opportunities, show measurable skill growth over time, and apply new learning effectively to their work." },
                    { score: 1, text: "C. They actively seek feedback before issues arise and demonstrate sophisticated self-development. A specific indicator: they've identified and addressed development needs before you raised them, they've pursued challenging learning that accelerated their growth, or their approach to self-development has influenced how others on the team think about their own growth." }
                ]
            },
            {
                id: "ME_TO_5_Q3", pillar: "Towards Oneself", dimension: "Mindset",
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
                id: "ME_TO_6_Q1", pillar: "Towards Oneself", dimension: "Mindset",
                cluster: "Resilience & Adaptability", type: "behavioural",
                text: "When you observe how [Name] maintains effectiveness under pressure, recovers from setbacks, adapts to changing circumstances, and manages uncertainty, which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They work through challenges and adapt to changes when they occur. Under sustained pressure or significant change, they may become overwhelmed or require support to maintain effectiveness, and recovery from setbacks can take time." },
                    { score: 3, text: "B. They effectively manage stress and adversity, maintaining consistent performance during difficult periods. They adapt readily to changing circumstances, recover from setbacks with reasonable speed, and maintain a constructive outlook during uncertainty." },
                    { score: 5, text: "C. They demonstrate exceptional resilience and adaptability. They maintain high effectiveness even under sustained pressure, recover quickly from setbacks often with new insights, proactively anticipate and prepare for changes, and thrive in uncertain environments while helping others navigate challenges." }
                ]
            },
            {
                id: "ME_TO_6_Q2", pillar: "Towards Oneself", dimension: "Mindset",
                cluster: "Resilience & Adaptability", type: "impact",
                text: "When you observe how [Name] and their team perform during periods of pressure, change, or after significant setbacks, what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. They work through difficult periods and adapt to changes, though performance may dip temporarily. Recovery from setbacks happens, though it may require your support or additional time to restore full effectiveness." },
                    { score: 0, text: "B. They maintain steady performance during pressure and adapt to changes with minimal disruption. After setbacks, they recover in reasonable timeframes and help their team maintain focus and effectiveness through transitions." },
                    { score: 1, text: "C. They demonstrate notable resilience that strengthens team performance. A specific indicator: during recent pressure situations or changes, they maintained exceptional effectiveness, their recovery from setbacks included process improvements that prevented recurrence, or their adaptability during uncertainty helped stabilize broader organizational response." }
                ]
            },
            {
                id: "ME_TO_6_Q3", pillar: "Towards Oneself", dimension: "Mindset",
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
                id: "ME_TOT_7_Q1", pillar: "Towards Others", dimension: "Mindset",
                cluster: "Empathy & Inclusive Collaboration", type: "behavioural",
                text: "When you observe how [Name] understands and responds to others' perspectives and needs, values diverse contributions, creates psychological safety, and fosters collaboration, which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They work cooperatively with others and acknowledge different viewpoints when raised. They may miss emotional cues or struggle to create an environment where all team members feel equally valued, and their approach to collaboration can be inconsistent." },
                    { score: 3, text: "B. They consistently demonstrate empathy by actively listening and responding to others' needs. They value diverse perspectives, create an environment where team members feel heard and respected, and foster effective collaboration across different backgrounds and viewpoints." },
                    { score: 5, text: "C. They demonstrate exceptional empathy and create a deeply inclusive environment. They proactively anticipate emotional needs, skillfully navigate sensitive situations, actively celebrate diversity, and champion inclusion in ways that make everyone feel genuinely valued and empowered to contribute fully." }
                ]
            },
            {
                id: "ME_TOT_7_Q2", pillar: "Towards Others", dimension: "Mindset",
                cluster: "Empathy & Inclusive Collaboration", type: "impact",
                text: "When you observe the team dynamics, collaboration quality, and how team members from diverse backgrounds engage, what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. The team works together and completes joint work. Some team members may be more engaged than others, and you occasionally need to intervene to ensure all voices are heard or to address interpersonal dynamics." },
                    { score: 0, text: "B. The team collaborates effectively with mutual respect. Team members from diverse backgrounds contribute actively, people feel comfortable sharing perspectives, and collaboration produces solid outcomes with reasonable engagement across the team." },
                    { score: 1, text: "C. The team demonstrates exceptional collaboration and inclusion. A specific indicator: team members actively seek each other's perspectives, people from all backgrounds contribute confidently and are visibly valued, or the team's inclusive culture has become a model that others reference." }
                ]
            },
            {
                id: "ME_TOT_7_Q3", pillar: "Towards Others", dimension: "Mindset",
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
                id: "ME_TOT_8_Q1", pillar: "Towards Others", dimension: "Mindset",
                cluster: "Collaboration & Constructive Conflict", type: "behavioural",
                text: "When you observe how [Name] commits to team success, shares knowledge and resources, approaches disagreements and conflicts, and maintains constructive relationships during tension, which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They contribute to team efforts and work through disagreements when they arise. During conflicts, they may avoid difficult conversations or become defensive, and their commitment to shared success can be inconsistent when priorities compete." },
                    { score: 3, text: "B. They consistently demonstrate team commitment, actively sharing knowledge and supporting collective goals. They approach conflicts constructively, viewing disagreements as opportunities for discussion, and maintain professional relationships while working through differences." },
                    { score: 5, text: "C. They champion team success and foster highly collaborative culture. They proactively share knowledge and resources, embrace productive tension as valuable, create psychological safety for healthy disagreement, and skillfully navigate complex conflicts in ways that strengthen relationships and outcomes." }
                ]
            },
            {
                id: "ME_TOT_8_Q2", pillar: "Towards Others", dimension: "Mindset",
                cluster: "Collaboration & Constructive Conflict", type: "impact",
                text: "When you observe how the team handles disagreements, shares knowledge, and works toward collective goals, what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. The team works together and addresses conflicts when necessary. Knowledge sharing happens, though it may be uneven, and some disagreements may linger or require your intervention to resolve." },
                    { score: 0, text: "B. The team demonstrates solid collaboration with effective knowledge sharing. Conflicts are addressed constructively, disagreements lead to better solutions, and team members maintain professional relationships while working through differences." },
                    { score: 1, text: "C. The team demonstrates exceptional collaboration and healthy conflict dynamics. A specific indicator: team members actively seek each other's input, disagreements are viewed as opportunities for improvement, knowledge flows freely across the team, or the team's collaborative culture has measurably improved outcomes." }
                ]
            },
            {
                id: "ME_TOT_8_Q3", pillar: "Towards Others", dimension: "Mindset",
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
                id: "ME_TCP_9_Q1", pillar: "Towards Company & Position", dimension: "Mindset",
                cluster: "Accountability & Decision Ownership", type: "behavioural",
                text: "When you observe how [Name] takes ownership of decisions and outcomes, assumes accountability for their area's impact, makes decisions with appropriate authority, and drives results, which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They accept responsibility for their work and make decisions within their scope. They may need guidance on complex decisions or when outcomes fall short, and their sense of accountability can be inconsistent, sometimes attributing challenges to external factors." },
                    { score: 3, text: "B. They consistently assume accountability for decisions, actions, and outcomes. They make informed, timely decisions with appropriate confidence, take responsibility for both successes and failures, and create a culture of accountability within their team." },
                    { score: 5, text: "C. They demonstrate exceptional ownership and decision-making authority. They proactively assume accountability for broader organizational impact, make confident decisions that engage and influence others, anticipate challenges before they arise, and create systems that empower others to take full ownership." }
                ]
            },
            {
                id: "ME_TCP_9_Q2", pillar: "Towards Company & Position", dimension: "Mindset",
                cluster: "Accountability & Decision Ownership", type: "impact",
                text: "When you review how [Name] handles outcomes — both positive and negative — and the decision-making culture within their team, what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. They acknowledge outcomes and work to address issues when they arise. Decision-making happens, though team members may look to them for most decisions, and accountability for results may require reinforcement." },
                    { score: 0, text: "B. They take clear ownership of outcomes without deflecting blame. Their team makes appropriate decisions independently, and there's a solid culture of accountability where team members take responsibility for their work." },
                    { score: 1, text: "C. They model exceptional accountability that transforms team culture. A specific indicator: when things go wrong, they focus on solutions and learning rather than blame, their team demonstrates strong decision-making autonomy, or their accountability approach has been recognized as a model for the organization." }
                ]
            },
            {
                id: "ME_TCP_9_Q3", pillar: "Towards Company & Position", dimension: "Mindset",
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
                id: "ME_TCP_10_Q1", pillar: "Towards Company & Position", dimension: "Mindset",
                cluster: "Strategic Ownership & Values Alignment", type: "behavioural",
                text: "When you observe how [Name] connects their work to organizational strategy, demonstrates commitment to company mission and values, and reflects those values in their decisions and actions, which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They execute on assigned priorities and acknowledge organizational values when discussed. They may need support in connecting daily work to broader strategy or in consistently aligning decisions with company values, particularly when under pressure." },
                    { score: 3, text: "B. They effectively communicate organizational strategy to their team, connecting work to company goals and values. They consistently reflect organizational values in their decisions, demonstrate genuine commitment to the mission, and help their team understand the \"why\" behind their work." },
                    { score: 5, text: "C. They champion organizational strategy and embody company values in transformative ways. They proactively shape how their area contributes to strategic goals, inspire others to connect with the mission, and consistently model values-driven leadership that influences organizational culture." }
                ]
            },
            {
                id: "ME_TCP_10_Q2", pillar: "Towards Company & Position", dimension: "Mindset",
                cluster: "Strategic Ownership & Values Alignment", type: "impact",
                text: "When you observe how [Name]'s team understands organizational strategy and demonstrates alignment with company values, what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. The team executes on priorities and is generally aware of company values. Strategic alignment is maintained through regular guidance, and values alignment may be inconsistent, particularly during high-pressure situations." },
                    { score: 0, text: "B. The team demonstrates clear understanding of how their work connects to organizational strategy. Team members reflect company values in their work, and there's solid alignment between the team's actions and organizational mission." },
                    { score: 1, text: "C. The team operates with exceptional strategic clarity and values alignment. A specific indicator: team members articulate how their work serves organizational strategy without prompting, the team's values-driven culture is visible and recognized, or [Name]'s approach to strategic and values alignment has influenced how other teams operate." }
                ]
            },
            {
                id: "ME_TCP_10_Q3", pillar: "Towards Company & Position", dimension: "Mindset",
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
                id: "ME_PE_11_Q1", pillar: "Personal Efficiency", dimension: "Skills",
                cluster: "Priority Management & Personal Effectiveness", type: "behavioural",
                text: "When you observe how [Name] manages their time, prioritizes competing demands, solves problems independently, and adapts their personal approach to changing circumstances, which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They manage their workload and address problems as they arise. They may need guidance on complex prioritization, struggle when multiple demands compete simultaneously, or require support to adjust their approach when circumstances change significantly." },
                    { score: 3, text: "B. They effectively manage their time and consistently meet commitments. They prioritize strategically, solve most problems independently with structured approaches, and adapt their personal working style readily to changing conditions while maintaining focus on key objectives." },
                    { score: 5, text: "C. They demonstrate exceptional personal effectiveness. They anticipate time constraints and proactively manage competing demands, solve complex problems with sophisticated analysis, and thrive in ambiguous or rapidly changing environments. Their personal efficiency enables them to focus on high-impact work and frees capacity for strategic contribution." }
                ]
            },
            {
                id: "ME_PE_11_Q2", pillar: "Personal Efficiency", dimension: "Skills",
                cluster: "Priority Management & Personal Effectiveness", type: "impact",
                text: "When you review how reliably [Name] delivers on commitments, manages their own workload, and maintains effectiveness through changing conditions, what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. They deliver on most commitments, though some may require deadline extensions or additional support. When priorities shift or problems arise, their effectiveness may dip temporarily, requiring your involvement to re-establish focus." },
                    { score: 0, text: "B. They consistently meet commitments and maintain effectiveness through routine changes. Their personal organization allows them to deliver reliably, and they handle most priority conflicts and problems without requiring your intervention." },
                    { score: 1, text: "C. Their personal effectiveness consistently enables high-impact delivery. A specific indicator: they routinely manage complex competing priorities without missing commitments, their problem-solving approach prevents issues from escalating, or their adaptability during recent significant changes allowed them to maintain full productivity while others struggled." }
                ]
            },
            {
                id: "ME_PE_11_Q3", pillar: "Personal Efficiency", dimension: "Skills",
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
                id: "ME_PE_12_Q1", pillar: "Personal Efficiency", dimension: "Skills",
                cluster: "Change Tactics & Implementation Capability", type: "behavioural",
                text: "When you observe how [Name] applies structured approaches to implement change, manages resistance, and engages stakeholders through transitions, which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They implement required changes and communicate them to their area. They apply basic change approaches, though they may need support managing complex resistance, engaging diverse stakeholders, or sustaining momentum through longer-term transitions." },
                    { score: 3, text: "B. They apply proven change management methodologies effectively, engaging stakeholders broadly and managing resistance with structured techniques. They implement complex changes successfully, maintain engagement through transitions, and adapt their approach based on stakeholder feedback." },
                    { score: 5, text: "C. They demonstrate sophisticated change management capability. They design comprehensive change frameworks, build strong stakeholder coalitions that transform resistance into active advocacy, and create lasting organizational capability to handle future changes more effectively." }
                ]
            },
            {
                id: "ME_PE_12_Q2", pillar: "Personal Efficiency", dimension: "Skills",
                cluster: "Change Tactics & Implementation Capability", type: "impact",
                text: "When you review the outcomes of changes [Name] has implemented — including adoption rates, stakeholder engagement, and sustainability — what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. Changes are implemented and the organization adapts over time. Adoption may be partial or take longer than planned, and some stakeholder resistance may persist, requiring your involvement to fully embed new ways of working." },
                    { score: 0, text: "B. Changes achieve solid adoption with meaningful stakeholder engagement. Transitions are managed effectively, resistance is addressed constructively, and new approaches are sustained without requiring significant ongoing reinforcement." },
                    { score: 1, text: "C. Changes achieve exceptional adoption with strong stakeholder commitment. A specific indicator: stakeholders who initially resisted have become active advocates, adoption has been sustained without ongoing intervention, or their change management approach has been adopted as a model for other initiatives in the organization." }
                ]
            },
            {
                id: "ME_PE_12_Q3", pillar: "Personal Efficiency", dimension: "Skills",
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
                id: "ME_COM_13_Q1", pillar: "Communication", dimension: "Skills",
                cluster: "Impactful Communication & Strategic Listening", type: "behavioural",
                text: "When you observe how [Name] communicates with stakeholders — how they frame messages, listen to understand underlying motivations, and tailor communication to connect with different audiences — which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They communicate clearly and listen to what is said. Their messages address the topic at hand, though they may not consistently frame information in terms of value to the recipient, and they may miss underlying concerns or motivations when listening." },
                    { score: 3, text: "B. They structure communication to capture attention and clearly articulate value for the recipient. They actively listen beyond the surface to understand underlying motivations and concerns, identifying what is unspoken in order to address root causes of misalignment or resistance." },
                    { score: 5, text: "C. They demonstrate masterful communication and strategic listening. They anticipate audience needs and potential objections before they arise, craft narratives that create deep understanding and commitment, and use listening as a strategic tool to identify subtle signals of concern or opportunity that others miss." }
                ]
            },
            {
                id: "ME_COM_13_Q2", pillar: "Communication", dimension: "Skills",
                cluster: "Impactful Communication & Strategic Listening", type: "impact",
                text: "When you observe how stakeholders respond to [Name]'s communication and how their listening shapes outcomes in important conversations, what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. Stakeholders receive information and understand the basic message. Key conversations address the stated issue, though some misalignment may persist, and you occasionally need to follow up to ensure important messages have landed as intended." },
                    { score: 0, text: "B. Stakeholders consistently understand the purpose and value of [Name]'s messages and engage meaningfully. Their listening enables them to address real concerns, and conversations produce outcomes where people feel genuinely heard and clear on next steps." },
                    { score: 1, text: "C. Stakeholders demonstrate notable commitment — not just understanding — after interactions with [Name]. A specific indicator: people who were initially skeptical have changed position after conversations with them, their listening has surfaced concerns that prevented a significant issue, or their communication has changed how stakeholders think about a topic, not just what they do." }
                ]
            },
            {
                id: "ME_COM_13_Q3", pillar: "Communication", dimension: "Skills",
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
                id: "ME_COM_14_Q1", pillar: "Communication", dimension: "Skills",
                cluster: "Influence & Stakeholder Navigation", type: "behavioural",
                text: "When you observe how [Name] influences stakeholders, removes barriers to action, builds coalitions, and navigates complex organizational dynamics, which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They present their ideas and requests to stakeholders and work to gain support. Their influence approach is direct, though they may not consistently address stakeholder-specific concerns, remove friction that creates resistance, or navigate complex organizational dynamics effectively." },
                    { score: 3, text: "B. They influence stakeholders effectively by framing requests in terms of mutual benefit and proactively addressing barriers to action. They map stakeholder interests, build productive relationships across the organization, and navigate complex dynamics to achieve desired outcomes." },
                    { score: 5, text: "C. They demonstrate sophisticated influence and stakeholder navigation. They design communication strategies that make desired actions the path of least resistance, build powerful coalitions that mobilize broad support, and navigate organizational dynamics with exceptional skill that transforms the way initiatives gain traction." }
                ]
            },
            {
                id: "ME_COM_14_Q2", pillar: "Communication", dimension: "Skills",
                cluster: "Influence & Stakeholder Navigation", type: "impact",
                text: "When you review the outcomes of [Name]'s influence efforts — including stakeholder support gained, initiatives advanced, and coalitions built — what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. They gain support for straightforward initiatives and build functional working relationships. Complex influence situations or significant organizational resistance may require your involvement or take longer than anticipated to resolve." },
                    { score: 0, text: "B. They consistently achieve stakeholder buy-in for their initiatives through well-planned influence strategies. They navigate organizational dynamics effectively, build coalitions that sustain momentum, and move important initiatives forward with solid stakeholder support." },
                    { score: 1, text: "C. They achieve exceptional stakeholder alignment and build powerful coalitions. A specific indicator: they've advanced a complex initiative through significant organizational resistance, built cross-functional support that accelerated strategic decisions, or their influence approach has created lasting relationships that continue to generate value beyond specific initiatives." }
                ]
            },
            {
                id: "ME_COM_14_Q3", pillar: "Communication", dimension: "Skills",
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
                id: "ME_TPD_15_Q1", pillar: "Team & People Development", dimension: "Skills",
                cluster: "Delegation & Performance Development", type: "behavioural",
                text: "When you observe how [Name] delegates responsibilities, sets performance expectations, monitors progress, and develops team members through feedback, which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They assign tasks and provide feedback when performance issues arise. Their delegation gives team members basic direction, though they may retain too much work themselves, provide insufficient guidance for growth, or avoid addressing performance issues promptly." },
                    { score: 3, text: "B. They delegate effectively with clear expectations and appropriate support, matching tasks to individual strengths and development needs. They monitor performance consistently, provide regular constructive feedback, and address performance issues promptly with structured improvement approaches." },
                    { score: 5, text: "C. They demonstrate sophisticated delegation and performance development. They delegate strategically to build capability and ownership, create comprehensive development frameworks, implement advanced coaching approaches, and build a performance culture where team members proactively seek feedback and take ownership of their own growth." }
                ]
            },
            {
                id: "ME_TPD_15_Q2", pillar: "Team & People Development", dimension: "Skills",
                cluster: "Delegation & Performance Development", type: "impact",
                text: "When you review how [Name]'s team members are developing and how performance is managed across the team, what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. Team members generally understand their responsibilities and performance meets basic expectations. Some team members may be underperforming without structured improvement plans, and development may be reactive rather than proactive." },
                    { score: 0, text: "B. Team members demonstrate steady capability growth and clear performance ownership. Feedback is received and acted upon, performance issues are addressed with appropriate structure, and team members show measurable improvement over time." },
                    { score: 1, text: "C. The team demonstrates exceptional performance ownership and development trajectory. A specific indicator: team members proactively manage their own development, performance conversations happen without requiring your prompting, or the team's capability growth rate has become a reference point for other teams." }
                ]
            },
            {
                id: "ME_TPD_15_Q3", pillar: "Team & People Development", dimension: "Skills",
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
                id: "ME_TPD_16_Q1", pillar: "Team & People Development", dimension: "Skills",
                cluster: "Recognition & Difficult Conversations", type: "behavioural",
                text: "When you observe how [Name] recognizes team accomplishments and handles difficult conversations with team members, which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They acknowledge significant achievements and address performance issues when they become necessary. Their recognition is generally positive though sometimes generic, and they may delay or avoid difficult conversations, particularly when topics are sensitive." },
                    { score: 3, text: "B. They provide consistent, personalized recognition that meaningfully acknowledges both individual and team contributions. They handle difficult conversations with appropriate structure and emotional balance, addressing sensitive topics directly while maintaining professional relationships." },
                    { score: 5, text: "C. They demonstrate exceptional recognition practices and masterful difficult conversation management. They find creative, personalized ways to celebrate achievements that build lasting engagement, and they navigate complex interpersonal conversations with sophistication — creating psychological safety that makes even the most challenging discussions productive." }
                ]
            },
            {
                id: "ME_TPD_16_Q2", pillar: "Team & People Development", dimension: "Skills",
                cluster: "Recognition & Difficult Conversations", type: "impact",
                text: "When you observe team engagement, how team members respond to recognition, and the outcomes of difficult conversations [Name] has managed, what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. Team members receive recognition and performance issues are eventually addressed. Engagement is reasonable, though recognition may not consistently feel meaningful, and some difficult conversations may leave unresolved tension or require your follow-up." },
                    { score: 0, text: "B. Team members demonstrate solid engagement and respond positively to recognition. Difficult conversations produce constructive outcomes, professional relationships are maintained through challenging discussions, and performance issues are resolved with appropriate follow-through." },
                    { score: 1, text: "C. The team demonstrates exceptional engagement and a culture where honest conversation is normal. A specific indicator: team members actively appreciate the recognition culture, difficult conversations have strengthened rather than damaged key relationships, or their approach to recognition and feedback has become a model that others reference." }
                ]
            },
            {
                id: "ME_TPD_16_Q3", pillar: "Team & People Development", dimension: "Skills",
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
                id: "ME_HTF_17_Q1", pillar: "How Do I Make My Team Feel?", dimension: "Influence",
                cluster: "Authentic Presence & Emotional Impact", type: "behavioural",
                text: "When you observe how [Name] shows up in interactions with their team — their authenticity, emotional awareness, ability to create genuine connection, and impact on the emotional climate — which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They are professionally present and manage emotions adequately in most situations. Their interactions with the team are generally positive, though they may miss emotional cues or create connections that feel transactional rather than genuinely supportive." },
                    { score: 3, text: "B. They create genuine connection with team members, demonstrating consistent emotional awareness and authentic engagement. They read emotional dynamics accurately, manage their own emotions effectively, and create a positive emotional climate that supports team performance and wellbeing." },
                    { score: 5, text: "C. They demonstrate exceptional authentic presence and emotional intelligence. They proactively create an environment of psychological safety where team members feel deeply valued, navigate complex emotional dynamics with sophistication, and inspire emotional intelligence in others in ways that transform team culture." }
                ]
            },
            {
                id: "ME_HTF_17_Q2", pillar: "How Do I Make My Team Feel?", dimension: "Influence",
                cluster: "Authentic Presence & Emotional Impact", type: "impact",
                text: "When you observe how team members engage with [Name] and the overall emotional climate of their team, what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. Team members work with [Name] professionally and the team maintains reasonable cohesion. The emotional climate is generally functional, though engagement may vary and some team members may not feel deeply connected or fully supported." },
                    { score: 0, text: "B. Team members demonstrate genuine engagement and visible comfort sharing perspectives and concerns. The team's emotional climate is positive and supportive, with people feeling appropriately valued and understood." },
                    { score: 1, text: "C. The team demonstrates exceptional engagement and psychological safety. A specific indicator: team members actively seek [Name]'s perspective and support, people share concerns and vulnerabilities openly, or the team's emotional culture has become visibly stronger — with measurable impact on collaboration and performance quality." }
                ]
            },
            {
                id: "ME_HTF_17_Q3", pillar: "How Do I Make My Team Feel?", dimension: "Influence",
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
                id: "ME_HTF_18_Q1", pillar: "How Do I Make My Team Feel?", dimension: "Influence",
                cluster: "Inclusion, Belonging & Trust", type: "behavioural",
                text: "When you observe how [Name] creates an environment where all team members feel valued, builds trust through consistent and transparent behavior, and ensures diverse voices contribute meaningfully, which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They treat team members fairly and are generally consistent in their commitments. They may miss opportunities to actively create belonging for all team members, and trust-building behaviors may be inconsistent, particularly under pressure." },
                    { score: 3, text: "B. They actively promote inclusion, ensuring diverse contributions are valued and recognized. They build trust consistently through transparent communication and reliable follow-through, creating an environment where team members feel secure sharing perspectives and taking appropriate risks." },
                    { score: 5, text: "C. They create a deeply inclusive culture and exceptional trust environment. They proactively address barriers to belonging, celebrate diversity in meaningful and specific ways, and build trust so effectively that team members feel confident raising concerns, challenging ideas, and taking risks that drive innovation." }
                ]
            },
            {
                id: "ME_HTF_18_Q2", pillar: "How Do I Make My Team Feel?", dimension: "Influence",
                cluster: "Inclusion, Belonging & Trust", type: "impact",
                text: "When you observe how team members from diverse backgrounds participate and how trust manifests in the team's behavior, what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. Team members participate and the team maintains reasonable trust. Some voices may be more prominent than others, and trust may be more transactional than deep — present enough to function but not strong enough to support significant vulnerability or risk-taking." },
                    { score: 0, text: "B. Team members from diverse backgrounds contribute actively, and the team demonstrates solid trust. People share genuine perspectives, commitments are honored consistently, and team members feel secure in their relationship with [Name]." },
                    { score: 1, text: "C. The team demonstrates exceptional inclusion and deep trust. A specific indicator: team members from all backgrounds contribute with equal confidence and visibility, people openly challenge ideas and raise concerns without hesitation, or the team's inclusive and trusting culture has been recognized and referenced by others in the organization." }
                ]
            },
            {
                id: "ME_HTF_18_Q3", pillar: "How Do I Make My Team Feel?", dimension: "Influence",
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
                id: "ME_HIA_19_Q1", pillar: "How Do I Induce Action?", dimension: "Influence",
                cluster: "Visionary Inspiration & Empowerment", type: "behavioural",
                text: "When you observe how [Name] communicates vision, connects individual work to larger purpose, and creates an environment where team members take ownership and drive results, which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They communicate organizational goals to their team and delegate tasks with basic direction. Team members understand their responsibilities, though the connection to broader purpose may not always be clear, and team members may rely on [Name] to drive progress rather than taking ownership." },
                    { score: 3, text: "B. They articulate a compelling vision that connects team work to organizational purpose. They delegate with clear outcomes in mind, trust their team to deliver, and create a culture where team members feel empowered to take initiative and own their results." },
                    { score: 5, text: "C. They inspire through vision that makes the team genuinely feel connected to something larger than their immediate work. They create an environment where empowerment leads to innovation, team members take full ownership of outcomes, and people proactively drive improvement without waiting to be asked." }
                ]
            },
            {
                id: "ME_HIA_19_Q2", pillar: "How Do I Induce Action?", dimension: "Influence",
                cluster: "Visionary Inspiration & Empowerment", type: "impact",
                text: "When you observe how [Name]'s team responds to direction and how independently team members drive their own work, what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. Team members understand their tasks and complete assigned work. Progress often requires [Name]'s active involvement to maintain momentum, and the team may not consistently demonstrate initiative beyond their defined responsibilities." },
                    { score: 0, text: "B. Team members demonstrate clear sense of purpose and take meaningful ownership of their work. They proactively address issues within their scope, make appropriate decisions independently, and show genuine engagement with the team's goals." },
                    { score: 1, text: "C. The team demonstrates exceptional ownership and initiative. A specific indicator: team members drive innovation and improvement without being prompted, they make strategic decisions within their scope with confidence, or the team's empowerment culture has become a visible differentiator in how they perform compared to other teams." }
                ]
            },
            {
                id: "ME_HIA_19_Q3", pillar: "How Do I Induce Action?", dimension: "Influence",
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
                id: "ME_HIA_20_Q1", pillar: "How Do I Induce Action?", dimension: "Influence",
                cluster: "Change Leadership & Strategic Influence", type: "behavioural",
                text: "When you observe how [Name] challenges the status quo, inspires others through organizational change, and creates lasting strategic impact through thoughtful influence, which description best fits what you typically see?",
                options: [
                    { score: 1, text: "A. They implement required changes and work within established influence channels. They may accept existing processes without actively questioning them and use direct or positional approaches to influence, rather than building the coalitions and strategic narratives needed for transformational impact." },
                    { score: 3, text: "B. They actively challenge existing processes to enhance effectiveness, lead change initiatives with momentum, and influence stakeholders through well-designed strategies. They build coalitions, navigate organizational dynamics skilfully, and create positive momentum for important initiatives." },
                    { score: 5, text: "C. They drive a culture of innovation and strategic influence at an organizational level. They challenge the status quo with compelling rationale, inspire others to lead change themselves, build transformative coalitions that mobilize broad support, and create lasting strategic impact that shapes how the organization thinks and operates." }
                ]
            },
            {
                id: "ME_HIA_20_Q2", pillar: "How Do I Induce Action?", dimension: "Influence",
                cluster: "Change Leadership & Strategic Influence", type: "impact",
                text: "When you review the organizational impact of [Name]'s change leadership and strategic influence efforts, what pattern do you typically see?",
                options: [
                    { score: -2, text: "A. Their change efforts are implemented and their influence achieves functional outcomes. Organizational change happens within their area, and influence efforts achieve results in straightforward situations, though complex organizational dynamics may limit broader impact." },
                    { score: 0, text: "B. Their change leadership creates meaningful organizational momentum. They successfully influence beyond their formal authority, gain broad stakeholder support for important initiatives, and their strategic influence consistently advances key priorities." },
                    { score: 1, text: "C. Their change leadership and strategic influence have created lasting organizational impact. A specific indicator: an initiative they championed has changed how the organization operates, they've influenced strategic decisions significantly beyond their formal scope, or their approach to change and influence has become a model that others in the organization reference and adopt." }
                ]
            },
            {
                id: "ME_HIA_20_Q3", pillar: "How Do I Induce Action?", dimension: "Influence",
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
