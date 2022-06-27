package mobilierhek.service;

import mobilierhek.model.entity.Utilisateur;

/**
 * Représente l'interface des services d'utilisateur.
 * @author elkhadar
 *
 */
public interface UtilisateurService {
	
	public static final String UTILISATEUR = "UTILISATEUR";
	
	public boolean connecter(Utilisateur utilisateur);
	
	public void deconnecter();
}
