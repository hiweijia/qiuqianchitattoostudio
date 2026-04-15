// ════ gallery.js ════
// Tattoo gallery logic — loads images from images.json, no base64

// ── i18n ──────────────────────────────────────────────────────────────────
var I18N = {
  zh: {
    subtitle: '· 纹身图库', cart_btn: 'Tattoo List', upload_btn: '+ 上传',
    cart_title: 'Tattoo List', cart_empty: '还没有收藏纹身',
    admin_title: '上传新纹身', drop_hint: '拖放图片到这里 · 或点击选择文件',
    cancel: '取消', export_btn: '导出 images.json ↓',
    export_toast: '已导出 images.json · 请将图片复制到 images/ 文件夹',
    count_suffix: ' 件作品', all_tag: '全部',
    add_to_list: '收入 Tattoo List', added_to_list: '已收藏 ♥',
    name_placeholder: '名称', new_tag_placeholder: '新标签',
    related_label: '你可能也喜欢',
    book_title: '如何预约？',
    book_step1: '截图你喜欢的图案，发给我',
    book_step2: '我们聊聊尺寸、位置和颜色',
    book_step3: '安排时间，copy paste 到身上！',
    book_wa: 'WhatsApp 发给我',
    book_ig: 'Instagram 联系我',
  },
  en: {
    subtitle: '· Tattoo Gallery', cart_btn: 'Tattoo List', upload_btn: '+ Upload',
    cart_title: 'Tattoo List', cart_empty: 'No tattoos saved yet',
    admin_title: 'Upload New Tattoos', drop_hint: 'Drop images here · or click to browse',
    cancel: 'Cancel', export_btn: 'Export images.json ↓',
    export_toast: 'Exported images.json · Copy images to images/ folder',
    count_suffix: ' works', all_tag: 'All',
    add_to_list: 'Add to Tattoo List', added_to_list: 'Saved ♥',
    name_placeholder: 'Name', new_tag_placeholder: 'New tag',
    related_label: 'You might also like',
    book_title: 'How to book?',
    book_step1: 'Screenshot the designs you like & send to me',
    book_step2: 'We chat about size, placement & color',
    book_step3: 'Pick a time, copy paste onto skin!',
    book_wa: 'Send me on WhatsApp',
    book_ig: 'Contact me on Instagram',
  },
  es: {
    subtitle: '· Galería de Tatuajes', cart_btn: 'Tattoo List', upload_btn: '+ Subir',
    cart_title: 'Tattoo List', cart_empty: 'Aún no has guardado tatuajes',
    admin_title: 'Subir Nuevos Tatuajes', drop_hint: 'Arrastra imágenes aquí · o haz clic para elegir',
    cancel: 'Cancelar', export_btn: 'Exportar images.json ↓',
    export_toast: 'Exportado images.json · Copia las imágenes a images/',
    count_suffix: ' obras', all_tag: 'Todo',
    add_to_list: 'Añadir a Tattoo List', added_to_list: 'Guardado ♥',
    name_placeholder: 'Nombre', new_tag_placeholder: 'Nueva etiqueta',
    related_label: 'También te puede gustar',
    book_title: '¿Cómo reservar?',
    book_step1: 'Haz captura de los diseños que te gusten y envíamelos',
    book_step2: 'Hablamos de tamaño, ubicación y color',
    book_step3: '¡Elegimos fecha y copy paste en tu piel!',
    book_wa: 'Envíame por WhatsApp',
    book_ig: 'Contáctame en Instagram',
  }
};
var LANG_LABELS = { zh: '中文', en: 'EN', es: 'ES' };

var NAME_I18N = {
  '八爪鱼':     { en: 'Octopus',           es: 'Pulpo' },
  '蝙蝠 I':    { en: 'Bat I',             es: 'Murciélago I' },
  '蝙蝠 II':   { en: 'Bat II',            es: 'Murciélago II' },
  '蝙蝠 III':  { en: 'Bat III',           es: 'Murciélago III' },
  '虫 I':      { en: 'Bug I',             es: 'Insecto I' },
  '虫 II':     { en: 'Bug II',            es: 'Insecto II' },
  '虫 III':    { en: 'Bug III',           es: 'Insecto III' },
  '刺豚':      { en: 'Pufferfish',        es: 'Pez globo' },
  '大象 I':    { en: 'Elephant I',        es: 'Elefante I' },
  '大象 II':   { en: 'Elephant II',       es: 'Elefante II' },
  '大象 III':  { en: 'Elephant III',      es: 'Elefante III' },
  '大象 IV':   { en: 'Elephant IV',       es: 'Elefante IV' },
  '大象 V':    { en: 'Elephant V',        es: 'Elefante V' },
  '大象 VI':   { en: 'Elephant VI',       es: 'Elefante VI' },
  '狗狗 I':    { en: 'Dog I',             es: 'Perro I' },
  '狗狗 II':   { en: 'Dog II',            es: 'Perro II' },
  '狗狗 III':  { en: 'Dog III',           es: 'Perro III' },
  '狗狗 IV':   { en: 'Dog IV',            es: 'Perro IV' },
  '狗狗 V':    { en: 'Dog V',             es: 'Perro V' },
  '狗狗 VI':   { en: 'Dog VI',            es: 'Perro VI' },
  '狗狗 VII':  { en: 'Dog VII',           es: 'Perro VII' },
  '狗狗 VIII': { en: 'Dog VIII',          es: 'Perro VIII' },
  '狗狗 IX':   { en: 'Dog IX',            es: 'Perro IX' },
  '狗狗 X':    { en: 'Dog X',             es: 'Perro X' },
  '狗狗 XI':   { en: 'Dog XI',            es: 'Perro XI' },
  '狗狗 XII':  { en: 'Dog XII',           es: 'Perro XII' },
  '狗狗 XIII': { en: 'Dog XIII',          es: 'Perro XIII' },
  '狗狗 XIV':  { en: 'Dog XIV',           es: 'Perro XIV' },
  '狗狗 XV':   { en: 'Dog XV',            es: 'Perro XV' },
  '狗狗 XVI':  { en: 'Dog XVI',           es: 'Perro XVI' },
  '狗狗 XVII': { en: 'Dog XVII',          es: 'Perro XVII' },
  '海马':      { en: 'Seahorse',          es: 'Caballito de mar' },
  '海豚 I':    { en: 'Dolphin I',         es: 'Delfín I' },
  '海豚 II':   { en: 'Dolphin II',        es: 'Delfín II' },
  '鹤':        { en: 'Crane',             es: 'Grulla' },
  '猴子 I':    { en: 'Monkey I',          es: 'Mono I' },
  '猴子 II':   { en: 'Monkey II',         es: 'Mono II' },
  '猴子 III':  { en: 'Monkey III',        es: 'Mono III' },
  '猴子 IV':   { en: 'Monkey IV',         es: 'Mono IV' },
  '猴子 V':    { en: 'Monkey V',          es: 'Mono V' },
  '猴子 VI':   { en: 'Monkey VI',         es: 'Mono VI' },
  '猴子 VII':  { en: 'Monkey VII',        es: 'Mono VII' },
  '猴子 VIII': { en: 'Monkey VIII',       es: 'Mono VIII' },
  '猴子 IX':   { en: 'Monkey IX',         es: 'Mono IX' },
  '猴子 X':    { en: 'Monkey X',          es: 'Mono X' },
  '猴子 XI':   { en: 'Monkey XI',         es: 'Mono XI' },
  '猴子 XII':  { en: 'Monkey XII',        es: 'Mono XII' },
  '蝴蝶 I':    { en: 'Butterfly I',       es: 'Mariposa I' },
  '蝴蝶 II':   { en: 'Butterfly II',      es: 'Mariposa II' },
  '蝴蝶 III':  { en: 'Butterfly III',     es: 'Mariposa III' },
  '蝴蝶 IV':   { en: 'Butterfly IV',      es: 'Mariposa IV' },
  '蝴蝶 V':    { en: 'Butterfly V',       es: 'Mariposa V' },
  '蝴蝶 VI':   { en: 'Butterfly VI',      es: 'Mariposa VI' },
  '蝴蝶 VII':  { en: 'Butterfly VII',     es: 'Mariposa VII' },
  '花栗鼠 I':  { en: 'Chipmunk I',        es: 'Ardilla listada I' },
  '花栗鼠 II': { en: 'Chipmunk II',       es: 'Ardilla listada II' },
  '甲壳虫 I':  { en: 'Beetle I',          es: 'Escarabajo I' },
  '甲壳虫 II': { en: 'Beetle II',         es: 'Escarabajo II' },
  '甲壳虫 III':{ en: 'Beetle III',        es: 'Escarabajo III' },
  '甲壳虫 IV': { en: 'Beetle IV',         es: 'Escarabajo IV' },
  '考拉':      { en: 'Koala',             es: 'Koala' },
  '考拉 II':   { en: 'Koala II',          es: 'Koala II' },
  '恐龙 I':    { en: 'Dinosaur I',        es: 'Dinosaurio I' },
  '恐龙 II':   { en: 'Dinosaur II',       es: 'Dinosaurio II' },
  '恐龙 III':  { en: 'Dinosaur III',      es: 'Dinosaurio III' },
  '恐龙 IV':   { en: 'Dinosaur IV',       es: 'Dinosaurio IV' },
  '恐龙 V':    { en: 'Dinosaur V',        es: 'Dinosaurio V' },
  '恐龙 VI':   { en: 'Dinosaur VI',       es: 'Dinosaurio VI' },
  '恐龙 VII':  { en: 'Dinosaur VII',      es: 'Dinosaurio VII' },
  '老鼠 I':    { en: 'Mouse I',           es: 'Ratón I' },
  '老鼠 II':   { en: 'Mouse II',          es: 'Ratón II' },
  '老鼠 III':  { en: 'Mouse III',         es: 'Ratón III' },
  '老鼠 IV':   { en: 'Mouse IV',          es: 'Ratón IV' },
  '老鼠 V':    { en: 'Mouse V',           es: 'Ratón V' },
  '老鼠 VI':   { en: 'Mouse VI',          es: 'Ratón VI' },
  '老鼠 VII':  { en: 'Mouse VII',         es: 'Ratón VII' },
  '老鼠 VIII': { en: 'Mouse VIII',        es: 'Ratón VIII' },
  '老鼠 IX':   { en: 'Mouse IX',          es: 'Ratón IX' },
  '龙虾 I':    { en: 'Lobster I',         es: 'Langosta I' },
  '龙虾 II':   { en: 'Lobster II',        es: 'Langosta II' },
  '骆驼 I':    { en: 'Camel I',           es: 'Camello I' },
  '骆驼 II':   { en: 'Camel II',          es: 'Camello II' },
  '马儿':      { en: 'Horse',             es: 'Caballo' },
  '马儿 II':   { en: 'Horse II',          es: 'Caballo II' },
  '马儿 III':  { en: 'Horse III',         es: 'Caballo III' },
  '猫与鼠':    { en: 'Cat & Mouse',       es: 'Gato y Ratón' },
  '猫 I':      { en: 'Cat I',             es: 'Gato I' },
  '猫 II':     { en: 'Cat II',            es: 'Gato II' },
  '猫头鹰':    { en: 'Owl',               es: 'Búho' },
  '蜜蜂 I':    { en: 'Bee I',             es: 'Abeja I' },
  '蜜蜂 II':   { en: 'Bee II',            es: 'Abeja II' },
  '奶牛':      { en: 'Dairy Cow',         es: 'Vaca lechera' },
  '牛 I':      { en: 'Cow I',             es: 'Vaca I' },
  '牛 II':     { en: 'Cow II',            es: 'Vaca II' },
  '牛 III':    { en: 'Cow III',           es: 'Vaca III' },
  '牛 IV':     { en: 'Cow IV',            es: 'Vaca IV' },
  '牛 V':      { en: 'Cow V',             es: 'Vaca V' },
  '企鹅':      { en: 'Penguin',           es: 'Pingüino' },
  '青蛙 I':    { en: 'Frog I',            es: 'Rana I' },
  '青蛙 II':   { en: 'Frog II',           es: 'Rana II' },
  '青蛙 III':  { en: 'Frog III',          es: 'Rana III' },
  '青蛙 IV':   { en: 'Frog IV',           es: 'Rana IV' },
  '青蛙 V':    { en: 'Frog V',            es: 'Rana V' },
  '水母':      { en: 'Jellyfish',         es: 'Medusa' },
  '松鼠 I':    { en: 'Squirrel I',        es: 'Ardilla I' },
  '松鼠 II':   { en: 'Squirrel II',       es: 'Ardilla II' },
  '松鼠 III':  { en: 'Squirrel III',      es: 'Ardilla III' },
  '松鼠 IV':   { en: 'Squirrel IV',       es: 'Ardilla IV' },
  '兔子 I':    { en: 'Rabbit I',          es: 'Conejo I' },
  '兔子 II':   { en: 'Rabbit II',         es: 'Conejo II' },
  '兔子 III':  { en: 'Rabbit III',        es: 'Conejo III' },
  '蜗牛 I':    { en: 'Snail I',           es: 'Caracol I' },
  '蜗牛 II':   { en: 'Snail II',          es: 'Caracol II' },
  '蜗牛 III':  { en: 'Snail III',         es: 'Caracol III' },
  '乌龟':      { en: 'Turtle',            es: 'Tortuga' },
  '小鸟 I':    { en: 'Bird I',            es: 'Pájaro I' },
  '小鸟 II':   { en: 'Bird II',           es: 'Pájaro II' },
  '小鸟 III':  { en: 'Bird III',          es: 'Pájaro III' },
  '小鸟 IV':   { en: 'Bird IV',           es: 'Pájaro IV' },
  '小鸟 V':    { en: 'Bird V',            es: 'Pájaro V' },
  '熊 I':      { en: 'Bear I',            es: 'Oso I' },
  '熊 II':     { en: 'Bear II',           es: 'Oso II' },
  '熊 III':    { en: 'Bear III',          es: 'Oso III' },
  '鸭子':      { en: 'Duck',              es: 'Pato' },
  '羊':        { en: 'Sheep',             es: 'Oveja' },
  '鹦鹉':      { en: 'Parrot',            es: 'Loro' },
  '鱼儿':      { en: 'Fish',              es: 'Pez' },
  '蜂蜜':      { en: 'Bee',               es: 'Abeja' },
  '鳄鱼':      { en: 'Crocodile',         es: 'Cocodrilo' },
  '鱼儿 I':    { en: 'Fish I',            es: 'Pez I' },
  '鱼儿 II':   { en: 'Fish II',           es: 'Pez II' },
  '鱼儿 III':  { en: 'Fish III',          es: 'Pez III' },
  '鱼儿 IV':   { en: 'Fish IV',           es: 'Pez IV' },
  '鱼儿 V':    { en: 'Fish V',            es: 'Pez V' },
  '蜘蛛':      { en: 'Spider',            es: 'Araña' },
  '猪猪':      { en: 'Piggy',             es: 'Cerdito' },
  '小浣熊':    { en: 'Raccoon',           es: 'Mapache' },
  '章鱼':      { en: 'Octopus II',        es: 'Pulpo II' },
  '猫 III':    { en: 'Cat III',   es: 'Gato III' },
'猫 IV':     { en: 'Cat IV',    es: 'Gato IV' },
'猫 V':      { en: 'Cat V',     es: 'Gato V' },
'猫 VI':     { en: 'Cat VI',    es: 'Gato VI' },
};

var TAG_I18N = {
  '海洋': { en: 'Ocean',      es: 'Océano' },
  '飞行': { en: 'Flying',     es: 'Volador' },
  '夜行': { en: 'Nocturnal',  es: 'Nocturno' },
  '昆虫': { en: 'Insect',     es: 'Insecto' },
  '微型': { en: 'Tiny',       es: 'Diminuto' },
  '陆地': { en: 'Land',       es: 'Terrestre' },
  '大型': { en: 'Large',      es: 'Grande' },
  '狗':   { en: 'Dog',        es: 'Perro' },
  '哺乳': { en: 'Mammal',     es: 'Mamífero' },
  '灵长': { en: 'Primate',    es: 'Primate' },
  '鸟':   { en: 'Bird',       es: 'Ave' },
  '鱼':   { en: 'Fish',       es: 'Pez' },
  '软体': { en: 'Mollusk',    es: 'Molusco' },
  '爬行': { en: 'Reptile',    es: 'Reptil' },
  '远古': { en: 'Ancient',    es: 'Antiguo' },
  '甲壳': { en: 'Crustacean', es: 'Crustáceo' },
  '猫':   { en: 'Cat',        es: 'Gato' },
  '两栖': { en: 'Amphibian',  es: 'Anfibio' },
};

var STORY_BY_ID = {
  '八爪鱼':   { en: "(っ˘ω˘)っ ～ 8 arms: one for coffee, seven to wave goodbye～",     es: "(っ˘ω˘)っ ～ 8 brazos: uno para el café, siete para decir adiós～" },
  '蝙蝠':    { en: "🌙 ˎ₍•ʚ•₎ˏ Sleep all day, party all night～",                    es: "🌙 ˎ₍•ʚ•₎ˏ Dormir todo el día, fiesta toda la noche～" },
  '蝙蝠-1':  { en: "～⊹ ˎ₍•ʚ•₎ˏ ⊹～ I'm not a bird! I'm a flying furball!",         es: "～⊹ ˎ₍•ʚ•₎ˏ ⊹～ ¡No soy un pájaro! ¡Soy una bola de pelo voladora!" },
  '蝙蝠-2':  { en: "ˎ₍•ʚ•₎ˏ zzZ Sweet dreams even upside down～",                    es: "ˎ₍•ʚ•₎ˏ zzZ Dulces sueños boca abajo～" },
  '虫':      { en: "₍₍ (ง ˙ω˙)ว ⁾⁾ Small but fast! Can't catch me～",               es: "₍₍ (ง ˙ω˙)ว ⁾⁾ ¡Pequeño pero rápido! No me atraparás～" },
  '虫-1':    { en: "( ˙▿˙ )σ Shh… secretly sunbathing under a leaf",                es: "( ˙▿˙ )σ Shh… tomando el sol bajo una hoja" },
  '虫-2':    { en: "～₊·*( ˘ᵕ˘ )·*₊～ Even tiny bugs have big joys",                 es: "～₊·*( ˘ᵕ˘ )·*₊～ Incluso los bichos pequeños tienen grandes alegrías" },
  '刺豚':    { en: "(◎_◎;) Don't touch! It's not personal, you're just too close!",  es: "(◎_◎;) ¡No toques! No es personal, ¡estás demasiado cerca!" },
  '大象':    { en: "┌(˘⌣˘)ʃ Great memory! I still remember the peanut from 10 years ago", es: "┌(˘⌣˘)ʃ ¡Gran memoria! Aún recuerdo el maní de hace 10 años" },
  '大象-1':  { en: "╰( ˘ω˘ )╯ Big body, gentle heart～ apologizes even to ants",     es: "╰( ˘ω˘ )╯ Cuerpo grande, corazón gentil～ se disculpa hasta con las hormigas" },
  '大象-2':  { en: "(⁰̷̴͈꒳⁰̷̴͈) Showering myself with my trunk～ best summer ever!",       es: "(⁰̷̴͈꒳⁰̷̴͈) ¡Duchándome con mi trompa～ el mejor verano!" },
  '大象-3':  { en: "( ˊᵕˋ )♡ Baby elephant trotting behind mama～",                  es: "( ˊᵕˋ )♡ El elefantito trotando detrás de mamá～" },
  '大象-5':  { en: "( ˘ ³˘)♥ Where the herd walks, even the wind softens",          es: "( ˘ ³˘)♥ Donde camina la manada, hasta el viento se suaviza" },
  '大象-6':  { en: "ᕦ(ò_óˇ)ᕤ I may be big but you can't outrun me!",               es: "ᕦ(ò_óˇ)ᕤ ¡Seré grande pero no me ganas corriendo!" },
  '狗狗':    { en: "∪◕ᴥ◕∪ Look at my big eyes! Are you leaving without me again?",  es: "∪◕ᴥ◕∪ ¡Mira mis ojos grandes! ¿Vas a salir sin mí otra vez?" },
  '狗狗-1':  { en: "∪･ω･∪ You're back! I waited forever! (it was 5 min)",           es: "∪･ω･∪ ¡Volviste! ¡Te esperé toda la vida! (fueron 5 min)" },
  '狗狗-3':  { en: "(ᵕᴗᵕ)⁾⁾ Tail wagging is how I say 'I love you'",               es: "(ᵕᴗᵕ)⁾⁾ Mover la cola es mi forma de decir 'te quiero'" },
  '狗狗-4':  { en: "▼・ᴥ・▼ Ball?! WHERE'S THE BALL?! I NEED THE BALL!",             es: "▼・ᴥ・▼ ¿¡Pelota?! ¿¡DÓNDE ESTÁ?! ¡LA NECESITO!" },
  '狗狗-5':  { en: "₍ᐢ.ˬ.ᐢ₎ *head tilt* ...what you said made zero sense",         es: "₍ᐢ.ˬ.ᐢ₎ *inclina cabeza* ...lo que dijiste no tiene sentido" },
  '狗狗-6':  { en: "(•ᴥ•)ʃ♡ Sit! Shake! Play dead! ...treat now?",                 es: "(•ᴥ•)ʃ♡ ¡Siéntate! ¡Patita! ¡Hazte el muerto! ...¿premio?" },
  '狗狗-7':  { en: "∪˙︶˙∪ Waiting by the door — my most important daily job",      es: "∪˙︶˙∪ Esperar en la puerta — mi trabajo más importante" },
  '狗狗-8':  { en: "(ↀᴥↀ)？ Cat thinks she's the boss? Impossible!",                es: "(ↀᴥↀ)？ ¿El gato cree que manda? ¡Imposible!" },
  '狗狗-9':  { en: "ʕ·ᴥ·ʔ ♪♫ Ears go UP the second you say 'walk'",                es: "ʕ·ᴥ·ʔ ♪♫ Las orejas se levantan al oír 'paseo'" },
  '狗狗-10': { en: "∪ ˘ ᴥ ˘ ∪ zzZ Snores louder than you",                          es: "∪ ˘ ᴥ ˘ ∪ zzZ Ronca más fuerte que tú" },
  '狗狗-11': { en: "( ˙ᴥ˙ ) What are you eating? I want some! No matter what it is!", es: "( ˙ᴥ˙ ) ¿Qué comes? ¡Yo quiero! ¡No importa qué sea!" },
  '狗狗-12': { en: "∪・ω・∪ノ゙ Catching frisbees — I'm a professional",               es: "∪・ω・∪ノ゙ Atrapar frisbees — soy profesional" },
  '狗狗-13': { en: "(^・ᴥ・^) Shaking off water after a bath is basic etiquette",    es: "(^・ᴥ・^) Sacudirse después del baño es etiqueta básica" },
  '狗狗-14': { en: "▽・ᴥ・▽ Bringing you slippers = highest form of love",           es: "▽・ᴥ・▽ Traerte las pantuflas = la mayor expresión de amor" },
  '狗狗-15': { en: "∪ˊ˗ˋ∪ Today's dog life will also be lived with full energy!",   es: "∪ˊ˗ˋ∪ ¡La vida perruna de hoy también será con toda la energía!" },
  '狗狗-16': { en: "∪ˊ·ω·ˋ∪ Ears up, listening intently — didn't understand a word", es: "∪ˊ·ω·ˋ∪ Orejas arriba, escuchando atento — no entendí nada" },
  '狗狗-17': { en: "( ˘ᴥ˘ )ノ🦴 Bones are the most perfect thing in the world, period", es: "( ˘ᴥ˘ )ノ🦴 Los huesos son lo más perfecto del mundo, punto" },
  '蜂蜜':    { en: "₍₍ 🍯 ⁾⁾ Buzz buzz～ hard work, but the sweetness is worth it",  es: "₍₍ 🍯 ⁾⁾ Bzz bzz～ trabajo duro, pero la dulzura vale la pena" },
  '鳄鱼':    { en: "( ˬ ₎₎ ≋≋≋ Just two eyes above water… hehehe",                  es: "( ˬ ₎₎ ≋≋≋ Solo dos ojos sobre el agua… jejeje" },
  '海马':    { en: "( ˊ̱˂˃ˋ̱ )～ World's slowest swimmer, but most elegant pose",      es: "( ˊ̱˂˃ˋ̱ )～ El nadador más lento del mundo, pero con la pose más elegante" },
  '海豚':    { en: "( ˃̶͈̀ロ˂̶͈́)੭ꠥ⁾⁾ Ultrasonic group chat — best gossip humans can't hear", es: "( ˃̶͈̀ロ˂̶͈́)੭ꠥ⁾⁾ Chat ultrasónico — los mejores chismes que no oirás" },
  '海豚-1':  { en: "～～🐬～～ Jumped out of the water just to see you — worth it!",  es: "～～🐬～～ ¡Salté del agua solo para verte — valió la pena!" },
  '鹤':      { en: "┌( ˘ω˘ )┐ Standing on one leg all day — that's kung fu",        es: "┌( ˘ω˘ )┐ De pie en una pata todo el día — eso es kung fu" },
  '猴子':    { en: "🙈🙉🙊 See no evil, hear no evil… forget it, I want to play",   es: "🙈🙉🙊 No ver, no oír… olvídalo, quiero jugar" },
  '猴子-1':  { en: "🍌 ₍₍ ◝(•̀ㅂ•́)◟ ⁾⁾ Stole your banana AND made a face at you",  es: "🍌 ₍₍ ◝(•̀ㅂ•́)◟ ⁾⁾ Te robé el plátano Y te hice una mueca" },
  '猴子-2':  { en: "( ˊ̱˂˃ˋ̱ ) Scratching my head — not itchy, just thinking about life", es: "( ˊ̱˂˃ˋ̱ ) Rascándome la cabeza — no pica, estoy pensando en la vida" },
  '猴子-3':  { en: "₍ᐢ..ᐢ₎ EEEK! Even more scared of spiders than you are",         es: "₍ᐢ..ᐢ₎ ¡EEEK! Aún más miedo a las arañas que tú" },
  '猴子-4':  { en: "ʕ •̀ω•́ ʔ Swinging between branches — this is what freedom tastes like", es: "ʕ •̀ω•́ ʔ Columpiándome entre ramas — así sabe la libertad" },
  '猴子-5':  { en: "( ͡° ͜ʖ ͡°) Very happy with this selfie — posting it now",      es: "( ͡° ͜ʖ ͡°) Muy contento con este selfie — lo publico ya" },
  '猴子-6':  { en: "₍₍ ◝(°̀ᗝ°́)◜ ⁾⁾ Radio? This is my DJ booth!",                  es: "₍₍ ◝(°̀ᗝ°́)◜ ⁾⁾ ¿Radio? ¡Es mi mesa de DJ!" },
  '猴子-7':  { en: "(ง •̀_•́)ง Don't underestimate me — jungle boxing champ",       es: "(ง •̀_•́)ง No me subestimes — campeón de boxeo de la selva" },
  '猴子-8':  { en: "₍ᐢ ›̥̥̥ ༝ ‹̥̥̥ ᐢ₎ Family of three — the left one is napping",       es: "₍ᐢ ›̥̥̥ ༝ ‹̥̥̥ ᐢ₎ Familia de tres — el de la izquierda duerme" },
  '猴子-9':  { en: "ʕ⁎̯͡⁎ʔ Sitting on a bamboo pole wondering what to eat… banana again", es: "ʕ⁎̯͡⁎ʔ Sentado en un bambú pensando qué comer… plátano otra vez" },
  '猴子-10': { en: "( ˙꒳˙ ) Run! Run! Run! Sprint champion of the jungle games",    es: "( ˙꒳˙ ) ¡Corre! ¡Corre! ¡Corre! Campeón de velocidad de la selva" },
  '猴子-11': { en: "ʕ·ᴥ·ʔ Fluffy and round — like a walking ball of yarn",          es: "ʕ·ᴥ·ʔ Peludo y redondo — como un ovillo de lana que camina" },
  '蝴蝶':    { en: "⋆˖⁺‧₊ Even the tiniest wings can stir the gentlest breeze",    es: "⋆˖⁺‧₊ Hasta las alas más pequeñas crean la brisa más suave" },
  '蝴蝶-1':  { en: "～♡⊹˚₊ The patterns on my wings? I painted them myself",        es: "～♡⊹˚₊ ¿Los dibujos de mis alas? Los pinté yo — únicos" },
  '蝴蝶-2':  { en: "( ˊᵕˋ )⊹ Tiny wings, big dreams — flying across the whole garden", es: "( ˊᵕˋ )⊹ Alas pequeñas, grandes sueños — volando por todo el jardín" },
  '蝴蝶-3':  { en: "～₊⊹ From caterpillar to this — pretty inspiring, right?",       es: "～₊⊹ De oruga a esto — bastante inspirador, ¿no?" },
  '蝴蝶-4':  { en: "✧˖°⋆ The moment I spread my wings, the whole world went quiet",  es: "✧˖°⋆ Al abrir las alas, el mundo entero se calló" },
  '蝴蝶-5':  { en: "( ˘⌣˘)♡ Starry wings — fragments fallen from the night sky",    es: "( ˘⌣˘)♡ Alas estrelladas — fragmentos caídos del cielo nocturno" },
  '蝴蝶-6':  { en: "～₊˚⊹ Landing on your shoulder wasn't an accident — I chose you", es: "～₊˚⊹ Posarme en tu hombro no fue accidente — te elegí" },
  '花栗鼠':   { en: "₍ᐢ⓿ᴥ⓿ᐢ₎ Tail up = seriously thinking about where to hide my snacks", es: "₍ᐢ⓿ᴥ⓿ᐢ₎ Cola arriba = pensando dónde esconder mis snacks" },
  '花栗鼠-1': { en: "( •̀ᴗ•́ )🌰 Cheeks stuffed with nuts — chipmunk commute essentials", es: "( •̀ᴗ•́ )🌰 Mejillas llenas de nueces — esenciales para ir al trabajo" },
  '甲壳虫':   { en: "⊹˚₊ Flipped over and can't get up… help? (;´д`)",              es: "⊹˚₊ Boca arriba y no puedo voltearme… ¿ayuda? (;´д`)" },
  '甲壳虫-1': { en: "( •̀ᄇ•́)ﻭ✧ My antennae are Wi-Fi antennas — full signal",       es: "( •̀ᄇ•́)ﻭ✧ Mis antenas son Wi-Fi — señal completa" },
  '甲壳虫-2': { en: "₍₍ (ง ˘ω˘ )ว ⁾⁾ Shiny shell — I'm the knight of the insect world", es: "₍₍ (ง ˘ω˘ )ว ⁾⁾ Caparazón brillante — soy el caballero del mundo insecto" },
  '甲壳虫-3': { en: "(˵ •̀ ᴗ •́ ˵ ) Don't step on me! I'm carrying dinner home!",   es: "(˵ •̀ ᴗ •́ ˵ ) ¡No me pises! ¡Llevo la cena a casa!" },
  '考拉':     { en: "( ˘͈ ᵕ ˘͈ ) Hugging the tree and not letting go — this one's mine", es: "( ˘͈ ᵕ ˘͈ ) Abrazando el árbol sin soltarlo — este es mío, y ese también" },
  '考拉-1':   { en: "( ˘ᵕ˘ ) zzZ Sleeping 22hrs a day isn't lazy — saving the world in dreams", es: "( ˘ᵕ˘ ) zzZ Dormir 22h al día no es pereza — salvo el mundo en sueños" },
  '恐龙':     { en: "(◕ᴗ◕✿) Stegosaurus plates are natural solar panels — eco pioneer", es: "(◕ᴗ◕✿) Las placas del estegosaurio son paneles solares — pionero ecológico" },
  '恐龙-1':   { en: "✦ ₍₍ (ง⁰̷̴͈꒳⁰̷̴͈)ว ⁾⁾ ✦ 65 million years ago, the stars watched me dance too", es: "✦ ₍₍ (ง⁰̷̴͈꒳⁰̷̴͈)ว ⁾⁾ ✦ Hace 65 millones de años, las estrellas también me veían bailar" },
  '恐龙-2':   { en: "( ˘ᗜ˘ ) Walking goes BOOM BOOM — neighbors complained for three eras", es: "( ˘ᗜ˘ ) Camino haciendo BOOM BOOM — vecinos quejándose por tres eras" },
  '恐龙-3':   { en: "e-e ₍₍ boing boing boing ⁾⁾ Who says dinosaurs can't bounce?",  es: "e-e ₍₍ boing boing boing ⁾⁾ ¿Quién dice que los dinos no saltan?" },
  '恐龙-4':   { en: "( ˊ̱˂˃ˋ̱ )～ Neck this long = permanent VIP view of the scenery", es: "( ˊ̱˂˃ˋ̱ )～ Cuello así de largo = vista VIP permanente del paisaje" },
  '恐龙-5':   { en: "ᕦ(˘ᗜ˘)ᕤ When velociraptors aren't hunting, they're chasing butterflies", es: "ᕦ(˘ᗜ˘)ᕤ Cuando el velociraptor no caza, persigue mariposas" },
  '恐龙-6':   { en: "( ˃̣̣̥ω˂̣̣̥ ) Meteor? What meteor? I didn't see anything——",         es: "( ˃̣̣̥ω˂̣̣̥ ) ¿Meteorito? ¿Qué meteorito? No vi nada——" },
  '老鼠':     { en: "₍₍ (ง ˙ω˙ )ว ⁾⁾ Tiny body, 9-foot aura",                       es: "₍₍ (ง ˙ω˙ )ว ⁾⁾ Cuerpo diminuto, aura de tres metros" },
  '老鼠-1':   { en: "( ˘ᵕ˘ )🧀 Rebellious teen mouse refuses to pose for photos",     es: "( ˘ᵕ˘ )🧀 Ratón adolescente rebelde se niega a posar" },
  '老鼠-2':   { en: "～₍₍ ⁰̷̴͈ ·̫ ⁰̷̴͈ ₎₎～ Three lines is all of me — minimalism is justice", es: "～₍₍ ⁰̷̴͈ ·̫ ⁰̷̴͈ ₎₎～ Tres líneas soy yo — el minimalismo es justicia" },
  '老鼠-3':   { en: "ʕ•̫ ͡•ʔ WILL WORK FOR CACHE — the programmer mouse's job hunt", es: "ʕ•̫ ͡•ʔ WILL WORK FOR CACHE — el ratón programador busca empleo" },
  '老鼠-4':   { en: "₍₍ ◝(•̀ꈊ•́)◟ ⁾⁾ Stealing cheese — this isn't theft, it's extreme sports", es: "₍₍ ◝(•̀ꈊ•́)◟ ⁾⁾ Subiendo al queso — no es robo, es deporte extremo" },
  '老鼠-5':   { en: "( ˘ᵕ˘ ) yeah, right… You don't believe anything I say, so… bye?", es: "( ˘ᵕ˘ ) yeah, right… No me crees nada, así que… ¿me voy?" },
  '老鼠-6':   { en: "₍ᐢ•ﻌ•ᐢ₎ Family photo — the one in the middle is the neighbor's hamster", es: "₍ᐢ•ﻌ•ᐢ₎ Foto familiar — el del medio es el hámster del vecino" },
  '老鼠-7':   { en: "(◕ᴥ◕) Owl and mouse? We're besties across species!",             es: "(◕ᴥ◕) ¿Búho y ratón? ¡Somos mejores amigos interespecie!" },
  '老鼠-8':   { en: "( ˘⌣˘ )♡ When the round ears perk up, the whole world listens", es: "( ˘⌣˘ )♡ Cuando las orejitas redondas se levantan, el mundo escucha" },
  '龙虾':     { en: "₍₍ 🦞 ⁾⁾ Walking sideways isn't rude — it's my fashion statement", es: "₍₍ 🦞 ⁾⁾ Caminar de lado no es mala educación — es mi estilo" },
  '龙虾-1':   { en: "( •̀ᄇ•́)ﻭ✧ Claws UP! This is my territory! Nobody gets close!", es: "( •̀ᄇ•́)ﻭ✧ ¡Pinzas ARRIBA! ¡Este es mi territorio!" },
  '骆驼':     { en: "┌(˘⌣˘)ʃ Camel caravan under the stars — each step lands on the Milky Way", es: "┌(˘⌣˘)ʃ Caravana bajo las estrellas — cada paso pisa la Vía Láctea" },
  '骆驼-1':   { en: "( ˘ᗜ˘ )☆ Three days in the desert — hump water supply good for one more week", es: "( ˘ᗜ˘ )☆ Tres días en el desierto — agua en la joroba para una semana más" },
  '马儿':     { en: "ᕕ( ᐕ )ᕗ Baby horse standing up for the first time — legs shaking, heart already soaring", es: "ᕕ( ᐕ )ᕗ Potro de pie por primera vez — patas temblando, corazón volando" },
  '马儿-1':   { en: "ᕕ( ᐛ )ᕗ The moment my mane flies up, I become the wind itself", es: "ᕕ( ᐛ )ᕗ El instante en que mi melena vuela, me convierto en el viento" },
  '马儿-2':   { en: "( ˘ω˘ )～♪ The sound of four hooves on earth — that's the planet's heartbeat", es: "( ˘ω˘ )～♪ El sonido de cuatro cascos en la tierra — es el latido del planeta" },
  '猫-老鼠':  { en: "₍ᐢ.ˬ.ᐢ₎ Chased all day, ended up sunbathing together — classic frenemies", es: "₍ᐢ.ˬ.ᐢ₎ Persiguiéndose todo el día, al final tomando sol juntos" },
  '猫':       { en: "(=ↀωↀ=) Tail up means: I run this house",                        es: "(=ↀωↀ=) Cola arriba significa: yo mando aquí" },
  '猫1':      { en: "₍˄·͈༝·͈˄₎ Big eyes, round head — inside lives a tiny devil",    es: "₍˄·͈༝·͈˄₎ Ojos grandes, cabeza redonda — dentro vive un diablillo" },
  '猫头鹰':   { en: "((ovo)) It's midnight snack o'clock — I know these things",      es: "((ovo)) ¿Qué hora es? Ni idea, pero sé que es hora del snack nocturno" },
  '蜜蜂':     { en: "₍₍ 🐝 ⁾⁾ Two bees chasing one person — origin of pollen allergies", es: "₍₍ 🐝 ⁾⁾ Dos abejas persiguiendo a alguien — el origen de la alergia al polen" },
  '蜜蜂-1':   { en: "\\(˙꒳˙)/ Human waves white flag, bee waves stinger: come at me!", es: "\\(˙꒳˙)/ Humano con bandera blanca, abeja con aguijón: ¡ven!" },
  '奶牛':     { en: "( ˘ᗜ˘ )🥛 Daily job: eat grass & be called cute — perfect life", es: "( ˘ᗜ˘ )🥛 Trabajo diario: comer hierba y que te digan linda — vida perfecta" },
  '牛':       { en: "( ˘ω˘ ) SACRE MOO! Even the flies moo along～",                  es: "( ˘ω˘ ) ¡SACRE MOO! Hasta las moscas mugen～" },
  '牛-1':     { en: "( ˘⌣˘ ) moo～ World's most zen animal, bar none",                es: "( ˘⌣˘ ) moo～ El animal más zen del mundo, sin discusión" },
  '牛-2':     { en: "(◕ᴥ◕) Cow couple on a grass date — even the flies are moved",    es: "(◕ᴥ◕) Pareja de vacas en una cita — tan romántico que hasta las moscas lloran" },
  '牛-3':     { en: "( ˘ᗜ˘ ) The spots? Graffiti left by a painter in a past life",  es: "( ˘ᗜ˘ ) ¿Las manchas? Grafitis de un pintor en otra vida" },
  '牛-4':     { en: "ᕦ(ˊᗜˋ)ᕤ Horns are a natural-born crown — not up for debate",    es: "ᕦ(ˊᗜˋ)ᕤ Los cuernos son una corona de nacimiento — no se discute" },
  '企鹅':     { en: "-=(ō '. Wearing a tuxedo but waddling — that's gap moe",         es: "-=(ō '. Esmoquin puesto pero caminando torpe — eso es encanto" },
  '青蛙':     { en: "⊹˚₊ Frog with a crown? Kiss it and you won't get a prince — just turn green", es: "⊹˚₊ ¿Rana con corona? Bésala y no tendrás príncipe — solo te pondrás verde" },
  '青蛙-1':   { en: "₍₍ ◝(•̀ᗝ•́)◟ ⁾⁾ Two frogs face to face — staring contest",      es: "₍₍ ◝(•̀ᗝ•́)◟ ⁾⁾ Dos ranas cara a cara — concurso de miradas" },
  '青蛙-2':   { en: "( ˘ᵕ˘ ) Sitting on a lily pad doing nothing — paid in moonlight", es: "( ˘ᵕ˘ ) Sentarse en un nenúfar sin hacer nada — pagan con luz de luna" },
  '青蛙-3':   { en: "(⊙_⊙) Frog bodybuilding champ — all muscle, all from jumping",   es: "(⊙_⊙) Campeón de musculación rana — todo músculo de tanto saltar" },
  '青蛙-4':   { en: "₍₍ (ง ˙꒳˙ )ว ⁾⁾ Four suction-cup feet — glass walls can't stop me", es: "₍₍ (ง ˙꒳˙ )ว ⁾⁾ Cuatro patas ventosa — ni las paredes de cristal me paran" },
  '水母':     { en: "～₊˚⊹ No brain, no heart — but floats more gracefully than anyone", es: "～₊˚⊹ Sin cerebro, sin corazón — pero flota con más gracia que nadie" },
  '松鼠':     { en: "˖⁺‧₊˚ ♡ Where'd I hide the acorn? Oh well, find another one!˚₊‧⁺˖", es: "˖⁺‧₊˚ ♡ ¿Dónde escondí la bellota? Bah, ¡busco otra!˚₊‧⁺˖" },
  '松鼠-1':   { en: "₍ᐢ⓿ᴥ⓿ᐢ₎ Buried 100 nuts, found 3 — the rest grew into trees",   es: "₍ᐢ⓿ᴥ⓿ᐢ₎ Enterré 100 nueces, encontré 3 — las demás se hicieron árboles" },
  '松鼠-2':   { en: "ᕦ(ò_óˇ)ᕤ Big tail isn't just for looks — it's a rain umbrella!", es: "ᕦ(ò_óˇ)ᕤ ¡La cola grande no es solo decoración — es un paraguas!" },
  '松鼠-3':   { en: "( ˘ᵕ˘ )🌰 Tree to tree — that's my daily commute～",              es: "( ˘ᵕ˘ )🌰 De árbol en árbol — así es mi camino al trabajo～" },
  '兔子':     { en: "⁽⁽◝( •ω• )◜⁾⁾ Hop hop～ can smell a carrot from anywhere～",     es: "⁽⁽◝( •ω• )◜⁾⁾ Boing boing～ puedo oler una zanahoria desde cualquier sitio～" },
  '兔子-1':   { en: "₍ᐢ..ᐢ₎♡ Ears up — listening for the snack bag!",                 es: "₍ᐢ..ᐢ₎♡ Orejas arriba — ¡escucho la bolsa de snacks!" },
  '兔子-2':   { en: "( ˙꒳˙ ) I'm not fat! I'm fluffy! FLUFFY!",                       es: "( ˙꒳˙ ) ¡No estoy gordo! ¡Soy esponjoso! ¡ES-PON-JO-SO!" },
  '蜗牛':     { en: "@＝（ˊ●ˋ ）＝@ Take it slow — home's on my back anyway～",        es: "@＝（ˊ●ˋ ）＝@ Con calma — total, la casa va conmigo～" },
  '蜗牛-1':   { en: "～～@（ˊ・ω・ˋ）@～～ Rainy days are my runway — sparkling～",      es: "～～@（ˊ・ω・ˋ）@～～ Los días de lluvia son mi pasarela — brillando～" },
  '蜗牛-2':   { en: "@（ˊ˘ˋ ）@ zzZ Walked all day… actually moved 2 meters",         es: "@（ˊ˘ˋ ）@ zzZ Caminé todo el día… en realidad avancé 2 metros" },
  '乌龟':     { en: "╰( ˘ω˘ )╯ No rush — living long is the real win～",               es: "╰( ˘ω˘ )╯ Sin prisa — vivir mucho es la verdadera victoria～" },
  '小鸟':     { en: "₍₍ ◝(•̀ᴗ•́)◟ ⁾⁾ Sitting on a wire in a row — I'm the chubby one～", es: "₍₍ ◝(•̀ᴗ•́)◟ ⁾⁾ Sentados en el cable — yo soy el gordito～" },
  '小鸟-1':   { en: "( ˊᵕˋ )♪♫ Singing on a branch — no ticket needed～",             es: "( ˊᵕˋ )♪♫ Cantando en la rama — entrada gratis～" },
  '小鸟-2':   { en: "( ˘ᵕ˘ )～♬ Don't need a reason to sing — just a good branch!",   es: "( ˘ᵕ˘ )～♬ No necesito razón para cantar — ¡solo una buena rama!" },
  '小鸟-3':   { en: "⊹˚₊ ꒰ ˊᵕˋ ꒱ Even traveling far, bring the nest～",              es: "⊹˚₊ ꒰ ˊᵕˋ ꒱ Aunque viaje lejos, llevo el nido～" },
  '小鸟-4':   { en: "(@> The smallest bird has the biggest dream! Just fly!",          es: "(@> ¡El pájaro más pequeño tiene el sueño más grande! ¡A volar!" },
  '熊':       { en: "ʕ •ᴥ•ʔ Look scary? Actually just looking for the honey jar～",    es: "ʕ •ᴥ•ʔ ¿Parece feroz? En realidad busca el tarro de miel～" },
  '熊-1':     { en: "ʕ ˘ᴥ˘ ʔ Round face, round ears — the kind of bear that can't be fierce～", es: "ʕ ˘ᴥ˘ ʔ Cara redonda, orejas redondas — un oso que no sabe ser feroz～" },
  '熊-2':     { en: "ʕ ·ᴥ· ʔ zzZ Hibernation isn't lazy — it's premium energy management!", es: "ʕ ·ᴥ· ʔ zzZ ¡Hibernar no es ser vago — es gestión energética premium!" },
  '鸭子':     { en: "˚₊‧꒰ ≧▽≦ ꒱ Quack quack～ most elegant when floating on water!", es: "˚₊‧꒰ ≧▽≦ ꒱ ¡Cuac cuac～ más elegante flotando en el agua!" },
  '羊':       { en: "( ˘ᵕ˘ )♡♡ Two sheep snuggling together — fluffy and warm～",     es: "( ˘ᵕ˘ )♡♡ Dos ovejas acurrucadas — esponjosas y calentitas～" },
  '鹦鹉':     { en: "꒰ ˊᵕˋ ꒱ Colorful feathers by the water — prettier than the sunset～", es: "꒰ ˊᵕˋ ꒱ Plumas de colores junto al agua — más bonito que el atardecer～" },
  '鱼儿':     { en: "( ˘ω˘ )♪ Blowing bubbles is my daily self-expression～ blub blub", es: "( ˘ω˘ )♪ Hacer burbujas es mi forma de expresarme～ blub blub" },
  '鱼儿-1':   { en: ">('>   ˚₊ Blowing bubbles is how fish talk — ooo～",              es: ">('>   ˚₊ Hacer burbujas es como hablan los peces — ooo～" },
  '鱼儿-2':   { en: "≋≋≋ ><(((º> One flick of the tail — the whole sea is my dance floor!", es: "≋≋≋ ><(((º> Un coletazo — ¡todo el mar es mi pista de baile!" },
  '鱼儿-3':   { en: ">°)))彡 Tiny but faster than you think!",                         es: ">°)))彡 ¡Pequeño pero más rápido de lo que crees!" },
  '鱼儿-4':   { en: "₍₍ ><> ⁾⁾ [bug] tag? No no no, I'm a fish not a bug!",          es: "₍₍ ><> ⁾⁾ ¿Etiqueta [bug]? ¡No no no, soy un pez, no un bicho!" },
  '鱼儿-5':   { en: "><(((*> oo The bubbles I blow are bigger than your dreams～",     es: "><(((*> oo Las burbujas que soplo son más grandes que tus sueños～" },
  '蜘蛛':     { en: "/\\oo/\\ Eight legs weave the world's most precise architecture～", es: "/\\oo/\\ Ocho patas tejen la arquitectura más precisa del mundo～" },
  '猪猪':     { en: "( ˘ᗜ˘ ) Oink oink～ A full belly is the peak of life!",          es: "( ˘ᗜ˘ ) ¡Oink oink～ Barriga llena es la cima de la vida!" },
  '小浣熊':   { en: "(o o) /'v' The striped troublemaker — trash cans are my buffet～", es: "(o o) /'v' El pequeño bribón a rayas — los cubos de basura son mi bufé～" },
  '章鱼':     { en: "{ ～v～ } Deep-sea giant — eight arms multitask better than you～", es: "{ ～v～ } Gigante del fondo marino — ocho brazos hacen multitarea mejor que tú～" },
  '睡觉猫咪':  { en: "zzZ Not lazy — healing the world through naps～",              es: "zzZ No es pereza — curo el mundo durmiendo～" },
  '小猫':      { en: "(=ↀωↀ=) Not angry — just built this way～",                   es: "(=ↀωↀ=) No estoy enfadada — simplemente soy así～" },
  '躺着小猫':  { en: "₍˄·͈༝·͈˄₎ Found the perfect position — not moving ever again", es: "₍˄·͈༝·͈˄₎ Encontré la postura perfecta — no me muevo más" },
  '小猫叫':    { en: "(ฅ•ω•ฅ) MEOW! Can I help you?!",                              es: "(ฅ•ω•ฅ) ¡MEOW! ¿En qué puedo ayudarte?!" },
};

// ── i18n helpers ──────────────────────────────────────────────────────────
var currentLang = 'en';

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || (I18N['en'] && I18N['en'][key]) || key;
}
function tName(zhName) {
  if (currentLang === 'zh') return zhName;
  return (NAME_I18N[zhName] && NAME_I18N[zhName][currentLang]) || zhName;
}
function tTag(zhTag) {
  if (currentLang === 'zh') return zhTag;
  return (TAG_I18N[zhTag] && TAG_I18N[zhTag][currentLang]) || zhTag;
}
function tStory(id, zhStory) {
  if (currentLang === 'zh') return zhStory;
  return (STORY_BY_ID[id] && STORY_BY_ID[id][currentLang]) || zhStory;
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  var btn = document.getElementById('langSwitchBtn');
  if (btn) btn.textContent = LANG_LABELS[currentLang] || 'LANG';
}

function setLang(lang) {
  currentLang = lang;
  var ov = document.getElementById('langOverlay');
  if (ov) { ov.classList.add('hidden'); ov.style.display = 'none'; }
  applyI18n();
  renderGrid();
  try { localStorage.setItem('qqc_gallery_lang', lang); } catch(e) {}
}

function showLangPicker() {
  var ov = document.getElementById('langOverlay');
  if (ov) { ov.style.display = ''; ov.classList.remove('hidden'); }
}

// ── State ─────────────────────────────────────────────────────────────────
var DATA = [];
var saved = JSON.parse(localStorage.getItem('qianchi_saved') || '[]');
var savedSet = new Set(saved);
var activeTag = null, currentLbId = null, uploadItems = [], allTags = [];
var searchActive = -1, searchHits = [], searchBlocked = false;
var isAdmin = new URLSearchParams(location.search).has('admin');

// ── Init: fetch images.json ────────────────────────────────────────────────
async function init() {
  if (isAdmin) {
    var adminBtn = document.getElementById('adminBtn');
    if (adminBtn) adminBtn.style.display = '';
  }

  // 1. URL param from parent app takes priority (?lang=en/es/zh)
  var urlLang = new URLSearchParams(location.search).get('lang');
  if (urlLang && ['en','es','zh'].includes(urlLang)) {
    currentLang = urlLang;
  } else {
    // 2. Fall back to saved preference
    try {
      var saved_lang = localStorage.getItem('qqc_gallery_lang');
      if (saved_lang) currentLang = saved_lang;
    } catch(e) {}
  }

  // Hide lang overlay if language already known
  if (urlLang || window.parent !== window) {
    var ov = document.getElementById('langOverlay');
    if (ov) ov.style.display = 'none';
  }

  try {
    var resp = await fetch('images.json');
    DATA = await resp.json();
    // Ensure each item has a src path
    DATA.forEach(function(d) { d.src = 'images/' + d.file; });
  } catch(e) {
    console.error('Failed to load images.json', e);
    DATA = [];
  }

  applyI18n();
  collectTags();
  renderTags();
  renderGrid();
}

// ── Gallery functions ──────────────────────────────────────────────────────
function getFiltered() {
  if (!activeTag) return DATA;
  return DATA.filter(function(d) { return d.tags.includes(activeTag); });
}

function collectTags() {
  var tagSet = new Set();
  DATA.forEach(function(d) { d.tags.forEach(function(tg) { tagSet.add(tg); }); });
  allTags = Array.from(tagSet);
}

function renderTags() {
  var wrap = document.getElementById('tagsWrap');
  if (!wrap) return;
  var tags = [null].concat(allTags);
  wrap.innerHTML = tags.map(function(tg) {
    var label = tg ? tTag(tg) : t('all_tag');
    var active = (tg === activeTag) ? ' active' : '';
    return '<button class="tag' + active + '" onclick="filterTag(' + (tg === null ? 'null' : "'" + tg + "'") + ')">' + label + '</button>';
  }).join('');
}

function filterTag(tag) {
  activeTag = tag;
  renderTags();
  renderGrid();
}

function renderGrid() {
  var items = getFiltered();
  var countEl = document.getElementById('countEl');
  if (countEl) countEl.textContent = items.length + t('count_suffix');
  var g = document.getElementById('grid');
  if (!g) return;
  g.innerHTML = items.map(function(d, i) {
    var isSaved = savedSet.has(d.id);
    return '<div class="card" style="--i:' + i + '" onclick="openLb(\'' + d.id + '\')">' +
      '<img src="' + d.src + '" alt="' + tName(d.name) + '" loading="lazy">' +
      '<div class="card-overlay">' +
        '<span class="card-name">' + tName(d.name) + '</span>' +
        '<button class="card-heart ' + (isSaved ? 'saved' : '') + '" onclick="event.stopPropagation();toggleSave(\'' + d.id + '\')">&#9829;</button>' +
      '</div></div>';
  }).join('');
}

function toggleSave(id) {
  if (savedSet.has(id)) savedSet.delete(id); else savedSet.add(id);
  persistSaved(); renderGrid(); updateBadge(); updateLbSave();
}
function persistSaved() { localStorage.setItem('qianchi_saved', JSON.stringify(Array.from(savedSet))); }
function removeSaved(id) { savedSet.delete(id); persistSaved(); renderGrid(); updateBadge(); renderCart(); }

function updateBadge() {
  ['cartBadge','lbCartBadge'].forEach(function(bid) {
    var b = document.getElementById(bid);
    if (!b) return;
    if (savedSet.size > 0) { b.textContent = savedSet.size; b.classList.remove('hidden'); }
    else { b.classList.add('hidden'); }
  });
}

function updateLbSave() {
  var btn = document.getElementById('lbSave');
  if (!btn || !currentLbId) return;
  btn.textContent = savedSet.has(currentLbId) ? t('added_to_list') : t('add_to_list');
  btn.classList.toggle('saved', savedSet.has(currentLbId));
}

function openLb(id) {
  currentLbId = id;
  var d = DATA.find(function(x) { return x.id === id; });
  if (!d) return;
  document.getElementById('lbImg').src = d.src;
  document.getElementById('lbName').textContent = tName(d.name);
  document.getElementById('lbTags').textContent = d.tags.map(tTag).join(' · ');
  document.getElementById('lbStory').textContent = tStory(d.id, d.story || '');
  updateLbSave();
  renderRelated(d);
  document.getElementById('lightbox').classList.add('open');
}

function renderRelated(current) {
  var el = document.getElementById('lbRelated');
  if (!el) return;
  var scored = DATA.filter(function(d) { return d.id !== current.id; }).map(function(d) {
    var shared = 0;
    d.tags.forEach(function(tg) { if (current.tags.indexOf(tg) >= 0) shared++; });
    return { d: d, score: shared };
  });
  scored.sort(function(a, b) { return b.score - a.score || (Math.random() - 0.5); });
  var related = scored.filter(function(s) { return s.score > 0; }).slice(0, 6);
  if (!related.length) { el.innerHTML = ''; return; }
  var html = '<div class="lb-related-label">' + t('related_label') + '</div><div class="lb-related-row">';
  related.forEach(function(r) {
    html += '<div class="lb-related-item" onclick="openLb(\'' + r.d.id + '\')" title="' + tName(r.d.name) + '">' +
      '<img src="' + r.d.src + '" alt="' + tName(r.d.name) + '" loading="lazy"></div>';
  });
  html += '</div>';
  el.innerHTML = html;
}

function closeLb() { document.getElementById('lightbox').classList.remove('open'); currentLbId = null; }

function lbNavigate(dir) {
  var filtered = getFiltered();
  if (!filtered.length || !currentLbId) return;
  var idx = filtered.findIndex(function(d) { return d.id === currentLbId; });
  if (idx < 0) return;
  var next = (idx + dir + filtered.length) % filtered.length;
  var img = document.getElementById('lbImg');
  img.classList.add('fading');
  setTimeout(function() { openLb(filtered[next].id); img.classList.remove('fading'); }, 150);
}
function lbPrev() { lbNavigate(-1); }
function lbNext() { lbNavigate(1); }

function toggleSaveFromLb() { if (currentLbId) toggleSave(currentLbId); }

function openCart()  { document.getElementById('cartPanel').classList.add('open'); renderCart(); }
function closeCart() { document.getElementById('cartPanel').classList.remove('open'); }

function renderCart() {
  var body = document.getElementById('cartBody');
  if (savedSet.size === 0) { body.innerHTML = '<div class="cart-empty">' + t('cart_empty') + '</div>'; return; }
  var items = DATA.filter(function(d) { return savedSet.has(d.id); });
  var names = items.map(function(d) { return tName(d.name); }).join(', ');
  var waText = encodeURIComponent('Hi! I want to book these tattoos:\n' + names);
  var waUrl = 'https://wa.me/34661329006?text=' + waText;
  var html = '<div class="cart-grid">' + items.map(function(d) {
    return '<div class="cart-item" onclick="closeCart();openLb(\'' + d.id + '\')">' +
      '<img src="' + d.src + '" alt="' + tName(d.name) + '">' +
      '<span class="cart-item-name">' + tName(d.name) + '</span>' +
      '<button class="cart-rm" onclick="event.stopPropagation();removeSaved(\'' + d.id + '\')">×</button></div>';
  }).join('') + '</div>';
  html += '<div class="cart-booking">' +
    '<div class="cart-booking-title">' + t('book_title') + '</div>' +
    '<div class="cart-steps">' +
      '<div class="cart-step"><div class="cart-step-num">1</div><div class="cart-step-text">' + t('book_step1') + '</div></div>' +
      '<div class="cart-step"><div class="cart-step-num">2</div><div class="cart-step-text">' + t('book_step2') + '</div></div>' +
      '<div class="cart-step"><div class="cart-step-num">3</div><div class="cart-step-text">' + t('book_step3') + '</div></div>' +
    '</div>' +
    '<a class="cart-wa-btn" href="' + waUrl + '" target="_blank">📱 ' + t('book_wa') + '</a>' +
    '<a class="cart-ig-btn" href="https://www.instagram.com/qian8chi/" target="_blank">📷 ' + t('book_ig') + '</a>' +
  '</div>';
  body.innerHTML = html;
}

// ── Admin / Upload ─────────────────────────────────────────────────────────
function openAdmin()  { document.getElementById('adminPanel').classList.add('open'); }
function closeAdmin() { document.getElementById('adminPanel').classList.remove('open'); }

function handleFiles(files) {
  Array.from(files).forEach(function(file) {
    if (!file.type.startsWith('image/')) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      var item = { id: file.name.replace(/\.[^.]+$/, ''), name: file.name.replace(/\.[^.]+$/, ''), file: file.name, tags: [], story: '', src: e.target.result };
      uploadItems.push(item);
      renderUploadQueue();
    };
    reader.readAsDataURL(file);
  });
  document.getElementById('fileInput').value = '';
}

function renderUploadQueue() {
  var el = document.getElementById('uploadQueue');
  if (!el) return;
  el.innerHTML = uploadItems.map(function(item, i) {
    return '<div class="upload-item">' +
      '<img src="' + item.src + '" alt="">' +
      '<input value="' + item.name + '" placeholder="' + t('name_placeholder') + '" oninput="uploadItems[' + i + '].name=this.value;uploadItems[' + i + '].id=this.value">' +
      '<div class="upload-tags">' + item.tags.map(function(tg) {
        return '<span class="htag solid" onclick="toggleUploadTag(' + i + ',\'' + tg + '\')">' + tg + ' ×</span>';
      }).join('') + '</div>' +
      '<div class="tag-row">' + allTags.map(function(tg) {
        return '<span class="htag' + (item.tags.includes(tg) ? ' solid' : '') + '" onclick="toggleUploadTag(' + i + ',\'' + tg + '\')">' + tg + '</span>';
      }).join('') + '</div>' +
      '<input placeholder="' + t('new_tag_placeholder') + '" onkeydown="if(event.key===\'Enter\'&&this.value.trim()){addNewTag(' + i + ',this.value.trim());this.value=\'\'}">' +
    '</div>';
  }).join('');
}

function toggleUploadTag(i, tag) {
  var idx = uploadItems[i].tags.indexOf(tag);
  if (idx >= 0) uploadItems[i].tags.splice(idx, 1); else uploadItems[i].tags.push(tag);
  renderUploadQueue();
}
function addNewTag(i, tag) {
  if (!allTags.includes(tag)) allTags.push(tag);
  if (!uploadItems[i].tags.includes(tag)) uploadItems[i].tags.push(tag);
  renderUploadQueue();
}

function exportData() {
  var newEntries = uploadItems.map(function(item) {
    return { id: item.id, name: item.name, file: item.file, tags: item.tags, story: item.story };
  });
  var existing = DATA.map(function(d) { return { id: d.id, name: d.name, file: d.file, tags: d.tags, story: d.story }; });
  var merged = existing.concat(newEntries);
  var blob = new Blob([JSON.stringify(merged, null, 2)], { type: 'application/json' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'images.json';
  a.click();
  uploadItems.forEach(function(item) {
    item.src = 'images/' + item.file;
    DATA.push(item);
  });
  collectTags(); renderTags(); renderGrid();
  showToast(t('export_toast'));
  uploadItems = []; renderUploadQueue();
}

function showToast(msg) {
  var el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(function() { el.classList.remove('show'); }, 4000);
}

// ── Cross-frame language sync ──────────────────────────────────────────────
window.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'setLang') setLang(e.data.lang);
});

// ── Keyboard navigation ────────────────────────────────────────────────────
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape')     { closeLb(); closeCart(); closeAdmin(); }
  if (e.key === 'ArrowLeft'  && currentLbId) lbPrev();
  if (e.key === 'ArrowRight' && currentLbId) lbNext();
});

// ── Drop zone ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  var dz = document.getElementById('dropZone');
  var fi = document.getElementById('fileInput');
  if (dz) {
    dz.addEventListener('dragover', function(e) { e.preventDefault(); dz.classList.add('drag-over'); });
    dz.addEventListener('dragleave', function() { dz.classList.remove('drag-over'); });
    dz.addEventListener('drop', function(e) { e.preventDefault(); dz.classList.remove('drag-over'); handleFiles(e.dataTransfer.files); });
  }
  if (fi) fi.addEventListener('change', function() { handleFiles(fi.files); });
  searchActive = -1;
  searchHits = [];
  searchBlocked = false;
// ── SEARCH ────────────────────────────────────────────────────────────────
var CATEGORIES = [
  {zh:'猫',    en:'Cat',         es:'Gato',            key:'猫'},
  {zh:'狗狗',  en:'Dog',         es:'Perro',           key:'狗狗'},
  {zh:'蝴蝶',  en:'Butterfly',   es:'Mariposa',        key:'蝴蝶'},
  {zh:'兔子',  en:'Rabbit',      es:'Conejo',          key:'兔子'},
  {zh:'大象',  en:'Elephant',    es:'Elefante',        key:'大象'},
  {zh:'青蛙',  en:'Frog',        es:'Rana',            key:'青蛙'},
  {zh:'恐龙',  en:'Dinosaur',    es:'Dinosaurio',      key:'恐龙'},
  {zh:'猴子',  en:'Monkey',      es:'Mono',            key:'猴子'},
  {zh:'老鼠',  en:'Mouse',       es:'Ratón',           key:'老鼠'},
  {zh:'熊',    en:'Bear',        es:'Oso',             key:'熊'},
  {zh:'松鼠',  en:'Squirrel',    es:'Ardilla',         key:'松鼠'},
  {zh:'小鸟',  en:'Bird',        es:'Pájaro',          key:'小鸟'},
  {zh:'鱼儿',  en:'Fish',        es:'Pez',             key:'鱼儿'},
  {zh:'蜗牛',  en:'Snail',       es:'Caracol',         key:'蜗牛'},
  {zh:'水母',  en:'Jellyfish',   es:'Medusa',          key:'水母'},
  {zh:'八爪鱼',en:'Octopus',     es:'Pulpo',           key:'八爪鱼'},
  {zh:'海豚',  en:'Dolphin',     es:'Delfín',          key:'海豚'},
  {zh:'龙虾',  en:'Lobster',     es:'Langosta',        key:'龙虾'},
  {zh:'骆驼',  en:'Camel',       es:'Camello',         key:'骆驼'},
  {zh:'马儿',  en:'Horse',       es:'Caballo',         key:'马儿'},
  {zh:'牛',    en:'Cow',         es:'Vaca',            key:'牛'},
  {zh:'蝙蝠',  en:'Bat',         es:'Murciélago',      key:'蝙蝠'},
  {zh:'花栗鼠',en:'Chipmunk',    es:'Ardilla listada', key:'花栗鼠'},
  {zh:'甲壳虫',en:'Beetle',      es:'Escarabajo',      key:'甲壳虫'},
  {zh:'考拉',  en:'Koala',       es:'Koala',           key:'考拉'},
  {zh:'蜘蛛',  en:'Spider',      es:'Araña',           key:'蜘蛛'},
  {zh:'虫',    en:'Bug',         es:'Insecto',         key:'虫'},
  {zh:'海马',  en:'Seahorse',    es:'Caballito de mar',key:'海马'},
  {zh:'鹤',    en:'Crane',       es:'Grulla',          key:'鹤'},
  {zh:'企鹅',  en:'Penguin',     es:'Pingüino',        key:'企鹅'},
  {zh:'小浣熊',en:'Raccoon',     es:'Mapache',         key:'小浣熊'},
  {zh:'猪猪',  en:'Piggy',       es:'Cerdito',         key:'猪猪'},
  {zh:'鸭子',  en:'Duck',        es:'Pato',            key:'鸭子'},
  {zh:'羊',    en:'Sheep',       es:'Oveja',           key:'羊'},
  {zh:'鹦鹉',  en:'Parrot',      es:'Loro',            key:'鹦鹉'},
  {zh:'鳄鱼',  en:'Crocodile',   es:'Cocodrilo',       key:'鳄鱼'},
  {zh:'刺豚',  en:'Pufferfish',  es:'Pez globo',       key:'刺豚'},
  {zh:'奶牛',  en:'Dairy Cow',   es:'Vaca lechera',    key:'奶牛'},
];
 
function catCount(key) {
  return DATA.filter(function(d) {
    return d.name === key || d.name.startsWith(key + ' ') || d.name.startsWith(key + '-');
  }).length;
}
 
function searchHL(str, q) {
  var i = str.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return str;
  return str.slice(0,i) + '<strong>' + str.slice(i,i+q.length) + '</strong>' + str.slice(i+q.length);
}
 
function onSearchInput() {
  var q = document.getElementById('searchInput').value.trim();
  document.getElementById('searchClear').style.display = q ? 'block' : 'none';
  if (!q) { hideSearchSug(); return; }
  searchHits = CATEGORIES.filter(function(c) {
    return c.zh.includes(q) || c.en.toLowerCase().includes(q.toLowerCase()) || c.es.toLowerCase().includes(q.toLowerCase());
  });
  showSearchSug(q);
}
 
function showSearchSug(q) {
  var sug = document.getElementById('searchSug');
  sug.style.display = 'block'; searchActive = -1;
  if (searchHits.length) {
    sug.innerHTML = searchHits.map(function(c, i) {
      var cnt = catCount(c.key);
      return '<div class="sug-item" onmousedown="searchBlocked=true;pickSearchByIndex(' + i + ')" onmouseover="setSearchActive(' + i + ')">' +
        '<span>' + searchHL(c.zh, q) + ' · ' + searchHL(c.en, q) + '</span>' +
        (cnt ? '<span class="sug-count">' + cnt + '</span>' : '') +
      '</div>';
    }).join('');
  } else {
    sug.innerHTML = '<div class="sug-empty">没有找到 "' + q + '" · No results<br>' +
      '<button class="sug-wa" onmousedown="searchBlocked=true;searchWA(\'' + q + '\')">WhatsApp qianchi your idea ↗</button></div>';
  }
}
 
function hideSearchSug() {
  if (searchBlocked) { searchBlocked = false; return; }
  var sug = document.getElementById('searchSug');
  if (sug) sug.style.display = 'none';
}
 
function setSearchActive(i) {
  searchActive = i;
  document.querySelectorAll('.sug-item').forEach(function(el, j) { el.classList.toggle('sug-active', j === i); });
}
 
function pickSearchByIndex(i) {
  if (searchHits[i]) pickSearch(searchHits[i].key);
}
 
function pickSearch(key) {
  var cat = CATEGORIES.find(function(c) { return c.key === key; });
  if (cat) document.getElementById('searchInput').value = cat.zh + ' · ' + cat.en;
  document.getElementById('searchClear').style.display = 'block';
  var sug = document.getElementById('searchSug');
  if (sug) sug.style.display = 'none';
  activeTag = null;
  var filtered = DATA.filter(function(d) {
    return d.name === key || d.name.startsWith(key + ' ') || d.name.startsWith(key + '-');
  });
  var countEl = document.getElementById('countEl');
  if (countEl) countEl.textContent = filtered.length + t('count_suffix');
  var g = document.getElementById('grid');
  if (!g) return;
  g.innerHTML = filtered.map(function(d, i) {
    var isSaved = savedSet.has(d.id);
    return '<div class="card" style="--i:' + i + '" onclick="openLb(\'' + d.id + '\')">' +
      '<img src="' + d.src + '" alt="' + tName(d.name) + '" loading="lazy">' +
      '<div class="card-overlay">' +
        '<span class="card-name">' + tName(d.name) + '</span>' +
        '<button class="card-heart ' + (isSaved ? 'saved' : '') + '" onclick="event.stopPropagation();toggleSave(\'' + d.id + '\')">&#9829;</button>' +
      '</div></div>';
  }).join('');
}
 
function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('searchClear').style.display = 'none';
  searchBlocked = false;
  var sug = document.getElementById('searchSug');
  if (sug) sug.style.display = 'none';
  renderGrid();
}
 
function searchWA(q) {
  window.open('https://wa.me/34661329006?text=' + encodeURIComponent('Hi qianchi! I want a tattoo of: ' + q), '_blank');
}
 
var si = document.getElementById('searchInput');
if (si) {
  si.addEventListener('input', onSearchInput);
  si.addEventListener('blur', hideSearchSug);
  si.addEventListener('keydown', function(e) {
    var sug = document.getElementById('searchSug');
    if (!sug || sug.style.display === 'none') return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setSearchActive(Math.min(searchActive + 1, searchHits.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSearchActive(Math.max(searchActive - 1, 0)); }
    else if (e.key === 'Enter' && searchActive >= 0 && searchHits[searchActive]) pickSearch(searchHits[searchActive].key);
    else if (e.key === 'Escape') { searchBlocked = false; hideSearchSug(); }
  });
}
init();
});