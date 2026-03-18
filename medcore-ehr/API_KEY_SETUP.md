# API Key Configuration Guide

## Current Status

The app uses **Anthropic Claude API** for AI-powered features across 6 different API endpoints:

1. **ReadmissionPredictor** - Analyzes patient readmission risk
2. **AIAssistant** - Clinical AI chat assistant
3. **PatientDetailPanel** (getAISummary) - Patient clinical summaries
4. **VitalsInsights** - AI analysis of vital signs (newly added)
5. **PredictionPage** - Population health AI analysis
6. **SymptomChecker** - Patient symptom triage

## Setup Instructions

### Step 1: Get an Anthropic API Key
1. Go to https://console.anthropic.com/
2. Sign up or log in to your account
3. Navigate to the API keys section
4. Create a new API key
5. Copy the key (keep it secret!)

### Step 2: Configure Environment Variable
1. Open the `.env` file in the project root
2. Replace `your_anthropic_api_key_here` with your actual API key:
   ```
   VITE_ANTHROPIC_API_KEY=sk-ant-... (your actual key)
   ```
3. Save the file

### Step 3: Verify Configuration
- The `.env` file is already in `.gitignore` to prevent accidental commits
- Never share your API key in version control
- Use `.env.example` as a template for documenting required variables

### Step 4: Test the Integration
1. Start the dev server: `npm run dev`
2. Log in as a patient with credentials from the app
3. Navigate to "My Vitals" tab
4. Click "Analyze My Vitals" - should use Claude API
5. Check browser console for any errors

## API Integration Details

### Endpoints Being Used
- **API Base URL:** `https://api.anthropic.com/v1/messages`
- **Model:** `claude-sonnet-4-20250514`
- **Auth Method:** Header-based with `x-api-key`

### Error Handling
All API calls have fallback mechanisms:
- If API key is missing or invalid → uses hardcoded fallback responses
- If network error occurs → uses reasonable defaults
- Errors are logged to browser console

###⚠️ Important Security Notes
1. **Never commit `.env` file** - It's in .gitignore
2. **API key is sent from browser** - Direct browser-to-Anthropic communication
3. **CORS headers** - Using `anthropic-dangerous-direct-browser-access: true` header (only for browser-based apps)
4. **Cost implications** - Each API call incurs charges based on token usage

## Troubleshooting

### "API insights not working" / "Using fallback responses"
- **Check:** Is `VITE_ANTHROPIC_API_KEY` set in `.env`?
- **Check:** Is the value correct? (Starts with `sk-ant-`)
- **Check:** Browser console for error messages
- **Fix:** Restart dev server after updating `.env`

### "Features work without Claude"
- This is expected - app has built-in fallbacks
- But you won't get personalized AI insights
- Check if API key is configured (step 2 above)

### "API key validation fails"
- Verify key format: should start with `sk-ant-`
- Check for extra spaces or quotes in `.env`
- Regenerate key in Anthropic console if needed

## Features Dependent on Claude API

| Feature | Component | Impact if Missing |
|---------|-----------|------------------|
| AI Readmission Prediction | ReadmissionPredictor | Shows generic prediction |
| Clinical AI Chat | AIAssistant | Shows generic responses |
| Patient AI Summary | PatientDetailPanel | Shows generic summary |
| **Vitals Analysis** | **VitalsInsights** | **Shows generic status** |
| Population Health Analysis | PredictionPage | Shows generic insights |
| Symptom Checker | SymptomChecker | Shows generic triage |

## Next Steps
1. Get your Anthropic API key
2. Add it to `.env` file
3. Restart the dev server
4. Test the features to ensure everything works
