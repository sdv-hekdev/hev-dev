package mobilierhek.model;
/**
 * Représente les données d'un produit choisi
 * @author elkhadar
 *
 */
public class ProduitItem {
	
	private Long idProduit;
	private Integer quantite;
	
	
	
	public ProduitItem() {
		super();
	}
	public ProduitItem(Long idProduit, Integer quantite) {
		super();
		this.idProduit = idProduit;
		this.quantite = quantite;
	}
	public Long getIdProduit() {
		return idProduit;
	}
	public void setIdProduit(Long idProduit) {
		this.idProduit = idProduit;
	}
	public Integer getQuantite() {
		return quantite;
	}
	public void setQuantite(Integer quantite) {
		this.quantite = quantite;
	}

}
