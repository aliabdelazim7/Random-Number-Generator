# Advanced Random Number Generator

A modern, feature-rich random number generator with beautiful themes, comprehensive statistics, and advanced generation options.

## Features

- **Modern Design**: Clean, responsive interface with glassmorphism effects
- **Theme Switching**: Toggle between dark and light themes
- **Custom Range**: Set minimum and maximum values for number generation
- **Multiple Generation Modes**: Generate single numbers or multiple numbers at once
- **Animation Options**: Choose between instant or animated number generation
- **Repeat Prevention**: Option to exclude previously generated numbers
- **Generation History**: Track all generated numbers with timestamps
- **Statistics Dashboard**: View total generated, average, highest, and lowest numbers
- **Data Export**: Export generation history to CSV format
- **Keyboard Shortcuts**: Use spacebar or Enter to generate numbers
- **Responsive Design**: Works perfectly on all device sizes
- **Data Persistence**: All data is saved locally in your browser

## How to Use

1. **Set Range**: Enter minimum and maximum values for number generation
2. **Choose Options**:
   - Check "Exclude repeated numbers" to avoid duplicates
   - Check "Animate generation" for visual number rolling effect
3. **Generate Numbers**:
   - Click "Generate Number" for a single number
   - Click "Generate Multiple" for up to 10 numbers
4. **View History**: See all generated numbers with timestamps and ranges
5. **Export Data**: Download your generation history as a CSV file
6. **Theme Toggle**: Click the moon/sun button to switch themes

## Keyboard Shortcuts

- **Spacebar** or **Enter**: Generate a single random number
- **Tab**: Navigate between form elements

## Generation Options

- **Range**: Set any range from -999,999 to 999,999
- **Animation**: Watch numbers "roll" before settling on final result
- **Uniqueness**: Prevent duplicate numbers in your generation history
- **Batch Generation**: Generate multiple numbers at once (up to 10)

## Technologies Used

- HTML5
- CSS3 (with CSS Variables and Grid)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter)
- Font Awesome Icons
- Local Storage for data persistence

## File Structure

```
Random Num js/
├── index.html      # Main HTML structure
├── style.css       # Styling and themes
├── script.js       # Random number generator logic
└── README.md       # This file
```

## Getting Started

1. Open `index.html` in your web browser
2. Set your desired range and options
3. Start generating random numbers!
4. Explore the history and statistics features

## Browser Support

Works in all modern browsers that support:

- CSS Grid
- CSS Variables
- ES6 Classes
- Local Storage
- CSS Animations
- Blob API (for CSV export)

## Data Storage

All generation history is stored locally in your browser using Local Storage. This means:

- Your data persists between browser sessions
- Data is private and not shared with any servers
- You can clear data using the "Clear History" button
- Export your data anytime as a CSV file

## Use Cases

- **Gaming**: Random dice rolls, card shuffling
- **Education**: Random selection for classroom activities
- **Research**: Random sampling and data generation
- **Entertainment**: Random challenges, giveaways
- **Development**: Testing random number generation algorithms
