export class EveApiService {
    characters: Array<Character> = [];

    getCharacters() {
        return this.characters;
    }

    addCharacter(keyId,vCode){
        function loadXMLDoc(XMLname)
        {
            var xmlDoc;
            if (window.XMLHttpRequest)
            {
                xmlDoc=new window.XMLHttpRequest();
                xmlDoc.open("GET",XMLname,false);
                xmlDoc.send("");
                return xmlDoc.responseXML;
            }
            // IE 5 and IE 6
            else if (ActiveXObject("Microsoft.XMLDOM"))
            {
                xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async=false;
                xmlDoc.load(XMLname);
                return xmlDoc;
            }
            alert("Error loading document!");
            return null;
        }

        var results = loadXMLDoc('https://api.eveonline.com/account/APIKeyInfo.xml.aspx?vCode='+ vCode +'&keyID='+keyId)

        function xmlToJson(xml) {

            // Create the return object
            var obj = {};

            if (xml.nodeType == 1) { // element
                // do attributes
                if (xml.attributes.length > 0) {
                    obj["@attributes"] = {};
                    for (var j = 0; j < xml.attributes.length; j++) {
                        var attribute = xml.attributes.item(j);
                        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                    }
                }
            } else if (xml.nodeType == 3) { // text
                obj = xml.nodeValue;
            }

            // do children
            if (xml.hasChildNodes()) {
                for(var i = 0; i < xml.childNodes.length; i++) {
                    var item = xml.childNodes.item(i);
                    var nodeName = item.nodeName;
                    if (typeof(obj[nodeName]) == "undefined") {
                        obj[nodeName] = xmlToJson(item);
                    } else {
                        if (typeof(obj[nodeName].push) == "undefined") {
                            var old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(xmlToJson(item));
                    }
                }
            }
            return obj;
        };
        results = xmlToJson(results);
        var characters = results.eveapi.result.key.rowset;
            var charId = characters.row["@attributes"].characterID;
            var charName = characters.row["@attributes"].characterName;
            var alId = characters.row["@attributes"].allianceID;
            var alName = characters.row["@attributes"].allianceName;
            var corpId = characters.row["@attributes"].corporationID;
            var corpName = characters.row["@attributes"].corporationName;
            var factionId = characters.row["@attributes"].factionID;
            var factionName = characters.row["@attributes"].factionName;
            this.characters.push(new Character(charId, charName, corpId, corpName, alId, alName, factionId, factionName));
    }

}

export class Character {
    characterID: Number;
    characterName: String;
    corporationID: Number;
    corporationName: String;
    allianceID: Number;
    allianceName: String;
    factionID: Number;
    factionName: String;

    constructor(characterID: Number, characterName: String, corporationID: Number, corporationName: String, allianceID: Number, allianceName: String, factionID: Number, factionName: String) {
        this.characterID = characterID;
        this.characterName= characterName;
        this.corporationID = corporationID;
        this.corporationName= corporationName;
        this.allianceID= allianceID;
        this.allianceName= allianceName;
        this.factionID= factionID;
        this.factionName= factionName;
    }
}