# WatWildlife

## Authors
- Ruotian Zhang
- Alptug Guven

## Class Link
https://johnguerra.co/classes/webDevelopment_online_spring_2026/

## Project Name
WatWildlife

## Project Objective
WatWildlife is a full-stack wildlife identification and sighting tracking web application for hikers, explorers, and nature enthusiasts.

The app supports three related user goals:

- **Browse** animal profiles like a digital wildlife field guide
- **Search** for likely matches when a user does not know an animal’s name
- **Save** species to **My Sightings** for later review and note-taking

Users can filter animals by traits such as subtype, habitat, wings, tail type, number of legs, size, color, region, and whether the animal is marked as **toxic or venomous**. Administrators can also manage the species encyclopedia by creating, editing, and deleting species entries.

## Design Document
Please refer to:
[Design Document on Google Doc](https://docs.google.com/document/d/1vYnra4bTlV29P2OLqSaK0bk7P75pFIvQBhvHDgEEUAo/edit?tab=t.0)

## Google Slides
Please refer to:
[Introduction on Google Slides](https://docs.google.com/presentation/d/1-p7JDoJz50qN2YJ79GG_FZ4DKbWAXe_EPhGu2KlFoHQ/edit?slide=id.g3c89cae159e_0_129#slide=id.g3c89cae159e_0_129)

## Project Links
- GitHub repository: https://github.com/fifthfir/CS5610-Proj3
- Deployment: https://cs5610-proj-final.onrender.com
- Video Demonstration: https://youtu.be/EiyqbrvwmM0

## Key Features

### 1. Browse
Browse is designed for slower, curiosity-driven exploration.

Users can:
- explore the animal encyclopedia like a field guide
- filter by traits such as subtype, habitat, size, color, region, and toxic/venomous status
- open a detailed species modal
- read expanded species sections such as:
  - overview
  - appearance and visible traits
  - habitat
  - region and range
  - behavior
  - identification tips
  - risk to humans
  - benefits to humans

### 2. Search
Search is designed for users who **do not know the name** of the animal they saw.

Users can:
- enter observed traits
- narrow possibilities using habitat and region clues
- use the **Toxic or Venomous** filter as a simple safety-oriented clue
- review likely candidate matches
- save a likely match directly to **My Sightings**

### 3. My Sightings
My Sightings is the user’s personal saved collection.

Users can:
- save species they want to revisit
- view their saved sightings
- add and edit notes
- delete saved sightings

Each logged-in user only sees their own saved records.

### 4. Authentication and Admin Controls
- Users can register and log in
- Authentication uses **Passport.js**
- Admin-only species management is protected on the backend
- Admins can create, edit, and delete species entries

## Accessibility & Usability Improvements

To improve usability and accessibility, the application was updated so it can be used with the keyboard and better supports screen readers and structured navigation.

### Keyboard Accessibility
- All interactive elements use semantic HTML such as `<button>`, `<input>`, `<select>`, and `<textarea>`
- Users can navigate the app using keyboard controls such as `Tab`, `Shift + Tab`, `Enter`, and `Space`
- Focus states are visible across interactive elements

![Keyboard clean](./client/src/assets/screenshots/5-keyboard.png)

### Semantic Structure Improvements
- Major content areas use semantic structure such as `<main>`, `<section>`, `<fieldset>`, and `<ul>/<li>`
- Card grids for Browse, Search, and My Sightings use semantic list structure where appropriate
- Related form controls are grouped with `<fieldset>` and `<legend>`

### Form and Label Enhancements
- Proper labels were added for all form fields
- Region and Habitat were clarified for users during testing
- Search now includes a clearer safety-oriented clue with the **Toxic or Venomous** field

### Dynamic Feedback
- `aria-live` regions are used for saving, deleting, and other live updates
- Modals and interactive sections were improved for clearer focus and navigation behavior

### Usability Improvements
Based on usability feedback, the project was improved in several concrete ways:

- clearer distinction between **Login** and **Register**
- clearer distinction between **Region** and **Habitat**
- clearer distinction between **Browse** and **Search**
- richer species details so entries feel more useful as encyclopedia-style profiles
- improved support for filter combinations that previously returned weak or empty results
- better support for safety-related questions through the **Toxic or Venomous** filter and detail section

## Accessibility & Usability Improvements

To improve usability and meet accessibility requirements, several updates were made to ensure the application can be fully used with a keyboard and passes automated accessibility checks (Lighthouse / axe):

### 1. Keyboard Accessibility
- All interactive elements use semantic HTML (`<button>`, `<input>`, `<select>`) instead of non-standard elements.
- Users can navigate the entire application using only the keyboard (`Tab`, `Shift+Tab`, `Enter`, `Space`).
- Focus states are clearly visible for all interactive elements.

![Keyboard clean](./client/src/assets/screenshots/5-keyboard.png)

### 2. Semantic Structure Improvements
- Replaced non-semantic layouts with proper structures such as `<main>`, `<section>`, `<fieldset>`, and `<ul>/<li>`.
- Card grids (Search, Browse, My Sightings) now use `<ul>` and `<li>` for better accessibility and screen reader support.
- Removed default list styling (padding and bullets) via CSS to maintain visual layout while preserving semantic meaning.

### 3. Form and Label Enhancements
- Added proper `<label>` elements for all form inputs.
- Improved filter clarity (e.g., Region vs Habitat) with clearer labeling and descriptions.
- Grouped related inputs using `<fieldset>` and `<legend>`.

### 4. ARIA and Screen Reader Support
- Added `aria-label`, `aria-labelledby`, and `aria-describedby` where needed.
- Implemented `aria-live` regions to announce dynamic updates (e.g., saving notes, deleting sightings, search results).
- Improved accessibility of modals and interactive sections.

### 5. Consistent UI Structure
- Unified card grid layout across Search, Browse, and My Sightings pages.
- Standardized spacing, alignment, and component structure for a more consistent user experience.

### Usability Improvements

- Clarified the distinction between **Login** and **Register** by adding prominent red text guidance on the authentication page, helping users immediately understand which action they are performing.

- Improved the search experience by adding clear descriptions for **Habitat** and **Region** filters, helping users distinguish between environment type and geographic location.

## Team Contributions
- **Ruotian Zhang** implemented the **Search** and **My Sightings** features
- **Alptug Guven** implemented the **Browse** feature

For the final iteration, both members also contributed to design, usability, accessibility, and content improvements across the shared application.

## Screenshots
![Login Page](./client/src/assets/screenshots/1-login.png)
![Search Page](./client/src/assets/screenshots/3-search.png)
![My Sightings Page](./client/src/assets/screenshots/2-mysightings.png)
![Browse Page](./client/src/assets/screenshots/4-browse.png)

## Instructions to Build and Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/fifthfir/CS5610-Proj3.git
cd CS5610-Proj3
cd CS5610-Proj3
```

### 2. Install dependencies
Install the frontend dependencies:
```bash
cd client
npm install
```

Then install the backend dependencies:
```bash
cd ../server
npm install
```

### 3. Create the backend `.env` file
This project includes a template file at:

```text
server/.env.example
```

The real `server/.env` file is not included in GitHub. That is intentional.

To run the project locally, create your own `server/.env` file by copying `server/.env.example`.

On Windows PowerShell, from inside the `server` folder:
```powershell
Copy-Item .env.example .env
```

On macOS/Linux, from inside the `server` folder:
```bash
cp .env.example .env
```

After that, you should have this file:
```text
server/.env
```

### 4. Edit `server/.env`
Open `server/.env` and update the placeholder values.

Your file should look like this:
```env
MONGO_URI=your_mongodb_connection_string_here
DB_NAME=Project_2
PORT=3000
SESSION_SECRET=replace_with_a_long_random_string
SPECIES_COLLECTION=species
SIGHTINGS_COLLECTION=sightings
USERS_COLLECTION=users
ADMIN_USERNAMES=demo1
```

Update these values:

- `MONGO_URI`  
  Replace `your_mongodb_connection_string_here` with your own MongoDB connection string.

- `SESSION_SECRET`  
  Replace `replace_with_a_long_random_string` with your own secret string for local development.

Leave these values unchanged unless you intentionally want different names/configuration:
```env
DB_NAME=Project_2
PORT=3000
SPECIES_COLLECTION=species
SIGHTINGS_COLLECTION=sightings
USERS_COLLECTION=users
ADMIN_USERNAMES=demo1
```

Example completed file:
```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/?retryWrites=true&w=majority
DB_NAME=Project_2
PORT=3000
SESSION_SECRET=my_local_watwildlife_secret_12345
SPECIES_COLLECTION=species
SIGHTINGS_COLLECTION=sightings
USERS_COLLECTION=users
ADMIN_USERNAMES=demo1
```

### 5. Seed the database
If you want to populate the database with sample data, run this from the `server` folder:
```bash
node seed.js
```

### 6. Start the backend server
From the `server` folder:
```bash
npm start
```

### 7. Start the frontend
Open a second terminal in the project root and run:
```bash
cd client
npm run dev
```

### 8. Open the app
Open the following URL:
```text
http://localhost:5173
```

## Troubleshooting

### The `.env` file is missing from GitHub
That is normal. The real `server/.env` file is intentionally not committed.

Use `server/.env.example` to create your own local `server/.env` file.

### Should I edit `.env.example`?
No.

Copy `.env.example` to `.env`, then edit `.env`.

### Which values do I need to change?
You should update:
- `MONGO_URI`
- `SESSION_SECRET`

You should usually leave these unchanged:
- `DB_NAME=Project_2`
- `PORT=3000`
- `SPECIES_COLLECTION=species`
- `SIGHTINGS_COLLECTION=sightings`
- `USERS_COLLECTION=users`
- `ADMIN_USERNAMES=demo1`

## About Seed Data
To support development and testing, we use a scripted seed file `seed.js` to generate 1000+ demo data instead of relying on a large real-world wildlife dataset.

Species data is created from a curated list of animal records with fixed attributes such as common name, scientific name, subtype, habitat, size, color, and region.

Sightings data is then generated randomly by sampling from the inserted species and demo users.

Each generated sighting copies key species fields and adds randomized values such as user, note, and status.

This approach gives us a large enough dataset for searching, browsing, filtering, and user record features while keeping the project lightweight and easy to set up. Although it does not represent complete real-world wildlife data, it effectively simulates a larger dataset for demonstration, testing, and course project purposes.
