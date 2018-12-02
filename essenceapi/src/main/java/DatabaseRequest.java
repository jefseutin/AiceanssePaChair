import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class DatabaseRequest {

    private MongoDatabase db;

    public DatabaseRequest() {
        /*MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb://cdpjiro:cdp1jiro@ds253203.mlab.com:53203/cdpjiro"));
        db = mongoClient.getDatabase("cdpjiro");*/

        MongoClient mongoClient = new MongoClient();
        db = mongoClient.getDatabase("essence");
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

}
