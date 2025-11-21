--
-- PostgreSQL database dump
--

\restrict jPemlCZAAIUnhJ6FX8MbulaXKJdvYlqG7D7lJPdJ554Keaen06OtaxDvGG9MHNu

-- Dumped from database version 16.11 (Debian 16.11-1.pgdg13+1)
-- Dumped by pg_dump version 16.11 (Debian 16.11-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: examples; Type: TABLE DATA; Schema: elp; Owner: admin
--

COPY elp.examples (id, word, part_of_speech, example, user_id) FROM stdin;
202511090027212451	is	verb	This is a dog	202511052219372973
202511110743217643	source	noun	Find the source of that document for me right now!	202511052219372973
202509180155204429	hello	noun	Hello is a way to greeting each other.	ADMIN
202509190212399253	garbled	adjective	The messages are grabled	ADMIN
202509190330414904	murky	adjective	The sky was murky	ADMIN
202509182221155032	electroreception	noun	Electroreception is defined as ability detect weak electric fields of creatures	ADMIN
202509191909300668	perceive	verb	The human eye can perceive a wide range of colors	ADMIN
202509200657242245	stimuli	noun	The stimuli was created to save peoples	ADMIN
202509200702421706	amphibious	adjective	Hippos is a amphibious mamals...	ADMIN
202509200133307446	electroreceptors	noun	Some aquatic animals have electroreceptors to detect electric fields around them.	ADMIN
202509200821333563	faculties	noun	Even though she is 102 years old, she still has all of her faculties	ADMIN
202509201550567034	hapless	adjective	She is a hapless person, she got into troubles so easily.	ADMIN
202509201609272083	novices	noun	This is a book for novices	ADMIN
202509201612450639	cluttering	noun	Cluttering is a communication disorder when a person speaks too fast, unclearly, irregularly.	ADMIN
202509201617049333	embryos	noun	Until then, it is remains unclear whether embryo freezing is a safe procedure	ADMIN
202509201619075042	vicinity	noun	The vicinity is the area around a place	ADMIN
202509201750268767	electroreceptive	adjective	Shanks are highly electroreceptive, allow them to detect the electric fields of prey	ADMIN
202509201753345114	keen	adjective	She is keen to learning English (Cô ấy thích học tiếng anh / keen to do something)\nShe is keen to English (Cô ấy thích tiếng anh / keen on something)	ADMIN
202509201801329922	olfactory	adjective	Dogs have a highly developed olfactory system.	ADMIN
202509201802586822	proximity	noun	The house is in close proximity to the school	ADMIN
202509201807195327	recede	verb	Shanks eyes can recede for protection	ADMIN
202509201809164013	assessing	verb	The teacher is assessing his students progress	ADMIN
202509201811532040	sinewy	adjective	He is a sinewy man	ADMIN
202509201815396561	plumper	adjective	She looks plumper than before (Nghĩa tích cực hơn fat)	ADMIN
202509201817316356	heightened	verb	A heightened sense of smell	ADMIN
202509201845149711	repel	verb	This spray repels mosquitos	ADMIN
202509201847221343	alters	verb	You change a tire (replace it) and you alter a coat (make a small modification to make it fit)	ADMIN
202509210131062317	captivating	adjective	She has a captivating smile	ADMIN
202509210903031631	athleticism	noun	His atheleticism made him become the best player in the team	ADMIN
202509210909149343	weary	adjective	After the journey, she felt completely weary	ADMIN
202509210909331093	weary	verb	The constant noises wearied me	ADMIN
202509210919539033	awash	adjective	The boat is awash with sea water	ADMIN
202509210921343600	staggering	adjective	The costs were staggering	ADMIN
202509210932210423	bid	verb	I made a bid of $150 for that paiting	ADMIN
202509210933321916	bid	verb	The communications groups have show an interest in bidding for the company	ADMIN
202509211007524818	mitigated	verb	He want to mitigated the cost of buying that house	ADMIN
202509211014219292	extravagances	noun	Hist many extravagances included buying luxury cars and expensive jewelry	ADMIN
202509211911199986	shortlist	noun	She is on the shortlist for that job	ADMIN
202509212134580365	appease	verb	He tried to appease the angry customer by offering a full refund	ADMIN
202509212142484500	whims	noun	She bought the expensive dress on a whim	ADMIN
202509212146009960	conduct	noun	His conduct at the meeting was exemplary (gương mẫu)	ADMIN
202509212146208160	conduct	verb	The teacher will conduct the experiment	ADMIN
202509212201090576	sway	noun	The city was under the sway of corrupt politicians	ADMIN
202509212201568121	sway	verb	He try to sway the jury (bồi thẩm đoàn) in his favor (để có lợi cho anh ấy)	ADMIN
202509212255407069	undercut	verb	His constant criticism undercut her confidence	ADMIN
202509231150516526	plantations	noun	Son La is famous for tea plantations	ADMIN
202509241853473136	dignity	adjective	A lion accepts it's receding hairline with dignity (Con sư tử chấp nhận hói dần với khí chất vững vàng)	ADMIN
202509250542395609	exorbitant	adjective	The lawer charged an exorbitant fee for his services	ADMIN
202509250544353426	one-off	noun	This concert is one-off event	ADMIN
202509250549045069	notoriously	adverb	This city is notoriously expensive	ADMIN
202509250550001074	formidable	adjective	She is formidable chess player	ADMIN
202509250554588227	budget-breaking	adjective	Buying new car would be budget-breaking for me	ADMIN
202509250654305728	equestrian	adjective	His questrian skill as excellent	ADMIN
202509250657588874	equestrian	noun	Equestrian is a sport where players riding horses	ADMIN
202509250659598572	accommodate	verb	The hotel can accommodate 500 guests	ADMIN
202509250703311184	brief	adjective	He made a brief visit to me	ADMIN
202509250704074103	brief	noun	A brief is a summary	ADMIN
202509250704419608	brief	verb	She briefed him on the last day mission	ADMIN
202509250706277996	influx	noun	A massive influx of touries	ADMIN
202509250708364801	disuse	noun	The factory has fallen into disuse since the 1980s	ADMIN
202509250715168861	fervour	noun	He talked with all the fevour about it	ADMIN
202509250722085305	waned	verb	By the late 70s the band's popularity waned	ADMIN
202509251229495529	undertaken	verb	She undertook the task of organizing the coference	ADMIN
202509251240241495	civic	adjective	The event was attended by various civic dignitaries (civic dignitaries = những quan chức cao cấp)	ADMIN
202509251246180289	accrue	verb	Interest will be accrue on the account at a rate of 7%	ADMIN
202509251258106156	revamped	adjective	The school library will be revamped in the next season.	ADMIN
202509251303199694	swathes	noun	The fire damaged swathes of forest 	ADMIN
202509251311501998	favours	verb	The judge favours the defendant	ADMIN
202509251315416789	prosperous	adjective	What a prosperous year!	ADMIN
202509251406014174	perpetually	adverb	She is perpetually late for meetings	ADMIN
202509251407381358	disenfranchisement	noun	The new law has led to the disenfranchisement of many voters	ADMIN
202509261907261556	sustainable	adjective	We need to find sustainable solutions to climate change	ADMIN
202509261910532961	termite	noun	Termites are small insects that eat wood	ADMIN
202509261922002680	mound	noun	A mound is a pile of dirt or stones	ADMIN
202509280443505763	fluctuations	noun	The stock market has big fluctuations this week	ADMIN
202509280449506620	regionalised	adjective	A regionolised health care system	ADMIN
202509280517348224	biosphere	noun	Humans have a huge impact on the biosphere	ADMIN
202509280529079852	atrium	noun	The hotel has a large atrium filled with plants	ADMIN
202509280531445939	shady	adjective	A shady garden	ADMIN
202509280538089340	prospectors	noun	During the gold rush, thousand of prospectors traveled to the west in search for fortune	ADMIN
202509280216136622	fungus	noun	A fungus is growing on the old bread	ADMIN
202509280224309686	janitor	noun	Jenitor is a person employed to take care of a large building	ADMIN
202509280248228243	baseboard	noun	Baseboard is a piece of material (wood) fixed along the bottom of a wall where it meets the floor	ADMIN
202509280250026644	vents	noun	A vent is a opening that allows air, gas or smoke to enter/leave a closed space	ADMIN
202509281627451678	mineshaft	noun	The miners went down to mineshaft to start their shift	ADMIN
202509281648311850	aardvarks	noun	The aardvark is a medium-size, burrowing (động vật đào hang), nocturnal (hoạt động về đêm) mammal native to Africa	ADMIN
202509281649437102	insectivores	noun	The bird are insectivorses and forage for their food on the ground	ADMIN
202509281708414203	flue	noun	A flue is a duct (ống dẫn) for smoke and waste gases produced by fire, a gas heater, a power station (nhà máy điện), or other fuel burning installation	ADMIN
202509281711059742	hollow	adjective	This is a hollow tree	ADMIN
202509281711214966	hollow	noun	There is a hollow in the ground	ADMIN
202509281711481258	hollow	verb	That animal is hollowing out a log	ADMIN
202509281723551607	disdaining	verb	He disdaining their offer of help	ADMIN
202509281930297381	shrubs	noun	She planted some roses and other flowering shrubs	ADMIN
202509291826475975	veld	noun	The lions hunt on the veld at night	ADMIN
202509291829249444	baking	noun	I use palm sugar in baking, and I really like the taste	ADMIN
202509291829589286	baking	adjective	It's baking hot outside in these days of September	ADMIN
202509291833005262	virtually	adverb	The company became virtually bankrupt	ADMIN
202509291835377157	breezes	noun	The windows are opened to welcome Summer breezes	ADMIN
202509291839439664	harsh	noun	Hanoi is a city with harsh weather	ADMIN
202509291840549685	highveld	noun	The highveld is the portion of the South African inland plateau (cao nguyên)	ADMIN
202509291842184799	arches	noun	Arches are structure consisting of a curved top and two supports	ADMIN
202509291843298832	jut	verb	His sharp nose jutted out	ADMIN
202509291927176478	girders	noun	Girders are long, thich piece of metal/concrete that support roofs, floors, bridges...	ADMIN
202509291928369666	porcupine-quill	noun	The porcupine defends itself with sharp quills	ADMIN
202509291930059878	headdresses	noun	Headgear, headwear, or headdress is any element of clothing which is worn on one's head	ADMIN
202509301306498328	bouquet	noun	A small cluster of arrangement of flowers	ADMIN
202509301310530590	bouquet	noun	A fragrant small, especially of a wine (fragrance = hương thơm)	ADMIN
202509301326242872	assessment	noun	Would you said that is a fair assessment for the situation	ADMIN
202509301403566537	non-vintage	noun	A non-vintage wine is made from a blend of grapes harvested in different years, allowing winemakers to create a consistent taste and style	ADMIN
202509301415562690	aromas	noun	The wine has complex aromas of oak, blackberry, and pepper	ADMIN
202509301503050177	yeast	noun	Yeast is a type of fungus that is used in making wine and bread	ADMIN
202509301515184195	supplanted	verb	Wine has now just about supplanted beer as the alcoholic drink of choice	ADMIN
202509301801516399	vinification	noun	The winemaker specializes in organic vinification methods	ADMIN
202510010304175077	intimacy	noun	Emotional intimacy is important for a healthy relationship	ADMIN
202510010314258573	mediterranean	noun	The Mediterranean Sea, between Europe and Africa	ADMIN
202510010325268496	signifies	verb	A red traffic light signifies that traffic must stop	ADMIN
202510010400130122	resultant	adjective	The resultant effect was a significant increase in productivity	ADMIN
202510010401371466	tinge	noun	The sky had a tinge of pink at sunset	ADMIN
202510011851553783	posture	verb	He postured as an expert in psychology, but he had never even taken a class	ADMIN
202510011853461920	pretentiously	adverb	She spoke pretentiously about art, quoting obscure (vô danh) French painters no one had heard of. 	ADMIN
202510011854333406	jargon	noun	The technician explained the problem using so much jargon that I had no idea what he meant	ADMIN
202510012126254516	expertise	noun	He has great expertise in machine learning	ADMIN
202510012128538888	mellow	noun	The music was soft and mellow	ADMIN
202510012129180866	mellow	noun	This wine has a mellow flavor	ADMIN
202510012130072255	mellow	verb	You need to mellow out and relax	ADMIN
202510012131204906	musky	adjective	The perfume has a musky scent	ADMIN
202510012132385527	vivid	adjective	The sunset was vivid, with shades of orange, pink, and purple in the sky	ADMIN
202510012133108847	vivid	adjective	I have a vivid memory of childhood summer vacations	ADMIN
202510012135565612	vegetal	adjective	The soup had a strong vegetal flavor	ADMIN
202510012140272149	conceited	adjective	He is so conceited that he didn't listen to anyone	ADMIN
202510012141472003	connoisseur	noun	She is a connoisseur of wines	ADMIN
202510012143163809	perplex	verb	Her instructions perplexed me that day	ADMIN
202510012220550368	seldom	adverb	Now that we have baby, we seldom have a chance to go to the cinema	ADMIN
202510012224572645	inevitable	adjective	Death is inevitable	ADMIN
202510012228450399	predominant	adjective	The predominant language in Canada is English	ADMIN
202510012243531874	varietal	noun	Cabernet Sauvignon is a famous varietal	ADMIN
202510012244053104	varietal	adjective	This is a varietal wine	ADMIN
202510012310049539	latter	adjective	In the latter stages of the fight, he began to tired	ADMIN
202510012315317868	semi-generic	adjective	A semi-generic brand name	ADMIN
202510012317179637	raisin-ed	noun	A raisin is a dried grape	ADMIN
202510012322597127	promotes	verb	This policy promotes the economic growth	ADMIN
202510012323544723	speculation	noun	There are some speculations about the cause of the accident	ADMIN
202510021649120162	compromise	noun	After a long discussion, they finally reached a compromise	ADMIN
202510021649329135	compromise	verb	Both sides need to compromise to solve the conflict	ADMIN
202510021649546708	compromise	verb	Don't compromise your principals	ADMIN
202510021008410390	suburb	noun	She lives in a suburb of Ha Noi	ADMIN
202510021012030659	engravings	noun	The old engravings of the city	ADMIN
202510022001333551	lacquer	noun	The table was covered in lacquer so it looked shiny	ADMIN
202510022007099209	rugged	noun	The biker climbed the rugged mountains	ADMIN
202510022008224865	rugged	adjective	He has a rugged appearance, so people might think he is strong	ADMIN
202510022024212540	stenciling	verb	The artist decorated the wall by stenciling flowers on it	ADMIN
202510022122363229	still-life	noun	Still life is an art genre depicting (miêu tả) an arrangement of inanimate objects	ADMIN
202510030128507366	printmaking	noun	Printmaking is the art of creating artworks by transferring images from a prepared surface onto paper or another material	ADMIN
202510030212275608	striking	adjective	She has striking eye	ADMIN
202510030213124546	elaborate	adjective	She wore an elaborate dress	ADMIN
202510030303013121	depicted	verb	The painting depicted a beautiful village	ADMIN
202510030324171711	vibrant	adjective	The city is full of vibrant colors, lively markets, and cheerful people	ADMIN
202510031921417958	rehabilitation	noun	He is in rehabilitation after a stroke	ADMIN
202510031923114353	servicemen	noun	Many serviceman returned home after the war	ADMIN
202510031925418635	foreshore	noun	Shells and seaweeds are scattered along the foreshore	ADMIN
202510031933471068	prominent	adjective	The tower is a prominent landmark in the city	ADMIN
202510031935012145	flora	noun	The flora of Viet Nam is diverse	ADMIN
202510031937296197	bushland	noun	We went hiking through the bushland near Sydney	ADMIN
202510031941342873	abundance	noun	Food was in abundance at the festival (in abudance)\n\nThere is a abundance of opportunities in the city (a abundance of)\n\n	ADMIN
202510031947074843	reliant	adjective	He is reliant on his parent for finacial support	ADMIN
202510031954428236	prompted	verb	His curiosity prompted him to ask more questions	ADMIN
202510032012056565	prompt	noun	The actor forgot his line, so the director gave him a prompt	ADMIN
202510032013170349	prompt	noun	The user saw the command prompt on the screen before typing a command (command prompt >>> for python)	ADMIN
202510032026272621	titles	noun	The artist's titles are names of artist artwork	ADMIN
202510032028226442	extent	noun	We don't know yet the full extent of the problem	ADMIN
202510032033486358	incorporated	verb	The incorporated traditional motifs into her designs	ADMIN
202510041156128679	historian	noun	The historian is a person who studied and wrote about past	ADMIN
202510050803116560	dissolve	verb	The company was dissolved in 1999	ADMIN
202510062145537274	cicero	noun	Cicero was a Roman statesman, lawyer, and philosopher who influenced Western thought	ADMIN
202510062148410607	degradation	noun	The degradation of the rainforest is a major environmental concern	ADMIN
202510062149017910	degradation	noun	He felt a sense of degradation after losing his job	ADMIN
202510062149309957	degradation	noun	Plastic degradation in the ocean takes hundreds of years 	ADMIN
202510062151038164	embryo	noun	The embryo develops rapidly during the first eight weeks of pregnancy	ADMIN
202510062155279566	illiterate	adjective	Many adults in rural areas are illiterate	ADMIN
202510062157192785	junior	noun	He is a junior lawyer in the company	ADMIN
202510062158295785	lavishly	adverb	She lavished attention on her guests	ADMIN
202510062159005708	lavishly	adverb	The wedding was lavishly celebrated with music and dancing	ADMIN
202510062200481091	legislative	adjective	The legislative branch is responsible for creating laws	ADMIN
202510062202125768	legislature	noun	The national legislature debated the bill (dự luật) for several days	ADMIN
202510062203302971	onwards	adverb	From 2020 onwards, new rules will apply	ADMIN
202510062206510244	parliament	noun	All parliaments are legislatures, but not all legislatures are parliaments	ADMIN
202510062207551835	permeated	verb	The smell of freshly baked bread permeated the house	ADMIN
202510062208154831	permeated	verb	The water permeated the soil	ADMIN
202510062215546633	plumbing	verb	The building's plumbing system needs repair	ADMIN
202510062217181663	remunerated	verb	He was well remunerated for his work	ADMIN
202510062218497491	seinfeld	noun	Seinfeld is considered one of the greatest TV sitcoms of all time 	ADMIN
202510062219530519	seize	verb	He seize the rope to avoid falling	ADMIN
202510062222421359	statutory	adjective	Companies must comply (tuân theo) with statutory regulations regarding health and safety	ADMIN
202510062224526773	vindicate	verb	The new research vindicated the scientist's theory	ADMIN
202510070050080440	versatile	adjective	She's a very versatile actress	ADMIN
202510070235541388	accusation	noun	She made an accusation of theft against her coworker	ADMIN
202510071349126326	fleets	noun	The navy sent its entire fleet to the Pacific	ADMIN
202510071357559941	navigators	noun	Ancient navigators used the stars to find their wat across the ocean	ADMIN
202510071400013151	accounts	noun	Her account of the trip was very exciting	ADMIN
202510071401158401	depictions	noun	The movie's depiction of ancient Hawaii was very accurate	ADMIN
202510071402112916	exaggerated	verb	The reports of the storm's damage were exaggerated	ADMIN
202510072217413909	voyaging	noun	While sailing focuses on the doing and is usually short-term, voyaging focuses on the journey and usually takes a long time.	ADMIN
202510072243237804	influential	adjective	She is an influential politician	ADMIN
202510072245266977	reignited	verb	The discovery reignited interest in ancient civilizations	ADMIN
202510072300002736	refreshingly	adjective	A strong breeze blow refreshingly all day	ADMIN
202510072302539305	armchair	noun	Armchair research is a way of research relies on theoretical, analysis and existing literature rather than empirical (thực nghiệm) investtigation	ADMIN
202510072326095372	fieldwork	noun	The students spend a month doing fieldwork in the Amazon rainforest	ADMIN
202510072344248607	yachtsman	noun	Yachtsman is a person who sail yacht, and a yacht is a sailboat used for cruising or racing.	ADMIN
202510072351041306	nautical	adjective	You're looking very nautical in your navy blue sweeter	ADMIN
202510080022549592	steered	verb	She steers the car to the left	ADMIN
202510080032017734	deliberate	adjective	They made a deliberate decision to delay the launch	ADMIN
202510080032340909	deliberate	verb	The committee deliberated for several hours before voting	ADMIN
202510080128301536	gales	noun	Strong gales hit the coast last night.	ADMIN
202510080146556634	expenditure	noun	By monitoring energy expenditure, scientists can understand how animals survive in extreme environments	ADMIN
202510080149046271	unfavorable	adjective	We had to cancel the trip because of the unfavorable weather	ADMIN
202510080153324779	vessels	noun	A vessel is any watercraft, a general term encompassing ships, boats, barges, and other floating structures	ADMIN
202510080254164410	linguistic	adjective	Linguistic evidence suggests the two languages are related	ADMIN
202510080256054474	disciplines	noun	Linguistics is a scientific discipline	ADMIN
202510080629290519	renaissance	noun	The city has experienced a renaissance in recent years	ADMIN
202510080955033772	amber	noun	The necklace was made of amber	ADMIN
202510080958080634	analogy	noun	An analogy is a comparison between two things to show how they are similar	ADMIN
202510080958456944	analogy	noun	There is a close analogy between the heart and a pump	ADMIN
202510081000106439	appointed	verb	The Queen appointed him personal physician	ADMIN
202510081000376040	appointed	verb	The meeting was appointed at 3 p.m	ADMIN
202510081006513916	armada	noun	The Spanish Armada was defeated by the English navy in 1588	ADMIN
202510081018247153	crystalline	adjective	Salt has a crystalline structure	ADMIN
202510081021089086	culminated	verb	His efforts culminated in a great scientific discovery	ADMIN
202510081024352850	deduction	noun	An example of deduction is "Men are moral, Socrates is a man, so Socrates is moral".	ADMIN
202510081027055644	demonstrated	verb	The teacher demonstrated how to use the microscope	ADMIN
202510081031477155	equidistant	adjective	The town is equidistant from London and Cambridge	ADMIN
202510081040035521	experimentation	noun	Experimentation is the whole process of conducting an experiment	ADMIN
202510081043162832	helmsmen	noun	A helmsman is a person who steers a ship or boat	ADMIN
202510081602084217	ingenious	adjective	She is a ingenious person	ADMIN
202510081604197632	inquiry	noun	I made an inquiry about the train schedule	ADMIN
202510081605089276	interfere	verb	Don't interfere in other people's affairs	ADMIN
202510081607417141	lodestone	noun	Ancient sailors used lodestones to navigate at sea	ADMIN
202510081609426876	magnetomotive	adjective	The coil has magnetomotive force	ADMIN
202510090131290991	outlive	verb	His fame will outlive him	ADMIN
202510090132312269	paving	verb	Workers are paving the road	ADMIN
202510110203294057	transmutation	noun	Nuclear transmutation occurs when one element changes into another	ADMIN
202510110206098691	seafaring	adjective	A seafaring nation	ADMIN
202510110206282466	seafaring	noun	He spent his life  in seafaring	ADMIN
202510110208416027	speculated	verb	They speculated about the cause of the accident	ADMIN
202510110211212662	superstition	noun	Many people have a superstition about breaking mirror	ADMIN
202510110239019318	reliance	noun	Our reliance on technology is increasing everyday	ADMIN
202510121104490254	mysticism	adjective	Mysticism often emphasizes inner experience rather than logic	ADMIN
202510121430513170	coined	verb	They coin new slang terms every year	ADMIN
202510181348035945	prosperous	adjective	We wish you a prosperous New Year	ADMIN
202510181350172940	accommodate	verb	The cabins accommodate up to 6 people	ADMIN
202510181351351885	athleticism	noun	What he lacks in stature, he more than makes up for with speed and athleticism	ADMIN
202510181352456050	vicinity	noun	The number of people living in the immediate vicinity was small	ADMIN
202510181421324579	speculated	verb	My colleagues speculate about my private life	ADMIN
202510181422362733	posture	verb	A billionaire posturing as a hero of the working class	ADMIN
202510181424097955	veld	noun	The veld is an open, uncultivated country or grassland in southern Africa	ADMIN
202510181603292821	arid	adjective	The region is too arid to support crops	ADMIN
202510181605526262	assertion	noun	Her assertion that she was innocent was not believed	ADMIN
202510181610267031	australia	noun	Australia is a country, and it located in the Southern Hemisphere.	ADMIN
202510181611501949	australian	noun	The Australians are people who are citizens of Australia.	ADMIN
202510181620443065	bane	noun	Stress is the bane of mordern life	ADMIN
202510181651038972	calf	noun	The farm has 10 calves	ADMIN
202510181654134458	counter-productive	verb	Trying to force teenegers to study can be counter-productive	ADMIN
202510181656434822	descendants	noun	Descendants are people who related to someone and live after them	ADMIN
202510181706552359	desolate	adjective	A desolate place is a place that feels like deserted	ADMIN
202510181710234453	deteriorate	verb	Her health deteriorated after the accident	ADMIN
202510181713347382	dingo	noun	The dingo is a type of wild dog native in Australia 	ADMIN
202510181721548567	ecological	adjective	We must project the ecological balance of the planet	ADMIN
202510181736150398	feral	adjective	A feral cat is a cat that lives in the wild and has little contact with humans	ADMIN
202510181743234846	grazier	noun	A grazier is a person who raises cattle of sheep on a large area of land	ADMIN
202510181805408550	laced	verb	She laced up her shoes before going out	ADMIN
202510181817072917	livelihoods	noun	Many farmers lost their livelihood due to the drought	ADMIN
202510181832036757	mammalian	adjective	Humans share many mammalian characteristics	ADMIN
202510181837545685	occupants	noun	All the occupants of the building were evacuated safely	ADMIN
202510181917121770	predation	noun	Predation is an important part of the food chain	ADMIN
202510181943455349	predominate	verb	Women predominate in teaching profession.	ADMIN
202510182109454283	prescription	noun	The doctor gave me a prescription for antibiotics	ADMIN
202510182119474121	ranch	noun	He owns a ranch in Texas	ADMIN
202510182134384576	readily	adjective	She readily agreed to help me	ADMIN
202510182142102277	roam	verb	Dears roaming freely in the forest	ADMIN
202510182153452261	scrubland	noun	The scrubland is a land where it contains scrubs and grasses.	ADMIN
202510182206126716	solitary	adjective	I live a pretty solitary life	ADMIN
202510190752517476	ensuing	adjective	There were riots (bạo loạn) and chaos (hỗn loạn) ensued (verb - xảy ra sau đó)	ADMIN
202510190753283158	ensuing	adjective	He made a mistake and the ensuring problems were severe	ADMIN
202510190754422125	millennia	noun	A milliennie is a period of a thousand years (1000)	ADMIN
202510190826543734	surge	verb	Prices surged last month	ADMIN
202510190827029608	surge	noun	A surge in demand	ADMIN
202510190830023775	scarce	adjective	Food was scarce during war	ADMIN
202510190937076510	deteriorating	verb	The patient's condition is deteriorating despite treatment	ADMIN
202510191410034508	persuaded	verb	He was persuaded by her to buy a new house in NY.	ADMIN
202510191443530311	wallabies	noun	Kangaroos are bigger than wallabies	ADMIN
202510192211000585	seafaring	adjective	He is a seafaring person	ADMIN
202510192251426734	renowned	adjective	He is a renowned scientist	ADMIN
202510192255045659	cartographer	noun	A cartographer is a person who draws or produces map	ADMIN
202510200655199445	benign	adjective	The climate here is benign	ADMIN
202510200656348625	tenanted	adjective	The tenanted office building generated steady (bền vững) rental income	ADMIN
202510200702551056	lineage	noun	He comes from a long lineage line of doctors	ADMIN
202510200720178696	underway	adjective	The construction is underway so don't go in, it's dangerous.	ADMIN
202510200728457988	desperate	adjective	He is working for a bad company, he desperately asked for a raise but they refused	ADMIN
202510200731118328	eucalypt	noun	The eucalypt is a fast-growing evergreen Australasian tree.	ADMIN
202510200831103244	beaks	noun	A beak is a bird's horny projecting jaws	ADMIN
202510200832115445	blunt	adjective	The knife is blunt, it won't cut anything	ADMIN
202510200835261659	bristles	noun	A toothbrush has thousands of tiny bristles	ADMIN
202510200836254376	nectar-feeding	noun	Some parrots are nectar-feeding	ADMIN
202510200837546724	nomadic	noun	Normadic tributes moved across the desert in search of grazing land	ADMIN
202510201841573929	human-induced	adjective	Even underground animals are affected by human-induced pollution.	ADMIN
202510201844362133	favor	verb	New conditions favor the incoming species	ADMIN
202510201845565262	precipitated	verb	He scandal precipitated his resignation	ADMIN
202510220731488568	equitable	adjective	He is an equitable person.	ADMIN
202510220733472862	adequately	adverb	The resources were not adequately provided.	ADMIN
202510220734499688	substitute	verb	You can substitute honey for sugar	ADMIN
202510220909270201	bouts	noun	He has had several bouts of flu this year	ADMIN
202510220915318650	cardiovascular	adjective	The study focused on cardiovascular health in adults	ADMIN
202510220916360814	clench	verb	He clenched his fists in anger	ADMIN
202510220918088371	compensate	verb	The company will compensate workers work overtime.	ADMIN
202510221158146380	contagion	noun	The gorverment took measures (biện pháp) to prevent the contagion of the disease	ADMIN
202510221322363279	deterioration	noun	We are worried about the rapid deterioration of his health	ADMIN
202510221338466380	ethology	noun	Ethology focuses on how behavior evolves and helps animals survive.	ADMIN
202510221342443243	exhalation	noun	The exhalation is the action of breathing air out of your lungs.	ADMIN
202510221344339238	fetal	adjective	Fetal movements can be detected after the 20th week of pregnancy.	ADMIN
202510221346582425	gape	verb	He gaped in astonishment at the fireworks	ADMIN
202510221349303858	half-yawns	noun	He gave a half-yawn and tried to stay awake	ADMIN
202510221353480097	inevitability	noun	The inevitability of death is something everyone must accept.	ADMIN
202510221355445474	inhalation	noun	Inhalation is the action of sucking air into our lungs.	ADMIN
202510221415022519	invariant	adjective	The speed of light is invariant in a vacuum.	ADMIN
202510221415276270	invariant	noun	Energy is an invariant in classical machanics.	ADMIN
202510221418129876	maneuvers	noun	Troops were on maneuvers all week.	ADMIN
202510221419237590	maneuvers	verb	Parallel parking requires careful maneuvers.	ADMIN
202510221421527497	mid-yawn	adjective	She was caught mid-yawn when the camera flashed	ADMIN
202510221424025999	merits	noun	We discussed the merits of both plans before deciding.	ADMIN
202510221425501353	merits	noun	He got a promotion at work because of his merits.	ADMIN
202510221427298222	nasal	adjective	I bought a nasal spray yesterday and it worked well.	ADMIN
202510221433308702	nostrils	noun	Humans have two nostrils	ADMIN
202510221439398292	onset	noun	The onset of pain was sudden.	ADMIN
202510221459533547	pinch	verb	She pinched her little brother's cheeks	ADMIN
202510221500044826	pinch	noun	Add a pinch of salt.	ADMIN
202510221501554911	quirky	adjective	She has a quirky sense of humor.	ADMIN
202510221504427346	resembles	verb	This cloud resembles a dragon.	ADMIN
202510221527544405	salivates	verb	When we see delicious food, our mouths salivate.	ADMIN
202510221529214679	stereotyped	adjective	He gave a stereotyped response to the question.	ADMIN
202510221626555073	stereotype	noun	Many people are judged unfairly because of stereotypes about their nationality or gender.	ADMIN
202510221627311449	stereotype	noun	People usually stereotype teenagers as lazy	ADMIN
202510221653109865	stifled	verb	She stifled a sob the baby wouldn't wake	ADMIN
202510221658341468	stifled	verb	Everybody felt stifled because of the hot room.	ADMIN
202510230813253518	fond	verb	He is very fonds of reading.	ADMIN
202510231817016285	therapeutic	adjective	This drug has therapeutic effects	ADMIN
202510231821234012	veneer	noun	This table is made of cheap wood with mahogany veneer	ADMIN
202510231845139860	depress	verb	Depress a red button to start the machine.	ADMIN
202510231944187318	chart	verb	The doctor charts the growth of a child.	ADMIN
202510232003447631	fatigue	noun	After hours of concentration, metal fatigue set in, making it hard to focus.	ADMIN
202510232005266790	reluctant	adjective	She was reluctant when she talked about the past.	ADMIN
202510232007110051	foetuses	noun	In British English people said "foetus", but in American English people said "fetus" instead	ADMIN
202510232008327887	inadequate	adjective	The food supply is inadequate to meet demand.	ADMIN
202510240857022428	viable	adjective	We need a viable business plan before we start the company.	ADMIN
202510240859202091	renown	noun	The restaurent is of great renown for its sushi.	ADMIN
202510240901252672	fertile	adjective	The Nile Delta is extremely fertile	ADMIN
202510240902216140	prime	adjective	The prime reason for his success is hard work	ADMIN
202510240903367439	prone	adjective	Children are prone to colds in winter.	ADMIN
202510240907003202	officials	noun	A official is a person who has a position of responsibility in an organization.	ADMIN
202510240908077911	address	verb	He said we must address this now or our company would be doomed.	ADMIN
202510241027430823	irrespective	adverb	Everyone should be treated equally, irrespective of their age or gender.	ADMIN
202510241035313629	competence	noun	Companies value the competence of an employee more than the employee's experience.	ADMIN
202510241234424611	incentives	noun	Companies create multiple incentives to encourage employees to work harder.	ADMIN
202510241237088924	deficiency	noun	Iron deficiency can cause fatigue and weakness.	ADMIN
202510241239327778	administrative	adjective	She works as an administrative assistant in law firm.	ADMIN
202510241241163293	detrimental	adjective	Smoking is detrimental to your health.	ADMIN
202510241242406189	accountable	adjective	Managers are accountable for the performance of their teams	ADMIN
202510241628442712	disclose	verb	She refuse to disclose her password.	ADMIN
202510241630209358	transparency	adjective	We want more transparency in government.	ADMIN
202510241633001130	welfare	noun	The government is converned about welfare of its citizens.	ADMIN
202510241635080236	posing	verb	The teacher is posting a question.	ADMIN
202510241713494910	resent	verb	She resents because of being treated like a child.	ADMIN
202510241717303996	embrace	verb	He embraced the new technology enthusiastically.	ADMIN
202510241719052444	mediocre	adjective	The movie was mediocre; it wasn't terrible, but it wasn't great either.	ADMIN
202510241722530713	affluence	noun	The region is known for its affluence and high standard of living.	ADMIN
202510241729385328	numerous	adjective	If you want to say something has a large quantity, then you should use the word "numerous". And if you want to mention a significant part of a whole, then use "major" or "most".	ADMIN
202510241806195655	merit	noun	One merit of this method is it's very fast.	ADMIN
202510241826479632	unwind	verb	I'm unwinding after a long day of work in my company.	ADMIN
202510241827496444	solace	noun	After the loss of her dog, she found solace in her friends	ADMIN
202510241829380847	serenity	noun	She enjoyed the serenity of the countryside.	ADMIN
202510241834589966	notable	adjective	His family is one of the most notable families of this town.	ADMIN
202510242029569112	equity	noun	Equality is about inputs — giving everyone the same starting conditions. Equity is about outcomes — ensuring everyone can reach the same finish line.	ADMIN
202510242056331430	upholding	verb	Teachers play an important role in upholding moral values.	ADMIN
202510250927319052	alleviates	verb	The new policy allevietes some of financial burdens on students	ADMIN
202510250939190728	collective	adjective	If someone says "collective data" then don't misunderstand it to mean "data has been collected". It means data has been collected for mutiple sources.	ADMIN
202510251432421501	advocates	noun	He is an advocate for human rights.	ADMIN
202510251433089233	advocates	verb	She advocates for better education policies	ADMIN
202510251434336946	contend	verb	Many scientists contend that climate change is real.	ADMIN
202510251438303596	inherent	adjective	Kindness is inherent in human natural.	ADMIN
202510251442058760	nurture	verb	Parents should nurture their children's curiosity	ADMIN
202510251449302221	commute	verb	She commuted from Westport in to Grand Central Station.	ADMIN
202510251506490274	undue	adjective	The new tax puts an undue burden on small businesses.	ADMIN
202510251509240290	strain	noun	He suffered a muscle strain.	ADMIN
202510251510061214	strain	verb	Do not strain your eyes by reading in dim light.	ADMIN
202510251553198394	diverting	verb	Diverting funds from education to the military could harm social development.	ADMIN
202510251558516419	subsidized	verb	Subsidized housing (nhà trợ cấp) helps low-income families.	ADMIN
202510251604164963	whilst	adverb	Whilst technology has improved communication, it has also created new social challenges.	ADMIN
202510271933444956	baseboard	noun	Now close your eyes and imagine rotating the baseboard 180 around the vertical axis.	ADMIN
202510271935325199	conduct	noun	The club has a strict code (set of rules) of conduct	ADMIN
202510271937530756	remunerated	verb	He is poorly remunerated for the hard work he does.	ADMIN
202510280912105569	superseded	verb	The old traditions were superseded by modern custom. 	ADMIN
202510281148323429	glaring	adjective	It was a glaring mistake.	ADMIN
202510281158447987	wielded	verb	Under the new city charter (điều lệ), the mayor wields most of the power.	ADMIN
202510281211308164	gulf	noun	There is a widening gulf between the wealth people and the poor people in our society.	ADMIN
202510281217018373	validity	noun	The validity of his argument is questionable.	ADMIN
202510281227142036	conceived	verb	The project was first conceived in 2000	ADMIN
202510281720533731	maneuvering	verb	Political maneuvering behind the scenes delayed the reform.	ADMIN
202510281722555648	monopoly	noun	Microsoft once had a near monopoly on computer operating systems.	ADMIN
202510281733319073	executives	noun	The executive of the health worker's union accepted the proposed pay increase on behalf (thay mặt) of their members	ADMIN
202510281737287814	colluded	verb	The employer has to know that he has colluded with an illegal entrant to employ him	ADMIN
202510281813395832	vendetta	noun	The vendetta between the two families lasted for decades.	ADMIN
202510290027234058	rashes	noun	Rashes are areas of irritated or swollen skin.	ADMIN
202510290028539730	swelling	noun	Swelling is an enlargement of a body part caused by a buildup of fluid, known as edema, in the tissues.	ADMIN
202510291157350301	shriveled	adjective	After being in the sun too long, his skin looked shriveled.	ADMIN
202510291215219232	barley	noun	Barley is a major cereal grain grown in temperate climates.	ADMIN
202510291230504434	patented	verb	We need to do a search to see if the invention is already patented.	ADMIN
202510291530581481	inadvertently	adverb	I inadvertently ended up on the wrong street	ADMIN
202510291532189041	facilitating	verb	The new ramp (con dốc) will facilitating the entry of wheelchairs.	ADMIN
202510300612033554	conceals	verb	The listening device was concealed in a pen	ADMIN
202510300631201204	satiated	verb	He folded up his newpaper, his curiosity satiated.	ADMIN
202510300634329661	intake	noun	It says on the bag that four slices of this bread contains one half of your recommended daily intake of fibre (chất xơ).	ADMIN
202510300638362788	equilibrium	noun	He devised (đưa ra) a mathematical method to prove the existence of equilibrium among prices and productions.	ADMIN
202510300639558398	compromises	noun	They hoped that a compromise will be establish tomorrow.	ADMIN
202510300657147516	intriguing	adjective	She has a really intriguing personality.	ADMIN
202510300658422510	botanists	noun	Botanists are scientist who study plants.	ADMIN
202510300659209362	entomologists	noun	Entomologists are scientist who study about insects	ADMIN
202510301053197877	trap-lining	noun	Traplining is a feeding strategy in which an individual visits food sources on a regular, repeatable sequence, much as trappers check their lines of traps.	ADMIN
202510301055504552	dispersal	noun	The seeds are adapted to dispersal by ants	ADMIN
202510301057400514	tracts	noun	The house is surrounded by vast tracts of woodland	ADMIN
\.


--
-- PostgreSQL database dump complete
--

\unrestrict jPemlCZAAIUnhJ6FX8MbulaXKJdvYlqG7D7lJPdJ554Keaen06OtaxDvGG9MHNu

