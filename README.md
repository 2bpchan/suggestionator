# Suggestionator

A simple static webpage that processes text files through a drag-and-drop interface and copies the result to your clipboard. Perfect for hosting on GitHub Pages.

## Features

- 🎯 **Drag & Drop Interface**: Simply drag text files onto the dropzone
- 📁 **Multiple File Format Support**: .txt, .md, .csv, .json, .log, .xml, .html, .css, .js, and more
- ✂️ **Clipboard Integration**: Automatically copy processed results to clipboard
- 💾 **Download Results**: Save processed content as a file
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⌨️ **Keyboard Shortcuts**: Ctrl+V to select files, Ctrl+C to copy results, Escape to reset
- 📋 **Paste Support**: Paste text directly for processing

## How to Use

1. **Open the website**: Visit the GitHub Pages URL
2. **Add your text file**: 
   - Drag and drop a text file onto the dropzone, or
   - Click "browse files" to select a file, or
   - Paste text directly with Ctrl+V
3. **View results**: The processed content appears in the text area
4. **Copy to clipboard**: Click "Copy to Clipboard" or press Ctrl+C
5. **Download (optional)**: Click "Download Result" to save the processed file

## Text Processing Function

The current implementation converts input text into a numbered suggestion format with metadata. You can easily customize the `processTextContent()` function in `script.js` to implement your own text processing logic.

Example transformations you could implement:
- Convert text to uppercase/lowercase
- Extract email addresses or URLs
- Count words and characters
- Format as markdown
- Apply custom formatting rules

## GitHub Pages Setup

1. **Fork or clone this repository**
2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"
3. **Access your site**: Your site will be available at `https://yourusername.github.io/suggestionator`

## Customization

### Modify Text Processing
Edit the `processTextContent()` function in `script.js`:

```javascript
function processTextContent(content) {
    // Your custom processing logic here
    return processedText;
}
```

### Update Styling
Modify `styles.css` to change the appearance:
- Colors and gradients
- Layout and spacing
- Responsive breakpoints
- Animations

### Add New Features
The modular JavaScript structure makes it easy to add new features:
- Additional file format support
- Different processing modes
- Export options
- User preferences

## Browser Compatibility

- **Modern browsers**: Full functionality including Clipboard API
- **Older browsers**: Fallback clipboard support using text selection
- **Mobile devices**: Touch-friendly interface with responsive design

## Security

- All processing happens client-side in the browser
- No data is sent to external servers
- Files are processed locally and securely

## File Structure

```
suggestionator/
├── index.html          # Main HTML page
├── styles.css          # Styling and layout
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this code for your own projects!

---

**Built for GitHub Pages** • **No server required** • **Privacy-focused**