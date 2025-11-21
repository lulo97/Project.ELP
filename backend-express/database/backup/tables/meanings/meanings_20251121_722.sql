--
-- PostgreSQL database dump
--

\restrict yOYUAQAjwa3mT7u6M5ngWhJlaNnwWKPaOhbxkY1uKlwa3Iw5hn6uzINZCt2JeOV

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
-- Data for Name: meanings; Type: TABLE DATA; Schema: elp; Owner: admin
--

COPY elp.meanings (id, meaning, word, part_of_speech, user_id) FROM stdin;
202511090027086114	là	is	verb	202511052219372973
202511110740310659	nguồn	source	noun	202511052219372973
202509171845208970	Xin chào nhá	hello	verb	ADMIN
202509171938445119	a	a	noun	ADMIN
202509180128146823	ở đâu	where	adverb	ADMIN
202509190211166905	Bị bóp méo	garbled	adjective	ADMIN
202509190310595559	Tối tăm, u ám	murky	adjective	ADMIN
202509182219168563	Khả năng nhận biết trường điện từ	electroreception	noun	ADMIN
202509191908421331	Nhận thức	perceive	verb	ADMIN
202509200656492587	Những kích thích	stimuli	noun	ADMIN
202509200702061166	lưỡng cư	amphibious	adjective	ADMIN
202509200131191440	Cơ quan cảm nhận điện	electroreceptors	noun	ADMIN
202509200820188163	Những tính năng, khả năng	faculties	noun	ADMIN
202509201550321374	Không may mắn, xui xẻo	hapless	adjective	ADMIN
202509201609107907	Người mới vào nghề	novices	noun	ADMIN
202509201610233232	Nói năng lộn xộn	cluttering	noun	ADMIN
202509201615046009	phôi thai	embryos	noun	ADMIN
202509201618128826	vùng lân cận	vicinity	noun	ADMIN
202509201749370127	Khả năng cảm nhận trường điện từ	electroreceptive	adjective	ADMIN
202509201751597453	Sắc bén hoặc say mê	keen	adjective	ADMIN
202509201800589780	Thuộc về khứu giác	olfactory	adjective	ADMIN
202509201802364202	Sự gần gũi	proximity	noun	ADMIN
202509201806584747	Lùi lại, rút lui, thụt	recede	verb	ADMIN
202509201808236973	Đánh giá	assessing	verb	ADMIN
202509201811294809	Tính từ của sinew (gân trong cơ thể)/mạnh mẽ/gân guốc	sinewy	adjective	ADMIN
202509201815144113	Tính từ so sánh của plump/đầy đặn/căng mọng	plumper	adjective	ADMIN
202509201817073845	Bị tăng cao, tăng cường	heightened	verb	ADMIN
202509201844510939	Đẩy lùi, xua đuổi	repel	verb	ADMIN
202509201846101343	Làm thay đổi, biến đổi	alters	verb	ADMIN
202509210130566370	Thu hút, quyến rũ	captivating	adjective	ADMIN
202509210132549119	Sự ấn tượng về thị giác	spectacle	noun	ADMIN
202509210902205821	Khả năng vận động/thi đấu thể thao	athleticism	noun	ADMIN
202509210908116461	Mệt mỏi do bị bào mòn, chịu đựng lâu ngày	weary	adjective	ADMIN
202509210908209404	Làm cho ai đó mệt mỏi	weary	verb	ADMIN
202509210919353844	Ngập tràn	awash	adjective	ADMIN
202509210921158286	Choáng váng vì số tiền quá to lớn	staggering	adjective	ADMIN
202509210928536661	Sự trả giá (đấu giá), sự đấu thầu	bid	noun	ADMIN
202509210929049346	Trả giá, đấu thầu	bid	verb	ADMIN
202509211007236904	Giảm bớt, xoa dịu	mitigated	verb	ADMIN
202509211013453882	Sự hoang phí	extravagances	noun	ADMIN
202509211910428698	Danh sách ứng cử viên	shortlist	noun	ADMIN
202509212134171958	Làm xoa dịu	appease	verb	ADMIN
202509212138191687	Ý nghĩ bắt chợt	whims	noun	ADMIN
202509212144583573	Cách hành xử	conduct	noun	ADMIN
202509212145140185	Tiến hành	conduct	verb	ADMIN
202509212159456818	Quyền lực, quyền ảnh hưởng	sway	noun	ADMIN
202509212200105964	Làm ảnh hưởng, làm lung lay	sway	verb	ADMIN
202509212254584495	Hạ giá cạnh tranh, làm suy yếu	undercut	verb	ADMIN
202509231150243023	Đồn điền	plantations	noun	ADMIN
202509241851565044	phẩm giá, lòng tự trọng	dignity	adjective	ADMIN
202509250541573997	Quá mức (giá tiền)	exorbitant	adjective	ADMIN
202509250543513377	Một lần duy nhất	one-off	noun	ADMIN
202509250548405849	Khét tiếng với	notoriously	adverb	ADMIN
202509250549417347	Đáng gờm, ghê gớm	formidable	adjective	ADMIN
202509250553598149	Vượt quá ngân sách, phá sản	budget-breaking	adjective	ADMIN
202509250653279199	Môn thể thao cưỡi ngựa	equestrian	noun	ADMIN
202509250653534957	Liên quan tới cưỡi ngựa	equestrian	adjective	ADMIN
202509250659355035	cung cấp chỗ ở, điều chỉnh	accommodate	verb	ADMIN
202509250701469910	Ngắn ngủi, thoáng qua	brief	adjective	ADMIN
202509250702192093	Một tuyên bố, tóm tắt	brief	noun	ADMIN
202509250703090557	Hướng dẫn, thông báo cho nhiệm vụ	brief	verb	ADMIN
202509250705174577	Dòng chảy	influx	noun	ADMIN
202509250708093129	Tình trạng không sử dụng nữa	disuse	noun	ADMIN
202509250713297985	Sự cuồng nhiệt	fervour	noun	ADMIN
202509250715400275	Bị suy yếu	waned	verb	ADMIN
202509251229074429	Cam kết hoàn thành, đảm nhiệm	undertaken	verb	ADMIN
202509251238115575	Liên quan tới công dân, thành phố, chính quyền	civic	adjective	ADMIN
202509251244474621	tích lũy, mang lại	accrue	verb	ADMIN
202509251257091982	Được cải tạo, sửa chữa	revamped	adjective	ADMIN
202509251302090006	Vùng rộng, vùng trải dài	swathes	noun	ADMIN
202509251311063095	Sự thiên vị, sự giúp đỡ	favours	noun	ADMIN
202509251311230108	Thiên vị	favours	verb	ADMIN
202509251315302664	Thịnh vượng, giàu có	prosperous	adjective	ADMIN
202509251405424189	Luôn luôn, liên tục	perpetually	adverb	ADMIN
202509251406566810	Sự tước quyền	disenfranchisement	noun	ADMIN
202509261905367043	bền vững	sustainable	adjective	ADMIN
202509261909592632	Con mối	termite	noun	ADMIN
202509261918532967	gò đất, tổ (kiến, mối)	mound	noun	ADMIN
202509280442398078	Sự dao động, biến động	fluctuations	noun	ADMIN
202509280449186858	Được phân chia thành từng vùng	regionalised	adjective	ADMIN
202509280517047777	Sinh quyển	biosphere	noun	ADMIN
202509280528446373	Khoảng sân trong, giếng trời (của một tòa nhà/kiến trúc)	atrium	noun	ADMIN
202509280531364268	Râm mát	shady	adjective	ADMIN
202509280536407662	Người đào vàng, người thăm dò	prospectors	noun	ADMIN
202509280215502950	Nấm (số ít)	fungus	noun	ADMIN
202509280223535409	Người dọn vệ sinh, người gác cổng	janitor	noun	ADMIN
202509280247050922	Ván chân tường	baseboard	noun	ADMIN
202509280248592394	Lỗ thông hơi	vents	noun	ADMIN
202509281627216578	Hầm mỏ	mineshaft	noun	ADMIN
202509281647147414	Lợn đất châu phi	aardvarks	noun	ADMIN
202509281648565949	Động vật ăn côn trùng	insectivores	noun	ADMIN
202509281705507523	Ông khói, ống thông khí	flue	noun	ADMIN
202509281710119390	Rỗng bên trong	hollow	adjective	ADMIN
202509281710237796	Chỗ rỗng	hollow	noun	ADMIN
202509281710356551	Làm rỗng, khoét lỗ	hollow	verb	ADMIN
202509281723382408	Coi thường	disdaining	verb	ADMIN
202509281929478730	Cây bụi	shrubs	noun	ADMIN
202509291824377375	Tổ mối hoặc kiến, gò đất (số nhiều)	mounds	noun	ADMIN
202509291826164860	Vùng đất trống, phủ cỏ ở nam Châu Phi	veld	noun	ADMIN
202509291828146580	Nướng trong lò	baking	noun	ADMIN
202509291828403982	Cực kỳ nóng	baking	adjective	ADMIN
202509291832348489	Gần như, hầu như	virtually	adverb	ADMIN
202509291834544554	Những cơn gió nhẹ	breezes	noun	ADMIN
202509291839288346	Khắc nghiệt	harsh	noun	ADMIN
202509291840286217	Cao nguyên nam Châu phi	highveld	noun	ADMIN
202509291841480191	Kiến trúc vòm	arches	noun	ADMIN
202509291843118525	Nhô ra	jut	verb	ADMIN
202509291926343794	Thanh dầm	girders	noun	ADMIN
202509291928048952	Gai nhím	porcupine-quill	noun	ADMIN
202509291929227198	Trang sức/mũ đội đầu	headdresses	noun	ADMIN
202509301306310500	Bó hoa	bouquet	noun	ADMIN
202509301307393435	Mùi hương (rượu)	bouquet	noun	ADMIN
202509301325397361	Sự đánh giá	assessment	noun	ADMIN
202509301400029251	Rượu vang không niên vụ/rượu không cổ điển	non-vintage	noun	ADMIN
202509301415261449	Mùi hương (thức ăn, đồ uống, rượu)	aromas	noun	ADMIN
202509301502245242	Men nở	yeast	noun	ADMIN
202509301514434482	Đã thay thế (bằng cách vượt trội hơn)	supplanted	verb	ADMIN
202509301524043070	Tính từ của bánh quy (biscuit)	biscuity	adjective	ADMIN
202509301800382022	Toàn bộ quá trình biến nho thành rượu vang	vinification	noun	ADMIN
202510010303468359	Sự thân mật, gần gũi	intimacy	noun	ADMIN
202510010313340187	Địa trung hải	mediterranean	noun	ADMIN
202510010324594092	Có nghĩa là	signifies	verb	ADMIN
202510010359519806	Kết quả của ...	resultant	adjective	ADMIN
202510010401028739	Một chút, vết màu nhẹ	tinge	noun	ADMIN
202510011850497570	Giả bộ, tỏ ra	posture	verb	ADMIN
202510011852172598	Một cách màu mè, khoa trương	pretentiously	adverb	ADMIN
202510011854043575	Các từ ngữ chuyên môn	jargon	noun	ADMIN
202510012126040031	Kiến thức chuyên môn	expertise	noun	ADMIN
202510012128159078	Nhẹ nhàng, êm dịu (chỉ âm thanh, ánh sáng)	mellow	noun	ADMIN
202510012128384061	Chín muồi, hoàn thiện (hương vị)	mellow	noun	ADMIN
202510012129568368	trở nên dịu dàng, bớt căng thẳng	mellow	verb	ADMIN
202510012131014278	Mùi xạ hương (musk)	musky	adjective	ADMIN
202510012131576804	Rực rỡ, sống động	vivid	adjective	ADMIN
202510012135323989	Thuộc về thực vật	vegetal	adjective	ADMIN
202510012138184739	Kiêu ngạo	conceited	adjective	ADMIN
202510012141179824	Người am hiểu sâu, chuyên gia đánh giá	connoisseur	noun	ADMIN
202510012142196794	Làm bối rối	perplex	verb	ADMIN
202510012220147388	Hiếm khi	seldom	adverb	ADMIN
202510012224459290	Không thể tránh khỏi	inevitable	adjective	ADMIN
202510012228120993	Chiếm ưu thế cao nhất	predominant	adjective	ADMIN
202510012242510405	Một giống nho duy nhất	varietal	noun	ADMIN
202510012243018737	Thuộc về một giống nho duy nhất	varietal	adjective	ADMIN
202510012309315417	Điều cuối cùng, thứ cuối cùng	latter	adjective	ADMIN
202510012315134770	Vừa riêng vừa chung, bán chung	semi-generic	adjective	ADMIN
202510012316563795	Nho khô	raisin-ed	noun	ADMIN
202510012322394881	Thúc đẩy, dẫn tới	promotes	verb	ADMIN
202510012323221972	Sự phỏng đoản	speculation	noun	ADMIN
202510021647498314	Sự thỏa hiệp	compromise	noun	ADMIN
202510021648071212	thỏa hiệp	compromise	verb	ADMIN
202510021648475839	làm tổn hại, làm mất uy tín	compromise	verb	ADMIN
202510021008190161	Ngoại ô	suburb	noun	ADMIN
202510021011432015	Nghệ thuật chạm khắc	engravings	noun	ADMIN
202510022000015700	Sơn mài, sơn bóng	lacquer	noun	ADMIN
202510022000091223	Phủ sơn mài lên	lacquer	verb	ADMIN
202510022005372645	Địa hình bề mặt gồ gề	rugged	noun	ADMIN
202510022005505593	Rắn rỏi (vẻ ngoài)	rugged	adjective	ADMIN
202510022023568920	Kỹ thuật dùng khuôn (stencil) để vẽ, phun sơn, in	stenciling	verb	ADMIN
202510022121403992	Tĩnh vật	still-life	noun	ADMIN
202510030127500908	In ấn tạo hình	printmaking	noun	ADMIN
202510030212164265	Nổi bật	striking	adjective	ADMIN
202510030213016962	cầu kỳ, phức tạp	elaborate	adjective	ADMIN
202510030302393097	miêu tả	depicted	verb	ADMIN
202510030323313512	sống động, rực rỡ (tranh ảnh)	vibrant	adjective	ADMIN
202510031917355440	sự phục hồi, tái hòa nhập, cải tạo	rehabilitation	noun	ADMIN
202510031922452700	quân nhân	servicemen	noun	ADMIN
202510031925097282	bãi thủy triều, vùng đất lộ ra khi thủy triều rút	foreshore	noun	ADMIN
202510031933320513	nổi bật	prominent	adjective	ADMIN
202510031934301916	Hệ thực vật	flora	noun	ADMIN
202510031936481567	Vùng tự nhiên hoang dã gầm nhiều cây thưa ở Úc	bushland	noun	ADMIN
202510031940277400	sự dồi dài, sự phong phú	abundance	noun	ADMIN
202510031946409265	phụ thuộc vào	reliant	adjective	ADMIN
202510031953108605	Được thúc đẩy	prompted	verb	ADMIN
202510031957138887	Lời nhắc, gợi ý	prompt	noun	ADMIN
202510031958402832	Dấu nhắc (trong máy tính, command line)	prompt	noun	ADMIN
202510032011450972	Câu lệnh cho AI	prompt	noun	ADMIN
202510032023383461	Những tựa đề	titles	noun	ADMIN
202510032027342880	mức độ, phạm vi	extent	noun	ADMIN
202510032033226027	kết hợp	incorporated	verb	ADMIN
202510041155267646	sử gia	historian	noun	ADMIN
202510050734359025	giải tán, chấm dứt (công ty)	dissolve	verb	ADMIN
202510062145132234	Tên nhà hùng biện La Mã Cicero	cicero	noun	ADMIN
202510062147420374	Sự suy thoái. sự hao mòn (gốc từ degrade = làm giảm)	degradation	noun	ADMIN
202510062150319857	Phôi thai	embryo	noun	ADMIN
202510062154446437	Không biết đọc và viết (literate = biết đọc viết)	illiterate	adjective	ADMIN
202510062156345431	Cấp dưới	junior	noun	ADMIN
202510062158020702	Một cách hào phóng, xa hoa, dư thừa	lavishly	adverb	ADMIN
202510062200201417	Liên quan tới việc ban hành luật	legislative	adjective	ADMIN
202510062201150199	Cơ quan lập pháp	legislature	noun	ADMIN
202510062203102354	Tiếp tục, từ giờ trở đi	onwards	adverb	ADMIN
202510062206223617	Cơ quan lập pháp theo hướng Westminster	parliament	noun	ADMIN
202510062207276552	thấm qua, lan tỏa, tràn ngập	permeated	verb	ADMIN
202510062213514160	Hệ thống ống nước, nghề sửa ống nước	plumbing	verb	ADMIN
202510062216589849	Được trả công, trả thù lao	remunerated	verb	ADMIN
202510062218171276	Chương trình hài Seinfeld	seinfeld	noun	ADMIN
202510062219372151	nắm, chộp, bắt lấy	seize	verb	ADMIN
202510062221543707	Liên quan tới đạo luật, văn bản luật	statutory	adjective	ADMIN
202510062224209596	chứng minh đúng là hợp lý, vô tội	vindicate	verb	ADMIN
202510070049410745	đa năng, linh hoạt	versatile	adjective	ADMIN
202510070234541225	Lời buộc tội	accusation	noun	ADMIN
202510071348521738	Hạm đội, đội tàu thuyền	fleets	noun	ADMIN
202510071357041270	Hoa tiêu	navigators	noun	ADMIN
202510071359375409	Bản ghi chép, câu chuyện để kể	accounts	noun	ADMIN
202510071400471638	Sự miêu tả, sự khắc họa	depictions	noun	ADMIN
202510071401435758	Bị phóng đại	exaggerated	verb	ADMIN
202510072215112937	Chuyến du hành trên biển (để khám phá, phiêu lưu)	voyaging	noun	ADMIN
202510072242526746	có ảnh hưởng	influential	adjective	ADMIN
202510072244597728	thắp lại, làm bùng lên	reignited	verb	ADMIN
202510072259229793	một cách tươi mới, sảng khoải (tích cực)	refreshingly	adjective	ADMIN
202510072300403702	thuộc loại nghiên cứu ngồi mát ăn bát vàng	armchair	noun	ADMIN
202510072325117863	công việc thực địa	fieldwork	noun	ADMIN
202510072342433456	Người chơi du thuyền (tham gia thể thao, thích đi du thuyền)	yachtsman	noun	ADMIN
202510072350273787	liên quan tới thủy thủ, hàng hải	nautical	adjective	ADMIN
202510080020587214	lái xe	steered	verb	ADMIN
202510080029257308	có chủ ý	deliberate	adjective	ADMIN
202510080029333672	cân nhắc	deliberate	verb	ADMIN
202510080029488157	chậm rãi, cẩn thận	deliberate	adjective	ADMIN
202510080128158100	Cơn gió mạnh	gales	noun	ADMIN
202510080146119364	Sự tiêu hao	expenditure	noun	ADMIN
202510080148395952	Không thuận lợi	unfavorable	adjective	ADMIN
202510080152527976	Tàu thuyền (chỉ chung)	vessels	noun	ADMIN
202510080253405927	Liên quan tới ngôn ngữ học	linguistic	adjective	ADMIN
202510080255464669	Ngành nghiên cứu	disciplines	noun	ADMIN
202510080628566892	Sự hồi sinh, phục hưng	renaissance	noun	ADMIN
202510080954443789	Hổ phách	amber	noun	ADMIN
202510080957294181	Sự so sánh, sự tương tự	analogy	noun	ADMIN
202510080959483311	bổ nhiệm vào vị trí, ấn định về thời gian	appointed	verb	ADMIN
202510081006013134	hạm đội tàu Tây Ba Nha	armada	noun	ADMIN
202510081018065809	thuộc về tinh thể	crystalline	adjective	ADMIN
202510081020233696	kết thúc bằng, dẫn tới, đạt tới đỉnh điểm bằng	culminated	verb	ADMIN
202510081023433228	sự suy diễn	deduction	noun	ADMIN
202510081026293659	chứng minh, thể hiện, minh hoa	demonstrated	verb	ADMIN
202510081030505846	cách đều nhau	equidistant	adjective	ADMIN
202510081037441038	Quá trình thực hiện thí nghiệm	experimentation	noun	ADMIN
202510081042515788	Người lái tàu	helmsmen	noun	ADMIN
202510081601599613	thông minh, khéo láo, tài tình	ingenious	adjective	ADMIN
202510081603559878	sự hỏi, sự điều tra	inquiry	noun	ADMIN
202510081604501582	can thiệp, xen vào	interfere	verb	ADMIN
202510081606117595	Đá nam châm	lodestone	noun	ADMIN
202510081609245258	lực điện từ	magnetomotive	adjective	ADMIN
202510090131030447	sống lâu hơn ai đó	outlive	verb	ADMIN
202510090132152496	Trải nhựa, đá lên đường để đi, lát đường	paving	verb	ADMIN
202510110202502315	sự biến đổi	transmutation	noun	ADMIN
202510110205417731	thuộc về đi biển	seafaring	adjective	ADMIN
202510110205505932	nghề đi biển thường xuyên	seafaring	noun	ADMIN
202510110208183970	phỏng đoán	speculated	verb	ADMIN
202510110210500809	mê tín dị đoan	superstition	noun	ADMIN
202510110218349689	sự phụ thuộc	reliance	noun	ADMIN
202510110315400828	thuộc tính có các cực của một thứ nào đó	polarity	noun	ADMIN
202510121101402112	Chủ nghĩa thần bí	mysticism	adjective	ADMIN
202510121430306993	đặt ra từ ngữ mới	coined	verb	ADMIN
202510181603071157	khô cằn	arid	adjective	ADMIN
202510181604274088	Sự khẳng định, lời quả quyết	assertion	noun	ADMIN
202510181609250342	Nước Úc	australia	noun	ADMIN
202510181610526062	Người Úc	australian	noun	ADMIN
202510181620152946	Nguyên nhân gây ra đau khổ	bane	noun	ADMIN
202510181650050027	Con bê, con bò non	calf	noun	ADMIN
202510181653147617	phản tác dụng	counter-productive	verb	ADMIN
202510181656016225	Con cháu, hậu duệ, người nối dõi	descendants	noun	ADMIN
202510181702385014	hoang vắng	desolate	adjective	ADMIN
202510181709497171	trở nên tồi tệ hơn (become worse)	deteriorate	verb	ADMIN
202510181712183145	Chó Dingo	dingo	noun	ADMIN
202510181721161541	thuộc về sinh thái	ecological	adjective	ADMIN
202510181733160732	hoang dã (wild, not domestic)	feral	adjective	ADMIN
202510181738026815	Người chăn thả bò/cừu	grazier	noun	ADMIN
202510181805167973	thắt dây	laced	verb	ADMIN
202510181816380600	Kế sinh nhau, nguồn sống, nghề nghiệp	livelihoods	noun	ADMIN
202510181831126546	có liên quan tới động vật có vú (relating to mammals)	mammalian	adjective	ADMIN
202510181837190377	người đang sống, cư trú	occupants	noun	ADMIN
202510181916274130	sự săn mồi, hành vi săn mồi	predation	noun	ADMIN
202510181943153584	chiếm lợi thế	predominate	verb	ADMIN
202510182109117274	đơn thuốc	prescription	noun	ADMIN
202510182119267783	trang trại	ranch	noun	ADMIN
202510182134086945	một cách sẵn sàng	readily	adjective	ADMIN
202510182141357584	đi lang thang	roam	verb	ADMIN
202510182153000681	vùng đất chứa thực vật bụi rậm	scrubland	noun	ADMIN
202510182205532492	Cô độc, một mình, riêng lẻ	solitary	adjective	ADMIN
202510190751561171	sau đó, tiếp theo, hậu quả là	ensuing	adjective	ADMIN
202510190753548440	Thiên niên kỷ	millennia	noun	ADMIN
202510190826295036	Đợt tăng	surge	noun	ADMIN
202510190826393117	tăng nhanh	surge	verb	ADMIN
202510190829488278	khan hiếm, cung < cầu	scarce	adjective	ADMIN
202510190936213573	trở nên tệ nên	deteriorating	verb	ADMIN
202510191408304680	Bị thuyết phục	persuaded	verb	ADMIN
202510191443370719	Chuột túi Wallaby	wallabies	noun	ADMIN
202510192251114118	Nổi tiếng, lừng danh	renowned	adjective	ADMIN
202510192254185274	Người vẽ bản đồ	cartographer	noun	ADMIN
202510200655033863	lành tính, không gây hại	benign	adjective	ADMIN
202510200655556499	Có người thuê, cứ ngụ	tenanted	adjective	ADMIN
202510200702090574	Dòng dõi	lineage	noun	ADMIN
202510200716530713	đang tiến hành	underway	adjective	ADMIN
202510200726446161	tuyệt vọng	desperate	adjective	ADMIN
202510200730422247	cây bạch đằng	eucalypt	noun	ADMIN
202510200830391036	Mỏ chim	beaks	noun	ADMIN
202510200831520126	cùn, không sắc	blunt	adjective	ADMIN
202510200835039262	Sợ lông cứng	bristles	noun	ADMIN
202510200836051707	Loài ăn mật	nectar-feeding	noun	ADMIN
202510200837165530	người du mục	nomadic	noun	ADMIN
202510201838311171	do con người	human-induced	adjective	ADMIN
202510201844140641	có lợi cho	favor	verb	ADMIN
202510201845264294	gâp ra (văn học), kết tủa (hóa học)	precipitated	verb	ADMIN
202510220731244384	công bằng	equitable	adjective	ADMIN
202510220733168315	một cách đầy đủ, thỏa đáng	adequately	adverb	ADMIN
202510220734353081	thay thế	substitute	verb	ADMIN
202510220908461678	một trận đấu	bouts	noun	ADMIN
202510220909019502	một cơn bệnh/cảm xúc ngắn	bouts	noun	ADMIN
202510220915033390	cardio (tim) vascular (mạch máu)	cardiovascular	adjective	ADMIN
202510220916132573	nắm, siết chặt	clench	verb	ADMIN
202510220917388715	bồi thường	compensate	verb	ADMIN
202510221156575629	sự lây lan	contagion	noun	ADMIN
202510221208244017	sự xấu đi, sự xuống cấp	deterioration	noun	ADMIN
202510221337578513	Khoa học nghiên cứu hành vi động vật	ethology	noun	ADMIN
202510221341156225	Ống eustachian (nối vòm họng với tai giữa)	eustachian	noun	ADMIN
202510221342071686	Hành động thở ra	exhalation	noun	ADMIN
202510221344118758	Thuộc về thai nhi	fetal	adjective	ADMIN
202510221345571918	Sự há miệng, sự mở to	gape	noun	ADMIN
202510221346050332	Há miệng, mở to	gape	verb	ADMIN
202510221348462639	Ngáp nửa chừng	half-yawns	noun	ADMIN
202510221353160756	sự tất yếu, không thể tránh khỏi	inevitability	noun	ADMIN
202510221354261548	Hành động hít vào	inhalation	noun	ADMIN
202510221412569020	Không thay đổi, bất biến	invariant	adjective	ADMIN
202510221413335978	Sự bất biến, sự không thay đổi	invariant	noun	ADMIN
202510221417293322	diễn tập (quân đội)	maneuvers	noun	ADMIN
202510221418586435	động tác, thao tác khéo léo	maneuvers	verb	ADMIN
202510221421327976	đang trong lúc ngáp	mid-yawn	adjective	ADMIN
202510221423017001	Ưu điểm, giá trị thực của ai đó	merits	noun	ADMIN
202510221426413286	thuộc về mũi	nasal	adjective	ADMIN
202510221430233281	lỗ mũi	nostrils	noun	ADMIN
202510221439214011	sự khởi đầu	onset	noun	ADMIN
202510221458581380	véo, cấu, bóp nhẹ	pinch	verb	ADMIN
202510221459259174	một nhúm (muối, đường)	pinch	noun	ADMIN
202510221501235288	độc đáo, lập dị, kỳ quặc	quirky	adjective	ADMIN
202510221504207335	giống với, có nét giống	resembles	verb	ADMIN
202510221527333808	chảy nước miếng, tiết nước bọt	salivates	verb	ADMIN
202510221528582218	rập khuân	stereotyped	adjective	ADMIN
202510221624339458	Sự khuân mẫu	stereotype	noun	ADMIN
202510221652348839	kìm hãm, làm ngột ngạt, dập tắt (ý tưởng)	stifled	verb	ADMIN
202510230812413990	tình cảm, yêu mến	fond	verb	ADMIN
202510231816341400	có tác dụng trị liệu	therapeutic	adjective	ADMIN
202510231820536678	lớp phủ mỏng (nghề mộc)	veneer	noun	ADMIN
202510231844585410	ấn xuống (ấn nút)	depress	verb	ADMIN
202510231943091460	vẽ biểu đồ, lập biểu đồ	chart	verb	ADMIN
202510232003104930	sự mệt mỏi	fatigue	noun	ADMIN
202510232004318996	miễn cưỡng	reluctant	adjective	ADMIN
202510232006129700	thai nhi (Anh - Anh)	foetuses	noun	ADMIN
202510232007599099	Không đủ	inadequate	adjective	ADMIN
202510240856200131	khả thi	viable	adjective	ADMIN
202510240859022140	Sự nổi tiếng	renown	noun	ADMIN
202510240900114912	màu mỡ, phì nhiêu	fertile	adjective	ADMIN
202510240902001119	quan trọng nhất, chủ yếu	prime	adjective	ADMIN
202510240903154178	dễ bị, có xu hướng bị	prone	adjective	ADMIN
202510240906341731	Các nhà chức trách	officials	noun	ADMIN
202510240907195047	xử lý, ứng phó, giải quyết	address	verb	ADMIN
202510241026527451	bất kể, bất chấp, không phân biệt	irrespective	adverb	ADMIN
202510241034119055	năng lực, khả năng, trình độ	competence	noun	ADMIN
202510241233184070	Các ưu đãi, phần thưởng về vật chất/phi vật chất	incentives	noun	ADMIN
202510241236386429	sự thiếu hụt	deficiency	noun	ADMIN
202510241238418296	Thuộc về hành chính, quản lý, điều hành	administrative	adjective	ADMIN
202510241240197651	có hại cho	detrimental	adjective	ADMIN
202510241242135884	chịu trách nhiệm	accountable	adjective	ADMIN
202510241628174497	tiết lộ	disclose	verb	ADMIN
202510241629467202	tính trong suốt (vật lý), tính minh bạch (pháp lý)	transparency	adjective	ADMIN
202510241632093102	sức khỏe, hạnh phúc của ai đó	welfare	noun	ADMIN
202510241632217595	trợ cấp xã hội, phúc lợi	welfare	noun	ADMIN
202510241634230556	đặt vấn đề	posing	verb	ADMIN
202510241713091105	tức giận, bực bội do bị đối xử bất công	resent	verb	ADMIN
202510241715440922	ôm ai đó, tiếp nhận	embrace	verb	ADMIN
202510241718106566	bình thường, tầm thường (mang tính chê bai)	mediocre	adjective	ADMIN
202510241722081727	sự giàu có, sung túc, thịnh vượng	affluence	noun	ADMIN
202510241726503331	rất nhiều (số lượng)	numerous	adjective	ADMIN
202510241805099450	ưu điểm, điểm đáng khen	merit	noun	ADMIN
202510241826232750	thư giãn, xả stress	unwind	verb	ADMIN
202510241827215427	sự an ủi, niềm khuây khỏa	solace	noun	ADMIN
202510241829111629	sự bình yên, sự tĩnh lặng	serenity	noun	ADMIN
202510241834196249	đáng chú ý, danh tiếng	notable	adjective	ADMIN
202510242029256836	Sự bình đẳng	equity	noun	ADMIN
202510242054432355	duy trì, hỗ trợ	upholding	verb	ADMIN
202510250926599625	làm giảm bớt, làm nhẹ đi	alleviates	verb	ADMIN
202510250932567028	mang tính tập thể, cùng nhau	collective	adjective	ADMIN
202510251432148103	những người ủng hộ	advocates	noun	ADMIN
202510251432228168	ủng hộ	advocates	verb	ADMIN
202510251433582123	đấu tranh, tranh luận	contend	verb	ADMIN
202510251438063299	vốn có, gắn liền với	inherent	adjective	ADMIN
202510251441350269	nuôi dưỡng, chăm sóc, phát triển	nurture	verb	ADMIN
202510251448589913	đi lại (giữa hai nơi)	commute	verb	ADMIN
202510251506267609	quá mức	undue	adjective	ADMIN
202510251508399742	sức ép, căng thẳng	strain	noun	ADMIN
202510251509017302	làm căng, căng cơ, làm rạn nứt	strain	verb	ADMIN
202510251511364199	chuyển hướng, lệch hướng	diverting	verb	ADMIN
202510251558222643	trợ cấp, hỗ trợ	subsidized	verb	ADMIN
202510251603242845	trong khi (while)	whilst	adverb	ADMIN
202510280911360059	thay thế	superseded	verb	ADMIN
202510281148091042	rõ ràng, hiển nhiên (tiêu cực)	glaring	adjective	ADMIN
202510281158105239	sử dụng, nắm giữ (quyền lực)	wielded	verb	ADMIN
202510281210332136	Khoảng cách (giữa ý tưởng, tình huống giữa hai bên)	gulf	noun	ADMIN
202510281216341266	Sự hợp lệ (danh từ của valid - adj)	validity	noun	ADMIN
202510281226352682	đã nghĩ ra, đã hình dung ra	conceived	verb	ADMIN
202510281720240725	mưu mô, thủ đoạn, thao túng (chính trị), điều kiển (xe)	maneuvering	verb	ADMIN
202510281722011503	sự độc quyền, sự độc chiếm	monopoly	noun	ADMIN
202510281732483375	các giám đốc điều hành	executives	noun	ADMIN
202510281736373250	thông đồng	colluded	verb	ADMIN
202510281813073045	mối thù truyền kiếp	vendetta	noun	ADMIN
202510290026552289	Những vết phát ban	rashes	noun	ADMIN
202510290027514594	Sưng tấy	swelling	noun	ADMIN
202510291156566909	co lại, nhăn nheo, héo úa	shriveled	adjective	ADMIN
202510291214406480	Lúa mạch	barley	noun	ADMIN
202510291230202916	Được cấp bằng sáng chế	patented	verb	ADMIN
202510291530385905	tình cờ, vô tình	inadvertently	adverb	ADMIN
202510291531429758	tạo điều kiện để	facilitating	verb	ADMIN
202510300611405435	che giấu	conceals	verb	ADMIN
202510300630579627	được thỏa mãn, no nê	satiated	verb	ADMIN
202510300631496349	lượng tiêu thụ	intake	noun	ADMIN
202510300637332139	thế cân bằng	equilibrium	noun	ADMIN
202510300639107525	sự thỏa hiệp	compromises	noun	ADMIN
202510300656325086	thấy thú vị vì tính bất thường, bí ẩn	intriguing	adjective	ADMIN
202510300658076480	Các nhà thực vật học	botanists	noun	ADMIN
202510300659006512	Các nhà côn trùng học	entomologists	noun	ADMIN
202510301052275362	kiếm ăn cố định	trap-lining	noun	ADMIN
202510301054579751	sự phân phát	dispersal	noun	ADMIN
202510301057090745	vùng, diện tích đất (đã được đo đạc để sử dụng)	tracts	noun	ADMIN
\.


--
-- PostgreSQL database dump complete
--

\unrestrict yOYUAQAjwa3mT7u6M5ngWhJlaNnwWKPaOhbxkY1uKlwa3Iw5hn6uzINZCt2JeOV

