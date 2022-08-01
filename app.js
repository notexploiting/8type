let interval;
let seconds = 0;
let correct = 0;
let incorrect = 0;
let timerRunning = false; 
let testLength = 10;

//this is the complete URL: window.location.origin
//window.location.origin but without http/https window.location.host
//Set the base href to whatever is being used
document.querySelector("#baseHref").href = window.location.origin;

// Match text entered with the paragraph
function spellCheck() {
    let paragraph = document.querySelector("#paragraph-wrapper p").innerHTML;
    let input = document.querySelector("#input-field");

    let textEntered = input.value;
    let textMatch = paragraph.substring(0, textEntered.length);

    // if the entered text completely matches up with the original paragraph
    if (textEntered == paragraph) {
        console.log("correct: " + correct + "\nincorrect: " + incorrect);
        document.querySelector("#wpm-acc").innerHTML = "wpm: " + calculateWpm() + "/ acc: " + calculateAcc();
        document.querySelector("#paragraph").style.borderColor = "#f6c177"; // gold
        clearInterval(interval);
    } else {
        if (textEntered == textMatch) {
            document.querySelector("#paragraph").style.borderColor = "#9ccfd8"; // foam
            correct++;
        } 
        
        if (textEntered != textMatch) {
            document.querySelector("#paragraph").style.borderColor = "#eb6f92"; // love
            if (textEntered != /.?\x08/) { //ignore backspaces, doesn't work??
                incorrect++;
            }
        }
    }

    console.log(textEntered);
    console.log(textMatch);
}

// increment seconds 
function timer() {
    seconds++;
}

// Start timer
function start() {
    let inputLength = document.querySelector("#input-field").value.length;
    if (inputLength === 0 && !timerRunning) {
        timerRunning = true;
        //interval every 1 second
        interval = setInterval(timer, 1000);
    }
}

function reset() {
    clearInterval(interval);
    interval = null;
    seconds = 0;
    correct = 0;
    incorrect = 0;
    timerRunning = false;

    document.querySelector("#input-field").value = "";
    document.querySelector("#input-field").focus();
    document.querySelector("#paragraph").style.borderColor = "#6e6a86";
    document.querySelector("#paragraph").innerHTML = randomText(testLength);
}

function calculateAcc() {
    return Math.trunc((correct / (correct + incorrect)) * 100.0);
}

function calculateWpm() {
    //total number of characters (including spaces) of words you got right divided by five then divided by the time starting from first character typed
    return Math.trunc((correct / 5) / (seconds / 60));
}

function randomText(size) {
    const dictionary = ["citizen", "thick", "trail", "sink", "hole", "victory", "we", "quarter", "hit", "related", "shelter", "husband", "cause", "alive", "try", "father", "after", "several", "lonely", "create", "slide", "dinner", "vegetable", "traffic", "lost", "clothing", "clean", "repeat", "dog", "hole", "sing", "elephant", "took", "night", "driven", "son", "pure", "night", "heavy", "various", "today", "serious", "road", "birthday", "fought", "obtain", "sort", "meat", "it", "hour", "swung", "month", "headed", "against", "review", "round", "harder", "whistle", "label", "curious", "play", "bill", "indeed", "tall", "imagine", "wet", "verb", "table", "busy", "bus", "repeat", "cell", "within", "we", "arrangement", "fought", "ran", "speed", "respect", "thin", "particles", "atomic", "teeth", "become", "farm", "fog", "gas", "cutting", "industry", "table", "horse", "girl", "sit", "captain", "mean", "chamber", "various", "onto", "molecular", "everyone", "merely", "airplane", "build", "changing", "oil", "beauty", "lift", "vegetable", "act", "dress", "made", "strength", "addition", "done", "sets", "motor", "touch", "wagon", "package", "sit", "hurt", "grandfather", "whole", "remain", "shaking", "principle", "likely", "its", "tide", "lay", "those", "language", "throw", "chain", "fear", "satellites", "task", "although", "seldom", "aloud", "across", "camera", "most", "so", "circus", "helpful", "flow", "rate", "electric", "square", "folks", "begun", "plates", "series", "people", "mistake", "blow", "pick", "adult", "cup", "thread", "morning", "laid", "answer", "sharp", "baby", "from", "themselves", "aware", "driving", "country", "information", "limited", "plus", "college", "kids", "stairs", "cutting", "five", "street", "labor", "curve", "doll", "pale", "melted", "dear", "determine", "mouse", "strength", "birthday", "cream", "example", "basic", "wolf", "gravity", "method", "ruler", "balloon", "finish", "gift", "school", "farther", "slow", "drink", "stems", "ruler", "zoo", "opinion", "without", "hand", "sure", "nervous", "east", "torn", "perhaps", "known", "example", "blank", "bad", "led", "recent", "forty", "shoulder", "sing", "shown", "wait", "fish", "add", "remarkable", "social", "rabbit", "pine", "watch", "yourself", "anyway", "use", "interest", "safety", "hold", "art", "hard", "husband", "special", "across", "sport", "look", "bone", "function", "pipe", "doll", "hot", "due", "according", "became", "bend", "there", "tight", "right", "which", "nice", "his", "review", "value", "garden", "worth", "whatever", "clearly", "jack", "sink", "last", "breath", "successful", "easy", "busy", "note", "danger", "silent", "stomach", "monkey", "blue", "topic", "than", "model", "spell", "practical", "finger", "sea", "pond", "railroad", "gentle", "straight", "coffee", "many", "sink", "care", "doing", "shot", "whale", "thick", "once", "ancient", "merely", "difference", "friend", "steel", "noon", "broke", "needle", "join", "native", "picture", "health", "rough", "apartment", "than", "pale", "probably", "cap", "solid", "town", "every", "coffee", "him", "according", "fuel", "apart", "aside", "none", "grabbed", "wide", "physical", "duck", "drive", "larger", "so", "very", "flame", "equator", "city", "saddle", "these", "mysterious", "apartment", "grass", "belong", "trouble", "simplest", "face", "nuts", "rope", "tired", "castle", "title", "mill", "brush", "village", "football", "highest", "round", "equally", "able", "break", "chapter", "cost", "continent", "sit", "married", "several", "plastic", "date", "perfect", "account", "brass", "more", "film", "health", "behavior", "seed", "ants", "dropped", "shout", "opposite", "born", "meat", "seeing", "signal", "day", "pass", "doctor", "warm", "mass", "function", "scared", "sharp", "rubber", "rocky", "satisfied", "least", "terrible", "wide", "copy", "giant", "pressure", "yet", "snake", "union", "just", "yourself", "brain", "typical", "root", "iron", "sometime", "acres", "end", "brave", "tool", "finest", "indicate", "under", "smaller", "steady", "built", "sweet", "ride", "famous", "island", "price", "down", "silver", "plural", "is", "children", "expression", "else", "nearly", "attempt", "strong", "measure", "becoming", "spell", "local", "replace", "announced", "airplane", "stand", "exact", "mirror", "you", "danger", "union", "began", "quarter", "modern", "outer", "correct", "triangle", "play", "herself", "tie", "grandfather", "course", "using", "number", "gather", "his", "comfortable", "expect", "kids", "smooth", "heat", "west", "free", "right", "tales", "studied", "did", "honor", "tribe", "dull", "beginning", "few", "flower", "fast", "evening", "fight", "neck", "board", "having", "knife", "weather", "arm", "between", "simple", "feet", "baseball", "program", "grain", "closely", "medicine", "shelf", "citizen", "twelve", "want", "later", "because", "bowl", "roar", "mighty", "widely", "powder", "gold", "world", "article", "new", "bend", "similar", "weak", "better", "worried", "mail", "but", "that", "kids", "plain", "jar", "when", "depth", "per", "happily", "poetry", "quick", "wagon", "itself", "nature", "muscle", "soon", "seems", "twenty", "noon", "where", "bush", "statement", "safety", "trouble", "whole", "atomic", "palace", "flies", "track", "lie", "horn", "oxygen", "log", "brown", "organized", "stone", "should", "garden", "mood", "silk", "adventure", "hung", "according", "cost", "term", "principle", "ill", "rate", "begun", "life", "track", "window", "solve", "science", "season", "outline", "someone", "silver", "guess", "largest", "different", "nearest", "wheat", "die", "sang", "fifth", "later", "aloud", "leather", "visit", "create", "visitor", "just", "sale", "news", "happen", "traffic", "into", "afternoon", "consist", "range", "numeral", "airplane", "possible", "information", "saw", "wood", "kill", "system", "nails", "grandfather", "pile", "ask", "taught", "beat", "got", "our", "vowel", "man", "missing", "local", "map", "weather", "lucky", "medicine", "actually", "stems", "against", "doing", "however", "burn", "fair", "hello", "teach", "piano", "browserling", "parts", "north", "molecular", "pound", "double", "affect", "monkey", "development", "been", "food", "oldest", "habit", "knife", "applied", "court", "help", "thirty", "silence", "elephant", "occur", "proper", "throat", "alone", "collect", "task", "winter", "green", "floor", "distance", "deeply", "sink", "reader", "another", "command", "animal", "six", "arrange", "does", "roof", "choice", "example", "please", "hospital", "creature", "location", "course", "rising", "dead", "stronger", "massage", "hang", "advice", "grandmother", "noise", "buried", "goose", "cotton", "religious", "shown", "nice", "salmon", "means", "curve", "bigger", "calm", "wheat", "younger", "least", "pile", "beautiful", "pink", "steady", "could", "service", "grandmother", "slight", "prevent", "birthday", "capital", "pair", "receive", "safety", "lion", "explanation", "got", "like", "stand", "everywhere", "dear", "globe", "born", "chosen", "up", "frozen", "social", "year", "stage", "paper", "pig", "sudden", "over", "influence", "printed", "bread", "problem", "porch", "production", "blew", "valuable", "as", "deal", "look", "been", "say", "wait", "square", "wolf", "supper", "spent", "hurried", "eat", "mountain", "hang", "involved", "major", "production", "strength", "introduced", "price", "family", "enemy", "process", "himself", "saddle", "railroad", "blue", "claws", "front", "serious", "shinning", "monkey", "old", "silk", "three", "on", "toward", "wind", "whether", "greatest", "well", "butter", "real", "mud", "cut", "military", "walk", "whistle", "scene", "primitive", "population", "war", "source", "trouble", "depend", "tent", "movie", "soldier", "while", "bear", "graph", "bill", "upper", "brought", "before", "present", "sun", "ran", "driving", "audience", "remain", "sentence", "inch", "material", "rather", "steel", "hurry", "forgot", "thing", "upon", "idea", "dark", "doing", "least", "enter", "show", "fat", "energy", "effort", "pet", "broken", "realize", "direct", "recall", "time", "upon", "cloud", "wrong", "form", "wrong", "border", "fruit", "half", "everyone", "studying", "wagon", "my", "after", "cap", "small", "standard", "thin", "volume", "language", "foot", "seldom", "valley", "modern", "handsome", "coal", "pick", "driving", "rule", "remove", "agree", "bat", "curious", "standard", "solution", "once", "soil", "written", "go", "zero", "cake", "alphabet", "rear", "arrangement", "theory", "ourselves", "teacher", "burn", "gold", "carried"];

    let sentence = dictionary[Math.floor(Math.random() * dictionary.length)];

    for (let i = 0; i < size - 1; i++) {
        sentence = sentence + " " + dictionary[Math.floor(Math.random() * dictionary.length)];
    }
    
    return sentence;
}

//Theme modal scripts
let themeModal = document.querySelector("#themeModal");
let themeModalButton = document.querySelector("#themeModalButton");
let span = document.getElementsByClassName("close")[0];

themeModalButton.onclick = function() {
    themeModal.style.display = "block";
}

function theme(thme) {
    document.querySelector("#theme").href = "themes/" + thme.id + ".css";
    console.log(thme.id);
}

//Settings modal scripts
let settingsModal = document.querySelector("#settingsModal");
let settingsModalButton = document.querySelector("#settingsModalButton");

settingsModalButton.onclick = function() {
    settingsModal.style.display = "block";
}

function changeTestLength(l) {
    testLength = l.id;
    reset();
}

span.onclick = function() {
    themeModal.style.display = "none";
    settingsModal.style.display = "none";
}

// Event listeners
document.querySelector("#input-field").addEventListener("keypress", start, false);
document.querySelector("#input-field").addEventListener("keyup", spellCheck, false);
document.querySelector("#reset").addEventListener("click", reset, false);
