"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ejecutarSemillas = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seed = __importStar(require("../db/seed"));
const area_1 = __importDefault(require("./area"));
const role_1 = __importDefault(require("./role"));
const subarea_1 = __importDefault(require("./subarea"));
const usuario_1 = __importDefault(require("./usuario"));
const ejecutarSemillas = () => {
    try {
        const salt = bcryptjs_1.default.genSaltSync();
        seed.roles.forEach(rol => role_1.default.create(rol));
        seed.usuarios.forEach(usuario => {
            usuario.password = bcryptjs_1.default.hashSync(usuario.password, salt);
            usuario_1.default.create(usuario);
        });
        seed.areas.forEach(area => {
            area_1.default.create(area);
        });
        seed.subareas.forEach(subarea => {
            subarea_1.default.create(subarea);
        });
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
exports.ejecutarSemillas = ejecutarSemillas;
//# sourceMappingURL=process.js.map