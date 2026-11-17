/**
 * KOPI CORNER — all business text and product data lives in this file.
 * Edit words, prices, hours and contact details here; the design reads from it.
 *
 * Anything in [square brackets] is a placeholder you still need to replace.
 * Notes from regulars are SAMPLES and are labelled that way on the site.
 */

export const business = {
  name: 'Kopi Corner',
  shortDescription: 'A neighbourhood cafe for fresh Sri Lankan kopi, Ceylon tea and short eats baked each morning.',
  city: '[Colombo]',
  country: 'Sri Lanka',
  address: ['[Street address]', '[Neighbourhood], [Colombo]', 'Sri Lanka'],
  phoneDisplay: '[Phone number]',
  phoneHref: 'tel:[phone-number]',
  whatsappNumber: '[WhatsApp number, digits only, e.g. 94XXXXXXXXX]',
  whatsappDisplay: '[WhatsApp number]',
  email: '[hello@your-cafe-email]',
  /** Google Maps link for the "Get directions" button. */
  directionsUrl: 'https://www.google.com/maps/search/?api=1&query=[Kopi+Corner+address]',
  /** Paste a Google Maps "Embed a map" src here to replace the map placeholder. Leave empty to show the placeholder. */
  mapEmbedUrl: '',
  /** Formspree endpoint, e.g. https://formspree.io/f/abcdwxyz */
  formspreeEndpoint: 'https://formspree.io/f/[your-form-id]',
  openedYear: '[year opened]',
};

/** Friendly pre-filled WhatsApp message. */
export const whatsappMessage =
  "Hi Kopi Corner! Could you have this ready for me when I arrive? My order: ";

export const whatsappHref = (message: string = whatsappMessage) =>
  `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const hours = [
  { days: '[Monday – Friday]', time: '[6:30 am – 6:00 pm]' },
  { days: '[Saturday]', time: '[7:00 am – 6:00 pm]' },
  { days: '[Sunday]', time: '[7:30 am – 1:00 pm]' },
];

export const firstPour = '[6:30 am]';

export const studio = {
  name: 'Depthwyn',
  url: '[your Depthwyn website address]',
  note: 'Concept project designed by',
  noteEnd: 'Not a real business.',
};

export const nav = [
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
  { label: 'Visit', href: '/visit' },
];

/* ------------------------------------------------------------------ */
/* Pages: titles and meta descriptions                                 */
/* ------------------------------------------------------------------ */

export const pages = {
  home: {
    title: 'Kopi Corner · Your morning starts here',
    description:
      'A neighbourhood cafe in [Colombo]. Locally roasted Sri Lankan kopi, Ceylon tea brewed properly and short eats baked each morning. See you tomorrow.',
  },
  menu: {
    title: 'Menu · Kopi Corner',
    description:
      'Fresh kopi hot or iced, Ceylon tea, short eats and pastries baked each morning, simple breakfast plates and beans to take home.',
  },
  about: {
    title: 'About · Kopi Corner',
    description:
      'A cafe that feels like a neighbour’s kitchen. Local coffee, a morning bake and a counter that knows your name.',
  },
  visit: {
    title: 'Visit & contact · Kopi Corner',
    description:
      'Find Kopi Corner in [Colombo]: opening hours, map, directions, WhatsApp ordering and a short contact form.',
  },
  notFound: {
    title: 'Page not found · Kopi Corner',
    description: 'This page is closed, but the cafe is open.',
  },
};

/* ------------------------------------------------------------------ */
/* Home: the story, scene by scene                                      */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: `Kopi Corner · ${business.city}`,
  hook: 'Your morning starts here.',
  hookLine: 'A real cup and a quiet minute, before the day rushes in.',
  turn: 'The cafe wakes up.',
  turnLine: `The shutter goes up at ${firstPour}. The kopi is poured, the oven is warm.`,
  scrollCue: 'Scroll to open up',
};

export const proof = {
  title: 'What makes the cup good.',
  intro: 'Nothing fancy. Just three things we do every single morning.',
  items: [
    {
      id: 'beans',
      kicker: 'The beans',
      stamp: 'Roasted in Sri Lanka · Batch [no.]',
      title: 'Roasted close to home.',
      body: 'Sri Lankan coffee, roasted locally in small batches by [roaster name]. Fresh beans, ground for your cup, not weeks ago in a warehouse.',
      photo: 'Freshly roasted beans in a scoop',
      note: { text: 'You can smell the roast from the bus stop. Best wake-up call I know.', who: '[Regular’s first name]' },
    },
    {
      id: 'bake',
      kicker: 'The morning bake',
      stamp: 'Out of the oven · [time]',
      title: 'Out of the oven before you’re out of bed.',
      body: 'The oven goes on at [5:30 am]. Fish buns, rolls and butter cake come out warm, just as the shutter rolls up.',
      photo: 'A tray of short eats fresh from the oven',
      note: { text: 'A warm fish bun at 7:45 and I can face any meeting.', who: '[Regular’s first name]' },
    },
    {
      id: 'regulars',
      kicker: 'The regulars',
      stamp: 'The regulars’ book',
      title: 'We know your order.',
      body: 'Come by twice and we’ll remember your name. By the third time, your kopi might be on the counter before you ask.',
      photo: 'Regulars chatting at the counter',
      note: { text: 'They started my iced kopi when they saw me crossing the road.', who: '[Regular’s first name]' },
    },
  ],
  ctaTitle: 'Taste it tomorrow morning.',
  ctaLine: `Open from ${firstPour}. Walk in, or message ahead.`,
};

export const offer = {
  title: 'Today, on the board.',
  line: 'Written up fresh every morning. The full menu has everything.',
  boardHeading: 'Today’s board',
  boardDate: '[today’s date]',
};

export const ease = {
  title: 'Skip the queue.',
  line: 'Two ways to get your morning sorted.',
  counter: {
    kicker: 'At the counter',
    docketNo: 'No. [—]',
    link: 'Find the counter',
    title: 'Just walk in.',
    body: 'Say hello, order, and we’ll call your name when it’s ready. Most mornings it takes [3 minutes].',
  },
  whatsapp: {
    kicker: 'On WhatsApp',
    title: 'Message ahead.',
    body: 'Send your order on the way and it’ll be waiting on the counter when you arrive.',
    bubble: 'Hi Kopi Corner! One iced kopi and a fish bun please, I’ll be there at 8:10.',
    bubbleLabel: 'Example message',
    bubbleTime: '[time]',
    button: 'Order on WhatsApp',
  },
};

export const invitation = {
  title: ['See you', 'tomorrow.'],
  line: 'Pull up a stool. The kopi’s on.',
  directions: 'Get directions',
};

/* ------------------------------------------------------------------ */
/* Menu                                                                 */
/* ------------------------------------------------------------------ */

export type MenuItem = { name: string; note?: string; price: string };
export type MenuCategory = {
  id: string;
  title: string;
  boardName: string;
  line: string;
  photo: string;
  items: MenuItem[];
};

const P = '[Rs. ___]';

export const menu: MenuCategory[] = [
  {
    id: 'kopi',
    title: 'Fresh kopi',
    boardName: 'Kopi, hot or iced',
    line: 'Locally roasted Sri Lankan coffee, ground for every cup.',
    photo: 'A cup of hot kopi and a glass of iced kopi',
    items: [
      { name: 'Black kopi', note: 'Hot or iced', price: P },
      { name: 'Kopi with milk', note: 'Hot or iced', price: P },
      { name: 'Kopi with condensed milk', note: 'The sweet, old-school way', price: P },
      { name: 'Double kopi', note: 'For the big meeting days', price: P },
    ],
  },
  {
    id: 'tea',
    title: 'Ceylon tea',
    boardName: 'Ceylon tea',
    line: 'Brewed properly, in a pot, with time to steep.',
    photo: 'A pot of Ceylon tea being poured',
    items: [
      { name: 'Plain tea', note: 'Black, with or without sugar', price: P },
      { name: 'Milk tea', note: 'Strong and creamy', price: P },
      { name: 'Ginger tea', note: 'Fresh ginger, good for rainy mornings', price: P },
      { name: 'Iced lemon tea', price: P },
    ],
  },
  {
    id: 'short-eats',
    title: 'Short eats & pastries',
    boardName: 'Short eats, fresh from the oven',
    line: 'Baked here each morning. When they’re gone, they’re gone.',
    photo: 'Fish buns, rolls and patties on the counter',
    items: [
      { name: 'Fish bun', price: P },
      { name: 'Vegetable roti', price: P },
      { name: 'Chicken patty', price: P },
      { name: 'Egg roll', price: P },
      { name: 'Seeni sambol bun', price: P },
      { name: 'Butter cake, by the slice', price: P },
    ],
  },
  {
    id: 'breakfast',
    title: 'Breakfast plates',
    boardName: 'Simple breakfast plates',
    line: 'Plain, filling food to start the day well.',
    photo: 'A simple breakfast plate on the wooden counter',
    items: [
      { name: 'Toast & eggs', note: 'Fried or scrambled, with butter and jam', price: P },
      { name: 'String hoppers', note: 'With dhal curry and pol sambol', price: P },
      { name: 'Kiribath', note: 'With lunu miris', price: P },
    ],
  },
  {
    id: 'beans',
    title: 'Beans to take home',
    boardName: 'Beans to take home',
    line: 'The same beans we pour, packed for your own kitchen.',
    photo: 'Bags of coffee beans on a shelf',
    items: [
      { name: '[House roast], 250 g', note: 'Whole bean or ground for your brewer', price: P },
      { name: '[House roast], 500 g', note: 'Whole bean or ground for your brewer', price: P },
    ],
  },
];

/** The short version chalked onto the board on the Home page. */
export const boardLines = menu.map((c) => ({ id: c.id, name: c.boardName, price: `from ${P}` }));

export const menuPage = {
  title: 'The whole board.',
  line: 'Everything we make, from the first pour to the last fish bun. Prices are per item.',
  note: 'Got an allergy or a question about ingredients? Ask at the counter, we’ll tell you exactly what’s in it.',
};

/* ------------------------------------------------------------------ */
/* About                                                                */
/* ------------------------------------------------------------------ */

export const about = {
  title: 'A neighbour’s kitchen, with better coffee.',
  intro:
    'Kopi Corner started with a simple idea: the first cup of the day should be a good one, and you shouldn’t have to queue behind a hundred strangers to get it.',
  paragraphs: [
    `We opened on this corner in ${business.openedYear}. Since then, the routine hasn’t changed much: roast close to home, bake early, open the shutter, and say good morning to the same faces.`,
    'We’re small on purpose. A short menu, a wooden counter, a few stools, and enough time to ask how your week is going.',
  ],
  morningTitle: 'A morning at Kopi Corner.',
  morningLine: 'From a dark street to a full counter.',
  morning: [
    { time: '[5:30 am]', title: 'The oven goes on', body: 'Dough from last night goes in. The street is still asleep.' },
    { time: '[6:00 am]', title: 'First grind', body: 'We taste the day’s coffee before anyone else does.' },
    { time: firstPour, title: 'Shutter up', body: 'Lights on, board written, first regulars at the counter.' },
    { time: '[8:00 am]', title: 'The office rush', body: 'WhatsApp orders lined up on the counter, names on every cup.' },
    { time: '[10:00 am]', title: 'Students settle in', body: 'Second cups, open notebooks, the slow part of the morning.' },
    { time: '[Afternoon]', title: 'Beans to take home', body: 'Fresh bags packed for tomorrow’s first cup at home.' },
  ],
  peopleTitle: 'The people behind the counter.',
  peopleLine: 'Say hello to [team member names]. They’ll probably remember your order before you do.',
};

/* ------------------------------------------------------------------ */
/* Visit / contact                                                      */
/* ------------------------------------------------------------------ */

export const visit = {
  title: 'See you tomorrow.',
  line: `On the corner of [street name] and [street name], ${business.city}. [What to look out for, e.g. a landmark next door].`,
  gettingHere: 'Getting here',
  gettingHereBody: '[Nearest bus stop or landmark]. [Parking or tuk-tuk drop-off notes].',
  contactTitle: 'Say hello.',
  contactLine: 'For quick orders, WhatsApp is fastest. For anything else, send a note.',
  form: {
    name: 'Your name',
    contact: 'Email or phone',
    message: 'Message',
    messagePlaceholder: 'A question, a big order for the office, anything.',
    submit: 'Send message',
    sending: 'Sending…',
    success: 'Thank you! We’ll get back to you soon.',
    error: 'Sorry, that didn’t send. Please try WhatsApp instead.',
    notConnected: 'This form isn’t connected yet. Add your Formspree form ID in src/content/site.ts.',
  },
};

/* ------------------------------------------------------------------ */
/* Chat helper (scripted, no AI)                                        */
/* ------------------------------------------------------------------ */

export const chat = {
  title: 'Ask the counter',
  greeting: 'Good morning! I’m a little helper with quick answers. What would you like to know?',
  fallback:
    'I’m only a simple helper, so I can’t answer that one. The team can, though: send a WhatsApp message or use the contact form.',
  inputLabel: 'Type a question',
  placeholder: 'e.g. what time do you open?',
  answers: [
    {
      id: 'hours',
      label: 'Opening hours',
      keywords: ['open', 'opening', 'hours', 'close', 'closing', 'time', 'when', 'sunday', 'saturday', 'today'],
      text: `We’re open ${hours.map((h) => `${h.days} ${h.time}`).join(', ')}.`,
    },
    {
      id: 'where',
      label: 'Where are you?',
      keywords: ['where', 'address', 'location', 'find', 'map', 'directions', 'parking', 'bus'],
      text: `You’ll find us at ${business.address.join(', ')}. Tap “Get directions” on the Visit page for the map.`,
      link: { label: 'Open the Visit page', href: '/visit' },
    },
    {
      id: 'order',
      label: 'Order ahead',
      keywords: ['order', 'ahead', 'whatsapp', 'pickup', 'pick up', 'ready', 'takeaway', 'take away'],
      text: 'Send your order on WhatsApp and we’ll have it waiting on the counter when you arrive.',
      link: { label: 'Message on WhatsApp', href: 'whatsapp' },
    },
    {
      id: 'menu',
      label: 'What’s on the menu?',
      keywords: ['menu', 'price', 'prices', 'coffee', 'kopi', 'tea', 'food', 'eat', 'breakfast', 'short eats', 'bun', 'iced'],
      text: 'Fresh kopi hot or iced, Ceylon tea, short eats baked each morning, simple breakfast plates and beans to take home.',
      link: { label: 'See the full menu', href: '/menu' },
    },
    {
      id: 'beans',
      label: 'Beans to take home',
      keywords: ['beans', 'bag', 'buy', 'ground', 'whole bean', 'home', 'roast'],
      text: 'Yes! Our house roast comes in [250 g and 500 g] bags, whole bean or ground for your brewer.',
      link: { label: 'Bean prices', href: '/menu#beans' },
    },
    {
      id: 'wifi',
      label: 'Wi-Fi & laptops',
      keywords: ['wifi', 'wi-fi', 'internet', 'laptop', 'study', 'work', 'plug', 'socket'],
      text: '[Wi-Fi details and laptop policy, e.g. free Wi-Fi, laptops welcome after 10 am].',
    },
  ],
};
