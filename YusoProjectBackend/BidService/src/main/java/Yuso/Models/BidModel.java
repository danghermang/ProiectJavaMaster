package Yuso.Models;

import java.util.UUID;

public class BidModel {
    private int Price;
    private UUID AuctionId;

    public BidModel(int price, UUID auctionId) {
        Price = price;
        AuctionId = auctionId;
    }

    public BidModel() {
    }

    public int getPrice() {
        return Price;
    }

    public void setPrice(int price) {
        Price = price;
    }

    public UUID getAuctionId() {
        return AuctionId;
    }

    public void setAuctionId(UUID auctionId) {
        AuctionId = auctionId;
    }
}
