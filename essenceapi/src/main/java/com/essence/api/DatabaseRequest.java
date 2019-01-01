package com.essence.api;

import com.essence.api.objects.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.MongoClient;
import com.mongodb.client.*;
import com.mongodb.client.model.FindOneAndUpdateOptions;
import com.mongodb.client.model.ReturnDocument;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Projections.*;

public class DatabaseRequest {

    private MongoDatabase db;

    public DatabaseRequest() {
        /*MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb://user_dtb:JilejoneF4uche@ds261138.mlab.com:61138/jilejone_bdd"));
        db = mongoClient.getDatabase("jilejone_bdd");*/

        MongoClient mongoClient = new MongoClient();
        db = mongoClient.getDatabase("essence");
    }

    public static String status(boolean success) {
        return "{\"success\":\"" + success + "\"}";
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

    public String update(String collectionName, Object object, String id) {
        try {
            MongoCollection<Document> collection = db.getCollection(collectionName);
            ObjectMapper mapper = new ObjectMapper();
            String jsonString = mapper.writeValueAsString(object);
            Document doc = new Document("$set", Document.parse(jsonString));

            FindOneAndUpdateOptions options = new FindOneAndUpdateOptions();
            options.returnDocument(ReturnDocument.AFTER);
            Document d = collection.findOneAndUpdate(eq("_id", new ObjectId(id)), doc, options);
            return d.toJson();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String delete(String collectionName, String id) {
        MongoCollection<Document> collection = db.getCollection(collectionName);
        Bson bsonEq = eq("_id", new ObjectId(id));
        if (collection.deleteOne(bsonEq).getDeletedCount() == 1)
            return status(true);
        return status(false);
    }

    public String authenticate(User user) {
        Document u = db.getCollection("user")
                .find(and(eq("login", user.getLogin()), eq("password", user.getPassword())))
                .projection(exclude("password")).first();
        return u != null ? u.toJson() : status(false);
    }

    public String getClosestStations(double longitude, double latitude, String fuel) {
        FindIterable<Document> stations = db.getCollection("station")
                .find(and(geoWithinCenterSphere("location", longitude, latitude, 5 / 6371.0), exists("fuels." + fuel)))
                .projection(fields(excludeId()))
                .limit(10);

        return documentsToJson(stations);
    }

    public String getUserCars(String userID) {
        return documentsToJson(db.getCollection("car").find(eq("userID", userID)));
    }
}
