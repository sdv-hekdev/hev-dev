package mobilierhek.controller.util;
/**
 * Représente les données d'un message
 * @author ricardo
 *
 */
public class Message {
	
	private int code;
	private String statut;
	
	
	public Message() {
		super();
	}
	
	public Message(int code, String statut) {
		super();
		this.code = code;
		this.statut = statut;
	}


	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getStatut() {
		return statut;
	}
	public void setStatut(String statut) {
		this.statut = statut;
	}
	
	

}
