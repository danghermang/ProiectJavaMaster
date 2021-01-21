package Yuso.AvatarService;

import Yuso.Entities.Avatar;
import Yuso.Models.AvatarModel;
import Yuso.Repository.AvatarRepository;
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
public class AvatarController {
    private AvatarRepository repository = new AvatarRepository();

    @GET
    @Path("/Avatar/{userId}")
    @Produces({MediaType.APPLICATION_JSON})

    public Response GetAvatar(@PathParam("userId") UUID userId) {
        Avatar avatar = repository.GetAvatarBy(userId);
        if (avatar == null)
            return Response.status(404).entity("Avatar not found").build();
        return Response.status(200).entity(avatar).build();
    }

    @POST
    @Path("/Avatar/{userId}")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response SetAvatar(@PathParam("userId") UUID userId, @RequestBody AvatarModel model) {
        Avatar avatar = repository.GetAvatarBy(userId);
        if (avatar == null)
            return Response.status(404).entity("Avatar not found").build();

        avatar.setImage(model.getImage());
        repository.UpdateAvatar(userId, avatar);

        return Response.status(201).build();
    }
}
