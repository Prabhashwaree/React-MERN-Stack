import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Nethmi',
      email: 'nethmi@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    }
  ]
};
export default data;