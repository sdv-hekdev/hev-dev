package mobilierhek.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Représente les données d'un utilisateur
 * @author elkhadar
 *
 */
@Entity
@Table(name="UTILISATEUR")
public class Utilisateur {
	
	@Id
	@Column(name="EMAIL")
	private String email;
	
	@Column(name="MOT_PASSE")
	private String motPasse;

	public Utilisateur() {
		super();
	}

	public Utilisateur(String email, String motPasse) {
		super();
		this.email = email;
		this.motPasse = motPasse;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMotPasse() {
		return motPasse;
	}

	public void setMotPasse(String motPasse) {
		this.motPasse = motPasse;
	}
	
}
