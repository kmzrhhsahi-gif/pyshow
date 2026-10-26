// PyShow – short lessons for every topic (Persian and English; other languages show the English lesson).
// Loaded before ui.js.
const LESSONS = {
 "variables": {
  "code": "name = \"Sara\"\nage = 20\nprice = 9.5\nis_ok = True\nprint(name, age)          # Sara 20\nage = age + 1             # change the value\nprint(type(price))        # <class 'float'>",
  "run": true,
  "fa": {
   "t": "متغیرها",
   "p": [
    "متغیر یک اسم برای نگه‌داشتن یک مقدار است. با علامت = مقدار را در آن می‌گذاریم.",
    "نوع‌های اصلی: int (عدد صحیح)، float (اعشاری)، str (متن) و bool (True یا False).",
    "پایتون نوع را خودش تشخیص می‌دهد و هر وقت بخواهید می‌توانید مقدار متغیر را عوض کنید.",
    "با type(x) نوع و با print(x) مقدار را می‌بینید."
   ]
  },
  "en": {
   "t": "Variables",
   "p": [
    "A variable is a name that holds a value. Use = to put a value in it.",
    "Main types: int (whole number), float (decimal), str (text) and bool (True or False).",
    "Python finds the type itself, and you can change the value any time.",
    "type(x) shows the type and print(x) shows the value."
   ]
  }
 },
 "if": {
  "code": "age = 17\nif age >= 18:\n    print(\"adult\")\nelif age >= 13:\n    print(\"teen\")         # this one runs\nelse:\n    print(\"child\")\nprint(age > 10 and age < 20)   # True",
  "run": true,
  "fa": {
   "t": "شرط‌ها (if)",
   "p": [
    "if یک شرط را می‌سنجد؛ اگر درست (True) بود، بلوک زیرش اجرا می‌شود.",
    "elif شرط بعدی و else حالت «هیچ‌کدام» است. فقط اولین بلوک درست اجرا می‌شود.",
    "مقایسه‌ها: == (مساوی)، != (نامساوی)، <، >، <=، >=. با and، or و not شرط‌ها را ترکیب کنید.",
    "تورفتگی (چهار فاصله) مشخص می‌کند چه چیزی داخل بلوک است."
   ]
  },
  "en": {
   "t": "Conditions (if)",
   "p": [
    "if tests a condition; if it is True, the block under it runs.",
    "elif is the next condition and else means 'none of them'. Only the first true block runs.",
    "Comparisons: == (equal), != (not equal), <, >, <=, >=. Combine with and, or, not.",
    "The indentation (four spaces) shows what is inside the block."
   ]
  }
 },
 "loops": {
  "code": "for i in range(3):\n    print(i)              # 0 1 2\ntotal = 0\nn = 1\nwhile n <= 4:\n    total += n\n    n += 1\nprint(total)              # 10",
  "run": true,
  "fa": {
   "t": "حلقه‌ها",
   "p": [
    "for روی یک دنباله (مثل range، لیست یا رشته) می‌چرخد و هر بار یک عضو می‌دهد.",
    "range(3) یعنی 0، 1، 2 — عدد آخر شامل نمی‌شود.",
    "while تا وقتی شرطش درست است تکرار می‌کند؛ مراقب باشید شرط یک روز غلط شود وگرنه حلقه بی‌پایان است.",
    "break حلقه را قطع می‌کند و continue به دور بعد می‌رود."
   ]
  },
  "en": {
   "t": "Loops",
   "p": [
    "for goes over a sequence (range, a list or a string) and gives one item each time.",
    "range(3) means 0, 1, 2 — the last number is not included.",
    "while repeats as long as its condition is True; make sure it becomes False one day or the loop never ends.",
    "break stops the loop and continue jumps to the next round."
   ]
  }
 },
 "functions": {
  "code": "def area(w, h=1):\n    return w * h\n\nprint(area(3, 4))         # 12\nprint(area(5))            # 5   (h uses its default)\nprint(area(h=2, w=6))     # 12  (keyword arguments)",
  "run": true,
  "fa": {
   "t": "توابع",
   "p": [
    "تابع تکه‌کدی با یک اسم است که می‌توان بارها صدایش زد. با def ساخته می‌شود.",
    "ورودی‌ها پارامتر هستند و return مقدار را پس می‌دهد. تابعی که return ندارد، None برمی‌گرداند.",
    "پارامتر می‌تواند مقدار پیش‌فرض داشته باشد (h=1) و هنگام صدا زدن با نام هم می‌توان آن را داد.",
    "متغیرهای داخل تابع محلی‌اند و بیرون از آن دیده نمی‌شوند."
   ]
  },
  "en": {
   "t": "Functions",
   "p": [
    "A function is a named piece of code you can call many times. Make it with def.",
    "Inputs are parameters and return gives a value back. A function without return gives None.",
    "A parameter can have a default (h=1) and can be passed by name when calling.",
    "Variables made inside a function are local and not visible outside."
   ]
  }
 },
 "lists": {
  "code": "nums = [3, 1, 2]\nnums.append(5)\nprint(nums[0], nums[-1])  # 3 5\nprint(nums[1:3])          # [1, 2]\nnums.sort()\nprint(nums, len(nums))    # [1, 2, 3, 5] 4\nprint([n * 2 for n in nums])   # [2, 4, 6, 10]",
  "run": true,
  "fa": {
   "t": "لیست‌ها",
   "p": [
    "لیست چند مقدار را به ترتیب نگه می‌دارد و قابل تغییر است: [3, 1, 2].",
    "شماره‌گذاری از 0 شروع می‌شود و -1 یعنی آخرین عضو. نمایه‌ی بُرشی a[1:3] از 1 تا قبل از 3 را می‌دهد.",
    "متدهای پرکاربرد: append، remove، pop، sort و len.",
    "list comprehension راه کوتاه ساخت لیست است: [n * 2 for n in nums]."
   ]
  },
  "en": {
   "t": "Lists",
   "p": [
    "A list keeps several values in order and can be changed: [3, 1, 2].",
    "Counting starts at 0 and -1 is the last item. The slice a[1:3] gives items 1 up to (not including) 3.",
    "Common helpers: append, remove, pop, sort and len.",
    "A list comprehension is a short way to build a list: [n * 2 for n in nums]."
   ]
  }
 },
 "dicts": {
  "code": "user = {\"name\": \"Ali\", \"age\": 30}\nuser[\"city\"] = \"Tehran\"\nprint(user[\"name\"])            # Ali\nprint(user.get(\"job\", \"none\")) # none\nfor k, v in user.items():\n    print(k, v)\nprint(\"age\" in user)           # True",
  "run": true,
  "fa": {
   "t": "دیکشنری‌ها",
   "p": [
    "دیکشنری مقدارها را با «کلید» نگه می‌دارد: {\"name\": \"Ali\"}.",
    "با d[key] مقدار را می‌خوانید؛ اگر کلید نباشد خطای KeyError می‌آید. d.get(key, پیش‌فرض) امن‌تر است.",
    "با in وجود کلید را بررسی کنید و با d.items() روی کلید و مقدار با هم بچرخید.",
    "کلیدها باید یکتا و تغییرناپذیر باشند (مثل رشته یا عدد)."
   ]
  },
  "en": {
   "t": "Dictionaries",
   "p": [
    "A dictionary stores values under a 'key': {\"name\": \"Ali\"}.",
    "d[key] reads a value; a missing key raises KeyError. d.get(key, default) is safer.",
    "Use in to test a key and d.items() to loop over keys and values together.",
    "Keys must be unique and unchangeable (like a string or a number)."
   ]
  }
 },
 "strings": {
  "code": "s = \"Hello World\"\nprint(s.lower(), len(s))       # hello world 11\nprint(s[0], s[-5:])            # H World\nprint(s.split(\" \"))            # ['Hello', 'World']\nname = \"Sara\"\nprint(f\"Hi {name}!\")           # Hi Sara!\nprint(\"a,b\".replace(\",\", \"-\")) # a-b",
  "run": true,
  "fa": {
   "t": "رشته‌ها",
   "p": [
    "رشته یک متن است و مثل لیست شماره‌گذاری می‌شود، ولی تغییرناپذیر است.",
    "متدها نسخه‌ی جدید برمی‌گردانند: lower، upper، strip، replace، split و join.",
    "f-string راحت‌ترین راه جا دادن مقدار در متن است: f\"Hi {name}\".",
    "بُرش‌ها مثل لیست کار می‌کنند: s[-5:] پنج حرف آخر است."
   ]
  },
  "en": {
   "t": "Strings",
   "p": [
    "A string is text. It is numbered like a list, but cannot be changed in place.",
    "Methods return a new string: lower, upper, strip, replace, split and join.",
    "An f-string is the easiest way to put values in text: f\"Hi {name}\".",
    "Slices work like lists: s[-5:] is the last five characters."
   ]
  }
 },
 "errors": {
  "code": "try:\n    x = int(\"abc\")\nexcept ValueError:\n    print(\"not a number\")      # this runs\nfinally:\n    print(\"done\")              # always runs\ntry:\n    print(10 / 0)\nexcept ZeroDivisionError as e:\n    print(\"error:\", e)         # error: division by zero",
  "run": true,
  "fa": {
   "t": "خطاها و استثناها",
   "p": [
    "وقتی کد خطا بدهد (exception) برنامه می‌ایستد، مگر آن را بگیرید.",
    "کدی که ممکن است خطا بدهد را در try بگذارید و در except نوع خطا را مشخص کنید.",
    "بلوک finally همیشه اجرا می‌شود، چه خطا باشد چه نباشد.",
    "با raise خودتان هم می‌توانید خطا بدهید: raise ValueError(\"bad\")."
   ]
  },
  "en": {
   "t": "Errors and exceptions",
   "p": [
    "When code fails (an exception) the program stops unless you catch it.",
    "Put risky code in try and name the error type in except.",
    "The finally block always runs, with or without an error.",
    "You can raise your own error: raise ValueError(\"bad\")."
   ]
  }
 },
 "oop": {
  "code": "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return self.name + \" says woof\"\n\nclass Puppy(Dog):\n    def speak(self):\n        return super().speak() + \"!\"\n\nprint(Dog(\"Rex\").speak())      # Rex says woof\nprint(Puppy(\"Bo\").speak())     # Bo says woof!",
  "run": true,
  "fa": {
   "t": "برنامه‌نویسی شیءگرا",
   "p": [
    "class الگوی یک نوع شیء است و هر شیء یک نمونه (instance) از آن است.",
    "__init__ هنگام ساخت شیء اجرا می‌شود و self خودِ همان شیء است.",
    "وراثت: class Puppy(Dog) همه‌ی چیزهای Dog را می‌گیرد و می‌تواند متدها را عوض کند.",
    "super() به نسخه‌ی کلاس پدر دسترسی می‌دهد."
   ]
  },
  "en": {
   "t": "Object-oriented programming",
   "p": [
    "A class is the blueprint of a kind of object, and each object is an instance of it.",
    "__init__ runs when an object is made and self is that object.",
    "Inheritance: class Puppy(Dog) gets everything from Dog and may change methods.",
    "super() gives access to the parent class version."
   ]
  }
 },
 "decorators": {
  "code": "def shout(f):\n    def wrapper(*args):\n        return f(*args).upper() + \"!\"\n    return wrapper\n\n@shout\ndef greet(name):\n    return \"hi \" + name\n\nprint(greet(\"sara\"))           # HI SARA!",
  "run": true,
  "fa": {
   "t": "دکوراتورها",
   "p": [
    "دکوراتور تابعی است که یک تابع دیگر را می‌گیرد و نسخه‌ی تغییریافته‌اش را برمی‌گرداند.",
    "علامت @shout بالای def یعنی greet = shout(greet).",
    "داخل دکوراتور معمولاً یک wrapper می‌سازیم که قبل و بعد از تابع اصلی کاری می‌کند.",
    "کاربردها: زمان‌سنجی، لاگ، بررسی دسترسی و کش (functools.lru_cache)."
   ]
  },
  "en": {
   "t": "Decorators",
   "p": [
    "A decorator is a function that takes another function and returns a changed version.",
    "@shout above def means greet = shout(greet).",
    "Inside, we usually build a wrapper that does something before and after the original function.",
    "Uses: timing, logging, access checks and caching (functools.lru_cache)."
   ]
  }
 },
 "generators": {
  "code": "def count_up(n):\n    i = 1\n    while i <= n:\n        yield i\n        i += 1\n\ng = count_up(3)\nprint(next(g), next(g))        # 1 2\nprint(list(count_up(4)))       # [1, 2, 3, 4]\nprint(sum(x * x for x in range(4)))   # 14",
  "run": true,
  "fa": {
   "t": "ژنراتورها",
   "p": [
    "تابعی که yield دارد ژنراتور است: مقدارها را یکی‌یکی و در لحظه‌ی نیاز می‌دهد.",
    "هر بار next() صدا زده شود، تابع تا yield بعدی ادامه می‌دهد و همان‌جا می‌ایستد.",
    "حافظه کم مصرف می‌شود، چون همه‌ی مقدارها یک‌جا ساخته نمی‌شوند.",
    "عبارت ژنراتوری با پرانتز نوشته می‌شود: (x * x for x in range(4))."
   ]
  },
  "en": {
   "t": "Generators",
   "p": [
    "A function with yield is a generator: it gives values one by one, when needed.",
    "Each next() call continues the function up to the next yield and pauses there.",
    "It saves memory because the values are not all built at once.",
    "A generator expression uses parentheses: (x * x for x in range(4))."
   ]
  }
 },
 "recursion": {
  "code": "def fact(n):\n    if n <= 1:                 # base case\n        return 1\n    return n * fact(n - 1)     # smaller problem\n\nprint(fact(5))                 # 120\n\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\nprint([fib(i) for i in range(7)])   # [0, 1, 1, 2, 3, 5, 8]",
  "run": true,
  "fa": {
   "t": "بازگشت (Recursion)",
   "p": [
    "تابع بازگشتی خودش را با یک مسئله‌ی کوچک‌تر صدا می‌زند.",
    "هر تابع بازگشتی به «حالت پایه» نیاز دارد که بدون صدا زدن دوباره جواب بدهد، وگرنه تا ابد ادامه می‌دهد.",
    "پایتون عمق بازگشت را محدود می‌کند (حدود ۱۰۰۰) و بعد RecursionError می‌دهد.",
    "اگر ساده‌تر با حلقه می‌شود، حلقه معمولاً سریع‌تر است."
   ]
  },
  "en": {
   "t": "Recursion",
   "p": [
    "A recursive function calls itself with a smaller problem.",
    "Every recursive function needs a base case that answers without calling again, or it never stops.",
    "Python limits the depth (about 1000) and then raises RecursionError.",
    "If a loop is simpler, the loop is usually faster."
   ]
  }
 },
 "async": {
  "code": "import asyncio\n\nasync def work(name, sec):\n    await asyncio.sleep(sec)\n    return name + \" done\"\n\nasync def main():\n    r = await asyncio.gather(work(\"a\", 0.2), work(\"b\", 0.1))\n    print(r)                   # ['a done', 'b done']\n\nasyncio.run(main())",
  "run": true,
  "fa": {
   "t": "برنامه‌نویسی ناهمزمان (async)",
   "p": [
    "async def یک «کوروتین» می‌سازد؛ با await منتظر یک کار می‌ماند، بدون اینکه بقیه‌ی برنامه بایستد.",
    "هنگام انتظار (مثلاً شبکه یا sleep) برنامه می‌تواند کار دیگری را جلو ببرد.",
    "asyncio.gather چند کوروتین را هم‌زمان اجرا می‌کند و نتیجه‌ها را به ترتیب می‌دهد.",
    "با asyncio.run(main()) برنامه شروع می‌شود. await فقط داخل async def مجاز است."
   ]
  },
  "en": {
   "t": "Async programming",
   "p": [
    "async def makes a 'coroutine'; await waits for a job without stopping the rest of the program.",
    "While it waits (network, sleep) the program can move other work forward.",
    "asyncio.gather runs several coroutines together and returns results in order.",
    "asyncio.run(main()) starts it. await is only allowed inside async def."
   ]
  }
 },
 "regex": {
  "code": "import re\n\ntext = \"Call 555-1234 or 555-9876\"\nprint(re.findall(r\"\\d{3}-\\d{4}\", text))   # ['555-1234', '555-9876']\nm = re.search(r\"(\\w+)@(\\w+)\\.com\", \"me: sara@site.com\")\nprint(m.group(1), m.group(2))              # sara site\nprint(re.sub(r\"\\s+\", \" \", \"a   b    c\"))   # a b c",
  "run": true,
  "fa": {
   "t": "عبارت‌های منظم (regex)",
   "p": [
    "regex الگویی برای جست‌وجو در متن است. ماژول re در پایتون آن را اجرا می‌کند.",
    "نشانه‌ها: \\d رقم، \\w حرف/رقم، \\s فاصله، . هر نویسه، + یک یا بیشتر، * صفر یا بیشتر، {3} دقیقاً سه بار.",
    "پرانتز بخشی را «گروه» می‌کند که با m.group(1) برمی‌گردد.",
    "توابع: findall، search، match، sub. الگو را با r\"...\" بنویسید تا \\ مشکل نسازد."
   ]
  },
  "en": {
   "t": "Regular expressions (regex)",
   "p": [
    "A regex is a pattern for searching text. Python's re module runs it.",
    "Symbols: \\d digit, \\w letter/digit, \\s space, . any character, + one or more, * zero or more, {3} exactly three.",
    "Parentheses make a 'group' you get with m.group(1).",
    "Functions: findall, search, match, sub. Write the pattern as r\"...\" so \\ causes no trouble."
   ]
  }
 },
 "pygame": {
  "code": "import pygame\npygame.init()\nscreen = pygame.display.set_mode((400, 300))\nclock = pygame.time.Clock()\nx = 0\nrunning = True\nwhile running:\n    for e in pygame.event.get():\n        if e.type == pygame.QUIT:\n            running = False\n    x = (x + 3) % 400\n    screen.fill((20, 20, 40))\n    pygame.draw.circle(screen, (255, 200, 0), (x, 150), 20)\n    pygame.display.flip()\n    clock.tick(60)\npygame.quit()",
  "run": false,
  "fa": {
   "t": "Pygame",
   "p": [
    "Pygame کتابخانه‌ای برای ساخت بازی است (نصب: pip install pygame).",
    "هر بازی یک «حلقه‌ی اصلی» دارد: رویدادها را بخوان، وضعیت را عوض کن، صفحه را بکش، نمایش بده.",
    "pygame.display.flip() تصویر ساخته‌شده را روی صفحه می‌آورد و clock.tick(60) سرعت را روی ۶۰ فریم در ثانیه نگه می‌دارد.",
    "رنگ‌ها با سه عدد (R, G, B) از 0 تا 255 داده می‌شوند. این مثال در مرورگر اجرا نمی‌شود؛ آن را روی کامپیوتر امتحان کنید."
   ]
  },
  "en": {
   "t": "Pygame",
   "p": [
    "Pygame is a library for making games (install: pip install pygame).",
    "Every game has a main loop: read events, change the state, draw, show.",
    "pygame.display.flip() shows the drawn picture and clock.tick(60) keeps 60 frames per second.",
    "Colours are three numbers (R, G, B) from 0 to 255. This example does not run in the browser; try it on your computer."
   ]
  }
 },
 "tkinter": {
  "code": "import tkinter as tk\n\nroot = tk.Tk()\nroot.title(\"Hello\")\nlabel = tk.Label(root, text=\"0\")\nlabel.pack()\ncount = 0\n\ndef click():\n    global count\n    count += 1\n    label.config(text=str(count))\n\ntk.Button(root, text=\"Add\", command=click).pack()\nroot.mainloop()",
  "run": false,
  "fa": {
   "t": "Tkinter",
   "p": [
    "Tkinter کتابخانه‌ی پنجره و دکمه در خود پایتون است و نصب جدا نمی‌خواهد.",
    "هر چیز در پنجره یک «ویجت» است (Label، Button، Entry) و با pack یا grid در پنجره چیده می‌شود.",
    "command=تابع مشخص می‌کند با کلیک دکمه کدام تابع اجرا شود (بدون پرانتز!).",
    "root.mainloop() پنجره را باز نگه می‌دارد. این مثال در مرورگر اجرا نمی‌شود؛ روی کامپیوتر امتحان کنید."
   ]
  },
  "en": {
   "t": "Tkinter",
   "p": [
    "Tkinter is Python's built-in window and button library; nothing to install.",
    "Everything in the window is a 'widget' (Label, Button, Entry) placed with pack or grid.",
    "command=function sets what runs on click (without parentheses!).",
    "root.mainloop() keeps the window open. This example does not run in the browser; try it on your computer."
   ]
  }
 }
};
