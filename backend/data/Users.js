import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Riyan Sugiarto',
    email: 'ryansgrt23@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Febi Komaril',
    email: 'febikomaril@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Freya J',
    email: 'freyaj@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
