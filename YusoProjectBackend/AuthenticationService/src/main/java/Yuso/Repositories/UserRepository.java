package Yuso.Repositories;

import Yuso.Entities.Profile;
import Yuso.Entities.User;
import sun.security.util.IOUtils;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class UserRepository {
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

    public User CheckIfExists(User user) {
        List<User> result = new ArrayList<>();

        try {
            final Statement statement = dbConnection.createStatement();

            String sqlStatement = String.format(
                    "SELECT Id FROM public.Users Where lower(Email) = lower(\'%s\') and lower(Password) = lower(\'%s\')",user.getEmail(), user.getPassword());

            ResultSet rs = statement.executeQuery(sqlStatement);

            while (rs.next()) {
                User dbUser = new User();
                dbUser.setId(UUID.fromString(rs.getString(1)));
                result.add(dbUser);

//                String sqlStatement = String.format(
//                        "UPDATE public.users\n" +
//                                "\tSET lastlogin= \'%s\'\n" +
//                                "\tWHERE id = \'%s\';", new Timestamp(System.currentTimeMillis());, userId);
//
//                statement.executeUpdate(sqlStatement);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result.stream().findFirst().orElse(null);
    }

    public void SaveUser(User user) {

        try {
            final Statement statement = dbConnection.createStatement();

            String sqlStatement = String.format(
                    "INSERT INTO public.Users(\n" +
                            "\tId, Email, IsActive, Password)\n" +
                            "\tVALUES (\'%s\', \'%s\', \'%s\', \'%s\');", user.getId(), user.getEmail(), user.getIsActive(), user.getPassword());
            statement.executeUpdate(sqlStatement);
            sqlStatement = String.format(
                    "INSERT INTO public.Avatars(\n" +
                            "\tUserId, Image)\n" +
                            "\tVALUES (\'%s\', \'%s\');", user.getId(), user.getDefaultAvatar());
            statement.executeUpdate(sqlStatement);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void SaveProfile(Profile profile) {
        try {
            final Statement statement = dbConnection.createStatement();

            String sqlStatement = String.format(
                    "INSERT INTO public.Profiles(\n" +
                            "\tUserId, Address, City, County, FirstName, LastName, Phone, PostalCode)\n" +
                            "\tVALUES (\'%s\', \'%s\', \'%s\', \'%s\', \'%s\', \'%s\', \'%s\', \'%s\');", profile.getUserId(), profile.getAddress(), profile.getCity(), profile.getCounty(), profile.getFirstName(), profile.getLastName(), profile.getPhone(), profile.getPostalCode());

            statement.executeUpdate(sqlStatement);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public User GetUserBy(UUID userId) {
        List<User> result = new ArrayList<>();

        try {
            final Statement statement = dbConnection.createStatement();

            String sqlStatement = String.format(
                    "SELECT id, email, password FROM public.users WHERE id = \'%s\';", userId);

            ResultSet rs = statement.executeQuery(sqlStatement);

            while (rs.next()) {
                User dbUser = new User();
                dbUser.setId(UUID.fromString(rs.getString(1)));
                dbUser.setEmail(rs.getString(2));
                dbUser.setPassword(rs.getString(3));
                result.add(dbUser);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result.stream().findFirst().orElse(null);
    }

    public void ChangePassword(UUID userId, String newPassword) {
        try {
            final Statement statement = dbConnection.createStatement();

            String sqlStatement = String.format(
                    "UPDATE public.users\n" +
                            "\tSET password= \'%s\'\n" +
                            "\tWHERE id = \'%s\';", newPassword, userId);

            statement.executeUpdate(sqlStatement);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
