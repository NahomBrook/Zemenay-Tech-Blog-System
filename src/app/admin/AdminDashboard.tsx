// src/app/admin/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  User,
  BarChart2,
  MessageCircle,
  LogOut,
  CheckCircle,
  Database,
  ListCheck,
  Bell,
} from "lucide-react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

type View = "overview" | "profile" | "analytics" | "chatbot" | "updates" | "users" | "todo";

interface User {
  id: string;
  username: string;
  category: string;
  status: "active" | "banned";
  posts: number;
}

interface Update {
  id: string;
  content: string;
  postedBy: string;
  timestamp: string;
}

interface Todo {
  id: string;
  task: string;
  assignedTo: string;
  status: "pending" | "in-progress" | "done";
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState<View>("overview");
  const [search, setSearch] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Mock data (replace with API calls)
  const [users, setUsers] = useState<User[]>([
    { id: "1", username: "Alice", category: "Web Development", status: "active", posts: 15 },
    { id: "2", username: "Bob", category: "AI", status: "active", posts: 8 },
    { id: "3", username: "Charlie", category: "Blockchain", status: "banned", posts: 0 },
  ]);

  const [updates, setUpdates] = useState<Update[]>([
    { id: "1", content: "New blog features added!", postedBy: "Segni", timestamp: "2025-08-09T10:00:00Z" },
  ]);

  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", task: "Review new posts", assignedTo: "Segni", status: "pending" },
    { id: "2", task: "Update category list", assignedTo: "Nahom", status: "in-progress" },
  ]);

  const [newUpdate, setNewUpdate] = useState("");
  const [newTodo, setNewTodo] = useState("");

  // Profile state
  const [profile, setProfile] = useState({
    username: "Segni",
    avatar: "/default-avatar.png",
    password: "",
  });

  // Move useMemo above render logic
  const filteredUsers = useMemo(() => {
    if (!search) return users;
    return users.filter((u) => u.username.toLowerCase().includes(search.toLowerCase()));
  }, [search, users]);

  // Analytics data (mock)
  const analyticsData = useMemo(() => ({
    dailyViews: [50, 60, 55, 70, 65, 80, 90],
    weeklyViews: [350, 400, 420, 450, 480],
    monthlyViews: [1500, 1600, 1700, 1800],
    dailyPosts: [2, 3, 1, 4, 2, 5, 3],
    weeklyPosts: [15, 18, 20, 22, 25],
    monthlyPosts: [60, 65, 70, 75],
    trendingCategories: [
      { name: "Web Development", count: 120 },
      { name: "AI", count: 90 },
      { name: "Blockchain", count: 60 },
      { name: "Cloud Computing", count: 45 },
    ],
  }), []);

  // Hardcoded login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "Segni" && password === "Nahi") {
      setIsLoggedIn(true);
      setProfile((p) => ({ ...p, username }));
    } else {
      alert("Invalid credentials");
    }
  };

  // Handle avatar upload preview
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setProfile((p) => ({ ...p, avatar: reader.result as string }));
        setAvatarError("");
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarError("Please select a valid image file");
    }
  };

  // Chart options
  const chartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" as const }, tooltip: { enabled: true } },
    scales: { y: { beginAtZero: true } },
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const messageVariants = {
    hidden: (isUser: boolean) => ({
      opacity: 0,
      x: isUser ? 20 : -20
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    },
  };

  // Sidebar component
  const Sidebar = () => (
    <motion.nav
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-gray-700 p-6 flex flex-col shadow-lg"
    >
      <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Zemenay Admin
      </h1>
      <nav className="flex flex-col space-y-3 text-gray-700 dark:text-gray-300 text-sm flex-grow">
        {[
          { name: "Overview", id: "overview", icon: Database },
          { name: "Profile", id: "profile", icon: User },
          { name: "Analytics", id: "analytics", icon: BarChart2 },
          { name: "AI Chatbot", id: "chatbot", icon: MessageCircle },
          { name: "Updates", id: "updates", icon: Bell },
          { name: "Users", id: "users", icon: User },
          { name: "To-Do List", id: "todo", icon: ListCheck },
        ].map(({ name, id, icon: Icon }) => (
          <motion.button
            key={id}
            onClick={() => setView(id as View)}
            className={`flex items-center gap-2 px-3 py-2 rounded text-left font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors shadow-sm ${
              view === id ? "bg-gray-300 dark:bg-slate-700 text-gray-900 dark:text-gray-100" : ""
            }`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Icon className="h-4 w-4" />
            {name}
          </motion.button>
        ))}
      </nav>
      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <Button
          variant="destructive"
          onClick={() => setIsLoggedIn(false)}
          className="mt-auto shadow-md"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </motion.div>
    </motion.nav>
  );

  // Overview component
  const Overview = () => {
    const pages = [
      "Home",
      "User Profile",
      "Admin Dashboard",
      "Blog",
      "Login",
      "Categories",
      "Tags",
    ];
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="shadow-lg rounded-lg p-6 bg-white dark:bg-slate-800"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Website Overview</h2>
        <p className="mb-6 max-w-xl text-gray-700 dark:text-gray-300">
          All main pages are functioning smoothly. Status updated in real-time.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <motion.div
              key={page}
              className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
            >
              <CheckCircle className="text-green-500 w-8 h-8 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{page}</p>
                <p className="text-green-600 dark:text-green-400 text-sm">Working Well ✓</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  // Profile component
  const Profile = () => {
    const [usernameInput, setUsernameInput] = useState(profile.username);
    const [newPassword, setNewPassword] = useState("");

    const saveProfileChanges = (e: React.FormEvent) => {
      e.preventDefault();
      setProfile((p) => ({
        ...p,
        username: usernameInput,
        password: newPassword || p.password,
      }));
      if (avatarFile) {
        setAvatarError("");
      }
      alert("Profile updated!");
      setNewPassword("");
      setAvatarFile(null);
      setAvatarPreview(null);
    };

    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="shadow-lg rounded-lg p-6 bg-white dark:bg-slate-800"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Edit Profile</h2>
        <form onSubmit={saveProfileChanges} className="max-w-md space-y-6">
          <label className="block">
            <span className="text-gray-700 dark:text-gray-300">Username</span>
            <Input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              className="mt-1 shadow-sm"
            />
          </label>
          <label className="block">
            <span className="text-gray-700 dark:text-gray-300">Profile Picture</span>
            <Input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-1 shadow-sm"
            />
            {avatarError && <p className="text-red-600 text-sm mt-1">{avatarError}</p>}
            {(avatarPreview || profile.avatar) && (
              <motion.img
                src={avatarPreview || profile.avatar}
                alt="Avatar"
                className="mt-4 w-24 h-24 rounded-full object-cover border border-gray-300 dark:border-gray-700 shadow-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </label>
          <label className="block">
            <span className="text-gray-700 dark:text-gray-300">New Password</span>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Leave blank to keep current"
              className="mt-1 shadow-sm"
            />
          </label>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button type="submit" className="shadow-md">Save Changes</Button>
          </motion.div>
        </form>
      </motion.div>
    );
  };

  // Analytics component
  const Analytics = () => {
    const barData = {
      labels: analyticsData.trendingCategories.map((c) => c.name),
      datasets: [
        {
          label: "Trending Categories",
          data: analyticsData.trendingCategories.map((c) => c.count),
          backgroundColor: ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B"],
        },
      ],
    };

    const lineData = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Daily Views",
          data: analyticsData.dailyViews,
          borderColor: "#3B82F6",
          backgroundColor: "#3B82F680",
          tension: 0.3,
        },
        {
          label: "Daily Posts",
          data: analyticsData.dailyPosts,
          borderColor: "#10B981",
          backgroundColor: "#10B98180",
          tension: 0.3,
        },
      ],
    };

    const weeklyLineData = {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      datasets: [
        {
          label: "Weekly Views",
          data: analyticsData.weeklyViews,
          borderColor: "#3B82F6",
          backgroundColor: "#3B82F680",
          tension: 0.3,
        },
        {
          label: "Weekly Posts",
          data: analyticsData.weeklyPosts,
          borderColor: "#10B981",
          backgroundColor: "#10B98180",
          tension: 0.3,
        },
      ],
    };

    const monthlyLineData = {
      labels: ["Month 1", "Month 2", "Month 3", "Month 4"],
      datasets: [
        {
          label: "Monthly Views",
          data: analyticsData.monthlyViews,
          borderColor: "#3B82F6",
          backgroundColor: "#3B82F680",
          tension: 0.3,
        },
        {
          label: "Monthly Posts",
          data: analyticsData.monthlyPosts,
          borderColor: "#10B981",
          backgroundColor: "#10B98180",
          tension: 0.3,
        },
      ],
    };

    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="shadow-lg rounded-lg p-6 bg-white dark:bg-slate-800"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Blog Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Trending Categories", chart: <Bar data={barData} options={chartOptions} /> },
            { title: "Daily Growth", chart: <Line data={lineData} options={chartOptions} /> },
            { title: "Weekly Growth", chart: <Line data={weeklyLineData} options={chartOptions} /> },
            { title: "Monthly Growth", chart: <Line data={monthlyLineData} options={chartOptions} /> },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-slate-900 shadow-md hover:shadow-xl transition-shadow"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <div style={{ height: "200px" }}>{item.chart}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  // Chatbot component
  const Chatbot = () => {
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
    const [input, setInput] = useState("");

    const handleChat = () => {
      if (!input.trim()) return;
      setMessages((prev) => [...prev, { text: input, isUser: true }]);
      const response = getChatbotResponse(input);
      setMessages((prev) => [...prev, { text: response, isUser: false }]);
      setInput("");
    };

    const getChatbotResponse = (question: string): string => {
      const q = question.toLowerCase();
      if (q.includes("overview")) {
        return "The Overview page shows the status of all website pages, like Home, Blog, and Users. Each page is marked as 'Working Well' if no issues are detected.";
      } else if (q.includes("profile")) {
        return "The Profile page lets you update your username, password, and profile picture. Upload an image to change your avatar.";
      } else if (q.includes("analytics")) {
        return "The Analytics page displays blog stats, including daily, weekly, and monthly views and posts, plus trending categories in a bar graph.";
      } else if (q.includes("users")) {
        return "The Users page lists all users, their categories, status (active or banned), and post counts. The AI can scan for spam or violent posts and ban users.";
      } else if (q.includes("updates")) {
        return "The Updates page shows notifications and posts from other admins. You can also post new updates for the Zemenay community.";
      } else if (q.includes("todo") || q.includes("to-do")) {
        return "The To-Do List shows tasks assigned to admins, their status (pending, in-progress, done), and allows you to add or update tasks.";
      } else {
        return "I'm here to help with admin dashboard questions! Try asking about Overview, Profile, Analytics, Users, Updates, or To-Do List.";
      }
    };

    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="shadow-lg rounded-lg p-6 bg-white dark:bg-slate-800"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">AI Chatbot</h2>
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-slate-900 max-w-lg shadow-md">
          <div className="h-64 overflow-y-auto mb-4 p-2 bg-white dark:bg-slate-800 rounded shadow-inner">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`mb-2 ${msg.isUser ? "text-right" : "text-left"}`}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  custom={msg.isUser}
                >
                  <span
                    className={`inline-block p-2 rounded-lg shadow-sm ${
                      msg.isUser ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {msg.text}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the admin dashboard..."
              onKeyDown={(e) => e.key === "Enter" && handleChat()}
              className="shadow-sm"
            />
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button onClick={handleChat} className="shadow-md">Send</Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Updates component
  const Updates = () => {
    const handlePostUpdate = () => {
      if (!newUpdate.trim()) return;
      setUpdates((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: newUpdate,
          postedBy: profile.username,
          timestamp: new Date().toISOString(),
        },
      ]);
      setNewUpdate("");
    };

    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="shadow-lg rounded-lg p-6 bg-white dark:bg-slate-800"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Updates</h2>
        <div className="mb-6">
          <Textarea
            value={newUpdate}
            onChange={(e) => setNewUpdate(e.target.value)}
            placeholder="Write a new update for the Zemenay community..."
            className="mb-2 shadow-sm"
            rows={4}
          />
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button onClick={handlePostUpdate} className="shadow-md">Post Update</Button>
          </motion.div>
        </div>
        <div className="space-y-4">
          {updates.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300">No updates yet.</p>
          ) : (
            <AnimatePresence>
              {updates.map((update) => (
                <motion.div
                  key={update.id}
                  className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-slate-900 shadow-md hover:shadow-xl transition-shadow"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <p className="text-gray-900 dark:text-gray-100">{update.content}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Posted by {update.postedBy} on {new Date(update.timestamp).toLocaleString()}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    );
  };

  // Users component
  const Users = () => {
    const handleBanUser = (userId: string, reason: string) => {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, status: "banned", posts: 0 } : u
        )
      );
      alert(`User banned for: ${reason}`);
    };

    const checkForSpam = (userId: string) => {
      const user = users.find((u) => u.id === userId);
      if (!user) return;
      // Mock AI check
      const isSpam = Math.random() > 0.8; // Simulate 20% chance of spam
      if (isSpam) {
        handleBanUser(userId, "Detected spam or violent content");
      } else {
        alert("No spam or violent content detected.");
      }
    };

    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="shadow-lg rounded-lg p-6 bg-white dark:bg-slate-800"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Users Management</h2>
        <Table className="shadow-md">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Username</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Posts</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  className="border-b"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.category}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>{user.posts}</TableCell>
                  <TableCell>
                    <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="inline-block mr-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => checkForSpam(user.id)}
                        className="shadow-sm"
                      >
                        Check Spam
                      </Button>
                    </motion.div>
                    {user.status !== "banned" && (
                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="inline-block">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const reason = prompt("Reason for banning:");
                            if (reason) handleBanUser(user.id, reason);
                          }}
                          className="shadow-sm"
                        >
                          Ban
                        </Button>
                      </motion.div>
                    )}
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>
    );
  };

  // To-Do component
  const ToDo = () => {
    const handleAddTodo = () => {
      if (!newTodo.trim()) return;
      setTodos((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          task: newTodo,
          assignedTo: profile.username,
          status: "pending",
        },
      ]);
      setNewTodo("");
    };

    const handleStatusChange = (id: string, status: Todo["status"]) => {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status } : t))
      );
    };

    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="shadow-lg rounded-lg p-6 bg-white dark:bg-slate-800"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Admin To-Do List</h2>
        <div className="mb-6 flex gap-2 max-w-md">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="New task"
            onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
            className="shadow-sm"
          />
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button onClick={handleAddTodo} className="shadow-md">Add</Button>
          </motion.div>
        </div>
        <Table className="shadow-md">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Task</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {todos.map((todo) => (
                <motion.tr
                  key={todo.id}
                  className="border-b"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <TableCell>{todo.task}</TableCell>
                  <TableCell>{todo.assignedTo}</TableCell>
                  <TableCell>
                    <select
                      value={todo.status}
                      onChange={(e) => handleStatusChange(todo.id, e.target.value as Todo["status"])}
                      className="border rounded p-1 shadow-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>
    );
  };

  // Login page
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 p-6">
        <motion.form
          onSubmit={handleLogin}
          className="w-full max-w-sm p-8 bg-white dark:bg-slate-800 rounded-md shadow-xl hover:shadow-2xl transition-shadow"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Sign In</h1>
          <motion.label
            className="block mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-gray-700 dark:text-gray-300">Username</span>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 shadow-sm"
              autoFocus
            />
          </motion.label>
          <motion.label
            className="block mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-gray-700 dark:text-gray-300">Password</span>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 shadow-sm"
            />
          </motion.label>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button type="submit" className="w-full shadow-md">Sign In</Button>
          </motion.div>
        </motion.form>
      </main>
    );
  }

  // Main dashboard
  return (
    <main className="min-h-screen flex bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="px-6 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-lg border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-shadow"
          >
            <Input
              type="search"
              placeholder="Search admin panel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none focus:ring-0 shadow-sm"
            />
          </motion.div>
        </div>
        <section className="container mx-auto p-6 max-w-7xl flex-grow overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[60vh]"
            >
              {view === "overview" && <Overview />}
              {view === "profile" && <Profile />}
              {view === "analytics" && <Analytics />}
              {view === "chatbot" && <Chatbot />}
              {view === "updates" && <Updates />}
              {view === "users" && <Users />}
              {view === "todo" && <ToDo />}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}