package Yuso.ProfileService;

import Yuso.Entities.Profile;
import Yuso.Models.UpdateProfileModel;
import Yuso.Repositories.ProfileRepository;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.UUID;

/**
 *
 */
@Path("/api")
@Singleton
public class ProfileController {
    private ProfileRepository repository = new ProfileRepository();

    @GET
    @Path("/Profile/{userId}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response GetProfileBy(@PathParam("userId") UUID userId) {
        Profile profile = repository.GetProfileBy(userId);
        if(profile == null)
            return Response.status(404).entity("Profile not found").build();

        return Response.status(200).entity(profile).build();
    }

    @POST
    @Path("/Profile/{userId}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response UpdateProfile(@PathParam("userId") UUID userId, @RequestBody UpdateProfileModel model) {
        Profile profile = repository.GetProfileBy(userId);
        if(profile == null)
            return Response.status(404).entity("Profile not found").build();

        Profile profileToUpdate = new Profile(userId, model.getFirstName(),model.getLastName(), model.getAddress(), model.getCity(), model.getCounty(), model.getPostalCode(), model.getPhone());
        repository.UpdateProfile(profileToUpdate);

        return Response.status(201).build();
    }
}
