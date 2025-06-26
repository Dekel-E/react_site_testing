# React Testing Suite [![Playwright Tests](https://img.shields.io/badge/tests-Playwright-green.svg)](https://playwright.dev/)[![TypeScript](https://img.shields.io/badge/lang-TypeScript-blue.svg)](https://www.typescriptlang.org/)


As part of a home assignment I got, wrote a Playwright test suite for testing the React documentation website.

Usually I write tests in Python but it was a great opportunity to learn and improve my Typescript and Playwright skills.

## Overview

This repo provides automated tests for the React documentation site`https://react.dev`), covering functionality, accessibility, performance, and responsive design.

## Prerequisites

Before getting started, ensure you have the following installed:
- **Node.js**: Version 16.x or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone 'https://github.com/Dekel-E/react_site_testing.git'
   cd react_site_testing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (watch browsers)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run specific test file
npx playwright test 'test_filename.spec.ts'

# Run tests with specific browser or device
npx playwright test --project chromium

#Or
npx playwright test --project 'browser\device_name'

#Run tests in parallel and set number of workers (in deafult its already running in parallel)
npx playwright test --workers=4

# Run only failed tests
npx playwright test --last-failed
```



## Test Coverage

### Core Functionality
- **Search**: Search functionality, keyboard shortcuts, recent searches, favorites
- **Navigation**: Link validation, mobile menu, logo navigation
- **Theme Toggle**: Dark/light mode switching and persistence
- **Keyboard**: Tab navigation, arrow keys, accessibility shortcuts
- **Performence**: Basic metrics, needs to be expanded

### Layout & Responsive Design
- **Screenshots**: Visual testing across devices
- **Viewport Testing**: Mobile, tablet, and desktop layouts
- **Header/Footer**: Basic page structure validation

### Performance
- Page load time testing

## Project Structure

```
react_site_testing/
│
├── 📁 Harness/                       
│   ├── BasePage.ts                    # Base page class with common functionality
│   ├── ReactHomePage.ts               # Main page object for React homepage
│   ├── NavHarness.ts                  # Navigation handler
│   ├── SearchHarness.ts               # Search functionality handler
│   └── ThemeHarness.ts                # Theme toggle component handler
│
├── 📁 tests/                          # Test Specification Files
│   ├── basic-layout.spec.ts           # Layout and visual regression tests
│   ├── keyboard-functions.spec.ts     # Keyboard navigation and shortcuts tests
│   ├── navigation.spec.ts             # Navigation functionality tests
│   ├── performance.spec.ts            # Performance and load time tests
│   ├── search.spec.ts                 # Search functionality tests
│   └── 📁 basic-layout.spec.ts-snapshots/  # Visual test snapshots
│
├── 📁 playwright-report/              # Test Execution Reports
├── 📁 test-data/                      # Test Data Files
├── 📁 test-results/                   # Playwright Test Artifacts
│
├── 📄 constants.ts                    # Test constants and configuration
├── 📄 playwright.config.ts            # Playwright configuration
├── 📄 package.json                    # Dependencies and scripts
└── 📄 README.md                       
```

## Configuration
By default the test run on multiple browsers and devices, this can be changed in playwright.config.ts
or via  the command : npx playwright test --project 'device\browser'

on default the test runs on:
- Desktop: Chrome, Firefox, Safari
- Mobile: Chrome (Pixel 5), Safari (iPhone 12)
- Tablet: Chrome (iPad Pro)
  



## Reports

Test results are generated in multiple formats:
- HTML report: html
- JSON results: results.json
- JUnit XML: results.xml

View reports:
```bash
# Open the latest HTML report
npx playwright show-report

# Generate and open report
npm run report
```

