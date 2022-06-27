package mobilierhek.controller;

import mobilierhek.controller.util.Message;
import mobilierhek.controller.util.MessageUtil;
import mobilierhek.model.PanierItem;
import mobilierhek.model.ProduitItem;
import mobilierhek.service.PanierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 
 * @author elkhadar
 * 
 *  les services de panier.
 *
 */
@RestController
@RequestMapping("api/panier")
public class PanierController {
	
	@Autowired
	private PanierService panierService;
	
	/**
	 * Afficher le contenu au panier
	 * @return
	 */
	@GetMapping("/afficher-contenu")
	public List<PanierItem> afficherContenu(){
		
		try{
			return panierService.listerTout();
		}catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * Ajouter le produit au panier
	 * @param item
	 * @return
	 */
	@PostMapping("/ajouter-produit")
	public Message ajouterProduit(@RequestBody ProduitItem item){
		try{
			panierService.ajouterProduit(item.getIdProduit(), item.getQuantite());
			return MessageUtil.SUCCES;
		}catch(Exception e){
			e.printStackTrace();
			return MessageUtil.ERREUR;
		}
	}
	
	/**
	 * Enlever le produit au panier
	 * @param item
	 * @return
	 */
	@DeleteMapping("/enlever-produit")
	public Message enleverProduit(@RequestBody ProduitItem item){
		try{
			panierService.enleverProduit(item.getIdProduit(), item.getQuantite());
			return MessageUtil.SUCCES;
		}catch(Exception e){
			e.printStackTrace();
			return MessageUtil.ERREUR;
		}
	}

}
