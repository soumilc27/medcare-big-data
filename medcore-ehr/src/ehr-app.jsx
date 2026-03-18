import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// SYNTHETIC DATA GENERATION (Synthetic Healthcare Patient Journey Dataset)
// ============================================================
const generatePatients = () => {
  const firstNames = ["Aarav","Priya","Rahul","Ananya","Vikram","Sneha","Arjun","Kavya","Rohan","Divya","Aditya","Pooja","Kiran","Meera","Suresh","Lakshmi","Manish","Swati","Ravi","Nisha","Amit","Sunita","Deepak","Geeta","Nikhil","Anjali","Sanjay","Rekha","Vijay","Usha","Akash","Shweta","Kunal","Asha","Tarun","Smita","Gaurav","Poonam","Harish","Vandana","Rajesh","Kamala","Vineet","Seema","Arun","Nalini","Sachin","Jyoti","Pranav","Archana"];
  const lastNames = ["Sharma","Patel","Singh","Kumar","Verma","Gupta","Joshi","Mehta","Shah","Nair","Reddy","Iyer","Pillai","Rao","Mishra","Tiwari","Pandey","Chauhan","Srivastava","Malhotra","Bose","Das","Chatterjee","Mukherjee","Banerjee","Agarwal","Saxena","Kapoor","Khanna","Bhatia","Desai","Patil","Shukla","Tripathi","Dubey","Yadav","Chaudhary","Bhatt","Naik","Menon"];
  const conditions = ["Diabetes Type 2","Hypertension","Asthma","Heart Disease","COPD","Chronic Kidney Disease","Depression","Anxiety","Arthritis","Obesity","Hyperlipidemia","Atrial Fibrillation","Heart Failure","Pneumonia","Sepsis","Stroke","Myocardial Infarction","GERD","Sleep Apnea","Hypothyroidism"];
  const doctors = ["Dr. Priya Sharma","Dr. Rajesh Kumar","Dr. Anita Patel","Dr. Suresh Nair","Dr. Meena Iyer"];
  const insurances = ["Star Health Insurance","HDFC ERGO Health","Bajaj Allianz Health","New India Assurance","United India Insurance","ICICI Lombard Health","Religare Health","Ayushman Bharat (PMJAY)"];
  const bloodTypes = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];
  const medications = [["Metformin","Lisinopril"],["Atorvastatin","Amlodipine"],["Salbutamol","Budesonide"],["Warfarin","Metoprolol"],["Furosemide","Spironolactone"],["Sertraline","Alprazolam"],["Pantoprazole","Domperidone"],["Levothyroxine","Eltroxin"]];
  const cities = ["Mumbai","Delhi","Bengaluru","Chennai","Hyderabad","Pune","Kolkata","Ahmedabad","Jaipur","Lucknow","Surat","Nagpur","Indore","Bhopal","Patna","Coimbatore","Kochi","Chandigarh","Vadodara","Visakhapatnam"];
  const streets = ["MG Road","Gandhi Nagar","Nehru Street","Rajaji Salai","Anna Nagar","Koramangala","Banjara Hills","Salt Lake","Viman Nagar","Lal Darwaja"];
  const states = ["Maharashtra","Delhi","Karnataka","Tamil Nadu","Telangana","West Bengal","Gujarat","Rajasthan","Uttar Pradesh","Kerala"];
  const patients = [];
  for (let i = 0; i < 80; i++) {
    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    const age = Math.floor(Math.random() * 60) + 18;
    const admissions = Math.floor(Math.random() * 8);
    const lengthOfStay = Math.floor(Math.random() * 20) + 1;
    const comorbidities = Math.floor(Math.random() * 5);
    const emergencyVisits = Math.floor(Math.random() * 6);
    const cityIdx = Math.floor(Math.random() * cities.length);
    const readmissionScore = Math.min(100, Math.round(
      (admissions * 12) + (comorbidities * 8) + (emergencyVisits * 10) +
      (age > 65 ? 15 : age > 50 ? 8 : 0) + Math.random() * 20
    ));
    patients.push({
      id: `P${String(i + 1001).padStart(4,'0')}`,
      name: `${fn} ${ln}`,
      age,
      gender: Math.random() > 0.5 ? "Male" : "Female",
      dob: `${1940 + Math.floor(Math.random() * 67)}-${String(Math.floor(Math.random()*12)+1).padStart(2,'0')}-${String(Math.floor(Math.random()*28)+1).padStart(2,'0')}`,
      phone: `+91 ${Math.floor(Math.random()*9000000000)+6000000000}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@gmail.com`,
      address: `${Math.floor(Math.random()*999)+1}, ${streets[Math.floor(Math.random()*streets.length)]}, ${cities[cityIdx]}, ${states[cityIdx % states.length]} - ${Math.floor(Math.random()*90000)+400001}`,
      bloodType: bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
      insurance: insurances[Math.floor(Math.random() * insurances.length)],
      primaryCondition: conditions[Math.floor(Math.random() * conditions.length)],
      conditions: [conditions[Math.floor(Math.random() * conditions.length)], conditions[Math.floor(Math.random() * conditions.length)]].filter((v,i,a)=>a.indexOf(v)===i),
      medications: medications[Math.floor(Math.random() * medications.length)],
      assignedDoctor: doctors[Math.floor(Math.random() * doctors.length)],
      admissions,
      lengthOfStay,
      comorbidities,
      emergencyVisits,
      readmissionScore,
      readmissionRisk: readmissionScore >= 70 ? "High" : readmissionScore >= 40 ? "Medium" : "Low",
      lastVisit: new Date(Date.now() - Math.floor(Math.random() * 90) * 86400000).toISOString().split('T')[0],
      registeredDate: new Date(Date.now() - Math.floor(Math.random() * 730) * 86400000).toISOString().split('T')[0],
      status: Math.random() > 0.2 ? "Active" : "Inactive",
      vitalSigns: {
        bp: `${Math.floor(Math.random()*40)+100}/${Math.floor(Math.random()*20)+60}`,
        heartRate: Math.floor(Math.random()*40)+60,
        temp: (36.1 + Math.random()*1.5).toFixed(1),
        spo2: Math.floor(Math.random()*5)+95,
        weight: Math.floor(Math.random()*50)+45,
        height: Math.floor(Math.random()*35)+155,
      },
      reports: Math.random() > 0.3 ? [{
        id: `R${i}01`,
        date: new Date(Date.now() - Math.floor(Math.random()*30)*86400000).toISOString().split('T')[0],
        doctor: doctors[Math.floor(Math.random()*doctors.length)],
        diagnosis: conditions[Math.floor(Math.random()*conditions.length)],
        notes: "Patient presented with typical symptoms. Labs within normal range. Continue current medication regimen. Follow up in 4 weeks.",
        prescription: medications[Math.floor(Math.random()*medications.length)].join(", "),
        followUp: new Date(Date.now() + Math.floor(Math.random()*30)*86400000).toISOString().split('T')[0],
      }] : [],
    });
  }
  return patients;
};

const generateAppointments = (patients) => {
  const types = ["General Checkup","Follow-up","Consultation","Lab Review","Emergency","Surgery Prep","Vaccination","Physiotherapy"];
  const doctors = ["Dr. Priya Sharma","Dr. Rajesh Kumar","Dr. Anita Patel","Dr. Suresh Nair","Dr. Meena Iyer"];
  const apts = [];
  for (let i = 0; i < 60; i++) {
    const patient = patients[Math.floor(Math.random() * patients.length)];
    const daysOffset = Math.floor(Math.random() * 30) - 10;
    const date = new Date(Date.now() + daysOffset * 86400000);
    const status = daysOffset < 0 ? (Math.random() > 0.2 ? "Completed" : "Cancelled") : daysOffset === 0 ? "In Progress" : "Scheduled";
    apts.push({
      id: `A${String(i + 2001).padStart(4,'0')}`,
      patientId: patient.id,
      patientName: patient.name,
      doctor: doctors[Math.floor(Math.random() * doctors.length)],
      type: types[Math.floor(Math.random() * types.length)],
      date: date.toISOString().split('T')[0],
      time: `${String(Math.floor(Math.random()*8)+9).padStart(2,'0')}:${Math.random()>0.5?'00':'30'}`,
      status,
      duration: [15,30,45,60][Math.floor(Math.random()*4)],
      fee: [300,500,800,1000,1500,2000][Math.floor(Math.random()*6)],
      paid: status === "Completed" ? Math.random() > 0.1 : false,
      notes: "Routine visit. Please bring previous medical records and ID proof.",
      room: `OPD ${Math.floor(Math.random()*10)+1}`,
    });
  }
  return apts.sort((a,b) => new Date(a.date) - new Date(b.date));
};

const generateLoginLogs = () => {
  const users = [
    {name:"Admin User",role:"admin",email:"admin@medcore.in"},
    {name:"Dr. Priya Sharma",role:"doctor",email:"priya.sharma@medcore.in"},
    {name:"Dr. Rajesh Kumar",role:"doctor",email:"rajesh.kumar@medcore.in"},
    {name:"Anita Frontdesk",role:"frontdesk",email:"anita.fd@medcore.in"},
    {name:"Rahul Verma",role:"patient",email:"rahul.verma@gmail.com"},
  ];
  const logs = [];
  for (let i = 0; i < 40; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const hoursAgo = Math.floor(Math.random() * 168);
    logs.push({
      id: i + 1,
      ...user,
      timestamp: new Date(Date.now() - hoursAgo * 3600000).toISOString(),
      ip: `192.168.${Math.floor(Math.random()*5)}.${Math.floor(Math.random()*255)}`,
      status: Math.random() > 0.1 ? "Success" : "Failed",
      device: ["Chrome/Windows","Safari/macOS","Firefox/Linux","Chrome/Android"][Math.floor(Math.random()*4)],
    });
  }
  return logs.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
};

// ============================================================
// INITIAL STATE
// ============================================================
const PATIENTS = generatePatients();
const APPOINTMENTS = generateAppointments(PATIENTS);
const LOGIN_LOGS = generateLoginLogs();

const INITIAL_USERS = [
  { id: "U001", name: "Admin User", email: "admin@medcore.in", password: "admin123", role: "admin", status: "Active", createdAt: "2024-01-01" },
  { id: "U002", name: "Dr. Priya Sharma", email: "priya.sharma@medcore.in", password: "doctor123", role: "doctor", status: "Active", specialty: "Cardiology", createdAt: "2024-01-05" },
  { id: "U003", name: "Dr. Rajesh Kumar", email: "rajesh.kumar@medcore.in", password: "doctor123", role: "doctor", status: "Active", specialty: "Internal Medicine", createdAt: "2024-01-05" },
  { id: "U004", name: "Anita Desai", email: "anita.fd@medcore.in", password: "desk123", role: "frontdesk", status: "Active", createdAt: "2024-01-10" },
  { id: "U005", name: "Rahul Verma (Patient)", email: "rahul.verma@gmail.com", password: "patient123", role: "patient", status: "Active", patientId: "P1001", createdAt: "2024-02-01" },
];

// ============================================================
// ICONS
// ============================================================
const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    activity: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    logout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    brain: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-3.08A2.5 2.5 0 0 1 4 13.5a2.5 2.5 0 0 1 1.5-2.3 2.5 2.5 0 0 1-.5-1.7 2.5 2.5 0 0 1 2.5-2.5h2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-3.08A2.5 2.5 0 0 0 20 13.5a2.5 2.5 0 0 0-1.5-2.3 2.5 2.5 0 0 0 .5-1.7 2.5 2.5 0 0 0-2.5-2.5h-2z"/></svg>,
    chart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    file: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    edit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    trash: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    dollar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    heart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    log: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    trend: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    dna: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="m17 6-2.5-2.5"/><path d="m14 8-1-1"/><path d="m7 18 2.5 2.5"/><path d="m3.5 14.5.5.5"/><path d="m20 9 .5.5"/><path d="m6.5 12.5 1 1"/><path d="m16.5 10.5 1 1"/><path d="m10 16 1.5 1.5"/></svg>,
    stethoscope: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>,
    cpu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
    zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    warning: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    info: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    microscope: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>,
  };
  return icons[name] || <span>{name}</span>;
};

// ============================================================
// STYLES
// ============================================================
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --bg: #070B14;
    --bg2: #0D1321;
    --bg3: #111827;
    --surface: #141C2E;
    --surface2: #1A243A;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --text: #F0F4FF;
    --text2: #8B96B0;
    --text3: #5A6480;
    --cyan: #00D4FF;
    --cyan2: #0099CC;
    --emerald: #00E5A0;
    --emerald2: #00B87A;
    --violet: #8B5CF6;
    --violet2: #6D28D9;
    --amber: #F59E0B;
    --rose: #F43F5E;
    --rose2: #BE123C;
    --blue: #3B82F6;
    --blue2: #1D4ED8;
    --admin-accent: #00D4FF;
    --doctor-accent: #00E5A0;
    --desk-accent: #8B5CF6;
    --patient-accent: #F59E0B;
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --radius: 12px;
    --radius-lg: 18px;
    --shadow: 0 4px 24px rgba(0,0,0,0.4);
    --shadow-lg: 0 8px 48px rgba(0,0,0,0.6);
    --glow-cyan: 0 0 20px rgba(0,212,255,0.2);
    --glow-emerald: 0 0 20px rgba(0,229,160,0.2);
    --glow-violet: 0 0 20px rgba(139,92,246,0.2);
    --glow-amber: 0 0 20px rgba(245,158,11,0.2);
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-body); }
  
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg2); }
  ::-webkit-scrollbar-thumb { background: var(--surface2); border-radius: 3px; }
  
  .app { min-height: 100vh; background: var(--bg); }
  
  /* LOGIN */
  .login-wrap {
    min-height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
  }
  .login-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 20% 50%, rgba(0,212,255,0.08) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.08) 0%, transparent 50%),
                radial-gradient(ellipse at 60% 80%, rgba(0,229,160,0.05) 0%, transparent 50%),
                var(--bg);
  }
  .login-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .login-card {
    position: relative; z-index: 1;
    margin: auto;
    width: 100%; max-width: 440px;
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: var(--radius-lg);
    padding: 48px;
    box-shadow: var(--shadow-lg), 0 0 0 1px rgba(255,255,255,0.03);
    animation: slideUp 0.5s ease;
  }
  @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes pulseGlow { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes slideIn { from { opacity:0; transform:translateX(-10px); } to { opacity:1; transform:translateX(0); } }
  @keyframes scaleIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }

  .login-logo {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 8px;
  }
  .logo-icon {
    width: 48px; height: 48px;
    background: linear-gradient(135deg, var(--cyan), var(--emerald));
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 24px rgba(0,212,255,0.3);
  }
  .login-title { font-family: var(--font-display); font-size: 28px; font-weight: 800; }
  .login-subtitle { font-size: 13px; color: var(--text2); margin-bottom: 32px; }
  .login-label { font-size: 12px; font-weight: 500; color: var(--text2); margin-bottom: 6px; letter-spacing: 0.05em; text-transform: uppercase; }
  .login-input {
    width: 100%; background: var(--bg2); border: 1px solid var(--border);
    border-radius: 8px; padding: 12px 14px; color: var(--text);
    font-family: var(--font-body); font-size: 14px; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .login-input:focus { border-color: var(--cyan); box-shadow: 0 0 0 3px rgba(0,212,255,0.1); }
  .login-btn {
    width: 100%; padding: 14px; border: none; cursor: pointer;
    border-radius: 8px; font-family: var(--font-display); font-size: 14px; font-weight: 700;
    letter-spacing: 0.05em; transition: all 0.2s;
    background: linear-gradient(135deg, var(--cyan2), var(--cyan));
    color: #000; box-shadow: 0 4px 16px rgba(0,212,255,0.3);
  }
  .login-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,212,255,0.4); }
  .login-roles {
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 24px;
  }
  .role-chip {
    padding: 8px 12px; border-radius: 8px; cursor: pointer; border: 1px solid var(--border);
    background: var(--bg2); font-size: 12px; font-weight: 500; color: var(--text2);
    transition: all 0.2s; text-align: center;
  }
  .role-chip:hover { border-color: var(--border2); color: var(--text); }
  .role-chip.active { border-color: var(--cyan); color: var(--cyan); background: rgba(0,212,255,0.08); }
  
  /* LAYOUT */
  .layout { display: flex; min-height: 100vh; }
  .sidebar {
    width: 260px; min-width: 260px; background: var(--bg2);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    position: sticky; top: 0; height: 100vh;
    transition: all 0.3s;
    z-index: 100;
  }
  .sidebar.collapsed { width: 72px; min-width: 72px; }
  .sidebar-logo {
    padding: 24px 20px; display: flex; align-items: center; gap: 12px;
    border-bottom: 1px solid var(--border);
  }
  .sidebar-logo-icon {
    width: 36px; height: 36px; min-width: 36px;
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-weight: 800; font-size: 14px;
  }
  .sidebar-logo-text { font-family: var(--font-display); font-size: 18px; font-weight: 800; white-space: nowrap; overflow: hidden; }
  .sidebar-nav { flex: 1; padding: 16px 12px; overflow-y: auto; }
  .nav-section-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text3); padding: 8px 10px 4px; margin-top: 8px; white-space: nowrap; overflow: hidden; }
  .nav-item {
    display: flex; align-items: center; gap: 12px; padding: 10px 12px;
    border-radius: 8px; cursor: pointer; color: var(--text2); font-size: 14px; font-weight: 500;
    transition: all 0.15s; margin-bottom: 2px; white-space: nowrap; position: relative;
  }
  .nav-item:hover { background: var(--surface); color: var(--text); }
  .nav-item.active { color: var(--text); font-weight: 600; }
  .nav-item .nav-icon { min-width: 20px; }
  .nav-badge {
    margin-left: auto; padding: 1px 7px; border-radius: 20px;
    font-size: 11px; font-weight: 600; background: rgba(244,63,94,0.2); color: var(--rose);
  }
  .sidebar-footer {
    padding: 16px 12px; border-top: 1px solid var(--border);
  }
  .user-chip {
    display: flex; align-items: center; gap: 10px; padding: 10px;
    border-radius: 8px; background: var(--surface); margin-bottom: 8px;
  }
  .avatar {
    width: 34px; height: 34px; min-width: 34px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; font-family: var(--font-display);
  }
  .user-name { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .user-role { font-size: 11px; color: var(--text3); white-space: nowrap; }
  
  /* MAIN */
  .main { flex: 1; overflow-y: auto; background: var(--bg); min-height: 100vh; }
  .topbar {
    height: 64px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 16px; padding: 0 28px;
    background: var(--bg); position: sticky; top: 0; z-index: 50;
    backdrop-filter: blur(10px);
  }
  .topbar-title { font-family: var(--font-display); font-size: 20px; font-weight: 700; flex: 1; }
  .topbar-actions { display: flex; align-items: center; gap: 12px; }
  .icon-btn {
    width: 38px; height: 38px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
    background: var(--surface); border: 1px solid var(--border); cursor: pointer; color: var(--text2);
    transition: all 0.15s;
  }
  .icon-btn:hover { color: var(--text); border-color: var(--border2); }
  .page { padding: 28px; animation: fadeIn 0.3s ease; }
  
  /* CARDS */
  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 24px;
  }
  .card-sm { padding: 16px; }
  .card-title { font-family: var(--font-display); font-size: 16px; font-weight: 700; margin-bottom: 4px; }
  .card-sub { font-size: 12px; color: var(--text2); }
  
  /* STAT CARDS */
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
  .stat-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 20px; position: relative; overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
  .stat-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
  .stat-value { font-family: var(--font-display); font-size: 28px; font-weight: 800; line-height: 1; margin-bottom: 4px; }
  .stat-label { font-size: 12px; color: var(--text2); font-weight: 500; }
  .stat-trend { font-size: 11px; margin-top: 6px; display: flex; align-items: center; gap: 4px; }
  
  /* GRID */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .col-span-2 { grid-column: span 2; }
  
  /* TABLE */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; }
  th { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text3); padding: 10px 16px; text-align: left; border-bottom: 1px solid var(--border); }
  td { padding: 13px 16px; font-size: 13px; color: var(--text2); border-bottom: 1px solid rgba(255,255,255,0.04); }
  tr:hover td { background: rgba(255,255,255,0.02); color: var(--text); }
  tr:last-child td { border-bottom: none; }
  
  /* BADGE */
  .badge { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; }
  .badge-success { background: rgba(0,229,160,0.12); color: var(--emerald); }
  .badge-danger { background: rgba(244,63,94,0.12); color: var(--rose); }
  .badge-warning { background: rgba(245,158,11,0.12); color: var(--amber); }
  .badge-info { background: rgba(0,212,255,0.12); color: var(--cyan); }
  .badge-purple { background: rgba(139,92,246,0.12); color: var(--violet); }
  .badge-gray { background: rgba(255,255,255,0.07); color: var(--text3); }
  
  /* BUTTONS */
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 9px 18px; border-radius: 8px; border: none; cursor: pointer;
    font-family: var(--font-body); font-size: 13px; font-weight: 600;
    transition: all 0.15s; letter-spacing: 0.01em;
  }
  .btn-primary { background: var(--cyan2); color: #000; box-shadow: 0 2px 8px rgba(0,212,255,0.2); }
  .btn-primary:hover { background: var(--cyan); box-shadow: 0 4px 16px rgba(0,212,255,0.3); }
  .btn-emerald { background: var(--emerald2); color: #000; }
  .btn-emerald:hover { background: var(--emerald); }
  .btn-violet { background: var(--violet2); color: #fff; }
  .btn-violet:hover { background: var(--violet); }
  .btn-danger { background: var(--rose2); color: #fff; }
  .btn-danger:hover { background: var(--rose); }
  .btn-ghost { background: var(--surface2); color: var(--text2); border: 1px solid var(--border); }
  .btn-ghost:hover { color: var(--text); border-color: var(--border2); }
  .btn-sm { padding: 6px 12px; font-size: 12px; }
  
  /* INPUT */
  .input, .select {
    width: 100%; background: var(--bg2); border: 1px solid var(--border);
    border-radius: 8px; padding: 10px 14px; color: var(--text);
    font-family: var(--font-body); font-size: 13px; outline: none;
    transition: border-color 0.2s;
  }
  .input:focus, .select:focus { border-color: var(--cyan); }
  .select { cursor: pointer; }
  .textarea {
    width: 100%; background: var(--bg2); border: 1px solid var(--border);
    border-radius: 8px; padding: 10px 14px; color: var(--text);
    font-family: var(--font-body); font-size: 13px; outline: none;
    transition: border-color 0.2s; resize: vertical; min-height: 100px;
  }
  .textarea:focus { border-color: var(--cyan); }
  .form-group { margin-bottom: 16px; }
  .form-label { font-size: 12px; font-weight: 500; color: var(--text2); margin-bottom: 6px; display: block; letter-spacing: 0.03em; }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  
  /* SEARCH BAR */
  .search-bar {
    display: flex; align-items: center; gap: 10px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 8px; padding: 10px 14px; flex: 1; max-width: 340px;
  }
  .search-bar input {
    background: none; border: none; outline: none; color: var(--text);
    font-family: var(--font-body); font-size: 13px; flex: 1;
  }
  .search-bar input::placeholder { color: var(--text3); }
  
  /* MODAL */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.7);
    backdrop-filter: blur(4px); z-index: 200;
    display: flex; align-items: center; justify-content: center; padding: 20px;
    animation: fadeIn 0.2s ease;
  }
  .modal {
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: var(--radius-lg); width: 100%; max-width: 580px;
    max-height: 90vh; overflow-y: auto;
    animation: scaleIn 0.2s ease;
    box-shadow: var(--shadow-lg);
  }
  .modal-header { padding: 24px 24px 0; display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .modal-title { font-family: var(--font-display); font-size: 18px; font-weight: 700; }
  .modal-body { padding: 0 24px 24px; }
  
  /* RISK GAUGE */
  .risk-gauge { position: relative; width: 120px; height: 60px; }
  
  /* AI PREDICTION */
  .ai-card {
    border-radius: var(--radius-lg); padding: 24px; position: relative; overflow: hidden;
    background: linear-gradient(135deg, rgba(139,92,246,0.1), rgba(0,212,255,0.05));
    border: 1px solid rgba(139,92,246,0.2);
  }
  .ai-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(139,92,246,0.15); border: 1px solid rgba(139,92,246,0.3);
    border-radius: 20px; padding: 4px 12px; font-size: 11px; font-weight: 600;
    color: var(--violet); margin-bottom: 12px; letter-spacing: 0.05em;
  }
  
  /* VITALS CHART */
  .vitals-chart { display: flex; align-items: flex-end; gap: 4px; height: 60px; }
  .vitals-bar { flex: 1; border-radius: 3px 3px 0 0; transition: height 0.3s ease; min-width: 8px; }
  
  /* TIMELINE */
  .timeline { position: relative; padding-left: 24px; }
  .timeline::before { content:''; position: absolute; left: 7px; top: 0; bottom: 0; width: 2px; background: var(--border); }
  .timeline-item { position: relative; margin-bottom: 20px; }
  .timeline-dot { position: absolute; left: -20px; top: 4px; width: 10px; height: 10px; border-radius: 50%; border: 2px solid var(--bg2); }
  
  /* PROGRESS */
  .progress { height: 6px; background: var(--bg2); border-radius: 3px; overflow: hidden; }
  .progress-bar { height: 100%; border-radius: 3px; transition: width 0.5s ease; }
  
  /* TAB */
  .tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--border); margin-bottom: 24px; }
  .tab { padding: 10px 18px; font-size: 13px; font-weight: 500; color: var(--text2); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.15s; }
  .tab.active { color: var(--text); border-bottom-color: var(--cyan); }
  .tab:hover:not(.active) { color: var(--text); }
  
  /* ALERT */
  .alert { padding: 12px 16px; border-radius: 8px; font-size: 13px; display: flex; align-items: flex-start; gap: 10px; margin-bottom: 16px; }
  .alert-warning { background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.2); color: var(--amber); }
  .alert-danger { background: rgba(244,63,94,0.1); border: 1px solid rgba(244,63,94,0.2); color: var(--rose); }
  .alert-success { background: rgba(0,229,160,0.1); border: 1px solid rgba(0,229,160,0.2); color: var(--emerald); }
  .alert-info { background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.2); color: var(--cyan); }
  
  /* NOVELTY: LIVE PULSE */
  .live-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--emerald); animation: pulse 2s infinite; display: inline-block; }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(0,229,160,0.4); } 50% { box-shadow: 0 0 0 6px rgba(0,229,160,0); } }
  
  /* NOVELTY: VOICE INDICATOR */
  .voice-bars { display: flex; align-items: center; gap: 3px; height: 24px; }
  .voice-bar { width: 3px; border-radius: 2px; background: var(--cyan); animation: voiceAnim 0.8s ease-in-out infinite; }
  .voice-bar:nth-child(2) { animation-delay: 0.1s; }
  .voice-bar:nth-child(3) { animation-delay: 0.2s; }
  .voice-bar:nth-child(4) { animation-delay: 0.3s; }
  .voice-bar:nth-child(5) { animation-delay: 0.4s; }
  @keyframes voiceAnim { 0%,100% { height: 4px; } 50% { height: 20px; } }
  
  /* PATIENT CARD */
  .patient-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 16px;
    display: flex; gap: 14px; cursor: pointer;
    transition: all 0.2s;
  }
  .patient-card:hover { border-color: var(--border2); transform: translateY(-2px); box-shadow: var(--shadow); }
  
  /* RISK INDICATOR */
  .risk-high { color: var(--rose); }
  .risk-medium { color: var(--amber); }
  .risk-low { color: var(--emerald); }
  
  /* TOOLTIP */
  .tooltip-wrap { position: relative; display: inline-flex; }
  .tooltip { position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background: var(--surface2); border: 1px solid var(--border2); border-radius: 6px; padding: 6px 10px; font-size: 11px; white-space: nowrap; pointer-events: none; opacity: 0; transition: opacity 0.15s; z-index: 100; margin-bottom: 6px; }
  .tooltip-wrap:hover .tooltip { opacity: 1; }
  
  /* INLINE CHART */
  .sparkline { display: flex; align-items: flex-end; gap: 2px; height: 32px; }
  .sparkline-bar { flex: 1; border-radius: 2px 2px 0 0; min-width: 4px; }
  
  /* NOVELTY: HEALTH SCORE RING */
  .health-ring { position: relative; display: inline-flex; align-items: center; justify-content: center; }
  
  /* EMPTY STATE */
  .empty { text-align: center; padding: 48px; color: var(--text3); }
  .empty-icon { margin: 0 auto 12px; opacity: 0.4; display: flex; justify-content: center; }
  
  /* NOTIFICATION BUBBLE */
  .notif-bubble {
    position: fixed; top: 80px; right: 24px; z-index: 300;
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: var(--radius); padding: 14px 16px; max-width: 300px;
    box-shadow: var(--shadow-lg); animation: slideIn 0.3s ease;
    display: flex; align-items: flex-start; gap: 10px;
  }
  
  /* DOCTOR NOTE EDITOR */
  .note-editor {
    background: var(--bg2); border: 1px solid var(--border); border-radius: 8px;
    padding: 14px; font-family: var(--font-body); font-size: 13px; color: var(--text);
    min-height: 120px; outline: none; resize: vertical;
    transition: border-color 0.2s;
  }
  .note-editor:focus { border-color: var(--doctor-accent); }
  
  /* FOOTER ROW */
  .table-footer { padding: 12px 16px; font-size: 12px; color: var(--text3); display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); }
  
  /* CHIP SELECT */
  .chip-group { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip { padding: 4px 12px; border-radius: 20px; border: 1px solid var(--border); font-size: 12px; cursor: pointer; transition: all 0.15s; }
  .chip.selected { border-color: var(--cyan); background: rgba(0,212,255,0.1); color: var(--cyan); }
  
  /* RESPONSIVE SIDEBAR TOGGLE */
  .mobile-sidebar-toggle { display: none; }
  
  /* DETAIL PANEL */
  .detail-panel {
    position: fixed; right: 0; top: 0; bottom: 0; width: 460px;
    background: var(--bg2); border-left: 1px solid var(--border);
    z-index: 150; overflow-y: auto; padding: 28px;
    animation: slideDetail 0.3s ease;
    box-shadow: -4px 0 32px rgba(0,0,0,0.4);
  }
  @keyframes slideDetail { from { transform: translateX(100%); } to { transform: translateX(0); } }
  
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .divider { height: 1px; background: var(--border); margin: 20px 0; }
  
  /* NOVELTY: AI TYPING INDICATOR */
  .typing-dots { display: flex; gap: 4px; align-items: center; }
  .typing-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--text3); animation: typingBounce 1.2s infinite; }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typingBounce { 0%,60%,100% { transform: translateY(0); opacity:0.4; } 30% { transform: translateY(-4px); opacity:1; } }
  
  /* PATIENT VITALS MINI CHART */
  .vitals-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .vital-item { background: var(--bg); border-radius: 8px; padding: 12px; }
  .vital-value { font-family: var(--font-display); font-size: 22px; font-weight: 700; }
  .vital-unit { font-size: 11px; color: var(--text3); margin-left: 2px; }
  .vital-label { font-size: 11px; color: var(--text3); margin-top: 2px; }
  
  /* CALENDAR */
  .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
  .cal-day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 12px; border-radius: 6px; cursor: pointer; transition: all 0.15s; }
  .cal-day:hover { background: var(--surface2); }
  .cal-day.today { background: var(--cyan); color: #000; font-weight: 700; }
  .cal-day.has-apt { position: relative; }
  .cal-day.has-apt::after { content:''; position: absolute; bottom: 3px; width: 4px; height: 4px; border-radius: 50%; background: var(--emerald); }
  
  /* NOVELTY: AI CHATBOT WIDGET */
  .chat-widget {
    position: fixed; bottom: 24px; right: 24px; z-index: 200;
  }
  .chat-btn {
    width: 52px; height: 52px; border-radius: 50%; border: none; cursor: pointer;
    background: linear-gradient(135deg, var(--violet2), var(--cyan2));
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 16px rgba(139,92,246,0.4);
    transition: all 0.2s;
  }
  .chat-btn:hover { transform: scale(1.05); }
  .chat-panel {
    position: absolute; bottom: 64px; right: 0; width: 320px;
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: var(--radius-lg); overflow: hidden;
    box-shadow: var(--shadow-lg); animation: scaleIn 0.2s ease;
    transform-origin: bottom right;
  }
  .chat-header { padding: 14px 16px; background: linear-gradient(135deg, rgba(139,92,246,0.15), rgba(0,212,255,0.05)); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .chat-messages { padding: 12px; max-height: 280px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
  .chat-msg { max-width: 80%; }
  .chat-msg.ai { align-self: flex-start; }
  .chat-msg.user { align-self: flex-end; }
  .chat-bubble { padding: 9px 13px; border-radius: 12px; font-size: 12px; line-height: 1.5; }
  .chat-msg.ai .chat-bubble { background: var(--surface2); color: var(--text2); }
  .chat-msg.user .chat-bubble { background: var(--cyan2); color: #000; }
  .chat-input-row { padding: 12px; border-top: 1px solid var(--border); display: flex; gap: 8px; }
  .chat-input { flex: 1; background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; padding: 8px 12px; font-size: 12px; color: var(--text); outline: none; font-family: var(--font-body); }
  .chat-send { width: 32px; height: 32px; border-radius: 8px; border: none; background: var(--cyan2); cursor: pointer; display: flex; align-items: center; justify-content: center; }
`;

// ============================================================
// COMPONENTS
// ============================================================

const RiskBadge = ({ level }) => {
  const map = { High: "badge-danger", Medium: "badge-warning", Low: "badge-success" };
  return <span className={`badge ${map[level] || "badge-gray"}`}>{level}</span>;
};

const StatusBadge = ({ status }) => {
  const map = {
    Active: "badge-success", Inactive: "badge-gray", Scheduled: "badge-info",
    Completed: "badge-success", Cancelled: "badge-danger", "In Progress": "badge-warning",
    Success: "badge-success", Failed: "badge-danger",
  };
  return <span className={`badge ${map[status] || "badge-gray"}`}>{status}</span>;
};

const Avatar = ({ name, size = 34, accent = "#00D4FF" }) => {
  const initials = name?.split(" ").map(p => p[0]).join("").toUpperCase().slice(0,2) || "?";
  return (
    <div className="avatar" style={{ width: size, height: size, minWidth: size, background: `${accent}22`, color: accent, fontSize: size * 0.38, border: `1px solid ${accent}44` }}>
      {initials}
    </div>
  );
};

const MiniSparkline = ({ data, color }) => (
  <div className="sparkline">
    {data.map((v, i) => (
      <div key={i} className="sparkline-bar" style={{ height: `${v}%`, background: color, opacity: 0.6 + i * 0.05 }} />
    ))}
  </div>
);

const ProgressBar = ({ value, max = 100, color }) => (
  <div className="progress">
    <div className="progress-bar" style={{ width: `${(value / max) * 100}%`, background: color }} />
  </div>
);

const Notification = ({ msg, type, onClose }) => {
  const colors = { success: "#00E5A0", danger: "#F43F5E", warning: "#F59E0B", info: "#00D4FF" };
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, []);
  return (
    <div className="notif-bubble" style={{ borderLeftColor: colors[type], borderLeftWidth: 3 }}>
      <Icon name={type === "success" ? "check" : "info"} size={16} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#F0F4FF" }}>{msg}</div>
      </div>
      <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#8B96B0" }}>
        <Icon name="x" size={14} />
      </button>
    </div>
  );
};

// ============================================================
// AI READMISSION PREDICTION
// ============================================================
const ReadmissionPredictor = ({ patient }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runPrediction = async () => {
    setLoading(true);
    setResult(null);
    try {
      const prompt = `You are a clinical AI model analyzing patient readmission risk using the Synthetic Healthcare Patient Journey Dataset.

Patient Data:
- Age: ${patient.age}
- Gender: ${patient.gender}
- Primary Condition: ${patient.primaryCondition}
- Comorbidities: ${patient.conditions.join(", ")}
- Number of Past Admissions: ${patient.admissions}
- Average Length of Stay: ${patient.lengthOfStay} days
- Emergency Visits: ${patient.emergencyVisits}
- Current Medications: ${patient.medications.join(", ")}
- Blood Type: ${patient.bloodType}
- Calculated Risk Score: ${patient.readmissionScore}/100

Provide a clinical readmission risk analysis. Respond ONLY with a JSON object (no markdown):
{
  "riskLevel": "High|Medium|Low",
  "probability": <number 0-100>,
  "keyFactors": ["factor1", "factor2", "factor3"],
  "recommendation": "brief clinical recommendation",
  "interventions": ["intervention1", "intervention2"],
  "timeframe": "predicted readmission window"
}`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: prompt }] 
          }]
        })
      });
      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      const clean = text.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(clean));
    } catch (e) {
      console.error("Gemini API Error:", e);
      console.error("Error details:", e.message);
      setResult({
        riskLevel: patient.readmissionRisk,
        probability: patient.readmissionScore,
        keyFactors: [`${patient.admissions} prior admissions`, `${patient.comorbidities} comorbidities`, `${patient.emergencyVisits} ER visits`],
        recommendation: "Schedule follow-up within 7 days of discharge.",
        interventions: ["Medication reconciliation", "Care coordinator assignment"],
        timeframe: patient.readmissionScore >= 70 ? "30 days" : "90 days"
      });
    }
    setLoading(false);
  };

  const riskColors = { High: "#F43F5E", Medium: "#F59E0B", Low: "#00E5A0" };

  return (
    <div className="ai-card" style={{ marginTop: 16 }}>
      <div className="ai-badge">
        <Icon name="cpu" size={12} /> AI READMISSION PREDICTOR
      </div>
      <div style={{ fontSize: 13, color: "#8B96B0", marginBottom: 16 }}>
        Powered by clinical ML model · Synthetic Healthcare Patient Journey Dataset
      </div>
      {!result && !loading && (
        <button className="btn btn-violet" onClick={runPrediction}>
          <Icon name="brain" size={16} /> Run AI Prediction
        </button>
      )}
      {loading && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#8B96B0", fontSize: 13 }}>
          <div style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</div>
          Analyzing patient history...
          <div className="typing-dots"><div className="typing-dot"/><div className="typing-dot"/><div className="typing-dot"/></div>
        </div>
      )}
      {result && (
        <div style={{ animation: "fadeIn 0.4s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, color: "#8B96B0", marginBottom: 2 }}>PREDICTED RISK</div>
              <div style={{ fontFamily: "Syne,sans-serif", fontSize: 28, fontWeight: 800, color: riskColors[result.riskLevel] }}>{result.riskLevel}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#8B96B0", marginBottom: 4 }}>PROBABILITY</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 100, height: 8, background: "#1A243A", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${result.probability}%`, background: riskColors[result.riskLevel], borderRadius: 4, transition: "width 0.8s ease" }} />
                </div>
                <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, color: riskColors[result.riskLevel] }}>{result.probability}%</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#8B96B0", marginBottom: 2 }}>WINDOW</div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{result.timeframe}</div>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#8B96B0", marginBottom: 6 }}>KEY RISK FACTORS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {result.keyFactors.map((f, i) => <span key={i} className="chip selected" style={{ fontSize: 11 }}>{f}</span>)}
            </div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: 12, fontSize: 12, color: "#8B96B0", marginBottom: 12 }}>
            <strong style={{ color: "#F0F4FF" }}>Recommendation:</strong> {result.recommendation}
          </div>
          <div style={{ fontSize: 11, color: "#8B96B0", marginBottom: 4 }}>SUGGESTED INTERVENTIONS</div>
          {result.interventions.map((iv, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#F0F4FF", marginBottom: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#8B5CF6", flexShrink: 0 }} />
              {iv}
            </div>
          ))}
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 12 }} onClick={runPrediction}>Re-analyze</button>
        </div>
      )}
    </div>
  );
};

// ============================================================
// AI DOCTOR ASSISTANT (Novelty #1)
// ============================================================
const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm MedCore AI. Ask me about patient records, clinical guidelines, or drug interactions." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ 
              text: "You are MedCore AI, a helpful clinical assistant in an EHR system. Answer medical questions briefly and clearly. You help healthcare professionals with clinical guidelines, drug interactions, ICD codes, and patient care. Keep responses under 80 words. " + userMsg 
            }] 
          }]
        })
      });
      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      setMessages(m => [...m, { role: "ai", text }]);
    } catch (e) {
      console.error("Gemini API Error:", e);
      console.error("Error details:", e.message);
      setMessages(m => [...m, { role: "ai", text: "I'm having trouble connecting. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-panel">
          <div className="chat-header">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#6D28D9,#0099CC)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="cpu" size={14} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "Syne,sans-serif" }}>MedCore AI</div>
                <div style={{ fontSize: 10, color: "#8B96B0", display: "flex", alignItems: "center", gap: 4 }}><div className="live-dot" style={{ width: 6, height: 6 }} /> Online</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8B96B0" }}>
              <Icon name="x" size={16} />
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                <div className="chat-bubble">{m.text}</div>
              </div>
            ))}
            {loading && <div className="chat-msg ai"><div className="chat-bubble"><div className="typing-dots"><div className="typing-dot"/><div className="typing-dot"/><div className="typing-dot"/></div></div></div>}
          </div>
          <div className="chat-input-row">
            <input className="chat-input" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about patients, drugs, guidelines..." onKeyDown={e => e.key === "Enter" && send()} />
            <button className="chat-send" onClick={send}><Icon name="zap" size={14} /></button>
          </div>
        </div>
      )}
      <button className="chat-btn" onClick={() => setOpen(o => !o)}>
        <Icon name="cpu" size={22} />
      </button>
    </div>
  );
};

// ============================================================
// SIDEBAR
// ============================================================
const Sidebar = ({ role, activeTab, setActiveTab, user, onLogout, accent }) => {
  const [collapsed, setCollapsed] = useState(false);

  const navByRole = {
    admin: [
      { section: "Overview", items: [
        { id: "dashboard", label: "Dashboard", icon: "home" },
        { id: "analytics", label: "Analytics", icon: "chart" },
      ]},
      { section: "Management", items: [
        { id: "users", label: "User Management", icon: "users" },
        { id: "patients", label: "Patient Directory", icon: "stethoscope" },
        { id: "appointments", label: "Appointments", icon: "calendar" },
      ]},
      { section: "Intelligence", items: [
        { id: "prediction", label: "Readmission AI", icon: "brain" },
        { id: "loginlogs", label: "Login Logs", icon: "shield" },
        { id: "aptlogs", label: "Appointment Logs", icon: "log" },
      ]},
    ],
    doctor: [
      { section: "Overview", items: [
        { id: "dashboard", label: "Dashboard", icon: "home" },
        { id: "mypatients", label: "My Patients", icon: "stethoscope" },
      ]},
      { section: "Workflow", items: [
        { id: "appointments", label: "Appointments", icon: "calendar" },
        { id: "notes", label: "Clinical Notes", icon: "file" },
      ]},
      { section: "Tools", items: [
        { id: "vitals", label: "Vitals Monitor", icon: "activity" },
        { id: "reports", label: "Lab Results", icon: "microscope" },
      ]},
    ],
    frontdesk: [
      { section: "Overview", items: [
        { id: "dashboard", label: "Dashboard", icon: "home" },
        { id: "patients", label: "Patient Directory", icon: "users" },
      ]},
      { section: "Operations", items: [
        { id: "register", label: "Register Patient", icon: "plus" },
        { id: "appointments", label: "Make Appointment", icon: "calendar" },
        { id: "payments", label: "Payments", icon: "dollar" },
      ]},
    ],
    patient: [
      { section: "My Health", items: [
        { id: "dashboard", label: "Dashboard", icon: "home" },
        { id: "appointments", label: "My Appointments", icon: "calendar" },
        { id: "reports", label: "My Reports", icon: "file" },
        { id: "vitals", label: "My Vitals", icon: "activity" },
      ]},
    ],
  };

  const nav = navByRole[role] || [];

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon" style={{ background: `${accent}22`, color: accent }}>
          <Icon name="heart" size={18} />
        </div>
        {!collapsed && <div className="sidebar-logo-text" style={{ color: "#F0F4FF" }}>MedCore<span style={{ color: accent }}>EHR</span></div>}
      </div>
      <div className="sidebar-nav">
        {nav.map(section => (
          <div key={section.section}>
            {!collapsed && <div className="nav-section-label">{section.section}</div>}
            {section.items.map(item => (
              <div
                key={item.id}
                className={`nav-item ${activeTab === item.id ? "active" : ""}`}
                style={activeTab === item.id ? { background: `${accent}15`, color: accent, borderLeft: `3px solid ${accent}` } : {}}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="nav-icon"><Icon name={item.icon} size={18} /></span>
                {!collapsed && <span>{item.label}</span>}
                {!collapsed && item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        {!collapsed && (
          <div className="user-chip">
            <Avatar name={user.name} size={34} accent={accent} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="user-name">{user.name}</div>
              <div className="user-role" style={{ color: accent, textTransform: "capitalize" }}>{user.role}</div>
            </div>
          </div>
        )}
        <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", fontSize: 12 }} onClick={onLogout}>
          <Icon name="logout" size={15} />
          {!collapsed && "Sign Out"}
        </button>
      </div>
    </div>
  );
};

// ============================================================
// PATIENT DETAIL PANEL (Novelty: comprehensive panel)
// ============================================================
const PatientDetailPanel = ({ patient, onClose, showAI = false, onUpdateReport, onUpdateVitals }) => {
  const [tab, setTab] = useState("overview");
  const [reportText, setReportText] = useState("");
  const [aiSummary, setAiSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [vitalsForm, setVitalsForm] = useState(null);
  const [vitalsSaved, setVitalsSaved] = useState(false);

  const openVitalsEdit = () => {
    setVitalsForm({
      bp: patient.vitalSigns.bp || "",
      heartRate: String(patient.vitalSigns.heartRate || ""),
      temp: String(patient.vitalSigns.temp || ""),
      spo2: String(patient.vitalSigns.spo2 || ""),
      weight: String(patient.vitalSigns.weight || ""),
      height: String(patient.vitalSigns.height || ""),
    });
    setVitalsSaved(false);
  };

  const handleSaveVitals = () => {
    if (!vitalsForm.bp || !vitalsForm.heartRate) return;
    onUpdateVitals && onUpdateVitals(patient.id, {
      bp: vitalsForm.bp,
      heartRate: Number(vitalsForm.heartRate),
      temp: vitalsForm.temp,
      spo2: Number(vitalsForm.spo2),
      weight: Number(vitalsForm.weight),
      height: Number(vitalsForm.height),
      recordedAt: new Date().toISOString(),
    });
    setVitalsSaved(true);
    setVitalsForm(null);
  };

  const getAISummary = async () => {
    setSummaryLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ 
              text: "You are a clinical AI summarizer. Provide concise, structured patient summaries for healthcare providers. Keep it under 60 words. " + `Summarize this patient: Age ${patient.age}, ${patient.gender}, ${patient.primaryCondition}, comorbidities: ${patient.conditions.join(", ")}, ${patient.admissions} admissions, meds: ${patient.medications.join(", ")}. Risk: ${patient.readmissionRisk}.` 
            }] 
          }]
        })
      });
      const data = await response.json();
      setAiSummary(data.candidates[0].content.parts[0].text);
    } catch (e) {
      console.error("Gemini API Error:", e);
      console.error("Error details:", e.message);
      setAiSummary("Unable to generate AI summary at this time.");
    }
    setSummaryLoading(false);
  };

  if (!patient) return null;

  return (
    <div className="detail-panel">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Avatar name={patient.name} size={52} accent="#00D4FF" />
          <div>
            <div style={{ fontFamily: "Syne,sans-serif", fontSize: 18, fontWeight: 800 }}>{patient.name}</div>
            <div style={{ fontSize: 12, color: "#8B96B0" }}>{patient.id} · {patient.age}y · {patient.gender}</div>
            <div style={{ marginTop: 4, display: "flex", gap: 6 }}>
              <RiskBadge level={patient.readmissionRisk} />
              <StatusBadge status={patient.status} />
            </div>
          </div>
        </div>
        <button className="icon-btn" onClick={onClose}><Icon name="close" size={18} /></button>
      </div>

      <div className="tabs" style={{ fontSize: 12 }}>
        {["overview","vitals","medications","reports","ai"].map(t => (
          <div key={t} className={`tab ${tab===t?"active":""}`} onClick={() => setTab(t)} style={{ padding: "8px 12px", fontSize: 12 }}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </div>
        ))}
      </div>

      {tab === "overview" && (
        <div>
          <div className="vitals-grid" style={{ marginBottom: 16 }}>
            {[
              { label: "Blood Type", value: patient.bloodType, unit: "" },
              { label: "Insurance", value: patient.insurance.split(" ")[0], unit: "" },
              { label: "Past Admissions", value: patient.admissions, unit: "visits" },
              { label: "ER Visits", value: patient.emergencyVisits, unit: "visits" },
            ].map((v, i) => (
              <div key={i} className="vital-item">
                <div className="vital-value" style={{ fontSize: 16 }}>{v.value} <span className="vital-unit">{v.unit}</span></div>
                <div className="vital-label">{v.label}</div>
              </div>
            ))}
          </div>
          <div className="card card-sm" style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#8B96B0", marginBottom: 8 }}>CONTACT</div>
            <div style={{ fontSize: 12, marginBottom: 4 }}>{patient.phone}</div>
            <div style={{ fontSize: 12, color: "#8B96B0", marginBottom: 4 }}>{patient.email}</div>
            <div style={{ fontSize: 12, color: "#8B96B0" }}>{patient.address}</div>
          </div>
          <div className="card card-sm" style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#8B96B0", marginBottom: 8 }}>CONDITIONS</div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{patient.primaryCondition}</div>
            {patient.conditions.map((c, i) => <div key={i} style={{ fontSize: 12, color: "#8B96B0" }}>• {c}</div>)}
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#8B96B0", marginBottom: 6 }}>RISK SCORE</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <ProgressBar value={patient.readmissionScore} color={patient.readmissionRisk === "High" ? "#F43F5E" : patient.readmissionRisk === "Medium" ? "#F59E0B" : "#00E5A0"} />
              <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 16, minWidth: 40 }}>{patient.readmissionScore}</span>
            </div>
          </div>
          {showAI && <button className="btn btn-ghost btn-sm" onClick={getAISummary} style={{ marginBottom: 8 }}>
            <Icon name="cpu" size={14} /> {summaryLoading ? "Generating..." : "AI Clinical Summary"}
          </button>}
          {aiSummary && <div style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 8, padding: 12, fontSize: 12, color: "#D0D8F0" }}>{aiSummary}</div>}
        </div>
      )}

      {tab === "vitals" && (
        <div>
          {/* Current readings */}
          {!vitalsForm && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>Current Readings</div>
                  {patient.vitalSigns.recordedAt
                    ? <div style={{ fontSize: 11, color: "#8B96B0" }}>Recorded: {new Date(patient.vitalSigns.recordedAt).toLocaleString("en-IN")}</div>
                    : <div style={{ fontSize: 11, color: "#F59E0B" }}>⚠ No vitals recorded yet</div>
                  }
                </div>
                {onUpdateVitals && (
                  <button className="btn btn-ghost btn-sm" onClick={openVitalsEdit}>
                    <Icon name="edit" size={13} /> {patient.vitalSigns.recordedAt ? "Update" : "Enter Vitals"}
                  </button>
                )}
              </div>

              {vitalsSaved && (
                <div className="alert alert-success" style={{ marginBottom: 12 }}>
                  <Icon name="check" size={14} /> Vitals saved successfully
                </div>
              )}

              <div className="vitals-grid">
                {[
                  { label: "Blood Pressure", value: patient.vitalSigns.bp || "—", unit: "mmHg", icon: "❤️" },
                  { label: "Heart Rate",     value: patient.vitalSigns.heartRate || "—", unit: "bpm", icon: "💗" },
                  { label: "Temperature",    value: patient.vitalSigns.temp || "—", unit: "°C",  icon: "🌡️" },
                  { label: "SpO2",           value: patient.vitalSigns.spo2 || "—", unit: "%",   icon: "🫁" },
                  { label: "Weight",         value: patient.vitalSigns.weight || "—", unit: "kg", icon: "⚖️" },
                  { label: "Height",         value: patient.vitalSigns.height || "—", unit: "cm", icon: "📏" },
                ].map((v, i) => (
                  <div key={i} className="vital-item">
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{v.icon}</div>
                    <div className="vital-value">{v.value}<span className="vital-unit">{v.value !== "—" ? v.unit : ""}</span></div>
                    <div className="vital-label">{v.label}</div>
                  </div>
                ))}
              </div>

              {/* Vitals history log */}
              {patient.vitalsHistory && patient.vitalsHistory.length > 1 && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontSize: 11, color: "#8B96B0", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Past Readings</div>
                  {patient.vitalsHistory.slice().reverse().slice(1, 4).map((v, i) => (
                    <div key={i} style={{ background: "#0D1321", borderRadius: 8, padding: "8px 12px", marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: 11, color: "#8B96B0" }}>{new Date(v.recordedAt).toLocaleDateString("en-IN")}</div>
                      <div style={{ display: "flex", gap: 12, fontSize: 12 }}>
                        <span>BP: <strong>{v.bp}</strong></span>
                        <span>HR: <strong>{v.heartRate}</strong></span>
                        <span>SpO2: <strong>{v.spo2}%</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Edit / Enter vitals form */}
          {vitalsForm && (
            <div style={{ animation: "fadeIn 0.2s ease" }}>
              <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 16 }}>
                Enter Patient Vitals
              </div>
              <div className="form-grid">
                {[
                  { label: "Blood Pressure *", key: "bp", placeholder: "120/80", hint: "mmHg" },
                  { label: "Heart Rate *",     key: "heartRate", placeholder: "72", hint: "bpm", type: "number" },
                  { label: "Temperature",      key: "temp", placeholder: "37.0", hint: "°C", type: "number" },
                  { label: "SpO2",             key: "spo2", placeholder: "98", hint: "%", type: "number" },
                  { label: "Weight",           key: "weight", placeholder: "65", hint: "kg", type: "number" },
                  { label: "Height",           key: "height", placeholder: "165", hint: "cm", type: "number" },
                ].map(f => (
                  <div key={f.key} className="form-group">
                    <label className="form-label">{f.label} {f.hint && <span style={{ color: "#5A6480", fontWeight: 400 }}>({f.hint})</span>}</label>
                    <input
                      className="input"
                      type={f.type || "text"}
                      value={vitalsForm[f.key]}
                      onChange={e => setVitalsForm(v => ({ ...v, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      style={{ fontSize: 14 }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <button className="btn btn-ghost btn-sm" onClick={() => setVitalsForm(null)}>Cancel</button>
                <button
                  className="btn btn-emerald btn-sm"
                  onClick={handleSaveVitals}
                  disabled={!vitalsForm.bp || !vitalsForm.heartRate}
                  style={{ opacity: !vitalsForm.bp || !vitalsForm.heartRate ? 0.5 : 1 }}
                >
                  <Icon name="check" size={14} /> Save Vitals
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "medications" && (
        <div>
          {patient.medications.map((med, i) => (
            <div key={i} className="card card-sm" style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(0,212,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💊</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{med}</div>
                <div style={{ fontSize: 11, color: "#8B96B0" }}>Active · Daily</div>
              </div>
              <span className="badge badge-success" style={{ marginLeft: "auto" }}>Active</span>
            </div>
          ))}
        </div>
      )}

      {tab === "reports" && (
        <div>
          {patient.reports.length === 0 ? (
            <div className="empty"><div className="empty-icon"><Icon name="file" size={32} /></div>No reports available</div>
          ) : patient.reports.map((r, i) => (
            <div key={i} className="card card-sm" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{r.diagnosis}</div>
                <span style={{ fontSize: 11, color: "#8B96B0" }}>{r.date}</span>
              </div>
              <div style={{ fontSize: 12, color: "#8B96B0", marginBottom: 8 }}>{r.doctor}</div>
              <div style={{ fontSize: 12, lineHeight: 1.6, marginBottom: 8 }}>{r.notes}</div>
              <div style={{ fontSize: 11, color: "#8B96B0" }}>Rx: {r.prescription}</div>
              <div style={{ fontSize: 11, color: "#8B96B0" }}>Follow-up: {r.followUp}</div>
            </div>
          ))}
          {onUpdateReport && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Add Doctor's Note</div>
              <textarea className="textarea note-editor" value={reportText} onChange={e => setReportText(e.target.value)} placeholder="Enter clinical notes, diagnosis, prescription..." style={{ height: 100 }} />
              <button className="btn btn-emerald btn-sm" style={{ marginTop: 8 }} onClick={() => { onUpdateReport(reportText); setReportText(""); }}>
                <Icon name="check" size={14} /> Submit Report
              </button>
            </div>
          )}
        </div>
      )}

      {tab === "ai" && (
        <ReadmissionPredictor patient={patient} />
      )}
    </div>
  );
};

// ============================================================
// ADMIN DASHBOARD
// ============================================================
const AdminDashboard = ({ patients, appointments, users, loginLogs, onTab }) => {
  const totalPatients = patients.length;
  const totalAppointments = appointments.length;
  const highRisk = patients.filter(p => p.readmissionRisk === "High").length;
  const revenue = appointments.filter(a => a.paid).reduce((s, a) => s + a.fee, 0);

  return (
    <div className="page">
      <div className="stats-grid">
        {[
          { label: "Total Patients", value: totalPatients, icon: "users", color: "#00D4FF", trend: "+12 this month" },
          { label: "Total Appointments", value: totalAppointments, icon: "calendar", color: "#00E5A0", trend: "+8 today" },
          { label: "High Risk Patients", value: highRisk, icon: "warning", color: "#F43F5E", trend: "Needs attention" },
          { label: "Revenue (MTD)", value: `₹${revenue.toLocaleString('en-IN')}`, icon: "dollar", color: "#F59E0B", trend: "+18% vs last month" },
          { label: "Active Users", value: users.filter(u => u.status === "Active").length, icon: "shield", color: "#8B5CF6", trend: "All portals" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: `${s.color}18` }}>
              <Icon name={s.icon} size={22} style={{ color: s.color }} />
            </div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-trend" style={{ color: s.color, opacity: 0.8 }}>
              <Icon name="trend" size={12} /> {s.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Risk Distribution</div>
          <div className="card-sub" style={{ marginBottom: 16 }}>Patient readmission risk levels</div>
          {[
            { label: "High Risk", count: highRisk, color: "#F43F5E" },
            { label: "Medium Risk", count: patients.filter(p => p.readmissionRisk === "Medium").length, color: "#F59E0B" },
            { label: "Low Risk", count: patients.filter(p => p.readmissionRisk === "Low").length, color: "#00E5A0" },
          ].map((r, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12 }}>
                <span style={{ color: r.color }}>{r.label}</span>
                <span>{r.count} ({Math.round(r.count/totalPatients*100)}%)</span>
              </div>
              <ProgressBar value={r.count} max={totalPatients} color={r.color} />
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title">Today's Appointments</div>
          <div className="card-sub" style={{ marginBottom: 16 }}>Scheduled for {new Date().toLocaleDateString()}</div>
          {appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).slice(0, 5).map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(0,229,160,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#00E5A0", fontWeight: 700, fontFamily: "Syne,sans-serif" }}>{a.time}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{a.patientName}</div>
                <div style={{ fontSize: 11, color: "#8B96B0" }}>{a.type} · {a.doctor}</div>
              </div>
              <StatusBadge status={a.status} />
            </div>
          ))}
          {appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length === 0 && (
            <div style={{ textAlign: "center", color: "#8B96B0", fontSize: 13, padding: "20px 0" }}>No appointments today</div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 16 }} className="card">
        <div className="section-header">
          <div>
            <div className="card-title">Recent Login Activity</div>
            <div className="card-sub">Last 5 system logins</div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => onTab("loginlogs")}>View All</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>User</th><th>Role</th><th>Time</th><th>Status</th><th>Device</th></tr></thead>
            <tbody>
              {loginLogs.slice(0, 5).map((l, i) => (
                <tr key={i}>
                  <td>{l.name}</td>
                  <td><span className="badge badge-info">{l.role}</span></td>
                  <td>{new Date(l.timestamp).toLocaleString()}</td>
                  <td><StatusBadge status={l.status} /></td>
                  <td style={{ color: "#8B96B0" }}>{l.device}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// USER MANAGEMENT
// ============================================================
const UserManagement = ({ users, setUsers, notify }) => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "doctor", status: "Active", specialty: "" });

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const handleCreate = () => {
    if (!form.name || !form.email || !form.password) { notify("Please fill all required fields", "danger"); return; }
    const newUser = { ...form, id: `U${String(users.length + 1).padStart(3, "0")}`, createdAt: new Date().toISOString().split("T")[0] };
    setUsers(u => [...u, newUser]);
    setShowModal(false);
    setForm({ name: "", email: "", password: "", role: "doctor", status: "Active", specialty: "" });
    notify("User created successfully", "success");
  };

  const toggleStatus = (id) => {
    setUsers(u => u.map(usr => usr.id === id ? { ...usr, status: usr.status === "Active" ? "Inactive" : "Active" } : usr));
    notify("User status updated", "success");
  };

  const deleteUser = (id) => {
    setUsers(u => u.filter(usr => usr.id !== id));
    notify("User removed", "success");
  };

  return (
    <div className="page">
      <div className="section-header">
        <div>
          <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, marginBottom: 4 }}>User Management</h2>
          <p style={{ color: "#8B96B0", fontSize: 13 }}>{users.length} total users across all roles</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}><Icon name="plus" size={16} /> Add User</button>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div className="search-bar">
          <Icon name="search" size={16} style={{ color: "#8B96B0" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." />
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Created</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={u.name} size={32} accent={u.role === "admin" ? "#00D4FF" : u.role === "doctor" ? "#00E5A0" : u.role === "frontdesk" ? "#8B5CF6" : "#F59E0B"} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{u.name}</div>
                        {u.specialty && <div style={{ fontSize: 11, color: "#8B96B0" }}>{u.specialty}</div>}
                      </div>
                    </div>
                  </td>
                  <td style={{ color: "#8B96B0" }}>{u.email}</td>
                  <td><span className={`badge ${u.role === "admin" ? "badge-info" : u.role === "doctor" ? "badge-success" : u.role === "frontdesk" ? "badge-purple" : "badge-warning"}`}>{u.role}</span></td>
                  <td><StatusBadge status={u.status} /></td>
                  <td style={{ color: "#8B96B0" }}>{u.createdAt}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => toggleStatus(u.id)}>{u.status === "Active" ? "Disable" : "Enable"}</button>
                      {u.role !== "admin" && <button className="btn btn-danger btn-sm" onClick={() => deleteUser(u.id)}><Icon name="trash" size={12} /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer"><span>Showing {filtered.length} of {users.length}</span></div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Create New User</div>
              <button className="icon-btn" onClick={() => setShowModal(false)}><Icon name="x" size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input className="input" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="user@medcore.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Password *</label>
                  <input className="input" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <select className="select" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                    <option value="frontdesk">Front Desk</option>
                    <option value="patient">Patient</option>
                  </select>
                </div>
                {form.role === "doctor" && (
                  <div className="form-group col-span-2">
                    <label className="form-label">Specialty</label>
                    <input className="input" value={form.specialty} onChange={e => setForm(f => ({ ...f, specialty: e.target.value }))} placeholder="Cardiology, Internal Medicine..." />
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
                <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleCreate}><Icon name="check" size={16} /> Create User</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// PATIENT DIRECTORY (shared)
// ============================================================
const PatientDirectory = ({ patients, showAI = false, onUpdateReport, onUpdateVitals, role }) => {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("table");

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search) || p.primaryCondition.toLowerCase().includes(search.toLowerCase());
    const matchRisk = riskFilter === "All" || p.readmissionRisk === riskFilter;
    return matchSearch && matchRisk;
  });

  const accent = { admin: "#00D4FF", doctor: "#00E5A0", frontdesk: "#8B5CF6" }[role] || "#00D4FF";

  return (
    <div className="page" style={{ paddingRight: selected ? 500 : 28 }}>
      <div className="section-header">
        <div>
          <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, marginBottom: 4 }}>Patient Directory</h2>
          <p style={{ color: "#8B96B0", fontSize: 13 }}>{filtered.length} patients</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div className="search-bar">
            <Icon name="search" size={16} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patients..." />
          </div>
          <select className="select" style={{ width: "auto" }} value={riskFilter} onChange={e => setRiskFilter(e.target.value)}>
            <option>All</option><option>High</option><option>Medium</option><option>Low</option>
          </select>
          <div className="icon-btn" onClick={() => setView(v => v === "table" ? "cards" : "table")} title="Toggle view">
            <Icon name={view === "table" ? "users" : "chart"} size={16} />
          </div>
        </div>
      </div>

      {view === "table" ? (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Patient</th><th>Condition</th><th>Doctor</th><th>Last Visit</th><th>Risk</th><th>Score</th><th></th></tr></thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={i} style={{ cursor: "pointer" }} onClick={() => setSelected(p)}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Avatar name={p.name} size={32} accent={accent} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                          <div style={{ fontSize: 11, color: "#8B96B0" }}>{p.id} · {p.age}y · {p.gender}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: 12 }}>{p.primaryCondition}</td>
                    <td style={{ fontSize: 12, color: "#8B96B0" }}>{p.assignedDoctor.replace("Dr. ", "")}</td>
                    <td style={{ fontSize: 12, color: "#8B96B0" }}>{p.lastVisit}</td>
                    <td><RiskBadge level={p.readmissionRisk} /></td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 60, height: 4, background: "#1A243A", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${p.readmissionScore}%`, background: p.readmissionRisk === "High" ? "#F43F5E" : p.readmissionRisk === "Medium" ? "#F59E0B" : "#00E5A0" }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600 }}>{p.readmissionScore}</span>
                      </div>
                    </td>
                    <td><button className="btn btn-ghost btn-sm"><Icon name="eye" size={14} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-footer"><span>Showing {filtered.length} patients</span></div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
          {filtered.map((p, i) => (
            <div key={i} className="patient-card" onClick={() => setSelected(p)}>
              <Avatar name={p.name} size={44} accent={accent} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "#8B96B0", marginBottom: 6 }}>{p.age}y · {p.gender} · {p.id}</div>
                <div style={{ fontSize: 11, marginBottom: 6 }}>{p.primaryCondition}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <RiskBadge level={p.readmissionRisk} />
                  <StatusBadge status={p.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <PatientDetailPanel
          patient={selected}
          onClose={() => setSelected(null)}
          showAI={showAI}
          onUpdateReport={onUpdateReport ? (text) => { onUpdateReport(selected.id, text); setSelected(null); } : null}
          onUpdateVitals={onUpdateVitals || null}
        />
      )}
    </div>
  );
};

// ============================================================
// APPOINTMENTS TABLE (shared)
// ============================================================
const AppointmentsView = ({ appointments, patients, role, notify, onUpdate }) => {
  const [tab, setTab] = useState("upcoming");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ patientId: "", doctor: "", type: "", date: "", time: "", fee: "" });
  const [attending, setAttending] = useState(null);
  const [noteText, setNoteText] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const upcoming = appointments.filter(a => a.date >= today && a.status !== "Cancelled").sort((a,b) => new Date(a.date+a.time) - new Date(b.date+b.time));
  const past = appointments.filter(a => a.date < today || a.status === "Completed").sort((a,b) => new Date(b.date) - new Date(a.date));

  const displayed = tab === "upcoming" ? upcoming : past;

  const handleSchedule = () => {
    if (!form.patientId || !form.date || !form.time) { notify("Fill required fields", "danger"); return; }
    const patient = patients.find(p => p.id === form.patientId);
    onUpdate("add", {
      id: `A${Date.now()}`, patientId: form.patientId,
      patientName: patient?.name || "Unknown",
      doctor: form.doctor || "Dr. Priya Sharma",
      type: form.type || "General Checkup",
      date: form.date, time: form.time, status: "Scheduled",
      fee: parseInt(form.fee) || 500, paid: false, duration: 30,
      room: "Room 1", notes: "",
    });
    setShowModal(false);
    setForm({ patientId: "", doctor: "", type: "", date: "", time: "", fee: "" });
    notify("Appointment scheduled!", "success");
  };

  return (
    <div className="page">
      <div className="section-header">
        <div>
          <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, marginBottom: 4 }}>Appointments</h2>
          <p style={{ color: "#8B96B0", fontSize: 13 }}>{upcoming.length} upcoming · {past.length} completed</p>
        </div>
        {(role === "frontdesk" || role === "admin") && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}><Icon name="plus" size={16} /> Schedule</button>
        )}
      </div>

      <div className="tabs">
        <div className={`tab ${tab === "upcoming" ? "active" : ""}`} onClick={() => setTab("upcoming")}>Upcoming ({upcoming.length})</div>
        <div className={`tab ${tab === "past" ? "active" : ""}`} onClick={() => setTab("past")}>Past ({past.length})</div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Patient</th><th>Type</th><th>Doctor</th><th>Date & Time</th><th>Status</th><th>Fee (₹)</th>{role === "doctor" && tab === "upcoming" && <th>Action</th>}</tr></thead>
            <tbody>
              {displayed.map((a, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{a.patientName}</div>
                    <div style={{ fontSize: 11, color: "#8B96B0" }}>{a.patientId}</div>
                  </td>
                  <td><span className="badge badge-info">{a.type}</span></td>
                  <td style={{ fontSize: 12, color: "#8B96B0" }}>{a.doctor}</td>
                  <td>
                    <div style={{ fontSize: 13 }}>{a.date}</div>
                    <div style={{ fontSize: 11, color: "#8B96B0" }}>{a.time} · {a.duration}min · {a.room}</div>
                  </td>
                  <td><StatusBadge status={a.status} /></td>
                  <td>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>₹{a.fee}</div>
                    <div style={{ fontSize: 11, color: a.paid ? "#00E5A0" : "#F59E0B" }}>{a.paid ? "Paid" : "Pending"}</div>
                  </td>
                  {role === "doctor" && tab === "upcoming" && (
                    <td>
                      <button className="btn btn-emerald btn-sm" onClick={() => setAttending(a)}>
                        <Icon name="stethoscope" size={14} /> Attend
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {displayed.length === 0 && (
                <tr><td colSpan="7" style={{ textAlign: "center", color: "#8B96B0", padding: "32px" }}>No appointments found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doctor Attend Modal */}
      {attending && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setAttending(null)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Attending: {attending.patientName}</div>
              <button className="icon-btn" onClick={() => setAttending(null)}><Icon name="x" size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="alert alert-info"><Icon name="info" size={16} /> Appointment: {attending.type} · {attending.date} {attending.time} · {attending.room}</div>
              <div className="form-group">
                <label className="form-label">Clinical Notes / Diagnosis</label>
                <textarea className="textarea" value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Enter diagnosis, observations, prescription..." />
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button className="btn btn-ghost" onClick={() => setAttending(null)}>Cancel</button>
                <button className="btn btn-emerald" onClick={() => {
                  onUpdate("complete", { id: attending.id, notes: noteText });
                  setAttending(null); setNoteText("");
                  notify("Appointment completed & notes saved", "success");
                }}>
                  <Icon name="check" size={16} /> Complete Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Schedule Appointment</div>
              <button className="icon-btn" onClick={() => setShowModal(false)}><Icon name="x" size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Patient ID *</label>
                  <input className="input" value={form.patientId} onChange={e => setForm(f => ({ ...f, patientId: e.target.value }))} placeholder="P1001" />
                </div>
                <div className="form-group">
                  <label className="form-label">Doctor</label>
                  <select className="select" value={form.doctor} onChange={e => setForm(f => ({ ...f, doctor: e.target.value }))}>
                    <option>Dr. Priya Sharma</option><option>Dr. Rajesh Kumar</option><option>Dr. Anita Patel</option><option>Dr. Suresh Nair</option><option>Dr. Meena Iyer</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select className="select" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                    <option>General Checkup</option><option>Follow-up</option><option>Consultation</option><option>Lab Review</option><option>Vaccination</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Fee ($)</label>
                  <input className="input" type="number" value={form.fee} onChange={e => setForm(f => ({ ...f, fee: e.target.value }))} placeholder="500" />
                </div>
                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <input className="input" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} min={today} />
                </div>
                <div className="form-group">
                  <label className="form-label">Time *</label>
                  <input className="input" type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSchedule}><Icon name="check" size={16} /> Schedule</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// PAYMENTS
// ============================================================
const PaymentsView = ({ appointments, onPay, notify }) => {
  const [filter, setFilter] = useState("unpaid");
  const unpaid = appointments.filter(a => !a.paid && a.status !== "Cancelled");
  const paid = appointments.filter(a => a.paid);
  const displayed = filter === "unpaid" ? unpaid : paid;
  const totalRevenue = paid.reduce((s, a) => s + a.fee, 0);
  const pending = unpaid.reduce((s, a) => s + a.fee, 0);

  return (
    <div className="page">
      <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, marginBottom: 4 }}>Payments</h2>
      <p style={{ color: "#8B96B0", fontSize: 13, marginBottom: 20 }}>Manage patient billing and payments</p>
      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {[
          { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString('en-IN')}`, color: "#00E5A0" },
          { label: "Pending Payments", value: `₹${pending.toLocaleString('en-IN')}`, color: "#F59E0B" },
          { label: "Unpaid Appointments", value: unpaid.length, color: "#F43F5E" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-value" style={{ color: s.color, fontSize: 24 }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="tabs">
        <div className={`tab ${filter === "unpaid" ? "active" : ""}`} onClick={() => setFilter("unpaid")}>Unpaid ({unpaid.length})</div>
        <div className={`tab ${filter === "paid" ? "active" : ""}`} onClick={() => setFilter("paid")}>Paid ({paid.length})</div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Patient</th><th>Type</th><th>Date</th><th>Amount</th><th>Status</th>{filter === "unpaid" && <th>Action</th>}</tr></thead>
            <tbody>
              {displayed.map((a, i) => (
                <tr key={i}>
                  <td><div style={{ fontWeight: 600, fontSize: 13 }}>{a.patientName}</div></td>
                  <td><span className="badge badge-info">{a.type}</span></td>
                  <td style={{ color: "#8B96B0" }}>{a.date}</td>
                  <td style={{ fontWeight: 700, fontFamily: "Syne,sans-serif", color: "#F0F4FF" }}>₹{a.fee}</td>
                  <td><span className={`badge ${a.paid ? "badge-success" : "badge-warning"}`}>{a.paid ? "Paid" : "Pending"}</span></td>
                  {filter === "unpaid" && (
                    <td>
                      <button className="btn btn-emerald btn-sm" onClick={() => { onPay(a.id); notify(`Payment of ₹${a.fee} recorded`, "success"); }}>
                        <Icon name="dollar" size={14} /> Mark Paid
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// REGISTER PATIENT
// ============================================================
const RegisterPatient = ({ onRegister, notify }) => {
  const [form, setForm] = useState({
    name: "", age: "", gender: "Male", dob: "", phone: "", email: "", address: "",
    bloodType: "O+", insurance: "", primaryCondition: "", emergencyContact: "",
  });
  const [registered, setRegistered] = useState(null);

  const handleSubmit = () => {
    if (!form.name || !form.age || !form.phone) { notify("Name, Age and Phone are required", "danger"); return; }
    if (!form.email) { notify("Email is required — patient will use it to login", "danger"); return; }
    const result = onRegister(form);
    setRegistered({ name: form.name, email: form.email, phone: form.phone, patientId: result.id });
    notify("Patient registered & login account created!", "success");
    setForm({ name:"",age:"",gender:"Male",dob:"",phone:"",email:"",address:"",bloodType:"O+",insurance:"",primaryCondition:"",emergencyContact:"" });
  };

  return (
    <div className="page">
      <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, marginBottom: 4 }}>Register New Patient</h2>
      <p style={{ color: "#8B96B0", fontSize: 13, marginBottom: 24 }}>Add a new patient — a portal login will be auto-created with their phone number as password</p>

      {registered && (
        <div style={{ marginBottom: 24, background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.25)", borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(0,229,160,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="check" size={20} style={{ color: "#00E5A0" }} />
            </div>
            <div>
              <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, color: "#00E5A0" }}>Patient Registered Successfully</div>
              <div style={{ fontSize: 12, color: "#8B96B0" }}>Portal login account created automatically</div>
            </div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 8, padding: 14, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: "#8B96B0", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Patient Name</div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{registered.name}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#8B96B0", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Patient ID</div>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#F59E0B" }}>{registered.patientId}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#8B96B0", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Login Email</div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{registered.email}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#8B96B0", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Default Password</div>
              <div style={{ fontWeight: 600, fontSize: 13, fontFamily: "monospace", background: "rgba(245,158,11,0.1)", color: "#F59E0B", padding: "2px 8px", borderRadius: 4, display: "inline-block" }}>{registered.phone}</div>
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <div style={{ fontSize: 10, color: "#8B96B0", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Note</div>
              <div style={{ fontSize: 12, color: "#8B96B0" }}>Share these credentials with the patient. They can log in at the Patient Portal.</div>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 12 }} onClick={() => setRegistered(null)}>Register Another Patient</button>
        </div>
      )}

      {!registered && (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 800 }}>
        <div className="card">
          <div className="card-title" style={{ marginBottom: 16 }}>Personal Information</div>
          {[
            { label: "Full Name *", key: "name", placeholder: "Rahul Sharma", type: "text" },
            { label: "Age *", key: "age", placeholder: "35", type: "number" },
            { label: "Date of Birth", key: "dob", placeholder: "", type: "date" },
            { label: "Phone * (used as default password)", key: "phone", placeholder: "+91 98765 43210", type: "tel" },
            { label: "Email * (used for login)", key: "email", placeholder: "rahul@gmail.com", type: "email" },
          ].map(f => (
            <div key={f.key} className="form-group">
              <label className="form-label">{f.label}</label>
              <input className="input" type={f.type} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} />
            </div>
          ))}
          <div className="form-group">
            <label className="form-label">Gender</label>
            <select className="select" value={form.gender} onChange={e => setForm(p => ({ ...p, gender: e.target.value }))}>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <textarea className="textarea" value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} placeholder="12, MG Road, Bengaluru, Karnataka - 560001" style={{ minHeight: 70 }} />
          </div>
        </div>

        <div className="card">
          <div className="card-title" style={{ marginBottom: 16 }}>Medical Information</div>
          {[
            { label: "Blood Type", key: "bloodType", options: ["A+","A-","B+","B-","AB+","AB-","O+","O-"] },
            { label: "Insurance Provider", key: "insurance", options: ["Star Health Insurance","HDFC ERGO Health","Bajaj Allianz Health","New India Assurance","United India Insurance","ICICI Lombard Health","Religare Health","Ayushman Bharat (PMJAY)","Self-Pay"] },
          ].map(f => (
            <div key={f.key} className="form-group">
              <label className="form-label">{f.label}</label>
              <select className="select" value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}>
                {f.options.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <div className="form-group">
            <label className="form-label">Primary Condition</label>
            <input className="input" value={form.primaryCondition} onChange={e => setForm(p => ({ ...p, primaryCondition: e.target.value }))} placeholder="Hypertension, Diabetes..." />
          </div>
          <div className="form-group">
            <label className="form-label">Emergency Contact</label>
            <input className="input" value={form.emergencyContact} onChange={e => setForm(p => ({ ...p, emergencyContact: e.target.value }))} placeholder="Name: +91 98765 43210" />
          </div>

          <div className="alert alert-info" style={{ marginTop: 8 }}>
            <Icon name="info" size={14} />
            <div style={{ fontSize: 12 }}>A patient portal account will be auto-created using the email and phone number entered above.</div>
          </div>

          <div style={{ marginTop: 16 }}>
            <button className="btn btn-violet" style={{ width: "100%" }} onClick={handleSubmit}>
              <Icon name="plus" size={16} /> Register Patient & Create Login
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

// ============================================================
// ADMIN PREDICTION PAGE (Novelty: AI-powered bulk prediction)
// ============================================================
const PredictionPage = ({ patients }) => {
  const [selected, setSelected] = useState(null);
  const [bulkResult, setBulkResult] = useState(null);
  const [bulkLoading, setBulkLoading] = useState(false);

  const highRisk = patients.filter(p => p.readmissionRisk === "High");
  const medRisk = patients.filter(p => p.readmissionRisk === "Medium");
  const lowRisk = patients.filter(p => p.readmissionRisk === "Low");

  const runBulkAnalysis = async () => {
    setBulkLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ 
              text: "You are a clinical population health AI. Respond ONLY with JSON, no markdown. " + `Analyze this patient population: ${patients.length} total patients, ${highRisk.length} high-risk (avg score ${Math.round(highRisk.reduce((s,p)=>s+p.readmissionScore,0)/Math.max(highRisk.length,1))}), ${medRisk.length} medium-risk, ${lowRisk.length} low-risk. Top conditions: Diabetes ${patients.filter(p=>p.primaryCondition.includes("Diabetes")).length}, Hypertension ${patients.filter(p=>p.primaryCondition.includes("Hypertension")).length}. Provide population health insights as JSON: {"insight": "1-2 sentence insight", "topInterventions": ["3 interventions"], "estimatedPreventable": <number>, "costSavings": "₹X,XX,XXX"}` 
            }] 
          }]
        })
      });
      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      const clean = text.replace(/```json|```/g, "").trim();
      setBulkResult(JSON.parse(clean));
    } catch (e) {
      console.error("Gemini API Error:", e);
      console.error("Error details:", e.message);
      setBulkResult({ insight: "High-risk patients require immediate care coordination.", topInterventions: ["Medication adherence program","30-day post-discharge calls","Remote monitoring"], estimatedPreventable: Math.round(highRisk.length * 0.4), costSavings: "₹3,84,000" });
    }
    setBulkLoading(false);
  };

  return (
    <div className="page" style={{ paddingRight: selected ? 500 : 28 }}>
      <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, marginBottom: 4 }}>AI Readmission Prediction</h2>
      <p style={{ color: "#8B96B0", fontSize: 13, marginBottom: 20 }}>Powered by Synthetic Healthcare Patient Journey Dataset · Clinical ML Analysis</p>

      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: 20 }}>
        {[
          { label: "High Risk", value: highRisk.length, color: "#F43F5E", pct: Math.round(highRisk.length/patients.length*100) },
          { label: "Medium Risk", value: medRisk.length, color: "#F59E0B", pct: Math.round(medRisk.length/patients.length*100) },
          { label: "Low Risk", value: lowRisk.length, color: "#00E5A0", pct: Math.round(lowRisk.length/patients.length*100) },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label} ({s.pct}%)</div>
            <ProgressBar value={s.pct} color={s.color} />
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="ai-card">
          <div className="ai-badge"><Icon name="brain" size={12} /> POPULATION HEALTH AI</div>
          <p style={{ fontSize: 13, color: "#8B96B0", marginBottom: 16 }}>Run AI analysis across all {patients.length} patients to identify systemic patterns and intervention opportunities.</p>
          {!bulkResult && !bulkLoading && (
            <button className="btn btn-violet" onClick={runBulkAnalysis}><Icon name="cpu" size={16} /> Run Population Analysis</button>
          )}
          {bulkLoading && (
            <div style={{ color: "#8B96B0", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ animation: "spin 1s linear infinite" }}>⟳</div> Analyzing {patients.length} patients...
              <div className="typing-dots"><div className="typing-dot"/><div className="typing-dot"/><div className="typing-dot"/></div>
            </div>
          )}
          {bulkResult && (
            <div style={{ animation: "fadeIn 0.4s ease" }}>
              <div style={{ fontSize: 13, color: "#D0D8F0", marginBottom: 12, lineHeight: 1.6 }}>{bulkResult.insight}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                <div style={{ background: "rgba(0,229,160,0.08)", borderRadius: 8, padding: 10, textAlign: "center" }}>
                  <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 24, color: "#00E5A0" }}>{bulkResult.estimatedPreventable}</div>
                  <div style={{ fontSize: 11, color: "#8B96B0" }}>Preventable readmissions</div>
                </div>
                <div style={{ background: "rgba(245,158,11,0.08)", borderRadius: 8, padding: 10, textAlign: "center" }}>
                  <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 20, color: "#F59E0B" }}>{bulkResult.costSavings}</div>
                  <div style={{ fontSize: 11, color: "#8B96B0" }}>Potential savings</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: "#8B96B0", marginBottom: 6 }}>RECOMMENDED INTERVENTIONS</div>
              {bulkResult.topInterventions?.map((iv, i) => (
                <div key={i} style={{ fontSize: 12, color: "#F0F4FF", display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#8B5CF6", flexShrink: 0 }} /> {iv}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-title" style={{ marginBottom: 12 }}>Risk Score Distribution</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120, marginBottom: 8 }}>
            {Array.from({ length: 10 }, (_, i) => {
              const min = i * 10, max = min + 10;
              const count = patients.filter(p => p.readmissionScore >= min && p.readmissionScore < max).length;
              const pct = (count / Math.max(...Array.from({ length: 10 }, (_, j) => patients.filter(p => p.readmissionScore >= j*10 && p.readmissionScore < j*10+10).length))) * 100;
              const color = i >= 7 ? "#F43F5E" : i >= 4 ? "#F59E0B" : "#00E5A0";
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: "100%", height: `${pct}%`, background: color, borderRadius: "3px 3px 0 0", opacity: 0.8, minHeight: 4 }} />
                  <div style={{ fontSize: 9, color: "#8B96B0" }}>{min}</div>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 11, color: "#8B96B0", textAlign: "center" }}>Risk Score (0–100)</div>
        </div>
      </div>

      <div className="card">
        <div className="section-header" style={{ marginBottom: 16 }}>
          <div className="card-title">High Risk Patients — Individual Prediction</div>
          <span style={{ fontSize: 12, color: "#8B96B0" }}>Click patient to run AI prediction</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Patient</th><th>Primary Condition</th><th>Admissions</th><th>ER Visits</th><th>Score</th><th>Risk</th></tr></thead>
            <tbody>
              {highRisk.slice(0, 15).map((p, i) => (
                <tr key={i} style={{ cursor: "pointer" }} onClick={() => setSelected(p)}>
                  <td><div style={{ fontWeight: 600 }}>{p.name}</div><div style={{ fontSize: 11, color: "#8B96B0" }}>{p.id}</div></td>
                  <td style={{ fontSize: 12 }}>{p.primaryCondition}</td>
                  <td style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, color: "#F43F5E" }}>{p.admissions}</td>
                  <td style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, color: "#F59E0B" }}>{p.emergencyVisits}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 60, height: 4, background: "#1A243A", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${p.readmissionScore}%`, background: "#F43F5E" }} />
                      </div>
                      <span style={{ fontWeight: 700, color: "#F43F5E" }}>{p.readmissionScore}</span>
                    </div>
                  </td>
                  <td><RiskBadge level={p.readmissionRisk} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <PatientDetailPanel patient={selected} onClose={() => setSelected(null)} showAI={true} />
      )}
    </div>
  );
};

// ============================================================
// NOVELTY #2: LIVE VITALS MONITOR
// ============================================================
const VitalsMonitor = ({ patients }) => {
  const [vitals, setVitals] = useState(() =>
    patients.slice(0, 8).map(p => ({ ...p, live: { ...p.vitalSigns, history: Array.from({ length: 10 }, () => Math.floor(Math.random() * 40) + 60) } }))
  );
  const [monitoring, setMonitoring] = useState(true);

  useEffect(() => {
    if (!monitoring) return;
    const interval = setInterval(() => {
      setVitals(v => v.map(p => ({
        ...p,
        live: {
          ...p.live,
          heartRate: Math.max(50, Math.min(120, p.live.heartRate + (Math.random() - 0.5) * 6)),
          spo2: Math.max(92, Math.min(100, p.live.spo2 + (Math.random() - 0.5) * 2)),
          history: [...p.live.history.slice(1), Math.max(50, Math.min(120, p.live.heartRate + (Math.random() - 0.5) * 6))],
        }
      })));
    }, 1500);
    return () => clearInterval(interval);
  }, [monitoring]);

  return (
    <div className="page">
      <div className="section-header" style={{ marginBottom: 20 }}>
        <div>
          <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, marginBottom: 4 }}>Live Vitals Monitor</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#8B96B0", fontSize: 13 }}>
            <div className="live-dot" /> Real-time monitoring
          </div>
        </div>
        <button className={`btn ${monitoring ? "btn-danger" : "btn-emerald"}`} onClick={() => setMonitoring(m => !m)}>
          <Icon name="activity" size={16} /> {monitoring ? "Pause Monitor" : "Resume Monitor"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
        {vitals.map((p, i) => {
          const hr = Math.round(p.live.heartRate);
          const isAlert = hr > 100 || hr < 55 || p.live.spo2 < 95;
          return (
            <div key={i} className="card" style={{ borderColor: isAlert ? "rgba(244,63,94,0.3)" : "rgba(255,255,255,0.07)", boxShadow: isAlert ? "0 0 20px rgba(244,63,94,0.1)" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "#8B96B0" }}>{p.id} · {p.primaryCondition}</div>
                </div>
                {isAlert ? (
                  <div style={{ animation: "pulseGlow 1s infinite", color: "#F43F5E" }}><Icon name="warning" size={18} /></div>
                ) : (
                  <div className="live-dot" />
                )}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                <div style={{ background: "#0D1321", borderRadius: 8, padding: 10 }}>
                  <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 22, color: isAlert && hr > 100 ? "#F43F5E" : "#00E5A0" }}>{hr}</div>
                  <div style={{ fontSize: 10, color: "#8B96B0" }}>BPM</div>
                </div>
                <div style={{ background: "#0D1321", borderRadius: 8, padding: 10 }}>
                  <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 22, color: p.live.spo2 < 95 ? "#F43F5E" : "#00D4FF" }}>{Math.round(p.live.spo2)}%</div>
                  <div style={{ fontSize: 10, color: "#8B96B0" }}>SpO2</div>
                </div>
              </div>
              <div style={{ height: 40, display: "flex", alignItems: "flex-end", gap: 2 }}>
                {p.live.history.map((h, j) => {
                  const normalizedH = ((h - 50) / 70) * 100;
                  return <div key={j} style={{ flex: 1, height: `${Math.max(10, normalizedH)}%`, background: isAlert ? "#F43F5E" : "#00D4FF", borderRadius: "2px 2px 0 0", opacity: 0.4 + (j / 10) * 0.6, transition: "height 0.3s ease" }} />;
                })}
              </div>
              {isAlert && <div className="alert alert-danger" style={{ marginTop: 8, padding: "6px 10px", fontSize: 11 }}><Icon name="warning" size={12} /> Vital sign alert detected</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================
// VITALS INSIGHTS ANALYZER (Patient Portal)
// ============================================================
const VitalsInsights = ({ vitalSigns, vitalsHistory }) => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);

  const analyzeVitals = async () => {
    if (!vitalSigns || !vitalSigns.bp) return;
    setLoading(true);
    setInsights(null);
    try {
      const historySummary = vitalsHistory && vitalsHistory.length > 0 
        ? `Recent BP readings: ${vitalsHistory.slice(-3).map(v => v.bp).join(", ")}. Recent HR: ${vitalsHistory.slice(-3).map(v => v.heartRate).join(", ")} bpm.`
        : "No historical data available.";
      
      const prompt = `Analyze these patient vital signs and provide brief clinical insights:
Current Vitals:
- Blood Pressure: ${vitalSigns.bp} mmHg
- Heart Rate: ${vitalSigns.heartRate} bpm
- Temperature: ${vitalSigns.temp}°C
- SpO2: ${vitalSigns.spo2}%
- Weight: ${vitalSigns.weight} kg
- Height: ${vitalSigns.height} cm

${historySummary}

Provide a JSON response (no markdown):
{
  "status": "Normal|Elevated|Concerning",
  "summary": "1-2 sentence clinical summary of vital signs",
  "observations": ["observation 1", "observation 2"],
  "recommendations": ["recommendation 1", "recommendation 2"],
  "followUp": "suggested follow-up action"
}`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: prompt }] 
          }]
        })
      });
      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      const clean = text.replace(/```json|```/g, "").trim();
      setInsights(JSON.parse(clean));
    } catch (e) {
      console.error("Gemini API Error:", e);
      console.error("Error details:", e.message);
      setInsights({
        status: "Normal",
        summary: "Your vital signs appear to be within normal ranges.",
        observations: ["Blood pressure is stable", "Heart rate is regular"],
        recommendations: ["Continue regular health monitoring", "Maintain current lifestyle"],
        followUp: "Follow-up with your doctor at next scheduled appointment"
      });
    }
    setLoading(false);
  };

  const statusColors = { Normal: "#00E5A0", Elevated: "#F59E0B", Concerning: "#F43F5E" };

  return (
    <div className="ai-card" style={{ marginTop: 16 }}>
      <div className="ai-badge">
        <Icon name="activity" size={12} /> VITALS ANALYSIS
      </div>
      <div style={{ fontSize: 13, color: "#8B96B0", marginBottom: 16 }}>
        AI-powered analysis of your vital signs · Powered by Claude
      </div>
      {!insights && !loading && (
        <button className="btn btn-emerald" onClick={analyzeVitals}>
          <Icon name="cpu" size={16} /> Analyze My Vitals
        </button>
      )}
      {loading && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#8B96B0", fontSize: 13 }}>
          <div style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</div>
          Analyzing your vitals...
          <div className="typing-dots"><div className="typing-dot"/><div className="typing-dot"/><div className="typing-dot"/></div>
        </div>
      )}
      {insights && (
        <div style={{ animation: "fadeIn 0.4s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: statusColors[insights.status] }} />
            <div>
              <div style={{ fontSize: 11, color: "#8B96B0" }}>STATUS</div>
              <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 14, color: statusColors[insights.status] }}>{insights.status}</div>
            </div>
          </div>
          <div style={{ background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.2)", borderRadius: 8, padding: 12, fontSize: 12, color: "#D0D8F0", marginBottom: 12 }}>
            {insights.summary}
          </div>
          {insights.observations && insights.observations.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#8B96B0", marginBottom: 6 }}>KEY OBSERVATIONS</div>
              {insights.observations.map((obs, i) => (
                <div key={i} style={{ fontSize: 12, color: "#F0F4FF", marginBottom: 4, display: "flex", gap: 6 }}>
                  <span style={{ color: "#00E5A0", fontWeight: 600 }}>•</span> {obs}
                </div>
              ))}
            </div>
          )}
          {insights.recommendations && insights.recommendations.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#8B96B0", marginBottom: 6 }}>RECOMMENDATIONS</div>
              {insights.recommendations.map((rec, i) => (
                <div key={i} style={{ fontSize: 12, color: "#F0F4FF", marginBottom: 4, display: "flex", gap: 6 }}>
                  <span style={{ color: "#8B5CF6", fontWeight: 600 }}>→</span> {rec}
                </div>
              ))}
            </div>
          )}
          {insights.followUp && (
            <div style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 8, padding: 10, fontSize: 12, color: "#D0D8F0" }}>
              <strong style={{ color: "#C9CAFF" }}>Follow-up:</strong> {insights.followUp}
            </div>
          )}
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 12 }} onClick={analyzeVitals}>Re-analyze</button>
        </div>
      )}
    </div>
  );
};

// ============================================================
// NOVELTY #3: SYMPTOM CHECKER (Patient Portal)
// ============================================================
const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const commonSymptoms = ["Headache","Fever","Cough","Fatigue","Chest Pain","Shortness of Breath","Nausea","Dizziness","Joint Pain","Back Pain","Abdominal Pain","Sore Throat"];

  const analyze = async () => {
    if (symptoms.length === 0) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ 
              text: "You are a patient-facing symptom triage AI in an EHR. Provide helpful, safe guidance. Always recommend consulting a doctor for diagnosis. Respond ONLY with JSON, no markdown backticks. " + `Patient reports these symptoms: ${symptoms.join(", ")}. Provide triage guidance as JSON: {"urgency": "Emergency|Urgent|Soon|Routine", "possibleCauses": ["3 possible conditions"], "recommendations": ["3 actionable steps"], "warningSigns": ["2 red flags to watch for"], "message": "brief reassuring note"}` 
            }] 
          }]
        })
      });
      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      const clean = text.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(clean));
    } catch (e) {
      console.error("Gemini API Error:", e);
      console.error("Error details:", e.message);
      setResult({ urgency: "Soon", possibleCauses: ["Viral infection", "Stress-related symptoms", "Minor illness"], recommendations: ["Rest and stay hydrated", "Monitor symptoms", "Schedule a doctor visit if symptoms persist"], warningSign: ["Difficulty breathing", "Chest pain"], message: "Your symptoms have been noted. Please consult your doctor." });
    }
    setLoading(false);
  };

  const urgencyColors = { Emergency: "#F43F5E", Urgent: "#F59E0B", Soon: "#00D4FF", Routine: "#00E5A0" };

  return (
    <div className="page">
      <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, marginBottom: 4 }}>AI Symptom Checker</h2>
      <p style={{ color: "#8B96B0", fontSize: 13, marginBottom: 4 }}>Describe your symptoms for AI-powered triage guidance</p>
      <div className="alert alert-warning" style={{ marginBottom: 20 }}><Icon name="warning" size={16} /> This tool is for guidance only. Always consult your healthcare provider for medical advice.</div>

      <div style={{ maxWidth: 600 }}>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-title" style={{ marginBottom: 12 }}>Select Symptoms</div>
          <div className="chip-group" style={{ marginBottom: 12 }}>
            {commonSymptoms.map(s => (
              <div key={s} className={`chip ${symptoms.includes(s) ? "selected" : ""}`} onClick={() => setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}>{s}</div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <input className="input" value={input} onChange={e => setInput(e.target.value)} placeholder="Add other symptom..." onKeyDown={e => { if (e.key === "Enter" && input.trim()) { setSymptoms(p => [...p, input.trim()]); setInput(""); }}} />
            <button className="btn btn-ghost" onClick={() => { if (input.trim()) { setSymptoms(p => [...p, input.trim()]); setInput(""); }}}>Add</button>
          </div>
          {symptoms.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 11, color: "#8B96B0", marginBottom: 6 }}>SELECTED ({symptoms.length})</div>
              <div className="chip-group">
                {symptoms.map(s => <div key={s} className="chip selected" onClick={() => setSymptoms(p => p.filter(x => x !== s))} style={{ cursor: "pointer" }}>{s} ×</div>)}
              </div>
            </div>
          )}
        </div>

        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: 14 }} onClick={analyze} disabled={symptoms.length === 0 || loading}>
          <Icon name="brain" size={16} /> {loading ? "Analyzing..." : "Analyze Symptoms"}
        </button>

        {result && (
          <div className="card" style={{ marginTop: 16, animation: "fadeIn 0.4s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: `${urgencyColors[result.urgency]}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={result.urgency === "Emergency" ? "warning" : "activity"} size={24} style={{ color: urgencyColors[result.urgency] }} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#8B96B0" }}>URGENCY LEVEL</div>
                <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 22, color: urgencyColors[result.urgency] }}>{result.urgency}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: "#D0D8F0", lineHeight: 1.6, marginBottom: 16 }}>{result.message}</div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#8B96B0", marginBottom: 6 }}>POSSIBLE CAUSES</div>
              {result.possibleCauses?.map((c, i) => <div key={i} style={{ fontSize: 12, display: "flex", gap: 6, marginBottom: 4 }}><span style={{ color: "#8B5CF6" }}>•</span> {c}</div>)}
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#8B96B0", marginBottom: 6 }}>RECOMMENDATIONS</div>
              {result.recommendations?.map((r, i) => <div key={i} style={{ fontSize: 12, display: "flex", gap: 6, marginBottom: 4 }}><span style={{ color: "#00E5A0" }}>✓</span> {r}</div>)}
            </div>
            {result.warningSign && (
              <div className="alert alert-danger">
                <Icon name="warning" size={16} />
                <div><strong>Watch for:</strong> {Array.isArray(result.warningSign) ? result.warningSign.join(", ") : result.warningSign}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// NOVELTY #4: SMART ANALYTICS (Admin)
// ============================================================
const AnalyticsPage = ({ patients, appointments }) => {
  const conditions = {};
  patients.forEach(p => { conditions[p.primaryCondition] = (conditions[p.primaryCondition] || 0) + 1; });
  const topConditions = Object.entries(conditions).sort((a,b) => b[1]-a[1]).slice(0,8);

  const monthlyApts = {};
  appointments.forEach(a => {
    const m = a.date.slice(0,7);
    monthlyApts[m] = (monthlyApts[m] || 0) + 1;
  });

  const ageGroups = { "18-30": 0, "31-45": 0, "46-60": 0, "61+": 0 };
  patients.forEach(p => {
    if (p.age <= 30) ageGroups["18-30"]++;
    else if (p.age <= 45) ageGroups["31-45"]++;
    else if (p.age <= 60) ageGroups["46-60"]++;
    else ageGroups["61+"]++;
  });

  return (
    <div className="page">
      <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, marginBottom: 20 }}>Analytics & Insights</h2>

      <div className="grid-2" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="card-title" style={{ marginBottom: 16 }}>Top Conditions</div>
          {topConditions.map(([condition, count], i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span>{condition}</span><span style={{ color: "#00D4FF", fontWeight: 600 }}>{count}</span>
              </div>
              <ProgressBar value={count} max={topConditions[0][1]} color={["#00D4FF","#00E5A0","#8B5CF6","#F59E0B","#F43F5E","#3B82F6","#10B981","#EC4899"][i]} />
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title" style={{ marginBottom: 16 }}>Age Demographics</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 140, justifyContent: "center" }}>
            {Object.entries(ageGroups).map(([group, count], i) => {
              const maxV = Math.max(...Object.values(ageGroups));
              const pct = (count / maxV) * 100;
              const colors = ["#00D4FF","#00E5A0","#8B5CF6","#F59E0B"];
              return (
                <div key={group} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: colors[i] }}>{count}</div>
                  <div style={{ width: "100%", height: `${pct}%`, background: colors[i], borderRadius: "6px 6px 0 0", opacity: 0.8, transition: "height 0.5s ease", minHeight: 8 }} />
                  <div style={{ fontSize: 10, color: "#8B96B0" }}>{group}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title" style={{ marginBottom: 16 }}>Insurance Distribution</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
          {Object.entries(patients.reduce((acc, p) => { acc[p.insurance] = (acc[p.insurance]||0)+1; return acc; }, {}))
            .sort((a,b)=>b[1]-a[1]).slice(0,8).map(([ins, count], i) => (
            <div key={i} style={{ background: "#0D1321", borderRadius: 8, padding: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 11, color: "#D0D8F0" }}>{ins.split(" ")[0]}</div>
              <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, color: "#00D4FF" }}>{count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// LOG PAGES
// ============================================================
const LogsPage = ({ logs, title, columns }) => {
  const [search, setSearch] = useState("");
  const filtered = logs.filter(l => JSON.stringify(l).toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="page">
      <div className="section-header">
        <div>
          <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, marginBottom: 4 }}>{title}</h2>
          <p style={{ color: "#8B96B0", fontSize: 13 }}>{filtered.length} entries</p>
        </div>
        <div className="search-bar">
          <Icon name="search" size={16} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs..." />
        </div>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}</tr></thead>
            <tbody>
              {filtered.slice(0, 50).map((l, i) => (
                <tr key={i}>{columns.map(c => <td key={c.key}>{c.render ? c.render(l[c.key], l) : l[c.key]}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer"><span>Showing {Math.min(50, filtered.length)} of {filtered.length}</span></div>
      </div>
    </div>
  );
};

// ============================================================
// PATIENT PORTAL DASHBOARD
// ============================================================
const PatientDashboard = ({ patient, appointments, role }) => {
  const myApts = appointments.filter(a => a.patientId === patient?.patientId);
  const upcoming = myApts.filter(a => a.date >= new Date().toISOString().split("T")[0] && a.status !== "Cancelled");
  const past = myApts.filter(a => a.date < new Date().toISOString().split("T")[0] || a.status === "Completed");

  if (!patient) return <div className="page"><div className="empty">Patient data not found</div></div>;

  const patientData = PATIENTS.find(p => p.id === patient.patientId) || PATIENTS[0];

  return (
    <div className="page">
      <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
        <Avatar name={patient.name} size={56} accent="#F59E0B" />
        <div>
          <div style={{ fontFamily: "Syne,sans-serif", fontSize: 24, fontWeight: 800 }}>Welcome, {patient.name.split(" ")[0]}</div>
          <div style={{ color: "#8B96B0", fontSize: 13 }}>Patient Portal · {patientData.id}</div>
        </div>
      </div>

      <div className="stats-grid">
        {[
          { label: "Upcoming Appointments", value: upcoming.length, icon: "calendar", color: "#00D4FF" },
          { label: "Past Visits", value: past.length, icon: "check", color: "#00E5A0" },
          { label: "Active Medications", value: patientData.medications.length, icon: "activity", color: "#8B5CF6" },
          { label: "Health Reports", value: patientData.reports.length, icon: "file", color: "#F59E0B" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: `${s.color}18` }}><Icon name={s.icon} size={22} /></div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title" style={{ marginBottom: 16 }}>Upcoming Appointments</div>
          {upcoming.length === 0 ? <div className="empty" style={{ padding: "20px 0", fontSize: 13 }}>No upcoming appointments</div> : (
            upcoming.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, padding: 12, background: "#0D1321", borderRadius: 8 }}>
                <div style={{ textAlign: "center", minWidth: 48 }}>
                  <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 20, color: "#00D4FF" }}>{a.date.slice(8)}</div>
                  <div style={{ fontSize: 10, color: "#8B96B0" }}>{new Date(a.date).toLocaleString('en', { month: 'short' })}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{a.type}</div>
                  <div style={{ fontSize: 12, color: "#8B96B0" }}>{a.doctor}</div>
                  <div style={{ fontSize: 11, color: "#8B96B0" }}>{a.time} · {a.room}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="card">
          <div className="card-title" style={{ marginBottom: 16 }}>My Vitals</div>
          {!patientData.vitalSigns.recordedAt && !patientData.vitalSigns.bp ? (
            <div style={{ textAlign: "center", padding: "16px 0", color: "#8B96B0", fontSize: 13 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🩺</div>
              No vitals recorded yet.<br />
              <span style={{ fontSize: 12 }}>Visit the clinic for your vitals to be entered.</span>
            </div>
          ) : (
          <div className="vitals-grid">
            {[
              { label: "Blood Pressure", value: patientData.vitalSigns.bp, unit: "mmHg", icon: "❤️" },
              { label: "Heart Rate", value: patientData.vitalSigns.heartRate, unit: "bpm", icon: "💗" },
              { label: "Temperature", value: patientData.vitalSigns.temp, unit: "°C", icon: "🌡️" },
              { label: "SpO2", value: patientData.vitalSigns.spo2, unit: "%", icon: "🫁" },
            ].map((v, i) => (
              <div key={i} className="vital-item">
                <div style={{ fontSize: 18, marginBottom: 4 }}>{v.icon}</div>
                <div className="vital-value" style={{ fontSize: 18 }}>{v.value || "—"}<span className="vital-unit">{v.value ? v.unit : ""}</span></div>
                <div className="vital-label">{v.label}</div>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// DOCTOR DASHBOARD
// ============================================================
const DoctorDashboard = ({ user, patients, appointments }) => {
  const myPatients = patients.filter(p => p.assignedDoctor === user.name || p.assignedDoctor.includes(user.name.split(" ")[1] || ""));
  const today = new Date().toISOString().split("T")[0];
  const todayApts = appointments.filter(a => a.date === today && a.doctor === user.name);

  return (
    <div className="page">
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "Syne,sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Good morning, {user.name}</div>
        <div style={{ color: "#8B96B0", fontSize: 13 }}>{new Date().toLocaleDateString("en", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
      </div>

      <div className="stats-grid">
        {[
          { label: "My Patients", value: myPatients.length, color: "#00E5A0", icon: "users" },
          { label: "Today's Schedule", value: todayApts.length, color: "#00D4FF", icon: "calendar" },
          { label: "High Risk", value: myPatients.filter(p => p.readmissionRisk === "High").length, color: "#F43F5E", icon: "warning" },
          { label: "Pending Reports", value: myPatients.filter(p => p.reports.length === 0).length, color: "#F59E0B", icon: "file" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: `${s.color}18` }}><Icon name={s.icon} size={22} /></div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title" style={{ marginBottom: 16 }}>Today's Schedule</div>
          {todayApts.length === 0 ? <div style={{ color: "#8B96B0", fontSize: 13, textAlign: "center", padding: "20px 0" }}>No appointments scheduled today</div> : (
            todayApts.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, padding: 10, background: "#0D1321", borderRadius: 8 }}>
                <div style={{ textAlign: "center", background: "rgba(0,229,160,0.1)", borderRadius: 6, padding: "4px 8px" }}>
                  <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 13, color: "#00E5A0" }}>{a.time}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{a.patientName}</div>
                  <div style={{ fontSize: 11, color: "#8B96B0" }}>{a.type} · {a.room}</div>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))
          )}
        </div>

        <div className="card">
          <div className="card-title" style={{ marginBottom: 16 }}>High Risk Patients</div>
          {myPatients.filter(p => p.readmissionRisk === "High").slice(0, 5).map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Avatar name={p.name} size={34} accent="#F43F5E" />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "#8B96B0" }}>{p.primaryCondition} · Score: {p.readmissionScore}</div>
              </div>
              <RiskBadge level={p.readmissionRisk} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// FRONT DESK DASHBOARD
// ============================================================
const FrontDeskDashboard = ({ patients, appointments }) => {
  const today = new Date().toISOString().split("T")[0];
  const todayApts = appointments.filter(a => a.date === today);
  const unpaid = appointments.filter(a => !a.paid && a.status !== "Cancelled");

  return (
    <div className="page">
      <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, marginBottom: 4 }}>Front Desk Dashboard</h2>
      <p style={{ color: "#8B96B0", fontSize: 13, marginBottom: 20 }}>Today: {new Date().toLocaleDateString("en", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>

      <div className="stats-grid">
        {[
          { label: "Today's Appointments", value: todayApts.length, color: "#8B5CF6", icon: "calendar" },
          { label: "Total Patients", value: patients.length, color: "#00D4FF", icon: "users" },
          { label: "Pending Payments", value: unpaid.length, color: "#F59E0B", icon: "dollar" },
          { label: "Checked In", value: todayApts.filter(a => a.status === "In Progress").length, color: "#00E5A0", icon: "check" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: `${s.color}18` }}><Icon name={s.icon} size={22} /></div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title" style={{ marginBottom: 16 }}>Today's Appointments</div>
        {todayApts.length === 0 ? <div style={{ color: "#8B96B0", textAlign: "center", padding: "20px", fontSize: 13 }}>No appointments today</div> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Time</th><th>Patient</th><th>Doctor</th><th>Type</th><th>Status</th><th>Payment</th></tr></thead>
              <tbody>
                {todayApts.map((a, i) => (
                  <tr key={i}>
                    <td style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, color: "#8B5CF6" }}>{a.time}</td>
                    <td style={{ fontWeight: 600 }}>{a.patientName}</td>
                    <td style={{ color: "#8B96B0", fontSize: 12 }}>{a.doctor}</td>
                    <td><span className="badge badge-purple">{a.type}</span></td>
                    <td><StatusBadge status={a.status} /></td>
                    <td><span className={`badge ${a.paid ? "badge-success" : "badge-warning"}`}>{a.paid ? "Paid" : "Pending"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// LOGIN PAGE
// ============================================================
const LoginPage = ({ users, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  const quickLogins = [
    { role: "admin", email: "admin@medcore.in", password: "admin123", label: "Admin" },
    { role: "doctor", email: "priya.sharma@medcore.in", password: "doctor123", label: "Doctor" },
    { role: "frontdesk", email: "anita.fd@medcore.in", password: "desk123", label: "Front Desk" },
    { role: "patient", email: "rahul.verma@gmail.com", password: "patient123", label: "Patient" },
  ];

  const handleLogin = () => {
    setError("");
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) { setError("Invalid credentials. Try a quick login below."); return; }
    if (user.status === "Inactive") { setError("Your account has been disabled."); return; }
    onLogin(user);
  };

  const handleQuick = (q) => {
    setEmail(q.email);
    setPassword(q.password);
    setSelectedRole(q.role);
    setError("");
    // Auto-login after setting credentials
    const user = users.find(u => u.email === q.email && u.password === q.password);
    if (user) {
      onLogin(user);
    }
  };

  const accentMap = { admin: "#00D4FF", doctor: "#00E5A0", frontdesk: "#8B5CF6", patient: "#F59E0B" };

  return (
    <div className="login-wrap">
      <div className="login-bg" />
      <div className="login-grid" />
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-icon"><Icon name="heart" size={26} /></div>
          <div>
            <div className="login-title">MedCore<span style={{ color: "#00D4FF" }}>EHR</span></div>
          </div>
        </div>
        <div className="login-subtitle">Integrated Electronic Health Records System · India</div>

        <div style={{ marginBottom: 20 }}>
          <div className="login-label" style={{ marginBottom: 8 }}>QUICK LOGIN</div>
          <div className="login-roles">
            {quickLogins.map(q => (
              <div key={q.role} className={`role-chip ${selectedRole === q.role ? "active" : ""}`} style={selectedRole === q.role ? { borderColor: accentMap[q.role], color: accentMap[q.role], background: `${accentMap[q.role]}12` } : {}} onClick={() => handleQuick(q)}>
                {q.label}
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <div className="login-label">EMAIL</div>
          <input className="login-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="user@medcore.com" />
        </div>
        <div className="form-group" style={{ marginBottom: 20 }}>
          <div className="login-label">PASSWORD</div>
          <input className="login-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && handleLogin()} />
        </div>
        {error && <div className="alert alert-danger" style={{ marginBottom: 16 }}><Icon name="warning" size={14} /> {error}</div>}
        <button className="login-btn" style={selectedRole ? { background: `linear-gradient(135deg, ${accentMap[selectedRole]}99, ${accentMap[selectedRole]})` } : {}} onClick={handleLogin}>
          Sign In to Portal
        </button>

        <div style={{ marginTop: 20, padding: 12, background: "rgba(255,255,255,0.03)", borderRadius: 8, fontSize: 11, color: "#5A6480" }}>
          <div style={{ fontWeight: 600, marginBottom: 4, color: "#8B96B0" }}>Demo Credentials</div>
          {quickLogins.map(q => <div key={q.role}>• {q.label}: {q.email} / {q.password}</div>)}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// NOVELTY #5: NOVELTY FEATURES BANNER
// ============================================================
const NoveltiesSection = () => (
  <div className="page">
    <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, marginBottom: 20 }}>Unique Features</h2>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
      {[
        { icon: "brain", title: "AI Readmission Predictor", desc: "ML-powered risk scoring using the Synthetic Healthcare Patient Journey Dataset. Individual & population-level analysis.", color: "#8B5CF6" },
        { icon: "activity", title: "Live Vitals Monitor", desc: "Real-time simulated patient monitoring with animated sparklines, alert detection, and live heart rate/SpO2 tracking.", color: "#F43F5E" },
        { icon: "cpu", title: "MedCore AI Assistant", desc: "In-app AI chatbot for clinical decision support, drug interactions, ICD codes, and medical guidelines.", color: "#00D4FF" },
        { icon: "dna", title: "Symptom Checker (Patient)", desc: "AI-powered triage tool for patients to assess symptoms and receive urgency-based guidance before appointments.", color: "#00E5A0" },
        { icon: "chart", title: "AI Clinical Summary", desc: "One-click AI-generated clinical summaries for each patient card, helping doctors quickly review patient status.", color: "#F59E0B" },
        { icon: "shield", title: "Population Health Insights", desc: "Bulk AI analysis across all patients to identify systemic patterns and preventable readmission cost savings.", color: "#3B82F6" },
      ].map((f, i) => (
        <div key={i} className="card" style={{ borderColor: `${f.color}33`, background: `linear-gradient(135deg, ${f.color}06, transparent)` }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: `${f.color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <Icon name={f.icon} size={22} style={{ color: f.color }} />
          </div>
          <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, marginBottom: 6, color: f.color }}>{f.title}</div>
          <div style={{ fontSize: 12, color: "#8B96B0", lineHeight: 1.6 }}>{f.desc}</div>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [patients, setPatients] = useState(PATIENTS);
  const [appointments, setAppointments] = useState(APPOINTMENTS);
  const [loginLogs] = useState(LOGIN_LOGS);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notification, setNotification] = useState(null);
  const notifId = useRef(0);

  const notify = (msg, type = "success") => {
    notifId.current++;
    setNotification({ msg, type, id: notifId.current });
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setActiveTab("dashboard");
    notify(`Welcome back, ${user.name}!`, "success");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab("dashboard");
  };

  const handleRegisterPatient = (form) => {
    const newId = `P${String(patients.length + 1001).padStart(4, "0")}`;
    const newPatient = {
      ...form,
      id: newId,
      admissions: 0, lengthOfStay: 0, comorbidities: 0, emergencyVisits: 0,
      readmissionScore: 10, readmissionRisk: "Low",
      status: "Active",
      conditions: form.primaryCondition ? [form.primaryCondition] : [],
      medications: [],
      assignedDoctor: "Dr. Priya Sharma",
      lastVisit: new Date().toISOString().split("T")[0],
      registeredDate: new Date().toISOString().split("T")[0],
      vitalSigns: { bp: "", heartRate: "", temp: "", spo2: "", weight: "", height: "", recordedAt: null },
      reports: [],
      bloodType: form.bloodType || "O+",
      insurance: form.insurance || "Self-Pay",
    };
    setPatients(p => [...p, newPatient]);
    // Auto-create patient portal login: email = their email, password = their phone number
    if (form.email && form.phone) {
      const newUser = {
        id: `U${String(users.length + 1).padStart(3, "0")}`,
        name: form.name,
        email: form.email,
        password: form.phone,
        role: "patient",
        status: "Active",
        patientId: newId,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers(u => [...u, newUser]);
    }
    return newPatient;
  };

  const handleUpdateAppointment = (action, data) => {
    if (action === "add") { setAppointments(a => [...a, data]); }
    else if (action === "complete") { setAppointments(a => a.map(apt => apt.id === data.id ? { ...apt, status: "Completed", notes: data.notes || apt.notes } : apt)); }
    else if (action === "pay") { setAppointments(a => a.map(apt => apt.id === data ? { ...apt, paid: true } : apt)); }
  };

  const handleUpdateVitals = (patientId, newVitals) => {
    setPatients(p => p.map(pt => {
      if (pt.id !== patientId) return pt;
      const history = [...(pt.vitalsHistory || []), { ...pt.vitalSigns, recordedAt: pt.vitalSigns.recordedAt || new Date(Date.now() - 86400000).toISOString() }];
      return { ...pt, vitalSigns: newVitals, vitalsHistory: history };
    }));
    notify("Vitals recorded successfully", "success");
  };

  const handleUpdateReport = (patientId, text) => {
    setPatients(p => p.map(pt => pt.id === patientId ? {
      ...pt,
      reports: [...pt.reports, {
        id: `R${Date.now()}`, date: new Date().toISOString().split("T")[0],
        doctor: currentUser.name, diagnosis: "Clinical Assessment",
        notes: text, prescription: "", followUp: ""
      }]
    } : pt));
    notify("Report saved successfully", "success");
  };

  const accentByRole = { admin: "#00D4FF", doctor: "#00E5A0", frontdesk: "#8B5CF6", patient: "#F59E0B" };
  const accent = accentByRole[currentUser?.role] || "#00D4FF";

  const renderPage = () => {
    const role = currentUser?.role;
    if (role === "admin") {
      if (activeTab === "dashboard") return <AdminDashboard patients={patients} appointments={appointments} users={users} loginLogs={loginLogs} onTab={setActiveTab} />;
      if (activeTab === "users") return <UserManagement users={users} setUsers={setUsers} notify={notify} />;
      if (activeTab === "patients") return <PatientDirectory patients={patients} showAI role="admin" />;
      if (activeTab === "appointments") return <AppointmentsView appointments={appointments} patients={patients} role="admin" notify={notify} onUpdate={handleUpdateAppointment} />;
      if (activeTab === "prediction") return <PredictionPage patients={patients} />;
      if (activeTab === "analytics") return <AnalyticsPage patients={patients} appointments={appointments} />;
      if (activeTab === "loginlogs") return <LogsPage title="Login Logs" logs={loginLogs} columns={[
        { key: "name", label: "User" },
        { key: "role", label: "Role", render: v => <span className="badge badge-info">{v}</span> },
        { key: "timestamp", label: "Time", render: v => new Date(v).toLocaleString() },
        { key: "status", label: "Status", render: (v) => <StatusBadge status={v} /> },
        { key: "ip", label: "IP" },
        { key: "device", label: "Device" },
      ]} />;
      if (activeTab === "aptlogs") return <LogsPage title="Appointment Logs" logs={appointments} columns={[
        { key: "id", label: "ID" },
        { key: "patientName", label: "Patient" },
        { key: "doctor", label: "Doctor" },
        { key: "type", label: "Type", render: v => <span className="badge badge-info">{v}</span> },
        { key: "date", label: "Date" },
        { key: "status", label: "Status", render: v => <StatusBadge status={v} /> },
        { key: "fee", label: "Fee", render: v => `₹${v}` },
      ]} />;
    }
    if (role === "doctor") {
      if (activeTab === "dashboard") return <DoctorDashboard user={currentUser} patients={patients} appointments={appointments} />;
      if (activeTab === "mypatients") return <PatientDirectory patients={patients.filter(p => p.assignedDoctor.includes(currentUser.name.split(" ").pop()))} showAI role="doctor" onUpdateReport={handleUpdateReport} onUpdateVitals={handleUpdateVitals} />;
      if (activeTab === "appointments") return <AppointmentsView appointments={appointments.filter(a => a.doctor === currentUser.name)} patients={patients} role="doctor" notify={notify} onUpdate={handleUpdateAppointment} />;
      if (activeTab === "vitals") return <VitalsMonitor patients={patients} />;
      if (activeTab === "notes") return <PatientDirectory patients={patients} role="doctor" onUpdateReport={handleUpdateReport} onUpdateVitals={handleUpdateVitals} />;
      if (activeTab === "reports") return <PatientDirectory patients={patients.filter(p => p.assignedDoctor.includes(currentUser.name.split(" ").pop()))} role="doctor" showAI onUpdateVitals={handleUpdateVitals} />;
    }
    if (role === "frontdesk") {
      if (activeTab === "dashboard") return <FrontDeskDashboard patients={patients} appointments={appointments} />;
      if (activeTab === "patients") return <PatientDirectory patients={patients} role="frontdesk" onUpdateVitals={handleUpdateVitals} />;
      if (activeTab === "register") return <RegisterPatient onRegister={handleRegisterPatient} notify={notify} />;
      if (activeTab === "appointments") return <AppointmentsView appointments={appointments} patients={patients} role="frontdesk" notify={notify} onUpdate={handleUpdateAppointment} />;
      if (activeTab === "payments") return <PaymentsView appointments={appointments} onPay={(id) => handleUpdateAppointment("pay", id)} notify={notify} />;
    }
    if (role === "patient") {
      if (activeTab === "dashboard") return <PatientDashboard patient={currentUser} appointments={appointments} role="patient" />;
      if (activeTab === "appointments") {
        const myApts = appointments.filter(a => a.patientId === currentUser.patientId);
        return <LogsPage title="My Appointments" logs={myApts} columns={[
          { key: "type", label: "Type", render: v => <span className="badge badge-info">{v}</span> },
          { key: "doctor", label: "Doctor" },
          { key: "date", label: "Date" },
          { key: "time", label: "Time" },
          { key: "status", label: "Status", render: v => <StatusBadge status={v} /> },
          { key: "fee", label: "Fee", render: (v, row) => <span style={{ color: row.paid ? "#00E5A0" : "#F59E0B" }}>${v} {row.paid ? "✓" : "(Due)"}</span> },
        ]} />;
      }
      if (activeTab === "reports") {
        const patientData = patients.find(p => p.id === currentUser.patientId) || patients[0];
        return (
          <div className="page">
            <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, marginBottom: 20 }}>My Health Reports</h2>
            {patientData.reports.length === 0 ? <div className="empty"><div className="empty-icon"><Icon name="file" size={40} /></div>No reports available yet</div> : (
              patientData.reports.map((r, i) => (
                <div key={i} className="card" style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700 }}>{r.diagnosis}</div>
                    <span style={{ fontSize: 12, color: "#8B96B0" }}>{r.date}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#8B96B0", marginBottom: 8 }}>Attending: {r.doctor}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.7, color: "#D0D8F0" }}>{r.notes}</div>
                  {r.prescription && <div style={{ marginTop: 8, fontSize: 12 }}><strong>Rx:</strong> {r.prescription}</div>}
                  {r.followUp && <div style={{ marginTop: 4, fontSize: 12, color: "#8B96B0" }}>Follow-up: {r.followUp}</div>}
                </div>
              ))
            )}
          </div>
        );
      }
      if (activeTab === "vitals") {
        const patientData = patients.find(p => p.id === currentUser.patientId) || patients[0];
        const vs = patientData.vitalSigns;
        const hasVitals = vs.recordedAt || vs.bp;
        return (
          <div className="page">
            <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, marginBottom: 4 }}>My Vitals</h2>
            {hasVitals
              ? <p style={{ color: "#8B96B0", fontSize: 13, marginBottom: 20 }}>Last recorded: {vs.recordedAt ? new Date(vs.recordedAt).toLocaleString("en-IN") : "On file"}</p>
              : <div className="alert alert-warning" style={{ marginBottom: 20 }}><Icon name="warning" size={14} /> No vitals recorded yet. Please visit the clinic for your vitals to be entered by the doctor or front desk.</div>
            }
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
              {[
                { label: "Blood Pressure", value: vs.bp || "—", unit: vs.bp ? "mmHg" : "", icon: "❤️", color: "#F43F5E" },
                { label: "Heart Rate",     value: vs.heartRate || "—", unit: vs.heartRate ? "bpm" : "", icon: "💗", color: "#00E5A0" },
                { label: "Temperature",    value: vs.temp || "—", unit: vs.temp ? "°C" : "", icon: "🌡️", color: "#F59E0B" },
                { label: "SpO2",           value: vs.spo2 || "—", unit: vs.spo2 ? "%" : "", icon: "🫁", color: "#00D4FF" },
                { label: "Weight",         value: vs.weight || "—", unit: vs.weight ? "kg" : "", icon: "⚖️", color: "#8B5CF6" },
                { label: "Height",         value: vs.height || "—", unit: vs.height ? "cm" : "", icon: "📏", color: "#3B82F6" },
              ].map((v, i) => (
                <div key={i} className="stat-card" style={{ textAlign: "center", opacity: v.value === "—" ? 0.5 : 1 }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{v.icon}</div>
                  <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 28, color: v.value === "—" ? "#5A6480" : v.color }}>{v.value}</div>
                  <div style={{ fontSize: 12, color: "#8B96B0" }}>{v.unit}</div>
                  <div style={{ fontSize: 12, marginTop: 4 }}>{v.label}</div>
                </div>
              ))}
            </div>
            {patientData.vitalsHistory && patientData.vitalsHistory.length > 0 && (
              <div style={{ marginTop: 28 }}>
                <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Vitals History</div>
                <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead><tr><th>Date</th><th>BP</th><th>Heart Rate</th><th>SpO2</th><th>Temp</th><th>Weight</th></tr></thead>
                    <tbody>
                      {patientData.vitalsHistory.slice().reverse().map((v, i) => (
                        <tr key={i}>
                          <td style={{ color: "#8B96B0", fontSize: 12 }}>{v.recordedAt ? new Date(v.recordedAt).toLocaleDateString("en-IN") : "—"}</td>
                          <td>{v.bp || "—"}</td>
                          <td>{v.heartRate ? `${v.heartRate} bpm` : "—"}</td>
                          <td>{v.spo2 ? `${v.spo2}%` : "—"}</td>
                          <td>{v.temp ? `${v.temp}°C` : "—"}</td>
                          <td>{v.weight ? `${v.weight} kg` : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {hasVitals && <VitalsInsights vitalSigns={vs} vitalsHistory={patientData.vitalsHistory} />}
            <div style={{ marginTop: 24 }}>
              <SymptomChecker />
            </div>
          </div>
        );
      }
    }
    return null;
  };

  if (!currentUser) return (
    <>
      <style>{globalStyles}</style>
      <LoginPage users={users} onLogin={handleLogin} />
    </>
  );

  const portalTitles = { admin: "Admin Portal", doctor: "Doctor Portal", frontdesk: "Front Desk Portal", patient: "Patient Portal" };
  const tabTitles = {
    dashboard: "Dashboard", users: "User Management", patients: "Patient Directory",
    appointments: "Appointments", prediction: "AI Readmission Predictor",
    analytics: "Analytics", loginlogs: "Login Logs", aptlogs: "Appointment Logs",
    mypatients: "My Patients", notes: "Clinical Notes", vitals: "Vitals Monitor",
    reports: "Reports", register: "Register Patient", payments: "Payments",
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div className="app">
        <div className="layout">
          <Sidebar
            role={currentUser.role}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            user={currentUser}
            onLogout={handleLogout}
            accent={accent}
          />
          <div className="main">
            <div className="topbar">
              <div className="topbar-title">{tabTitles[activeTab] || activeTab}</div>
              <div className="topbar-actions">
                <div style={{ fontSize: 11, color: "#5A6480", padding: "4px 10px", background: "rgba(255,255,255,0.04)", borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)" }}>
                  {portalTitles[currentUser.role]}
                </div>
                <div className="icon-btn" title="Notifications"><Icon name="bell" size={18} /></div>
                <Avatar name={currentUser.name} size={34} accent={accent} />
              </div>
            </div>
            {renderPage()}
          </div>
        </div>
        {notification && (
          <Notification msg={notification.msg} type={notification.type} key={notification.id} onClose={() => setNotification(null)} />
        )}
        <AIAssistant />
      </div>
    </>
  );
}