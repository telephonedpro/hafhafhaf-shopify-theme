/**
 * The four Parveja feeders. All copy, prices and specifications are taken
 * from the live parveja.com product pages; nothing here is invented.
 */
export type Tone = "butter" | "sky" | "pink" | "lilac";

export type Feeder = {
  slug: "essential" | "view" | "preserve" | "horizon";
  name: string;
  /** Product URL on the live store, where checkout happens. */
  shopUrl: string;
  fullTitle: string;
  seoTitle: string;
  label: string;
  short: string;
  tagline: string;
  price: number;
  capacity: string;
  tone: Tone;
  intro: string;
  highlights: string[];
  bestFor: string;
  storage: string;
  camera: string;
  feature: { eyebrow: string; title: [string, string]; text: string; cards: { title: string; text: string }[] };
  specs: [string, string][];
  faqs: [string, string][];
  details: string[];
  keyFeatures: string[];
  note: string;
  images: { main: string; gallery: string[] };
};

const shop = (handle: string) => `https://parveja.com/products/${handle}`;
const img = (name: string) => `/images/${name}.webp`;

export const FEEDERS: Feeder[] = [
  {
    slug: "essential",
    name: "Essential",
    shopUrl: shop("parveja-essential-5l-wifi-automatic-pet-feeder"),
    fullTitle: "Parveja Essential 5L Wi-Fi Automatic Pet Feeder",
    seoTitle: "5L Wi-Fi Automatic Cat & Dog Feeder | Parveja Essential",
    label: "Everyday essentials",
    short: "Starting point",
    tagline: "Everyday feeding, simplified.",
    price: 199,
    capacity: "5L / 21 cups",
    tone: "butter",
    intro:
      "Plan meals, set portions and keep their routine running from your phone. A 5L reservoir and sealed food storage make everyday feeding simpler.",
    highlights: [
      "5L capacity with sealed food storage",
      "Wi-Fi app scheduling & portion control",
      "Up to 10-second mealtime voice recording",
      "3 × D-cell backup option; batteries not included",
    ],
    bestFor: "Simple everyday feeding",
    storage: "Twist-lock lid, sealed storage, desiccant compartment",
    camera: "Without a camera",
    feature: {
      eyebrow: "Everyday, on schedule",
      title: ["Set the schedule.", "Keep their routine."],
      text: "A little planning goes a long way. Schedule meals and adjust portions in the Wi-Fi app, while the twist-lock lid and desiccant compartment help protect dry food between feeds. A familiar recorded message can call them to the bowl.",
      cards: [
        { title: "Meal scheduling", text: "Plan feeding times in the companion app, then review their feeding records." },
        { title: "Portion control", text: "Adjust each meal to suit your pet’s daily routine and dietary needs." },
        { title: "Backup power", text: "A three D-cell battery backup option. Batteries are purchased separately." },
      ],
    },
    specs: [
      ["Capacity", "5L / 21 cups"],
      ["Camera", "Without a camera"],
      ["Connectivity", "Wi-Fi; mobile app control"],
      ["Feeding", "Scheduled portion feeding; feeding records"],
      ["Storage", "Twist-lock lid, sealed storage, desiccant compartment"],
      ["Dispensing", "Anti-clog dispensing system"],
      ["Bowl", "Food-grade stainless steel"],
      ["Kibble size", "Approximately 2–12mm"],
      ["Voice recording", "Up to 10 seconds"],
      ["Power", "5V adapter; three D-cell backup batteries (not included)"],
    ],
    faqs: [
      ["How do I schedule Essential’s meals?", "Connect Essential to its companion mobile app to plan feeding times and portions. Follow the supplied pairing guide."],
      ["Does Essential have a battery backup?", "Yes. Essential uses a 5V adapter and offers a three D-cell battery backup option. Batteries are not included. Test your setup according to the supplied guide."],
      ["What kibble sizes fit?", "Essential is specified for dry kibble approximately 2–12mm. Its food reservoir holds 5L."],
      ["How do I clean Essential?", "Follow the supplied care guide for the feeder and food-grade stainless-steel bowl."],
      ["Does it require Wi-Fi?", "Wi-Fi connects Essential to its companion app for meal scheduling and portion control. Follow the supplied pairing guide to get started."],
    ],
    details: [
      "Keep your cat or small dog on a regular feeding schedule, even when your day gets busy. Parveja Essential is a 5L automatic pet feeder for dry food, with Wi-Fi app control to set meal times, adjust portions and review feeding records.",
      "The 5L reservoir holds approximately 21 cups of kibble. A twist-lock lid, sealed storage design and desiccant compartment help keep food protected between meals. The anti-clog dispensing system helps food move through the feeder.",
      "Record a message of up to 10 seconds to call your pet at mealtime. The stainless-steel bowl is easy to remove for cleaning.",
    ],
    keyFeatures: [
      "Wi-Fi app control and scheduled portion feeding",
      "5L capacity, approximately 21 cups",
      "Dry kibble approximately 2–12 mm",
      "Twist-lock lid and desiccant compartment",
      "Up to 10-second voice recording",
      "5V adapter power with three D-cell backup batteries",
    ],
    note: "Backup batteries are not included. Choose Essential if you want app-controlled feeding without a camera. Check your pet’s portion needs and kibble size before ordering. An automatic feeder supports a feeding routine; your pet still needs regular care and supervision.",
    images: {
      main: img("essential-1"),
      gallery: ["essential-main", "essential-dog", "essential-cat", "essential-app", "essential-capacity", "essential-sealed", "essential-anticlog", "essential-voice"].map(img),
    },
  },
  {
    slug: "view",
    name: "View",
    shopUrl: shop("parveja-view-3l-smart-camera-pet-feeder"),
    fullTitle: "Parveja View 3L Automatic Pet Feeder with Camera",
    seoTitle: "Automatic Cat Feeder with Camera | Parveja View 3L",
    label: "Camera model",
    short: "Camera model",
    tagline: "Their meals. Your peace of mind.",
    price: 299,
    capacity: "3L",
    tone: "sky",
    intro:
      "Schedule meals, control portions and check in from wherever your day takes you with a 1080p camera, night vision and mobile app.",
    highlights: [
      "1080p HD camera with infrared night vision",
      "App-controlled feeding & portion scheduling",
      "3L capacity with a sealed food compartment",
      "Up to 10-second mealtime voice recording",
    ],
    bestFor: "Compact camera feeding",
    storage: "Sealed food compartment",
    camera: "1080p HD; night vision",
    feature: {
      eyebrow: "Stay connected",
      title: ["See, check & feed", "from anywhere."],
      text: "Parveja View combines automatic scheduled feeding with a wide-angle 1080p camera and infrared night vision. Plan meals, control portions from the mobile app and keep an eye on your pet’s mealtime, wherever the day takes you.",
      cards: [
        { title: "1080p HD camera", text: "Check in on your pet with a clear, wide-angle view of mealtime." },
        { title: "Easy app control", text: "Schedule meals and adjust portions from the companion mobile app." },
        { title: "Night vision", text: "Infrared night vision lets you check on evening meals, too." },
      ],
    },
    specs: [
      ["Capacity", "3L"],
      ["Camera", "1080p HD; wide-angle lens"],
      ["Night vision", "Infrared"],
      ["Controls", "Mobile app scheduling and portion control; LCD display"],
      ["Storage", "Sealed food compartment"],
      ["Voice recording", "Up to 10 seconds"],
      ["Power", "5V/USB adapter; three D-cell battery option (batteries not included)"],
    ],
    faqs: [
      ["Can I check in after dark?", "Yes. View includes infrared night vision alongside its wide-angle 1080p HD camera."],
      ["Can I schedule View from my phone?", "Yes. Use the companion mobile app to schedule meals and adjust portions remotely. Follow the supplied setup instructions."],
      ["Can I record a voice message?", "Yes. View supports a personal mealtime voice recording of up to 10 seconds."],
      ["How do I clean View?", "View has removable components for cleaning and refilling. Follow the supplied care guide for each component."],
      ["What is View’s food capacity?", "View has a 3L sealed food compartment for dry food."],
    ],
    details: [
      "Schedule your pet’s meals and check the feeding area from your phone. Parveja View combines a 3L automatic pet feeder with a 1080p camera, so you can manage portions and see your pet at the bowl through the mobile app.",
      "The wide-angle camera includes infrared night vision for checking the feeding area in low light. Use the app to set daily meal times and adjust portions remotely. A sealed food compartment helps protect dry food between refills.",
      "You can record a mealtime message of up to 10 seconds. The LCD display helps with setup, and removable components make cleaning and refilling easier.",
    ],
    keyFeatures: [
      "3L food reservoir",
      "1080p HD camera with wide-angle viewing",
      "Infrared night vision",
      "App scheduling and portion control",
      "Sealed food compartment",
      "Up to 10-second voice recording",
      "LCD display and removable components",
      "5V/USB adapter power with three D-cell battery option",
    ],
    note: "Backup batteries are not included. Choose View if camera access matters more to you than a larger food reservoir. Check food compatibility and feeding requirements before ordering. Camera access and remote app features require a working connection; the feeder does not replace regular pet care.",
    images: {
      main: img("view-main"),
      gallery: ["view-1", "view-dog", "view-cat", "view-app", "view-camera", "view-capacity", "view-voice", "view-inside"].map(img),
    },
  },
  {
    slug: "preserve",
    name: "Preserve",
    shopUrl: shop("parveja-preserve-8l-vacuum-sealed-pet-feeder"),
    fullTitle: "Parveja Preserve 8L Vacuum-Sealed Automatic Pet Feeder",
    seoTitle: "8L Vacuum-Sealed Automatic Pet Feeder | Parveja Preserve",
    label: "Freshness focused",
    short: "Keeps food fresher",
    tagline: "Keep it fresh. Keep it scheduled.",
    price: 399,
    capacity: "8L / 34 cups",
    tone: "pink",
    intro:
      "Help protect the freshness and crunch of dry food with vacuum-sealed 8L storage. Plan meals and portions from your phone, with feeding records and helpful alerts.",
    highlights: [
      "8L capacity with vacuum-sealed food storage",
      "Schedule 1–10 meals per day in the app",
      "Portion control, feeding records & notifications",
      "Wide 187mm stainless-steel bowl",
    ],
    bestFor: "Vacuum-sealed food storage",
    storage: "Vacuum sealed; approximately −20kPa",
    camera: "Without a camera",
    feature: {
      eyebrow: "Fresh thinking",
      title: ["Fresh food.", "Right on schedule."],
      text: "Preserve brings food storage and scheduled feeding together. Its vacuum-sealing system is designed to help slow oxidation and maintain dry-food freshness. Set meals in the app and serve them in a wide stainless-steel bowl.",
      cards: [
        { title: "Vacuum sealing", text: "A low-pressure environment helps protect the freshness and crunch of dry food." },
        { title: "Large 8L storage", text: "Generous capacity combines food storage and automatic feeding in one design." },
        { title: "App scheduling", text: "Plan 1–10 meals daily, review feeding records and receive helpful alerts." },
      ],
    },
    specs: [
      ["Capacity", "8L / 34 cups"],
      ["Camera", "Without a camera"],
      ["Storage", "Vacuum sealed; approximately −20kPa"],
      ["Schedule", "1–10 meals per day"],
      ["Portions", "Up to 48 portions per meal"],
      ["App", "Feeding records; low-food, jam, Wi-Fi and operation alerts"],
      ["Bowl", "187mm wide stainless steel"],
      ["Kibble size", "Up to 8mm"],
    ],
    faqs: [
      ["How does the vacuum seal work?", "The vacuum system creates an approximately −20kPa low-pressure, low-oxygen environment designed to help slow oxidation and maintain dry-food freshness."],
      ["How large is the food container?", "Preserve holds 8L of dry food, combining storage and automatic feeding in one unit."],
      ["How many meals can I schedule?", "The app supports 1–10 meals per day, with up to 48 portions per meal. Choose portions to suit your pet’s dietary needs."],
      ["What kibble size works?", "Preserve is specified for dry kibble up to 8mm."],
      ["What bowl does Preserve use?", "Preserve has a wide 187mm stainless-steel bowl. Follow the supplied guide for removal and care."],
    ],
    details: [
      "Store dry food and schedule your cat’s or dog’s meals in one place. Parveja Preserve is an 8L automatic pet feeder with vacuum-sealed storage, designed for owners who want a larger reservoir and extra protection for kibble between refills.",
      "The vacuum system creates a low-pressure, low-oxygen environment designed to help slow oxidation. The 8L reservoir holds approximately 34 cups of dry food.",
      "Use the mobile app to schedule 1–10 meals a day, set up to 48 portions per meal and review feeding records. App notifications can alert you to low food, jams, Wi-Fi disconnection or interrupted operation. The wide stainless-steel bowl measures 187 mm.",
    ],
    keyFeatures: [
      "8L capacity, approximately 34 cups",
      "Vacuum-sealed food storage",
      "App-controlled meal times and portions",
      "1–10 scheduled meals per day",
      "Up to 48 portions per meal",
      "Feeding records and notifications",
      "Wide stainless-steel bowl",
      "Compatible with dry kibble up to 8 mm",
    ],
    note: "Choose Preserve if food storage and capacity are your priorities. Check that your kibble is no larger than 8 mm before ordering, and set portions to suit your pet’s needs. Vacuum storage does not replace proper food handling or regular cleaning. Power requirements are not specified for this model; contact Parveja to confirm before ordering.",
    images: {
      main: img("preserve-main"),
      gallery: ["preserve-1", "preserve-dog", "preserve-cat", "preserve-capacity", "preserve-vacuum", "preserve-app", "preserve-records", "preserve-bowl"].map(img),
    },
  },
  {
    slug: "horizon",
    name: "Horizon",
    shopUrl: shop("parveja-horizon-11l-ultra-wide-hd-camera-feeder"),
    fullTitle: "Parveja Horizon 11L Automatic Pet Feeder with Camera",
    seoTitle: "11L Automatic Dog Feeder with Camera | Parveja Horizon",
    label: "Largest capacity",
    short: "Largest capacity",
    tagline: "Bigger capacity. Smarter feeding.",
    price: 499,
    capacity: "11L",
    tone: "lilac",
    intro:
      "Make more room for their routine with an 11L tank, ultra-wide 1080p camera and night vision. Schedule portions remotely and keep an eye on mealtime.",
    highlights: [
      "11L capacity for longer refill intervals",
      "Ultra-wide 1080p camera & infrared night vision",
      "Remote feeding & app portion scheduling",
      "Sealed food barrel with a detachable tank",
    ],
    bestFor: "Large-capacity camera feeding",
    storage: "Sealed food barrel; detachable tank",
    camera: "Ultra-wide 1080p HD; night vision",
    feature: {
      eyebrow: "A bigger picture",
      title: ["More capacity.", "More peace of mind."],
      text: "An 11L reservoir means more room between refills, while an ultra-wide 1080p camera and infrared night vision keep mealtime in view. Plan portions remotely and detach the tank when it is time to refill or clean.",
      cards: [
        { title: "Ultra-wide camera", text: "Take a wider look at mealtime through the 1080p HD camera." },
        { title: "11L capacity", text: "More room for dry food, with a detachable tank for refilling and cleaning." },
        { title: "Night monitoring", text: "Infrared night vision brings evening meals into view." },
      ],
    },
    specs: [
      ["Capacity", "11L"],
      ["Camera", "Ultra-wide-angle 1080p HD"],
      ["Night vision", "Infrared"],
      ["Connectivity", "2.4GHz Wi-Fi; mobile app control"],
      ["Feeding", "Remote feeding and portion scheduling"],
      ["Storage", "Sealed food barrel; detachable tank"],
      ["Power", "5V USB adapter; backup battery system"],
      ["Battery mode", "Feeding only; backup battery not included"],
    ],
    faqs: [
      ["How large is the container?", "Horizon holds 11L of dry food, the largest capacity in the current Parveja range. Confirm kibble compatibility and portion requirements for your pet before ordering."],
      ["Can I view my pet at night?", "Yes. Horizon includes an ultra-wide 1080p camera and infrared night vision. Camera monitoring requires normal power; battery mode supports feeding only."],
      ["Does Horizon support remote feeding?", "Yes. Use its companion app over 2.4GHz Wi-Fi for remote feeding and portion scheduling."],
      ["Does Horizon have backup power?", "Yes. Horizon’s backup battery system supports feeding during power interruptions. Battery mode supports feeding only, not camera monitoring; the backup battery is not included."],
      ["Is the tank removable?", "Yes. The food tank detaches for refilling and cleaning. Follow the supplied care instructions."],
    ],
    details: [
      "Manage meal times and check the feeding area with a larger food reservoir. Parveja Horizon is an 11L automatic pet feeder with an ultra-wide-angle 1080p camera, designed for owners who want camera access and more space for dry food.",
      "Connect to 2.4GHz Wi-Fi to use the mobile app for feeding schedules, portion control and remote feeding. The camera includes infrared night vision so you can check the bowl area in low light.",
      "The detachable 11L food tank makes refilling and cleaning easier. A sealed food barrel helps protect kibble between refills. The feeder uses a 5V USB power adapter and supports backup battery power for feeding during power interruptions.",
    ],
    keyFeatures: [
      "11L food reservoir",
      "Ultra-wide-angle 1080p HD camera",
      "Infrared night vision",
      "App-controlled schedules, portions and remote feeding",
      "2.4GHz Wi-Fi connection",
      "Detachable food tank and sealed food barrel",
      "5V USB adapter power with battery backup",
    ],
    note: "The backup battery is not included. Battery mode supports feeding only, so do not rely on it for camera or remote features. Choose Horizon if you want the largest reservoir in the Parveja range alongside camera access. Check food compatibility and your pet’s feeding needs before ordering; regular care and cleaning are still essential.",
    images: {
      main: img("horizon-main"),
      gallery: ["horizon-1", "horizon-dog", "horizon-cat", "horizon-app", "horizon-camera", "horizon-capacity", "horizon-refill", "horizon-power"].map(img),
    },
  },
];

export const bySlug = (slug?: string) => FEEDERS.find((f) => f.slug === slug);

export const SHIPPING_NOTE =
  "Estimated delivery: usually 4–14 days; exceptional delays may take up to 30 days. Delivery times are estimates, not guarantees.";

export const RETURNS_NOTE =
  "Change-of-mind and other non-defective-product returns or exchanges are not accepted. For damaged, incorrect or materially defective items, contact us promptly with your order information and photos. Statutory consumer rights are unaffected.";

export const GENERAL_FAQS: [string, string][] = [
  ["Which feeder is right for my pet?", "Essential offers straightforward 5L scheduled feeding. View adds a camera in a compact 3L format. Preserve focuses on 8L vacuum-sealed storage. Horizon pairs an 11L tank with an ultra-wide camera. Compare kibble compatibility and capacities before choosing."],
  ["Which models include a camera?", "View and Horizon include 1080p cameras and infrared night vision. Essential and Preserve are without a camera."],
  ["How do I set up a feeding schedule?", "All four feeders support scheduling through a mobile app. Preserve supports 1–10 meals per day and up to 48 portions per meal. Follow the instructions supplied with your chosen model for pairing and setup."],
  ["Can I use these feeders for multiple pets?", "Separate feeders let each pet have a separate feeding station. Plan separate feeding stations and supervise mealtimes if your pets tend to share bowls."],
  ["How do I clean the feeder?", "View has removable components, and Horizon has a detachable food tank. Follow the care instructions supplied with your model for each component."],
  ["Which notifications does Preserve provide?", "Preserve’s app provides feeding records and alerts for low food, jams, Wi-Fi disconnections and operation status."],
  ["What is included in the box?", "Essential, View and Horizon include power adapters. Backup batteries are not included. Contact us for the full box contents of your chosen model."],
  ["How long does shipping take?", "Free U.S. shipping, with no minimum order. Estimated delivery: usually 4–14 days; exceptional delays may take up to 30 days. These are estimates, not guaranteed arrival dates. Tracking information is sent to the email address used at checkout when available."],
  ["What size automatic pet feeder do I need?", "Match reservoir capacity to your pet’s dry food, daily portions and refill routine. View holds 3L, Essential 5L / 21 cups, Preserve 8L / 34 cups and Horizon 11L. Capacity alone does not determine suitability: Essential specifies cats and small dogs with 2–12mm kibble; Preserve specifies cats and dogs with kibble up to 8mm. Confirm food compatibility for View and Horizon."],
  ["Can I schedule meals from my phone?", "Yes. All four Parveja models support mobile app scheduling and portion control. Follow the pairing instructions supplied with your model. Horizon specifically uses 2.4GHz Wi-Fi; do not assume the same network specification for every model."],
  ["Which Parveja feeders have night vision?", "View and Horizon both include infrared night vision with their 1080p cameras. Essential and Preserve have no camera."],
  ["Which feeder has the largest food capacity?", "Horizon has the largest reservoir in the current range at 11L. Preserve holds 8L, Essential 5L and View 3L. A larger reservoir reduces refill frequency, but does not replace checking food, water and your pet daily."],
  ["Do automatic feeders work during a power interruption?", "Essential has a three D-cell backup option; View lists a three D-cell battery option. Horizon’s backup system supports feeding only, not camera monitoring. Batteries are not included. Confirm model-specific operation and test the setup before relying on it."],
  ["Can I return a feeder if I change my mind?", "Parveja does not accept returns or exchanges for change of mind or other non-defective-product reasons. Contact us promptly with your order details and photos if an item arrives damaged, incorrect or materially defective. Statutory and legally required consumer rights remain unaffected. Read Shipping & Returns before ordering."],
];
