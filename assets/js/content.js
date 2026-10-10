/**
 * Hand-written content for the Tree ID site: tree maps, tools and tips, the conifer
 * classification, and label translations. Photo data lives in data.js.
 */
window.TREEID_CONTENT = {
  parts: [
    { id: 'whole', en: 'Whole tree', zh: '整体' },
    { id: 'cartoon', en: 'Cartoon', zh: '卡通' },
    { id: 'leaf', en: 'Leaf', zh: '叶' },
    { id: 'flower', en: 'Flower', zh: '花' },
    { id: 'fruit', en: 'Fruit', zh: '果' },
    { id: 'bark', en: 'Bark', zh: '树皮' },
  ],

  // Tree maps, apps and webpages
  maps: [
    { city: 'New York City', cityZh: '纽约', title: 'NYC Street Tree Map', url: 'https://tree-map.nycgovparks.org/', en: 'Street tree map', zh: '街道树地图' },
    { city: 'San Francisco', cityZh: '旧金山', title: 'Street Tree Map', url: 'https://bsm.sfdpw.org/urbanforestry/', en: 'Urban forest map', zh: '城市森林地图' },
    { city: 'Madison', cityZh: '麦迪逊', title: 'Madison Tree Types', url: 'http://acouch.github.io/madison-trees/#', en: 'Trees of Madison', zh: '麦迪逊的树' },
    { city: 'Philadelphia', cityZh: '费城', title: 'OpenTreeMap | PhillyTreeMap', url: 'https://www.opentreemap.org/phillytreemap/map/', en: 'Philly tree map', zh: '费城树木地图' },
    { city: 'Amsterdam', cityZh: '阿姆斯特丹', title: 'Bomen - in beheer van Gemeente Amsterdam', url: 'https://maps.amsterdam.nl/bomen/', en: 'The Amsterdam tree map', zh: '阿姆斯特丹树木地图' },
    { city: 'London', cityZh: '伦敦', title: 'London Tree Canopy Cover', url: 'https://apps.london.gov.uk/canopy-cover/', en: 'Tree canopy cover', zh: '树冠覆盖率' },
    { city: 'Edinburgh', cityZh: '爱丁堡', title: 'The Edinburgh Tree Map', url: 'http://edinburghtreemap.org/', en: "The central location for all Edinburgh's tree data", zh: '爱丁堡树木数据汇总' },
    { city: 'Berlin', cityZh: '柏林', title: 'Gieß den Kiez | CityLAB Berlin', url: 'https://giessdenkiez.de/', en: 'Berlin tree map', zh: '柏林树木地图' },
    { city: 'National Geographic', cityZh: '国家地理', title: 'Nine Cities That Love Their Trees', url: 'https://www.nationalgeographic.com/news-features/urban-tree-canopy/', en: 'Nine cities that love their trees', zh: '九座热爱树木的城市' },
  ],
  tools: [
    { name: 'Arbor Day tree identification', url: 'https://www.arborday.org/tree-identification', en: 'Tree Identification', zh: '树木识别' },
    { name: 'SelecTree', url: 'https://selectree.calpoly.edu/', en: 'A tree selection guide', zh: '树种选择指南' },
    { name: 'Urban Tree Key', url: 'https://urbantreekey.calpoly.edu/', en: 'Urban Tree Key', zh: '城市树木检索' },
    { name: 'Tree guide', url: 'http://www.tree-guide.com/', en: 'tree guide | about trees', zh: '树木指南' },
    { name: 'Pl@ntNet', url: 'https://identify.plantnet.org/', en: 'Identify, explore and share your observations of wild plants', zh: '拍照识别、探索与分享野生植物观察' },
    { name: 'iNaturalist', url: 'https://www.inaturalist.org/', en: 'iNaturalist', zh: '自然观察记录与物种识别' },
  ],
  webpages: [
    { name: 'Urban tree species directory', url: 'https://www.friendsoftheurbanforest.org/tree-species-directory-sf', en: 'Tree Species Directory | Friends of the Urban Forest', zh: '城市树种名录（旧金山 Friends of the Urban Forest）' },
    { name: 'UCI sustainable landscape program', url: 'https://planningandsustainability.uci.edu/physical/landscape-plan.php', en: 'UCI Sustainable Landscape Program, Campus Planning & Sustainability', zh: 'UCI 可持续景观计划' },
  ],

  // Tip: trees with opposite branching
  madcap: [
    { letter: 'M', en: 'Maple', zh: '枫树', atlas: 'maple' },
    { letter: 'A', en: 'Ash', zh: '白蜡树（梣）', atlas: 'ash' },
    { letter: 'D', en: 'Dogwood', zh: '山茱萸', atlas: 'dogwood' },
    { letter: 'Cap', en: 'The Caprifoliaceae family, such as honeysuckles', zh: '忍冬科（Caprifoliaceae），如金银花' },
    { letter: 'Horse', en: 'Horse chestnut, or Buckeye', zh: '七叶树（Horse chestnut / Buckeye）', atlas: 'horse-chestnut' },
  ],

  // Conifer classification. atlas = row in the photo atlas; sp = Science Olympiad species number.
  conifers: {
    path: [
      { en: 'Pinophyta', zh: '松柏门' },
      { en: 'Pinopsida', zh: '松柏纲' },
      { en: 'Pinales', zh: '松柏目' },
    ],
    families: [
      {
        en: 'Pinaceae', zh: '松科', genera: [
          {
            en: 'Pinus (Pine)', zh: '松属', atlas: 'pine', groups: [
              { en: 'Subgenus Pinus (hard pines)', zh: '硬松亚属', species: [{ en: 'Scots Pine (Pinus sylvestris)', sp: 22 }, { en: 'Ponderosa Pine (Pinus ponderosa)' }] },
              { en: 'Subgenus Strobus (soft pines)', zh: '软松亚属', species: [{ en: 'Eastern White Pine (Pinus strobus)', sp: 23 }, { en: 'Sugar Pine (Pinus lambertiana)' }, { en: 'Western White Pine (Pinus monticola)' }] },
            ],
          },
          { en: 'Picea (Spruce)', zh: '云杉属', atlas: 'spruce', species: [{ en: 'Norway Spruce (Picea abies)' }, { en: 'White Spruce (Picea glauca)' }, { en: 'Sitka Spruce (Picea sitchensis)' }, { en: 'Black Spruce (Picea mariana)', sp: 26 }, { en: 'Blue Spruce (Picea pungens)', sp: 27 }] },
          { en: 'Larix (Larch)', zh: '落叶松属', atlas: 'larch', species: [{ en: 'Larix laricina (Tamarack)', zh: '美洲落叶松', sp: 29 }] },
          { en: 'Abies (Fir)', zh: '冷杉属', atlas: 'fir' },
          { en: 'Cedrus (Cedar)', zh: '雪松属', atlas: 'cedar' },
          { en: 'Tsuga (Hemlock)', zh: '铁杉属' },
          { en: 'Pseudotsuga (Douglas fir)', zh: '黄杉属', atlas: 'douglas-fir' },
        ],
      },
      {
        en: 'Cupressaceae', zh: '柏科', genera: [
          { en: 'Cupressus (Cypress)', zh: '柏木属', atlas: 'cypress' },
          { en: 'Juniperus (Juniper)', zh: '刺柏属', atlas: 'juniper' },
          { en: 'Thuja (Arborvitae)', zh: '崖柏属', sp: 9 },
          { en: 'Calocedrus (Incense cedar)', zh: '翠柏属', atlas: 'incense-cedar' },
          { en: 'Taxodium (Bald cypress)', zh: '落羽杉属' },
          { en: 'Sequoia (Sequoia)', zh: '红杉属', atlas: 'redwood', species: [{ en: 'Sequoiadendron giganteum (Giant sequoia)', zh: '北美巨杉' }, { en: 'Sequoia sempervirens (Coast redwood)', zh: '红杉' }] },
        ],
      },
      {
        en: 'Taxaceae', zh: '红豆杉科', atlas: 'yew', species: [
          { en: 'Taxus baccata (English yew)', zh: '欧洲红豆杉' },
          { en: 'Torreya californica (California torreya)', zh: '加州榧' },
          { en: 'Torreya grandis (Chinese torreya)', zh: '香榧' },
        ],
      },
      {
        en: 'Araucariaceae', zh: '南洋杉科', atlas: 'norfolk-island-pine', species: [
          { en: 'Araucaria araucana (Monkey puzzle tree)', zh: '智利南洋杉' },
          { en: 'Araucaria columnaris (Cook pine)', zh: '柱状南洋杉' },
          { en: 'Araucaria heterophylla (Norfolk Island pine)', zh: '异叶南洋杉' },
        ],
      },
      {
        en: 'Podocarpaceae', zh: '罗汉松科', atlas: 'fern-pine', species: [
          { en: 'Afrocarpus gracilior / Podocarpus gracilior (Fern pine)', zh: '罗汉松' },
        ],
      },
    ],
  },

  // Chinese labels for the identification keys and comparison titles
  zh: {
    'Leaf Shape Keys': '叶形检索', 'Leaves Arrangement Keys': '叶序检索', 'Cones and Fruits Keys': '球果与果实检索',
    'Needle-leaf Conifers': '针叶类针叶树', 'Scale-leaf Conifers': '鳞叶类针叶树', 'Untoothed Simple Leaves': '全缘单叶',
    'Toothed Simple Leaves': '有齿单叶', 'Lobed Simple Leaves': '分裂单叶', 'Compound Leaves': '复叶',
    'Alternate': '互生', 'Opposite': '对生', 'Whorled': '轮生',
    'Cones': '球果', 'Berrylike Fruit': '浆果状果实', 'Nuts': '坚果', 'Acorns': '橡子', 'Pods': '荚果', 'Keys (Samara)': '翅果', 'Balls': '球状果',
    'Differences between Black Ash and White Ash': '黑梣与白梣的区别',
    'Differences between Aspen (Bigtooth) and Aspen (Quaking)': '大齿山杨与美洲山杨的区别',
    'Relation between Boxelder and Maple': '复叶槭与枫树的关系',
    'Differences between Hop-Hornbeam and Hornbeam (Carpinus genus)': '铁木与鹅耳枥（Carpinus 属）的区别',
    'Differences between Locust, Black and Locust, Honey': '刺槐与美国皂荚的区别',
    'Differences between Red Maple, Silver Maple, and Sugar Maple': '红枫、银枫与糖枫的区别',
    'Differences between Oak, Red and Oak, White.': '红橡与白橡的区别',
    'Differences between Pine, Scotch and Pine, White': '欧洲赤松与北美乔松的区别',
    'Distinguish between Pine, Spruce, Fir and Larch': '区分松、云杉、冷杉和落叶松',
    'Differences between Blue Spruce and Black Spruce': '蓝云杉与黑云杉的区别',
  },
};
