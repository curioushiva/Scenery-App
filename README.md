# Scenery App

Scenery is a modern entertainment discovery platform that helps users explore movies and TV shows in one place. It combines detailed information, personalized collections, and AI-assisted discovery into a fast and clean experience. Built as a personal project to explore modern web technologies and real-world application architecture, Scenery focuses on making content discovery simple and enjoyable.

<hr style="height:3px; border:none; background-color:#3D444D;">

## Features

### Discovery

- **Movie & TV Discovery** — Explore trending, popular, top-rated, upcoming releases, hidden gems, and genre-based collections
- **Smart Search** — Search movies, TV shows, and people with unified results
- **AI-Assisted Discovery** — Get personalized entertainment recommendations through an integrated AI assistant

### Detailed Title Experience

- **Detailed Information** — View ratings, runtime, genres, release dates, production studios, spoken languages, and much more
- **Cast & Crew** — Discover actors, creators, directors, and complete credits for every title
- **Trailers & Media** — Watch official trailers, teasers, and related videos without leaving the platform
- **Seasons & Episodes** — Browse TV show seasons with episode details and airing information
- **Streaming Availability** — Find where movies and shows are available to watch across different platforms
- **Reviews & Recommendations** — Read community reviews and explore similar titles based on your interests

### Personal Experience

* **Secure Accounts** — Create an account and access your personalized experience seamlessly across devices
* **Data Synchronization** — Account data, preferences, and personal collections stay updated and available wherever you sign in
* **Favorites & Watch Later** — Organize movies and TV shows into personal collections for quick access anytime
* **Profile Management** — Update your profile name, email address, and password while managing your account preferences
* **Account Recovery** — Reset forgotten passwords or permanently delete your account whenever you choose
* **Responsive Experience** — Enjoy a consistent experience across desktop, tablet, and mobile devices with smooth loading states

<hr style="height:3px; border:none; background-color:#3D444D;">

## Tech Stack

### Frontend

- **Core:** React, Vite
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Authentication:** Firebase
- **Database:** Cloud Firestore
- **API Handling:** Axios
- **Icons:** Remix Icon

### APIs & Services

- **Entertainment Data:** TMDB API
- **AI Integration:** Groq AI
- **Location Services:** IPinfo API
- **Media Content:** YouTube Data API v3

<hr style="height:3px; border:none; background-color:#3D444D;">

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- **npm** (included with Node.js)
- **Git**

<hr style="height:3px; border:none; background-color:#3D444D;">

## Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/curioushiva/Scenery-App.git
cd Scenery-App
```

2. **Install dependencies**

```bash
npm install
```
3. **Configure the Environment**

Copy the example environment file:

```bash
# Linux / macOS
cp .env.example .env

# Windows PowerShell
Copy-Item .env.example .env
```

4. **Start the development server**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

<hr style="height:3px; border:none; background-color:#3D444D;">

## Scenery Backend

Scenery app uses a dedicated backend to securely handle media, image, AI, and location requests while keeping API credentials private. Clone and configure the backend before setting up the frontend.

- **[Scenery Backend](https://github.com/curioushiva/Scenery-Backend)**

<hr style="height:3px; border:none; background-color:#3D444D;">

## Working Website

You can explore **[Scenery](https://scenery.curioushiva.in/)** live from here

<hr style="height:3px; border:none; background-color:#3D444D;">

## Contribution

Contributions are welcome! If you'd like to improve Scenery, follow these steps:

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add new feature"
   ```

4. Push your branch:

   ```bash
   git push origin feature-name
   ```

5. Open a Pull Request describing your changes.

<hr style="height:3px; border:none; background-color:#3D444D;">

## Acknowledgments

Scenery is the result of countless hours of learning, experimenting, redesigning, and solving real-world challenges. A sincere thank you to the open-source community for building incredible tools and to **TMDB** for providing the entertainment data that brings Scenery to life.

<hr style="height:3px; border:none; background-color:#3D444D;">

## About the Author

Developed by **[Curioushiva](https://www.instagram.com/curioushiva/)** — always curious about design, development, and the process of transforming simple ideas into products people genuinely enjoy using.