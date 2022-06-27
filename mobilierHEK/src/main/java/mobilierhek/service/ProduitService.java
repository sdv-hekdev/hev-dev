package mobilierhek.service;

import mobilierhek.model.entity.Produit;

import java.util.List;

/**
 * Représente l'interface des services de produit.
 * @author elkhadar
 *
 */
public interface ProduitService {
	
	public List<Produit> listerTout();
	
	public Produit detail(Long id);
	
	public void incluire(Produit produit);
	
	public void supprimer(Long id);
}
