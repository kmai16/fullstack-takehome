-- Initialize the database with a users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id, name, age, email, phone) VALUES
    (1, 'John Doe', 25, 'john.doe@example.com', '123-456-7890'),
    (2, 'Jane Smith', 30, 'jane.smith@example.com', '098-765-4321'),
    (4, 'Bob Johnson', 35, 'bob.johnson@example.com', '555-123-4567')
ON CONFLICT (email) DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    body TEXT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'user_id') THEN
        ALTER TABLE posts ADD COLUMN user_id INTEGER NOT NULL DEFAULT 1 REFERENCES users(id) ON DELETE CASCADE;
    END IF;
END $$;

INSERT INTO posts (id, user_id, title, body, created_at, updated_at) VALUES
    -- Posts by John Doe (user_id: 1)
    (1, 1, 'Getting Started with Rust', 'Rust can look a bit strict at first, but that’s part of its charm. Once you start building small projects, you’ll see how its focus on safety and performance helps you write cleaner, faster code with fewer bugs.', '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
    (2, 1, 'Understanding Ownership', 'Ownership is what makes Rust so unique. It forces you to think about who “owns” each piece of data, and when it should be cleaned up. The learning curve is real—but it pays off with rock-solid memory safety.', '2025-01-02 14:30:00', '2025-01-02 14:30:00'),
    (3, 1, 'Building Web APIs', 'Creating a good web API is about more than just endpoints. You need clear routes, consistent response formats, and a thoughtful design that makes life easy for both your app and the developers using it.','2025-01-03 09:15:00', '2025-01-03 09:15:00'),
    
    -- Posts by Jane Smith (user_id: 2)
    (4, 2, 'GraphQL vs REST', 'GraphQL gives clients exactly what they ask for—no more, no less. REST still works great for simpler systems, but when your data gets complex, GraphQL’s flexibility and efficiency really shine.', '2025-01-01 16:20:00', '2025-01-01 16:20:00'),
    (5, 2, 'Database Design Patterns', 'A well-designed database can make or break your app. Normalization helps keep your data clean, while caching and denormalization speed things up. Patterns like CQRS or event sourcing can make scaling easier later on.', '2025-01-02 11:45:00', '2025-01-02 11:45:00'),
    (6, 2, 'Frontend State Management', 'Frontend state can spiral out of control fast. Libraries like Redux, Zustand, and Recoil help you keep your data organized. The trick is balancing simplicity with control—don’t overengineer what can stay local.', '2025-01-04 13:10:00', '2025-01-04 13:10:00'),
    
    -- Posts by Bob Johnson (user_id: 4)
    (7, 4, 'Docker Containerization', 'Docker is the ultimate consistency tool. It packages your app with all its dependencies so it runs the same everywhere—your laptop, a server, or the cloud. Once you get it, deployment becomes way less painful.', '2025-01-01 08:30:00', '2025-01-01 08:30:00'),
    (8, 4, 'Kubernetes Deployment', 'Kubernetes might feel complex at first, but it’s all about giving you power and reliability. Once your cluster is up, it handles scaling, rollouts, and self-healing automatically—no late-night restarts required.', '2025-01-03 15:45:00', '2025-01-03 15:45:00'),
    (9, 4, 'CI/CD Best Practices', 'CI/CD automates the boring parts—testing, building, and deploying. Keep your pipelines simple, your tests reliable, and your deployments reversible. That’s how you build confidence and move fast without breaking things.', '2025-01-05 10:20:00', '2025-01-05 10:20:00'),
    (10, 4, 'Monitoring and Observability', 'Monitoring tells you when something’s wrong; observability tells you why. With good metrics, logs, and traces, you can understand your system’s story—catching issues before users even notice.', '2025-01-06 12:00:00', '2025-01-06 12:00:00')
ON CONFLICT (id) DO NOTHING;