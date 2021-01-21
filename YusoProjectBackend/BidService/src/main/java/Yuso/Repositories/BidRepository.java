package Yuso.Repositories;

import Yuso.Entities.AccountInfo;
import Yuso.Entities.Bid;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class BidRepository {
    final Connection dbConnection = getDBConnection();

    private Connection getDBConnection() {
        Connection con = null;
        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
//        String url = "jdbc:postgresql://localhost/postgres";
        String url = "jdbc:postgresql://host.docker.internal/postgres";
        String user = "postgres";
        String password = "postgres";

        try {
            con = DriverManager.getConnection(url, user, password);
            System.out.println("Connection completed.");
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        } finally {

        }
        return con;
    }

    public void CreateBid(Bid bid) {
        try {
            final Statement statement = dbConnection.createStatement();

            String sqlStatement = String.format(
                    "INSERT INTO public.bids(\n" +
                            "\tid, auctionid, price, userid)\n" +
                            "\tVALUES (\'%s\', \'%s\', \'%s\', \'%s\');", bid.getId(), bid.getAuctionId(), bid.getPrice(), bid.getUserId());

            statement.executeUpdate(sqlStatement);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Bid> GetBidsByAuctionId(UUID auctionId) {
        List<Bid> result = new ArrayList<>();

        try {
            final Statement statement = dbConnection.createStatement();

            String sqlStatement = String.format(
                    "SELECT id, biddate, price, userid\n" +
                            "\tFROM public.bids Where auctionid = \'%s\'" +
                            "order by biddate asc", auctionId);

            ResultSet rs = statement.executeQuery(sqlStatement);

            while (rs.next()) {
                Bid avatar = new Bid();
                avatar.setId(UUID.fromString(rs.getString(1)));
                avatar.setBidDate(rs.getTimestamp(2));
                avatar.setPrice(rs.getInt(3));
                avatar.setUserId(UUID.fromString(rs.getString(4)));
                result.add(avatar);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result;
    }
}
