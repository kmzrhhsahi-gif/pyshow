// PyShow – Languages, helpers and page elements.
// The files share one global scope and are loaded in this order: i18n, bank, problems, core, snake, sound, python, game, ui, main.
// ================= Languages =================
const LANGS = {
  en: { name: "English", dir: "ltr" },
  fa: { name: "فارسی", dir: "rtl" },
  ar: { name: "العربية", dir: "rtl" },
  zh: { name: "中文", dir: "ltr" },
  tr: { name: "Türkçe", dir: "ltr" },
  ru: { name: "Русский", dir: "ltr" },
  es: { name: "Español", dir: "ltr" },
};

// Missing keys fall back to English
const T = {
  en: {
    click: "click", panelTitle: "Game setup", difficulty: "Difficulty",
    easy: "Easy", medium: "Medium", hard: "Hard", topics: "Topics you know",
    noTopic: "Pick at least one topic.",
    sideTop: "Top", sideLang: "Language", sideSet: "Settings",
    navHome: "Home", navCompete: "Compete", navMsgs: "Messages",
    navProfile: "Profile", navReport: "Report", navBug: "Bug", navFeedback: "Feedback",
    topTitle: "Top players", topEmpty: "No scores yet. This fills up after your first game.",
    langTitle: "Choose language", setTitle: "Settings", theme: "Theme", light: "Light", dark: "Dark",
    anim: "Snake animation", sound: "Sound", on: "On", off: "Off", replay: "Snake intro", replayBtn: "Replay",
    t_variables: "Variables", t_if: "Conditions", t_loops: "Loops", t_functions: "Functions",
    t_lists: "Lists", t_dicts: "Dictionaries", t_strings: "Strings", t_errors: "Errors",
    modeTitle: "Game", modeA: "Four-choice game", modeB: "Problem-solving game",
    confirm: "Confirm", okBtn: "OK", rvAnswer: "Correct answer", rvBugs: "The bugs were", rvWhy: "Why?", modeC: "Write code", tipModeC: "Write code: solve a small problem by typing Python.", tipModeCD: "Write code: read the task, type your Python in the editor, press Run tests to try it, then Submit. Your code runs in the browser against automatic tests.", runTests: "Run tests", submitCode: "Submit", pyHint: "Write your code, press Run tests to try it, then Submit.", pyLoading: "Running… (Python loads the first time, please wait)", pyOffline: "Python could not be loaded. This mode needs an internet connection the first time.", pyTimeout: "Your code ran for too long (maybe an endless loop) and was stopped.", testsPassed: "Tests passed", codeEditor: "Code editor", gotLbl: "got", wantLbl: "expected", avatarTitle: "Profile picture", guestTag: "Guest", guestNote: "You are playing as a guest: your progress is saved on this device only. Export a backup file to keep it safe, or to move it to an account later.", exportBtn: "Export progress", importBtn: "Import progress", importOk: "Progress imported!", importBad: "This file is not a PyShow backup.", rwLevel: "Level gift", rwLevelD: "One spin for every level you reach", rwNoGift: "No gift yet", lvlGift: "Open level gift", volume: "Volume", themeNeon: "Neon", themeLava: "Lava", themeOcean: "Ocean", rank1: "Hatchling", rank2: "Viper", rank3: "Cobra", rank4: "Python", rank5: "Anaconda", rank6: "Basilisk",
    competeTitle: "Competition", competeText: "Play online against other players. This mode is coming soon.",
    competeBtn: "Find a match", competeSoon: "Online matches are not available yet.",
    resultWin: "Correct!", resultLose: "You lost!", ptsGain: "+{n} points", ptsLoss: "−{n} points", totalLbl: "Total",
    tipHome: "Back to the main page.",
    tipCompete: "Play online against other players.",
    tipMsgs: "System messages, results and warnings.",
    tipTop: "See the best players and their scores.",
    tipProfile: "Your name, level and stats.",
    tipReport: "Report a player, a wrong question or something inappropriate.",
    tipBug: "Found a bug? Tell us what happened.",
    tipFeedback: "Share your ideas, praise or criticism.",
    tipLang: "Change the language of the site.",
    tipSet: "Theme, snake animation, sound and more.",
    tipPlay: "Start a game with your chosen mode, level and topics.",
    tipClick: "Click to wake the snake up!",
    tipModeA: "Four-choice game: read the code and pick the right answer.",
    tipModeB: "Bug hunt: find the bugs in the code.",
    tipEasy: "Short questions, perfect for beginners.",
    tipMedium: "Mixed questions that need some practice.",
    tipHard: "Tricky questions for experienced coders.",
    tipTopic: "Click to select or unselect this topic.",
    tipConfirm: "Lock in your answer.",
    profileTitle: "Profile", username: "Username", level: "Level", games: "Games", best: "Best score",
    save: "Save", saved: "Saved!",
    reportTitle: "Report", reason: "Reason", r_cheat: "Cheating", r_name: "Inappropriate name",
    r_question: "Wrong question or answer", r_other: "Other", details: "Details",
    submit: "Send", thanks: "Thank you! We got it.",
    bugTitle: "Report a bug", bugName: "Short title", steps: "What happened? How can we repeat it?",
    severity: "Severity", s_low: "Minor", s_mid: "Annoying", s_high: "Blocks me",
    fbTitle: "Feedback", rate: "How do you like PyShow?", fbText: "Ideas, praise or criticism",
    demo: "Demo: saved on this device only.", close: "Close",
    msgsTitle: "Messages", msgEmpty: "No messages.", sampleTag: "Sample",
    msg_welcome_t: "Welcome to PyShow!",
    msg_welcome_b: "This is your inbox. Game results, warnings and system notices will show up here.",
    msg_win_t: "You won a game",
    msg_win_b: "On {date} you answered correctly (level: {d}) and earned {pts} points.",
    msg_lose_t: "You lost a game",
    msg_lose_b: "On {date} you answered wrong (level: {d}) and lost {pts} points.",
    msg_report_t: "You were reported",
    msg_report_b: "On {date} another player reported you for: {reason}. Their message: “{text}”. Reports so far: {n}/5. If you reach 5 reports, your account will be banned. From 3 reports you can message support to have your case reviewed. If it is confirmed that you did not cheat, your report count will be reset to 0.",
    sampleReportText: "Answered impossibly fast.",
    bugCount: "How many bugs are there?", bugLine: "Line", bugType: "Bug type",
    bt_paren: "Bracket / parenthesis", bt_colon: "Missing colon", bt_indent: "Indentation", bt_quote: "Quote", bt_name: "Wrong name",
    tipHomeD: "Go back to the main page where you set up and start a game.",
    tipCompeteD: "Online matches against other players. This mode is not open yet.",
    tipTopD: "The leaderboard. Points depend on the level and the topics you chose; wrong answers cost points.",
    tipMsgsD: "Your inbox: game results with date and time, warnings and system notices. A red number means unread messages.",
    tipProfileD: "Change your username and see your level, games played and best score.",
    tipReportD: "Report a player for cheating or a bad name, or a wrong question or answer.",
    tipBugD: "Tell us about a problem on the site: a short title, what happened and how bad it is.",
    tipFeedbackD: "Rate PyShow and send ideas, praise or criticism.",
    tipLangD: "Choose the language of the site: English, Persian, Arabic, Chinese and more.",
    tipSetD: "Switch light or dark theme, turn the snake animation and sound on or off, or replay the snake intro.",
    tipPlayD: "Starts the game with the mode, level and topics you picked. You must select at least one topic.",
    tipClickD: "Click the tongue to wake the snake up and open the site.",
    tipModeAD: "Four-choice game: read the code on the screen, pick one of four answers, then press Confirm. Green means correct, red means wrong.",
    tipModeBD: "Bug hunt: the code can't be edited. Choose how many bugs there are, then pick the line and the bug type for each one.",
    tipEasyD: "Shorter questions and fewer points. A good start if you are new to Python.",
    tipMediumD: "Questions that need some practice. More points than Easy.",
    tipHardD: "The hardest questions with the most points, but a wrong answer costs more too.",
    tipTopicD: "Pick the Python topics you already know. Choosing more topics gives a small point bonus.",
    tipConfirmD: "Locks in your answer. After that you can't change it.",
    t_pro: "Pro", t_oop: "OOP & classes", t_decorators: "Decorators", t_generators: "Generators",
    t_recursion: "Recursion", t_async: "Async / await", t_regex: "Regex", t_pygame: "Pygame (game dev)", t_tkinter: "Tkinter (GUI)",
    proNote: "Choose Pro and every basic topic below is selected for you, and a table of advanced topics opens.",
    proTitle: "Advanced topics", proHint: "Pick the advanced topics you know. Each one counts double for points.",
    tipPro: "Pro mode", tipProD: "For experienced coders. Selects all basic topics and opens advanced ones: OOP, decorators, generators, async, regex, Pygame and Tkinter.",
    navRewards: "Rewards", tipRewards: "Free gifts and missions.",
    tipRewardsD: "Spin the starter, daily and weekly wheels for free XP and finish missions for bigger rewards.",
    rwTitle: "Rewards", rwStarter: "Starter gift", rwDaily: "Daily wheel", rwWeekly: "Weekly wheel",
    rwStarterD: "One time only, for new players", rwDailyD: "Every 24 hours · small prizes", rwWeeklyD: "Every 7 days · biggest prizes",
    rwSpin: "Spin", rwBack: "Back", rwIn: "Ready in {t}", rwClaimed: "Claimed", rwWon: "You won +{n} XP!", spinning: "Spinning…",
    missions: "Missions", missWin: "Win {n} times: {mode} · {diff}", missPro: "Win {n} times with Pro mode on",
    missClaim: "Claim +{n} XP", missNext: "A new mission is ready!",
    xp: "XP", score: "Score", lvlUp: "Level up!", lvlN: "Level {n}", xpToNext: "{n} XP to level {l}",
    country: "Country", pickCountry: "Choose your country",
    topDemo: "Faded rows are sample players. A real online leaderboard needs a server.",
    msg_level_t: "Level up!", msg_level_b: "On {date} you reached level {n}. Keep going!",
    msg_reward_t: "Reward claimed", msg_reward_b: "On {date} you got {pts} XP from: {src}.",
  },
  fa: {
    click: "کلیک", panelTitle: "تنظیمات بازی", difficulty: "سطح سختی",
    easy: "آسان", medium: "متوسط", hard: "سخت", topics: "مباحثی که بلدی",
    noTopic: "حداقل یک مبحث انتخاب کن.",
    sideTop: "برترین‌ها", sideLang: "زبان", sideSet: "تنظیمات",
    navHome: "خانه", navCompete: "رقابت", navMsgs: "پیام‌ها",
    navProfile: "پروفایل", navReport: "ریپورت", navBug: "باگ", navFeedback: "نظرات",
    topTitle: "برترین‌ها", topEmpty: "هنوز امتیازی ثبت نشده. بعد از اولین بازی اینجا پر می‌شه.",
    langTitle: "انتخاب زبان", setTitle: "تنظیمات", theme: "ظاهر", light: "روشن", dark: "تیره",
    anim: "انیمیشن مار", sound: "صدا", on: "روشن", off: "خاموش", replay: "ورودی مار", replayBtn: "پخش دوباره",
    t_variables: "متغیرها", t_if: "شرط‌ها", t_loops: "حلقه‌ها", t_functions: "توابع",
    t_lists: "لیست‌ها", t_dicts: "دیکشنری", t_strings: "رشته‌ها", t_errors: "خطاها",
    modeTitle: "بازی", modeA: "بازی چهارگزینه‌ای", modeB: "بازی حل مشکل",
    confirm: "تایید", okBtn: "باشه", rvAnswer: "جواب درست", rvBugs: "باگ‌ها این‌ها بودن", rvWhy: "چرا؟", modeC: "کد بنویس", tipModeC: "کد بنویس: یک مسئله کوچک رو با تایپ پایتون حل کن.", tipModeCD: "کد بنویس: صورت مسئله رو بخون، کد پایتونت رو توی ادیتور بنویس، با «اجرای تست‌ها» امتحانش کن و بعد ثبت کن. کدت توی مرورگر با تست‌های خودکار اجرا می‌شه.", runTests: "اجرای تست‌ها", submitCode: "ثبت", pyHint: "کدت رو بنویس، با «اجرای تست‌ها» امتحان کن و بعد ثبت کن.", pyLoading: "در حال اجرا… (پایتون بار اول لود می‌شه، کمی صبر کن)", pyOffline: "پایتون لود نشد. این حالت بار اول به اینترنت نیاز داره.", pyTimeout: "کدت خیلی طولانی اجرا شد (شاید حلقه بی‌پایان) و متوقف شد.", testsPassed: "تست‌های موفق", codeEditor: "ادیتور کد", gotLbl: "خروجی", wantLbl: "انتظار", avatarTitle: "عکس پروفایل", guestTag: "مهمان", guestNote: "الان به‌عنوان مهمان بازی می‌کنی: پیشرفتت فقط روی همین دستگاه ذخیره می‌شه. یک فایل پشتیبان بگیر تا از دست نره، یا بعداً به حساب کاربری منتقلش کنی.", exportBtn: "خروجی گرفتن از پیشرفت", importBtn: "وارد کردن پیشرفت", importOk: "پیشرفت وارد شد!", importBad: "این فایل، پشتیبان PyShow نیست.", rwLevel: "هدیه لول", rwLevelD: "برای هر لولی که می‌گیری یک چرخش", rwNoGift: "هدیه‌ای نداری", lvlGift: "باز کردن هدیه لول", volume: "بلندی صدا", themeNeon: "نئون", themeLava: "گدازه", themeOcean: "اقیانوس", rank1: "بچه‌مار", rank2: "افعی", rank3: "کبری", rank4: "پایتون", rank5: "آناکوندا", rank6: "بازیلیسک",
    competeTitle: "رقابت", competeText: "آنلاین با بازیکن‌های دیگه بازی کن. این بخش به‌زودی میاد.",
    competeBtn: "پیدا کردن حریف", competeSoon: "بازی آنلاین هنوز فعال نیست.",
    resultWin: "درسته!", resultLose: "باختی!", ptsGain: "+{n} امتیاز", ptsLoss: "−{n} امتیاز", totalLbl: "مجموع",
    tipHome: "برگشت به صفحه اصلی.",
    tipCompete: "بازی آنلاین با بقیه بازیکن‌ها.",
    tipMsgs: "پیام‌های سیستم، نتیجه‌ها و هشدارها.",
    tipTop: "بهترین بازیکن‌ها و امتیازهاشون رو ببین.",
    tipProfile: "اسم، سطح و آمار خودت.",
    tipReport: "گزارش بازیکن، سوال اشتباه یا محتوای نامناسب.",
    tipBug: "باگ پیدا کردی؟ بگو چی شد.",
    tipFeedback: "ایده، تعریف یا انتقادت رو بگو.",
    tipLang: "زبان سایت رو عوض کن.",
    tipSet: "تم، انیمیشن مار، صدا و بیشتر.",
    tipPlay: "بازی رو با حالت، سطح و مباحث انتخابی شروع کن.",
    tipClick: "کلیک کن تا مار بیدار شه!",
    tipModeA: "بازی چهارگزینه‌ای: کد رو بخون و جواب درست رو انتخاب کن.",
    tipModeB: "پیدا کردن باگ: باگ‌های کد رو پیدا کن.",
    tipEasy: "سوال‌های کوتاه، مناسب تازه‌کارها.",
    tipMedium: "سوال‌های ترکیبی که کمی تمرین می‌خواد.",
    tipHard: "سوال‌های سخت برای حرفه‌ای‌ها.",
    tipTopic: "برای انتخاب یا لغو این مبحث کلیک کن.",
    tipConfirm: "جوابت رو قطعی کن.",
    profileTitle: "پروفایل", username: "نام کاربری", level: "سطح", games: "بازی‌ها", best: "بهترین امتیاز",
    save: "ذخیره", saved: "ذخیره شد!",
    reportTitle: "ریپورت", reason: "دلیل", r_cheat: "تقلب", r_name: "اسم نامناسب",
    r_question: "سوال یا جواب اشتباه", r_other: "سایر", details: "توضیحات",
    submit: "ارسال", thanks: "ممنون! دریافت شد.",
    bugTitle: "گزارش باگ", bugName: "عنوان کوتاه", steps: "چی شد؟ چطور دوباره پیش میاد؟",
    severity: "شدت", s_low: "کم", s_mid: "آزاردهنده", s_high: "جلوم رو می‌گیره",
    fbTitle: "نقد و پیشنهاد", rate: "PyShow رو چطور می‌بینی؟", fbText: "ایده، تعریف یا انتقاد",
    demo: "نسخه نمایشی: فقط روی همین دستگاه ذخیره می‌شه.", close: "بستن",
    msgsTitle: "پیام‌ها", msgEmpty: "پیامی نیست.", sampleTag: "نمونه",
    msg_welcome_t: "به PyShow خوش اومدی!",
    msg_welcome_b: "اینجا صندوق پیام‌هاته. نتیجه بازی‌ها، هشدارها و پیام‌های سیستم اینجا میاد.",
    msg_win_t: "یه بازی رو بردی",
    msg_win_b: "در تاریخ {date} درست جواب دادی (سطح: {d}) و {pts} امتیاز گرفتی.",
    msg_lose_t: "یه بازی رو باختی",
    msg_lose_b: "در تاریخ {date} اشتباه جواب دادی (سطح: {d}) و {pts} امتیاز از دست دادی.",
    msg_report_t: "یکی ریپورتت کرده",
    msg_report_b: "در تاریخ {date} یه بازیکن دیگه شما رو به دلیل «{reason}» ریپورت کرد. متن ریپورت: «{text}». تعداد ریپورت‌ها تا الان: {n} از ۵. اگه به ۵ ریپورت برسید، اکانت شما بن می‌شه. از ۳ ریپورت به بعد می‌تونید به پشتیبانی پیام بدید تا پرونده شما بررسی بشه؛ اگه تأیید بشه که تقلب نکردید، تعداد ریپورت‌هاتون به صفر برمی‌گرده.",
    sampleReportText: "خیلی سریع و غیرممکن جواب داد.",
    bugCount: "چند تا باگ هست؟", bugLine: "خط", bugType: "نوع باگ",
    bt_paren: "پرانتز / براکت", bt_colon: "دو نقطه (:) جا افتاده", bt_indent: "تورفتگی", bt_quote: "کوتیشن", bt_name: "اسم اشتباه",
    tipHomeD: "برگرد به صفحه اصلی که بازی رو تنظیم و شروع می‌کنی.",
    tipCompeteD: "بازی آنلاین با بازیکن‌های دیگه. این بخش هنوز باز نشده.",
    tipTopD: "جدول برترین‌ها. امتیاز به سطح و مباحث انتخابی بستگی داره و جواب غلط امتیاز کم می‌کنه.",
    tipMsgsD: "صندوق پیامت: نتیجه بازی‌ها با تاریخ و ساعت، هشدارها و پیام‌های سیستم. عدد قرمز یعنی پیام نخونده.",
    tipProfileD: "اسمت رو عوض کن و سطح، تعداد بازی‌ها و بهترین امتیازت رو ببین.",
    tipReportD: "بازیکنی رو به خاطر تقلب یا اسم نامناسب ریپورت کن، یا سوال و جواب اشتباه رو گزارش بده.",
    tipBugD: "مشکل سایت رو بگو: یه عنوان کوتاه، اینکه چی شد و چقدر جدیه.",
    tipFeedbackD: "به PyShow امتیاز بده و ایده، تعریف یا انتقادت رو بفرست.",
    tipLangD: "زبان سایت رو انتخاب کن: انگلیسی، فارسی، عربی، چینی و بیشتر.",
    tipSetD: "تم روشن یا تیره، روشن و خاموش کردن انیمیشن مار و صدا، و پخش دوباره ورودی مار.",
    tipPlayD: "بازی رو با حالت، سطح و مباحثی که انتخاب کردی شروع می‌کنه. باید حداقل یک مبحث انتخاب شده باشه.",
    tipClickD: "روی زبون کلیک کن تا مار بیدار شه و سایت باز بشه.",
    tipModeAD: "بازی چهارگزینه‌ای: کد روی صفحه رو بخون، یکی از چهار جواب رو انتخاب کن و تایید بزن. سبز یعنی درست و قرمز یعنی غلط.",
    tipModeBD: "پیدا کردن باگ: کد قابل تغییر نیست. تعداد باگ‌ها رو انتخاب کن و برای هر کدوم خط و نوع باگ رو مشخص کن.",
    tipEasyD: "سوال‌های کوتاه‌تر و امتیاز کمتر. شروع خوبیه اگه با پایتون تازه آشنا شدی.",
    tipMediumD: "سوال‌هایی که کمی تمرین می‌خوان. امتیازشون از آسان بیشتره.",
    tipHardD: "سخت‌ترین سوال‌ها با بیشترین امتیاز، ولی جواب غلط هم امتیاز بیشتری کم می‌کنه.",
    tipTopicD: "مباحث پایتون که بلدی رو انتخاب کن. انتخاب مباحث بیشتر کمی امتیاز بونس می‌ده.",
    tipConfirmD: "جوابت رو قطعی می‌کنه. بعدش دیگه نمی‌تونی عوضش کنی.",
    t_pro: "حرفه‌ای", t_oop: "شی‌گرایی و کلاس", t_decorators: "دکوراتورها", t_generators: "جنراتورها",
    t_recursion: "بازگشتی", t_async: "ناهمگام (async)", t_regex: "ریجکس", t_pygame: "پای‌گیم (بازی‌سازی)", t_tkinter: "تی‌کینتر (رابط گرافیکی)",
    proNote: "اگه «حرفه‌ای» رو بزنی، همه مباحث پایه خودکار انتخاب می‌شن و جدول مباحث پیشرفته باز می‌شه.",
    proTitle: "مباحث پیشرفته", proHint: "مباحث پیشرفته‌ای که بلدی رو انتخاب کن. هر کدوم دو برابر امتیاز حساب می‌شه.",
    tipPro: "حالت حرفه‌ای", tipProD: "برای برنامه‌نویس‌های باتجربه. همه مباحث پایه رو انتخاب می‌کنه و مباحث پیشرفته مثل شی‌گرایی، دکوراتور، جنراتور، async، ریجکس، پای‌گیم و تی‌کینتر رو باز می‌کنه.",
    navRewards: "جوایز", tipRewards: "هدیه‌های رایگان و مأموریت‌ها.",
    tipRewardsD: "گردونه شروع، روزانه و هفتگی رو بچرخون و XP رایگان بگیر؛ با مأموریت‌ها جایزه بزرگ‌تر.",
    rwTitle: "جوایز", rwStarter: "هدیه شروع", rwDaily: "گردونه روزانه", rwWeekly: "گردونه هفتگی",
    rwStarterD: "فقط یک بار، برای بازیکن‌های تازه‌وارد", rwDailyD: "هر ۲۴ ساعت · جایزه‌های کوچک", rwWeeklyD: "هر ۷ روز · بزرگ‌ترین جایزه‌ها",
    rwSpin: "بچرخون", rwBack: "برگشت", rwIn: "{t} دیگه آماده می‌شه", rwClaimed: "دریافت شد", rwWon: "+{n} XP بردی!", spinning: "در حال چرخش…",
    missions: "مأموریت‌ها", missWin: "{n} بار برنده شو: {mode} · {diff}", missPro: "{n} بار با حالت حرفه‌ای برنده شو",
    missClaim: "دریافت +{n} XP", missNext: "مأموریت جدید آماده‌ست!",
    xp: "XP", score: "امتیاز", lvlUp: "ارتقای سطح!", lvlN: "سطح {n}", xpToNext: "{n} XP تا سطح {l}",
    country: "کشور", pickCountry: "کشورت رو انتخاب کن",
    topDemo: "ردیف‌های کم‌رنگ بازیکن‌های نمونه‌ان. جدول آنلاین واقعی به سرور نیاز داره.",
    msg_level_t: "ارتقای سطح!", msg_level_b: "در تاریخ {date} به سطح {n} رسیدی. ادامه بده!",
    msg_reward_t: "جایزه دریافت شد", msg_reward_b: "در تاریخ {date} از «{src}» مقدار {pts} XP گرفتی.",
  },
  ar: {
    click: "انقر", panelTitle: "إعداد اللعبة", difficulty: "مستوى الصعوبة",
    easy: "سهل", medium: "متوسط", hard: "صعب", topics: "المواضيع التي تعرفها",
    noTopic: "اختر موضوعًا واحدًا على الأقل.",
    sideTop: "الأفضل", sideLang: "اللغة", sideSet: "الإعدادات",
    navHome: "الرئيسية", navCompete: "منافسة", navMsgs: "الرسائل",
    navProfile: "الملف", navReport: "إبلاغ", navBug: "خطأ", navFeedback: "آراء",
    topTitle: "أفضل اللاعبين", topEmpty: "لا توجد نتائج بعد. ستظهر هنا بعد أول لعبة.",
    langTitle: "اختر اللغة", setTitle: "الإعدادات", theme: "المظهر", light: "فاتح", dark: "داكن",
    anim: "حركة الأفعى", on: "تشغيل", off: "إيقاف",
    t_variables: "المتغيرات", t_if: "الشروط", t_loops: "الحلقات", t_functions: "الدوال",
    t_lists: "القوائم", t_dicts: "القواميس", t_strings: "النصوص", t_errors: "الأخطاء",
  },
  zh: {
    click: "点击", panelTitle: "游戏设置", difficulty: "难度",
    easy: "简单", medium: "中等", hard: "困难", topics: "你掌握的主题",
    noTopic: "请至少选择一个主题。",
    sideTop: "排行榜", sideLang: "语言", sideSet: "设置",
    navHome: "首页", navCompete: "对战", navMsgs: "消息",
    navProfile: "个人资料", navReport: "举报", navBug: "Bug", navFeedback: "反馈",
    topTitle: "排行榜", topEmpty: "还没有成绩，完成第一局后会显示在这里。",
    langTitle: "选择语言", setTitle: "设置", theme: "主题", light: "浅色", dark: "深色",
    anim: "蛇的动画", on: "开", off: "关",
    t_variables: "变量", t_if: "条件", t_loops: "循环", t_functions: "函数",
    t_lists: "列表", t_dicts: "字典", t_strings: "字符串", t_errors: "错误处理",
  },
  tr: {
    click: "tıkla", panelTitle: "Oyun ayarları", difficulty: "Zorluk",
    easy: "Kolay", medium: "Orta", hard: "Zor", topics: "Bildiğin konular",
    noTopic: "En az bir konu seç.",
    sideTop: "En iyiler", sideLang: "Dil", sideSet: "Ayarlar",
    navHome: "Ana sayfa", navCompete: "Rekabet", navMsgs: "Mesajlar",
    navProfile: "Profil", navReport: "Bildir", navBug: "Hata", navFeedback: "Geri bildirim",
    topTitle: "En iyi oyuncular", topEmpty: "Henüz puan yok. İlk oyundan sonra burada görünecek.",
    langTitle: "Dil seç", setTitle: "Ayarlar", theme: "Tema", light: "Açık", dark: "Koyu",
    anim: "Yılan animasyonu", on: "Açık", off: "Kapalı",
    t_variables: "Değişkenler", t_if: "Koşullar", t_loops: "Döngüler", t_functions: "Fonksiyonlar",
    t_lists: "Listeler", t_dicts: "Sözlükler", t_strings: "Metinler", t_errors: "Hatalar",
  },
  ru: {
    click: "нажми", panelTitle: "Настройки игры", difficulty: "Сложность",
    easy: "Легко", medium: "Средне", hard: "Сложно", topics: "Темы, которые ты знаешь",
    noTopic: "Выбери хотя бы одну тему.",
    sideTop: "Лучшие", sideLang: "Язык", sideSet: "Настройки",
    navHome: "Главная", navCompete: "Соревнование", navMsgs: "Сообщения",
    navProfile: "Профиль", navReport: "Жалоба", navBug: "Баг", navFeedback: "Отзыв",
    topTitle: "Лучшие игроки", topEmpty: "Пока нет результатов. Они появятся после первой игры.",
    langTitle: "Выбери язык", setTitle: "Настройки", theme: "Тема", light: "Светлая", dark: "Тёмная",
    anim: "Анимация змеи", on: "Вкл", off: "Выкл",
    t_variables: "Переменные", t_if: "Условия", t_loops: "Циклы", t_functions: "Функции",
    t_lists: "Списки", t_dicts: "Словари", t_strings: "Строки", t_errors: "Ошибки",
  },
  es: {
    click: "clic", panelTitle: "Ajustes del juego", difficulty: "Dificultad",
    easy: "Fácil", medium: "Medio", hard: "Difícil", topics: "Temas que conoces",
    noTopic: "Elige al menos un tema.",
    sideTop: "Top", sideLang: "Idioma", sideSet: "Ajustes",
    navHome: "Inicio", navCompete: "Competir", navMsgs: "Mensajes",
    navProfile: "Perfil", navReport: "Reportar", navBug: "Error", navFeedback: "Opinión",
    topTitle: "Mejores jugadores", topEmpty: "Aún no hay puntuaciones. Aparecerán tras tu primera partida.",
    langTitle: "Elige idioma", setTitle: "Ajustes", theme: "Tema", light: "Claro", dark: "Oscuro",
    anim: "Animación de la serpiente", on: "Activada", off: "Desactivada",
    t_variables: "Variables", t_if: "Condiciones", t_loops: "Bucles", t_functions: "Funciones",
    t_lists: "Listas", t_dicts: "Diccionarios", t_strings: "Cadenas", t_errors: "Errores",
  },
};
for (const l in EXTRA_T) Object.assign(T[l], EXTRA_T[l]);
for (const l in EXTRA_T2) Object.assign(T[l], EXTRA_T2[l]);
for (const l in EXTRA_T3) Object.assign(T[l], EXTRA_T3[l]);   // i18n.js

// ================= Helpers =================
const $ = (id) => document.getElementById(id);
const SVGNS = "http://www.w3.org/2000/svg";

function svgEl(tag, attrs = {}) {
  const e = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  return e;
}

function el(tag, attrs = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") e.className = v;
    else if (k === "text") e.textContent = v;
    else if (k === "value") e.value = v;
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v);
  }
  kids.forEach((kid) => e.append(kid));
  return e;
}

// Everything is saved per account. For now everybody is a "guest" (saved on this device only).
// When real accounts exist, set ACCOUNT to the user id and every key is saved under that account.
const ACCOUNT = "guest";
const MEM = {};                          // used if the browser blocks localStorage
const nsKey = (k) => (ACCOUNT === "guest" ? k : ACCOUNT + ":" + k);
function load(key, fallback) {
  const k = nsKey(key);
  try { const v = localStorage.getItem(k); if (v !== null) return v; } catch (e) { if (k in MEM) return MEM[k]; }
  return fallback;
}
function save(key, value) {
  const k = nsKey(key);
  try { localStorage.setItem(k, value); } catch (e) { MEM[k] = value; }
}
// Backup file: lets a guest keep or move their progress (later it can be imported into an account)
const SAVE_KEYS = ["pyshow_games", "pyshow_bonus", "pyshow_claims", "pyshow_mission", "pyshow_lvlgifts", "pyshow_inbox",
  "pyshow_name", "pyshow_country", "pyshow_avatar", "pyshow_lang", "pyshow_theme", "pyshow_vol", "pyshow_anim", "pyshow_sound", "pyshow_seeded", "pyshow_custom", "pyshow_streak", "pyshow_combo", "pyshow_daily", "pyshow_music", "pyshow_mvol", "pyshow_lives", "pyshow_tour"];
function exportProgress() {
  const data = {};
  SAVE_KEYS.forEach((k) => { const v = load(k, null); if (v !== null) data[k] = v; });
  const blob = new Blob([JSON.stringify({ app: "pyshow", v: 1, account: ACCOUNT, at: Date.now(), data }, null, 1)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `pyshow-progress-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
function importProgress(text) {
  try {
    const o = JSON.parse(text);
    if (!o || o.app !== "pyshow" || typeof o.data !== "object") return false;
    SAVE_KEYS.forEach((k) => { if (typeof o.data[k] === "string") save(k, o.data[k]); });
    return true;
  } catch (e) { return false; }
}
function pushLocal(key, item) {
  let arr = [];
  try { arr = JSON.parse(load(key, "[]")); } catch (e) {}
  arr.push(item);
  save(key, JSON.stringify(arr.slice(-50)));
}

const state = {
  lang: load("pyshow_lang", "en"),   // English by default
  theme: load("pyshow_theme", "light"),
  vol: Number(load("pyshow_vol", "70")),
  anim: load("pyshow_anim", window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches ? "off" : "on"),
  sound: load("pyshow_sound", "on"),
};
if (!T[state.lang]) state.lang = "en";

function t(key) { return (T[state.lang] && T[state.lang][key]) || T.en[key] || key; }

function fmtDate(ts) {
  const d = new Date(ts);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

const wait = (ms) => new Promise((r) => setTimeout(r, state.anim === "on" ? ms : Math.min(ms, 80)));

// ================= Elements =================
const app = $("app");
const home = $("home");
const game = $("game");
const msg = $("msg");
const panel = $("panel");
const modalBg = $("modal-bg");
const modalEl = $("modal");
const modalTitle = $("modal-title");
const modalBody = $("modal-body");
const tip = $("tip");
const heroSvg = $("hero-svg");
const frameSvg = $("frame-svg");
const gameInner = $("game-inner");

function applyLang() {
  const dir = LANGS[state.lang].dir;
  document.documentElement.lang = state.lang;
  panel.dir = dir;
  modalEl.dir = dir;
  tip.dir = dir;
  $("result-card").dir = dir;
  $("compete").dir = dir;
  $("game-inner").dir = "ltr";
  document.querySelectorAll(".blk").forEach((b) => { b.dir = dir; });
  document.querySelectorAll("[data-i18n]").forEach((e) => { e.textContent = t(e.dataset.i18n); });
  updateXpBar();
  msg.textContent = "";
  $("compete-msg").textContent = "";
}

const THEMES = [["light", "#f6f8f7", "#22a33a", "light"], ["dark", "#0b110e", "#3ddc84", "dark"],
  ["neon", "#170a2b", "#ff3df0", "themeNeon"], ["lava", "#1f0f0b", "#ff6a1a", "themeLava"], ["ocean", "#0b2230", "#19c9b0", "themeOcean"]];
function applyTheme() {
  if (!THEMES.some((x) => x[0] === state.theme)) state.theme = "light";
  document.documentElement.setAttribute("data-theme", state.theme);
}

document.querySelectorAll(".nav").forEach((n, i) => {
  n.style.setProperty("--d", (0.2 + i * 0.1) + "s");
});

