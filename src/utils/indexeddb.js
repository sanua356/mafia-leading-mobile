let indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;
let IDBTransaction =
    window.IDBTransaction ||
    window.webkitIDBTransaction ||
    window.msIDBTransaction;

function connectDB(cb) {
    let request = indexedDB.open("db", 1);
    request.onerror = function (e) {
        console.log(e);
    };
    request.onsuccess = function () {
        cb(request.result);
    };
    request.onupgradeneeded = function (e) {
        e.currentTarget.result.createObjectStore("roles", {
            keyPath: "key",
        });
        connectDB(cb);
    };
}

function getValue(key, objStore, successCallback, errorCallback) {
    connectDB(function (db) {
        let request = db
            .transaction([objStore], "readonly")
            .objectStore(objStore)
            .get(key);
        request.onerror = (e) => errorCallback(e);
        request.onsuccess = function () {
            successCallback(request.result ? request.result : undefined);
        };
    });
}

function setValue(key, value, objStore, successCallback, errorCallback) {
    connectDB(function (db) {
        let request = db
            .transaction([objStore], "readwrite")
            .objectStore(objStore)
            .put({ value, key });
        request.onerror = (e) => errorCallback(e);
        request.onsuccess = function () {
            successCallback();
        };
    });
}

function deleteValue(key, objStore, errorCallback) {
    connectDB(function (db) {
        let request = db
            .transaction([objStore], "readwrite")
            .objectStore(objStore)
            .delete(key);
        request.onerror = (e) => errorCallback(e);
    });
}

function clearAllObjStore(objStore, errorCallback) {
    connectDB(function (db) {
        let request = db
            .transaction([objStore], "readwrite")
            .objectStore(objStore)
            .clear();
        request.onerror = (e) => errorCallback(e);
    });
}

function convertImageToBase64(file, resultCallback) {
    var reader = new FileReader();

    reader.onload = function (frEvent) {
        resultCallback(frEvent.target.result);
    };
    reader.readAsDataURL(file);
}

export {
    convertImageToBase64,
    setValue,
    getValue,
    deleteValue,
    clearAllObjStore,
};
