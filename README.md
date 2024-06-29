# InMemory

InMemory is a memorial website dedicated to the fallen soldiers of the IDF in the "Swords of Steel" war.
This project aims to honor and remember the brave soldiers who sacrificed their lives.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- Memorial pages for each fallen soldier.
- Family stories section.
- Contact and donation pages.
- User authentication (registration and login).
- Localization support for Hebrew and English.

## Technologies Used
- **Frontend:**
    - Next.js (React framework)
    - TypeScript

- **Backend:**
    - Node.js
    - MongoDB
    - Mongoose

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/
   cd inmemory
   ```
2. **Set up environment variables:**
    Create a .env.local file in the root of the project and add the following variables:
    ```env
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    NEXT_PUBLIC_API_SECRET=your_api_secret
    ADMIN_PASSWORD=your_admin_password
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. **Run the development server:**
    ```bash
    npm run dev
    ```

## Usage
- Visit the website at [http://localhost:3000](http://localhost:3000).

## Folder Structure
```csharp
inmemory/
├── src/                            # Frontend source code
│   ├── app/                        # Next.js app directory
│   │    ├──[locale]/               # Localization routing
│   │    │     ├──[page]/           # Pages
│   │    │     │    └──page.tsx     # Page component
│   │    │     ├── layout.tsx       # Layout component
│   │    │     └── page.tsx         # Index page    
│   │    └──api/                    # API routes
│   ├── components/                 # React components
│   ├── lib/                        # Utility functions
│   ├── locales/                    # Localization files
│   ├── models/                     # Mongoose models
│   └── context/                    # React context
├── public/                         # Public assets
├── .gitignore
├── README.md
├── package.json
└── package-lock.json
```

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request if you find a bug or want to add a new feature.

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
