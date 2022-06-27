package mobilierhek.repository;

import mobilierhek.model.entity.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Produit, Long> {
    List<Produit> findAllByOrderByPrixAsc();
    List<Produit> findAllByOrderByPrixDesc();
    List<Produit> findAllByOrderByNomDesc();

    @Query(nativeQuery = true, value="select * from produit a where a.prix <=?2 && a.prix >=?1")
    public List<Produit> getArticles(Double prixmin,Double prixmax);

    @Query(nativeQuery = true, value="select count(*) from produit")
    public String getnombreArticle();
}