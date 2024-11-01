document.addEventListener("DOMContentLoaded", (e) => {
    const hue = Math.floor(Math.random() * 360);
    const styleElem = document.createElement("style");
    styleElem.innerHTML = `
    :root {
    --hue: ${hue};
    }
    `
    document.getElementsByTagName("head")[0].appendChild(styleElem);
  
    document.getElementsByTagName("body")[0].style.opacity = 1;
  
  });
  
  class UnicodeEntry {
    constructor(code, name, category) {
      this.code = code;
      this.name = name;
      this.category = category;
    }
  }
  
  // Function to calculate the Levenshtein distance
  function levenshtein(a, b) {
    const matrix = [];
  
    // Create an empty matrix
    for (let i = 0; i <= a.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= b.length; j++) {
      matrix[0][j] = j;
    }
  
    // Fill the matrix
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        if (a[i - 1] === b[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1]; // No operation
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // Substitution
            Math.min(matrix[i][j - 1] + 1, // Insertion
              matrix[i - 1][j] + 1) // Deletion
          );
        }
      }
    }
    return matrix[a.length][b.length];
  }
  
  async function loadUnicodeDatabase(url) {
    // Check if the data is already in localStorage
    const cachedData = localStorage.getItem('unicodeDatabase');
    if (cachedData) {
      return JSON.parse(cachedData).map(entry => new UnicodeEntry(entry.code, entry.name, entry.category));
    }
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to load the Unicode database");
  
      const xmlData = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, "application/xml");
  
      const unicodeEntries = [];
      const charElements = xmlDoc.getElementsByTagName("char");
  
      Array.from(charElements).forEach(charElem => {
        const code = charElem.getAttribute("cp");
        const name = charElem.getAttribute("na");
        const category = charElem.getAttribute("gc");
  
        if (code && name && category) {
          unicodeEntries.push(new UnicodeEntry(code, name, category));
        }
      });
  
      // Cache the unicode database in localStorage
      localStorage.setItem('unicodeDatabase', JSON.stringify(unicodeEntries));
  
      return unicodeEntries;
    } catch (error) {
      console.error("Error loading Unicode database:", error);
      return [];
    }
  }
  
  async function searchUnicodeByName(query, maxDistance = 2) {
    const url = "/data/unicode.xml";
    const unicodeDatabase = await loadUnicodeDatabase(url);
  
    // Create a Map for faster lookups based on name
    const unicodeMap = new Map();
    unicodeDatabase.forEach(entry => {
      const lowerName = entry.name.toLowerCase();
      if (!unicodeMap.has(lowerName)) {
        unicodeMap.set(lowerName, []);
      }
      unicodeMap.get(lowerName).push(entry);
    });
  
    // Exact match results
    const results = [];
    const lowerQuery = query.toLowerCase();
  
    // Search for exact matches first
    for (let [name, entries] of unicodeMap.entries()) {
      if (name.includes(lowerQuery)) {
        results.push(...entries);
      }
    }
  
    // Approximate matches
    for (let [name, entries] of unicodeMap.entries()) {
      if (levenshtein(lowerQuery, name) <= maxDistance) {
        results.push(...entries);
      }
    }
  
    return results;
  }
  
  function isPrintable(character) {
    const codePoint = character.codePointAt(0);
    // Check if the code point is in the printable range
    return (
      (codePoint >= 32 && codePoint <= 126) || // Basic Latin
      (codePoint >= 160 && codePoint <= 55295) || // Non-control characters in Latin-1 Supplement
      (codePoint >= 57344 && codePoint <= 1114111) // Supplementary Private Use Area
    );
  }
  
  
  
  
  async function displayResults() {
    const message = $("#none-message");
    message.css("opacity", "0");
    message.css("transform", "TranslateX(-50%) TranslateY(calc(48px - 50%))");
    setTimeout(() => {
      message.css("display", "none");
    }, 100);
    const input = document.querySelector("#search-input"); // Get search input
    const resultsContainer = document.querySelector("#results"); // Get results div
    const query = input.value; // Get the query from input
    const results = await searchUnicodeByName(query);
  
    $("#results").scrollTop(0);
  
    resultsContainer.innerHTML = ""; // Clear previous results
    let index = 0;
    results.forEach(result => {
      const unicodeCharacter = String.fromCodePoint(parseInt(result.code, 16)); // Convert code to character
  
      // Only display if the character is printable
      if (isPrintable(unicodeCharacter)) {
        const element = document.createElement("div");
        element.className = "result"; // Add a class for styling (optional)
  
        // Create a span for the character
        const characterSpan = document.createElement("span");
        characterSpan.textContent = unicodeCharacter;
  
        // Create a copy button
        const copyButton = document.createElement("button");
        copyButton.textContent = "Copy";
        copyButton.onclick = () => {
          navigator.clipboard.writeText(unicodeCharacter)
            .catch(err => {
              console.error("Failed to copy:", err);
            });
        };
  
        // Append character and button to the element
        element.appendChild(characterSpan);
        element.appendChild(copyButton);
        resultsContainer.appendChild(element); // Append the new element to the results container
        if (index >= 60) {
          setTimeout(() => {
            element.style.opacity = 1;
          }, 840);
        } else {
          setTimeout(() => {
            element.style.opacity = 1;
          }, 70 * (Math.floor(index / 9) + index % 9));
        }
        index++;
      }
    });
  
    if (index == 0) {
      setTimeout(() => {
        message.css("display", "flex");
      }, 100)
      setTimeout(() => {
        message.css("opacity", "1");
        message.css("transform", "TranslateX(-50%) TranslateY(-50%)")
      }, 200);
    }
  
    $(".result button").on("click", (e) => {
      const button = $(e.currentTarget);
      button.html("Copied!");
      setTimeout(() => {
        if (button.closest("body").length) {  // Check if button is still in DOM
          button.html("Copy");
        }
      }, 2000);
    });
  
  }
  
  function displayResultsFinal() {
    $("#loading").css("display", "block");
    $("#loading").css("opacity", "1");
    displayResults().then(() => {
      $("#loading").css("opacity", "0");
      setTimeout(() => {
        $("#loading").css("display", "none");
      }, 200);
    });
  
  
  }
  
  // Example usage
  document.querySelector("#search-button").addEventListener("click", displayResultsFinal); // Call displayResults on button click
  
  document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      displayResultsFinal();
    }
  })
  