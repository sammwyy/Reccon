# 🕵️‍♂️ Reccon

**Reccon** is a web-based application designed to detect and gather usernames across platforms, based on Sherlock Project.

---

## 🌟 Features

- 🔍 **Global Search:** Search across multiple social networks and platforms simultaneously.
- 🌐 **Real-Time Analysis:** Get instant feedback as results come in from each platform.
- 🔒 **Privacy First:** No data storage, all searches are ephemeral and secure.
- 🔧 **Monorepo Structure:** Unified codebase for frontend and backend.

---

## 🚀 Getting Started (Building)

### Prerequisites

Ensure you have the following installed:

- 🖥️ **Node.js** (v18+)
- 📦 **bun** (v1.1+)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sammwyy/reccon.git
   ```

2. Navigate to the project directory:

   ```bash
   cd reccon
   ```

3. Install dependencies for both frontend and backend:

   ```bash
   bun install
   ```

4. Start the app:

   ```bash
   bun run dev
   ```

5. Open your browser and visit:

   ```bash
   http://localhost:5173
   ```

---

## 🛠️ Technologies Used

### Frontend

- ⚛️ **React.js**: For building the dynamic user interface.
- ⚡ **Vite**: Fast build tool for modern web development.
- 🎨 **Tailwind CSS**: For a responsive and modern design.
- ⌨️ **TypeScript**: Ensuring type safety and better developer experience.

### Backend

- 🌐 **Express.js**: Backend framework for creating API endpoints.
- 🔄 **Socket.IO**: Enabling real-time communication.
- 📜 **TypeScript**: Enhancing code reliability and maintainability.

---

## 📂 Project Structure

```plaintext
Reccon/
├── server/            # Backend server files
│   ├── queue/         # Queue management
│   ├── routes/        # API endpoints
│   ├── services/      # Services and instances managers.
│   ├── types/         # Type definitions
│   ├── utils/         # Utility functions and helpers
│   ├── finder.ts      # Username finder
│   ├── index.ts       # Entry point
├── src/               # Frontend application
│   ├── components/    # React components and pages
│   ├── hooks/         # React hooks
│   ├── styles/        # CSS (style) files
│   ├── types/         # Type definitions
│   ├── App.tsx        # Root component
│   ├── main.tsx       # Entry point
├── package.json       # Root project metadata
├── tsconfig.json      # TypeScript configuration
├── tailwind.config.js # Tailwind CSS configuration
├── vite.config.ts     # Vite configuration
└── README.md          # Project documentation
```

---

## 🤝 Contributing

We welcome contributions from the community! 🧩

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your message here"
   ```

4. Push to the branch:

   ```bash
   git push origin feature-name
   ```

5. Open a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
