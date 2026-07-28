const checkedAt = '2026-07-28';
const favicon = (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
const unavatar = (network, handle) => `https://unavatar.io/${network}/${handle}`;

const visual = (src, alt, kind, sourceLabel, sourceUrl, licenseNote) => ({
  src, alt, kind, sourceLabel, sourceUrl, licenseNote, checkedAt
});

const officialLogo = (domain, alt, sourceLabel, sourceUrl) => visual(
  favicon(domain), alt, 'logo', sourceLabel, sourceUrl,
  '官方网站公开图标；公开发布前复核品牌Logo使用规范'
);

const publicAvatar = (network, handle, alt, sourceLabel, sourceUrl) => visual(
  unavatar(network, handle), alt, 'avatar', sourceLabel, sourceUrl,
  '公开账号头像；公开发布前复核肖像、频道标识和平台使用规范'
);

export const researchMedia = {
  'rock-the-mountain': visual('https://billboard-com-br.s3.amazonaws.com/wp-content/uploads/2024/12/10142213/RTM.jpg', 'Rock The Mountain音乐节现场舞台与观众', 'photo', 'Billboard Brasil / Rock The Mountain Divulgação', 'https://billboard.com.br/veja-o-line-up-completo-do-rock-the-mountain-2025/', '媒体报道所载主办方宣传图；公开发布前复核转载许可'),
  'mondial-biere': visual('https://storage-ndt.nyc3.cdn.digitaloceanspaces.com/mondial-de-la-biere/prod/media/assets/Mondial_2025_logo_assinatura_principal_rgb_NyDEIUR.png', 'Mondial de La Bière官方活动视觉', 'photo', 'Mondial de La Bière官方', 'https://www.mondialdelabierebrasil.com/', '官方公开活动视觉；公开发布前复核品牌使用许可'),
  'carioca-matsuri': visual('https://carioca-matsuri-backend.seopro.novadata.dev/assets/50658d90-f9a4-471e-b10e-5309a6427ad4.png?width=1200&height=630&quality=80&format=webp', 'Carioca Matsuri官方活动视觉', 'photo', 'Carioca Matsuri官方', 'https://cariocamatsuri.com.br/', '官方公开活动视觉；公开发布前复核品牌使用许可'),
  'classicos-brasil': visual('https://www.correiodamanha.com.br/_midias/jpg/2025/10/16/600x378/1_classicos-492377.jpg', 'Clássicos do Brasil音乐节舞台与现场观众', 'photo', 'Correio da Manhã / Diego Padilha Divulgação', 'https://www.correiodamanha.com.br/cultura/musica/2025/10/227571-classicos-do-brasil-em-ritmo-de-rock-e-reggae.html', '媒体报道所载活动宣传图；公开发布前复核转载许可'),
  turandot: visual('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Teatro_Municipal_-_panoramio_%284%29.jpg/1280px-Teatro_Municipal_-_panoramio_%284%29.jpg', '《图兰朵》2026演出场地——里约市立剧院外观', 'photo', 'Wikimedia Commons / Elvis Boaventura', 'https://commons.wikimedia.org/wiki/File:Teatro_Municipal_-_panoramio_(4).jpg', 'Elvis Boaventura，CC BY 3.0；此图为演出场地外观，并非2026制作剧照'),
  'mariah-christmas': visual('https://www.eventim.com.br/campaign/fileadmin/fm_br/campaigns/2026/mariah-carey/mc-logo.png', 'Mariah Carey’s Christmas Time巴西站官方活动视觉', 'photo', 'Eventim官方票务', 'https://www.eventim.com.br/campaign/mariahcarey', '官方公开活动视觉；艺人肖像、演出名称与联名使用须另行授权'),
  'novembro-negro': visual('https://odia.ig.com.br/_midias/jpg/2023/11/09/1200x750/1_whatsapp_image_2023_11_02_at_09_37_19_1280x720-31092238.jpeg', 'Novembro Negro Rio官方城市活动视觉', 'photo', 'O Dia / Divulgação', 'https://odia.ig.com.br/rio-de-janeiro/2023/11/amp/6739072-rio-aprova-novembro-negro-no-calendario-do-municipio.html', '媒体报道所载里约市政府2023活动视觉，图片署名Divulgação；2026主视觉待官宣'),
  'live-21k': visual('https://imprensabrasilia.com/wp-content/uploads/2026/04/imagem_2026-04-24_163839391.png', 'LIVE!21K XP 2026赛事现场（巴西利亚站）', 'photo', 'Imprensa Brasília / Divulgação', 'https://imprensabrasilia.com/24-04-26/esportes/live-21k-xp-brasilia-reune-5-mil-atletas-e-aquece-para-primeira-maratona-da-cidade/', '同系列赛事巴西利亚站媒体图片，并非里约站现场；公开发布前复核转载许可'),
  'fla-run': visual('https://d2hk32cswy6zx7.cloudfront.net/fotografos/v2_63d4b0ce-2048-4f95-a728-48a86a2ed8f1.png', 'FLA RUN官方影像平台活动视觉', 'photo', 'FLA RUN官方影像平台', 'https://fotos.flarun.com.br/', '官方公开活动视觉；公开发布前复核品牌与活动素材使用许可'),

  'ssl-gold-cup': visual('https://media.sailing.org/sailing/wp-content/uploads/2023/12/04001300/ssl6-2-e1756900284175-1200x699.jpeg', 'SSL Gold Cup帆船赛事现场', 'photo', 'World Sailing', 'https://www.sailing.org/2025/09/03/second-edition-of-the-football-world-cup-in-sailing-heads-to-brazil-in-november-2026/', 'World Sailing官方新闻图片；公开发布前复核赛事图片使用许可'),
  'roxy-dinner-show': visual('https://www.roxyoficial.com.br/images/galeria/parintins.jpg', 'Roxy Dinner Show舞台演出现场', 'photo', 'Roxy Dinner Show官方', 'https://www.roxyoficial.com.br/en/sobre', '场馆官方公开图片；公开发布前复核使用许可'),
  fluminense: visual('https://assets-fluminense.s3.amazonaws.com/assets/posts_markup-c07c2be3e2639f0f05a3ec91e2155a78ce7e7ffc05bd1da9948015b905439f9a.png', 'Fluminense俱乐部官方视觉', 'photo', 'Fluminense官方', 'https://www.fluminense.com.br/', '俱乐部官方公开视觉；公开发布前复核品牌使用许可'),
  'carnaval-experience': visual('https://assets.planne.com.br/apps/UFDB75E6DKU/images/_/FPC9Q4hvNqFRBMsQ4SdzslYC8RtAqXQryvvvT3Dj.jpg', 'Carnaval Experience与Grande Rio桑巴体验现场', 'photo', 'Carnaval Experience官方', 'https://www.carnavalexperience.com.br/', '官方公开体验图片；公开发布前复核人物肖像与品牌使用许可'),
  botafogo: visual('https://static.botafogo.com.br/upload/slide/7fcf5521e2e54c4d8a0befe7da889c39.png', 'Botafogo俱乐部官方阵容视觉', 'photo', 'Botafogo官方', 'https://www.botafogo.com.br/', '俱乐部官方公开视觉；球员肖像、装备品牌与商业联动须另行授权'),
  'nilton-santos': visual('https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Est%C3%A1dio_Ol%C3%ADmpico_Nilton_Santos_-_Engenh%C3%A3o_01.jpg/960px-Est%C3%A1dio_Ol%C3%ADmpico_Nilton_Santos_-_Engenh%C3%A3o_01.jpg', 'Estádio Olímpico Nilton Santos外部入口', 'photo', 'Wikimedia Commons / Cau0709', 'https://commons.wikimedia.org/wiki/File:Est%C3%A1dio_Ol%C3%ADmpico_Nilton_Santos_-_Engenh%C3%A3o_01.jpg', 'Cau0709，CC BY-SA 4.0；如改编须按相同许可发布并保留署名'),
  'theatro-municipal-ip': visual('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Teatro_Municipal_-_panoramio_%284%29.jpg/1280px-Teatro_Municipal_-_panoramio_%284%29.jpg', 'Theatro Municipal do Rio标志性建筑外观', 'photo', 'Wikimedia Commons / Elvis Boaventura', 'https://commons.wikimedia.org/wiki/File:Teatro_Municipal_-_panoramio_(4).jpg', 'Elvis Boaventura，CC BY 3.0；使用时保留作者、来源与许可链接'),
  futevolei: visual('https://static.wixstatic.com/media/5c7eda_4c12f99bb2fc409fbad8f479128486df~mv2.png/v1/fill/w_1000,h_1000,al_c,q_90,usm_0.66_1.00_0.01/5c7eda_4c12f99bb2fc409fbad8f479128486df~mv2.png', '2026里约州足排球巡回赛官方活动视觉', 'photo', 'Footvolley Player Association官方', 'https://www.futevolei.org/post/circuito-estadual-de-futev%C3%B4lei-2026', '官方公开赛事视觉；为2026年7月Copacabana站，不代表11月已确定赛事'),

  g1: officialLogo('g1.globo.com', 'g1官方Logo', 'g1官方', 'https://g1.globo.com/rj/rio-de-janeiro/'),
  'o-globo': officialLogo('oglobo.globo.com', 'O Globo官方Logo', 'O Globo官方', 'https://oglobo.globo.com/'),
  'bandnews-rio': officialLogo('band.com.br', 'BandNews FM官方Logo', 'BandNews FM官方', 'https://www.band.com.br/bandnews-fm/rio-de-janeiro'),
  folha: officialLogo('folha.uol.com.br', 'Folha de S.Paulo官方Logo', 'Folha官方', 'https://www.folha.uol.com.br/'),
  estadao: officialLogo('estadao.com.br', 'Estadão官方Logo', 'Estadão官方', 'https://www.estadao.com.br/'),
  uol: officialLogo('uol.com.br', 'UOL官方Logo', 'UOL官方', 'https://www.uol.com.br/'),
  'veja-rio': officialLogo('vejario.abril.com.br', 'VEJA RIO官方Logo', 'VEJA RIO官方', 'https://vejario.abril.com.br/'),
  'diario-rio': officialLogo('diariodorio.com', 'Diário do Rio官方Logo', 'Diário do Rio官方', 'https://diariodorio.com/'),
  'o-dia': officialLogo('odia.ig.com.br', 'O Dia官方Logo', 'O Dia官方', 'https://odia.ig.com.br/'),
  autoesporte: officialLogo('autoesporte.globo.com', 'Autoesporte官方Logo', 'Autoesporte官方', 'https://autoesporte.globo.com/'),
  'quatro-rodas': officialLogo('quatrorodas.abril.com.br', 'Quatro Rodas官方Logo', 'Quatro Rodas官方', 'https://quatrorodas.abril.com.br/'),
  'motor1-brasil': officialLogo('motor1.uol.com.br', 'Motor1 Brasil官方Logo', 'Motor1 Brasil官方', 'https://motor1.uol.com.br/'),
  'noticias-auto': officialLogo('noticiasautomotivas.com.br', 'Notícias Automotivas官方Logo', 'Notícias Automotivas官方', 'https://www.noticiasautomotivas.com.br/'),
  'auto-plus': officialLogo('automaistv.com.br', 'Auto+ TV官方Logo', 'Auto+ TV官方', 'https://www.automaistv.com.br/automaistv/'),
  flatout: officialLogo('flatout.com.br', 'FlatOut Brasil官方Logo', 'FlatOut Brasil官方', 'https://flatout.com.br/'),
  autodata: officialLogo('autodata.com.br', 'AutoData官方Logo', 'AutoData官方', 'https://autodata.com.br/'),
  autocosmos: officialLogo('autocosmos.com.co', 'Autocosmos官方Logo', 'Autocosmos官方', 'https://www.autocosmos.com.co/'),

  acelerados: publicAvatar('youtube', 'Acelerados', 'Acelerados官方频道头像', 'Acelerados YouTube', 'https://www.youtube.com/@Acelerados'),
  'lucas-fontana': officialLogo('lucasfontana.com.br', 'Lucas Fontana与AutoSuper官方标识', 'Lucas Fontana官方', 'https://lucasfontana.com.br/'),
  'juliano-barata': publicAvatar('youtube', 'FlatOutBrasil', 'FlatOut Brasil官方频道头像', 'FlatOut Brasil YouTube', 'https://www.youtube.com/@FlatOutBrasil'),
  'maria-clara': publicAvatar('instagram', 'mariaclaraexposito', 'Maria Clara Exposito公开账号头像', 'Maria Clara Exposito Instagram', 'https://www.instagram.com/mariaclaraexposito/'),
  'carioca-nomundo': officialLogo('cariocanomundo.com.br', 'Carioca NoMundo官方标识', 'Carioca NoMundo官方', 'https://cariocanomundo.com.br/'),
  'mundo-sem-fim': publicAvatar('youtube', 'MundoSemFim', 'Mundo Sem Fim官方频道头像', 'Mundo Sem Fim YouTube', 'https://www.youtube.com/@MundoSemFim'),
  'giro-carioca': publicAvatar('instagram', 'girodacarioca', 'Giro da Carioca公开账号头像', 'Giro da Carioca Instagram', 'https://www.instagram.com/girodacarioca/'),
  carioquess: publicAvatar('instagram', 'carioquess', 'Carioquess公开账号头像', 'Carioquess Instagram', 'https://www.instagram.com/carioquess/'),
  cazetv: publicAvatar('youtube', 'CazeTV', 'CazéTV官方频道头像', 'CazéTV YouTube', 'https://www.youtube.com/@CazeTV'),
  futparodias: officialLogo('futparodias.com.br', 'FutParódias官方标识', 'FutParódias官方', 'https://www.futparodias.com.br/'),
  'gabriel-medina': publicAvatar('instagram', 'gabrielmedina', 'Gabriel Medina公开账号头像', 'Gabriel Medina Instagram', 'https://www.instagram.com/gabrielmedina/'),
  'pedro-sampaio': publicAvatar('youtube', 'djpedrosampaio', 'Pedro Sampaio官方频道头像', 'Pedro Sampaio YouTube', 'https://www.youtube.com/@djpedrosampaio'),

  marina: visual('https://brmarinas.com.br/wp-content/uploads/2022/10/og-image-br-marinas.png', 'Marina da Glória滨海场地官方视觉', 'photo', 'BR Marinas官方', 'https://marinadagloria.com.br/', '场地官方公开视觉；公开发布前复核使用许可'),
  jockey: visual('https://www.jcb.com.br/jcb_home/images/boas_vindas_bg_1.jpg', 'Jockey Club Brasileiro赛道、草坪与里约山景', 'photo', 'Jockey Club Brasileiro官方', 'https://www.jcb.com.br/', '场地官方公开图片；公开发布前复核使用许可'),
  'parque-olimpico': visual('https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Parque_Ol%C3%ADmpico_Rio_2016_%28cropped%29.jpg/1280px-Parque_Ol%C3%ADmpico_Rio_2016_%28cropped%29.jpg', 'Parque Olímpico da Barra航拍全景', 'photo', 'Wikimedia Commons / Miriam Jeske · Brasil2016.gov.br', 'https://commons.wikimedia.org/wiki/File:Parque_Ol%C3%ADmpico_Rio_2016_(cropped).jpg', 'Miriam Jeske/Brasil2016.gov.br，CC BY 3.0 BR；使用时保留署名与许可链接'),
  'aterro-flamengo': visual('https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Rio-Aterro-Flamengo-Gloria.jpg/1280px-Rio-Aterro-Flamengo-Gloria.jpg', 'Aterro do Flamengo滨海公园航拍', 'photo', 'Wikimedia Commons / Alicia Nijdam', 'https://commons.wikimedia.org/wiki/File:Rio-Aterro-Flamengo-Gloria.jpg', 'Alicia Nijdam，CC BY 2.0；使用时保留作者、来源与许可链接'),
  'parque-lage': visual('https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Parque_Lage%2C_Rio_de_Janeiro_Project_2345_01.jpg/1280px-Parque_Lage%2C_Rio_de_Janeiro_Project_2345_01.jpg', 'Parque Lage历史庭院、泳池与基督山景', 'photo', 'Wikimedia Commons / Wilfredor', 'https://commons.wikimedia.org/wiki/File:Parque_Lage,_Rio_de_Janeiro_Project_2345_01.jpg', 'Wilfredor，CC0；建议仍保留作者与来源信息'),
  riocentro: visual('https://riocentro.com.br/wp-content/uploads/2023/04/Raphael-Medeiros-9.jpg', 'Riocentro场馆外部与活动空间', 'photo', 'Riocentro官方', 'https://riocentro.com.br/', '场馆官方公开图片；公开发布前复核使用许可'),
  'roxy-venue': visual('https://www.roxyoficial.com.br/images/galeria/show-palco.jpg', 'Roxy Dinner Show室内舞台与座席', 'photo', 'Roxy Dinner Show官方', 'https://www.roxyoficial.com.br/en/sobre', '场馆官方公开图片；公开发布前复核使用许可'),
  'farmasi-arena': visual('https://farmasiarena.com.br/wp-content/uploads/2024/01/rioarena.png', 'Farmasi Arena官方场馆视觉', 'photo', 'Farmasi Arena官方', 'https://farmasiarena.com.br/', '场馆官方公开视觉；公开发布前复核使用许可'),
  'pier-maua': visual('https://piermaua.rio/wp-content/uploads/2025/08/IMG_5810-1.jpeg', 'Pier Mauá仓库外广场与临海活动搭建场景', 'photo', 'Pier Mauá官方', 'https://piermaua.rio/', '场馆官网公开活动图片；公开发布前复核人物肖像、活动标识与使用许可'),
  'windsor-barra': visual('https://windsorhoteis.com/media/arquivos/barra_site-principal_JBVpeNQ.jpg', 'Windsor Barra酒店与会议场地', 'photo', 'Windsor Hotels官方', 'https://windsorhoteis.com/hotel/windsor-barra/', '酒店官方公开图片；公开发布前复核使用许可'),
  'copacabana-palace': visual('https://img.belmond.com/f_auto/t_2580x1299/photos/BEL/bel-cam-01-the-arrival01.jpg', 'Copacabana Palace酒店入口与建筑', 'photo', 'Belmond官方', 'https://www.belmond.com/hotels/south-america/brazil/rio-de-janeiro/belmond-copacabana-palace/', '酒店官方公开图片；公开发布前复核使用许可'),
  'copacabana-beach': visual('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Aerial_view_of_Copacabana_beach.jpg/960px-Aerial_view_of_Copacabana_beach.jpg', 'Copacabana Beach与波浪形海滨步道航拍', 'photo', 'Wikimedia Commons / Gustavo Facci', 'https://commons.wikimedia.org/wiki/File:Aerial_view_of_Copacabana_beach.jpg', 'Gustavo Facci，CC BY-SA 2.0；如改编须按相同许可发布并保留署名'),
  'ipanema-beach': visual('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Praia_de_Ipanema_-_Rio_de_Janeiro.jpg/1280px-Praia_de_Ipanema_-_Rio_de_Janeiro.jpg', 'Ipanema Beach海岸全景', 'photo', 'Wikimedia Commons / João Thiago da Silva', 'https://commons.wikimedia.org/wiki/File:Praia_de_Ipanema_-_Rio_de_Janeiro.jpg', 'João Thiago da Silva，CC BY-SA 4.0；如改编须按相同许可发布并保留署名'),
  'barra-beach': visual('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Barra_Panorama.jpg/1280px-Barra_Panorama.jpg', 'Barra da Tijuca海岸线与城区全景', 'photo', 'Wikimedia Commons / Barrazine da Barra', 'https://commons.wikimedia.org/wiki/File:Barra_Panorama.jpg', 'Barrazine da Barra，CC BY 2.0；使用时保留作者、来源与许可链接'),
  'recreio-beach': visual('https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Vista_sob_a_pedra_do_Pontal_visualizando_Praia_do_Recreio.jpg/1280px-Vista_sob_a_pedra_do_Pontal_visualizando_Praia_do_Recreio.jpg', 'Recreio dos Bandeirantes与Pontal两侧海滩全景', 'photo', 'Wikimedia Commons / Fwellisch', 'https://commons.wikimedia.org/wiki/File:Vista_sob_a_pedra_do_Pontal_visualizando_Praia_do_Recreio.jpg', 'Fwellisch，CC BY-SA 3.0；如改编须按相同许可发布并保留署名'),
};

export function getResearchMedia(id) {
  return researchMedia[id] || null;
}
