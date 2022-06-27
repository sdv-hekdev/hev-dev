package mobilierhek.service;

import mobilierhek.repository.Categorie;
import mobilierhek.model.entity.Produit;

import java.util.List;
import java.util.Optional;

public interface IArticleService {

   List<Produit> findAll();
   void addArticle(Produit article);
   Optional<Produit> FindbyId(Long id);
   List<Produit> getByPrixDesc();
   List<Produit> getByPrixAsc();
   List<Produit> getArticles(Double prixmin, Double prixmax);
   String getnombreArticle();
   void addCategorie(Categorie categorie);
   void deleteArticle(Produit article);
   void deleteCategorie(Categorie categorie);

   List<Categorie> findAllCategorie();



}
