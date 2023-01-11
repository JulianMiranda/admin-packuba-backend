"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = exports.schemaOptions = void 0;
const config_1 = require("../config/config");
const mapboxStaticImage = (coordinates) => {
    const [lon, lat] = coordinates;
    const mapTheme = 'streets-v11';
    const url = `https://api.mapbox.com/styles/v1/mapbox/${mapTheme}/static/`;
    const marker = 'pin-s+2db89c';
    const zoom = 14;
    const width = 600;
    const height = 400;
    return `${url}${marker}(${lon},${lat})/${lon},${lat},${zoom}/${width}x${height}?access_token=${config_1.MAPBOX_API_KEY}`;
};
exports.schemaOptions = {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            if (ret.location) {
                ret.coordinates = ret.location.coordinates;
                ret.mapImage = mapboxStaticImage(ret.location.coordinates);
                delete ret.location;
            }
            if (ret.textSearch)
                delete ret.textSearch;
        },
    },
};
const format = (documents) => {
    if (Array.isArray(documents)) {
        return documents.map((doc) => {
            doc.id = doc._id;
            delete doc._id;
            delete doc.__v;
            return doc;
        });
    }
    documents.id = documents._id;
    delete documents._id;
    delete documents.__v;
    return documents;
};
exports.format = format;
//# sourceMappingURL=schema-format.js.map