package Yuso.Models;

import Yuso.Entities.Auction;

import java.util.List;

public class GetAuctionResponseModel {
    private List<Auction> Auctions;

    public GetAuctionResponseModel(List<Auction> auctions) {
        Auctions = auctions;
    }

    public GetAuctionResponseModel() {
    }

    public List<Auction> getAuctions() {
        return Auctions;
    }

    public void setAuctions(List<Auction> auctions) {
        Auctions = auctions;
    }
}
