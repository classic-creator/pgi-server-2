// services/authService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// services/authService.js

import { Employee,Department, User } from '../../models/index.js';
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';
/**
 * Logs out the user by blacklisting the JWT token.
 * @param {string} token - The JWT token to invalidate
 * @param {number} expiresInSeconds - Token expiry in seconds
 */


//get loggigin use 



export const loginEmployee = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const user = await User.findOne({
    where: { email },
    include: {
      model: Employee,
      as: 'employee',
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const employee = user.employee;

  const token = jwt.sign(
    {
      user_id: user.user_id,
      employee_id: employee.employee_id,
      name: employee.name,
      role: employee.role,
      department_id: employee.department_id,
      factory_id: employee.factory_id,
      contact_number: employee.contact_number,
    },
    process.env.JWT_SECRET || 'your_secret_key',
    { expiresIn: '1d' }
  );

  return {
    token,
    employee: {
      user_id: user.user_id,
      employee_id: employee.employee_id,
      name: employee.name,
      role: employee.role,
      department_id: employee.department_id,
      contact_number: employee.contact_number,
      joining_date: employee.joining_date,
      factory_id: employee.factory_id,

    },
  };
};


export const getLoggedInUser = async (employeeId) => {
  const user = await User.findOne({
    where: { employee_id: employeeId },
    attributes: { exclude: ['password_hash'] }, // hide password
    include: {
      model: Employee,
      as: 'employee',
      attributes: {
        include:['factory_id'],
        exclude: ['password'], // in case employee model still defines it
      },
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Flatten the result if needed
  return {
    user_id: user.user_id,
    email: user.email,
    employee_id: user.employee_id,
    factory_id:user.employee.factory_id,
    ...user.employee?.toJSON(), // merge employee fields
  };
};


export const createEmployee = async (employeeData) => {
  const {
    employee_id,
    department_name, // <-- received instead of department_id
    name,
    role,
    contact_number,
    joining_date,
    password
  } = employeeData;

  // Check if department exists
  const department = await Department.findOne({ where: { name: department_name } });
  if (!department) throw new Error('Department not found');

  const department_id = department.department_id;

  // Check for duplicate employee_id
  const existing = await Employee.findOne({ where: { employee_id } });
  if (existing) throw new Error('Employee ID already exists');

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the employee
  const newEmployee = await Employee.create({
    employee_id,
    department_id,
    name,
    role,
    contact_number,
    joining_date,
    password: hashedPassword
  });

  return newEmployee;
};




// log out 


export const logoutUser = async (token, expiresInSeconds) => {
  const blacklistKey = `bl_${token}`;

  try {
    await redisClient.setEx(blacklistKey, expiresInSeconds, 'blacklisted');
    return { success: true, message: 'User logged out successfully' };
  } catch (err) {
    console.error('Error storing token in blacklist:', err);
    throw new Error('Logout failed');
  }
};
