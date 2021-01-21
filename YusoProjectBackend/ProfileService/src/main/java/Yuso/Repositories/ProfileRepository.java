package Yuso.Repositories;

import Yuso.Entities.Profile;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ProfileRepository {
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

    public Profile GetProfileBy(UUID userId) {
        List<Profile> result = new ArrayList<>();

        try {
            final Statement statement = dbConnection.createStatement();

            String sqlStatement = String.format(
                    "SELECT userid, address, city, county, firstname, lastname, phone, postalcode\n" +
                            "\tFROM public.profiles WHERE userid = \'%s\';", userId);

            ResultSet rs = statement.executeQuery(sqlStatement);

            while (rs.next()) {
                Profile dbUser = new Profile();
                dbUser.setUserId(UUID.fromString(rs.getString(1)));
                dbUser.setAddress(rs.getString(2));
                dbUser.setCity(rs.getString(3));
                dbUser.setCounty(rs.getString(4));
                dbUser.setFirstName(rs.getString(5));
                dbUser.setLastName(rs.getString(6));
                dbUser.setPhone(rs.getString(7));
                dbUser.setPostalCode(rs.getString(8));
                result.add(dbUser);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result.stream().findFirst().orElse(null);
    }

    public void UpdateProfile(Profile profileToUpdate) {
        try {
            final Statement statement = dbConnection.createStatement();

            String sqlStatement = String.format(
                    "UPDATE public.profiles\n" +
                            "\tSET address=\'%s\', city=\'%s\', county=\'%s\', firstname=\'%s\', lastname=\'%s\', phone=\'%s\', postalcode=\'%s\'\n" +
                            "\tWHERE userid = \'%s\';", profileToUpdate.getAddress(), profileToUpdate.getCity(), profileToUpdate.getCounty(), profileToUpdate.getFirstName(), profileToUpdate.getLastName(), profileToUpdate.getPhone(), profileToUpdate.getPostalCode(), profileToUpdate.getUserId());

            statement.executeUpdate(sqlStatement);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
