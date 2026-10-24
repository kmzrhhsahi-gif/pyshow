// ================= "Write code" problems (game mode C) =================
// Each problem: topic, lvl, title / desc in en + fa (other languages show English), starter code, and tests.
// A test is [python statements, expected value]. The statements run after the player's code and must put
// their answer in a variable called r. They can use "await" (for async problems).
// The player's code runs in Python inside the browser (Pyodide), so these problems work offline-free only
// when the page can download Pyodide from the internet the first time.

const PROBLEMS = [

  // ---------- variables ----------
  { topic: "variables", lvl: "easy",
    title: { en: "Swap two values", fa: "جابه‌جا کردن دو مقدار" },
    desc: { en: "Write swap(a, b) that returns the two values in swapped order: (b, a).",
           fa: "تابع swap(a, b) رو بنویس که دو مقدار رو جابه‌جا برگردونه: (b, a)." },
    starter: "def swap(a, b):\n    # return the two values swapped\n    pass\n",
    tests: [["r = swap(1, 2)", [2, 1]], ["r = swap('x', 'y')", ["y", "x"]], ["r = swap(0, 0)", [0, 0]]] },
  { topic: "variables", lvl: "medium",
    title: { en: "Celsius to Fahrenheit", fa: "سانتی‌گراد به فارنهایت" },
    desc: { en: "Write c_to_f(c) that converts Celsius to Fahrenheit: c * 9 / 5 + 32.",
           fa: "تابع c_to_f(c) رو بنویس که سانتی‌گراد رو به فارنهایت تبدیل کنه: c * 9 / 5 + 32." },
    starter: "def c_to_f(c):\n    pass\n",
    tests: [["r = c_to_f(0)", 32.0], ["r = c_to_f(100)", 212.0], ["r = c_to_f(-40)", -40.0], ["r = c_to_f(20)", 68.0]] },

  // ---------- if ----------
  { topic: "if", lvl: "easy",
    title: { en: "Sign of a number", fa: "علامت یک عدد" },
    desc: { en: "Write sign(n) that returns \"positive\", \"negative\" or \"zero\".",
           fa: "تابع sign(n) رو بنویس که «positive» یا «negative» یا «zero» برگردونه." },
    starter: "def sign(n):\n    pass\n",
    tests: [["r = sign(5)", "positive"], ["r = sign(-2)", "negative"], ["r = sign(0)", "zero"], ["r = sign(-0.5)", "negative"]] },
  { topic: "if", lvl: "medium",
    title: { en: "School grade", fa: "نمره مدرسه" },
    desc: { en: "Write grade(score): 90 or more is \"A\", 80+ is \"B\", 70+ is \"C\", anything lower is \"F\".",
           fa: "تابع grade(score) رو بنویس: ۹۰ و بالاتر «A»، ۸۰ به بالا «B»، ۷۰ به بالا «C» و کمتر از اون «F»." },
    starter: "def grade(score):\n    pass\n",
    tests: [["r = grade(95)", "A"], ["r = grade(90)", "A"], ["r = grade(85)", "B"], ["r = grade(70)", "C"], ["r = grade(69)", "F"], ["r = grade(0)", "F"]] },

  // ---------- loops ----------
  { topic: "loops", lvl: "easy",
    title: { en: "Sum up to n", fa: "جمع تا n" },
    desc: { en: "Write sum_to(n) that returns 1 + 2 + ... + n (and 0 when n is 0).",
           fa: "تابع sum_to(n) رو بنویس که 1 + 2 + ... + n رو برگردونه (و برای n = 0 مقدار ۰)." },
    starter: "def sum_to(n):\n    pass\n",
    tests: [["r = sum_to(1)", 1], ["r = sum_to(5)", 15], ["r = sum_to(0)", 0], ["r = sum_to(100)", 5050]] },
  { topic: "loops", lvl: "medium",
    title: { en: "Count vowels", fa: "شمارش حروف صدادار" },
    desc: { en: "Write count_vowels(s) that counts the letters a, e, i, o, u in s (upper or lower case).",
           fa: "تابع count_vowels(s) رو بنویس که حروف a و e و i و o و u رو توی s بشمره (بزرگ یا کوچک)." },
    starter: "def count_vowels(s):\n    pass\n",
    tests: [["r = count_vowels('Hello')", 2], ["r = count_vowels('PYTHON')", 1], ["r = count_vowels('rhythm')", 0], ["r = count_vowels('AEIOUaeiou')", 10]] },

  // ---------- functions ----------
  { topic: "functions", lvl: "easy",
    title: { en: "Power with a default", fa: "توان با مقدار پیش‌فرض" },
    desc: { en: "Write power(base, exp=2) that returns base raised to exp. The exponent defaults to 2.",
           fa: "تابع power(base, exp=2) رو بنویس که base به توان exp رو برگردونه. توان به‌صورت پیش‌فرض ۲ هست." },
    starter: "def power(base, exp=2):\n    pass\n",
    tests: [["r = power(3)", 9], ["r = power(2, 5)", 32], ["r = power(5, 0)", 1], ["r = power(exp=3, base=2)", 8]] },
  { topic: "functions", lvl: "medium",
    title: { en: "Apply twice", fa: "دو بار اعمال کن" },
    desc: { en: "Write apply_twice(f, x) that returns f(f(x)).",
           fa: "تابع apply_twice(f, x) رو بنویس که f(f(x)) رو برگردونه." },
    starter: "def apply_twice(f, x):\n    pass\n",
    tests: [["r = apply_twice(lambda v: v + 3, 1)", 7], ["r = apply_twice(str.upper, 'a')", "A"], ["r = apply_twice(lambda v: v * 2, 5)", 20]] },

  // ---------- lists ----------
  { topic: "lists", lvl: "easy",
    title: { en: "Remove duplicates", fa: "حذف تکراری‌ها" },
    desc: { en: "Write remove_dups(nums) that returns a new list without repeated items, keeping the first-seen order.",
           fa: "تابع remove_dups(nums) رو بنویس که یک لیست جدید بدون عضو تکراری برگردونه و ترتیب اولین دیده‌شدن رو نگه داره." },
    starter: "def remove_dups(nums):\n    pass\n",
    tests: [["r = remove_dups([1, 2, 2, 3, 1])", [1, 2, 3]], ["r = remove_dups([])", []], ["r = remove_dups([5, 5, 5])", [5]], ["r = remove_dups([3, 1, 3, 2, 1])", [3, 1, 2]]] },
  { topic: "lists", lvl: "medium",
    title: { en: "Rotate a list", fa: "چرخاندن لیست" },
    desc: { en: "Write rotate(nums, k) that moves the last k items to the front: rotate([1, 2, 3, 4, 5], 2) is [4, 5, 1, 2, 3]. k can be bigger than the list.",
           fa: "تابع rotate(nums, k) رو بنویس که k عضو آخر رو بیاره اول: rotate([1, 2, 3, 4, 5], 2) می‌شه [4, 5, 1, 2, 3]. k می‌تونه از طول لیست بزرگ‌تر باشه." },
    starter: "def rotate(nums, k):\n    pass\n",
    tests: [["r = rotate([1, 2, 3, 4, 5], 2)", [4, 5, 1, 2, 3]], ["r = rotate([1, 2, 3], 3)", [1, 2, 3]], ["r = rotate([1, 2, 3], 4)", [3, 1, 2]], ["r = rotate([], 5)", []]] },

  // ---------- dicts ----------
  { topic: "dicts", lvl: "easy",
    title: { en: "Count words", fa: "شمارش کلمه‌ها" },
    desc: { en: "Write count_words(text) that returns a dict with how many times each word appears (lower case, words split by spaces).",
           fa: "تابع count_words(text) رو بنویس که یک دیکشنری برگردونه از تعداد تکرار هر کلمه (با حروف کوچک، کلمه‌ها با فاصله جدا می‌شن)." },
    starter: "def count_words(text):\n    pass\n",
    tests: [["r = count_words('a b a')", {"a": 2, "b": 1}], ["r = count_words('Hi hi')", {"hi": 2}], ["r = count_words('')", {}], ["r = count_words('go go go')", {"go": 3}]] },
  { topic: "dicts", lvl: "medium",
    title: { en: "Invert a dict", fa: "وارونه کردن دیکشنری" },
    desc: { en: "Write invert(d) that swaps keys and values: {\"a\": 1} becomes {1: \"a\"}.",
           fa: "تابع invert(d) رو بنویس که کلید و مقدار رو جابه‌جا کنه: {\"a\": 1} می‌شه {1: \"a\"}." },
    starter: "def invert(d):\n    pass\n",
    tests: [["r = invert({'a': 1, 'b': 2})", {"1": "a", "2": "b"}], ["r = invert({})", {}], ["r = invert({'x': 'y'})", {"y": "x"}]] },

  // ---------- strings ----------
  { topic: "strings", lvl: "easy",
    title: { en: "Palindrome check", fa: "تشخیص پالیندروم" },
    desc: { en: "Write is_palindrome(s) that returns True when s reads the same backwards, ignoring upper/lower case and spaces.",
           fa: "تابع is_palindrome(s) رو بنویس که اگه s از آخر هم همون‌طوری خونده بشه True برگردونه، بدون توجه به حروف بزرگ/کوچک و فاصله." },
    starter: "def is_palindrome(s):\n    pass\n",
    tests: [["r = is_palindrome('Never odd or even')", true], ["r = is_palindrome('hello')", false], ["r = is_palindrome('')", true], ["r = is_palindrome('A man a plan a canal Panama')", true]] },
  { topic: "strings", lvl: "medium",
    title: { en: "Caesar cipher", fa: "رمز سزار" },
    desc: { en: "Write caesar(text, shift) that moves every lower-case letter forward by shift (wrapping z to a). Other characters stay the same.",
           fa: "تابع caesar(text, shift) رو بنویس که هر حرف کوچک رو به اندازه shift جلو ببره (بعد از z دوباره a). بقیه کاراکترها همون می‌مونن." },
    starter: "def caesar(text, shift):\n    pass\n",
    tests: [["r = caesar('abc', 1)", "bcd"], ["r = caesar('xyz', 3)", "abc"], ["r = caesar('hello, world', 5)", "mjqqt, btwqi"], ["r = caesar('Hi', 1)", "Hj"]] },

  // ---------- errors ----------
  { topic: "errors", lvl: "easy",
    title: { en: "Safe division", fa: "تقسیم امن" },
    desc: { en: "Write safe_div(a, b) that returns a / b, or None when b is 0.",
           fa: "تابع safe_div(a, b) رو بنویس که a / b رو برگردونه، یا اگه b صفر بود None." },
    starter: "def safe_div(a, b):\n    pass\n",
    tests: [["r = safe_div(6, 3)", 2.0], ["r = safe_div(1, 0)", null], ["r = safe_div(0, 5)", 0.0], ["r = safe_div(1, 4)", 0.25]] },
  { topic: "errors", lvl: "medium",
    title: { en: "Safe int", fa: "تبدیل امن به عدد" },
    desc: { en: "Write parse_int(text, default=0) that returns int(text), or default when text is not a valid whole number (including None).",
           fa: "تابع parse_int(text, default=0) رو بنویس که int(text) رو برگردونه، یا اگه text عدد صحیح معتبر نبود (از جمله None) مقدار default." },
    starter: "def parse_int(text, default=0):\n    pass\n",
    tests: [["r = parse_int('42')", 42], ["r = parse_int('x')", 0], ["r = parse_int('x', -1)", -1], ["r = parse_int(' 7 ')", 7], ["r = parse_int(None, 9)", 9], ["r = parse_int('')", 0]] },

  // ---------- oop ----------
  { topic: "oop", lvl: "easy",
    title: { en: "Counter class", fa: "کلاس شمارنده" },
    desc: { en: "Write a class Counter. It starts at 0 in the attribute value, and the method inc() adds 1.",
           fa: "کلاس Counter رو بنویس. توی صفت value از ۰ شروع می‌کنه و متد inc() یکی اضافه می‌کنه." },
    starter: "class Counter:\n    pass\n",
    tests: [["c = Counter()\nc.inc()\nc.inc()\nr = c.value", 2], ["r = Counter().value", 0], ["a = Counter()\nb = Counter()\na.inc()\nr = (a.value, b.value)", [1, 0]]] },
  { topic: "oop", lvl: "medium",
    title: { en: "Stack class", fa: "کلاس پشته" },
    desc: { en: "Write a class Stack with push(x), pop() (removes and returns the last item), peek() (returns it without removing) and size().",
           fa: "کلاس Stack رو بنویس با push(x)، pop() (آخرین عضو رو برمی‌داره و برمی‌گردونه)، peek() (بدون برداشتن برمی‌گردونه) و size()." },
    starter: "class Stack:\n    pass\n",
    tests: [["s = Stack()\ns.push(1)\ns.push(2)\nr = s.pop()", 2], ["s = Stack()\ns.push('a')\nr = (s.peek(), s.size())", ["a", 1]], ["r = Stack().size()", 0], ["s = Stack()\ns.push(1)\ns.push(2)\ns.pop()\nr = s.size()", 1]] },

  // ---------- decorators ----------
  { topic: "decorators", lvl: "easy",
    title: { en: "Double the result", fa: "نتیجه رو دو برابر کن" },
    desc: { en: "Write a decorator double_result(f) so the decorated function returns twice what it normally returns.",
           fa: "دکوراتور double_result(f) رو بنویس که تابع دکوریت‌شده دو برابر مقدار همیشگی رو برگردونه." },
    starter: "def double_result(f):\n    pass\n",
    tests: [["@double_result\ndef f(x):\n    return x + 1\nr = f(3)", 8], ["@double_result\ndef g():\n    return 'ab'\nr = g()", "abab"]] },
  { topic: "decorators", lvl: "medium",
    title: { en: "Count the calls", fa: "شمارش فراخوانی‌ها" },
    desc: { en: "Write a decorator count_calls(f). The decorated function gets an attribute calls that counts how many times it was called.",
           fa: "دکوراتور count_calls(f) رو بنویس. تابع دکوریت‌شده یک صفت calls داره که تعداد فراخوانی‌ها رو می‌شماره." },
    starter: "def count_calls(f):\n    pass\n",
    tests: [["@count_calls\ndef g():\n    return 1\ng()\ng()\ng()\nr = g.calls", 3], ["@count_calls\ndef h(a, b):\n    return a + b\nr = (h(1, 2), h.calls)", [3, 1]], ["@count_calls\ndef k():\n    pass\nr = k.calls", 0]] },

  // ---------- generators ----------
  { topic: "generators", lvl: "easy",
    title: { en: "Even numbers", fa: "عددهای زوج" },
    desc: { en: "Write a generator evens(n) that yields the even numbers from 0 up to (not including) n.",
           fa: "یک ژنراتور evens(n) بنویس که عددهای زوج از ۰ تا قبل از n رو yield کنه." },
    starter: "def evens(n):\n    pass\n",
    tests: [["r = list(evens(7))", [0, 2, 4, 6]], ["r = list(evens(0))", []], ["r = list(evens(3))", [0, 2]]] },
  { topic: "generators", lvl: "medium",
    title: { en: "Fibonacci stream", fa: "جریان فیبوناچی" },
    desc: { en: "Write an endless generator fib_gen() that yields 0, 1, 1, 2, 3, 5, 8 ...",
           fa: "یک ژنراتور بی‌پایان fib_gen() بنویس که ۰ و ۱ و ۱ و ۲ و ۳ و ۵ و ۸ ... رو yield کنه." },
    starter: "def fib_gen():\n    pass\n",
    tests: [["import itertools\nr = list(itertools.islice(fib_gen(), 8))", [0, 1, 1, 2, 3, 5, 8, 13]], ["g = fib_gen()\nnext(g)\nr = next(g)", 1], ["import itertools\nr = list(itertools.islice(fib_gen(), 1))", [0]]] },

  // ---------- recursion ----------
  { topic: "recursion", lvl: "easy",
    title: { en: "Factorial", fa: "فاکتوریل" },
    desc: { en: "Write fact(n) using recursion: fact(5) is 5 * 4 * 3 * 2 * 1 = 120, and fact(0) is 1.",
           fa: "تابع fact(n) رو با بازگشت بنویس: fact(5) می‌شه ۵ × ۴ × ۳ × ۲ × ۱ = ۱۲۰ و fact(0) می‌شه ۱." },
    starter: "def fact(n):\n    pass\n",
    tests: [["r = fact(0)", 1], ["r = fact(1)", 1], ["r = fact(5)", 120], ["r = fact(10)", 3628800]] },
  { topic: "recursion", lvl: "medium",
    title: { en: "Flatten a list", fa: "صاف کردن لیست" },
    desc: { en: "Write flatten(x) that turns a list with lists inside lists into one flat list: [1, [2, [3]]] becomes [1, 2, 3].",
           fa: "تابع flatten(x) رو بنویس که لیست تودرتو رو به یک لیست صاف تبدیل کنه: [1, [2, [3]]] می‌شه [1, 2, 3]." },
    starter: "def flatten(x):\n    pass\n",
    tests: [["r = flatten([1, [2, [3, 4]], 5])", [1, 2, 3, 4, 5]], ["r = flatten([])", []], ["r = flatten([[], [[]]])", []], ["r = flatten([1])", [1]]] },

  // ---------- async ----------
  { topic: "async", lvl: "easy",
    title: { en: "Add later", fa: "جمع با تأخیر" },
    desc: { en: "Write the coroutine add_later(a, b): wait 0.01 seconds with asyncio.sleep, then return a + b.",
           fa: "کوروتین add_later(a, b) رو بنویس: با asyncio.sleep ۰٫۰۱ ثانیه صبر کنه و بعد a + b رو برگردونه." },
    starter: "import asyncio\n\nasync def add_later(a, b):\n    pass\n",
    tests: [["r = await add_later(1, 2)", 3], ["r = await add_later(-5, 5)", 0]] },
  { topic: "async", lvl: "medium",
    title: { en: "Double them all", fa: "همه رو دو برابر کن" },
    desc: { en: "Write the coroutine double_all(nums). It must use the given helper double(n) for every number and run them all at the same time with asyncio.gather. Return the list of results.",
           fa: "کوروتین double_all(nums) رو بنویس. باید برای هر عدد از تابع کمکی double(n) استفاده کنه و همه رو هم‌زمان با asyncio.gather اجرا کنه. لیست نتیجه‌ها رو برگردونه." },
    starter: "import asyncio\n\nasync def double(n):\n    await asyncio.sleep(0.01)\n    return n * 2\n\nasync def double_all(nums):\n    pass\n",
    tests: [["r = await double_all([1, 2, 3])", [2, 4, 6]], ["r = await double_all([])", []], ["r = await double_all([10])", [20]]] },

  // ---------- regex ----------
  { topic: "regex", lvl: "easy",
    title: { en: "Find the numbers", fa: "پیدا کردن عددها" },
    desc: { en: "Write find_numbers(text) that returns a list of the whole numbers (digits in a row) found in text, as ints.",
           fa: "تابع find_numbers(text) رو بنویس که لیست عددهای صحیح (رقم‌های پشت سر هم) پیدا شده در text رو به‌صورت int برگردونه." },
    starter: "import re\n\ndef find_numbers(text):\n    pass\n",
    tests: [["r = find_numbers('a1b22c333')", [1, 22, 333]], ["r = find_numbers('none')", []], ["r = find_numbers('3.5')", [3, 5]], ["r = find_numbers('room 101, floor 7')", [101, 7]]] },
  { topic: "regex", lvl: "medium",
    title: { en: "Simple email check", fa: "بررسی ساده ایمیل" },
    desc: { en: "Write is_email(s): True only if the WHOLE string is letters/digits/dots/underscores, then @, then letters/digits, then a dot and 2 or more letters. Example: ana@site.com",
           fa: "تابع is_email(s) رو بنویس: فقط اگه کل رشته به این شکل باشه True: حروف/رقم/نقطه/آندرلاین، بعد @، بعد حروف/رقم، بعد یک نقطه و ۲ حرف یا بیشتر. مثال: ana@site.com" },
    starter: "import re\n\ndef is_email(s):\n    pass\n",
    tests: [["r = is_email('ana@site.com')", true], ["r = is_email('ana@site')", false], ["r = is_email('@site.com')", false], ["r = is_email('a.b_c@x1.org')", true], ["r = is_email('ana@site.c')", false], ["r = is_email('ana site@x.com')", false], ["r = is_email('ana@site.com ')", false]] },

  // ---------- pygame ----------
  { topic: "pygame", lvl: "easy",
    title: { en: "Do two rects overlap?", fa: "دو مستطیل هم‌پوشانی دارن؟" },
    desc: { en: "A rect is (x, y, width, height). Write overlap(a, b) that returns True when the two rects share some area. Rects that only touch at an edge do not overlap.",
           fa: "یک مستطیل (x, y, عرض, ارتفاع) هست. تابع overlap(a, b) رو بنویس که اگه دو مستطیل ناحیه مشترک داشتن True برگردونه. مستطیل‌هایی که فقط لبه‌شون به هم می‌رسه هم‌پوشانی ندارن." },
    starter: "def overlap(a, b):\n    pass\n",
    tests: [["r = overlap((0, 0, 10, 10), (5, 5, 10, 10))", true], ["r = overlap((0, 0, 10, 10), (10, 0, 10, 10))", false], ["r = overlap((0, 0, 10, 10), (20, 20, 5, 5))", false], ["r = overlap((0, 0, 10, 10), (2, 2, 3, 3))", true]] },
  { topic: "pygame", lvl: "medium",
    title: { en: "Keep the player on screen", fa: "بازیکن رو توی صفحه نگه دار" },
    desc: { en: "Write move_clamped(x, dx, left, right) that returns x + dx, but never less than left and never more than right.",
           fa: "تابع move_clamped(x, dx, left, right) رو بنویس که x + dx رو برگردونه، ولی هیچ‌وقت کمتر از left و بیشتر از right نباشه." },
    starter: "def move_clamped(x, dx, left, right):\n    pass\n",
    tests: [["r = move_clamped(50, 10, 0, 100)", 60], ["r = move_clamped(95, 10, 0, 100)", 100], ["r = move_clamped(5, -10, 0, 100)", 0], ["r = move_clamped(0, 0, 0, 0)", 0]] },

  // ---------- tkinter ----------
  { topic: "tkinter", lvl: "easy",
    title: { en: "Click label", fa: "متن شمارنده کلیک" },
    desc: { en: "A label shows how many times a button was clicked. Write click_text(n): \"Clicked 0 times\", \"Clicked 1 time\", \"Clicked 2 times\" ...",
           fa: "یک برچسب تعداد کلیک روی دکمه رو نشون می‌ده. تابع click_text(n) رو بنویس: «Clicked 0 times»، «Clicked 1 time»، «Clicked 2 times» ..." },
    starter: "def click_text(n):\n    pass\n",
    tests: [["r = click_text(0)", "Clicked 0 times"], ["r = click_text(1)", "Clicked 1 time"], ["r = click_text(2)", "Clicked 2 times"], ["r = click_text(11)", "Clicked 11 times"]] },
  { topic: "tkinter", lvl: "medium",
    title: { en: "Validate an Entry", fa: "اعتبارسنجی Entry" },
    desc: { en: "An Entry asks for an age. Write is_valid_age(text): True only if text is digits only and the number is from 1 to 120.",
           fa: "یک Entry سن می‌پرسه. تابع is_valid_age(text) رو بنویس: فقط اگه text فقط رقم باشه و عدد بین ۱ تا ۱۲۰ باشه True." },
    starter: "def is_valid_age(text):\n    pass\n",
    tests: [["r = is_valid_age('25')", true], ["r = is_valid_age('0')", false], ["r = is_valid_age('121')", false], ["r = is_valid_age('abc')", false], ["r = is_valid_age('')", false], ["r = is_valid_age('-5')", false], ["r = is_valid_age('120')", true], ["r = is_valid_age('7.5')", false]] },
];

// Python helper that runs the player's code and the tests (the same code was checked against real Python here)
const PY_RUNNER = String.raw`import json, ast, inspect, io, contextlib

def _norm(x):
    if isinstance(x, (list, tuple)):
        return [_norm(i) for i in x]
    if isinstance(x, dict):
        return {str(k): _norm(v) for k, v in x.items()}
    if isinstance(x, (set, frozenset)):
        return sorted((_norm(i) for i in x), key=repr)
    return x

async def run_tests(code, tests_json):
    tests = json.loads(tests_json)
    ns = {"__name__": "__main__"}
    out = {"error": None, "results": [], "stdout": ""}
    buf = io.StringIO()
    try:
        with contextlib.redirect_stdout(buf):
            exec(compile(code, "<your code>", "exec"), ns)
    except BaseException as e:
        out["error"] = type(e).__name__ + ": " + str(e)
        out["stdout"] = buf.getvalue()[:500]
        return json.dumps(out)
    for stmt, expected in tests:
        local = dict(ns)
        try:
            with contextlib.redirect_stdout(buf):
                co = compile(stmt, "<test>", "exec", flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT)
                res = eval(co, local)
                if inspect.iscoroutine(res):
                    await res
            got = _norm(local.get("r"))
            want = _norm(expected)
            out["results"].append({"t": stmt, "ok": got == want, "got": repr(got)[:120], "want": repr(want)[:120]})
        except BaseException as e:
            out["results"].append({"t": stmt, "ok": False, "got": type(e).__name__ + ": " + str(e)[:100], "want": repr(expected)[:120]})
    out["stdout"] = buf.getvalue()[:500]
    return json.dumps(out)
`;
