package Yuso.Models;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

public class BidResponseModel {
    private UUID Id;
    private int Price;
    private Timestamp BidDate;
    private String FirstName;
    private String LastName;
    private String Image;

    public BidResponseModel(UUID id, int price, Timestamp bidDate, String firstName, String lastName, String image) {
        Id = id;
        Price = price;
        BidDate = bidDate;
        FirstName = firstName;
        LastName = lastName;
        Image = image;
    }

    public BidResponseModel() {
    }

    public UUID getId() {
        return Id;
    }

    public void setId(UUID id) {
        Id = id;
    }

    public int getPrice() {
        return Price;
    }

    public void setPrice(int price) {
        Price = price;
    }

    public Timestamp getBidDate() {
        return BidDate;
    }

    public void setBidDate(Timestamp bidDate) {
        BidDate = bidDate;
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
