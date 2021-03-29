/* eslint-disable */
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.Image', null, global);
goog.exportSymbol('proto.TransferImageStyleRequest', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.TransferImageStyleRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.TransferImageStyleRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.TransferImageStyleRequest.displayName = 'proto.TransferImageStyleRequest';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.TransferImageStyleRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.TransferImageStyleRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.TransferImageStyleRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.TransferImageStyleRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    content: jspb.Message.getFieldWithDefault(msg, 1, ""),
    style: jspb.Message.getFieldWithDefault(msg, 2, ""),
    contentsize: jspb.Message.getFieldWithDefault(msg, 3, 0),
    stylesize: jspb.Message.getFieldWithDefault(msg, 4, 0),
    preservecolor: jspb.Message.getFieldWithDefault(msg, 5, false),
    alpha: +jspb.Message.getFieldWithDefault(msg, 6, 0.0),
    crop: jspb.Message.getFieldWithDefault(msg, 7, false),
    saveext: jspb.Message.getFieldWithDefault(msg, 8, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.TransferImageStyleRequest}
 */
proto.TransferImageStyleRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.TransferImageStyleRequest;
  return proto.TransferImageStyleRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.TransferImageStyleRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.TransferImageStyleRequest}
 */
proto.TransferImageStyleRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setContent(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setStyle(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setContentsize(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStylesize(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setPreservecolor(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setAlpha(value);
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setCrop(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setSaveext(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.TransferImageStyleRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.TransferImageStyleRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.TransferImageStyleRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.TransferImageStyleRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContent();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getStyle();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getContentsize();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getStylesize();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getPreservecolor();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getAlpha();
  if (f !== 0.0) {
    writer.writeFloat(
      6,
      f
    );
  }
  f = message.getCrop();
  if (f) {
    writer.writeBool(
      7,
      f
    );
  }
  f = message.getSaveext();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
};


/**
 * optional string content = 1;
 * @return {string}
 */
proto.TransferImageStyleRequest.prototype.getContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.TransferImageStyleRequest.prototype.setContent = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string style = 2;
 * @return {string}
 */
proto.TransferImageStyleRequest.prototype.getStyle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.TransferImageStyleRequest.prototype.setStyle = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional int32 contentSize = 3;
 * @return {number}
 */
proto.TransferImageStyleRequest.prototype.getContentsize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.TransferImageStyleRequest.prototype.setContentsize = function(value) {
  jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 styleSize = 4;
 * @return {number}
 */
proto.TransferImageStyleRequest.prototype.getStylesize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/** @param {number} value */
proto.TransferImageStyleRequest.prototype.setStylesize = function(value) {
  jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional bool preserveColor = 5;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.TransferImageStyleRequest.prototype.getPreservecolor = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 5, false));
};


/** @param {boolean} value */
proto.TransferImageStyleRequest.prototype.setPreservecolor = function(value) {
  jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional float alpha = 6;
 * @return {number}
 */
proto.TransferImageStyleRequest.prototype.getAlpha = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 6, 0.0));
};


/** @param {number} value */
proto.TransferImageStyleRequest.prototype.setAlpha = function(value) {
  jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional bool crop = 7;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.TransferImageStyleRequest.prototype.getCrop = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 7, false));
};


/** @param {boolean} value */
proto.TransferImageStyleRequest.prototype.setCrop = function(value) {
  jspb.Message.setProto3BooleanField(this, 7, value);
};


/**
 * optional string saveExt = 8;
 * @return {string}
 */
proto.TransferImageStyleRequest.prototype.getSaveext = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/** @param {string} value */
proto.TransferImageStyleRequest.prototype.setSaveext = function(value) {
  jspb.Message.setProto3StringField(this, 8, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Image = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Image, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Image.displayName = 'proto.Image';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Image.prototype.toObject = function(opt_includeInstance) {
  return proto.Image.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Image} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Image.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Image}
 */
proto.Image.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Image;
  return proto.Image.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Image} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Image}
 */
proto.Image.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setData(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Image.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Image.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Image} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Image.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string data = 1;
 * @return {string}
 */
proto.Image.prototype.getData = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.Image.prototype.setData = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


goog.object.extend(exports, proto);