package Yuso.Repositories;

import Yuso.Entities.AccountInfo;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class AccountRepository {
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

    public AccountInfo GetAccountInfoBy(UUID userId) {
        List<AccountInfo> result = new ArrayList<>();

        try {
            final Statement statement = dbConnection.createStatement();

            String sqlStatement = String.format(
                    "select firstName, lastName, image from profiles p join avatars a on p.userId = a.userId where p.userId = \'%s\'", userId);

            ResultSet rs = statement.executeQuery(sqlStatement);

            while (rs.next()) {
                AccountInfo avatar = new AccountInfo();
                avatar.setFirstName(rs.getString(1));
                avatar.setLastName(rs.getString(2));
                avatar.setImage(rs.getString(3));
                result.add(avatar);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result.stream().findFirst().orElse(null);
    }
}
