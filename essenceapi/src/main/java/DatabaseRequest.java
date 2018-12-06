import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoIterable;
import com.mongodb.client.model.Filters;
import org.bson.Document;

import static com.mongodb.client.model.Projections.excludeId;
import static com.mongodb.client.model.Projections.fields;
import static com.mongodb.client.model.Projections.include;

public class DatabaseRequest {

    private MongoDatabase db;

    public DatabaseRequest() {
        /*MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb://cdpjiro:cdp1jiro@ds253203.mlab.com:53203/cdpjiro"));
        db = mongoClient.getDatabase("cdpjiro");*/

        MongoClient mongoClient = new MongoClient();
        db = mongoClient.getDatabase("essence");
    }

    private String documentsToJson(MongoIterable<Document> documents) {
        StringBuilder str = new StringBuilder("[");
        if (documents.first() == null)
            return "[]";
        for (Document d : documents)
            str.append(d.toJson()).append(",");
        return str.deleteCharAt(str.length() - 1).append("]").toString();
    }

    public String add(String collectionName, Object object) {
        try {
            MongoCollection<Document> collection = db.getCollection(collectionName);
            ObjectMapper mapper = new ObjectMapper();
            String jsonString = mapper.writeValueAsString(object);
            Document doc = Document.parse(jsonString);
            collection.insertOne(doc);
            return doc.toJson();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }


    public String getClosestStations(double longitude, double latitude) {
        FindIterable<Document> stations = db.getCollection("station")
                .find(Filters.geoWithinCenterSphere("location", longitude, latitude, 5 / 6371.0))
                .projection(fields(include("city"), excludeId()));

        return documentsToJson(stations);
    }


}
