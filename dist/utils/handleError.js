"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHttpError = void 0;
const handleHttpError = (res, message, code, error) => {
    res.status(code).json({
        ok: false,
        msg: message,
        error: error
    });
};
exports.handleHttpError = handleHttpError;
//# sourceMappingURL=handleError.js.map