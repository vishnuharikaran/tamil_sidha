export const CLINIC = {
  name: "Tamil Siddha Clinic",
  doctor: "Dr. Sakthi Vadivu",
  designation: "MD (Siddha Medicine Specialist)",
  experience: "8+ Years",
  phone: "+919677475811",
  whatsapp: "919677475811",
  address: {
    line1: "No 74, Gangai Square Road",
    area: "Thanthai Periyar Nagar",
    city: "Viluppuram",
    state: "Tamil Nadu",
    pincode: "605403",
    full: "No 74, Gangai Square Road, Thanthai Periyar Nagar, Viluppuram, Tamil Nadu 605403"
  },
  hours: {
    weekdays: {
      days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      open: "09:00",
      close: "21:00",
      label: "Mon – Sat: 9:00 AM – 9:00 PM"
    },
    sunday: {
      days: ["Sunday"],
      open: "11:00",
      close: "13:00",
      label: "Sunday: 11:00 AM – 1:00 PM"
    }
  },
  specialities: [
    {
      category: "Internal Stones",
      icon: "stone",
      conditions: ["Kidney Stones", "Gallbladder Stones"]
    },
    {
      category: "Women's Health",
      icon: "women",
      conditions: ["Uterine Fibroids"]
    },
    {
      category: "Chronic Illnesses",
      icon: "chronic",
      conditions: ["Chronic Back Pain", "Severe Joint Pain", "Diabetes", "High Blood Pressure"]
    },
    {
      category: "Dermatology",
      icon: "skin",
      conditions: ["Long-standing Skin Conditions", "Allergies"]
    }
  ],
  siddhaFormulations: ["CHOORNAM", "KUDINEER", "THAILAM", "LEHYAM"],
  naadis: ["VATHAM", "PITHAM", "KAPHAM", "VATHAM_PITHAM", "PITHAM_KAPHAM", "VATHAM_KAPHAM", "THINAI"],
  ennVagaiFields: ["Tongue", "Skin", "Color", "Voice", "Eyes", "Stool", "Urine", "Pulse"]
};
