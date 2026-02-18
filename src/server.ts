import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import AuthRouter from './routes/authRouter'
import Role from './models/Role'

async function connectDB() {
    try {
        await db.authenticate();
        await db.sync();
        // await db.sync({ force: true })
        console.log(colors.green.bold('Conexión a la base de datos establecida'));
        const roles = ['ADMIN', 'CLIENT'];

        for (const name of roles) {
            await Role.findOrCreate({
                where: { name },
                defaults: { name }
            });
        }

    } catch (error) {
        // console.log(error);
        console.log(colors.red.bold('Error al conectar a la base de datos'));
    }
}

connectDB()

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/auth/', AuthRouter)

export default app