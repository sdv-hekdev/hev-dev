package mobilierhek.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.ValidationException;

import mobilierhek.model.PanierItem;
import mobilierhek.model.entity.Produit;
import mobilierhek.service.PanierService;
import mobilierhek.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Représente la classe des services de panier.
 * @author ricardo
 *
 */
@Service
public class PanierServiceImpl implements PanierService {
	
	
	@Autowired
	private HttpSession session;
	
	@Autowired
	private ProduitService produitService;

	/**
	 * Liste tous les produit dans le panier de l'utilisateur
	 */
	@Override
	public List<PanierItem> listerTout() {
		
		@SuppressWarnings("unchecked")
		List<PanierItem> panier = (List<PanierItem>) session.getAttribute(PANIER_UTILISATEUR);
		
		return panier;
	}
	

	/**
	 * Ajouter produit au panier
	 */
	@Override
	public void ajouterProduit(Long idProduit, Integer quantiteAjouter) {
		
		List<PanierItem> panier = listerTout();
		
		//Si c'est le premier produit de l'utilisateur, il crée le panier.
		if(panier == null){
			panier = creerPanier();
		}
		
		//vérifier si le produit existe déjà dans le panier
		PanierItem panierItem = chercherProduitPanier(panier, idProduit);
		
		//Si le produit n'existe pas, l'inclusion est faite.
		if(panierItem == null){
			Produit produit = produitService.detail(idProduit);
			panier.add(new PanierItem(produit, quantiteAjouter));
		
		//Sinon, la quantité du produit est modifiée
		}else{
			Integer nouvelleQuantite = panierItem.getQuantite() + quantiteAjouter;
			panierItem.setQuantite(nouvelleQuantite);
		}
		
	}

	/**
	 * Crée le panier de l'utilisateur.
	 * @return
	 */
	private List<PanierItem> creerPanier(){
		List<PanierItem> listePanier = new ArrayList<>();
		
		session.setAttribute(PANIER_UTILISATEUR, listePanier);
		return listePanier;
	}
	
	/**
	 * Enlever produit au panier
	 */
	@Override
	public void enleverProduit(Long idProduit, Integer quantiteEnvlever) {
		
		List<PanierItem> panier = listerTout();
		
		if(panier != null){
			
			//chercher le produit dans le panier.
			PanierItem panierItem = chercherProduitPanier(panier, idProduit);
			
			if(panierItem == null){
				throw new ValidationException("Produit non trouvé!");
				
			//Si la quantité de produits dans le panier est supérieure à la quantité à retirer, la quantité du produit est modifiée.
			}else if(panierItem.getQuantite() > quantiteEnvlever){
				
				Integer nouvelleQuantite = panierItem.getQuantite() - quantiteEnvlever;
				panierItem.setQuantite(nouvelleQuantite);

			//Sinon, le produit est complètement retiré du panier.
			}else{
				panier.remove(panierItem);
			}
			
		}else{
			throw new ValidationException("Le panier est vide!");
		}
		
	}
	
	/**
	 * chercher le produit dans le panier.
	 * 
	 * @param panier
	 * @param idProduit
	 * @return
	 */
	private PanierItem chercherProduitPanier(List<PanierItem> panier, Long idProduit){
		
		PanierItem panierItem = panier.stream()
				  .filter(item -> idProduit.equals(item.getProduit().getId()))
				  .findAny()
				  .orElse(null);
		
		return panierItem;
	}

	
}
