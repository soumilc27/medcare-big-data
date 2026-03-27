# MedCore EHR

An AI-augmented Electronic Health Record (EHR) front-end built with React + Vite.

This project simulates a hospital workflow with role-based dashboards, synthetic patient records, appointment operations, clinical summaries, and AI-powered decision support widgets.

## Highlights

- Role-based login experience for `admin`, `doctor`, `frontdesk`, and `patient`
- Synthetic healthcare dataset generation for realistic demo flows
- Patient directory and detailed patient panel with editable vitals and notes
- Appointment management and appointment logs
- Login activity logs
- AI-driven features:
	- Readmission risk prediction
	- Clinical assistant chat
	- Patient summary generation
	- Vitals insights analysis
	- Symptom checker
	- Population health analysis
- Modern responsive UI with custom design system variables and animations

## Tech Stack

- React 19
- Vite 7
- JavaScript (ESM)
- ESLint 9
- Google Gemini API (optional, for AI features)

## Project Structure

```
medcore-ehr/
	src/
		ehr-app.jsx          # Main EHR app (UI, logic, synthetic data, AI calls)
		main.jsx             # React app entry
		index.css            # Global stylesheet
	public/
	index.html
	package.json
	.env.example
	API_KEY_SETUP.md
	API_KEY_INTEGRATION_REPORT.md
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Install and Run

```bash
npm install
npm run dev
```

Open the app at:

```text
http://localhost:5173
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production assets
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Demo Credentials

Use these built-in credentials to test each role:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@medcore.in | admin123 |
| Doctor | priya.sharma@medcore.in | doctor123 |
| Doctor | rajesh.kumar@medcore.in | doctor123 |
| Front Desk | anita.fd@medcore.in | desk123 |
| Patient | rahul.verma@gmail.com | patient123 |

## AI Features Setup (Optional)

AI modules work best when a Gemini API key is configured.

1. Create a `.env` file in the project root (or update the existing one).
2. Add:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

3. Restart the dev server.

Without a key, the app still runs and uses fallback responses for AI components.

For details, see:

- `API_KEY_SETUP.md`
- `API_KEY_INTEGRATION_REPORT.md`

## Data and Privacy Notes

- This project uses synthetic/demo patient data generated in the front end.
- It is intended for development, learning, demos, and prototyping.
- Do not use this code as-is for production clinical workflows without proper security, backend architecture, compliance controls, and validation.

## Build for Production

```bash
npm run build
npm run preview
```

Build output is generated under `dist/`.

## Roadmap Ideas

- Move AI API calls to a backend proxy for stronger key protection
- Persist patient and appointment data with a real database
- Add authentication and authorization via secure identity provider
- Add test coverage (unit and integration)
- Add audit/compliance controls for regulated environments

## License

No license file is currently defined in this repository. Add a `LICENSE` file before open-source distribution.
