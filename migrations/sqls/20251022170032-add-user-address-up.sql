CREATE TYPE user_enum AS ENUM ('CUSTOMER', 'ADMIN');
CREATE TABLE IF NOT EXISTS users(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    user_type user_enum NOT NULL DEFAULT 'CUSTOMER',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);
CREATE TABLE IF NOT EXISTS contact_details(
    id VARCHAR(255) PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    pincode VARCHAR(50) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    name VARCHAR(50) NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE
);