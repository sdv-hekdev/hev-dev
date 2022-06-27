package mobilierhek.service.impl;

import javax.servlet.http.HttpSession;
import javax.validation.ValidationException;

import mobilierhek.model.entity.Utilisateur;
import mobilierhek.repository.UtilisateurRepository;
import mobilierhek.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * Représente la classe des services d'utilisateur.
 * @author ricardo
 *
 */
@Service
public class UtilisateurServiceImpl implements UtilisateurService {


	@Autowired
	private HttpSession session;

	@Autowired
	private UtilisateurRepository repository;

	/**
	 * Faire la connexion à un compte d'utilisateur
	 */
	@Override
	public boolean connecter(Utilisateur utilisateur) {

		boolean connecte = false;

		Utilisateur utilisateurBase = repository.getOne(utilisateur.getEmail());

		//Si l'utilisateur existe et que le mot de passe est correct, une session est créée.
		if(utilisateurBase != null && utilisateurBase.getMotPasse().equals(utilisateur.getMotPasse())){

			session.setAttribute(UTILISATEUR, utilisateur);
			connecte = true;

		}else{
			throw new ValidationException("Utilisateur ou mot de passe invalide!");
		}

		return connecte;
	}

	/**
	 * Faire la déconnexion d'utilisateur connecté
	 * @return
	 */
	@Override
	public void deconnecter() {

		session.removeAttribute(UTILISATEUR);
	}

}
