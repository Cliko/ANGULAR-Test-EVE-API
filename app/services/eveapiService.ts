export class EveApiService {
    characters: Array<Character> = [];

    getCharacters() {
        return this.characters;
    }

    addCharacter(characterID: Number, characterName: String, corporationID: Number, corporationName: String, allianceID: Number, allianceName: String, factionID: Number, factionName: String) {
        this.characters.push(new Character(characterID, characterName, corporationID, corporationName, allianceID, allianceName, factionID, factionName));
    }

    requestHttp(keyId,vCode){
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

        var result = loadXMLDoc('https://api.eveonline.com/account/APIKeyInfo.xml.aspx?vCode='+ vCode +'&keyID='+keyId)
        return result;
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