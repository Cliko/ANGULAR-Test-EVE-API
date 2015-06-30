import {XMLService} from 'services/xmlService';

export class EveApiService {

    characters: Array<Character> = [];
    currentCharacter: Character;
    currentCharacterInfos: Infos;
    xmlService;
    constructor(){
        this.xmlService = new XMLService();
    }
    // Retourne tout les personnages ajoutés dans un Array
    getCharacters() {
        return this.characters;
    }
    getCurrentCharacter() {
        var result = [];
        result[0] = this.currentCharacter;
        result[1] = this.currentCharacterInfos;
        return result;
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

        var wallet = this.xmlService.loadXMLDoc('https://api.eveonline.com/char/AccountBalance.xml.aspx?characterID=' + charId + '&keyID=' + keyId + '&vCode=' + vCode);
        var skillTraining = this.xmlService.loadXMLDoc('https://api.eveonline.com/char/SkillInTraining.xml.aspx?characterID=' + charId + '&keyID=' + keyId + '&vCode=' + vCode);

        wallet = this.xmlService.xmlToJson(wallet);
        skillTraining = this.xmlService.xmlToJson(skillTraining);
        wallet = wallet.eveapi.result.rowset.row["@attributes"];
        console.log(skillTraining.eveapi.result);
        var skillTrainingName, skillTrainingRemain;
        if(skillTraining.eveapi.result.trainingTypeID){
            skillTrainingName = skillTraining.eveapi.result.trainingTypeID["#text"];
            if(skillTraining.eveapi.result.trainingEndTime["#text"]){
                skillTrainingRemain = skillTraining.eveapi.result.trainingEndTime["#text"];
            }
        }else{
            skillTrainingName ="No skill training";
            skillTrainingRemain = "No skill training";
        }
        this.currentCharacterInfos = new Infos(charId,wallet.balance,skillTrainingName,skillTrainingRemain);
        console.log(this.currentCharacterInfos);
    }
    // Ajoute des personnages dans un Array grâce à l'api
    addCharacter(keyId,vCode){

        var results =  this.xmlService.loadXMLDoc('https://api.eveonline.com/account/APIKeyInfo.xml.aspx?vCode='+ vCode +'&keyID='+keyId)

        results = this.xmlService.xmlToJson(results);
        var characters = results.eveapi.result.key.rowset;

        function search(nameKey, myArray){
            for (var i=0; i < myArray.length; i++) {
                if (myArray[i].name === nameKey) {
                    return myArray[i];
                }
            }
        }

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