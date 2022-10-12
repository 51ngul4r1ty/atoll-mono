// test related
import "jest";

// code under test
import { parsePostgresUrl } from "../config";

describe("Config", () => {
    describe("parsePostgresUrl", () => {
        it("should handle standard postgresql url", () => {
            // arrange
            const url = "postgres://FAKE_USERNAME:FAKE_PASSWORD@FAKE_HOST_NAME:FAKE_PORT/FAKE_DATABASE_NAME";

            // act
            const actual = parsePostgresUrl(url);

            // assert
            expect(actual.username).toEqual("FAKE_USERNAME");
            expect(actual.password).toEqual("FAKE_PASSWORD");
            expect(actual.host).toEqual("FAKE_HOST_NAME");
            expect(actual.port).toEqual("FAKE_PORT");
            expect(actual.database).toEqual("FAKE_DATABASE_NAME");
        });
        it("should handle real-world example postgresql url", () => {
            // arrange
            const url = "postgres://dbuser:pumpk1nfri35@localhost:15432/atoll";

            // act
            const actual = parsePostgresUrl(url);

            // assert
            expect(actual.username).toEqual("dbuser");
            expect(actual.password).toEqual("pumpk1nfri35");
            expect(actual.host).toEqual("localhost");
            expect(actual.port).toEqual("15432");
            expect(actual.database).toEqual("atoll");
        });
    });
});
