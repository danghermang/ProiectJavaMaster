package Yuso.AuctionService;

import Yuso.Entities.Auction;
import Yuso.Models.CreateAuctionModel;
import Yuso.Models.GetAuctionResponseModel;
import Yuso.Models.WinnerModel;
import Yuso.Repositories.AuctionRepository;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 *
 */
@Path("/api")
@Singleton
public class AuctionController {
    private int COMPLETED = 3;
    private int INCOMPLETE = 2;

    private AuctionRepository repository = new AuctionRepository();
    @GET
    @Path("/Auction/{auctionId}")
    @Produces({MediaType.APPLICATION_JSON})

    public Response GetAuctionById(@PathParam("auctionId") UUID auctionId) {
        Auction auction = repository.GetAuctionBy(auctionId);
        if (auction == null)
            return Response.status(404).entity("Auction not found").build();
        return Response.status(200).entity(auction).build();
    }

    @GET
    @Path("/Auction/User/{userId}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response GetAuctionsByUserId(@PathParam("userId") UUID userId) {
        List<Auction> auctions = repository.GetAuctionsBy(userId);
        if (auctions == null)
            return Response.status(404).entity("User not found").build();

        GetAuctionResponseModel result = new GetAuctionResponseModel(auctions);
        return Response.status(200).entity(result).build();
    }

    @POST
    @Path("/Auction/{userId}")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response CreateAuction(@PathParam("userId") UUID userId, @RequestBody CreateAuctionModel model) {
        Auction auction = new Auction(
                userId,
                model.getName(),
                model.getFromCity(),
                model.getFromAddress(),
                model.getFromPostalCode(),
                model.getToCity(),
                model.getToAddress(),
                model.getToPostalCode(),
                model.getEndDate(),
                model.getPickupOnDate(),
                model.getDeliverOnDate(),
                model.getWeight(),
                model.getAditionalDetails(),
                model.getPickupGeo(),
                model.getDeliveryGeo() );

        repository.CreateAuction(auction);

        return Response.status(201).build();
    }

    @GET
    @Path("/Auction/promoted")
    @Produces({MediaType.APPLICATION_JSON})
    public Response GetPromotedAuctions() {

        List<Auction> auctions = repository.GetPromotedAuctions();
        int size = auctions.size() > 9 ? 9 : auctions.size();
        return Response.status(200).entity(auctions.subList(0, size)).build();
    }

    @POST
    @Path("/Auction/winner/{auctionId}")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response SetWinner(@PathParam("auctionId") UUID auctionId, @RequestBody WinnerModel model) {
        Auction auction = repository.GetAuctionBy(auctionId);
        if (model == null)
            return Response.status(404).entity("Winner not found").build();
        if (auction == null)
            return Response.status(404).entity("Auction not found").build();

        repository.SetWinner(auctionId, model.getWinnerId());

        return Response.status(200).build();
    }

    @GET
    @Path("/Auction/filter")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response GetFiltered(@QueryParam("search") String search, @QueryParam("toCity") String toCity, @QueryParam("fromCity") String fromCity) {
        List<Auction> auctions = repository.GetPromotedAuctions();
        if(search != null)
            auctions = auctions.stream().filter(x -> x.getName().contains(search)).collect(Collectors.toList());
        if(toCity != null)
            auctions = auctions.stream().filter(x -> x.getToCity().contains(toCity)).collect(Collectors.toList());
        if(fromCity != null)
            auctions = auctions.stream().filter(x -> x.getFromCity().contains(fromCity)).collect(Collectors.toList());

        int size = auctions.size() > 9 ? 9 : auctions.size();
        return Response.status(200).entity(auctions.subList(0, size)).build();
    }

    @GET
    @Path("/Auction/win/{winnerId}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response GetFiltered(@PathParam("winnerId") UUID winnerId, @QueryParam("status") String status) {
        List<Auction> auctions = repository.GetCompletedAuctions(winnerId);

        if(status != null) {
            if (status == "uncompleted")
                auctions = auctions.stream().filter(x -> x.getStatus() == INCOMPLETE).collect(Collectors.toList());
            if (status == "completed")
                auctions = auctions.stream().filter(x -> x.getStatus() == COMPLETED).collect(Collectors.toList());
        }
        int size = auctions.size() > 9 ? 9 : auctions.size();
        return Response.status(200).entity(auctions.subList(0, size)).build();
    }
}
