package Yuso.AuthenticationService;

import Yuso.Entities.Profile;
import Yuso.Entities.User;
import Yuso.Models.ChangePasswordModel;
import Yuso.Models.LoginModel;
import Yuso.Models.RegisterModel;
import Yuso.Models.TokenResponse;
import Yuso.Repositories.UserRepository;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

/**
 *
 */
@Path("/auth")
@ApplicationScoped
public class AuthenticationController {
    private UserRepository userRepository = new UserRepository();
    private String key;

    @PostConstruct
    public void init() {
        key = readPemFile();
    }

    @POST
    @Path("/login")
    public Response Login(@RequestBody LoginModel model) {
        if (key == null) {
            throw new WebApplicationException("Unable to read privateKey.pem", 500);
        }
        User user = new User(model.Email, model.Password);

        User userExists = userRepository.CheckIfExists(user);

        if (userExists == null) {
            return Response.status(401).build();
        }

        String jwt = new JWTGenerator().generateJWT(key, userExists.getId(), model.getEmail());

        return Response.status(200).entity(new TokenResponse(jwt)).build();
    }

    @POST
    @Path("/register")
    public Response Register(@RequestBody RegisterModel model) {
        User user = new User(model.Email, model.Password);
        userRepository.SaveUser(user);

        Profile profile = new Profile(user.getId(), model.getFirstName(), model.getLastName(), model.getAddress(), model.getCity(), model.getCounty(), model.getPostalCode(), model.getPhone());
        userRepository.SaveProfile(profile);
        return Response.status(201).build();
    }

    @POST
    @Path("/password/{userId}")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response ChangePassword(@PathParam("userId") UUID userId, @RequestBody ChangePasswordModel model) {
        User userExists = userRepository.GetUserBy(userId);

        if (userExists == null) {
            return Response.status(404).entity("User not found").build();
        }
        if(!userExists.getPassword().equals(model.getOldPassword())){
            return Response.status(400).entity("Invalid password").build();
        }

        userRepository.ChangePassword(userId, model.getNewPassword());

        return Response.status(200).build();
    }

    private static String readPemFile() {
        StringBuilder sb = new StringBuilder(8192);
        try (BufferedReader is = new BufferedReader(
                new InputStreamReader(
                        AuthenticationController.class.getResourceAsStream("/privateKey.pem"), StandardCharsets.US_ASCII))) {
            String line;
            while ((line = is.readLine()) != null) {
                if (!line.startsWith("-")) {
                    sb.append(line);
                    sb.append('\n');
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return sb.toString();
    }
}
