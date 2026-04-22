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