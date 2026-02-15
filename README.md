# Task Board - Kanban-Style Task Management

A modern, production-ready task management application built as part of a frontend internship assignment. This project demonstrates clean architecture, state management best practices, and real-world development workflows.

---

## 🎯 What This Project Does

This is a fully functional Kanban board where you can create, organize, and track tasks across three stages: **To Do**, **Doing**, and **Done**. Tasks can be dragged between columns, searched, filtered, and sorted. Every action is logged in real-time, and all your data persists locally so nothing gets lost when you refresh the page.

I built this to showcase my understanding of React fundamentals, state management patterns, and how to structure a scalable frontend application.

---

## ✨ Features

### Core Functionality
- **Authentication System** - Secure login with session persistence (demo credentials provided)
- **Task Management** - Create, edit, and delete tasks with full form validation
- **Drag & Drop** - Smooth task movement between columns using @dnd-kit
- **Smart Filtering** - Search by title, filter by priority, sort by due date
- **Activity Tracking** - Real-time log of all actions (create, edit, delete, move)
- **Data Persistence** - Everything saves to localStorage automatically

### Task Properties
Each task includes:
- Title (required)
- Description
- Priority level (Low, Medium, High)
- Due date
- Custom tags
- Automatic timestamps

### User Experience
- Responsive design that works on mobile and desktop
- Visual feedback during drag operations
- Confirmation dialogs for destructive actions
- Color-coded priorities and columns
- Relative timestamps (e.g., "5m ago", "2h ago")

---

## 🛠️ Tech Stack

**Core Framework:**
- React 19 - Component-based UI
- Vite - Lightning-fast build tool

**Routing & State:**
- React Router - Client-side routing with protected routes
- Context API + useReducer - Centralized state management
- localStorage - Client-side persistence

**UI & Interactions:**
- Tailwind CSS - Utility-first styling
- @dnd-kit - Accessible drag and drop
- React Hook Form - Form validation and management

**Testing:**
- Vitest - Unit and integration testing
- React Testing Library - Component testing

---

## 🏗️ Architecture & Design Decisions

### Why Context API + useReducer?

I chose this combination over Redux or Zustand because:
1. **No external dependencies** - Keeps the bundle size small
2. **Predictable state updates** - All changes go through defined actions
3. **Easy to test** - Reducers are pure functions
4. **Perfect for this scale** - Not over-engineering for a medium-sized app

The reducer pattern makes it easy to track what's happening in the app. Every state change is explicit and logged, which helped immensely during development and debugging.

### State Management Flow

```
User Action → Dispatch Action → Reducer Logic → New State → localStorage → UI Update
```

All business logic lives in reducers, not components. This keeps components clean and focused on rendering.

### Folder Structure

```
src/
├── components/       # UI components organized by feature
│   ├── auth/        # Login, protected routes
│   ├── board/       # Board, columns, search/filter
│   ├── tasks/       # Task cards and forms
│   ├── activity/    # Activity log
│   └── layout/      # Header, shared UI
├── context/         # Global state providers
├── reducers/        # State logic (auth, tasks)
├── hooks/           # Custom hooks (filtering, etc.)
├── utils/           # Helper functions
└── tests/           # Unit and integration tests
```

This structure scales well. If I needed to add new features (like user profiles or team collaboration), I'd just add new folders without touching existing code.

### Why localStorage?

For this assignment, localStorage is perfect because:
- No backend needed
- Data persists across sessions
- Fast and synchronous
- Works offline

In a production app with multiple users, I'd replace this with a REST API or GraphQL backend, but the reducer logic would stay the same.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <https://github.com/manojrb22/task-board.git>
cd task-board

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5174`

### Demo Credentials

```
Email: intern@demo.com
Password: intern123
```

Check the "Remember me" box to stay logged in across sessions.

---

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

**Test Coverage:**
- Authentication flow (login success/failure)
- Task CRUD operations
- Drag & drop state updates
- State immutability verification

---

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized production bundle in the `dist/` folder.

---

## 🌐 Deployment

### Deploying to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts and your app will be live!

**Important:** For SPA routing to work, create a `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

This ensures all routes redirect to index.html so React Router can handle navigation.

### Live Demo
🔗 **[https://task-board-gamma-henna.vercel.app](https://task-board-gamma-henna.vercel.app)**

---

## 🎓 What I Learned

Building this project taught me:

1. **State Management at Scale** - How to structure reducers for maintainability
2. **Component Composition** - Breaking UI into reusable, testable pieces
3. **Performance Optimization** - Using useMemo to prevent unnecessary re-renders
4. **Testing Strategies** - Writing meaningful tests that catch real bugs
5. **Production Practices** - Error handling, validation, user feedback

The biggest challenge was implementing drag & drop while maintaining clean state logic. I solved this by keeping all state updates in the reducer and using @dnd-kit's event handlers to dispatch actions.

---

## 🔮 Future Improvements

If I had more time, I'd add:

- **Backend Integration** - Replace localStorage with a real API
- **User Accounts** - Multiple users with separate boards
- **Collaboration** - Real-time updates using WebSockets
- **Subtasks** - Break large tasks into smaller pieces
- **Dark Mode** - Theme toggle with preference persistence
- **Keyboard Shortcuts** - Power user features (Ctrl+N for new task, etc.)
- **Task Templates** - Quick-create common task types
- **Export/Import** - Backup data as JSON
- **Analytics Dashboard** - Task completion rates, time tracking
- **Notifications** - Reminders for due dates

---

## 📝 Code Quality

**Principles I Followed:**
- ✅ No business logic in JSX
- ✅ Single responsibility per component
- ✅ Immutable state updates
- ✅ Proper error handling
- ✅ Accessible UI (semantic HTML, ARIA labels)
- ✅ Responsive design
- ✅ Clean, readable code

---

## 🤝 Contributing

This is an assignment project, but feedback is always welcome! If you spot any issues or have suggestions, feel free to open an issue.

---

## 📄 License

This project is open source and available for educational purposes.

---

## 👨‍💻 About

Built as part of a frontend internship assignment to demonstrate React proficiency, state management skills, and production-level development practices.

**Key Takeaway:** This isn't just a todo app. It's a demonstration of how I think about architecture, user experience, and writing maintainable code that other developers can work with.

---

## 📧 Contact

For questions or opportunities, reach out at: manojbadiger22@gmail.com


**Thank you for reviewing my work!** 🚀
