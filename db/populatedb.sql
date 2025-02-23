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
    category_id INTEGER REFERENCES categories (id),
    is_default_value boolean DEFAULT FALSE   
);

-- Insert foods
INSERT INTO foods (is_default_value, title, description) VALUES 
    (TRUE, 'Pork blood rice cake', 'A rice cake that is made of congealed pork blood and rice (tastes much better than it sounds!). Normally steamed then dusted with finely chopped nuts, a thick soy sauce based sauce, and cilantro. Served on a stick and enjoyed with or without spicy sauce. A staple of night market stall food!'),
    (TRUE, 'Oyster omlet', 'An egg/tapioca mixture with green onions that is pan fried with oysters. Often enjoyed with a thick soy sauce. The chewy texture of the egg tapioca omlet pairs wonderfully with the salty soy sauce and oyster flavor!');

INSERT INTO categories (is_default_value, title, description) VALUES
    (TRUE, 'Street food', 'Cheap eats commonly sold from roadside stalls or in night markets'),
    (TRUE, 'Fine dining', 'Dishes that are typically served at a restaurant and cost (usually) a pretty penny!');

INSERT INTO food_categories (is_default_value, food_id, category_id) VALUES
    (TRUE, 1, 1),
    (TRUE, 2, 1);