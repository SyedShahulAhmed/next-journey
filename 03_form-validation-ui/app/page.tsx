// "use client";

// import { useEffect, useState } from "react";

// export default function Home() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [touched, setTouched] = useState({
//     name: false,
//     email: false,
//     password: false,
//     confirmPassword: false,
//   });
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const passwordRegex = /^(?=.*\d).{6,}$/;
//   const isValid =
//     name.trim().length >= 3 &&
//     emailRegex.test(email) &&
//     passwordRegex.test(password) &&
//     confirmPassword === password;

//   const validate = () => {
//     let newErrors = { name: "", email: "", password: "", confirmPassword: "" };
//     if (name.trim().length < 3) {
//       newErrors.name = "Name Must be Atleast 3 Characters";
//     }
//     if (!emailRegex.test(email)) {
//       newErrors.email = "Invalid Email Format";
//     }

//     if (!passwordRegex.test(password)) {
//       newErrors.password = "Password must be 6+ chars and include a number";
//     }

//     setErrors(newErrors);
//   };
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     validate();
//     if (isValid) {
//       setSubmitted(true);
//     }
//     setIsSubmitting(true);
//     setTimeout(() => {
//       setSubmitted(true);
//       resetForm();
//       setIsSubmitting(false);
//     }, 1000);
//   };
//   const formatName = (value: string) => {
//     return value
//       .trim()
//       .replace(/\s+/g, " ")
//       .split(" ")
//       .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
//       .join(" ");
//   };
//   const getPasswordStrength = () => {
//     let score = 0;
//     if (password.length >= 6) score++;
//     if (/[A-Z]/.test(password)) score++;
//     if (/[0-9]/.test(password)) score++;
//     if (/[^A-Za-z0-9]/.test(password)) score++;

//     return score;
//   };
//   const getStrengthLabel = () => {
//     const score = getPasswordStrength();
//     if (score <= 1) return "Weak";
//     if (score === 2) return "Medium";
//     return "Strong";
//   };
//   const resetForm = () => {
//     setName("");
//     setEmail("");
//     setPassword("");
//     setConfirmPassword("");
//     setTouched({
//       name: false,
//       email: false,
//       password: false,
//       confirmPassword: false,
//     });
//     setErrors({
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     });
//   };
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       validate();
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [name, email, password]);
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <h2>Form</h2>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => {
//             const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
//             setName(value);
//           }}
//           onBlur={() => {
//             setTouched((p) => ({ ...p, name: true }));
//             setName(formatName(name));
//             let err = "";
//             if (name.trim().length < 3) {
//               err = "Name Must be Atleast 3 Characters";
//             }
//             setErrors((p) => ({ ...p, name: err }));
//           }}
//         />
//         {touched.name && errors.name && <p>{errors.name}</p>}
//         <br />
//         <br />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
//           onBlur={() => {
//             setTouched((p) => ({ ...p, email: true }));
//             let err = "";
//             if (!emailRegex.test(email)) {
//               err = "Invalid Email Format";
//             }
//             setErrors((p) => ({ ...p, email: err }));
//           }}
//         />
//         {touched.email && errors.email && <p>{errors.email}</p>}
//         <br />
//         <br />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value.trim())}
//           onBlur={() => {
//             setTouched((p) => ({ ...p, password: true }));
//             let err = "";
//             if (!passwordRegex.test(password)) {
//               err = "Password must be 6+ chars and include a number";
//             }
//             setErrors((p) => ({ ...p, password: err }));
//           }}
//         />
//         {touched.password && errors.password && <p>{errors.password}</p>}
//         <br />
//         <br />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           onBlur={() => {
//             setTouched((p) => ({ ...p, confirmPassword: true }));

//             let error = "";
//             if (confirmPassword !== password) {
//               error = "Passwords do not match";
//             }

//             setErrors((prev) => ({
//               ...prev,
//               confirmPassword: error,
//             }));
//           }}
//         />

//         {touched.confirmPassword && errors.confirmPassword && (
//           <p>{errors.confirmPassword}</p>
//         )}
//         <button type="submit" disabled={!isValid || isSubmitting}>
//           {isSubmitting ? "Submitting...." : "Submit"}
//         </button>
//       </form>
//       {submitted && (
//         <div>
//           <h3>Form Data:</h3>
//           <p>Name: {name}</p>
//           <p>Email: {email}</p>
//           <p>Password: {password}</p>
//           <p>Password Strength: {getStrengthLabel()}</p>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "../hooks/useForm";

export default function Home() {
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [showAllErrors, setShowAllErrors] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d).{6,}$/;

  const validate = (values: any) => {
    const errors: any = {};

    if (values.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email";
    }

    if (!passwordRegex.test(values.password)) {
      errors.password = "Weak password";
    }

    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleSubmit,
    getFieldProps,
    reset,
  } = useForm(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate
  );

  const onSubmit = (data: any) => {
    setSubmittedData(data);
    reset();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    setShowAllErrors(true);
    await handleSubmit(onSubmit)(e);
  };

  const showError = (field: string) =>
    (touched as Record<string, boolean>)[field] || showAllErrors
      ? (errors as Record<string, string>)[field]
      : "";

  const showSuccess = (field: string) =>
    ((touched as Record<string, boolean>)[field] || showAllErrors) &&
    !(errors as Record<string, string>)[field] &&
    (values as Record<string, string>)[field]?.trim().length > 0;

  const nameError = showError("name");
  const emailError = showError("email");
  const passwordError = showError("password");
  const confirmError = showError("confirmPassword");
  const nameSuccess = showSuccess("name");
  const emailSuccess = showSuccess("email");
  const passwordSuccess = showSuccess("password");
  const confirmSuccess = showSuccess("confirmPassword");

  return (
    <div className="ai-shell">
      <div className="hud-corner hud-corner-left" aria-hidden="true" />
      <div className="hud-corner hud-corner-right" aria-hidden="true" />

      <motion.div
        className="ai-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="ai-card-header">
          <div>
            <p className="ai-eyebrow">ANDROID INTERFACE</p>
            <h1 className="ai-title">Identity Sync</h1>
            <p className="ai-subtitle">
              Secure enrollment for synthetic intelligence access.
            </p>
          </div>
          <div className="ai-status">
            <span className="status-dot" />
            <span>Live Node</span>
          </div>
        </div>

        <div className="hud-separator" aria-hidden="true" />

        <form onSubmit={handleFormSubmit}>
          <div className="ai-grid">
            <div className="ai-field">
              <label htmlFor="name">Name</label>
              <div className="ai-input-wrap">
                <input
                  id="name"
                  {...getFieldProps("name")}
                  placeholder="Kara Anders"
                  className={`ai-input ${
                    nameError ? "error" : nameSuccess ? "success" : ""
                  }`}
                />
                {nameSuccess && (
                  <span className="ai-check" aria-hidden="true">
                    <svg viewBox="0 0 20 20">
                      <path d="M5 10.5l3 3 7-7" fill="none" />
                    </svg>
                  </span>
                )}
              </div>
              {nameError && <p className="ai-error fade-in">{nameError}</p>}
            </div>

            <div className="ai-field">
              <label htmlFor="email">Email</label>
              <div className="ai-input-wrap">
                <input
                  id="email"
                  {...getFieldProps("email")}
                  placeholder="kar.a@cyberlife.ai"
                  className={`ai-input ${
                    emailError ? "error" : emailSuccess ? "success" : ""
                  }`}
                />
                {emailSuccess && (
                  <span className="ai-check" aria-hidden="true">
                    <svg viewBox="0 0 20 20">
                      <path d="M5 10.5l3 3 7-7" fill="none" />
                    </svg>
                  </span>
                )}
              </div>
              {emailError && (
                <p className="ai-error fade-in">{emailError}</p>
              )}
            </div>

            <div className="ai-field">
              <label htmlFor="password">Password</label>
              <div className="ai-input-wrap">
                <input
                  id="password"
                  type="password"
                  {...getFieldProps("password")}
                  placeholder="6+ characters"
                  className={`ai-input ${
                    passwordError ? "error" : passwordSuccess ? "success" : ""
                  }`}
                />
                {passwordSuccess && (
                  <span className="ai-check" aria-hidden="true">
                    <svg viewBox="0 0 20 20">
                      <path d="M5 10.5l3 3 7-7" fill="none" />
                    </svg>
                  </span>
                )}
              </div>
              {passwordError && (
                <p className="ai-error fade-in">{passwordError}</p>
              )}
            </div>

            <div className="ai-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="ai-input-wrap">
                <input
                  id="confirmPassword"
                  type="password"
                  {...getFieldProps("confirmPassword")}
                  placeholder="Repeat password"
                  className={`ai-input ${
                    confirmError ? "error" : confirmSuccess ? "success" : ""
                  }`}
                />
                {confirmSuccess && (
                  <span className="ai-check" aria-hidden="true">
                    <svg viewBox="0 0 20 20">
                      <path d="M5 10.5l3 3 7-7" fill="none" />
                    </svg>
                  </span>
                )}
              </div>
              {confirmError && (
                <p className="ai-error fade-in">{confirmError}</p>
              )}
            </div>
          </div>

          <div className="ai-actions">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="ai-button"
            >
              <span>{isSubmitting ? "Processing" : "Synchronize"}</span>
              {isSubmitting && <span className="ai-loader" />}
            </button>
            <div className="ai-hint">Encryption: v4.9 / Node: DRT-19</div>
          </div>
        </form>

        {submittedData && (
          <div className="ai-success fade-in">
            <div className="ai-success-icon">
              <svg viewBox="0 0 52 52" aria-hidden="true">
                <circle className="check-circle" cx="26" cy="26" r="24" />
                <path
                  className="check-path"
                  d="M16 27.5l7 7 13-15"
                  fill="none"
                />
              </svg>
            </div>
            <div>
              <h3>Identity linked</h3>
              <p>
                Welcome, {submittedData.name}. Authorization level updated.
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}