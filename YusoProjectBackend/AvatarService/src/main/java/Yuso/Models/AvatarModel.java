package Yuso.Models;

public class AvatarModel {
    public AvatarModel(String image) {
        this.image = image;
    }

    public AvatarModel() {
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    private String image;
}
