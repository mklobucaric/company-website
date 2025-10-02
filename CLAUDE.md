# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static multilingual company website for techXflow d.o.o. showcasing AI/ML services, references, and examples. The site is hosted on Firebase and supports three languages: English, German, and Croatian.

## Deployment

**Deploy to Firebase hosting:**
```bash
firebase deploy
```

The `/public` directory is the deployment target (configured in `firebase.json`). Changes must be synced from root HTML files to `/public` before deployment.

## Architecture

### Multilingual Structure
The site maintains **three separate HTML files** at the root:
- `index.html` (English)
- `index_de.html` (German)
- `index_hr.html` (Croatian)

**Important**: When updating content, changes must be applied consistently across all three language versions. Each file contains the same structure and sections (About, Services, References, Examples) with translated content.

Language switching is implemented via flag links in the navigation that redirect to the respective HTML files.

### File Organization
- **Root HTML files**: Source of truth for site content
- **`/public`**: Deployed version copied from root (includes HTML + assets)
- **`/assets`**: Shared resources
  - `/css/styles.css` - Custom styles
  - `/js/scripts.js` - Bootstrap component initialization and navigation logic
  - `/dist` - Bootstrap framework files
  - `/image` - Images, videos, screenshots, flowcharts

### Framework & Components
Built with **Bootstrap 5** (dark theme by default):
- Popovers for Mission/Location/Mobile contact info
- Tooltips for email links
- Modals for screenshot/flowchart galleries
- Accordions for References and Examples sections
- Responsive navigation with mobile collapse

JavaScript in `scripts.js` initializes all Bootstrap components on `DOMContentLoaded` and handles navigation active state.

## Development Workflow

1. Edit HTML files in repository root
2. Test changes locally (open HTML files in browser)
3. Copy updated files to `/public` directory
4. Deploy with `firebase deploy`

**Note**: There is no build system, package manager, or compilation step. This is a pure static HTML/CSS/JS site.

## Content Synchronization

When modifying site content or structure:
1. Update the English version (`index.html`) first
2. Apply equivalent changes to German (`index_de.html`) and Croatian (`index_hr.html`) versions
3. Ensure all three versions maintain identical HTML structure (IDs, classes, Bootstrap components)
4. Verify responsive behavior across all language versions
