const LETTERMAP = {
    'A': 'Α', 'a': 'α',
    'B': 'Β', 'b': 'β',
    'C': 'Κ', 'c': 'κ',
    'D': 'Δ', 'd': 'δ',
    'E': 'Ε', 'e': 'ε',
    'F': 'Φ', 'f': 'φ',
    'G': 'Γ', 'g': 'γ',
    'H': 'Ξ', 'h': 'ξ',
    'I': 'Ι', 'I': 'ι',
    'J': 'Η', 'j': 'η',
    'K': 'Κ', 'k': 'κ',
    'L': 'Λ', 'l': 'λ',
    'M': 'Μ', 'm': 'μ',
    'N': 'Ν', 'n': 'ν',
    'O': 'Ο', 'o': 'ο',
    'P': 'Π', 'p': 'π',
    'Q': 'Ψ', 'q': 'ψ',
    'R': 'Ρ', 'r': 'ρ',
    'S': 'Σ', 's': 'σ',
    'T': 'Τ', 't': 'τ',
    'U': 'Υ', 'u': 'υ',
    'V': 'Θ', 'v': 'θ',
    'W': 'Ω', 'w': 'ω',
    'X': 'Χ', 'x': 'χ',
    'Y': 'Υ', 'y': 'υ',
    'Z': 'Ζ', 'z': 'ζ'
}

const LETTERMAP_KEYS = Object.keys(LETTERMAP);

let is_masked = false;

var nodeFilter = {
    acceptNode: function(node) {
        if (node.parentNode.nodeName !== 'SCRIPT' && node.parentNode.nodeName !== 'STYLE') {
            return NodeFilter.FILTER_ACCEPT;
        }
    }
};

function applyAll(el, callback) {
    var n, walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,nodeFilter,false);
    while(n=walk.nextNode()) callback(n);
}

function replace(node, keys, map) {
    let text = node.textContent;
    node.GREEKIFY_PREVIOUS_TEXT_CONTENT = text;
    for (let letter of keys) {
        text = text.replace(new RegExp(letter, 'g'), map[letter]);
    }
    node.textContent = text;
}

function reverse(node) {
    if (node.GREEKIFY_PREVIOUS_TEXT_CONTENT) {
        node.textContent = node.GREEKIFY_PREVIOUS_TEXT_CONTENT
    }
}

console.log('run');

browser.runtime.onMessage.addListener(() => {
    if (is_masked) {
        applyAll(document.body, reverse);
        is_masked = false;
    } else {
        applyAll(document.body, (n) => replace(n, LETTERMAP_KEYS, LETTERMAP));
        is_masked = true;
    }
});