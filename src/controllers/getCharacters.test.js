const getCharacters = require("./getCharacters")
// @ponicode
describe("getCharacters.getCharacters", () => {
    test("0", async () => {
        let object = [["http://www.croplands.org/account/confirm?t=", "Www.GooGle.com", "www.google.com"], ["https://", "https://twitter.com/path?abc", "www.google.com"], ["https://croplands.org/app/a/confirm?t=", "http://www.example.com/route/123?foo=bar", "http://www.croplands.org/account/confirm?t="]]
        await getCharacters.getCharacters({ query: "UNLOCK TABLES;", params: object })
    })

    test("1", async () => {
        let object = [["https://twitter.com/path?abc", "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg", "www.google.com"], ["http://www.croplands.org/account/confirm?t=", "https://accounts.google.com/o/oauth2/revoke?token=%s", "https://accounts.google.com/o/oauth2/revoke?token=%s"], ["https://croplands.org/app/a/reset?token=", "https://api.telegram.org/", "https://croplands.org/app/a/reset?token="]]
        await getCharacters.getCharacters({ query: "DROP TABLE tmp;", params: object })
    })

    test("2", async () => {
        let object = [["https://croplands.org/app/a/reset?token=", "www.google.com", "https://api.telegram.org/"], ["https://accounts.google.com/o/oauth2/revoke?token=%s", "http://www.example.com/route/123?foo=bar", "https://accounts.google.com/o/oauth2/revoke?token=%s"], ["https://", "https://accounts.google.com/o/oauth2/revoke?token=%s", "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg"]]
        await getCharacters.getCharacters({ query: "UNLOCK TABLES;", params: object })
    })

    test("3", async () => {
        let object = [["http://base.com", "https://", "https://accounts.google.com/o/oauth2/revoke?token=%s"], ["https://croplands.org/app/a/confirm?t=", "http://base.com", "https://api.telegram.org/"], ["http://base.com", "https://api.telegram.org/bot", "http://base.com"]]
        await getCharacters.getCharacters({ query: "DELETE FROM Projects WHERE pid = %s", params: object })
    })

    test("4", async () => {
        let object = [["http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg", "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg", "https://croplands.org/app/a/reset?token="], ["http://www.example.com/route/123?foo=bar", "www.google.com", "https://api.telegram.org/"], ["https://", "https://croplands.org/app/a/reset?token=", "https://api.telegram.org/bot"]]
        await getCharacters.getCharacters({ query: "UNLOCK TABLES;", params: object })
    })

    test("5", async () => {
        await getCharacters.getCharacters(undefined)
    })
})
