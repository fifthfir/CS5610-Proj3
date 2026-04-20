# WatWildlife

## Authors
- Ruotian Zhang
- Alptug Guven

## Class Link
https://johnguerra.co/classes/webDevelopment_online_spring_2026/

## Project Name
WatWildlife

## Project Objective
WatWildlife is a full-stack wildlife identification and sighting tracking web application for hikers, explorers, and nature enthusiasts. Users can search for likely matching wildlife species by filtering observation traits such as animal type, habitat, wings, tail type, number of legs, size, color, and region. Users can also save and manage their own sightings, while administrators can manage the species encyclopedia by creating, editing, and deleting species entries.

The goal of the project is to make wildlife discovery more approachable by combining:
- a searchable wildlife encyclopedia
- a candidate-matching search experience
- a personal sightings tracker with authentication

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
- Browse a wildlife encyclopedia of species entries
- Filter species by traits such as subtype, habitat, size, color, and region
- View species details in a dedicated modal
- Search for likely wildlife matches using observation filters
- Register and log in as a user
- Save candidate species to My Sightings
- View and manage personal saved sightings
- Admin-only species management for create, edit, and delete operations

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
- **Ruotian Zhang** implemented the **Search** and **My Sightings** features.
- **Alptug Guven** implemented the **Browse** feature.

## Screenshots
![Login Page](./client/src/assets/screenshots/1-login.png)
![Search Page](./client/src/assets/screenshots/3-search.png)
![My sightings Page](./client/src/assets/screenshots/2-mysightings.png)
![Browse Page](./client/src/assets/screenshots/4-browse.png)

## Instructions to Build and Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/fifthfir/CS5610-Proj3.git
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