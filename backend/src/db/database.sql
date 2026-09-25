-- ============================================
-- Database Schema for Customer Management System (PostgreSQL)
-- ============================================


-- دالة لتحديث حقل last_update تلقائياً لجدول العملاء عند التعديل
CREATE OR REPLACE FUNCTION update_last_update_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_update = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE users (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    username        VARCHAR(50)     NOT NULL UNIQUE,
    password        VARCHAR(255)    NOT NULL,
    full_name       VARCHAR(100)    NOT NULL,
    email           VARCHAR(100)    UNIQUE,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name      VARCHAR(50)     NOT NULL,
    last_name       VARCHAR(50)     NOT NULL,
    email           VARCHAR(100)    NOT NULL,
    telephone       VARCHAR(20),
    gender          VARCHAR(10)     NOT NULL CHECK (gender IN ('Male', 'Female')),
    age             INT             NOT NULL,
    country         VARCHAR(60)     NOT NULL,
    created_by      UUID,                                                 -- FK → users.id (UUID)
    created_on      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    last_update     TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_customers_created_by
        FOREIGN KEY (created_by) REFERENCES users (id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TRIGGER update_customers_last_update
BEFORE UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION update_last_update_column();


INSERT INTO users (id, username, password, full_name, email) VALUES


INSERT INTO customers (id, first_name, last_name, email, telephone, gender, age, country, created_by) VALUES

