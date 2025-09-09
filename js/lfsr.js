class LFSR {
    constructor(seed) {
        this.state = parseInt(seed, 16) & 0xFF; // Convert hex seed to an 8-bit integer
    }
    next() {
        let bit = (
            (this.state >> 7) ^ 
            (this.state >> 5) ^ 
            (this.state >> 4) ^ 
            (this.state >> 3)) & 1;  

        this.state = ((this.state >> 1) | (bit << 7)) & 0xFF;
        return this.state;
    }

    getBinary() {
        return this.state.toString(2).padStart(8, '0');
    }

    getHex() {
        return this.state.toString(16).toUpperCase().padStart(2, '0');
    }
}

let lfsr;

function startLFSR() {
    let seed = document.getElementById("seed").value;
    lfsr = new LFSR(seed);
    updateDisplay();
}

function stepLFSR() {
    if (!lfsr) return;
    lfsr.next();
    updateDisplay();
}

function updateDisplay() {
    let binary = lfsr.getBinary();
    document.getElementById("output").textContent = `Current State: ${binary} (Hex: ${lfsr.getHex()})`;

    let bitContainer = document.getElementById("bitDisplay");

    
    while (bitContainer.firstChild) {
        bitContainer.removeChild(bitContainer.firstChild);
    }

    for (let bit of binary) {
        let span = document.createElement("span");
        span.className = "bit";
        span.textContent = bit;
        bitContainer.appendChild(span);
    }
}