CREATE OR REPLACE FUNCTION increment_review_count()
RETURNS TRIGGER as $$
BEGIN
    -- Increment the review_count when review insert
    UPDATE products SET 
        review_count = review_count + 1 
        WHERE id = NEW.product_id;
    RETURN NEW;
END
$$ LANGUAGE plpgsql;


-- Create trigger for increment_review_count function
CREATE TRIGGER increment_review_trigger
AFTER INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION increment_review_count();


CREATE OR REPLACE FUNCTION decrement_review_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Decrement the review_count in the products table
  UPDATE products
  SET review_count = review_count - 1
  WHERE id = OLD.product_id;

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER decrement_review_trigger
AFTER DELETE ON reviews
FOR EACH ROW
EXECUTE FUNCTION decrement_review_count();


