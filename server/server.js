    import express from 'express';
    import session from 'express-session';
    import db from './database.js';
    import mapRoutes from './routes/map.js';
    import authRoutes from './routes/auth.js';
    import borneRoutes from './routes/borne.js';
    import cors from 'cors';  

    const app = express();

    // CORS : autorise uniquement le front (localhost:5173) et l'envoi des cookies de session
    app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true               
    }));



    // Lecture du JSON dans les requêtes (taille max 10 Mo)
    app.use(express.json({ limit: '10mb' }));

    // Configuration des sessions (le cookie s'appelle voltgo_session)
    app.use(session({
        name: 'voltgo_session',
        secret: 'cle_secrete_voltgo', // Clé qui signe le cookie de session
        resave: false, // Ne resauvegarde pas une session non modifiée
        saveUninitialized: false, // Ne crée pas de session pour les visiteurs non connectés
        cookie: { 
            secure: false, // Cookie envoyé aussi en HTTP (à passer à true en HTTPS)
            httpOnly: true, // Cookie inaccessible depuis le JavaScript du navigateur
            maxAge: 900000, // Durée de vie : 15 minutes
            sameSite: 'strict' // Cookie envoyé uniquement depuis le même site
            
        }
    }));

    // Ajoute la connexion à la base de données sur chaque requête (req.db)
    app.use((req, res, next) => {
        req.db = db;
        next();
    });


    // Routes de l'API : recherche de bornes, authentification et bornes
    app.use('/api/search', mapRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/borne', borneRoutes);


    // Démarrage du serveur sur le port 3000
    app.listen(3000, () => {
        console.log(`Serveur VoltGo démarré sur http://localhost:3000`);
        console.log(`CORS configuré pour http://localhost:5173`);
    });