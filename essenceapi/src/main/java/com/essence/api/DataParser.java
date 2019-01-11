package com.essence.api;

import com.essence.api.objects.Location;
import com.essence.api.objects.Station;
import org.apache.commons.io.FileUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

public class DataParser extends TimerTask {

    @Override
    public void run() {

        //public static void main (String[]args){
        DatabaseRequest dtb = new DatabaseRequest();
        try {
            File file = new File(".\\data.zip");
            FileUtils.copyURLToFile(new URL("https://donnees.roulez-eco.fr/opendata/instantane"), file);

            ZipFile zipFile = new ZipFile(file.getCanonicalPath());
            ZipEntry xmlFIle = zipFile.entries().nextElement();

            DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
            Document document = documentBuilder.parse(zipFile.getInputStream(xmlFIle));

            NodeList stations = document.getElementsByTagName("pdv");

            ArrayList<Object> stations1 = new ArrayList<>();
            for (int i = 0; i < stations.getLength(); ++i) {
                Node s = stations.item(i);

                NodeList nodeFuels = ((Element) s).getElementsByTagName("prix");
                if (nodeFuels.getLength() > 0) {

                    Map<String, String> fuels = new HashMap<>();
                    for (int j = 0; j < nodeFuels.getLength(); ++j) {
                        Node f = nodeFuels.item(j);
                        fuels.put(f.getAttributes().getNamedItem("nom").getNodeValue(), f.getAttributes().getNamedItem("valeur").getNodeValue());
                    }

                    int id = Integer.parseInt(s.getAttributes().getNamedItem("id").getNodeValue());

                    String attr_latitude = s.getAttributes().getNamedItem("latitude").getNodeValue();
                    String attr_longitude = s.getAttributes().getNamedItem("longitude").getNodeValue();
                    double[] coordinates = new double[2];
                    if (!attr_latitude.isEmpty()) {
                        coordinates[0] = Double.parseDouble(attr_longitude) / 100000;
                        coordinates[1] = Double.parseDouble(attr_latitude) / 100000;
                    }
                    Location location = new Location("Point", coordinates);

                    int zipcode = Integer.parseInt(s.getAttributes().getNamedItem("cp").getNodeValue());
                    String city = ((Element) s).getElementsByTagName("ville").item(0).getTextContent().toUpperCase();
                    String address = ((Element) s).getElementsByTagName("adresse").item(0).getTextContent().toLowerCase();


                    Station station = new Station(id, zipcode, location, city, address, fuels);
                    stations1.add(station);
                }
            }

            dtb.dropCollection("station");
            dtb.addMany("station", stations1);
            zipFile.close();
            System.out.println(file.delete());


            String currentDate = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss").format(new Date());
            dtb.add("info", new org.bson.Document().append("date", currentDate));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
