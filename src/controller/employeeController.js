// controllers/authController.js
import { loginEmployee ,createEmployee,getLoggedInUser} from '../service/employService.js';


//get loggigin user

export const getLoggedInUserController = async (req, res) => {
  try {
    const employeeId = req.user.employee_id; // From decoded JWT
    const user = await getLoggedInUser(employeeId);
    res.status(200).json({ user });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

//register

// controllers/employeeController.js

export const createEmployeeController = async (req, res) => {
  try {
    const employee = await createEmployee(req.body);
    res.status(201).json({ message: 'Employee created', employee });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



//login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await loginEmployee(email, password);
    res.json({
      message: 'Login successful',
      ...result
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
