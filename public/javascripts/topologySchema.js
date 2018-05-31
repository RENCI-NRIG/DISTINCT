var topologySchema = {
	"type": "object",
	"properties": {
		"toponame": {
			"type": "string",
			"minlength": 1,
			"maxlength": 50
		},
		"nodes": {
			"type": "array",
			"items": {
				//"additionalProperties": false,
			    "type": "object",
			    "properties": {
			    	"name": { "type": "string" },
			    	"color": { "type": "string" }
			    },
			    "required": ["name", "color"]
			}
		},
		"links": {
			"type": "array",
			"items": {
			   	"type": "object",
			   	"properties": {
			   		"source": {
			   			"type": "string",
			   			"containsNodeName": { "$data": "0"}
			   		},
			   		"target": {
			   			"type": "string",
			   			"containsNodeName": { "$data": "0"}
			   		}
			   	},
			   	"required": ["source", "target"]
			}
		}
	},
	"required": ["toponame", "nodes", "links"]
};

// should show as an error in browser and hopefully not affect anything then
module.exports = topologySchema;