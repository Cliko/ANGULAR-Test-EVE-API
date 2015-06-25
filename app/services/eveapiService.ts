export class EveApiService {

    characters: Array<Character> = [];
    currentCharacter: Character;
    currentCharacterInfos: Infos;

    // Retourne tout les personnages ajoutés dans un Array
    getCharacters() {
        return this.characters;
    }

    // Implémente le personnage sélectionné dans la variable actualCharacter
    choiceCharacter(charId){
            //console.log("Choix en cours");
            for ( var i=0; i < this.characters.length; i++ ) {
               // console.log(charId);
               // console.log(this.characters[i].characterID);
                if (this.characters[i].characterID === charId) {
                    var result = this.characters[i];
                }
            }
            this.currentCharacter = result;

    }

    addCharactersInfos(keyId, vCode, charId){
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

        var wallet = loadXMLDoc('https://api.eveonline.com/char/AccountBalance.xml.aspx?characterID=' + charId + '&keyID=' + keyId + '&vCode=' + vCode);
        var skillTraining = loadXMLDoc('https://api.eveonline.com/char/SkillInTraining.xml.aspx?characterID=' + charId + '&keyID=' + keyId + '&vCode=' + vCode);

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
        wallet = xmlToJson(wallet);
        skillTraining = xmlToJson(skillTraining);
        wallet = wallet.eveapi.result.rowset.row["@attributes"];
        var skillTrainingName = skillTraining.eveapi.result.trainingTypeID["#text"];
        var skillTrainingRemain = skillTraining.eveapi.result.trainingEndTime["#text"];
        this.currentCharacterInfos = new Infos(charId,wallet.balance,skillTrainingName,skillTrainingRemain);
        console.log(this.currentCharacterInfos);
    }
    // Ajoute des personnages dans un Array grâce à l'api
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
        if(!characters.row[0]) {
            var charId = characters.row["@attributes"].characterID;
            var charName = characters.row["@attributes"].characterName;
            var alId = characters.row["@attributes"].allianceID;
            var alName = characters.row["@attributes"].allianceName;
            var corpId = characters.row["@attributes"].corporationID;
            var corpName = characters.row["@attributes"].corporationName;
            var factionId = characters.row["@attributes"].factionID;
            var factionName = characters.row["@attributes"].factionName;
            this.characters.push(new Character(charId, charName, corpId, corpName, alId, alName, factionId, factionName, keyId, vCode));
        }else{
            for(var i = 0; i < characters.row.length;i++){
                var charId = characters.row[i]["@attributes"].characterID;
                var charName = characters.row[i]["@attributes"].characterName;
                var alId = characters.row[i]["@attributes"].allianceID;
                var alName = characters.row[i]["@attributes"].allianceName;
                var corpId = characters.row[i]["@attributes"].corporationID;
                var corpName = characters.row[i]["@attributes"].corporationName;
                var factionId = characters.row[i]["@attributes"].factionID;
                var factionName = characters.row[i]["@attributes"].factionName;
                this.characters.push(new Character(charId, charName, corpId, corpName, alId, alName, factionId, factionName, keyId, vCode));
            }
        }
        return results.eveapi.result.key.rowset.row.length;
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
    keyId:Number;
    vCode:Number;

    constructor(characterID: Number, characterName: String, corporationID: Number, corporationName: String, allianceID: Number, allianceName: String, factionID: Number, factionName: String, keyId:Number,vCode:Number) {
        this.characterID = characterID;
        this.characterName= characterName;
        this.corporationID = corporationID;
        this.corporationName= corporationName;
        this.allianceID= allianceID;
        this.allianceName= allianceName;
        this.factionID= factionID;
        this.factionName= factionName;
        this.keyId= keyId;
        this.vCode= vCode;
    }
}
export class Infos {
    characterID: Number;
    wallet: Number;
    skillInTraining: String;
    skillTimeRemaining: Number;

    constructor(characterID: Number, wallet: Number, skillInTraining: String, skillTimeRemaining: Number) {
        this.characterID = characterID;
        this.wallet= wallet;
        this.skillInTraining = skillInTraining;
        this.skillTimeRemaining= skillTimeRemaining;
    }
}