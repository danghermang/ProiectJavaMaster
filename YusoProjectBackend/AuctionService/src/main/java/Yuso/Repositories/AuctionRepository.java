package Yuso.Repositories;

import Yuso.Entities.Auction;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class AuctionRepository {
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

    public Auction GetAuctionBy(UUID auctionId) {
        List<Auction> result = new ArrayList<>();

        try {
            final Statement statement = dbConnection.createStatement();

            String sqlStatement = String.format(
                    "SELECT id, " +
                            "name," +
                            " userid, " +
                            "fromaddress_city, " +
                            "fromaddress_postalcode, " +
                            "fromaddress_street, " +
                            "toaddress_city, " +
                            "toaddress_postalcode, " +
                            "toaddress_street, " +
                            "auctiondate_enddate, " +
                            "location_deliverygeo," +
                            " location_pickupgeo, " +
                            "transactiondate_deliverondate," +
                            " transactiondate_pickupondate, " +
                            "details_aditionalinformation, " +
                            "details_weight\n" +
                            "\tFROM public.auctions WHERE id = \'%s\';", auctionId);

            ResultSet rs = statement.executeQuery(sqlStatement);

            while (rs.next()) {
                Auction auction = new Auction();
                auction.setId(UUID.fromString(rs.getString(1)));
                auction.setName(rs.getString(2));
                auction.setUserId(UUID.fromString(rs.getString(3)));
                auction.setFromCity(rs.getString(4));
                auction.setFromPostalCode(rs.getString(5));
                auction.setFromAddress(rs.getString(6));
                auction.setToCity(rs.getString(7));
                auction.setToPostalCode(rs.getString(8));
                auction.setToAddress(rs.getString(9));
                auction.setEndDate(rs.getDate(10));
                auction.setDeliveryGeo(rs.getString(11));
                auction.setPickupGeo(rs.getString(12));
                auction.setDeliverOnDate(rs.getDate(13));
                auction.setPickupOnDate(rs.getDate(14));
                auction.setAditionalDetails(rs.getString(15));
                auction.setWeight(rs.getFloat(16));

                result.add(auction);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result.stream().findFirst().orElse(null);
    }

    public List<Auction> GetAuctionsBy(UUID userId) {
        List<Auction> result = new ArrayList<>();

        try {
            final Statement statement = dbConnection.createStatement();

            String sqlStatement = String.format(
                    "SELECT id, name, userid, fromaddress_city, fromaddress_postalcode, fromaddress_street, toaddress_city, toaddress_postalcode, toaddress_street, auctiondate_enddate, location_deliverygeo, location_pickupgeo, transactiondate_deliverondate, transactiondate_pickupondate, details_aditionalinformation, details_weight\n" +
                            "\tFROM public.auctions WHERE userId = \'%s\';", userId);

            ResultSet rs = statement.executeQuery(sqlStatement);

            while (rs.next()) {
                Auction auction = new Auction();
                auction.setId(UUID.fromString(rs.getString(1)));
                auction.setName(rs.getString(2));
                auction.setUserId(UUID.fromString(rs.getString(3)));
                auction.setFromCity(rs.getString(4));
                auction.setFromPostalCode(rs.getString(5));
                auction.setFromAddress(rs.getString(6));
                auction.setToCity(rs.getString(7));
                auction.setToPostalCode(rs.getString(8));
                auction.setToAddress(rs.getString(9));
                auction.setEndDate(rs.getDate(10));
                auction.setDeliveryGeo(rs.getString(11));
                auction.setPickupGeo(rs.getString(12));
                auction.setDeliverOnDate(rs.getDate(13));
                auction.setPickupOnDate(rs.getDate(14));
                auction.setAditionalDetails(rs.getString(15));
                auction.setWeight(rs.getFloat(16));

                result.add(auction);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result;
    }

    public void CreateAuction(Auction auction) {
        try {
            final Statement statement = dbConnection.createStatement();

            String sqlStatement = String.format(
                    "INSERT INTO public.auctions(\n" +
                            "\tid, " +
                            "name, " +
                            "userid," +
                            "status," +
                            "fromaddress_city, " +
                            "fromaddress_postalcode, " +
                            "fromaddress_street, " +
                            "toaddress_city, " +
                            "toaddress_postalcode, " +
                            "toaddress_street, " +
                            "auctiondate_enddate, " +
                            "location_deliverygeo, " +
                            "location_pickupgeo, " +
                            "transactiondate_deliverondate, " +
                            "transactiondate_pickupondate, " +
                            "details_aditionalinformation, " +
                            "details_weight)\n" +
                            "\tVALUES (\'%s\', \'%s\', \'%s\', \'%s\', \'%s\', \'%s\', \'%s\', \'%s\', \'%s\', \'%s\', \'%s\', \'%s\', \'%s\', \'%s\', \'%s\', \'%s\', \'%s\');",
                    auction.getId(),
                    auction.getName(),
                    auction.getUserId(),
                    1,
                    auction.getFromCity(),
                    auction.getFromPostalCode(),
                    auction.getFromAddress(),
                    auction.getToCity(),
                    auction.getToPostalCode(),
                    auction.getToAddress(),
                    auction.getEndDate(),
                    auction.getDeliveryGeo(),
                    auction.getPickupGeo(),
                    auction.getDeliverOnDate(),
                    auction.getPickupOnDate(),
                    auction.getAditionalDetails(),
                    auction.getWeight());

            statement.executeUpdate(sqlStatement);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Auction> GetPromotedAuctions() {
        List<Auction> result = new ArrayList<>();

        try {
            final Statement statement = dbConnection.createStatement();

            String sqlStatement = String.format(
                    "SELECT id, name, userid, fromaddress_city, fromaddress_postalcode, fromaddress_street, toaddress_city, toaddress_postalcode, toaddress_street, auctiondate_enddate, location_deliverygeo, location_pickupgeo, transactiondate_deliverondate, transactiondate_pickupondate, details_aditionalinformation, details_weight\n" +
                            "\tFROM public.auctions;");

            ResultSet rs = statement.executeQuery(sqlStatement);

            while (rs.next()) {
                Auction auction = new Auction();
                auction.setId(UUID.fromString(rs.getString(1)));
                auction.setName(rs.getString(2));
                auction.setUserId(UUID.fromString(rs.getString(3)));
                auction.setFromCity(rs.getString(4));
                auction.setFromPostalCode(rs.getString(5));
                auction.setFromAddress(rs.getString(6));
                auction.setToCity(rs.getString(7));
                auction.setToPostalCode(rs.getString(8));
                auction.setToAddress(rs.getString(9));
                auction.setEndDate(rs.getDate(10));
                auction.setDeliveryGeo(rs.getString(11));
                auction.setPickupGeo(rs.getString(12));
                auction.setDeliverOnDate(rs.getDate(13));
                auction.setPickupOnDate(rs.getDate(14));
                auction.setAditionalDetails(rs.getString(15));
                auction.setWeight(rs.getFloat(16));

                result.add(auction);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result;
    }

    public List<Auction> GetCompletedAuctions(UUID winnerId) {
        List<Auction> result = new ArrayList<>();

        try {
            final Statement statement = dbConnection.createStatement();

            String sqlStatement = String.format(
                    "SELECT id, name, userid, fromaddress_city, fromaddress_postalcode, fromaddress_street, toaddress_city, toaddress_postalcode, toaddress_street, auctiondate_enddate, location_deliverygeo, location_pickupgeo, transactiondate_deliverondate, transactiondate_pickupondate, details_aditionalinformation, details_weight, status\n" +
                            "\tFROM public.auctions" +
                            "where winnerId= \'%s\';",winnerId);

            ResultSet rs = statement.executeQuery(sqlStatement);

            while (rs.next()) {
                Auction auction = new Auction();
                auction.setId(UUID.fromString(rs.getString(1)));
                auction.setName(rs.getString(2));
                auction.setUserId(UUID.fromString(rs.getString(3)));
                auction.setFromCity(rs.getString(4));
                auction.setFromPostalCode(rs.getString(5));
                auction.setFromAddress(rs.getString(6));
                auction.setToCity(rs.getString(7));
                auction.setToPostalCode(rs.getString(8));
                auction.setToAddress(rs.getString(9));
                auction.setEndDate(rs.getDate(10));
                auction.setDeliveryGeo(rs.getString(11));
                auction.setPickupGeo(rs.getString(12));
                auction.setDeliverOnDate(rs.getDate(13));
                auction.setPickupOnDate(rs.getDate(14));
                auction.setAditionalDetails(rs.getString(15));
                auction.setWeight(rs.getFloat(16));
                auction.setStatus(rs.getInt(17));

                result.add(auction);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result;
    }

    public void SetWinner(UUID auctionId, UUID winnerId) {
        try {
            final Statement statement = dbConnection.createStatement();

            String sqlStatement = String.format("UPDATE public.auctions\n" +
                    "\tSET winnerId= \'%s\', status = 2\n" +
                    "\tWHERE auctionId = \'%s\';", winnerId, auctionId);

            statement.executeUpdate(sqlStatement);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
