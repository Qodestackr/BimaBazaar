<!--
CODE QUALITY:
- Shell page.tsx to server component
- Refactor Types, Forms, Zod Schemas, Components

[TIME: 8HRS]
[WHEN: SATURDAY]
-->

<!--
POS
ROI Calculator
-->

# BimaBazaar Matatu Sprint Plan

## Current Sprint (2 Weeks)

### 🚗 SACCO & Fleet Onboarding

- [ ] **Bulk Vehicle Registration**  
       CSV upload for fleet onboarding; PostHog tracking for upload success rates
- [ ] **SACCO Dashboard**  
       Mobile-first admin panel for fleet management
- [ ] **M-Pesa Batch Payments**  
       Integrate bulk premium collection; log transactions in Sentry
- [ ] **Document Management**  
       Secure storage for vehicle logs and PSV licenses

### 📱 Driver Experience

- [ ] **USSD Integration (\*483#)**  
       Quick quote generation without internet
- [ ] **WhatsApp Policy Distribution**  
       Instant policy delivery and storage
- [ ] **Accident Photo Upload**  
       Build MVP for photo-based claims assessment
- [ ] **Swahili Language Support**  
       Localize core flows for drivers

### ⚡ Claims Acceleration

- [ ] **24-Hour Claims Workflow**  
       Design fast-track process for rapid settlements
- [ ] **Garage Network Integration**  
       Direct towing and repair authorization
- [ ] **Real-time Status Updates**  
       SMS/WhatsApp notifications for claims progress
- [ ] **Claims Document Upload**  
       Mobile-optimized photo capture with compression

### 🏗 Core Infrastructure

- [ ] **Error Monitoring**  
       Sentry integration focusing on payment flows
- [ ] **Performance Analytics**  
       OpenReplay for session monitoring
- [ ] **API Documentation**  
       Focus on SACCO integration endpoints
- [ ] **Security Hardening**  
       Penetration testing for SACCO dashboards

---

## Backlog (Next Sprints)

### 🔄 SACCO Integration Expansion

- Direct API access for large SACCOs
- Fleet compliance monitoring
- Automated renewal workflows

### 📊 Claims Intelligence

- AI damage assessment model training
- Fraud detection patterns
- Repair cost prediction

### 📱 Mobile Optimization

- Offline-first architecture
- 2G network support
- Data usage optimization

---

_Tech Stack Focus:_

- **Sentry:** Prioritize payment and claims flow monitoring
- **PostHog:** Track SACCO onboarding conversion
- **OpenReplay:** Monitor USSD session completion
- **Airbyte:** SACCO data synchronization

**Key Metrics for Success:**

- SACCO onboarding time < 24 hours
- Claims processing time < 24 hours
- USSD quote generation < 2 minutes
- Bulk vehicle registration < 5 minutes for 50 vehicles
