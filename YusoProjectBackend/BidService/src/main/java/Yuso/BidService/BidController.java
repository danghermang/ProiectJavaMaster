package Yuso.BidService;

import Yuso.Entities.AccountInfo;
import Yuso.Entities.Bid;
import Yuso.Models.BidModel;
import Yuso.Models.BidResponseModel;
import Yuso.Repositories.AccountRepository;
import Yuso.Repositories.BidRepository;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.*;

/**
 *
 */
@Path("/api")
@Singleton
public class BidController {
    private BidRepository repository = new BidRepository();
    private AccountRepository accountRepository = new AccountRepository();

    @GET
    @Path("/Bid/{auctionId}")
//    @Produces({MediaType.APPLICATION_JSON})
    public Response GetPromotedAuctions(@PathParam("auctionId") UUID auctionId) {
        List<Bid> bids = repository.GetBidsByAuctionId(auctionId);


        Dictionary<UUID, AccountInfo> responseDictionary = new Hashtable<>();
        List<BidResponseModel> result = new ArrayList<>();
        for (Bid bid: bids
             ) {
            System.out.println(bid.getId());
            if(responseDictionary.get(bid.getUserId()) == null){
                AccountInfo accountInfo = accountRepository.GetAccountInfoBy(bid.getUserId());
                responseDictionary.put(bid.getUserId(), accountInfo);
            };

            AccountInfo account = responseDictionary.get(bid.getUserId());
            result.add(new BidResponseModel(bid.getId(), bid.getPrice(), bid.getBidDate(), account.getFirstName(), account.getLastName(), account.getImage()));
        }

        return Response.status(200).entity(result).build();
    }

    @POST
    @Path("/Bid/{userId}")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response CreateAuction(@PathParam("userId") UUID userId, @RequestBody BidModel model) {
        Bid bid = new Bid(model.getAuctionId(), model.getPrice(), userId);

        repository.CreateBid(bid);

        return Response.status(201).build();
    }
}
