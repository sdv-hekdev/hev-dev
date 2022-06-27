package mobilierhek.repository;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ArticleImage {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String path;

    public boolean isParent() {
        return isParent;
    }

    public void setParent(boolean parent) {
        isParent = parent;
    }

    private boolean isParent;

    protected ArticleImage() {
    }

    public ArticleImage(Long id, String path, boolean isParent) {
        this.id = id;
        this.path = path;
        this.isParent = isParent;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
