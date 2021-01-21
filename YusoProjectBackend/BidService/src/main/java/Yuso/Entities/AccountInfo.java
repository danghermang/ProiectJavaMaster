package Yuso.Entities;

public class AccountInfo {
    private String FirstName;
    private String LastName;
    private String Image;

    public AccountInfo() {
    }

    public AccountInfo(String firstName, String lastName, String image) {
        FirstName = firstName;
        LastName = lastName;
        Image = image;
    }

    public String getFirstName() {
        return FirstName;
    }

    public void setFirstName(String firstName) {
        FirstName = firstName;
    }

    public String getLastName() {
        return LastName;
    }

    public void setLastName(String lastName) {
        LastName = lastName;
    }

    public String getImage() {
        return Image;
    }

    public void setImage(String image) {
        Image = image;
    }
}
