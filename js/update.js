function runInput() {
    reloadAreas();
    let inputBox = document.getElementById("input");
    let userInput = Number(inputBox.value);
    let last = document.getElementById("last");
    let log = document.getElementById("log");
    let inv = document.getElementById("inv");
    let options = document.getElementById("options");
    console.log("user input: " + userInput);

    let st = loc.state;
    let zn = loc.zone;
    let level = areas[st][zn];

    options.textContent = level.toString();
    console.log(level.options);

    let numOptions = Array.from({ length: level.options.length }, (_, i) => i + 1);
    console.log(numOptions);

    if (numOptions.includes(userInput)) {
        lastAction = "(" + log.textContent + " - " + level.options[userInput - 1] + ")";
        level.results[userInput - 1]();
        if (lastAction != null) {
            last.textContent = lastAction;
        }
    }

    st = loc.state;
    zn = loc.zone;
    level = areas[st][zn];

    options.textContent = showAsOptions(level.options);
    inputBox.value = "";

    typeText(log, level.text, level.options[userInput - 1]);
}

function showAsOptions(array) {
    if (!array) {
        return "You have died";
    }
    return array.map((option, i) => `${i + 1} - ${option}`).join("\n");
}

function showInventory(array) {
    const invContainer = document.getElementById("inv");

    invContainer.innerHTML = "";

    const titleElement = document.createElement("span");
    titleElement.textContent = "Inventory: ";
    invContainer.appendChild(titleElement);

    if (!array || array.length === 0) {
        const emptyMessage = document.createElement("span");
        emptyMessage.textContent = "(empty)";
        invContainer.appendChild(emptyMessage);
        return;
    }

    const itemCounts = {};
    array.forEach(item => {
        itemCounts[item] = (itemCounts[item] || 0) + 1;
    });

    const uniqueItems = Object.keys(itemCounts);

    uniqueItems.forEach((item, i) => {
        if (i > 0) {
            const separator = document.createElement("span");
            separator.textContent = ", ";
            invContainer.appendChild(separator);
        }

        if ((i + 1) % 5 == 0 && i != 1) {
            const newLine = document.createElement("br");
            invContainer.appendChild(newLine);
        }

        if (itemCounts[item] > 1) {
            const countSpan = document.createElement("span");
            countSpan.textContent = `x${itemCounts[item]} `;
            invContainer.appendChild(countSpan);
        }

        const itemLink = document.createElement("a");
        itemLink.href = "#";
        itemLink.textContent = item;
        itemLink.onclick = () => handleItemClick(array.indexOf(item));
        invContainer.appendChild(itemLink);
    });
}

window.onload = function() {
    const inputField = document.getElementById("input");
    inputField.focus();
    inputField.select();
};

let typingTimeout;
let goalText;

function typeText(element, text, input, speed = 15) {
    if (typingTimeout) {
        clearTimeout(typingTimeout);
        lastAction = "(" + goalText + " - " + input + ")"
    }

    goalText = text;

    element.textContent = "";
    let i = 0;

    function typeNextChar() {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
            if ([".", "?", "!"].includes(text[i - 1])) {
                typingTimeout = setTimeout(typeNextChar, speed * 10);
            } else {
                typingTimeout = setTimeout(typeNextChar, speed);
            }
        }
    }

    typeNextChar();
}