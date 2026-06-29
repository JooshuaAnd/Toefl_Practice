"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import {
  User as UserIcon,
  Mail,
  Award,
  Shield,
  Bell,
  LogOut,
  CheckCircle,
  FileText,
  Clock,
  Activity,
  Flame,
  KeyRound
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AccountPage() {
  const { user, logout } = useAuth();

  // Settings State
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [accountType, setAccountType] = useState(user?.accountType || "individual");
  const [successMsg, setSuccessMsg] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);

  // Password Simulation
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const updatedUser = {
      ...user,
      name,
      email,
      accountType
    };

    localStorage.setItem("linguedu_user", JSON.stringify(updatedUser));
    setSuccessMsg("Profile updated successfully! Refresh to see final updates.");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;

    setSuccessMsg("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col gap-1">
          <h1 className="font-fustat text-3xl font-extrabold text-slate-800">Account Management</h1>
          <p className="font-inter text-slate-500 text-sm max-w-lg">
            Manage your personal profile, review learning statistics, subscription options, and workspace preferences.
          </p>
        </div>

        {/* Global Toast Success Alert */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-xs flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Account Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile Card & Learning Stats */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Profile Detail Card */}
            <div className="glass-card p-6 rounded-[24px] border border-white/50 text-center space-y-4">
              <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-tr from-brand-light to-brand-main text-white flex items-center justify-center font-bold text-3xl shadow-md">
                {user.name.charAt(0).toUpperCase()}
              </div>
              
              <div>
                <h3 className="font-fustat text-lg font-bold text-slate-800">{user.name}</h3>
                <span className="text-xs text-slate-400 font-medium">{user.email}</span>
              </div>

              <div className="flex justify-center gap-2">
                <Badge className="bg-brand-light/10 text-brand-dark border-brand-light/20">
                  {user.accountType === "individual" ? "Individual Learner" : "Corporate Account"}
                </Badge>
                <Badge className="bg-purple-50 text-purple-600 border-purple-100">
                  TOEFL Level C1
                </Badge>
              </div>
            </div>

            {/* Learning Statistics */}
            <div className="glass-card p-6 rounded-[24px] border border-white/50 space-y-5">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Activity className="h-4.5 w-4.5 text-brand-main" />
                Learning Statistics
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/50">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Practice Hours</span>
                  <span className="text-xl font-bold text-slate-700 block mt-0.5">38.5 hrs</span>
                </div>
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/50">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Avg accuracy</span>
                  <span className="text-xl font-bold text-slate-700 block mt-0.5">88%</span>
                </div>
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/50">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Streak</span>
                  <span className="text-xl font-bold text-slate-700 block mt-0.5 flex items-center gap-1">
                    <Flame className="h-4.5 w-4.5 text-orange-500 fill-orange-500" />
                    <span>5 Days</span>
                  </span>
                </div>
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/50">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Completed</span>
                  <span className="text-xl font-bold text-slate-700 block mt-0.5">42 Units</span>
                </div>
              </div>

              {/* Achievement Badges */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Earned Badges</span>
                <div className="flex gap-2 flex-wrap">
                  <div className="p-2 rounded-lg bg-yellow-50 text-yellow-600 border border-yellow-100 text-[10px] font-bold flex items-center gap-1">
                    <Award className="h-3.5 w-3.5" />
                    <span>Grammar Pro</span>
                  </div>
                  <div className="p-2 rounded-lg bg-orange-50 text-orange-600 border border-orange-100 text-[10px] font-bold flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5" />
                    <span>Streaker</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription status */}
            <div className="glass-card p-6 rounded-[24px] border border-white/50 space-y-4">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Shield className="h-4.5 w-4.5 text-brand-main" />
                Subscription Status
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-700 block">Premium Individual</span>
                  <span className="text-[10px] text-slate-400">Renews on July 08, 2026</span>
                </div>
                <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100">Active</Badge>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Settings Panels */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Edit Profile Panel */}
            <div className="glass-card p-6 rounded-[24px] border border-white/50 space-y-5">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-brand-main" />
                Edit Profile Information
              </h3>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full py-2.5 px-4 rounded-xl border border-slate-100 bg-white/40 focus:bg-white text-xs font-medium focus:ring-1 focus:ring-brand-main focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-2.5 px-4 rounded-xl border border-slate-100 bg-white/40 focus:bg-white text-xs font-medium focus:ring-1 focus:ring-brand-main focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Account Type</label>
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value as "individual" | "company")}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-100 bg-white/40 focus:bg-white text-xs font-medium focus:ring-1 focus:ring-brand-main focus:outline-none"
                  >
                    <option value="individual">Individual Learner</option>
                    <option value="company">Corporate / School Account</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-main text-white font-semibold rounded-xl text-xs hover:bg-brand-dark transition-all shadow-md shadow-brand-main/15 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Save Changes
                </button>
              </form>
            </div>

            {/* Change Password Panel */}
            <div className="glass-card p-6 rounded-[24px] border border-white/50 space-y-5">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-brand-main" />
                Change Password
              </h3>

              <form onSubmit={handleSavePassword} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full py-2.5 px-4 rounded-xl border border-slate-100 bg-white/40 focus:bg-white text-xs font-medium focus:ring-1 focus:ring-brand-main focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full py-2.5 px-4 rounded-xl border border-slate-100 bg-white/40 focus:bg-white text-xs font-medium focus:ring-1 focus:ring-brand-main focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-main text-white font-semibold rounded-xl text-xs hover:bg-brand-dark transition-all shadow-md shadow-brand-main/15 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Update Password
                </button>
              </form>
            </div>

            {/* Notification & Logout Preferences */}
            <div className="glass-card p-6 rounded-[24px] border border-white/50 space-y-6">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <Bell className="h-5 w-5 text-brand-main" />
                Preferences
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-700 block">Email Notifications</span>
                    <span className="text-[10px] text-slate-400">Receive system and progress reminders via email.</span>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`w-11 h-6 rounded-full transition-all duration-200 focus:outline-none ${
                      emailNotifications ? "bg-brand-main" : "bg-slate-200"
                    } relative`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                        emailNotifications ? "right-1" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-700 block">Weekly Progress Report</span>
                    <span className="text-[10px] text-slate-400">Get a performance trends graph delivered weekly.</span>
                  </div>
                  <button
                    onClick={() => setWeeklyReports(!weeklyReports)}
                    className={`w-11 h-6 rounded-full transition-all duration-200 focus:outline-none ${
                      weeklyReports ? "bg-brand-main" : "bg-slate-200"
                    } relative`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                        weeklyReports ? "right-1" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Logout button */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={logout}
                  className="px-5 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all font-semibold text-xs flex items-center gap-1.5"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout from Account</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
