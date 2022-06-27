package mobilierhek.controller;
import mobilierhek.controller.util.Message;
import mobilierhek.controller.util.MessageUtil;
import mobilierhek.model.entity.Utilisateur;
import mobilierhek.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 
 * @author elkhadar
 * 
 * Faire le point final REST pour les services de utilisateur.
 *
 */
@RestController
@RequestMapping("api/utilisateur")
public class UtilisateurController {
	
	@Autowired
	private UtilisateurService service;
	
	/**
	 * Faire la connexion à un compte d'utilisateur
	 * 
	 * @param utilisateur
	 * 
	 */
	@PostMapping("/connecter")
	public Message connecter(@RequestBody Utilisateur utilisateur){
		try{
			if(service.connecter(utilisateur)){
				return MessageUtil.SUCCES;
			}else{
				return MessageUtil.ERREUR;
			}
		}catch(Exception e){
			e.printStackTrace();
			return MessageUtil.ERREUR;
		}
	}
	
	/**
	 * Faire la déconnexion d'utilisateur connecté
	 * @return
	 */
	@PostMapping("/deconnecter")
	public Message deconnecter(){
		try{
			service.deconnecter();
			return MessageUtil.SUCCES;
		}catch(Exception e){
			e.printStackTrace();
			return MessageUtil.ERREUR;
		}
	}

}
