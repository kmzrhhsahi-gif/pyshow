// ================= Question bank =================
// 20 four-choice questions (QUESTIONS) and 15 bug-hunt questions (BUGS) for each of the 16 topics.
// To add more: copy an entry and change it.
//  - QUESTIONS: `answer` is the index of the right option inside `options` (the game shuffles them).
//    `why` is the short explanation shown after the game: { en: "...", fa: "..." }.
//  - BUGS: written with mkBug(). A plain string is a clean line; ["text", "type"] is a line that contains a bug.
//    Bug types: paren, colon, indent, quote, name. Line numbers are counted for you.
//  - lvl is easy / medium / hard; the game prefers questions that match the chosen difficulty.

const BUG_TYPES = ["paren", "colon", "indent", "quote", "name"];
const BASIC_TOPICS = ["variables", "if", "loops", "functions", "lists", "dicts", "strings", "errors"];
const PRO_TOPICS = ["oop", "decorators", "generators", "recursion", "async", "regex", "pygame", "tkinter"];

const QUESTIONS = [

  // ---------- variables ----------
  { topic: "variables", lvl: "easy",
    code: `a = [1, 2, 3]
b = a
b.append(4)
a = a + [5]
print(len(a), len(b))`,
    options: ["5 4", "4 4", "5 5", "4 5"], answer: 0,
    why: { en: "b = a points to the same list, so b.append(4) changes a too (length 4). Then a = a + [5] builds a NEW list for a (length 5); b stays length 4.",
           fa: "b = a یعنی هر دو به یک لیست اشاره می‌کنن، پس append روی b روی a هم اثر می‌ذاره (طول ۴). بعدش a = a + [5] یک لیست جدید برای a می‌سازه (طول ۵) و b همون ۴ می‌مونه." } },
  { topic: "variables", lvl: "easy",
    code: `x = 10
y = x
y += 5
print(x, y)`,
    options: ["10 15", "15 15", "10 10", "5 15"], answer: 0,
    why: { en: "Numbers cannot be changed in place: y += 5 creates a new number for y, and x stays 10.",
           fa: "عددها تغییرناپذیرن: y += 5 یک مقدار جدید برای y می‌سازه و x همون ۱۰ می‌مونه." } },
  { topic: "variables", lvl: "easy",
    code: `a, b = 3, 4
a, b = b, a + b
print(a, b)`,
    options: ["4 7", "7 7", "4 4", "3 7"], answer: 0,
    why: { en: "The right side is computed first with the OLD values: (b, a + b) = (4, 7). Then both names are assigned at once.",
           fa: "اول سمت راست با مقدارهای قدیمی حساب می‌شه: (b, a + b) = (4, 7). بعد هر دو اسم هم‌زمان مقدار می‌گیرن." } },
  { topic: "variables", lvl: "easy",
    code: `name = "Ana"
age = 30
print(f"{name} is {age + 1}")`,
    options: ["Ana is 31", "Ana is 30", "name is 31", "Ana is age + 1"], answer: 0,
    why: { en: "Inside an f-string the braces are evaluated: {name} gives Ana and {age + 1} gives 31.",
           fa: "داخل f-string هر چی بین آکولاده حساب می‌شه: {name} می‌شه Ana و {age + 1} می‌شه ۳۱." } },
  { topic: "variables", lvl: "medium",
    code: `x = 5

def f():
    x = 10

f()
print(x)`,
    options: ["5", "10", "Error", "None"], answer: 0,
    why: { en: "Assigning inside a function creates a LOCAL x. The global x is never touched, so it is still 5.",
           fa: "مقداردهی داخل تابع یک x محلی می‌سازه. x سراسری دست‌نخورده می‌مونه و هنوز ۵ هست." } },
  { topic: "variables", lvl: "medium",
    code: `a = "7"
b = 3
print(a * b)`,
    options: ["777", "21", "Error", "10"], answer: 0,
    why: { en: "A string times an int repeats the string: \"7\" * 3 = \"777\". Nothing is converted to a number.",
           fa: "رشته ضرب در عدد یعنی تکرار رشته: \"7\" * 3 می‌شه \"777\". چیزی به عدد تبدیل نمی‌شه." } },
  { topic: "variables", lvl: "medium",
    code: `print(type(3 / 2).__name__, 7 // 2, -7 // 2)`,
    options: ["float 3 -4", "int 3 -3", "float 3 -3", "float 4 -4"], answer: 0,
    why: { en: "/ always gives a float. // floors the result: 7 // 2 = 3, and -7 // 2 = -4 (floor goes DOWN, not toward zero).",
           fa: "/ همیشه float می‌ده. // رو به پایین گرد می‌کنه: 7 // 2 = 3 ولی -7 // 2 = -4 (به سمت پایین، نه به سمت صفر)." } },
  { topic: "variables", lvl: "hard",
    code: `x = [1, 2]
y = [1, 2]
z = x
print(x == y, x is y, x is z)`,
    options: ["True False True", "True True True", "False False True", "True False False"], answer: 0,
    why: { en: "== compares values (equal), `is` compares identity. x and y are two different lists; z is the same object as x.",
           fa: "== مقدارها رو مقایسه می‌کنه و is هویت (همون شیء بودن) رو. x و y دو لیست جدا هستن ولی z همون x هست." } },
  { topic: "variables", lvl: "hard",
    code: `x = 1

def outer():
    x = 2
    def inner():
        nonlocal x
        x += 1
        return x
    return inner()

print(outer(), x)`,
    options: ["3 1", "3 3", "2 1", "Error"], answer: 0,
    why: { en: "nonlocal makes inner use outer's x (2 -> 3). The global x is untouched, so it stays 1.",
           fa: "nonlocal باعث می‌شه inner از x تابع outer استفاده کنه (۲ ← ۳). x سراسری دست‌نخورده و ۱ می‌مونه." } },
  { topic: "variables", lvl: "hard",
    code: `t = (1, [2, 3])
t[1].append(4)
print(t)`,
    options: ["(1, [2, 3, 4])", "(1, [2, 3])", "Error", "(1, [2, 3], 4)"], answer: 0,
    why: { en: "A tuple cannot change which objects it holds, but a list inside it is still mutable, so append works.",
           fa: "تاپل نمی‌ذاره اعضاش عوض بشن، ولی لیست داخلش هنوز تغییرپذیره؛ پس append کار می‌کنه." } },
  { topic: "variables", lvl: "easy",
    code: `x = 5
x = x * 2
x -= 3
print(x)`,
    options: ["7", "2", "10", "5"], answer: 0,
    why: { en: "x starts at 5, becomes 10 after x * 2, then 7 after subtracting 3.",
           fa: "x اول ۵ هست، بعد از x * 2 می‌شه ۱۰ و بعد از کم کردن ۳ می‌شه ۷." } },
  { topic: "variables", lvl: "easy",
    code: `a = "5"
b = int(a) + 2
print(a, b)`,
    options: ["5 7", "5 5", "7 7", "52 7"], answer: 0,
    why: { en: "int(a) makes a new number for b (5 + 2 = 7), but a itself is still the string \"5\".",
           fa: "int(a) یک عدد جدید برای b می‌سازه (۵ + ۲ = ۷) ولی خود a همچنان رشته «5» می‌مونه." } },
  { topic: "variables", lvl: "easy",
    code: `x = y = []
x.append(1)
print(y)`,
    options: ["[1]", "[]", "[1, 1]", "1"], answer: 0,
    why: { en: "x = y = [] makes both names point to the SAME list, so appending through x shows up in y.",
           fa: "x = y = [] باعث می‌شه هر دو اسم به یک لیست اشاره کنن، پس append از طریق x توی y هم دیده می‌شه." } },
  { topic: "variables", lvl: "medium",
    code: `print(10 / 4, 10 // 4, 10 % 4)`,
    options: ["2.5 2 2", "2.5 2.5 2", "2 2 2", "2.5 2 0"], answer: 0,
    why: { en: "/ gives the true division 2.5, // gives the whole part 2, and % gives the remainder 2.",
           fa: "/ تقسیم واقعی (۲.۵) می‌ده، // قسمت صحیح (۲) و % باقیمانده (۲) رو." } },
  { topic: "variables", lvl: "medium",
    code: `a = [1, 2]
b = a[:]
b.append(3)
print(a, b)`,
    options: ["[1, 2] [1, 2, 3]", "[1, 2, 3] [1, 2, 3]", "[1, 2] [1, 2]", "[1, 2, 3] [1, 2]"], answer: 0,
    why: { en: "a[:] makes a copy, so b is a separate list. Appending to b does not touch a.",
           fa: "a[:] یک کپی می‌سازه، پس b یک لیست جداست و append روی b به a دست نمی‌زنه." } },
  { topic: "variables", lvl: "medium",
    code: `s = "hi"
s.upper()
print(s)`,
    options: ["hi", "HI", "None", "Hi"], answer: 0,
    why: { en: "Strings cannot be changed. s.upper() returns a new string, but we threw it away, so s is still \"hi\".",
           fa: "رشته‌ها تغییرناپذیرن. s.upper() یک رشته جدید برمی‌گردونه ولی ما ذخیرش نکردیم، پس s همون «hi» می‌مونه." } },
  { topic: "variables", lvl: "medium",
    code: `print(round(2.5), round(3.5), int(-2.7))`,
    options: ["2 4 -2", "3 4 -3", "3 3 -2", "2 4 -3"], answer: 0,
    why: { en: "round() rounds exact halves to the nearest EVEN number: 2.5 gives 2 and 3.5 gives 4. int() cuts off the decimals toward zero: -2.7 gives -2.",
           fa: "round() نیمه‌ها رو به نزدیک‌ترین عدد زوج گرد می‌کنه: ۲.۵ می‌شه ۲ و ۳.۵ می‌شه ۴. int() اعشار رو به سمت صفر می‌بُره: ‎-2.7 می‌شه ‎-2." } },
  { topic: "variables", lvl: "hard",
    code: `x = [1, 2, 3]
y = x
x += [4]
print(y)`,
    options: ["[1, 2, 3, 4]", "[1, 2, 3]", "[4]", "[1, 2, 3, [4]]"], answer: 0,
    why: { en: "For lists, += changes the list IN PLACE (like extend), so y, which is the same list, sees the change.",
           fa: "برای لیست‌ها += لیست رو سر جاش تغییر می‌ده (مثل extend)، پس y که همون لیسته تغییر رو می‌بینه." } },
  { topic: "variables", lvl: "hard",
    code: `a = [[0] * 2] * 2
a[0][0] = 1
print(a)`,
    options: ["[[1, 0], [1, 0]]", "[[1, 0], [0, 0]]", "[[0, 0], [0, 0]]", "[[1, 1], [1, 1]]"], answer: 0,
    why: { en: "The outer * 2 repeats a reference to the SAME inner list, so both rows are one object and the change shows in both.",
           fa: "* ۲ بیرونی فقط یک ارجاع به همون لیست داخلی رو تکرار می‌کنه، پس هر دو سطر یک شیء هستن و تغییر توی هر دو دیده می‌شه." } },
  { topic: "variables", lvl: "hard",
    code: `x = 0.1 + 0.2
print(x == 0.3, round(x, 2) == 0.3)`,
    options: ["False True", "True True", "True False", "False False"], answer: 0,
    why: { en: "Floats are stored in binary, so 0.1 + 0.2 is slightly more than 0.3 and == fails. After round(x, 2) it equals 0.3.",
           fa: "اعشاری‌ها دودویی ذخیره می‌شن، پس ۰.۱ + ۰.۲ کمی از ۰.۳ بیشتره و == جواب نمی‌ده. بعد از round(x, 2) برابر ۰.۳ می‌شه." } },

  // ---------- if ----------
  { topic: "if", lvl: "easy",
    code: `x = 7
r = "A" if x > 5 and x % 2 else "B" if x > 3 else "C"
print(r, "D" if x < 10 else "E")`,
    options: ["A D", "A E", "B D", "C E"], answer: 0,
    why: { en: "x = 7: it is > 5 and odd (7 % 2 is 1, which counts as True), so r = \"A\". Since 7 < 10 the second part gives \"D\".",
           fa: "x = 7 هم بزرگ‌تر از ۵ هست و هم فرده (۷ % ۲ = ۱ یعنی درست)، پس r = «A». چون ۷ < ۱۰ هست قسمت دوم «D» می‌شه." } },
  { topic: "if", lvl: "easy",
    code: `n = 0
if n:
    print("yes")
else:
    print("no")`,
    options: ["no", "yes", "None", "Error"], answer: 0,
    why: { en: "0 counts as False in a condition, so the else branch runs.",
           fa: "عدد ۰ توی شرط یعنی False، پس شاخه else اجرا می‌شه." } },
  { topic: "if", lvl: "easy",
    code: `score = 85
if score >= 90:
    g = "A"
elif score >= 80:
    g = "B"
else:
    g = "C"
print(g)`,
    options: ["B", "A", "C", "None"], answer: 0,
    why: { en: "The checks run from the top and stop at the first True one: 85 fails >= 90 but passes >= 80.",
           fa: "شرط‌ها از بالا چک می‌شن و اولین شرط درست اجرا می‌شه: ۸۵ شرط ≥ ۹۰ رو رد می‌شه ولی ≥ ۸۰ رو پاس می‌کنه." } },
  { topic: "if", lvl: "easy",
    code: `print(5 > 3 > 1, 5 > 3 > 4)`,
    options: ["True False", "True True", "False False", "False True"], answer: 0,
    why: { en: "Chained comparisons check each pair: 5 > 3 and 3 > 1 is True, but 3 > 4 is False.",
           fa: "مقایسه زنجیره‌ای هر جفت رو چک می‌کنه: ۵ > ۳ و ۳ > ۱ درسته، ولی ۳ > ۴ غلطه." } },
  { topic: "if", lvl: "medium",
    code: `print(bool(""), bool(" "), bool([]), bool([0]))`,
    options: ["False True False True", "False False False False", "True True False True", "False True True True"], answer: 0,
    why: { en: "Empty containers and empty strings are False. A space is a real character and [0] has one item, so both are True.",
           fa: "رشته خالی و کانتینر خالی False هستن. فاصله یک کاراکتر واقعیه و [0] یک عضو داره، پس هر دو True هستن." } },
  { topic: "if", lvl: "medium",
    code: `x = 15
if x % 3 == 0:
    print("Fizz", end="")
if x % 5 == 0:
    print("Buzz", end="")`,
    options: ["FizzBuzz", "Fizz", "Buzz", "Fizz Buzz"], answer: 0,
    why: { en: "These are two separate if statements and both are True for 15. end=\"\" prevents the newline and space.",
           fa: "این‌ها دو if جدا هستن و برای ۱۵ هر دو درستن. end=\"\" جلوی رفتن به خط بعد و فاصله رو می‌گیره." } },
  { topic: "if", lvl: "medium",
    code: `print(0 or "a", 1 and "b", None or 0)`,
    options: ["a b 0", "True True False", "a b None", "0 b 0"], answer: 0,
    why: { en: "`or` returns the first truthy value (or the last one), `and` returns the first falsy value (or the last one). They return real values, not just True/False.",
           fa: "or اولین مقدار درست رو برمی‌گردونه (یا آخری رو) و and اولین مقدار غلط رو (یا آخری رو). مقدار واقعی برمی‌گردونن، نه فقط True/False." } },
  { topic: "if", lvl: "hard",
    code: `v = 0
if v == False:
    print("A", end=" ")
if v is False:
    print("B", end=" ")
if not v:
    print("C", end=" ")`,
    options: ["A C", "A B C", "B C", "C"], answer: 0,
    why: { en: "0 == False is True, but 0 is not the same object as False, so `is` fails. `not 0` is True.",
           fa: "۰ == False درسته ولی ۰ همون شیء False نیست، پس is رد می‌شه. `not 0` درسته." } },
  { topic: "if", lvl: "hard",
    code: `cmd = "go north"
match cmd.split():
    case ["go", d]:
        print("move", d)
    case ["quit"]:
        print("bye")
    case _:
        print("?")`,
    options: ["move north", "bye", "?", "move go"], answer: 0,
    why: { en: "split() gives ['go', 'north']. The first pattern matches a 2-item list starting with \"go\" and captures the second item as d.",
           fa: "split() لیست ['go', 'north'] می‌ده. الگوی اول با لیست دو عضوی که با \"go\" شروع بشه جور درمیاد و عضو دوم توی d می‌ره." } },
  { topic: "if", lvl: "hard",
    code: `x = 10
r = "big" if x > 5 else "mid" if x > 2 else "small"
print(r, "yes" if x else "no", x if x < 5 else -x)`,
    options: ["big yes -10", "mid yes 10", "big no -10", "big yes 10"], answer: 0,
    why: { en: "x > 5 gives \"big\"; x is non-zero so \"yes\"; x is not < 5, so the last part is -x = -10.",
           fa: "x > 5 پس «big»؛ x غیرصفره پس «yes»؛ x کوچک‌تر از ۵ نیست پس قسمت آخر -x یعنی ‎-۱۰ می‌شه." } },
  { topic: "if", lvl: "easy",
    code: `x = 4
r = ""
if x > 3:
    r += "a"
if x > 5:
    r += "b"
else:
    r += "c"
print(r)`,
    options: ["ac", "a", "abc", "ab"], answer: 0,
    why: { en: "The first if is True so \"a\" is added. The second if is False, so its else adds \"c\". Result: \"ac\".",
           fa: "if اول درسته پس «a» اضافه می‌شه. if دوم غلطه پس else اجرا می‌شه و «c» اضافه می‌شه. نتیجه: «ac»." } },
  { topic: "if", lvl: "easy",
    code: `age = 18
print("adult" if age >= 18 else "minor")`,
    options: ["adult", "minor", "True", "18"], answer: 0,
    why: { en: "age >= 18 is True because 18 equals 18, so the first value is chosen.",
           fa: "age >= 18 درسته چون ۱۸ برابر ۱۸ هست، پس مقدار اول انتخاب می‌شه." } },
  { topic: "if", lvl: "easy",
    code: `print(not True, not 0, not "")`,
    options: ["False True True", "True False False", "False False True", "False True False"], answer: 0,
    why: { en: "not True is False. 0 and an empty string are falsy, so not gives True for both.",
           fa: "not True می‌شه False. ۰ و رشته خالی falsy هستن، پس not برای هر دو True می‌ده." } },
  { topic: "if", lvl: "medium",
    code: `x = -3
print("pos" if x > 0 else "zero" if x == 0 else "neg")`,
    options: ["neg", "pos", "zero", "-3"], answer: 0,
    why: { en: "x > 0 is False, x == 0 is False, so the last else gives \"neg\".",
           fa: "x > 0 غلطه و x == 0 هم غلطه، پس else آخر «neg» رو می‌ده." } },
  { topic: "if", lvl: "medium",
    code: `print(3 in [1, 2, 3] and 3 not in [4, 5], "a" in "cat")`,
    options: ["True True", "True False", "False True", "False False"], answer: 0,
    why: { en: "3 is in the first list and not in the second, so the and is True. \"a\" is a letter of \"cat\", so that is True too.",
           fa: "۳ توی لیست اول هست و توی لیست دوم نیست، پس and درسته. «a» هم یکی از حرف‌های «cat» هست، پس اون هم True می‌شه." } },
  { topic: "if", lvl: "medium",
    code: `print(sum(bool(v) for v in [0, "", None, "0", []]))`,
    options: ["1", "0", "2", "5"], answer: 0,
    why: { en: "Only \"0\" is truthy: it is a non-empty string (the character zero). 0, \"\", None and [] are all falsy.",
           fa: "فقط «0» truthy هست: یک رشته غیرخالیه (کاراکتر صفر). ۰ و «» و None و [] همه falsy هستن." } },
  { topic: "if", lvl: "medium",
    code: `a = 5
b = 10
print(a if a > b else b, min(a, b) if a != b else 0)`,
    options: ["10 5", "5 10", "10 10", "5 0"], answer: 0,
    why: { en: "a > b is False so the first part gives b = 10. a != b is True so the second part gives min(5, 10) = 5.",
           fa: "a > b غلطه پس بخش اول b یعنی ۱۰ رو می‌ده. a != b درسته پس بخش دوم min(5, 10) یعنی ۵ رو می‌ده." } },
  { topic: "if", lvl: "hard",
    code: `x = 3
if x > 1:
    print("A", end="")
elif x > 2:
    print("B", end="")
if x > 2:
    print("C", end="")`,
    options: ["AC", "A", "ABC", "AB"], answer: 0,
    why: { en: "In an if/elif chain only the first True branch runs, so B is skipped. The last if is a separate statement and is True, so C prints.",
           fa: "توی زنجیره if/elif فقط اولین شاخه درست اجرا می‌شه، پس B رد می‌شه. if آخر یک دستور جداست و درسته، پس C چاپ می‌شه." } },
  { topic: "if", lvl: "hard",
    code: `print(1 < 2 == 2, (1 < 2) == 2, 1 == 1 in [True])`,
    options: ["True False True", "True True True", "False False True", "True False False"], answer: 0,
    why: { en: "1 < 2 == 2 is chained: (1 < 2) and (2 == 2), True. With brackets, True == 2 is False. The last one chains 1 == 1 and 1 in [True], which is True.",
           fa: "1 < 2 == 2 زنجیره‌ایه: (1 < 2) و (2 == 2) پس True. با پرانتز، True == 2 می‌شه False. آخری 1 == 1 و 1 in [True] رو چک می‌کنه که درسته." } },
  { topic: "if", lvl: "hard",
    code: `print("x" and "" or "z", 0 or [] or "end")`,
    options: ["z end", "x end", "z []", "'' end"], answer: 0,
    why: { en: "\"x\" and \"\" gives \"\" (the first falsy), then \"\" or \"z\" gives \"z\". 0 or [] gives [], then [] or \"end\" gives \"end\".",
           fa: "\"x\" and \"\" مقدار «» (اولین falsy) رو می‌ده و بعد «» or \"z\" می‌شه «z». 0 or [] می‌شه [] و بعد [] or \"end\" می‌شه «end»." } },

  // ---------- loops ----------
  { topic: "loops", lvl: "easy",
    code: `total = 0
for i in range(1, 10):
    if i % 3 == 0:
        continue
    if i > 7:
        break
    total += i
print(total)`,
    options: ["19", "12", "20", "27"], answer: 0,
    why: { en: "Numbers 1..7 skipping 3 and 6: 1+2+4+5+7 = 19. At i = 8 the loop breaks.",
           fa: "عددهای ۱ تا ۷ بدون ۳ و ۶: ۱+۲+۴+۵+۷ = ۱۹. وقتی i = 8 بشه حلقه break می‌شه." } },
  { topic: "loops", lvl: "easy",
    code: `for i in range(3):
    print(i, end=" ")`,
    options: ["0 1 2", "1 2 3", "0 1 2 3", "1 2"], answer: 0,
    why: { en: "range(3) starts at 0 and stops BEFORE 3.",
           fa: "range(3) از ۰ شروع می‌شه و قبل از ۳ تموم می‌شه." } },
  { topic: "loops", lvl: "easy",
    code: `s = 0
for i in range(2, 11, 4):
    s += i
print(s)`,
    options: ["18", "28", "12", "20"], answer: 0,
    why: { en: "range(2, 11, 4) gives 2, 6, 10. Sum = 18.",
           fa: "range(2, 11, 4) عددهای ۲ و ۶ و ۱۰ رو می‌ده. جمعشون ۱۸ می‌شه." } },
  { topic: "loops", lvl: "easy",
    code: `i = 0
while i < 3:
    i += 1
print(i)`,
    options: ["3", "2", "4", "0"], answer: 0,
    why: { en: "The loop stops as soon as i reaches 3, so i is 3 afterwards.",
           fa: "به محض اینکه i به ۳ برسه حلقه تموم می‌شه، پس بعدش i برابر ۳ هست." } },
  { topic: "loops", lvl: "medium",
    code: `c = 0
for i in range(4):
    for j in range(i):
        c += 1
print(c)`,
    options: ["6", "10", "4", "16"], answer: 0,
    why: { en: "The inner loop runs i times: 0 + 1 + 2 + 3 = 6.",
           fa: "حلقه داخلی i بار اجرا می‌شه: ۰ + ۱ + ۲ + ۳ = ۶." } },
  { topic: "loops", lvl: "medium",
    code: `for n in [1, 3, 5]:
    if n % 2 == 0:
        print("even")
        break
else:
    print("none")`,
    options: ["none", "even", "even none", "Error"], answer: 0,
    why: { en: "The else of a loop runs only if the loop was NOT stopped by break. No even number is found, so \"none\" is printed.",
           fa: "else در حلقه فقط وقتی اجرا می‌شه که حلقه با break قطع نشده باشه. عدد زوجی پیدا نمی‌شه پس «none» چاپ می‌شه." } },
  { topic: "loops", lvl: "medium",
    code: `print([x * x for x in range(6) if x % 2])`,
    options: ["[1, 9, 25]", "[0, 4, 16]", "[1, 4, 9, 16, 25]", "[1, 3, 5]"], answer: 0,
    why: { en: "Only odd x pass the filter (1, 3, 5), and each is squared: 1, 9, 25.",
           fa: "فقط x فرد از فیلتر رد می‌شه (۱ و ۳ و ۵) و هر کدوم به توان ۲ می‌رسه: ۱ و ۹ و ۲۵." } },
  { topic: "loops", lvl: "hard",
    code: `for i, (a, b) in enumerate(zip("ab", [1, 2, 3])):
    print(i, a, b, end=";")`,
    options: ["0 a 1;1 b 2;", "0 a 1;1 b 2;2 None 3;", "a 1;b 2;", "1 a 1;2 b 2;"], answer: 0,
    why: { en: "zip stops at the shortest input (2 letters), and enumerate counts from 0.",
           fa: "zip با کوتاه‌ترین ورودی (۲ حرف) تموم می‌شه و enumerate از ۰ می‌شماره." } },
  { topic: "loops", lvl: "hard",
    code: `nums = [2, 4, 6, 1]
for n in nums:
    if n % 2 == 0:
        nums.remove(n)
print(nums)`,
    options: ["[4, 1]", "[1]", "[2, 4, 6, 1]", "[4, 6, 1]"], answer: 0,
    why: { en: "Removing items while looping shifts the list, so the loop SKIPS items: it removes 2, then jumps over 4 and removes 6. Result: [4, 1].",
           fa: "حذف عضو حین حلقه لیست رو جابه‌جا می‌کنه و حلقه چند عضو رو رد می‌کنه: ۲ حذف می‌شه، ۴ پرش می‌شه و ۶ حذف می‌شه. نتیجه [4, 1]." } },
  { topic: "loops", lvl: "hard",
    code: `print(sum(1 for i in range(10) if i % 3 == 0), list(range(10, 0, -3)))`,
    options: ["4 [10, 7, 4, 1]", "3 [10, 7, 4, 1]", "4 [10, 7, 4]", "4 [9, 6, 3, 0]"], answer: 0,
    why: { en: "0, 3, 6, 9 are divisible by 3 (4 items). range(10, 0, -3) counts down: 10, 7, 4, 1.",
           fa: "۰ و ۳ و ۶ و ۹ بر ۳ بخش‌پذیرن (۴ تا). range(10, 0, -3) نزولی می‌شمره: ۱۰ و ۷ و ۴ و ۱." } },
  { topic: "loops", lvl: "easy",
    code: `print(list(range(5, 0, -2)))`,
    options: ["[5, 3, 1]", "[5, 3, 1, -1]", "[4, 2]", "[5, 4, 3, 2, 1]"], answer: 0,
    why: { en: "The range starts at 5 and steps by -2 until it would reach 0 or below: 5, 3, 1.",
           fa: "رنج از ۵ شروع می‌کنه و با گام ‎-2 پایین میاد تا قبل از رسیدن به ۰: ۵ و ۳ و ۱." } },
  { topic: "loops", lvl: "easy",
    code: `n = 1
while n < 20:
    n *= 2
print(n)`,
    options: ["32", "16", "20", "64"], answer: 0,
    why: { en: "n doubles: 1, 2, 4, 8, 16, 32. 16 is still less than 20 so it doubles once more, then 32 stops the loop.",
           fa: "n دو برابر می‌شه: ۱ و ۲ و ۴ و ۸ و ۱۶ و ۳۲. ۱۶ هنوز از ۲۰ کمتره پس یک بار دیگه دو برابر می‌شه و با ۳۲ حلقه تموم می‌شه." } },
  { topic: "loops", lvl: "easy",
    code: `s = ""
for ch in "abc":
    s = ch + s
print(s)`,
    options: ["cba", "abc", "a", "cab"], answer: 0,
    why: { en: "Each new letter is put in FRONT of s: \"a\", then \"ba\", then \"cba\".",
           fa: "هر حرف جدید جلوی s قرار می‌گیره: «a» بعد «ba» بعد «cba»." } },
  { topic: "loops", lvl: "medium",
    code: `count = 0
for i in range(10):
    if i % 2:
        continue
    count += i
print(count)`,
    options: ["20", "25", "45", "10"], answer: 0,
    why: { en: "continue skips odd numbers, so only 0, 2, 4, 6, 8 are added: 20.",
           fa: "continue عددهای فرد رو رد می‌کنه، پس فقط ۰ و ۲ و ۴ و ۶ و ۸ جمع می‌شن: ۲۰." } },
  { topic: "loops", lvl: "medium",
    code: `for i in range(3):
    pass
print(i)`,
    options: ["2", "3", "Error", "0"], answer: 0,
    why: { en: "The loop variable stays alive after the loop and keeps its last value, which is 2.",
           fa: "متغیر حلقه بعد از حلقه هم می‌مونه و آخرین مقدارش یعنی ۲ رو نگه می‌داره." } },
  { topic: "loops", lvl: "medium",
    code: `r = []
for i in range(3):
    for j in range(3):
        if i == j:
            break
        r.append((i, j))
print(r)`,
    options: ["[(1, 0), (2, 0), (2, 1)]", "[(1, 0), (2, 1)]", "[(0, 1), (0, 2), (1, 2)]", "[(0, 0), (1, 1), (2, 2)]"], answer: 0,
    why: { en: "break only leaves the INNER loop as soon as j == i. So i=0 adds nothing, i=1 adds (1, 0), i=2 adds (2, 0) and (2, 1).",
           fa: "break فقط از حلقه داخلی بیرون میاد، اون هم وقتی j == i بشه. پس برای i=0 چیزی اضافه نمی‌شه، برای i=1 فقط (1, 0) و برای i=2 هم (2, 0) و (2, 1)." } },
  { topic: "loops", lvl: "medium",
    code: `print({k: len(k) for k in ["a", "bb", "cc"]})`,
    options: ["{'a': 1, 'bb': 2, 'cc': 2}", "{'a': 1, 'bb': 2}", "{1: 'a', 2: 'bb'}", "{'a': 1, 'bb': 2, 'cc': 4}"], answer: 0,
    why: { en: "The dict comprehension maps each word to its length. Each word is a different key, so all three are kept.",
           fa: "dict comprehension هر کلمه رو به طولش نگاشت می‌کنه. هر کلمه یک کلید متفاوته، پس هر سه می‌مونن." } },
  { topic: "loops", lvl: "hard",
    code: `i = 0
while True:
    i += 3
    if i > 10:
        break
print(i)`,
    options: ["12", "10", "11", "9"], answer: 0,
    why: { en: "i goes 3, 6, 9, 12. Only 12 is greater than 10, and break happens right after the add, so i stays 12.",
           fa: "i می‌شه ۳ و ۶ و ۹ و ۱۲. فقط ۱۲ از ۱۰ بزرگ‌تره و break درست بعد از جمع اجرا می‌شه، پس i همون ۱۲ می‌مونه." } },
  { topic: "loops", lvl: "hard",
    code: `for i in range(3):
    i += 10
print(i)`,
    options: ["12", "13", "2", "12 12 12"], answer: 0,
    why: { en: "Changing i inside the loop does not affect the range. On the last round i is first set to 2 by range, then becomes 12.",
           fa: "عوض کردن i داخل حلقه روی range اثر نداره. توی دور آخر range اول i رو ۲ می‌کنه و بعد می‌شه ۱۲." } },
  { topic: "loops", lvl: "hard",
    code: `it = iter([1, 2, 3, 4])
print(next(it), sum(it))`,
    options: ["1 9", "1 10", "1 2", "10 0"], answer: 0,
    why: { en: "next(it) takes the first item (1) out of the iterator. sum(it) then adds only what is left: 2 + 3 + 4 = 9.",
           fa: "next(it) اولین عضو (۱) رو از iterator بیرون می‌کشه. بعد sum(it) فقط باقیمونده رو جمع می‌کنه: ۲ + ۳ + ۴ = ۹." } },

  // ---------- functions ----------
  { topic: "functions", lvl: "medium",
    code: `def add(item, bucket=[]):
    bucket.append(item)
    return bucket

add(1)
add(2)
print(add(3))`,
    options: ["[1, 2, 3]", "[3]", "[1, 2]", "Error"], answer: 0,
    why: { en: "The default list is created once and shared by every call, so it keeps growing: [1], [1, 2], then [1, 2, 3].",
           fa: "لیست پیش‌فرض فقط یک بار ساخته می‌شه و بین همه فراخوانی‌ها مشترکه، پس بزرگ‌تر می‌شه: [1] بعد [1, 2] بعد [1, 2, 3]." } },
  { topic: "functions", lvl: "easy",
    code: `def sq(x):
    return x * x

print(sq(sq(2)))`,
    options: ["16", "8", "4", "Error"], answer: 0,
    why: { en: "sq(2) = 4, then sq(4) = 16.",
           fa: "sq(2) می‌شه ۴ و بعد sq(4) می‌شه ۱۶." } },
  { topic: "functions", lvl: "easy",
    code: `def f(a, b=2):
    return a + b

print(f(1), f(1, 5))`,
    options: ["3 6", "3 5", "1 6", "3 3"], answer: 0,
    why: { en: "b defaults to 2 only when it is not given: f(1) = 3, f(1, 5) = 6.",
           fa: "b فقط وقتی داده نشه ۲ می‌شه: f(1) = 3 و f(1, 5) = 6." } },
  { topic: "functions", lvl: "easy",
    code: `def hi():
    print("hi", end=" ")

x = hi()
print(x)`,
    options: ["hi None", "hi", "hi hi", "None"], answer: 0,
    why: { en: "hi() prints \"hi\" but has no return, so it returns None. x is None.",
           fa: "hi() چاپ می‌کنه ولی return نداره پس None برمی‌گردونه. x می‌شه None." } },
  { topic: "functions", lvl: "medium",
    code: `def f(*a, **k):
    return len(a), len(k)

print(f(1, 2, x=3))`,
    options: ["(2, 1)", "(3, 0)", "(2, 0)", "(1, 2)"], answer: 0,
    why: { en: "*a collects extra positional arguments (1, 2) and **k collects keyword ones (x=3).",
           fa: "*a آرگومان‌های موقعیتی اضافه (۱ و ۲) رو جمع می‌کنه و **k آرگومان‌های اسمی (x=3) رو." } },
  { topic: "functions", lvl: "medium",
    code: `def make():
    n = 0
    def inc():
        nonlocal n
        n += 1
        return n
    return inc

c = make()
c()
print(c(), make()())`,
    options: ["2 1", "1 1", "2 2", "3 1"], answer: 0,
    why: { en: "Each make() call creates its own n. c keeps its own counter (second call -> 2); a fresh make()() starts at 1.",
           fa: "هر بار make() یک n جدا می‌سازه. c شمارنده خودش رو داره (فراخوانی دوم ← ۲) و make()() جدید از ۱ شروع می‌کنه." } },
  { topic: "functions", lvl: "medium",
    code: `print((lambda x, y=3: x * y)(2), (lambda *a: len(a))(1, 2, 3))`,
    options: ["6 3", "5 3", "6 6", "2 3"], answer: 0,
    why: { en: "First lambda: 2 * 3 = 6. Second lambda counts its 3 arguments.",
           fa: "لامبدای اول: ۲ × ۳ = ۶. لامبدای دوم تعداد ۳ آرگومانش رو می‌شماره." } },
  { topic: "functions", lvl: "medium",
    code: `def f(x):
    x.append(1)
    x = [9]
    return x

a = []
print(f(a), a)`,
    options: ["[9] [1]", "[9] []", "[1] [1]", "[9] [9]"], answer: 0,
    why: { en: "append changes the list a points to. Then x = [9] only rebinds the local name, so the return value is [9] while a stays [1].",
           fa: "append همون لیستی که a بهش اشاره می‌کنه رو عوض می‌کنه. بعدش x = [9] فقط اسم محلی رو عوض می‌کنه، پس خروجی [9] هست ولی a هنوز [1] می‌مونه." } },
  { topic: "functions", lvl: "hard",
    code: `fns = [lambda: i for i in range(3)]
print([f() for f in fns])`,
    options: ["[2, 2, 2]", "[0, 1, 2]", "[3, 3, 3]", "[1, 1, 1]"], answer: 0,
    why: { en: "The lambdas look up i when CALLED, not when created. By then the loop has ended with i = 2.",
           fa: "لامبدا i رو موقع فراخوانی می‌خونه، نه موقع ساخت. تا اون موقع حلقه تموم شده و i برابر ۲ هست." } },
  { topic: "functions", lvl: "hard",
    code: `def f(a, /, b, *, c):
    return a + b + c

print(f(1, 2, c=3))`,
    options: ["6", "Error", "3", "123"], answer: 0,
    why: { en: "Before / are positional-only (a), after * are keyword-only (c). The call matches exactly: 1 + 2 + 3 = 6.",
           fa: "قبل از / فقط موقعیتی (a) و بعد از * فقط اسمی (c). فراخوانی دقیقاً جور درمیاد: ۱ + ۲ + ۳ = ۶." } },
  { topic: "functions", lvl: "easy",
    code: `def f(x):
    return x + 1

print(f(f(f(0))))`,
    options: ["3", "1", "2", "4"], answer: 0,
    why: { en: "Each call adds 1 to the result of the previous one, three times in total: 3.",
           fa: "هر فراخوانی به نتیجه قبلی ۱ اضافه می‌کنه، در کل سه بار: ۳." } },
  { topic: "functions", lvl: "easy",
    code: `def g(a, b):
    return a - b

print(g(b=1, a=5))`,
    options: ["4", "-4", "Error", "6"], answer: 0,
    why: { en: "Keyword arguments match by name, not by position: a = 5 and b = 1, so 5 - 1 = 4.",
           fa: "آرگومان‌های اسمی با اسم جا می‌افتن نه با ترتیب: a = 5 و b = 1 پس ۵ - ۱ = ۴." } },
  { topic: "functions", lvl: "easy",
    code: `def f():
    return 1, 2

a, b = f()
print(a + b)`,
    options: ["3", "12", "(1, 2)", "Error"], answer: 0,
    why: { en: "return 1, 2 gives a tuple. Unpacking puts 1 in a and 2 in b, so a + b = 3.",
           fa: "return 1, 2 یک تاپل برمی‌گردونه. unpack کردن ۱ رو توی a و ۲ رو توی b می‌ذاره، پس a + b = 3." } },
  { topic: "functions", lvl: "medium",
    code: `def f(n):
    if n <= 1:
        return 1
    return n * f(n - 1)

print(f(5))`,
    options: ["120", "15", "25", "24"], answer: 0,
    why: { en: "This is a factorial: 5 * 4 * 3 * 2 * 1 = 120.",
           fa: "این فاکتوریله: ۵ * ۴ * ۳ * ۲ * ۱ = ۱۲۰." } },
  { topic: "functions", lvl: "medium",
    code: `def f(x):
    x = x + 1
    return x

a = 5
f(a)
print(a, f(a))`,
    options: ["5 6", "6 6", "5 5", "6 5"], answer: 0,
    why: { en: "The x inside f is a local name; changing it does not change a. So a stays 5, and f(a) returns 6.",
           fa: "x داخل f یک اسم محلیه و تغییرش a رو عوض نمی‌کنه. پس a همون ۵ می‌مونه و f(a) مقدار ۶ رو برمی‌گردونه." } },
  { topic: "functions", lvl: "medium",
    code: `def f(*args):
    return sum(args)

print(f(), f(1, 2, 3))`,
    options: ["0 6", "Error", "None 6", "0 3"], answer: 0,
    why: { en: "With no arguments args is an empty tuple, and sum of nothing is 0. With 1, 2, 3 the sum is 6.",
           fa: "بدون آرگومان، args یک تاپل خالیه و جمع هیچی ۰ هست. با ۱ و ۲ و ۳ جمع ۶ می‌شه." } },
  { topic: "functions", lvl: "medium",
    code: `def f(x, y):
    return x, y

print(f(*[1, 2]), f(**{"x": 3, "y": 4}))`,
    options: ["(1, 2) (3, 4)", "([1, 2], None) (3, 4)", "(1, 2) (x, y)", "Error"], answer: 0,
    why: { en: "* unpacks a list into positional arguments and ** unpacks a dict into keyword arguments. Both calls return a tuple of the two values.",
           fa: "* لیست رو به آرگومان‌های موقعیتی باز می‌کنه و ** دیکشنری رو به آرگومان‌های اسمی. هر دو فراخوانی یک تاپل از دو مقدار برمی‌گردونن." } },
  { topic: "functions", lvl: "hard",
    code: `def outer():
    x = 1
    def inner():
        return x
    x = 2
    return inner()

print(outer())`,
    options: ["2", "1", "Error", "None"], answer: 0,
    why: { en: "inner reads x when it is CALLED, not when it is defined. By then x has been changed to 2.",
           fa: "inner مقدار x رو موقع فراخوانی می‌خونه نه موقع تعریف. تا اون موقع x به ۲ تغییر کرده." } },
  { topic: "functions", lvl: "hard",
    code: `x = 10
def f(x=x):
    return x

x = 20
print(f(), f(5))`,
    options: ["10 5", "20 5", "20 20", "10 10"], answer: 0,
    why: { en: "A default value is computed ONCE when def runs, when x was 10. Later changes to x do not matter. f(5) overrides the default.",
           fa: "مقدار پیش‌فرض فقط یک بار، موقع اجرای def محاسبه می‌شه، یعنی وقتی x برابر ۱۰ بود. تغییرهای بعدی x مهم نیستن. f(5) مقدار پیش‌فرض رو نادیده می‌گیره." } },
  { topic: "functions", lvl: "hard",
    code: `def gen():
    yield 1
    yield 2

g = gen()
print(next(g), list(g))`,
    options: ["1 [2]", "1 [1, 2]", "[1, 2] []", "1 2"], answer: 0,
    why: { en: "A generator remembers where it stopped. next(g) takes 1, so list(g) only collects what is left: [2].",
           fa: "generator یادش می‌مونه کجا وایساده. next(g) عدد ۱ رو می‌گیره، پس list(g) فقط باقیمونده رو جمع می‌کنه: [2]." } },

  // ---------- lists ----------
  { topic: "lists", lvl: "medium",
    code: `nums = [5, 3, 8, 1]
nums.sort(reverse=True)
top = nums[:2]
nums.pop(0)
print(top, nums)`,
    options: ["[8, 5] [5, 3, 1]", "[8, 5] [3, 1]", "[5, 3] [5, 3, 1]", "[8, 5] [8, 5, 3, 1]"], answer: 0,
    why: { en: "After sorting: [8, 5, 3, 1]. top is a copy of the first two: [8, 5]. pop(0) removes 8 from nums, leaving [5, 3, 1].",
           fa: "بعد از مرتب‌سازی: [8, 5, 3, 1]. top کپی دو تای اوله: [8, 5]. pop(0) عدد ۸ رو از nums برمی‌داره و [5, 3, 1] می‌مونه." } },
  { topic: "lists", lvl: "easy",
    code: `a = [1, 2, 3]
print(a[-1], a[1:], len(a))`,
    options: ["3 [2, 3] 3", "1 [2, 3] 3", "3 [1, 2] 3", "3 [2, 3] 2"], answer: 0,
    why: { en: "a[-1] is the last item (3), a[1:] starts at index 1 -> [2, 3], and len is 3.",
           fa: "a[-1] آخرین عضو (۳) هست، a[1:] از اندیس ۱ شروع می‌شه ← [2, 3] و طول ۳ هست." } },
  { topic: "lists", lvl: "easy",
    code: `a = [3, 1, 2]
b = sorted(a)
print(a, b)`,
    options: ["[3, 1, 2] [1, 2, 3]", "[1, 2, 3] [1, 2, 3]", "[3, 1, 2] None", "None [1, 2, 3]"], answer: 0,
    why: { en: "sorted() returns a NEW sorted list and leaves a unchanged (a.sort() would change a).",
           fa: "sorted() یک لیست مرتب جدید برمی‌گردونه و a رو عوض نمی‌کنه (a.sort() خود a رو عوض می‌کرد)." } },
  { topic: "lists", lvl: "easy",
    code: `a = [1, 2]
a.append([3, 4])
print(len(a))`,
    options: ["3", "4", "2", "Error"], answer: 0,
    why: { en: "append adds ONE item, even if that item is a list. Now a = [1, 2, [3, 4]], length 3.",
           fa: "append فقط یک عضو اضافه می‌کنه، حتی اگه اون عضو لیست باشه. حالا a = [1, 2, [3, 4]] و طولش ۳ هست." } },
  { topic: "lists", lvl: "medium",
    code: `a = [1, 2]
a.extend([3, 4])
a.insert(0, 0)
print(a)`,
    options: ["[0, 1, 2, 3, 4]", "[1, 2, 3, 4, 0]", "[0, 1, 2, [3, 4]]", "[1, 2, 0, 3, 4]"], answer: 0,
    why: { en: "extend adds each item of the list, and insert(0, 0) puts 0 at index 0 (the front).",
           fa: "extend تک‌تک عضوهای لیست رو اضافه می‌کنه و insert(0, 0) عدد ۰ رو در اندیس ۰ (اول لیست) می‌ذاره." } },
  { topic: "lists", lvl: "medium",
    code: `a = [1, 2, 3]
b = a[:]
b[0] = 9
c = a
c[1] = 8
print(a, b)`,
    options: ["[1, 8, 3] [9, 2, 3]", "[1, 2, 3] [9, 2, 3]", "[9, 8, 3] [9, 2, 3]", "[1, 8, 3] [1, 2, 3]"], answer: 0,
    why: { en: "a[:] makes a copy, so changing b does not touch a. But c = a is the same list, so c[1] = 8 changes a.",
           fa: "a[:] یک کپی می‌سازه، پس تغییر b روی a اثر نداره. ولی c = a همون لیسته، پس c[1] = 8 روی a اثر می‌ذاره." } },
  { topic: "lists", lvl: "medium",
    code: `print([1, 2, 3] * 2, [0] * 3 + [1])`,
    options: ["[1, 2, 3, 1, 2, 3] [0, 0, 0, 1]", "[2, 4, 6] [0, 0, 0, 1]", "[1, 2, 3, 1, 2, 3] [1, 1, 1, 1]", "[1, 2, 3, 2] [0, 0, 0, 1]"], answer: 0,
    why: { en: "* repeats the list (it does not multiply the items), and + joins lists.",
           fa: "* لیست رو تکرار می‌کنه (عضوها رو ضرب نمی‌کنه) و + لیست‌ها رو به هم می‌چسبونه." } },
  { topic: "lists", lvl: "hard",
    code: `g = [[0] * 2] * 2
g[0][0] = 1
print(g)`,
    options: ["[[1, 0], [1, 0]]", "[[1, 0], [0, 0]]", "[[0, 0], [1, 0]]", "[[1, 1], [0, 0]]"], answer: 0,
    why: { en: "[[0, 0]] * 2 repeats the SAME inner list twice, so a change through one row shows in both rows.",
           fa: "[[0, 0]] * 2 همون لیست داخلی رو دو بار تکرار می‌کنه، پس تغییر یک ردیف توی هر دو ردیف دیده می‌شه." } },
  { topic: "lists", lvl: "hard",
    code: `a = [1, 2, 3, 4, 5]
print(a[::2], a[::-1][:2], a[10:])`,
    options: ["[1, 3, 5] [5, 4] []", "[1, 3, 5] [1, 2] []", "[2, 4] [5, 4] []", "[1, 3, 5] [5, 4] Error"], answer: 0,
    why: { en: "[::2] takes every 2nd item; [::-1] reverses, and [:2] keeps the first two of that (5, 4). A slice past the end is just an empty list, not an error.",
           fa: "[::2] یکی در میان برمی‌داره؛ [::-1] برعکس می‌کنه و [:2] دو تای اول اون رو نگه می‌داره (۵ و ۴). برش بیرون از لیست فقط لیست خالیه، نه خطا." } },
  { topic: "lists", lvl: "hard",
    code: `x = [1, 2, 3]
y = x
x += [4]
x = x + [5]
print(x, y)`,
    options: ["[1, 2, 3, 4, 5] [1, 2, 3, 4]", "[1, 2, 3, 4, 5] [1, 2, 3]", "[1, 2, 3, 4, 5] [1, 2, 3, 4, 5]", "[1, 2, 3, 5] [1, 2, 3, 4]"], answer: 0,
    why: { en: "x += [4] changes the list IN PLACE, so y sees it. x = x + [5] builds a new list, so y stays [1, 2, 3, 4].",
           fa: "x += [4] لیست رو در جا عوض می‌کنه، پس y هم می‌بینه. x = x + [5] لیست جدید می‌سازه، پس y همون [1, 2, 3, 4] می‌مونه." } },
  { topic: "lists", lvl: "easy",
    code: `a = [1, 2, 3]
a.pop()
a.remove(1)
print(a)`,
    options: ["[2]", "[1, 2]", "[2, 3]", "[3]"], answer: 0,
    why: { en: "pop() removes the last item (3), then remove(1) deletes the first item whose value is 1. Only [2] is left.",
           fa: "pop() آخرین عضو (۳) رو برمی‌داره، بعدش remove(1) اولین عضوی که مقدارش ۱ هست رو حذف می‌کنه. فقط [2] می‌مونه." } },
  { topic: "lists", lvl: "easy",
    code: `a = [4, 5, 6]
print(a.index(5), 6 in a, a.count(4))`,
    options: ["1 True 1", "2 True 1", "1 False 1", "5 True 4"], answer: 0,
    why: { en: "index(5) returns the POSITION of 5, which is 1. 6 in a is True, and 4 appears once.",
           fa: "index(5) جایگاه ۵ رو برمی‌گردونه که ۱ هست (شمارش از صفره). 6 in a درسته و ۴ فقط یک بار اومده." } },
  { topic: "lists", lvl: "easy",
    code: `a = list("abc")
a.reverse()
print(a)`,
    options: ["['c', 'b', 'a']", "['a', 'b', 'c']", "abc", "None"], answer: 0,
    why: { en: "list(\"abc\") splits the string into characters, and reverse() flips the list in place.",
           fa: "list(\"abc\") رشته رو به حرف‌هاش تبدیل می‌کنه و reverse() لیست رو همون‌جا برعکس می‌کنه." } },
  { topic: "lists", lvl: "medium",
    code: `a = [1, 2, 3, 4]
del a[1:3]
print(a)`,
    options: ["[1, 4]", "[1, 3, 4]", "[1, 2]", "[1, 4, 4]"], answer: 0,
    why: { en: "The slice a[1:3] covers indexes 1 and 2 (the values 2 and 3). Deleting it leaves [1, 4].",
           fa: "برش a[1:3] اندیس ۱ و ۲ (مقدارهای ۲ و ۳) رو شامل می‌شه. با حذفش [1, 4] می‌مونه." } },
  { topic: "lists", lvl: "medium",
    code: `r = [1, 2, 3].append(4)
print(r)`,
    options: ["None", "[1, 2, 3, 4]", "4", "[4]"], answer: 0,
    why: { en: "append() changes the list in place and returns None, so r holds None.",
           fa: "append() لیست رو همون‌جا تغییر می‌ده و None برمی‌گردونه، پس r برابر None می‌شه." } },
  { topic: "lists", lvl: "medium",
    code: `print([x * 2 for x in range(5) if x % 2 == 0])`,
    options: ["[0, 4, 8]", "[0, 2, 4, 6, 8]", "[2, 6]", "[0, 2, 4]"], answer: 0,
    why: { en: "The if keeps only even x (0, 2, 4), and then each one is doubled: 0, 4, 8.",
           fa: "شرط if فقط x های زوج (۰، ۲، ۴) رو نگه می‌داره و بعد هر کدوم دو برابر می‌شه: ۰، ۴، ۸." } },
  { topic: "lists", lvl: "medium",
    code: `a = [1, 2, 3]
a[1:2] = [7, 8, 9]
print(a)`,
    options: ["[1, 7, 8, 9, 3]", "[1, [7, 8, 9], 3]", "[1, 7, 3]", "[7, 8, 9]"], answer: 0,
    why: { en: "Assigning a list to a slice replaces that slice with the items. The one item at index 1 is replaced by three items.",
           fa: "وقتی به یک برش لیست می‌دی، اون برش با عضوهای لیست جایگزین می‌شه. یک عضو اندیس ۱ با سه عضو عوض می‌شه." } },
  { topic: "lists", lvl: "hard",
    code: `a = [1, 2, 2, 3]
for x in a:
    if x == 2:
        a.remove(x)
print(a)`,
    options: ["[1, 2, 3]", "[1, 3]", "[1, 2, 2, 3]", "[1, 2]"], answer: 0,
    why: { en: "Removing while looping shifts the items left, so the loop skips the next element. The second 2 is skipped and survives: [1, 2, 3].",
           fa: "حذف عضو وسط حلقه عضوها رو به چپ می‌لغزونه و حلقه عضو بعدی رو رد می‌کنه. ۲ دوم رد می‌شه و می‌مونه: [1, 2, 3]." } },
  { topic: "lists", lvl: "hard",
    code: `def add(x, l=[]):
    l.append(x)
    return l

add(1)
print(add(2))`,
    options: ["[1, 2]", "[2]", "[1]", "[1, 2, 1]"], answer: 0,
    why: { en: "The default list is created once, when the function is defined, and shared by every call. The second call appends to the same list: [1, 2].",
           fa: "لیست پیش‌فرض فقط یک بار موقع تعریف تابع ساخته می‌شه و بین همه فراخوانی‌ها مشترکه. پس فراخوانی دوم به همون لیست اضافه می‌کنه: [1, 2]." } },
  { topic: "lists", lvl: "hard",
    code: `x = [[1, 2], [3]]
y = x[:]
y[0].append(9)
y.append([0])
print(x)`,
    options: ["[[1, 2, 9], [3]]", "[[1, 2], [3]]", "[[1, 2, 9], [3], [0]]", "[[1, 2], [3], [0]]"], answer: 0,
    why: { en: "x[:] is a shallow copy: the outer list is new, but the inner lists are shared. Appending to y[0] shows up in x, while y.append([0]) only changes y.",
           fa: "x[:] کپی سطحیه: لیست بیرونی جدیده ولی لیست‌های داخلی مشترکن. append به y[0] توی x هم دیده می‌شه ولی y.append([0]) فقط y رو عوض می‌کنه." } },

  // ---------- dicts ----------
  { topic: "dicts", lvl: "medium",
    code: `d = {"a": 1, "b": 2}
e = d.copy()
e["c"] = 3
d.update({"b": 20})
print(len(d), d["b"], e["b"])`,
    options: ["2 20 2", "3 20 20", "2 2 2", "3 20 2"], answer: 0,
    why: { en: "e is a copy, so adding \"c\" to e does not change d (len 2). update changes d[\"b\"] to 20, while e[\"b\"] is still 2.",
           fa: "e یک کپیه، پس اضافه کردن «c» به e روی d اثر نداره (طول ۲). update مقدار d[\"b\"] رو ۲۰ می‌کنه ولی e[\"b\"] هنوز ۲ هست." } },
  { topic: "dicts", lvl: "easy",
    code: `d = {"a": 1}
print(d.get("b"), d.get("b", 0), len(d))`,
    options: ["None 0 1", "0 0 1", "None None 1", "None 0 2"], answer: 0,
    why: { en: "get never raises an error: a missing key gives None, or your default (0). It does not add the key, so len stays 1.",
           fa: "get خطا نمی‌ده: کلید ناموجود None می‌ده، یا مقدار پیش‌فرضت (۰). کلید رو اضافه نمی‌کنه، پس طول ۱ می‌مونه." } },
  { topic: "dicts", lvl: "easy",
    code: `d = {"x": 1, "y": 2}
for k in d:
    print(k, end=" ")`,
    options: ["x y", "1 2", "x y 1 2", "(x, 1) (y, 2)"], answer: 0,
    why: { en: "Looping over a dict gives its KEYS.",
           fa: "حلقه روی دیکشنری کلیدها رو می‌ده." } },
  { topic: "dicts", lvl: "easy",
    code: `d = {"a": 1, "a": 2}
print(d, len(d))`,
    options: ["{'a': 2} 1", "{'a': 1} 1", "{'a': 1, 'a': 2} 2", "Error"], answer: 0,
    why: { en: "Keys are unique. The same key written twice keeps the LAST value.",
           fa: "کلیدها یکتا هستن. اگه یک کلید دو بار نوشته بشه آخرین مقدار می‌مونه." } },
  { topic: "dicts", lvl: "medium",
    code: `d = {"a": 1, "b": 2}
print(d.pop("a"), d)`,
    options: ["1 {'b': 2}", "{'a': 1} {'b': 2}", "None {'b': 2}", "1 {'a': 1, 'b': 2}"], answer: 0,
    why: { en: "pop removes the key and returns its value (1); d is left with only 'b'.",
           fa: "pop کلید رو حذف می‌کنه و مقدارش (۱) رو برمی‌گردونه؛ توی d فقط 'b' می‌مونه." } },
  { topic: "dicts", lvl: "medium",
    code: `words = ["a", "b", "a", "c", "a"]
c = {}
for w in words:
    c[w] = c.get(w, 0) + 1
print(c)`,
    options: ["{'a': 3, 'b': 1, 'c': 1}", "{'a': 1, 'b': 1, 'c': 1}", "{'a': 3}", "Error"], answer: 0,
    why: { en: "A classic counter: get(w, 0) gives 0 for a new word, then +1 is stored. 'a' appears 3 times.",
           fa: "شمارنده کلاسیک: get(w, 0) برای کلمه جدید ۰ می‌ده و بعد ۱ اضافه می‌شه. 'a' سه بار اومده." } },
  { topic: "dicts", lvl: "medium",
    code: `d = {"b": 2, "a": 1}
print(sorted(d), sorted(d.items(), key=lambda kv: kv[1])[0])`,
    options: ["['a', 'b'] ('a', 1)", "['b', 'a'] ('a', 1)", "['a', 'b'] ('b', 2)", "[1, 2] ('a', 1)"], answer: 0,
    why: { en: "sorted(d) sorts the keys. Sorting items by value (kv[1]) puts ('a', 1) first.",
           fa: "sorted(d) کلیدها رو مرتب می‌کنه. مرتب کردن items بر اساس مقدار (kv[1]) باعث می‌شه ('a', 1) اول بیاد." } },
  { topic: "dicts", lvl: "medium",
    code: `print({x: x * x for x in range(3)}, {1, 2, 2, 3})`,
    options: ["{0: 0, 1: 1, 2: 4} {1, 2, 3}", "{0: 0, 1: 1, 2: 4} {1, 2, 2, 3}", "{1: 1, 2: 4, 3: 9} {1, 2, 3}", "[0, 1, 4] {1, 2, 3}"], answer: 0,
    why: { en: "A dict comprehension maps each x to x*x. A set drops duplicates.",
           fa: "dict comprehension هر x رو به x*x نگاشت می‌کنه. set عضوهای تکراری رو حذف می‌کنه." } },
  { topic: "dicts", lvl: "hard",
    code: `d = {"a": [1]}
e = dict(d)
e["a"].append(2)
print(d)`,
    options: ["{'a': [1, 2]}", "{'a': [1]}", "{'a': [2]}", "{}"], answer: 0,
    why: { en: "dict(d) is a SHALLOW copy: the list inside is shared, so appending through e changes d too.",
           fa: "dict(d) کپی سطحیه: لیست داخلش مشترکه، پس append از طریق e روی d هم اثر می‌ذاره." } },
  { topic: "dicts", lvl: "hard",
    code: `a = {"x": 1, "y": 2}
b = {"y": 20, "z": 30}
print(a | b, {**b, **a})`,
    options: ["{'x': 1, 'y': 20, 'z': 30} {'y': 2, 'z': 30, 'x': 1}", "{'x': 1, 'y': 2, 'z': 30} {'y': 2, 'z': 30, 'x': 1}", "{'x': 1, 'y': 20, 'z': 30} {'x': 1, 'y': 20, 'z': 30}", "{'x': 1, 'y': 20, 'z': 30} {'y': 20, 'z': 30, 'x': 1}"], answer: 0,
    why: { en: "When merging, the right side wins for duplicate keys: a | b gives y=20, but {**b, **a} gives y=2. Key order follows first appearance.",
           fa: "موقع ادغام، برای کلید تکراری سمت راست برنده‌ست: a | b مقدار y=20 می‌ده ولی {**b, **a} مقدار y=2. ترتیب کلیدها بر اساس اولین ظاهر شدنه." } },
  { topic: "dicts", lvl: "easy",
    code: `d = {"a": 1, "b": 2}
print(list(d.keys()), list(d.values()))`,
    options: ["['a', 'b'] [1, 2]", "[1, 2] ['a', 'b']", "['a', 'b'] ['a', 'b']", "[('a', 1), ('b', 2)] [1, 2]"], answer: 0,
    why: { en: "keys() gives the keys and values() gives the values, both in insertion order.",
           fa: "keys() کلیدها و values() مقدارها رو می‌ده، هر دو به ترتیب اضافه شدن." } },
  { topic: "dicts", lvl: "easy",
    code: `d = {}
d["x"] = 1
d["x"] += 5
print(d)`,
    options: ["{'x': 6}", "{'x': 1}", "{'x': 5}", "{'x': 15}"], answer: 0,
    why: { en: "The key x is created with 1, then += 5 updates the same key to 6.",
           fa: "کلید x با مقدار ۱ ساخته می‌شه و بعد += 5 همون کلید رو به ۶ تغییر می‌ده." } },
  { topic: "dicts", lvl: "easy",
    code: `d = {"a": 1}
print("a" in d, 1 in d, len(d))`,
    options: ["True False 1", "True True 1", "False False 1", "True False 2"], answer: 0,
    why: { en: "The in operator checks KEYS only. \"a\" is a key, 1 is a value, so 1 in d is False.",
           fa: "عملگر in فقط کلیدها رو چک می‌کنه. \"a\" کلیده ولی ۱ مقداره، پس 1 in d نادرسته." } },
  { topic: "dicts", lvl: "medium",
    code: `d = {"a": 1}
print(d.setdefault("b", 5), d)`,
    options: ["5 {'a': 1, 'b': 5}", "None {'a': 1, 'b': 5}", "5 {'a': 1}", "{'b': 5} {'a': 1, 'b': 5}"], answer: 0,
    why: { en: "setdefault adds the key with the default when it is missing and returns that value, so it prints 5 and d now has b.",
           fa: "setdefault اگه کلید نباشه با مقدار پیش‌فرض اضافه‌ش می‌کنه و همون مقدار رو برمی‌گردونه؛ پس ۵ چاپ می‌شه و d کلید b رو هم داره." } },
  { topic: "dicts", lvl: "medium",
    code: `d = dict(zip("abc", [1, 2, 3]))
print(d["c"], max(d, key=d.get))`,
    options: ["3 c", "3 3", "c c", "1 a"], answer: 0,
    why: { en: "zip pairs letters with numbers, so d = {'a': 1, 'b': 2, 'c': 3}. max with key=d.get returns the KEY with the biggest value: c.",
           fa: "zip حرف‌ها رو با عددها جفت می‌کنه، پس d = {'a': 1, 'b': 2, 'c': 3}. max با key=d.get کلیدی که بزرگ‌ترین مقدار رو داره برمی‌گردونه: c." } },
  { topic: "dicts", lvl: "medium",
    code: `d = {"a": 1, "b": 2, "c": 3}
print({k: v for k, v in d.items() if v > 1})`,
    options: ["{'b': 2, 'c': 3}", "{'a': 1}", "{2: 'b', 3: 'c'}", "['b', 'c']"], answer: 0,
    why: { en: "The dict comprehension keeps only pairs whose value is greater than 1.",
           fa: "دیکشنری‌سازی فقط جفت‌هایی رو نگه می‌داره که مقدارشون بزرگ‌تر از ۱ هست." } },
  { topic: "dicts", lvl: "medium",
    code: `d = {1: "a"}
d[1.0] = "b"
d[True] = "c"
print(d)`,
    options: ["{1: 'c'}", "{1: 'a', 1.0: 'b', True: 'c'}", "{1: 'a'}", "{1: 'b'}"], answer: 0,
    why: { en: "1, 1.0 and True are equal and have the same hash, so they are the same key. The value is overwritten each time and ends as 'c'.",
           fa: "۱ و 1.0 و True با هم برابرن و هش یکسان دارن، پس یک کلید حساب می‌شن. مقدار هر بار بازنویسی می‌شه و آخرش 'c' می‌مونه." } },
  { topic: "dicts", lvl: "hard",
    code: `d = {"a": 1, "b": 2}
print(d.popitem(), d)`,
    options: ["('b', 2) {'a': 1}", "('a', 1) {'b': 2}", "'b' {'a': 1}", "2 {'a': 1}"], answer: 0,
    why: { en: "popitem() removes and returns the LAST inserted pair as a tuple: ('b', 2). What remains is {'a': 1}.",
           fa: "popitem() آخرین جفتِ اضافه‌شده رو حذف می‌کنه و به شکل تاپل برمی‌گردونه: ('b', 2). چیزی که می‌مونه {'a': 1} هست." } },
  { topic: "dicts", lvl: "hard",
    code: `d = {}
d.setdefault("x", []).append(1)
d.setdefault("x", []).append(2)
print(d)`,
    options: ["{'x': [1, 2]}", "{'x': [1]}", "{'x': [2]}", "{'x': 1, 'x': 2}"], answer: 0,
    why: { en: "The first call creates the list, the second call finds the existing key and returns the same list, so both appends go into it.",
           fa: "فراخوانی اول لیست رو می‌سازه، فراخوانی دوم کلید موجود رو پیدا می‌کنه و همون لیست رو برمی‌گردونه؛ پس هر دو append توی یک لیست می‌رن." } },
  { topic: "dicts", lvl: "hard",
    code: `d = {"a": 1}
try:
    for k in d:
        d["b"] = 2
except RuntimeError:
    print("err", d)`,
    options: ["err {'a': 1, 'b': 2}", "err {'a': 1}", "{'a': 1, 'b': 2}", "err {'b': 2}"], answer: 0,
    why: { en: "Adding a key while looping changes the dict size, so the NEXT iteration raises RuntimeError. But the key was already added, so d has both keys.",
           fa: "اضافه کردن کلید وسط حلقه اندازه دیکشنری رو عوض می‌کنه و تکرار بعدی RuntimeError می‌ده. ولی کلید قبلش اضافه شده، پس d هر دو کلید رو داره." } },

  // ---------- strings ----------
  { topic: "strings", lvl: "medium",
    code: `s = "Python"
print(s[::-2] + s[1:3].upper())`,
    options: ["nhyYT", "Ptoyt", "nohtyPYT", "nhyyt"], answer: 0,
    why: { en: "s[::-2] walks backwards in steps of 2: n, h, y = \"nhy\". s[1:3] is \"yt\" -> upper \"YT\". Together: nhyYT.",
           fa: "s[::-2] از آخر با گام ۲ می‌ره: n و h و y = «nhy». s[1:3] می‌شه «yt» و با upper می‌شه «YT». روی هم: nhyYT." } },
  { topic: "strings", lvl: "easy",
    code: `print("hello".upper(), len("hello"), "hello"[1])`,
    options: ["HELLO 5 e", "hello 5 e", "HELLO 4 h", "HELLO 5 h"], answer: 0,
    why: { en: "upper() gives HELLO, len is 5, and index 1 is the second letter, \"e\" (counting starts at 0).",
           fa: "upper() می‌شه HELLO، طول ۵ هست و اندیس ۱ حرف دوم یعنی «e» هست (شمارش از ۰ شروع می‌شه)." } },
  { topic: "strings", lvl: "easy",
    code: `s = "a,b,c"
print(s.split(","), "-".join(["x", "y"]))`,
    options: ["['a', 'b', 'c'] x-y", "['a,b,c'] x-y", "['a', 'b', 'c'] xy", "['a', 'b', 'c'] y-x"], answer: 0,
    why: { en: "split(\",\") cuts at each comma into a list. \"-\".join glues the items with a dash.",
           fa: "split(\",\") از هر کاما می‌بره و لیست می‌سازه. \"-\".join عضوها رو با خط تیره بهم می‌چسبونه." } },
  { topic: "strings", lvl: "easy",
    code: `s = "  hi  "
print(len(s), len(s.strip()))`,
    options: ["6 2", "4 2", "6 6", "2 2"], answer: 0,
    why: { en: "The original has 6 characters (2 spaces on each side). strip() removes the outer spaces, leaving \"hi\".",
           fa: "رشته اصلی ۶ کاراکتر داره (۲ فاصله هر طرف). strip() فاصله‌های دو طرف رو برمی‌داره و «hi» می‌مونه." } },
  { topic: "strings", lvl: "medium",
    code: `s = "banana"
print(s.count("an"), s.find("n"), s.replace("a", "o", 2))`,
    options: ["2 2 bonona", "3 2 bonono", "2 3 bonona", "2 2 bonono"], answer: 0,
    why: { en: "\"an\" appears twice without overlapping. find gives the first index of \"n\" (2). replace with a limit of 2 changes only the first two a's.",
           fa: "«an» دو بار و بدون هم‌پوشانی میاد. find اولین اندیس «n» رو می‌ده (۲). replace با حد ۲ فقط دو تا a اول رو عوض می‌کنه." } },
  { topic: "strings", lvl: "medium",
    code: `print("Python"[1:4], "Python"[-3:], "Python"[::2])`,
    options: ["yth hon Pto", "yth ho Pto", "ytho hon Pto", "yth hon yhn"], answer: 0,
    why: { en: "[1:4] = indexes 1,2,3 (yth). [-3:] = last three (hon). [::2] = every second letter (Pto).",
           fa: "[1:4] یعنی اندیس ۱ و ۲ و ۳ (yth). [-3:] یعنی سه حرف آخر (hon). [::2] یعنی یکی در میان (Pto)." } },
  { topic: "strings", lvl: "medium",
    code: `name = "Ana"
print(f"|{name:>6}|{3.14159:.2f}|{255:x}|")`,
    options: ["|   Ana|3.14|ff|", "|Ana   |3.14|ff|", "|   Ana|3.1|ff|", "|   Ana|3.14|255|"], answer: 0,
    why: { en: ">6 right-aligns in 6 characters, .2f keeps 2 decimals, and :x prints hexadecimal (255 = ff).",
           fa: ">6 رو راست‌چین توی ۶ کاراکتر می‌ذاره، .2f دو رقم اعشار نگه می‌داره و :x مبنای ۱۶ چاپ می‌کنه (۲۵۵ = ff)." } },
  { topic: "strings", lvl: "medium",
    code: `s = "abc"
try:
    s[0] = "x"
except TypeError:
    s = "x" + s[1:]
print(s)`,
    options: ["xbc", "abc", "xabc", "Error"], answer: 0,
    why: { en: "Strings are immutable, so s[0] = \"x\" raises TypeError. The except block builds a new string: \"x\" + \"bc\".",
           fa: "رشته‌ها تغییرناپذیرن، پس s[0] = \"x\" خطای TypeError می‌ده. بلوک except یک رشته جدید می‌سازه: \"x\" + \"bc\"." } },
  { topic: "strings", lvl: "hard",
    code: `print(" ".join(w.capitalize() for w in "hELLO wORLD".split()), "abc" < "abd", "Z" < "a")`,
    options: ["Hello World True True", "HELLO WORLD True True", "Hello World True False", "Hello world True True"], answer: 0,
    why: { en: "capitalize() makes the first letter upper and the REST lower. Strings compare letter by letter by code: \"c\" < \"d\", and uppercase letters come before lowercase (\"Z\" < \"a\").",
           fa: "capitalize() حرف اول رو بزرگ و بقیه رو کوچک می‌کنه. رشته‌ها حرف به حرف با کد مقایسه می‌شن: «c» < «d» و حروف بزرگ قبل از کوچک‌ها هستن («Z» < «a»)." } },
  { topic: "strings", lvl: "hard",
    code: `s = "racecar"
print(s == s[::-1], s.index("c"), s.rindex("c"), s[2:-2])`,
    options: ["True 2 4 cec", "True 2 5 cec", "True 1 4 cec", "False 2 4 cec"], answer: 0,
    why: { en: "It is a palindrome (True). index finds the first \"c\" (2), rindex the last (4). s[2:-2] drops two letters from each end: \"cec\".",
           fa: "پالیندروم هست (True). index اولین «c» (۲) و rindex آخرین «c» (۴) رو پیدا می‌کنه. s[2:-2] دو حرف از هر طرف حذف می‌کنه: «cec»." } },
  { topic: "strings", lvl: "easy",
    code: `s = "Hello"
print(s.lower(), s[0], s[-1])`,
    options: ["hello H o", "HELLO H o", "hello e o", "hello H O"], answer: 0,
    why: { en: "lower() makes everything lowercase, s[0] is the first character and s[-1] is the last.",
           fa: "lower() همه رو کوچیک می‌کنه، s[0] اولین حرف و s[-1] آخرین حرفه." } },
  { topic: "strings", lvl: "easy",
    code: `print("ab" * 3, "a" + "b")`,
    options: ["ababab ab", "ababab a b", "aaabbb ab", "ab3 ab"], answer: 0,
    why: { en: "Multiplying a string repeats it: \"ababab\". Plus joins strings with no space: \"ab\".",
           fa: "ضرب رشته در عدد اون رو تکرار می‌کنه: \"ababab\". علامت + رشته‌ها رو بدون فاصله به هم می‌چسبونه: \"ab\"." } },
  { topic: "strings", lvl: "easy",
    code: `print("hello world".title(), "hello".startswith("he"))`,
    options: ["Hello World True", "Hello world True", "HELLO WORLD True", "Hello World False"], answer: 0,
    why: { en: "title() capitalizes the first letter of every word, and \"hello\" does start with \"he\".",
           fa: "title() اولین حرف هر کلمه رو بزرگ می‌کنه و \"hello\" واقعاً با \"he\" شروع می‌شه." } },
  { topic: "strings", lvl: "medium",
    code: `s = "a-b-c"
print(s.split("-", 1))`,
    options: ["['a', 'b-c']", "['a', 'b', 'c']", "['a', '-b-c']", "['a-b', 'c']"], answer: 0,
    why: { en: "The second argument limits the number of splits. One split gives only two pieces: ['a', 'b-c'].",
           fa: "آرگومان دوم تعداد برش‌ها رو محدود می‌کنه. با یک برش فقط دو تیکه می‌شه: ['a', 'b-c']." } },
  { topic: "strings", lvl: "medium",
    code: `print("5".zfill(3), "abc".center(5, "*"))`,
    options: ["005 *abc*", "500 *abc*", "005 abc**", "5** **abc"], answer: 0,
    why: { en: "zfill pads with zeros on the left to width 3: 005. center puts the text in the middle of width 5, one star on each side.",
           fa: "zfill از چپ با صفر پر می‌کنه تا عرض ۳ بشه: 005. center متن رو وسط عرض ۵ می‌ذاره، یک ستاره هر طرف." } },
  { topic: "strings", lvl: "medium",
    code: `s = "hello"
print(s.replace("l", "L"), s)`,
    options: ["heLLo hello", "heLLo heLLo", "hello hello", "heLlo hello"], answer: 0,
    why: { en: "Strings are immutable: replace returns a NEW string and s is unchanged. replace changes every l, not just the first.",
           fa: "رشته‌ها تغییرناپذیرن: replace یک رشته جدید برمی‌گردونه و s عوض نمی‌شه. replace همه l ها رو عوض می‌کنه نه فقط اولی." } },
  { topic: "strings", lvl: "medium",
    code: `print("a b  c".split(), "a b  c".split(" "))`,
    options: ["['a', 'b', 'c'] ['a', 'b', '', 'c']", "['a', 'b', 'c'] ['a', 'b', 'c']", "['a', 'b  c'] ['a', 'b', 'c']", "['a', 'b', '', 'c'] ['a', 'b', 'c']"], answer: 0,
    why: { en: "split() with no argument splits on any run of spaces. split(\" \") splits at every single space, so the double space gives an empty string.",
           fa: "split() بدون آرگومان روی هر تعداد فاصله می‌بره. split(\" \") روی تک‌تک فاصله‌ها می‌بره، پس دو فاصله پشت هم یک رشته خالی می‌سازه." } },
  { topic: "strings", lvl: "hard",
    code: `print("abc".isalpha(), "ab1".isalnum(), "12".isdigit(), "".isalpha())`,
    options: ["True True True False", "True True True True", "True False True False", "True True False False"], answer: 0,
    why: { en: "Letters only: True. Letters and digits are all alphanumeric: True. Only digits: True. An EMPTY string is never alpha, so it gives False.",
           fa: "فقط حرف: درسته. حرف و رقم هر دو الفبا-عددی حساب می‌شن: درسته. فقط رقم: درسته. رشته خالی هیچ‌وقت isalpha نیست، پس نادرسته." } },
  { topic: "strings", lvl: "hard",
    code: `s = "hello"
print(s.strip("ho"), "xxhixx".lstrip("x"))`,
    options: ["ell hixx", "hello hi", "ell hi", "hell hixx"], answer: 0,
    why: { en: "strip(\"ho\") removes any of the characters h and o from both ends, leaving ell. lstrip(\"x\") only cuts the left side: hixx.",
           fa: "strip(\"ho\") هر کدوم از حرف‌های h و o رو از دو سر برمی‌داره و ell می‌مونه. lstrip(\"x\") فقط سمت چپ رو می‌بره: hixx." } },
  { topic: "strings", lvl: "hard",
    code: `print("%d-%s" % (5, "a"), "{:03d}|{:<4}|".format(7, "x"), f"{'a'!r}")`,
    options: ["5-a 007|x   | 'a'", "5-a 7|x| a", "5-a 007|   x| a", "5-a 007|x   | a"], answer: 0,
    why: { en: "%d gives 5-a. {:03d} pads 7 with zeros to 007, {:<4} left-aligns x in width 4, and !r shows the repr, which adds quotes: 'a'.",
           fa: "%d می‌شه 5-a. {:03d} عدد ۷ رو با صفر به 007 می‌رسونه، {:<4} حرف x رو چپ‌چین توی عرض ۴ می‌ذاره و !r نمایش repr رو می‌ده که کوتیشن داره: 'a'." } },

  // ---------- errors ----------
  { topic: "errors", lvl: "hard",
    code: `def f():
    try:
        return "try"
    finally:
        print("cleanup", end=" ")

print(f())`,
    options: ["cleanup try", "try cleanup", "try", "cleanup"], answer: 0,
    why: { en: "finally always runs before the function really returns, so \"cleanup\" is printed first, then print(f()) prints \"try\".",
           fa: "finally همیشه قبل از برگشتن واقعی تابع اجرا می‌شه، پس اول «cleanup» چاپ می‌شه و بعد print(f()) عبارت «try» رو چاپ می‌کنه." } },
  { topic: "errors", lvl: "easy",
    code: `try:
    int("1x")
except ValueError:
    print("bad")
else:
    print("ok")`,
    options: ["bad", "ok", "bad ok", "Error"], answer: 0,
    why: { en: "int(\"1x\") raises ValueError, so the except branch runs. else runs only when there was NO error.",
           fa: "int(\"1x\") خطای ValueError می‌ده، پس شاخه except اجرا می‌شه. else فقط وقتی اجرا می‌شه که خطایی نباشه." } },
  { topic: "errors", lvl: "easy",
    code: `try:
    print(1 / 0)
except ZeroDivisionError:
    print("zero")`,
    options: ["zero", "inf", "0", "None"], answer: 0,
    why: { en: "Dividing by zero raises ZeroDivisionError in Python (it does not give inf), so the except block prints \"zero\".",
           fa: "تقسیم بر صفر توی پایتون ZeroDivisionError می‌ده (بی‌نهایت نمی‌ده)، پس بلوک except عبارت «zero» رو چاپ می‌کنه." } },
  { topic: "errors", lvl: "easy",
    code: `d = {}
try:
    d["k"]
except KeyError:
    print("no key")`,
    options: ["no key", "None", "k", "Error"], answer: 0,
    why: { en: "Reading a missing key with [] raises KeyError, which the except block catches.",
           fa: "خوندن کلید ناموجود با [] خطای KeyError می‌ده که بلوک except می‌گیره." } },
  { topic: "errors", lvl: "medium",
    code: `try:
    x = int("5")
except ValueError:
    print("bad", end=" ")
else:
    print("ok", x, end=" ")
finally:
    print("end")`,
    options: ["ok 5 end", "ok 5", "bad end", "end ok 5"], answer: 0,
    why: { en: "No error: else runs (\"ok 5\"), then finally always runs (\"end\").",
           fa: "خطایی نیست: else اجرا می‌شه («ok 5») و بعد finally همیشه اجرا می‌شه («end»)." } },
  { topic: "errors", lvl: "medium",
    code: `def f():
    try:
        return 1
    finally:
        return 2

print(f())`,
    options: ["2", "1", "1 2", "Error"], answer: 0,
    why: { en: "A return inside finally overrides the earlier return, so the function returns 2.",
           fa: "return داخل finally جای return قبلی رو می‌گیره، پس تابع ۲ برمی‌گردونه." } },
  { topic: "errors", lvl: "medium",
    code: `try:
    raise ValueError("boom")
except (TypeError, ValueError) as e:
    print(type(e).__name__, e)`,
    options: ["ValueError boom", "TypeError boom", "ValueError", "boom"], answer: 0,
    why: { en: "One except can catch several types in a tuple. e is the exception object: its class name is ValueError and its message is boom.",
           fa: "یک except می‌تونه چند نوع رو با تاپل بگیره. e همون شیء خطاست: اسم کلاسش ValueError و پیامش boom هست." } },
  { topic: "errors", lvl: "medium",
    code: `def f(x):
    try:
        return 10 / x
    except ZeroDivisionError:
        return "inf"

print(f(2), f(0))`,
    options: ["5.0 inf", "5 inf", "5.0 Error", "5.0 0"], answer: 0,
    why: { en: "10 / 2 is a float (5.0). For x = 0 the except branch returns the text \"inf\".",
           fa: "۱۰ / ۲ می‌شه float یعنی 5.0. برای x = 0 شاخه except متن «inf» رو برمی‌گردونه." } },
  { topic: "errors", lvl: "hard",
    code: `class MyErr(Exception):
    pass

try:
    try:
        raise MyErr("x")
    except ValueError:
        print("inner")
except Exception as e:
    print("outer", type(e).__name__)`,
    options: ["outer MyErr", "inner", "inner outer MyErr", "outer Exception"], answer: 0,
    why: { en: "MyErr is not a ValueError, so the inner except does not match. The error travels up and the outer except Exception catches it.",
           fa: "MyErr یک ValueError نیست، پس except داخلی جور درنمیاد. خطا بالا می‌ره و except Exception بیرونی اون رو می‌گیره." } },
  { topic: "errors", lvl: "hard",
    code: `try:
    try:
        1 / 0
    except ZeroDivisionError as e:
        raise ValueError("bad") from e
except ValueError as v:
    print(v, type(v.__cause__).__name__)`,
    options: ["bad ZeroDivisionError", "bad ValueError", "bad None", "division by zero ZeroDivisionError"], answer: 0,
    why: { en: "`raise ... from e` links the original error as __cause__. The printed message is \"bad\" and the cause is a ZeroDivisionError.",
           fa: "`raise ... from e` خطای اصلی رو به‌عنوان __cause__ وصل می‌کنه. پیام چاپ‌شده «bad» و علتش ZeroDivisionError هست." } },
  { topic: "errors", lvl: "easy",
    code: `try:
    [1, 2][5]
except IndexError:
    print("index")`,
    options: ["index", "1", "error", "2"], answer: 0,
    why: { en: "Index 5 does not exist in a 2-item list, so IndexError is raised and caught.",
           fa: "اندیس ۵ توی لیست دو عضوی وجود نداره، پس IndexError پیش میاد و گرفته می‌شه." } },
  { topic: "errors", lvl: "easy",
    code: `try:
    print("a" + 1)
except TypeError:
    print("type")`,
    options: ["type", "a1", "value", "a"], answer: 0,
    why: { en: "You cannot add a string and an int with +, so Python raises TypeError.",
           fa: "با + نمی‌شه رشته و عدد رو جمع کرد، پس پایتون TypeError می‌ده." } },
  { topic: "errors", lvl: "easy",
    code: `try:
    x = undefined_name
except NameError:
    print("name")`,
    options: ["name", "None", "undefined_name", "error"], answer: 0,
    why: { en: "Using a name that was never defined raises NameError, which the except catches.",
           fa: "استفاده از اسمی که تعریف نشده NameError می‌ده که except می‌گیرتش." } },
  { topic: "errors", lvl: "medium",
    code: `def f():
    try:
        raise ValueError
    except ValueError:
        return "v"
    finally:
        print("fin", end=" ")

print(f())`,
    options: ["fin v", "v fin", "v", "fin"], answer: 0,
    why: { en: "finally always runs before the function really returns, so \"fin \" is printed first and then the returned \"v\".",
           fa: "finally همیشه قبل از برگشت واقعی تابع اجرا می‌شه، پس اول \"fin \" چاپ می‌شه و بعد مقدار برگشتی \"v\"." } },
  { topic: "errors", lvl: "medium",
    code: `try:
    raise KeyError("k")
except Exception as e:
    print(repr(e))`,
    options: ["KeyError('k')", "KeyError", "k", "'k'"], answer: 0,
    why: { en: "repr of an exception shows its class name and arguments: KeyError('k').",
           fa: "repr یک استثنا اسم کلاس و آرگومان‌هاش رو نشون می‌ده: KeyError('k')." } },
  { topic: "errors", lvl: "medium",
    code: `try:
    int("x")
except TypeError:
    print("T")
except ValueError:
    print("V")`,
    options: ["V", "T", "TV", "Error"], answer: 0,
    why: { en: "int(\"x\") raises ValueError, not TypeError. Python checks the except clauses in order and runs the first one that matches: V.",
           fa: "int(\"x\") ValueError می‌ده نه TypeError. پایتون except ها رو به ترتیب چک می‌کنه و اولین مطابق رو اجرا می‌کنه: V." } },
  { topic: "errors", lvl: "medium",
    code: `total = 0
for x in ["1", "a", "3"]:
    try:
        total += int(x)
    except ValueError:
        continue
print(total)`,
    options: ["4", "13", "4a", "Error"], answer: 0,
    why: { en: "\"a\" raises ValueError, so continue skips it. Only 1 and 3 are added: 4.",
           fa: "\"a\" ValueError می‌ده و continue ردش می‌کنه. فقط ۱ و ۳ جمع می‌شن: ۴." } },
  { topic: "errors", lvl: "hard",
    code: `for i in range(3):
    try:
        if i == 1:
            break
    finally:
        print("f" + str(i), end=" ")
print("done")`,
    options: ["f0 f1 done", "f0 done", "f0 f1 f2 done", "f0 f1 f2 f3 done"], answer: 0,
    why: { en: "finally runs even when break leaves the loop. So f0 and f1 are printed, the loop stops at i == 1, and then done.",
           fa: "finally حتی وقتی break از حلقه خارج می‌کنه هم اجرا می‌شه. پس f0 و f1 چاپ می‌شن، حلقه توی i == 1 تموم می‌شه و بعد done." } },
  { topic: "errors", lvl: "hard",
    code: `try:
    try:
        raise ValueError("a")
    except ValueError:
        raise TypeError("b")
except Exception as e:
    print(type(e).__name__, type(e.__context__).__name__)`,
    options: ["TypeError ValueError", "ValueError TypeError", "TypeError None", "TypeError TypeError"], answer: 0,
    why: { en: "The outer except catches the new TypeError. Because it was raised while handling the ValueError, Python stores that one in __context__.",
           fa: "except بیرونی TypeError جدید رو می‌گیره. چون وقتی داشت ValueError رو هندل می‌کرد پرتاب شده، پایتون اون رو توی __context__ نگه می‌داره." } },
  { topic: "errors", lvl: "hard",
    code: `print(issubclass(KeyError, LookupError), issubclass(ZeroDivisionError, ArithmeticError), issubclass(ValueError, TypeError))`,
    options: ["True True False", "True False False", "False True False", "True True True"], answer: 0,
    why: { en: "KeyError is a kind of LookupError and ZeroDivisionError is a kind of ArithmeticError. ValueError and TypeError are siblings, not parent and child.",
           fa: "KeyError زیرمجموعه LookupError و ZeroDivisionError زیرمجموعه ArithmeticError هست. ValueError و TypeError هم‌سطح‌ان، نه پدر و فرزند." } },

  // ---------- oop ----------
  { topic: "oop", lvl: "hard",
    code: `class A:
    def hi(self):
        return "A"

class B(A):
    def hi(self):
        return "B" + super().hi()

class C(A):
    def hi(self):
        return "C" + super().hi()

class D(B, C):
    pass

print(D().hi())`,
    options: ["BCA", "BA", "CBA", "BAC"], answer: 0,
    why: { en: "The MRO of D is D, B, C, A. B calls super() which is C (not A), and C calls super() which is A: \"B\" + \"C\" + \"A\".",
           fa: "ترتیب MRO کلاس D این‌طوره: D، B، C، A. super() در B به C می‌ره (نه A) و super() در C به A: «B» + «C» + «A»." } },
  { topic: "oop", lvl: "easy",
    code: `class Dog:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return "Dog " + self.name

print(Dog("Rex"))`,
    options: ["Dog Rex", "Rex", "<Dog object>", "Dog"], answer: 0,
    why: { en: "print() uses __str__ when it exists, so the text returned by __str__ is shown.",
           fa: "print() اگه __str__ وجود داشته باشه از اون استفاده می‌کنه، پس متنی که __str__ برمی‌گردونه نمایش داده می‌شه." } },
  { topic: "oop", lvl: "easy",
    code: `class A:
    count = 0

    def __init__(self):
        A.count += 1

A()
A()
print(A.count)`,
    options: ["2", "0", "1", "Error"], answer: 0,
    why: { en: "count belongs to the class, and every new object adds 1 to the same shared counter.",
           fa: "count مال کلاسه و هر شیء جدید یکی به همون شمارنده مشترک اضافه می‌کنه." } },
  { topic: "oop", lvl: "easy",
    code: `class A:
    def hi(self):
        return "A"

class B(A):
    def hi(self):
        return "B"

print(B().hi(), A().hi())`,
    options: ["B A", "A A", "B B", "A B"], answer: 0,
    why: { en: "B overrides hi, so B objects use their own version. A objects still use A's.",
           fa: "B متد hi رو بازنویسی کرده، پس شیء B نسخه خودش رو استفاده می‌کنه. شیء A هنوز نسخه A رو داره." } },
  { topic: "oop", lvl: "medium",
    code: `class C:
    items = []

a = C()
b = C()
a.items.append(1)
print(b.items)`,
    options: ["[1]", "[]", "None", "Error"], answer: 0,
    why: { en: "items is a class attribute, shared by all objects. append changes that one shared list, so b sees it too.",
           fa: "items صفت کلاسه و بین همه شیءها مشترکه. append همون یک لیست مشترک رو عوض می‌کنه، پس b هم می‌بینه." } },
  { topic: "oop", lvl: "medium",
    code: `class P:
    x = 1

p = P()
p.x = 2
print(P.x, p.x, P().x)`,
    options: ["1 2 1", "2 2 2", "1 2 2", "2 2 1"], answer: 0,
    why: { en: "p.x = 2 creates an instance attribute that hides the class one, only for p. The class and new objects still have 1.",
           fa: "p.x = 2 یک صفت نمونه می‌سازه که فقط برای p جلوی صفت کلاس رو می‌گیره. کلاس و شیءهای جدید هنوز ۱ دارن." } },
  { topic: "oop", lvl: "medium",
    code: `class V:
    def __init__(self, n):
        self.n = n

    def __eq__(self, o):
        return self.n == o.n

print(V(1) == V(1), V(1) is V(1))`,
    options: ["True False", "False False", "True True", "False True"], answer: 0,
    why: { en: "__eq__ defines ==, so equal numbers give True. `is` checks identity: these are two separate objects.",
           fa: "__eq__ مشخص می‌کنه == چی بشه، پس عددهای مساوی True می‌دن. is هویت رو چک می‌کنه: این‌ها دو شیء جدا هستن." } },
  { topic: "oop", lvl: "medium",
    code: `class T:
    @classmethod
    def make(cls):
        return cls()

    @staticmethod
    def hi():
        return "hi"

class U(T):
    pass

print(type(U.make()).__name__, T.hi())`,
    options: ["U hi", "T hi", "U None", "T None"], answer: 0,
    why: { en: "A classmethod gets the class it was called on (U), so cls() builds a U. A staticmethod needs no object or class.",
           fa: "classmethod کلاسی که باهاش صدا زده شده (U) رو می‌گیره، پس cls() یک U می‌سازه. staticmethod به شیء یا کلاس نیازی نداره." } },
  { topic: "oop", lvl: "hard",
    code: `class A:
    def __init__(self):
        print("A", end=" ")

class B(A):
    def __init__(self):
        print("B", end=" ")
        super().__init__()

class C(B):
    def __init__(self):
        super().__init__()
        print("C", end=" ")

C()`,
    options: ["B A C", "C B A", "A B C", "C"], answer: 0,
    why: { en: "C calls super().__init__() first, so B runs: it prints \"B\" and then calls A (\"A\"). Only then does C print \"C\".",
           fa: "C اول super().__init__() رو صدا می‌زنه، پس B اجرا می‌شه: «B» چاپ می‌کنه و بعد A («A») رو صدا می‌زنه. بعدش C، «C» رو چاپ می‌کنه." } },
  { topic: "oop", lvl: "hard",
    code: `class D:
    def __getattr__(self, name):
        return name.upper()

d = D()
d.x = "own"
print(d.x, d.y)`,
    options: ["own Y", "X Y", "own own", "Error"], answer: 0,
    why: { en: "__getattr__ is only called when the normal lookup FAILS. x exists on the object (\"own\"); y does not, so __getattr__ returns \"Y\".",
           fa: "__getattr__ فقط وقتی صدا زده می‌شه که جستجوی معمولی شکست بخوره. x روی شیء هست («own») ولی y نیست، پس __getattr__ مقدار «Y» رو برمی‌گردونه." } },
  { topic: "oop", lvl: "easy",
    code: `class Counter:
    def __init__(self):
        self.n = 0

    def inc(self):
        self.n += 1
        return self

c = Counter()
c.inc().inc().inc()
print(c.n)`,
    options: ["3", "1", "0", "None"], answer: 0,
    why: { en: "inc() returns self, so the calls can be chained: each one adds 1 to the same object, giving 3.",
           fa: "inc() خود شیء (self) رو برمی‌گردونه، برای همین می‌شه زنجیره‌ای صدا زدش: هر بار روی همون شیء ۱ اضافه می‌شه و می‌رسه به ۳." } },
  { topic: "oop", lvl: "easy",
    code: `class Cat:
    sound = "meow"

c = Cat()
print(c.sound, Cat.sound, isinstance(c, Cat))`,
    options: ["meow meow True", "meow Cat True", "meow meow False", "Error"], answer: 0,
    why: { en: "sound is a class attribute, so it can be read through the instance or the class. c was made from Cat, so isinstance is True.",
           fa: "sound یک ویژگی کلاسه، پس هم از روی شیء و هم از روی کلاس خونده می‌شه. c از Cat ساخته شده پس isinstance می‌شه True." } },
  { topic: "oop", lvl: "easy",
    code: `class P:
    def __init__(self, x, y=5):
        self.x = x
        self.y = y

p = P(1)
q = P(2, 3)
print(p.y + q.y)`,
    options: ["8", "5", "3", "6"], answer: 0,
    why: { en: "p uses the default y=5 and q gets y=3 explicitly, so the sum is 5 + 3 = 8.",
           fa: "p از مقدار پیش‌فرض y=5 استفاده می‌کنه و q صریحاً y=3 گرفته، پس جمعشون ۵ + ۳ = ۸ می‌شه." } },
  { topic: "oop", lvl: "medium",
    code: `class Bag:
    def __init__(self, items):
        self.items = items

    def __len__(self):
        return len(self.items)

print(bool(Bag([])), bool(Bag([0])))`,
    options: ["False True", "True True", "False False", "True False"], answer: 0,
    why: { en: "Without __bool__, Python uses __len__ for truthiness: length 0 is False, length 1 is True (the content does not matter).",
           fa: "اگه __bool__ نباشه پایتون از __len__ برای درست/غلط بودن استفاده می‌کنه: طول ۰ یعنی False و طول ۱ یعنی True (محتوا مهم نیست)." } },
  { topic: "oop", lvl: "medium",
    code: `class M:
    def __init__(self, v):
        self.v = v

    def __add__(self, other):
        return M(self.v + other.v)

    def __repr__(self):
        return f"M({self.v})"

print(M(1) + M(2) + M(3))`,
    options: ["M(6)", "M(3)", "6", "M(1)"], answer: 0,
    why: { en: "+ calls __add__ twice, left to right: M(1)+M(2) = M(3), then M(3)+M(3) = M(6). print uses __repr__, so it shows M(6).",
           fa: "+ دو بار __add__ رو از چپ به راست صدا می‌زنه: M(1)+M(2) = M(3) و بعد M(3)+M(3) = M(6). print از __repr__ استفاده می‌کنه پس M(6) چاپ می‌شه." } },
  { topic: "oop", lvl: "medium",
    code: `class A:
    def __init__(self):
        self.__x = 1

a = A()
print(hasattr(a, "__x"), hasattr(a, "_A__x"))`,
    options: ["False True", "True True", "True False", "False False"], answer: 0,
    why: { en: "Names starting with two underscores are mangled to _ClassName__name, so the attribute is stored as _A__x and \"__x\" does not exist.",
           fa: "اسم‌هایی که با دو آندرلاین شروع می‌شن به شکل _ClassName__name تغییر می‌کنن؛ پس ویژگی با اسم _A__x ذخیره می‌شه و \"__x\" وجود نداره." } },
  { topic: "oop", lvl: "medium",
    code: `class A:
    x = 1

class B(A):
    pass

B.x = 2
print(A.x, B.x)`,
    options: ["1 2", "2 2", "1 1", "2 1"], answer: 0,
    why: { en: "Assigning B.x = 2 creates a new attribute on B only. A keeps its own x = 1; B now finds its own x first.",
           fa: "B.x = 2 فقط روی B یک ویژگی جدید می‌سازه. A همون x = 1 خودش رو نگه می‌داره و B حالا اول x خودش رو پیدا می‌کنه." } },
  { topic: "oop", lvl: "hard",
    code: `class A:
    __slots__ = ("a",)

o = A()
o.a = 1
try:
    o.b = 2
except AttributeError:
    print("no")
else:
    print("yes")`,
    options: ["no", "yes", "Error", "1"], answer: 0,
    why: { en: "__slots__ fixes the allowed attributes and removes the per-instance dict, so setting o.b raises AttributeError, which we catch and print \"no\".",
           fa: "__slots__ ویژگی‌های مجاز رو ثابت می‌کنه و دیکشنری شیء رو حذف می‌کنه؛ پس o.b = 2 خطای AttributeError می‌ده، ما می‌گیریمش و \"no\" چاپ می‌کنیم." } },
  { topic: "oop", lvl: "hard",
    code: `class A:
    def f(self):
        return "A"

class B(A):
    pass

class C(A):
    def f(self):
        return "C"

class D(B, C):
    pass

print(D().f(), [k.__name__ for k in D.__mro__])`,
    options: ["C ['D', 'B', 'C', 'A', 'object']", "A ['D', 'B', 'C', 'A', 'object']", "C ['D', 'B', 'A', 'C', 'object']", "C ['D', 'C', 'B', 'A', 'object']"], answer: 0,
    why: { en: "The MRO is D, B, C, A, object (A must come after both its children). B has no f, so lookup goes on to C, which defines f, and that wins over A.",
           fa: "ترتیب MRO می‌شه D, B, C, A, object (A باید بعد از هر دو فرزندش بیاد). B متد f نداره پس جستجو به C می‌رسه که f داره و از A جلوتره." } },
  { topic: "oop", lvl: "hard",
    code: `class K:
    def __init__(self, v):
        self.v = v

    def __eq__(self, other):
        return self.v == other.v

try:
    print(len({K(1), K(1)}))
except TypeError:
    print("unhashable")`,
    options: ["unhashable", "1", "2", "True"], answer: 0,
    why: { en: "Defining __eq__ without __hash__ sets __hash__ to None, so K objects cannot be put in a set and a TypeError is raised.",
           fa: "وقتی __eq__ رو بدون __hash__ تعریف کنی، __hash__ برابر None می‌شه و شیءهای K رو نمی‌شه تو set گذاشت؛ خطای TypeError پیش میاد." } },

  // ---------- decorators ----------
  { topic: "decorators", lvl: "hard",
    code: `def twice(fn):
    def wrapper(*args):
        return fn(fn(*args))
    return wrapper

@twice
def inc(x):
    return x + 3

print(inc(1))`,
    options: ["7", "4", "10", "6"], answer: 0,
    why: { en: "@twice makes inc(x) = inc(inc(x)): 1 + 3 = 4, then 4 + 3 = 7.",
           fa: "@twice باعث می‌شه inc(x) برابر inc(inc(x)) بشه: ۱ + ۳ = ۴ و بعد ۴ + ۳ = ۷." } },
  { topic: "decorators", lvl: "easy",
    code: `def shout(f):
    def w(*a):
        return f(*a).upper()
    return w

@shout
def hi(n):
    return "hi " + n

print(hi("ana"))`,
    options: ["HI ANA", "hi ana", "HI ana", "None"], answer: 0,
    why: { en: "@shout replaces hi with the wrapper, which calls the original and upper-cases its result.",
           fa: "@shout تابع hi رو با wrapper عوض می‌کنه که تابع اصلی رو صدا می‌زنه و نتیجه‌ش رو بزرگ می‌کنه." } },
  { topic: "decorators", lvl: "easy",
    code: `def log(f):
    def w():
        print("start", end=" ")
        f()
        print("end")
    return w

@log
def go():
    print("go", end=" ")

go()`,
    options: ["start go end", "go", "start end", "go start end"], answer: 0,
    why: { en: "The wrapper prints \"start\", runs the original (\"go\"), then prints \"end\".",
           fa: "wrapper اول «start» چاپ می‌کنه، بعد تابع اصلی («go») اجرا می‌شه و آخرش «end» چاپ می‌شه." } },
  { topic: "decorators", lvl: "easy",
    code: `funcs = []

def reg(f):
    funcs.append(f.__name__)
    return f

@reg
def a():
    pass

@reg
def b():
    pass

print(funcs)`,
    options: ["['a', 'b']", "['b', 'a']", "[]", "['reg', 'reg']"], answer: 0,
    why: { en: "The decorator runs once for each function when it is DEFINED, in order, and returns the function unchanged.",
           fa: "دکوراتور برای هر تابع موقع تعریف اون و به ترتیب یک بار اجرا می‌شه و تابع رو دست‌نخورده برمی‌گردونه." } },
  { topic: "decorators", lvl: "medium",
    code: `def d(f):
    def w(*a):
        f(*a)
    return w

@d
def add(x, y):
    return x + y

print(add(1, 2))`,
    options: ["None", "3", "Error", "(1, 2)"], answer: 0,
    why: { en: "The wrapper calls f but forgets to `return` its result, so add(1, 2) returns None.",
           fa: "wrapper تابع f رو صدا می‌زنه ولی نتیجه‌ش رو return نمی‌کنه، پس add(1, 2) مقدار None برمی‌گردونه." } },
  { topic: "decorators", lvl: "medium",
    code: `import functools

def d(f):
    @functools.wraps(f)
    def w(*a):
        return f(*a)
    return w

@d
def hello():
    pass

print(hello.__name__)`,
    options: ["hello", "w", "d", "wrapper"], answer: 0,
    why: { en: "functools.wraps copies the original name (and docstring) onto the wrapper. Without it, the name would be \"w\".",
           fa: "functools.wraps اسم (و docstring) تابع اصلی رو روی wrapper کپی می‌کنه. بدون اون اسم «w» می‌شد." } },
  { topic: "decorators", lvl: "medium",
    code: `def rep(n):
    def deco(f):
        def w():
            return [f() for _ in range(n)]
        return w
    return deco

@rep(3)
def one():
    return 1

print(one())`,
    options: ["[1, 1, 1]", "3", "[1]", "Error"], answer: 0,
    why: { en: "rep(3) runs first and returns deco, which then wraps one. The wrapper calls it 3 times and collects a list.",
           fa: "اول rep(3) اجرا می‌شه و deco رو برمی‌گردونه که بعد one رو می‌پوشونه. wrapper اون رو ۳ بار صدا می‌زنه و لیست می‌سازه." } },
  { topic: "decorators", lvl: "medium",
    code: `def a(f):
    return lambda: "A" + f()

def b(f):
    return lambda: "B" + f()

@a
@b
def c():
    return "C"

print(c())`,
    options: ["ABC", "BAC", "CBA", "ABCC"], answer: 0,
    why: { en: "Decorators apply from the bottom up: c = a(b(c)). The outer layer adds \"A\" in front of what b's layer returns (\"B\" + \"C\").",
           fa: "دکوراتورها از پایین به بالا اعمال می‌شن: c = a(b(c)). لایه بیرونی «A» رو جلوی نتیجه لایه b («B» + «C») می‌ذاره." } },
  { topic: "decorators", lvl: "hard",
    code: `def counted(f):
    def w(*a):
        w.calls += 1
        return f(*a)
    w.calls = 0
    return w

@counted
def sq(x):
    return x * x

sq(2)
sq(3)
print(sq.calls, sq(4))`,
    options: ["2 16", "3 16", "2 9", "0 16"], answer: 0,
    why: { en: "Python evaluates print's arguments left to right: sq.calls is read first (2), and only then is sq(4) called (16).",
           fa: "پایتون آرگومان‌های print رو از چپ به راست حساب می‌کنه: اول sq.calls خونده می‌شه (۲) و بعد sq(4) صدا زده می‌شه (۱۶)." } },
  { topic: "decorators", lvl: "hard",
    code: `class C:
    def __init__(self):
        self._v = 1

    @property
    def v(self):
        return self._v

    @v.setter
    def v(self, x):
        self._v = x * 2

c = C()
c.v = 5
print(c.v)`,
    options: ["10", "5", "1", "Error"], answer: 0,
    why: { en: "c.v = 5 runs the setter, which stores 5 * 2 = 10. Reading c.v runs the getter and returns 10.",
           fa: "c.v = 5 ستر رو اجرا می‌کنه که ۵ × ۲ = ۱۰ رو ذخیره می‌کنه. خوندن c.v گتر رو اجرا می‌کنه و ۱۰ برمی‌گردونه." } },
  { topic: "decorators", lvl: "easy",
    code: `def mark(f):
    f.tag = "x"
    return f

@mark
def a():
    pass

print(a.tag)`,
    options: ["x", "a", "None", "Error"], answer: 0,
    why: { en: "mark returns the SAME function after adding an attribute to it, so a.tag is \"x\".",
           fa: "mark همون تابع رو بعد از اضافه کردن یک ویژگی برمی‌گردونه، پس a.tag برابر \"x\" هست." } },
  { topic: "decorators", lvl: "easy",
    code: `def d(f):
    return lambda: f() + 1

def g():
    return 1

g = d(g)
print(g())`,
    options: ["2", "1", "Error", "3"], answer: 0,
    why: { en: "@d above a function is just g = d(g). The new g calls the old one (1) and adds 1, so the result is 2.",
           fa: "@d بالای تابع یعنی همون g = d(g). g جدید تابع قدیمی رو صدا می‌زنه (۱) و ۱ بهش اضافه می‌کنه، پس ۲ می‌شه." } },
  { topic: "decorators", lvl: "easy",
    code: `def d(f):
    print("deco", f.__name__, end=" ")
    return f

@d
def a():
    pass

@d
def b():
    pass

print("done")`,
    options: ["deco a deco b done", "done", "done deco a deco b", "deco a done"], answer: 0,
    why: { en: "A decorator runs once, at definition time, not when the function is called. So both decorations print before \"done\".",
           fa: "دکوراتور یک بار و موقع تعریف تابع اجرا می‌شه، نه موقع صدا زدنش. پس هر دو چاپ قبل از \"done\" میان." } },
  { topic: "decorators", lvl: "medium",
    code: `def d(f):
    def w(*a, **k):
        return f(*a, **k) * 2
    return w

@d
def add(x, y=1):
    return x + y

print(add(2, y=4))`,
    options: ["12", "6", "24", "8"], answer: 0,
    why: { en: "*a and **k forward all arguments: add(2, y=4) = 6, and the wrapper doubles it to 12.",
           fa: "*a و **k همه آرگومان‌ها رو منتقل می‌کنن: add(2, y=4) برابر ۶ می‌شه و wrapper اون رو دو برابر می‌کنه: ۱۲." } },
  { topic: "decorators", lvl: "medium",
    code: `def mul(n):
    def deco(f):
        def w(x):
            return f(x) * n
        return w
    return deco

@mul(2)
@mul(3)
def one(x):
    return x

print(one(5))`,
    options: ["30", "10", "15", "25"], answer: 0,
    why: { en: "The decorators stack: the inner mul(3) makes it 5*3 = 15, then the outer mul(2) doubles that to 30.",
           fa: "دکوراتورها روی هم سوار می‌شن: mul(3) درونی ۵*۳ = ۱۵ می‌کنه و بعد mul(2) بیرونی اون رو دو برابر می‌کنه: ۳۰." } },
  { topic: "decorators", lvl: "medium",
    code: `class Count:
    def __init__(self, f):
        self.f = f
        self.n = 0

    def __call__(self, *a):
        self.n += 1
        return self.f(*a)

@Count
def hi():
    return "hi"

hi()
hi()
print(hi.n)`,
    options: ["2", "3", "0", "1"], answer: 0,
    why: { en: "A class can be a decorator: hi becomes a Count object, and each call goes through __call__ which adds 1. After two calls n is 2.",
           fa: "یک کلاس هم می‌تونه دکوراتور باشه: hi تبدیل به شیء Count می‌شه و هر صدا زدن از __call__ رد می‌شه که ۱ اضافه می‌کنه. بعد از دو بار n برابر ۲ هست." } },
  { topic: "decorators", lvl: "medium",
    code: `def once(f):
    done = []

    def w():
        if not done:
            done.append(1)
            return f()
        return "skip"
    return w

@once
def init():
    return "ran"

print(init(), init())`,
    options: ["ran skip", "ran ran", "skip skip", "ran None"], answer: 0,
    why: { en: "The list done lives in the closure. The first call finds it empty and runs f; the second call sees it filled and returns \"skip\".",
           fa: "لیست done تو closure می‌مونه. بار اول خالیه و f اجرا می‌شه؛ بار دوم پر شده و \"skip\" برمی‌گرده." } },
  { topic: "decorators", lvl: "hard",
    code: `def d(f):
    return 42

@d
def f():
    pass

print(f)`,
    options: ["42", "None", "<function f>", "Error"], answer: 0,
    why: { en: "A decorator's return value replaces the name. d returns 42, so f is now just the number 42.",
           fa: "مقدار برگشتی دکوراتور جای اسم رو می‌گیره. d عدد ۴۲ برمی‌گردونه، پس f الان فقط عدد ۴۲ هست." } },
  { topic: "decorators", lvl: "hard",
    code: `def counter(f):
    n = 0

    def w(*a):
        nonlocal n
        n += 1
        return f(*a), n
    return w

@counter
def sq(x):
    return x * x

sq(2)
print(sq(3))`,
    options: ["(9, 2)", "(9, 1)", "9", "(4, 2)"], answer: 0,
    why: { en: "n lives in the closure and nonlocal lets w change it. After sq(2), n is 1; the call sq(3) makes it 2 and returns the tuple (9, 2).",
           fa: "n تو closure زندگی می‌کنه و nonlocal به w اجازه تغییرش رو می‌ده. بعد از sq(2) مقدار n برابر ۱ می‌شه؛ sq(3) اون رو ۲ می‌کنه و تاپل (9, 2) برمی‌گردونه." } },
  { topic: "decorators", lvl: "hard",
    code: `from functools import lru_cache

calls = []

@lru_cache(maxsize=None)
def f(x):
    calls.append(x)
    return x * 2

f(1)
f(1)
f(2)
print(f.cache_info().hits, len(calls))`,
    options: ["1 2", "0 3", "2 2", "1 3"], answer: 0,
    why: { en: "The second f(1) is answered from the cache (1 hit), so the body ran only for f(1) and f(2): 2 calls.",
           fa: "f(1) دوم از کش جواب می‌گیره (۱ برخورد کش)، پس بدنه فقط برای f(1) و f(2) اجرا شده: ۲ بار." } },

  // ---------- generators ----------
  { topic: "generators", lvl: "hard",
    code: `def gen():
    x = yield 1
    print("got", x, end=" ")
    yield 2

g = gen()
a = next(g)
b = g.send("hi")
print(a, b)`,
    options: ["got hi 1 2", "1 2 got hi", "got None 1 2", "1 2"], answer: 0,
    why: { en: "send(\"hi\") resumes the generator and x becomes \"hi\", so it prints \"got hi\" before yielding 2. The last print then shows 1 2.",
           fa: "send(\"hi\") ژنراتور رو ادامه می‌ده و x می‌شه «hi»، پس قبل از yield 2 عبارت «got hi» چاپ می‌شه. چاپ آخر هم 1 2 رو نشون می‌ده." } },
  { topic: "generators", lvl: "easy",
    code: `def g():
    yield 1
    yield 2

it = g()
print(next(it), next(it))`,
    options: ["1 2", "1 1", "2 2", "[1, 2]"], answer: 0,
    why: { en: "Each next() runs the generator until its next yield: first 1, then 2.",
           fa: "هر next() ژنراتور رو تا yield بعدی اجرا می‌کنه: اول ۱ و بعد ۲." } },
  { topic: "generators", lvl: "easy",
    code: `g = (x for x in range(3))
print(list(g), list(g))`,
    options: ["[0, 1, 2] []", "[0, 1, 2] [0, 1, 2]", "[] []", "[0, 1, 2] None"], answer: 0,
    why: { en: "A generator can be used only once. The first list() uses it up, so the second one gets nothing.",
           fa: "ژنراتور فقط یک بار قابل استفاده‌ست. list() اول اون رو تموم می‌کنه، پس دومی چیزی نمی‌گیره." } },
  { topic: "generators", lvl: "easy",
    code: `def count(n):
    i = 0
    while i < n:
        yield i
        i += 1

print(sum(count(4)))`,
    options: ["6", "10", "4", "3"], answer: 0,
    why: { en: "count(4) yields 0, 1, 2, 3. Their sum is 6.",
           fa: "count(4) مقدارهای ۰ و ۱ و ۲ و ۳ رو می‌ده. جمعشون ۶ هست." } },
  { topic: "generators", lvl: "medium",
    code: `def g():
    print("a", end=" ")
    yield 1
    print("b", end=" ")
    yield 2

x = g()
print("made", end=" ")
next(x)`,
    options: ["made a", "a made", "a b made", "made a b"], answer: 0,
    why: { en: "Calling g() runs NOTHING yet. The body starts at the first next(): so \"made\" is printed first, then \"a\".",
           fa: "صدا زدن g() هنوز هیچی اجرا نمی‌کنه. بدنه از اولین next() شروع می‌شه: پس اول «made» و بعد «a» چاپ می‌شه." } },
  { topic: "generators", lvl: "medium",
    code: `def a():
    yield 1
    yield from [2, 3]
    yield 4

print(list(a()))`,
    options: ["[1, 2, 3, 4]", "[1, [2, 3], 4]", "[1, 4]", "[1, 2, 3]"], answer: 0,
    why: { en: "yield from hands over each item of the list one by one, so the result is flat: [1, 2, 3, 4].",
           fa: "yield from عضوهای لیست رو یکی‌یکی تحویل می‌ده، پس نتیجه تخته: [1, 2, 3, 4]." } },
  { topic: "generators", lvl: "medium",
    code: `def g():
    yield 1
    return "done"

it = g()
next(it)
try:
    next(it)
except StopIteration as e:
    print(e.value)`,
    options: ["done", "None", "1", "StopIteration"], answer: 0,
    why: { en: "A return in a generator ends it and raises StopIteration carrying the returned value, available as e.value.",
           fa: "return در ژنراتور اون رو تموم می‌کنه و StopIteration می‌ده که مقدار برگشتی رو همراه داره و توی e.value هست." } },
  { topic: "generators", lvl: "medium",
    code: `print(sum(x for x in range(5)), max(x * x for x in range(4)))`,
    options: ["10 9", "10 16", "5 9", "10 6"], answer: 0,
    why: { en: "0+1+2+3+4 = 10. The biggest square among 0, 1, 4, 9 is 9.",
           fa: "۰+۱+۲+۳+۴ = ۱۰. بزرگ‌ترین مربع بین ۰ و ۱ و ۴ و ۹ برابر ۹ هست." } },
  { topic: "generators", lvl: "hard",
    code: `def g():
    try:
        yield 1
        yield 2
    finally:
        print("closed", end=" ")

it = g()
next(it)
it.close()
print("end")`,
    options: ["closed end", "end", "end closed", "closed"], answer: 0,
    why: { en: "close() raises GeneratorExit at the paused yield, so the finally block runs immediately, before \"end\".",
           fa: "close() در نقطه توقف yield خطای GeneratorExit می‌ده، پس بلوک finally همون لحظه و قبل از «end» اجرا می‌شه." } },
  { topic: "generators", lvl: "hard",
    code: `import itertools

print(list(itertools.islice(itertools.count(5, 2), 3)), list(itertools.chain("ab", [1])))`,
    options: ["[5, 7, 9] ['a', 'b', 1]", "[5, 7, 9, 11] ['a', 'b', 1]", "[5, 7, 9] ['ab', 1]", "[7, 9, 11] ['a', 'b', 1]"], answer: 0,
    why: { en: "count(5, 2) never ends: 5, 7, 9, ... and islice takes the first 3. chain walks a string letter by letter, then the list.",
           fa: "count(5, 2) هیچ‌وقت تموم نمی‌شه: ۵ و ۷ و ۹ و ... و islice سه تای اول رو برمی‌داره. chain رشته رو حرف به حرف و بعد لیست رو می‌ره." } },
  { topic: "generators", lvl: "easy",
    code: `g = (i for i in range(3))
print(type(g).__name__)`,
    options: ["generator", "list", "tuple", "iterator"], answer: 0,
    why: { en: "Parentheses with a for-clause make a generator expression, not a tuple. Its type is generator.",
           fa: "پرانتز همراه با for یک generator expression می‌سازه، نه تاپل. نوعش generator هست." } },
  { topic: "generators", lvl: "easy",
    code: `def g():
    for i in range(3):
        yield i * i

print(list(g()))`,
    options: ["[0, 1, 4]", "[0, 1, 2]", "[1, 4, 9]", "[0, 1, 4, 9]"], answer: 0,
    why: { en: "The generator yields i*i for i = 0, 1, 2, which gives 0, 1, 4. list() collects them.",
           fa: "generator به ازای i = 0, 1, 2 مقدار i*i رو yield می‌کنه: ۰، ۱، ۴. list() همه رو جمع می‌کنه." } },
  { topic: "generators", lvl: "easy",
    code: `def g():
    yield "a"
    yield "b"

it = g()
print(next(it) + next(it))`,
    options: ["ab", "ba", "a", "a b"], answer: 0,
    why: { en: "Each next() resumes the generator to the next yield: first \"a\", then \"b\". Adding strings gives \"ab\".",
           fa: "هر next() مولد رو تا yield بعدی جلو می‌بره: اول \"a\" و بعد \"b\". جمع رشته‌ها می‌شه \"ab\"." } },
  { topic: "generators", lvl: "medium",
    code: `it = iter([1])
print(next(it, "end"), next(it, "end"))`,
    options: ["1 end", "1 1", "1 None", "end end"], answer: 0,
    why: { en: "The first next gives 1. The iterator is then empty, so the second next returns the default \"end\" instead of raising StopIteration.",
           fa: "next اول مقدار ۱ رو می‌ده. بعدش iterator خالیه، پس next دوم به جای خطای StopIteration مقدار پیش‌فرض \"end\" رو برمی‌گردونه." } },
  { topic: "generators", lvl: "medium",
    code: `data = [1, 2, 3]
g = (x * 2 for x in data)
data.append(4)
print(list(g))`,
    options: ["[2, 4, 6, 8]", "[2, 4, 6]", "[1, 2, 3, 4]", "[]"], answer: 0,
    why: { en: "A generator is lazy: it walks the same list object when you consume it, so it also sees the 4 appended before list(g) ran.",
           fa: "generator تنبله: وقتی مصرفش می‌کنی روی همون لیست راه می‌ره، پس ۴ که قبل از list(g) اضافه شده رو هم می‌بینه." } },
  { topic: "generators", lvl: "medium",
    code: `def fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

g = fib()
print([next(g) for _ in range(7)])`,
    options: ["[0, 1, 1, 2, 3, 5, 8]", "[1, 1, 2, 3, 5, 8, 13]", "[0, 1, 2, 3, 5, 8, 13]", "[0, 1, 1, 2, 3, 5]"], answer: 0,
    why: { en: "The infinite generator yields a each time and then advances (a, b). Taking 7 values gives 0, 1, 1, 2, 3, 5, 8.",
           fa: "این generator بی‌نهایت هر بار a رو yield می‌کنه و بعد (a, b) رو جلو می‌بره. گرفتن ۷ مقدار می‌شه ۰، ۱، ۱، ۲، ۳، ۵، ۸." } },
  { topic: "generators", lvl: "medium",
    code: `def g():
    for i in range(3):
        yield i

print(sum(g()), sum(g()))`,
    options: ["3 3", "3 0", "6 6", "3 6"], answer: 0,
    why: { en: "Every call g() creates a brand-new generator, so each sum starts fresh: 0+1+2 = 3 both times.",
           fa: "هر بار g() صدا زده بشه یک generator کاملاً تازه ساخته می‌شه، پس هر دو جمع از اول شروع می‌کنن: ۰+۱+۲ = ۳." } },
  { topic: "generators", lvl: "hard",
    code: `def acc():
    t = 0
    while True:
        x = yield t
        t += x

a = acc()
next(a)
a.send(5)
print(a.send(10))`,
    options: ["15", "10", "5", "None"], answer: 0,
    why: { en: "next(a) primes the generator. send(5) makes t = 5, send(10) makes t = 15, and the value of the next yield (t) is returned: 15.",
           fa: "next(a) مولد رو آماده می‌کنه. send(5) باعث t = 5 می‌شه، send(10) می‌شه t = 15 و مقدار yield بعدی (t) برگردونده می‌شه: ۱۵." } },
  { topic: "generators", lvl: "hard",
    code: `def inner():
    yield 1
    return "r"

def outer():
    r = yield from inner()
    yield r

print(list(outer()))`,
    options: ["[1, 'r']", "[1]", "['r']", "[1, None]"], answer: 0,
    why: { en: "yield from passes inner's yielded 1 through, and its return value \"r\" becomes the value of the yield from expression. outer then yields r.",
           fa: "yield from مقدار ۱ رو از inner رد می‌کنه و مقدار return اون، یعنی \"r\"، مقدار خود عبارت yield from می‌شه. بعد outer مقدار r رو yield می‌کنه." } },
  { topic: "generators", lvl: "hard",
    code: `def g():
    try:
        yield 1
    except ValueError:
        yield "caught"
    yield 3

it = g()
next(it)
print(it.throw(ValueError), next(it))`,
    options: ["caught 3", "1 3", "caught caught", "Error"], answer: 0,
    why: { en: "throw() raises ValueError at the paused yield; the generator catches it and yields \"caught\", which throw returns. The next next() resumes after that and gives 3.",
           fa: "throw() خطای ValueError رو همون جایی که مولد متوقف شده بالا میاره؛ مولد می‌گیرتش و \"caught\" رو yield می‌کنه که throw برمی‌گردونه. next بعدی ادامه می‌ده و ۳ می‌ده." } },

  // ---------- recursion ----------
  { topic: "recursion", lvl: "medium",
    code: `def depth(x):
    if not isinstance(x, list):
        return 0
    return 1 + max(map(depth, x), default=0)

print(depth([1, [2, [3, []]], 4]))`,
    options: ["4", "3", "5", "2"], answer: 0,
    why: { en: "Depth counts nested lists: outer(1) -> [2, [3, []]](2) -> [3, []](3) -> [](4). An empty list gives 1 + 0 (default=0) = 1.",
           fa: "عمق یعنی تعداد لیست‌های تودرتو: بیرونی(۱) ← [2, [3, []]](۲) ← [3, []](۳) ← [](۴). لیست خالی ۱ + ۰ می‌شه (به‌خاطر default=0)." } },
  { topic: "recursion", lvl: "easy",
    code: `def fact(n):
    return 1 if n <= 1 else n * fact(n - 1)

print(fact(5))`,
    options: ["120", "24", "720", "Error"], answer: 0,
    why: { en: "5 * 4 * 3 * 2 * 1 = 120. The recursion stops at n <= 1.",
           fa: "۵ × ۴ × ۳ × ۲ × ۱ = ۱۲۰. بازگشت وقتی n <= 1 بشه متوقف می‌شه." } },
  { topic: "recursion", lvl: "easy",
    code: `def f(n):
    if n == 0:
        return 0
    return n + f(n - 1)

print(f(4))`,
    options: ["10", "24", "6", "0"], answer: 0,
    why: { en: "f(4) = 4 + 3 + 2 + 1 + 0 = 10.",
           fa: "f(4) = ۴ + ۳ + ۲ + ۱ + ۰ = ۱۰." } },
  { topic: "recursion", lvl: "easy",
    code: `def count(n):
    if n == 0:
        print("go")
        return
    print(n, end=" ")
    count(n - 1)

count(3)`,
    options: ["3 2 1 go", "go 1 2 3", "1 2 3 go", "3 2 1"], answer: 0,
    why: { en: "Each call prints n first, then calls itself with n - 1. At 0 it prints \"go\".",
           fa: "هر فراخوانی اول n رو چاپ می‌کنه و بعد خودش رو با n - 1 صدا می‌زنه. توی ۰ «go» چاپ می‌شه." } },
  { topic: "recursion", lvl: "medium",
    code: `def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

print([fib(i) for i in range(7)])`,
    options: ["[0, 1, 1, 2, 3, 5, 8]", "[1, 1, 2, 3, 5, 8, 13]", "[0, 1, 2, 3, 4, 5, 6]", "[0, 1, 1, 2, 3, 5]"], answer: 0,
    why: { en: "Each number is the sum of the two before it, starting 0, 1: 0, 1, 1, 2, 3, 5, 8.",
           fa: "هر عدد مجموع دو عدد قبلیه، با شروع ۰ و ۱: ۰ و ۱ و ۱ و ۲ و ۳ و ۵ و ۸." } },
  { topic: "recursion", lvl: "medium",
    code: `def rev(s):
    return s if len(s) <= 1 else rev(s[1:]) + s[0]

print(rev("abc"))`,
    options: ["cba", "abc", "bca", "acb"], answer: 0,
    why: { en: "rev(\"abc\") = rev(\"bc\") + \"a\" = (rev(\"c\") + \"b\") + \"a\" = \"cba\".",
           fa: "rev(\"abc\") = rev(\"bc\") + \"a\" = (rev(\"c\") + \"b\") + \"a\" = «cba»." } },
  { topic: "recursion", lvl: "medium",
    code: `def flat(x):
    if not isinstance(x, list):
        return [x]
    out = []
    for i in x:
        out += flat(i)
    return out

print(flat([1, [2, [3]], 4]))`,
    options: ["[1, 2, 3, 4]", "[1, [2, [3]], 4]", "[1, 2, [3], 4]", "[4, 3, 2, 1]"], answer: 0,
    why: { en: "Every non-list becomes a one-item list, and lists are opened recursively and joined, giving a flat list.",
           fa: "هر چیزی که لیست نباشه به لیست تک‌عضوی تبدیل می‌شه و لیست‌ها به‌صورت بازگشتی باز و به هم چسبونده می‌شن، پس نتیجه تخته." } },
  { topic: "recursion", lvl: "medium",
    code: `def f(n):
    return f(n + 1)

try:
    f(0)
except RecursionError:
    print("too deep")`,
    options: ["too deep", "None", "0", "hang forever"], answer: 0,
    why: { en: "Without a stopping condition Python stops at its recursion limit (about 1000) and raises RecursionError, which is caught here.",
           fa: "بدون شرط توقف، پایتون وقتی به حد بازگشت (حدود ۱۰۰۰) برسه RecursionError می‌ده که اینجا گرفته می‌شه." } },
  { topic: "recursion", lvl: "hard",
    code: `from functools import lru_cache

@lru_cache(None)
def f(n):
    return n if n < 2 else f(n - 1) + f(n - 2)

f(10)
info = f.cache_info()
print(info.misses, info.hits)`,
    options: ["11 8", "10 8", "11 9", "21 0"], answer: 0,
    why: { en: "Each n from 0 to 10 is computed once (11 misses). For n >= 3 the second call f(n - 2) is already cached: 8 hits.",
           fa: "هر n از ۰ تا ۱۰ فقط یک بار حساب می‌شه (۱۱ miss). از n >= 3 به بعد فراخوانی f(n - 2) قبلاً ذخیره شده: ۸ hit." } },
  { topic: "recursion", lvl: "hard",
    code: `def even(n):
    return True if n == 0 else odd(n - 1)

def odd(n):
    return False if n == 0 else even(n - 1)

print(even(6), odd(7), even(3))`,
    options: ["True True False", "True False False", "False True True", "True True True"], answer: 0,
    why: { en: "Mutual recursion: the two functions call each other, flipping between even and odd until 0. 6 is even, 7 is odd, 3 is not even.",
           fa: "بازگشت متقابل: دو تابع همدیگه رو صدا می‌زنن و بین زوج و فرد عوض می‌شن تا ۰. ۶ زوجه، ۷ فرده و ۳ زوج نیست." } },
  { topic: "recursion", lvl: "easy",
    code: `def power(b, e):
    return 1 if e == 0 else b * power(b, e - 1)

print(power(2, 5))`,
    options: ["32", "10", "25", "16"], answer: 0,
    why: { en: "power(2,5) = 2 * power(2,4) = ... = 2*2*2*2*2*1 = 32. The base case e == 0 returns 1.",
           fa: "power(2,5) = 2 * power(2,4) = ... = 2*2*2*2*2*1 = 32. حالت پایه e == 0 مقدار ۱ برمی‌گردونه." } },
  { topic: "recursion", lvl: "easy",
    code: `def s(n):
    if n == 0:
        return ""
    return str(n) + s(n - 1)

print(s(4))`,
    options: ["4321", "1234", "4", "10"], answer: 0,
    why: { en: "Each call puts its own n in front of the result of the smaller call: \"4\" + \"3\" + \"2\" + \"1\" + \"\" = \"4321\".",
           fa: "هر فراخوانی n خودش رو جلوی نتیجه فراخوانی کوچک‌تر می‌ذاره: \"4\" + \"3\" + \"2\" + \"1\" + \"\" = \"4321\"." } },
  { topic: "recursion", lvl: "easy",
    code: `def length(l):
    return 0 if not l else 1 + length(l[1:])

print(length([5, 6, 7, 8]))`,
    options: ["4", "3", "26", "0"], answer: 0,
    why: { en: "Each call counts 1 for the first item and recurses on the rest. Four items give 1+1+1+1+0 = 4.",
           fa: "هر فراخوانی برای اولین عضو ۱ می‌شماره و روی بقیه ادامه می‌ده. چهار عضو می‌شه ۱+۱+۱+۱+۰ = ۴." } },
  { topic: "recursion", lvl: "medium",
    code: `def gcd(a, b):
    return a if b == 0 else gcd(b, a % b)

print(gcd(48, 18))`,
    options: ["6", "12", "3", "18"], answer: 0,
    why: { en: "Euclid's algorithm: gcd(48,18) -> gcd(18,12) -> gcd(12,6) -> gcd(6,0) = 6.",
           fa: "الگوریتم اقلیدس: gcd(48,18) ← gcd(18,12) ← gcd(12,6) ← gcd(6,0) = ۶." } },
  { topic: "recursion", lvl: "medium",
    code: `def b(n):
    return str(n) if n < 2 else b(n // 2) + str(n % 2)

print(b(10))`,
    options: ["1010", "0101", "1100", "101"], answer: 0,
    why: { en: "The remainders are added AFTER the recursive call, so the last (highest) bit comes first: 10 -> 1, 0, 1, 0 = \"1010\".",
           fa: "باقی‌مانده‌ها بعد از فراخوانی بازگشتی اضافه می‌شن، پس بیت بالاتر اول میاد: ۱۰ ← ۱، ۰، ۱، ۰ = \"1010\"." } },
  { topic: "recursion", lvl: "medium",
    code: `def pal(s):
    return True if len(s) < 2 else s[0] == s[-1] and pal(s[1:-1])

print(pal("level"), pal("abca"))`,
    options: ["True False", "True True", "False False", "False True"], answer: 0,
    why: { en: "\"level\" matches at both ends, then \"eve\", then \"v\" (base case), so True. \"abca\" matches a/a, then \"bc\" fails b != c, so False.",
           fa: "\"level\" سر و ته یکسانه، بعد \"eve\" و بعد \"v\" (حالت پایه) پس True. \"abca\" اول a/a یکی هست ولی بعد \"bc\" چون b != c نیست False می‌شه." } },
  { topic: "recursion", lvl: "medium",
    code: `def total(x):
    return x if isinstance(x, int) else sum(total(i) for i in x)

print(total([1, [2, [3, 4]], 5]))`,
    options: ["15", "10", "5", "[1, 2, 3, 4, 5]"], answer: 0,
    why: { en: "Ints are the base case; lists are summed by recursing into each item. 1 + (2 + (3 + 4)) + 5 = 15.",
           fa: "عدد صحیح حالت پایه هست؛ لیست‌ها با رفتن به هر عضو جمع می‌شن. 1 + (2 + (3 + 4)) + 5 = ۱۵." } },
  { topic: "recursion", lvl: "hard",
    code: `def f(n):
    if n == 0:
        return
    print(n, end=" ")
    f(n - 1)
    print(n, end=" ")

f(2)`,
    options: ["2 1 1 2", "2 1", "1 2", "2 1 2 1"], answer: 0,
    why: { en: "The first print runs on the way down (2, 1), the second one on the way back up after each inner call returns (1, 2). Result: 2 1 1 2.",
           fa: "پرینت اول موقع رفتن به عمق (۲، ۱) اجرا می‌شه و پرینت دوم موقع برگشت بعد از تموم شدن هر فراخوانی داخلی (۱، ۲). نتیجه: 2 1 1 2." } },
  { topic: "recursion", lvl: "hard",
    code: `calls = 0

def fib(n):
    global calls
    calls += 1
    return n if n < 2 else fib(n - 1) + fib(n - 2)

fib(5)
print(calls)`,
    options: ["15", "5", "8", "9"], answer: 0,
    why: { en: "Without caching, fib recomputes the same values: the call tree for fib(5) has 15 calls in total (calls(n) = calls(n-1) + calls(n-2) + 1).",
           fa: "بدون کش، fib یک مقدارها رو بارها دوباره حساب می‌کنه: درخت فراخوانی fib(5) در کل ۱۵ فراخوانی داره (calls(n) = calls(n-1) + calls(n-2) + 1)." } },
  { topic: "recursion", lvl: "hard",
    code: `def perms(s):
    if len(s) <= 1:
        return [s]
    return [c + p for i, c in enumerate(s) for p in perms(s[:i] + s[i + 1:])]

print(perms("abc"))`,
    options: ["['abc', 'acb', 'bac', 'bca', 'cab', 'cba']", "['abc', 'bca', 'cab']", "['abc', 'bac', 'acb', 'bca', 'cab', 'cba']", "['cba', 'cab', 'bca', 'bac', 'acb', 'abc']"], answer: 0,
    why: { en: "Each letter is picked as the first one in turn and the rest are permuted recursively: a+(bc,cb), b+(ac,ca), c+(ab,ba). That gives 6 words in this order.",
           fa: "هر حرف به نوبت اول انتخاب می‌شه و بقیه به صورت بازگشتی جایگشت می‌شن: a+(bc,cb)، b+(ac,ca)، c+(ab,ba). در نتیجه ۶ کلمه به همین ترتیب می‌شه." } },

  // ---------- async ----------
  { topic: "async", lvl: "hard",
    code: `import asyncio

async def job(name, delay):
    await asyncio.sleep(delay)
    print(name, end=" ")

async def main():
    await asyncio.gather(job("A", 0.3), job("B", 0.1), job("C", 0.2))

asyncio.run(main())`,
    options: ["B C A", "A B C", "C B A", "A C B"], answer: 0,
    why: { en: "gather starts all three at once; each prints when its sleep ends: B (0.1s), C (0.2s), A (0.3s).",
           fa: "gather هر سه رو هم‌زمان شروع می‌کنه و هر کدوم وقتی خوابش تموم شد چاپ می‌کنه: B (۰٫۱ ثانیه)، C (۰٫۲)، A (۰٫۳)." } },
  { topic: "async", lvl: "easy",
    code: `import asyncio

async def f():
    return 5

print(asyncio.run(f()))`,
    options: ["5", "None", "coroutine", "Error"], answer: 0,
    why: { en: "asyncio.run runs the coroutine to the end and gives back its return value, 5.",
           fa: "asyncio.run کوروتین رو تا آخر اجرا می‌کنه و مقدار برگشتیش یعنی ۵ رو می‌ده." } },
  { topic: "async", lvl: "easy",
    code: `import asyncio

async def main():
    print("a", end=" ")
    await asyncio.sleep(0.1)
    print("b", end=" ")

asyncio.run(main())
print("c")`,
    options: ["a b c", "c a b", "a c b", "a b"], answer: 0,
    why: { en: "asyncio.run waits until main() is completely finished, so a, b come first and then c.",
           fa: "asyncio.run صبر می‌کنه تا main() کامل تموم بشه، پس اول a و b و بعد c میاد." } },
  { topic: "async", lvl: "easy",
    code: `import asyncio

async def get():
    return 3

async def main():
    x = await get()
    print(x * 2)

asyncio.run(main())`,
    options: ["6", "3", "Error", "None"], answer: 0,
    why: { en: "await gives the coroutine's result (3), so x * 2 = 6.",
           fa: "await نتیجه کوروتین (۳) رو می‌ده، پس x * 2 می‌شه ۶." } },
  { topic: "async", lvl: "medium",
    code: `import asyncio, time

async def w():
    await asyncio.sleep(0.2)

async def main():
    t = time.perf_counter()
    await w()
    await w()
    print(round(time.perf_counter() - t, 1))

asyncio.run(main())`,
    options: ["0.4", "0.2", "0.0", "0.6"], answer: 0,
    why: { en: "Two awaits one after another run in sequence: 0.2 + 0.2 = 0.4 seconds. (gather would take about 0.2.)",
           fa: "دو await پشت سر هم به‌ترتیب اجرا می‌شن: ۰٫۲ + ۰٫۲ = ۰٫۴ ثانیه. (gather حدود ۰٫۲ طول می‌کشید.)" } },
  { topic: "async", lvl: "medium",
    code: `import asyncio

async def job():
    print("job", end=" ")

async def main():
    t = asyncio.create_task(job())
    print("main", end=" ")
    await t

asyncio.run(main())`,
    options: ["main job", "job main", "job", "main"], answer: 0,
    why: { en: "create_task only schedules the job. It starts running when main reaches an await, so \"main\" prints first.",
           fa: "create_task فقط کار رو زمان‌بندی می‌کنه. وقتی main به یک await برسه شروع می‌شه، پس اول «main» چاپ می‌شه." } },
  { topic: "async", lvl: "medium",
    code: `import asyncio

async def f(n):
    await asyncio.sleep(0.3 - n * 0.1)
    return n

async def main():
    r = await asyncio.gather(f(1), f(2), f(3))
    print(r)

asyncio.run(main())`,
    options: ["[1, 2, 3]", "[3, 2, 1]", "[2, 3, 1]", "[1, 3, 2]"], answer: 0,
    why: { en: "They finish in the order 3, 2, 1, but gather returns results in the order the tasks were GIVEN: [1, 2, 3].",
           fa: "به ترتیب ۳ و ۲ و ۱ تموم می‌شن ولی gather نتیجه‌ها رو به ترتیبی که کارها داده شدن برمی‌گردونه: [1, 2, 3]." } },
  { topic: "async", lvl: "medium",
    code: `import asyncio

async def bad():
    raise ValueError("x")

async def main():
    try:
        await asyncio.gather(bad(), asyncio.sleep(0.1))
    except ValueError:
        print("caught")

asyncio.run(main())`,
    options: ["caught", "None", "x", "Error"], answer: 0,
    why: { en: "By default gather re-raises the first exception from any of its tasks, so the try/except catches it.",
           fa: "gather به‌صورت پیش‌فرض اولین خطای هر کدوم از کارها رو دوباره بالا می‌ده، پس try/except اون رو می‌گیره." } },
  { topic: "async", lvl: "hard",
    code: `import asyncio, time

async def a():
    time.sleep(0.3)
    print("A", end=" ")

async def b():
    print("B", end=" ")

async def main():
    await asyncio.gather(a(), b())

asyncio.run(main())`,
    options: ["A B", "B A", "A", "B"], answer: 0,
    why: { en: "time.sleep is BLOCKING: it freezes the whole event loop, so a() finishes completely before b() gets a turn. (asyncio.sleep would let b run.)",
           fa: "time.sleep مسدودکننده‌ست و کل event loop رو فریز می‌کنه، پس a() کامل تموم می‌شه و بعد نوبت b() می‌رسه. (asyncio.sleep اجازه می‌داد b اجرا بشه.)" } },
  { topic: "async", lvl: "hard",
    code: `import asyncio

async def slow():
    await asyncio.sleep(1)

async def main():
    try:
        await asyncio.wait_for(slow(), 0.1)
    except asyncio.TimeoutError:
        print("timeout")

asyncio.run(main())`,
    options: ["timeout", "done", "None", "Error"], answer: 0,
    why: { en: "wait_for cancels the task and raises TimeoutError when the time limit (0.1s) passes before it finishes.",
           fa: "wait_for وقتی مهلت (۰٫۱ ثانیه) قبل از تموم شدن کار تموم بشه، کار رو لغو می‌کنه و TimeoutError می‌ده." } },
  { topic: "async", lvl: "easy",
    code: `import asyncio

async def f():
    return 1

c = f()
print(type(c).__name__)
c.close()`,
    options: ["coroutine", "int", "Task", "function"], answer: 0,
    why: { en: "Calling an async def function does not run it; it returns a coroutine object. You must await it or pass it to asyncio.run to execute it.",
           fa: "صدا زدن یک تابع async def اون رو اجرا نمی‌کنه و فقط یک شیء coroutine برمی‌گردونه. باید await بشه یا به asyncio.run داده بشه تا اجرا بشه." } },
  { topic: "async", lvl: "easy",
    code: `import asyncio

print(asyncio.run(asyncio.sleep(0, "done")))`,
    options: ["done", "None", "0", "sleep"], answer: 0,
    why: { en: "asyncio.sleep(delay, result) finishes after the delay and returns the optional result, so asyncio.run gives back \"done\".",
           fa: "asyncio.sleep(delay, result) بعد از مکث، مقدار result رو برمی‌گردونه، پس asyncio.run هم «done» رو به ما می‌ده." } },
  { topic: "async", lvl: "easy",
    code: `import asyncio

async def double(n):
    return n * 2

async def main():
    print([await double(i) for i in range(3)])

asyncio.run(main())`,
    options: ["[0, 2, 4]", "[0, 1, 2]", "[2, 4, 6]", "[0, 2, 4, 6]"], answer: 0,
    why: { en: "Each await gives the real return value (not a coroutine), so the list holds 0*2, 1*2, 2*2 = [0, 2, 4].",
           fa: "هر await مقدار برگشتی واقعی رو می‌ده (نه کوروتین)، پس لیست می‌شه 0*2 و 1*2 و 2*2 یعنی [0, 2, 4]." } },
  { topic: "async", lvl: "medium",
    code: `import asyncio

async def gen():
    for i in (1, 2, 3):
        yield i
        await asyncio.sleep(0)

async def main():
    total = 0
    async for x in gen():
        total += x
    print(total)

asyncio.run(main())`,
    options: ["6", "123", "3", "Error"], answer: 0,
    why: { en: "A function with both async def and yield is an async generator. async for pulls each value (1, 2, 3) and the sum is 6.",
           fa: "تابعی که هم async def داره و هم yield یک async generator هست. async for هر مقدار (۱ و ۲ و ۳) رو می‌گیره و جمعشون ۶ می‌شه." } },
  { topic: "async", lvl: "medium",
    code: `import asyncio

async def a():
    print("a1", end=" ")
    await asyncio.sleep(0)
    print("a2", end=" ")

async def b():
    print("b1", end=" ")
    await asyncio.sleep(0)
    print("b2", end=" ")

async def main():
    t1 = asyncio.create_task(a())
    t2 = asyncio.create_task(b())
    await t1
    await t2

asyncio.run(main())`,
    options: ["a1 b1 a2 b2", "a1 a2 b1 b2", "a1 b1 b2 a2", "b1 b2 a1 a2"], answer: 0,
    why: { en: "Each task runs until its first await, then hands control back. So a1 and b1 run first, then both resume in the same order: a2 and b2.",
           fa: "هر تسک تا اولین await جلو می‌ره و بعد کنترل رو پس می‌ده. پس اول a1 و b1 اجرا می‌شن و بعد به همون ترتیب a2 و b2." } },
  { topic: "async", lvl: "medium",
    code: `import asyncio

async def main():
    q = asyncio.Queue()
    await q.put("a")
    await q.put("b")
    x = await q.get()
    print(x, q.qsize())

asyncio.run(main())`,
    options: ["a 1", "b 1", "a 2", "a 0"], answer: 0,
    why: { en: "An asyncio.Queue is first-in-first-out, so get() returns \"a\". One item (\"b\") is still inside, so qsize() is 1.",
           fa: "asyncio.Queue به ترتیب ورود کار می‌کنه (FIFO)، پس get() مقدار «a» رو می‌ده. یک آیتم («b») هنوز توشه، پس qsize() برابر ۱ هست." } },
  { topic: "async", lvl: "medium",
    code: `import asyncio

async def bad():
    raise ValueError("x")

async def ok():
    return 7

async def main():
    res = await asyncio.gather(bad(), ok(), return_exceptions=True)
    print([type(r).__name__ for r in res])

asyncio.run(main())`,
    options: ["['ValueError', 'int']", "['ValueError', 'ValueError']", "['int', 'int']", "ValueError"], answer: 0,
    why: { en: "With return_exceptions=True, gather does not raise; the exception object itself is placed in the result list, in the original order: ValueError then the int 7.",
           fa: "با return_exceptions=True، gather خطا پرتاب نمی‌کنه و خود شیء خطا رو توی لیست نتیجه می‌ذاره، به همون ترتیب اولیه: اول ValueError و بعد عدد ۷ (int)." } },
  { topic: "async", lvl: "hard",
    code: `import asyncio

sem = asyncio.Semaphore(1)

async def w(n):
    async with sem:
        print("in", n, end=" ")
        await asyncio.sleep(0.05)
        print("out", n, end=" ")

async def main():
    await asyncio.gather(w(1), w(2))

asyncio.run(main())`,
    options: ["in 1 out 1 in 2 out 2", "in 1 in 2 out 1 out 2", "in 1 out 1 out 2 in 2", "in 2 out 2 in 1 out 1"], answer: 0,
    why: { en: "Semaphore(1) lets only one task inside at a time. Task 2 must wait until task 1 leaves, so the pairs do not interleave.",
           fa: "Semaphore(1) فقط یک تسک رو هم‌زمان داخل میذاره. تسک ۲ باید صبر کنه تا تسک ۱ بیرون بیاد، پس جفت‌ها قاطی نمی‌شن." } },
  { topic: "async", lvl: "hard",
    code: `import asyncio

async def work():
    try:
        await asyncio.sleep(1)
    except asyncio.CancelledError:
        print("cancelled", end=" ")
        raise

async def main():
    t = asyncio.create_task(work())
    await asyncio.sleep(0.1)
    t.cancel()
    try:
        await t
    except asyncio.CancelledError:
        print("caught")

asyncio.run(main())`,
    options: ["cancelled caught", "caught", "cancelled", "cancelled caught done"], answer: 0,
    why: { en: "t.cancel() throws CancelledError inside work at its await, so it prints \"cancelled\". It re-raises, so awaiting t raises CancelledError in main, which prints \"caught\".",
           fa: "t.cancel() داخل work روی await اون خطای CancelledError می‌ندازه، پس «cancelled» چاپ می‌شه. چون دوباره raise می‌کنه، await t توی main هم این خطا رو می‌گیره و «caught» چاپ می‌شه." } },
  { topic: "async", lvl: "hard",
    code: `import asyncio

ev = asyncio.Event()

async def waiter():
    await ev.wait()
    print("go", end=" ")

async def setter():
    print("set", end=" ")
    ev.set()

async def main():
    await asyncio.gather(waiter(), setter())

asyncio.run(main())`,
    options: ["set go", "go set", "set", "go"], answer: 0,
    why: { en: "waiter starts first but blocks on ev.wait(). setter then prints \"set\" and sets the event, which wakes waiter so it prints \"go\".",
           fa: "waiter اول شروع می‌شه ولی روی ev.wait() می‌ایسته. بعد setter «set» رو چاپ می‌کنه و event رو فعال می‌کنه، که waiter رو بیدار می‌کنه و «go» چاپ می‌شه." } },

  // ---------- regex ----------
  { topic: "regex", lvl: "medium",
    code: `import re

html = "<b>one</b><b>two</b>"
print(re.findall(r"<b>(.*?)</b>", html))`,
    options: ["['one', 'two']", "['one</b><b>two']", "['<b>one</b>', '<b>two</b>']", "[]"], answer: 0,
    why: { en: "(.*?) is non-greedy: it stops at the first </b>, so each tag gives its own text: ['one', 'two']. A greedy (.*) would grab everything in one match.",
           fa: "(.*?) غیرحریصه و تا اولین </b> می‌ره، پس متن هر تگ جدا درمیاد: ['one', 'two']. اگه حریص (.*) بود همه‌چی رو یک‌جا می‌گرفت." } },
  { topic: "regex", lvl: "easy",
    code: `import re

print(re.findall(r"\\d+", "a12b345"))`,
    options: ["['12', '345']", "['1', '2', '3', '4', '5']", "['12b345']", "['a', 'b']"], answer: 0,
    why: { en: "\\d+ matches one or more digits in a row, so the numbers 12 and 345 are found as whole groups.",
           fa: "\\d+ یک یا چند رقم پشت سر هم رو می‌گیره، پس عددهای ۱۲ و ۳۴۵ به‌صورت کامل پیدا می‌شن." } },
  { topic: "regex", lvl: "easy",
    code: `import re

print(re.sub(r"\\s+", " ", "a   b    c"))`,
    options: ["a b c", "abc", "a   b c", "a b  c"], answer: 0,
    why: { en: "\\s+ matches any run of whitespace, and each run is replaced by a single space.",
           fa: "\\s+ هر دنباله از فاصله رو می‌گیره و هر دنباله با یک فاصله جایگزین می‌شه." } },
  { topic: "regex", lvl: "easy",
    code: `import re

print(bool(re.match(r"a", "ba")), bool(re.search(r"a", "ba")))`,
    options: ["False True", "True True", "False False", "True False"], answer: 0,
    why: { en: "match only checks the START of the text (it begins with \"b\", so no match). search looks anywhere in the text.",
           fa: "match فقط ابتدای متن رو چک می‌کنه (با «b» شروع می‌شه پس جور نیست). search همه جای متن رو می‌گرده." } },
  { topic: "regex", lvl: "medium",
    code: `import re

m = re.search(r"(\\w+)@(\\w+)\\.com", "mail ana@site.com now")
print(m.group(1), m.group(2), m.group(0))`,
    options: ["ana site ana@site.com", "ana@site.com ana site", "ana site.com ana@site.com", "mail ana site"], answer: 0,
    why: { en: "group(0) is the whole match, group(1) and group(2) are the parts inside the first and second parentheses.",
           fa: "group(0) کل تطابقه و group(1) و group(2) بخش‌های داخل پرانتز اول و دوم هستن." } },
  { topic: "regex", lvl: "medium",
    code: `import re

print(re.findall(r"^\\w+", "ab cd\\nef gh", re.M))`,
    options: ["['ab', 'ef']", "['ab']", "['ab', 'cd', 'ef', 'gh']", "['ab', 'ef', 'gh']"], answer: 0,
    why: { en: "With re.M, ^ matches at the start of EACH line. \\w+ takes the first word of each line: ab and ef.",
           fa: "با re.M علامت ^ ابتدای هر خط رو می‌گیره. \\w+ اولین کلمه هر خط رو برمی‌داره: ab و ef." } },
  { topic: "regex", lvl: "medium",
    code: `import re

print(re.split(r"[,;]\\s*", "a, b;c,d"))`,
    options: ["['a', 'b', 'c', 'd']", "['a', ' b', 'c', 'd']", "['a, b;c,d']", "['a', 'b', 'c,d']"], answer: 0,
    why: { en: "The pattern splits at a comma or semicolon plus any spaces after it, so no stray spaces remain.",
           fa: "الگو از کاما یا نقطه‌ویرگول به‌همراه فاصله‌های بعدش جدا می‌کنه، پس فاصله اضافه‌ای نمی‌مونه." } },
  { topic: "regex", lvl: "medium",
    code: `import re

print(re.findall(r"(\\d)(\\w)", "1a 2b"))`,
    options: ["[('1', 'a'), ('2', 'b')]", "['1a', '2b']", "['1', '2']", "[('1', 'a')]"], answer: 0,
    why: { en: "With two groups, findall returns a list of tuples, one tuple per match: ('1', 'a') and ('2', 'b').",
           fa: "وقتی دو گروه داریم findall لیستی از تاپل‌ها برمی‌گردونه، یک تاپل برای هر تطابق: ('1', 'a') و ('2', 'b')." } },
  { topic: "regex", lvl: "hard",
    code: `import re

print(re.findall(r"\\w+(?=!)", "hi! yo hey!"))`,
    options: ["['hi', 'hey']", "['hi!', 'hey!']", "['hi', 'yo', 'hey']", "['yo']"], answer: 0,
    why: { en: "(?=!) is a lookahead: it requires a \"!\" right after the word but does not include it in the match.",
           fa: "(?=!) یک lookahead هست: وجود «!» بعد از کلمه رو لازم می‌دونه ولی اون رو توی نتیجه نمی‌ذاره." } },
  { topic: "regex", lvl: "hard",
    code: `import re

print(re.sub(r"(\\w)(\\d)", r"\\2\\1", "a1 b2"))`,
    options: ["1a 2b", "a1 b2", "1 2", "a1b2"], answer: 0,
    why: { en: "\\2\\1 swaps the two captured groups: letter+digit becomes digit+letter.",
           fa: "\\2\\1 دو گروه گرفته‌شده رو جابه‌جا می‌کنه: حرف+رقم می‌شه رقم+حرف." } },
  { topic: "regex", lvl: "easy",
    code: `import re

print(re.findall(r"[aeiou]", "banana"))`,
    options: ["['a', 'a', 'a']", "['b', 'n', 'n']", "['a']", "['aaa']"], answer: 0,
    why: { en: "[aeiou] matches ONE vowel at a time, and findall returns every match: the three a letters of banana.",
           fa: "[aeiou] هر بار یک حرف صدادار رو می‌گیره و findall همه تطابق‌ها رو برمی‌گردونه: سه تا a توی banana." } },
  { topic: "regex", lvl: "easy",
    code: `import re

print(re.sub(r"\\d", "#", "a1b22"))`,
    options: ["a#b##", "a#b#", "a#b2", "#1#22"], answer: 0,
    why: { en: "\\d matches a single digit, so every digit is replaced separately: 1 becomes # and 22 becomes ##.",
           fa: "\\d یک رقم تکی رو می‌گیره، پس هر رقم جدا جایگزین می‌شه: ۱ می‌شه # و ۲۲ می‌شه ##." } },
  { topic: "regex", lvl: "easy",
    code: `import re

print(re.fullmatch(r"\\d+", "123a"))`,
    options: ["None", "False", "123", "[]"], answer: 0,
    why: { en: "fullmatch needs the WHOLE string to match. The trailing \"a\" is not a digit, so there is no match and the result is None.",
           fa: "fullmatch می‌خواد کل رشته جور باشه. حرف «a» آخر رقم نیست، پس تطابقی نیست و نتیجه None می‌شه." } },
  { topic: "regex", lvl: "medium",
    code: `import re

print(re.split(r"(\\d)", "a1b2c"))`,
    options: ["['a', '1', 'b', '2', 'c']", "['a', 'b', 'c']", "['a1', 'b2', 'c']", "['a', '1', 'b', '2']"], answer: 0,
    why: { en: "When the split pattern has a capturing group, the separators themselves are kept in the result list.",
           fa: "وقتی الگوی split یک گروه گرفته‌شده داره، خود جداکننده‌ها هم توی لیست نتیجه می‌مونن." } },
  { topic: "regex", lvl: "medium",
    code: `import re

m = re.match(r"(?P<y>\\d{4})-(?P<m>\\d\\d)", "2026-10-21")
print(m.group("m"), m.groupdict()["y"])`,
    options: ["10 2026", "2026 10", "10 10", "21 2026"], answer: 0,
    why: { en: "Named groups can be read by name. The group m is the two digits after the dash (10), and groupdict()[\"y\"] is the year 2026.",
           fa: "گروه‌های نام‌دار رو می‌شه با اسم خوند. گروه m دو رقم بعد از خط تیره (۱۰) و groupdict()[\"y\"] سال ۲۰۲۶ هست." } },
  { topic: "regex", lvl: "medium",
    code: `import re

print(re.sub(r"\\d+", lambda m: str(int(m.group()) * 2), "a5 b10"))`,
    options: ["a10 b20", "a10 b10", "a55 b1010", "a5 b10"], answer: 0,
    why: { en: "When the replacement is a function, it receives each match object and returns the text to put in. Each number is doubled: 5 to 10 and 10 to 20.",
           fa: "وقتی جایگزین یک تابع باشه، اون هر شیء تطابق رو می‌گیره و متن جایگزین رو برمی‌گردونه. هر عدد دو برابر می‌شه: ۵ می‌شه ۱۰ و ۱۰ می‌شه ۲۰." } },
  { topic: "regex", lvl: "medium",
    code: `import re

print(re.findall(r"\\bcat\\b", "cat concat cat."))`,
    options: ["['cat', 'cat']", "['cat', 'cat', 'cat']", "['cat']", "[]"], answer: 0,
    why: { en: "\\b is a word boundary, so the cat inside concat does not count. Only the two stand-alone words match.",
           fa: "\\b مرز کلمه‌ست، پس cat داخل «concat» حساب نمی‌شه. فقط دو کلمه‌ی مستقل جور درمیان." } },
  { topic: "regex", lvl: "hard",
    code: `import re

print(re.sub(r"(?<=\\d)(?=(\\d{3})+$)", ",", "1234567"))`,
    options: ["1,234,567", "1,234,567,", "1234,567", "123,456,7"], answer: 0,
    why: { en: "The pattern matches an empty spot that follows a digit and is followed by groups of exactly three digits up to the end. A comma goes into each such spot: 1,234,567.",
           fa: "الگو یک جای خالی رو پیدا می‌کنه که بعد از یک رقم باشه و بعدش تا آخر رشته گروه‌های سه‌رقمی بیاد. توی هر چنین جایی کاما میره: 1,234,567." } },
  { topic: "regex", lvl: "hard",
    code: `import re

print(re.match(r"(a|ab)(c|bcd)(d*)", "abcd").groups())`,
    options: ["('a', 'bcd', '')", "('ab', 'c', 'd')", "('a', 'c', 'd')", "('abcd', '', '')"], answer: 0,
    why: { en: "The engine tries a first, but then \"b\" cannot match c, so it tries bcd, which works. The last group takes the empty rest: ('a', 'bcd', '').",
           fa: "موتور اول a رو امتحان می‌کنه، ولی بعدش «b» با c جور نیست، پس bcd رو امتحان می‌کنه که جور می‌شه. گروه آخر باقی‌مونده خالی رو می‌گیره: ('a', 'bcd', '')." } },
  { topic: "regex", lvl: "hard",
    code: `import re

print(re.findall(r"(a)|(b)", "ab"))`,
    options: ["[('a', ''), ('', 'b')]", "['a', 'b']", "[('a', 'b')]", "[('a', ''), ('b', '')]"], answer: 0,
    why: { en: "With two groups, each match is a tuple. The group that did not take part is an empty string: ('a', '') and then ('', 'b').",
           fa: "وقتی دو گروه داریم هر تطابق یک تاپله. گروهی که شرکت نکرده رشته خالی می‌شه: اول ('a', '') و بعد ('', 'b')." } },

  // ---------- pygame ----------
  { topic: "pygame", lvl: "medium",
    code: `import pygame

player = pygame.Rect(0, 0, 40, 40)
wall = pygame.Rect(30, 30, 40, 40)
player.x += 10
print(player.colliderect(wall), player.right)`,
    options: ["True 50", "False 50", "True 40", "False 10"], answer: 0,
    why: { en: "After x += 10 the player covers x 10..50 and y 0..40; the wall covers 30..70. They overlap, so True. right = x + width = 50.",
           fa: "بعد از x += 10 بازیکن از x=10 تا ۵۰ و y=0 تا ۴۰ رو می‌گیره و دیوار از ۳۰ تا ۷۰. هم‌پوشانی دارن پس True. right = x + عرض = ۵۰." } },
  { topic: "pygame", lvl: "easy",
    code: `import pygame

r = pygame.Rect(10, 20, 30, 40)
print(r.right, r.bottom, r.center)`,
    options: ["40 60 (25, 40)", "30 40 (25, 40)", "40 60 (40, 60)", "40 60 (20, 30)"], answer: 0,
    why: { en: "right = x + width = 40, bottom = y + height = 60, center = (10 + 15, 20 + 20) = (25, 40).",
           fa: "right = x + عرض = ۴۰، bottom = y + ارتفاع = ۶۰ و center = (۱۰ + ۱۵، ۲۰ + ۲۰) = (۲۵، ۴۰)." } },
  { topic: "pygame", lvl: "easy",
    code: `import pygame

r = pygame.Rect(0, 0, 50, 50)
r.center = (100, 100)
print(r.topleft)`,
    options: ["(75, 75)", "(100, 100)", "(50, 50)", "(125, 125)"], answer: 0,
    why: { en: "Setting center moves the whole rect so its middle is at (100, 100): the top-left corner is half the size back, (75, 75).",
           fa: "تنظیم center کل مستطیل رو جابه‌جا می‌کنه تا مرکزش (۱۰۰، ۱۰۰) بشه: گوشه بالا-چپ نصف اندازه عقب‌تره، یعنی (۷۵، ۷۵)." } },
  { topic: "pygame", lvl: "easy",
    code: `import pygame

a = pygame.Rect(0, 0, 10, 10)
b = pygame.Rect(10, 0, 10, 10)
print(a.colliderect(b))`,
    options: ["False", "True", "None", "Error"], answer: 0,
    why: { en: "Rects that only touch along an edge do NOT collide. a ends at x = 10 where b begins, so there is no overlap.",
           fa: "مستطیل‌هایی که فقط لبه‌شون به هم می‌رسه برخورد حساب نمی‌شن. a توی x = 10 تموم می‌شه و b همونجا شروع می‌شه، پس هم‌پوشانی نیست." } },
  { topic: "pygame", lvl: "medium",
    code: `import pygame

r = pygame.Rect(0, 0, 20, 20)
r2 = r.move(5, 5)
print(r.topleft, r2.topleft)`,
    options: ["(0, 0) (5, 5)", "(5, 5) (5, 5)", "(0, 0) (0, 0)", "(5, 5) (10, 10)"], answer: 0,
    why: { en: "move() returns a NEW moved rect and leaves the original alone (move_ip would change the original).",
           fa: "move() یک مستطیل جابه‌جا شده جدید برمی‌گردونه و اصلی رو دست نمی‌زنه (move_ip اصلی رو عوض می‌کرد)." } },
  { topic: "pygame", lvl: "medium",
    code: `import pygame

r = pygame.Rect(0, 0, 20, 20)
r.move_ip(5, 5)
r.inflate_ip(10, 10)
print(r.topleft, r.size)`,
    options: ["(0, 0) (30, 30)", "(5, 5) (30, 30)", "(0, 0) (20, 20)", "(5, 5) (20, 20)"], answer: 0,
    why: { en: "move_ip shifts the rect to (5, 5). inflate_ip grows it by 10 around its CENTER, so it becomes 30x30 and the corner moves back 5: (0, 0).",
           fa: "move_ip مستطیل رو به (۵، ۵) می‌بره. inflate_ip اون رو حول مرکزش ۱۰ واحد بزرگ می‌کنه، پس ۳۰×۳۰ می‌شه و گوشه ۵ واحد عقب میاد: (۰، ۰)." } },
  { topic: "pygame", lvl: "medium",
    code: `import pygame

v = pygame.math.Vector2(3, 4)
print(v.length(), v.dot(pygame.math.Vector2(1, 0)))`,
    options: ["5.0 3.0", "7.0 3.0", "5.0 4.0", "5 3"], answer: 0,
    why: { en: "The length is sqrt(3² + 4²) = 5.0. The dot product with (1, 0) is 3 * 1 + 4 * 0 = 3.0.",
           fa: "طول برابر sqrt(3² + 4²) = ۵٫۰ هست. ضرب داخلی با (۱، ۰) برابر ۳ × ۱ + ۴ × ۰ = ۳٫۰ هست." } },
  { topic: "pygame", lvl: "medium",
    code: `import pygame

r = pygame.Rect(10, 10, 20, 20)
print(r.collidepoint(10, 10), r.collidepoint(30, 30))`,
    options: ["True False", "True True", "False False", "False True"], answer: 0,
    why: { en: "The top-left edge is inside, but a point on the right or bottom edge is NOT inside (the rect covers 10..29).",
           fa: "لبه بالا-چپ داخل حساب می‌شه ولی نقطه روی لبه راست یا پایین داخل نیست (مستطیل ۱۰ تا ۲۹ رو می‌گیره)." } },
  { topic: "pygame", lvl: "hard",
    code: `import pygame

a = pygame.Rect(0, 0, 50, 50)
b = pygame.Rect(30, 30, 50, 50)
print(tuple(a.clip(b)))`,
    options: ["(30, 30, 20, 20)", "(30, 30, 50, 50)", "(0, 0, 30, 30)", "(30, 30, 30, 30)"], answer: 0,
    why: { en: "clip() gives the overlapping area: it starts at (30, 30) and ends where a ends (50), so the size is 20 x 20.",
           fa: "clip() ناحیه هم‌پوشانی رو می‌ده: از (۳۰، ۳۰) شروع می‌شه و جایی که a تموم می‌شه (۵۰) تموم می‌شه، پس اندازه‌ش ۲۰ × ۲۰ هست." } },
  { topic: "pygame", lvl: "hard",
    code: `import pygame

walls = [pygame.Rect(0, 0, 10, 10), pygame.Rect(20, 0, 10, 10), pygame.Rect(40, 0, 10, 10)]
p = pygame.Rect(5, 0, 20, 10)
print(p.collidelist(walls), len(p.collidelistall(walls)))`,
    options: ["0 2", "1 2", "0 3", "-1 2"], answer: 0,
    why: { en: "The player covers x 5..25, so it touches walls 0 and 1. collidelist returns the FIRST hit (index 0), collidelistall returns all hits (2).",
           fa: "بازیکن x از ۵ تا ۲۵ رو می‌گیره، پس به دیوار ۰ و ۱ می‌خوره. collidelist اولین برخورد (اندیس ۰) و collidelistall همه برخوردها (۲ تا) رو برمی‌گردونه." } },
  { topic: "pygame", lvl: "easy",
    code: `import pygame

x, y, w, h = pygame.Rect(1, 2, 3, 4)
print(x + w, y + h)`,
    options: ["4 6", "3 5", "4 4", "1 2"], answer: 0,
    why: { en: "A Rect can be unpacked like a 4-tuple (x, y, width, height). So x + w = 1 + 3 = 4 and y + h = 2 + 4 = 6.",
           fa: "یک Rect رو می‌شه مثل تاپل چهارتایی (x, y, عرض, ارتفاع) باز کرد. پس x + w = 1 + 3 = 4 و y + h = 2 + 4 = 6." } },
  { topic: "pygame", lvl: "easy",
    code: `import pygame

r = pygame.Rect(0, 0, 100, 50)
print(r.collidepoint(99, 49), r.collidepoint(100, 50))`,
    options: ["True False", "True True", "False False", "False True"], answer: 0,
    why: { en: "A rect covers x from 0 to 99 and y from 0 to 49. The point (100, 50) is just outside on the right and bottom edge.",
           fa: "این مستطیل x از ۰ تا ۹۹ و y از ۰ تا ۴۹ رو می‌گیره. نقطه (۱۰۰، ۵۰) دقیقاً بیرون لبه راست و پایینه." } },
  { topic: "pygame", lvl: "easy",
    code: `import pygame

r = pygame.Rect(0, 0, 10, 10)
for _ in range(3):
    r.move_ip(2, -1)
print(r.topleft)`,
    options: ["(6, -3)", "(2, -1)", "(0, 0)", "(6, 3)"], answer: 0,
    why: { en: "move_ip changes the rect itself each time. Three moves of (2, -1) give (6, -3).",
           fa: "move_ip هر بار خود مستطیل رو تغییر می‌ده. سه بار حرکت (۲، -۱) می‌شه (۶، -۳)." } },
  { topic: "pygame", lvl: "medium",
    code: `import pygame

a = pygame.math.Vector2(6, 8)
b = pygame.math.Vector2(2, 3)
print(a.length(), b.dot(pygame.math.Vector2(4, -1)))`,
    options: ["10.0 5.0", "14.0 5.0", "10 5", "10.0 11.0"], answer: 0,
    why: { en: "The length of (6, 8) is sqrt(36 + 64) = 10.0. The dot product (2, 3) . (4, -1) is 2*4 + 3*(-1) = 5.0.",
           fa: "طول (۶، ۸) برابر sqrt(36 + 64) = ۱۰٫۰ هست. ضرب داخلی (۲، ۳) در (۴، -۱) برابر 2*4 + 3*(-1) = ۵٫۰ هست." } },
  { topic: "pygame", lvl: "medium",
    code: `import pygame

bullet = pygame.Rect(0, 0, 5, 5)
enemy = pygame.Rect(32, 0, 10, 5)
frames = 0
while not bullet.colliderect(enemy):
    bullet.move_ip(10, 0)
    frames += 1
print(frames)`,
    options: ["3", "4", "2", "0"], answer: 0,
    why: { en: "The bullet's x goes 0, 10, 20, 30. At x = 30 it covers 30..35, which overlaps the enemy starting at 32. That is after 3 moves.",
           fa: "x گلوله می‌شه ۰، ۱۰، ۲۰، ۳۰. توی x = 30 گلوله ۳۰ تا ۳۵ رو می‌گیره که با دشمنِ شروع‌شده از ۳۲ هم‌پوشانی داره. یعنی بعد از ۳ حرکت." } },
  { topic: "pygame", lvl: "medium",
    code: `import pygame

a = pygame.Rect(0, 0, 10, 10)
b = pygame.Rect(20, 20, 10, 10)
print(a.clip(b).size)`,
    options: ["(0, 0)", "(10, 10)", "(20, 20)", "(-10, -10)"], answer: 0,
    why: { en: "The rects do not overlap, so clip() returns an empty rect: its size is (0, 0). Sizes never go negative.",
           fa: "مستطیل‌ها هم‌پوشانی ندارن، پس clip() یک مستطیل خالی برمی‌گردونه: اندازه‌ش (۰، ۰) هست. اندازه هیچ‌وقت منفی نمی‌شه." } },
  { topic: "pygame", lvl: "medium",
    code: `import pygame

player = pygame.Rect(0, 0, 10, 10)
coins = [pygame.Rect(i * 8, 0, 5, 5) for i in range(4)]
print(player.collidelistall(coins))`,
    options: ["[0, 1]", "[0]", "[0, 1, 2]", "[1]"], answer: 0,
    why: { en: "The coins cover x 0..5, 8..13, 16..21 and 24..29. The player covers 0..10, so it touches coins 0 and 1 only.",
           fa: "سکه‌ها x ۰ تا ۵ و ۸ تا ۱۳ و ۱۶ تا ۲۱ و ۲۴ تا ۲۹ رو می‌گیرن. بازیکن ۰ تا ۱۰ رو می‌گیره، پس فقط به سکه‌های ۰ و ۱ می‌خوره." } },
  { topic: "pygame", lvl: "hard",
    code: `import pygame

bullet = pygame.Rect(0, 0, 4, 4)
wall = pygame.Rect(30, 0, 4, 4)
hits = 0
for _ in range(5):
    bullet.move_ip(20, 0)
    if bullet.colliderect(wall):
        hits += 1
print(hits)`,
    options: ["0", "1", "2", "5"], answer: 0,
    why: { en: "The bullet jumps 20 pixels per frame: x = 20, 40, 60... It is never at a position that overlaps 30..34, so it tunnels through the wall and hits stays 0.",
           fa: "گلوله هر فریم ۲۰ پیکسل می‌پره: x = ۲۰، ۴۰، ۶۰... هیچ‌وقت جایی نمی‌افته که با ۳۰ تا ۳۴ هم‌پوشانی داشته باشه، پس از دیوار رد می‌شه و hits صفر می‌مونه." } },
  { topic: "pygame", lvl: "hard",
    code: `import pygame

r = pygame.Rect(0, 0, 10, 10)
dx = 7
for _ in range(5):
    r.x += dx
    if r.right > 30 or r.x < 0:
        dx = -dx
print(r.x, dx)`,
    options: ["7 -7", "35 7", "14 -7", "7 7"], answer: 0,
    why: { en: "x goes 7, 14, 21; at 21 the right edge is 31 > 30, so dx flips to -7 (x stays 21). Then x goes 14 and 7. After 5 frames: 7 and -7.",
           fa: "x می‌شه ۷، ۱۴، ۲۱؛ توی ۲۱ لبه راست ۳۱ > ۳۰ هست پس dx می‌شه -۷ (x همون ۲۱ می‌مونه). بعد x می‌شه ۱۴ و ۷. بعد از ۵ فریم: ۷ و -۷." } },
  { topic: "pygame", lvl: "hard",
    code: `import pygame

r = pygame.Rect(0, 0, 5, 5)
r.center = (10, 10)
print(r.topleft, r.right)`,
    options: ["(8, 8) 13", "(7, 7) 12", "(8, 8) 12", "(7, 7) 13"], answer: 0,
    why: { en: "For an odd size the half is rounded down: 5 // 2 = 2. So topleft = (10 - 2, 10 - 2) = (8, 8) and right = 8 + 5 = 13.",
           fa: "برای اندازه فرد نصف به پایین گرد می‌شه: 5 // 2 = 2. پس topleft = (۱۰ - ۲، ۱۰ - ۲) = (۸، ۸) و right = 8 + 5 = 13." } },

  // ---------- tkinter ----------
  { topic: "tkinter", lvl: "medium",
    code: `import tkinter as tk

root = tk.Tk()
count = tk.IntVar(value=0)
btn = tk.Button(root, text="+", command=lambda: count.set(count.get() + 1))
for _ in range(3):
    btn.invoke()
print(count.get())`,
    options: ["3", "0", "1", "None"], answer: 0,
    why: { en: "invoke() runs the button's command like a real click, so +1 happens 3 times and count.get() is 3.",
           fa: "invoke() فرمان دکمه رو مثل کلیک واقعی اجرا می‌کنه، پس ۳ بار ۱ اضافه می‌شه و count.get() برابر ۳ هست." } },
  { topic: "tkinter", lvl: "easy",
    code: `import tkinter as tk

root = tk.Tk()
v = tk.StringVar(value="hi")
v.set(v.get() + "!")
print(v.get())`,
    options: ["hi!", "hi", "!", "None"], answer: 0,
    why: { en: "get() reads the current text (\"hi\"), and set() stores the new text \"hi!\".",
           fa: "get() متن فعلی («hi») رو می‌خونه و set() متن جدید «hi!» رو ذخیره می‌کنه." } },
  { topic: "tkinter", lvl: "easy",
    code: `import tkinter as tk

root = tk.Tk()
e = tk.Entry(root)
e.insert(0, "abc")
e.insert(tk.END, "def")
print(e.get())`,
    options: ["abcdef", "defabc", "abc", "def"], answer: 0,
    why: { en: "insert(0, ...) puts text at the start; tk.END puts it after the existing text. So the result is abcdef.",
           fa: "insert(0, ...) متن رو اول می‌ذاره؛ tk.END بعد از متن موجود می‌ذاره. پس نتیجه abcdef می‌شه." } },
  { topic: "tkinter", lvl: "easy",
    code: `import tkinter as tk

root = tk.Tk()
e = tk.Entry(root)
e.insert(0, "hello")
e.delete(0, 2)
print(e.get())`,
    options: ["llo", "hel", "lo", "ello"], answer: 0,
    why: { en: "delete(0, 2) removes the characters at index 0 and 1 (the end index is not included), leaving \"llo\".",
           fa: "delete(0, 2) کاراکترهای اندیس ۰ و ۱ رو حذف می‌کنه (اندیس پایان شامل نمی‌شه) و «llo» می‌مونه." } },
  { topic: "tkinter", lvl: "medium",
    code: `import tkinter as tk

root = tk.Tk()
lbl = tk.Label(root, text="A")
lbl.config(text="B")
lbl["text"] = "C"
print(lbl.cget("text"))`,
    options: ["C", "A", "B", "None"], answer: 0,
    why: { en: "config() and lbl[\"text\"] = ... both change the option. The last one wins, so the text is \"C\".",
           fa: "config() و lbl[\"text\"] = ... هر دو گزینه رو عوض می‌کنن. آخری برنده‌ست، پس متن «C» هست." } },
  { topic: "tkinter", lvl: "medium",
    code: `import tkinter as tk

root = tk.Tk()
out = []
btns = [tk.Button(root, command=lambda: out.append(i)) for i in range(3)]
for b in btns:
    b.invoke()
print(out)`,
    options: ["[2, 2, 2]", "[0, 1, 2]", "[3, 3, 3]", "[]"], answer: 0,
    why: { en: "All lambdas share the same i and read it when CLICKED, after the loop ended (i = 2). Fix: lambda i=i: out.append(i).",
           fa: "همه لامبداها یک i مشترک دارن و موقع کلیک اون رو می‌خونن، یعنی بعد از تموم شدن حلقه (i = 2). راه‌حل: lambda i=i: out.append(i)." } },
  { topic: "tkinter", lvl: "medium",
    code: `import tkinter as tk

root = tk.Tk()
sv = tk.StringVar()
e = tk.Entry(root, textvariable=sv)
sv.set("x")
print(e.get(), len(sv.get()))`,
    options: ["x 1", "'' 1", "x 0", "None 1"], answer: 0,
    why: { en: "textvariable links the Entry and the variable: setting the variable updates the text shown in the Entry.",
           fa: "textvariable ورودی و متغیر رو به هم وصل می‌کنه: تغییر متغیر متن داخل Entry رو هم عوض می‌کنه." } },
  { topic: "tkinter", lvl: "medium",
    code: `import tkinter as tk

root = tk.Tk()
flag = tk.BooleanVar(value=True)
cb = tk.Checkbutton(root, variable=flag)
cb.invoke()
print(flag.get())`,
    options: ["False", "True", "1", "None"], answer: 0,
    why: { en: "invoke() acts like a click on a checkbutton, which TOGGLES its variable: True becomes False.",
           fa: "invoke() مثل کلیک روی چک‌باکسه که متغیرش رو برعکس می‌کنه: True می‌شه False." } },
  { topic: "tkinter", lvl: "hard",
    code: `import tkinter as tk

root = tk.Tk()
tk.Label(root).pack()
try:
    tk.Label(root).grid()
except tk.TclError:
    print("conflict")
else:
    print("fine")`,
    options: ["conflict", "fine", "TclError", "None"], answer: 0,
    why: { en: "A container can use only ONE geometry manager. Using grid() in a window that already has pack() children raises TclError.",
           fa: "یک ظرف فقط می‌تونه از یک مدیر چیدمان استفاده کنه. استفاده از grid() توی پنجره‌ای که فرزند pack دارد TclError می‌ده." } },
  { topic: "tkinter", lvl: "hard",
    code: `import tkinter as tk

root = tk.Tk()
out = []
root.after_idle(lambda: out.append(1))
out.append(0)
root.update_idletasks()
print(out)`,
    options: ["[0, 1]", "[1, 0]", "[0]", "[1]"], answer: 0,
    why: { en: "after_idle only queues the call for when Tk is idle. 0 is appended first; update_idletasks then runs the queued call: [0, 1].",
           fa: "after_idle فقط صدا زدن رو برای وقت بیکاری Tk توی صف می‌ذاره. اول ۰ اضافه می‌شه؛ بعد update_idletasks کار توی صف رو اجرا می‌کنه: [0, 1]." } },
  { topic: "tkinter", lvl: "easy",
    code: `import tkinter as tk

root = tk.Tk()
print(tk.IntVar().get())`,
    options: ["0", "None", "''", "1"], answer: 0,
    why: { en: "An IntVar with no value starts at 0 (a StringVar would start as an empty string).",
           fa: "یک IntVar بدون مقدار اولیه از ۰ شروع می‌شه (StringVar از رشته خالی شروع می‌شه)." } },
  { topic: "tkinter", lvl: "easy",
    code: `import tkinter as tk

root = tk.Tk()
print(repr(tk.StringVar().get()))`,
    options: ["''", "None", "0", "' '"], answer: 0,
    why: { en: "A StringVar with no value starts as an empty string, and repr shows it as ''.",
           fa: "یک StringVar بدون مقدار اولیه رشته خالی داره و repr اون رو به شکل '' نشون می‌ده." } },
  { topic: "tkinter", lvl: "easy",
    code: `import tkinter as tk

root = tk.Tk()
e = tk.Entry(root)
e.insert(0, "ac")
e.insert(1, "b")
print(e.get())`,
    options: ["abc", "bac", "acb", "cab"], answer: 0,
    why: { en: "insert(1, \"b\") puts the text at index 1, between a and c, giving \"abc\".",
           fa: "insert(1, \"b\") متن رو توی اندیس ۱ یعنی بین a و c می‌ذاره و «abc» می‌شه." } },
  { topic: "tkinter", lvl: "medium",
    code: `import tkinter as tk

root = tk.Tk()
out = []
btns = [tk.Button(root, command=lambda i=i: out.append(i)) for i in range(3)]
for b in btns:
    b.invoke()
print(out)`,
    options: ["[0, 1, 2]", "[2, 2, 2]", "[3, 3, 3]", "[1, 2, 3]"], answer: 0,
    why: { en: "The default argument i=i freezes the value of i for each lambda when it is created, so each button remembers its own number.",
           fa: "آرگومان پیش‌فرض i=i مقدار i رو موقع ساخت هر lambda ثابت می‌کنه، پس هر دکمه عدد خودش رو یادش می‌مونه." } },
  { topic: "tkinter", lvl: "medium",
    code: `import tkinter as tk

root = tk.Tk()
e = tk.Entry(root)
e.insert(0, "hello")
e.delete(1, 4)
print(e.get())`,
    options: ["ho", "hlo", "hello", "eo"], answer: 0,
    why: { en: "delete(1, 4) removes indexes 1, 2 and 3 (\"ell\"; the end is not included), leaving \"h\" + \"o\" = \"ho\".",
           fa: "delete(1, 4) اندیس‌های ۱ و ۲ و ۳ («ell») رو حذف می‌کنه (پایان شامل نمی‌شه) و «h» + «o» یعنی «ho» می‌مونه." } },
  { topic: "tkinter", lvl: "medium",
    code: `import tkinter as tk

root = tk.Tk()
lbl = tk.Label(root, text="Clicks: 0")
n = 0
def click():
    global n
    n += 1
    lbl.config(text=f"Clicks: {n}")
btn = tk.Button(root, command=click)
btn.invoke()
btn.invoke()
print(lbl.cget("text"))`,
    options: ["Clicks: 2", "Clicks: 0", "Clicks: 1", "2"], answer: 0,
    why: { en: "Each invoke() runs click(), which increases n and rewrites the label text with config(). After two clicks the text is \"Clicks: 2\".",
           fa: "هر invoke() تابع click() رو اجرا می‌کنه که n رو زیاد می‌کنه و متن لیبل رو با config() دوباره می‌نویسه. بعد از دو کلیک متن «Clicks: 2» هست." } },
  { topic: "tkinter", lvl: "medium",
    code: `import tkinter as tk

root = tk.Tk()
flag = tk.BooleanVar()
cb = tk.Checkbutton(root, variable=flag)
for _ in range(3):
    cb.invoke()
print(flag.get())`,
    options: ["True", "False", "0", "None"], answer: 0,
    why: { en: "A BooleanVar starts as False and each invoke() toggles it: True, False, True. After three clicks it is True.",
           fa: "BooleanVar از False شروع می‌شه و هر invoke() اون رو برعکس می‌کنه: True، False، True. بعد از سه کلیک True هست." } },
  { topic: "tkinter", lvl: "hard",
    code: `import tkinter as tk

root = tk.Tk()
out = []
for i in range(3):
    root.after_idle(lambda: out.append(i))
root.update_idletasks()
print(out)`,
    options: ["[2, 2, 2]", "[0, 1, 2]", "[]", "[3, 3, 3]"], answer: 0,
    why: { en: "The lambdas read i when they RUN, after the loop finished (i = 2). All three queued calls append 2.",
           fa: "lambdaها i رو موقع اجرا می‌خونن، یعنی بعد از تموم شدن حلقه (i = 2). هر سه تابع صف‌شده عدد ۲ رو اضافه می‌کنن." } },
  { topic: "tkinter", lvl: "hard",
    code: `import tkinter as tk

root = tk.Tk()
e = tk.Entry(root)
e.insert(0, "5")
n = e.get()
print(n * 2, int(n) * 2)`,
    options: ["55 10", "10 10", "55 55", "10 55"], answer: 0,
    why: { en: "Entry.get() always returns a string. \"5\" * 2 repeats the text (\"55\"); only int(n) * 2 does math (10).",
           fa: "Entry.get() همیشه رشته برمی‌گردونه. \"5\" * 2 متن رو تکرار می‌کنه («55»)؛ فقط int(n) * 2 محاسبه می‌کنه (۱۰)." } },
  { topic: "tkinter", lvl: "hard",
    code: `import tkinter as tk

root = tk.Tk()
out = []
root.after_idle(lambda: out.append(1))
root.after_idle(lambda: out.append(2))
out.append(0)
root.update_idletasks()
out.append(3)
print(out)`,
    options: ["[0, 1, 2, 3]", "[1, 2, 0, 3]", "[0, 3, 1, 2]", "[0, 2, 1, 3]"], answer: 0,
    why: { en: "0 is appended immediately. update_idletasks then runs the queued calls in the order they were added (1, 2), and 3 comes last.",
           fa: "۰ همون لحظه اضافه می‌شه. بعد update_idletasks تابع‌های صف‌شده رو به ترتیب اضافه شدن اجرا می‌کنه (۱ و ۲) و ۳ آخر میاد." } },
];

// The game shows `why` of the question that was just played (a question's own explanation).
const EXPLAIN = new Proxy({}, {
  get: () => (typeof session !== "undefined" && session && session.q && session.q.why) || null,
});

// Helper for bug questions: a line is plain text, or [text, bugType] for a line that contains a bug.
const mkBug = (topic, lvl, lines) => ({
  topic, lvl,
  code: lines.map((l) => (Array.isArray(l) ? l[0] : l)).join("\n"),
  bugs: lines.map((l, i) => (Array.isArray(l) ? { line: i + 1, type: l[1] } : null)).filter(Boolean),
});

const BUGS = [

  // ---------- variables ----------
  mkBug("variables", "easy", [
    "price = 20",
    "tax = 0.2",
    ["total = price + (price * tax", "paren"],
    "print(\"Total:\", total)",
    "label = \"Price\"",
    ["print(lable, price)", "name"],
    ["msg = \"done", "quote"],
    "print(msg)",
  ]),
  mkBug("variables", "easy", [
    "name = \"Ana\"",
    "age = 30",
    ["print(\"Name:\", name", "paren"],
    "print(\"Age:\", age)",
  ]),
  mkBug("variables", "easy", [
    "first = \"Ada\"",
    ["last = \"Lovelace", "quote"],
    "full = first + \" \" + last",
    ["print(ful)", "name"],
  ]),
  mkBug("variables", "easy", [
    "a = 5",
    "b = 7",
    ["total = (a + b) * 2)", "paren"],
    ["print(ttoal)", "name"],
  ]),
  mkBug("variables", "easy", [
    "speed = 12",
    "time = 3",
    "distance = speed * time",
    ["print(\"Distance:\", distnace)", "name"],
    ["print('Done)", "quote"],
  ]),
  mkBug("variables", "medium", [
    "width = 4",
    "height = 6",
    "area = width * height",
    ["perimeter = 2 * (width + height", "paren"],
    ["print(area, perimter)", "name"],
    ["print(\"ok')", "quote"],
  ]),
  mkBug("variables", "medium", [
    "count = 0",
    "count += 1",
    ["message = f\"Count is {count}", "quote"],
    ["print(mesage)", "name"],
  ]),
  mkBug("variables", "medium", [
    ["items = [\"a\", \"b\"", "paren"],
    "n = len(items)",
    ["text = 'It is ' + str(n) + ' items", "quote"],
    "print(text)",
  ]),
  mkBug("variables", "hard", [
    "x = 10",
    "y = 3",
    "q = x // y",
    "r = x % y",
    ["print(f\"{x} = {y} * {q} + {r}\"", "paren"],
    ["print(\"check:\", y * q + rr)", "name"],
  ]),
  mkBug("variables", "hard", [
    ["data = (1, 2, 3", "paren"],
    "first, *rest = data",
    "print(first, rest)",
    ["label = \"values:", "quote"],
    ["print(lable, data)", "name"],
  ]),
  mkBug("variables", "easy", [
    "width = 4",
    "height = 6",
    "area = width * height",
    ["print(\"Area:\", aera)", "name"],
    ["print(\"Done)", "quote"],
  ]),
  mkBug("variables", "easy", [
    ["items = [\"pen\", \"book\"", "paren"],
    ["count = len(ietms)", "name"],
    "print(count)",
    "print(items[0])",
  ]),
  mkBug("variables", "medium", [
    "user = \"sara\"",
    "score = 10",
    ["bonus = (score * 2 + 1", "paren"],
    "total = score + bonus",
    "print(user, total)",
    ["print(\"Bonus:\", bonu)", "name"],
  ]),
  mkBug("variables", "medium", [
    "a = 3",
    "b = 4",
    "a, b = b, a",
    "print(\"a is\", a)",
    ["msg = \"swapped", "quote"],
    "print(msg, a, b)",
    ["data = {\"x\": 1, \"y\": 2", "paren"],
    "print(data[\"x\"])",
  ]),
  mkBug("variables", "hard", [
    "radius = 3",
    "pi = 3.14",
    ["area = pi * (radius ** 2", "paren"],
    ["label = \"Circle area", "quote"],
    "print(label, area)",
    "perimeter = 2 * pi * radius",
    ["print(\"Perimeter:\", perimter)", "name"],
  ]),

  // ---------- if ----------
  mkBug("if", "easy", [
    "age = 20",
    ["if age >= 18", "colon"],
    "    print(\"adult\")",
    "elif age >= 13:",
    ["print(\"teen\")", "indent"],
    "else:",
    "    print(\"child\")",
  ]),
  mkBug("if", "easy", [
    "score = 72",
    "if score >= 90:",
    "    print(\"A\")",
    ["elif score >= 70", "colon"],
    "    print(\"B\")",
    ["else", "colon"],
    "    print(\"C\")",
  ]),
  mkBug("if", "easy", [
    "temp = 31",
    ["if tmep > 30:", "name"],
    "    print(\"hot\")",
    "else:",
    ["    print(\"ok)", "quote"],
    "if temp < 0:",
    "    print(\"freezing\")",
  ]),
  mkBug("if", "easy", [
    "n = 4",
    ["if (n % 2 == 0:", "paren"],
    "    print(\"even\")",
    "else:",
    "    print(\"odd\")",
  ]),
  mkBug("if", "medium", [
    "user = \"admin\"",
    "pw = \"1234\"",
    ["if user == \"admin\" and pw == \"1234\"", "colon"],
    "    print(\"welcome\")",
    "else:",
    ["    print(\"denied)", "quote"],
  ]),
  mkBug("if", "medium", [
    "hour = 14",
    "if hour < 12:",
    "    greeting = \"morning\"",
    "elif hour < 18:",
    "    greeting = \"afternoon\"",
    "else:",
    "    greeting = \"evening\"",
    ["print(greting)", "name"],
    ["if hour > 20", "colon"],
    "    print(\"late\")",
  ]),
  mkBug("if", "medium", [
    "x = 7",
    "if x > 5:",
    "    if x < 10:",
    ["    print(\"between\")", "indent"],
    "    else:",
    "        print(\"big\")",
  ]),
  mkBug("if", "medium", [
    "value = int(\"8\")",
    "if value > 0:",
    "    sign = \"positive\"",
    "elif value < 0:",
    "    sign = \"negative\"",
    "else:",
    "    sign = \"zero\"",
    ["print(\"Sign: \" + sgn)", "name"],
    ["print('done)", "quote"],
  ]),
  mkBug("if", "hard", [
    "items = [\"a\", \"b\"]",
    ["flag = len(items) > 1 and (items[0] == \"a\" or items[1] == \"a\"", "paren"],
    ["if falg:", "name"],
    "    print(\"yes\")",
    ["else", "colon"],
    "    print(\"no\")",
  ]),
  mkBug("if", "hard", [
    "role = \"guest\"",
    "perm = {\"admin\": 3, \"guest\": 1}",
    ["level = prem.get(role, 0)", "name"],
    "if level >= 3:",
    "    print(\"all\")",
    "elif level >= 1:",
    ["print(\"read\")", "indent"],
    "else:",
    "    print(\"none\")",
    ["print(leval)", "name"],
  ]),
  mkBug("if", "easy", [
    "temp = 30",
    ["if temp > 25", "colon"],
    "    print(\"hot\")",
    "else:",
    "    print(\"cool\")",
  ]),
  mkBug("if", "easy", [
    "n = 7",
    "if n % 2 == 0:",
    "    print(\"even\")",
    "else:",
    ["print(\"odd\")", "indent"],
    "print(n)",
  ]),
  mkBug("if", "medium", [
    "score = 72",
    "if score >= 90:",
    "    grade = \"A\"",
    ["elif score >= 70", "colon"],
    "    grade = \"B\"",
    "else:",
    "    grade = \"C\"",
    ["print(\"Grade:\", grad)", "name"],
  ]),
  mkBug("if", "medium", [
    "user = \"admin\"",
    "active = True",
    "if user == \"admin\" and active:",
    ["print(\"welcome\")", "indent"],
    "elif user == \"guest\":",
    "    print(\"limited\")",
    ["else", "colon"],
    "    print(\"denied\")",
  ]),
  mkBug("if", "hard", [
    "x = 15",
    "if x > 10:",
    ["    if x % 5 == 0", "colon"],
    "        print(\"big five\")",
    "    else:",
    ["    print(\"big\")", "indent"],
    "elif x > 0:",
    "    print(\"small\")",
    ["print(\"end)", "quote"],
  ]),

  // ---------- loops ----------
  mkBug("loops", "easy", [
    "total = 0",
    ["for i in range(5)", "colon"],
    "    total += i",
    "while total > 0:",
    ["total -= 3", "indent"],
    ["print(\"Result:\", totl)", "name"],
  ]),
  mkBug("loops", "easy", [
    "for i in range(3):",
    ["print(i)", "indent"],
    ["print(\"done)", "quote"],
  ]),
  mkBug("loops", "easy", [
    "n = 3",
    ["while n > 0", "colon"],
    "    print(n)",
    "    n -= 1",
    ["print(\"Go!\"", "paren"],
  ]),
  mkBug("loops", "easy", [
    "names = [\"a\", \"b\", \"c\"]",
    "for name in names:",
    ["    print(nme)", "name"],
    ["print(len(names)", "paren"],
  ]),
  mkBug("loops", "medium", [
    "total = 0",
    "for i in range(1, 6):",
    ["    if i % 2 == 0", "colon"],
    "        continue",
    "    total += i",
    ["print(\"odd total:\", total", "paren"],
  ]),
  mkBug("loops", "medium", [
    "words = [\"hi\", \"yo\"]",
    "for w in words:",
    "    for ch in w:",
    "        print(ch, end=\"-\")",
    "    print()",
    ["print('end)", "quote"],
    ["for i in range(2)", "colon"],
    "    print(i)",
  ]),
  mkBug("loops", "medium", [
    "i = 0",
    "while True:",
    "    i += 1",
    "    if i > 3:",
    ["    break", "indent"],
    "    print(i)",
    ["print(f\"stopped at {i}", "quote"],
  ]),
  mkBug("loops", "medium", [
    "squares = []",
    "for n in range(4):",
    ["    squares.append(n * n", "paren"],
    ["print(suqares)", "name"],
  ]),
  mkBug("loops", "hard", [
    "matrix = [[1, 2], [3, 4]]",
    ["for row in mtarix:", "name"],
    "    for val in row:",
    "        print(val * 2, end=\" \")",
    "    print()",
    ["total = sum(sum(r) for r in matrix", "paren"],
    ["print(ttoal)", "name"],
  ]),
  mkBug("loops", "hard", [
    ["for i, ch in enumerate(\"abc\")", "colon"],
    "    print(i, ch)",
    "else:",
    ["print(\"finished\")", "indent"],
    ["print(cnt)", "name"],
  ]),
  mkBug("loops", "easy", [
    "total = 0",
    ["for i in range(5)", "colon"],
    "    total += i",
    ["print(\"Total:\", totl)", "name"],
  ]),
  mkBug("loops", "easy", [
    "n = 3",
    "while n > 0:",
    ["print(n)", "indent"],
    "    n -= 1",
    "print(\"Go!\")",
  ]),
  mkBug("loops", "medium", [
    "names = [\"ann\", \"bob\", \"cy\"]",
    ["for name in names", "colon"],
    "    print(name.upper())",
    "count = 0",
    ["while count < len(names)", "colon"],
    "    count += 1",
    "print(count)",
  ]),
  mkBug("loops", "medium", [
    "nums = [1, 2, 3, 4]",
    "evens = []",
    "for n in nums:",
    "    if n % 2 == 0:",
    ["    evens.append(n)", "indent"],
    "print(evens)",
    ["print(\"Sum:\", sum(evens)", "paren"],
  ]),
  mkBug("loops", "hard", [
    "rows = 3",
    ["for r in range(rows)", "colon"],
    "    line = \"\"",
    "    for c in range(r + 1):",
    "        line += \"*\"",
    ["    print(lin)", "name"],
    ["print(\"Finished)", "quote"],
  ]),

  // ---------- functions ----------
  mkBug("functions", "medium", [
    ["def area(w, h:", "paren"],
    "    return w * h",
    "",
    ["def describe(shape)", "colon"],
    "    print(\"Area:\", area(2, 3))",
    "",
    ["describe(circle)", "name"],
  ]),
  mkBug("functions", "easy", [
    "def greet(name):",
    ["return \"Hello \" + name", "indent"],
    "",
    ["print(geret(\"Ana\"))", "name"],
  ]),
  mkBug("functions", "easy", [
    ["def add(a, b)", "colon"],
    "    return a + b",
    "",
    "print(add(2, 3))",
    ["print(ad(1, 1))", "name"],
  ]),
  mkBug("functions", "easy", [
    "def square(x):",
    "    return x * x",
    "",
    ["print(square(4)", "paren"],
    "print(\"done\")",
  ]),
  mkBug("functions", "medium", [
    "def is_even(n):",
    "    return n % 2 == 0",
    "",
    "def count_even(nums):",
    "    c = 0",
    "    for n in nums:",
    "        if is_even(n):",
    "            c += 1",
    "    return c",
    "",
    ["print(count_evn([1, 2, 4]))", "name"],
    ["print(\"evens: ')", "quote"],
  ]),
  mkBug("functions", "medium", [
    "def power(base, exp=2):",
    "    return base ** exp",
    "",
    ["print(pwoer(3))", "name"],
    ["print(power(2, 5)", "paren"],
    "print(power(exp=3, base=2))",
  ]),
  mkBug("functions", "medium", [
    "def stats(nums):",
    "    smallest = min(nums)",
    "    largest = max(nums)",
    "    return smallest, largest",
    "",
    "lo, hi = stats([3, 1, 2])",
    ["print(\"low:\", lo, \"high:\", high)", "name"],
    ["def show(x)", "colon"],
    "    print(x)",
  ]),
  mkBug("functions", "hard", [
    "def make_counter():",
    "    n = 0",
    "    def inc():",
    "        nonlocal n",
    "        n += 1",
    "        return n",
    "    return inc",
    "",
    ["c = mkae_counter()", "name"],
    ["print(c(), c()", "paren"],
    ["print(mkae_counter()())", "name"],
  ]),
  mkBug("functions", "hard", [
    ["def apply(f, *args)", "colon"],
    "    return f(*args)",
    "",
    "double = lambda x: x * 2",
    ["print(apply(duoble, 4))", "name"],
    ["print(apply(dobule, 5))", "name"],
  ]),
  mkBug("functions", "hard", [
    "def tag(name, **attrs):",
    "    parts = [f'{k}=\"{v}\"' for k, v in attrs.items()]",
    ["    return \"<\" + name + \" \" + \" \".join(prats) + \">\"", "name"],
    "",
    "print(tag(\"a\", href=\"x\"))",
    ["print(tag(\"img\", src='y))", "quote"],
    ["print(tag(\"p\", id=\"z\")", "paren"],
  ]),
  mkBug("functions", "easy", [
    ["def add(a, b)", "colon"],
    "    return a + b",
    "print(add(2, 3))",
  ]),
  mkBug("functions", "easy", [
    "def greet(name):",
    "    return \"Hi \" + name",
    "msg = greet(\"Ali\")",
    ["print(mgs)", "name"],
    ["print(len(msg)", "paren"],
  ]),
  mkBug("functions", "medium", [
    "def area(w, h):",
    ["return w * h", "indent"],
    "def show(v):",
    "    print(\"Area:\", v)",
    "show(area(3, 4))",
    ["print(\"ok)", "quote"],
  ]),
  mkBug("functions", "medium", [
    "def square(x):",
    "    return x * x",
    "def total(nums):",
    "    s = 0",
    "    for n in nums:",
    "        s += square(n)",
    "    return s",
    ["print(total([1, 2, 3])", "paren"],
    ["print(totl([4]))", "name"],
  ]),
  mkBug("functions", "hard", [
    ["def power(base, exp=2)", "colon"],
    "    result = 1",
    "    for _ in range(exp):",
    "        result *= base",
    "    return result",
    "def label(n):",
    ["    return \"Value: \" + str(n", "paren"],
    "print(label(power(3)))",
    ["print(powr(2, 3))", "name"],
  ]),

  // ---------- lists ----------
  mkBug("lists", "medium", [
    "fruits = [\"apple\", \"pear\", \"fig\"]",
    ["fruits.append(\"kiwi\"", "paren"],
    "for f in fruits:",
    ["print(f.upper())", "indent"],
    ["print(fruit[0])", "name"],
  ]),
  mkBug("lists", "easy", [
    "nums = [3, 1, 2]",
    "nums.sort()",
    ["print(nums", "paren"],
    ["print(nmus[0])", "name"],
  ]),
  mkBug("lists", "easy", [
    ["colors = [\"red\", \"green]", "quote"],
    "colors.append(\"blue\")",
    "print(len(colors))",
    ["print(colours)", "name"],
  ]),
  mkBug("lists", "easy", [
    ["nums = [1, 2, 3", "paren"],
    "total = 0",
    "for n in nums:",
    "    total += n",
    ["print(ttoal)", "name"],
  ]),
  mkBug("lists", "medium", [
    "words = [\"a\", \"bb\", \"ccc\"]",
    "lengths = []",
    ["for w in words", "colon"],
    "    lengths.append(len(w))",
    ["print(lnegths)", "name"],
  ]),
  mkBug("lists", "medium", [
    "nums = [5, 2, 9]",
    "biggest = max(nums)",
    "nums.remove(biggest)",
    ["print(nums, biggst)", "name"],
    ["print(nums[0:1)", "paren"],
  ]),
  mkBug("lists", "medium", [
    "a = [1, 2]",
    "b = [3, 4]",
    "c = a + b",
    "print(c)",
    ["print(c[1:3]", "paren"],
    "d = c[::-1]",
  ]),
  mkBug("lists", "medium", [
    "stack = []",
    "stack.append(1)",
    "stack.append(2)",
    "top = stack.pop()",
    ["print(top, stak)", "name"],
    ["if len(stack) > 0", "colon"],
    "    print(\"left\")",
  ]),
  mkBug("lists", "hard", [
    "grid = [[0, 1], [2, 3]]",
    ["flat = [v for row in grid for v in row", "paren"],
    ["print(falt)", "name"],
  ]),
  mkBug("lists", "hard", [
    "names = [\"bo\", \"al\", \"cy\"]",
    ["nmaes.sort(key=len)", "name"],
    ["pairs = list(zip(names, range(3))", "paren"],
    ["print(piars)", "name"],
  ]),
  mkBug("lists", "easy", [
    ["scores = [80, 95, 70", "paren"],
    ["socres.sort()", "name"],
    "print(scores[-1])",
  ]),
  mkBug("lists", "easy", [
    "nums = [1, 2, 3, 4]",
    "total = 0",
    ["for n in nums", "colon"],
    "    total += n",
    ["print(totl)", "name"],
  ]),
  mkBug("lists", "medium", [
    "items = [\"pen\", \"cup\", \"book\"]",
    "items.append(\"lamp\")",
    "for i in range(len(items)):",
    ["print(i, items[i])", "indent"],
    ["print(\"Last: items[-1])", "quote"],
  ]),
  mkBug("lists", "medium", [
    "data = [4, 8, 15, 16]",
    "evens = []",
    "for x in data:",
    ["    if x % 2 == 0", "colon"],
    "        evens.append(x)",
    ["print(evns)", "name"],
    "print(len(evens))",
  ]),
  mkBug("lists", "hard", [
    "grid = [[1, 2], [3, 4]]",
    "flat = []",
    ["for row in grid", "colon"],
    "    for v in row:",
    "        flat.append(v)",
    ["print(flat[0:3)", "paren"],
    ["print(sum(falt))", "name"],
  ]),

  // ---------- dicts ----------
  mkBug("dicts", "medium", [
    ["user = {\"name\": \"Ana\", \"age\": 30", "paren"],
    "user[\"city\"] = \"Rome\"",
    ["for key, value in user.items()", "colon"],
    "    print(key, value)",
    ["print(user['name\"])", "quote"],
  ]),
  mkBug("dicts", "easy", [
    "prices = {\"tea\": 2, \"cake\": 5}",
    "prices[\"milk\"] = 3",
    ["print(prices[\"tea\"]", "paren"],
    ["print(len(pirces))", "name"],
  ]),
  mkBug("dicts", "easy", [
    "d = {\"a\": 1, \"b\": 2}",
    ["for k in d", "colon"],
    "    print(k)",
    ["print(dd[\"a\"])", "name"],
  ]),
  mkBug("dicts", "easy", [
    ["car = {\"brand\": \"Kia\", \"year: 2020}", "quote"],
    "print(car[\"brand\"])",
  ]),
  mkBug("dicts", "medium", [
    "scores = {\"ana\": 3, \"bo\": 5}",
    "best = max(scores, key=scores.get)",
    ["print(best, scores[bset])", "name"],
    ["scores.update({\"cy\": 9}", "paren"],
    "print(scores)",
  ]),
  mkBug("dicts", "medium", [
    "counts = {}",
    "for ch in \"hello\":",
    "    counts[ch] = counts.get(ch, 0) + 1",
    ["if \"l\" in counts", "colon"],
    "    print(counts[\"l\"])",
    ["print(count)", "name"],
  ]),
  mkBug("dicts", "medium", [
    "d = {\"x\": 1, \"y\": 2}",
    "inverse = {v: k for k, v in d.items()}",
    "print(inverse[1])",
    ["print(inverse.get(3, 'none))", "quote"],
    "for k, v in d.items():",
    ["print(k, v)", "indent"],
  ]),
  mkBug("dicts", "medium", [
    "config = {\"debug\": True}",
    "config.setdefault(\"level\", 1)",
    ["value = config.pop(\"debug\"", "paren"],
    ["print(value, cnofig)", "name"],
  ]),
  mkBug("dicts", "hard", [
    "people = {\"ana\": {\"age\": 30}, \"bo\": {\"age\": 25}}",
    ["oldest = max(people, key=lambda p: people[p][\"age\"]", "paren"],
    ["print(odlest)", "name"],
    ["for name, info in people.items()", "colon"],
    "    print(name, info[\"age\"])",
  ]),
  mkBug("dicts", "hard", [
    "a = {\"x\": 1}",
    "b = {\"y\": 2}",
    "merged = {**a, **b}",
    ["print(mreged)", "name"],
    ["print(merged[\"z'])", "quote"],
    ["print(mergd)", "name"],
  ]),
  mkBug("dicts", "easy", [
    ["user = {\"name\": \"Ana\", \"age\": 30", "paren"],
    ["print(uesr[\"name\"])", "name"],
  ]),
  mkBug("dicts", "easy", [
    "stock = {\"apple\": 3, \"pear\": 5}",
    "stock[\"fig\"] = 7",
    ["print(stock[\"fig])", "quote"],
    ["print(stok)", "name"],
  ]),
  mkBug("dicts", "medium", [
    "prices = {\"tea\": 2, \"milk\": 3}",
    ["for k in prices", "colon"],
    ["    print(k, pirces[k])", "name"],
    "print(len(prices))",
  ]),
  mkBug("dicts", "medium", [
    "count = {}",
    "for ch in \"banana\":",
    "    if ch in count:",
    ["    count[ch] += 1", "indent"],
    "    else:",
    "        count[ch] = 1",
    "print(count)",
    ["print(cnt)", "name"],
  ]),
  mkBug("dicts", "hard", [
    "words = [\"a\", \"b\", \"a\"]",
    "freq = {}",
    ["for w in words", "colon"],
    "    freq[w] = freq.get(w, 0) + 1",
    ["best = max(freq, key=freq.get", "paren"],
    "print(\"Top:\", best)",
    ["print(freq[\"a])", "quote"],
  ]),

  // ---------- strings ----------
  mkBug("strings", "medium", [
    "word = \"level\"",
    ["if word == word[::-1]", "colon"],
    "    print(\"palindrome\")",
    ["msg = 'It's done'", "quote"],
    ["print(mesg)", "name"],
  ]),
  mkBug("strings", "easy", [
    "s = \"hello\"",
    ["print(s.upper()", "paren"],
    "print(len(s))",
  ]),
  mkBug("strings", "easy", [
    ["name = \"Ana", "quote"],
    "print(\"Hi \" + name)",
    ["print(\"Bye \" + nme)", "name"],
  ]),
  mkBug("strings", "easy", [
    "text = \"a-b-c\"",
    "parts = text.split(\"-\")",
    ["for p in parts", "colon"],
    "    print(p)",
    ["print(\" \".join(parts)", "paren"],
  ]),
  mkBug("strings", "medium", [
    "s = \"  Python  \"",
    "clean = s.strip()",
    "print(clean.lower())",
    ["print(clen.title())", "name"],
    ["print(clean[1:3)", "paren"],
  ]),
  mkBug("strings", "medium", [
    "vowels = 0",
    "for ch in \"banana\":",
    ["if ch in \"aeiou\":", "indent"],
    "        vowels += 1",
    ["print(f\"vowels: {vowels}", "quote"],
  ]),
  mkBug("strings", "medium", [
    "sentence = \"the cat sat\"",
    ["words = snetence.split()", "name"],
    "longest = max(words, key=len)",
    ["print(longest.upper()", "paren"],
    "print(len(words))",
  ]),
  mkBug("strings", "medium", [
    ["def shout(text)", "colon"],
    "    return text.upper() + \"!\"",
    "",
    "print(shout(\"hey\"))",
    ["print(shou(\"yo\"))", "name"],
  ]),
  mkBug("strings", "hard", [
    "def is_pal(s):",
    ["    s = \"\".join(c.lower() for c in s if c.isalnum()", "paren"],
    "    return s == s[::-1]",
    "",
    ["print(i_spal(\"A man, a plan\"))", "name"],
  ]),
  mkBug("strings", "hard", [
    "text = \"one two two\"",
    "count = text.count(\"two\")",
    ["first = text.find(\"two)", "quote"],
    ["print(count, frist)", "name"],
    ["print(text.replace(\"two\", \"2\", 1)", "paren"],
  ]),
  mkBug("strings", "easy", [
    "word = \"python\"",
    ["print(word.upper()", "paren"],
    ["print(len(wrod))", "name"],
  ]),
  mkBug("strings", "easy", [
    ["greeting = \"Hello", "quote"],
    "name = \"Ana\"",
    ["print(gereting, name)", "name"],
  ]),
  mkBug("strings", "medium", [
    "text = \"one two three\"",
    "parts = text.split()",
    ["for p in parts", "colon"],
    "    print(p.title())",
    "print(len(parts))",
    ["print(prts[0])", "name"],
  ]),
  mkBug("strings", "medium", [
    "s = \"level\"",
    "def is_pal(t):",
    ["return t == t[::-1]", "indent"],
    "print(is_pal(s))",
    ["print(\"ok')", "quote"],
  ]),
  mkBug("strings", "hard", [
    ["def count_vowels(s)", "colon"],
    "    n = 0",
    "    for ch in s.lower():",
    "        if ch in \"aeiou\":",
    "            n += 1",
    "    return n",
    "print(count_vowels(\"Hello World\"))",
    ["print(cout_vowels(\"Python\"))", "name"],
    ["print(\"Done)", "quote"],
  ]),

  // ---------- errors ----------
  mkBug("errors", "medium", [
    "try:",
    "    value = int(\"42\")",
    ["except ValueError", "colon"],
    "    print(\"bad number\")",
    "finally:",
    ["print(\"done\")", "indent"],
  ]),
  mkBug("errors", "easy", [
    "try:",
    "    print(10 / 0)",
    "except ZeroDivisionError:",
    ["    print(\"cannot divide)", "quote"],
  ]),
  mkBug("errors", "easy", [
    ["try", "colon"],
    "    x = int(\"5\")",
    "except ValueError:",
    "    print(\"bad\")",
    "print(x)",
  ]),
  mkBug("errors", "easy", [
    "data = {\"a\": 1}",
    "try:",
    ["    print(dtaa[\"b\"])", "name"],
    "except KeyError:",
    ["print(\"missing\")", "indent"],
  ]),
  mkBug("errors", "medium", [
    "def safe_div(a, b):",
    "    try:",
    "        return a / b",
    ["    except ZeroDivisionError", "colon"],
    "        return 0",
    "",
    ["print(sfae_div(1, 0))", "name"],
  ]),
  mkBug("errors", "medium", [
    "text = \"12\"",
    "try:",
    ["    n = int(txt)", "name"],
    "except (ValueError, TypeError):",
    "    print(\"bad input\")",
  ]),
  mkBug("errors", "medium", [
    "def check(age):",
    "    if age < 0:",
    ["        raise ValueError(\"negative age)", "quote"],
    "    return age",
    "",
    "try:",
    "    check(-1)",
    "except ValueError as e:",
    ["    print(\"error:\", e", "paren"],
  ]),
  mkBug("errors", "medium", [
    "try:",
    "    items = [1, 2]",
    "    print(items[5])",
    "except IndexError as err:",
    ["    print(\"oops\", er)", "name"],
    "else:",
    "    print(\"fine\")",
    ["finally", "colon"],
    "    print(\"end\")",
  ]),
  mkBug("errors", "hard", [
    "class MyError(Exception):",
    "    pass",
    "",
    "def run(x):",
    "    if x < 0:",
    ["        raise MEyrror(\"neg\")", "name"],
    "    return x",
    "",
    "try:",
    "    run(-1)",
    ["except MEyrror as e:", "name"],
    ["    print(\"caught\", e", "paren"],
    "finally:",
    "    print(\"cleanup\")",
  ]),
  mkBug("errors", "hard", [
    "def read(path):",
    "    try:",
    ["        f = open(ptah)", "name"],
    "    except FileNotFoundError:",
    "        return None",
    "    else:",
    "        data = f.read()",
    "        f.close()",
    ["        return dtaa", "name"],
    "",
    ["print(read(\"x.txt\")", "paren"],
    "print(\"end\")",
  ]),
  mkBug("errors", "easy", [
    "try:",
    "    x = int(\"12\")",
    "    print(x)",
    ["except ValueError", "colon"],
    "    print(\"bad\")",
  ]),
  mkBug("errors", "easy", [
    "result = \"caught\"",
    "try:",
    "    print(10 / 0)",
    "except ZeroDivisionError:",
    ["    print(\"zero)", "quote"],
    ["print(rsult)", "name"],
  ]),
  mkBug("errors", "medium", [
    "def safe_div(a, b):",
    "    try:",
    "        return a / b",
    "    except ZeroDivisionError:",
    ["    return 0", "indent"],
    "print(safe_div(4, 2))",
    ["print(safe_dv(1, 0))", "name"],
  ]),
  mkBug("errors", "medium", [
    "data = {\"a\": 1}",
    ["try", "colon"],
    "    print(data[\"b\"])",
    "except KeyError:",
    "    print(\"missing\")",
    "finally:",
    ["    print(\"end\"", "paren"],
  ]),
  mkBug("errors", "hard", [
    "def parse(s):",
    "    try:",
    "        return int(s)",
    "    except ValueError as err:",
    ["        print(\"bad:\", err", "paren"],
    "        return None",
    ["for v in [\"5\", \"x\"]", "colon"],
    "    print(parse(v))",
    ["print(prse(\"7\"))", "name"],
  ]),

  // ---------- oop ----------
  mkBug("oop", "hard", [
    "class Player:",
    "    def __init__(self, name, hp=100):",
    "        self.name = name",
    "        self.hp = hp",
    "",
    ["    def hit(self, dmg)", "colon"],
    "        self.hp -= dmg",
    "        if self.hp <= 0:",
    "            print(self.name + \" is down\")",
    "        return self.hp",
    "",
    ["hero = Player(\"Ada\"", "paren"],
    "hero.hit(30)",
    ["print(hero.hpp)", "name"],
  ]),
  mkBug("oop", "easy", [
    "class Cat:",
    "    def __init__(self, name):",
    "        self.name = name",
    "",
    "    def speak(self):",
    "        return self.name + \" says meow\"",
    "",
    ["c = Cat(\"Tom\"", "paren"],
    "print(c.speak())",
    ["print(c.nmae)", "name"],
  ]),
  mkBug("oop", "easy", [
    "class Car:",
    "    wheels = 4",
    "",
    "    def __init__(self, color):",
    "        self.color = color",
    "",
    "c = Car(\"red\")",
    "print(c.color, Car.wheels)",
    ["print(\"done)", "quote"],
    ["print(c.colour)", "name"],
  ]),
  mkBug("oop", "easy", [
    "class Box:",
    "    def __init__(self, w, h):",
    "        self.w = w",
    "        self.h = h",
    "",
    ["    def area(self)", "colon"],
    "        return self.w * self.h",
    "",
    ["print(Box(2, 3).area()", "paren"],
    "print(\"end\")",
  ]),
  mkBug("oop", "medium", [
    "class Animal:",
    "    def __init__(self, name):",
    "        self.name = name",
    "",
    "    def sound(self):",
    "        return \"...\"",
    "",
    ["class Dog(Animal)", "colon"],
    "    def sound(self):",
    "        return \"Woof\"",
    "",
    "d = Dog(\"Rex\")",
    "print(d.name, d.sound())",
    ["print(d.nam)", "name"],
  ]),
  mkBug("oop", "medium", [
    "class Counter:",
    "    def __init__(self):",
    "        self.n = 0",
    "",
    "    def inc(self):",
    "        self.n += 1",
    "        return self",
    "",
    "c = Counter()",
    "c.inc().inc()",
    ["print(\"count:\", c.n", "paren"],
    ["print(c.m)", "name"],
  ]),
  mkBug("oop", "medium", [
    "class Account:",
    "    def __init__(self, balance):",
    "        self.balance = balance",
    "",
    "    def withdraw(self, amount):",
    "        if amount > self.balance:",
    ["            raise ValueError(\"not enough money)", "quote"],
    "        self.balance -= amount",
    "",
    "a = Account(10)",
    "a.withdraw(3)",
    "print(a.balance)",
    ["print(acount.balance)", "name"],
  ]),
  mkBug("oop", "medium", [
    "class Point:",
    "    def __init__(self, x, y):",
    "        self.x = x",
    "        self.y = y",
    "",
    "    def __str__(self):",
    "        return f\"({self.x}, {self.y})\"",
    "",
    "    def __add__(self, other):",
    ["        return Point(self.x + other.x, self.y + other.y", "paren"],
    "",
    ["print(Point(1, 2) + Piont(3, 4))", "name"],
  ]),
  mkBug("oop", "hard", [
    "class Shape:",
    "    def area(self):",
    "        raise NotImplementedError",
    "",
    "class Square(Shape):",
    "    def __init__(self, s):",
    "        self.s = s",
    "",
    "    def area(self):",
    "        return self.s * self.s",
    "",
    ["shapes = [Suqare(2), Square(3)]", "name"],
    ["for sh in shapes", "colon"],
    "    print(sh.area())",
    ["print(sum(s.area() for s in shapes)", "paren"],
  ]),
  mkBug("oop", "hard", [
    "class Base:",
    "    def __init__(self, name):",
    "        self.name = name",
    "",
    "class Child(Base):",
    "    def __init__(self, name, age):",
    ["        super().__init__(nmae)", "name"],
    "        self.age = age",
    "",
    "    @property",
    "    def info(self):",
    ["    return f\"{self.name} {self.age}\"", "indent"],
    "",
    "kid = Child(\"Bo\", 7)",
    "print(kid.info)",
    ["print(kid.agee)", "name"],
  ]),
  mkBug("oop", "easy", [
    ["class Dog", "colon"],
    "    def __init__(self, name):",
    "        self.name = name",
    "    def bark(self):",
    "        return self.name + \" says woof\"",
    "pet = Dog(\"Rex\")",
    ["print(pet.bark()", "paren"],
  ]),
  mkBug("oop", "easy", [
    "class Car:",
    "    wheels = 4",
    ["    def __init__(self, color)", "colon"],
    "        self.color = color",
    ["car = Car(\"red\"", "paren"],
    "print(car.color, Car.wheels)",
  ]),
  mkBug("oop", "medium", [
    "class Account:",
    "    def __init__(self, balance):",
    "        self.balance = balance",
    "    def deposit(self, amount):",
    ["    self.balance += amount", "indent"],
    "        return self.balance",
    ["acc = Acount(100)", "name"],
    "print(acc.deposit(50))",
  ]),
  mkBug("oop", "medium", [
    "class Shape:",
    "    def area(self):",
    "        return 0",
    "class Square(Shape):",
    "    def __init__(self, s):",
    "        self.s = s",
    ["    def area(self)", "colon"],
    "        return self.s * self.s",
    ["print(Squar(3).area())", "name"],
  ]),
  mkBug("oop", "hard", [
    "class Animal:",
    "    def speak(self):",
    "        return \"sound\"",
    ["class Dog(Animal)", "colon"],
    "    def speak(self):",
    ["        base = super().speak(", "paren"],
    "        return base + \": woof\"",
    "d = Dog()",
    ["print(dd.speak())", "name"],
  ]),

  // ---------- decorators ----------
  mkBug("decorators", "hard", [
    "import time",
    "",
    "def timer(fn):",
    "    def wrapper(*args):",
    "        start = time.time()",
    "        result = fn(*args)",
    "        print(\"took\", time.time() - start)",
    "        return result",
    ["    return warpper", "name"],
    "",
    "@timer",
    ["def slow(n)", "colon"],
    "    return n * 2",
    "",
    ["print(slow(21)", "paren"],
    "print(\"done\")",
  ]),
  mkBug("decorators", "easy", [
    "def shout(fn):",
    "    def wrapper():",
    "        return fn().upper()",
    "    return wrapper",
    "",
    "@shout",
    "def hello():",
    "    return \"hello\"",
    "",
    ["print(hello()", "paren"],
    ["print(helo())", "name"],
  ]),
  mkBug("decorators", "easy", [
    "def log(fn):",
    "    def wrapper(*args):",
    "        print(\"calling\", fn.__name__)",
    "        return fn(*args)",
    "    return wrapper",
    "",
    "@log",
    ["def add(a, b)", "colon"],
    "    return a + b",
    "",
    "print(add(1, 2))",
    ["print('end)", "quote"],
  ]),
  mkBug("decorators", "easy", [
    "def twice(fn):",
    "    def wrapper():",
    "        fn()",
    "        fn()",
    "    return wrapper",
    "",
    "@twice",
    "def hi():",
    "    print(\"hi\")",
    "",
    "hi()",
    ["print(\"ok')", "quote"],
    ["@twic", "name"],
    "def bye():",
    "    print(\"bye\")",
  ]),
  mkBug("decorators", "medium", [
    "import functools",
    "",
    "def repeat(n):",
    "    def deco(fn):",
    "        @functools.wraps(fn)",
    "        def wrapper(*args):",
    "            for _ in range(n):",
    "                fn(*args)",
    ["        return warpper", "name"],
    "    return deco",
    "",
    "@repeat(2)",
    "def say(w):",
    "    print(w)",
    "",
    ["say(\"hey\"", "paren"],
    "print(say.__name__)",
  ]),
  mkBug("decorators", "medium", [
    "def cache(fn):",
    "    memo = {}",
    "    def wrapper(n):",
    ["        if n not in memo", "colon"],
    "            memo[n] = fn(n)",
    "        return memo[n]",
    ["    return warpper", "name"],
    "",
    "@cache",
    "def sq(n):",
    "    return n * n",
    "",
    "print(sq(4), sq(4))",
  ]),
  mkBug("decorators", "medium", [
    "def only_positive(fn):",
    "    def wrapper(x):",
    "        if x < 0:",
    ["            raise ValueError(\"negative number)", "quote"],
    "        return fn(x)",
    "    return wrapper",
    "",
    "@only_positive",
    "def root(x):",
    "    return x ** 0.5",
    "",
    "print(root(9))",
    ["print(rot(4))", "name"],
  ]),
  mkBug("decorators", "medium", [
    "def tag(name):",
    "    def deco(fn):",
    "        def wrapper():",
    "            return f\"<{name}>{fn()}</{name}>\"",
    "        return wrapper",
    "    return deco",
    "",
    "@tag(\"b\")",
    "def word():",
    "    return \"hi\"",
    "",
    ["print(word()", "paren"],
    ["print(wrd())", "name"],
  ]),
  mkBug("decorators", "hard", [
    "def counted(fn):",
    "    def wrapper(*args):",
    "        wrapper.calls += 1",
    "        return fn(*args)",
    "    wrapper.calls = 0",
    "    return wrapper",
    "",
    ["@cuonted", "name"],
    "def f(x):",
    "    return x",
    "",
    "f(1)",
    "f(2)",
    ["print(\"calls:\", f.calls", "paren"],
    ["print(f.calss)", "name"],
  ]),
  mkBug("decorators", "hard", [
    "class Temp:",
    "    def __init__(self):",
    "        self._c = 0",
    "",
    "    @property",
    "    def c(self):",
    ["    return self._c", "indent"],
    "",
    "    @c.setter",
    "    def c(self, v):",
    "        self._c = v",
    "",
    "t = Temp()",
    "t.c = 5",
    ["print(t.c", "paren"],
    ["print(t.d)", "name"],
  ]),
  mkBug("decorators", "easy", [
    "def shout(f):",
    ["    def wrapper()", "colon"],
    "        return f().upper()",
    "    return wrapper",
    "@shout",
    "def hi():",
    "    return \"hi\"",
    ["print(hi()", "paren"],
  ]),
  mkBug("decorators", "easy", [
    ["def twice(f)", "colon"],
    "    def w():",
    "        f()",
    "        f()",
    ["    return ww", "name"],
    "@twice",
    "def hello():",
    "    print(\"hello\")",
    "hello()",
  ]),
  mkBug("decorators", "medium", [
    "def log(f):",
    "    def w(x):",
    ["        print(\"calling\", f.__name__", "paren"],
    ["        return f(y)", "name"],
    "    return w",
    "@log",
    ["def sq(x)", "colon"],
    "    return x * x",
    "print(sq(4))",
  ]),
  mkBug("decorators", "medium", [
    "def repeat(n):",
    ["    def deco(f)", "colon"],
    "        def w():",
    ["            return [f() for _ in range(n)", "paren"],
    "        return w",
    "    return deco",
    "@repeat(2)",
    "def one():",
    "    return 1",
    ["print(onee())", "name"],
  ]),
  mkBug("decorators", "hard", [
    "def memo(f):",
    "    cache = {}",
    ["    def w(n)", "colon"],
    ["        if n not in cache", "colon"],
    "            cache[n] = f(n)",
    ["        return cach[n]", "name"],
    "    return w",
    "sq = memo(lambda n: n * n)",
    "print(sq(5))",
  ]),

  // ---------- generators ----------
  mkBug("generators", "hard", [
    "def countdown(n):",
    ["    while n > 0", "colon"],
    "        yield n",
    "        n -= 1",
    "",
    ["for x in cuontdown(3):", "name"],
    "    print(x)",
    ["print(list(countdown(2))", "paren"],
  ]),
  mkBug("generators", "easy", [
    "def gen():",
    "    yield 1",
    "    yield 2",
    "    yield 3",
    "",
    "g = gen()",
    "print(next(g))",
    ["print(next(g)", "paren"],
    ["print(nxt(g))", "name"],
  ]),
  mkBug("generators", "easy", [
    "def squares(n):",
    ["    for i in range(n)", "colon"],
    "        yield i * i",
    "",
    ["print(list(suqares(4)))", "name"],
  ]),
  mkBug("generators", "easy", [
    "def letters():",
    "    for ch in \"abc\":",
    ["    yield ch", "indent"],
    "",
    "print(list(letters()))",
    ["print(\"done)", "quote"],
  ]),
  mkBug("generators", "medium", [
    "def evens(limit):",
    "    n = 0",
    "    while n < limit:",
    "        yield n",
    "        n += 2",
    "",
    ["total = sum(evens(10)", "paren"],
    ["print(ttoal)", "name"],
  ]),
  mkBug("generators", "medium", [
    "def read_lines(text):",
    ["    for line in txet.split(\"\\n\"):", "name"],
    "        if line.strip():",
    "            yield line.strip()",
    "",
    ["for l in read_lines(\"a\\n\\nb\")", "colon"],
    "    print(l)",
    "print(list(read_lines('x')))",
  ]),
  mkBug("generators", "medium", [
    "def fib():",
    "    a, b = 0, 1",
    "    while True:",
    "        yield a",
    "        a, b = b, a + b",
    "",
    "g = fib()",
    "first = [next(g) for _ in range(5)]",
    "print(first)",
    ["print(fibs)", "name"],
    ["print('ok)", "quote"],
  ]),
  mkBug("generators", "medium", [
    "def pairs(items):",
    "    for i in range(len(items) - 1):",
    "        yield items[i], items[i + 1]",
    "",
    ["print(list(pairs([1, 2, 3]))", "paren"],
    ["print(list(paris([4, 5, 6])))", "name"],
  ]),
  mkBug("generators", "hard", [
    "def echo():",
    "    received = yield \"ready\"",
    "    while True:",
    "        received = yield received",
    "",
    ["g = ehco()", "name"],
    "print(next(g))",
    ["print(g.send(\"a\")", "paren"],
    ["print(g.sned(\"b\"))", "name"],
  ]),
  mkBug("generators", "hard", [
    "def chain(*its):",
    "    for it in its:",
    "        yield from it",
    "",
    ["words = chain(\"ab\", [1, 2], (3,)", "paren"],
    ["print(list(wrods))", "name"],
    "def take(g, n):",
    ["    for _ in range(n)", "colon"],
    "        yield next(g)",
  ]),
  mkBug("generators", "easy", [
    ["def count_up(n)", "colon"],
    "    for i in range(n):",
    "        yield i",
    ["print(list(count_up(3))", "paren"],
  ]),
  mkBug("generators", "easy", [
    "def evens():",
    ["    for i in range(0, 6, 2)", "colon"],
    "        yield i",
    "for e in evens():",
    ["print(e)", "indent"],
  ]),
  mkBug("generators", "medium", [
    "def squares(n):",
    ["    for i in range(n)", "colon"],
    "        yield i * i",
    "gen = squares(4)",
    "print(next(gen))",
    ["print(nxt(gen))", "name"],
    ["print(\"rest:\", list(gen)", "paren"],
  ]),
  mkBug("generators", "medium", [
    "def read_lines(text):",
    "    for line in text.split(\",\"):",
    ["        if line", "colon"],
    "            yield line.strip()",
    ["data = \"a, b,, c", "quote"],
    "for item in read_lines(data):",
    ["    print(itm)", "name"],
  ]),
  mkBug("generators", "hard", [
    "def fib():",
    "    a, b = 0, 1",
    ["    while True", "colon"],
    ["        yield aa", "name"],
    "        a, b = b, a + b",
    "gen = fib()",
    ["first = [next(gen) for _ in range(5)", "paren"],
    "print(first)",
  ]),

  // ---------- recursion ----------
  mkBug("recursion", "medium", [
    "def factorial(n):",
    ["    if n <= 1", "colon"],
    "        return 1",
    "    return n * factorial(n - 1)",
    "",
    "print(factorial(5))",
    ["print(factoral(3))", "name"],
  ]),
  mkBug("recursion", "easy", [
    "def countdown(n):",
    "    if n == 0:",
    "        print(\"liftoff\")",
    "        return",
    "    print(n)",
    ["    countdown(n - 1", "paren"],
    "",
    ["cuontdown(3)", "name"],
  ]),
  mkBug("recursion", "easy", [
    "def total(n):",
    "    if n == 0:",
    ["    return 0", "indent"],
    "    return n + total(n - 1)",
    "",
    "print(total(4))",
    ["print(\"sum:', total(3))", "quote"],
  ]),
  mkBug("recursion", "easy", [
    "def power(b, e):",
    "    if e == 0:",
    "        return 1",
    "    return b * power(b, e - 1)",
    "",
    ["print(power(2, 5)", "paren"],
    ["print(powr(3, 2))", "name"],
  ]),
  mkBug("recursion", "medium", [
    "def fib(n):",
    "    if n < 2:",
    "        return n",
    ["    return fib(n - 1) + fib(n - 2", "paren"],
    "",
    "print([fib(i) for i in range(6)])",
  ]),
  mkBug("recursion", "medium", [
    "def reverse(s):",
    "    if len(s) <= 1:",
    "        return s",
    "    return reverse(s[1:]) + s[0]",
    "",
    "print(reverse(\"abc\"))",
    ["print(reverse('xyz))", "quote"],
    ["print(revers(\"hi\"))", "name"],
  ]),
  mkBug("recursion", "medium", [
    "def digits(n):",
    ["    if n < 10", "colon"],
    "        return [n]",
    "    return digits(n // 10) + [n % 10]",
    "",
    ["print(dgiits(123))", "name"],
  ]),
  mkBug("recursion", "medium", [
    "def flatten(x):",
    "    if not isinstance(x, list):",
    "        return [x]",
    "    out = []",
    "    for item in x:",
    "        out += flatten(item)",
    "    return out",
    "",
    ["print(flatten([1, [2, [3]]])", "paren"],
    ["print(flaten([4, [5]]))", "name"],
  ]),
  mkBug("recursion", "hard", [
    "def hanoi(n, a, b, c):",
    "    if n == 0:",
    "        return 0",
    ["    return hanoi(n - 1, a, c, b) + 1 + hanoi(n - 1, c, b, a", "paren"],
    "",
    ["print(hnaoi(3, \"A\", \"B\", \"C\"))", "name"],
  ]),
  mkBug("recursion", "hard", [
    "def subsets(items):",
    "    if not items:",
    "        return [[]]",
    "    rest = subsets(items[1:])",
    ["    return rest + [[ietms[0]] + r for r in rest]", "name"],
    "",
    "print(subsets([1, 2]))",
    ["print(len(subsets([1, 2, 3))))", "paren"],
    ["def depth(x)", "colon"],
    "    return 0 if not isinstance(x, list) else 1 + max(map(depth, x), default=0)",
  ]),
  mkBug("recursion", "easy", [
    ["def fact(n)", "colon"],
    "    if n <= 1:",
    "        return 1",
    ["    return n * fact(n - 1", "paren"],
    "print(fact(5))",
  ]),
  mkBug("recursion", "easy", [
    "def countdown(n):",
    ["    if n == 0", "colon"],
    ["        print(\"liftoff)", "quote"],
    "        return",
    "    print(n)",
    "    countdown(n - 1)",
    "countdown(3)",
  ]),
  mkBug("recursion", "medium", [
    "def total(nums):",
    ["    if not nums", "colon"],
    "        return 0",
    ["    return nums[0] + totl(nums[1:])", "name"],
    ["print(total([1, 2, 3])", "paren"],
  ]),
  mkBug("recursion", "medium", [
    ["def rev(s)", "colon"],
    "    if len(s) <= 1:",
    ["    return s", "indent"],
    "    return rev(s[1:]) + s[0]",
    ["print(rev(\"abc\")", "paren"],
  ]),
  mkBug("recursion", "hard", [
    ["def hanoi(n, a, b, c)", "colon"],
    "    if n == 0:",
    "        return 0",
    ["    return hanoi(n - 1, a, c, b) + 1 + hanoi(n - 1, c, b, a", "paren"],
    ["print(hanoi(3, \"A\", \"B\", \"C))", "quote"],
  ]),

  // ---------- async ----------
  mkBug("async", "hard", [
    "import asyncio",
    "",
    ["async def fetch(name, delay)", "colon"],
    "    await asyncio.sleep(delay)",
    "    print(\"got\", name)",
    "    return name",
    "",
    "async def main():",
    ["    results = await asyncio.gather(fetch(\"a\", 0.2), fetch(\"b\", 0.1)", "paren"],
    "    print(results)",
    "",
    ["asyncio.run(mian())", "name"],
  ]),
  mkBug("async", "easy", [
    "import asyncio",
    "",
    "async def hello():",
    "    await asyncio.sleep(0.1)",
    "    print(\"hello\")",
    "",
    ["async def main()", "colon"],
    "    await hello()",
    "",
    ["asyncio.run(main()", "paren"],
    "print(\"done\")",
  ]),
  mkBug("async", "easy", [
    "import asyncio",
    "",
    "async def greet(name):",
    "    await asyncio.sleep(0.1)",
    ["    return \"Hi \" + nmae", "name"],
    "",
    "async def main():",
    ["    msg = await greet(\"Ana)", "quote"],
    "    print(msg)",
    "",
    "asyncio.run(main())",
  ]),
  mkBug("async", "easy", [
    "import asyncio",
    "",
    "async def tick():",
    "    for i in range(3):",
    "        print(i)",
    ["        await aysncio.sleep(0.1)", "name"],
    "",
    "async def main():",
    ["await tick()", "indent"],
    "",
    "asyncio.run(main())",
    "print(\"ok\")",
  ]),
  mkBug("async", "medium", [
    "import asyncio",
    "",
    "async def worker(n):",
    "    await asyncio.sleep(0.1)",
    "    return n * 2",
    "",
    "async def main():",
    "    tasks = [asyncio.create_task(worker(i)) for i in range(3)]",
    "    done = await asyncio.gather(*tasks)",
    "    print(done)",
    ["    print(len(taks))", "name"],
    "",
    ["asyncio.run(main()", "paren"],
    "print(\"end\")",
  ]),
  mkBug("async", "medium", [
    "import asyncio",
    "",
    "async def slow():",
    ["    await aysncio.sleep(1)", "name"],
    "    return \"slow\"",
    "",
    "async def main():",
    "    try:",
    "        r = await asyncio.wait_for(slow(), timeout=0.1)",
    ["    except asyncio.TimeoutError", "colon"],
    "        print(\"too slow\")",
    "    else:",
    "        print(r)",
    "",
    "asyncio.run(main())",
  ]),
  mkBug("async", "medium", [
    "import asyncio",
    "",
    "async def producer(q):",
    "    for i in range(3):",
    "        await q.put(i)",
    "    await q.put(None)",
    "",
    "async def consumer(q):",
    "    while True:",
    "        item = await q.get()",
    ["        if ietm is None:", "name"],
    "            break",
    "        print(\"got\", item)",
    "",
    "async def main():",
    "    q = asyncio.Queue()",
    ["    await asyncio.gather(producer(q), consumer(q)", "paren"],
    "asyncio.run(main())",
  ]),
  mkBug("async", "medium", [
    "import asyncio",
    "",
    "async def job(name):",
    "    print(\"start\", name)",
    "    await asyncio.sleep(0.1)",
    "    print(\"end\", name)",
    "",
    "async def main():",
    "    t1 = asyncio.create_task(job(\"A\"))",
    "    t2 = asyncio.create_task(job(\"B\"))",
    "    await t1",
    ["    await t3", "name"],
    ["    print(\"all done)", "quote"],
    "",
    "asyncio.run(main())",
  ]),
  mkBug("async", "hard", [
    "import asyncio",
    "",
    "lock = asyncio.Lock()",
    "count = 0",
    "",
    "async def add():",
    "    global count",
    ["    async with lock", "colon"],
    "        count += 1",
    "",
    "async def main():",
    ["    await aysncio.gather(*(add() for _ in range(5)))", "name"],
    "    print(count)",
    "",
    ["asyncio.run(mian())", "name"],
  ]),
  mkBug("async", "hard", [
    "import asyncio",
    "",
    "async def ticker(n):",
    "    for i in range(n):",
    "        yield i",
    "        await asyncio.sleep(0.1)",
    "",
    "async def main():",
    ["    async for v in tciker(3):", "name"],
    "        print(v)",
    ["    data = [x async for x in ticker(2)", "paren"],
    ["    print(dtaa)", "name"],
    "",
    "asyncio.run(main())",
  ]),
  mkBug("async", "easy", [
    "import asyncio",
    "",
    "async def greet(name):",
    "    await asyncio.sleep(0.1)",
    ["    print(\"hi\", name", "paren"],
    "",
    ["aysncio.run(greet(\"Ana\"))", "name"],
  ]),
  mkBug("async", "easy", [
    "import asyncio",
    "",
    ["async def work()", "colon"],
    "    await asyncio.sleep(0.1)",
    "    return \"done\"",
    "",
    ["print(asyncio.run(wrok()))", "name"],
  ]),
  mkBug("async", "medium", [
    "import asyncio",
    "",
    "async def square(n):",
    "    await asyncio.sleep(0.1)",
    "    return n * n",
    "",
    "async def main():",
    "    tasks = [square(i) for i in range(3)]",
    ["    results = await asyncio.gather(*tasks", "paren"],
    "    print(results)",
    ["    print(\"finished)", "quote"],
    "",
    "asyncio.run(main())",
  ]),
  mkBug("async", "medium", [
    "import asyncio",
    "",
    "async def tick(label, delay):",
    "    await asyncio.sleep(delay)",
    "    print(label)",
    "",
    "async def main():",
    "    await asyncio.gather(tick(\"a\", 0.2), tick(\"b\", 0.1))",
    ["    for i in range(2)", "colon"],
    "        print(i)",
    "",
    ["asyncio.run(mian())", "name"],
  ]),
  mkBug("async", "hard", [
    "import asyncio",
    "",
    "async def fetch(n):",
    "    await asyncio.sleep(0.01 * n)",
    "    return n * 10",
    "",
    "async def main():",
    "    results = []",
    "    for n in range(3):",
    "        value = await fetch(n)",
    ["        results.append(valeu)", "name"],
    ["    print(\"results:\", results", "paren"],
    ["    total = sum(rseults)", "name"],
    "    print(\"total\", total)",
    "",
    "asyncio.run(main())",
  ]),

  // ---------- regex ----------
  mkBug("regex", "medium", [
    "import re",
    "",
    "html = \"<b>one</b><b>two</b>\"",
    ["words = re.findall(r\"<b>(.*?)</b>\", html", "paren"],
    "print(words)",
    ["print(wods[0])", "name"],
  ]),
  mkBug("regex", "easy", [
    "import re",
    "",
    "text = \"call 555-1234 now\"",
    "m = re.search(r\"\\d{3}-\\d{4}\", text)",
    ["if m", "colon"],
    "    print(m.group())",
    ["print(re.findall(r\"\\d+\", text)", "paren"],
  ]),
  mkBug("regex", "easy", [
    "import re",
    "",
    "s = \"a1b22c333\"",
    "digits = re.findall(r\"\\d+\", s)",
    "print(digits)",
    "print(re.sub(r\"\\d\", \"#\", s))",
    ["print(re.sub(r\"\\d\", '#, s))", "quote"],
    ["print(digts)", "name"],
  ]),
  mkBug("regex", "easy", [
    "import re",
    "",
    "email = \"ana@site.com\"",
    "ok = re.match(r\"^\\w+@\\w+\\.com$\", email)",
    ["print(bool(ok)", "paren"],
    ["print(re.match(\"x\", eamil))", "name"],
  ]),
  mkBug("regex", "medium", [
    "import re",
    "",
    "log = \"ERROR 12:30 disk full\"",
    "m = re.match(r\"(\\w+) (\\d+):(\\d+)\", log)",
    "level, hour, minute = m.groups()",
    "print(level, hour, minute)",
    ["print(levl)", "name"],
    ["print(re.split(r\"\\s+\", log)", "paren"],
  ]),
  mkBug("regex", "medium", [
    "import re",
    "",
    "pattern = re.compile(r\"(?P<key>\\w+)=(?P<val>\\w+)\")",
    "text = \"a=1 b=2\"",
    ["for m in pattern.finditer(text)", "colon"],
    "    print(m.group(\"key\"), m.group(\"val\"))",
    ["print(ptatern.sub(r\"\\g<val>\", text))", "name"],
  ]),
  mkBug("regex", "medium", [
    "import re",
    "",
    "def clean(s):",
    "    return re.sub(r\"\\s+\", \" \", s).strip()",
    "",
    "print(clean(\"  a   b  \"))",
    ["print(clen(\"x  y\"))", "name"],
    ["print(clean('z   w))", "quote"],
  ]),
  mkBug("regex", "medium", [
    "import re",
    "",
    "words = [\"cat\", \"car\", \"dog\"]",
    "hits = [w for w in words if re.match(r\"ca.\", w)]",
    "print(hits)",
    ["print([w for w in words if re.search(r\"o\", w])", "paren"],
    ["for h in hitz:", "name"],
    "    print(h)",
  ]),
  mkBug("regex", "hard", [
    "import re",
    "",
    "text = \"price: $12, $7\"",
    ["nums = re.findall(r\"\\$(\\d+)\", txet)", "name"],
    ["print(sum(int(n) for n in nums)", "paren"],
    ["print(re.sub(r\"\\$(\\d+)\", r\"\\1 USD\", txet))", "name"],
  ]),
  mkBug("regex", "hard", [
    "import re",
    "",
    "date = \"2026-10-19\"",
    "m = re.fullmatch(r\"(\\d{4})-(\\d{2})-(\\d{2})\", date)",
    ["if m", "colon"],
    "    y, mo, d = map(int, m.groups())",
    "    print(y, mo, d)",
    "else:",
    ["print(\"bad date\")", "indent"],
    ["print(re.findall(r\"\\b\\w{3}\\b\", \"the cat sat\")", "paren"],
  ]),
  mkBug("regex", "easy", [
    "import re",
    "",
    "text = \"order 66 and 7\"",
    ["numbers = re.findall(r\"\\d+\", text", "paren"],
    ["print(nmubers)", "name"],
  ]),
  mkBug("regex", "easy", [
    "import re",
    "",
    "word = \"python\"",
    ["if re.match(\"py\", word)", "colon"],
    "    print(\"starts with py\")",
    "else:",
    ["    print(wrod)", "name"],
  ]),
  mkBug("regex", "medium", [
    "import re",
    "",
    "email = \"ana@site.com\"",
    "pattern = r\"^[a-z]+@[a-z]+\\.com$\"",
    ["if re.match(pattern, email)", "colon"],
    "    print(\"valid\")",
    ["msg = \"checked", "quote"],
    "print(msg)",
  ]),
  mkBug("regex", "medium", [
    "import re",
    "",
    "text = \"a1b22c333\"",
    ["parts = re.split(r\"\\d+\", text", "paren"],
    "print(parts)",
    "for p in parts:",
    ["print(p)", "indent"],
  ]),
  mkBug("regex", "hard", [
    "import re",
    "",
    "log = \"id=7 ok id=12 fail id=5 ok\"",
    "ids = re.findall(r\"id=(\\d+)\", log)",
    "total = 0",
    ["for i in ids", "colon"],
    "    total += int(i)",
    ["print(\"sum\", totl)", "name"],
    ["print(\"count\", len(ids)", "paren"],
  ]),

  // ---------- pygame ----------
  mkBug("pygame", "medium", [
    "import pygame",
    "",
    "pygame.init()",
    "screen = pygame.display.set_mode((400, 300))",
    "player = pygame.Rect(50, 50, 40, 40)",
    "running = True",
    "while running:",
    ["    for event in pygame.event.get()", "colon"],
    "        if event.type == pygame.QUIT:",
    "            running = False",
    "    screen.fill((0, 0, 0))",
    ["    pygame.draw.rect(screen, (255, 0, 0), player", "paren"],
    "    pygame.display.flip()",
    "pygame.quit()",
  ]),
  mkBug("pygame", "easy", [
    "import pygame",
    "",
    "pygame.init()",
    ["screen = pygame.display.set_mode((300, 200)", "paren"],
    "clock = pygame.time.Clock()",
    "title = \"My Game\"",
    "pygame.display.set_caption(title)",
    ["pgyame.quit()", "name"],
  ]),
  mkBug("pygame", "easy", [
    "import pygame",
    "",
    "player = pygame.Rect(0, 0, 20, 20)",
    "speed = 5",
    "player.x += speed",
    "print(player.x, player.y)",
    ["print(plyer.right)", "name"],
    ["print(\"moved)", "quote"],
  ]),
  mkBug("pygame", "easy", [
    "import pygame",
    "",
    "pygame.init()",
    "screen = pygame.display.set_mode((200, 200))",
    "RED = (255, 0, 0)",
    "screen.fill(RED)",
    "pygame.display.flip()",
    "pygame.time.wait(100)",
    "pygame.quit()",
    ["print(\"closed')", "quote"],
    ["pygame.dispay.flip()", "name"],
  ]),
  mkBug("pygame", "medium", [
    "import pygame",
    "",
    "a = pygame.Rect(0, 0, 50, 50)",
    "b = pygame.Rect(40, 40, 50, 50)",
    ["if a.colliderect(b)", "colon"],
    "    print(\"hit\")",
    "else:",
    "    print(\"miss\")",
    ["print(a.clip(b)", "paren"],
  ]),
  mkBug("pygame", "medium", [
    "import pygame",
    "",
    "pygame.init()",
    "keys = {pygame.K_LEFT: -1, pygame.K_RIGHT: 1}",
    "x = 100",
    "for key, step in keys.items():",
    "    x += step",
    "print(x)",
    ["print(kyes)", "name"],
    ["print(pygame.K_LEFT in keys", "paren"],
  ]),
  mkBug("pygame", "medium", [
    "import pygame",
    "",
    "class Ball:",
    "    def __init__(self):",
    "        self.rect = pygame.Rect(10, 10, 16, 16)",
    "        self.vx = 3",
    "",
    "    def update(self):",
    "        self.rect.x += self.vx",
    ["        if self.rect.right > 200", "colon"],
    "            self.vx = -self.vx",
    "",
    ["b = Blal()", "name"],
    "b.update()",
    "print(b.rect.x)",
  ]),
  mkBug("pygame", "medium", [
    "import pygame",
    "",
    "pygame.init()",
    "font = pygame.font.Font(None, 24)",
    "text = font.render(\"Score: 0\", True, (255, 255, 255))",
    "screen = pygame.display.set_mode((200, 100))",
    "screen.blit(text, (10, 10))",
    "pygame.display.flip()",
    "print(text.get_width() > 0)",
    ["print(text.get_widht())", "name"],
    ["print('ok)", "quote"],
  ]),
  mkBug("pygame", "hard", [
    "import pygame",
    "",
    "class Player(pygame.sprite.Sprite):",
    "    def __init__(self):",
    "        super().__init__()",
    ["        self.image = pgyame.Surface((20, 20))", "name"],
    "        self.rect = self.image.get_rect()",
    "        self.speed = 4",
    "",
    ["    def update(self, keys)", "colon"],
    "        if keys[pygame.K_LEFT]:",
    "            self.rect.x -= self.speed",
    "        if keys[pygame.K_RIGHT]:",
    "            self.rect.x += self.speed",
    "",
    ["group = pygame.sprite.Group(Player()", "paren"],
    "print(len(group))",
  ]),
  mkBug("pygame", "hard", [
    "import pygame",
    "",
    "pygame.init()",
    "screen = pygame.display.set_mode((300, 200))",
    "clock = pygame.time.Clock()",
    "x = 0",
    "for frame in range(3):",
    "    x += 100 * clock.tick(60) / 1000",
    "    screen.fill((0, 0, 0))",
    "    pygame.draw.circle(screen, (0, 255, 0), (int(x), 100), 10)",
    ["    pgyame.display.flip()", "name"],
    "print(round(x))",
    "pygame.quit()",
    ["print(frme)", "name"],
    ["print(clock.get_fps()", "paren"],
  ]),
  mkBug("pygame", "easy", [
    "import pygame",
    "",
    "pygame.init()",
    ["screen = pygame.display.set_mode((400, 300)", "paren"],
    ["player = pgyame.Rect(10, 10, 40, 40)", "name"],
    "print(player.width)",
  ]),
  mkBug("pygame", "easy", [
    "import pygame",
    "",
    "box = pygame.Rect(0, 0, 50, 30)",
    "box.x += 20",
    ["print(box.right, bxo.y)", "name"],
    ["print(\"moved)", "quote"],
  ]),
  mkBug("pygame", "medium", [
    "import pygame",
    "",
    "player = pygame.Rect(0, 0, 40, 40)",
    "wall = pygame.Rect(30, 0, 40, 40)",
    "speed = 5",
    ["if player.colliderect(wall)", "colon"],
    "    speed = 0",
    "print(speed)",
    ["print(playr.x)", "name"],
  ]),
  mkBug("pygame", "medium", [
    "import pygame",
    "",
    "pygame.init()",
    "screen = pygame.display.set_mode((300, 200))",
    "running = True",
    "frames = 0",
    ["while running", "colon"],
    "    frames += 1",
    "    if frames > 3:",
    "        running = False",
    ["print(\"frames\", frames", "paren"],
    "pygame.quit()",
  ]),
  mkBug("pygame", "hard", [
    "import pygame",
    "",
    "pygame.init()",
    "screen = pygame.display.set_mode((300, 200))",
    "player = pygame.Rect(100, 100, 20, 20)",
    "keys = {\"left\": True, \"right\": False}",
    "def move(rect, keys):",
    "    if keys[\"left\"]:",
    ["rect.x -= 5", "indent"],
    "    if keys[\"right\"]:",
    "        rect.x += 5",
    "    return rect.x",
    ["print(move(player, keys)", "paren"],
    ["print(\"end)", "quote"],
  ]),

  // ---------- tkinter ----------
  mkBug("tkinter", "medium", [
    "import tkinter as tk",
    "",
    "root = tk.Tk()",
    "count = tk.IntVar(value=0)",
    "",
    ["def add()", "colon"],
    "    count.set(count.get() + 1)",
    "",
    ["btn = tk.Button(root, text=\"+\", command=add", "paren"],
    "btn.pack()",
    ["print(cont.get())", "name"],
  ]),
  mkBug("tkinter", "easy", [
    "import tkinter as tk",
    "",
    "root = tk.Tk()",
    ["root.title(\"Hello)", "quote"],
    "label = tk.Label(root, text=\"Hi\")",
    "label.pack()",
    ["print(lable[\"text\"])", "name"],
  ]),
  mkBug("tkinter", "easy", [
    "import tkinter as tk",
    "",
    "root = tk.Tk()",
    "entry = tk.Entry(root)",
    "entry.insert(0, \"abc\")",
    ["print(entry.get()", "paren"],
    "entry.delete(0, tk.END)",
    ["print(repr(etnry.get()))", "name"],
  ]),
  mkBug("tkinter", "easy", [
    "import tkinter as tk",
    "",
    "root = tk.Tk()",
    "name = tk.StringVar(value=\"Ana\")",
    "label = tk.Label(root, textvariable=name)",
    "label.pack()",
    "name.set(\"Bo\")",
    "print(name.get())",
    ["print(nam.get())", "name"],
    ["print('done)", "quote"],
  ]),
  mkBug("tkinter", "medium", [
    "import tkinter as tk",
    "",
    "def on_click():",
    "    print(\"clicked\")",
    "",
    "root = tk.Tk()",
    "btn = tk.Button(root, text=\"Go\", command=on_click)",
    "btn.pack()",
    "btn.invoke()",
    "btn.config(state=\"disabled\")",
    "print(btn[\"state\"])",
    ["print(bnt[\"state\"])", "name"],
    ["btn.config(text=\"Done\"", "paren"],
  ]),
  mkBug("tkinter", "medium", [
    "import tkinter as tk",
    "",
    "root = tk.Tk()",
    "frame = tk.Frame(root)",
    "frame.pack()",
    ["for i in range(3)", "colon"],
    "    tk.Label(frame, text=str(i)).grid(row=i, column=0)",
    "print(len(frame.winfo_children()))",
    ["print(frme)", "name"],
  ]),
  mkBug("tkinter", "medium", [
    "import tkinter as tk",
    "",
    "root = tk.Tk()",
    "var = tk.BooleanVar(value=False)",
    "check = tk.Checkbutton(root, text=\"Sound\", variable=var)",
    "check.pack()",
    "check.invoke()",
    "print(var.get())",
    ["print(\"state: \" + str(var.get())", "paren"],
    ["print(chek)", "name"],
  ]),
  mkBug("tkinter", "medium", [
    "import tkinter as tk",
    "",
    "root = tk.Tk()",
    "root.geometry(\"200x100\")",
    ["msg = tk.Label(root, text=\"Ready')", "quote"],
    "msg.pack()",
    "msg.config(text=\"Go\")",
    "print(msg.cget(\"text\"))",
    ["print(root.winfo_clas())", "name"],
  ]),
  mkBug("tkinter", "hard", [
    "import tkinter as tk",
    "",
    "class App:",
    "    def __init__(self, root):",
    "        self.root = root",
    "        self.n = tk.IntVar(value=0)",
    "        tk.Button(root, text=\"+\", command=self.inc).pack()",
    "",
    "    def inc(self):",
    "        self.n.set(self.n.get() + 1)",
    "",
    "root = tk.Tk()",
    ["app = App(root", "paren"],
    "print(app.n.get())",
    "app.inc()",
    ["print(app.m.get())", "name"],
  ]),
  mkBug("tkinter", "hard", [
    "import tkinter as tk",
    "",
    "root = tk.Tk()",
    "items = []",
    "",
    "def add(text):",
    ["    items.append(txet)", "name"],
    "",
    "for t in [\"a\", \"b\"]:",
    "    tk.Button(root, text=t, command=lambda t=t: add(t)).pack()",
    ["for w in root.winfo_children()", "colon"],
    "    w.invoke()",
    "print(items)",
    ["root.after_idle(lambda: print(\"idle\")", "paren"],
    "root.update_idletasks()",
  ]),
  mkBug("tkinter", "easy", [
    "import tkinter as tk",
    "",
    "root = tk.Tk()",
    ["label = tk.Label(root, text=\"Hello\"", "paren"],
    "label.pack()",
    ["print(lbael[\"text\"])", "name"],
  ]),
  mkBug("tkinter", "easy", [
    "import tkinter as tk",
    "",
    "root = tk.Tk()",
    ["root.title(\"My app)", "quote"],
    "entry = tk.Entry(root)",
    "entry.insert(0, \"hi\")",
    ["print(entyr.get())", "name"],
  ]),
  mkBug("tkinter", "medium", [
    "import tkinter as tk",
    "",
    "root = tk.Tk()",
    "clicks = tk.IntVar(value=0)",
    "",
    ["def add()", "colon"],
    "    clicks.set(clicks.get() + 1)",
    "",
    "add()",
    "add()",
    "print(clicks.get())",
    ["print(clciks.get())", "name"],
  ]),
  mkBug("tkinter", "medium", [
    "import tkinter as tk",
    "",
    "root = tk.Tk()",
    "text = tk.StringVar(value=\"a\")",
    "",
    "def grow():",
    "    text.set(text.get() + \"b\")",
    "",
    "grow()",
    ["if text.get() == \"ab\"", "colon"],
    "    print(\"ok\")",
    ["print(text.get()", "paren"],
  ]),
  mkBug("tkinter", "hard", [
    "import tkinter as tk",
    "",
    "root = tk.Tk()",
    "total = tk.IntVar(value=0)",
    "",
    "def add_all(values):",
    "    for v in values:",
    ["total.set(total.get() + v)", "indent"],
    "    return total.get()",
    "",
    ["print(add_all([1, 2, 3])", "paren"],
    ["msg = \"total is", "quote"],
  ]),
];
