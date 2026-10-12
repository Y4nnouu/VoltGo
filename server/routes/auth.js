import express from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();


const isPasswordRobust = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return regex.test(password);
};


router.post('/register', async (req, res) => {
    const { name, email, mdp } = req.body;
    
    
    if (!isPasswordRobust(mdp)) {
        return res.status(400).json({ 
            error: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial." 
        });
    }

    try {
        const hash = await bcrypt.hash(mdp, 10);
        const sql = 'INSERT INTO users (email, nom, mdp) VALUES (?, ?, ?)';
        const [result] = await req.db.query(sql, [email, name, hash]);
        
        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).json({ error: "Erreur session" });
            }
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


router.post('/login', async (req, res) => {
    const { email, mdp } = req.body;
    
    try {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [results] = await req.db.query(sql, [email]);
        
        if (results.length === 0) {
            return res.status(401).json({ error: "Utilisateur non trouvé" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(mdp, user.mdp);
        
        if (isMatch) {
            req.session.regenerate((err) => {
                if (err) {
                    return res.status(500).json({ error: "Erreur session" });
                }
                req.session.user = { id: user.idUser, nom: user.nom, email: user.email };
                req.session.save(() => {
                    res.json({ user: req.session.user });
                });
            });
        } else {
            res.status(401).json({ error: "Mot de passe incorrect" });
        }
    } catch (err) {
        console.error('Erreur connexion:', err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});


router.put('/update-profile', async (req, res) => {
    const { nom, email, mdp, mdpConfirm } = req.body;
    const userId = req.session.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "Session expirée, reconnectez-vous" });
    }

    try {
        let sql;
        let params;

        if (mdp && mdp.trim() !== "") {
            
            if (!isPasswordRobust(mdp)) {
                return res.status(400).json({ 
                    error: "Le nouveau mot de passe est trop faible (8 car., Maj, Chiffre, Spécial requis)." 
                });
            }

            if (mdp !== mdpConfirm) {
                return res.status(400).json({ error: "Les mots de passe ne correspondent pas" });
            }
            
            const hash = await bcrypt.hash(mdp, 10);
            sql = 'UPDATE users SET nom = ?, email = ?, mdp = ? WHERE idUser = ?';
            params = [nom, email, hash, userId];
        } else {
            sql = 'UPDATE users SET nom = ?, email = ? WHERE idUser = ?';
            params = [nom, email, userId];
        }

        const [result] = await req.db.query(sql, params);

        if (result.affectedRows > 0) {
            req.session.user.nom = nom;
            req.session.user.email = email;

            req.session.save(() => {
                res.json({ message: "Profil mis à jour", user: req.session.user });
            });
        } else {
            res.status(404).json({ error: "Utilisateur introuvable" });
        }
    } catch (err) {
        console.error('Erreur Update:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Cet email est déjà utilisé" });
        }
        res.status(500).json({ error: "Erreur lors de la mise à jour" });
    }
});

router.get("/me", (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.json({ user: null });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la déconnexion" });
        }
        res.clearCookie('voltgo_session');
        return res.json({ message: "Déconnexion réussie" });
    });
});

export default router;