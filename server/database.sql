DROP TABLE IF EXISTS contacts;

CREATE TABLE contacts (
  contact_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) DEFAULT 'New Contact Form Submission',
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  replied BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add index for listing contacts by date
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);