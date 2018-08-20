'use strict';
var SpriteManager = SpriteManager || {};


goog.provide('Blockly.Blocks.character');

goog.require('Blockly.Blocks');

Blockly.Blocks.character.HUE = 180;

Blockly.Blocks['character'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Afficher")
        .appendField(new Blockly.FieldDropdown(SpriteManager.getDisplayNameArray(SpriteManager.getCharacterSubTree())), "CHAR")
        .appendField("qui")
        .appendField(new Blockly.FieldDropdown([["crie ''A table !''", "calling"]]), "ACTIONS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
  onchange: function(event) {


    if(event.type == Blockly.Events.MOVE){
      if(this.previousConnection.isConnected()){
        var surround = this.getSurroundParent()
        if(surround != null){
          if(surround.getFieldValue("ROOMS") != null){
            var room = surround.getFieldValue("ROOMS");
            setDropdown(room, this);
            return;
          }
        }
      }
      resetDropdown(this);
    }else if(event.type == Blockly.Events.CHANGE && event.element == 'field' && event.name == 'CHAR'){
      if(this.previousConnection.isConnected()){
        var surround = this.getSurroundParent()
        if(surround != null){
          if(surround.getFieldValue("ROOMS") != null){
            var room = surround.getFieldValue("ROOMS");
            changeDropdown(room, this)
            return;
          }
        }
      }
    }else if(event.type == Blockly.Events.CHANGE && event.element == 'field' && event.name == 'ROOMS'){
      if(this.previousConnection.isConnected()){
        var surround = this.getSurroundParent()
        if(surround != null){
          if(surround.getFieldValue("ROOMS") != null){
            var room = surround.getFieldValue("ROOMS");
            setDropdown(room, this);
            return;
          }
        }
      }
    }
  }
};



function setDropdown(room, block){
  var CharacterDropdown = block.getField("CHAR")
  CharacterDropdown.menuGenerator_ = SpriteManager.getDisplayNameArray(SpriteManager.getCharacterSubTree(room));
  CharacterDropdown.setText(CharacterDropdown.menuGenerator_[0][0]);
  CharacterDropdown.setValue(CharacterDropdown.menuGenerator_[0][1]);

  var char = block.getFieldValue("CHAR");
  var actionsDropdown = block.getField('ACTIONS');
  actionsDropdown.menuGenerator_ = SpriteManager.getDisplayNameArray(SpriteManager.getActionsSubTree(room, char));
  actionsDropdown.setText(actionsDropdown.menuGenerator_[0][0]);
  actionsDropdown.setValue(actionsDropdown.menuGenerator_[0][1]);
}

function changeDropdown(room, block){
  var char = block.getFieldValue("CHAR");
  var actionsDrop = block.getField('ACTIONS');
  actionsDrop.menuGenerator_ = SpriteManager.getDisplayNameArray(SpriteManager.getActionsSubTree(room, char));
  actionsDrop.setText(actionsDrop.menuGenerator_[0][0]);
  actionsDrop.setValue(actionsDrop.menuGenerator_[0][1]);
}

function resetDropdown(block){
  var CharacterDropdown = block.getField("CHAR")
  CharacterDropdown.menuGenerator_ = SpriteManager.getDisplayNameArray(SpriteManager.getCharacterSubTree());
  CharacterDropdown.setText(CharacterDropdown.menuGenerator_[0][0]);
  CharacterDropdown.setValue(CharacterDropdown.menuGenerator_[0][1]);

  var char = block.getFieldValue("CHAR");
  var actionsDropdown = block.getField('ACTIONS');
  actionsDropdown.menuGenerator_ = SpriteManager.getDisplayNameArray(SpriteManager.getActionsSubTree());
  actionsDropdown.setText(actionsDropdown.menuGenerator_[0][0]);
  actionsDropdown.setValue(actionsDropdown.menuGenerator_[0][1]);
}