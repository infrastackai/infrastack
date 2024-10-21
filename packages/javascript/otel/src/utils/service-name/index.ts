export function generateRandomServiceName(): string {
  const verbs = [
    "run",
    "jump",
    "fly",
    "swim",
    "dance",
    "sing",
    "explore",
    "build",
    "think",
    "create",
    "develop",
    "invent",
    "imagine",
    "design",
    "develop",
    "invent",
    "imagine",
  ];
  const adjectives = [
    "happy",
    "quick",
    "fuzzy",
    "tiny",
    "hero",
    "brave",
    "cool",
    "bright",
    "lucky",
    "silly",
    "witty",
    "funny",
    "quirky",
    "groovy",
  ];
  const nouns = [
    "octopus",
    "cloud",
    "dog",
    "cat",
    "bird",
    "unicorn",
    "tree",
    "rocket",
    "star",
    "budgie",
    "kitten",
    "puppy",
    "elephant",
    "tiger",
    "lion",
    "monkey",
    "penguin",
    "dolphin",
  ];
  const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomVerb}-${randomAdjective}-${randomNoun}`;
}
