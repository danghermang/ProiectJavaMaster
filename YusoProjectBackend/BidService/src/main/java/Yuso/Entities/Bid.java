package Yuso.Entities;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

public class Bid {
    private UUID Id;
    private UUID AuctionId;
    private int Price;
    private UUID UserId;
    private Timestamp BidDate;

    public Bid(UUID auctionId, int price, UUID userId) {
        Id = UUID.randomUUID();
        AuctionId = auctionId;
        Price = price;
        UserId = userId;
    }

    public Bid() {
    }

    public UUID getId() {
        return Id;
    }

    public void setId(UUID id) {
        Id = id;
    }

    public UUID getAuctionId() {
        return AuctionId;
    }

    public void setAuctionId(UUID auctionId) {
        AuctionId = auctionId;
    }

    public int getPrice() {
        return Price;
    }

    public void setPrice(int price) {
        Price = price;
    }

    public UUID getUserId() {
        return UserId;
    }

    public void setUserId(UUID userId) {
        UserId = userId;
    }

    public Timestamp getBidDate() {
        return BidDate;
    }

    public void setBidDate(Timestamp bidDate) {
        BidDate = bidDate;
    }
}
