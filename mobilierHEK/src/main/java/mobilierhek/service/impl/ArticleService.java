package mobilierhek.service.impl;

import mobilierhek.model.entity.Produit;
import mobilierhek.repository.*;
import mobilierhek.service.IArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleService implements IArticleService {

    @Autowired
   private ArticleRepository articleRepository ;
@Autowired

    private CategorieRepository categorieRepository ;



    @Override
    public List<Produit> findAll() {
        List<Produit> articles= articleRepository.findAll();
        return articles;

    }

    @Override
    public void addCategorie(Categorie categorie) {
        categorieRepository.save(categorie);
    }

    @Override
    public void deleteArticle(Produit article) {
        articleRepository.delete(article);
    }

    @Override
    public void deleteCategorie(Categorie categorie) {
        categorieRepository.delete(categorie);
    }

    @Override
    public List<Categorie> findAllCategorie() {
        return categorieRepository.findAll();
    }



    @Override
    public void addArticle(Produit article) {
       // Categorie categorie = categorieRepository.getById(categorie_id);
        articleRepository.save(article);
    }

    @Override
    public Optional<Produit> FindbyId(Long id) {
        Optional<Produit> article = articleRepository.findById(id);
        return article;
    }

    @Override
    public List<Produit> getByPrixDesc() {
        List<Produit> articles = articleRepository.findAllByOrderByPrixDesc();
        return articles;
    }

    @Override
    public List<Produit> getByPrixAsc() {
        List<Produit> articles = articleRepository.findAllByOrderByPrixAsc();
        return articles;
    }

    @Override
    public List<Produit> getArticles(Double prixmin,Double prixmax) {
        List<Produit> articles = articleRepository.getArticles(prixmin,prixmax);
        return articles;
    }

    public String getnombreArticle(){
       return articleRepository.getnombreArticle();
    }
}