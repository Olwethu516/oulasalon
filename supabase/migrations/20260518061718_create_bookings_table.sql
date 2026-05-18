
/*
  # Create Salon Bookings Table

  ## Summary
  Creates the core bookings table for the Oula Salon website.

  ## New Tables
  - `bookings`
    - `id` (uuid, primary key)
    - `customer_name` (text) - Full name of the customer
    - `customer_email` (text) - Customer email for confirmation
    - `customer_phone` (text) - Customer phone number for WhatsApp
    - `service_category` (text) - e.g. "Hair", "Nails", "Treatments"
    - `service_name` (text) - Specific service booked
    - `service_price` (numeric) - Price in ZAR
    - `booking_date` (date) - Date of the appointment
    - `booking_time` (text) - Time slot
    - `notes` (text) - Optional customer notes
    - `status` (text) - pending, confirmed, cancelled
    - `created_at` (timestamptz)

  ## Security
  - RLS enabled
  - Anon users can insert bookings (public booking form)
  - Authenticated users can read all bookings (admin)
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  service_category text NOT NULL,
  service_name text NOT NULL,
  service_price numeric NOT NULL,
  booking_date date NOT NULL,
  booking_time text NOT NULL,
  notes text DEFAULT '',
  status text DEFAULT 'confirmed',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a booking"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);
