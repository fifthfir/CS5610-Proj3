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
- Deployment: https://cs5610-proj3.onrender.com/
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
```bash
cd client
npm install
cd ../server
npm install
```

### 3. Get the environment file
Ask the authors for the `.env` file.

### 4. Seed the database
If you want to populate the database with sample data, run:
```
cd server
node seed.js
```

### 5. Start the backend server and the frontend
```
cd ../server
npm start
cd .../client
npm run dev
```

### 6. Open the app
Open the following URL:
```
http://localhost:5173
```

## About Seed Data
To support development and testing, we use a scripted seed file `seed.js` to generate demo data instead of relying on a large real-world wildlife dataset.

Species data is created from a curated list of animal records with fixed attributes such as common name, scientific name, subtype, habitat, size, color, and region.

Sightings data is then generated randomly by sampling from the inserted species and demo users.

Each generated sighting copies key species fields and adds randomized values such as user, note, and status.

This approach gives us a large enough dataset for searching, browsing, filtering, and user record features while keeping the project lightweight and easy to set up. Although it does not represent complete real-world wildlife data, it effectively simulates a larger dataset for demonstration, testing, and course project purposes.