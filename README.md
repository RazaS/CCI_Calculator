# CCI Calculator

Simple platelet Corrected Count Increment (CCI) calculator with a sleek UI and Cloud Run-ready deployment.

## Inputs
- Pre-platelet count (10^9/L)
- Post-platelet count (10^9/L)
- Height (cm)
- Weight (kg)
- BSA (m^2) (manual or calculated)
- Platelets transfused (10^11)

## Formula
- BSA (Mosteller): `sqrt((height_cm * weight_kg) / 3600)`
- CCI: `((post - pre) * bsa) / platelets_transfused`

## Run locally
1. Install Node.js 20+
2. Install dependencies:
   - `npm install`
3. Start app:
   - `npm start`
4. Open:
   - `http://localhost:8080`

## Deploy to Cloud Run
1. Authenticate and set project:
   - `gcloud auth login`
   - `gcloud config set project YOUR_PROJECT_ID`
2. Enable services:
   - `gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com`
3. Deploy:
   - `gcloud run deploy cci-calculator --source . --region us-central1 --allow-unauthenticated`

## Notes
- Health endpoint: `/healthz`
- This is decision support only; clinical judgment is required.
# trigger
