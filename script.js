// DOM elements
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');
const fileSelectBtn = document.getElementById('file-select');
const status = document.getElementById('status');
const resultSection = document.getElementById('result-section');
const resultText = document.getElementById('result-text');
const copyBtn = document.getElementById('copy-btn');
const downloadBtn = document.getElementById('download-btn');

// Global variables
let processedContent = '';
let originalFileName = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// Set up all event listeners
function setupEventListeners() {
    // Dropzone events
    dropzone.addEventListener('dragover', handleDragOver);
    dropzone.addEventListener('dragleave', handleDragLeave);
    dropzone.addEventListener('drop', handleDrop);
    dropzone.addEventListener('click', () => fileInput.click());
    
    // File input events
    fileInput.addEventListener('change', handleFileSelect);
    fileSelectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });
    
    // Button events
    copyBtn.addEventListener('click', copyToClipboard);
    downloadBtn.addEventListener('click', downloadResult);
    
    // Prevent default drag behaviors on the entire document
    document.addEventListener('dragover', (e) => e.preventDefault());
    document.addEventListener('drop', (e) => e.preventDefault());
}

// Drag and drop handlers
function handleDragOver(e) {
    e.preventDefault();
    dropzone.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    dropzone.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

// File processing
function processFile(file) {
    // Validate file type
    if (!isValidTextFile(file)) {
        showStatus('Please select a valid text file (.txt, .md, .csv, .json, etc.)', 'error');
        return;
    }
    
    originalFileName = file.name;
    showStatus('Processing file...', 'processing');
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const content = e.target.result;
            processedContent = processTextContent(content);
            displayResult();
            showStatus('File processed successfully!', 'success');
        } catch (error) {
            showStatus('Error processing file: ' + error.message, 'error');
        }
    };
    
    reader.onerror = function() {
        showStatus('Error reading file. Please try again.', 'error');
    };
    
    reader.readAsText(file);
}

function isValidTextFile(file) {
    const validTypes = [
        'text/plain',
        'text/markdown',
        'text/csv',
        'application/json',
        'text/html',
        'text/css',
        'text/javascript',
        'application/javascript',
        'text/xml',
        'application/xml'
    ];
    
    // Check MIME type
    if (validTypes.includes(file.type)) {
        return true;
    }
    
    // Check file extension as fallback
    const validExtensions = ['.txt', '.md', '.csv', '.json', '.log', '.xml', '.html', '.css', '.js', '.py', '.java', '.cpp', '.c', '.php'];
    const fileName = file.name.toLowerCase();
    return validExtensions.some(ext => fileName.endsWith(ext));
}

// Main text processing function - extracts words/phrases from stenographic suggestion files
function processTextContent(content) {
    const lines = content.split('\n').filter(line => line.trim() !== '');
    const extractedWords = [];
    
    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine && trimmedLine.includes('|')) {
            // Split by pipe separator and get the left side
            const leftSide = trimmedLine.split('|')[0].trim();
            
            if (leftSide) {
                // Remove { } and ^ symbols but keep periods, commas, and quotation marks
                const cleanedWord = leftSide.replace(/[{}^]/g, '');
                
                if (cleanedWord.trim()) {
                    extractedWords.push(cleanedWord.trim());
                }
            }
        }
    });
    
    // Join all extracted words with pipe characters
    const result = extractedWords.join('|');
    
    return result;
}

function displayResult() {
    resultText.value = processedContent;
    resultSection.classList.remove('hidden');
    resultText.scrollTop = 0;
}

// Clipboard functionality
async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(processedContent);
        
        // Visual feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.classList.remove('copied');
        }, 2000);
        
        showStatus('Content copied to clipboard!', 'success');
    } catch (error) {
        // Fallback for older browsers
        try {
            resultText.select();
            document.execCommand('copy');
            showStatus('Content copied to clipboard!', 'success');
        } catch (fallbackError) {
            showStatus('Unable to copy to clipboard. Please select and copy manually.', 'error');
        }
    }
}

// Download functionality
function downloadResult() {
    const blob = new Blob([processedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `processed_${originalFileName || 'result.txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    showStatus('File downloaded successfully!', 'success');
}

// Status message handling
function showStatus(message, type) {
    status.textContent = message;
    status.className = `status ${type}`;
    status.classList.remove('hidden');
    
    // Auto-hide success messages after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            status.classList.add('hidden');
        }, 3000);
    }
}

// Utility functions
function resetInterface() {
    resultSection.classList.add('hidden');
    status.classList.add('hidden');
    fileInput.value = '';
    processedContent = '';
    originalFileName = '';
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+V or Cmd+V to trigger file selection
    if ((e.ctrlKey || e.metaKey) && e.key === 'v' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        fileInput.click();
    }
    
    // Ctrl+C or Cmd+C to copy result (when result is visible)
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !resultSection.classList.contains('hidden') && !e.target.matches('input, textarea')) {
        e.preventDefault();
        copyToClipboard();
    }
    
    // Escape to reset interface
    if (e.key === 'Escape') {
        resetInterface();
    }
});

// Add paste support for direct text paste
document.addEventListener('paste', function(e) {
    if (!e.target.matches('input, textarea')) {
        e.preventDefault();
        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
        if (pastedText.trim()) {
            originalFileName = 'pasted_text.txt';
            showStatus('Processing pasted text...', 'processing');
            try {
                processedContent = processTextContent(pastedText);
                displayResult();
                showStatus('Pasted text processed successfully!', 'success');
            } catch (error) {
                showStatus('Error processing pasted text: ' + error.message, 'error');
            }
        }
    }
});

// Handle unsupported browsers
if (!navigator.clipboard) {
    console.warn('Clipboard API not supported, using fallback');
}