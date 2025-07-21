let count = 3;
let model = null;

// Load the BERT-like model (USE)
async function loadModel() {
    model = await use.load();
    console.log("Model loaded");
}
loadModel(); // Load immediately

// Cosine similarity function
function cosineSimilarity(a, b) {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}

// Function to check if input is semantically similar to "study"
async function isSimilarToStudy(inputText) {
    if (!model) {
        console.warn("Model not loaded yet");
        return false;
    }

    const embeddings = await model.embed([inputText, "study , read, revise, homework"]);
    const vectors = await embeddings.array();
    const similarity = cosineSimilarity(vectors[0], vectors[1]);

    console.log("Semantic similarity:", similarity);
    return similarity > 0.3; // You can adjust this threshold
}

// Modified addTodo function
async function addTodo() {
    const inputEl = document.querySelector("input").value;
    const divEl = document.createElement("div");
    divEl.setAttribute("id", "todo-" + count);
    divEl.innerHTML = `<h4>${count}. ${inputEl}</h4><button onclick='deleteTodo(${count})'>Delete</button>`;

    const parent = document.getElementById("todos");
    parent.appendChild(divEl);
    count++;

    // Check semantic similarity
    const isRelated = await isSimilarToStudy(inputEl);
    if (isRelated) {
        console.log("Trap");
    } else {
        setTimeoutPromisified(1000).then(padhleBSDK);
    }
}

function deleteTodo(count) {
    const delEl = document.getElementById("todo-" + count);
    const delP = delEl.parentNode;
    delP.removeChild(delEl);
}

function setTimeoutPromisified(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

function padhleBSDK() {
    const todos = document.querySelectorAll("h4");
    todos.forEach((el, index) => {
        el.innerHTML = `${index + 1}. PADHLE BSDK!!!`;
    });
}
console.log(`Similarity with "study":`, similarity);
