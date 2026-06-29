import React, { useState } from "react";
import { motion } from "framer-motion";
import { AuthInput } from "./AuthInput";
import { PasswordInput } from "./PasswordInput";
import { useAuth } from "@/hooks/useAuth";
import { staggerContainer, fadeIn } from "@/lib/motion";

interface CompanySignupFormProps {
  onSubmitSuccess: () => void;
}

export const CompanySignupForm: React.FC<CompanySignupFormProps> = ({ onSubmitSuccess }) => {
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    institutionName: "",
    email: "",
    position: "",
    password: "",
    confirmPassword: "",
    institutionType: "",
    employees: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.institutionName ||
      !formData.email ||
      !formData.position ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await signup({
        name: formData.institutionName,
        email: formData.email,
        institution: formData.institutionName,
        role: formData.position,
        accountType: "company",
      });
      onSubmitSuccess();
    } catch (err: any) {
      setError("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      variants={staggerContainer(0.05, 0.1)}
      initial="hidden"
      animate="show"
      onSubmit={handleSubmit}
      className="space-y-5 w-full text-left"
    >
      {error && (
        <motion.div variants={fadeIn("up")} className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold font-inter">
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div variants={fadeIn("up")}>
          <AuthInput
            label="Institution Name *"
            id="institutionName"
            name="institutionName"
            placeholder="e.g. Oxford Prep Academy"
            required
            value={formData.institutionName}
            onChange={handleChange}
          />
        </motion.div>
        <motion.div variants={fadeIn("up")}>
          <AuthInput
            label="Company Email *"
            id="email"
            name="email"
            type="email"
            placeholder="admin@institution.org"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </motion.div>
      </div>

      <motion.div variants={fadeIn("up")}>
        <AuthInput
          label="Your Position / Role *"
          id="position"
          name="position"
          placeholder="e.g. Head of English Department / Tutor Coordinator"
          required
          value={formData.position}
          onChange={handleChange}
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div variants={fadeIn("up")}>
          <PasswordInput
            label="Password *"
            id="password"
            name="password"
            placeholder="••••••••"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </motion.div>
        <motion.div variants={fadeIn("up")}>
          <PasswordInput
            label="Confirm Password *"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="••••••••"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div variants={fadeIn("up")}>
          <AuthInput
            label="Institution Type"
            id="institutionType"
            name="institutionType"
            placeholder="e.g. School / Center"
            value={formData.institutionType}
            onChange={handleChange}
          />
        </motion.div>
        <motion.div variants={fadeIn("up")}>
          <AuthInput
            label="Total Employees"
            id="employees"
            name="employees"
            type="number"
            placeholder="e.g. 15"
            value={formData.employees}
            onChange={handleChange}
          />
        </motion.div>
        <motion.div variants={fadeIn("up")}>
          <AuthInput
            label="Phone Number"
            id="phone"
            name="phone"
            type="tel"
            placeholder="+62..."
            value={formData.phone}
            onChange={handleChange}
          />
        </motion.div>
      </div>

      <motion.button
        variants={fadeIn("up")}
        type="submit"
        disabled={loading}
        className="w-full py-3.5 mt-2 rounded-[16px] glass-button-primary font-semibold text-white transition-all duration-300 shadow-lg shadow-brand-main/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </motion.button>
    </motion.form>
  );
};
export default CompanySignupForm;
