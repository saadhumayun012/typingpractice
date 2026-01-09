const words: string[] = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
  "is", "was", "are", "been", "has", "had", "were", "said", "did", "having",
  "may", "should", "do", "does", "did", "doing", "would", "could", "ought", "am",
  "place", "made", "live", "where", "after", "back", "little", "only", "round", "man",
  "year", "came", "show", "every", "good", "me", "give", "our", "under", "name",
  "very", "through", "just", "form", "sentence", "great", "think", "say", "help", "low",
  "line", "differ", "turn", "cause", "much", "mean", "before", "move", "right", "boy",
  "old", "too", "same", "tell", "does", "set", "three", "want", "air", "well",
  "also", "play", "small", "end", "put", "home", "read", "hand", "port", "large",
  "spell", "add", "even", "land", "here", "must", "big", "high", "such", "follow",
  "act", "why", "ask", "men", "change", "went", "light", "kind", "off", "need"
];

export function randomTextGenerator(count = 70): string {
  const result: string[] = [];

  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * words.length);
    result.push(words[index]);
  }

  return result.join(" ");
}
