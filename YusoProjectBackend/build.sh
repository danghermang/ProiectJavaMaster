#cd  /Volumes/workplace/personal/ProiectJavaMaster/osrm_Release/data
#docker run -t -i -p 5000:5000 -v "${PWD}:/data" osrm/osrm-backend osrm-routed --name osrm_backend --algorithm mld /data/romania-latest.osrm

cd  /Volumes/workplace/personal/ProiectJavaMaster/YusoProjectBackend

echo "Building auth"
cd AuthenticationService
mvn clean package
docker build -t authentication_service .
docker run -d -p 8080:8080 --name authentication_service authentication_service
cd ..

echo "Building profiles"
cd ProfileService
mvn clean package
docker build -t profile_service .
docker run -d -p 8081:8080 --name profile_service profile_service
cd ..

echo "Building avatar"
cd AvatarService
mvn clean package
docker build -t avatar_service .
docker run -d -p 8082:8080 --name avatar_service avatar_service
cd ..

echo "Building auctions"
cd AuctionService
mvn clean package
docker build -t auction_service .
docker run -d -p 8083:8080 --name auction_service auction_service
cd ..

echo "Building bids"
cd BidService
mvn clean package
docker build -t bid_service .
docker run -d -p 8084:8080 --name bid_service bid_service
cd ..