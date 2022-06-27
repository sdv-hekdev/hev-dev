package mobilierhek.controller;

import mobilierhek.repository.Categorie;
import mobilierhek.model.entity.Produit;
import mobilierhek.service.IArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/gestion")
public class TestController {
    @GetMapping("/all")
    public String allAccess() {
        return "Public Content.";
    }

    @Autowired
    private IArticleService articleService;


    @GetMapping(value = "/AllArticles")

    public List<Produit> getAllArticle() {
        return articleService.findAll();
    }
    /*
    ajouter un article
     */

    @PostMapping(value = "/api/article/add")
    public void ajouterArticle(@RequestBody Produit article) {
        articleService.addArticle(article);

    }

    /*
        afficher l'article qui a id passé en parametre
     */
    @GetMapping(value = "/api/article/all")
    public Optional<Produit> getById(@RequestParam(value = "id") Long id) {
        return articleService.FindbyId(id);
    }


    /*
    afficher les articles descendant selon Prix
     */


    @GetMapping(value = "/api/article/prix-desc")
    public List<Produit> getByPrixDesc() {
        return articleService.getByPrixDesc();
    }


    @GetMapping(value = "/api/article/prix-asc")
    public List<Produit> getByPrixAsc() {
        return articleService.getByPrixAsc();
    }


    @GetMapping(value = "/api/article/prixMinPrixMax")
    public List<Produit> getArticlesAvecPrixMinMax(@RequestParam(value = "prixmin") Double prixmin, @RequestParam(value = "prixmax") Double prixmax) {
        return articleService.getArticles(prixmin, prixmax);
    }

    /*
     afficher le nombre des articles dans le stock
    */
    @GetMapping(value = "/api/article/stock")
    public String getnombreArticle() {
        if (articleService.getnombreArticle() == null || articleService.getnombreArticle() == "0") {
            return "L'article n'est plus disponible";
        } else {
            return articleService.getnombreArticle();
        }
    }

    @PostMapping(value = "/api/categorie/add")
    public void ajouterCategorie(@RequestBody Categorie categorie) {
        articleService.addCategorie(categorie);

    }
    @GetMapping(value = "/api/categorie/all")
    public List<Categorie> allrCategorie() {
        return articleService.findAllCategorie();

    }
    @PostMapping(value = "/api/categorie/delete")
    public void deleteCategorie(@RequestBody Categorie categorie) {
        articleService.deleteCategorie(categorie);

    }

    @PostMapping(value = "/api/article/delete")
    public void deleteArticle(@RequestBody Produit article) {
        articleService.deleteArticle(article);

    }
    /*
    @GetMapping(value = "/AllUsers")
    public List<Utilisateur> getUser() {
        return articleService.findAllUser();
    }

    @PostMapping(value = "/api/user/affecteroletouser")
    public void ajouterUser(@RequestBody Utilisateur user) {
        articleService.affectRoleToUser(user);

    }

    @PostMapping(value = "/api/user/delete")
    public void deleteUser(@RequestBody Utilisateur user) {
        articleService.deleteUser(user);

    }*/
}