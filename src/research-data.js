export const siteMeta = {
  title: '11月里约资源调研',
  subtitle: '2026年11月里约活动、体育与演艺IP、传播资源及项目场地资料库',
  windowStart: '2026-11-01',
  windowEnd: '2026-11-30',
  checkedAt: '2026-07-29'
};

export const moduleSummaries = [
  { id: 'events', title: '音乐节与本地庆典', description: '找出11月真实发生、值得借势的城市文化节点。' },
  { id: 'ips', title: '体育与演艺大IP', description: '判断可合作、可包场、可内容共创的头部资源。' },
  { id: 'media', title: '媒体与Content Creator', description: '主流、行业与创作者三条传播线分开配置。' },
  { id: 'venues', title: '项目选地', description: '按户外、室内、沙滩三种场景筛选700人承载方案。' }
];

const S = (label, url, claim = '主体与公开信息') => ({ label, url, claim });
const item = (category, subcategory, id, name, config) => ({
  id, name, category, subcategory,
  dateStatus: 'pending_announcement',
  dateStart: null,
  dateEnd: null,
  location: 'Rio de Janeiro',
  influence: { level: '中', score: 3, basis: '公开渠道与行业辨识度的定性判断' },
  relevance: '可作为本地借势或项目资源候选。',
  activation: '需与资源方确认合作权益。',
  risks: '档期、报价、排他和内容授权均需采购前书面核验。',
  recommendation: 2,
  decision: '纳入备选',
  checkedAt: '2026-07-28',
  tags: [],
  ...config
});

const festival = (id, name, c) => item('festival', c.subcategory || 'local_celebration', id, name, c);
const ip = (id, name, c) => item('ip', c.subcategory || 'entertainment_ip', id, name, c);
const media = (id, name, subcategory, c) => item('media', subcategory, id, name, c);
const creator = (id, name, c) => item('creator', 'creator', id, name, c);
const venue = (id, name, subcategory, c) => item('venue', subcategory, id, name, c);

const introductions = {
  'rock-the-mountain': 'Rock The Mountain 是里约州山地举行的大型户外音乐节，横跨两个周末并设置多舞台演出。它连接年轻、户外与可持续生活方式人群，适合SUV内容和小规模车主体验借势。',
  'mondial-biere': 'Mondial de La Bière 是里约港区具有规模的精酿啤酒与音乐生活方式活动，聚集大量品牌和成年消费者。它适合欢迎夜、餐饮体验及城市夜生活内容，但必须严格控制酒驾风险。',
  'carioca-matsuri': 'Carioca Matsuri 是里约具有代表性的亚洲文化节，集合美食、表演、动漫和家庭体验。其跨文化属性能自然连接中国品牌与巴西公众，适合开展文化共创和家庭型用户活动。',
  turandot: '里约市立剧院的《图兰朵》百年纪念制作，是2026演出季的重要歌剧项目。中国题材与巴西顶级文化场馆的结合具有高端传播价值，适合领导和VIP分组观演。',
  'mariah-christmas': 'Mariah Carey 圣诞主题演出由全球头部歌手领衔，在里约大型场馆户外区举行。它具备强大众话题与国际传播能力，可作为同期城市热度参照或高预算联动资源。',
  'classicos-brasil': 'Clássicos do Brasil 是集中呈现巴西经典音乐与代表性艺人的演出品牌，具有本地文化辨识度。它适合把全球用户节与巴西音乐记忆连接起来，形成欢迎演出或内容合作。',
  'novembro-negro': 'Novembro Negro 是里约在黑人意识月开展的一系列公共文化与社会活动，覆盖历史、艺术和社区议题。它体现城市文化的重要底色，适合做尊重本地语境的文化参访与内容策划。',
  'live-21k': 'LIVE!21K XP Rio 是面向城市跑者的半程马拉松活动，利用里约滨海道路和大众运动氛围形成参与感。它适合小规模跑团、健康生活方式内容和车队保障场景。',
  'fla-run': 'FLA RUN 是弗拉门戈俱乐部延伸出的球迷路跑活动，把足球身份与大众健身结合。其本地球迷号召力适合用户跑团和社群内容，但需与俱乐部权益方正式合作。',
  'ssl-gold-cup': 'SSL Gold Cup 是以国家队为单位的国际帆船赛事，里约湾和Marina da Glória提供鲜明城市画面。它能连接全球用户、海洋运动和国际竞赛叙事，是高价值滨海借势资源。',
  'roxy-dinner-show': 'Roxy Dinner Show 是科帕卡巴纳的巴西文化餐秀，将餐饮、音乐、舞蹈与舞台制作集中在同一空间。其容量与700人需求高度匹配，适合作为欢迎或闭幕晚宴资源。',
  'carnaval-experience': 'Carnaval Experience 依托Grande Rio桑巴学校提供幕后参访、服装和舞蹈体验。它让非狂欢节季节的国际来宾仍能接触里约核心文化，适合分组沉浸和内容共创。',
  botafogo: 'Botafogo 是里约传统足球俱乐部之一，拥有鲜明城市身份、职业赛事和稳定球迷社群。其比赛、训练基地与俱乐部内容可用于足球体验和本地传播，但赛程与商业权益需前置确认。',
  flamengo: 'Flamengo 是巴西影响力最强的综合体育俱乐部之一，以庞大足球球迷基础连接全国大众。它可带来顶级本地声量和社群参与，但合作预算、排他及赛事版权门槛较高。',
  fluminense: 'Fluminense 是里约历史悠久的传统足球俱乐部，兼具竞技成绩、城市文化和马拉卡纳叙事。它适合俱乐部参访、球迷互动及品牌内容合作，是高辨识度体育资源。',
  vasco: 'Vasco da Gama 是具有深厚历史和社会文化影响力的里约足球俱乐部，球迷身份鲜明。其航海传统与全球用户概念具有叙事连接点，可探索比赛、基地或社群合作。',
  'nilton-santos': 'Estádio Nilton Santos 是里约重要体育与大型演出场馆，也是Botafogo主场。场馆接管可同时承载舞台、看台和品牌体验，但对700人项目可能超配并受赛事演出档期限制。',
  'theatro-municipal-ip': 'Theatro Municipal do Rio 是巴西最具代表性的歌剧、芭蕾和古典音乐场馆之一，建筑本身也是城市地标。它适合高端文化合作、VIP接待和国际传播画面。',
  futevolei: '里约州足排球联合会代表这项诞生于巴西海滩文化的标志性运动资源。足排球兼具足球、沙滩和参与感，适合用户挑战、运动员教学和海岸内容共创。',
  g1: 'g1及g1 Rio 是Globo体系的重要综合新闻与地方资讯平台，覆盖全国和里约大众。它适合发布城市活动、品牌动态及现场新闻内容，是主流传播的基础资源。',
  'o-globo': 'O Globo 是总部位于里约的巴西主流新闻品牌，在城市公共议题和全国传播中具有较高影响力。它适合高管采访、城市议题和重大活动报道。',
  'bandnews-rio': 'BandNews FM Rio 是里约本地即时新闻与广播资源，兼具通勤场景和城市事件响应速度。它适合活动预热、现场连线和高管访谈，能够强化本地到场信息。',
  folha: 'Folha de S.Paulo 是巴西全国性主流新闻媒体，覆盖政治、经济、文化与消费议题。虽然总部不在里约，但其全国影响力适合承接品牌战略和中巴交流层面的报道。',
  estadao: 'Estadão 是巴西历史悠久的全国性主流媒体，在商业、产业和公共事务领域具有影响力。它适合高管观点、汽车产业和国际合作议题的深度传播。',
  uol: 'UOL 是巴西大型互联网门户和内容平台，覆盖新闻、体育、娱乐及消费人群。其多频道能力适合把用户节内容分发到大众、体育和汽车等不同兴趣场景。',
  'veja-rio': 'VEJA RIO 聚焦里约城市生活、餐饮、文化和活动指南，是本地消费与生活方式的重要参考。它适合场地、城市路线和用户体验内容的精准触达。',
  'diario-rio': 'Diário do Rio 是专注里约城市新闻、公共生活和本地活动的数字媒体。其地域聚焦度适合活动预告、城市合作和现场资讯，是本地传播补充资源。',
  'o-dia': 'O Dia 是面向里约大众读者的本地新闻品牌，覆盖城市、体育、娱乐和民生内容。它适合扩大活动在普通市民和球迷群体中的可见度。',
  autoesporte: 'Autoesporte 是Globo体系的巴西头部汽车内容品牌，覆盖电视、网站和数字平台。它适合新车试驾、技术内容和高管采访，是汽车媒体合作的优先资源。',
  'quatro-rodas': 'Quatro Rodas 是巴西历史悠久的汽车测试与购车决策媒体，在专业评测和消费者信任方面具有积累。它适合深度试驾、技术拆解和产品长期内容。',
  'motor1-brasil': 'Motor1.com Brasil 是连接巴西与全球网络的汽车资讯平台，兼顾新闻、评测和购车指南。它能把里约现场内容扩散到拉美及国际汽车受众。',
  'noticias-auto': 'Notícias Automotivas 是聚焦新车、价格和消费搜索的巴西汽车垂直网站。它适合车型信息、试驾和长期搜索内容，为购车人群提供持续可见度。',
  'auto-plus': 'Auto+ 是覆盖电视、流媒体、网站和社交平台的巴西汽车节目品牌。其视频制作能力适合现场节目、主持人试驾和直播型合作。',
  flatout: 'FlatOut Brasil 聚焦汽车文化、技术和驾驶体验，在发烧友群体中具有专业辨识度。它适合越野、底盘、品牌历史和长视频等深度内容。',
  autodata: 'AutoData 是巴西汽车产业B2B新闻、杂志与行业活动平台，连接车企、经销商和供应链。它适合高管专访、产业圆桌及拉美商业议题传播。',
  autocosmos: 'Autocosmos 是覆盖多个西语拉美市场的汽车内容和购车平台。它能把里约活动素材转化为多国本地化内容，是区域传播的重要资源。',
  acelerados: 'Acelerados 是由赛车手和汽车主持人组成的巴西头部汽车娱乐内容品牌，兼具专业驾驶和大众娱乐。它适合性能挑战、特别节目和用户现场互动。',
  'lucas-fontana': 'Lucas Fontana及AutoSuper 面向年轻汽车受众制作改装、性能和挑战内容，节奏鲜明且娱乐性强。它适合SUV场景挑战、短视频和现场主持合作。',
  'juliano-barata': 'Juliano Barata 是FlatOut体系的重要汽车文化与技术内容人物，擅长长内容和专业解析。其受众重视驾驶和机械细节，适合深度试驾、播客与技术圆桌。',
  'maria-clara': 'Maria Clara Exposito 是来自里约州的年轻女性汽车与改装创作者，内容连接车库文化和短视频受众。她适合女性车主、改装探访和本地年轻人共创。',
  'carioca-nomundo': 'Carioca NoMundo 由里约出身的Jayme Drummond运营，聚焦高端旅行、航空和酒店体验。它适合讲述国际用户从抵达到城市探索的完整旅程。',
  'mundo-sem-fim': 'Mundo Sem Fim 以跨文化旅行和长期在路上的真实记录获得巴西观众关注。其长视频叙事适合海外车主故事、里约周边公路旅行和多集纪录内容。',
  'giro-carioca': 'Giro da Carioca 聚焦里约地标、社区、美食和城市路线，是具有在地视角的生活方式账号。它适合活动倒计时、路线推荐和现场探访内容。',
  carioquess: 'Carioquess 关注里约旅游、城市生活和本地活动信息，以实用指南连接到访者与居民。它适合地标打卡、城市路线和活动指南型合作。',
  cazetv: 'CazéTV及Casimiro Miguel 是巴西年轻体育观众中极具影响力的直播内容IP，并具有鲜明里约身份。它适合足球、幽默、直播和用户互动，但版权与排他成本高。',
  futparodias: 'FutParódias 把足球、音乐改编和喜剧结合成高传播力内容，在巴西球迷中辨识度突出。它适合主题曲、球迷挑战和舞台共创，但需逐项解决音乐版权。',
  'gabriel-medina': 'Gabriel Medina 是全球知名的巴西冲浪运动员，兼具竞技成就和海岸生活方式影响力。其形象适合海滩、公路和SUV户外内容，但需核验代言冲突。',
  'pedro-sampaio': 'Pedro Sampaio 是来自里约的DJ、歌手和制作人，在巴西及拉美年轻受众中具有影响力。其音乐和舞蹈属性适合舞台演出、声音资产及短视频挑战。',
  'samanta-alves': 'Samanta Alves 以里约地标和passinho舞蹈内容形成鲜明的本地青年形象。她适合把街区、舞蹈和用户参与结合成城市短视频内容。',
  marina: 'Marina da Glória 是瓜纳巴拉湾边的标志性滨海活动场地，兼具国际帆船和大型音乐活动经验。它提供强里约视觉，但11月同期活动可能带来档期冲突。',
  jockey: 'Jockey Club Brasileiro 位于Gávea，拥有大草坪、赛马传统和山景城市画面。其空间适合700人、车阵、舞台和试乘体验，是户外主场优选。',
  'parque-olimpico': 'Parque Olímpico da Barra 是里约奥运遗产和成熟大型活动区域，拥有大尺度硬地及交通集散能力。它适合车阵、试驾和主舞台等功能型车主节场景。',
  'aterro-flamengo': 'Aterro do Flamengo 是里约标志性滨海公园和大众运动动线，城市画面突出但公共属性强。它更适合跑团、车队路线和拍摄，不宜作为封闭主场。',
  'parque-lage': 'Parque Lage 位于基督像山脚，历史建筑、庭院与花园构成国际辨识度很高的文化场景。它适合VIP早餐、艺术导览和品牌影像，不适合700人主活动。',
  riocentro: 'Riocentro 是里约规模与后勤能力最完整的会展综合体之一，拥有展馆、会议中心、酒店和车辆进场条件。它是700人室内主会及雨备的优先选择。',
  'roxy-venue': 'Roxy Dinner Show 位于科帕卡巴纳，官方资料显示其桌椅容量与700人需求精准匹配。餐饮和巴西文化演出一体化，使其成为大型欢迎或闭幕晚宴优选。',
  'farmasi-arena': 'Farmasi Arena 是里约大型室内体育与演艺场馆，具备国际演出级舞台和观众服务能力。它可承载高规格开幕或发布，但对700人项目明显超配。',
  'pier-maua': 'Pier Mauá 仓库群位于里约历史港区，兼具工业空间、城市更新和大型展会氛围。它适合汽车展陈、发布和夜间社交，但需核验各仓库条件。',
  'windsor-barra': 'Windsor Barra Convention Center 将大型会议、住宿、餐饮和安保集中在同一酒店体系。它适合700人主会和国际团队接待，是执行风险较低的会议型方案。',
  'copacabana-palace': 'Copacabana Palace 是里约国际知名的历史酒店地标，拥有高端宴会和媒体接待能力。它适合领导、VIP晚宴和红毯采访，但成本和车辆展示空间受限。',
  'copacabana-beach': 'Copacabana Beach 是全球辨识度最高的里约海滩地标之一，可产生强城市识别和传播画面。它适合轻量日出仪式与内容拍摄，不建议作为700人封闭主场。',
  'ipanema-beach': 'Ipanema与Arpoador 以日落、冲浪和生活方式闻名，是里约高端海岸形象的重要场景。它适合小规模日落和运动内容，但高峰时段拥挤。',
  'barra-beach': 'Barra da Tijuca Beach 海岸线较长，并与Barra会展、酒店和大型活动区域相邻。它比核心城区海滩更适合700人分区运动和主会场联动。',
  'recreio-beach': 'Recreio dos Bandeirantes Beach 相对开阔且运动属性突出，可用于冲浪、沙滩活动和海岸内容。其交通距离和保障成本较高，适合作为功能型备选。'
};

const social = (platforms) => ({ checkedAt: '2026-07-29', platforms });
const verified = (url, display, raw) => ({ status: 'verified', url, display, raw });
const notPublic = (url) => ({ status: 'not_public', ...(url ? { url } : {}) });
const notFound = () => ({ status: 'not_found' });
const socialReachById = {
  acelerados: social({
    youtube: verified('https://www.youtube.com/@Acelerados', '203万', 'チャンネル登録者数 203万人'),
    instagram: verified('https://www.instagram.com/acelerados/', '98.3万', '982843 followers'),
    facebook: notPublic('https://www.facebook.com/acelerados'),
    tiktok: notPublic('https://www.tiktok.com/@acelerados')
  }),
  'lucas-fontana': social({
    youtube: verified('https://www.youtube.com/@LucasFontanaAS', '42.9万', 'チャンネル登録者数 42.9万人'),
    instagram: notPublic('https://www.instagram.com/lucas_lmf/'),
    facebook: notFound(),
    tiktok: notPublic('https://www.tiktok.com/@lucas_lmf')
  }),
  'juliano-barata': social({
    youtube: verified('https://www.youtube.com/@FlatOutBrasil', '44.2万', 'チャンネル登録者数 44.2万人'),
    instagram: verified('https://www.instagram.com/julianobarata/', '10.4万', '103868 followers'),
    facebook: notPublic('https://www.facebook.com/julianobarata'),
    tiktok: notFound()
  }),
  'maria-clara': social({
    youtube: notFound(),
    instagram: notPublic('https://www.instagram.com/mariaclaraexposito/'),
    facebook: notFound(),
    tiktok: notFound()
  }),
  'carioca-nomundo': social({
    youtube: verified('https://www.youtube.com/@cariocanomundo', '93.8万', 'チャンネル登録者数 93.8万人'),
    instagram: notFound(),
    facebook: notFound(),
    tiktok: notFound()
  }),
  'mundo-sem-fim': social({
    youtube: verified('https://www.youtube.com/@MundoSemFim', '195万', 'チャンネル登録者数 195万人'),
    instagram: verified('https://www.instagram.com/mundosf/', '54.5万', '544621 followers'),
    facebook: notPublic('https://www.facebook.com/mundosemfimoficial/'),
    tiktok: notFound()
  }),
  'giro-carioca': social({
    youtube: notFound(),
    instagram: verified('https://www.instagram.com/girodacarioca/', '57.4万', '573875 followers'),
    facebook: notFound(),
    tiktok: notFound()
  }),
  carioquess: social({
    youtube: notFound(),
    instagram: verified('https://www.instagram.com/carioquess/', '10.3万', '103246 followers'),
    facebook: notFound(),
    tiktok: notFound()
  }),
  cazetv: social({
    youtube: verified('https://www.youtube.com/@CazeTV', '4,120万', 'チャンネル登録者数 4120万人'),
    instagram: verified('https://www.instagram.com/cazetv/', '2,279万', '22792846 followers'),
    facebook: notPublic('https://www.facebook.com/cazetv'),
    tiktok: notPublic('https://www.tiktok.com/@cazetv')
  }),
  futparodias: social({
    youtube: verified('https://www.youtube.com/futparodias', '1,150万', 'チャンネル登録者数 1150万人'),
    instagram: verified('https://www.instagram.com/futparodias/', '219万', '2193944 followers'),
    facebook: notPublic('https://www.facebook.com/FutParodias'),
    tiktok: notPublic('https://www.tiktok.com/@futparodias')
  }),
  'gabriel-medina': social({
    youtube: verified('https://www.youtube.com/@GabrielMedina10', '7.71万', 'チャンネル登録者数 7.71万人'),
    instagram: notPublic('https://www.instagram.com/gabrielmedina/'),
    facebook: notPublic('https://www.facebook.com/gabrielmedina'),
    tiktok: notPublic('https://www.tiktok.com/@gabrielmedina')
  }),
  'pedro-sampaio': social({
    youtube: verified('https://www.youtube.com/@DJPEDROSAMPAIO', '540万', 'チャンネル登録者数 540万人'),
    instagram: verified('https://www.instagram.com/pedrosampaio/', '765万', '7645930 followers'),
    facebook: notPublic('https://www.facebook.com/djpedrosampaio'),
    tiktok: notPublic('https://www.tiktok.com/@pedrosampaio')
  }),
  'samanta-alves': social({
    youtube: notFound(),
    instagram: verified('https://www.instagram.com/samantaalves/', '783', '783 followers'),
    facebook: notFound(),
    tiktok: notFound()
  }),
  'ssl-gold-cup': social({
    youtube: verified('https://www.youtube.com/@Starsailors', '9,970', 'チャンネル登録者数 9970人'),
    instagram: notPublic('https://www.instagram.com/starsailorsleague/'),
    facebook: notPublic('https://www.facebook.com/StarSailorsLeague'),
    tiktok: notFound()
  }),
  'roxy-dinner-show': social({
    youtube: verified('https://www.youtube.com/@RoxyDinnerShow', '92', 'チャンネル登録者数 92人'),
    instagram: notPublic('https://www.instagram.com/roxydinnershow/'),
    facebook: notFound(),
    tiktok: notFound()
  }),
  'carnaval-experience': social({
    youtube: verified('https://www.youtube.com/@carnaval_experience', '189', 'チャンネル登録者数 189人'),
    instagram: verified('https://www.instagram.com/carnaval_experience/', '1.57万', '15682 followers'),
    facebook: notPublic('https://www.facebook.com/carnavalexperience'),
    tiktok: notPublic('https://www.tiktok.com/@carnavalexperience')
  }),
  botafogo: social({
    youtube: verified('https://www.youtube.com/@BotafogoTV', '69.8万', 'チャンネル登録者数 69.8万人'),
    instagram: notPublic('https://www.instagram.com/botafogo/'),
    facebook: notPublic('https://www.facebook.com/Botafogo'),
    tiktok: notPublic('https://www.tiktok.com/@botafogo')
  }),
  flamengo: social({
    youtube: verified('https://www.youtube.com/user/flamengo', '826万', 'チャンネル登録者数 826万人'),
    instagram: verified('https://www.instagram.com/flamengo/', '2,501万', '25005360 followers'),
    facebook: notPublic('https://www.facebook.com/FlamengoOficial'),
    tiktok: notPublic('https://www.tiktok.com/@flamengo')
  }),
  fluminense: social({
    youtube: verified('https://www.youtube.com/fluminensefc', '93.8万', 'チャンネル登録者数 93.8万人'),
    instagram: notPublic('https://www.instagram.com/fluminensefc/'),
    facebook: notPublic('https://www.facebook.com/FluminenseFC/'),
    tiktok: notFound()
  }),
  vasco: social({
    youtube: verified('https://www.youtube.com/vasco', '160万', 'チャンネル登録者数 160万人'),
    instagram: notPublic('https://www.instagram.com/vascodagama/'),
    facebook: notPublic('https://www.facebook.com/vascodagama'),
    tiktok: notPublic('https://www.tiktok.com/@vasco')
  }),
  'nilton-santos': social({
    youtube: notFound(),
    instagram: notPublic('https://www.instagram.com/estniltonsantos/'),
    facebook: notFound(),
    tiktok: notFound()
  }),
  'theatro-municipal-ip': social({
    youtube: verified('https://www.youtube.com/@MunicipalTheatroRJ', '2,340', 'チャンネル登録者数 2340人'),
    instagram: notPublic('https://www.instagram.com/theatromunicipalrj/'),
    facebook: notPublic('https://www.facebook.com/Theatro.Municipal.3'),
    tiktok: notFound()
  }),
  futevolei: social({ youtube: notFound(), instagram: notFound(), facebook: notFound(), tiktok: notFound() })
};

const researchItemsBase = [
  festival('rock-the-mountain', 'Rock The Mountain 2026', {
    subcategory: 'music_festival', dateStatus: 'confirmed', dateStart: '2026-11-01', dateEnd: '2026-11-08', location: 'Itaipava, Petrópolis',
    influence: { level: '高', score: 5, basis: '6天、2个周末、12个舞台；巴西头部音乐阵容与青年户外人群' }, recommendation: 3, decision: '重点借势',
    relevance: 'SUV、户外探索、年轻用户与可持续叙事高度匹配。', activation: '小规模车主分队、官方接驳、艺人内容或联合路线体验。',
    risks: '不在里约市区；无停车场且依赖官方接驳；未经授权不得做伏击营销。', tags: ['音乐', '户外', '青年'],
    sources: [S('官方FAQ', 'https://www.rockthemountain.com.br/info', '2026日期、交通与现场规则')]
  }),
  festival('mondial-biere', 'Mondial de La Bière 2026', {
    subcategory: 'food_lifestyle', dateStatus: 'confirmed', dateStart: '2026-11-01', dateEnd: '2026-11-01', location: 'Pier Mauá',
    influence: { level: '高', score: 4, basis: '主办方公开称往届逾5万人、约250家酒厂与1500+酒款' }, recommendation: 2, decision: '限量借势',
    relevance: '巴西生活方式、餐饮与港区夜间内容价值高。', activation: '成年用户欢迎夜或VIP体验；统一巴士接驳。', risks: '酒驾与全龄合规风险，不适合作为700人统一主活动。', tags: ['美食', '音乐', '夜生活'],
    sources: [S('官方网站', 'https://www.mondialdelabierebrasil.com/', '活动规模与定位')]
  }),
  festival('carioca-matsuri', 'Carioca Matsuri 2026', {
    subcategory: 'cultural_festival', dateStatus: 'confirmed', dateStart: '2026-11-01', dateEnd: '2026-11-02', location: 'Riocentro',
    influence: { level: '中高', score: 4, basis: '主办方称往届约4.5万人，三天亚洲文化沉浸节' }, recommendation: 3, decision: '建议对接',
    relevance: '适合“里约×亚洲”跨文化内容与家庭型用户体验。', activation: '文化共创、车主路线、Barra区域联合接待。', risks: '11月2日长周末，Riocentro周边酒店、巴士与供应商竞争。', tags: ['亚洲文化', '家庭', '跨文化'],
    sources: [S('官方网站', 'https://cariocamatsuri.com.br/', '2026日期与活动信息')]
  }),
  festival('turandot', '歌剧《图兰朵》百年纪念制作', {
    subcategory: 'performing_arts', dateStatus: 'confirmed', dateStart: '2026-11-13', dateEnd: '2026-11-22', location: 'Theatro Municipal',
    influence: { level: '高', score: 4, basis: '里约市立剧院年度重点制作，7场演出并纪念首演100周年' }, recommendation: 3, decision: 'VIP优选',
    relevance: '“中国题材在巴西舞台”有高端文化与中巴叙事价值。', activation: '领导/VIP分组观演、剧院导览、文化圆桌。', risks: '不承载700人主活动；题材中的西方“中国想象”需文化审校。', tags: ['歌剧', '文化', 'VIP'],
    sources: [S('剧院2026演出季', 'https://theatromunicipal.rj.gov.br/temporada-2026-do-theatro-municipal-do-rio-de-janeiro/', '场次与日期')]
  }),
  festival('mariah-christmas', 'Mariah Carey’s Christmas Time', {
    subcategory: 'concert', dateStatus: 'confirmed', dateStart: '2026-11-21', dateEnd: '2026-11-21', location: 'Farmasi Arena 户外区',
    influence: { level: '极高', score: 5, basis: '全球头部艺人与巴西首次主题圣诞秀' }, recommendation: 2, decision: 'VIP可选',
    relevance: '国际化欢聚与节日季内容价值强。', activation: 'VIP票务、嘉宾奖励或授权后的联名内容。', risks: '演出素材、艺人肖像与品牌联名须单独授权；户外天气及散场压力。', tags: ['国际艺人', '演唱会', 'VIP'],
    sources: [S('Eventim官方票务', 'https://www.eventim.com.br/campaign/mariahcarey', '日期、场地与票务')]
  }),
  festival('classicos-brasil', 'Clássicos do Brasil 2026', {
    subcategory: 'music_festival', dateStatus: 'confirmed', dateStart: '2026-11-28', dateEnd: '2026-11-29', location: 'Marina da Glória',
    influence: { level: '极高', score: 5, basis: 'Maria Bethânia、Alceu Valença、Vanessa da Mata等跨代际巴西头部阵容' }, recommendation: 3, decision: '重点借势',
    relevance: '月底最强巴西音乐文化沉浸资源，适合闭幕体验。', activation: '官方合作、VIP区、车主内容、闭幕夜分流观演。', risks: '与SSL Gold Cup同址同期；空间、出入口和品牌权益须书面确认。', tags: ['巴西音乐', '闭幕', '头部艺人'],
    sources: [S('活动官网', 'https://classicosdobrasilfestival.com.br/rio-de-janeiro/', '阵容、日期与现场权益')]
  }),
  festival('novembro-negro', 'Novembro Negro Rio / 黑人意识月', {
    subcategory: 'civic_culture', dateStatus: 'likely_recurring', dateStart: '2026-11-01', dateEnd: '2026-11-30', location: 'MUHCAB、Pequena África等',
    influence: { level: '高', score: 5, basis: '贯穿11月的官方城市文化议题；11月20日为全国法定假日' }, recommendation: 3, decision: '谨慎共创',
    relevance: '能提供里约黑人文化、桑巴源流与城市历史的深度内容。', activation: '由MUHCAB或本地黑人文化机构主导策展、导览或公益合作。', risks: '2026完整节目待官宣；禁止符号化消费与文化挪用。', tags: ['城市文化', '黑人意识月', '11月20日'],
    sources: [S('里约市政府', 'https://prefeitura.rio/casa-civil/novembro-negro-rio-entra-no-calendario-oficial-da-cidade/', '纳入官方城市日历')]
  }),
  festival('live-21k', 'LIVE!21K XP Rio', {
    subcategory: 'public_sports', dateStatus: 'confirmed', dateStart: '2026-11-15', dateEnd: '2026-11-15', location: 'Aterro do Flamengo',
    influence: { level: '中高', score: 4, basis: '5/10/21公里与儿童跑，多圈层大众参与' }, recommendation: 2, decision: '轻量联动',
    relevance: '可连接健康、用户社群与滨海晨跑内容。', activation: '小规模车主跑团、补给点或观赛内容。', risks: '封路与巴士绕行影响主活动交通，不宜与大团行程硬绑定。', tags: ['跑步', '社群', '健康'],
    sources: [S('Visit Rio', 'https://visitrio.com.br/evento/live21k-xp-rio-de-janeiro-2026/', '日期、地点与赛制')]
  }),
  festival('fla-run', 'FLA RUN 2026 · Etapa II', {
    subcategory: 'public_sports', dateStatus: 'confirmed', dateStart: '2026-11-29', dateEnd: '2026-11-29', location: 'Aterro do Flamengo',
    influence: { level: '中高', score: 4, basis: '弗拉门戈官方大众跑步IP，兼具足球与城市体育人群' }, recommendation: 1, decision: '避冲突为主',
    relevance: '适合足球粉丝与健康社群的轻量内容。', activation: '仅建议媒体观察或少量嘉宾参与。', risks: '与SSL及Clássicos同周末，Glória/Aterro交通压力最高。', tags: ['足球', '跑步', '交通冲突'],
    sources: [S('Visit Rio', 'https://visitrio.com.br/evento/fla-run-2026-etapa-ii/', '日期与地点')]
  }),

  ip('ssl-gold-cup', 'SSL Gold Cup 2026', {
    subcategory: 'sports_ip', dateStatus: 'confirmed', dateStart: '2026-11-18', dateEnd: '2026-11-30', location: 'Marina da Glória / Guanabara Bay',
    influence: { level: '极高', score: 5, basis: '40个国家队、五大洲；World Sailing Special Event' }, recommendation: 3, decision: '第一优先',
    relevance: '全球用户、国际团队、户外运动、科技与可持续主题完全同频。', activation: '官方车队、嘉宾接驳、滨海观赛、帆船体验与内容共创。', risks: '官方渠道起始日期存在18/19日差异；与月底音乐节共享Marina资源。', tags: ['帆船', '全球化', '滨海'],
    sources: [S('World Sailing', 'https://www.sailing.org/2025/09/03/second-edition-of-the-football-world-cup-in-sailing-heads-to-brazil-in-november-2026/', '赛事日期、国家队与定位')]
  }),
  ip('roxy-dinner-show', 'Roxy Dinner Show', {
    dateStatus: 'likely_recurring', location: 'Copacabana', influence: { level: '高', score: 5, basis: '地标级巴西文化晚宴秀；官方场地资料显示桌椅容量恰为700人' }, recommendation: 3, decision: '整场包场首选',
    relevance: '容量与用户节人数精准匹配，可一站式交付餐饮、演出与巴西文化。', activation: '整场包场、品牌化开场、定制主持与多语种服务。', risks: '需确认2026年11月包场档期、菜单、消防、车辆展示与内容授权。', tags: ['700人', '晚宴秀', '包场'],
    sources: [S('Rio Film Commission', 'https://www.riofilmcommission.com/locacoes/roxy-dinner-show/', '1286㎡与700人容量')]
  }),
  ip('carnaval-experience', 'Carnaval Experience × Grande Rio', {
    dateStatus: 'likely_recurring', location: 'Cidade do Samba', influence: { level: '高', score: 4, basis: '由Grande Rio体系提供全年狂欢节后台与桑巴体验' }, recommendation: 3, decision: '定制体验首选',
    relevance: '即使不在狂欢节季，也能提供可信的里约狂欢文化入口。', activation: '700人分批后台参观、桑巴工作坊、服装与鼓队共创。', risks: '正式里约狂欢节不在11月；不能包装成同期Carnaval，只能称定制体验。', tags: ['狂欢节', '桑巴', '定制'],
    sources: [S('官方网站', 'https://www.carnavalexperience.com.br/', '全年体验与Grande Rio关系')]
  }),
  ip('botafogo', 'Botafogo de Futebol e Regatas', {
    subcategory: 'sports_ip', dateStatus: 'pending_announcement', location: 'Estádio Nilton Santos', influence: { level: '极高', score: 5, basis: '里约传统足球豪门与全国球迷基础' }, recommendation: 3, decision: '优先洽谈',
    relevance: '可连接足球、城市身份、球场接管与海外用户。', activation: '主场观赛、传奇球员、训练体验、球场品牌日。', risks: '2026赛历、转播、赞助品类排他和球员肖像权待确认。', tags: ['足球', '球场', '本地豪门'],
    sources: [S('俱乐部官网', 'https://www.botafogo.com.br/', '俱乐部与官方渠道')]
  }),
  ip('flamengo', 'Clube de Regatas do Flamengo', {
    subcategory: 'sports_ip', dateStatus: 'pending_announcement', location: 'Maracanã / Gávea', influence: { level: '极高', score: 5, basis: '巴西最大球迷基础之一，跨足球与多体育项目' }, recommendation: 1, decision: '先审排他',
    relevance: '能够提供最高级别的本地足球关注度。', activation: '如无冲突，可考虑传奇球员、训练基地或粉丝内容。', risks: '汽车品类赞助冲突概率高；必须先做排他核验，避免无效接洽。', tags: ['足球', '超大流量', '排他风险'],
    sources: [S('俱乐部官网', 'https://www.flamengo.com.br/', '俱乐部官方信息')]
  }),
  ip('fluminense', 'Fluminense Football Club', {
    subcategory: 'sports_ip', dateStatus: 'pending_announcement', location: 'Maracanã / Laranjeiras', influence: { level: '高', score: 4, basis: '里约传统豪门与国际赛事辨识度' }, recommendation: 2, decision: '备选洽谈',
    relevance: '适合传统足球文化、青训与俱乐部历史内容。', activation: '主场观赛、训练基地参访、传奇球员互动。', risks: '11月赛历、场地权属和赞助排他待官宣。', tags: ['足球', '传统豪门'],
    sources: [S('俱乐部官网', 'https://www.fluminense.com.br/', '俱乐部官方信息')]
  }),
  ip('vasco', 'CR Vasco da Gama', {
    subcategory: 'sports_ip', dateStatus: 'pending_announcement', location: 'São Januário', influence: { level: '高', score: 4, basis: '里约传统豪门，具有独特社区与历史叙事' }, recommendation: 2, decision: '文化型备选',
    relevance: '可连接足球、移民历史、社区与多元文化。', activation: '球场参访、社区项目、传奇球员或球迷内容。', risks: '赛程、安保、场馆容量限制与赞助权益需确认。', tags: ['足球', '社区', '历史'],
    sources: [S('俱乐部官网', 'https://vasco.com.br/', '俱乐部官方信息')]
  }),
  ip('nilton-santos', 'Estádio Nilton Santos 场馆接管', {
    subcategory: 'venue_ip', dateStatus: 'pending_announcement', location: 'Engenho de Dentro', influence: { level: '高', score: 4, basis: '奥运遗产与大型足球/演出场馆双重属性' }, recommendation: 2, decision: '看档期推进',
    relevance: '适合大型车队入场、球场仪式与700人沉浸式看台体验。', activation: '球场接管、车阵、开幕式或主场观赛。', risks: '大型演出搭拆、草坪保护、车辆承重和邻里噪声限制。', tags: ['体育场', '大型活动', '车阵'],
    sources: [S('场馆官网', 'https://estadiolimpiconiltonsantos.com.br/', '场馆与活动信息')]
  }),
  ip('theatro-municipal-ip', 'Theatro Municipal do Rio', {
    dateStatus: 'confirmed', dateStart: '2026-11-13', dateEnd: '2026-11-22', location: 'Centro', influence: { level: '高', score: 4, basis: '里约标志性文化机构与国家级演艺资源' }, recommendation: 2, decision: '高端文化线',
    relevance: '适合领导层、国际嘉宾与中巴文化对话。', activation: '导览、包区观演、艺术家交流或发布会前奏。', risks: '历史建筑限制多，车辆展示、品牌露出和包场难度高。', tags: ['剧院', '高端', '文化'],
    sources: [S('剧院官网', 'https://theatromunicipal.rj.gov.br/', '机构与演出季')]
  }),
  ip('futevolei', 'Federação de Futevôlei do Estado do Rio de Janeiro', {
    subcategory: 'sports_ip', dateStatus: 'pending_announcement', location: 'Rio beaches', influence: { level: '中高', score: 4, basis: '足排球是里约海滩标志性运动，兼具足球与沙滩视觉' }, recommendation: 3, decision: '沙滩首选IP',
    relevance: '最适合SUV海岸、用户挑战与本地运动文化。', activation: '定制明星赛、车主体验、海滩训练营与短视频。', risks: '海滩许可、天气、潮汐、公共区域围挡与运动员肖像权。', tags: ['足排球', '海滩', '用户参与'],
    sources: [S('州足排球联合会', 'https://fferj.com.br/', '机构与赛事渠道')]
  }),

  media('g1', 'g1 / g1 Rio', 'mainstream_media', { influence: { level: '极高', score: 5, basis: 'Globo新闻生态核心入口与里约本地频道' }, recommendation: 3, decision: '核心公信力', relevance: '国际用户故事、城市与大众新闻。', activation: '编辑采访与Globo Ads付费方案分线推进。', tags: ['全国', '里约', '新闻'], sources: [S('g1 Rio', 'https://g1.globo.com/rj/rio-de-janeiro/', '本地频道')] }),
  media('o-globo', 'O Globo', 'mainstream_media', { influence: { level: '极高', score: 5, basis: '总部位于里约的全国性综合新闻品牌' }, recommendation: 3, decision: '核心公信力', relevance: '城市、商业、国际交流与汽车出海。', activation: '高管专访、里约版专题、摄影故事。', tags: ['全国', '里约', '商业'], sources: [S('官方网站', 'https://oglobo.globo.com/', '媒体品牌')] }),
  media('bandnews-rio', 'BandNews FM Rio', 'mainstream_media', { influence: { level: '高', score: 4, basis: '覆盖广播、视频与里约本地新闻流，并设汽车栏目' }, recommendation: 3, decision: '本地直播优选', relevance: '现场连线、城市交通与智能出行。', activation: '主播访谈、现场连线、播客/短视频。', tags: ['广播', '里约', '汽车'], sources: [S('官方频道', 'https://www.band.com.br/bandnews-fm/rio-de-janeiro', '里约频道与节目')] }),
  media('folha', 'Folha de S.Paulo', 'mainstream_media', { influence: { level: '极高', score: 5, basis: '全国议题设置能力强；官方广告页公开多平台规模' }, recommendation: 2, decision: '全国议题线', relevance: '中国汽车出海、巴西产业与国际用户社区。', activation: '商业记者采访或Estúdio Folha品牌内容。', tags: ['全国', '商业', '产业'], sources: [S('官方广告页', 'https://publicidade.folha.com.br/', '媒体覆盖与合作入口')] }),
  media('estadao', 'Estadão', 'mainstream_media', { influence: { level: '高', score: 4, basis: '商业、产业、科技与汽车报道体系成熟' }, recommendation: 2, decision: '产业深度线', relevance: '拉美战略、高管观点与经销网络。', activation: '专访、Blue Studio内容或论坛圆桌。', tags: ['产业', '高管', '全国'], sources: [S('官方网站', 'https://www.estadao.com.br/', '媒体品牌')] }),
  media('uol', 'UOL', 'mainstream_media', { influence: { level: '极高', score: 5, basis: '全国门户，新闻、汽车、体育、娱乐垂类齐全' }, recommendation: 2, decision: '大众放大', relevance: '把汽车、足球、旅行和娱乐合并扩散。', activation: '原生内容、视频、专题页与频道投放。', tags: ['门户', '全国', '多垂类'], sources: [S('UOL Ads', 'https://ads.uol.com.br/solicitar-plano/', '商业合作入口')] }),
  media('veja-rio', 'VEJA RIO', 'mainstream_media', { influence: { level: '高', score: 4, basis: '里约生活方式与城市活动标志性媒体' }, recommendation: 3, decision: '城市生活首选', relevance: '地标路线、餐饮、文化晚宴与城中盛事。', activation: '体验专题、城市指南、社媒短视频。', tags: ['里约', '生活方式', '活动'], sources: [S('官方网站', 'https://vejario.abril.com.br/', '媒体定位')] }),
  media('diario-rio', 'Diário do Rio', 'mainstream_media', { influence: { level: '中高', score: 4, basis: '里约城市数字新闻，对本地议题响应快' }, recommendation: 2, decision: '本地快速传播', relevance: '开幕、场地、交通、旅游消费与公益。', activation: '记者探访、短视频、活动日历。', tags: ['里约', '数字新闻'], sources: [S('官方网站', 'https://diariodorio.com/', '媒体定位')] }),
  media('o-dia', 'O Dia', 'mainstream_media', { influence: { level: '高', score: 4, basis: '里约州大众报纸与数字媒体品牌' }, recommendation: 2, decision: '大众本地线', relevance: '车主故事、音乐演出和足球嘉宾。', activation: '人物故事、娱乐/体育联动与广告。', tags: ['里约州', '大众'], sources: [S('官方网站', 'https://odia.ig.com.br/', '媒体品牌')] }),

  media('autoesporte', 'Autoesporte', 'industry_media', { influence: { level: '极高', score: 5, basis: 'Globo生态汽车权威品牌；官方称2025年前10月触达6100万人' }, recommendation: 3, decision: '汽车媒体第一优先', relevance: '新车、技术、车主节与道路体验。', activation: '电视/数字专题、试驾与高管专访。', tags: ['汽车', 'Globo', '大众'], sources: [S('Globo Ads', 'https://globoads.globo.com/para-o-seu-negocio/produtos-e-solucoes-globo/autoesporte', '公开触达与产品方案')] }),
  media('quatro-rodas', 'Quatro Rodas', 'industry_media', { influence: { level: '高', score: 5, basis: '巴西历史悠久的测试与购车决策汽车媒体' }, recommendation: 3, decision: '专业背书', relevance: '产品深测、路线试驾与技术拆解。', activation: '编辑试驾、长期测试、圆桌。', tags: ['汽车', '评测', '购车'], sources: [S('官方网站', 'https://quatrorodas.abril.com.br/', '媒体品牌')] }),
  media('motor1-brasil', 'Motor1.com Brasil', 'industry_media', { influence: { level: '高', score: 5, basis: '巴西站连接全球Motor1网络，兼顾车讯与购车指南' }, recommendation: 3, decision: '区域扩散核心', relevance: '可将里约活动扩散至国际汽车网络。', activation: '首试、视频、高管采访与专题。', tags: ['汽车', '全球网络', '视频'], sources: [S('官方广告页', 'https://motor1.uol.com.br/info/advertising/', '商业产品与公开展示量')] }),
  media('noticias-auto', 'Notícias Automotivas', 'industry_media', { influence: { level: '中高', score: 4, basis: '聚焦新车、价格与消费搜索的垂直汽车网站' }, recommendation: 2, decision: '搜索长尾', relevance: '提升购车人群对品牌和车型的可见度。', activation: '上市信息、试驾、车型专题。', tags: ['汽车', '消费', '搜索'], sources: [S('官方网站', 'https://www.noticiasautomotivas.com.br/', '媒体定位')] }),
  media('auto-plus', 'Auto+ / Auto+ TV', 'industry_media', { influence: { level: '高', score: 4, basis: '开放电视、流媒体、网站与社媒多平台汽车节目' }, recommendation: 2, decision: '视频传播', relevance: '现场演播、试驾与长短视频兼容。', activation: '现场节目、主持人试驾、直播或栏目冠名。', tags: ['汽车', '电视', '直播'], sources: [S('官方网站', 'https://www.automaistv.com.br/automaistv/', '节目与平台')] }),
  media('flatout', 'FlatOut Brasil', 'industry_media', { influence: { level: '中高', score: 4, basis: '汽车文化、技术与驾驶体验的资深发烧友媒体' }, recommendation: 2, decision: '深度内容', relevance: '越野、底盘、用户文化与长测。', activation: '技术长视频、播客、branded content。', tags: ['汽车文化', '技术', '长视频'], sources: [S('商业页', 'https://flatout.com.br/anuncie-conosco/', '品牌内容合作')] }),
  media('autodata', 'AutoData', 'industry_media', { influence: { level: '高', score: 4, basis: '巴西汽车产业B2B新闻、杂志与行业活动平台' }, recommendation: 3, decision: '产业圈核心', relevance: '经销商、供应链与拉美汽车商业圈。', activation: '高管专访、论坛演讲、B2B圆桌。', tags: ['B2B', '汽车产业', '经销商'], sources: [S('官方网站', 'https://autodata.com.br/', '媒体与行业平台')] }),
  media('autocosmos', 'Autocosmos', 'industry_media', { influence: { level: '高', score: 5, basis: '覆盖多个西语拉美汽车市场的区域平台' }, recommendation: 3, decision: '西语区域首选', relevance: '一套里约内容可在多个捷途市场本地化。', activation: '多国编辑团、区域试驾与专题页。', tags: ['拉美', '西语', '汽车'], sources: [S('机构介绍', 'https://www.autocosmos.com.co/institucional/nosotros', '区域覆盖')] }),

  creator('acelerados', 'Acelerados', { influence: { level: '极高', score: 5, basis: 'Rubens Barrichello等组成的巴西高辨识度汽车娱乐IP' }, recommendation: 3, decision: '汽车创作者首选', relevance: '专业驾驶、娱乐挑战与车主节特别集。', activation: '赛道/公路挑战、舞台对谈、特别集。', tags: ['汽车', '赛车', 'YouTube'], sources: [S('YouTube频道', 'https://www.youtube.com/@Acelerados', '频道与内容')] }),
  creator('lucas-fontana', 'Lucas Fontana / AutoSuper', { influence: { level: '高', score: 4, basis: '年轻汽车娱乐、改装与挑战内容头部创作者' }, recommendation: 3, decision: '年轻汽车线', relevance: 'SUV性能、城市到户外路线与短视频挑战。', activation: '挑战视频、现场主持、用户共创。', tags: ['汽车', '年轻', '短视频'], sources: [S('官方网站', 'https://lucasfontana.com.br/', '创作者与品牌合作')] }),
  creator('juliano-barata', 'Juliano Barata / FlatOut', { influence: { level: '中高', score: 4, basis: '资深汽车文化与技术内容影响力' }, recommendation: 2, decision: '专业深度线', relevance: '底盘、越野、品牌历史与产品哲学。', activation: '深度试驾、播客、技术圆桌。', tags: ['汽车', '技术', '长内容'], sources: [S('YouTube频道', 'https://www.youtube.com/@FlatOutBrasil', '视频内容')] }),
  creator('maria-clara', 'Maria Clara Exposito', { influence: { level: '中高', score: 4, basis: '里约州年轻女性汽车/改装创作者，公开报道曾出现百万级单条播放' }, recommendation: 2, decision: '多元汽车线', relevance: '女性车主、本地年轻人和改装文化。', activation: '工作坊探访、短视频、女性车主共创。', tags: ['汽车', '女性', '里约州'], sources: [S('Instagram', 'https://www.instagram.com/mariaclaraexposito/', '账号与内容')] }),
  creator('carioca-nomundo', 'Carioca NoMundo / Jayme Drummond', { influence: { level: '高', score: 4, basis: '里约出身的高端旅行、航空、酒店体验创作者' }, recommendation: 3, decision: '旅行体验首选', relevance: '全球用户抵达、酒店与用车全旅程。', activation: 'VIP旅程、机场到城市、road trip系列。', tags: ['旅行', '高端', '里约'], sources: [S('官方网站', 'https://cariocanomundo.com.br/', '定位与过往合作')] }),
  creator('mundo-sem-fim', 'Mundo Sem Fim', { influence: { level: '高', score: 4, basis: '跨文化真实旅行长视频与大众旅行影响力' }, recommendation: 3, decision: '车主故事线', relevance: '海外车主跟拍与里约周边公路旅行。', activation: '多集纪录、用户故事、文化体验。', tags: ['旅行', '长视频', '跨文化'], sources: [S('YouTube频道', 'https://www.youtube.com/@MundoSemFim', '频道与内容')] }),
  creator('giro-carioca', 'Giro da Carioca', { influence: { level: '中', score: 3, basis: '曾入选里约市政府Rio Digital Influencer项目' }, recommendation: 2, decision: '本地微中型', relevance: '地标、社区、美食与城市路线。', activation: '倒计时、路线短视频、现场探访。', tags: ['里约', '旅游', '本地'], sources: [S('Instagram', 'https://www.instagram.com/girodacarioca/', '账号与内容')] }),
  creator('carioquess', 'Carioquess', { influence: { level: '中', score: 3, basis: '里约城市生活与旅游内容，曾获本地旅游项目认证' }, recommendation: 2, decision: '本地微中型', relevance: '活动指南、地标打卡与本地生活。', activation: '城市路线、实时活动内容。', tags: ['里约', '生活方式'], sources: [S('Instagram', 'https://www.instagram.com/carioquess/', '账号与内容')] }),
  creator('cazetv', 'CazéTV / Casimiro Miguel', { influence: { level: '极高', score: 5, basis: '巴西年轻体育大众直播头部IP；Casimiro为里约人' }, recommendation: 3, decision: '顶级传播资源', relevance: '足球、幽默、直播与里约身份高度匹配。', activation: '用户足球赛、车内访谈、红毯直播。', risks: '预算、版权与排他性极高；需把直播权与出席权拆分。', tags: ['足球', '直播', '头部'], sources: [S('YouTube频道', 'https://www.youtube.com/@CazeTV', '频道与内容')] }),
  creator('futparodias', 'FutParódias', { influence: { level: '极高', score: 5, basis: '足球+音乐+幽默的跨平台头部内容IP' }, recommendation: 3, decision: '足球音乐共创', relevance: '同时连接足球与音乐，适合用户节主题内容。', activation: '原创主题曲、球迷挑战、舞台演出。', risks: '音乐改编与商用版权须逐项确认。', tags: ['足球', '音乐', '喜剧'], sources: [S('官方网站', 'https://www.futparodias.com.br/', '团队与内容')] }),
  creator('gabriel-medina', 'Gabriel Medina', { influence: { level: '极高', score: 5, basis: '全球知名巴西冲浪运动员与生活方式影响力' }, recommendation: 2, decision: '海岸运动大使', relevance: '海岸、公路、运动与SUV户外场景。', activation: '海滩挑战、英雄片、VIP互动。', risks: '运动员代言冲突、赛事档期、肖像与出场费需经纪核验。', tags: ['冲浪', '全球', '运动员'], sources: [S('Instagram', 'https://www.instagram.com/gabrielmedina/', '账号与内容')] }),
  creator('pedro-sampaio', 'Pedro Sampaio', { influence: { level: '极高', score: 5, basis: '里约DJ/歌手/制作人，覆盖巴西与拉美年轻受众' }, recommendation: 2, decision: '青年音乐线', relevance: '舞台能量、车辆动态短视频与声音资产。', activation: 'DJ set、声音标识、舞蹈挑战。', risks: '需确认汽车品类冲突及音乐使用权。', tags: ['音乐', '里约', '青年'], sources: [S('Sony Music艺人页', 'https://www.sonymusic.pt/artist/pedro-sampaio/', '艺人影响力与公开播放信息')] }),
  creator('samanta-alves', 'Samanta Alves', { influence: { level: '中高', score: 4, basis: '以里约地标与passinho舞蹈内容建立本地青年辨识度' }, recommendation: 2, decision: '本地青年共创', relevance: '街区、舞蹈与里约青年文化。', activation: '地标舞蹈路线、用户共创短视频。', tags: ['舞蹈', '里约', '青年'], sources: [S('Instagram', 'https://www.instagram.com/samantaalves/', '账号与内容')] }),

  venue('marina', 'Marina da Glória', 'outdoor', { dateStatus: 'confirmed', location: 'Glória', influence: { level: '极高', score: 5, basis: '瓜纳巴拉湾标志性滨海活动场地，11月已有SSL与音乐节' }, recommendation: 2, decision: '借势强／冲突高', relevance: '最强里约滨海视觉与全球帆船借势。', activation: '滨海发布、观赛、晚宴、车辆静展。', risks: '11/18后资源高度拥挤；须核实岸上空间与同期排他。', tags: ['滨海', '地标', '大型活动'], sources: [S('官方网站', 'https://marinadagloria.com.br/', '场地与活动能力')] }),
  venue('jockey', 'Jockey Club Brasileiro', 'outdoor', { dateStatus: 'pending_announcement', location: 'Gávea', influence: { level: '高', score: 5, basis: '城市核心大草坪、赛马与山景地标，适合汽车展示' }, recommendation: 3, decision: '户外主场优选', relevance: '700人、车阵、试乘和舞台可形成完整品牌场景。', activation: '草坪仪式、车阵、赛马文化、晚宴。', risks: '草坪保护、雨备、噪声、赛程与进车路线需技术踏勘。', tags: ['草坪', '汽车展示', '城市地标'], sources: [S('官方网站', 'https://www.jcb.com.br/', '俱乐部与场地')] }),
  venue('parque-olimpico', 'Parque Olímpico da Barra', 'outdoor', { dateStatus: 'pending_announcement', location: 'Barra Olímpica', influence: { level: '高', score: 4, basis: '奥运遗产、大尺度硬地与成熟大型活动区域' }, recommendation: 3, decision: '车主节功能型首选', relevance: '适合车阵、试驾、主舞台及大巴集散。', activation: '汽车体验区、障碍试驾、开幕式。', risks: '11月大型演出搭拆与场地许可；空间过大需控制氛围。', tags: ['奥运遗产', '试驾', '大空间'], sources: [S('里约市政府场地信息', 'https://parqueolimpico.rio/', '场地与活动')] }),
  venue('aterro-flamengo', 'Aterro do Flamengo', 'outdoor', { dateStatus: 'confirmed', location: 'Flamengo / Glória', influence: { level: '高', score: 4, basis: '里约标志性滨海公园与大众体育动线' }, recommendation: 1, decision: '内容点而非主场', relevance: '适合晨跑、车队城市路线与航拍替代镜头。', activation: '小规模跑团、城市路线拍摄。', risks: '公共空间许可与封路难度高；11/15、11/29已有跑步活动。', tags: ['公园', '滨海', '公共空间'], sources: [S('Visit Rio', 'https://visitrio.com.br/', '城市活动与地点信息')] }),
  venue('parque-lage', 'Parque Lage', 'outdoor', { dateStatus: 'likely_recurring', location: 'Jardim Botânico', influence: { level: '高', score: 4, basis: '基督像山脚的历史建筑与花园，国际视觉辨识度高' }, recommendation: 2, decision: '高端小规模', relevance: '适合VIP早餐、艺术内容与领导层活动。', activation: '庭院餐叙、艺术导览、品牌短片。', risks: '不适合700人主活动；历史建筑、游客与车辆进入限制。', tags: ['花园', '文化', 'VIP'], sources: [S('官方机构', 'https://eavparquelage.rj.gov.br/', '场地与机构')] }),

  venue('riocentro', 'Riocentro', 'indoor', { dateStatus: 'confirmed', location: 'Barra Olímpica', influence: { level: '极高', score: 5, basis: '4个展馆、会议中心、演播室与酒店；规模和后勤最完整' }, recommendation: 3, decision: '室内主场第一优先', relevance: '700人主会、车辆入场、分论坛、雨备与媒体中心均可承载。', activation: '主会场、展陈、发布、分组体验。', risks: '空间可能过大；需选择合适厅型并控制搭建成本。', tags: ['会议中心', '车辆入场', '雨备'], sources: [S('官方网站', 'https://riocentro.com.br/', '空间、容量与配套')] }),
  venue('roxy-venue', 'Roxy Dinner Show', 'indoor', { dateStatus: 'likely_recurring', location: 'Copacabana', influence: { level: '高', score: 5, basis: '官方资料明确桌椅容量700人，文化秀与餐饮一体' }, recommendation: 3, decision: '700人晚宴第一优先', relevance: '人数精准匹配且具有即刻可感知的巴西文化。', activation: '欢迎或闭幕晚宴、定制开场。', risks: '车辆展示能力有限；包场与节目改造需提前锁档。', tags: ['700人', '晚宴', '演出'], sources: [S('Rio Film Commission', 'https://www.riofilmcommission.com/locacoes/roxy-dinner-show/', '容量与面积')] }),
  venue('farmasi-arena', 'Farmasi Arena', 'indoor', { dateStatus: 'confirmed', location: 'Barra Olímpica', influence: { level: '极高', score: 5, basis: '里约大型室内演艺与体育馆，头部演出承载能力强' }, recommendation: 2, decision: '超配型备选', relevance: '适合大型舞台、灯光秀和国际演出级制作。', activation: '主舞台、演唱会式开幕、车辆发布。', risks: '对700人明显超配；11/21户外区有Mariah Carey，档期与搭拆冲突。', tags: ['体育馆', '演出', '超配'], sources: [S('场馆官网', 'https://farmasiarena.com.br/', '场馆与日历')] }),
  venue('pier-maua', 'Pier Mauá 仓库群', 'indoor', { dateStatus: 'confirmed', location: '港区', influence: { level: '高', score: 4, basis: '历史港区仓库、城市更新与大型展会体验兼具' }, recommendation: 3, decision: '工业风优选', relevance: '适合汽车展陈、城市文化与夜间社交。', activation: '发布会、展陈、晚宴、港区路线。', risks: '月初Mondial占用；不同仓库容量、空调和装卸条件需逐一核验。', tags: ['港区', '工业风', '汽车展陈'], sources: [S('场馆日历', 'https://piermaua.rio/es/eventos/mes/2026-11/', '2026年11月占用情况')] }),
  venue('windsor-barra', 'Windsor Barra Convention Center', 'indoor', { dateStatus: 'pending_announcement', location: 'Barra da Tijuca', influence: { level: '高', score: 4, basis: '大型酒店会议中心与住宿、餐饮、安保一体' }, recommendation: 3, decision: '低风险会议型', relevance: '适合700人主会、分论坛与国际团队住宿。', activation: '全体大会、晚宴、媒体中心。', risks: '城市辨识度弱于地标场地；需通过内容与舞美补足。', tags: ['酒店', '会议', '低风险'], sources: [S('酒店官网', 'https://windsorhoteis.com/hotel/windsor-barra/', '会议与酒店配套')] }),
  venue('copacabana-palace', 'Copacabana Palace', 'indoor', { dateStatus: 'pending_announcement', location: 'Copacabana', influence: { level: '极高', score: 5, basis: '里约国际高端酒店地标与历史性宴会场所' }, recommendation: 2, decision: '领导/VIP线', relevance: '适合高层晚宴、媒体专访和全球用户奖项。', activation: '宴会厅、VIP接待、红毯与采访。', risks: '成本高、车辆展示有限、700人配置需场地确认。', tags: ['地标酒店', '高端', 'VIP'], sources: [S('酒店官网', 'https://www.belmond.com/hotels/south-america/brazil/rio-de-janeiro/belmond-copacabana-palace/', '酒店与活动空间')] }),

  venue('copacabana-beach', 'Copacabana Beach', 'beach', { dateStatus: 'pending_announcement', location: 'Copacabana', influence: { level: '极高', score: 5, basis: '全球认知度最高的里约海滩地标之一' }, recommendation: 2, decision: '英雄内容点', relevance: '最强城市识别与全球传播画面。', activation: '日出仪式、足排球、轻量内容拍摄。', risks: '公共许可、游客、治安、潮汐、天气与车辆上沙限制；不建议700人封闭主场。', tags: ['地标', '海滩', '传播'], sources: [S('Riotur海滩指南', 'https://riotur.rio/wp-content/uploads/2023/05/Rotas-Cariocas-RIO-PRAIAS.pdf', '海滩与城市旅游信息')] }),
  venue('ipanema-beach', 'Ipanema / Arpoador', 'beach', { dateStatus: 'pending_announcement', location: 'Ipanema', influence: { level: '极高', score: 5, basis: '日落、冲浪与生活方式内容的国际地标' }, recommendation: 2, decision: '日落内容点', relevance: '高端生活方式、运动与城市美学。', activation: '小规模日落仪式、冲浪/足排球内容。', risks: '空间狭窄、游客密度高、落日时段拥挤。', tags: ['日落', '生活方式', '海滩'], sources: [S('Riotur海滩指南', 'https://riotur.rio/wp-content/uploads/2023/05/Rotas-Cariocas-RIO-PRAIAS.pdf', '海滩信息')] }),
  venue('barra-beach', 'Barra da Tijuca Beach', 'beach', { dateStatus: 'pending_announcement', location: 'Barra da Tijuca', influence: { level: '高', score: 4, basis: '长海岸线、现代城区与Barra会展/酒店集群相邻' }, recommendation: 3, decision: '沙滩活动首选', relevance: '更适合700人分区、运动体验与Barra主会场联动。', activation: '足排球、沙滩挑战、日出车主活动。', risks: '仍需公共许可、雨备、救生与跨道路交通组织。', tags: ['沙滩活动', 'Barra', '大空间'], sources: [S('Riotur海滩指南', 'https://riotur.rio/wp-content/uploads/2023/05/Rotas-Cariocas-RIO-PRAIAS.pdf', '海滩信息')] }),
  venue('recreio-beach', 'Recreio dos Bandeirantes Beach', 'beach', { dateStatus: 'pending_announcement', location: 'Recreio', influence: { level: '中高', score: 3, basis: '相对开阔、运动属性强，适合更可控的户外内容' }, recommendation: 2, decision: '功能型备选', relevance: '可做冲浪、沙滩运动和SUV海岸线内容。', activation: '小组运动、内容拍摄、车主晨间体验。', risks: '距核心酒店区更远；医疗、救生、交通与雨备成本增加。', tags: ['冲浪', '开阔', '交通距离'], sources: [S('Riotur海滩指南', 'https://riotur.rio/wp-content/uploads/2023/05/Rotas-Cariocas-RIO-PRAIAS.pdf', '海滩信息')] })
];

export const researchItems = researchItemsBase.map((entry) => ({
  ...entry,
  introduction: introductions[entry.id],
  ...(socialReachById[entry.id] ? { socialReach: socialReachById[entry.id] } : {})
}));

export const decisionHighlights = [
  { label: '推荐主会期', value: '11/09–12', note: '当前已知冲突最少' },
  { label: '第二窗口', value: '11/23–27', note: '避开长周末，但已进入SSL周期' },
  { label: '借势第一优先', value: 'SSL Gold Cup', note: '全球化与滨海运动高度同频' },
  { label: '700人晚宴首选', value: 'Roxy Dinner Show', note: '公开容量精准匹配700人' }
];

export const blackoutWindows = [
  { range: '11/01–02', reason: '三大活动与亡灵节长周末叠加', severity: 'high' },
  { range: '11/18–22', reason: 'SSL、黑人意识日长周末、Mariah与歌剧集中', severity: 'high' },
  { range: '11/28–29', reason: 'SSL、Clássicos与FLA RUN同区叠加', severity: 'critical' }
];
