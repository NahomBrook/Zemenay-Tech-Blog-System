"use client";

import React, { useMemo, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User, Save, Loader2, BarChart2, LifeBuoy, LogOut, Edit3, MessageCircle, Wallet } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from "chart.js";
import { Pie, Line, Bar } from "react-chartjs-2";
import type { ChartOptions } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

// Mock APIs (replace with your backend)
const updateUserProfile = async (data: { name: string; username: string; bio: string; avatar?: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { success: true };
};

// Animation variants
const sidebarVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const chartVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

const dialogVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
};

type Tx = { id: string; date: string; desc: string; amount: number; type: "credit" | "debit" };

export default function ProfileDashboard() {
  const { data: session } = useSession();
  const [user, setUser] = useState({
    name: session?.user?.name ?? "Nahom",
    username: session?.user?.name ? session.user.name.split(" ").join("").toLowerCase() : "nahom91",
    email: session?.user?.email ?? "nahom@example.com",
    avatar: session?.user?.image ?? "/default-avatar.png",
    bio: "Full-stack dev building real stuff.",
    status: "Pro", // Subscription tier: "Pro" | "Basic"
    posts: { published: 24, drafts: 6 },
  });

  const [transactions] = useState<Tx[]>([
    { id: "t1", date: "2025-07-28", desc: "Website Dev for Client X", amount: 150.0, type: "credit" },
    { id: "t2", date: "2025-06-10", desc: "API Integration for Zemenay App", amount: 200.5, type: "credit" },
    { id: "t3", date: "2025-05-02", desc: "Refund - Digital Solution Test", amount: -15.0, type: "debit" },
  ]);

  const analytics = useMemo(() => ({
    views: [120, 140, 160, 180, 200, 220, 260],
    followersNew: [1, 0, 2, 3, 1, 4, 0],
    interactions: { likes: 340, comments: 88, shares: 46 },
  }), []);

  const [view, setView] = useState<"profile" | "analytics" | "faq" | "chatbot">("profile");
  const [editTemp, setEditTemp] = useState({ name: user.name, username: user.username, bio: user.bio, avatar: user.avatar });
  const [isSaving, setIsSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const viewsLineData = {
    labels: ["6d", "5d", "4d", "3d", "2d", "1d", "today"],
    datasets: [
      {
        label: "Views",
        data: analytics.views,
        fill: false,
        borderColor: "#3B82F6", // blue-500
        backgroundColor: "#3B82F6",
        tension: 0.3,
        borderWidth: 2,
      },
    ],
  };

  const interactionsPieData = {
    labels: ["Likes", "Comments", "Shares"],
    datasets: [
      {
        data: [analytics.interactions.likes, analytics.interactions.comments, analytics.interactions.shares],
        backgroundColor: ["#10B981", "#3B82F6", "#8B5CF6"], // green-500, blue-500, purple-500
        borderColor: ["#059669", "#2563EB", "#7C3AED"],
        borderWidth: 1,
      },
    ],
  };

  const interactionsBarData = {
    labels: ["Likes", "Comments", "Shares"],
    datasets: [
      {
        label: "Interactions",
        data: [analytics.interactions.likes, analytics.interactions.comments, analytics.interactions.shares],
        backgroundColor: ["#10B981", "#3B82F6", "#8B5CF6"],
        borderColor: ["#059669", "#2563EB", "#7C3AED"],
        borderWidth: 1,
      },
    ],
  };

  const smallLineOptions: ChartOptions<'line'> = { 
    maintainAspectRatio: false, 
    plugins: { legend: { display: false } }, 
    elements: { point: { radius: 0 } }, 
    scales: { x: { display: false }, y: { display: false } } 
  };

  const smallPieOptions: ChartOptions<'pie'> = { 
    maintainAspectRatio: false, 
    plugins: { legend: { display: false } } 
  };

  const chartOptions: ChartOptions<'line' | 'bar'> = { 
    maintainAspectRatio: false, 
    plugins: { 
      legend: { 
        position: 'bottom' as const
      } 
    } 
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setEditTemp({ ...editTemp, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = async () => {
    setIsSaving(true);
    try {
      await updateUserProfile({ name: editTemp.name, username: editTemp.username, bio: editTemp.bio, avatar: editTemp.avatar });
      setUser({ ...user, name: editTemp.name, username: editTemp.username, bio: editTemp.bio, avatar: editTemp.avatar });
      setAvatarPreview(null);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Mock chatbot responses
  const getChatbotResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("software") || lowerInput.includes("zemenay")) {
      return "Zemenay's digital solutions include website development, API integrations, and custom software for businesses. How can I assist you further?";
    }
    return "I'm here to help with Zemenay's digital solutions! Ask about our services or your account.";
  };

  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    { sender: "bot", text: "Welcome to Zemenay's Chatbot! Ask about our digital solutions or your account." },
  ]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { sender: "user", text: chatInput }, { sender: "bot", text: getChatbotResponse(chatInput) }]);
      setChatInput("");
    }
  };

  return (
    <div className="w-screen -ml-6 overflow-x-hidden">
      <div className="flex w-screen">
        {/* SIDEBAR */}
        <motion.aside
          className="w-56 h-[calc(100vh-4rem)] border-r border-border/10 p-2 bg-white/60 dark:bg-slate-900/50 overflow-y-auto sticky top-16 flex-shrink-0"
          initial="hidden"
          animate="visible"
          variants={sidebarVariants}
        >
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-semibold">{user.name}</div>
              <div className="text-xs text-muted-foreground">@{user.username}</div>
            </div>
          </div>

          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => setView("profile")}
              className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-primary/5 ${view === "profile" ? "bg-primary/5 text-primary" : ""}`}
              aria-current={view === "profile" ? "page" : undefined}
            >
              <Edit3 className="h-4 w-4" /> Profile
            </button>

            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-primary/5">
                  <Save className="h-4 w-4" /> Edit Profile
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  <label className="text-sm">Avatar</label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={avatarPreview || editTemp.avatar} alt="Avatar Preview" />
                      <AvatarFallback>
                        <User className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    <Input type="file" accept="image/*" onChange={handleAvatarChange} className="w-auto" />
                  </div>
                  <label className="text-sm">Name</label>
                  <Input value={editTemp.name} onChange={(e) => setEditTemp({ ...editTemp, name: e.target.value })} />
                  <label className="text-sm">Username</label>
                  <Input value={editTemp.username} onChange={(e) => setEditTemp({ ...editTemp, username: e.target.value })} />
                  <label className="text-sm">Bio</label>
                  <Textarea value={editTemp.bio} onChange={(e) => setEditTemp({ ...editTemp, bio: e.target.value })} rows={4} />
                  <div className="flex justify-end">
                    <Button onClick={saveProfile} disabled={isSaving}>
                      {isSaving ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                      Save
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-primary/5">
                  <Wallet className="h-4 w-4" /> Transactions
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Zemenay Digital Solutions Transactions</DialogTitle>
                </DialogHeader>
                <div className="mt-2">
                  <div className="text-sm text-muted-foreground mb-2">Recent transactions for digital solutions</div>
                  <div className="max-h-64 overflow-auto border rounded p-2">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs text-muted-foreground">
                          <th>Date</th>
                          <th>Service</th>
                          <th className="text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((t) => (
                          <tr key={t.id}>
                            <td className="py-2">{t.date}</td>
                            <td>{t.desc}</td>
                            <td className={`text-right font-medium ${t.amount >= 0 ? "text-green-600" : "text-red-500"}`}>
                              {t.amount >= 0 ? "+" : "-"}${Math.abs(t.amount).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <button
              onClick={() => setView("analytics")}
              className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-primary/5 ${view === "analytics" ? "bg-primary/5 text-primary" : ""}`}
            >
              <BarChart2 className="h-4 w-4" /> Analytics
            </button>

            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-primary/5">
                  <MessageCircle className="h-4 w-4" /> My Chatbot
                </button>
              </DialogTrigger>
              <motion.div variants={dialogVariants} initial="hidden" animate="visible">
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Zemenay Chatbot</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium">About Zemenay Digital Solutions</p>
                      <p>Zemenay provides cutting-edge digital solutions, including website development, API integrations, and custom software tailored for businesses. Your {user.status} subscription grants access to priority support and enhanced features.</p>
                    </div>
                    <div className="border rounded p-4 max-h-64 overflow-y-auto">
                      {chatMessages.map((msg, index) => (
                        <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                          <span className={`inline-block p-2 rounded ${msg.sender === "user" ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-700"}`}>
                            {msg.text}
                          </span>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleChatSubmit} className="flex gap-2">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask about Zemenay's solutions..."
                        className="flex-1"
                      />
                      <Button type="submit">Send</Button>
                    </form>
                  </div>
                </DialogContent>
              </motion.div>
            </Dialog>

            <button
              onClick={() => setView("faq")}
              className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-primary/5 ${view === "faq" ? "bg-primary/5 text-primary" : ""}`}
            >
              <LifeBuoy className="h-4 w-4" /> FAQ
            </button>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-red-50 text-red-600 mt-3"
            >
              <LogOut className="h-4 w-4" /> Log Out
            </button>
          </nav>

          <div className="mt-6 text-xs text-muted-foreground">
            <div>
              Subscription: <span className={`font-medium ml-1 ${user.status === "Pro" ? "text-amber-500" : "text-gray-500"}`}>{user.status}</span>
            </div>
          </div>
        </motion.aside>

        {/* MAIN AREA */}
        <section className="flex-1 p-4 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={contentVariants}
            >
              {/* Primary header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <div className="text-sm text-muted-foreground">@{user.username} • {user.email}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-muted-foreground">Subscription</div>
                  <div className={`px-3 py-1 rounded-full text-sm ${user.status === "Pro" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"}`}>{user.status}</div>
                </div>
              </div>

              {view === "profile" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1">
                      <div className="p-4 border rounded">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              <User className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-lg font-semibold">{user.name}</div>
                            <div className="text-xs text-muted-foreground">@{user.username}</div>
                            <div className="text-sm text-muted-foreground mt-1">{user.email}</div>
                          </div>
                        </div>
                        <div className="mt-4 text-sm">
                          <div className="font-medium">Bio</div>
                          <p className="text-muted-foreground mt-1">{user.bio}</p>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm">Edit profile</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-3">
                                <label className="text-sm">Avatar</label>
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-16 w-16">
                                    <AvatarImage src={avatarPreview || editTemp.avatar} alt="Avatar Preview" />
                                    <AvatarFallback>
                                      <User className="h-8 w-8" />
                                    </AvatarFallback>
                                  </Avatar>
                                  <Input type="file" accept="image/*" onChange={handleAvatarChange} className="w-auto" />
                                </div>
                                <label className="text-sm">Name</label>
                                <Input value={editTemp.name} onChange={(e) => setEditTemp({ ...editTemp, name: e.target.value })} />
                                <label className="text-sm">Username</label>
                                <Input value={editTemp.username} onChange={(e) => setEditTemp({ ...editTemp, username: e.target.value })} />
                                <label className="text-sm">Bio</label>
                                <Textarea value={editTemp.bio} onChange={(e) => setEditTemp({ ...editTemp, bio: e.target.value })} rows={4} />
                                <div className="flex justify-end">
                                  <Button onClick={saveProfile} disabled={isSaving}>
                                    {isSaving ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Save"}
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" variant="ghost" onClick={() => setView("analytics")}>
                            View analytics
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3 border rounded text-center">
                          <div className="text-xs text-muted-foreground">Published</div>
                          <div className="text-lg font-semibold">{user.posts.published}</div>
                        </div>
                        <div className="p-3 border rounded text-center">
                          <div className="text-xs text-muted-foreground">Drafts</div>
                          <div className="text-lg font-semibold">{user.posts.drafts}</div>
                        </div>
                        <div className="p-3 border rounded text-center">
                          <div className="text-xs text-muted-foreground">Followers (new)</div>
                          <div className="text-lg font-semibold">{analytics.followersNew.reduce((a, b) => a + b, 0)}</div>
                        </div>
                      </div>
                      <motion.div className="p-3 border rounded grid grid-cols-1 md:grid-cols-3 gap-4 items-center" variants={chartVariants} initial="hidden" animate="visible">
                        <div className="col-span-2">
                          <div className="text-sm font-medium">Views (last 7 days)</div>
                          <div style={{ height: 70 }} className="mt-2">
                            <Line data={viewsLineData} options={smallLineOptions} />
                          </div>
                        </div>
                        <div className="col-span-1 text-center">
                          <div className="text-sm font-medium">Interactions</div>
                          <div style={{ height: 70, width: 70 }} className="mx-auto mt-2">
                            <Pie data={interactionsPieData} options={smallPieOptions} />
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">
                            {analytics.interactions.likes} 👍 • {analytics.interactions.comments} 💬 • {analytics.interactions.shares} ↗
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  <div className="p-4 border rounded">
                    <h3 className="text-lg font-semibold mb-3">FAQ</h3>
                    <div className="space-y-2">
                      <details className="p-2 rounded hover:bg-slate-50">
                        <summary className="cursor-pointer font-medium">How do I withdraw my earnings?</summary>
                        <div className="mt-2 text-sm text-muted-foreground">Request withdrawal via Transactions → Withdraw. Processed within 5 business days.</div>
                      </details>
                      <details className="p-2 rounded hover:bg-slate-50">
                        <summary className="cursor-pointer font-medium">How are digital solution payments calculated?</summary>
                        <div className="mt-2 text-sm text-muted-foreground">Based on service contracts with Zemenay (e.g., website development, API integrations).</div>
                      </details>
                      <details className="p-2 rounded hover:bg-slate-50">
                        <summary className="cursor-pointer font-medium">How do I upgrade to Pro?</summary>
                        <div className="mt-2 text-sm text-muted-foreground">Visit account settings or contact support for upgrade options.</div>
                      </details>
                    </div>
                  </div>
                </div>
              )}

              {view === "analytics" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded">
                      <div className="text-sm text-muted-foreground">Total Views</div>
                      <div className="text-2xl font-bold">{analytics.views.reduce((a, b) => a + b, 0)}</div>
                    </div>
                    <div className="p-4 border rounded">
                      <div className="text-sm text-muted-foreground">New Followers</div>
                      <div className="text-2xl font-bold">{analytics.followersNew.reduce((a, b) => a + b, 0)}</div>
                    </div>
                    <div className="p-4 border rounded">
                      <div className="text-sm text-muted-foreground">Interactions</div>
                      <div className="text-2xl font-bold">{analytics.interactions.likes + analytics.interactions.comments + analytics.interactions.shares}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div className="p-4 border rounded" variants={chartVariants} initial="hidden" animate="visible">
                      <h4 className="text-sm font-medium">Views trend</h4>
                      <div style={{ height: 220 }} className="mt-3">
                        <Line data={viewsLineData} options={chartOptions} />
                      </div>
                    </motion.div>
                    <motion.div className="p-4 border rounded" variants={chartVariants} initial="hidden" animate="visible">
                      <h4 className="text-sm font-medium">Interactions breakdown</h4>
                      <div style={{ height: 220 }} className="mt-3">
                        <Bar data={interactionsBarData} options={chartOptions} />
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {view === "faq" && (
                <div className="p-4 border rounded">
                  <h3 className="text-lg font-semibold mb-4">Help / FAQ</h3>
                  <div className="space-y-3">
                    <details className="p-3 border rounded">
                      <summary className="font-medium cursor-pointer">How to edit profile?</summary>
                      <div className="mt-2 text-sm text-muted-foreground">Use the Edit Profile button in the sidebar or profile section to update name, username, and bio.</div>
                    </details>
                    <details className="p-3 border rounded">
                      <summary className="font-medium cursor-pointer">Digital solution transactions</summary>
                      <div className="mt-2 text-sm text-muted-foreground">View payments for services like website development and API integrations in the Transactions section.</div>
                    </details>
                    <details className="p-3 border rounded">
                      <summary className="font-medium cursor-pointer">Subscription tiers</summary>
                      <div className="mt-2 text-sm text-muted-foreground">Pro subscriptions offer higher payout rates and priority support.</div>
                    </details>
                  </div>
                </div>
              )}

              {view === "chatbot" && (
                <motion.div className="p-4 border rounded" variants={dialogVariants} initial="hidden" animate="visible">
                  <h3 className="text-lg font-semibold mb-4">Zemenay Chatbot</h3>
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium">About Zemenay Digital Solutions</p>
                      <p>Zemenay provides cutting-edge digital solutions, including website development, API integrations, and custom software tailored for businesses. Your {user.status} subscription grants access to priority support and enhanced features.</p>
                    </div>
                    <div className="border rounded p-4 max-h-64 overflow-y-auto">
                      {chatMessages.map((msg, index) => (
                        <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                          <span className={`inline-block p-2 rounded ${msg.sender === "user" ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-700"}`}>
                            {msg.text}
                          </span>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleChatSubmit} className="flex gap-2">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask about Zemenay's solutions..."
                        className="flex-1"
                      />
                      <Button type="submit">Send</Button>
                    </form>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}