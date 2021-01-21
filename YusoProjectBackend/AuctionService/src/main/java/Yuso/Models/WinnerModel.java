package Yuso.Models;

import java.util.UUID;

public class WinnerModel {

    private UUID WinnerId;

    public WinnerModel(UUID winnerId) {
        WinnerId = winnerId;
    }
    public WinnerModel() {

    }

    public UUID getWinnerId() {
        return WinnerId;
    }

    public void setWinnerId(UUID winnerId) {
        WinnerId = winnerId;
    }
}
