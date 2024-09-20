CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,  -- SERIAL automatically adds an auto-incrementing integer.
    title VARCHAR NOT NULL,
    price BIGINT NOT NULL,
    image_path VARCHAR
);
-- Enable Row level security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow read write permission to anon user 
CREATE POLICY "Allow anon user to select" ON products FOR SELECT USING (true);

CREATE POLICY "Allow anon user to insert" ON products FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anon user to update" ON products FOR UPDATE USING (true);

CREATE POLICY "Allow anon user to delete" ON products FOR DELETE USING (true);

-- Grant all on table products
GRANT ALL ON TABLE products TO anon;