// components/ApplicationForm.tsx
"use client";

import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useRef,
} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { useContactFormContext } from "@/contexts/ContactFormContext";

// Country‐specific states
const countryStates = {
  "INR(+91)": [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ],
  "USA(+1)": [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
    "District of Columbia",
    "Puerto Rico",
    "Guam",
    "American Samoa",
    "U.S. Virgin Islands",
    "Northern Mariana Islands",
  ],
  "UK(+44)": [
    "England",
    "Scotland",
    "Wales",
    "Northern Ireland",
    "Bedfordshire",
    "Berkshire",
    "Bristol",
    "Buckinghamshire",
    "Cambridgeshire",
    "Cheshire",
    "Cornwall",
    "Cumbria",
    "Derbyshire",
    "Devon",
    "Dorset",
    "Durham",
    "East Sussex",
    "Essex",
    "Gloucestershire",
    "Greater London",
    "Greater Manchester",
    "Hampshire",
    "Hertfordshire",
    "Kent",
    "Lancashire",
    "Leicestershire",
    "Lincolnshire",
    "Merseyside",
    "Norfolk",
    "North Yorkshire",
    "Northamptonshire",
    "Nottinghamshire",
    "Oxfordshire",
    "Shropshire",
    "Somerset",
    "South Yorkshire",
    "Staffordshire",
    "Suffolk",
    "Surrey",
    "Tyne and Wear",
    "Warwickshire",
    "West Midlands",
    "West Sussex",
    "West Yorkshire",
    "Wiltshire",
    "Worcestershire",
  ],
  "UAE(+971)": ["Abu Dhabi", "Ajman", "Dubai", "Fujairah", "Ras Al Khaimah", "Sharjah", "Umm Al Quwain"],
  "CAN(+1)": [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon",
  ],
  "AUS(+61)": [
    "Australian Capital Territory",
    "New South Wales",
    "Northern Territory",
    "Queensland",
    "South Australia",
    "Tasmania",
    "Victoria",
    "Western Australia",
  ],
  OTHER: [], // Manual
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  manualCountryCode: string;
  state: string;
  manualState: string;
  authorized: boolean;
  recaptcha: string | null;
}

interface ValidationErrors {
  name: string;
  email: string;
  phone: string;
  state: string;
}

const redirectUrl = "https://applyadmission.net/DA-IICT2025/";

const ApplicationForm: React.FC = () => {
  const { isPopupOpen, setIsPopupOpen } = useContactFormContext();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    countryCode: "INR(+91)",
    manualCountryCode: "",
    state: "",
    manualState: "",
    authorized: false,
    recaptcha: null,
  });

  const [errors, setErrors] = useState<ValidationErrors>({
    name: "",
    email: "",
    phone: "",
    state: "",
  });

  const [submitMessage, setSubmitMessage] = useState<{ text: string; isError: boolean }>({
    text: "",
    isError: false,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Detect B.Tech landing page (for country/state logic)
  const [isBTechPage, setIsBTechPage] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      setIsBTechPage(path.includes("/btech") || path === "/");
    }
  }, []);

  // Validate individual fields
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 3) return "Name must be at least 3 characters";
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return "Only letters allowed";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter a valid email";
        return "";
      case "phone":
        if (!value.trim()) return "Phone is required";
        if (!/^\d{10}$/.test(value.replace(/\s/g, ""))) return "Enter a valid 10-digit phone";
        return "";
      case "state":
        if (!value) return "State is required";
        return "";
      default:
        return "";
    }
  };

  const getAvailableStates = () => {
    if (!isBTechPage) {
      return countryStates["INR(+91)"];
    }
    return countryStates[formData.countryCode as keyof typeof countryStates] || [];
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (name === "countryCode") {
      const states = countryStates[value as keyof typeof countryStates] || [];
      if (!states.includes(formData.state)) {
        setFormData((prev) => ({ ...prev, countryCode: value, state: "" }));
      } else {
        setFormData((prev) => ({ ...prev, countryCode: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleRecaptchaChange = (value: string | null) => {
    setFormData((prev) => ({ ...prev, recaptcha: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      state: validateField("state", formData.state),
    };

    if (!formData.authorized) {
      setSubmitMessage({ text: "Please authorize DAU to contact you.", isError: true });
      return false;
    }
    if (!formData.recaptcha) {
      setSubmitMessage({ text: "Please verify you’re not a robot.", isError: true });
      return false;
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage({ text: "", isError: false });
    setShowConfirmation(false);

    const submissionData = {
      ...formData,
      countryCode:
        formData.countryCode === "OTHER" ? formData.manualCountryCode : formData.countryCode,
      state: formData.countryCode === "OTHER" ? formData.manualState : formData.state,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || res.statusText);

      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "INR(+91)",
        manualCountryCode: "",
        state: "",
        manualState: "",
        authorized: false,
        recaptcha: null,
      });
      setSubmitMessage({ text: "Form submitted successfully!", isError: false });
      setShowConfirmation(true);

      setTimeout(() => {
        setShowConfirmation(false);
        window.location.href = redirectUrl;
      }, 2000);
    } catch (err) {
      setSubmitMessage({
        text: `Submission failed: ${err instanceof Error ? err.message : "Unknown error"}`,
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
      recaptchaRef.current?.reset();
    }
  };

  const renderError = (field: keyof ValidationErrors) =>
    errors[field] ? <p className="text-red-500 text-sm mt-1">{errors[field]}</p> : null;

  return (
    <section id="application-form-bottom" className="py-20 bg-[#273586] text-white font-montserrat">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to <span className="text-orange-400">Transform</span> Your Future?
            </h2>
            <p className="text-2xl text-blue-200">
              Join thousands of successful alumni who started their journey here
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: (Your “What You Get” section could go here, if desired) */}

            {/* Right: Form and CTA */}
            <div className="relative">
              {/* Confirmation overlay */}
              {showConfirmation && (
                <div className="absolute inset-0 bg-white bg-opacity-95 z-10 flex flex-col items-center justify-center rounded-lg shadow-md animate-fade-in-down">
                  <div className="text-green-600 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-center">Thank You!</h3>
                  <p className="text-gray-700 text-center mb-6 px-8">
                    Your form has been submitted successfully. We will get back to you soon.
                  </p>
                  <Button
                    onClick={() => setShowConfirmation(false)}
                    className="bg-red-500 hover:bg-amber-600 text-white px-6 py-2 rounded-md"
                  >
                    Close
                  </Button>
                </div>
              )}

              {/* Submission message */}
              {submitMessage.text && !showConfirmation && (
                <div
                  className={`mb-4 p-3 rounded ${
                    submitMessage.isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}

              {/* The Form */}
              <form
                className="space-y-4 bg-gray-50 p-8 rounded-lg shadow-md text-black"
                onSubmit={handleSubmit}
              >
                {/* Name */}
                <div>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Ramesh Sharma"
                    className={`w-full p-3 border rounded-md ${errors.name ? "border-red-500" : ""}`}
                    required
                  />
                  {renderError("name")}
                </div>

                {/* Email */}
                <div>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="rameshsharma@gmail.com"
                    className={`w-full p-3 border rounded-md ${errors.email ? "border-red-500" : ""}`}
                    required
                  />
                  {renderError("email")}
                </div>

                {/* Phone + Country Code */}
                <div>
                  <div
                    className={`flex items-center border rounded-md overflow-hidden ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                  >
                    <select
                      className="appearance-none bg-white p-3 text-gray-400 outline-none"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      disabled={!isBTechPage}
                    >
                      <option value="INR(+91)">India (+91)</option>
                      {isBTechPage && (
                        <>
                          <option value="USA(+1)">USA (+1)</option>
                          <option value="UK(+44)">UK (+44)</option>
                          <option value="UAE(+971)">UAE (+971)</option>
                          <option value="CAN(+1)">Canada (+1)</option>
                          <option value="AUS(+61)">Australia (+61)</option>
                          <option value="OTHER">Other (Manual)</option>
                        </>
                      )}
                    </select>
                    <span className="px-2 text-gray-500">|</span>

                    {formData.countryCode === "OTHER" ? (
                      <div className="flex items-center w-full">
                        <Input
                          type="text"
                          name="manualCountryCode"
                          value={formData.manualCountryCode}
                          onChange={handleInputChange}
                          placeholder="e.g. +65"
                          className="w-24 p-3 outline-none"
                          required
                        />
                        <span className="px-2 text-gray-500">|</span>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Phone number"
                          className="w-full p-3 outline-none"
                          required
                        />
                      </div>
                    ) : (
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="12345 67890"
                        className="w-full p-3 outline-none"
                        required
                      />
                    )}
                  </div>
                  {renderError("phone")}
                </div>

                {/* State / Territory */}
                <div>
                  {formData.countryCode === "OTHER" ? (
                    <Input
                      type="text"
                      name="manualState"
                      value={formData.manualState}
                      onChange={handleInputChange}
                      placeholder="Enter your state/region"
                      className={`w-full p-3 border rounded-md ${errors.state ? "border-red-500" : ""}`}
                      required
                    />
                  ) : (
                    <select
                      className={`w-full p-3 border rounded-md text-gray-400 bg-white ${
                        errors.state ? "border-red-500" : ""
                      }`}
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">State/Territory</option>
                      {getAvailableStates().map((st, idx) => (
                        <option key={idx} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  )}
                  {renderError("state")}
                </div>

                {/* Authorization Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="authorize"
                    name="authorized"
                    checked={formData.authorized}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-red-500 focus:ring-amber-500 border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="authorize" className="ml-2 block text-sm text-gray-700">
                    I authorize DAU, Gandhinagar to contact me regarding admission information.
                  </label>
                </div>

                {/* ReCAPTCHA */}
                <div className="flex justify-center my-4">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    onChange={handleRecaptchaChange}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-red-500 hover:bg-amber-600 text-white p-3 rounded-md text-center flex items-center justify-center gap-2"
                    disabled={isSubmitting || !formData.authorized}
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <span className="flex items-center gap-2">
                        Apply Now
                        <ExternalLink className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
