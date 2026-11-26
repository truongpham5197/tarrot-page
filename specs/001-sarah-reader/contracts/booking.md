# Booking contract

GET /booking?service={slug} selects the known service, unknown/missing slugs select “Chưa chắc — cần tư vấn”.

Submit validates name, contact, optional email, date and consent before displaying a plain text request. Visitor opens the retained Zalo URL and pastes/sends it. Facebook remains an alternative. Optional booking email is read only from the existing public booking email setting. Clipboard denial does not prevent copying manually. No API call or appointment persistence is claimed.
