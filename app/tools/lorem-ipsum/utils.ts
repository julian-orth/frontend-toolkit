/**
 * Lorem Ipsum Generator Utilities
 * Based on classic "Lorem ipsum dolor sit amet..." text from Cicero's De Finibus Bonorum et Malorum
 */

// Standard Lorem Ipsum words derived from Cicero's work
const LOREM_WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
  "sed",
  "ut",
  "perspiciatis",
  "unde",
  "omnis",
  "iste",
  "natus",
  "error",
  "voluptatem",
  "accusantium",
  "doloremque",
  "laudantium",
  "totam",
  "rem",
  "aperiam",
  "eaque",
  "ipsa",
  "quae",
  "ab",
  "illo",
  "inventore",
  "veritatis",
  "quasi",
  "architecto",
  "beatae",
  "vitae",
  "dicta",
  "explicabo",
  "nemo",
  "ipsam",
  "quia",
  "voluptas",
  "aspernatur",
  "aut",
  "odit",
  "fugit",
  "consequuntur",
  "magni",
  "dolores",
  "eos",
  "ratione",
  "sequi",
  "nesciunt",
  "neque",
  "porro",
  "quisquam",
  "dolorem",
  "adipisci",
  "numquam",
  "eius",
  "modi",
  "tempora",
  "incidunt",
  "magnam",
  "aliquam",
  "quaerat",
  "minima",
  "nostrum",
  "exercitationem",
  "ullam",
  "corporis",
  "suscipit",
  "laboriosam",
  "aliquid",
  "commodi",
  "consequatur",
  "autem",
  "vel",
  "eum",
  "iure",
  "reprehenderit",
  "voluptate",
  "esse",
  "quam",
  "nihil",
  "molestiae",
  "illum",
  "fugiat",
  "quo",
  "vero",
  "accusamus",
  "iusto",
  "odio",
  "dignissimos",
  "ducimus",
  "blanditiis",
  "praesentium",
  "voluptatum",
  "deleniti",
  "atque",
  "corrupti",
  "quos",
  "quas",
  "molestias",
  "excepturi",
  "occaecati",
  "cupiditate",
  "provident",
  "similique",
  "mollitia",
  "animi",
  "fuga",
  "harum",
  "quidem",
  "rerum",
  "facilis",
  "expedita",
  "distinctio",
  "nam",
  "libero",
  "tempore",
  "cum",
  "soluta",
  "nobis",
  "eligendi",
  "optio",
  "cumque",
  "impedit",
  "quo",
  "minus",
  "maxime",
  "placeat",
  "facere",
  "possimus",
  "assumenda",
  "repellendus",
  "temporibus",
  "quibusdam",
  "officiis",
  "debitis",
  "necessitatibus",
  "saepe",
  "eveniet",
  "repudiandae",
  "recusandae",
  "itaque",
  "earum",
  "hic",
  "tenetur",
  "sapiente",
  "delectus",
  "reiciendis",
  "voluptatibus",
  "maiores",
  "alias",
  "perferendis",
  "doloribus",
  "asperiores",
  "repellat",
];

// Standard opening: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
const STANDARD_OPENING =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

// Bacon Ipsum words
const BACON_WORDS = [
  "bacon",
  "pork",
  "belly",
  "ham",
  "hock",
  "chicken",
  "turkey",
  "beef",
  "ribeye",
  "steak",
  "sausage",
  "meatball",
  "brisket",
  "chuck",
  "sirloin",
  "tenderloin",
  "tri-tip",
  "short",
  "ribs",
  "spare",
  "filet",
  "mignon",
  "pastrami",
  "corned",
  "beef",
  "salami",
  "kielbasa",
  "andouille",
  "frankfurter",
  "bresaola",
  "prosciutto",
  "pancetta",
  "venison",
  "shank",
  "drumstick",
  "strip",
  "pork",
  "chop",
  "jerky",
  "tail",
  "cow",
  "pig",
  "ground",
  "round",
  "flank",
  "shoulder",
  "picanha",
  "kevin",
  "rump",
  "tongue",
  "shankle",
  "fatback",
  "jowl",
  "leberkas",
  "doner",
  "capicola",
  "boudin",
  "landjaeger",
  "meatloaf",
  "ball",
  "tip",
  "swine",
  "chislic",
];

// Hipster Ipsum words
const HIPSTER_WORDS = [
  "artisan",
  "organic",
  "sustainable",
  "farm-to-table",
  "small-batch",
  "craft",
  "authentic",
  "vinyl",
  "fixie",
  "beard",
  "moustache",
  "flannel",
  "kale",
  "quinoa",
  "kombucha",
  "avocado",
  "toast",
  "pour-over",
  "cold-brew",
  "french",
  "press",
  "single-origin",
  "locally-sourced",
  "gluten-free",
  "vegan",
  "paleo",
  "keto",
  "crossfit",
  "yoga",
  "meditation",
  "mindfulness",
  "vintage",
  "retro",
  "aesthetic",
  "minimal",
  "normcore",
  "typewriter",
  "polaroid",
  "instagram",
  "blog",
  "podcast",
  "artisanal",
  "hand-crafted",
  "bespoke",
  "curated",
  "pop-up",
  "food",
  "truck",
  "bicycle",
  "messenger",
  "bag",
  "tote",
  "mason",
  "jar",
  "reclaimed",
  "wood",
  "edison",
  "bulb",
  "subway",
  "tile",
  "exposed",
  "brick",
  "loft",
  "brooklyn",
  "portland",
  "austin",
  "williamsburg",
  "bushwick",
];

// Pirate Ipsum words
const PIRATE_WORDS = [
  "ahoy",
  "matey",
  "shiver",
  "me",
  "timbers",
  "avast",
  "ye",
  "scurvy",
  "dog",
  "landlubber",
  "bilge",
  "rat",
  "buccaneer",
  "cutlass",
  "doubloon",
  "pieces",
  "of",
  "eight",
  "treasure",
  "chest",
  "skull",
  "crossbones",
  "jolly",
  "roger",
  "plank",
  "walk",
  "the",
  "plunder",
  "booty",
  "loot",
  "swashbuckler",
  "privateer",
  "corsair",
  "galleon",
  "sloop",
  "frigate",
  "brig",
  "deck",
  "mast",
  "sail",
  "anchor",
  "cannon",
  "broadside",
  "parrot",
  "peg",
  "leg",
  "hook",
  "eye",
  "patch",
  "rum",
  "grog",
  "ale",
  "keelhaul",
  "marooned",
  "mutiny",
  "captain",
  "first",
  "mate",
  "quartermaster",
  "navigator",
  "sea",
  "ocean",
  "island",
  "port",
  "harbor",
  "voyage",
  "expedition",
];

// Cat Ipsum words
const CAT_WORDS = [
  "meow",
  "purr",
  "hiss",
  "scratch",
  "pounce",
  "nap",
  "sleep",
  "lick",
  "groom",
  "whiskers",
  "tail",
  "paw",
  "claw",
  "fur",
  "fluffy",
  "soft",
  "belly",
  "rub",
  "cuddle",
  "snuggle",
  "stretch",
  "yawn",
  "knock",
  "things",
  "off",
  "table",
  "chase",
  "laser",
  "pointer",
  "toy",
  "mouse",
  "catnip",
  "treat",
  "tuna",
  "salmon",
  "kibble",
  "food",
  "bowl",
  "water",
  "litter",
  "box",
  "cardboard",
  "box",
  "window",
  "sill",
  "bird",
  "watching",
  "hunting",
  "stalk",
  "ambush",
  "hide",
  "under",
  "bed",
  "couch",
  "climb",
  "curtains",
  "scratch",
  "post",
  "furniture",
  "ignore",
  "human",
  "demand",
  "attention",
  "3am",
  "zoomies",
  "hairball",
];

export type GeneratorMode = "paragraphs" | "sentences" | "words";
export type GeneratorType = "classic" | "bacon" | "hipster" | "pirate" | "cat";

export interface GenerateOptions {
  mode: GeneratorMode;
  count: number;
  startWithLorem: boolean;
  type?: GeneratorType;
}

/**
 * Generate a random integer between min and max (inclusive)
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get a random word from the specified dictionary
 */
function getRandomWord(type: GeneratorType = "classic"): string {
  let words: string[];
  switch (type) {
    case "bacon":
      words = BACON_WORDS;
      break;
    case "hipster":
      words = HIPSTER_WORDS;
      break;
    case "pirate":
      words = PIRATE_WORDS;
      break;
    case "cat":
      words = CAT_WORDS;
      break;
    default:
      words = LOREM_WORDS;
  }
  return words[randomInt(0, words.length - 1)];
}

/**
 * Generate a sentence with a random number of words
 * @param minWords Minimum words per sentence
 * @param maxWords Maximum words per sentence
 * @param type Generator type
 */
function generateSentence(
  minWords = 4,
  maxWords = 16,
  type: GeneratorType = "classic"
): string {
  const wordCount = randomInt(minWords, maxWords);
  const words: string[] = [];

  for (let i = 0; i < wordCount; i++) {
    words.push(getRandomWord(type));
  }

  // Capitalize first letter
  const sentence = words.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

/**
 * Generate a paragraph with a random number of sentences
 * @param minSentences Minimum sentences per paragraph
 * @param maxSentences Maximum sentences per paragraph
 * @param type Generator type
 */
function generateParagraph(
  minSentences = 3,
  maxSentences = 7,
  type: GeneratorType = "classic"
): string {
  const sentenceCount = randomInt(minSentences, maxSentences);
  const sentences: string[] = [];

  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence(4, 16, type));
  }

  return sentences.join(" ");
}

/**
 * Generate Lorem Ipsum text based on specified options
 */
export function generateLoremIpsum(options: GenerateOptions): string {
  const { mode, count, startWithLorem, type = "classic" } = options;

  if (mode === "words") {
    return generateWords(count, startWithLorem, type);
  } else if (mode === "sentences") {
    return generateSentences(count, startWithLorem, type);
  } else {
    return generateParagraphs(count, startWithLorem, type);
  }
}

/**
 * Generate specified number of words
 */
function generateWords(
  count: number,
  startWithLorem: boolean,
  type: GeneratorType = "classic"
): string {
  const words: string[] = [];

  if (startWithLorem && type === "classic") {
    // Start with standard opening words for classic only
    const openingWords = STANDARD_OPENING.toLowerCase().split(" ");
    for (let i = 0; i < Math.min(count, openingWords.length); i++) {
      words.push(openingWords[i]);
    }
  }

  // Fill remaining words
  while (words.length < count) {
    words.push(getRandomWord(type));
  }

  // Capitalize first letter
  const result = words.join(" ");
  return result.charAt(0).toUpperCase() + result.slice(1) + ".";
}

/**
 * Generate specified number of sentences
 */
function generateSentences(
  count: number,
  startWithLorem: boolean,
  type: GeneratorType = "classic"
): string {
  const sentences: string[] = [];

  if (startWithLorem && count > 0 && type === "classic") {
    // Start with standard opening sentence for classic only
    sentences.push(STANDARD_OPENING + ".");
  }

  // Generate remaining sentences
  while (sentences.length < count) {
    sentences.push(generateSentence(4, 16, type));
  }

  return sentences.join(" ");
}

/**
 * Generate specified number of paragraphs
 */
function generateParagraphs(
  count: number,
  startWithLorem: boolean,
  type: GeneratorType = "classic"
): string {
  const paragraphs: string[] = [];

  for (let i = 0; i < count; i++) {
    if (i === 0 && startWithLorem && type === "classic") {
      // First paragraph starts with standard opening for classic only
      const firstParagraph = generateParagraph(3, 7, type);
      paragraphs.push(STANDARD_OPENING + ". " + firstParagraph);
    } else {
      paragraphs.push(generateParagraph(3, 7, type));
    }
  }

  return paragraphs.join("\n\n");
}

/**
 * Get character count for text
 */
export function getCharacterCount(text: string): number {
  return text.length;
}

/**
 * Get word count for text
 */
export function getWordCount(text: string): number {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

/**
 * Get paragraph count for text
 */
export function getParagraphCount(text: string): number {
  if (!text.trim()) return 0;
  return text.trim().split(/\n\n+/).length;
}
