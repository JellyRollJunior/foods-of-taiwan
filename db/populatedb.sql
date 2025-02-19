-- Drop tables if they exist
DROP TABLE IF EXISTS foods CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS food_categories CASCADE;

-- Create tables
CREATE TABLE IF NOT EXISTS foods (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (255),
    description text,
    is_default_value boolean DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (255),
    description text,
    is_default_value boolean DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS food_categories (
    food_id INTEGER REFERENCES foods (id),
    category_id INTEGER REFERENCES categories (id)    
);

-- Insert foods
INSERT INTO foods (title, is_default_value, description) VALUES 
    ('Pork blood rice cake', TRUE, 'A rice cake that is made of congealed pork blood and rice (tastes much better than it sounds!). Normally steamed then dusted with finely chopped nuts, a thick soy sauce based sauce, and cilantro. Served on a stick and enjoyed with or without spicy sauce. A staple of night market stall food!'),
    ('Oyster omlet', FAlSE, 'An egg/tapioca mixture with green onions that is pan fried with oysters. Often enjoyed with a thick soy sauce. The chewy texture of the egg tapioca omlet pairs wonderfully with the salty soy sauce and oyster flavor!');