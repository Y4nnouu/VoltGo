import express from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();

// Vérifie la robustesse du mot de passe : 8 car. min, minuscule, majuscule, chiffre et caractère spécial
const isPasswordRobust = (password) => {
    // Refuse tout ce qui n'est pas du texte
    if (typeof password !== 'string') return false;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return regex.test(password);
};

// Vérifie le nom : 2 à 50 caractères, lettres uniquement (espaces, tirets et apostrophes entre les mots)
const isNameValid = (name) => {
    if (typeof name !== 'string') return false;
    const trimmed = name.trim();
    if (trimmed.length < 2 || trimmed.length > 50) return false;
    return /^\p{L}+(?:[ '\-]\p{L}+)*$/u.test(trimmed);
};

// Vérifie le format de l'email : partie locale, @, domaine, point et extension d'au moins 2 lettres
const isEmailValid = (email) => {
    if (typeof email !== 'string') return false;
    const trimmed = email.trim();
    if (trimmed.length > 254) return false;
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(trimmed);
};

// Inscription : valide les champs, crée le compte puis ouvre une session
router.post('/register', async (req, res) => {
    const { name, email, mdp } = req.body;

    // Validation du nom
    if (!isNameValid(name)) {
        return res.status(400).json({
            error: "Le prénom est incorrect (2 à 50 caractères, lettres uniquement, tirets et apostrophes autorisés)."
        });
    }

    // Validation de l'email
    if (!isEmailValid(email)) {
        return res.status(400).json({ error: "Adresse email invalide." });
    }

    // Validation du mot de passe
    if (!isPasswordRobust(mdp)) {
        return res.status(400).json({
            error: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial."
        });
    }

    try {
        // Hachage du mot de passe avant stockage (jamais en clair)
        const hash = await bcrypt.hash(mdp, 10);
        // Requête préparée : protège contre l'injection SQL
        const sql = 'INSERT INTO users (email, nom, mdp) VALUES (?, ?, ?)';
        const [result] = await req.db.query(sql, [email, name, hash]);

        // Nouvelle session pour éviter le détournement de session
        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).json({ error: "Erreur session" });
            }
            // Stocke les infos de l'utilisateur dans la session
            req.session.user = { id: result.insertId, nom: name, email: email };
            req.session.save(() => {
                res.json({ user: req.session.user });
            });
        });
    } catch (err) {
        console.error('Erreur inscription:', err);
        res.status(500).json({ error: "Email déjà utilisé ou erreur serveur" });
    }
});

// Connexion : vérifie l'email et le mot de passe puis ouvre une session
router.post('/login', async (req, res) => {
    const { email, mdp } = req.body;

    // Refuse les valeurs qui ne sont pas du texte (évite l'injection via un objet JSON)
    if (typeof email !== 'string' || typeof mdp !== 'string') {
        return res.status(400).json({ error: "Requête invalide" });
    }

    try {
        // Recherche de l'utilisateur par email
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [results] = await req.db.query(sql, [email]);

        // Aucun compte avec cet email (même message que pour un mauvais mot de passe)
        if (results.length === 0) {
            return res.status(401).json({ error: "Identifiants incorrects" });
        }

        // Compare le mot de passe saisi avec le hash en base
        const user = results[0];
        const isMatch = await bcrypt.compare(mdp, user.mdp);

        if (isMatch) {
            // Nouvelle session à la connexion
            req.session.regenerate((err) => {
                if (err) {
                    return res.status(500).json({ error: "Erreur session" });
                }
                // Stocke les infos de l'utilisateur dans la session
                req.session.user = { id: user.idUser, nom: user.nom, email: user.email };
                req.session.save(() => {
                    res.json({ user: req.session.user });
                });
            });
        } else {
            // Mot de passe incorrect (message identique pour ne pas révéler quels emails existent)
            res.status(401).json({ error: "Identifiants incorrects" });
        }
    } catch (err) {
        console.error('Erreur connexion:', err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Mise à jour du profil : nom, email et mot de passe (facultatif)
router.put('/update-profile', async (req, res) => {
    const { nom, email, mdp, mdpConfirm } = req.body;
    // Identifiant de l'utilisateur connecté (undefined si pas de session)
    const userId = req.session.user?.id;

    // Il faut être connecté pour modifier son profil
    if (!userId) {
        return res.status(401).json({ error: "Session expirée, reconnectez-vous" });
    }

    // Validation du nom
    if (!isNameValid(nom)) {
        return res.status(400).json({
            error: "Le prénom est incorrect (2 à 50 caractères, lettres uniquement, tirets et apostrophes autorisés)."
        });
    }

    // Validation de l'email
    if (!isEmailValid(email)) {
        return res.status(400).json({ error: "Adresse email invalide." });
    }

    try {
        let sql;
        let params;

        // Cas 1 : l'utilisateur change aussi son mot de passe
        if (typeof mdp === 'string' && mdp.trim() !== "") {

            // Le nouveau mot de passe doit être assez robuste
            if (!isPasswordRobust(mdp)) {
                return res.status(400).json({
                    error: "Le nouveau mot de passe est trop faible (8 car., Maj, Chiffre, Spécial requis)."
                });
            }

            // Le mot de passe et sa confirmation doivent être identiques
            if (mdp !== mdpConfirm) {
                return res.status(400).json({ error: "Les mots de passe ne correspondent pas" });
            }

            // Hachage du nouveau mot de passe
            const hash = await bcrypt.hash(mdp, 10);
            sql = 'UPDATE users SET nom = ?, email = ?, mdp = ? WHERE idUser = ?';
            params = [nom, email, hash, userId];
        } else {
            // Cas 2 : mise à jour du nom et de l'email uniquement
            sql = 'UPDATE users SET nom = ?, email = ? WHERE idUser = ?';
            params = [nom, email, userId];
        }

        const [result] = await req.db.query(sql, params);

        if (result.affectedRows > 0) {
            // Synchronise la session avec les nouvelles infos
            req.session.user.nom = nom;
            req.session.user.email = email;

            req.session.save(() => {
                res.json({ message: "Profil mis à jour", user: req.session.user });
            });
        } else {
            // Aucune ligne modifiée : l'utilisateur n'existe pas
            res.status(404).json({ error: "Utilisateur introuvable" });
        }
    } catch (err) {
        console.error('Erreur Update:', err);
        // Email déjà pris par un autre compte
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Cet email est déjà utilisé" });
        }
        res.status(500).json({ error: "Erreur lors de la mise à jour" });
    }
});

// Renvoie l'utilisateur connecté (ou null) pour restaurer la session côté front
router.get("/me", (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.json({ user: null });
    }
});

// Déconnexion : détruit la session et supprime le cookie
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la déconnexion" });
        }
        // Supprime le cookie de session côté navigateur
        res.clearCookie('voltgo_session');
        return res.json({ message: "Déconnexion réussie" });
    });
});

export default router;