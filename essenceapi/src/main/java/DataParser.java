import object.Station;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.util.HashMap;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

public class DataParser {

    //public void parse() {
    public static void main(String[] args) {
        DatabaseRequest dtb = new DatabaseRequest();

        try {
            ZipFile zipFile = new ZipFile("PrixCarburants_quotidien_20181201.zip");
            ZipEntry xmlFIle = zipFile.entries().nextElement();

            DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
            Document document = documentBuilder.parse(zipFile.getInputStream(xmlFIle));

            NodeList stations = document.getElementsByTagName("pdv");

            for (int i = 0; i < stations.getLength(); ++i) {
                Node s = stations.item(i);

                int id = Integer.parseInt(s.getAttributes().getNamedItem("id").getNodeValue());

                String attr_latitude = s.getAttributes().getNamedItem("latitude").getNodeValue();
                String attr_longitude = s.getAttributes().getNamedItem("longitude").getNodeValue();
                double latitude = attr_latitude.isEmpty() ? 0.0 : Double.parseDouble(attr_latitude);
                double longitude = attr_latitude.isEmpty() ? 0.0 : Double.parseDouble(attr_longitude);
                int zipcode = Integer.parseInt(s.getAttributes().getNamedItem("cp").getNodeValue());
                String city = ((Element) s).getElementsByTagName("ville").item(0).getTextContent();
                String address = ((Element) s).getElementsByTagName("adresse").item(0).getTextContent();


                NodeList nodeFuels = ((Element) s).getElementsByTagName("prix");
                Map<String, String> fuels = new HashMap<String, String>();
                for (int j = 0; j < nodeFuels.getLength(); ++j) {
                    Node f = nodeFuels.item(j);
                    fuels.put(f.getAttributes().getNamedItem("nom").getNodeValue(), f.getAttributes().getNamedItem("valeur").getNodeValue());
                }

                Station station = new Station(id, zipcode, latitude, longitude, city, address, fuels);
                dtb.add("station", station);

            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
