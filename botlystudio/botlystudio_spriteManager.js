var SpriteManager = SpriteManager || {};

SpriteManager.basePath = "botlystudio/sprites/";
SpriteManager.missingPath = SpriteManager.basePath + "missingFile.png";
SpriteManager.treeBuffer = {};



SpriteManager.getRoomSubTree = function () {
    tree = SpriteManager.Tree;
    if (tree != null) return tree.room;
    else return SpriteManager.defaultTree.room;
}



SpriteManager.getCharacterSubTree = function (room) {
    tree = SpriteManager.getRoomSubTree();
    if (tree != null) {
        roomJSON = tree[room];
        if (roomJSON != null) return roomJSON.character
        else return null;
    }
    else return SpriteManager.defaultTree.room.entrance.character;
}



SpriteManager.getBackgroundSubTree = function (room) {
    tree = SpriteManager.getRoomSubTree();
    if (tree != null) {
        roomJSON = tree[room];
        if (roomJSON != null) return roomJSON.background
        else return SpriteManager.defaultTree.room.entrance.background;
    }
    else return SpriteManager.defaultTree.room.entrance.background;
}



SpriteManager.getActionsSubTree = function (room, character) {
    tree = SpriteManager.getCharacterSubTree(room);
    if (tree != null) {
        characterJSON = tree[character];
        if (characterJSON != null) return characterJSON.actions
        else return SpriteManager.defaultTree.room.entrance.character.actions;
    }
    else return SpriteManager.defaultTree.room.entrance.character.actions;
}



SpriteManager.getJsonElementByName = function (json, name) {
    for (subTree in json) {
        if (subTree.displayName == name) {
            return subTree;
        }
    }
    return json[0];
}



SpriteManager.getJsonElementById = function (json, id) {
    for (subTree in json) {
        if (subTree.id == id) {
            return subTree;
        }
    }
    return json[0];
}



SpriteManager.getBackgroundPath = function (roomKey, backgroundKey) {
    room = SpriteManager.getRoomSubTree[roomKey];
    background = SpriteManager.getBackgroundSubTree(roomKey)[backgroundKey];
    path = SpriteManager.basePath + "room/" + roomKey + "/background/" + background.filename;
    if (path != null) return path;
    else return SpriteManager.missingPath;
}



SpriteManager.getCharacterPath = function (roomKey, characterKey, actionKey) {
    if (characterKey == "missing") return SpriteManager.missingPath;
    room = SpriteManager.getRoomSubTree[roomKey];
    character = SpriteManager.getCharacterSubTree(roomKey)[characterKey];
    path = SpriteManager.basePath + "room/" + roomKey + "/character/" + characterKey + '/actions/' + character.actions[actionKey].filename;
    if (path != null) return path;
    else return SpriteManager.missingPath;
}



SpriteManager.getDisplayNameArray = function (tree) {
    array = [];
    if (tree != null) {
        for (obj in tree) {
            array.push([tree[obj].displayName, obj]);
        }
    }
    if (array[0] != null) return array;
    else return [["Default", "missing"]];
}



SpriteManager.importTreeJson = function () {
    BotlyStudioIPC.getJson("tree.json", 'root', null, null);
}

SpriteManager.saveTree = function(){
    SpriteManager.Tree.room =  SpriteManager.treeBuffer;
}

SpriteManager.processRootJson = function (rootJson) {
    for (roomKey in rootJson) {
        if (SpriteManager.treeBuffer[roomKey] == null)
            SpriteManager.treeBuffer[roomKey] = rootJson[roomKey];
        BotlyStudioIPC.getJson(roomKey + "/tree.json", 'room', roomKey, null);
    }
}

SpriteManager.processRoomJson = function (roomJson, roomKey) {
    for (cat in roomJson) {
        if (SpriteManager.treeBuffer[roomKey][cat] == null)
            SpriteManager.treeBuffer[roomKey][cat] = {};
        BotlyStudioIPC.getJson(roomKey + "/" + cat + "/tree.json", cat, roomKey, null); //Get each cat
    }
}

SpriteManager.processCharacterJson = function (characterJson, roomKey) {
    for (characterKey in characterJson) {
        if (SpriteManager.treeBuffer[roomKey].character[characterKey] == null)
            SpriteManager.treeBuffer[roomKey].character[characterKey] = characterJson[characterKey];
        BotlyStudioIPC.getJson(roomKey + "/character/" + characterKey  + "/actions/tree.json", 'actions', roomKey, characterKey);
    }
}

SpriteManager.processActionsJson = function (actionsJson, roomKey, characterKey) {
    for (actionsKey in actionsJson) {
        console.log(actionsJson);
        console.log('\n ********** \n' + roomKey + '\n ********** \n' + characterKey);
        if (SpriteManager.treeBuffer[roomKey].character[characterKey].actions[actionsKey] == null)
            SpriteManager.treeBuffer[roomKey].character[characterKey].actions[actionsKey] = actionsJson[actionsKey];
    }
}

SpriteManager.processBackgroundJson = function (backgroundJson, roomKey) {
    for (backgroundKey in backgroundJson) {
        if (SpriteManager.treeBuffer[roomKey].background[backgroundKey] == null)
            SpriteManager.treeBuffer[roomKey].background[backgroundKey] = backgroundJson[backgroundKey];
    }
}


/*
SpriteManager.addRoom = function(key, displayName){
    BotlyStudioIPC.addJsonElement("tree.json", {})
}

SpriteManager.addCharacter = function (room, key, displayName) {

}

SpriteManager.addActions = function (room, character, key, displayName) {

}

SpriteManager.addBackground = function (room, key, displayName) {

}
*/