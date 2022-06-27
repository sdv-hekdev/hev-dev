package mobilierhek.model.entity;

import mobilierhek.repository.Categorie;

import javax.persistence.*;

/**
 * Représente les données d'un produit
 * @author elkhadar
 *
 */
@Entity
@Table(name="PRODUIT")
public class Produit {
	
	@Id
	@Column(name="ID")
	private Long id;

	@Column(name="IMAGE")
	private String image;

	@Column(name="NOM")
	private String nom;
	
	@Column(name="DESCRIPTION")
	private String description;
	
	@Column(name="PRIX")
	private Double prix;
	
	@Column(name="COULEUR")
	private String couleur;
	@ManyToOne()
	@JoinColumn(name="category_id", nullable = true)
	//@JsonIgnoreProperties(value={"descr"})
	private Categorie categorie;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getCouleur() {
		return couleur;
	}

	public void setCouleur(String couleur) {
		this.couleur = couleur;
	}

	public String getNom() {
		return nom;
	}

	public Categorie getCategorie() {
		return categorie;
	}

	public void setCategorie(Categorie categorie) {
		this.categorie = categorie;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Double getPrix() {
		return prix;
	}
	public void setPrix(Double prix) {
		this.prix = prix;
	}

}
