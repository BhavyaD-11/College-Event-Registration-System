USE college_event_db;

-- Insert sample users
INSERT INTO users (name, email, password, role) VALUES 
('Alice Smith', 'alice@college.edu', 'hashedpassword123', 'student'),
('Bob Jones', 'bob@college.edu', 'hashedpassword456', 'student'),
('Admin User', 'admin@college.edu', 'adminpass789', 'admin');

-- Insert sample events
INSERT INTO events (title, description, event_date, location, capacity) VALUES 
('Annual Tech Fest 2026', 'A grand technical symposium with coding and robotics competitions.', '2026-05-15 10:00:00', 'Main Auditorium', 200),
('AI & Machine Learning Workshop', 'Learn the basics of building intelligent systems using Python.', '2026-05-20 14:00:00', 'Computer Lab 3', 50),
('Cultural Night', 'Music, dance, and drama performances by students.', '2026-05-25 18:00:00', 'Open Air Theatre', 500);

-- Insert sample event registrations
INSERT INTO registrations (user_id, event_id) VALUES 
(1, 1),
(1, 2),
(2, 3);