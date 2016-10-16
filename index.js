/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

'use strict';

var AlexaSkill = require('./AlexaSkill'),
    recipes = require('./recipes');

var APP_ID = 'amzn1.ask.skill.1c18eb72-ff25-48d7-83b8-317721850b77';

var Dinnercrafter = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Dinnercrafter.prototype = Object.create(AlexaSkill.prototype);
Dinnercrafter.prototype.constructor = Dinnercrafter;

Dinnercrafter.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = "Welcome to the ultimate virtual reality entertainment system! You can use this interface to pull up things on your environment.............. what can I help you with?";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "For instructions on what you can say, please say help me.";
    response.ask(speechText, repromptText);
};

Dinnercrafter.prototype.intentHandlers = {
    "RecipeIntent": function (intent, session, response) {
        var itemSlot = intent.slots.Item,
            itemName;
        if (itemSlot && itemSlot.value){
            itemName = itemSlot.value.toLowerCase();
        }

        var cardTitle = "Display" + itemName,
            recipe = recipes[itemName],
            speechOutput,
            repromptOutput;
        if (recipe) {
            speechOutput = {
                speech: recipe,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, recipe);
        } else {
            var speech;
            if (itemName) {
                speech = "I'm sorry, I currently do not know the Action for " + itemName + ". What else can I help with?";
            } else {
                speech = "I'm sorry, I currently do not know that action. What else can I help with?";
            }
            speechOutput = {
                speech: speech,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            repromptOutput = {
                speech: "What else can I help with?",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.ask(speechOutput, repromptOutput);
        }
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You can say things like, Display Twitter Feed ...... open player records ......open Ashton Eaton's Medal Count....open devon allen's Stat's.....Open Suprer fan VIP lounge.... Display game analysis and much much more. or, you can say exit... Now, what can I help you with?";
        var repromptText = "You can say things like, whats Ashton Eatons Statistics, or you can say exit... Now, what can I help you with?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    }
};

exports.handler = function (event, context) {
    var dinnercrafter = new Dinnercrafter();
    dinnercrafter.execute(event, context);
};
