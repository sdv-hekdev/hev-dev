package mobilierhek.controller.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mobilierhek.service.UtilisateurService;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * 
 * @author ricardo
 * 
 * Cette classe réalise l'interception des requêtes qui se trouvent dans la zone de sécurité.
 *
 */
public class AuthentificationInterceptor extends HandlerInterceptorAdapter{
	
	@Override
	public boolean preHandle(
	  HttpServletRequest request,
	  HttpServletResponse response, 
	  Object handler) throws Exception {
	    

		//Si l'utilisateur n'est pas connecté, l'accès est refusé.
        if(request.getSession().getAttribute(UtilisateurService.UTILISATEUR) == null){
        	
        	final int ACCES_REFUSE_CODE = HttpServletResponse.SC_FORBIDDEN;
        	response.sendError(ACCES_REFUSE_CODE, "Accès refusé! Vous devez d'abord vous connecter.");
        	return false;
        }
		
	    return true;
	}

}
