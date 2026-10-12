    import express from 'express';
    import session from 'express-session';
    import db from './database.js';
    import mapRoutes from './routes/map.js';
    import authRoutes from './routes/auth.js';
    import borneRoutes from './routes/borne.js';
    import cors from 'cors';  

    const app = express();

    app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true               
    }));



    app.use(express.json({ limit: '10mb' }));

    app.use(session({
        name: 'voltgo_session',
        secret: 'cle_secrete_voltgo',
        resave: false,
        saveUninitialized: false,
        cookie: { 
            secure: false, 
            httpOnly: true,
            maxAge: 900000,
            sameSite: 'strict'
            
        }
    }));

    app.use((req, res, next) => {
        req.db = db;
        next();
    });


    app.use('/api/search', mapRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/borne', borneRoutes);


    app.listen(3000, () => {
        console.log(`Serveur VoltGo démarré sur http://localhost:3000`);
        console.log(`CORS configuré pour http://localhost:5173`);
    });