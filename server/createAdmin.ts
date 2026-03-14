import bcrypt from 'bcrypt';
import { pool } from './db';

async function createAdmin() {
  try {
    const email = 'admin@blog.com';
    const password = '1234';
    const fullName = 'Admin User';
    
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Insert into database
    const result = await pool.query(
      `INSERT INTO users (user_id, email, password_hash, full_name) 
       VALUES (gen_random_uuid(), $1, $2, $3) 
       RETURNING user_id, email, full_name`,
      [email, passwordHash, fullName]
    );
    
    console.log('✅ Admin user created successfully:');
    console.log(result.rows[0]);
    console.log(`\nLogin with: ${email} / ${password}`);
    
    process.exit(0);
  } catch (err: any) {
    console.error('❌ Error creating admin:', err.message);
    process.exit(1);
  }
}

createAdmin();