export const SUPPORTED_LOCALES = ["en", "bn"] as const;
export const SUPPORTED_EVENT_SLUGS = [
  "0400bce-0300bce-mahasthangarh-urban-emergence",
  "0600-0637-shashanka-gauda-kingdom",
  "0750-1170-pala-dynasty-foundation",
  "0800-1200-somapura-mahavihara",
  "1178-1204-sena-transition",
  "1204-bakhtiyar-khalji-s-conquest-of-nadia",
  "1352-bengal-sultanate-independence-and-unification",
  "1414-raja-ganesha-seizes-power-in-bengal",
  "1494-alauddin-husain-shah-begins-hussain-shahi-rule-in-bengal",
  "1576-battle-of-rajmahal",
  "1599-baro-bhuyans-resistance-in-bhati",
  "1612-mughal-conquest-phase-in-bengal-largely-completed",
  "1704-murshid-quli-khan-shifts-the-capital-to-murshidabad",
  "1757-battle-of-plassey",
  "1764-battle-of-buxar",
  "1765-east-india-company-gets-diwani-rights-in-bengal",
  "1760-1800-fakir-sannyasi-resistance",
  "1770-great-bengal-famine",
  "1793-permanent-settlement-in-bengal",
  "1818-faraizi-movement-begins-in-eastern-bengal",
  "1831-titumir-s-bamboo-fort-uprising",
  "1857-sipahi-revolt",
  "1874-assam-reorganization-and-sylhet-s-administrative-detachment",
  "1905-partition-of-bengal",
  "1906-all-india-muslim-league-founded-in-dhaka",
  "1911-annulment-of-bengal-partition",
  "1930-chittagong-armoury-raid",
  "1935-government-of-india-act-1935",
  "1937-bengal-provincial-election-and-coalition-ministry",
  "1940-lahore-resolution",
  "1946-direct-action-day-and-the-great-calcutta-killing",
  "1946-1947-tebhaga-movement",
  "1946-noakhali-riots",
  "1943-bengal-famine",
  "1947-partition-and-eastern-bengal",
  "1948-language-question-becomes-a-mass-political-issue",
  "1949-founding-of-awami-muslim-league",
  "1952-language-movement",
  "1954-united-front-election-victory-in-east-bengal",
  "1956-pakistan-constitution-east-pakistan-representation",
  "1958-martial-law-in-pakistan",
  "1962-education-movement-in-east-pakistan",
  "1964-communal-riots-east-pakistan",
  "1965-indo-pak-war-east-pakistan-insecurity",
  "1966-six-point-programme-announced",
  "1968-agartala-conspiracy-case",
  "1969-mass-uprising",
  "1970-bhola-cyclone-and-the-1970-election",
  "1971-liberation-war",
  "1971-operation-searchlight-crackdown",
  "1972-state-formation-and-the-1972-constitution",
  "1974-famine-emergency-and-state-crisis",
  "1975-august-15-assassination-of-sheikh-mujib",
  "1975-baksal-formation-and-collapse",
  "1976-farakka-long-march",
  "1976-1997-shanti-bahini-insurgency",
  "1982-ershad-s-coup-and-the-return-of-military-rule",
  "1990-mass-uprising",
  "2006-caretaker-crisis-and-emergency-rule",
  "2007-2008-emergency-caretaker-rule",
  "2009-bdr-mutiny-pilkhana-massacre",
  "2001-padua-pyrdiwah-boraibari-border-clash",
  "1997-chittagong-hill-tracts-peace-accord",
  "2013-rana-plaza-collapse",
  "2013-shahbag-movement",
  "2014-10th-parliamentary-election",
  "2017-rohingya-mass-influx-into-bangladesh",
  "2018-a-year-of-protest-control-and-contested-legitimacy",
  "2018-quota-reform",
  "2018-safe-road",
  "2018-digital-security-act",
  "2018-election",
  "2023-cyber-security-act-replacing-dsa",
  "2024-anti-discrimination-movement",
  "2026-election",
  "1538-humayun-enters-bengal-and-occupies-gaur",
  "1539-battle-of-chausa",
  "1610-capital-shift-to-dhaka-jahangirnagar",
  "1666-mughal-conquest-of-chittagong",
  "1717-murshid-quli-khan-formally-appointed-nawab",
  "1303-conquest-of-sylhet",
  "1632-mughal-attack-on-portuguese-hooghly",
  "1740-alivardi-khan-becomes-nawab",
  "1741-1751-maratha-raids-bengal",
  "1919-1924-khilafat-movement-bengal",
  "1920s-1930s",

  "0700-0750-matsyanyaya-before-pala-rise",
  "1095-1205-sena-rise-and-lakshman-sen-court-culture",
  "1338-1352-pre-ilyas-shah-regional-bengal-sultanates",
  "1353-1359-ilyas-shah-delhi-sultanate-conflict",
  "1415-1433-raja-ganesha-jalaluddin-muhammad-shah-transition",
  "1519-1533-nusrat-shah-reign",
  "1664-1688-shaista-khan-governorship",
  "1690-english-settlement-calcutta",
  "1756-siraj-ud-daulah-captures-calcutta",
  "1859-1860-indigo-revolt",
  "1921-dhaka-university-establishment",
  "1923-bengal-pact",
  "1947-united-bengal-proposal",
  "1947-sylhet-referendum",
  "1971-march-7-speech",
  "1971-mujibnagar-government",
  "1975-jail-killing",
  "1991-return-to-parliamentary-democracy",
  "0000-0450-gangaridai-and-early-delta-polities",
  "1230s-1280s-bengal-under-delhi-governorates-fragmentation",
  "1658-1707-aurangzeb-era-revenue-military-pressure-in-bengal",
  "1727-1739-suja-ud-din-muhammad-khan-administrative-phase",
  "1756-black-hole-calcutta-incident-and-imperial-propaganda-debate",
  "1781-rangpur-dhing-uprising",
  "1828-brahmo-samaj-and-bengal-social-reform",
  "1835-macaulay-education-policy-impact-in-bengal",
  "1861-indian-councils-act-and-limited-representation-in-bengal",
  "1876-indian-association-calcutta-political-mobilization",
  "1885-indian-national-congress-foundation-and-bengal-response",
  "1909-minto-morley-reforms-and-separate-electorates-in-bengal",
  "1916-lucknow-pact-bengal-implications",
  "1942-quit-india-and-bengal-war-governance",
  "1947-radcliffe-award-border-demarcation-implementation",
  "1963-hazratbal-crisis-and-east-pakistan-communal-tensions",
  "1967-naxalbari-uprising-and-bengal-left-radicalization",
  "1971-december-14-intellectual-killings",
  "1971-december-16-instrument-of-surrender",
  "1973-first-parliamentary-election-bangladesh",
  "1974-special-powers-act",
  "1975-november-7-sepoy-janata-uprising",
  "1988-eighth-amendment-state-religion",
  "1996-ganges-water-sharing-treaty",
  "2012-ramu-communal-violence",
  "2016-holey-artisan-attack",
] as const;
export const SUPPORTED_FIGURE_IDS = [
  "sheikh-mujibur-rahman",
  "syed-nazrul-islam",
  "tajuddin-ahmad",
  "mansur-ali",
  "ahm-qamaruzzaman",
  "mag-osmani",
  "ziaur-rahman",
  "khaled-mosharraf",
  "km-shafiullah",
  "asm-abdur-rab",
  "abu-taher",
  "m-hamidullah-khan",
  "cr-dutta",
  "mir-shawkat-ali",
  "mk-bashar",
  "nazmul-huq",
  "kazi-nuruzzaman",
  "ruhul-amin",
  "mostafa-kamal",
  "mohiuddin-jahangir",
  "munshi-abdur-rouf",
  "matiur-rahman",
  "hamidur-rahman",
  "noor-mohammad-sheikh",
  "munir-ahmed",
  "abu-osman-chowdhury",
  "major-ma-manzur",
  "shafi-imam-rumi",
  "badiul-alam",
  "shaheed-azad",
  "jahangir-alam",
  "mofazzal-hossain-chowdhury-maya",
  "abdul-halim-chowdhury",
  "govinda-chandra-dev",
  "atm-haider",
  "shamsul-alam",
  "major-jalil",
  "major-rafiqul-islam",
  "major-zafar-imam",
  "abdul-jabbar",
  "shahnaz-rahmatullah",
  "swadhin-bangla-betar-artists",
  "munier-chowdhury",
  "fazle-rabbi",
  "alim-chowdhury",
  "anwar-pasha",
  "hafizuddin-ahmed",
  "kader-siddique",
  "abu-sayeed-chowdhury",
  "kamruzzaman-tuku",
  "abdul-mannan",
  "shamsuzzoha",
  "kamal-lohani",
  "kamal-hossain",
  "yahya-khan",
  "key-figure-1",
  "key-figure-2",
  "ikhtiyar-al-din-muhammad-bakhtiyar-khalji",
  "shamsuddin-ilyas-shah",
  "murshid-quli-khan",
  "charles-cornwallis",
  "nahid-islam",
  "sharif-osman-hadi",
  "asif-mahmud",
  "sarjis-alam",
  "hasnat-abdullah",
  "abu-baker-majumder",
  "abdul-hannan-masud",
  "umama-fatema",
  "arif-sohel",
  "mahin-sarkar",
  "rifat-rashid",
  "nusrat-tabassum",
  "lutfun-nahar-luma",
  "hasib-al-islam",
  "nasiruddin-patwary",
  "akhter-hossen",
  "tariqul-islam",
  "mehedi-hasan",
  "sinthia-jaheen-ayesha",
  "rashidul-islam-rifat",
  "md-enamul-hasan",
  "abdullah-al-amin",
  "shadik-kayem",
  "tahmid-al-mudabbir",
  "barkat-hossain",
  "zaber-ahmed",
  "abu-sayed-2024",
  "mir-mahfuzur-rahman-mugdho",
  "farhan-faiyaaz",
  "wasim-akram-2024",
  "faisal-ahmed-shanto",
  "yamin-mist",
  "riya-gope",
  "shaheed-rudro",
  "tahmid-abdullah",
  "zahid-hossain",
  "muhammad-yunus",
  "tarique-rahman",
  "mirza-fakhrul-islam-alamgir",
  "salahuddin-ahmed",
  "shafiqur-rahman",
  "syed-abdullah-mohammad-taher",
  "manzur-al-matin",
  "asif-nazrul",
  "pinaki-bhattacharya",
  "zafar-sobhan",
  "shahidul-alam",
  "syeda-rizwana-hasan",
  "adilur-rahman-khan",
  "farhad-mazhar",
  "anu-muhammad",
  "tasneem-khalil",
  "zulkarnain-saer",
  "fahim-ahmed",
  "saima-ahmed",
  "unknown-protester",
  "badiul-alam-majumdar",
  "zonayed-saki",
  "andaleeve-rahman-partho",
  "asaduzzaman-fuaad",
  "rumeen-farhana",
  "fazlur-rahman",
  "amm-nasir-uddin",
  "akhtar-ahmed",
  "mahdi-amin",
  "junayed-al-habib",
  "ak-fazlul-huq",
  "huseyn-shaheed-suhrawardy",
  "khwaja-nazimuddin",
  "muhammad-ali-jinnah",
  "all-india-muslim-league",
  "indian-national-congress",
  "krishak-praja-party",
  "jatiya-party",
  "ab-party",
  "national-citizen-party",
  "jamiat-e-ulema-e-islam-bangladesh",
  "zulfikar-ali-bhutto",
  "abul-hashim",
  "sarat-chandra-bose",
  "kiran-shankar-roy",
  "satya-ranjan-bakshi",
  "jogendranath-mandal",
  "lord-curzon",
  "khan-jahan-ali",
  "lalon-shah",
  "zainul-abedin",
  "satyajit-ray",
  "jibanananda-das",
  "khudiram-bose",
  "matangini-hazra",
  "charu-majumdar",
  "maulana-abul-kalam-azad",
  "syed-ahmad-khan",
  "shah-waliullah-dehlawi",
  "ashraf-ali-thanwi",
  "rabindranath-tagore",
  "surendranath-banerjea",
  "nawab-salimullah",
  "cyril-radcliffe",
  "lord-louis-mountbatten",
  "jawaharlal-nehru",
  "vallabhbhai-patel",
  "mahatma-gandhi",
  "liaquat-ali-khan",
  "syama-prasad-mukherjee",
  "bidhan-chandra-roy",
  "prafulla-chandra-ghosh",
  "nurul-amin",
  "tamizuddin-khan",
  "dhirendranath-datta",
  "abdul-hamid-khan-bhashani",
  "shamsul-huq",
  "oli-ahad",
  "abdul-matin",
  "kazi-golam-mahbub",
  "abdul-malek-ukil",
  "mohammad-toaha",
  "muhammad-shahidullah",
  "sufia-kamal",
  "gaziul-huq",
  "abul-mansur-ahmad",
  "ataur-rahman-khan",
  "abul-kasem",
  "kazi-motahar-hossain",
  "ila-mitra",
  "maulana-akram-khan",
  "manik-mia",
  "abdur-rashid-tarkabagish",
  "khwaja-shahabuddin",
  "humayun-kabir",
  "muzaffar-ahmad",
  "somnath-lahiri",
  "jasimuddin",
  "abdul-karim-sahitya-bisharad",
  "abu-saleh-mohammad-akram",
  "bijan-kumar-mukherjea",
  "sa-rahman",
  "cc-biswas",
  "abul-barkat-1952",
  "rafiq-uddin-ahmed-1952",
  "abdus-salam-1952",
  "abdul-jabbar-1952",
  "shafiur-rahman-1952",
  "ohiullah-1952",
  "mahbub-ul-alam-chowdhury",
  "abdul-gaffar-choudhury",
  "altaf-mahmud",
  "hamidur-rahman-artist",
  "novera-ahmed",
  "abul-kalam-shamsuddin",
  "ahmed-rafiq",
  "ahmed-rajib-haider",
  "abdul-wahed-language",
  "amanul-huq",
  "imran-h-sarkar",
  "lucky-akter",
  "nasiruddin-yousuff",
  "muhammed-zafar-iqbal",
  "asif-mohiuddin",
  "arif-jebtik",
  "avijit-roy",
  "washiqur-rahman",
  "ananta-bijoy-das",
  "niloy-neel",
  "faisal-arefin-dipan",
  "shah-ahmad-shafi",
  "junaid-babunagari",
  "mahmudur-rahman",
  "abdul-quader-mollah",
  "delwar-hossain-sayeedi",
  "motiur-rahman-nizami",
  "ali-ahsan-mohammad-mujaheed",
  "golam-azam",
  "alauddin-al-azad",
  "shahid-saber",
  "tamaddun-majlish",
  "all-party-state-language-action-committee",
  "dhaka-university-students",
  "dhaka-medical-college-students",
  "east-pakistan-muslim-chhatra-league",
  "chittagong-rashtrabhasha-sangram-parishad",
  "sheikh-hasina",
  "khaleda-zia",
  "justice-shahabuddin-ahmed",
  "nur-hossain",
  "ivy-rahman",
  "mufti-hannan",
  "bangla-bhai",
  "moudud-ahmed",
  "rashed-khan-menon",
  "mujahidul-islam-selim",
  "hasanul-haq-inu",
  "shakil-ahmed-bdr",
  "moeen-u-ahmed",
  "sahara-khatun",
  "mainul-islam-bdr",
  "gulzar-uddin-ahmed",
  "mohammad-shamsul-alam-bir-pratik",
  "sheikh-fazle-noor-taposh",
  "tarique-ahmed-siddique",
  "sheikh-fazlul-karim-selim",
  "jahangir-kabir-nanak",
  "mirza-azam",
  "afm-bahauddin-nasim",
  "molla-fazle-akbar",
  "hasan-mahmud-khandaker",
  "abdul-kahar-akond",
  "nur-mohammad-igp",
  "monirul-islam-police",
  "alm-fazlur-rahman",
  "mohammad-jahangir-kabir-talukdar",
  "tofail-ahmed",
  "amir-hossain-amu",
  "suranjit-sengupta",
  "shah-moazzem-hossain",
  "abdus-samad-azad",
  "hussain-muhammad-ershad",
  "abdus-sattar",
  "jahanara-imam",
  "awami-league",
  "bangladesh-nationalist-party",
  "communist-party-of-bangladesh",
  "jatiya-samajtantrik-dal",
  "workers-party-of-bangladesh",
  "jamaat-e-islami-bangladesh",
  "pakistan-peoples-party",
  "eight-party-alliance",
  "seven-party-alliance",
  "five-party-alliance",
  "sarbadaliya-chhatra-oikya-parishad",
  "student-unity-twenty-two-organisations",
  "dhaka-university-students-1990",
  "jahangirnagar-university-students-1990",
  "rajshahi-university-students-1990",
  "chittagong-university-students-1990",
  "medical-students-1990",
  "teachers-collective-1990",
  "lawyers-collective-1990",
  "doctors-collective-1990",
  "journalists-collective-1990",
  "cultural-workers-collective-1990",
  "engineers-and-architects-collective-1990",
  "writers-and-intellectuals-collective-1990",
  "women-activists-1990",
  "workers-collective-1990",
  "urban-protesters-1990",
  "district-protesters-1990",
  "human-rights-activists-1990",
  "press-photographers-1990",
  "street-procession-organisers-1990",
  "hartal-and-blockade-organisers-1990",
  "professional-associations-1990",
  "caretaker-transition-supporters-1990",
  "families-of-martyrs-1990",
  "siraj-ud-daulah",
  "robert-clive",
  "mir-jafar",
  "miran",
  "rai-durlabh-ram",
  "yar-latif-khan",
  "mohanlal",
  "mir-madan",
  "khwaja-abdul-hadi-khan",
  "naba-singh-hazari",
  "jagat-seth",
  "umichand",
  "william-watts",
  "luke-scrafton",
  "charles-watson",
  "eyre-coote",
  "ghaset-begum",
  "alivardi-khan",
  "khwaja-wajid",
  "khwaja-petruse",
  "mangal-pandey",
  "bahadur-shah-ii",
  "bakht-khan",
  "mirza-mughal",
  "mirza-khizr-sultan",
  "mirza-abu-bakr",
  "nana-sahib",
  "tantia-tope",
  "azimullah-khan",
  "rani-lakshmibai",
  "rao-saheb-peshwa",
  "ali-bahadur-ii",
  "begum-hazrat-mahal",
  "birjis-qadr",
  "maulvi-ahmadullah-shah",
  "maulvi-liaquat-ali",
  "kunwar-singh",
  "amar-singh-jagdishpur",
  "khan-bahadur-khan-rohilla",
  "walidad-khan",
  "rao-tula-ram",
  "shah-mal",
  "kadam-singh",
  "dhan-singh-gurjar",
  "beni-madho-singh",
  "narpat-singh",
  "rani-avantibai-lodhi",
  "jhalkari-bai",
  "uda-devi-pasi",
  "firoz-shah-1857",
  "surendra-sai",
  "veer-narayan-singh",
  "bakht-bali",
  "gulab-singh-lodhi",
  "ghulam-ghaus-khan-1857",
  "rani-ishwari-kumari",
  "teeka-singh-sepoy",
  "ahmad-khan-kharal",
  "ranmat-singh",
  "raja-nahar-singh",
  "kazi-nazrul-islam",
  "subhas-chandra-bose",
  "begum-rokeya",
  "surya-sen",
  "pritilata-waddedar",
  "ishwar-chandra-vidyasagar",
  "bankim-chandra-chattopadhyay",
  "michael-madhusudan-dutt",
  "titu-mir",
  "raja-rammohun-roy",
  "haji-shariatullah",
  "dudu-miyan",
  "nawab-abdul-latif",
  "syed-ameer-ali",
  "munshi-mohammad-meherullah",
  "ahmad-sofa",
  "nawab-abdul-ghani",
  "khan-bahadur-ahsanullah",
  "abu-jafar-shamsuddin",
  "abul-kalam-azad",
  "isa-khan",
  "musa-khan",
  "akbar",
  "man-singh-i",
  "islam-khan-chishti",
  "daud-khan-karrani",
  "humayun-mughal",
  "sher-shah-suri",
  "jahangir-mughal",
  "shaista-khan",
  "farrukhsiyar",
  "shah-jalal",
  "sikandar-khan-ghazi",
  "mohammad-ali-jauhar",
  "shaukat-ali",
  "dharmapala",
  "devapala",
  "gopala-i",
  "mahipala-i",
  "vijaya-sena",
  "ballala-sena",
  "lakshmana-sena",
  "raja-ganesh",
  "jalaluddin-muhammad-shah",
  "kedar-rai",
  "chand-rai",
  "pratapaditya",
  "mukunda-ray-of-bhusna",
  "raja-sitaram-ray",
  "krishnachandra-ray-of-nadia",
  "alauddin-husain-shah",
  "nusrat-shah",

  "atisha-dipankara-srijnana",
  "harshavardhana",
  "bhaskaravarman",
  "fakhruddin-mubarak-shah",
  "sikandar-shah",
  "ghiyasuddin-azam-shah",
  "rukunuddin-barbak-shah",
  "saifuddin-firuz-shah",
  "paragal-khan",
  "shah-muhammad-sagir",
  "syed-sultan",
  "alaol",
  "sulaiman-khan-karrani",
  "munim-khan",
  "todar-mal",
  "khwaja-usman",
  "job-charnock",
  "mir-qasim",
  "shah-alam-ii",
  "warren-hastings",
  "dinabandhu-mitra",
  "harish-chandra-mukherjee",
  "cr-das",
  "kazi-abdul-wadud",
  "abul-hussain",
  "indira-gandhi",
  "sam-manekshaw",
  "aak-niazi",
  "khandaker-mushtaq-ahmed",
  "manabendra-narayan-larma",
  "abdul-jalil",
  "abdur-rab-serniabat",
  "abdur-razzaq-politician",
  "abul-khair-language",
  "anwar-hossain-manju",
  "ayub-khan",
  "binod-bihari-chowdhury",
  "dinesh-chandra-sen",
  "fakhruddin-ahmed",
  "ghyasuddin-ahmed",
  "humayun-azad",
  "iajuddin-ahmed",
  "jadunath-sarkar",
  "jagadish-chandra-bose",
  "jatin-das",
  "k-m-obaidur-rahman",
  "kalpana-datta",
  "kazi-arif-ahmed",
  "khwaja-salimullah",
  "matia-chowdhury",
  "meghnad-saha",
  "mofazzal-haider-chaudhury",
  "moin-u-ahmed",
  "muhammad-kamaruzzaman",
  "mujibul-haque-chunnu",
  "nawab-ali-chowdhury",
  "nihar-ranjan-ray",
  "nizamul-huq-judge",
  "prafulla-chandra-ray",
  "preetilata-waddedar",
  "r-c-majumdar",
  "rafiq-uddin-ahmed",
  "rokeya-kabir",
  "salahuddin-quader-chowdhury",
  "selina-hossain",
  "selina-parvin",
  "shafiur-rahman",
  "shah-ams-kibria",
  "shah-azizur-rahman",
  "shahidullah-kaiser",
  "shamsur-rahman",
  "sheikh-fazlul-haque-moni",
  "siraj-sikder",
  "suniti-kumar-chatterji",
  "syed-amir-ali",
  "syed-shamsul-haq",
  "tikka-khan",
  "zahir-raihan",
  "zohra-tajuddin",
] as const;
export const SUPPORTED_BOOK_IDS = [
  "research-volume",
  "archive-collection",
] as const;
export const SUPPORTED_PERIOD_IDS = [
  "ancient-and-pre-sultanate-bengal",
  "transition-to-sultanate-formation",
  "independent-bengal-sultanate-era",
  "mughal-incorporation-and-consolidation",
  "colonial-rule-and-resistance",
  "partition-and-late-colonial-politics",
  "pakistan-period-and-national-awakening",
  "post-liberation-state-and-democracy",
  "contemporary-memory-and-civic-protest",
] as const;
export const SUPPORTED_MOVEMENT_IDS = [
  "colonial-capture-and-resistance",
  "partition-and-political-representation",
  "language-autonomy-and-liberation",
  "state-power-and-democratic-transition",
  "memory-justice-and-civic-dissent",
] as const;
export const SUPPORTED_PLACE_IDS = [
  "bengal-region",
  "bangladesh",
  "east-bengal",
  "east-pakistan",
  "west-bengal",
  "mahasthangarh",
  "somapura-mahavihara",
  "gaur-lakhnauti",
  "nadia-nabadwip",
  "sonargaon",
  "sylhet",
  "dhaka-jahangirnagar",
  "murshidabad",
  "chittagong-chattogram",
  "rajmahal",
  "hooghly",
  "calcutta-kolkata",
  "palashi-plassey",
  "buxar",
  "faridpur",
  "barasat-narkelberia",
  "noakhali",
  "dhaka-university",
  "dhaka-medical-college",
  "central-shaheed-minar",
  "racecourse-suhrawardy-udyan",
  "mujibnagar",
  "farakka",
  "shahbag-dhaka",
  "pilkhana-dhaka",
  "chittagong-hill-tracts",
  "satgaon",
  "gauda-rajmahal-corridor",
  "bhati-region",
  "paharpur",
  "rangpur",
  "savar-rana-plaza",
  "bhola",
  "ramu",
  "naxalbari",
  "agartala",
  "padua-pyrdiwah-boraibari",
  "hazratbal-srinagar",
  "lahore",
  "delhi",
  "krishnanagar",
  "barisal-bakerganj",
  "comilla-tripura-frontier",
  "jessore-khulna-corridor",
  "bihar-borderland",
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];
export type EventSlug = (typeof SUPPORTED_EVENT_SLUGS)[number];
export type FigureId = (typeof SUPPORTED_FIGURE_IDS)[number];
export type BookId = (typeof SUPPORTED_BOOK_IDS)[number];
export type PeriodId = (typeof SUPPORTED_PERIOD_IDS)[number];
export type MovementId = (typeof SUPPORTED_MOVEMENT_IDS)[number];
export type PlaceId = (typeof SUPPORTED_PLACE_IDS)[number];
export type ResourceId = string;
export type EventImportance =
  | "landmark"
  | "major"
  | "high"
  | "medium"
  | "reference";
export type EventRelationType =
  | "cause"
  | "effect"
  | "background"
  | "parallel"
  | "legacy"
  | "contrast";
export type EventRelation = {
  eventId: EventSlug;
  relationType: EventRelationType;
};

export type FaqItem = {
  question: string;
  answer: string;
  sourceIds?: string[];
};

export type EventMisconception = {
  title: string;
  explanation: string;
  sourceIds?: string[];
};

export type EventMapPointRole =
  | "battlefield"
  | "capital"
  | "route"
  | "birthplace"
  | "deathplace"
  | "treaty-place"
  | "movement-center"
  | "administrative-center"
  | "other";

export type EventMapPoint = {
  placeId: string;
  label: string;
  lat?: number;
  lon?: number;
  role?: EventMapPointRole;
  year?: string;
  note?: string;
};

export type LearningPathItem = {
  type: "event" | "figure" | "resource" | "place" | "period" | "topic";
  id: string;
  reason?: string;
};

export type EventClaimSection =
  | "summary"
  | "whyItMatters"
  | "longTermLegacy"
  | "culturalImpact"
  | "identityMemoryNotes";

export type EventClaimCitation = {
  id: string;
  section: EventClaimSection;
  claim: string;
  sourceIds: string[];
  evidenceLevel: EvidenceLevel;
};

export type EventMeta = {
  slug: EventSlug;
  year: string;
  title: string;
  subtitle: string;
  seoTitle?: string;
  seoDescription?: string;
  quickAnswer?: string;
  summary: string;
  summarySourceIds?: string[];
  summaryEvidenceLevel?: EvidenceLevel;
  themeColor: string;
  ctaLabel: string;
  heroTagline: string;
  whyItMatters: string;
  causes?: string[];
  consequences?: string[];
  misconceptions?: EventMisconception[];
  faq?: FaqItem[];
  mapPoints?: EventMapPoint[];
  whyItMattersSourceIds?: string[];
  whyItMattersEvidenceLevel?: EvidenceLevel;
  longTermLegacy?: string;
  longTermLegacySourceIds?: string[];
  longTermLegacyEvidenceLevel?: EvidenceLevel;
  culturalImpact?: string;
  culturalImpactSourceIds?: string[];
  culturalImpactEvidenceLevel?: EvidenceLevel;
  identityMemoryNotes?: string;
  identityMemorySourceIds?: string[];
  identityMemoryEvidenceLevel?: EvidenceLevel;
  contested?: boolean;
  historicalDebate?: string;
  historicalDebateSourceIds?: string[];
  historicalDebateEvidenceLevel?: EvidenceLevel;
  claimCitations?: EventClaimCitation[];
  importance: EventImportance;
  parentEvent?: EventSlug;
  childEventIds?: EventSlug[];
  relatedEvents?: EventRelation[];
  relatedEventIds?: EventSlug[];
  periodId?: PeriodId;
  periodLabel?: string;
  movementId?: MovementId;
  movementLabel?: string;
  placeId?: PlaceId;
  placeLabel?: string;
  sensitive?: boolean;
  contentWarnings?: string[];
  requiresSources?: boolean;
  showOnLanding?: boolean;
};

export type TimelineType =
  | "judicial_event"
  | "protest_start"
  | "movement_escalation"
  | "nationwide_movement"
  | "violence"
  | "state_crackdown"
  | "peak_conflict"
  | "policy_change"
  | "policy_implementation"
  | "movement_shift"
  | "political_crisis";

export type TimelineItem = {
  year: string;
  title: string;
  detail: string;
  sourceIds?: string[];
  evidenceLevel?: EvidenceLevel;
  themes?: TimelineTheme[];
  type?: TimelineType;
  href?: string;
  ctaLabel?: string;
  phaseLabel?: string;
  themeColor?: string;
  emphasis?: "normal" | "peak";
};

export type Figure = {
  id: FigureId;
  name: string;
  name_en?: string;
  seoTitle?: string;
  seoDescription?: string;
  shortAnswer?: string;
  birthYear?: string;
  deathYear?: string;
  activePeriod?: string;
  role: string;
  group: "leader" | "coordinator" | "martyr" | "organization" | "collective";
  contribution: string;
  context: string;
  impact: string;
  highlight?: string;
  tags?: string[];
  primaryEventIds?: EventSlug[];
  relatedPlaceIds?: PlaceId[];
  alternateNames?: string[];
  searchAliases?: string[];
  faq?: FaqItem[];
  image?: string;
};

export type PeriodMeta = {
  id: PeriodId;
  title: string;
  subtitle: string;
  description: string;
  startYear: string;
  endYear: string;
  themeColor: string;
  icon?: string;
};

export type Period = {
  id: PeriodId;
  title: string;
  subtitle: string;
  description: string;
  startYear: string;
  endYear: string;
  themeColor: string;
  icon?: string;
};

export type MovementMeta = {
  id: MovementId;
  title: string;
  subtitle: string;
  description: string;
  themeColor: string;
  icon?: string;
};

export type Movement = {
  id: MovementId;
  title: string;
  subtitle: string;
  description: string;
  themeColor: string;
  icon?: string;
};

export type PlaceType =
  | "region"
  | "city"
  | "capital"
  | "district"
  | "division"
  | "river"
  | "port"
  | "battlefield"
  | "religious-site"
  | "educational-site"
  | "archaeological-site"
  | "frontier"
  | "route"
  | "other";

export type CoordinateConfidence =
  | "exact"
  | "approximate"
  | "representative"
  | "unknown";

export type NameHistoryEntry = {
  name: string;
  language?: "bn" | "en" | "fa" | "ar" | "sa" | "pt" | "other";
  fromYear?: string;
  toYear?: string;
  period?: string;
  note?: string;
  sourceIds?: string[];
};

export type AdministrativeHistoryEntry = {
  label: string;
  fromYear?: string;
  toYear?: string;
  authority?: string;
  modernEquivalent?: string;
  note?: string;
  sourceIds?: string[];
};

export type PlaceMeta = {
  id: PlaceId;
  title: string;
  subtitle: string;
  description: string;
  placeType: PlaceType;
  regionType?: "region" | "city" | "district" | "site"; // deprecated, use placeType
  themeColor: string;
  lat?: number;
  lon?: number;
  coordinateConfidence?: CoordinateConfidence;
  modernCountry?: string;
  modernAdministrativeUnit?: string;
  historicalNames?: string[];
  nameHistory?: NameHistoryEntry[];
  administrativeHistory?: AdministrativeHistoryEntry[];
  relatedEventIds?: EventSlug[];
  relatedFigureIds?: FigureId[];
  relatedTopicIds?: string[];
  relatedPeriodIds?: PeriodId[];
  mapNote?: string;
  seoTitle?: string;
  seoDescription?: string;
  faq?: FaqItem[];
  sourceIds?: string[];
};

export type Place = PlaceMeta;

export type TopicMeta = {
  slug: string;
  priority?: number;
  title: string;
  tagline: string;
  seoTitle?: string;
  seoDescription?: string;
  beginnerSummary?: string;
  advancedSummary?: string;
  intro: string;
  description: string;
  eventSlugs: EventSlug[];
  figureIds?: FigureId[];
  resourceIds?: ResourceId[];
  keywords?: string[];
  primaryKeywords?: string[];
  secondaryKeywords?: string[];
  faq?: FaqItem[];
  learningPath?: LearningPathItem[];
};

export type Topic = TopicMeta;

export type Book = {
  id: BookId;
  title: string;
  author: string;
  authors: string[];
  type: "book" | "article" | "archive";
  note: string;
};

export type ResourceCategory =
  | "primary-sources"
  | "academic-books"
  | "reference-sources"
  | "research-articles-and-papers"
  | "memoirs-and-eyewitness-accounts"
  | "maps-and-visual-sources"
  | "documentary-and-video"
  | "cultural-and-literary-resources"
  | "news-and-contemporary-reports"
  | "further-reading";
export type SourceQuality = "primary" | "secondary" | "archive" | "editorial";
export type ResourceSourceQuality =
  | "primary"
  | "secondary"
  | "archive"
  | "academic"
  | "editorial"
  | "reference"
  | "unknown";
export type EvidenceLevel = "high" | "medium" | "low";
export type TimelineTheme =
  | "language"
  | "democracy"
  | "war"
  | "culture"
  | "economy";

export type EventResource = {
  id: ResourceId;
  title: string;
  attribution: string;
  creatorId: string;
  creatorType?: "person" | "organization";
  note: string;
  quality: SourceQuality;
  sourceQuality?: ResourceSourceQuality;
  evidenceLevel?: EvidenceLevel;
  category: ResourceCategory;
  subcategory: string;
  href?: string;
  relatedEventIds?: EventSlug[];
  relatedFigureIds?: FigureId[];
  relatedTopicIds?: string[];
  whyItMatters?: string;
};

export type Creator = {
  id: string;
  name: string;
  type: "person" | "organization";
};

export type Quote = {
  text: string;
  source: string;
};

export type EventContent = {
  meta: EventMeta;
  timeline: TimelineItem[];
  figures: Figure[];
  resources: EventResource[];
  quotes: Quote[];
};

export type HomeContent = {
  title: string;
  tagline: string;
  intro: string;
  timelineHeading: string;
  timelineSubheading: string;
  whyJourneyMattersHeading: string;
  whyJourneyMattersBody: string;
};

export type GlossaryTerm = {
  id: string;
  term: string;
  definition: string;
  explanation: string;
  relatedTerms?: string[];
};
