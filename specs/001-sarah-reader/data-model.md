# Data model

Service: slug, label, description, topics. Five featured services plus deep Tarot, numerology and personal combo booking options.

BookingData: name (required), contact (required), email (optional valid email), service (known label), format (Online), date (optional today-or-future local date), note (optional). Consent is required and never prechecked. State is local React state; no server storage introduced.

Request state: editing → prepared. Copy state: idle → copied or manual. Re-edit returns to editing without losing entered values. Reloading the page starts a new local form.

Campaign: fixed dates 18–20 October 2026, explicitly displayed as ended as of the implementation date (21 November 2026). Contact Sarah for new offers. No automatic discount is applied to a booking, and there is no implied annual recurrence.
