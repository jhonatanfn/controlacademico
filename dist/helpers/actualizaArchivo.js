"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarArchivo = exports.borrarArchivo = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const persona_1 = __importDefault(require("../models/persona"));
const borrarArchivo = (path) => {
    if (fs_1.default.existsSync(path)) {
        fs_1.default.unlinkSync(path);
    }
};
exports.borrarArchivo = borrarArchivo;
const actualizarArchivo = (usuario, nombreArchivo) => __awaiter(void 0, void 0, void 0, function* () {
    let pathViejo = '';
    try {
        pathViejo = path_1.default.join(__dirname, `../../uploads/${usuario.img}`);
        (0, exports.borrarArchivo)(pathViejo);
        const persona = yield persona_1.default.findByPk(usuario.personaId);
        persona.img = nombreArchivo;
        yield (persona === null || persona === void 0 ? void 0 : persona.save());
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.actualizarArchivo = actualizarArchivo;
//# sourceMappingURL=actualizaArchivo.js.map