"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
  Users,
  Mail,
  Eye,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface Participant {
  id: string;
  name: string;
  email: string;
  progress: number;
  simulationScore: number | null;
  joinDate: string;
}

const initialParticipants: Participant[] = [
  { id: "1", name: "Ahmad Fauzi", email: "ahmad@example.com", progress: 85, simulationScore: 520, joinDate: "2026-01-15" },
  { id: "2", name: "Siti Nurhaliza", email: "siti@example.com", progress: 92, simulationScore: 540, joinDate: "2026-01-20" },
  { id: "3", name: "Budi Santoso", email: "budi@example.com", progress: 65, simulationScore: 490, joinDate: "2026-02-01" },
  { id: "4", name: "Dewi Lestari", email: "dewi@example.com", progress: 78, simulationScore: 505, joinDate: "2026-02-10" },
  { id: "5", name: "Rudi Hermawan", email: "rudi@example.com", progress: 45, simulationScore: 475, joinDate: "2026-02-15" },
  { id: "6", name: "Maya Indah", email: "maya@example.com", progress: 70, simulationScore: null, joinDate: "2026-03-01" },
  { id: "7", name: "Dimas Prayoga", email: "dimas@example.com", progress: 33, simulationScore: null, joinDate: "2026-03-10" },
  { id: "8", name: "Ratna Dewi", email: "ratna@example.com", progress: 88, simulationScore: 510, joinDate: "2026-01-25" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const modalVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = localStorage.getItem("toefl_participants");
    if (stored) {
      setParticipants(JSON.parse(stored));
    } else {
      setParticipants(initialParticipants);
    }
  }, []);

  const saveParticipants = (data: Participant[]) => {
    setParticipants(data);
    localStorage.setItem("toefl_participants", JSON.stringify(data));
  };

  const filtered = participants.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  // Form validation
  const validate = (data: { name: string; email: string }) => {
    const errs: Record<string, string> = {};
    if (!data.name.trim()) errs.name = "Nama harus diisi";
    if (!data.email.trim()) errs.email = "Email harus diisi";
    else if (!/\S+@\S+\.\S+/.test(data.email)) errs.email = "Format email tidak valid";
    return errs;
  };

  // Add
  const handleAdd = () => {
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const newParticipant: Participant = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      progress: 0,
      simulationScore: null,
      joinDate: new Date().toISOString().split("T")[0],
    };
    saveParticipants([...participants, newParticipant]);
    setFormData({ name: "", email: "" });
    setShowAddModal(false);
  };

  // Edit
  const handleEdit = () => {
    if (!selectedParticipant) return;
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const updated = participants.map((p) =>
      p.id === selectedParticipant.id
        ? { ...p, name: formData.name.trim(), email: formData.email.trim() }
        : p
    );
    saveParticipants(updated);
    setFormData({ name: "", email: "" });
    setSelectedParticipant(null);
    setShowEditModal(false);
  };

  // Delete
  const handleDelete = () => {
    if (!selectedParticipant) return;
    const filtered = participants.filter((p) => p.id !== selectedParticipant.id);
    saveParticipants(filtered);
    setSelectedParticipant(null);
    setShowDeleteModal(false);
  };

  const openEdit = (p: Participant) => {
    setSelectedParticipant(p);
    setFormData({ name: p.name, email: p.email });
    setErrors({});
    setShowEditModal(true);
  };

  const openDelete = (p: Participant) => {
    setSelectedParticipant(p);
    setShowDeleteModal(true);
  };

  const openAdd = () => {
    setFormData({ name: "", email: "" });
    setErrors({});
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-fustat text-3xl font-extrabold text-slate-900">Participants</h1>
          <p className="font-inter text-sm text-slate-400 mt-1">
            {participants.length} registered members
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-main text-white text-xs font-semibold shadow-md shadow-brand-main/15 hover:bg-brand-dark transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          Tambah Peserta
        </button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="relative max-w-md"
      >
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-slate-100 bg-white/60 focus:bg-white text-xs font-medium focus:ring-1 focus:ring-brand-main focus:outline-none transition-all"
        />
      </motion.div>

      {/* Table */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-card rounded-2xl overflow-hidden hover:translate-y-0"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-12">No</th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nama</th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email</th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Progress</th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Simulasi</th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="h-8 w-8 text-slate-300" />
                      <p className="text-sm text-slate-400 font-medium">No participants found</p>
                      <button
                        onClick={openAdd}
                        className="text-xs text-brand-main font-semibold hover:text-brand-dark transition-colors"
                      >
                        Add your first participant
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((participant, idx) => (
                  <tr
                    key={participant.id}
                    className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors"
                  >
                    <td className="py-4 px-4 text-xs text-slate-400 font-medium">{idx + 1}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-light to-brand-main text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                          {participant.name.charAt(0)}
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{participant.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-xs text-slate-400">{participant.email}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5 max-w-[140px]">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              participant.progress >= 80 ? "bg-emerald-500" :
                              participant.progress >= 50 ? "bg-brand-main" :
                              "bg-amber-500"
                            }`}
                            style={{ width: `${participant.progress}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-slate-600 w-8 text-right">{participant.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {participant.simulationScore ? (
                        <span className={`inline-flex items-center gap-1 text-xs font-bold ${
                          participant.simulationScore >= 500 ? "text-emerald-600" :
                          participant.simulationScore >= 450 ? "text-brand-main" :
                          "text-amber-600"
                        }`}>
                          <Eye className="h-3 w-3" />
                          {participant.simulationScore}
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(participant)}
                          className="h-8 w-8 rounded-lg hover:bg-brand-light/10 text-slate-400 hover:text-brand-main transition-all flex items-center justify-center"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => openDelete(participant)}
                          className="h-8 w-8 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all flex items-center justify-center"
                          title="Hapus"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Showing {filtered.length} of {participants.length} participants
          </span>
        </div>
      </motion.div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              variants={modalVariant}
              initial="hidden"
              animate="show"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md glass-card rounded-2xl p-6 space-y-5"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-fustat text-lg font-bold text-slate-800">Tambah Peserta</h2>
                <button onClick={() => setShowAddModal(false)} className="h-7 w-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama Lengkap</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama"
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-100 bg-white/40 focus:bg-white text-xs font-medium focus:ring-1 focus:ring-brand-main focus:outline-none"
                  />
                  {errors.name && <p className="text-[11px] text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.name}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Masukkan email"
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-100 bg-white/40 focus:bg-white text-xs font-medium focus:ring-1 focus:ring-brand-main focus:outline-none"
                  />
                  {errors.email && <p className="text-[11px] text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.email}</p>}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-100 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={handleAdd}
                  className="flex-1 py-2.5 rounded-xl bg-brand-main text-white text-xs font-semibold shadow-md shadow-brand-main/15 hover:bg-brand-dark transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Tambah
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && selectedParticipant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              variants={modalVariant}
              initial="hidden"
              animate="show"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md glass-card rounded-2xl p-6 space-y-5"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-fustat text-lg font-bold text-slate-800">Edit Peserta</h2>
                <button onClick={() => setShowEditModal(false)} className="h-7 w-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 border border-slate-100">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-light to-brand-main text-white flex items-center justify-center text-xs font-bold">
                  {selectedParticipant.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700">{selectedParticipant.name}</p>
                  <p className="text-[11px] text-slate-400">{selectedParticipant.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama Lengkap</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama"
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-100 bg-white/40 focus:bg-white text-xs font-medium focus:ring-1 focus:ring-brand-main focus:outline-none"
                  />
                  {errors.name && <p className="text-[11px] text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.name}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Masukkan email"
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-100 bg-white/40 focus:bg-white text-xs font-medium focus:ring-1 focus:ring-brand-main focus:outline-none"
                  />
                  {errors.email && <p className="text-[11px] text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.email}</p>}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-100 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={handleEdit}
                  className="flex-1 py-2.5 rounded-xl bg-brand-main text-white text-xs font-semibold shadow-md shadow-brand-main/15 hover:bg-brand-dark transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Simpan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {showDeleteModal && selectedParticipant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              variants={modalVariant}
              initial="hidden"
              animate="show"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm glass-card rounded-2xl p-6 space-y-5 text-center"
            >
              <div className="mx-auto h-14 w-14 rounded-2xl bg-red-50 flex items-center justify-center">
                <Trash2 className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h2 className="font-fustat text-lg font-bold text-slate-800">Hapus Peserta</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Apakah anda yakin ingin menghapus <strong className="text-slate-700">{selectedParticipant.name}</strong>?
                  Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-100 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-xs font-semibold shadow-md shadow-red-500/20 hover:bg-red-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Hapus
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
