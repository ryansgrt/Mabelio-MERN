import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'ryansgrt',
        email: 'ryansgrt23@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'alexandra',
        email: 'alexandra@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'febikomaril',
        email: 'febikomaril@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users
