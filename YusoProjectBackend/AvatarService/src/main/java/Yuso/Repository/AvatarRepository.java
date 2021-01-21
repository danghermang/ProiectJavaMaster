package Yuso.Repository;

import Yuso.Entities.Avatar;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class AvatarRepository {
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

    public Avatar GetAvatarBy(UUID userId) {
        List<Avatar> result = new ArrayList<>();

        try {
            final Statement statement = dbConnection.createStatement();

            String sqlStatement = String.format(
                    "SELECT image\n" +
                            "\tFROM public.avatars WHERE userid = \'%s\';", userId);

            ResultSet rs = statement.executeQuery(sqlStatement);

            while (rs.next()) {
                Avatar avatar = new Avatar();
                avatar.setImage(rs.getString(1));
                result.add(avatar);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result.stream().findFirst().orElse(null);
    }

    public void UpdateAvatar(UUID userId, Avatar avatar) {
        try {
            final Statement statement = dbConnection.createStatement();

            String sqlStatement = String.format("UPDATE public.avatars" +
                    "\tSET image=\'%s\'" +
                    "\tWHERE userid = \'%s\';", avatar.getImage(), userId);

            statement.executeUpdate(sqlStatement);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
