CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,  -- SERIAL automatically adds an auto-incrementing integer.
    title VARCHAR  NULL,
    description text NULL,
    rating BIGINT NULL,
    product_id BIGINT NOT NULL
);

-- Enable Row level security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow read write permission to anon user 
CREATE POLICY "Allow anon user to select" ON reviews FOR SELECT USING (true);

CREATE POLICY "Allow anon user to insert" ON reviews FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anon user to update" ON reviews FOR UPDATE USING (true);

CREATE POLICY "Allow anon user to delete" ON reviews FOR DELETE USING (true);

-- Grant all on table products
GRANT ALL ON TABLE reviews TO anon;