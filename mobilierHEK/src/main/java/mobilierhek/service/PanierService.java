package mobilierhek.service;

import mobilierhek.model.PanierItem;

import java.util.List;

/**
 * Représente l'interface des services de panier.
 * @author elkhadar
 *
 */
public interface PanierService {
	
	public static final String PANIER_UTILISATEUR = "PANIER_UTILISATEUR";
	
	public List<PanierItem> listerTout();
	
	public void ajouterProduit(Long idProduit, Integer quantiteAjouter);
	
	public void enleverProduit(Long idProduit, Integer quantiteEnvlever);
	
}
