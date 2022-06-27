package mobilierhek.repository;

import mobilierhek.model.entity.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Cette composant donne accès à la base de données du produit
 * @author elkhadar
 *
 */
@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long>{

}
