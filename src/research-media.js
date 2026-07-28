const checkedAt = '2026-07-28';
const preview = (url) => `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200&h=675`;
const favicon = (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
const unavatar = (network, handle) => `https://unavatar.io/${network}/${handle}`;

const visual = (src, alt, kind, sourceLabel, sourceUrl, licenseNote) => ({
  src, alt, kind, sourceLabel, sourceUrl, licenseNote, checkedAt
});

const officialPreview = (url, alt, sourceLabel) => visual(
  preview(url), alt, 'photo', sourceLabel, url,
  '官方页面视觉预览；公开发布前复核页面截图与品牌素材使用许可'
);

const officialLogo = (domain, alt, sourceLabel, sourceUrl) => visual(
  favicon(domain), alt, 'logo', sourceLabel, sourceUrl,
  '官方网站公开图标；公开发布前复核品牌Logo使用规范'
);

const publicAvatar = (network, handle, alt, sourceLabel, sourceUrl) => visual(
  unavatar(network, handle), alt, 'avatar', sourceLabel, sourceUrl,
  '公开账号头像；公开发布前复核肖像、频道标识和平台使用规范'
);

export const researchMedia = {
  'rock-the-mountain': officialPreview('https://www.rockthemountain.com.br/', 'Rock The Mountain 2026官方页面视觉预览', 'Rock The Mountain官方'),
  'mondial-biere': visual('https://storage-ndt.nyc3.cdn.digitaloceanspaces.com/mondial-de-la-biere/prod/media/assets/Mondial_2025_logo_assinatura_principal_rgb_NyDEIUR.png', 'Mondial de La Bière官方活动视觉', 'photo', 'Mondial de La Bière官方', 'https://www.mondialdelabierebrasil.com/', '官方公开活动视觉；公开发布前复核品牌使用许可'),
  'carioca-matsuri': visual('https://carioca-matsuri-backend.seopro.novadata.dev/assets/50658d90-f9a4-471e-b10e-5309a6427ad4.png?width=1200&height=630&quality=80&format=webp', 'Carioca Matsuri官方活动视觉', 'photo', 'Carioca Matsuri官方', 'https://cariocamatsuri.com.br/', '官方公开活动视觉；公开发布前复核品牌使用许可'),
  turandot: officialPreview('https://theatromunicipal.rj.gov.br/temporada-2026-do-theatro-municipal-do-rio-de-janeiro/', '里约市立剧院2026《图兰朵》演出季页面', 'Theatro Municipal官方'),
  'mariah-christmas': officialPreview('https://www.eventim.com.br/campaign/mariahcarey', 'Mariah Carey里约圣诞演出官方票务页面', 'Eventim官方票务'),
  'classicos-brasil': officialPreview('https://classicosdobrasilfestival.com.br/rio-de-janeiro/', 'Clássicos do Brasil 2026里约站官方页面', 'Clássicos do Brasil官方'),
  'novembro-negro': officialPreview('https://prefeitura.rio/casa-civil/novembro-negro-rio-entra-no-calendario-oficial-da-cidade/', '里约市政府Novembro Negro官方页面', '里约市政府'),

  'ssl-gold-cup': visual('https://media.sailing.org/sailing/wp-content/uploads/2023/12/04001300/ssl6-2-e1756900284175-1200x699.jpeg', 'SSL Gold Cup帆船赛事现场', 'photo', 'World Sailing', 'https://www.sailing.org/2025/09/03/second-edition-of-the-football-world-cup-in-sailing-heads-to-brazil-in-november-2026/', 'World Sailing官方新闻图片；公开发布前复核赛事图片使用许可'),
  'roxy-dinner-show': officialPreview('https://www.roxyoficial.com.br/en/sobre', 'Roxy Dinner Show官方文化演出页面', 'Roxy Dinner Show官方'),
  'carnaval-experience': officialPreview('https://www.carnavalexperience.com.br/', 'Carnaval Experience与Grande Rio官方体验页面', 'Carnaval Experience官方'),
  botafogo: officialPreview('https://www.botafogo.com.br/', 'Botafogo俱乐部官方页面', 'Botafogo官方'),
  flamengo: officialPreview('https://www.flamengo.com.br/', 'Flamengo俱乐部官方页面', 'Flamengo官方'),
  fluminense: visual('https://assets-fluminense.s3.amazonaws.com/assets/posts_markup-c07c2be3e2639f0f05a3ec91e2155a78ce7e7ffc05bd1da9948015b905439f9a.png', 'Fluminense俱乐部官方视觉', 'photo', 'Fluminense官方', 'https://www.fluminense.com.br/', '俱乐部官方公开视觉；公开发布前复核品牌使用许可'),
  vasco: officialPreview('https://vasco.com.br/', 'Vasco da Gama俱乐部官方页面', 'Vasco da Gama官方'),
  'nilton-santos': officialPreview('https://www.botafogo.com.br/estadio-nilton-santos', 'Estádio Nilton Santos官方场馆页面', 'Botafogo官方'),

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

  marina: visual('https://brmarinas.com.br/wp-content/uploads/2022/10/og-image-br-marinas.png', 'Marina da Glória滨海场地官方视觉', 'photo', 'BR Marinas官方', 'https://marinadagloria.com.br/', '场地官方公开视觉；公开发布前复核使用许可'),
  jockey: officialPreview('https://www.jcb.com.br/', 'Jockey Club Brasileiro官方场地页面', 'Jockey Club Brasileiro官方'),
  'parque-olimpico': officialPreview('https://parqueolimpico.rio/', 'Parque Olímpico da Barra官方场地页面', 'Parque Olímpico官方'),
  'aterro-flamengo': officialPreview('https://visitrio.com.br/', 'Aterro do Flamengo城市活动与场地页面', 'Visit Rio'),
  'parque-lage': officialPreview('https://eavparquelage.rj.gov.br/', 'Parque Lage官方机构与场地页面', 'Parque Lage官方'),
  riocentro: officialPreview('https://riocentro.com.br/', 'Riocentro官方场地与空间页面', 'Riocentro官方'),
  'roxy-venue': officialPreview('https://www.roxyoficial.com.br/en/sobre', 'Roxy Dinner Show官方场地页面', 'Roxy Dinner Show官方'),
  'farmasi-arena': visual('https://farmasiarena.com.br/wp-content/uploads/2024/01/rioarena.png', 'Farmasi Arena官方场馆视觉', 'photo', 'Farmasi Arena官方', 'https://farmasiarena.com.br/', '场馆官方公开视觉；公开发布前复核使用许可'),
  'pier-maua': officialPreview('https://piermaua.rio/', 'Pier Mauá港区场地官方页面', 'Pier Mauá官方'),
  'windsor-barra': officialPreview('https://windsorhoteis.com/hotel/windsor-barra/', 'Windsor Barra会议与酒店官方页面', 'Windsor Hotels官方'),
  'copacabana-palace': visual('https://img.belmond.com/f_auto/t_2580x1299/photos/BEL/bel-cam-01-the-arrival01.jpg', 'Copacabana Palace酒店入口与建筑', 'photo', 'Belmond官方', 'https://www.belmond.com/hotels/south-america/brazil/rio-de-janeiro/belmond-copacabana-palace/', '酒店官方公开图片；公开发布前复核使用许可'),
  'copacabana-beach': officialPreview('https://riotur.rio/que_fazer/copacabana/', 'Copacabana海滩官方旅游页面', 'Riotur官方'),
  'barra-beach': officialPreview('https://riotur.rio/que_fazer/barra-da-tijuca/', 'Barra da Tijuca海滩官方旅游页面', 'Riotur官方')
};

export function getResearchMedia(id) {
  return researchMedia[id] || null;
}
