export const siteMeta = {
  title: '捷途国际 2026 里约全球用户节 Research',
  subtitle: '11月借势资源与项目选址｜领导决策版',
  windowStart: '2026-11-01',
  windowEnd: '2026-11-30',
  checkedAt: '2026-07-28'
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

export const researchItems = [
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
