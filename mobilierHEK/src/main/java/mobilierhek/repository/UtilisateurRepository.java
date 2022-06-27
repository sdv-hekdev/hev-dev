package mobilierhek.repository;

import mobilierhek.model.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Cette composant donne accès à la base de données d'utilisateur
 * @author ricardo
 *
 */
@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, String>{

}
